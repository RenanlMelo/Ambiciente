from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
import uuid
from typing import List

from api.database import SessionLocal
from api.models.user import User
from api.schemas.sign_in import UserCreate, UserBase, UserOut

router = APIRouter()  # Definição do roteador

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# "Banco de dados" em memória para demonstração
users_db = {}
next_id = 1

@router.post("/", response_model=UserOut)
def create_user(user: UserCreate):
    global next_id
    user_out = UserOut(id=next_id, name=user.name, email=user.email)
    # Em um cenário real, nunca armazene a senha em texto puro.
    users_db[next_id] = {"user": user_out, "password": user.password}
    next_id += 1
    return user_out

@router.get("/", response_model=List[UserOut])
def read_users():
    return [entry["user"] for entry in users_db.values()]

@router.get("/{user_id}", response_model=UserOut)
def read_user(user_id: int):
    if user_id in users_db:
        return users_db[user_id]["user"]
    raise HTTPException(status_code=404, detail="User not found")

@router.put("/{user_id}", response_model=UserOut)
def update_user(user_id: int, user: UserBase):
    if user_id in users_db:
        updated_user = UserOut(id=user_id, name=user.name, email=user.email)
        users_db[user_id]["user"] = updated_user
        return updated_user
    raise HTTPException(status_code=404, detail="User not found")

@router.delete("/{user_id}")
def delete_user(user_id: int):
    if user_id in users_db:
        del users_db[user_id]
        return {"message": "User deleted successfully"}
    raise HTTPException(status_code=404, detail="User not found")