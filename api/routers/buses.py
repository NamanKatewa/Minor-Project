"""Buses CRUD router"""

import csv
import io
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db
from models import Bus, Depot
from schemas import BusCreate, BusUpdate, BusRead

router = APIRouter(prefix="/api/buses", tags=["buses"])


@router.get("", response_model=list[BusRead])
async def list_buses(
    depot_id: UUID | None = None,
    session: AsyncSession = Depends(get_db),
):
    query = select(Bus)
    if depot_id:
        query = query.where(Bus.depot_id == depot_id)
    result = await session.execute(query)
    return result.scalars().all()


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


@router.post("/upload", response_model=dict)
async def upload_buses_csv(
    file: UploadFile = File(...),
    session: AsyncSession = Depends(get_db),
):
    if not file.filename or not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="File must be a CSV")
    
    content = await file.read()
    text = content.decode("utf-8")
    reader = csv.DictReader(io.StringIO(text))
    
    depot_cache: dict[str, Depot] = {}
    created = 0
    errors = []
    
    for i, row in enumerate(reader, start=2):
        try:
            bus_no = row.get("bus_no", "").strip()
            capacity_str = row.get("capacity", "50").strip()
            depot_name = row.get("depot_name", "").strip()
            
            capacity = int(capacity_str) if capacity_str else 50
            
            depot_id = None
            if depot_name:
                if depot_name not in depot_cache:
                    result = await session.execute(
                        select(Depot).where(Depot.name == depot_name)
                    )
                    depot = result.scalar_one_or_none()
                    if not depot:
                        depot = Depot(name=depot_name)
                        session.add(depot)
                        await session.flush()
                    depot_cache[depot_name] = depot
                depot_id = depot_cache[depot_name].id
            
            bus = Bus(bus_no=bus_no, capacity=capacity, depot_id=depot_id)
            session.add(bus)
            created += 1
        except Exception as e:
            errors.append(f"Row {i}: {str(e)}")
    
    await session.commit()
    
    return {
        "created": created,
        "depots_created": len([d for d in depot_cache.values()]),
        "errors": errors[:10],
        "total_errors": len(errors),
    }
