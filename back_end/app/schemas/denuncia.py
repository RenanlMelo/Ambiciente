from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import date, datetime

class DenunciaBase(BaseModel):
    descricao_ocorrido: str = Field(..., min_length=10)
    local_ocorrido: str
    data_ocorrido: date
    impactos_ocorrido: str
    responsavel: Optional[str] = None
    is_anonimo: bool = False
    nome: Optional[str]
    sobrenome: Optional[str]
    telefone: Optional[str]

class DenunciaCreate(DenunciaBase):
    pass 

class DenunciaFotoResponse(BaseModel):
    id: int
    filename: str

    class Config:
        orm_mode = True

class DenunciaResponse(DenunciaBase):
    id: int
    fotos: Optional[DenunciaFotoResponse] = []
    email: EmailStr
    data_criacao: datetime
    id_usuario: int

    class Config:
        orm_mode = True
