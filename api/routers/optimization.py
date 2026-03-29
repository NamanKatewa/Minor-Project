"""Optimization router - Run optimization and manage solutions"""

from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select, text, distinct, desc, func
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db
from models import Solution, Demand, DistanceMatrix
from schemas import (
    OptimizationRequest,
    OptimizationResponse,
    OptimizationListResponse,
    OptimizationSummary,
    OptimizationStats,
    BusRoute,
    OptimizationReadyResponse,
    OptimizationHistoryResponse,
)
from services.optimizer import optimizer_service

router = APIRouter(prefix="/api/optimization", tags=["optimization"])


@router.get("/history", response_model=OptimizationHistoryResponse)
async def get_optimization_history(
    limit: int = 20,
    offset: int = 0,
    scenario_type: str | None = None,
    session: AsyncSession = Depends(get_db)
):
    """
    Get optimization history with minimal data transfer.
    """
    # Optimized query: only select metadata and summary stats from JSON
    # This avoids loading the massive routes_json blob for every history item
    query = select(
        Solution.id,
        Solution.scenario_type,
        Solution.cost_estimate,
        Solution.created_at,
        Solution.stats_json
    )
    
    if scenario_type:
        query = query.where(Solution.scenario_type == scenario_type)
    
    # Run count and data fetch sequentially (SQLAlchemy sessions are not thread-safe for parallel calls)
    count_res = await session.execute(select(func.count()).select_from(query.subquery()))
    total_count = count_res.scalar() or 0
    
    result = await session.execute(
        query.order_by(Solution.created_at.desc()).limit(limit).offset(offset)
    )
    solutions = result.all()

    solution_summaries = []
    for s in solutions:
        stats_json = s.stats_json or {}
        solution_summaries.append(
            OptimizationSummary(
                id=s.id,
                scenario_type=s.scenario_type,
                total_buses=stats_json.get("total_buses_used", 0),
                total_distance_km=stats_json.get("total_distance_km", 0.0),
                total_students=stats_json.get("total_students_assigned", 0),
                cost_estimate=s.cost_estimate or 0.0,
                coverage_percentage=stats_json.get("coverage_percentage", 0.0),
                has_warnings=len(stats_json.get("global_warnings", [])) > 0,
                created_at=s.created_at,
            )
        )

    return OptimizationHistoryResponse(
        solutions_data=OptimizationListResponse(
            solutions=solution_summaries,
            count=total_count,
            limit=limit,
            offset=offset
        )
    )


@router.get("/ready", response_model=OptimizationReadyResponse)
async def get_optimization_ready(session: AsyncSession = Depends(get_db)):
    """
    Get all data needed to prepare for an optimization run in a single call.
    Checks prerequisites like stops, buses, demand, and matrix status.
    """
    # 1. Fetch counts
    count_query = text("""
        SELECT 
            (SELECT COUNT(*) FROM stops WHERE active = true) as stops_count,
            (SELECT COUNT(*) FROM buses) as buses_count,
            (SELECT COUNT(*) FROM demand) as demand_records_count,
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

    return OptimizationReadyResponse(
        semesters=list(semesters),
        stops_count=counts[0],
        buses_count=counts[1],
        demand_records_count=counts[2],
        total_students_count=counts[3],
        total_fleet_capacity=counts[4],
        latest_matrix_stop_count=matrix_stop_count,
        has_matrix=matrix_stop_count is not None
    )


@router.post("/run", response_model=OptimizationResponse, status_code=201)
async def run_optimization(
    request: OptimizationRequest,
    session: AsyncSession = Depends(get_db),
):
    """
    Run route optimization and store the solution.
    
    This endpoint triggers the CVRPTW solver which:
    - Assigns stops to buses based on demand
    - Respects capacity constraints (max 50 students)
    - Ensures campus arrival by specified deadline
    - Minimizes total travel distance
    
    Returns the generated solution with routes, stats, and cost estimate.
    """
    try:
        solution = await optimizer_service.optimize(
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
        return _format_solution_response(solution)
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Optimization failed: {str(e)}"
        )


@router.get("/solutions", response_model=OptimizationListResponse)
async def list_solutions(
    limit: int = 20,
    offset: int = 0,
    scenario_type: str | None = None,
    session: AsyncSession = Depends(get_db),
):
    """
    List all optimization runs (history).
    
    Returns a paginated list of solutions with summary information.
    Use this to view historical optimization results.
    """
    query = select(Solution).order_by(Solution.created_at.desc())
    
    if scenario_type:
        query = query.where(Solution.scenario_type == scenario_type)
    
    # Get total count
    count_result = await session.execute(
        select(select(Solution).subquery().c.id)
    )
    total_count = len(count_result.all())
    
    # Get paginated results
    query = query.offset(offset).limit(limit)
    result = await session.execute(query)
    solutions = result.scalars().all()
    
    summaries = []
    for sol in solutions:
        stats = sol.stats_json or {}
        routes = sol.routes_json.get("routes", []) if sol.routes_json else []
        
        summary = OptimizationSummary(
            id=sol.id,
            scenario_type=sol.scenario_type,
            total_buses=len(routes),
            total_distance_km=stats.get("total_distance_km", 0),
            total_students=stats.get("total_students_assigned", 0),
            cost_estimate=sol.cost_estimate or 0,
            coverage_percentage=stats.get("coverage_percentage", 0),
            has_warnings=len(stats.get("global_warnings", [])) > 0 or len(stats.get("unassigned_stops", [])) > 0,
            created_at=sol.created_at,
        )
        summaries.append(summary)
    
    return OptimizationListResponse(
        solutions=summaries,
        count=total_count,
        limit=limit,
        offset=offset,
    )


@router.get("/solutions/latest", response_model=OptimizationResponse)
async def get_latest_solution(
    session: AsyncSession = Depends(get_db),
):
    """Get the most recent optimization solution."""
    result = await session.execute(
        select(Solution).order_by(Solution.created_at.desc()).limit(1)
    )
    solution = result.scalar_one_or_none()
    
    if not solution:
        raise HTTPException(
            status_code=404,
            detail="No optimization solutions found. Run optimization first."
        )
    
    return _format_solution_response(solution)


@router.get("/solutions/{solution_id}", response_model=OptimizationResponse)
async def get_solution(
    solution_id: UUID,
    session: AsyncSession = Depends(get_db),
):
    """Get a specific optimization solution by ID."""
    result = await session.execute(
        select(Solution).where(Solution.id == solution_id)
    )
    solution = result.scalar_one_or_none()
    
    if not solution:
        raise HTTPException(
            status_code=404,
            detail=f"Solution {solution_id} not found"
        )
    
    return _format_solution_response(solution)


@router.delete("/solutions/{solution_id}", status_code=204)
async def delete_solution(
    solution_id: UUID,
    session: AsyncSession = Depends(get_db),
):
    """Delete an optimization solution from history."""
    result = await session.execute(
        select(Solution).where(Solution.id == solution_id)
    )
    solution = result.scalar_one_or_none()
    
    if not solution:
        raise HTTPException(
            status_code=404,
            detail=f"Solution {solution_id} not found"
        )
    
    await session.delete(solution)
    await session.commit()


def _format_solution_response(solution: Solution) -> OptimizationResponse:
    """Convert Solution model to OptimizationResponse schema"""
    
    routes_data = solution.routes_json.get("routes", []) if solution.routes_json else []
    stats_data = solution.stats_json or {}
    
    # Parse routes with proper typing
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
    
    # Parse stats
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
    
    return OptimizationResponse(
        id=solution.id,
        scenario_type=solution.scenario_type,
        routes=formatted_routes,
        stats=OptimizationStats(**formatted_stats),
        cost_estimate=solution.cost_estimate or 0,
        fuel_cost_per_km=solution.cost_estimate / stats_data.get("total_distance_km", 1) if solution.cost_estimate else 50.0,
        created_at=solution.created_at,
        semester=None,
    )
