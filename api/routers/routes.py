"""Routes router - Manage saved route plans"""

from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select, desc, func
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db
from models import RoutePlan
from schemas import (
    RoutePlanRead,
    RoutePlanListResponse,
    RoutePlanSummary,
    RoutePlanStats,
    BusRoute,
    RoutePlanHistoryResponse,
)

router = APIRouter(prefix="/routes", tags=["routes"])


@router.get("/history", response_model=RoutePlanHistoryResponse)
async def get_route_plan_history(
    limit: int = 20,
    offset: int = 0,
    scenario_type: str | None = None,
    session: AsyncSession = Depends(get_db)
):
    """
    Get route plan history with minimal data transfer.
    """
    query = select(
        RoutePlan.id,
        RoutePlan.scenario_type,
        RoutePlan.cost_estimate,
        RoutePlan.created_at,
        RoutePlan.stats_json
    )
    
    if scenario_type:
        query = query.where(RoutePlan.scenario_type == scenario_type)
    
    count_res = await session.execute(select(func.count()).select_from(query.subquery()))
    total_count = count_res.scalar() or 0
    
    result = await session.execute(
        query.order_by(RoutePlan.created_at.desc()).limit(limit).offset(offset)
    )
    route_plans = result.all()

    summaries = []
    for rp in route_plans:
        stats_json = rp.stats_json or {}
        summaries.append(
            RoutePlanSummary(
                id=rp.id,
                scenario_type=rp.scenario_type,
                total_buses=stats_json.get("total_buses_used", 0),
                total_distance_km=stats_json.get("total_distance_km", 0.0),
                total_students=stats_json.get("total_students_assigned", 0),
                cost_estimate=rp.cost_estimate or 0.0,
                coverage_percentage=stats_json.get("coverage_percentage", 0.0),
                has_warnings=len(stats_json.get("global_warnings", [])) > 0,
                created_at=rp.created_at,
            )
        )

    return RoutePlanHistoryResponse(
        solutions_data=RoutePlanListResponse(
            solutions=summaries,
            count=total_count,
            limit=limit,
            offset=offset
        )
    )


@router.get("/", response_model=RoutePlanListResponse)
async def list_route_plans(
    limit: int = 20,
    offset: int = 0,
    scenario_type: str | None = None,
    session: AsyncSession = Depends(get_db),
):
    """
    List all route plans (history).
    """
    query = select(RoutePlan).order_by(RoutePlan.created_at.desc())
    
    if scenario_type:
        query = query.where(RoutePlan.scenario_type == scenario_type)
    
    count_result = await session.execute(
        select(func.count()).select_from(select(RoutePlan).subquery())
    )
    total_count = count_result.scalar() or 0
    
    query = query.offset(offset).limit(limit)
    result = await session.execute(query)
    route_plans = result.scalars().all()
    
    summaries = []
    for rp in route_plans:
        stats = rp.stats_json or {}
        routes = rp.routes_json.get("routes", []) if rp.routes_json else []
        
        summary = RoutePlanSummary(
            id=rp.id,
            scenario_type=rp.scenario_type,
            total_buses=len(routes),
            total_distance_km=stats.get("total_distance_km", 0),
            total_students=stats.get("total_students_assigned", 0),
            cost_estimate=rp.cost_estimate or 0,
            coverage_percentage=stats.get("coverage_percentage", 0),
            has_warnings=len(stats.get("global_warnings", [])) > 0 or len(stats.get("unassigned_stops", [])) > 0,
            created_at=rp.created_at,
        )
        summaries.append(summary)
    
    return RoutePlanListResponse(
        solutions=summaries,
        count=total_count,
        limit=limit,
        offset=offset,
    )


@router.get("/latest", response_model=RoutePlanRead)
async def get_latest_route_plan(
    session: AsyncSession = Depends(get_db),
):
    """Get the most recent route plan."""
    result = await session.execute(
        select(RoutePlan).order_by(RoutePlan.created_at.desc()).limit(1)
    )
    route_plan = result.scalar_one_or_none()
    
    if not route_plan:
        raise HTTPException(
            status_code=404,
            detail="No route plans found."
        )
    
    return _format_route_plan_response(route_plan)


@router.get("/{route_plan_id}", response_model=RoutePlanRead)
async def get_route_plan(
    route_plan_id: UUID,
    session: AsyncSession = Depends(get_db),
):
    """Get a specific route plan by ID."""
    result = await session.execute(
        select(RoutePlan).where(RoutePlan.id == route_plan_id)
    )
    route_plan = result.scalar_one_or_none()
    
    if not route_plan:
        raise HTTPException(
            status_code=404,
            detail=f"Route plan {route_plan_id} not found"
        )
    
    return _format_route_plan_response(route_plan)


@router.delete("/{route_plan_id}", status_code=204)
async def delete_route_plan(
    route_plan_id: UUID,
    session: AsyncSession = Depends(get_db),
):
    """Delete a route plan from history."""
    result = await session.execute(
        select(RoutePlan).where(RoutePlan.id == route_plan_id)
    )
    route_plan = result.scalar_one_or_none()
    
    if not route_plan:
        raise HTTPException(
            status_code=404,
            detail=f"Route plan {route_plan_id} not found"
        )
    
    await session.delete(route_plan)
    await session.commit()


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
    )
