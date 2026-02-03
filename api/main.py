from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import get_settings
from routers import health_router

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("API starting...")
    yield
    print("API shutting down...")


app = FastAPI(
    title="UFOS API",
    description="University Fleet Optimization System API",
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)


@app.get("/")
async def root():
    return {"message": "UFOS API", "docs": "/docs"}
