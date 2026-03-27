#!/usr/bin/env python3
"""
Standalone Optimizer Script

Loads data from CSV files, builds distance matrix via OSRM, and runs CVRPTW optimization.
Outputs comprehensive logs for debugging.

Usage:
    python scripts/run_optimizer.py [--limit-stops N] [--limit-buses M] [--semester SEM]
"""

import argparse
import csv
import logging
import sys
import time
from pathlib import Path

import httpx
from ortools.constraint_solver import routing_enums_pb2
from ortools.constraint_solver import pywrapcp

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

# Configuration
CONFIG = {
    "osrm_url": "http://localhost:5000",
    "campus_lat": 28.26,
    "campus_lon": 77.07,
    "max_bus_capacity": 50,
    "max_ride_time_min": 120,
    "arrival_deadline": "08:45",
    "optimization_timeout_sec": 60,
    "fuel_cost_per_km": 50.0,
}

DATA_DIR = Path(__file__).parent.parent / "data" / "raw"


def load_csv(filepath: Path) -> list[dict]:
    """Load CSV file and return list of dictionaries."""
    with open(filepath, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        return list(reader)


def load_stops(filepath: Path) -> list[dict]:
    """Load stops from CSV."""
    stops = load_csv(filepath)
    result = []
    for s in stops:
        if s.get("active", "").upper() == "TRUE":
            try:
                lat = float(s.get("latitude") or "")
                lon = float(s.get("longitude") or "")
                if lat and lon:  # Skip empty values
                    result.append({
                        "id": s["stop_id"],
                        "name": s["stop_name"],
                        "lat": lat,
                        "lon": lon,
                        "zone": s.get("zone", ""),
                    })
            except (ValueError, TypeError):
                continue  # Skip stops with invalid coordinates
    logger.info(f"Loaded {len(result)} active stops with valid coordinates from {filepath.name}")
    return result


def load_buses(filepath: Path, limit: int = None) -> list[dict]:
    """Load buses from CSV."""
    buses = load_csv(filepath)
    result = []
    for b in buses:
        result.append({
            "id": b["bus_id"],
            "bus_no": b["bus_no"],
            "capacity": int(b["capacity"]),
        })
    if limit:
        result = result[:limit]
        logger.info(f"Limited to {limit} buses")
    logger.info(f"Loaded {len(result)} buses from {filepath.name}")
    return result


def load_depots(filepath: Path) -> list[dict]:
    """Load depots from CSV."""
    depots = load_csv(filepath)
    result = []
    for d in depots:
        try:
            lat = float(d.get("lat") or "")
            lon = float(d.get("lon") or "")
            if lat and lon:  # Skip empty values
                result.append({
                    "id": d["depot_name"],  # Use name as ID
                    "name": d["depot_name"],
                    "lat": lat,
                    "lon": lon,
                })
        except (ValueError, TypeError):
            continue  # Skip depots with invalid coordinates
    logger.info(f"Loaded {len(result)} depots with valid coordinates from {filepath.name}")
    return result


def load_demand(filepath: Path, semester: str = None) -> dict:
    """Load demand from CSV, returns dict {stop_id: student_count}."""
    demand = load_csv(filepath)
    result = {}
    for d in demand:
        stop_id = d["stop_id"]
        sem = d.get("semester", "")
        count = int(d.get("student_count", 0))
        
        # Filter by semester if specified
        if semester and sem != semester:
            continue
        
        if count > 0:
            result[stop_id] = count
    
    logger.info(f"Loaded demand for {len(result)} stops (semester: {semester or 'all'})")
    return result


def merge_stops_with_demand(stops: list[dict], demand: dict) -> list[dict]:
    """Merge stops with demand data."""
    result = []
    for s in stops:
        student_count = demand.get(s["id"], 0)
        if student_count > 0:
            result.append({
                **s,
                "student_count": student_count,
            })
    
    logger.info(f"Merged {len(result)} stops with demand")
    return result


class OsrmClient:
    """Simple OSRM client for distance matrix."""
    
    def __init__(self, base_url: str):
        self.base_url = base_url
        self.client = httpx.Client(timeout=300.0)
    
    def health_check(self) -> bool:
        try:
            resp = self.client.get(f"{self.base_url}/nearest/v1/driving/77.0,28.5")
            return resp.status_code == 200
        except Exception:
            return False
    
    def get_table(self, coordinates: list[tuple[float, float]]) -> dict:
        """Get distance/time matrix from OSRM."""
        n = len(coordinates)
        if n <= 100:
            return self._fetch_table(coordinates)
        
        # Batch for larger matrices
        durations = [[0.0] * n for _ in range(n)]
        distances = [[0.0] * n for _ in range(n)]
        
        batch_size = 80
        
        for src_start in range(0, n, batch_size):
            src_end = min(src_start + batch_size, n)
            src_coords = coordinates[src_start:src_end]
            
            for dst_start in range(0, n, batch_size):
                dst_end = min(dst_start + batch_size, n)
                dst_coords = coordinates[dst_start:dst_end]
                
                combined = src_coords + dst_coords
                src_indices = list(range(len(src_coords)))
                dst_indices = list(range(len(src_coords), len(combined)))
                
                result = self._fetch_table(combined, src_indices, dst_indices)
                
                for si, src_idx in enumerate(range(src_start, src_end)):
                    for di, dst_idx in enumerate(range(dst_start, dst_end)):
                        dur = result["durations"][si][di]
                        dist = result["distances"][si][di]
                        durations[src_idx][dst_idx] = dur if dur is not None else -1
                        distances[src_idx][dst_idx] = dist if dist is not None else -1
        
        return {"durations": durations, "distances": distances}
    
    def _fetch_table(self, coordinates, sources=None, destinations=None) -> dict:
        coords_str = ";".join(f"{lon},{lat}" for lat, lon in coordinates)
        url = f"{self.base_url}/table/v1/driving/{coords_str}"
        params = {"annotations": "duration,distance"}
        
        if sources is not None:
            params["sources"] = ";".join(str(s) for s in sources)
        if destinations is not None:
            params["destinations"] = ";".join(str(s) for s in destinations)
        
        resp = self.client.get(url, params=params)
        data = resp.json()
        
        if resp.status_code != 200 or data.get("code") != "Ok":
            raise Exception(f"OSRM error: {data.get('message', data.get('code'))}")
        
        return data


def time_to_minutes(time_str: str) -> int:
    """Convert HH:MM to minutes from midnight."""
    parts = time_str.split(":")
    return int(parts[0]) * 60 + int(parts[1])


def minutes_to_time(minutes: int) -> str:
    """Convert minutes from midnight to HH:MM."""
    hours = minutes // 60
    mins = minutes % 60
    return f"{hours:02d}:{mins:02d}"


def solve_cvrptw(
    stops_with_demand: list[dict],
    buses: list[dict],
    depots: list[dict],
    osrm_client: OsrmClient,
    config: dict,
    timeout: int = 60,
) -> tuple[list[dict], dict]:
    """Build and solve CVRPTW - Two Phase Approach.
    
    Phase 1: Solve VRP starting from campus (Campus → Stops → Campus)
    Phase 2: Find closest depot to LAST stop, then reverse route
    Final: Depot → (reversed stops) → Campus
    """
    
    logger.info("=" * 60)
    logger.info("[CVRPTW] Starting solver setup...")
    
    num_stops = len(stops_with_demand)
    num_vehicles = len(buses)
    
    # Simple graph: campus (0) + stops (1..n)
    campus_index = 0
    stop_id_to_index = {s["id"]: i + 1 for i, s in enumerate(stops_with_demand)}
    index_to_stop = {i + 1: s for i, s in enumerate(stops_with_demand)}
    num_nodes = num_stops + 1
    
    logger.info(f"  Phase 1: {num_nodes} nodes (campus + {num_stops} stops)")
    logger.info(f"  {num_vehicles} vehicles, {sum(b['capacity'] for b in buses)} capacity")
    
    # Build coordinate list
    coordinates = [(s["lat"], s["lon"]) for s in stops_with_demand]
    
    # OSRM call
    logger.info("  Calling OSRM Table API...")
    t0 = time.time()
    table_result = osrm_client.get_table(coordinates)
    durations = table_result["durations"]
    distances = table_result["distances"]
    logger.info(f"  OSRM response: {time.time() - t0:.2f}s")
    
    # Build matrices
    time_matrix = [[0] * num_nodes for _ in range(num_nodes)]
    distance_matrix = [[0] * num_nodes for _ in range(num_nodes)]
    
    for i in range(num_stops):
        for j in range(num_stops):
            idx_i, idx_j = i + 1, j + 1
            dur_sec = durations[i][j]
            time_matrix[idx_i][idx_j] = int(dur_sec / 60) if dur_sec and dur_sec > 0 else 0
            dist_m = distances[i][j]
            distance_matrix[idx_i][idx_j] = dist_m / 1000 if dist_m else 0
    
    for i in range(1, num_nodes):
        time_matrix[0][i] = 1
        time_matrix[i][0] = 5
        distance_matrix[i][0] = 0
        distance_matrix[0][i] = 0
    
    demands = [0] + [s["student_count"] for s in stops_with_demand]
    vehicle_capacities = [b["capacity"] for b in buses]
    starts = [campus_index] * num_vehicles
    ends = [campus_index] * num_vehicles
    
    deadline_minutes = time_to_minutes(config["arrival_deadline"])
    logger.info(f"  Deadline: {config['arrival_deadline']} = {deadline_minutes} min")
    
    # Build model
    logger.info("  Building OR-Tools model...")
    manager = pywrapcp.RoutingIndexManager(num_nodes, num_vehicles, starts, ends)
    routing = pywrapcp.RoutingModel(manager)
    
    def time_callback(from_index, to_index):
        from_node = manager.IndexToNode(from_index)
        to_node = manager.IndexToNode(to_index)
        return time_matrix[from_node][to_node]
    
    transit_callback_index = routing.RegisterTransitCallback(time_callback)
    routing.SetArcCostEvaluatorOfAllVehicles(transit_callback_index)
    
    routing.AddDimension(transit_callback_index, slack_max=30, capacity=config["max_ride_time_min"],
                        fix_start_cumul_to_zero=False, name="Time")
    time_dimension = routing.GetDimensionOrDie("Time")
    routing.GetDimensionOrDie("Time").CumulVar(manager.NodeToIndex(campus_index)).SetRange(0, deadline_minutes)
    
    def demand_callback(from_index):
        return demands[manager.IndexToNode(from_index)]
    
    demand_callback_index = routing.RegisterUnaryTransitCallback(demand_callback)
    routing.AddDimensionWithVehicleCapacity(demand_callback_index, slack_max=0, vehicle_capacities=vehicle_capacities,
                                            fix_start_cumul_to_zero=True, name="Capacity")
    
    search_parameters = pywrapcp.DefaultRoutingSearchParameters()
    search_parameters.first_solution_strategy = routing_enums_pb2.FirstSolutionStrategy.PATH_CHEAPEST_ARC
    search_parameters.local_search_metaheuristic = routing_enums_pb2.LocalSearchMetaheuristic.AUTOMATIC
    search_parameters.time_limit.FromSeconds(timeout)
    
    logger.info(f"  Starting solver... (timeout: {timeout}s)")
    
    import sys
    sys.stdout.flush()
    
    solution = routing.SolveWithParameters(search_parameters)
    
    if not solution:
        logger.error("No solution found!")
        raise Exception("No feasible solution")
    
    logger.info(f"  Phase 1 complete!")
    
    # ============================================================
    # PHASE 2: Assign depot to LAST stop, then reverse
    # ============================================================
    logger.info("=" * 60)
    logger.info("[PHASE 2] Assigning depots and reversing routes...")
    
    import math
    routes = []
    total_assigned = 0
    
    for vehicle_id in range(num_vehicles):
        bus = buses[vehicle_id]
        index = routing.Start(vehicle_id)
        route_stops = []
        
        while not routing.IsEnd(index):
            node_index = manager.IndexToNode(index)
            
            if node_index != campus_index and node_index in index_to_stop:
                stop_data = index_to_stop[node_index]
                arrival_time = solution.Value(time_dimension.CumulVar(index))
                route_stops.append({
                    "stop_id": stop_data["id"],
                    "stop_name": stop_data["name"],
                    "lat": stop_data["lat"],
                    "lon": stop_data["lon"],
                    "arrival_time": minutes_to_time(arrival_time),
                    "students_boarding": stop_data["student_count"],
                    "cumulative_time_min": arrival_time,
                })
            
            index = solution.Value(routing.NextVar(index))
        
        if len(route_stops) > 0:
            # Find closest depot to the LAST stop (before reversing)
            last_stop = route_stops[-1]
            min_dist = float('inf')
            closest_depot = None
            
            for depot in depots:
                dist = math.sqrt((depot["lat"] - last_stop["lat"])**2 + (depot["lon"] - last_stop["lon"])**2)
                if dist < min_dist:
                    min_dist = dist
                    closest_depot = depot
            
            # REVERSE the route!
            route_stops.reverse()
            
            # Build stop lookup for distance matrix
            stop_index_map = {s["id"]: i for i, s in enumerate(stops_with_demand)}
            
            # Calculate proper distances
            total_distance = 0
            total_time = 0
            
            # Distance from depot to first stop
            depot_to_first_dist = math.sqrt(
                (closest_depot["lat"] - route_stops[0]["lat"])**2 + 
                (closest_depot["lon"] - route_stops[0]["lon"])**2
            ) * 111  # rough km
            route_stops[0]["distance_from_prev_km"] = round(depot_to_first_dist, 2)
            total_distance += depot_to_first_dist
            
            # Inter-stop distances using OSRM matrix
            for i in range(1, len(route_stops)):
                prev_stop = route_stops[i-1]
                curr_stop = route_stops[i]
                
                idx_prev = stop_index_map.get(prev_stop["stop_id"])
                idx_curr = stop_index_map.get(curr_stop["stop_id"])
                
                if idx_prev is not None and idx_curr is not None:
                    dist_m = distances[idx_prev][idx_curr]
                    dist_km = dist_m / 1000 if dist_m else 0
                else:
                    # Fallback to haversine
                    dist = math.sqrt(
                        (curr_stop["lat"] - prev_stop["lat"])**2 + 
                        (curr_stop["lon"] - prev_stop["lon"])**2
                    ) * 111
                    dist_km = dist
                
                route_stops[i]["distance_from_prev_km"] = round(dist_km, 2)
                total_distance += dist_km
            
            # Add distance from last stop to campus (rough)
            last_stop = route_stops[-1]
            campus_lat = config.get("campus_lat", 28.26)
            campus_lon = config.get("campus_lon", 77.07)
            last_to_campus = math.sqrt(
                (campus_lat - last_stop["lat"])**2 + 
                (campus_lon - last_stop["lon"])**2
            ) * 111
            total_distance += last_to_campus
            
            utilization = (sum(s["students_boarding"] for s in route_stops) / bus["capacity"]) * 100
            
            routes.append({
                "bus_id": bus["id"],
                "bus_no": bus["bus_no"],
                "capacity": bus["capacity"],
                "depot_id": closest_depot["id"],
                "depot_name": closest_depot["name"],
                "depot_lat": closest_depot["lat"],
                "depot_lon": closest_depot["lon"],
                "stops": route_stops,
                "total_students": sum(s["students_boarding"] for s in route_stops),
                "total_distance_km": round(total_distance, 2),
                "total_time_min": 0,  # Not calculating time after reversal
                "capacity_utilization": round(utilization, 2),
            })
            
            total_assigned += routes[-1]["total_students"]
            logger.info(f"    Route {vehicle_id + 1}: {bus['bus_no']}, {len(route_stops)} stops, {round(total_distance,1)}km, depot: {closest_depot['name']}")
    
    total_students = sum(s["student_count"] for s in stops_with_demand)
    stats = {
        "total_buses_used": len(routes),
        "total_distance_km": sum(r["total_distance_km"] for r in routes),
        "total_students_assigned": total_assigned,
        "total_students_requested": total_students,
        "coverage_percentage": (total_assigned / total_students * 100) if total_students > 0 else 0,
    }
    
    logger.info(f"  Final: {len(routes)} routes, {total_assigned}/{total_students} students")
    
    return routes, stats
    
    logger.info(f"  Solver finished in {solve_time:.2f}s")
    
    if not solution:
        logger.error("  Solver returned NO SOLUTION")
        raise Exception("No feasible solution found")
    
    logger.info(f"  Solution found! Objective: {solution.ObjectiveValue()}")
    
    # Parse solution
    logger.info("  Parsing solution...")
    routes = []
    total_assigned = 0
    
    # Depot mapping
    depot_coords_map = {d["id"]: {"lat": d["lat"], "lon": d["lon"], "name": d["name"]} for d in depots}
    
    for vehicle_id in range(num_vehicles):
        bus = buses[vehicle_id]
        index = routing.Start(vehicle_id)
        route_stops = []
        route_distance = 0
        route_time = 0
        route_students = 0
        route_depot_id = None
        route_depot_name = None
        route_depot_lat = None
        route_depot_lon = None
        prev_node = None
        
        while not routing.IsEnd(index):
            node_index = manager.IndexToNode(index)
            
            # Check if depot (start point)
            if node_index in depot_id_to_index:
                depot_id = index_to_depot_id.get(node_index)
                if depot_id and depot_id not in [r["depot_id"] for r in routes]:
                    route_depot_id = depot_id
                    depot_info = depot_coords_map.get(depot_id, {})
                    route_depot_name = depot_info.get("name", "Unknown")
                    route_depot_lat = depot_info.get("lat", 0.0)
                    route_depot_lon = depot_info.get("lon", 0.0)
            
            # Check if stop (not campus, not depot)
            if node_index != campus_index and node_index in index_to_stop:
                stop_data = index_to_stop[node_index]
                
                time_var = time_dimension.CumulVar(index)
                arrival_time = solution.Value(time_var)
                arrival_str = minutes_to_time(arrival_time)
                
                dist_from_prev = 0
                if prev_node is not None:
                    dist_from_prev = distance_matrix[prev_node][node_index]
                
                route_stops.append({
                    "stop_id": stop_data["id"],
                    "stop_name": stop_data["name"],
                    "arrival_time": arrival_str,
                    "students_boarding": stop_data["student_count"],
                    "cumulative_time_min": arrival_time,
                    "distance_from_prev_km": round(dist_from_prev, 2),
                })
                
                route_students += stop_data["student_count"]
            
            prev_node = node_index
            previous_index = index
            index = solution.Value(routing.NextVar(index))
            
            # Update time/distance if valid nodes
            from_node = manager.IndexToNode(previous_index)
            to_node = manager.IndexToNode(index)
            if from_node < num_nodes and to_node < num_nodes:
                route_time += time_matrix[from_node][to_node]
                route_distance += distance_matrix[from_node][to_node]
        
        # If route has stops but depot not found, find closest depot to first stop
        if len(route_stops) > 0 and not route_depot_id and depots:
            first_stop = route_stops[0]
            min_dist = float('inf')
            closest_depot = None
            for d in depots:
                import math
                dist = math.sqrt((d["lat"] - first_stop.get("lat", 0))**2 + (d["lon"] - first_stop.get("lon", 0))**2)
                if dist < min_dist:
                    min_dist = dist
                    closest_depot = d
            if closest_depot:
                route_depot_id = closest_depot["id"]
                route_depot_name = closest_depot["name"]
                route_depot_lat = closest_depot["lat"]
                route_depot_lon = closest_depot["lon"]
        
        if len(route_stops) > 0:
            utilization = (route_students / bus["capacity"]) * 100
            
            routes.append({
                "bus_id": bus["id"],
                "bus_no": bus["bus_no"],
                "capacity": bus["capacity"],
                "depot_id": route_depot_id or "unknown",
                "depot_name": route_depot_name or "Unknown",
                "depot_lat": route_depot_lat or 0.0,
                "depot_lon": route_depot_lon or 0.0,
                "stops": route_stops,
                "total_students": route_students,
                "total_distance_km": round(route_distance, 2),
                "total_time_min": route_time,
                "capacity_utilization": round(utilization, 2),
            })
            
            total_assigned += route_students
            logger.info(f"    Route {vehicle_id + 1}: {bus['bus_no']}, {len(route_stops)} stops, {route_students} students, {route_distance:.1f}km, depot: {route_depot_name}")
    
    # Stats
    total_students = sum(s["student_count"] for s in stops_with_demand)
    stats = {
        "total_buses_used": len(routes),
        "total_distance_km": sum(r["total_distance_km"] for r in routes),
        "total_students_assigned": total_assigned,
        "total_students_requested": total_students,
        "coverage_percentage": (total_assigned / total_students * 100) if total_students > 0 else 0,
    }
    
    logger.info(f"  Summary: {len(routes)} routes, {total_assigned}/{total_students} students ({stats['coverage_percentage']:.1f}%)")
    
    return routes, stats


def main():
    parser = argparse.ArgumentParser(description="Run standalone optimizer")
    parser.add_argument("--limit-stops", type=int, default=None, help="Limit number of stops for testing")
    parser.add_argument("--limit-buses", type=int, default=None, help="Limit number of buses for testing")
    parser.add_argument("--semester", type=str, default="ODD-2025", help="Semester to use")
    parser.add_argument("--osrm-url", type=str, default=CONFIG["osrm_url"], help="OSRM URL")
    parser.add_argument("--timeout", type=int, default=CONFIG["optimization_timeout_sec"], help="Solver timeout in seconds")
    parser.add_argument("--verbose", action="store_true", help="Verbose solver output")
    
    args = parser.parse_args()
    
    logger.info("=" * 60)
    logger.info("OPTIMIZER SCRIPT STARTED")
    logger.info("=" * 60)
    
    try:
        # Load data
        logger.info("[STEP 1] Loading data from CSV files...")
        
        stops = load_stops(DATA_DIR / "stops.csv")
        buses = load_buses(DATA_DIR / "buses.csv", args.limit_buses)
        depots = load_depots(DATA_DIR / "depot.csv")
        demand = load_demand(DATA_DIR / "demand.csv", args.semester)
        
        # Apply limit to stops
        if args.limit_stops:
            stops = stops[:args.limit_stops]
            logger.info(f"Limited to {args.limit_stops} stops for testing")
        
        # Merge stops with demand
        stops_with_demand = merge_stops_with_demand(stops, demand)
        total_students = sum(s["student_count"] for s in stops_with_demand)
        total_capacity = sum(b["capacity"] for b in buses)
        
        logger.info(f"  Total stops with demand: {len(stops_with_demand)}")
        logger.info(f"  Total students: {total_students}")
        logger.info(f"  Total buses: {len(buses)}")
        logger.info(f"  Total capacity: {total_capacity}")
        
        if total_students > total_capacity:
            logger.error(f"CAPACITY ERROR: {total_students} students > {total_capacity} capacity")
            print("FAILURE")
            sys.exit(1)
        
        # Check OSRM
        logger.info("[STEP 2] Checking OSRM connection...")
        osrm = OsrmClient(args.osrm_url)
        if not osrm.health_check():
            logger.error("OSRM is not reachable!")
            print("FAILURE")
            sys.exit(1)
        logger.info("OSRM is healthy")
        
        # Run optimization
        logger.info("[STEP 3] Running CVRPTW optimization...")
        routes, stats = solve_cvrptw(
            stops_with_demand=stops_with_demand,
            buses=buses,
            depots=depots,
            osrm_client=osrm,
            config=CONFIG,
            timeout=args.timeout,
        )
        
        # Output results
        logger.info("=" * 60)
        logger.info("SOLUTION FOUND")
        logger.info(f"  Routes: {len(routes)}")
        logger.info(f"  Students: {stats['total_students_assigned']}/{stats['total_students_requested']}")
        logger.info(f"  Coverage: {stats['coverage_percentage']:.1f}%")
        logger.info(f"  Distance: {stats['total_distance_km']:.1f} km")
        logger.info("=" * 60)
        
        print("SUCCESS")
        
    except Exception as e:
        logger.error("=" * 60)
        logger.error(f"OPTIMIZATION FAILED: {e}")
        logger.error("=" * 60)
        print("FAILURE")
        sys.exit(1)


if __name__ == "__main__":
    main()
