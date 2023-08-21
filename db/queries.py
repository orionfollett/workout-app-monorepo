from typing import List
from db import tables
from db import Session
from datetime import datetime
from sqlalchemy import select

class DBSession():
    def __init__(self):
        self.session = Session()

    def insertWorkout(self, workout_name : str):
        self.session.add(tables.Workout(name=workout_name, timestamp=datetime.now()))
        self.session.flush()
        self.session.commit()

    def deleteWorkout(self, workout_id : int):
        delete_workout = self.session.get(tables.Workout, workout_id)

        if delete_workout is None:
            raise Exception(f'Invalid workout_id passed to deleteWorkout: {workout_id}')
        
        delete_slices = self.session.execute(select(tables.Slice).where(tables.Slice.workout_id == workout_id))
        for s in delete_slices:
            self.deleteSlice(s[0].id)

        self.session.delete(delete_workout)
        self.session.flush()
        self.session.commit()

    def insertSlice(self, workout_id : int, exercise_id : int):
        slice_exercise = self.session.get(tables.Exercise, exercise_id)
        slice_workout = self.session.get(tables.Workout, workout_id)
        
        if slice_exercise is None:
            raise Exception(f'Invalid exercise_id supplied to insertSlice: {exercise_id}')
        if slice_workout is None:
            raise Exception(f'Invalid workout_id supplied to insertSlice: {workout_id}')
        
        slice = tables.Slice()
        slice.exercise = slice_exercise
        slice.workout_id = workout_id
        self.session.add(slice)
        self.session.flush()
        self.session.commit()

    #need to delete all associated sets
    def deleteSlice(self, slice_id):
        delete_slice = self.session.get(tables.Slice, slice_id)
        if delete_slice is None:
            raise Exception(f'Invalid slice_id passed to deleteSlice: {slice_id}')
        delete_sets = self.session.execute(select(tables.Set).where(tables.Set.slice_id == slice_id))
        for set in delete_sets:
            self.session.delete(set[0])

        self.session.delete(delete_slice)
        self.session.flush()
        self.session.commit()

    def insertSet(self, slice_id: int, reps : int, weight : float):
        slice_insert = self.session.get(tables.Slice, slice_id)

        if slice_insert is None:
            raise Exception(f'Invalid slice_id supplied to insertSet: {slice_id}')
        
        newSet = tables.Set(reps=reps, weight=weight)
        newSet.slice = slice_insert
        self.session.add(newSet)
        self.session.flush()
        self.session.commit()

    def deleteSet(self, set_id: int):
        delete_set = self.session.get(tables.Set, set_id)

        if delete_set is None:
            raise Exception(f'Invalid set_id passed to deleteSet: {set_id}')
        
        self.session.delete(delete_set)
        self.session.flush()
        self.session.commit()

    def insertExercise(self, exercise_name :str):
        exercise = tables.Exercise(name=exercise_name)
        self.session.add(exercise)
        self.session.flush()
        self.session.commit()

    def deleteExercise(self, exercise_id: int):
        e = self.session.get(tables.Exercise, exercise_id)
        if e is None:
            raise Exception(f'Invalid exercise_id supplied to deleteExercise: {exercise_id}')
        self.session.delete(e)
        self.session.flush()
        self.session.commit()

    def __del__(self):
        self.session.close()