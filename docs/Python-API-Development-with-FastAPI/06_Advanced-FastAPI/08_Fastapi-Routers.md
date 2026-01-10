# Fastapi Routers - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Advanced-FastAPI/Fastapi-Routers)

---

## Table of Contents

- Fastapi Routers
  - Current Main.py Structure
  - Organizing Code with Routers
  - Integrating Routers in main.py
  - Testing the Application
  - Watch Video
    - User Router Example
    - Post Router Example

---

## Content

Python API Development with FastAPI

Advanced FastAPI

# Fastapi Routers

In this article, we refactor our FastAPI application by separating user and post path operations (CRUD operations) into distinct files. Initially, our main.py file contains all endpoints, which can lead to clutter as the application grows.

## Current Main.py Structure

Initially, our main.py file includes endpoints such as:

```
@app.get("/")
def root():
    return {"message": "Hello World"}


@app.get("/posts", response_model=List[schemas.Post])
def get_posts(db: Session = Depends(get_db)):
    # cursor.execute("""SELECT * FROM posts """)
    # posts = cursor.fetchall()
    posts = db.query(models.Post).all()
    return posts


@app.post("/posts", status_code=status.HTTP_201_CREATED, response_model=schemas.Post)
```

During execution, you might observe logs like these:

```
[SQL: INSERT INTO users (email, password) VALUES (%(email)s, %(password)s) RETURNING users.id]
[parameters: {'email': 'mark1123@email.com',
              'password': '$2b$12$mvtoneBzuKAA0HgrBTDeRfJaf10F1W3oz'}]
(Background on this error at: https://sqlalche.me/e/14/gkpj)
WARNING: WatchGodReload detected file change in '[C:\Users\sanje\Documents\Courses\fastapi\app\main.py]'. Reloading...
Database connection was successful!
INFO:     Started server process [7824]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

In addition to posts, main.py also handles user operations, such as creating a new user or retrieving a user by ID:

```
@app.get('/users/{id}', response_model=schemas.UserOut)
def get_user(id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"User with id: {id} does not exist")
```

Managing all endpoints in one file can become unwieldy as your application grows.

> [!important]
> **Refactoring Benefit**
>
> Splitting your endpoints into separate files makes your code more modular and maintainable.

## Organizing Code with Routers

To streamline our application structure, we create a new directory named `routers` and add two files inside it: `post.py` and `user.py`. This allows us to move all post-related operations to `post.py` and user-related operations to `user.py`.

### User Router Example

In the `user.py` file, the code for handling user-related endpoints looks like this:

```
from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session
from .. import models, schemas, utils
from ..database import get_db


router = APIRouter()


@router.post("/users", status_code=status.HTTP_201_CREATED, response_model=schemas.UserOut)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    # Hash the password for security
    hashed_password = utils.hash(user.password)
    user.password = hashed_password


    new_user = models.User(**user.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)


    return new_user


@router.get("/users/{id}", response_model=schemas.UserOut)
def get_user(id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"User with id: {id} does not exist")
    return user
```

Later, once this code is moved from main.py, you can safely remove the user-related endpoints from it.

### Post Router Example

Likewise, in the `post.py` file, the post-related endpoints are refactored as follows:

```
from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas
from ..database import get_db


router = APIRouter()


@router.get("/posts", response_model=List[schemas.Post])
def get_posts(db: Session = Depends(get_db)):
    # Fetching posts using ORM
    posts = db.query(models.Post).all()
    return posts


@router.post("/posts", status_code=status.HTTP_201_CREATED, response_model=schemas.Post)
def create_posts(post: schemas.PostCreate, db: Session = Depends(get_db)):
    # Create a new post using ORM
    new_post = models.Post(**post.dict())
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post
```

Replace the usage of the FastAPI instance (`app`) with the router object (`router`) in each file. This makes the routes modular and easier to manage.

## Integrating Routers in main.py

After splitting the routes into separate files, update your main.py to include the routers from the `routers` directory:

```
from fastapi import FastAPI
from . import models, schemas, utils
from .database import engine, get_db
from .routers import post, user
import psycopg2
from psycopg2.extras import RealDictCursor
import time


models.Base.metadata.create_all(bind=engine)
app = FastAPI()


# Database connection handling
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
        print("Error: ", error)
        time.sleep(2)


my_posts = [
    {"title": "title of post 1", "content": "content of post 1", "id": 1},
    {"title": "favorite foods", "content": "I like pizza", "id": 2}
]


def find_post(id):
    for p in my_posts:
        if p['id'] == id:
            return p


def find_index_post(id):
    for i, p in enumerate(my_posts):
        if p['id'] == id:
            return i


# Include the router objects for user and post endpoints
app.include_router(post.router)
app.include_router(user.router)


@app.get("/")
def root():
    return {"message": "Hello World"}
```

With these changes, FastAPI delegates request handling to the appropriate router based on the URL endpoints, keeping the code modular and manageable as the application grows.

## Testing the Application

Once refactored, test your application to confirm that all functionality operates as expected. Typical tests include:

- Fetching all posts
- Creating a new post
- Retrieving a single post by ID
- Deleting or updating posts
- Creating a new user and retrieving the user by ID

For instance, a successful post creation might respond with:

```
{
    "title": "this is the new title",
    "content": "this is the new content",
    "published": true,
    "id": 1,
    "created_at": "2021-08-22T01:35:58.101063-04:00"
}
```

And the server logs may display:

```
INFO:     127.0.0.1:55409 - "POST /posts HTTP/1.1" 201 Created
INFO:     127.0.0.1:55409 - "GET /posts/2 HTTP/1.1" 404 Not Found
INFO:     127.0.0.1:55409 - "GET /posts/1 HTTP/1.1" 200 OK
INFO:     127.0.0.1:55409 - "DELETE /posts/3 HTTP/1.1" 204 No Content
INFO:     127.0.0.1:55409 - "POST /users HTTP/1.1" 201 Created
INFO:     127.0.0.1:55409 - "GET /users/1 HTTP/1.1" 200 OK
```

> [!important]
> **Modular Code Advantage**
>
> Using routers helps keep your code clean and scalable. As your API grows, you can easily add new routers without cluttering the main application file.

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/ed782f8c-495c-4ff8-8703-c9ab0ab04a4d/lesson/dfef71ab-504b-4390-ad8d-7c8b45f0a3b4)**
>
> Watch video content
