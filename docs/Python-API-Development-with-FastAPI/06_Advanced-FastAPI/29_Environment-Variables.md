# Environment Variables - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Advanced-FastAPI/Environment-Variables)

---

## Table of Contents

- Environment Variables
  - The Risks of Hardcoding
  - Leveraging Environment Variables
  - Configuring Environment Variables
  - Managing Multiple Variables with .env Files
  - Integrating Environment Variables into Your Application
  - Summary
  - Watch Video
    - Accessing Environment Variables in Python
    - On Windows
    - On macOS/Linux
    - Using Pydantic BaseSettings for Validation
    - Creating the .env File
    - Database Connection Setup
    - OAuth2 Token Configuration

---

## Content

Python API Development with FastAPI

Advanced FastAPI

# Environment Variables

In modern application development, it’s crucial to avoid hardcoding sensitive information—such as database credentials and secret keys—directly in your code. Hardcoding makes your application vulnerable to security risks, especially when code is shared or pushed to public repositories like GitHub. Moreover, it complicates deployment across multiple environments (development, staging, production). This guide covers best practices for managing environment variables, ensuring your application remains secure and adaptable.

---

## The Risks of Hardcoding

Embedding sensitive data directly in your source code exposes it to unnecessary risk and limits flexibility. Consider the following Python code snippet:

```
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import psycopg2
from psycopg2.extras import RealDictCursor
import time


SQLALCHEMY_DATABASE_URL = 'postgresql://postgres:password123@localhost/fastapi'


engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

Hardcoding the database URL leads to two significant problems:

1.  > [!important]
    > **Security Concern**
    >
    > If the code is pushed to a public repository, your credentials are exposed to everyone.
2.  > [!important]
    > **Deployment Issues**
    >
    > The static configuration ties the code to a single environment, forcing manual updates for production deployments.

Similarly, hardcoding OAuth secret keys can lead to security vulnerabilities. For example:

```
from fastapi import Depends, status, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
import jwt


oauth2_scheme = OAuth2PasswordBearer(tokenUrl='login')


# SECRET_KEY, ALGORITHM, and ACCESS_TOKEN_EXPIRE_MINUTES are hardcoded here
SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f799f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
```

Hardcoding secret keys makes it difficult to manage configurations across different environments, increasing security risks and maintenance overhead.

---

## Leveraging Environment Variables

Environment variables allow you to externalize sensitive configuration details. By setting these values at the operating system level, your application can automatically retrieve the correct configuration for the current environment.

### Accessing Environment Variables in Python

Create a simple file (e.g., `example.py`) to demonstrate accessing an environment variable:

```
import os


# Retrieve the PATH environment variable (note: variable names are case-sensitive on non-Windows systems)
path = os.getenv("Path")
print(path)
```

Execute the script with:

```
py example.py
```

This command prints the value of the PATH variable, illustrating how environment variables can be accessed in Python.

---

## Configuring Environment Variables

### On Windows

1.  Open **Advanced System Settings** and click **Environment Variables**.
2.  Create a new user variable (e.g., `MY_DB_URL`) with a value like `localhost:5432`.
3.  Open a new command prompt, then verify by running:

    ```
    echo %MY_DB_URL%
    ```

_Note: If you update environment variables, close and reopen your terminal or VS Code to see the changes._

### On macOS/Linux

Set an environment variable in the terminal:

```
export MY_DB_URL="localhost:5432"
printenv | grep MY_DB_URL
```

Or verify using:

```
echo $MY_DB_URL
```

---

## Managing Multiple Variables with .env Files

For projects with numerous environment variables, managing them manually can be tedious. A common solution during development is to use an environment file (commonly named `.env`).

### Using Pydantic BaseSettings for Validation

[Pydantic](https://pydantic-docs.helpmanual.io/) offers a robust solution for managing and validating environment variables through the `BaseSettings` class. This method ensures that all required settings are present and automatically handles type conversions.

Create a configuration file (e.g., `config.py`):

```
from pydantic import BaseSettings


class Settings(BaseSettings):
    database_hostname: str
    database_port: str
    database_password: str
    database_name: str
    database_username: str
    secret_key: str
    algorithm: str
    access_token_expire_minutes: int


    class Config:
        # Load variables from the .env file
        env_file = ".env"


settings = Settings()
```

Pydantic reads and validates the environment variables at runtime. If a required variable is missing or a conversion fails, it raises a descriptive error.

### Creating the .env File

In your project root, add a `.env` file:

```
DATABASE_HOSTNAME=localhost
DATABASE_PORT=5432
DATABASE_PASSWORD=password123
DATABASE_NAME=fastapi
DATABASE_USERNAME=postgres
SECRET_KEY=09d25e094faa6ca2556c818166b7a9563b93f799f6f0f4caa6cf63b88e8d3e7
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

> [!important]
> **Security Best Practices**
>
> Avoid committing your `.env` file to version control. Add `.env` to your `.gitignore` to protect your sensitive data.

---

## Integrating Environment Variables into Your Application

After centralizing your configuration using environment variables, update your codebase to reference these settings.

### Database Connection Setup

In `database.py`, adjust your database connection configuration to use environment variables:

```
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import psycopg2
from psycopg2.extras import RealDictCursor
import time
from config import settings  # Import validated settings


SQLALCHEMY_DATABASE_URL = (
    f"postgresql://{settings.database_username}:"
    f"{settings.database_password}@"
    f"{settings.database_hostname}:"
    f"{settings.database_port}/"
    f"{settings.database_name}"
)


engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

### OAuth2 Token Configuration

Similarly, update your OAuth2 settings to reference configuration variables:

```
from fastapi import Depends, status, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
import jwt
from config import settings


oauth2_scheme = OAuth2PasswordBearer(tokenUrl='login')


# Use environment variables for sensitive settings
SECRET_KEY = settings.secret_key
ALGORITHM = settings.algorithm
ACCESS_TOKEN_EXPIRE_MINUTES = settings.access_token_expire_minutes


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
```

By centralizing configuration in `config.py`, your application automatically adapts to different environments without modifying the code.

---

## Summary

- **Avoid Hardcoding:** Embed sensitive information as environment variables rather than hardcoding.
- **Environment Variables:** Utilize OS-level variables to manage configurations dynamically.
- **Pydantic Validation:** Employ Pydantic’s `BaseSettings` to validate and manage environment settings.
- **.env File Usage:** During development, use a `.env` file to simplify configuration management, but exclude it from version control.
- **Dynamic Application Configuration:** Update your application to utilize environment variables, ensuring secure and flexible deployments across various environments.

By following these practices, you improve your application’s security, scalability, and maintainability while reducing the risk of exposing sensitive information.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/ed782f8c-495c-4ff8-8703-c9ab0ab04a4d/lesson/ecc2161d-d790-4ab6-8454-baae59b225e7)**
>
> Watch video content
