from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.auth import router as auth_router
from app.api.orders import router as order_router
from app.api.websocket import router as websocket_router

from app.core.config import settings
from app.core.init_db import create_default_admin


app = FastAPI(
    title=settings.APP_NAME,
    version="1.0.0",
    description="Order Management Dashboard API",
)


@app.on_event("startup")
def startup_event():
    create_default_admin()


app.include_router(auth_router)
app.include_router(order_router)
app.include_router(websocket_router)


@app.get("/")
def root():
    return {
        "message": "Order Management API is running",
        "version": "1.0.0",
    }


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)