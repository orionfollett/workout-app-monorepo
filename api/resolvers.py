from ariadne import QueryType, MutationType, ObjectType
import db.queries
import db.tables

mutation = MutationType()
query = QueryType()
exerciseObject = ObjectType("Exercise")
sliceObject = ObjectType("Slice")
setObject = ObjectType("Set")
workoutObject = ObjectType("Workout")

session = db.queries.DBSession()

# query{exercise(id:4){id name}}
@query.field("exercise")
def resolve_exercise(*_, id : int):
    result = session.session.get(db.tables.Exercise, id)
    if not result:
        return None
    return {'name': result.name,'id': result.id }

#mutation{addExercise(name:"Tricep Pushdown")}
@mutation.field("addExercise")
def resolve_add_exercise(*_, name : str):
    session.insertExercise(name)
    

# mutation{deleteExercise(id:7)}
@mutation.field("deleteExercise")
def resolve_delete_exercise(*_, id : int):
    session.deleteExercise(id)
    

# query{slice(id:2){id exercise{id name}}}
@query.field("slice")
def resolve_slice(*_, id : int):
    slice = session.session.get(db.tables.Slice, id)
    
    if not slice:
        return {'error': 'Not Found'}
    
    sets = map(lambda set : {'id': set.id, 'reps': set.reps, 'weight': set.weight}, slice.sets)
    return {'id': slice.id, 'exercise': {'id': slice.exercise_id}, 'sets': sets}

@sliceObject.field("exercise")
def resolve_slice_exercise(slice, *_):
    return resolve_exercise(id=slice['exercise']['id'])

# query{workout(id:1){slices{exercise{name} sets{reps weight}}}}
# optimize number of db calls with specialized get request?
@query.field("workout")
def resolve_workout(*_, id: int):
    workout = session.session.get(db.tables.Workout, id)
    if not workout:
        return None
    return {'id': workout.id, 'name': workout.name, 'timestamp': workout.timestamp}

@workoutObject.field("slices")
def resolve_workout_slice(workout, *_):
    slices = session.getSlicesOnWorkout(workout['id'])
    slices_mapped = map(lambda slice: resolve_slice(id=slice.id), slices)
    return slices_mapped

@mutation.field("addSlice")
def resolve_add_slice(*_, workout_id, exercise_id):
    session.insertSlice(workout_id, exercise_id)

@mutation.field("addWorkout")
def resolve_add_workout(*_, name):
    session.insertWorkout(name)

@mutation.field("addSet")
def resolve_add_set(*_, reps, weight, slice_id):
    session.insertSet(slice_id, reps, weight)

@mutation.field("deleteWorkout")
def delete_workout(*_, id):
    session.deleteWorkout(id)

@mutation.field("deleteSlice")
def delete_slice(*_, id):
    session.deleteSlice(id)

@mutation.field("deleteSet")
def delete_set(*_, id):
    session.deleteSet()

@query.field("allWorkouts")
def resolve_all_workouts(*_):
    workouts = session.getAllWorkouts()
    return map(lambda w : resolve_workout(id=w.id), workouts)

@query.field("allExercise")
def resolve_all_exercise(*_):
    exercises = session.getAllExercises()
    return map(lambda e: resolve_exercise(id=e.id), exercises)
