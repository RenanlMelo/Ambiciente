from pydantic import BaseModel
from typing import List

class TopicBase(BaseModel):
    title: str
    content: str

class TopicCreate(TopicBase):
    pass

class Topic(TopicBase):
    id: int

    class Config:
        orm_mode = True

class ArticleBase(BaseModel):
    title: str
    subtitle: str
    slug: str  # Mantendo apenas slug, title e subtitle

class ArticleCreate(ArticleBase):
    topics: List[TopicCreate] = []  # Lista dinâmica de tópicos

class Article(ArticleBase):
    id: int
    topics: List[Topic] = []

    class Config:
        orm_mode = True

class ArticleUpdate(BaseModel):
    title: str
    subtitle: str
    topics: List[TopicCreate] = []