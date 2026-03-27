"""Matrix router — build, latest, get by ID"""

import logging
import time
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db
from models import Stop, DistanceMatrix, Depot
from schemas.matrix import MatrixBuildRequest, MatrixBuildResponse, MatrixRead
from services.osrm import osrm_service

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/routes", tags=["routes"])


@router.post("/build", response_model=MatrixBuildResponse)
async def build_matrix(
    body: MatrixBuildRequest | None = None,
    session: AsyncSession = Depends(get_db),
):
    logger.info("=== MATRIX BUILD STARTED ===")
    logger.info("[STEP 1] Checking OSRM health...")
    healthy = await osrm_service.health_check()
    if not healthy:
        logger.error("OSRM health check failed - service not reachable")
        raise HTTPException(
            status_code=503,
            detail="OSRM routing engine is not reachable. Please ensure the OSRM container is running.",
        )
    logger.info("OSRM health check passed")

    logger.info("[STEP 2] Querying active stops...")
    query = select(Stop).where(Stop.active == True)
    if body and body.stop_ids:
        query = query.where(Stop.id.in_(body.stop_ids))

    result = await session.execute(query)
    all_stops = result.scalars().all()

    stops = [s for s in all_stops if s.lat is not None and s.lon is not None]
    logger.info(f"Found {len(stops)} active stops with coordinates")

    if len(stops) < 2:
        logger.error(f"Insufficient stops with coordinates: {len(stops)}")
        raise HTTPException(status_code=400, detail="Need at least 2 active stops with coordinates to build a matrix")

    logger.info("[STEP 3] Querying depots with coordinates...")
    depot_query = select(Depot).where(Depot.lat.isnot(None)).where(Depot.lon.isnot(None))
    depot_result = await session.execute(depot_query)
    depots = depot_result.scalars().all()
    logger.info(f"Found {len(depots)} depots with coordinates")

    logger.info("[STEP 4] Building coordinate list...")
    stop_coordinates = [(s.lat, s.lon) for s in stops]
    depot_coordinates = [(d.lat, d.lon) for d in depots]
    combined_coordinates = stop_coordinates + depot_coordinates
    logger.info(f"Combined coordinates: {len(stop_coordinates)} stops + {len(depot_coordinates)} depots = {len(combined_coordinates)} total")

    logger.info("[STEP 5] Calling OSRM Table API...")
    stop_ids = [str(s.id) for s in stops]
    stop_names = {str(s.id): s.name for s in stops}
    depot_ids = [str(d.id) for d in depots]
    depot_names = {str(d.id): d.name for d in depots}

    t0 = time.time()
    table_result = await osrm_service.get_table(combined_coordinates)
    build_time = round(time.time() - t0, 2)
    logger.info(f"OSRM Table API completed in {build_time}s")

    logger.info("[STEP 6] Saving matrix to database...")
    depot_coords = {str(d.id): {"lat": d.lat, "lon": d.lon} for d in depots}
    matrix_data = {
        "stop_ids": stop_ids,
        "stop_names": stop_names,
        "durations": table_result["durations"],
        "distances": table_result["distances"],
        "depot_ids": depot_ids,
        "depot_names": depot_names,
        "depot_coords": depot_coords,
        "campus_location": {
            "lat": 28.26,
            "lon": 77.07
        }
    }

    dm = DistanceMatrix(
        matrix_json=matrix_data,
        stop_count=len(stops),
        build_time_seconds=build_time,
        stop_ids_json={"stop_ids": stop_ids, "depot_ids": depot_ids},
    )
    session.add(dm)
    await session.commit()
    await session.refresh(dm)

    logger.info(f"Matrix saved with ID: {dm.id}")
    logger.info(f"  - Student stops: {len(stops)}")
    logger.info(f"  - Depots: {len(depots)}")
    logger.info("=== MATRIX BUILD COMPLETED ===")

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
