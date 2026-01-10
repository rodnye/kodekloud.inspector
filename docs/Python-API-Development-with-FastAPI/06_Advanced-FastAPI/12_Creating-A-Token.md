# Creating A Token - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Advanced-FastAPI/Creating-A-Token)

---

## Table of Contents

- Creating A Token
  - Step 1. Installing the Required Library
  - Step 2. Project Structure and File Setup
  - Step 3. Importing JWT Functions and Setting Up Token Configuration
  - Step 4. Creating the Access Token
  - Step 5. Using the Token in a Login Endpoint
  - Step 6. Testing Your JWT Token
  - Understanding JWT Security
  - Conclusion
  - Watch Video

---

## Content

Python API Development with FastAPI

Advanced FastAPI

# Creating A Token

In this guide, you'll learn how to create and manage JWT tokens for authentication in a FastAPI application. This implementation follows the [FastAPI documentation](https://fastapi.tiangolo.com/advanced/security/) for password-based authentication. The article covers installing the required library, configuring token settings, creating the token, and integrating it into a login endpoint.

────────────────────────────────────────

## Step 1. Installing the Required Library

First, install the library that handles signing and verification of JWT tokens. FastAPI uses the Python library python‑jose with a cryptography backend. Open your terminal and run the following command:

```
pip install python-jose[cryptography]
```

After the installation, you should see output similar to:

```
Installing collected packages: cryptography
Successfully installed cryptography-3.4.8 edcsa-0.15-python-jose cryptography
WARNING: You are using pip version 21.1.1; however, version 21.2.4 is available.
```

────────────────────────────────────────

## Step 2. Project Structure and File Setup

For handling authentication and JWT tokens, create a new file (for example, `oauth2.py`). Organize your project by including routers for posts, users, and authentication. A sample snippet might look like this:

```
def find_index_post(id):
    for i, p in enumerate(my_posts):
        if p['id'] == id:
            return i


app.include_router(post.router)
app.include_router(user.router)
app.include_router(auth.router)


@app.get("/")
def root():
    return {"message": "Welcome to the API"}
```

────────────────────────────────────────

## Step 3. Importing JWT Functions and Setting Up Token Configuration

Begin by importing JWT functionalities from python‑jose and setting up your token configuration. This includes defining a secret key, algorithm, and token expiration time. The secret key should be a long, randomly generated string.

> [!important]
> **Tip**
>
> To generate a secure secret key, use the command: `openssl rand -hex 32`

Below is an example configuration:

```
from datetime import datetime, timedelta
from typing import Optional


from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel


# to get a string like this run:
# openssl rand -hex 32
SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


fake_users_db = {
    "johndoe": {
        "username": "johndoe",
        "full_name": "John Doe",
        "email": "johndoe@example.com",
        "hashed_password": "$2b$12$E2SxE1ZElStv1bvfx5v1kb6ZTb9v6Qoe6LruJ3vIPGmAmOQhnY4iK",
        "disabled": False,
    }
}


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Optional[str] = None
```

For demonstration, a simple password string may suffice. However, for a production environment, always generate a secure secret key.

────────────────────────────────────────

## Step 4. Creating the Access Token

Define a function that creates an access token. The token payload includes the data you wish to expose (for example, the user ID) in addition to an expiration time. The expiration time is set by adding a defined time delta to the current timestamp.

Here’s the implementation:

```
def create_access_token(data: dict):
    to_encode = data.copy()  # Copy the data to prevent mutation
    expire = datetime.now() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})  # Add the expiration time to the payload
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
```

When this function is invoked, it generates a JWT token encoding both the provided data and the expiration time. The JWT library signs the token with the configured secret key and algorithm to ensure data integrity.

────────────────────────────────────────

## Step 5. Using the Token in a Login Endpoint

Integrate the token generation function into your FastAPI login endpoint. When a user supplies valid credentials, create an access token that includes the user ID. Return the token along with its type (in this case, "bearer") for use in the Authorization header of subsequent requests.

Below is an example of a login endpoint implementation:

```
from fastapi import APIRouter, Depends, status, HTTPException, Response
from sqlalchemy.orm import Session


from .. import database, schemas, models, oauth2


router = APIRouter(tags=['Authentication'])


@router.post('/login')
def login(user_credentials: schemas.UserLogin, db: Session = Depends(database.get_db)):
    user = db.query(models.User).filter(
        models.User.email == user_credentials.email
    ).first()

    if not user:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid credentials")

    # Create an access token using the user's id as payload.
    access_token = oauth2.create_access_token(data={"user_id": user.id})
    return {"access_token": access_token, "token_type": "bearer"}
```

Clients should include the token in the Authorization header like this:

```
Authorization: Bearer <JWT_TOKEN>
```

────────────────────────────────────────

## Step 6. Testing Your JWT Token

Once your FastAPI application is running, you can test the login endpoint with valid credentials. For example, send the following JSON payload:

```
{
    "email": "sanjeev@gmail.com",
    "password": "password123"
}
```

A successful response might look like this:

```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxNjMxMjM3Mzc5fQ.AKjP8cDhcdF0xB_BX6DYYh5LuPncVm8zl2nk_KRU",
    "token_type": "bearer"
}
```

To inspect the contents of your JWT token, visit [JWT.io](https://jwt.io/). Paste your token into the debugger to view the decoded header and payload. For example:

```
Encoded
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjozNiwibmFtZSI6IkpvaG4ifQ.Q.4sWkRPbUhdcP0xB..._B6X6DYh1sUtnPcwMwZ1nk_KRU


Decoded
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "user": 36,
    "name": "John"
  },
  "Verify Signature": "HMACSHA256( base64UrlEncode(header) + \".\" + base64UrlEncode(payload), secret)"
}
```

This decoding lets you view the expiration time and other data contained in the token.

────────────────────────────────────────

## Understanding JWT Security

> [!important]
> **Important Security Note**
>
> JWTs are not encrypted. Their payload is simply base64 encoded, which means anyone who intercepts the token can read its content. However, thanks to the digital signature (using your secret key), any unauthorized modification to the token invalidates it. Additionally, an expiration time is added to the token to ensure that outdated tokens can no longer be used.

────────────────────────────────────────

## Conclusion

In this article, we've covered how to:

- Install python‑jose with its cryptography backend.
- Configure token settings including secret keys, algorithms, and expiration times.
- Create a JWT access token.
- Integrate the token into a FastAPI login endpoint.

This approach ensures your API can verify both the integrity and validity (through the expiration time) of the tokens provided by authenticated users.

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/ed782f8c-495c-4ff8-8703-c9ab0ab04a4d/lesson/d704faee-9ab1-45b0-a9e3-0b272a5608fa)**
>
> Watch video content
