"""Matrix router — build, latest, get by ID"""

import time
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db
from models import Stop, DistanceMatrix
from schemas.matrix import MatrixBuildRequest, MatrixBuildResponse, MatrixRead
from services.osrm import osrm_service

router = APIRouter(prefix="/api/routes", tags=["routes"])


@router.post("/build", response_model=MatrixBuildResponse)
async def build_matrix(
    body: MatrixBuildRequest | None = None,
    session: AsyncSession = Depends(get_db),
):
    healthy = await osrm_service.health_check()
    if not healthy:
        raise HTTPException(
            status_code=503,
            detail="OSRM routing engine is not reachable. Please ensure the OSRM container is running.",
        )

    query = select(Stop).where(Stop.active == True)
    if body and body.stop_ids:
        query = query.where(Stop.id.in_(body.stop_ids))

    result = await session.execute(query)
    all_stops = result.scalars().all()

    stops = [s for s in all_stops if s.lat is not None and s.lon is not None]

    if len(stops) < 2:
        raise HTTPException(status_code=400, detail="Need at least 2 active stops with coordinates to build a matrix")

    coordinates = [(s.lat, s.lon) for s in stops]
    stop_ids = [str(s.id) for s in stops]
    stop_names = {str(s.id): s.name for s in stops}

    t0 = time.time()
    table_result = await osrm_service.get_table(coordinates)
    build_time = round(time.time() - t0, 2)

    matrix_data = {
        "stop_ids": stop_ids,
        "stop_names": stop_names,
        "durations": table_result["durations"],
        "distances": table_result["distances"],
    }

    dm = DistanceMatrix(
        matrix_json=matrix_data,
        stop_count=len(stops),
        build_time_seconds=build_time,
        stop_ids_json={"stop_ids": stop_ids},
    )
    session.add(dm)
    await session.commit()
    await session.refresh(dm)

    return dm


@router.get("/latest", response_model=MatrixRead)
async def get_latest_matrix(session: AsyncSession = Depends(get_db)):
    result = await session.execute(
        select(DistanceMatrix).order_by(DistanceMatrix.created_at.desc()).limit(1)
    )
    matrix = result.scalar_one_or_none()
    if not matrix:
        raise HTTPException(status_code=404, detail="No matrix found. Build one first.")
    return matrix


@router.get("/{matrix_id}", response_model=MatrixRead)
async def get_matrix(matrix_id: UUID, session: AsyncSession = Depends(get_db)):
    result = await session.execute(
        select(DistanceMatrix).where(DistanceMatrix.id == matrix_id)
    )
    matrix = result.scalar_one_or_none()
    if not matrix:
        raise HTTPException(status_code=404, detail="Matrix not found")
    return matrix
