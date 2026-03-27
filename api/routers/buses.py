"""Buses CRUD router"""

from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db
from models import Bus
from schemas import BusCreate, BusUpdate, BusRead, BusImport, BusWithDepot

router = APIRouter(prefix="/api/buses", tags=["buses"])


@router.get("", response_model=list[BusWithDepot])
async def list_buses(
    depot_id: UUID | None = None,
    session: AsyncSession = Depends(get_db),
):
    query = select(Bus)
    if depot_id:
        query = query.where(Bus.depot_id == depot_id)
    result = await session.execute(query)
    buses = result.scalars().all()

    response = []
    for bus in buses:
        item = BusWithDepot.model_validate(bus)
        item.depot_name = None
        response.append(item)
    return response


@router.get("/{bus_id}", response_model=BusRead)
async def get_bus(bus_id: UUID, session: AsyncSession = Depends(get_db)):
    result = await session.execute(select(Bus).where(Bus.id == bus_id))
    bus = result.scalar_one_or_none()
    if not bus:
        raise HTTPException(status_code=404, detail="Bus not found")
    return bus


@router.post("", response_model=BusRead, status_code=201)
async def create_bus(bus: BusCreate, session: AsyncSession = Depends(get_db)):
    db_bus = Bus(**bus.model_dump())
    session.add(db_bus)
    await session.commit()
    await session.refresh(db_bus)
    return db_bus


@router.put("/{bus_id}", response_model=BusRead)
async def update_bus(
    bus_id: UUID, bus: BusUpdate, session: AsyncSession = Depends(get_db)
):
    result = await session.execute(select(Bus).where(Bus.id == bus_id))
    db_bus = result.scalar_one_or_none()
    if not db_bus:
        raise HTTPException(status_code=404, detail="Bus not found")
    
    update_data = bus.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_bus, key, value)
    
    await session.commit()
    await session.refresh(db_bus)
    return db_bus


@router.delete("/{bus_id}", status_code=204)
async def delete_bus(bus_id: UUID, session: AsyncSession = Depends(get_db)):
    result = await session.execute(select(Bus).where(Bus.id == bus_id))
    db_bus = result.scalar_one_or_none()
    if not db_bus:
        raise HTTPException(status_code=404, detail="Bus not found")
    
    await session.delete(db_bus)
    await session.commit()


@router.delete("", status_code=204)
async def delete_all_buses(session: AsyncSession = Depends(get_db)):
    """Delete all buses"""
    from sqlalchemy import delete
    await session.execute(delete(Bus))
    await session.commit()


@router.post("/bulk", response_model=dict, status_code=201)
async def bulk_create_buses(
    buses: list[BusImport], session: AsyncSession = Depends(get_db)
):
    """Bulk create buses"""
    if not buses:
        return {"created": 0}

    new_buses = [
        Bus(bus_no=bus.bus_no, capacity=bus.capacity)
        for bus in buses
    ]

    session.add_all(new_buses)
    await session.commit()

    return {"created": len(new_buses)}
