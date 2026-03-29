"""Optimization request/response schemas"""

from uuid import UUID
from datetime import datetime
from pydantic import BaseModel, Field


# ============================================================================
# REQUEST SCHEMAS
# ============================================================================

class OptimizationRequest(BaseModel):
    """Request to run route optimization"""
    scenario_type: str = Field(default="strict", pattern="^(strict|suggested)$")
    semester: str | None = None
    matrix_id: UUID | None = None
    fuel_cost_per_km: float = Field(default=50.0, gt=0)
    bus_ids: list[UUID] | None = None
    
    # Constraint overrides
    max_ride_time_min: int | None = Field(default=None, gt=0)
    arrival_deadline: str | None = Field(default=None, pattern="^(0?[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$")


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


class OptimizationStats(BaseModel):
    """Summary statistics for an optimization run"""
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


class OptimizationResponse(BaseModel):
    """Full optimization solution response"""
    id: UUID
    scenario_type: str
    
    # Solution data
    routes: list[BusRoute]
    stats: OptimizationStats
    
    # Cost
    cost_estimate: float
    fuel_cost_per_km: float
    
    # Metadata
    created_at: datetime
    semester: str | None = None
    
    class Config:
        from_attributes = True


# ============================================================================
# LIST/HISTORY SCHEMAS
# ============================================================================

class OptimizationSummary(BaseModel):
    """Lightweight summary for listing solutions"""
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


class OptimizationListResponse(BaseModel):
    """Response for listing optimization solutions"""
    solutions: list[OptimizationSummary]
    count: int
    limit: int
    offset: int


class OptimizationHistoryResponse(BaseModel):
    """Simplified response for the solutions history dashboard"""
    solutions_data: OptimizationListResponse


# ============================================================================
# UTILITY SCHEMAS
# ============================================================================

class OptimizationValidationError(BaseModel):
    """Validation error details"""
    field: str
    message: str
    value: str | None = None


class OptimizationErrorResponse(BaseModel):
    """Error response when optimization fails"""
    detail: str
    error_type: str
    validation_errors: list[OptimizationValidationError] = []
    suggestions: list[str] = []


class OptimizationReadyResponse(BaseModel):
    """Data needed to prepare for an optimization run"""
    semesters: list[str]
    stops_count: int
    buses_count: int
    demand_records_count: int
    total_students_count: int
    total_fleet_capacity: int
    latest_matrix_stop_count: int | None = None
    has_matrix: bool
