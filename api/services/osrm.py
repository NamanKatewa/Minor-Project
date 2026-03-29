"""OSRM client service for distance matrix and routing"""

import httpx
from fastapi import HTTPException
from config import get_settings

settings = get_settings()


class OsrmService:
    def __init__(self):
        self.base_url = settings.osrm_url
        self.client = httpx.AsyncClient(timeout=300.0)

    async def health_check(self) -> bool:
        try:
            resp = await self.client.get(
                f"{self.base_url}/nearest/v1/driving/77.0,28.5"
            )
            return resp.status_code == 200
        except httpx.RequestError:
            return False

    async def get_table(
        self, coordinates: list[tuple[float, float]]
    ) -> dict:
        n = len(coordinates)
        if n <= 100:
            return await self._fetch_table(coordinates)

        durations = [[0.0] * n for _ in range(n)]
        distances = [[0.0] * n for _ in range(n)]

        batch_size = 80

        for src_start in range(0, n, batch_size):
            src_end = min(src_start + batch_size, n)
            src_coords = coordinates[src_start:src_end]

            for dst_start in range(0, n, batch_size):
                dst_end = min(dst_start + batch_size, n)
                dst_coords = coordinates[dst_start:dst_end]

                combined = src_coords + dst_coords
                src_indices = list(range(len(src_coords)))
                dst_indices = list(range(len(src_coords), len(combined)))

                result = await self._fetch_table(
                    combined,
                    sources=src_indices,
                    destinations=dst_indices,
                )

                for si, src_idx in enumerate(range(src_start, src_end)):
                    for di, dst_idx in enumerate(range(dst_start, dst_end)):
                        dur = result["durations"][si][di]
                        dist = result["distances"][si][di]
                        durations[src_idx][dst_idx] = dur if dur is not None else -1
                        distances[src_idx][dst_idx] = dist if dist is not None else -1

        return {"durations": durations, "distances": distances}

    async def _fetch_table(
        self,
        coordinates: list[tuple[float, float]],
        sources: list[int] | None = None,
        destinations: list[int] | None = None,
    ) -> dict:
        coords_str = ";".join(f"{lon},{lat}" for lat, lon in coordinates)
        url = f"{self.base_url}/table/v1/driving/{coords_str}"
        params = {"annotations": "duration,distance"}

        if sources is not None:
            params["sources"] = ";".join(str(s) for s in sources)
        if destinations is not None:
            params["destinations"] = ";".join(str(s) for s in destinations)

        resp = await self.client.get(url, params=params)
        data = resp.json()

        if resp.status_code != 200 or data.get("code") != "Ok":
            msg = data.get("message") or data.get("code") or f"HTTP {resp.status_code}"
            raise HTTPException(status_code=502, detail=f"OSRM error: {msg}")

        return data

    async def get_route(
        self, coordinates: list[tuple[float, float]]
    ) -> dict:
        coords_str = ";".join(f"{lon},{lat}" for lat, lon in coordinates)
        url = f"{self.base_url}/route/v1/driving/{coords_str}"
        params = {
            "overview": "full",
            "geometries": "geojson",
            "annotations": "duration,distance",
        }

        resp = await self.client.get(url, params=params)
        data = resp.json()

        if resp.status_code != 200 or data.get("code") != "Ok":
            msg = data.get("message") or data.get("code") or f"HTTP {resp.status_code}"
            raise HTTPException(status_code=502, detail=f"OSRM route error: {msg}")

        return data


osrm_service = OsrmService()
