from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import func, select, distinct, desc
from typing import List

from database import get_db
from models import Stop, Bus, Depot, Demand, DistanceMatrix
from schemas.dashboard import DashboardSummary, DashboardMatrixInfo, DashboardStop

router = APIRouter(prefix="/api/dashboard", tags=["dashboard"])

@router.get("/summary", response_model=DashboardSummary)
async def get_dashboard_summary(db: AsyncSession = Depends(get_db)):
    """
    Get high-level summary statistics for the dashboard.
    Optimized to use COUNT/SUM queries instead of fetching all rows.
    """
    
    # 1. Counts
    stops_res = await db.execute(select(func.count(Stop.id)))
    stops_count = stops_res.scalar() or 0
    
    buses_res = await db.execute(select(func.count(Bus.id)))
    buses_count = buses_res.scalar() or 0
    
    depots_res = await db.execute(select(func.count(Depot.id)))
    depots_count = depots_res.scalar() or 0
    
    demand_res = await db.execute(select(func.count(Demand.id)))
    demand_records_count = demand_res.scalar() or 0
    
    # 2. Fleet Capacity
    capacity_res = await db.execute(select(func.sum(Bus.capacity)))
    total_fleet_capacity = capacity_res.scalar() or 0
    
    # 3. Semesters
    semesters_res = await db.execute(select(distinct(Demand.semester)).where(Demand.semester != None))
    semesters = semesters_res.scalars().all()
    
    # 4. Latest Matrix
    matrix_res = await db.execute(select(DistanceMatrix).order_by(desc(DistanceMatrix.created_at)).limit(1))
    latest_matrix_row = matrix_res.scalar_one_or_none()
    
    latest_matrix_info = None
    if latest_matrix_row:
        latest_matrix_info = DashboardMatrixInfo(
            id=str(latest_matrix_row.id),
            stop_count=latest_matrix_row.stop_count,
            build_time_seconds=latest_matrix_row.build_time_seconds,
            created_at=latest_matrix_row.created_at
        )
        
    return DashboardSummary(
        stops_count=stops_count,
        buses_count=buses_count,
        depots_count=depots_count,
        demand_records_count=demand_records_count,
        total_fleet_capacity=total_fleet_capacity,
        semesters=list(semesters),
        latest_matrix=latest_matrix_info
    )
