from app.schemas.topic import Topic, TopicCreate
from typing import List, Optional
from pydantic import BaseModel

class ArticleBase(BaseModel):
    title: str
    subtitle: str
    image_url: Optional[str] = None

class Article(ArticleBase):
    id: int
    slug: str 
    topics: List[Topic] = []

    class Config:
        orm_mode = True

class ArticleCreate(ArticleBase):
    topics: List[TopicCreate] = []  # Lista dinâmica de tópicos

class ArticleUpdate(ArticleBase):
    slug: str
    image_url: Optional[str]
    topics: List[TopicCreate] = []

# Novo modelo de resposta para refletir os dados completos após a criação
class ArticleResponse(ArticleBase):
    slug: str
    topics: List[Topic] = []

    class Config:
        orm_mode = True
