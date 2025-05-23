from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status, Body
from app.models.user import LoginForm
from sqlalchemy.orm import Session

from app.schemas.user import UserCreate, UserOut, Token, UserDeleteRequest
from app.models.user import User
from app.database import get_db  # Alteração importante aqui
from app.utils.auth import (
    get_password_hash,
    verify_password,
    create_access_token,
    create_refresh_token,
    refresh_access_token,
    get_current_user,
    ACCESS_TOKEN_EXPIRE_MINUTES
)

router = APIRouter()

@router.post("/register", response_model=UserOut, status_code=status.HTTP_201_CREATED)  # Status code mais adequado
async def register_user(
    user: UserCreate,
    db: Session = Depends(get_db)  # Usando a dependência centralizada
):
    """
    Cria um novo usuário no sistema.
    
    - **name**: Nome de usuário
    - **last_name**: Último nome de usuário
    - **email**: E-mail válido
    - **password**: Senha com pelo menos 6 caracteres
    """
    # Verifica se usuário ou email já existem
    db_user = db.query(User).filter(
        (User.email == user.email)
    ).first()
    
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="email already registered"
        )
    
    hashed_password = get_password_hash(user.password)
    db_user = User(
        name=user.name,
        last_name=user.last_name,
        email=user.email,
        hashed_password=hashed_password,
        role=user.role
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


@router.post("/token", response_model=Token)
async def login_for_access_token(
    form_data: LoginForm = Depends(),
    db: Session = Depends(get_db)
):
    """
    Autenticação do usuário e obtenção de token JWT.
    
    - **email**: Seu email
    - **password**: Sua senha
    """
    user = db.query(User).filter(User.email == form_data.email).first()
    
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(
        data={"sub": user.email, "role": user.role},
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    refresh_token = create_refresh_token(
        data={"sub": user.email, "role": user.role},
    )
    
    return {
        "access_token": access_token, 
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "user_id": user.id,
        "role": user.role,
    }


@router.get("/me", response_model=UserOut)
async def read_current_user(
    current_user: User = Depends(get_current_user)  # Usando o modelo User diretamente
):
    """
    Obtém os dados do usuário atualmente autenticado.
    """
    return current_user


@router.post("/refresh", status_code=status.HTTP_200_OK)
async def refresh_token(refresh_token: str = Body(..., embed=True)):
    """
    Rota para gerar um novo access_token a partir de um refresh_token válido.
    """
    try:
        new_access_token = refresh_access_token(refresh_token)
    except HTTPException as e:
        raise e
    
    return {
        "access_token": new_access_token,
        "token_type": "bearer"
    }


@router.get("/all_users", response_model=list[UserOut])
async def get_all_users(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Obtém todos os usuários do sistema.
    """
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    users = db.query(User).filter(User.id != current_user.id).all()
    return users


@router.delete("/delete_user", status_code=status.HTTP_204_NO_CONTENT) 
async def delete_user(
    payload: UserDeleteRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Deleta múltiplos usuários do sistema.
    
    - **user_ids**: Lista de IDs dos usuários a serem deletados
    """
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    users = db.query(User).filter(User.id.in_(payload.user_ids)).all()
    
    if not users :
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    for user in users:
        db.delete(user)

    db.commit()
    return {"detail": f"{len(users)} users deleted successfully"}