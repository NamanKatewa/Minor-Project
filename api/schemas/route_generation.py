"""Optimization request/response schemas"""

from uuid import UUID
from datetime import datetime
from pydantic import BaseModel, Field


# ============================================================================
# REQUEST SCHEMAS
# ============================================================================

class RouteGenerationRequest(BaseModel):
    """Request to run route optimization"""
    scenario_type: str = Field(default="strict", pattern="^(strict|suggested)$")
    matrix_id: UUID | None = None
    fuel_cost_per_km: float = Field(default=50.0, gt=0)
    bus_ids: list[UUID] | None = None
    
    # Constraint overrides
    max_ride_time_min: int | None = Field(default=None, gt=0)
    arrival_deadline: str | None = Field(default=None, pattern="^(0?[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$")
    
    # Split delivery - allow stop demand to be split across multiple buses
    enable_split_delivery: bool = True


# ============================================================================
# RESPONSE SCHEMAS - Nested Components
# ============================================================================

class RouteStop(BaseModel):
    """A single stop in a bus route sequence"""
    stop_id: UUID
    stop_name: str
    stop_code: str | None = None
    lat: float
    lon: float
    arrival_time: str
    students_boarding: int
    cumulative_time_min: int
    distance_from_prev_km: float
    zone: str | None = None
    parent_stop_id: str | None = None
    is_split: bool = False


class BusRoute(BaseModel):
    """Complete route for one bus"""
    bus_id: UUID
    bus_no: str
    capacity: int
    
    # Depot info (assigned by algorithm)
    depot_id: str  # Changed from UUID to str for flexibility
    depot_name: str | None = None
    depot_lat: float
    depot_lon: float
    
    # Route sequence (ordered stops)
    stops: list[RouteStop]
    
    # Road geometry for visualization (list of [lat, lon])
    geometry: list[list[float]] | None = None

    # Aggregates
    total_students: int
    total_distance_km: float
    total_time_min: int
    capacity_utilization: float = Field(..., ge=0, le=100)
    
    # Warnings
    warnings: list[str] = []


class UnassignedStop(BaseModel):
    """An unassigned stop with reason"""
    stop_id: str
    name: str
    reason: str
    lat: float | None = None
    lon: float | None = None


class RoutePlanStats(BaseModel):
    """Summary statistics for a route plan"""
    total_buses_used: int
    total_distance_km: float
    total_time_min: int
    avg_utilization: float
    
    # Student coverage
    total_students_assigned: int
    total_students_requested: int
    coverage_percentage: float
    
    # Issues
    unassigned_stops: list[UnassignedStop] = []
    global_warnings: list[str] = []
    
    # Timing
    solve_time_seconds: float
    model_build_time_seconds: float


class RoutePlanRead(BaseModel):
    """Full route plan response"""
    id: UUID
    scenario_type: str
    
    # Solution data
    routes: list[BusRoute]
    stats: RoutePlanStats
    
    # Cost
    cost_estimate: float
    fuel_cost_per_km: float
    
    # Metadata
    created_at: datetime
    
    class Config:
        from_attributes = True


# ============================================================================
# LIST/HISTORY SCHEMAS
# ============================================================================

class RoutePlanSummary(BaseModel):
    """Lightweight summary for listing route plans"""
    id: UUID
    scenario_type: str
    total_buses: int
    total_distance_km: float
    total_students: int
    cost_estimate: float
    coverage_percentage: float
    has_warnings: bool
    created_at: datetime
    
    class Config:
        from_attributes = True


class RoutePlanListResponse(BaseModel):
    """Response for listing route plans"""
    solutions: list[RoutePlanSummary]
    count: int
    limit: int
    offset: int


class RoutePlanHistoryResponse(BaseModel):
    """Simplified response for the route plans history dashboard"""
    solutions_data: RoutePlanListResponse


# ============================================================================
# UTILITY SCHEMAS
# ============================================================================

class RouteGenerationValidationError(BaseModel):
    """Validation error details"""
    field: str
    message: str
    value: str | None = None


class RouteGenerationErrorResponse(BaseModel):
    """Error response when route generation fails"""
    detail: str
    error_type: str
    validation_errors: list[RouteGenerationValidationError] = []
    suggestions: list[str] = []


class RouteGenerationReadyResponse(BaseModel):
    """Data needed to prepare for a route generation run"""
    stops_count: int
    buses_count: int
    demand_records_count: int
    total_students_count: int
    total_fleet_capacity: int
    latest_matrix_stop_count: int | None = None
    has_matrix: bool
