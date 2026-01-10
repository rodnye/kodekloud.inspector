# Cleanup Main Py File - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Advanced-FastAPI/Cleanup-Main-Py-File)

---

## Table of Contents

- Cleanup Main Py File
  - Watch Video

---

## Content

Python API Development with FastAPI

Advanced FastAPI

# Cleanup Main Py File

In this lesson, we focus on streamlining our main.py file by removing redundant imports and outdated code snippets. With the migration of our routes to designated folders and the adoption of SQLAlchemy for database interactions, many of the previously used imports are now obsolete. Below, we outline the changes made and provide detailed examples for better clarity.

Many unused imports appear grayed out in your IDE. For example, consider the following block of code that once included multiple imports and a raw database connection:

```
from typing import Optional, List
from fastapi import FastAPI, Response, status, HTTPException, Depends
from fastapi.params import Body
from pydantic import BaseModel

from random import randrange
import psycopg2
from psycopg2.extras import RealDictCursor
import time
from sqlalchemy.orm import Session
from sqlalchemy.sql.functions import mode
from . import models, schemas, utils
from .database import engine, get_db
from .routers import post, user, auth

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

while True:
    try:
        conn = psycopg2.connect(host='localhost', database='fastapi', user='postgres', password='password123', cursor_factory=RealDictCursor)
        cursor = conn.cursor()
```

> [!important]
> **Note**
>
> The code for connecting to the database using the traditional Postgres driver is now redundant because SQLAlchemy is managing our database connections. It is recommended to either move this logic into the database.py file for future reference or remove it completely.

For documentation purposes, here is how the section originally looked before the changes were implemented:

```
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from psycopg2.extras import RealDictCursor
import psycopg2

engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

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
```

Since SQLAlchemy now handles our database operations, the raw SQL connection is obsolete and can be safely deleted from the main.py file. Only the necessary functions and modules from the database module need to be imported.

Next, we remove additional unused imports and helper functions. Earlier versions of main.py included elements from typing, status, Body, Pydantic, and even the Postgres library, which are no longer utilized after integrating the database. For example, the following code block demonstrated older implementations that are now redundant:

```
from typing import Optional, List
from fastapi import FastAPI, Response, status, HTTPException, Depends
from fastapi.params import Body
from pydantic import BaseModel

from random import randrange
import psycopg2
from psycopg2.extras import RealDictCursor
import time
from sqlalchemy.orm import Session
from sqlalchemy.sql.functions import mode
from . import models, schemas, utils
from .database import engine, get_db
from .routers import post, user, auth

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

my_posts = [
    {"title": "title of post 1", "content": "content of post 1", "id": 1},
    {"title": "favorite foods", "content": "I like pizza", "id": 2}
]
```

Additionally, helper functions like the ones below have become unnecessary:

```
def find_post(id):
    for p in my_posts:
        if p['id'] == id:
            return p

def find_index_post(id):
    for i, p in enumerate(my_posts):
        if p['id'] == id:
            return i
```

> [!important]
> **Note**
>
> Removing these unused sections not only makes your main.py file cleaner but also improves maintainability by reducing clutter. The focus is now solely on the application's main functionality.

The final cleaned-up version of main.py is structured more succinctly. It now only imports the modules required for the proper functioning of the application and includes the essential routers. The refined file is as follows:

```
from fastapi import FastAPI
from . import models
from .database import engine
from .routers import post, user, auth

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(post.router)
app.include_router(user.router)
app.include_router(auth.router)

@app.get("/")
def root():
    return {"message": "Hello World"}
```

With these changes, the application is free from redundant code and unused imports, making it easier to maintain and enhancing overall code clarity. This optimization is key for better project scalability and improved performance.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/ed782f8c-495c-4ff8-8703-c9ab0ab04a4d/lesson/8db72137-52c9-474b-b1d5-9a4c548af7b0)**
>
> Watch video content
