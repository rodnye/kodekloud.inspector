# Pydantic Models Deep Dive - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Advanced-FastAPI/Pydantic-Models-Deep-Dive)

---

## Table of Contents

- Pydantic Models Deep Dive
  - Initial Schema Definition
  - Separating Schemas Into a Dedicated Module
  - Leveraging Inheritance for Request Schemas
  - Cleaning Up Legacy Routes
  - Defining Response Schemas
  - Summary
  - Watch Video

---

## Content

Python API Development with FastAPI

Advanced FastAPI

# Pydantic Models Deep Dive

In our previous discussion, we compared Pydantic models with ORM models. In this guide, we refine our Pydantic model usage and reorganize the project structure to separate concerns effectively. We begin by defining a simple schema for a POST request, which will later be relocated into its own file for a cleaner main application structure.

## Initial Schema Definition

Below is a code snippet that outlines the basic structure of a POST request using Pydantic. This schema is applied in various parts of the application—such as during the creation or update of a post.

```
from random import randrange


import psycopg2
from psycopg2.extras import RealDictCursor


from sqlalchemy.orm import Session
from sqlalchemy.sql.functions import mode
from fastapi import FastAPI
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
    pass  # This loop is for demonstration purposes.
```

The application logs indicate that the startup was successful:

```
INFO:     Application startup complete.
INFO:     127.0.0.1:54906 - "PUT /posts/1 HTTP/1.1" 200 OK
INFO:     127.0.0.1:65135 - "PUT /posts/12342324 HTTP/1.1" 404 Not Found
```

We use the `Post` schema in our endpoints. When creating or updating posts, incoming data is validated against this schema. Consider the following excerpt from our endpoint definitions:

```
@app.get("/posts")
def get_posts(db: Session = Depends(get_db)):
    # Commented-out raw SQL code replaced by SQLAlchemy ORM queries.
    posts = db.query(models.Post).all()
    return {"data": posts}


@app.post("/posts", status_code=status.HTTP_201_CREATED)
def create_posts(post: Post, db: Session = Depends(get_db)):
    # The commented-out code below represents an earlier raw SQL approach:
    # cursor.execute(
    #     """INSERT INTO posts (title, content, published) VALUES (%s, %s, %s)
    #     RETURNING *""",
    #     (post.title, post.content, post.published)
    # )
    # new_post = cursor.fetchone()
    # conn.commit()
    new_post = models.Post(**post.dict())
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return {"data": new_post}


print(posts)
return {"data": "successfull"}
```

Notice that the schema defines the expected data structure from the client. To improve code organization, we move the schema definition into its own file (`schemas.py`).

## Separating Schemas Into a Dedicated Module

Create a new file called `schemas.py` and move the following schema code into it:

```
from pydantic import BaseModel


class Post(BaseModel):
    title: str
    content: str
    published: bool = True
```

Then, update your `main.py` file to import both the models and the new schemas:

```
from typing import Optional
from fastapi import FastAPI, Response, status, HTTPException, Depends, Body
from random import randrange
import psycopg2
from psycopg2.extras import RealDictCursor
import time
from sqlalchemy.orm import Session
from sqlalchemy.sql.functions import mode
from . import models, schemas
from .database import engine, get_db


models.Base.metadata.create_all(bind=engine)


app = FastAPI()


while True:
    pass  # This infinite loop should be adjusted or removed based on your application needs.
```

The application logs confirm a successful server startup:

```
INFO: Started server process [15948]
INFO: Waiting for application startup.
INFO: Application startup complete.
```

To ensure correct schema usage, update your endpoints to reference the newly imported schemas. For example, modify the creation and update endpoints:

```
@app.post("/posts", status_code=status.HTTP_201_CREATED)
def create_posts(post: schemas.Post, db: Session = Depends(get_db)):
    new_post = models.Post(**post.dict())
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return {"data": new_post}


@app.put("/posts/{id}")
def update_post(id: int, updated_post: schemas.Post, db: Session = Depends(get_db)):
    # Previous raw SQL approach shown below:
    # cursor.execute(
    #     """UPDATE posts SET title = %s, content = %s, published = %s WHERE id = %s RETURNING *""",
    #     (updated_post.title, updated_post.content, updated_post.published, id)
    # )
    # updated_post_data = cursor.fetchone()
    # conn.commit()


    post_query = db.query(models.Post).filter(models.Post.id == id)
    post = post_query.first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    # Here you would update the record as needed.
```

## Leveraging Inheritance for Request Schemas

Reducing redundancy is key when dealing with multiple endpoints. By using Python’s inheritance capabilities, you can define a base schema that includes common fields and extend it for specific use cases such as post creation or updates. For example:

```
from pydantic import BaseModel


class PostBase(BaseModel):
    title: str
    content: str
    published: bool = True


class PostCreate(PostBase):
    pass


class UpdatePost(BaseModel):
    # For updates, restrict the allowed fields (e.g., only 'published' might be updated).
    published: bool
```

After defining these schemas, update your endpoints accordingly. For instance, use `schemas.PostCreate` during post creation:

```
@app.post("/posts", status_code=status.HTTP_201_CREATED)
def create_posts(post: schemas.PostCreate, db: Session = Depends(get_db)):
    new_post = models.Post(**post.dict())
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return {"data": new_post}
```

And for updating a post, use the dedicated update schema:

```
@app.put("/posts/{id}")
def update_post(id: int, updated_post: schemas.UpdatePost, db: Session = Depends(get_db)):
    post_query = db.query(models.Post).filter(models.Post.id == id)
    post = post_query.first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    # Update allowed fields only.
    post.published = updated_post.published
    db.commit()
    db.refresh(post)
    return {"data": post}
```

## Cleaning Up Legacy Routes

As your project evolves, you may encounter test routes or legacy endpoints that are no longer needed. For example, if there’s an old test route used for learning SQLAlchemy, it’s best practice to remove or refactor it in production code:

```
for i, p in enumerate(my_posts):
    if p['id'] == id:
        return i


@app.get("/")
def root():
    return {"message": "Hello World"}
```

> [!important]
> **Note**
>
> Keep only the essential routes in your production code, ensuring that outdated or test routes are removed to maintain clarity and efficiency.

## Defining Response Schemas

In addition to request schemas, it is a good practice to define response schemas. This strategy ensures that the responses adhere to a specific structure and prevents the accidental exposure of unwanted data. In future content, we will explore how to create and integrate response models with your endpoints.

> > [!important]
> > **Note**
> >
> > Learn more about request and response schema handling in FastAPI by reviewing the examples above. The accompanying diagram is a conceptual aid to help visualize how schema models define the request and response structures.

![The image explains how Schema/Pydantic Models define the structure of requests and responses in FastAPI, ensuring that a request requires a "title" and "content" to proceed. It includes a flow diagram showing the interaction between a browser, schema model, and FastAPI.](https://kodekloud.com/kk-media/image/upload/v1752883336/notes-assets/images/Python-API-Development-with-FastAPI-Pydantic-Models-Deep-Dive/fastapi-schema-models-diagram.jpg)

## Summary

By moving the schemas to a dedicated module and leveraging inheritance, we can better manage and scale the API development process. This structured approach improves code readability, maintainability, and overall efficiency. In future guides, we will address creating structured responses using dedicated response models.

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/ed782f8c-495c-4ff8-8703-c9ab0ab04a4d/lesson/8fab93e9-8c4a-4c46-a5e3-bcc5bca0afd6)**
>
> Watch video content
