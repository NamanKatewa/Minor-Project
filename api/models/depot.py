"""Depot model"""

from uuid import UUID, uuid4
from sqlalchemy import String, Float, Uuid
from sqlalchemy.orm import Mapped, mapped_column, relationship
from database import Base


class Depot(Base):
    __tablename__ = "depots"

    id: Mapped[UUID] = mapped_column(Uuid, primary_key=True, default=uuid4)
    name: Mapped[str] = mapped_column(String(255))
    lat: Mapped[float | None] = mapped_column(Float, nullable=True)
    lon: Mapped[float | None] = mapped_column(Float, nullable=True)

    buses: Mapped[list["Bus"]] = relationship("Bus", back_populates="depot")

from .bus import Bus
