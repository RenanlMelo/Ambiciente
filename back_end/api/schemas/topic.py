from pydantic import BaseModel

class TopicBase(BaseModel):
    title: str
    content: str

class TopicCreate(TopicBase):
    pass

class Topic(TopicBase):
    id: int

    class Config:
        orm_mode = True