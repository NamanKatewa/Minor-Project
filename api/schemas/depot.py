"""Depot schemas"""

from uuid import UUID
from pydantic import BaseModel


class DepotBase(BaseModel):
    name: str
    lat: float | None = None
    lon: float | None = None


class DepotCreate(DepotBase):
    pass


class DepotUpdate(BaseModel):
    name: str | None = None
    lat: float | None = None
    lon: float | None = None


class DepotRead(DepotBase):
    id: UUID


class DepotImport(BaseModel):
    name: str
    lat: float | None = None
    lon: float | None = None
