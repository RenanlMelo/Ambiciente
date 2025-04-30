from fastapi import APIRouter, Depends, HTTPException, Form, status
from app.schemas.denuncia import DenunciaResponse
from app.utils.auth import get_current_user
from app.models.denuncia import Denuncia
from sqlalchemy.orm import Session
from typing import Optional, List
from app.database import get_db
from datetime import datetime

router = APIRouter()

@router.post("/enviar/", status_code=status.HTTP_201_CREATED, response_model=DenunciaResponse)
async def create_denuncia(
    descricao: str = Form(..., min_length=10),
    local: str = Form(...),
    data: str = Form(...),
    impactos: str = Form(...),
    responsavel: Optional[str] = Form(None),
    is_anonimo: bool = Form(False),
    nome: Optional[str] = Form(None),
    sobrenome: Optional[str] = Form(None),
    email: Optional[str] = Form(None),
    telefone: Optional[str] = Form(None),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    # Validação da data
    try:
        data_obj = datetime.strptime(data, "%Y-%m-%d").date()
    except ValueError:
        raise HTTPException(400, "Formato de data inválido, use YYYY-MM-DD")

    # Lógica para usuário anônimo
    if is_anonimo:
        nome = sobrenome = email = telefone = None
    else:
        email = email or current_user.email

    # Cria a denúncia
    denuncia = Denuncia(
        descricao_ocorrido=descricao,
        local_ocorrido=local,
        data_ocorrido=data_obj,
        impactos_ocorrido=impactos,
        responsavel=responsavel,
        is_anonimo=is_anonimo,
        nome=nome,
        sobrenome=sobrenome,
        email=email,
        telefone=telefone,
        id_usuario=current_user.id
    )

    db.add(denuncia)
    db.commit()
    db.refresh(denuncia)

    return denuncia


@router.get(
    "/minhas/",
    response_model=List[DenunciaResponse],
    status_code=200,
    summary="Listar denúncias do usuário logado"
)
async def list_minhas_denuncias(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """
    Retorna todas as denúncias criadas pelo usuário autenticado.
    """
    # Busca no banco todas as denúncias onde id_usuario == usuário atual
    denuncias = (
        db
        .query(Denuncia)
        .filter(Denuncia.id_usuario == current_user.id)
        .order_by(Denuncia.data_ocorrido.desc())  # opcional: ordena da mais recente para a mais antiga
        .all()
    )
    return denuncias

