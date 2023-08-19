#import db
import db.queries

print("Main:")

workouts = db.queries.getAllWorkouts()
print(workouts)
