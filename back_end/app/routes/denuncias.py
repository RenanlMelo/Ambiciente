from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from datetime import datetime
from typing import List, Optional
from app.schemas.denuncia import DenunciaResponse
from app.database import get_db
from app.models.denuncia import Denuncia, DenunciaFoto

router = APIRouter()

@router.post("/enviar/", response_model=DenunciaResponse)
async def enviar_denuncia(
    descricao: str = Form(...),
    local: str = Form(...),
    data: str = Form(...),
    impactos: str = Form(...),
    responsavel: Optional[str] = Form(None),
    is_anonimo: bool = Form(...),
    nome: Optional[str] = Form(None),
    sobrenome: Optional[str] = Form(None),
    email: Optional[str] = Form(None),
    telefone: Optional[str] = Form(None),
    fotos: Optional[List[UploadFile]] = None,
    db: Session = Depends(get_db)
):
    # Converter data_ocorrido de string para date (formato YYYY-MM-DD)
    try:
        data_obj = datetime.strptime(data, "%d-%m-%Y").date()
    except ValueError:
        raise HTTPException(status_code=400, detail="Formato de data_ocorrido inválido, use YYYY-MM-DD")
    
    # Se for denúncia anônima, limpar dados pessoais
    if is_anonimo:
        nome = None
        sobrenome = None
        telefone = None

    # Criar objeto Denuncia (sem fotos por enquanto)
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
        telefone=telefone
    )
    db.add(denuncia)
    db.commit()
    db.refresh(denuncia)  # obtém o ID gerado de denúncia

    # Processar cada arquivo de foto enviado
    if fotos:
        for arquivo in fotos:
            # Ler conteúdo do arquivo para validação
            contents = await arquivo.read()
            # Validar tamanho máximo de 5MB
            if len(contents) > 5 * 1024 * 1024:
                raise HTTPException(
                    status_code=400, 
                    detail=f"Arquivo {arquivo.filename} maior que 5MB"
                )
            # Validar tipo de imagem (JPEG ou PNG)
            if arquivo.content_type not in ("image/jpeg", "image/png"):
                raise HTTPException(
                    status_code=400,
                    detail=f"Tipo de arquivo inválido ({arquivo.content_type}). Use JPEG ou PNG."
                )
            # Salvar arquivo no servidor (pode ser substituído por upload em outro serviço)
            file_path = f"imagens_denuncias/{denuncia.id}_{arquivo.filename}"
            with open(file_path, "wb") as f:
                f.write(contents)
            # Criar registro na tabela denuncias_fotos
            foto_model = DenunciaFoto(denuncia_id=denuncia.id, path=file_path)
            db.add(foto_model)
        db.commit()

    # Recarregar denúncia para incluir a lista de fotos pelo relacionamento
    db.refresh(denuncia)
    return denuncia
