from sqlalchemy import Column, Integer, String, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.database import Base

# No modelo Article
class Article(Base):
    __tablename__ = 'articles'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    subtitle = Column(String)
    slug = Column(String, unique=True, index=True)
    image_url = Column(String, nullable=True)
    topics = relationship("Topic", back_populates="article")

# No modelo Topic
class Topic(Base):
    __tablename__ = 'topics'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    content = Column(String)
    article_id = Column(Integer, ForeignKey('articles.id'))
    article = relationship("Article", back_populates="topics")
