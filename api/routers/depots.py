"""Depots CRUD router"""

from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db
from models import Depot
from schemas import DepotCreate, DepotUpdate, DepotRead

router = APIRouter(prefix="/depots", tags=["depots"])


@router.get("", response_model=list[DepotRead])
async def list_depots(session: AsyncSession = Depends(get_db)):
    result = await session.execute(select(Depot))
    return result.scalars().all()


@router.get("/{depot_id}", response_model=DepotRead)
async def get_depot(depot_id: UUID, session: AsyncSession = Depends(get_db)):
    result = await session.execute(select(Depot).where(Depot.id == depot_id))
    depot = result.scalar_one_or_none()
    if not depot:
        raise HTTPException(status_code=404, detail="Depot not found")
    return depot


@router.post("", response_model=DepotRead, status_code=201)
async def create_depot(depot: DepotCreate, session: AsyncSession = Depends(get_db)):
    db_depot = Depot(**depot.model_dump())
    session.add(db_depot)
    await session.commit()
    await session.refresh(db_depot)
    return db_depot


@router.put("/{depot_id}", response_model=DepotRead)
async def update_depot(
    depot_id: UUID, depot: DepotUpdate, session: AsyncSession = Depends(get_db)
):
    result = await session.execute(select(Depot).where(Depot.id == depot_id))
    db_depot = result.scalar_one_or_none()
    if not db_depot:
        raise HTTPException(status_code=404, detail="Depot not found")
    
    update_data = depot.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_depot, key, value)
    
    await session.commit()
    await session.refresh(db_depot)
    return db_depot


@router.delete("/{depot_id}", status_code=204)
async def delete_depot(depot_id: UUID, session: AsyncSession = Depends(get_db)):
    result = await session.execute(select(Depot).where(Depot.id == depot_id))
    db_depot = result.scalar_one_or_none()
    if not db_depot:
        raise HTTPException(status_code=404, detail="Depot not found")
    
    await session.delete(db_depot)
    await session.commit()


@router.delete("", status_code=204)
async def delete_all_depots(session: AsyncSession = Depends(get_db)):
    """Delete all depots"""
    from sqlalchemy import delete
    await session.execute(delete(Depot))
    await session.commit()


@router.post("/bulk", response_model=dict, status_code=201)
async def bulk_create_depots(
    depots: list[DepotCreate], session: AsyncSession = Depends(get_db)
):
    """Bulk create depots"""
    if not depots:
        return {"count": 0}

    # Extract depot names
    depot_names = {d.name for d in depots if d.name}

    # Fetch existing depots
    result = await session.execute(
        select(Depot).where(Depot.name.in_(depot_names))
    )
    existing_depots = result.scalars().all()
    existing_names = {d.name for d in existing_depots}

    # Create only new depots (skip duplicates)
    new_depots = [
        Depot(name=d.name, lat=d.lat, lon=d.lon)
        for d in depots
        if d.name and d.name not in existing_names
    ]

    if new_depots:
        session.add_all(new_depots)
        await session.commit()

    return {"count": len(new_depots)}
