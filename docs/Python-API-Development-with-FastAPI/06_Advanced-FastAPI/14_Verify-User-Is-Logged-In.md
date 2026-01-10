# Verify User Is Logged In - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Advanced-FastAPI/Verify-User-Is-Logged-In)

---

## Table of Contents

- Verify User Is Logged In
  - Creating an Access Token
  - Defining Token and User Schemas
  - Token Verification
  - Protecting Endpoints with Authentication
  - Login Route Implementation
  - Securing Post Endpoints
  - Summary of Key Corrections
  - Watch Video
    - Console Output Example
    - Console Output Example
    - Console Output Example
    - Console Output Example
    - Console Output Example
    - Console Output Example

---

## Content

Python API Development with FastAPI

Advanced FastAPI

# Verify User Is Logged In

In this lesson, you'll learn how to verify that a user is logged in by using an access token. After authenticating a user by sending their username and password to the login endpoint, the API returns a JSON Web Token (JWT). This JWT must be included in the request payload every time the user needs to access a protected resource.

For example, after logging in, a user might receive a response like this:

```
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjM0NTY3ODkwLCJleHBpcmF0aW9uIjoxNjc4MjEzMzQ0fQ.WeZxYuAkAVEyb8-1A6LhwvpCyexRxQihWJ1IGDT0",
  "token_type": "bearer"
}
```

Whenever the client makes a request to an endpoint that requires authentication, the JWT from the access token is provided so the API can verify that it has not been tampered with or expired.

Below is another sample token payload:

```
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjM0NTY3ODkwLCJleHBfdGltZSI6MTYyMzEzMDY1Mn0.6c7HaWhvpcYexRqQlhWJ1IGDT0",
  "token_type": "bearer"
}
```

> **Note: Token Structure**
>
> Before handling token verification, it is important to define a schema for the token. This ensures that both an access token and a token type, as strings, are received. You can also define an additional schema if more token data is required.

## Creating an Access Token

The following code snippet shows how to create an access token using the HS256 algorithm with a specified expiration time:

```
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
```

### Console Output Example

```
[tapi/app/routers/auth.py]:: Reloading...
Database connection was successful!
INFO: Server process [3908]
INFO: Waiting for application startup.
INFO: Application startup complete.
127.0.0.1:58559 - "POST /login HTTP/1.1" 422 Unprocessable Entity
127.0.0.1:63605 - "POST /login HTTP/1.1" 200 OK
```

A user is expected to include the access token in subsequent requests. For instance:

```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhbmplZXYuY29tIiwiZXhwIjoxNjYzNjA1NDYyfQ.K2RZLh0VgGldA2_P4FykoLUXf6CJc5H6-MFZagE-it4",
    "token_type": "bearer"
}
```

## Defining Token and User Schemas

To enforce the correct data structure, we define schemas for a user, their login credentials, and tokens as follows:

```
from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class UserOut(BaseModel):
    id: int
    email: EmailStr
    created_at: datetime

    class Config:
        orm_mode = True

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    id: Optional[str] = None
```

### Console Output Example

```
[tapi/app/routers/auth.py]:: Reloading...
Database connection was successful!
INFO: Started server process [3980]
INFO: Waiting for application startup.
INFO: Application startup complete.
127.0.0.1:5859 - "POST /login HTTP/1.1" 422 Unprocessable Entity
127.0.0.1:63605 - "POST /login HTTP/1.1" 200 OK
```

## Token Verification

The data embedded into the access token, such as the user ID, is extracted using the following functions. Although embedding the user ID is optional, it is a good practice for validating the token:

```
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_access_token(token: str, credentials_exception):
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    return payload.get("user_id")
```

### Console Output Example

```
[tapi/app/routers/auth.py]:: Reloading...
Database connection was successfull!
Started server process [3980]
INFO: Waiting for application startup.
Application startup complete.
INFO: 127.0.0.1:58559 - "POST /login HTTP/1.1" 422 Unprocessable Entity
INFO: 127.0.0.1:63605 - "POST /login HTTP/1.1" 200 OK
```

If the token does not include a user ID, a credentials exception is raised. The token verification is wrapped in a try/except block to handle any JWT errors:

```
def verify_access_token(token: str, credentials_exception):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        id_: str = payload.get("user_id")
        if id_ is None:
            raise credentials_exception
        token_data = schemas.TokenData(id=id_)
    except JWTError:
        raise credentials_exception

    return token_data
```

### Console Output Example

```
[tapi/app/routers/auth.py]:: Reloading...
Database connection was successful!
INFO: Started server process [3980]
INFO: Waiting for application startup.
INFO: Application startup complete.
INFO: 127.0.0.1:5859 - "POST /login HTTP/1.1" 422 Unprocessable Entity
INFO: 127.0.0.1:63605 - "POST /login HTTP/1.1" 200 OK
```

## Protecting Endpoints with Authentication

Next, we define the function `get_current_user`. This function can be added as a dependency to any protected endpoint. FastAPI’s dependency injection, along with OAuth2, automatically extracts the token from the request:

```
from jose import JWTError, jwt
from datetime import datetime, timedelta
from fastapi import Depends, status, HTTPException
from fastapi.security import OAuth2PasswordBearer
from . import schemas

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# SECRET_KEY, ALGORITHM and ACCESS_TOKEN_EXPIRE_MINUTES should be defined here
SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_access_token(token: str, credentials_exception):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        id_: str = payload.get("user_id")
        if id_ is None:
            raise credentials_exception
        token_data = schemas.TokenData(id=id_)
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

### Console Output Example

```
[tapi/app/routers/auth.py]:: Reloading...
Database connection was successful!
INFO: Started server process [3980]
INFO: Waiting for application startup.
INFO: Application startup complete.
INFO: 127.0.0.1:58595 - "POST /login HTTP/1.1" 422 Unprocessable Entity
INFO: 127.0.0.1:63605 - "POST /login HTTP/1.1" 200 OK
```

## Login Route Implementation

The login route in the authentication router utilizes the functions detailed above. Notice that the HTTP status code is set to 403 Forbidden when invalid credentials are provided. This accurately represents an error when a user supplies invalid credentials.

```
from fastapi import APIRouter, Depends, status, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from .. import database, models, schemas, utils, oauth2

router = APIRouter(tags=["Authentication"])

@router.post("/login", response_model=schemas.Token)
def login(
    user_credentials: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(database.get_db)
):
    user = db.query(models.User).filter(
        models.User.email == user_credentials.username
    ).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Invalid Credentials"
        )
    if not utils.verify(user_credentials.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Invalid Credentials"
        )

    # Create a token
    access_token = oauth2.create_access_token(data={"user_id": user.id})
    return {"access_token": access_token, "token_type": "bearer"}
```

### Console Output Example

```
[tapi/app/routers/auth.py]:: Reloading...
Database connection was successful!
INFO: Started server process [3980]
INFO: Waiting for application startup.
INFO: Startup complete.
127.0.0.1:15859 - "POST /login HTTP/1.1" 422 Unprocessable Entity
127.0.0.1:163605 - "POST /login HTTP/1.1" 200 OK
```

## Securing Post Endpoints

When creating protected endpoints, such as those for creating new posts, add the dependency on `oauth2.get_current_user` to verify that the user is authenticated:

```
from typing import List
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from .. import models, schemas, oauth2
from ..database import get_db

router = APIRouter(
    prefix="/posts",
    tags=["Posts"]
)

@router.get("/", response_model=List[schemas.Post])
def get_posts(db: Session = Depends(get_db)):
    posts = db.query(models.Post).all()
    return posts

@router.post("/", response_model=schemas.Post)
def create_posts(
    post: schemas.PostCreate,
    db: Session = Depends(get_db),
    get_current_user: int = Depends(oauth2.get_current_user)
):
    new_post = models.Post(**post.dict())
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post
```

> **Note: Important Considerations**
>
> The dependency on `oauth2.get_current_user` ensures that the access token provided in the request is valid and that the user is authenticated before allowing actions such as creating posts.

## Summary of Key Corrections

- The JWT expiration time now leverages `datetime.utcnow()` to ensure UTC consistency.
- The JWT decode function now correctly passes the algorithm as a list (`algorithms=[ALGORITHM]`).
- Consistency in key names is maintained (using `"user_id"` instead of `"users_id"`).
- The proper HTTP status code (403) is utilized for invalid credentials.

This concludes the explanation on how to verify a user's token and how to protect endpoints using JWT and FastAPI.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/ed782f8c-495c-4ff8-8703-c9ab0ab04a4d/lesson/802a6fee-da8c-45b8-b77e-b8ce7e2cb422)**
>
> Watch video content
