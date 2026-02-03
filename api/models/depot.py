"""Depot model"""

from sqlalchemy import String, Float
from sqlalchemy.orm import Mapped, mapped_column, relationship
from database import Base


class Depot(Base):
    __tablename__ = "depots"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(255))
    lat: Mapped[float] = mapped_column(Float)
    lon: Mapped[float] = mapped_column(Float)

    buses: Mapped[list["Bus"]] = relationship("Bus", back_populates="depot")

from .bus import Bus
