from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form, Request
from sqlalchemy.orm import selectinload, Session
from uuid import uuid4
import shutil, os
import json
import uuid

from app.schemas.article import ArticleCreate, ArticleUpdate, ArticleResponse
from app.models.article import Article, Topic
from app.database import SessionLocal

router = APIRouter()  # Definição do roteador

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/")
def get_articles(db: Session = Depends(get_db)):
    return db.query(Article).all()


@router.get("/{slug}", response_model=ArticleCreate)
def get_article_by_slug(slug: str, request: Request, db: Session = Depends(get_db)):
    db_article = db.query(Article).filter(Article.slug == slug).first()
    if db_article is None:
        raise HTTPException(status_code=404, detail="Artigo não encontrado")

    # Gera URL pública para a imagem
    image_url = None
    if db_article.image_url:
        relative_path = db_article.image_url.replace("static/", "")
        image_url = request.url_for("static", path=relative_path)

    return {
        "title": db_article.title,
        "subtitle": db_article.subtitle,
        "slug": db_article.slug,
        "topics": [
            {"title": t.title, "content": t.content} for t in db_article.topics
        ],
        "image_url": str(image_url) if image_url else None,
    }



@router.post("/", response_model=ArticleResponse)
async def create_article(
    title: str = Form(...),
    subtitle: str = Form(...),
    topics: str = Form(...),  # Esperado como string JSON
    image: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    while True:
        article_slug = str(uuid.uuid4())[:12]
        if not db.query(Article).filter(Article.slug == article_slug).first():
            break

    image_url = None
    if image:
        print(f"AQUIDVBFUQEF static/images/{article_slug}_{image.filename}".replace("\\", "/"))
        filename = f"static/images/{article_slug}_{image.filename}".replace("\\", "/")
        os.makedirs("static/images", exist_ok=True)
        with open(filename, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)
        image_url = f"/{filename}"

    # Parse dos tópicos recebidos como JSON
    topics_data = json.loads(topics)
    db_article = Article(
        title=title,
        subtitle=subtitle,
        slug=article_slug,
        image_url=image_url
    )

    db_article.topics = [
        Topic(title=t["title"], content=t["content"]) for t in topics_data
    ]

    db.add(db_article)
    db.commit()
    db.refresh(db_article)

    return db_article


@router.put("/{slug}", response_model=ArticleUpdate)
def update_article(
    slug: str,
    title: str = Form(...),
    subtitle: str = Form(...),
    topics: str = Form(...),
    image_url: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    db_article = db.query(Article).filter(Article.slug == slug).first()
    if not db_article:
        raise HTTPException(status_code=404, detail="Artigo não encontrado")

    # campos textuais
    db_article.title = title
    db_article.subtitle = subtitle

    # validação extra: garantir que o arquivo é imagem
    if image_url:
        if not image_url.content_type.startswith("image/"):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="O arquivo enviado não é uma imagem."
            )

        # grava no disco e atualiza image_url
        filename = f"{uuid4().hex}_{image_url.filename}"
        image_path = os.path.join("static", "images", filename)
        os.makedirs(os.path.dirname(image_path), exist_ok=True)
        with open(image_path, "wb") as f:
            f.write(image_url.file.read())
        db_article.image_url = f"/static/images/{filename}".replace("\\", "/")

    # tópicos
    db.query(Topic).filter(Topic.article_id == db_article.id).delete()
    try:
        parsed_topics = json.loads(topics)
        new_topics = [
            Topic(title=t["title"], content=t["content"], article_id=db_article.id)
            for t in parsed_topics
        ]
        db.add_all(new_topics)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Erro ao processar tópicos: {e}")

    db.commit()
    db.refresh(db_article)
    return db_article


@router.delete("/{article_slug}", status_code=204)
def delete_article(article_slug: str, db: Session = Depends(get_db)):
    db_article = db.query(Article).filter(Article.slug == article_slug).first()
    
    if db_article is None:
        raise HTTPException(status_code=404, detail="Artigo não encontrado")

    db.delete(db_article)
    db.commit()
    return
