from sqlalchemy.orm import Session
from app.core.logger import logger
from app.models.order import Order
from app.schemas.order import OrderCreate
from app.services.currency_service import get_inr_to_usd_rate


def create_order(db: Session, order: OrderCreate):

    db_order = Order(
        customer_name=order.customer_name,
        amount=order.amount,
        status="Pending"
    )

    db.add(db_order)
    db.commit()
    db.refresh(db_order)

    logger.info(
        "Order created | id=%s customer=%s",
        db_order.id,
        db_order.customer_name,
    )

    return db_order

def get_orders(db: Session):

    orders = db.query(Order).all()

    rate = get_inr_to_usd_rate()

    for order in orders:

        order.amount_usd = round(float(order.amount) * rate, 2)

    return orders

def get_order_by_id(db: Session, order_id: int):

    return db.query(Order).filter(Order.id == order_id).first()

def update_order_status(
    db: Session,
    order: Order,
    status: str,
):

    order.status = status

    db.commit()

    db.refresh(order)

    logger.info(
        "Order updated | id=%s status=%s",
        order.id,
        order.status,
    )

    return order

def delete_order(
    db: Session,
    order: Order,
):
    db.delete(order)
    db.commit()

    logger.info(
        "Order deleted | id=%s",
        order.id,
    )