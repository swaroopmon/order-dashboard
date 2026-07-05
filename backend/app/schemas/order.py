from datetime import datetime
from decimal import Decimal
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field


class OrderCreate(BaseModel):
    customer_name: str = Field(..., min_length=2, max_length=100)
    amount: Decimal = Field(..., gt=0)


class OrderStatusUpdate(BaseModel):
    status: Literal["Pending", "Processing", "Completed"]



class OrderResponse(BaseModel):
    id: int
    customer_name: str
    amount: Decimal
    status: str
    created_at: datetime
    amount_usd: float | None = None

    model_config = ConfigDict(from_attributes=True)