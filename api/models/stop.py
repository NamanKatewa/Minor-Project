"""Stop model"""

from uuid import UUID, uuid4
from sqlalchemy import String, Float, Boolean, Uuid
from sqlalchemy.orm import Mapped, mapped_column
from database import Base


class Stop(Base):
    __tablename__ = "stops"

    id: Mapped[UUID] = mapped_column(Uuid, primary_key=True, default=uuid4)
    stop_code: Mapped[str | None] = mapped_column(String(50), unique=True, index=True, nullable=True) # Added for CSV mapping
    name: Mapped[str] = mapped_column(String(255))
    lat: Mapped[float | None] = mapped_column(Float, nullable=True)
    lon: Mapped[float | None] = mapped_column(Float, nullable=True)
    locality: Mapped[str | None] = mapped_column(String(255), nullable=True)
    zone: Mapped[str | None] = mapped_column(String(100), nullable=True)
    active: Mapped[bool] = mapped_column(Boolean, default=True)
