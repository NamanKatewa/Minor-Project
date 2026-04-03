"""Demand model"""

from uuid import UUID, uuid4
from sqlalchemy import Integer, String, ForeignKey, Uuid
from sqlalchemy.orm import Mapped, mapped_column, relationship
from database import Base


class Demand(Base):
    __tablename__ = "demand"

    id: Mapped[UUID] = mapped_column(Uuid, primary_key=True, default=uuid4)
    stop_id: Mapped[UUID] = mapped_column(Uuid, ForeignKey("stops.id", ondelete="CASCADE"))
    student_count: Mapped[int] = mapped_column(Integer, default=0)

    stop: Mapped["Stop"] = relationship("Stop")


from .stop import Stop
