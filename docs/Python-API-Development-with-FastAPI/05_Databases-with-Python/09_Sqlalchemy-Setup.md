# Sqlalchemy Setup - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Databases-with-Python/Sqlalchemy-Setup)

---

## Table of Contents

- Sqlalchemy Setup
  - Installing SQLAlchemy
  - Creating the Database Connection File
  - Defining Models
  - Initializing the Database in the Main Application
  - Testing the Database Connection
  - Creating and Managing the Posts Table
  - Cleaning Up the Main Application
  - Final Remarks
  - Watch Video

---

## Content

Python API Development with FastAPI

Databases with Python

# Sqlalchemy Setup

In this article, we will integrate SQLAlchemy into a FastAPI project. You will learn how to establish a database connection, create models, and utilize sessions for database operations.

Below is an overview of the SQLAlchemy documentation with pointers to the sections relevant to our setup.

![The image shows a webpage from the FastAPI documentation, specifically focusing on SQL (Relational) Databases and how to use them with SQLAlchemy. It includes a list of supported databases and a table of contents on the right.](https://kodekloud.com/kk-media/image/upload/v1752883391/notes-assets/images/Python-API-Development-with-FastAPI-Sqlalchemy-Setup/fastapi-sqlalchemy-database-docs.jpg)

Begin by visiting the SQL page.

![The image shows the SQLAlchemy 1.4 documentation webpage, featuring sections on getting started, tutorials, and reference documentation for SQLAlchemy ORM and Core.](https://kodekloud.com/kk-media/image/upload/v1752883392/notes-assets/images/Python-API-Development-with-FastAPI-Sqlalchemy-Setup/sqlalchemy-1-4-documentation-webpage.jpg)

Search for "SQL" to navigate to the main page, and under "Library" select "References" for version 1.4 (the version used in this course). Although version 2.0 may be released in the future, please install version 1.4 if you are following this article.

For additional details, click the link below:

![The image shows a webpage from the SQLAlchemy documentation, featuring navigation menus and information about the Python SQL toolkit.](https://kodekloud.com/kk-media/image/upload/v1752883393/notes-assets/images/Python-API-Development-with-FastAPI-Sqlalchemy-Setup/sqlalchemy-documentation-webpage.jpg)

A comprehensive tutorial and reference documentation on setting up the ORM (including session usage) are available. The FastAPI documentation offers further guidelines for configuring SQLAlchemy with SQL relational databases.

---

## Installing SQLAlchemy

First, install SQLAlchemy using pip:

```
pip install sqlalchemy
```

You might see output similar to the following:

```
Downloading greenlet-1.1.1-cp39-cp39-win_amd64.whl (96 kB)
Installing collected packages: greenlet, sqlalchemy
Successfully installed greenlet-1.1.1 sqlalchemy-1.4.23
WARNING: You are using pip version 21.1.1; however, version 21.2.4 is available.
You should consider upgrading via the 'c:\users\sanje\documents\courses\fastapi\venv\scripts\python.exe -m pip install --upgrade pip' command.
```

> [!important]
> **Note**
>
> Keep in mind that SQLAlchemy does not communicate directly with a database; it requires a database driver (for instance, `psycopg2` for PostgreSQL or an equivalent driver for MySQL, SQLite, etc.). If you're using PostgreSQL and have the driver installed, there is no need to reinstall it.

---

## Creating the Database Connection File

Create a file named `database.py` in your project. This file manages the database connection while setting up the SQLAlchemy engine, session, and base model. Below is a sample configuration. Note that for SQLite, you must include the `connect_args` parameter; for PostgreSQL or other databases, it is not necessary.

```
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# For SQLite (commented out PostgreSQL):
# SQLALCHEMY_DATABASE_URL = "sqlite:///sql_app.db"
# For PostgreSQL:
# Format: postgresql://<username>:<password>@<ip-address>/<database_name>
SQLALCHEMY_DATABASE_URL = "postgresql://postgres:password123@localhost/fastapi"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False}  # Only required for SQLite.
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for our models
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

Ensure you update the connection string appropriately, and avoid hardcoding sensitive credentials in production code.

---

## Defining Models

In an ORM, database tables are represented as Python classes. Create a file named `models.py` to store your models. Each model corresponds to a table in your database. Below is an example model for a posts table demonstrating four columns: `id`, `title`, `content`, and `published`.

```
from sqlalchemy import Column, Integer, String, Boolean
from .database import Base

class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, nullable=False)
    title = Column(String, nullable=False)
    content = Column(String, nullable=False)
    published = Column(Boolean, default=True)
```

This model generates the corresponding table in PostgreSQL automatically as the application starts.

---

## Initializing the Database in the Main Application

Within your main FastAPI application file (commonly `main.py`), import your models and create the database tables. Additionally, set up a dependency to manage database sessions for API endpoints.

Below is an example implementation:

```
from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
from typing import List

from . import crud, models, schemas
from .database import engine, get_db

# Automatically create tables on application startup.
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    if db_user := crud.get_user_by_email(db, email=user.email):
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db=db, user=user)

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
```

The above snippet uses `models.Base.metadata.create_all(bind=engine)` to create the necessary database tables if they do not exist. The `get_db` function is a dependency that ensures every request gets its own session and that the session is properly closed afterward.

---

## Testing the Database Connection

To verify that your database is properly connected, add a simple endpoint that queries the posts table. This example demonstrates the usage of the SQLAlchemy session dependency:

```
@app.get("/sqlalchemy")
def test_posts(db: Session = Depends(get_db)):
    # Implement your query logic here using SQLAlchemy session methods.
    return {"status": "success"}
```

If you prefer using a raw SQL query (assuming your driver supports the necessary configurations), ensure that you modify the code to obtain a cursor from your database connection.

---

## Creating and Managing the Posts Table

Each time the application starts, SQLAlchemy checks for the existence of the `posts` table in the database. If the table is missing, it will be automatically created based on the definition in `models.py`. You can inspect the table structure using tools like PgAdmin.

![The image shows a pgAdmin interface displaying the structure of a PostgreSQL database table named "posts," with columns such as "id," "title," "content," "published," and "created_at." The data types and constraints for each column are also visible.](https://kodekloud.com/kk-media/image/upload/v1752883395/notes-assets/images/Python-API-Development-with-FastAPI-Sqlalchemy-Setup/pgadmin-postgresql-posts-table-structure.jpg)

This automated table management ensures consistency between your Python models and the actual database schema.

---

## Cleaning Up the Main Application

To keep your main application file concise, consider migrating the database dependency function (`get_db`) to the `database.py` file. You can then import `get_db` in your `main.py` as shown below:

```
from .database import engine, get_db
```

This organization maintains a clean separation of concerns by keeping your database configuration centralized.

---

## Final Remarks

Your FastAPI application is now configured with SQLAlchemy for managing database connections via a session dependency. The posts table is automatically created based on the model in `models.py`, and you can further develop endpoints to execute more complex queries and operations.

> [!important]
> **Happy Coding**
>
> With this setup, you now have a robust foundation for database operations in your FastAPI project. In future articles, we will explore adding additional columns (like timestamps) and handling more advanced database interactions.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/1c3ad280-5fee-4b8e-a891-42a61f9a2dd0/lesson/3b6e099c-5e15-43f3-944b-0df6aa5f215c)**
>
> Watch video content
