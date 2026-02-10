"""Buses CRUD router"""

import csv
import io
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db
from sqlalchemy.orm import joinedload
from models import Bus, Depot
from schemas import BusCreate, BusUpdate, BusRead, BusImport, BusWithDepot

router = APIRouter(prefix="/api/buses", tags=["buses"])


@router.get("", response_model=list[BusWithDepot])
async def list_buses(
    depot_id: UUID | None = None,
    session: AsyncSession = Depends(get_db),
):
    query = select(Bus).options(joinedload(Bus.depot))
    if depot_id:
        query = query.where(Bus.depot_id == depot_id)
    result = await session.execute(query)
    buses = result.scalars().all()

    response = []
    for bus in buses:
        item = BusWithDepot.model_validate(bus)
        if bus.depot:
            item.depot_name = bus.depot.name
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
    """Bulk create buses with optimized depot handling"""
    if not buses:
        return {"created": 0, "depots_created": 0}

    # 1. Extract unique depot names
    depot_names = {b.depot_name for b in buses if b.depot_name}
    
    # 2. Fetch existing depots
    existing_depots_result = await session.execute(
        select(Depot).where(Depot.name.in_(depot_names))
    )
    existing_depots = existing_depots_result.scalars().all()
    depot_map = {d.name: d.id for d in existing_depots}
    
    # 3. Identify and create missing depots
    missing_depot_names = depot_names - set(depot_map.keys())
    new_depots = [Depot(name=name) for name in missing_depot_names]
    
    if new_depots:
        session.add_all(new_depots)
        await session.flush()  # to get IDs
        for depot in new_depots:
            depot_map[depot.name] = depot.id
            
    # 4. Create buses
    new_buses = [
        Bus(
            bus_no=bus.bus_no,
            capacity=bus.capacity,
            depot_id=depot_map.get(bus.depot_name) if bus.depot_name else None
        )
        for bus in buses
    ]
    
    session.add_all(new_buses)
    await session.commit()
    
    return {
        "created": len(new_buses),
        "depots_created": len(new_depots)
    }
