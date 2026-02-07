"""Stop schemas"""

from uuid import UUID
from pydantic import BaseModel


class StopBase(BaseModel):
    stop_code: str | None = None
    name: str
    lat: float | None = None
    lon: float | None = None
    locality: str | None = None
    zone: str | None = None
    active: bool = True


class StopCreate(StopBase):
    pass


class StopUpdate(BaseModel):
    stop_code: str | None = None
    name: str | None = None
    lat: float | None = None
    lon: float | None = None
    locality: str | None = None
    zone: str | None = None
    active: bool | None = None


class StopRead(StopBase):
    id: UUID

    class Config:
        from_attributes = True


class StopBulkResponse(BaseModel):
    count: int
