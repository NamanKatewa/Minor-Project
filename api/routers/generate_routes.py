"""Route Generation router - Prepare and run route optimization"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select, text, distinct, desc
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db
from models import RoutePlan, Demand, DistanceMatrix
from schemas import (
    RouteGenerationRequest,
    RoutePlanRead,
    RouteGenerationReadyResponse,
    BusRoute,
    RoutePlanStats,
)
from services.optimizer import optimizer_service

router = APIRouter(prefix="/api/generate-routes", tags=["generate-routes"])


@router.get("/ready", response_model=RouteGenerationReadyResponse)
async def get_route_generation_ready(session: AsyncSession = Depends(get_db)):
    """
    Get all data needed to prepare for a route generation run in a single call.
    Checks prerequisites like stops, buses, demand, and matrix status.
    """
    # 1. Fetch counts
    count_query = text("""
        SELECT 
            (SELECT COUNT(DISTINCT s.id) FROM stops s JOIN demand d ON s.id = d.stop_id WHERE s.active = true AND d.student_count > 0) as stops_count,
            (SELECT COUNT(*) FROM buses) as buses_count,
            (SELECT COUNT(*) FROM demand WHERE student_count > 0) as demand_records_count,
            (SELECT COALESCE(SUM(student_count), 0) FROM demand) as total_students_count,
            (SELECT COALESCE(SUM(capacity), 0) FROM buses) as total_fleet_capacity
    """)
    count_result = await session.execute(count_query)
    counts = count_result.one()
    
    # 2. Fetch semesters
    semesters_res = await session.execute(
        select(distinct(Demand.semester)).where(Demand.semester != None)
    )
    semesters = semesters_res.scalars().all()
    
    # 3. Fetch latest matrix info
    matrix_res = await session.execute(
        select(DistanceMatrix.stop_count)
        .order_by(desc(DistanceMatrix.created_at))
        .limit(1)
    )
    matrix_stop_count = matrix_res.scalar_one_or_none()

    return RouteGenerationReadyResponse(
        semesters=list(semesters),
        stops_count=counts[0],
        buses_count=counts[1],
        demand_records_count=counts[2],
        total_students_count=counts[3],
        total_fleet_capacity=counts[4],
        latest_matrix_stop_count=matrix_stop_count,
        has_matrix=matrix_stop_count is not None
    )


@router.post("/run", response_model=RoutePlanRead, status_code=201)
async def run_route_generation(
    request: RouteGenerationRequest,
    session: AsyncSession = Depends(get_db),
):
    """
    Run route optimization and store the resulting route plan.
    
    This endpoint triggers the CVRPTW solver which:
    - Assigns stops to buses based on demand
    - Respects capacity constraints
    - Ensures campus arrival by specified deadline
    - Minimizes total travel distance
    
    Returns the generated route plan with routes, stats, and cost estimate.
    """
    try:
        route_plan = await optimizer_service.optimize(
            session=session,
            scenario_type=request.scenario_type,
            semester=request.semester,
            matrix_id=request.matrix_id,
            fuel_cost_per_km=request.fuel_cost_per_km,
            bus_ids=request.bus_ids,
            max_ride_time_min=request.max_ride_time_min,
            arrival_deadline=request.arrival_deadline,
        )
        
        # Format response
        return _format_route_plan_response(route_plan)
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Route generation failed: {str(e)}"
        )


def _format_route_plan_response(route_plan: RoutePlan) -> RoutePlanRead:
    """Convert RoutePlan model to RoutePlanRead schema"""
    
    routes_data = route_plan.routes_json.get("routes", []) if route_plan.routes_json else []
    stats_data = route_plan.stats_json or {}
    
    formatted_routes = []
    for route in routes_data:
        formatted_route = BusRoute(
            bus_id=route["bus_id"],
            bus_no=route["bus_no"],
            capacity=route["capacity"],
            depot_id=route.get("depot_id") or route.get("depot_id", ""),
            depot_name=route.get("depot_name"),
            depot_lat=route.get("depot_lat", 0.0),
            depot_lon=route.get("depot_lon", 0.0),
            stops=route["stops"],
            geometry=route.get("geometry"),
            total_students=route["total_students"],
            total_distance_km=route["total_distance_km"],
            total_time_min=route["total_time_min"],
            capacity_utilization=route["capacity_utilization"],
            warnings=route.get("warnings", []),
        )
        formatted_routes.append(formatted_route)
    
    formatted_stats = {
        "total_buses_used": stats_data.get("total_buses_used", 0),
        "total_distance_km": stats_data.get("total_distance_km", 0),
        "total_time_min": stats_data.get("total_time_min", 0),
        "avg_utilization": stats_data.get("avg_utilization", 0),
        "total_students_assigned": stats_data.get("total_students_assigned", 0),
        "total_students_requested": stats_data.get("total_students_requested", 0),
        "coverage_percentage": stats_data.get("coverage_percentage", 0),
        "unassigned_stops": stats_data.get("unassigned_stops", []),
        "global_warnings": stats_data.get("global_warnings", []),
        "solve_time_seconds": stats_data.get("solve_time_seconds", 0),
        "model_build_time_seconds": stats_data.get("model_build_time_seconds", 0),
    }
    
    return RoutePlanRead(
        id=route_plan.id,
        scenario_type=route_plan.scenario_type,
        routes=formatted_routes,
        stats=RoutePlanStats(**formatted_stats),
        cost_estimate=route_plan.cost_estimate or 0,
        fuel_cost_per_km=route_plan.cost_estimate / stats_data.get("total_distance_km", 1) if route_plan.cost_estimate else 50.0,
        created_at=route_plan.created_at,
        semester=None,
    )
