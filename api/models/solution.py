"""Solution and DistanceMatrix models"""

from datetime import datetime
from sqlalchemy import String, Float, DateTime, JSON
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.sql import func
from database import Base


class DistanceMatrix(Base):
    __tablename__ = "distance_matrices"

    id: Mapped[int] = mapped_column(primary_key=True)
    matrix_json: Mapped[dict] = mapped_column(JSON)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())


class Solution(Base):
    __tablename__ = "solutions"

    id: Mapped[int] = mapped_column(primary_key=True)
    scenario_type: Mapped[str] = mapped_column(String(50))
    routes_json: Mapped[dict] = mapped_column(JSON)
    stats_json: Mapped[dict] = mapped_column(JSON)
    cost_estimate: Mapped[float | None] = mapped_column(Float, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
