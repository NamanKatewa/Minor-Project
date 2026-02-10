"""Demand CRUD router"""

import csv
import io
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db
from sqlalchemy.orm import joinedload
from models import Demand, Stop
from schemas import DemandCreate, DemandUpdate, DemandRead, DemandImport, DemandWithStop

router = APIRouter(prefix="/api/demand", tags=["demand"])


@router.get("/semesters", response_model=list[str])
async def list_semesters(session: AsyncSession = Depends(get_db)):
    result = await session.execute(
        select(Demand.semester).distinct().order_by(Demand.semester)
    )
    return [row[0] for row in result.fetchall()]


@router.get("", response_model=list[DemandWithStop])
async def list_demand(
    semester: str | None = None,
    stop_id: UUID | None = None,
    session: AsyncSession = Depends(get_db),
):
    query = select(Demand).options(joinedload(Demand.stop))
    if semester:
        query = query.where(Demand.semester == semester)
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
    """Bulk create demand"""
    if not demands:
        return {"created": 0, "skipped": 0}

    # 1. Resolve Stop IDs from codes
    stop_codes = {d.stop_code for d in demands}
    stops_result = await session.execute(
        select(Stop.stop_code, Stop.id).where(Stop.stop_code.in_(stop_codes))
    )
    stop_map = {code: id for code, id in stops_result.fetchall()}

    # 2. Create Demand objects
    new_demands = []
    skipped = 0
    
    for d in demands:
        if d.stop_code in stop_map:
            new_demands.append(
                Demand(
                    stop_id=stop_map[d.stop_code],
                    student_count=d.student_count,
                    semester=d.semester,
                )
            )
        else:
            skipped += 1
    
    if new_demands:
        session.add_all(new_demands)
        await session.commit()
    
    return {"created": len(new_demands), "skipped": skipped}
