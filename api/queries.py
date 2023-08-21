from ariadne import QueryType
import db.queries
import db.tables

query = QueryType()

@query.field("exercise")
def resolve_exercise(*_, id : int):
    session = db.queries.DBSession()
    result = session.session.get(db.tables.Exercise, id)
    if result:
        return result.name
    else:
        return "not found"

    