from sqlalchemy import Integer, String, Date, Boolean, DateTime
from sqlalchemy.orm import Mapped, mapped_column
from datetime import datetime, date
from app.database import Base
from typing import Optional


class Denuncia(Base):
    __tablename__ = "denuncias"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    descricao_ocorrido: Mapped[str] = mapped_column(String)
    local_ocorrido: Mapped[str] = mapped_column(String)
    data_ocorrido: Mapped[date] = mapped_column(Date)
    impactos_ocorrido: Mapped[str] = mapped_column(String)
    responsavel: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    is_anonimo: Mapped[bool] = mapped_column(Boolean, default=False)
    nome: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    sobrenome: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    email: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    telefone: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    data_criacao: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    id_usuario: Mapped[int] = mapped_column(Integer, nullable=False)
