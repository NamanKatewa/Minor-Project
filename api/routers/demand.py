"""Demand CRUD router"""

import csv
import io
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db
from sqlalchemy.orm import joinedload
from models import Demand, Stop
from schemas import DemandCreate, DemandUpdate, DemandRead, DemandImport, DemandWithStop

router = APIRouter(prefix="/api/demand", tags=["demand"])


@router.get("", response_model=list[DemandWithStop])
async def list_demand(
    stop_id: UUID | None = None,
    session: AsyncSession = Depends(get_db),
):
    query = select(Demand).options(joinedload(Demand.stop))
    if stop_id:
        query = query.where(Demand.stop_id == stop_id)
    result = await session.execute(query)
    demands = result.scalars().all()

    response = []
    for d in demands:
        item = DemandWithStop.model_validate(d)
        if d.stop:
            item.stop_name = d.stop.name
        response.append(item)
    return response


@router.get("/{demand_id}", response_model=DemandRead)
async def get_demand(demand_id: UUID, session: AsyncSession = Depends(get_db)):
    result = await session.execute(select(Demand).where(Demand.id == demand_id))
    demand = result.scalar_one_or_none()
    if not demand:
        raise HTTPException(status_code=404, detail="Demand not found")
    return demand


@router.post("", response_model=DemandRead, status_code=201)
async def create_demand(demand: DemandCreate, session: AsyncSession = Depends(get_db)):
    db_demand = Demand(**demand.model_dump())
    session.add(db_demand)
    await session.commit()
    await session.refresh(db_demand)
    return db_demand


@router.put("/{demand_id}", response_model=DemandRead)
async def update_demand(
    demand_id: UUID, demand: DemandUpdate, session: AsyncSession = Depends(get_db)
):
    result = await session.execute(select(Demand).where(Demand.id == demand_id))
    db_demand = result.scalar_one_or_none()
    if not db_demand:
        raise HTTPException(status_code=404, detail="Demand not found")
    
    update_data = demand.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_demand, key, value)
    
    await session.commit()
    await session.refresh(db_demand)
    return db_demand


@router.delete("/{demand_id}", status_code=204)
async def delete_demand(demand_id: UUID, session: AsyncSession = Depends(get_db)):
    result = await session.execute(select(Demand).where(Demand.id == demand_id))
    db_demand = result.scalar_one_or_none()
    if not db_demand:
        raise HTTPException(status_code=404, detail="Demand not found")
    
    await session.delete(db_demand)
    await session.commit()


@router.delete("", status_code=204)
async def delete_all_demand(session: AsyncSession = Depends(get_db)):
    """Delete all demand"""
    from sqlalchemy import delete
    await session.execute(delete(Demand))
    await session.commit()


@router.post("/bulk", response_model=dict, status_code=201)
async def bulk_create_demand(
    demands: list[DemandImport], session: AsyncSession = Depends(get_db)
):
    """Bulk create demand, merging duplicate stops by summing student counts"""
    if not demands:
        return {"created": 0, "skipped": 0, "merged": 0}

    merged_data = {} # stop_code -> total_students
    original_count = len(demands)
    
    for d in demands:
        if d.stop_code in merged_data:
            merged_data[d.stop_code] += d.student_count
        else:
            merged_data[d.stop_code] = d.student_count
    
    stop_codes = set(merged_data.keys())
    stops_result = await session.execute(
        select(Stop.stop_code, Stop.id).where(Stop.stop_code.in_(stop_codes))
    )
    stop_map = {code: id for code, id in stops_result.fetchall()}

    new_demands = []
    skipped = 0
    
    for stop_code, student_count in merged_data.items():
        if stop_code in stop_map:
            existing = await session.execute(
                select(Demand).where(Demand.stop_id == stop_map[stop_code])
            )
            if existing.scalar_one_or_none():
                continue
            
            new_demands.append(
                Demand(
                    stop_id=stop_map[stop_code],
                    student_count=student_count,
                )
            )
        else:
            skipped += 1
    
    if new_demands:
        session.add_all(new_demands)
        await session.commit()
    
    return {
        "created": len(new_demands), 
        "skipped": skipped, 
    }