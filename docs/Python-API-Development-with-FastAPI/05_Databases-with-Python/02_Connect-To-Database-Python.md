# Connect To Database Python - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Databases-with-Python/Connect-To-Database-Python)

---

## Table of Contents

- Connect To Database Python
  - Integrating with FastAPI
  - Setting Up a Robust Database Connection
  - Handling Connection Failures with a Retry Mechanism
  - Important Note on Hard-Coded Credentials
  - Watch Video

---

## Content

Python API Development with FastAPI

Databases with Python

# Connect To Database Python

In this lesson, you'll learn how to connect a Python application to a PostgreSQL database using the psycopg2 library. We will cover setting up a connection, executing SQL commands, and handling connection errors gracefully. Additionally, you'll discover how to implement a retry mechanism if the initial connection fails.

The following Python code demonstrates how to import the library, establish a connection, and perform basic SQL operations:

```
import psycopg2

# Establish a connection to the PostgreSQL database
conn = psycopg2.connect("dbname=test user=postgres")
cur = conn.cursor()

# Create a table, insert data, and fetch it
cur.execute("CREATE TABLE test (id serial PRIMARY KEY, num integer, data varchar);")
cur.execute("INSERT INTO test (num, data) VALUES (%s, %s)", (100, "abc'def"))
cur.execute("SELECT * FROM test;")
print(cur.fetchall())

# Commit the transaction and close connections
conn.commit()
cur.close()
conn.close()
```

The workflow illustrated above includes:

1.  Importing the psycopg2 library.
2.  Establishing a connection using specific connection parameters.
3.  Creating a cursor for executing SQL commands.
4.  Executing SQL commands such as creating a table, inserting data, and selecting data.
5.  Committing the transaction and closing the connection.

## Integrating with FastAPI

When developing an API with a framework like FastAPI, managing database connections effectively becomes essential. The snippet below illustrates how to integrate psycopg2 with FastAPI while leveraging Pydantic models for data validation:

```
from typing import Optional
from fastapi import FastAPI, Response, status, HTTPException, Body
from pydantic import BaseModel
from random import randrange
import psycopg2

app = FastAPI()

class Post(BaseModel):
    title: str
    content: str
    published: bool = True

# Dummy data for posts
my_posts = [
    {"title": "title of post 1", "content": "content of post 1", "id": 1},
    {"title": "favorite foods", "content": "I like pizza", "id": 2}
]
```

## Setting Up a Robust Database Connection

Proper error handling is critical when connecting to the database. In this section, we configure the connection to return query results as dictionaries using the `RealDictCursor`. This makes it easier to work with query results. Additionally, the code demonstrates the use of a try/except block to capture and handle connection errors:

```
import psycopg2
from psycopg2.extras import RealDictCursor
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Post(BaseModel):
    title: str
    content: str
    published: bool = True

try:
    # Connect to the 'fastapi' database on localhost with given user credentials
    conn = psycopg2.connect(
        host='localhost',
        database='fastapi',
        user='postgres',
        password='password123',
        cursor_factory=RealDictCursor
    )
    cursor = conn.cursor()
    print("Database connection was successful!")
except Exception as error:
    print("Connecting to database failed")
    print("Error:", error)

my_posts = [
    {"title": "title of post 1", "content": "content of post 1", "id": 1},
    {"title": "favorite foods", "content": "I like pizza", "id": 2}
]
```

> [!important]
> **Tip**
>
> For enhanced readability and maintainability, consider using environment variables to store sensitive database credentials instead of hard-coding them.

## Handling Connection Failures with a Retry Mechanism

Database connection attempts may fail temporarily—for example, if the database service has not fully started. In these cases, implementing a retry mechanism can be especially useful. The code below demonstrates a looping construct that continuously attempts to connect until successful, with a 2-second delay between each attempt.

```
import time
import psycopg2
from psycopg2.extras import RealDictCursor
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Post(BaseModel):
    title: str
    content: str
    published: bool = True

# Continuously attempt to connect to the database until successful
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
        break  # Exit loop on successful connection
    except Exception as error:
        print("Connecting to database failed")
        print("Error:", error)
        time.sleep(2)  # Wait 2 seconds before retrying

my_posts = [
    {"title": "title of post 1", "content": "content of post 1", "id": 1},
    {"title": "favorite foods", "content": "I like pizza", "id": 2}
]
```

> [!important]
> **Note**
>
> Implementing a retry mechanism not only ensures your application waits for a stable connection but also provides resilience against transient network or service issues.

## Important Note on Hard-Coded Credentials

Hard-coding database credentials (such as host, database name, user, and password) is considered a security risk. This approach:

- Exposes sensitive information if committed to version control.
- Makes it challenging to switch between development and production environments where credentials differ.

For production-level applications, use environment variables or a configuration manager to handle sensitive information securely. This practice enhances both security and flexibility.

---

With a robust database connection and proper error handling in place, you can now extend your application by executing more SQL commands and building API endpoints that interact seamlessly with your PostgreSQL database.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/1c3ad280-5fee-4b8e-a891-42a61f9a2dd0/lesson/77bf956d-7bb1-4492-b535-2274e8a998af)**
>
> Watch video content
