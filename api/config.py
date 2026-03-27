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
    optimization_timeout_sec: int = 120

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

