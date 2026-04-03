from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime

class DashboardStop(BaseModel):
    id: str
    name: str
    lat: float
    lon: float

class DashboardMatrixInfo(BaseModel):
    id: str
    stop_count: Optional[int]
    build_time_seconds: Optional[float]
    created_at: datetime

class DashboardSummary(BaseModel):
    stops_count: int
    buses_count: int
    depots_count: int
    demand_records_count: int
    total_students: int
    total_fleet_capacity: int
    latest_matrix: Optional[DashboardMatrixInfo]
    stops: List[DashboardStop] = []
