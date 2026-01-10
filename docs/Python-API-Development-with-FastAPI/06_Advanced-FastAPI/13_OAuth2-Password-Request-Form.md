# OAuth2 Password Request Form - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Advanced-FastAPI/OAuth2-Password-Request-Form)

---

## Table of Contents

- OAuth2 Password Request Form
  - Original Login Endpoint Using a Custom Schema
  - Updating the Login Endpoint with OAuth2PasswordRequestForm
  - Testing the Endpoint
  - Summary
  - Watch Video

---

## Content

Python API Development with FastAPI

Advanced FastAPI

# OAuth2 Password Request Form

In this lesson, we will modify our login route to retrieve user credentials from form data using FastAPI's built-in dependency—OAuth2PasswordRequestForm. This change means that instead of sending credentials in the JSON body, the form data will include the default fields "username" and "password". As a result, our code must reference "username" (which can be your email) rather than "email".

## Original Login Endpoint Using a Custom Schema

Below is the initial version of the login endpoint that uses a custom schema (schemas.UserLogin):

```
from fastapi import APIRouter, Depends, status, HTTPException, Response
from sqlalchemy.orm import Session


from .. import database, schemas, models, utils, oauth2


router = APIRouter(tags=['Authentication'])


@router.post('/login')
def login(user_credentials: schemas.UserLogin, db: Session = Depends(database.get_db)):
    user = db.query(models.User).filter(
        models.User.email == user_credentials.email
    ).first()


    if not user:
        # Additional logic would go here
        pass
```

When running this code, you might see output similar to:

```
SyntaxError: invalid syntax
WARNING: WatchGodReload detected file change in ['C:\\Users\\sanje\\Documents\\Courses\\fastapi\\app\\routers\\auth.py', 'C:\\Users\\sanje\\Documents\\Courses\\fastapi\\app\\routers\\auth.py']. Reloading...
WARNING: WatchGodReload detected file change in ['C:\\Users\\sanje\\Documents\\Courses\\fastapi\\app\\routers\\auth.py', 'C:\\Users\\sanje\\Documents\\Courses\\fastapi\\app\\routers\\auth.py']. Reloading...
Database expansion was successful
INFO: Started server process [11820]
INFO: Waiting for application startup.
INFO: Application startup complete.
INFO: 127.0.0.1:63905 - "POST /login HTTP/1.1" 200 OK
```

## Updating the Login Endpoint with OAuth2PasswordRequestForm

To leverage FastAPI’s built-in support, import `OAuth2PasswordRequestForm` from `fastapi.security`. This dependency automatically extracts the credentials from form data. Note that the form now expects a field named "username" instead of "email". Therefore, update the database query to filter using `user_credentials.username`.

Below is the updated version of the login endpoint:

```
from fastapi import APIRouter, Depends, status, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session


from .. import database, models, utils


router = APIRouter(tags=['Authentication'])


@router.post('/login')
def login(user_credentials: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
    user = db.query(models.User).filter(
        models.User.email == user_credentials.username
    ).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Invalid Credentials"
        )

    if not utils.verify(user_credentials.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Invalid Credentials"
        )

    # Additional token generation logic can be implemented here.
```

> [!important]
> **Note**
>
> When testing this endpoint, ensure that the credentials are sent as form data. The expected form fields are "username" (which can be an email) and "password".

## Testing the Endpoint

If you test the endpoint using the previous JSON body format:

```
{
  "email": "sanjeev@gmail.com",
  "password": "password123"
}
```

you will encounter errors similar to:

```
{
    "loc": [
        "body",
        "username"
    ],
    "msg": "field required",
    "type": "value_error.missing"
}
```

and

```
{
    "loc": [
        "body",
        "password"
    ],
    "msg": "field required",
    "type": "value_error.missing"
}
```

FastAPI now correctly expects the credentials in form data rather than JSON. When submitting the correct form data with "username" and "password", the login endpoint should work as intended.

An example successful response might look like:

```
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMTE2MTU1MTAzODMwMTc5NzE4LCJzdWIiOiJzYW5qZWV2QGdtYWlsLmNvbSIsImlhdCI6MTYyNzEyMDQwMSwiZXhwIjoxNjI3MTI0MDAxfQ.6I8HwvPCyVexRqXlW1IDGTo",
  "token_type": "bearer"
}
```

> [!important]
> **Note**
>
> Using `OAuth2PasswordRequestForm` simplifies handling credentials by automating the extraction of form data. This built-in functionality is aligned with FastAPI's recommended practices and reduces the need for custom parsing.

## Summary

By integrating `OAuth2PasswordRequestForm`, we streamline the authentication process:

- Credentials are now expected as form data with fields "username" and "password".
- The login endpoint has been updated accordingly to query the database using the "username" field.
- This change adheres to FastAPI best practices and improves overall reliability during authentication.

This updated approach simplifies the endpoint design and makes your API more intuitive for clients using form-based authentication.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/ed782f8c-495c-4ff8-8703-c9ab0ab04a4d/lesson/d19f446f-2cf4-423d-a103-b14c18bed2b8)**
>
> Watch video content
