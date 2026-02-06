from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from config import get_settings
from database import engine
from routers import health_router, auth_router, stops_router, buses_router, depots_router, demand_router

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("API starting...")
    async with engine.begin() as conn:
        await conn.execute(text("SELECT 1"))
    print("Database connected successfully")
    yield
    await engine.dispose()
    print("API shutting down...")


app = FastAPI(
    title="UFOS API",
    description="University Fleet Optimization System API",
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(auth_router)
app.include_router(stops_router)
app.include_router(buses_router)
app.include_router(depots_router)
app.include_router(demand_router)


@app.get("/")
async def root():
    return {"message": "UFOS API", "docs": "/docs"}
