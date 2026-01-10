# Create User Test - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Testing/Create-User-Test)

---

## Table of Contents

- Create User Test
  - Testing the Root Endpoint
  - Testing the Create User Endpoint
  - Validating the Response Schema
  - Handling Duplicate User Creation
  - Final Test Code
  - Watch Video

---

## Content

Python API Development with FastAPI

Testing

# Create User Test

In this lesson, we will create tests to verify the user creation functionality of our API using FastAPI’s TestClient. We simulate GET and POST requests to ensure that the API responds correctly.

---

## Testing the Root Endpoint

Before testing user creation, we first verify that the API's root endpoint is operational. The following test sends a GET request to the "/" route and asserts that the response includes the message "Hello World" with a status code of 200.

```
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_root():
    res = client.get("/")
    print(res.json().get("message"))
    assert res.json().get("message") == "Hello World"
    assert res.status_code == 200
```

Sample console output:

```
tests/test_calculations.py::test_bank_transaction[50-10-40] PASSED
tests/test_calculations.py::test_bank_transaction[1200-200-1000] PASSED
tests/test_calculations.py::test_insufficient_funds PASSED
tests/test_users.py::test_root PASSED
============================= 16 passed, 5 warnings in 0.67s =============================
```

---

## Testing the Create User Endpoint

Next, we validate the user creation route. This route expects a POST request to `/users/` with JSON data containing an email and a password.

Initially, a simple version of the test might look like this:

```
from fastapi.testclient import TestClient

def register():
    r = 'Hello World'
```

Sample output for test runs:

```
tests/test_calculations.py::test_bank_transaction[50-10-40]  PASSED
tests/test_calculations.py::test_bank_transaction[1200-200-1000]  PASSED
tests/test_calculations.py::test_insufficient_funds  PASSED
tests/test_users.py::test_root  PASSED
============================== 16 passed, 5 warnings in 0.67s ===============================
```

Now, update the test to send a POST request with a JSON payload. In our endpoint, the schema requires an email and password. We verify that the response status is 201 (Created).

```
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_create_user():
    res = client.post("/users/", json={"email": "hello123@gmail.com", "password": "password123"})
    print(res.json())
    assert res.status_code == 201
```

The test output should confirm a status code of 201:

```
tests/test_calculations.py::test_bank_transaction[50-10-40] PASSED
tests/test_calculations.py::test_bank_transaction[1200-200-1000] PASSED
tests/test_calculations.py::test_insufficient_funds PASSED
tests/test_users.py::test_root PASSED

================================== 16 passed, 5 warnings in 0.67s ===================================
```

---

## Validating the Response Schema

The user creation endpoint is designed to return data that follows a specific schema, including an ID, email, and a created_at timestamp. The expected Pydantic model is defined as follows:

```
from pydantic import BaseModel, EmailStr
from datetime import datetime

class PostCreate(PostBase):
    pass

class UserOut(BaseModel):
    id: int
    email: EmailStr
    created_at: datetime

    class Config:
        orm_mode = True

class Post(PostBase):
    pass
```

To ensure that the response conforms to this schema, the test imports the schemas and instantiates a `UserOut` model with the returned JSON data. This method automatically validates the structure of the response.

```
from fastapi.testclient import TestClient
from app.main import app
from app import schemas  # Import schemas to use the UserOut model

client = TestClient(app)

def test_create_user():
    res = client.post(
        "/users/", json={"email": "hello123@gmail.com", "password": "password123"}
    )
    # Validate the response using the UserOut schema
    new_user = schemas.UserOut(**res.json())
    # Confirm that the email is correct and the status code is 201
    assert new_user.email == "hello123@gmail.com"
    assert res.status_code == 201
```

Running this test will produce output similar to:

```
tests/test_users.py::test_root Hello World
PASSED
tests/test_users.py::test_create_user {'id': 12, 'email': 'hello123@gmail.com', 'created_at': '2021-09-12T21:29:59.775700-04:00'}
PASSED

================================= 2 passed, 5 warnings in 0.89s =================================
```

---

## Handling Duplicate User Creation

At times, using the same email for multiple tests can trigger an IntegrityError due to a duplicate key violation. An example error message might be:

```
cursor.execute(statement, parameters)
sqlalchemy.exc.IntegrityError: (psycopg2.errors.UniqueViolation) duplicate key value violates unique constraint "users_email_key"
DETAIL:  Key (email)=(hello123@gmail.com) already exists.
...
```

> [!important]
> **Warning**
>
> To avoid duplicate key errors, ensure that users are either removed from the database between tests or that you use unique email addresses for each test run.

You can run the following SQL command in PgAdmin to view current user entries:

```
SELECT * FROM public.users
ORDER BY "id" ASC;
```

After deleting the user entry with the email "hello123@gmail.com", re-running the test should result in a successful user creation.

---

## Final Test Code

Below is the consolidated version of our test code after all improvements:

```
from fastapi.testclient import TestClient
from app.main import app
from app import schemas

client = TestClient(app)

def test_root():
    res = client.get("/")
    print(res.json().get("message"))
    assert res.json().get("message") == "Hello World"
    assert res.status_code == 200

def test_create_user():
    res = client.post(
        "/users/", json={"email": "hello123@gmail.com", "password": "password123"}
    )
    new_user = schemas.UserOut(**res.json())
    assert new_user.email == "hello123@gmail.com"
    assert res.status_code == 201
```

Sample run confirming both tests pass:

```
platform win32 -- Python 3.9.5, pytest-6.2.5, py-1.10.0, pluggy-1.0.0 -- c:\users\sanje\documents\courses\fastapi\venv\scripts\python.exe
cachedir: .pytest_cache
rootdir: c:\Users\sanje\Documents\Courses\fastapi
plugins: cov-2.12.1
collected 2 items

tests/test_users.py::test_root Hello World PASSED
tests/test_users.py::test_create_user PASSED

================================== 2 passed, 5 warnings in 0.87s ==================================
```

> [!important]
> **Note**
>
> This approach leverages FastAPI's TestClient and Pydantic for automatic schema validation, reducing the need for multiple manual assertions and ensuring the correctness of the API responses.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/eed445e5-68aa-46b3-9922-0fdf2a57b8f1/lesson/898eae34-d3ed-4450-a3bd-e3e40746a422)**
>
> Watch video content
