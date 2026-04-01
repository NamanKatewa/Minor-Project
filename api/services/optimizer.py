"""OR-Tools CVRPTW optimizer service for bus route optimization"""

import asyncio
import logging
import time
import traceback
import numpy as np
from uuid import UUID
from typing import Tuple, List, Dict, Any
from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from database import async_session_maker
from ortools.constraint_solver import routing_enums_pb2
from ortools.constraint_solver import pywrapcp

from config import get_settings, Settings
from models import RoutePlan, DistanceMatrix, Stop, Bus, Demand, Depot

logger = logging.getLogger(__name__)


class OptimizerService:
    """Service for route optimization using OR-Tools CVRPTW"""
    
    def __init__(self):
        self.config: Settings = get_settings()
        self._lock = asyncio.Lock()
        self._is_running = False
    
    async def is_running(self) -> bool:
        """Check if an optimization is currently running"""
        return self._is_running

    def _get_first_solution_strategy(self, strategy_name: str):
        """Map strategy name to OR-Tools FirstSolutionStrategy enum"""
        return getattr(
            routing_enums_pb2.FirstSolutionStrategy,
            strategy_name,
            routing_enums_pb2.FirstSolutionStrategy.PATH_CHEAPEST_ARC
        )

    def _get_metaheuristic(self, metaheuristic_name: str):
        """Map metaheuristic name to OR-Tools LocalSearchMetaheuristic enum"""
        return getattr(
            routing_enums_pb2.LocalSearchMetaheuristic,
            metaheuristic_name,
            routing_enums_pb2.LocalSearchMetaheuristic.GUIDED_LOCAL_SEARCH
        )

    async def optimize(
        self,
        scenario_type: str,
        semester: str | None,
        matrix_id: UUID | None,
        fuel_cost_per_km: float,
        bus_ids: list[UUID] | None,
        max_ride_time_min: int | None,
        arrival_deadline: str | None,
        enable_split_delivery: bool = True,
    ) -> RoutePlan:
        """
        Run CVRPTW optimization and return stored route plan.
        
        Algorithm Overview:
        1. Load distance matrix (latest or specified)
        2. Load active stops with demand for semester
        3. Load available buses with depots
        4. Build CVRPTW model with constraints
        5. Solve using OR-Tools
        6. Parse solution into routes
        7. Calculate cost and stats
        8. Store and return RoutePlan
        """
        
        # Check if already running
        if self._is_running:
            raise HTTPException(
                status_code=409,
                detail="An optimization is already in progress. Please wait for it to complete."
            )
        
        async with self._lock:
            self._is_running = True
            try:
                return await self._do_optimize(
                    scenario_type, semester, matrix_id,
                    fuel_cost_per_km, bus_ids, max_ride_time_min, arrival_deadline,
                    enable_split_delivery
                )
            finally:
                self._is_running = False
    
    async def _do_optimize(
        self,
        scenario_type: str,
        semester: str | None,
        matrix_id: UUID | None,
        fuel_cost_per_km: float,
        bus_ids: list[UUID] | None,
        max_ride_time_min: int | None,
        arrival_deadline: str | None,
        enable_split_delivery: bool = True,
    ) -> RoutePlan:
        """Internal optimization logic"""

        
        logger.info("=" * 60)
        logger.info("=== OPTIMIZATION STARTED ===")
        logger.info(f"Scenario: {scenario_type}, Semester: {semester}, Deadline: {arrival_deadline}")
        logger.info(f"Config: max_ride={max_ride_time_min or self.config.max_ride_time_min}min, deadline={arrival_deadline or self.config.arrival_deadline}, fuel_cost={fuel_cost_per_km}/km")
        
        try:
            async with async_session_maker() as session:
                return await self._do_optimize_inner(
                    session, scenario_type, semester, matrix_id,
                    fuel_cost_per_km, bus_ids, max_ride_time_min, arrival_deadline,
                    enable_split_delivery
                )
        except HTTPException:
            raise
        except Exception as e:
            logger.error("=" * 60)
            logger.error("=== OPTIMIZATION FAILED ===")
            logger.error(f"Error type: {type(e).__name__}")
            logger.error(f"Error message: {str(e)}")
            logger.error(f"Full traceback: {traceback.format_exc()}")
            logger.error("=" * 60)
            raise HTTPException(
                status_code=500,
                detail=f"Optimization failed: {str(e)}"
            )
    
    async def _do_optimize_inner(
        self,
        session: AsyncSession,
        scenario_type: str,
        semester: str | None,
        matrix_id: UUID | None,
        fuel_cost_per_km: float,
        bus_ids: list[UUID] | None,
        max_ride_time_min: int | None,
        arrival_deadline: str | None,
        enable_split_delivery: bool = True,
    ) -> RoutePlan:
        """Internal optimization logic - called with an existing session"""

        try:
            # Resolve parameters
            max_ride = max_ride_time_min or self.config.max_ride_time_min
            deadline = arrival_deadline or self.config.arrival_deadline
            
            # Step 1: Load distance matrix
            logger.info("[STEP 1] Loading distance matrix...")
            matrix = await self._load_matrix(session, matrix_id)
            if not matrix:
                logger.error("No distance matrix found in database")
                raise HTTPException(
                    status_code=400,
                    detail="No distance matrix available. Build one first."
                )
            
            matrix_data = matrix.matrix_json
            depot_ids_in_matrix = matrix_data.get("depot_ids", [])
            depot_names = matrix_data.get("depot_names", {})
            logger.info(f"  Matrix ID: {matrix.id}")
            logger.info(f"  Student stops: {matrix.stop_count}")
            logger.info(f"  Depots: {len(depot_ids_in_matrix)}")
            logger.info(f"  Depot IDs: {depot_ids_in_matrix}")
            
            # Step 2: Load stops with demand
            logger.info("[STEP 2] Loading stops with demand...")
            stops_with_demand = await self._load_stops_with_demand(session, semester, enable_split_delivery)
            if not stops_with_demand:
                logger.error("No stops with demand found in database")
                raise HTTPException(
                    status_code=400,
                    detail="No active stops with demand found for the specified semester."
                )
            total_students = sum(s['student_count'] for s in stops_with_demand)
            logger.info(f"  Stops loaded: {len(stops_with_demand)}")
            logger.info(f"  Total students: {total_students}")
            
            # Step 3: Load buses
            logger.info("[STEP 3] Loading buses...")
            buses = await self._load_buses(session, bus_ids)
            if not buses:
                logger.error("No buses found in database")
                raise HTTPException(
                    status_code=400,
                    detail="No buses available."
                )
            total_capacity = sum(b['capacity'] for b in buses)
            logger.info(f"  Buses loaded: {len(buses)}")
            logger.info(f"  Total capacity: {total_capacity}")
            for i, bus in enumerate(buses):
                logger.info(f"    Bus {i+1}: {bus['bus_no']}, capacity={bus['capacity']}")
            
            # Check capacity constraint - FAIL FAST
            if total_students > total_capacity:
                logger.error(f"CAPACITY ERROR: {total_students} students > {total_capacity} total capacity ({len(buses)} buses)")
                raise HTTPException(
                    status_code=422,
                    detail={
                        "error_type": "capacity_insufficient",
                        "message": f"Fleet capacity insufficient to handle all students",
                        "details": {
                            "total_students": total_students,
                            "total_capacity": total_capacity,
                            "buses_available": len(buses),
                            "capacity_needed": total_students - total_capacity,
                            "additional_buses_needed": (total_students - total_capacity + 49) // 50
                        },
                        "suggestions": [
                            f"Add at least {(total_students - total_capacity + 49) // 50} more buses (50 capacity each)",
                            f"Increase existing bus capacities by {total_students - total_capacity} total seats",
                            f"Current: {total_capacity} seats across {len(buses)} buses",
                            f"Required: {total_students} seats for {total_students} students"
                        ]
                    }
                )
            
            logger.info("[STEP 4] Building CVRPTW model and solving...")
            logger.info(f"  Timeout: {self.config.optimization_timeout_sec}s")
            logger.info(f"  Campus location: ({self.config.campus_lat}, {self.config.campus_lon})")
            
            t0 = time.time()
            preliminary_routes, valid_stops = await asyncio.to_thread(
                self._solve_cvrptw,
                matrix=matrix,
                stops_with_demand=stops_with_demand,
                buses=buses,
                campus_lat=self.config.campus_lat,
                campus_lon=self.config.campus_lon,
                max_ride_time=max_ride,
                arrival_deadline=deadline,
                timeout=self.config.optimization_timeout_sec,
            )
            
            # Step 5: Process road geometries and accurate timings (ASYNCHRONOUS)
            logger.info("[STEP 5] Fetching road geometries and calculating accurate timings...")
            routes, stats = await self._process_road_accurate_routes(
                preliminary_routes=preliminary_routes,
                valid_stops=valid_stops,
                campus_lat=self.config.campus_lat,
                campus_lon=self.config.campus_lon,
                arrival_deadline=deadline,
                max_ride_time=max_ride,
                enable_split_delivery=enable_split_delivery
            )
            model_build_time = time.time() - t0
            
            logger.info(f"  Routes generated: {len(routes)}")
            logger.info(f"  Students assigned: {stats.get('total_students_assigned', 0)}/{total_students}")
            logger.info(f"  Coverage: {stats.get('coverage_percentage', 0):.1f}%")
            logger.info(f"  Total solve time: {model_build_time:.2f}s")
            
            # Step 6: Calculate cost
            total_distance = sum(r["total_distance_km"] for r in routes)
            cost_estimate = total_distance * fuel_cost_per_km
            
            logger.info(f"[STEP 6] Calculating cost")
            logger.info(f"  Total distance: {total_distance}km")
            logger.info(f"  Cost estimate: ₹{cost_estimate:.2f}")
            
            # Step 7: Create route plan
            route_plan = RoutePlan(
                scenario_type=scenario_type,
                routes_json={"routes": routes},
                stats_json={
                    **stats,
                    "solve_time_seconds": model_build_time,
                    "model_build_time_seconds": model_build_time,
                },
                cost_estimate=cost_estimate,
            )
            
            logger.info(f"[STEP 7] Storing route plan in database...")
            
            route_plan = RoutePlan(
                scenario_type=scenario_type,
                routes_json={"routes": routes},
                stats_json={
                    **stats,
                    "solve_time_seconds": model_build_time,
                    "model_build_time_seconds": model_build_time,
                },
                cost_estimate=cost_estimate,
            )
            session.add(route_plan)
            await session.commit()
            await session.refresh(route_plan)
            
            logger.info(f"  Route Plan ID: {route_plan.id}")
            logger.info("=== OPTIMIZATION COMPLETED SUCCESSFULLY ===")
            logger.info("=" * 60)
            
            return route_plan
            
        except HTTPException:
            raise
        except Exception as e:
            logger.error("=" * 60)
            logger.error("=== OPTIMIZATION FAILED ===")
            logger.error(f"Error type: {type(e).__name__}")
            logger.error(f"Error message: {str(e)}")
            logger.error(f"Full traceback: {traceback.format_exc()}")
            logger.error("=" * 60)
            raise HTTPException(
                status_code=500,
                detail=f"Optimization failed: {str(e)}"
            )
    
    async def _load_matrix(
        self,
        session: AsyncSession,
        matrix_id: UUID | None
    ) -> DistanceMatrix | None:
        """Load distance matrix by ID or get latest"""
        
        if matrix_id:
            result = await session.execute(
                select(DistanceMatrix).where(DistanceMatrix.id == matrix_id)
            )
            return result.scalar_one_or_none()
        else:
            result = await session.execute(
                select(DistanceMatrix).order_by(DistanceMatrix.created_at.desc()).limit(1)
            )
            return result.scalar_one_or_none()
    
    async def _load_stops_with_demand(
        self,
        session: AsyncSession,
        semester: str | None,
        enable_split_delivery: bool = True,
    ) -> List[Dict[str, Any]]:
        """Load active stops with their demand for the specified semester"""
        
        query = (
            select(Stop, Demand)
            .join(Demand, Stop.id == Demand.stop_id)
            .where(Stop.active == True)
            .where(Stop.lat.isnot(None))
            .where(Stop.lon.isnot(None))
            .where(Demand.student_count > 0)
        )
        
        if semester:
            query = query.where(Demand.semester == semester)
        
        result = await session.execute(query)
        rows = result.all()
        
        # Aggregate demand by stop to handle potential duplicate demand records
        stop_demand_agg = {}
        for stop, demand in rows:
            stop_id = str(stop.id)
            if stop_id not in stop_demand_agg:
                stop_demand_agg[stop_id] = {
                    "id": stop_id,
                    "name": stop.name,
                    "code": stop.stop_code,
                    "lat": stop.lat,
                    "lon": stop.lon,
                    "zone": stop.zone,
                    "student_count": 0
                }
            stop_demand_agg[stop_id]["student_count"] += demand.student_count
        
        stops_with_demand = list(stop_demand_agg.values())
        
        logger.info(f"  Stops with positive demand loaded: {len(stops_with_demand)}")
        
        if enable_split_delivery:
            stops_with_demand = self._split_stop_demand(stops_with_demand)
        
        return stops_with_demand
    
    def _split_stop_demand(self, stops: List[Dict[str, Any]], enable_split_delivery: bool = True) -> List[Dict[str, Any]]:
        """Split stop demand into multiple entries for better bus packing.
        
        If a stop has 50+ students, split into chunks of max_bus_capacity.
        This allows split delivery - students from same stop can use multiple buses.
        """
        if not enable_split_delivery:
            return stops
        
        max_capacity = self.config.max_bus_capacity
        split_stops = []
        
        for stop in stops:
            demand = stop["student_count"]
            if demand > max_capacity:
                num_splits = (demand + max_capacity - 1) // max_capacity
                chunk_size = max_capacity
                for i in range(num_splits):
                    remaining = demand - (i * chunk_size)
                    actual_chunk = min(chunk_size, remaining)
                    split_stops.append({
                        **stop,
                        "id": f"{stop['id']}_split_{i}",
                        "name": f"{stop['name']} (Part {i+1})",
                        "student_count": actual_chunk,
                        "is_split": True,
                        "parent_stop_id": stop["id"]
                    })
            else:
                split_stops.append(stop)
        
        total_original = len(stops)
        total_split = len(split_stops)
        logger.info(f"  Split delivery: {total_original} stops → {total_split} split nodes (max {max_capacity} per node)")
        
        return split_stops
    
    async def _load_buses(
        self,
        session: AsyncSession,
        bus_ids: list[UUID] | None
    ) -> List[Dict[str, Any]]:
        """Load available buses with depot info"""
        
        query = select(Bus).options(selectinload(Bus.depot))
        
        if bus_ids:
            query = query.where(Bus.id.in_(bus_ids))
        
        result = await session.execute(query)
        buses = result.scalars().all()
        
        buses_list = []
        for bus in buses:
            bus_data = {
                "id": str(bus.id),
                "bus_no": bus.bus_no,
                "capacity": bus.capacity or self.config.max_bus_capacity,
                "depot_id": str(bus.depot_id) if bus.depot_id else None,
                "depot_lat": bus.depot.lat if bus.depot else None,
                "depot_lon": bus.depot.lon if bus.depot else None,
            }
            buses_list.append(bus_data)
        
        return buses_list
    
    def _solve_cvrptw(
        self,
        matrix: DistanceMatrix,
        stops_with_demand: List[Dict],
        buses: List[Dict],
        campus_lat: float,
        campus_lon: float,
        max_ride_time: int,
        arrival_deadline: str,
        timeout: int,
    ) -> Tuple[List[Dict], Dict[str, Any]]:
        """
        Build and solve CVRPTW model using OR-Tools - Integrated Multi-Depot Approach.
        
        Node Mapping:
        - Node 0: Virtual Source (Start for all vehicles)
        - Node 1: Campus (End for all vehicles)
        - Nodes 2 to D+1: Real Depots
        - Nodes D+2 to N: Student Stops
        """
        
        logger.info("=" * 60)
        logger.info("[CVRPTW] Starting solver setup - INTEGRATED MULTI-DEPOT")
        
        # Parse matrix data
        matrix_data = matrix.matrix_json
        stop_ids_in_matrix = matrix_data["stop_ids"]
        depot_ids_in_matrix = matrix_data.get("depot_ids", [])
        depot_names = matrix_data.get("depot_names", {})
        depot_coords = matrix_data.get("depot_coords", {})
        durations = matrix_data["durations"]  # seconds
        distances = matrix_data["distances"]  # meters
        
        # OSRM matrix mapping (0=Campus, 1..N=Stops, N+1..N+D=Depots)
        matrix_campus_idx = matrix_data.get("campus_index", 0)
        
        # Filter stops that exist in matrix
        valid_stops = [
            s for s in stops_with_demand
            if s["id"] in stop_ids_in_matrix
        ]
        
        if not valid_stops:
            logger.error("No stops found in distance matrix")
            raise HTTPException(
                status_code=400,
                detail="No stops found in distance matrix. Rebuild matrix with current stops."
            )
            
        num_stops = len(valid_stops)
        
        # Node Mapping - REMOVED PHYSICAL DEPOTS AS NODES
        # 0: Virtual Source (Pool of all 250 buses)
        # 1: Campus
        # 2 to 2+S-1: Student Stops
        VIRTUAL_SOURCE = 0
        CAMPUS_NODE = 1
        STOP_START_NODE = 2
        num_nodes = 2 + num_stops
        
        logger.info(f"  Nodes: {num_nodes} (1 Virtual Start, 1 Campus, {num_stops} Stops)")
        
        # Build node translation helpers
        stop_id_to_matrix_idx = {sid: i + 1 for i, sid in enumerate(stop_ids_in_matrix)}
        # Depots start after all stops in the matrix
        depot_id_to_matrix_idx = {did: i + 1 + len(stop_ids_in_matrix) for i, did in enumerate(depot_ids_in_matrix)}
        
        # Mapping for result reconstruction
        index_to_stop = {}
        for i, stop in enumerate(valid_stops):
            index_to_stop[STOP_START_NODE + i] = {
                **stop,
                "matrix_idx": stop_id_to_matrix_idx[stop["id"]]
            }
            
        # Physical depot info for choosing the best start
        physical_depots = []
        for did in depot_ids_in_matrix:
            coords = depot_coords.get(did, {})
            physical_depots.append({
                "id": did,
                "name": depot_names.get(did, "Unknown Depot"),
                "lat": coords.get("lat"),
                "lon": coords.get("lon"),
                "matrix_idx": depot_id_to_matrix_idx[did]
            })

        # Build matrices
        logger.info(f"  Building optimized matrices for {num_nodes} nodes using NumPy...")
        t_matrix_start = time.time()
        
        PENALTY = 10000000
        time_np = np.full((num_nodes, num_nodes), PENALTY // 1000, dtype=np.int32)
        cost_np = np.full((num_nodes, num_nodes), PENALTY, dtype=np.int32)
        
        durations_np = np.array(durations)
        distances_np = np.array(distances)
        
        # OSRM matrix indices
        stop_matrix_indices = [index_to_stop[i]["matrix_idx"] for i in range(STOP_START_NODE, num_nodes)]
        depot_matrix_indices = [d["matrix_idx"] for d in physical_depots]
        
        # 1. Virtual Source -> Stops (INFINITE DEPOT LOGIC)
        # The cost to start at a stop is the distance from the CLOSEST physical depot to that stop.
        if depot_matrix_indices:
            # Get durations from all depots to all stops: shape (num_depots, num_stops)
            depot_to_stop_dur = durations_np[depot_matrix_indices, :][:, stop_matrix_indices]
            depot_to_stop_dist = distances_np[depot_matrix_indices, :][:, stop_matrix_indices]
            
            # Use the minimum (closest depot) for each stop
            time_np[VIRTUAL_SOURCE, STOP_START_NODE:] = (np.min(depot_to_stop_dur, axis=0) / 60).astype(np.int32)
            cost_np[VIRTUAL_SOURCE, STOP_START_NODE:] = np.min(depot_to_stop_dist, axis=0).astype(np.int32)
        
        # 2. Virtual Source -> Campus (Escape hatch)
        time_np[VIRTUAL_SOURCE, CAMPUS_NODE] = 0
        cost_np[VIRTUAL_SOURCE, CAMPUS_NODE] = 0
        
        # 3. Stops -> Stops
        for i, mi in enumerate(stop_matrix_indices):
            solver_idx_i = STOP_START_NODE + i
            valid_mask = durations_np[mi, stop_matrix_indices] >= 0
            time_np[solver_idx_i, np.array(range(STOP_START_NODE, num_nodes))[valid_mask]] = (durations_np[mi, stop_matrix_indices][valid_mask] / 60).astype(np.int32)
            cost_np[solver_idx_i, np.array(range(STOP_START_NODE, num_nodes))[valid_mask]] = distances_np[mi, stop_matrix_indices][valid_mask].astype(np.int32)
            
        # 4. Stops -> Campus
        for i, mi in enumerate(stop_matrix_indices):
            solver_idx_i = STOP_START_NODE + i
            if durations_np[mi, matrix_campus_idx] >= 0:
                time_np[solver_idx_i, CAMPUS_NODE] = int(durations_np[mi, matrix_campus_idx] / 60)
                cost_np[solver_idx_i, CAMPUS_NODE] = int(distances_np[mi, matrix_campus_idx])
        
        # 5. Explicit Self-loops
        for i in range(num_nodes):
            time_np[i, i] = 0
            cost_np[i, i] = 0
        
        # Convert to list for OR-Tools compatibility
        time_matrix = time_np.tolist()
        cost_matrix = cost_np.tolist()
        
        matrix_build_time = time.time() - t_matrix_start
        logger.info(f"  Matrices built in {matrix_build_time:.2f}s. Initializing Routing Manager...")
        
        # Demands
        demands = [0] * num_nodes
        for idx, stop in index_to_stop.items():
            demands[idx] = stop["student_count"]
            
        # Vehicle Data
        num_vehicles = len(buses)
        vehicle_capacities = [b["capacity"] for b in buses]
        starts = [VIRTUAL_SOURCE] * num_vehicles
        ends = [CAMPUS_NODE] * num_vehicles
        
        t_manager_start = time.time()
        manager = pywrapcp.RoutingIndexManager(num_nodes, num_vehicles, starts, ends)
        routing = pywrapcp.RoutingModel(manager)
        logger.info(f"  Routing Model created in {time.time() - t_manager_start:.2f}s. Pre-calculating index mappings...")
        
        # OPTIMIZATION: Pre-calculate index-to-node mapping using the correct index count
        index_to_node_map = [manager.IndexToNode(i) for i in range(manager.GetNumberOfIndices())]
        
        # Callbacks (Optimized with pre-calculated mapping)
        def cost_callback(from_index, to_index):
            from_node = index_to_node_map[from_index]
            to_node = index_to_node_map[to_index]
            return cost_matrix[from_node][to_node]
        
        def time_callback(from_index, to_index):
            from_node = index_to_node_map[from_index]
            to_node = index_to_node_map[to_index]
            return time_matrix[from_node][to_node]
            
        cost_idx = routing.RegisterTransitCallback(cost_callback)
        time_idx = routing.RegisterTransitCallback(time_callback)
        
        routing.SetArcCostEvaluatorOfAllVehicles(cost_idx)
        
        # Dimensions
        logger.info("  Adding dimensions...")
        routing.AddDimension(time_idx, self.config.time_dimension_slack, max_ride_time, False, "Time")
        time_dimension = routing.GetDimensionOrDie("Time")
        deadline_min = self._time_to_minutes(arrival_deadline)
        
        # Apply deadline to each vehicle's end node individually
        for i in range(num_vehicles):
            time_dimension.CumulVar(routing.End(i)).SetRange(0, deadline_min)
        
        def demand_callback(from_index):
            return demands[index_to_node_map[from_index]]
        demand_idx = routing.RegisterUnaryTransitCallback(demand_callback)
        routing.AddDimensionWithVehicleCapacity(demand_idx, 0, vehicle_capacities, True, "Capacity")
        
        routing.SetFixedCostOfAllVehicles(self.config.fixed_vehicle_cost)
        
        # Allow dropping stops if they cause infeasibility
        drop_penalty = self.config.drop_penalty
        for i in range(STOP_START_NODE, num_nodes):
            routing.AddDisjunction([manager.NodeToIndex(i)], drop_penalty)
        
        # Search parameters
        search_params = pywrapcp.DefaultRoutingSearchParameters()
        search_params.first_solution_strategy = self._get_first_solution_strategy(self.config.first_solution_strategy)
        search_params.local_search_metaheuristic = self._get_metaheuristic(self.config.local_search_metaheuristic)
        search_params.time_limit.FromSeconds(timeout)
        
        logger.info(f"  Model fully initialized. Starting solver (timeout {timeout}s)...")
        solve_start = time.time()
        solution = routing.SolveWithParameters(search_params)
        solve_time = time.time() - solve_start
        logger.info(f"  Solver finished in {solve_time:.2f}s")
        
        if not solution:
            logger.error("Solver returned no solution even with disjunctions!")
            raise HTTPException(status_code=422, detail="No feasible solution found.")
            
        # Process routes
        preliminary_routes = []
        assigned_stops_count = 0
        for vehicle_id in range(num_vehicles):
            index = routing.Start(vehicle_id)
            route_nodes = []
            while not routing.IsEnd(index):
                node_idx = manager.IndexToNode(index)
                route_nodes.append(node_idx)
                index = solution.Value(routing.NextVar(index))
            
            # Extract Depot and Stops (Skip Virtual Source)
            # Route nodes: [VirtualSource, Stop1, Stop2...]
            if len(route_nodes) > 1: # Has at least one Stop
                stop_nodes = route_nodes[1:]
                route_stops = [index_to_stop[sn] for sn in stop_nodes]
                
                # RECONSTRUCT DEPOT CHOICE: Which depot was actually closest to the first stop?
                first_stop = route_stops[0]
                first_stop_matrix_idx = first_stop["matrix_idx"]
                
                best_depot = physical_depots[0]
                min_dist = float('inf')
                for depot in physical_depots:
                    d = distances_np[depot["matrix_idx"]][first_stop_matrix_idx]
                    if d < min_dist:
                        min_dist = d
                        best_depot = depot
                
                preliminary_routes.append({
                    "bus": buses[vehicle_id],
                    "depot": best_depot,
                    "stops": route_stops
                })
                assigned_stops_count += len(stop_nodes)
        
        logger.info(f"  Assignment complete: {assigned_stops_count}/{num_stops} stops assigned.")
        if assigned_stops_count < num_stops:
            logger.warning(f"  {num_stops - assigned_stops_count} stops were dropped due to constraints.")
                
        return preliminary_routes, valid_stops

    async def _process_road_accurate_routes(
        self,
        preliminary_routes: List[Dict],
        valid_stops: List[Dict],
        campus_lat: float,
        campus_lon: float,
        arrival_deadline: str,
        max_ride_time: int,
        enable_split_delivery: bool = True,
    ) -> Tuple[List[Dict], Dict]:
        """Async processing of routes to get real road geometries and timings from OSRM"""
        from services.osrm import osrm_service
        
        async def process_single_route(route_info):
            bus = route_info["bus"]
            stops = route_info["stops"]
            depot = route_info["depot"]
            
            coords = [(depot["lat"], depot["lon"])] + [(s["lat"], s["lon"]) for s in stops] + [(campus_lat, campus_lon)]
            
            try:
                osrm_data = await osrm_service.get_route(coords)
                osrm_route = osrm_data["routes"][0]
                geometry = [[p[1], p[0]] for p in osrm_route["geometry"]["coordinates"]]
                legs = osrm_route["legs"]
                
                deadline_min = self._time_to_minutes(arrival_deadline)
                total_time_min = round(osrm_route["duration"] / 60)
                start_time_min = deadline_min - total_time_min
                current_time_min = deadline_min
                processed_stops = []
                
                # Backward pass for arrival times
                for i in range(len(stops) - 1, -1, -1):
                    leg_to_next = legs[i + 1]
                    current_time_min -= round(leg_to_next["duration"] / 60)
                    
                    stop = stops[i]
                    processed_stops.append({
                        "stop_id": stop["id"],
                        "stop_name": stop["name"],
                        "stop_code": stop.get("code"),
                        "lat": stop["lat"],
                        "lon": stop["lon"],
                        "zone": stop.get("zone"),
                        "arrival_time": self._minutes_to_time(current_time_min),
                        "students_boarding": stop["student_count"],
                        "cumulative_time_min": current_time_min - start_time_min,
                        "distance_from_prev_km": round(legs[i]["distance"] / 1000, 2),
                        "parent_stop_id": stop.get("parent_stop_id"),
                        "is_split": stop.get("is_split", False),
                    })
                
                processed_stops.reverse()
                total_dist = osrm_route["distance"] / 1000
                total_time = total_time_min
                students = sum(s["student_count"] for s in stops)
                utilization = (students / bus["capacity"]) * 100
                
                warnings = []
                if total_time > max_ride_time:
                    warnings.append(f"Exceeds max ride time ({total_time} min)")
                if utilization > 95:
                    warnings.append(f"High capacity utilization ({utilization:.1f}%)")
                
                return {
                    "bus_id": bus["id"],
                    "bus_no": bus["bus_no"],
                    "capacity": bus["capacity"],
                    "depot_id": str(depot["id"]),
                    "depot_name": depot["name"],
                    "depot_lat": depot["lat"],
                    "depot_lon": depot["lon"],
                    "stops": processed_stops,
                    "geometry": geometry,
                    "total_students": students,
                    "total_distance_km": round(total_dist, 2),
                    "total_time_min": total_time,
                    "capacity_utilization": round(utilization, 2),
                    "warnings": warnings,
                }
            except Exception as e:
                logger.error(f"Error processing route for bus {bus['bus_no']}: {str(e)}")
                return None

        # Execute in parallel
        routes = await asyncio.gather(*(process_single_route(r) for r in preliminary_routes))
        routes = [r for r in routes if r is not None]
        
        # Calculate final stats
        total_assigned = sum(r["total_students"] for r in routes)
        
        # Handle split delivery: get original stop counts
        if enable_split_delivery:
            original_stops = [s for s in valid_stops if not s.get("is_split", False)]
            total_students_req = sum(s["student_count"] for s in original_stops)
            assigned_parent_ids = set()
            for r in routes:
                for s in r["stops"]:
                    parent_id = s.get("parent_stop_id", s["stop_id"])
                    assigned_parent_ids.add(parent_id)
            
            unassigned = []
            for s in original_stops:
                if s["id"] not in assigned_parent_ids:
                    unassigned.append({"stop_id": s["id"], "name": s["name"], "reason": "Constraints", "lat": s["lat"], "lon": s["lon"]})
        else:
            total_students_req = sum(s["student_count"] for s in valid_stops)
            assigned_stop_ids = {s["stop_id"] for r in routes for s in r["stops"]}
            
            unassigned = []
            for s in valid_stops:
                if s["id"] not in assigned_stop_ids:
                    unassigned.append({"stop_id": s["id"], "name": s["name"], "reason": "Constraints", "lat": s["lat"], "lon": s["lon"]})
        
        stats = {
            "total_buses_used": len(routes),
            "total_distance_km": sum(r["total_distance_km"] for r in routes),
            "total_time_min": max(r["total_time_min"] for r in routes) if routes else 0,
            "avg_utilization": sum(r["capacity_utilization"] for r in routes) / len(routes) if routes else 0,
            "total_students_assigned": total_assigned,
            "total_students_requested": total_students_req,
            "coverage_percentage": (total_assigned / total_students_req * 100) if total_students_req > 0 else 0,
            "unassigned_stops": unassigned,
            "global_warnings": [f"Bus {r['bus_no']}: {', '.join(r['warnings'])}" for r in routes if r["warnings"]],
        }
        
        return routes, stats
    
    def _time_to_minutes(self, time_str: str) -> int:
        """Convert HH:MM to minutes from midnight"""
        parts = time_str.split(":")
        return int(parts[0]) * 60 + int(parts[1])
    
    def _minutes_to_time(self, minutes: int) -> str:
        """Convert minutes from midnight to HH:MM"""
        hours = minutes // 60
        mins = minutes % 60
        return f"{hours:02d}:{mins:02d}"


# Singleton instance
optimizer_service = OptimizerService()
