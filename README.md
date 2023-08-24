# Monorepo structure

# Workout API
A uvicorn ariadne graphQL API

Quickstart:

cd workout-api
python3 -m pipenv shell
uvicorn app:app

## /db
- Database layer, uses SQL Alchemy.
- Provides queries and table objects to interact with database

## /api
- Defines graphql api and hooks up resolvers and mutations to the db layer

# Workout-Web
React front end web application that consumes workout API

