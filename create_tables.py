from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.orm import declarative_base

Base = declarative_base()
class Workout(Base):
    __tablename__ = "workouts"
    id = Column(Integer, primary_key=True)
    timestamp = Column(DateTime)
    name = Column(String)

    def __repr__(self):
        return f'id: {self.id} timestamp: {self.timestampe}'

class Slice(Base):
    __tablename__="slices"
    id = Column(Integer, primary_key=True)
    exercise=Column(String)
    #sets many
    #exercise reference
engine = create_engine("sqlite:///test.db", echo=True)
Base.metadata.create_all(engine)