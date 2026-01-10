# Fixture Scope - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Testing/Fixture-Scope)

---

## Table of Contents

- Fixture Scope
  - Testing User Creation
  - Transitioning to Login
  - Debugging Login Issues
  - Understanding Fixture Scopes
  - Final Test Code Example
  - Final Thoughts
  - Watch Video
    - Fixture Scopes Explained

---

## Content

Python API Development with FastAPI

Testing

# Fixture Scope

In this lesson, we explore how fixture scopes affect tests for user creation and login in a FastAPI application. We will start with testing user creation, move on to login functionality, and then examine how different fixture scopes (function, module, and session) impact test behavior.

---

## Testing User Creation

The following test case demonstrates how to create a new user. We send a POST request to the "/users/" endpoint with an email and password. The response is then deserialized into a UserOut schema and validated:

```
def test_create_user(client):
    res = client.post(
        "/users/",
        json={"email": "hello123@gmail.com", "password": "password123"}
    )
    new_user = schemas.UserOut(**res.json())
    assert new_user.email == "hello123@gmail.com"
    assert res.status_code == 201
```

Earlier versions of this test might have only checked the status code:

```
/users/ json={"email": "hello123@gmail.com", "password": "password123"}
# new_user = schemas.UserOut(**res.json())
# assert new_user.email == "hello123@gmail.com"
assert res.status_code == 201
```

If there’s an issue with the assertions, for example:

```
tests/test_users.py:19: AssertionError
```

feel free to add additional assertions as needed for more robust testing.

---

## Transitioning to Login

Next, we address the login functionality with the `test_login_user` test case. This test depends on the client fixture to send requests to the login endpoint. Note that the login route is defined as `/login` (without a trailing slash), so our test request must reflect that configuration.

Initially, the code snippet for login testing might have been incomplete (missing the client parameter):

```
def test_create_user(client):
    res = client.post("/users/", json={"email": "hello123@gmail.com", "password": "password123"})
    new_user = schemas.UserOut(**res.json())
    assert new_user.email == "hello123@gmail.com"
    assert res.status_code == 201

def test_login_user()
```

After including the client injection and adapting the route, the updated test code becomes:

```
def test_create_user(client):
    res = client.post(
        "/users",
        json={"email": "hello123@gmail.com", "password": "password123"}
    )
    new_user = schemas.UserOut(**res.json())
    assert new_user.email == "hello123@gmail.com"
    assert res.status_code == 201

def test_login_user(client):
    res = client.post(
        "/login",
        json={"email": "hello123@gmail.com", "password": "password123"}
    )
    # assert new_user.email == "hello123@gmail.com"
    assert res.status_code == 201  # Note: Originally expecting a 307 redirect, but we want a 201
```

> [!important]
> **Important**
>
> For authentication, the login endpoint does not accept JSON. Instead, form data should be sent. Additionally, the field name should be "username" (not "email").

To simulate a proper login, update the test to send form data as follows:

```
def test_login_user(client):
    res = client.post(
        "/login",
        data={"username": "hello123@gmail.com", "password": "password123"}
    )
    print(res.json())
    assert res.status_code == 200
```

If you run this test and encounter a 422 error, review the error message to ensure that the correct field ("username") is being used. Adjusting the payload accordingly should resolve the issue.

---

## Debugging Login Issues

If the login test returns a 403 error with the detail "Invalid Credentials," it may indicate one of the following:

- The user does not exist in the database.
- The provided password does not match the record in the database.

Review the login route in your authentication module (auth.py) for clarity:

```
from fastapi import APIRouter, Depends, status, HTTPException, Response
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from .. import database, schemas, models, utils, oauth2

router = APIRouter(tags=['Authentication'])

@router.post('/login', response_model=schemas.Token)
def login(user_credentials: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
    user = db.query(models.User).filter(models.User.email == user_credentials.username).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Invalid Credentials"
        )

    if not utils.verify(user_credentials.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Invalid Credentials"
        )

    # create and return token here
```

Ensure the test payload uses the field name "username" to match this implementation.

---

## Understanding Fixture Scopes

Our tests make use of a client fixture, which in turn relies on a session fixture to interact with the database. Consider the following session fixture:

```
engine = create_engine(SQLALCHEMY_DATABASE_URL)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@pytest.fixture
def session():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()
```

And the corresponding client fixture:

```
@pytest.fixture
def client(session):
    def override_get_db():
        try:
            yield session
        finally:
            session.close()
    app.dependency_overrides[get_db] = override_get_db
    yield TestClient(app)
```

By default, these fixtures use the **function** scope, meaning they are recreated for each test. This behavior explains why a user created in `test_create_user` does not exist when `test_login_user` is run independently—each test starts with a fresh database.

### Fixture Scopes Explained

| Fixture Scope      | Behavior                                                                                      | Pros and Cons                                                              |
| ------------------ | --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Function (default) | Runs for each test function, ensuring isolation by recreating the database before every test. | Ensures tests are independent.                                             |
| Module             | Runs once per module; all tests in the module share the same database state.                  | Can allow dependent tests to share state but risks interdependent tests.   |
| Session            | Runs once for the entire testing session, maintaining state across all tests.                 | Useful for state persistence but may lead to flaky tests if order changes. |

Changing to module or session scope can cause tests to pass or fail based on their order. Reliable tests should always set up their own data independently without relying on state changes from other tests.

---

## Final Test Code Example

Below is the final test code with proper scopes and correct data handling:

```
def test_create_user(client):
    res = client.post(
        "/users/",
        json={"email": "hello123@gmail.com", "password": "password123"}
    )
    new_user = schemas.UserOut(**res.json())
    assert new_user.email == "hello123@gmail.com"
    assert res.status_code == 201

def test_login_user(client):
    res = client.post(
        "/login",
        data={"username": "hello123@gmail.com", "password": "password123"}
    )
    print(res.json())
    assert res.status_code == 200
```

> [!important]
> **Testing Best Practices**
>
> While it might be tempting to tweak fixture scopes (e.g., set them to module or session scopes) to share state between tests, isolating each test is best practice. This prevents cascading failures and ensures that each test validates only its own functionality.

---

## Final Thoughts

This lesson demonstrated how to create independent and reliable tests for user creation and login in a FastAPI application by correctly handling fixture scopes. In the next part of the lesson, we will explore strategies for generating independent test data for login without relying on previously created users.

Happy Testing!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/eed445e5-68aa-46b3-9922-0fdf2a57b8f1/lesson/fc57a9bb-8e59-4b57-a225-e4ec1542d062)**
>
> Watch video content
