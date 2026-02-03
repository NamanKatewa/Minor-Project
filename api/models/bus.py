"""Bus model"""

from sqlalchemy import String, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from database import Base


class Bus(Base):
    __tablename__ = "buses"

    id: Mapped[int] = mapped_column(primary_key=True)
    bus_no: Mapped[str] = mapped_column(String(50))
    capacity: Mapped[int] = mapped_column(Integer, default=50)
    depot_id: Mapped[int | None] = mapped_column(Integer, ForeignKey("depots.id"), nullable=True)

    depot: Mapped["Depot"] = relationship("Depot", back_populates="buses")


from .depot import Depot
