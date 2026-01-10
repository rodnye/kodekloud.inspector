# Setup Test Database With Fixtures - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Testing/Setup-Test-Database-With-Fixtures)

---

## Table of Contents

- Setup Test Database With Fixtures
  - Overriding the Database Dependency with a Client Fixture
  - Creating a Session Fixture and Chaining Dependencies
  - Overriding the Database Dependency Properly
  - Organizing Database Configuration into a Separate File
  - Watch Video

---

## Content

Python API Development with FastAPI

Testing

# Setup Test Database With Fixtures

In this lesson, we will learn how to set up a test database using fixtures and configure one fixture to depend on another. This approach enables you to create a fixture that returns a database session (or database object) and then pass that session fixture to another fixture that provides a configured TestClient. Dependency chaining like this simplifies database manipulation and client usage in your tests.

> [!important]
> **Why Use Fixture Dependency?**
>
> Using fixture dependency helps separate concerns by allowing one fixture to manage the database session while another focuses on providing an HTTP client. This setup ensures that tests run against a freshly configured database, improving test reliability.

---

## Overriding the Database Dependency with a Client Fixture

Below is an initial example where we override the dependency for the database connection using a fixture that returns a TestClient:

```
@app.dependency_overrides[get_db] = override_get_db


@pytest.fixture
def client():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    yield TestClient(app)


def test_root(client):
    res = client.get("/")
    print(res.json().get("message"))
    assert res.json().get("message") == "Hello World"
    assert res.status_code == 200


def test_create_user(client):
    res = client.post("/users/", json={"email": "hello123@email.com", "password": "password123"})
```

In this example, the fixture returns our client. However, if you need direct access to the database object, you can separate the responsibilities by creating a dedicated fixture (named `session`) to set up the database and return a database session. Then, pass this `session` fixture to the TestClient fixture.

---

## Creating a Session Fixture and Chaining Dependencies

Below is an updated version where we define the `session` fixture for managing database setup (dropping and creating tables) and then configure the TestClient fixture to use this session:

```
@pytest.fixture
def session():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


@pytest.fixture
def client():
    yield TestClient(app)


def test_test_root(client):
    # This test uses the client fixture which initializes the database session
    res = client.get("/")
```

At this point, the test framework ensures that whenever the `client` fixture is used, the `session` fixture runs first. This guarantees a fresh database setup and an available session before tests execute. You can also access the session directly in your tests if necessary.

Here’s an enhanced version that demonstrates passing the `session` fixture into the TestClient fixture and using it in a test:

```
@pytest.fixture
def session():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


@pytest.fixture
def client(session):
    yield TestClient(app)


def test_root(client):
    res = client.get("/")
    print(res.json().get("message"))
    assert res.json().get("message") == "Hello World"
```

---

## Overriding the Database Dependency Properly

Next, modify the `client` fixture to override the database dependency correctly. Instead of yielding a hard-coded database object, define an inner function `override_get_db` that yields the `session` fixture. Apply this override before returning the TestClient:

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


def test_root(client):
    res = client.get("/")
    print(res.json().get("message"))
    assert res.json().get("message") == "Hello World"
    assert res.status_code == 200
```

With this setup, every time a test uses the `client` fixture, the `session` fixture is invoked first. This guarantees that the TestClient has access to a fresh database session, allowing direct database queries such as `session.query(models.Post)` when required.

For example, to access the database session separately from the client, include the `session` fixture in your test parameters:

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


def test_root(client, session):
    res = client.get("/")
    print(res.json().get("message"))
    assert res.json().get("message") == "Hello World"
    assert res.status_code == 200
```

The `client` fixture now ensures that the `session` fixture executes beforehand, and the database dependency override is applied accordingly.

---

## Organizing Database Configuration into a Separate File

After verifying that your tests work as expected (for example, running `pytest tests/test_calculations.py` in the terminal), consider cleaning up your test files by moving database-specific code and fixtures into a separate file (such as `database.py`) within your test directory.

An example of what the `database.py` file might look like:

```
from fastapi.testclient import TestClient
import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.main import app
from app import schemas
from app.config import settings
from app.database import get_db, Base
from alembic import command


# SQLALCHEMY_DATABASE_URL
SQLALCHEMY_DATABASE_URL = (
    f'postgresql://{settings.database_username}:{settings.database_password}'
    f'@{settings.database_hostname}:{settings.database_port}/{settings.database_name}_test'
)


engine = create_engine(SQLALCHEMY_DATABASE_URL)


TestingSessionLocal = sessionmaker(
    autocommit=False, autoflush=False, bind=engine
)


@pytest.fixture
def session():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


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

After moving the database configuration and fixtures into `database.py`, your test file (e.g., `test_users.py`) becomes more organized. It now only needs to import the necessary fixtures and define the test cases. For instance:

```
from app import schemas
from database import client, session


def test_root(client):
    res = client.get("/")
    print(res.json().get("message"))
    assert res.json().get("message") == "Hello World"
    assert res.status_code == 200


def test_create_user(client):
    res = client.post(
        "/users/", json={"email": "hello123@gmail.com", "password": "password123"}
    )
    new_user = schemas.UserOut(**res.json())
    assert new_user.email == "hello123@gmail.com"
    assert res.status_code == 201
```

After saving your changes, running your tests should confirm that both tests pass successfully. This organized setup not only cleans up your test files but also ensures that the database is properly configured and available during testing.

> [!important]
> **Deprecation Warning**
>
> If you encounter warnings such as "is deprecated since Python 3.8, use 'async def' instead," review any legacy non-fixture code. Since table creation and session management are now fully handled within the fixtures, these warnings should no longer apply.

---

This concludes our lesson on setting up a test database with fixtures. By leveraging fixture dependency, we efficiently manage both the TestClient and the database session, simplifying testing and ensuring a reliable, isolated test environment.

For additional information and advanced testing strategies, please refer to the [FastAPI Testing Documentation](https://fastapi.tiangolo.com/tutorial/testing/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/eed445e5-68aa-46b3-9922-0fdf2a57b8f1/lesson/71e83dec-abb2-4491-86e9-baffe478b327)**
>
> Watch video content
