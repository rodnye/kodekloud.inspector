# Hashing User Password - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Advanced-FastAPI/Hashing-User-Password)

---

## Table of Contents

- Hashing User Password
  - Installing Required Libraries
  - Application Models and Environment
  - Configuring the Password Hasher
  - Updating the User Registration Endpoint
  - Extracting the Hashing Logic for Maintainability
  - Watch Video

---

## Content

Python API Development with FastAPI

Advanced FastAPI

# Hashing User Password

Earlier, we outlined the process for creating a new user. However, storing passwords as plain text poses a significant security risk. Even if your database is secure now, a breach could expose these passwords to attackers. Instead, always store a hashed version of the password. Hashing is a one-way process that makes it practically impossible to retrieve the original password from its hash.

For instance, running the following SQL command:

```
select * from users;
```

reveals that storing plain text passwords (as the query would show) is unsafe. Always hash passwords before saving them to your database.

> [!important]
> **Tip**
>
> FastAPI’s documentation provides an excellent guide on password hashing under the [OAuth2 with Password section](https://fastapi.tiangolo.com/tutorial/security/oauth2-jwt/).

## Installing Required Libraries

To implement password hashing, you need two libraries: Passlib (which supports multiple hashing algorithms) and bcrypt (the algorithm we will use). Install them using pip:

```
pip install passlib[bcrypt]
```

Alternatively, install both libraries directly:

```
pip install passlib bcrypt
```

After installation, verify that both libraries are installed by running `pip freeze`.

## Application Models and Environment

Below is a snippet from our application models and configurations:

```
class Post(PostBase):
    id: int
    created_at: datetime


    class Config:
        orm_mode = True


class UserCreate(BaseModel):
    email: EmailStr
    password: str


class UserOut(BaseModel):
    id: int
    email: EmailStr
    created_at: datetime


    class Config:
        orm_mode = True
```

And a sample of our environment package list:

```
colorama==0.4.4
dnspython==2.1.0
email-validator==1.1.3
fastapi==0.68.0
graphene==2.1.9
```

## Configuring the Password Hasher

In your main file, import `CryptContext` from Passlib to create a password context that utilizes bcrypt:

```
from fastapi.params import Body
from pydantic import BaseModel
from passlib.context import CryptContext
from random import randrange
import psycopg2
from psycopg2.extras import RealDictCursor
import time
from sqlalchemy.orm import Session
from sqlalchemy.sql.functions import mode
from . import models, schemas
from .database import engine, get_db


# Configure Passlib to use bcrypt for password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
models.Base.metadata.create_all(bind=engine)
app = FastAPI()


while True:
    # Your database connection logic goes here
    break
```

This configuration sets up the CryptContext to use the bcrypt algorithm for secure password hashing.

## Updating the User Registration Endpoint

To ensure passwords are securely stored, update the registration endpoint to hash the password before saving it to the database:

```
@app.post("/users", status_code=status.HTTP_201_CREATED, response_model=schemas.UserOut)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    # Hash the user's password before storing it in the database
    hashed_password = pwd_context.hash(user.password)
    user.password = hashed_password


    new_user = models.User(**user.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user
```

A similar version of this endpoint appears as follows:

```
@app.post("/users/", response_model=schemas.UserOut)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    # Hash the password using Passlib's CryptContext
    hashed_password = pwd_context.hash(user.password)
    user.password = hashed_password


    new_user = models.User(**user.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user
```

After creating a user, you can confirm that the password has been hashed by running:

```
select * from users;
```

Since hashing is a one-way process, retrieving the original password from the hash is not feasible.

## Extracting the Hashing Logic for Maintainability

To improve code maintainability, extract the password hashing logic into a separate utility function. Create a new file named `utils.py` with the following content:

```
from passlib.context import CryptContext
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash(password: str) -> str:
    return pwd_context.hash(password)
```

Then, modify your `main.py` to import and use this new utility function:

```
from sqlalchemy.sql.functions import mode
from . import models, schemas, utils
from .database import engine, get_db


models.Base.metadata.create_all(bind=engine)
app = FastAPI()


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
        print("Database connection was successful")
        break
    except Exception as error:
        print("Connecting to database failed")
        print("Error:", error)
        time.sleep(2)
```

Update the user registration endpoint to use the utility function for hashing:

```
@app.post("/users", status_code=status.HTTP_201_CREATED, response_model=schemas.UserOut)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    # Hash the user's password using the utility function from utils.py
    hashed_password = utils.hash(user.password)
    user.password = hashed_password


    new_user = models.User(**user.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user
```

After testing the endpoint—by creating a new user (e.g., email "mark@gmail.com" with password "password123")—query the users table:

```
select * from users;
```

This query will confirm that the application stores only the hashed password, significantly reducing security risks in the event of a data breach.

> [!important]
> **Summary**
>
> By following these steps, you enhance your application's security by ensuring user passwords are hashed rather than stored in plain text. This practice is essential for maintaining user data integrity.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/ed782f8c-495c-4ff8-8703-c9ab0ab04a4d/lesson/08fbff1f-121f-4210-ad9a-e600223963d0)**
>
> Watch video content
