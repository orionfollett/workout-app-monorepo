from ariadne import make_executable_schema
from ariadne.asgi import GraphQL
from ariadne import load_schema_from_path
import api.resolvers

from starlette.middleware.cors import CORSMiddleware

type_defs = load_schema_from_path("../schema.graphql")
schema = make_executable_schema(type_defs,
                                [api.resolvers.query,
                                 api.resolvers.mutation,
                                 api.resolvers.exerciseObject,
                                 api.resolvers.sliceObject,
                                 api.resolvers.workoutObject])
app = CORSMiddleware(GraphQL(schema, debug=True), allow_origins=[
                     'http://localhost:5173'], allow_methods=['POST', 'OPTIONS', 'GET'])
