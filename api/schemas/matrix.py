"""Matrix and clustering schemas"""

from uuid import UUID
from datetime import datetime
from pydantic import BaseModel


class MatrixBuildRequest(BaseModel):
    stop_ids: list[str] | None = None


class MatrixBuildResponse(BaseModel):
    id: UUID
    stop_count: int
    build_time_seconds: float
    created_at: datetime

    class Config:
        from_attributes = True


class MatrixRead(BaseModel):
    id: UUID
    matrix_json: dict
    stop_count: int | None = None
    build_time_seconds: float | None = None
    stop_ids_json: dict | None = None
    created_at: datetime

    class Config:
        from_attributes = True


class StopInfo(BaseModel):
    id: str
    name: str
    lat: float
    lon: float


class ClusteringSuggestion(BaseModel):
    stops: list[StopInfo]
    max_distance_m: float


class ClusteringSuggestionsResponse(BaseModel):
    suggestions: list[ClusteringSuggestion]
    threshold_m: float
    total_groups: int


class StopReadMinimal(BaseModel):
    id: str
    name: str
    lat: float | None = None
    lon: float | None = None
    active: bool = True

    class Config:
        from_attributes = True


class RouteAnalysisResponse(BaseModel):
    latest_matrix: MatrixRead | None = None
    stops: list[StopReadMinimal]
    clustering: ClusteringSuggestionsResponse

