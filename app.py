from ariadne import make_executable_schema
from ariadne.asgi import GraphQL
from ariadne import load_schema_from_path
import api.resolvers

type_defs = load_schema_from_path("./schema.graphql")
schema = make_executable_schema(type_defs, [api.resolvers.query, api.resolvers.mutation])
app = GraphQL(schema, debug=True)