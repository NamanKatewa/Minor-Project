"""OR-Tools CVRPTW optimizer service for bus route optimization"""

import asyncio
import logging
import time
import traceback
from uuid import UUID
from typing import Tuple, List, Dict, Any
from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from ortools.constraint_solver import routing_enums_pb2
from ortools.constraint_solver import pywrapcp

from config import get_settings, Settings
from models import Solution, DistanceMatrix, Stop, Bus, Demand, Depot

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
    
    async def optimize(
        self,
        session: AsyncSession,
        scenario_type: str,
        semester: str | None,
        matrix_id: UUID | None,
        fuel_cost_per_km: float,
        bus_ids: list[UUID] | None,
        max_ride_time_min: int | None,
        arrival_deadline: str | None,
    ) -> Solution:
        """
        Run CVRPTW optimization and return stored solution.
        
        Algorithm Overview:
        1. Load distance matrix (latest or specified)
        2. Load active stops with demand for semester
        3. Load available buses with depots
        4. Build CVRPTW model with constraints
        5. Solve using OR-Tools
        6. Parse solution into routes
        7. Calculate cost and stats
        8. Store and return Solution
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
                    session, scenario_type, semester, matrix_id,
                    fuel_cost_per_km, bus_ids, max_ride_time_min, arrival_deadline
                )
            finally:
                self._is_running = False
    
    async def _do_optimize(
        self,
        session: AsyncSession,
        scenario_type: str,
        semester: str | None,
        matrix_id: UUID | None,
        fuel_cost_per_km: float,
        bus_ids: list[UUID] | None,
        max_ride_time_min: int | None,
        arrival_deadline: str | None,
    ) -> Solution:
        """Internal optimization logic"""
        
        logger.info("=" * 60)
        logger.info("=== OPTIMIZATION STARTED ===")
        logger.info(f"Scenario: {scenario_type}, Semester: {semester}, Deadline: {arrival_deadline}")
        logger.info(f"Config: max_ride={max_ride_time_min or self.config.max_ride_time_min}min, deadline={arrival_deadline or self.config.arrival_deadline}, fuel_cost={fuel_cost_per_km}/km")
        
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
            stops_with_demand = await self._load_stops_with_demand(session, semester)
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
            routes, stats = await asyncio.to_thread(
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
            model_build_time = time.time() - t0
            
            logger.info(f"[STEP 5] Solution found")
            logger.info(f"  Routes generated: {len(routes)}")
            logger.info(f"  Students assigned: {stats.get('total_students_assigned', 0)}/{total_students}")
            logger.info(f"  Coverage: {stats.get('coverage_percentage', 0):.1f}%")
            logger.info(f"  Solve time: {model_build_time:.2f}s")
            
            # Step 6: Calculate cost
            total_distance = sum(r["total_distance_km"] for r in routes)
            cost_estimate = total_distance * fuel_cost_per_km
            
            logger.info(f"[STEP 6] Calculating cost")
            logger.info(f"  Total distance: {total_distance}km")
            logger.info(f"  Cost estimate: ₹{cost_estimate:.2f}")
            
            # Step 7: Create solution
            solution = Solution(
                scenario_type=scenario_type,
                routes_json={"routes": routes},
                stats_json={
                    **stats,
                    "solve_time_seconds": model_build_time,
                    "model_build_time_seconds": model_build_time,
                },
                cost_estimate=cost_estimate,
            )
            
            logger.info(f"[STEP 7] Storing solution in database...")
            session.add(solution)
            await session.commit()
            await session.refresh(solution)
            
            logger.info(f"  Solution ID: {solution.id}")
            logger.info("=== OPTIMIZATION COMPLETED SUCCESSFULLY ===")
            logger.info("=" * 60)
            
            return solution
            
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
        semester: str | None
    ) -> List[Dict[str, Any]]:
        """Load active stops with their demand for the specified semester"""
        
        query = (
            select(Stop, Demand)
            .join(Demand, Stop.id == Demand.stop_id)
            .where(Stop.active == True)
            .where(Stop.lat.isnot(None))
            .where(Stop.lon.isnot(None))
        )
        
        if semester:
            query = query.where(Demand.semester == semester)
        
        result = await session.execute(query)
        rows = result.all()
        
        stops_with_demand = []
        for stop, demand in rows:
            stops_with_demand.append({
                "id": str(stop.id),
                "name": stop.name,
                "code": stop.stop_code,
                "lat": stop.lat,
                "lon": stop.lon,
                "zone": stop.zone,
                "student_count": demand.student_count,
            })
        
        return stops_with_demand
    
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
        Build and solve CVRPTW model using OR-Tools - Two Phase Approach.
        
        Phase 1: Solve VRP starting from campus (Campus → Stops → Campus)
                 This is fast because we don't include depot nodes in the model.
                 
        Phase 2: For each route, find closest depot to LAST stop, then reverse route.
                 Final route: Depot → (reversed stops) → Campus
        
        This avoids the solver hang that occurs when depot nodes are included.
        """
        
        logger.info("=" * 60)
        logger.info("[CVRPTW] Starting solver setup - TWO PHASE APPROACH")
        
        # Parse matrix data
        matrix_data = matrix.matrix_json
        stop_ids_in_matrix = matrix_data["stop_ids"]
        depot_ids_in_matrix = matrix_data.get("depot_ids", [])
        depot_names = matrix_data.get("depot_names", {})
        depot_coords = matrix_data.get("depot_coords", {})
        durations = matrix_data["durations"]  # seconds
        distances = matrix_data["distances"]  # meters
        
        num_stop_coords = len(stop_ids_in_matrix)
        
        logger.info(f"  Matrix has {num_stop_coords} stops and {len(depot_ids_in_matrix)} depots")
        logger.info(f"  Using campus as start/end point (Phase 1)")
        
        # Filter stops that exist in matrix
        valid_stops = [
            s for s in stops_with_demand
            if s["id"] in stop_ids_in_matrix
        ]
        
        logger.info(f"  Valid stops with demand: {len(valid_stops)}")
        logger.info(f"  Total students to assign: {sum(s['student_count'] for s in valid_stops)}")
        
        if not valid_stops:
            logger.error("No stops found in distance matrix")
            raise HTTPException(
                status_code=400,
                detail="No stops found in distance matrix. Rebuild matrix with current stops."
            )
        
        # Build node mapping - NO DEPOT NODES in Phase 1
        # Node 0: Campus
        # Nodes 1..n: Student stops
        campus_index = 0
        stop_id_to_index = {s["id"]: i + 1 for i, s in enumerate(valid_stops)}
        index_to_stop = {i + 1: s for i, s in enumerate(valid_stops)}
        num_stops = len(valid_stops)
        num_nodes = num_stops + 1  # campus + stops
        
        logger.info(f"  Phase 1: {num_nodes} nodes (1 campus + {num_stops} stops)")
        
        # Build time matrix (in minutes) and distance matrix (in km)
        logger.info("  Building time/distance matrices...")
        time_matrix = [[0] * num_nodes for _ in range(num_nodes)]
        distance_matrix = [[0] * num_nodes for _ in range(num_nodes)]
        
        # Fill stop-to-stop times/distances from matrix
        for i, stop_i in enumerate(valid_stops):
            idx_i = stop_id_to_index[stop_i["id"]]
            matrix_idx_i = stop_ids_in_matrix.index(stop_i["id"])
            
            for j, stop_j in enumerate(valid_stops):
                idx_j = stop_id_to_index[stop_j["id"]]
                matrix_idx_j = stop_ids_in_matrix.index(stop_j["id"])
                
                # Convert seconds to minutes
                dur_sec = durations[matrix_idx_i][matrix_idx_j]
                time_matrix[idx_i][idx_j] = int(dur_sec / 60) if dur_sec and dur_sec > 0 else 0
                
                # Distance in km
                dist_m = distances[matrix_idx_i][matrix_idx_j]
                distance_matrix[idx_i][idx_j] = dist_m / 1000 if dist_m else 0
        
        # Campus connections: small penalty to campus to encourage it as end point
        logger.info("  Setting up campus connections...")
        CAMPUS_TIME_PENALTY = 5
        for i in range(1, num_nodes):
            time_matrix[i][campus_index] = CAMPUS_TIME_PENALTY
            time_matrix[campus_index][i] = 1
            distance_matrix[i][campus_index] = 0
            distance_matrix[campus_index][i] = 0
        
        # Demands (students at each stop)
        demands = [0] + [s["student_count"] for s in valid_stops]
        
        # Vehicle data
        num_vehicles = len(buses)
        vehicle_capacities = [b["capacity"] for b in buses]
        
        # All vehicles start and end at campus for Phase 1
        starts = [campus_index] * num_vehicles
        ends = [campus_index] * num_vehicles
        
        logger.info(f"  Setting up {num_vehicles} vehicles...")
        logger.info(f"  Vehicle capacities: {vehicle_capacities[:5]}{'...' if len(vehicle_capacities) > 5 else ''}")
        
        deadline_minutes = self._time_to_minutes(arrival_deadline)
        logger.info(f"  Deadline: {arrival_deadline} = {deadline_minutes} minutes")
        
        # Build OR-Tools model (Phase 1 - no depot nodes)
        logger.info("  Building OR-Tools model (Phase 1)...")
        manager = pywrapcp.RoutingIndexManager(
            num_nodes, num_vehicles, starts, ends
        )
        routing = pywrapcp.RoutingModel(manager)
        
        # Time callback
        def time_callback(from_index, to_index):
            from_node = manager.IndexToNode(from_index)
            to_node = manager.IndexToNode(to_index)
            return time_matrix[from_node][to_node]
        
        transit_callback_index = routing.RegisterTransitCallback(time_callback)
        routing.SetArcCostEvaluatorOfAllVehicles(transit_callback_index)
        
        # Add dimension: Time (max ride time)
        routing.AddDimension(
            transit_callback_index,
            slack_max=30,
            capacity=max_ride_time,
            fix_start_cumul_to_zero=False,
            name="Time"
        )
        time_dimension = routing.GetDimensionOrDie("Time")
        
        # Set campus arrival constraint
        campus_index_rt = manager.NodeToIndex(campus_index)
        time_dimension.CumulVar(campus_index_rt).SetRange(0, deadline_minutes)
        
        # Add dimension: Capacity
        def demand_callback(from_index):
            from_node = manager.IndexToNode(from_index)
            return demands[from_node]
        
        demand_callback_index = routing.RegisterUnaryTransitCallback(demand_callback)
        routing.AddDimensionWithVehicleCapacity(
            demand_callback_index,
            slack_max=0,
            vehicle_capacities=vehicle_capacities,
            fix_start_cumul_to_zero=True,
            name="Capacity"
        )
        
        # Search parameters
        search_parameters = pywrapcp.DefaultRoutingSearchParameters()
        search_parameters.first_solution_strategy = (
            routing_enums_pb2.FirstSolutionStrategy.PATH_CHEAPEST_ARC
        )
        search_parameters.local_search_metaheuristic = (
            routing_enums_pb2.LocalSearchMetaheuristic.GUIDED_LOCAL_SEARCH
        )
        search_parameters.time_limit.FromSeconds(timeout)
        
        logger.info(f"  Starting OR-Tools solve (Phase 1)...")
        logger.info(f"    Timeout: {timeout}s")
        
        solve_start = time.time()
        solution = routing.SolveWithParameters(search_parameters)
        solve_time = time.time() - solve_start
        
        logger.info(f"  Phase 1 solver finished in {solve_time:.2f}s")
        
        if not solution:
            logger.error("Solver returned no solution")
            raise HTTPException(
                status_code=422,
                detail={
                    "error_type": "no_feasible_solution",
                    "message": "Optimization failed to find a feasible solution",
                    "suggestions": [
                        "Increase number of buses",
                        "Increase bus capacity",
                        "Relax arrival deadline",
                        "Check for unreachable stops"
                    ]
                }
            )
        
        logger.info(f"  Phase 1 complete! Objective value: {solution.ObjectiveValue()}")
        
        # ============================================================
        # PHASE 2: Find closest depot to LAST stop, then reverse
        # ============================================================
        logger.info("=" * 60)
        logger.info("[PHASE 2] Assigning depots and reversing routes...")
        
        # Prepare depot data
        depots_list = []
        for depot_id in depot_ids_in_matrix:
            depot_info = depot_coords.get(depot_id, {})
            if depot_info.get("lat") and depot_info.get("lon"):
                depots_list.append({
                    "id": depot_id,
                    "name": depot_names.get(depot_id, "Unknown Depot"),
                    "lat": depot_info["lat"],
                    "lon": depot_info["lon"],
                })
        
        if not depots_list:
            logger.warning("No valid depots found - using campus as fallback")
            depots_list = [{
                "id": "campus",
                "name": "Campus",
                "lat": campus_lat,
                "lon": campus_lon,
            }]
        
        logger.info(f"  Available depots: {len(depots_list)}")
        
        import math
        
        # Parse Phase 1 solution into routes
        routes = []
        total_assigned = 0
        unassigned = []
        global_warnings = []
        
        for vehicle_id in range(num_vehicles):
            bus = buses[vehicle_id]
            index = routing.Start(vehicle_id)
            route_stops_phase1 = []
            route_time_phase1 = 0
            
            while not routing.IsEnd(index):
                node_index = manager.IndexToNode(index)
                
                if node_index != campus_index and node_index in index_to_stop:
                    stop_data = index_to_stop[node_index]
                    
                    # Get arrival time from solution
                    time_var = time_dimension.CumulVar(index)
                    arrival_time = solution.Value(time_var)
                    
                    route_stops_phase1.append({
                        "stop_id": stop_data["id"],
                        "stop_name": stop_data["name"],
                        "stop_code": stop_data.get("code"),
                        "lat": stop_data["lat"],
                        "lon": stop_data["lon"],
                        "zone": stop_data.get("zone"),
                        "arrival_time": self._minutes_to_time(arrival_time),
                        "students_boarding": stop_data["student_count"],
                        "cumulative_time_min": arrival_time,
                    })
                
                previous_index = index
                index = solution.Value(routing.NextVar(index))
                
                # Calculate route time
                from_node = manager.IndexToNode(previous_index)
                to_node = manager.IndexToNode(index)
                if from_node < num_nodes and to_node < num_nodes:
                    route_time_phase1 += time_matrix[from_node][to_node]
            
            # Only process routes that have stops
            if len(route_stops_phase1) == 0:
                continue
            
            # Find closest depot to the LAST stop (before reversing)
            last_stop = route_stops_phase1[-1]
            min_dist = float('inf')
            closest_depot = None
            
            for depot in depots_list:
                # Use haversine-like approximation for distance
                dist = math.sqrt(
                    (depot["lat"] - last_stop["lat"])**2 + 
                    (depot["lon"] - last_stop["lon"])**2
                )
                if dist < min_dist:
                    min_dist = dist
                    closest_depot = depot
            
            # Fallback if no depot found (shouldn't happen)
            if not closest_depot:
                closest_depot = {
                    "id": "campus",
                    "name": "Campus",
                    "lat": campus_lat,
                    "lon": campus_lon,
                }
            
            # Ensure closest_depot has all required keys
            depot_lat = closest_depot.get("lat", campus_lat)
            depot_lon = closest_depot.get("lon", campus_lon)
            depot_id = closest_depot.get("id", "campus")
            depot_name = closest_depot.get("name", "Campus")
            
            # REVERSE the route!
            route_stops_phase1.reverse()
            
            # Recalculate distances properly after reversal
            # Use matrix indices (stop_ids_in_matrix), not valid_stops order
            stop_index_map = {stop_id: i for i, stop_id in enumerate(stop_ids_in_matrix)}
            
            total_distance = 0
            total_time = 0
            
            # Distance from depot to first stop (reversed route's first stop = was last)
            # Use haversine approximation
            first_stop = route_stops_phase1[0]
            depot_to_first_dist = math.sqrt(
                (depot_lat - first_stop["lat"])**2 + 
                (depot_lon - first_stop["lon"])**2
            ) * 111  # rough conversion to km
            route_stops_phase1[0]["distance_from_prev_km"] = round(depot_to_first_dist, 2)
            total_distance += depot_to_first_dist
            
            # Inter-stop distances using OSRM matrix
            for i in range(1, len(route_stops_phase1)):
                prev_stop = route_stops_phase1[i-1]
                curr_stop = route_stops_phase1[i]
                
                idx_prev = stop_index_map.get(prev_stop["stop_id"])
                idx_curr = stop_index_map.get(curr_stop["stop_id"])
                
                if idx_prev is not None and idx_curr is not None:
                    # Use distance from matrix (already have from Phase 1)
                    dist_m = distances[idx_prev][idx_curr]
                    dist_km = dist_m / 1000 if dist_m else 0
                else:
                    # Fallback to haversine
                    dist = math.sqrt(
                        (curr_stop["lat"] - prev_stop["lat"])**2 + 
                        (curr_stop["lon"] - prev_stop["lon"])**2
                    ) * 111
                    dist_km = dist
                
                route_stops_phase1[i]["distance_from_prev_km"] = round(dist_km, 2)
                total_distance += dist_km
            
            # Add distance from last stop to campus
            last_stop_reversed = route_stops_phase1[-1]
            last_to_campus = math.sqrt(
                (campus_lat - last_stop_reversed["lat"])**2 + 
                (campus_lon - last_stop_reversed["lon"])**2
            ) * 111
            total_distance += last_to_campus
            
            route_students = sum(s["students_boarding"] for s in route_stops_phase1)
            utilization = (route_students / bus["capacity"]) * 100
            
            # Check warnings
            route_warnings = []
            if route_time_phase1 > max_ride_time:
                route_warnings.append(f"Route exceeds max ride time ({route_time_phase1} > {max_ride_time} min)")
                global_warnings.append(f"Bus {bus['bus_no']}: Ride time {route_time_phase1}min exceeds limit")
            
            if utilization > 95:
                route_warnings.append(f"Bus at {utilization:.1f}% capacity")
            
            routes.append({
                "bus_id": bus["id"],
                "bus_no": bus["bus_no"],
                "capacity": bus["capacity"],
                "depot_id": depot_id,
                "depot_name": depot_name,
                "depot_lat": depot_lat,
                "depot_lon": depot_lon,
                "stops": route_stops_phase1,
                "total_students": route_students,
                "total_distance_km": round(total_distance, 2),
                "total_time_min": route_time_phase1,
                "capacity_utilization": round(utilization, 2),
                "warnings": route_warnings,
            })
            
            total_assigned += route_students
            logger.info(f"    Route {vehicle_id + 1}: {bus['bus_no']}, {len(route_stops_phase1)} stops, {route_students} students, {round(total_distance, 1)}km, depot: {depot_name}")
        
        # Find unassigned stops
        assigned_stop_ids = set()
        for route in routes:
            for stop in route["stops"]:
                assigned_stop_ids.add(stop["stop_id"])
        
        for stop_data in valid_stops:
            if stop_data["id"] not in assigned_stop_ids:
                unassigned.append({
                    "stop_id": stop_data["id"],
                    "name": stop_data["name"],
                    "reason": "Could not fit in any route within constraints"
                })
        
        # Stats
        total_students = sum(s["student_count"] for s in valid_stops)
        stats = {
            "total_buses_used": len(routes),
            "total_distance_km": sum(r["total_distance_km"] for r in routes),
            "total_time_min": max(r["total_time_min"] for r in routes) if routes else 0,
            "avg_utilization": sum(r["capacity_utilization"] for r in routes) / len(routes) if routes else 0,
            "total_students_assigned": total_assigned,
            "total_students_requested": total_students,
            "coverage_percentage": (total_assigned / total_students * 100) if total_students > 0 else 0,
            "unassigned_stops": unassigned,
            "global_warnings": global_warnings,
        }
        
        logger.info(f"  Final Summary: {len(routes)} routes, {total_assigned}/{total_students} students assigned")
        logger.info("[CVRPTW] Solver completed")
        logger.info("=" * 60)
        
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
