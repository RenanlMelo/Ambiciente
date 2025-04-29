from sqlalchemy import Column, Integer, String, Text, Date, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base

class Denuncia(Base):
    __tablename__ = "denuncias"
    id = Column(Integer, primary_key=True, index=True)
    descricao_ocorrido = Column(Text, nullable=False)
    local_ocorrido = Column(String(255), nullable=False)
    data_ocorrido = Column(Date, nullable=False)
    impactos_ocorrido = Column(Text, nullable=False)
    responsavel = Column(String(255), nullable=True)
    is_anonimo = Column(Boolean, default=False)
    nome = Column(String(100), nullable=True)
    sobrenome = Column(String(100), nullable=True)
    email = Column(String(100), nullable=True) 
    telefone = Column(String(20), nullable=True)
    data_criacao = Column(DateTime(timezone=True), server_default=func.now())
    id_usuario = Column(Integer, ForeignKey("users.id"), nullable=False)

    fotos = relationship("DenunciaFoto", backref="denuncia", cascade="all, delete-orphan")

class DenunciaFoto(Base):
    __tablename__ = "denuncias_fotos"
    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String(255), nullable=False)
    denuncia_id = Column(Integer, ForeignKey("denuncias.id"), nullable=False)