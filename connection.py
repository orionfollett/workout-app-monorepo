from sqlalchemy import create_engine, Column, Integer, String, DateTime, Session
from sqlalchemy.orm import declarative_base

Base = declarative_base()
class Workout(Base):
    __tablename__ = "workouts"
    id = Column(Integer, primary_key=True)
    timestamp = Column(DateTime)
    name = Column(String)

    def __repr__(self):
        return f'id: {self.id} timestamp: {self.timestampe}'

engine = create_engine("sqlite:///test.db", echo=True)
session = Session(engine)

workout = Workout(name="w1")

