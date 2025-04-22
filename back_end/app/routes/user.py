from http import HTTPStatus
from fastapi import APIRouter
from ..schemas.user import UserSchema, UserPublic
import uuid
from sqlalchemy import b

router = APIRouter()

@router.post('/users')
def create_user(user: UserSchema, status_code= HTTPStatus.CREATED, response_model=UserPublic):
    return user