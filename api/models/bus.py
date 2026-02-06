"""Bus model"""

from uuid import UUID, uuid4
from sqlalchemy import String, Integer, ForeignKey, Uuid
from sqlalchemy.orm import Mapped, mapped_column, relationship
from database import Base


class Bus(Base):
    __tablename__ = "buses"

    id: Mapped[UUID] = mapped_column(Uuid, primary_key=True, default=uuid4)
    bus_no: Mapped[str] = mapped_column(String(50))
    capacity: Mapped[int] = mapped_column(Integer, default=50)
    depot_id: Mapped[UUID | None] = mapped_column(Uuid, ForeignKey("depots.id"), nullable=True)

    depot: Mapped["Depot"] = relationship("Depot", back_populates="buses")


from .depot import Depot
