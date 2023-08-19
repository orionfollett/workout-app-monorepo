from typing import List
from db import tables
from db import Session

session = Session()

def getAllWorkouts() -> List[tables.Workout]:
    return session.query(tables.Workout).all()

