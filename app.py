from ariadne import make_executable_schema
from ariadne.asgi import GraphQL
from ariadne import load_schema_from_path
import api.queries
import api.mutations

type_defs = load_schema_from_path("./schema.graphql")
schema = make_executable_schema(type_defs, [api.queries.query, api.mutations.mutation])
app = GraphQL(schema, debug=True)