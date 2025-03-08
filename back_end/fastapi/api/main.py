from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from api.database import SessionLocal, engine, Base
from api.models import Article, Topic
from api.schemas import ArticleCreate, ArticleUpdate
import uuid

app = FastAPI()

# Configurando o CORS para permitir requisições de localhost:3000
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite requisições do frontend (localhost:3000)
    allow_credentials=True,
    allow_methods=["*"],  # Permite qualquer método HTTP (GET, POST, etc.)
    allow_headers=["*"],  # Permite qualquer cabeçalho
)

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.delete("/artigos/{article_id}", status_code=204)
def delete_article(article_id: int, db: Session = Depends(get_db)):
    db_article = db.query(Article).filter(Article.id == article_id).first()
    
    if db_article is None:
        raise HTTPException(status_code=404, detail="Artigo não encontrado")

    db.delete(db_article)
    db.commit()
    return


@app.get("/artigos")
def get_articles(db: Session = Depends(get_db)):
    return db.query(Article).all()


@app.get("/artigos/{slug}", response_model=ArticleCreate)
def get_article_by_slug(slug: str, db: Session = Depends(get_db)):
    db_article = db.query(Article).filter(Article.slug == slug).first()
    if db_article is None:
        raise HTTPException(status_code=404, detail="Artigo não encontrado")
    return db_article


@app.post("/artigos", response_model=ArticleCreate)
def create_article(article: ArticleCreate, db: Session = Depends(get_db)):
    # Loop até encontrar um slug único
    while True:
        article_slug = str(uuid.uuid4())[:12]  # Gera um UUID truncado
        # Verifica se o slug já existe no banco de dados
        if not db.query(Article).filter(Article.slug == article_slug).first():
            break  # Se não houver slug igual, sai do loop

    db_article = Article(
        title=article.title,
        subtitle=article.subtitle,  # Apenas subtitle
        slug=article_slug,  # Garantir que o slug gerado no POST é mantido
        topics=[Topic(title=t.title, content=t.content) for t in article.topics]
    )
    
    db.add(db_article)
    db.commit()
    db.refresh(db_article)

    return db_article


@app.put("/artigos/{slug}", response_model=ArticleUpdate)
def update_article(article: ArticleUpdate, slug: str, db: Session = Depends(get_db)):
    db_article = db.query(Article).filter(Article.slug == slug).first()

    if db_article is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Artigo não encontrado")

    # Não modificar o slug
    db_article.title = article.title
    db_article.subtitle = article.subtitle
    db_article.topics = [
        Topic(title=t.title, content=t.content) for t in article.topics
    ]
    db.commit()
    db.refresh(db_article)

    return db_article

