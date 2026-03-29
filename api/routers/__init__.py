from .health import router as health_router
from .auth import router as auth_router
from .stops import router as stops_router
from .buses import router as buses_router
from .depots import router as depots_router
from .demand import router as demand_router
from .demand_map import router as demand_map_router
from .dashboard import router as dashboard_router
from .generate_routes import router as generate_routes_router
from .routes import router as routes_router

__all__ = [
    "health_router",
    "auth_router",
    "stops_router",
    "buses_router",
    "depots_router",
    "demand_router",
    "demand_map_router",
    "dashboard_router",
    "generate_routes_router",
    "routes_router",
]
