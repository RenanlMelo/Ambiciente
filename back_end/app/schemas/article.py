from pydantic import BaseModel
from typing import List
from app.schemas.topic import Topic, TopicCreate

class ArticleBase(BaseModel):
    title: str
    subtitle: str

class Article(ArticleBase):
    id: int
    slug: str 
    topics: List[Topic] = []

    class Config:
        orm_mode = True

class ArticleCreate(ArticleBase):
    topics: List[TopicCreate] = []  # Lista dinâmica de tópicos

class ArticleUpdate(BaseModel):
    title: str
    subtitle: str
    topics: List[TopicCreate] = []

# Novo modelo de resposta para refletir os dados completos após a criação
class ArticleResponse(ArticleBase):
    slug: str
    topics: List[Topic] = []

    class Config:
        orm_mode = True
