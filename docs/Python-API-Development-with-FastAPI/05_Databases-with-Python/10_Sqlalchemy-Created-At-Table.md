# Sqlalchemy Created At Table - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Databases-with-Python/Sqlalchemy-Created-At-Table)

---

## Table of Contents

- Sqlalchemy Created At Table
  - Understanding the Default Behavior
  - FastAPI Endpoints for Users and Items
  - Adding a "Created_At" Timestamp Column
  - Verifying the Changes
  - Watch Video

---

## Content

Python API Development with FastAPI

Databases with Python

# Sqlalchemy Created At Table

In this article, we demonstrate how to customize the SQLAlchemy table generation for our custom "posts" table. We start by addressing an issue with the default behavior in SQLAlchemy and then extend the table to include a "created_at" timestamp column.

## Understanding the Default Behavior

When SQLAlchemy initially creates the table, each column is set with a NOT NULL constraint, and the primary key is applied to the "id" field. However, if you inspect the "published" column (using properties → columns → constraints), you might notice that the default value is not configured. This is because SQLAlchemy's "default" parameter operates on the Python side. To have PostgreSQL handle the default value, you must use the "server_default" parameter.

Below is the modified model definition where the "published" column has a server default of 'TRUE' (as a string) and all columns are non-nullable:

```
from sqlalchemy import Column, Integer, String, Boolean
from .database import Base

class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, nullable=False)
    title = Column(String, nullable=False)
    content = Column(String, nullable=False)
    published = Column(Boolean, server_default='TRUE', nullable=False)
```

When the application starts, SQLAlchemy checks if a table named "posts" exists. If it doesn't, SQLAlchemy creates the table with the specified schema. However, if the table already exists, SQLAlchemy will not automatically update its schema—even if the underlying model has been modified.

> [!important]
> **Note**
>
> Since SQLAlchemy does not automatically alter existing table schemas, you must drop the existing table before restarting the application to allow SQLAlchemy to recreate the table with the new configuration.

## FastAPI Endpoints for Users and Items

Our application includes several API endpoints for managing users and items. Below is the consolidated FastAPI code handling these operations:

```
from typing import List
from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
from . import crud, schemas
from .database import get_db

app = FastAPI()

@app.get("/users/", response_model=List[schemas.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users

@app.get("/users/{user_id}", response_model=schemas.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@app.post("/users/{user_id}/items/", response_model=schemas.Item)
def create_item_for_user(user_id: int, item: schemas.ItemCreate, db: Session = Depends(get_db)):
    return crud.create_user_item(db=db, item=item, user_id=user_id)

@app.get("/items/", response_model=List[schemas.Item])
def read_items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    items = crud.get_items(db, skip=skip, limit=limit)
    return items
```

After making any changes to the schema, drop the existing table so that when the application is restarted, SQLAlchemy creates the "posts" table with the updated configuration. You can confirm that the "published" column now has the proper default value (TRUE) by inspecting its properties.

## Adding a "Created_At" Timestamp Column

To log when each post is created, we need to add a "created_at" column using PostgreSQL's current timestamp. Initially, add the TIMESTAMP type from SQLAlchemy:

```
from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.sql.sqltypes import TIMESTAMP
from .database import Base

class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, nullable=False)
    title = Column(String, nullable=False)
    content = Column(String, nullable=False)
    published = Column(Boolean, server_default='TRUE', nullable=False)
    created_at = Column(TIMESTAMP(timezone=True))
```

To ensure that the "created_at" column is always populated, mark it as NOT NULL and set a server default value using SQLAlchemy’s `text` function (imported from `sqlalchemy.sql.expression`). This server default ensures that PostgreSQL applies the current timestamp when a new record is created:

```
from sqlalchemy import Column, Integer, String, Boolean, text
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

This approach mirrors the method used in pgAdmin, where you manually set a default constraint to `now()`. Verifying the schema in pgAdmin should show the "posts" table containing the columns "id," "title," "content," "published," and "created_at" with their respective constraints and data types.

![The image shows a pgAdmin interface with a database schema for a table named "posts," displaying columns such as "id," "title," "content," and "published" with their data types and constraints.](https://kodekloud.com/kk-media/image/upload/v1752883389/notes-assets/images/Python-API-Development-with-FastAPI-Sqlalchemy-Created-At-Table/pgadmin-database-schema-posts.jpg)

After updating the model, drop the existing "posts" table and restart the application. This ensures that SQLAlchemy recreates the table with the new "created_at" column, configured with a default timestamp.

## Verifying the Changes

To verify that everything works as intended, create a new post using the application interface. Then, execute the following SQL query to inspect the contents of your "posts" table:

```
SELECT * FROM public.posts
ORDER BY id ASC;
```

The query output should display rows where each post has a valid timestamp in the "created_at" column, confirming that PostgreSQL correctly applies the default value.

By following these steps, you ensure that your SQLAlchemy models align with your database schema, providing consistent behavior for default values and timestamps.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/1c3ad280-5fee-4b8e-a891-42a61f9a2dd0/lesson/b05b7e69-75e9-4020-9af9-e4a267060ec6)**
>
> Watch video content
