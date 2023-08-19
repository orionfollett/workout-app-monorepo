from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine

print("Database session starting...")
engine = create_engine("sqlite:///db/test.db", echo=True)
Session = sessionmaker(bind=engine) 