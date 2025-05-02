from pydantic import BaseModel, EmailStr
from typing import Optional, List

class UserCreate(BaseModel):
    name: str
    last_name: str
    email: EmailStr
    password: str
    role: Optional[str] = "user"

class UserOut(BaseModel):
    id: int
    name: str
    last_name: str
    email: EmailStr
    role: str

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str
    user_id: int
    role: str

class TokenData(BaseModel):
    email: EmailStr | None = None
    role: Optional[str] = None

class UserDeleteRequest(BaseModel):
    user_ids: List[int]