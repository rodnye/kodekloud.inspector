# Protecting Routes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Advanced-FastAPI/Protecting-Routes)

---

## Table of Contents

- Protecting Routes
  - Enforcing Authentication on the Create Post Endpoint
  - Verifying the Token
  - Testing the Protected Endpoint
  - Protecting Other Routes
  - Setting Up the Login Endpoint
  - Testing All Routes
  - Watch Video
    - Getting an Individual Post
    - Deleting a Post

---

## Content

Python API Development with FastAPI

Advanced FastAPI

# Protecting Routes

In this article, we complete the authentication setup for our FastAPI application by enforcing that users must be authenticated before creating, deleting, or updating posts. Without this protection, any client could call our endpoints and perform operations without logging in.

For example, the following JSON payload demonstrates how a post can be created without any authentication:

```
{
    "title": "top beaches in florida",
    "content": "something somethng beaches",
    "rating": 4
}
```

Without user authentication, anyone can create, delete, or modify posts. Depending on your application's design—for instance, a Twitter-like platform where everyone can view tweets but only the owner can modify them—you might want to restrict certain operations to authenticated users only.

Below, we explain how to enforce user authentication before allowing a post to be created.

---

## Enforcing Authentication on the Create Post Endpoint

We start by modifying our POST API endpoint for creating posts. In our router file (`post.py`), we import the necessary modules including the OAuth2 functionality:

```
from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas
from ..database import get_db

router = APIRouter(
    prefix="/posts",
    tags=['Posts']
)

@router.get("/", response_model=List[schemas.Post])
def get_posts(db: Session = Depends(get_db)):
    posts = db.query(models.Post).all()
    return posts
```

When a user attempts to create a post, we add an authentication dependency by extracting the current user using a valid token:

```
@router.post("/", status_code=status.HTTP_201_CREATED, response_model=schemas.Post)
def create_posts(
    post: schemas.PostCreate,
    db: Session = Depends(get_db),
    user_id: int = Depends(oauth2.get_current_user)
):
    print(user_id)
    new_post = models.Post(**post.dict())
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post
```

The dependency `user_id: int = Depends(oauth2.get_current_user)` ensures that the endpoint only proceeds if the user is authenticated. If the token is missing or invalid, an error is raised and the post is not created.

---

## Verifying the Token

The function `get_current_user` extracts the token provided by the user and calls the helper function `verify_access_token` to decode and validate it. The implementation is as follows:

```
def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"}
    )
    return verify_access_token(token, credentials_exception)
```

The `verify_access_token` function decodes the token using our secret key and algorithm, extracts the user ID from the payload, and validates that the ID is present:

```
def verify_access_token(token: str, credentials_exception):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        id: str = payload.get("user_id")
        if id is None:
            raise credentials_exception
        token_data = schemas.TokenData(id=id)
    except JWTError:
        raise credentials_exception

    return token_data
```

> [!important]
> **Note**
>
> If the token does not include a valid user ID or if an error occurs during decoding, the request fails with an HTTP 401 error.

---

## Testing the Protected Endpoint

When you send a POST request to create a post without a valid token, you will receive an error similar to:

```
{
    "detail": "Not authenticated"
}
```

To create a post successfully, first obtain a token via the login route then include it in your request header. For example, after obtaining a token from the login endpoint, you might receive a response like:

```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjM0NTY3ODkwLCJleHBpcmF0aW9uX3RpbWUiOiIxNjA2Mjc3Njg3Iiwicm9sZSI6InVzZXIiLCJ1c2VyX25hbWUiOiJzYW5qZWV2QGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJzYW5qZW92In0.F45sS4iRzFo5vdAcrH2lC01S15BE",
    "token_type": "bearer"
}
```

Include the token in the Authorization header as follows:

```
Authorization: Bearer <your_token_here>
```

With the provided token, the API validates the request and permits the creation of the post, returning a response similar to:

```
{
    "title": "top beaches in florida",
    "content": "something somethings beaches",
    "published": true,
    "id": 34,
    "created_at": "2021-08-21T01:32:22.239498-04:00"
}
```

In Postman, you can also select the Bearer Token option under the Authorization tab and paste your token. This ensures that the token is correctly sent in the request header.

---

## Protecting Other Routes

You can enforce authentication on other endpoints by adding the current user dependency. Below are examples for fetching an individual post and deleting a post.

### Getting an Individual Post

```
@router.get("/{id}", response_model=schemas.Post)
def get_post(
    id: int,
    db: Session = Depends(get_db),
    user_id: int = Depends(oauth2.get_current_user)
):
    post = db.query(models.Post).filter(models.Post.id == id).first()
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Post with id: {id} does not exist"
        )
    return post
```

### Deleting a Post

```
@router.delete("/posts/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_post(
    id: int,
    db: Session = Depends(get_db),
    user_id: int = Depends(oauth2.get_current_user)
):
    post_query = db.query(models.Post).filter(models.Post.id == id)
    if post_query.first() is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Post with id: {id} does not exist"
        )
    post_query.delete(synchronize_session=False)
    db.commit()
```

You can apply similar modifications to update operations to ensure that only authenticated users can modify content.

---

## Setting Up the Login Endpoint

In the authentication router (`auth.py`), a token schema is used as the response model. This ensures that when a user logs in, the returned response contains exactly the fields defined in our token schema. Make sure the attribute names and capitalization match the schema definitions.

```
from fastapi import APIRouter, Depends, status, HTTPException, Response
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from .. import database, schemas, models, utils, oauth2

router = APIRouter(tags=['Authentication'])

@router.post('/login', response_model=schemas.Token)
def login(
    user_credentials: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(database.get_db)
):
    user = db.query(models.User).filter(
        models.User.email == user_credentials.username
    ).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Invalid Credentials"
        )

    if not utils.verify(user_credentials.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Invalid Credentials"
        )

    # (Token generation logic goes here)
```

When login is successful, you will see a response similar to:

```
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxfQ.ActVWKMnI0OQKurUb-PJkGceJoztIA81Q-xEW",
  "token_type": "bearer"
}
```

Ensure that your client sends this token with every subsequent request that requires authentication.

---

## Testing All Routes

After securing your endpoints, consider testing these common scenarios:

| Scenario           | Expected Outcome                                                                  |
| ------------------ | --------------------------------------------------------------------------------- |
| GET /posts         | Unauthorized request returns a 401 error with "Not authenticated".                |
| GET /posts/{id}    | Requires a valid token to fetch a specific post.                                  |
| DELETE /posts/{id} | Deleting without proper authentication returns a not found or unauthorized error. |
| PUT /posts/{id}    | Updating a post without the Bearer token returns "Not authenticated".             |

> [!important]
> **Important**
>
> Always include a valid token in your requests for protected endpoints to ensure proper access control.

---

This concludes our guide on protecting routes using authentication in FastAPI. By enforcing these measures, your API will only allow authenticated users to perform sensitive actions such as creating, updating, and deleting posts.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/ed782f8c-495c-4ff8-8703-c9ab0ab04a4d/lesson/aa5e27b8-a5e2-4be2-be99-de62bdcf3515)**
>
> Watch video content
