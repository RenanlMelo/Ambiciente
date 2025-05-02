from pydantic import BaseModel, Field, EmailStr, ConfigDict
from datetime import date, datetime
from typing import Optional
from enum import Enum

class DenunciaBase(BaseModel):
    descricao_ocorrido: str = Field(..., min_length=10)
    local_ocorrido: str
    data_ocorrido: date
    impactos_ocorrido: str
    responsavel: Optional[str] = None
    is_anonimo: bool = False
    nome: Optional[str] = None
    sobrenome: Optional[str] = None
    telefone: Optional[str] = None

    # Configuração para Pydantic v2
    model_config = ConfigDict(from_attributes=True)

class DenunciaCreate(DenunciaBase):
    pass

class DenunciaFotoResponse(BaseModel):
    id: int
    filename: str

    model_config = ConfigDict(from_attributes=True)

class DenunciaStatusEnum(str, Enum):
    EM_ANDAMENTO = "Em andamento"
    CONCLUIDA    = "Concluída"
    REJEITADA    = "Rejeitada"

class DenunciaResponse(DenunciaBase):
    id: int
    email: Optional[EmailStr] = None 
    data_criacao: datetime
    id_usuario: int
    status: DenunciaStatusEnum

    model_config = ConfigDict(from_attributes=True)

class DenunciaStatusUpdate(BaseModel):
    status: DenunciaStatusEnum