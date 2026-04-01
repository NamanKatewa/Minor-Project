from pydantic_settings import BaseSettings
from pydantic import computed_field
from functools import lru_cache


class Settings(BaseSettings):
    database_url: str = "postgresql://user:password@localhost:5432/ufos"

    jwt_secret: str = "your-nextauth-secret"
    jwt_algorithm: str = "HS256"

    osrm_url: str = "http://localhost:5000"

    allowed_origins: list[str] = ["http://localhost:3000"]

    debug: bool = False

    # Optimization settings
    fuel_cost_per_km: float = 50.0
    campus_lat: float = 28.26
    campus_lon: float = 77.07
    max_bus_capacity: int = 50
    max_ride_time_min: int = 350
    arrival_deadline: str = "08:45"
    optimization_timeout_sec: int = 300
    
    # --- OR-Tools Solver Knobs ---
    drop_penalty: int = 100000
    time_dimension_slack: int = 30
    fixed_vehicle_cost: int = 1000
    
    # Split Delivery: Allow splitting stop demand across multiple buses
    enable_split_delivery: bool = True
    
    # --- OR-Tools Strategy Configurations ---
    
    # First Solution Strategy: How the solver builds the very first valid route.
    # Options:
    # - PATH_CHEAPEST_ARC: [Greedy] Starts from depot and picks the nearest stop. Fast, but can leave distant stops stranded.
    # - PARALLEL_CHEAPEST_INSERTION: [Global Packing] Builds all routes at once. Best for fitting as many students as possible into fewer buses.
    # - SAVINGS: [Distance Focus] Starts with one bus per stop and merges them to save the most distance. Classic for reducing mileage.
    # - CHRISTOFIDES: [Mathematical] Uses graph theory to find a "guaranteed" good start. Useful for complex, scattered maps.
    # - LOCAL_CHEAPEST_INSERTION: [Local Packing] Adds stops to a single route at a time. Good balance of speed and packing.
    first_solution_strategy: str = "PATH_CHEAPEST_ARC"
    
    # Local Search Metaheuristic: How the solver tries to improve the first solution.
    # Options:
    # - GUIDED_LOCAL_SEARCH: [Best All-Rounder] Penalizes bad routes to force the solver to find smarter shortcuts. Most reliable.
    # - TABU_SEARCH: [Tight Capacity] Remembers recent moves and forbids "undoing" them. Excellent for "packing" buses to the limit.
    # - SIMULATED_ANNEALING: [Global Optimizer] Explores widely early on and gets stricter over time. Best if you increase the timeout.
    # - GREEDY_DESCENT: [Quick Fix] Only accepts moves that immediately improve the route. Fast, but gets stuck easily.
    local_search_metaheuristic: str = "GUIDED_LOCAL_SEARCH"

    @computed_field
    @property
    def async_database_url(self) -> str:
        """Convert postgresql:// to postgresql+asyncpg:// for async SQLAlchemy."""
        url = self.database_url
        if url.startswith("postgresql://"):
            return url.replace("postgresql://", "postgresql+asyncpg://", 1)
        return url

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


@lru_cache
def get_settings() -> Settings:
    return Settings()

