# Login Process Flow - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Advanced-FastAPI/Login-Process-Flow)

---

## Table of Contents

- Login Process Flow
  - Creating the Login Path Operation
  - Validating the Password
  - Testing the Login Endpoint
  - Wiring Up the Router
  - Next Steps
  - Watch Video

---

## Content

Python API Development with FastAPI

Advanced FastAPI

# Login Process Flow

In this article, we explain the user authentication process during login. We'll detail how submitted credentials are verified by comparing the plain text password against its hashed counterpart stored in the database, and how an authentication token is generated upon successful verification.

When a user submits a login request, they provide an email and password (highlighted in red in our diagrams). Although the password is transmitted in plain text, only a hashed version is stored in the database for security. This raises the challenge of comparing a plain text password with a hashed version.

The solution is to hash the submitted password using the same function that was used for hashing the original password during registration. If the hashed attempt matches the stored hash, the credentials are validated and an authentication token is generated and returned.

![The image illustrates a user login process involving an API, where an email and password are sent, the password is hashed, and a token is returned if the hashed password matches the stored hashed password.](https://kodekloud.com/kk-media/image/upload/v1752883330/notes-assets/images/Python-API-Development-with-FastAPI-Login-Process-Flow/user-login-api-process-diagram.jpg)

## Creating the Login Path Operation

Instead of placing the login endpoint within the `users.py` router, it is best practice to create a dedicated authentication router. This separation keeps user routes distinct from authentication routes.

Begin by creating a file (for this example, we'll use `app.py`) and importing the necessary modules from FastAPI. The following code snippet sets up the new authentication router:

```
from fastapi import APIRouter, Depends, status, HTTPException, Response


router = APIRouter(tags=['Authentication'])
```

Because the login involves handling user credentials, define the route as a POST request. While the endpoint can be named either `/login` or `/authenticate`, we'll use `/login` in this example.

Next, define the login function. This function retrieves the user from the database based on the provided email. For this reason, we import the database session along with our application's models and schemas. Remember, in the database, the user passwords are stored as hashed values.

Below is the code that sets up the login endpoint and fetches the user details:

```
from fastapi import APIRouter, Depends, status, HTTPException, Response
from sqlalchemy.orm import Session
from .. import database, schemas, models


router = APIRouter(tags=['Authentication'])


@router.post('/login')
def login(user_credentials: schemas.UserLogin, db: Session = Depends(database.get_db)):
    user = db.query(models.User).filter(models.User.email == user_credentials.email).first()


    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Invalid Credentials")
```

![The image shows a Visual Studio Code interface with Python code for a FastAPI application, including imports and a function definition for a login route. The terminal at the bottom displays a command prompt.](https://kodekloud.com/kk-media/image/upload/v1752883331/notes-assets/images/Python-API-Development-with-FastAPI-Login-Process-Flow/vscode-python-fastapi-login-route.jpg)

## Validating the Password

The next step is to validate the password provided by the user by comparing the plain text input with the hashed password stored in the database. This is achieved by re-hashing the incoming password using the same password hashing function, then comparing it with the stored hash.

In a utility file (e.g., `utils.py`), implement the Bcrypt logic. This file contains functions to hash a password and to verify an attempted password against the hashed password.

```
from passlib.context import CryptContext
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash(password: str):
    return pwd_context.hash(password)


def verify(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)
```

Return to the login endpoint and incorporate the `verify` function from the `utils` module. This function checks if the provided password matches the hashed password in the database. If the credentials are invalid, an HTTP exception is raised without exposing whether the email or password is incorrect.

```
from fastapi import APIRouter, Depends, status, HTTPException, Response
from sqlalchemy.orm import Session
from .. import database, schemas, models, utils


router = APIRouter(tags=['Authentication'])


@router.post('/login')
def login(user_credentials: schemas.UserLogin, db: Session = Depends(database.get_db)):
    user = db.query(models.User).filter(models.User.email == user_credentials.email).first()


    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Invalid Credentials")


    if not utils.verify(user_credentials.password, user.password):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Invalid Credentials")

    # Create a token (token creation logic to be implemented next)
    return {"token": "example token"}
```

![The image shows a split-screen view of Visual Studio Code and Postman. Visual Studio Code displays a project directory with Python files, while Postman is set up to send a POST request to a local server.](https://kodekloud.com/kk-media/image/upload/v1752883333/notes-assets/images/Python-API-Development-with-FastAPI-Login-Process-Flow/vscode-postman-python-request.jpg)

> [!important]
> **Note**
>
> Ensure that your utility functions and hashing mechanisms are consistent across your application to maintain security integrity.

## Testing the Login Endpoint

Before testing the login process, verify that your database is in a clean state. If necessary, delete existing users who might have unhashed or inconsistent passwords. You can execute the following SQL commands:

```
SELECT * FROM users;
DELETE FROM users;
SELECT * FROM users;
```

After cleaning the database, register a new user via the `/users` endpoint using a JSON payload like this:

```
{
  "email": "mark11263asdfd@gmail.com",
  "password": "password123"
}
```

The response should confirm successful creation of the user:

```
{
  "id": 15,
  "email": "mark11263asdfd@gmail.com",
  "created_at": "2021-08-27T22:17:14.913763-04:00"
}
```

Next, test the login functionality by sending a POST request to `/login` with the following JSON payload:

```
{
  "email": "sanjeev@gmail.com",
  "password": "password123"
}
```

If the credentials are valid, you should receive a response resembling:

```
{
  "token": "example token"
}
```

If the credentials are invalid, the API will respond with:

```
{
  "detail": "Invalid Credentials"
}
```

> [!important]
> **Warning**
>
> Be cautious with error messages. It's best not to reveal which credential (email or password) is incorrect to enhance security.

## Wiring Up the Router

If you receive a 404 error when accessing the `/login` endpoint, verify that the authentication router is included in your main application file (`main.py`). Your main file should include the necessary routers as demonstrated below:

```
from .routers import post, user, auth


app.include_router(post.router)
app.include_router(user.router)
app.include_router(auth.router)


@app.get("/")
def root():
    return {"message": "Welcome to the API!"}
```

After including the router, the login endpoint becomes accessible and will return the appropriate token when valid credentials are provided.

## Next Steps

At this stage, the login mechanism is complete except for the token creation process. In the next installment of this series, we will explore how to generate and manage JWT tokens for securing application routes.

For additional information, check out the following resources:

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Python Security Best Practices](https://docs.python.org/3/howto/security.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/ed782f8c-495c-4ff8-8703-c9ab0ab04a4d/lesson/a2b7b8c1-2c7d-4f28-8a94-9bd78a327e17)**
>
> Watch video content
