from api.database import Base
from sqlalchemy import Column, Integer, String

# Modelo User
class User(Base):
    __tablename__= 'users'

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True)
    email = Column(String, unique=True)
    hashed_Password = Column(String)
