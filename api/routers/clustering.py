"""Clustering router — stop proximity suggestions"""

from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db
from models import Stop
from schemas.matrix import ClusteringSuggestionsResponse, ClusteringSuggestion, StopInfo
from services.clustering import find_clusters

router = APIRouter(prefix="/api/clustering", tags=["clustering"])


@router.get("/suggestions", response_model=ClusteringSuggestionsResponse)
async def get_clustering_suggestions(
    threshold_m: float = 500.0,
    session: AsyncSession = Depends(get_db),
):
    result = await session.execute(
        select(Stop).where(Stop.active == True, Stop.lat.isnot(None), Stop.lon.isnot(None))
    )
    stops = result.scalars().all()

    stop_dicts = [
        {"id": str(s.id), "name": s.name, "lat": s.lat, "lon": s.lon}
        for s in stops
    ]

    raw_clusters = find_clusters(stop_dicts, threshold_m=threshold_m)

    suggestions = [
        ClusteringSuggestion(
            stops=[StopInfo(**s) for s in c["stops"]],
            max_distance_m=c["max_distance_m"],
        )
        for c in raw_clusters
    ]

    return ClusteringSuggestionsResponse(
        suggestions=suggestions,
        threshold_m=threshold_m,
        total_groups=len(suggestions),
    )
