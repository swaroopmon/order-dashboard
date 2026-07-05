from sqlalchemy.orm import Session

from app.models.user import User
from app.core.security import verify_password, create_access_token


def authenticate_user(db: Session, username: str, password: str):

    user = (
        db.query(User)
        .filter(User.username == username)
        .first()
    )

    if not user:
        return None

    if not verify_password(password, user.hashed_password):
        return None

    return user


def login_user(db: Session, username: str, password: str):

    user = authenticate_user(db, username, password)

    if not user:
        return None

    token = create_access_token(
        data={"sub": user.username}
    )

    return {
        "access_token": token,
        "token_type": "bearer",
    }