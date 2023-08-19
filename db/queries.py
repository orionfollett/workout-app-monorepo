from typing import List
from db import tables
from db import Session
from datetime import datetime
from sqlalchemy import select

session = Session()

def insertWorkout(workout_name : str):
    session.add(tables.Workout(name=workout_name, timestamp=datetime.now()))
    session.flush()
    session.commit()

def deleteWorkout(workout_id : int):
    delete_workout = session.get(tables.Workout, workout_id)

    if delete_workout is None:
        raise Exception(f'Invalid workout_id passed to deleteWorkout: {workout_id}')
    
    delete_slices = session.execute(select(tables.Slice).where(tables.Slice.workout_id == workout_id))
    for s in delete_slices:
        deleteSlice(s[0].id)

    session.delete(delete_workout)
    session.flush()
    session.commit()

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

#need to delete all associated sets
def deleteSlice(slice_id):
    delete_slice = session.get(tables.Slice, slice_id)
    if delete_slice is None:
        raise Exception(f'Invalid slice_id passed to deleteSlice: {slice_id}')
    delete_sets = session.execute(select(tables.Set).where(tables.Set.slice_id == slice_id))
    for set in delete_sets:
        session.delete(set[0])

    session.delete(delete_slice)
    session.flush()
    session.commit()

def insertSet(slice_id: int, reps : int, weight : float):
    slice_insert = session.get(tables.Slice, slice_id)

    if slice_insert is None:
        raise Exception(f'Invalid slice_id supplied to insertSet: {slice_id}')
    
    newSet = tables.Set(reps=reps, weight=weight)
    newSet.slice = slice_insert
    session.add(newSet)
    session.flush()
    session.commit()

def deleteSet(set_id: int):
    delete_set = session.get(tables.Set, set_id)

    if delete_set is None:
        raise Exception(f'Invalid set_id passed to deleteSet: {set_id}')
    
    session.delete(delete_set)
    session.flush()
    session.commit()

def insertExercise(exercise_name :str):
    exercise = tables.Exercise(name=exercise_name)
    session.add(exercise)
    session.flush()
    session.commit()

def deleteExercise(exercise_id: int):
    e = session.get(tables.Exercise, exercise_id)
    if e is None:
        raise Exception(f'Invalid exercise_id supplied to deleteExercise: {exercise_id}')
    session.delete(e)
    session.flush()
    session.commit()

#no need for get by id, supplied by session object easily
#
#then start working on GraphQL API

#call at the end of session use
def shutdown():
    session.close()