import db.queries
import db.tables

print("Main:")
session = db.Session()
# print(session.query(db.tables.Slice).all())
# db.queries.insertSlice(3,2)
# print(session.query(db.tables.Slice).all())
# print(session.get(db.tables.Slice, 3))
db.queries.insertExercise("Squat")
db.queries.shutdown()