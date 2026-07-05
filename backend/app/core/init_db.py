from sqlalchemy.orm import Session

from app.db.session import SessionLocal
from app.models.user import User
from app.core.security import hash_password
from app.core.logger import logger


def create_default_admin():
    db: Session = SessionLocal()

    try:
        admin = (
            db.query(User)
            .filter(User.username == "admin")
            .first()
        )

        if admin:
            logger.info("Default admin user already exists.")
            return

        admin = User(
            username="admin",
            hashed_password=hash_password("admin123"),
        )

        db.add(admin)
        db.commit()

        logger.info("=" * 60)
        logger.info("Default admin user created")
        logger.info("Username : admin")
        logger.info("Password : admin123")
        logger.info("=" * 60)

    finally:
        db.close()