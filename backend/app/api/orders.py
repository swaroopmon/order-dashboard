from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.order import (
    OrderCreate,
    OrderResponse,
    OrderStatusUpdate,
)
from app.services.order_service import (
    create_order,
    get_orders,
    get_order_by_id,
    update_order_status,
)

router = APIRouter(
    prefix="/orders",
    tags=["Orders"],
)


@router.post("/", response_model=OrderResponse)
def create_new_order(
    order: OrderCreate,
    db: Session = Depends(get_db),
):
    return create_order(db, order)


@router.get("/", response_model=list[OrderResponse])
def get_all_orders(
    db: Session = Depends(get_db),
):
    return get_orders(db)


@router.get("/{order_id}", response_model=OrderResponse)
def get_order(
    order_id: int,
    db: Session = Depends(get_db),
):
    order = get_order_by_id(db, order_id)

    if order is None:
        raise HTTPException(
            status_code=404,
            detail="Order not found",
        )

    return order


@router.patch("/{order_id}/status", response_model=OrderResponse)
def update_status(
    order_id: int,
    status: OrderStatusUpdate,
    db: Session = Depends(get_db),
):
    order = get_order_by_id(db, order_id)

    if order is None:
        raise HTTPException(
            status_code=404,
            detail="Order not found",
        )

    return update_order_status(
        db,
        order,
        status.status,
    )