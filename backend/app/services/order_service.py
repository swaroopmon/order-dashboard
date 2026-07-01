from sqlalchemy.orm import Session

from app.models.order import Order
from app.schemas.order import OrderCreate


def create_order(db: Session, order: OrderCreate):

    db_order = Order(
        customer_name=order.customer_name,
        amount=order.amount,
        status="Pending"
    )

    db.add(db_order)
    db.commit()
    db.refresh(db_order)

    return db_order

def get_orders(db: Session):

    return db.query(Order).all()

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

    return order