from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
import secrets
from app.database import get_db, Session
from app.models.user import User

# Configurações (deveriam estar em variáveis de ambiente)
SECRET_KEY = secrets.token_urlsafe(64)
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60
REFRESH_TOKEN_EXPIRE_DAYS = 7

# Modelo para o token
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

# Configuração do Password Hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Esquema de segurança HTTP Bearer
bearer_scheme = HTTPBearer()

# --------------------------
# Funções Principais
# --------------------------

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verifica se a senha plain corresponde ao hash"""
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    """Gera um hash seguro para a senha"""
    return pwd_context.hash(password)


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({
        "exp": expire,
        "type": "access",
    })
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)



def create_refresh_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


async def get_current_user(
    creds: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    db: Session = Depends(get_db),
) -> User:
    token = creds.credentials
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Não foi possível validar credenciais",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        token_type: str = payload.get("type")
        # --- logs de depuração ---
        print("JWT payload:", payload)
        if not email or token_type != "access":
            raise credentials_exception
    except JWTError as e:
        print("JWTError:", e)
        raise credentials_exception

    user = db.query(User).filter(User.email == email).first()
    print("User fetched from DB:", getattr(user, "id", None), getattr(user, "email", None))
    if not user:
        raise credentials_exception
    return user

# --------------------------
# Funções Adicionais (Opcionais)
# --------------------------

def generate_password_reset_token(email: str) -> str:
    """Gera token para reset de senha"""
    expires = timedelta(hours=1)
    return create_access_token(data={"sub": email}, expires_delta=expires)

def verify_password_reset_token(token: str) -> Optional[str]:
    """Valida token de reset de senha"""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            return None
        return email
    except JWTError:
        return None
    
def refresh_access_token(refresh_token: str):
    """Gera um novo access_token a partir de um refresh_token válido"""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate refresh token",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        payload = jwt.decode(refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        token_type: str = payload.get("type")
        
        if email is None or token_type != "refresh":
            raise credentials_exception
        
    except JWTError:
        raise credentials_exception

    # Agora, gerar novo access_token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    new_access_token = jwt.encode(
        {
            "sub": email,
            "type": "access",
            "exp": (datetime.utcnow() + access_token_expires)
        },
        SECRET_KEY,
        algorithm=ALGORITHM
    )
    
    return new_access_token