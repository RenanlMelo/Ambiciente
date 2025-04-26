from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from app.models.user import LoginForm
from sqlalchemy.orm import Session

from app.schemas.user import UserCreate, UserOut, Token
from app.models.user import User
from app.database import get_db  # Alteração importante aqui
from app.auth import (
    get_password_hash,
    verify_password,
    create_access_token,
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
    
    - **username**: Nome de usuário único
    - **email**: E-mail válido
    - **password**: Senha com pelo menos 6 caracteres
    """
    # Verifica se usuário ou email já existem
    db_user = db.query(User).filter(
        (User.username == user.username) | 
        (User.email == user.email)
    ).first()
    
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username or email already registered"
        )
    
    hashed_password = get_password_hash(user.password)
    db_user = User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_password
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
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(
        data={"sub": user.email},
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    
    return {
        "access_token": access_token, 
        "token_type": "bearer",
        "user_id": user.id  # Adição útil para o frontend
    }


@router.get("/me", response_model=UserOut)
async def read_current_user(
    current_user: User = Depends(get_current_user)  # Usando o modelo User diretamente
):
    """
    Obtém os dados do usuário atualmente autenticado.
    """
    return current_user

