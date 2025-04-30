from fastapi import APIRouter, Depends
from app.models.user import User
from app.utils.role import role_checker_admin, role_checker_staff, role_checker_user

router = APIRouter()

@router.get("/admin-only")
async def admin_area(current_user: User = Depends(role_checker_admin)):
    return {"message": "Área exclusiva de Admin"}

@router.get("/staff-area")
async def funcionario_area(current_user: User = Depends(role_checker_staff)):
    return {"message": "Área de funcionários e admins"}

@router.get("/area-comum")
async def common_area(current_user: User = Depends(role_checker_user)):
    return {"message": "Área para qualquer usuário logado"}
