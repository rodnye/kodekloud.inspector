# Fetching User In Protected Route - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Advanced-FastAPI/Fetching-User-In-Protected-Route)

---

## Table of Contents

- Fetching User In Protected Route
  - Extended Implementation: Retrieving the User Object from the Database
  - Using the Current User Dependency in Route Operations
  - Console Output Verification
  - Watch Video

---

## Content

Python API Development with FastAPI

Advanced FastAPI

# Fetching User In Protected Route

In this lesson, you will learn how to leverage an access token to fetch the current user directly from your database. Initially, the implementation of the `get_current_user` function calls the `verify_access_token` function, which only extracts and returns the user ID from the token data. Enhancing this logic to automatically retrieve the full user record allows you to attach the complete user object to any path operation, enabling more complex business logic in your endpoints.

Below, you’ll find the initial implementation demonstrating the basic structure using the `verify_access_token` function and the `get_current_user` dependency.

---

```
from jose import JWTError, jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
import schemas


oauth2_scheme = OAuth2PasswordBearer(tokenUrl='login')


def verify_access_token(token: str, credentials_exception):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("user_id")
        if user_id is None:
            raise credentials_exception
        token_data = schemas.TokenData(id=user_id)
    except JWTError:
        raise credentials_exception


    return token_data


def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"}
    )
    return verify_access_token(token, credentials_exception)
```

---

> [!important]
> **Note**
>
> In a production application, remember that the token data only contains the user ID. To work with the entire user object, you must extend this implementation to query your database.

## Extended Implementation: Retrieving the User Object from the Database

In a real-world scenario, after verifying the token, you will want to query your database to fetch the complete user record. The extended version below demonstrates how to import your database session dependency, query the user model, and return the full user object.

---

```
from jose import JWTError, jwt
from datetime import datetime, timedelta
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
import schemas, models, database


oauth2_scheme = OAuth2PasswordBearer(tokenUrl='login')


# Constants for token creation
SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60


def create_access_token(data: dict):
    """Creates a JWT access token with an expiration time."""
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_access_token(token: str, credentials_exception):
    """Verifies the access token and retrieves the token data."""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("user_id")
        if user_id is None:
            raise credentials_exception
        token_data = schemas.TokenData(id=user_id)
    except JWTError:
        raise credentials_exception


    return token_data


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(database.get_db)
):
    """
    Returns the current user based on the access token.
    This function first verifies the token, then queries the database
    to retrieve the user object.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"}
    )


    token_data = verify_access_token(token, credentials_exception)
    user = db.query(models.User).filter(models.User.id == token_data.id).first()
    if not user:
        raise credentials_exception
    return user
```

---

## Using the Current User Dependency in Route Operations

The following examples demonstrate how to integrate the `get_current_user` dependency within your route operations. Notice that the dependency now returns the full user object (referred to as `current_user`). This enhancement eliminates the need to repeatedly query the database in each endpoint.

---

```
from fastapi import APIRouter, Response, HTTPException, status, Depends
from sqlalchemy.orm import Session
from typing import List
import schemas, models, database
from dependencies import get_current_user  # Adjust the import as per your project structure


router = APIRouter()


@router.get("/{id}", response_model=schemas.Post)
def get_post(
    id: int,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(get_current_user)
):
    post = db.query(models.Post).filter(models.Post.id == id).first()
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Post with id: {id} was not found"
        )
    return post


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_post(
    id: int,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(get_current_user)
):
    post_query = db.query(models.Post).filter(models.Post.id == id)
    if post_query.first() is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Post with id: {id} does not exist"
        )
    post_query.delete(synchronize_session=False)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.put("/{id}", response_model=schemas.Post)
def update_post(
    id: int,
    updated_post: schemas.PostCreate,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(get_current_user)
):
    post_query = db.query(models.Post).filter(models.Post.id == id)
    if not post_query.first():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Post with id: {id} does not exist"
        )
    post_query.update(updated_post.dict(), synchronize_session=False)
    db.commit()
    return post_query.first()


@router.get("/", response_model=List[schemas.Post])
def get_posts(
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(get_current_user)
):
    posts = db.query(models.Post).all()
    return posts


@router.post("/", status_code=status.HTTP_201_CREATED, response_model=schemas.Post)
def create_post(
    post: schemas.PostCreate,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(get_current_user)
):
    # Output the user's email for verification purposes.
    print(current_user.email)
    new_post = models.Post(**post.dict())
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post
```

---

## Console Output Verification

When you run your application, you should see console output similar to the following:

INFO: Started server process \[12328\]  
INFO: Application startup complete.  
sanjeev@gmail.com  
INFO: 127.0.0.1:59999 - "POST /posts HTTP/1.1" 201 Created

This output confirms that the `current_user` dependency correctly retrieves and prints the user’s email, ensuring that user-specific data is readily available for any subsequent business logic in your endpoints.

> [!important]
> **Summary**
>
> By returning the complete user object via the `get_current_user` dependency, your FastAPI application can efficiently access and utilize user-specific information throughout your route operations. This approach streamlines the management of authentication and user authorization in your API.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/ed782f8c-495c-4ff8-8703-c9ab0ab04a4d/lesson/7294905c-798f-46eb-b8a3-38f26f621a0a)**
>
> Watch video content
