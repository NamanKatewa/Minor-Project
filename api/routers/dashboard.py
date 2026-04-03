from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import func, select, distinct, desc, text

from database import get_db
from models import Stop, Bus, Depot, Demand, DistanceMatrix
from schemas.dashboard import DashboardSummary, DashboardMatrixInfo, DashboardStop

router = APIRouter(prefix="/api/dashboard", tags=["dashboard"])

@router.get("/summary", response_model=DashboardSummary)
async def get_dashboard_summary(db: AsyncSession = Depends(get_db)):
    """
    Get high-level summary statistics for the dashboard.
    Optimized to use minimal queries.
    """
    
    count_query = text("""
        SELECT 
            (SELECT COUNT(*) FROM stops) as stops_count,
            (SELECT COUNT(*) FROM buses) as buses_count,
            (SELECT COUNT(*) FROM depots) as depots_count,
            (SELECT COUNT(*) FROM demand) as demand_records_count,
            (SELECT COALESCE(SUM(student_count), 0) FROM demand) as total_students,
            (SELECT COALESCE(SUM(capacity), 0) FROM buses) as total_fleet_capacity
    """)
    count_result = await db.execute(count_query)
    counts = count_result.one()
    
    stops_count = counts[0]
    buses_count = counts[1]
    depots_count = counts[2]
    demand_records_count = counts[3]
    total_students = counts[4]
    total_fleet_capacity = counts[5]
    
    matrix_res = await db.execute(select(DistanceMatrix.id, DistanceMatrix.stop_count, DistanceMatrix.build_time_seconds, DistanceMatrix.created_at).order_by(desc(DistanceMatrix.created_at)).limit(1))
    matrix_row = matrix_res.one_or_none()
    
    latest_matrix_info = None
    if matrix_row:
        latest_matrix_info = DashboardMatrixInfo(
            id=str(matrix_row[0]),
            stop_count=matrix_row[1],
            build_time_seconds=matrix_row[2],
            created_at=matrix_row[3]
        )
    
    stops_res = await db.execute(
        select(Stop.id, Stop.name, Stop.lat, Stop.lon)
        .where(Stop.active == True)
        .limit(300)
    )
    stops_rows = stops_res.all()
    stops_list = [
        DashboardStop(id=str(row[0]), name=row[1], lat=row[2], lon=row[3])
        for row in stops_rows
    ]
        
    return DashboardSummary(
        stops_count=stops_count,
        buses_count=buses_count,
        depots_count=depots_count,
        demand_records_count=demand_records_count,
        total_students=total_students,
        total_fleet_capacity=total_fleet_capacity,
        latest_matrix=latest_matrix_info,
        stops=stops_list
    )