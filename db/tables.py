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
        return f'(id: {self.id} name: {self.name} timestamp: {self.timestamp})'

class Exercise(Base):
    __tablename__= "exercises"
    id = mapped_column(Integer, primary_key=True)
    name = mapped_column(String)

    def __repr__(self):
        return f'(id: {self.id} name: {self.name})'

class Slice(Base):
    __tablename__= "slices"
    id = mapped_column(Integer, primary_key=True)
    workout_id: Mapped[int] = mapped_column(ForeignKey("workouts.id"))
    workout: Mapped["Workout"] = relationship(back_populates="slices")
    exercise_id : Mapped[int] = mapped_column(ForeignKey("exercises.id"))
    exercise : Mapped["Exercise"] = relationship()
    sets: Mapped[List["Set"]] = relationship(back_populates="slice")

    def __repr__(self):
        return f'(id: {self.id} exercise: {self.exercise} workout: {self.workout})'

class Set(Base):
    __tablename__= "sets"
    id = mapped_column(Integer, primary_key=True)
    reps = mapped_column(Integer)
    weight = mapped_column(Float)
    slice_id : Mapped[int] = mapped_column(ForeignKey("slices.id"))
    slice : Mapped["Slice"] = relationship(back_populates="sets")

    def __repr__(self):
        return f'(id: {self.id} reps: {self.reps} weight: {self.weight})'
    #reference to parent slice id

#Create the tables to create fresh database
#Base.metadata.create_all(engine)

# #exercises
# pushups = Exercise(name="Pushups")
# pullups = Exercise(name="Pullups")
# overhead_press = Exercise(name="Overhead Press")
# bent_over_rows = Exercise(name="Barbell Bent Over Rows")

# #sets
# pu_set1 = Set(reps=10)
# pu_set2 = Set(reps=8)
# plu_set1 = Set(reps=7)
# plu_set2 = Set(reps=6)
# plu_set3 = Set(reps=5)

# #slices
# pushups_slice = Slice()
# pushups_slice.exercise = pushups
# pushups_slice.sets.append(pu_set1)
# pushups_slice.sets.append(pu_set2)

# pullups_slice = Slice()
# pullups_slice.exercise = pullups
# pullups_slice.sets.append(plu_set1)
# pullups_slice.sets.append(plu_set2)
# pullups_slice.sets.append(plu_set3)

# #workout
# workout = Workout(name="first workout", timestamp=datetime.now())
# workout.slices.append(pushups_slice)
# workout.slices.append(pullups_slice)



# session.add_all([pushups, pullups, overhead_press, bent_over_rows])
# session.add_all([pu_set1, pu_set2, plu_set1, plu_set2, plu_set3])
# session.add_all([pushups_slice, pullups_slice])
# session.add(workout)

# session.flush()
# session.commit()

#session = Session(engine)
# result = session.get(Workout, 1)
# print(result.name if not result is None else "no result")
# #select(Workout).where(True)
# session.close()

print("Database session started.")