from fastapi import Depends, HTTPException, status
from typing import Annotated
from app.models.user import User
from app.utils.auth import get_current_user

class RoleChecker:
    def __init__(self, allowed_roles: list[str]):
        self.allowed_roles = allowed_roles

    def __call__(self, user: Annotated[User, Depends(get_current_user)]):
        if user.role in self.allowed_roles:
            return user
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Você não tem permissão suficiente"
        )

role_checker_admin = RoleChecker(allowed_roles=["admin"])
role_checker_staff = RoleChecker(allowed_roles=["admin", "staff"])
role_checker_user = RoleChecker(allowed_roles=["admin", "staff", "user"])