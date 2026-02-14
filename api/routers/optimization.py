"""Optimization router - Run optimization and manage solutions"""

from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db
from models import Solution
from schemas import (
    OptimizationRequest,
    OptimizationResponse,
    OptimizationListResponse,
    OptimizationSummary,
    OptimizationStats,
)
from services.optimizer import optimizer_service

router = APIRouter(prefix="/api/optimization", tags=["optimization"])


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
        formatted_route = {
            "bus_id": route["bus_id"],
            "bus_no": route["bus_no"],
            "capacity": route["capacity"],
            "stops": route["stops"],
            "total_students": route["total_students"],
            "total_distance_km": route["total_distance_km"],
            "total_time_min": route["total_time_min"],
            "capacity_utilization": route["capacity_utilization"],
            "warnings": route.get("warnings", []),
        }
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
