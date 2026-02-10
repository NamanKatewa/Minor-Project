"""Demand schemas"""

from uuid import UUID
from pydantic import BaseModel


class DemandBase(BaseModel):
    stop_id: UUID
    student_count: int = 0
    semester: str


class DemandCreate(DemandBase):
    pass


class DemandUpdate(BaseModel):
    stop_id: UUID | None = None
    student_count: int | None = None
    semester: str | None = None


class DemandRead(DemandBase):
    id: UUID

    class Config:
        from_attributes = True




class DemandWithStop(DemandRead):
    stop_name: str | None = None


class DemandImport(BaseModel):
    stop_code: str
    student_count: int = 0
    semester: str
