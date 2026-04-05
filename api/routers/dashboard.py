from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import func, select, distinct, desc, text

from database import get_db
from models import Stop, Bus, Depot, Demand, DistanceMatrix
from schemas.dashboard import DashboardSummary, DashboardMatrixInfo, DashboardStop

router = APIRouter(prefix="/dashboard", tags=["dashboard"])

@router.get("/summary", response_model=DashboardSummary)
async def get_dashboard_summary(db: AsyncSession = Depends(get_db)):
    """
    Get high-level summary statistics for the dashboard.
    Unified into a single database call for maximum efficiency.
    """
    
    unified_query = text("""
        WITH counts AS (
            SELECT 
                (SELECT COUNT(*) FROM stops) as stops_count,
                (SELECT COUNT(*) FROM buses) as buses_count,
                (SELECT COUNT(*) FROM depots) as depots_count,
                (SELECT COUNT(*) FROM demand) as demand_records_count,
                (SELECT COALESCE(SUM(student_count), 0) FROM demand) as total_students,
                (SELECT COALESCE(SUM(capacity), 0) FROM buses) as total_fleet_capacity
        ),
        matrix AS (
            SELECT id, stop_count, build_time_seconds, created_at
            FROM distance_matrices
            ORDER BY created_at DESC
            LIMIT 1
        ),
        active_stops AS (
            SELECT id, name, lat, lon
            FROM stops
            WHERE active = true
            LIMIT 300
        )
        SELECT 
            c.*,
            (SELECT row_to_json(matrix.*) FROM matrix) as matrix_json,
            (SELECT json_agg(active_stops.*) FROM active_stops) as stops_json
        FROM counts c;
    """)
    
    result = await db.execute(unified_query)
    row = result.one()
    
    # Extract counts from columns 0-5
    stops_count = row[0]
    buses_count = row[1]
    depots_count = row[2]
    demand_records_count = row[3]
    total_students = row[4]
    total_fleet_capacity = row[5]
    
    # Extract matrix info from column 6 (JSON)
    matrix_data = row[6]
    latest_matrix_info = None
    if matrix_data:
        latest_matrix_info = DashboardMatrixInfo(
            id=str(matrix_data['id']),
            stop_count=matrix_data.get('stop_count'),
            build_time_seconds=matrix_data.get('build_time_seconds'),
            created_at=matrix_data['created_at']
        )
    
    # Extract stops from column 7 (JSON List)
    stops_data = row[7] or []
    stops_list = [
        DashboardStop(
            id=str(s['id']), 
            name=s['name'], 
            lat=s['lat'], 
            lon=s['lon']
        )
        for s in stops_data
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