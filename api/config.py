from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    database_url: str = "postgresql+asyncpg://user:password@localhost:5432/ufos"
    
    jwt_secret: str = "your-nextauth-secret"
    jwt_algorithm: str = "HS256"
    
    osrm_url: str = "http://localhost:5000"
    
    debug: bool = False

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


@lru_cache
def get_settings() -> Settings:
    return Settings()
