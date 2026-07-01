from fastapi import FastAPI

from app.api.orders import router as order_router
from app.core.config import settings

app = FastAPI(
    title=settings.APP_NAME,
    version="1.0.0",
    description="Real-Time Order Management Dashboard API",
)

app.include_router(order_router)


@app.get("/")
def root():
    return {
        "message": "Order Management API is running",
        "version": "1.0.0",
    }