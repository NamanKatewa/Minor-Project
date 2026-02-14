from .health import router as health_router
from .auth import router as auth_router
from .stops import router as stops_router
from .buses import router as buses_router
from .depots import router as depots_router
from .demand import router as demand_router
from .matrix import router as matrix_router
from .clustering import router as clustering_router
from .dashboard import router as dashboard_router
from .optimization import router as optimization_router

__all__ = [
    "health_router",
    "auth_router",
    "stops_router",
    "buses_router",
    "depots_router",
    "demand_router",
    "matrix_router",
    "clustering_router",
    "dashboard_router",
    "optimization_router",
]
