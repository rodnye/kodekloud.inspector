# Pydantic Sqlalchemy Models - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Advanced-FastAPI/Pydantic-Sqlalchemy-Models)

---

## Table of Contents

- Pydantic Sqlalchemy Models
  - FastAPI Setup and Basic Imports
  - Differentiating Between Pydantic and SQLAlchemy Models
  - Connecting to the Database
  - Path Operations and Request Validation
  - SQLAlchemy Model Definition
  - Summary
  - Watch Video
    - Pydantic Model (Schema)
    - SQLAlchemy Model (ORM)

---

## Content

Python API Development with FastAPI

Advanced FastAPI

# Pydantic Sqlalchemy Models

This article clarifies the differences between a schema (Pydantic model) and an ORM (SQLAlchemy model) by demonstrating their roles within a FastAPI application. The Pydantic model validates incoming requests and outgoing responses, while the SQLAlchemy model establishes the database table structure.

## FastAPI Setup and Basic Imports

Below is an initial code snippet showing the essential imports and setup for the FastAPI application:

```
from random import randrange
import psycopg2
from psycopg2.extras import RealDictCursor
import time
from sqlalchemy.orm import Session
from sqlalchemy.sql.functions import mode
from fastapi import FastAPI, Depends, status
from pydantic import BaseModel
from . import models
from .database import engine, get_db


models.Base.metadata.create_all(bind=engine)
app = FastAPI()


class Post(BaseModel):
    title: str
    content: str
    published: bool = True


while True:
    # This loop demonstrates an example of a service running continuously.
    pass
```

The following log output confirms that the application starts successfully and provides examples of handling PUT requests:

```
INFO:     Application startup complete.
INFO:     127.0.0.1:54950 - "PUT /posts/1 HTTP/1.1" 200 OK
INFO:     127.0.0.1:65135 - "PUT /posts/12342324 HTTP/1.1" 404 Not Found
```

> [!important]
> **Understanding Models**
>
> Remember that the Pydantic model is primarily used for request/response data validation, while the SQLAlchemy model is used to define the persistent data structure of your database.

## Differentiating Between Pydantic and SQLAlchemy Models

### Pydantic Model (Schema)

The Pydantic model serves to:

- **Define Data Structure:** Outline the expected structure of the request body.
- **Validate Incoming Data:** Ensure that the data received adheres to the specified types and constraints.
- **Shape Response Data:** Optionally filter and format data before sending a response.

### SQLAlchemy Model (ORM)

The SQLAlchemy model is dedicated to defining the database table structure. It includes:

- **Column Definitions:** Attributes such as post ID, title, content, published status, and creation timestamps.
- **Database Interaction Methods:** Functions to query, create, delete, and update database entries.

## Connecting to the Database

Enhance your understanding with the following code snippet that illustrates how to connect to a PostgreSQL database using psycopg2:

```
from random import randrange
import psycopg2
from psycopg2.extras import RealDictCursor
import time
from sqlalchemy.orm import Session
from sqlalchemy.sql.functions import mode
from fastapi import FastAPI, Depends, status
from pydantic import BaseModel
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
        print("Connection failed:", error)
        time.sleep(2)
```

Again, the log output confirms the successful startup of the application and its request handling capabilities:

```
INFO:     Application startup complete.
INFO:     127.0.0.1:54950 - "PUT /posts/1 HTTP/1.1" 200 OK
INFO:     127.0.0.1:65135 - "PUT /posts/1234324 HTTP/1.1" 404 Not Found
```

## Path Operations and Request Validation

The following code snippet demonstrates how path operations use the Pydantic model to validate incoming data for fetching and creating posts:

```
@app.get("/posts")
def get_posts(db: Session = Depends(get_db)):
    posts = db.query(models.Post).all()
    return {"data": posts}


@app.post("/posts", status_code=status.HTTP_201_CREATED)
def create_posts(post: Post, db: Session = Depends(get_db)):
    # The code to insert the post into the database has been omitted for brevity.
    pass
```

The Pydantic model named Post validates that any request to create a new post contains the fields title, content, and (optionally) a published flag. This strict validation approach helps protect the API from malformed data and ensures consistency in the data exchange.

## SQLAlchemy Model Definition

The SQLAlchemy model is defined in the `models.py` file. It represents the actual structure of the "posts" table in the PostgreSQL database:

```
from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.sql.expression import text
from sqlalchemy.sql.sqltypes import TIMESTAMP


from .database import Base


class Post(Base):
    __tablename__ = "posts"


    id = Column(Integer, primary_key=True, nullable=False)
    title = Column(String, nullable=False)
    content = Column(String, nullable=False)
    published = Column(Boolean, server_default='TRUE', nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))
```

The diagram below further illustrates how the SQLAlchemy model defines the columns of the "posts" table and its role in handling operations such as querying, creating, deleting, and updating database entries:

![The image is a slide explaining SQLAlchemy models, highlighting their role in defining columns of a "posts" table in PostgreSQL and their use in querying, creating, deleting, and updating database entries. It includes a diagram showing the relationship between the SQLAlchemy model and the posts table.](https://kodekloud.com/kk-media/image/upload/v1752883338/notes-assets/images/Python-API-Development-with-FastAPI-Pydantic-Sqlalchemy-Models/sqlalchemy-models-posts-table-diagram.jpg)

## Summary

In summary, the Pydantic model (schema) ensures that both requests and responses comply with the expected data structures, while the SQLAlchemy model provides a detailed blueprint of the database table structure. Although adopting Pydantic models is technically optional, it is a best practice for building robust and secure APIs by enforcing strict data validation.

> [!important]
> **Best Practices**
>
> By carefully separating concerns—using Pydantic for data validation and SQLAlchemy for database interactions—developers can build maintainable and secure APIs that efficiently manage data flow between clients and servers.

For more details consider exploring the [FastAPI Documentation](https://fastapi.tiangolo.com/) and [SQLAlchemy Documentation](https://docs.sqlalchemy.org/en/14/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/ed782f8c-495c-4ff8-8703-c9ab0ab04a4d/lesson/89b3bb56-38a5-4f1d-820a-71ca94b9162d)**
>
> Watch video content
