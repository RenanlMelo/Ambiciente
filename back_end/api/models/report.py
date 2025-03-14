from sqlalchemy import Column, Integer, String, ForeignKey, Text, LargeBinary
from sqlalchemy.orm import relationship

# FOR PROD
from api.database import Base
# FOR HML
# from database import Base

class Report(Base):
    __tablename__ = "reports"

    id = Column(Integer, primary_key=True, index=True)
    what = Column(String, index=True)
    where = Column(String, index=True)
    when = Column(String, index=True)
    who = Column(String, index=True)
    impact = Column(String, index=True)
    file = Column(LargeBinary)