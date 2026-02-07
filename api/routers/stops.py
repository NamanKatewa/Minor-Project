"""Stops CRUD router"""

import csv
import io
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db
from models import Stop
from schemas import StopCreate, StopUpdate, StopRead, StopBulkResponse

router = APIRouter(prefix="/api/stops", tags=["stops"])


@router.get("", response_model=list[StopRead])
async def list_stops(
    zone: str | None = None,
    active: bool | None = None,
    session: AsyncSession = Depends(get_db),
):
    query = select(Stop)
    if zone:
        query = query.where(Stop.zone == zone)
    if active is not None:
        query = query.where(Stop.active == active)
    result = await session.execute(query)
    return result.scalars().all()


@router.get("/{stop_id}", response_model=StopRead)
async def get_stop(stop_id: UUID, session: AsyncSession = Depends(get_db)):
    result = await session.execute(select(Stop).where(Stop.id == stop_id))
    stop = result.scalar_one_or_none()
    if not stop:
        raise HTTPException(status_code=404, detail="Stop not found")
    return stop


@router.post("", response_model=StopRead, status_code=201)
async def create_stop(stop: StopCreate, session: AsyncSession = Depends(get_db)):
    db_stop = Stop(**stop.model_dump())
    session.add(db_stop)
    await session.commit()
    await session.refresh(db_stop)
    return db_stop


@router.put("/{stop_id}", response_model=StopRead)
async def update_stop(
    stop_id: UUID, stop: StopUpdate, session: AsyncSession = Depends(get_db)
):
    result = await session.execute(select(Stop).where(Stop.id == stop_id))
    db_stop = result.scalar_one_or_none()
    if not db_stop:
        raise HTTPException(status_code=404, detail="Stop not found")
    
    update_data = stop.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_stop, key, value)
    
    await session.commit()
    await session.refresh(db_stop)
    return db_stop


@router.delete("/{stop_id}", status_code=204)
async def delete_stop(stop_id: UUID, session: AsyncSession = Depends(get_db)):
    result = await session.execute(select(Stop).where(Stop.id == stop_id))
    db_stop = result.scalar_one_or_none()
    if not db_stop:
        raise HTTPException(status_code=404, detail="Stop not found")
    
    await session.delete(db_stop)
    await session.commit()


@router.delete("", status_code=204)
async def delete_all_stops(session: AsyncSession = Depends(get_db)):
    """Delete all stops"""
    await session.execute(select(Stop).where(Stop.active == True))
    from sqlalchemy import delete
    await session.execute(delete(Stop))
    await session.commit()


@router.post("/bulk", response_model=StopBulkResponse, status_code=201)
async def bulk_create_stops(
    stops: list[StopCreate], session: AsyncSession = Depends(get_db)
):
    """Bulk create stops"""
    db_stops = [Stop(**stop.model_dump()) for stop in stops]
    session.add_all(db_stops)
    await session.commit()
    return {"count": len(db_stops)}
