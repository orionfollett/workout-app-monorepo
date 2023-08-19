from typing import List
from db import tables
from db import Session
from datetime import datetime

session = Session()


#workout queries

#start a new workout
def insertWorkout(workout_name : str):
    session.add(tables.Workout(name=workout_name, timestamp=datetime.now()))
    session.flush()
    session.commit()

#start a new slice in a workout
def insertSlice(workout_id : int, exercise_id : int):
    slice_exercise = session.get(tables.Exercise, exercise_id)
    slice_workout = session.get(tables.Workout, workout_id)
    
    if slice_exercise is None:
        raise Exception(f'Invalid exercise_id supplied to insertSlice: {exercise_id}')
    if slice_workout is None:
        raise Exception(f'Invalid workout_id supplied to insertSlice: {workout_id}')
    
    slice = tables.Slice()
    slice.exercise = slice_exercise
    slice.workout_id = workout_id
    session.add(slice)
    session.flush()
    session.commit()

#start a new set in a slice
def insertSet(slice_id: int, reps : int, weight : float):
    slice_insert = session.get(tables.Slice, slice_id)

    if slice_insert is None:
        raise Exception(f'Invalid slice_id supplied to insertSet: {slice_id}')
    
    newSet = tables.Set(reps=reps, weight=weight)
    newSet.slice = slice_insert
    session.add(newSet)
    session.flush()
    session.commit()

#add an exercise
def insertExercise(exercise_name :str):
    exercise = tables.Exercise(name=exercise_name)
    session.add(exercise)
    session.flush()
    session.commit()

#call at the end of session use
def shutdown():
    session.close()