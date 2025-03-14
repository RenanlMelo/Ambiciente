from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from api.database import SessionLocal
from api.schemas import Report

router = APIRouter()

# Dependência do banco
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Upload de um arquivo e salvar no banco
@router.post("/upload/")
async def upload_file(file: UploadFile = File(...), db: Session = Depends(get_db)):
    file_path = f"uploads/{file.filename}"

    # Salvar o arquivo no sistema de arquivos
    with open(file_path, "wb") as f:
        f.write(await file.read())

    # Criar entrada no banco
    db_file = Report(file=file_path)
    db.add(db_file)
    db.commit()
    db.refresh(db_file)

    return {"message": "Arquivo enviado!", "file_id": db_file.id}

# Buscar todos os relatórios
@router.get("/")
def get_reports(db: Session = Depends(get_db)):
    return db.query(Report).all()
