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

