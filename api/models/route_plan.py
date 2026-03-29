"""RoutePlan and DistanceMatrix models"""

from uuid import UUID, uuid4
from datetime import datetime
from sqlalchemy import String, Float, Integer, DateTime, JSON, Uuid
from sqlalchemy.orm import Mapped, mapped_column
from database import Base


class DistanceMatrix(Base):
    __tablename__ = "distance_matrices"

    id: Mapped[UUID] = mapped_column(Uuid, primary_key=True, default=uuid4)
    matrix_json: Mapped[dict] = mapped_column(JSON)
    stop_count: Mapped[int | None] = mapped_column(Integer, nullable=True)
    build_time_seconds: Mapped[float | None] = mapped_column(Float, nullable=True)
    stop_ids_json: Mapped[dict | None] = mapped_column(JSON, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now())


class RoutePlan(Base):
    __tablename__ = "route_plans"

    id: Mapped[UUID] = mapped_column(Uuid, primary_key=True, default=uuid4)
    scenario_type: Mapped[str] = mapped_column(String(50))
    routes_json: Mapped[dict] = mapped_column(JSON)
    stats_json: Mapped[dict] = mapped_column(JSON)
    cost_estimate: Mapped[float | None] = mapped_column(Float, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now())
