# Sqlalchemy Get All Posts - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Databases-with-Python/Sqlalchemy-Get-All-Posts)

---

## Table of Contents

- Sqlalchemy Get All Posts
  - Establishing the Database Connection
  - Setting Up FastAPI and SQLAlchemy
  - Querying the Database Using SQLAlchemy
  - Understanding Query Execution
  - Transitioning from Raw SQL to SQLAlchemy ORM
  - Testing and Verification
  - Conclusion
  - Watch Video

---

## Content

Python API Development with FastAPI

Databases with Python

# Sqlalchemy Get All Posts

In this tutorial, you'll learn how to configure SQLAlchemy to create tables in PostgreSQL and how to query data using both raw SQL and SQLAlchemy's ORM within a FastAPI application. We will cover establishing a database connection, setting up models and dependencies, executing queries, and transitioning from raw SQL to ORM-based queries.

─────────────────────────────

## Establishing the Database Connection

Begin by defining your data model and establishing a connection to PostgreSQL using psycopg2. The code snippet below demonstrates the basic setup for the model, connection loop, and sample posts:

```
from pydantic import BaseModel
import psycopg2
from psycopg2.extras import RealDictCursor
import time


class Post(BaseModel):
    title: str
    content: str
    published: bool = True


while True:
    try:
        conn = psycopg2.connect(
            host='localhost',
            database='fastapi',
            user='postgres',
            password='password123',
            cursor_factory=RealDictCursor
        )
        cursor = conn.cursor()
        print("Database connection was successful!")
        break
    except Exception as error:
        print("Connecting to database failed")
        print("Error:", error)
        time.sleep(2)


my_posts = [
    {"title": "title of post 1", "content": "content of post 1", "id": 1},
    {"title": "favorite foods", "content": "I like pizza", "id": 2}
]
```

─────────────────────────────

## Setting Up FastAPI and SQLAlchemy

In your main application file, configure the FastAPI app alongside SQLAlchemy by setting up the database URL, engine, session, and dependency injection. Import your models and create all tables using `Base.metadata.create_all(bind=engine)`. See the example below:

```
from typing import Optional
from fastapi import FastAPI, Response, status, HTTPException, Depends
from fastapi.params import Body
from pydantic import BaseModel
from random import randrange
import psycopg2
from psycopg2.extras import RealDictCursor
import time
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from . import models
from .database import engine, get_db


models.Base.metadata.create_all(bind=engine)


app = FastAPI()


class Post(BaseModel):
    title: str
    content: str
    published: bool = True


while True:
    try:
        conn = psycopg2.connect(
            host='localhost',
            database='fastapi',
            user='postgres',
            password='password123',
            cursor_factory=RealDictCursor
        )
        cursor = conn.cursor()
        print("Database connection was successful!")
        break
    except Exception as error:
        print("Connecting to database failed")
        print("Error:", error)
        time.sleep(2)


my_posts = [
    {"title": "title of post 1", "content": "content of post 1", "id": 1},
    {"title": "favorite foods", "content": "I like pizza", "id": 2}
]
```

The database dependency function is defined in a separate module as follows:

```
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base


SQLALCHEMY_DATABASE_URL = 'postgresql://postgres:password123@localhost/fastapi'


engine = create_engine(SQLALCHEMY_DATABASE_URL)


SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


Base = declarative_base()


def get_db() -> Session:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

─────────────────────────────

## Querying the Database Using SQLAlchemy

FastAPI leverages dependency injection to perform database operations smoothly. Below are the examples of various endpoint routes:

- The root endpoint simply returns a welcome message.
- The `/sqlalchemy` endpoint uses SQLAlchemy's ORM to fetch all posts.
- The `/posts` endpoint demonstrates performing database queries using raw SQL with psycopg2.
- The `/posts` POST route inserts a new post into the database.

```
from fastapi import Depends


@app.get("/")
def root():
    return {"message": "Hello World"}


@app.get("/sqlalchemy")
def test_posts(db: Session = Depends(get_db)):
    # Using SQLAlchemy's ORM method to query all posts from the Post model.
    posts = db.query(models.Post).all()
    return {"data": posts}


@app.get("/posts")
def get_posts():
    # Raw SQL query to fetch posts using psycopg2.
    cursor.execute("SELECT * FROM posts")
    posts = cursor.fetchall()
    return {"data": posts}


@app.post("/posts", status_code=status.HTTP_201_CREATED)
def create_posts(post: Post):
    cursor.execute(
        "INSERT INTO posts (title, content, published) VALUES (%s, %s, %s) RETURNING *",
        (post.title, post.content, post.published)
    )
    conn.commit()
    new_post = cursor.fetchone()
    return {"data": new_post}
```

> [!important]
> **Tip**
>
> Notice how the `/sqlalchemy` endpoint injects the `db` session to safely query the database without managing manual connections.

─────────────────────────────

## Understanding Query Execution

SQLAlchemy delays executing a query until you explicitly request the results. Consider the following example:

```
@app.get("/sqlalchemy")
def test_posts(db: Session = Depends(get_db)):
    query = db.query(models.Post)  # This creates the query object.
    posts = query.all()            # The query executes here, fetching all posts.
    print(posts)
    return {"data": "successful"}
```

Before calling `.all()`, the query object represents the SQL command internally. Invoking `.all()` triggers the complete SQL command to be generated and executed against your PostgreSQL database.

─────────────────────────────

## Transitioning from Raw SQL to SQLAlchemy ORM

For a more maintainable and testable codebase, you can refactor your endpoints to utilize SQLAlchemy's ORM. Updating your `/posts` route to use the dependency-injected session simplifies the operation:

```
@app.get("/posts")
def get_posts(db: Session = Depends(get_db)):
    posts = db.query(models.Post).all()  # ORM-based query to retrieve all posts.
    return {"data": posts}
```

> [!important]
> **Benefits**
>
> Using the ORM approach reduces manual management of database connections and leverages dependency injection. This not only streamlines testing but also improves code maintainability.

─────────────────────────────

## Testing and Verification

After updating your endpoints, perform the following steps to verify your implementation:

1.  Verify that the PostgreSQL database contains a single post by executing the following SQL command:

    ```
    SELECT * FROM public.posts ORDER BY id ASC;
    ```

2.  Add a new post using the `/posts` endpoint. Then, make a new GET request to confirm that multiple posts are retrieved successfully.

The ORM approach encapsulates much of the SQL logic, allowing you to focus on building your FastAPI application while SQLAlchemy handles SQL generation behind the scenes.

─────────────────────────────

## Conclusion

By following these steps, you have learned how to:

- Establish a connection to PostgreSQL using psycopg2.
- Set up FastAPI with SQLAlchemy dependencies.
- Execute queries using both raw SQL and ORM-based methods.
- Transition your code towards a more maintainable ORM approach.

In the next lesson, we will dive deeper into creating posts and performing additional CRUD operations with SQLAlchemy. Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/1c3ad280-5fee-4b8e-a891-42a61f9a2dd0/lesson/3e3c01f3-f30d-4e9e-88f3-3bd25cc02d3e)**
>
> Watch video content
