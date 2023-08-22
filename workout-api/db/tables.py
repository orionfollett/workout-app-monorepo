from sqlalchemy import create_engine , Integer, String, DateTime, Float, ForeignKey, select
from typing import List
from sqlalchemy.orm import declarative_base, relationship, Mapped, Session ,mapped_column
from datetime import datetime
Base = declarative_base()

class Workout(Base):
    __tablename__ = "workouts"
    id : Mapped[int] = mapped_column(Integer, primary_key=True)
    timestamp: Mapped[DateTime] = mapped_column(DateTime)
    name : Mapped[String] = mapped_column(String)
    slices : Mapped[List["Slice"]] = relationship(back_populates="workout")

    def __repr__(self):
        return f'WORKOUT: (id: {self.id} name: {self.name} timestamp: {self.timestamp}); '

class Exercise(Base):
    __tablename__= "exercises"
    id = mapped_column(Integer, primary_key=True)
    name = mapped_column(String)

    def __repr__(self):
        return f'EXERCISE: (id: {self.id} name: {self.name}); '

class Slice(Base):
    __tablename__= "slices"
    id = mapped_column(Integer, primary_key=True)
    workout_id: Mapped[int] = mapped_column(ForeignKey("workouts.id"))
    workout: Mapped["Workout"] = relationship(back_populates="slices")
    exercise_id : Mapped[int] = mapped_column(ForeignKey("exercises.id"))
    exercise : Mapped["Exercise"] = relationship()
    sets: Mapped[List["Set"]] = relationship(back_populates="slice")

    def __repr__(self):
        return f'SLICE: (id: {self.id} exercise: {self.exercise} workout: {self.workout}); '

class Set(Base):
    __tablename__= "sets"
    id = mapped_column(Integer, primary_key=True)
    reps = mapped_column(Integer)
    weight = mapped_column(Float)
    slice_id : Mapped[int] = mapped_column(ForeignKey("slices.id"))
    slice : Mapped["Slice"] = relationship(back_populates="sets")

    def __repr__(self):
        return f'SET: (id: {self.id} reps: {self.reps} weight: {self.weight}); '
    #reference to parent slice id

#Create the tables to create fresh database
#Base.metadata.create_all(engine)


print("Database session started.")