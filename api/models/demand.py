"""Demand model"""

from sqlalchemy import Integer, String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from database import Base


class Demand(Base):
    __tablename__ = "demand"

    id: Mapped[int] = mapped_column(primary_key=True)
    stop_id: Mapped[int] = mapped_column(Integer, ForeignKey("stops.id"))
    student_count: Mapped[int] = mapped_column(Integer, default=0)
    semester: Mapped[str] = mapped_column(String(50))
