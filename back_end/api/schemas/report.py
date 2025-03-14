class Report(Base):
    __tablename__ = "reports"

    id = Column(Integer, primary_key=True, index=True)
    what = Column(String, index=True)
    where = Column(String, index=True)
    when = Column(String, index=True)
    who = Column(String, index=True)
    impact = Column(String, index=True)
    file = Column(LargeBinary)