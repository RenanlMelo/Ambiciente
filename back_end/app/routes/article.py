from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
import uuid

from app.database import SessionLocal
from app.models.article import Article, Topic
from app.schemas.article import ArticleCreate, ArticleUpdate, ArticleResponse

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
def get_article_by_slug(slug: str, db: Session = Depends(get_db)):
    db_article = db.query(Article).filter(Article.slug == slug).first()
    if db_article is None:
        raise HTTPException(status_code=404, detail="Artigo não encontrado")
    return db_article


@router.post("/", response_model=ArticleResponse)
def create_article(article: ArticleCreate, db: Session = Depends(get_db)):
    while True:
        article_slug = str(uuid.uuid4())[:12]
        if not db.query(Article).filter(Article.slug == article_slug).first():
            break

    db_article = Article(
        title=article.title,
        subtitle=article.subtitle,
        slug=article_slug,
    )

    db_article.topics = [
        Topic(title=t.title, content=t.content) for t in article.topics
    ]
    
    db.add(db_article)
    db.commit()
    db.refresh(db_article)

    return db_article  # Retorna um ArticleResponse


@router.put("/{slug}", response_model=ArticleUpdate)
def update_article(article: ArticleUpdate, slug: str, db: Session = Depends(get_db)):
    db_article = db.query(Article).filter(Article.slug == slug).first()

    if db_article is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Artigo não encontrado")

    db_article.title = article.title
    db_article.subtitle = article.subtitle

    # Remover tópicos antigos
    db.query(Topic).filter(Topic.article_id == db_article.id).delete()

    # Adicionar novos tópicos
    new_topics = [Topic(title=t.title, content=t.content, article_id=db_article.id) for t in article.topics]
    db.add_all(new_topics)

    db.commit()
    db.refresh(db_article)

    return db_article



@router.delete("/{article_title}", status_code=204)
def delete_article(article_title: str, db: Session = Depends(get_db)):
    db_article = db.query(Article).filter(Article.title == article_title).first()
    
    if db_article is None:
        raise HTTPException(status_code=404, detail="Artigo não encontrado")

    db.delete(db_article)
    db.commit()
    return
