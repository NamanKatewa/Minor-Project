"""Clustering service — finds stops within configurable distance threshold"""

import math


def haversine_m(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    R = 6_371_000
    phi1, phi2 = math.radians(lat1), math.radians(lat2)
    dphi = math.radians(lat2 - lat1)
    dlambda = math.radians(lon2 - lon1)
    a = math.sin(dphi / 2) ** 2 + math.cos(phi1) * math.cos(phi2) * math.sin(dlambda / 2) ** 2
    return R * 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))


def find_clusters(
    stops: list[dict],
    threshold_m: float = 500.0,
) -> list[dict]:
    n = len(stops)
    visited = [False] * n
    clusters: list[dict] = []

    for i in range(n):
        if visited[i]:
            continue
        group = [stops[i]]
        max_dist = 0.0
        for j in range(i + 1, n):
            if visited[j]:
                continue
            d = haversine_m(
                stops[i]["lat"], stops[i]["lon"],
                stops[j]["lat"], stops[j]["lon"],
            )
            if d <= threshold_m:
                group.append(stops[j])
                max_dist = max(max_dist, d)
                visited[j] = True

        if len(group) > 1:
            visited[i] = True
            clusters.append({
                "stops": group,
                "max_distance_m": round(max_dist, 1),
            })

    return clusters
