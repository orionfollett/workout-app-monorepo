# Workout API

source ./.venv/bin/activate
uvicorn app:app

## /db
- Database layer, uses SQL Alchemy.
- Provides queries and table objects to interact with database

## /api
- Defines graphql api and hooks up resolvers and mutations to the db layer


