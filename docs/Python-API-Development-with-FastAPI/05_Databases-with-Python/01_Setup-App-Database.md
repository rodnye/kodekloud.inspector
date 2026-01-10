# Setup App Database - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Databases-with-Python/Setup-App-Database)

---

## Table of Contents

- Setup App Database
  - Schema Design for the Posts Table
  - FastAPI Application Code
  - Creating the Posts Table
  - Revisiting Previous SQL Operations
  - Watch Video

---

## Content

Python API Development with FastAPI

Databases with Python

# Setup App Database

In this guide, we integrate our PostgreSQL database with a Python/FastAPI application. Previously, we built a strong foundation in PostgreSQL by querying, inserting, updating, and deleting rows. Now, let's combine these skills and set up a new table for our social media application.

Before diving into the application code, perform a quick cleanup. In earlier demonstrations, we worked with a "products" table. If this table is no longer needed, you can remove it by right-clicking the table in your database management tool and selecting "Delete" or "Drop." Otherwise, you may leave it intact—it won’t affect the FastAPI database integration.

> [!important]
> **Focus on the Correct Database**
>
> Ensure you are working with the designated FastAPI database. If you have multiple databases on your machine, ignore any unrelated entries and focus solely on your FastAPI-specific instance.

## Schema Design for the Posts Table

For our social media application, we will create a new table called "posts." The table will have the following columns:

1.  **ID Column**
    - Type: `SERIAL` (auto-incrementing integer primary key)

2.  **Title Column**
    - Type: `VARCHAR` (or character varying)
    - Constraint: `NOT NULL` (each post must have a title)

3.  **Content Column**
    - Type: `VARCHAR`
    - Constraint: `NOT NULL`

4.  **Published Column**
    - Type: `BOOLEAN`
    - Constraint: `NOT NULL`
    - Default Value: `TRUE` (defaults to true if not provided)

5.  **Created_at Column**
    - Type: `TIMESTAMP WITH TIME ZONE`
    - Constraint: `NOT NULL`
    - Default Value: the current timestamp at the time of insertion

Once you have configured these columns in your database management tool, name the table "posts" and save your changes. Afterward, you can right-click on the table and select "View/Edit Data" to confirm that the table is empty and ready to store your posts.

## FastAPI Application Code

Below is a snippet of our FastAPI application that defines a post schema using Pydantic and includes some sample posts:

```
from typing import Optional
from fastapi import FastAPI, Response, status, HTTPException
from fastapi.params import Body
from pydantic import BaseModel
from random import randrange


app = FastAPI()


class Post(BaseModel):
    title: str
    content: str
    published: bool = True


my_posts = [
    {"title": "title of post 1", "content": "content of post 1", "id": 1},
    {"title": "favorite foods", "content": "I like pizza", "id": 2}
]
```

Below is a sample of the application log showcasing the server startup and a successful GET request to the posts endpoint:

```
INFO:     Started server process [26448]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     127.0.0.1:53763 - "GET /posts HTTP/1.1" 200 OK
```

## Creating the Posts Table

With the schema in mind, create the "posts" table in your FastAPI database using your preferred SQL tool or user interface. For initial testing, you can insert data directly. For example, to verify the contents of the posts table, run:

```
SELECT * FROM public.posts
ORDER BY "id" ASC;
```

After inserting data, you should see two entries in your database, confirming that the table is ready for further development.

> [!important]
> **SQL Testing Tip**
>
> You can use your SQL management tool to insert sample data into the posts table, ensuring that the correct structure and constraints are applied.

## Revisiting Previous SQL Operations

Earlier, we demonstrated basic SQL operations. For reference, here is a corrected SQL command that updated records in the products table (used previously for demonstration purposes):

```
UPDATE products SET is_sale = true WHERE id > 15 RETURNING *;
```

Now that our focus is on the posts table for our social media application, we can continue to develop and integrate this table into our FastAPI application.

The database is now set up and ready to be used by your application. Moving forward, you can build upon this integration to create robust CRUD operations for your FastAPI-powered social media application.

For more information on PostgreSQL and FastAPI integration, consider exploring additional resources such as [FastAPI Documentation](https://fastapi.tiangolo.com/) and the [PostgreSQL Official Documentation](https://www.postgresql.org/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/1c3ad280-5fee-4b8e-a891-42a61f9a2dd0/lesson/b5f0588b-0aff-4a64-a7d6-8049bfcf98bd)**
>
> Watch video content
