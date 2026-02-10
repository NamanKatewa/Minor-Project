"""Bus schemas"""

from uuid import UUID
from pydantic import BaseModel


class BusBase(BaseModel):
    bus_no: str
    capacity: int = 50
    depot_id: UUID | None = None


class BusCreate(BusBase):
    pass


class BusUpdate(BaseModel):
    bus_no: str | None = None
    capacity: int | None = None
    depot_id: UUID | None = None


class BusRead(BusBase):
    id: UUID

    class Config:
        from_attributes = True



class BusWithDepot(BusRead):
    depot_name: str | None = None


class BusImport(BaseModel):
    bus_no: str
    capacity: int = 50
    depot_name: str | None = None
