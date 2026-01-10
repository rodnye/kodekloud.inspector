# Retrieve Only Your Own Posts - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Advanced-FastAPI/Retrieve-Only-Your-Own-Posts)

---

## Table of Contents

- Retrieve Only Your Own Posts
  - Original FastAPI Router Code
  - Modifying the GET Endpoint to Filter by Authenticated User
  - Retrieving an Individual Post with Error Handling
  - Debugging and Logging
  - Reverting to Public Posts if Needed
  - Summary
  - Watch Video

---

## Content

Python API Development with FastAPI

Advanced FastAPI

# Retrieve Only Your Own Posts

In this lesson, we address a common issue encountered when retrieving posts from an authenticated route. By default, accessing the endpoint returns posts from all users, as shown in the sample JSON response below:

```
[
    {
        "title": "this is the new title",
        "content": "this is the new content",
        "published": true,
        "id": 4,
        "created_at": "2021-08-28T21:18:13.460585-04:00",
        "owner_id": 21
    },
    {
        "title": "top beaches in florida",
        "content": "something somethng beaches",
        "published": true,
        "id": 9,
        "created_at": "2021-08-28T21:48:30.323507-04:00",
        "owner_id": 23
    }
]
```

Depending on your application, this behavior might not be desirable. For example, in a private note-taking app, you would only want to retrieve posts created by the currently logged-in user. Conversely, in a public social media application, displaying all posts might be acceptable.

Below, we outline how to modify your FastAPI endpoints to ensure that only posts belonging to the authenticated user are returned. This same approach can be applied when fetching a single post—ensuring that only its creator can access it.

## Original FastAPI Router Code

Consider the initial FastAPI router used for retrieving and creating posts:

```
from .database import get_db
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
import models, schemas, oauth2


router = APIRouter(
    prefix="/posts",
    tags=['Posts']
)


@router.get("/", response_model=List[schemas.Post])
def get_posts(db: Session = Depends(get_db), user_id: int = Depends(oauth2.get_current_user)):
    # Previously, this returned all posts without filtering:
    # posts = db.query(models.Post).all()
    posts = db.query(models.Post).all()
    return posts


@router.post("/", status_code=status.HTTP_201_CREATED, response_model=schemas.Post)
def create_posts(post: schemas.PostCreate, db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
    # Example SQL insert (using a cursor) is commented out:
    # cursor.execute("""INSERT INTO posts (title, content, published) VALUES (%s, %s, %s) RETURNING * """)
    return post
```

When you run the application, you might see logs similar to the following:

```
INFO:     127.0.0.1:156407 - "PUT /posts/9 HTTP/1.1" 200 OK
INFO:     127.0.0.1:493883 - "GET /posts HTTP/1.1" 200 OK
INFO:     127.0.0.1:175578 - "GET /posts HTTP/1.1" 307 Temporary Redirect
INFO:     127.0.0.1:175580 - "GET /posts HTTP/1.1" 200 OK
```

## Modifying the GET Endpoint to Filter by Authenticated User

To restrict the results to only the posts created by the authenticated user, add a filter using `current_user.id`. The updated GET endpoint looks like this:

```
from .database import get_db
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
import models, schemas, oauth2


router = APIRouter(
    prefix="/posts",
    tags=['Posts']
)


@router.get("/", response_model=List[schemas.Post])
def get_posts(db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
    # Filter posts by the owner_id to return only posts belonging to the current user
    posts = db.query(models.Post).filter(models.Post.owner_id == current_user.id).all()
    return posts


@router.post("/", status_code=status.HTTP_201_CREATED, response_model=schemas.Post)
def create_posts(post: schemas.PostCreate, db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
    # Here you would typically create a new post.
    return post
```

If you're logged in as user with ID 23, a GET request to the posts endpoint now returns only posts with `owner_id: 23`. For example:

```
[
    {
        "title": "asdf",
        "content": "sdfsdf",
        "published": true,
        "id": 10,
        "created_at": "2021-08-28T21:49:28.150019-04:00",
        "owner_id": 23
    },
    {
        "title": "this is the new title wahoo",
        "content": "this is the new content",
        "published": true,
        "id": 9,
        "created_at": "2021-08-28T21:49:30.323570-04:00",
        "owner_id": 23
    }
]
```

Similarly, if a different user (for example, user ID 21) is authenticated, only that user's posts will be returned.

> [!important]
> **Important**
>
> For single post retrieval, apply similar logic to verify that only the owner can access the post. This ensures robust security and proper access control.

## Retrieving an Individual Post with Error Handling

The following example demonstrates how to retrieve an individual post while ensuring proper error handling when a post is not found:

```
@router.get("/{id}", response_model=schemas.Post)
def get_post(id: int, db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
    # Retrieve the post by its ID
    post = db.query(models.Post).filter(models.Post.id == id).first()

    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Post with id: {id} was not found")


    return post


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_post(id: int, db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
    # Deletion logic would be similar in checking ownership before deleting
    pass
```

## Debugging and Logging

During testing, you may encounter log outputs that help debug SQL queries. For example, you might temporarily print out the SQL query generated by SQLAlchemy:

```
@router.get("/")
def get_posts(current_user: int = Depends(oauth2.get_current_user)):
    posts = db.get_posts()
    print(posts)
    return posts
```

This could result in log output such as:

```
INFO:     SELECT posts.id AS posts_id, posts.title AS posts_title, ...
INFO:     FROM posts
INFO:     WHERE posts.id IN (id1s)
```

> [!important]
> **Warning**
>
> Be cautious when using post IDs for filtering. Ensure that you are comparing the `owner_id` with the current user's ID to guarantee that only authorized data is retrieved.

## Reverting to Public Posts if Needed

If your application's requirements evolve (for example, switching to a social media style where all posts are public), you can simply remove the ownership filter:

```
@router.get("/", response_model=List[schemas.Post])
def get_posts(db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
    posts = db.query(models.Post).all()
    return posts
```

## Summary

This lesson demonstrates how to adjust your FastAPI endpoints to either restrict data access to the authenticated user or allow public access, based on your application's needs. By filtering posts using `current_user.id` and incorporating proper error handling, you improve both security and user experience.

For further reading on FastAPI and SQLAlchemy best practices, check out the following resources:

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)
- [OAuth2 Authorization with FastAPI](https://fastapi.tiangolo.com/advanced/security/)

By following these guidelines, you can ensure that your endpoints are both secure and tailored to your application's specific requirements.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/ed782f8c-495c-4ff8-8703-c9ab0ab04a4d/lesson/270e4872-9ed6-4a6a-b386-21576fa53c4e)**
>
> Watch video content
