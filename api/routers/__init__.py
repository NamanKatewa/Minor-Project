from .health import router as health_router
from .auth import router as auth_router
from .stops import router as stops_router
from .buses import router as buses_router
from .depots import router as depots_router
from .demand import router as demand_router

__all__ = [
    "health_router",
    "auth_router",
    "stops_router",
    "buses_router",
    "depots_router",
    "demand_router",
]
