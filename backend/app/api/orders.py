from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.security import get_current_user
from app.db.session import get_db
from app.models.user import User
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
    delete_order,
)

from app.websocket.connection_manager import manager

router = APIRouter(
    prefix="/orders",
    tags=["Orders"],
)


@router.post("/", response_model=OrderResponse)
def create_new_order(
    order: OrderCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return create_order(db, order)


@router.get("/", response_model=list[OrderResponse])
def get_all_orders(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_orders(db)


@router.get("/{order_id}", response_model=OrderResponse)
def get_order(
    order_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    order = get_order_by_id(db, order_id)

    if order is None:
        raise HTTPException(
            status_code=404,
            detail="Order not found",
        )

    return order


@router.patch("/{order_id}/status", response_model=OrderResponse)
async def update_status(
    order_id: int,
    status: OrderStatusUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    order = get_order_by_id(db, order_id)

    if order is None:
        raise HTTPException(
            status_code=404,
            detail="Order not found",
        )

    updated_order = update_order_status(
        db,
        order,
        status.status,
    )


    await manager.broadcast(
        {
            "event": "order_updated",
            "order": {
                "id": updated_order.id,
                "customer_name": updated_order.customer_name,
                "amount": float(updated_order.amount),
                "status": updated_order.status,
                "created_at": str(updated_order.created_at),
            },
        }
    )


    return updated_order

@router.delete("/{order_id}", status_code=204)
async def delete_order_api(
    order_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    order = get_order_by_id(db, order_id)

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    delete_order(db, order)
