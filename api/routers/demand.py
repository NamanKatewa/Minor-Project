"""Demand CRUD router"""

import csv
import io
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db
from models import Demand, Stop
from schemas import DemandCreate, DemandUpdate, DemandRead

router = APIRouter(prefix="/api/demand", tags=["demand"])


@router.get("/semesters", response_model=list[str])
async def list_semesters(session: AsyncSession = Depends(get_db)):
    result = await session.execute(
        select(Demand.semester).distinct().order_by(Demand.semester)
    )
    return [row[0] for row in result.fetchall()]


@router.get("", response_model=list[DemandRead])
async def list_demand(
    semester: str | None = None,
    stop_id: UUID | None = None,
    session: AsyncSession = Depends(get_db),
):
    query = select(Demand)
    if semester:
        query = query.where(Demand.semester == semester)
    if stop_id:
        query = query.where(Demand.stop_id == stop_id)
    result = await session.execute(query)
    return result.scalars().all()


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


@router.post("/upload", response_model=dict)
async def upload_demand_csv(
    file: UploadFile = File(...),
    session: AsyncSession = Depends(get_db),
):
    if not file.filename or not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="File must be a CSV")
    
    content = await file.read()
    text = content.decode("utf-8")
    reader = csv.DictReader(io.StringIO(text))
    
    stop_cache: dict[str, Stop | None] = {}
    created = 0
    skipped = 0
    errors = []
    
    for i, row in enumerate(reader, start=2):
        try:
            stop_code = row.get("stop_id", "").strip()
            student_count_str = row.get("student_count", "0").strip()
            semester = row.get("semester", "").strip()
            
            student_count = int(student_count_str) if student_count_str else 0
            
            if stop_code not in stop_cache:
                result = await session.execute(
                    select(Stop).where(Stop.stop_code == stop_code)
                )
                stop_cache[stop_code] = result.scalar_one_or_none()
            
            stop = stop_cache[stop_code]
            if not stop:
                skipped += 1
                continue
            
            demand = Demand(
                stop_id=stop.id,
                student_count=student_count,
                semester=semester,
            )
            session.add(demand)
            created += 1
        except Exception as e:
            errors.append(f"Row {i}: {str(e)}")
    
    await session.commit()
    
    return {
        "created": created,
        "skipped": skipped,
        "errors": errors[:10],
        "total_errors": len(errors),
    }
