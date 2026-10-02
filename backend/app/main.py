from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.auth import router as auth_router


app = FastAPI(
    title="FreshHive API",
    description="Backend API for FreshHive Grocery Website",
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth_router)


@app.get("/")
def home():
    return {
        "message": "FreshHive API is running"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }