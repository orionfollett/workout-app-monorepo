import db.queries
import db.tables

print("Main:")
session = db.Session()

#insert some data
# db.queries.insertWorkout("Orion's Workout") #be nice if this returned the id of the latest insert
# db.queries.insertWorkout("Orion's Workout") #be nice if this returned the id of the latest insert
# db.queries.insertSlice(1, 2) #same on all inserts
# db.queries.insertSlice(1, 3)
# db.queries.insertSlice(1, 4)
# db.queries.insertSlice(2, 2) #same on all inserts
# db.queries.insertSlice(2, 3)
# db.queries.insertSlice(2, 4)

# db.queries.insertSet(1,10, 130)
# db.queries.insertSet(1,11, 130)
# db.queries.insertSet(1,5, 145)

# db.queries.insertSet(2,3, 13)
# db.queries.insertSet(2,4, 13)





db.queries.shutdown()