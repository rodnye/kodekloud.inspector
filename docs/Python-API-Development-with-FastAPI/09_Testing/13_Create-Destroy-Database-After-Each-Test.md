# Create Destroy Database After Each Test - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Testing/Create-Destroy-Database-After-Each-Test)

---

## Table of Contents

- Create Destroy Database After Each Test
  - The Problem: Duplicate Key Violations
  - Using Fixtures to Manage the Test Database
  - Summary
  - Watch Video
    - Creating a Client Fixture
    - Avoiding Duplicate Data with Table Setup and Teardown
    - Alternative Approach: Dropping Tables Before Creation
    - Using Alembic for Database Migrations

---

## Content

Python API Development with FastAPI

Testing

# Create Destroy Database After Each Test

In this guide, you'll learn how to configure your tests to start with a clean test database every time they are executed. This approach ensures that duplicate data errors, such as duplicate key violations, are avoided when tests run multiple times.

> [!important]
> **Overview**
>
> By resetting your test database before each test, you ensure that tests run in isolation and errors due to leftover data are prevented.

## The Problem: Duplicate Key Violations

When tests are executed repeatedly, you might encounter errors such as duplicate key violations. For example, if your test database already contains a user with a specific email, any subsequent attempt to create a user with the same email will trigger an error similar to the following:

```
SQLALCHEMY_DATABASE_URL = 'postgresql://postgres:password123@localhost:5432/fastapi_test'


engine = create_engine(SQLALCHEMY_DATABASE_URL)


TestingSessionLocal = sessionmaker(
    autocommit=False, autoflush=False, bind=engine
)


Base.metadata.create_all(bind=engine)


def override_get_db():
    ...
```

When re-running tests, the error output might look like this:

```
E
Background on this error at: https://sqlalche.me/e/14/gkpj
venv\lib\site-packages\sqlalchemy\engine\default.py:717: IntegrityError
=========================== short test summary info ============================
FAILED tests/test_users.py::test_create_user - sqlalchemy.exc.IntegrityError: (psycopg2.errors.UniqueViolation) duplicate key...
1 failed, 1 passed, 5 warnings in 1.53s
```

This error indicates that the unique constraint on the email field has been violated because a user with that email already exists in the database. To solve this, you need to ensure that your test database is reset before each test.

## Using Fixtures to Manage the Test Database

Fixtures in pytest allow you to run setup and teardown code before and after your tests. They are ideal for preparing a controlled test environment. Consider the following simple test that might fail when multiple tests interact with the same data:

```
def test_root():
    res = client.get("/")
    print(res.json().get('message'))
    assert res.json().get('message') == 'Hello World'
    assert res.status_code == 200
```

If a duplicate user is created when running multiple tests, this will result in duplicate key errors. To prevent this, you can create a fixture that resets the database before each test run.

### Creating a Client Fixture

First, import pytest:

```
import pytest
```

Then, create a fixture that returns a TestClient instance. Initially, you might simply create the client without handling the database state:

```
import sqlalchemy
from fastapi.testclient import TestClient
from app.main import app  # Adjust the import according to your project structure


@pytest.fixture
def client():
    return TestClient(app)


def test_root(client):
    res = client.get("/")
    print(res.json().get('message'))
    assert res.json().get('message') == 'Hello World'
    assert res.status_code == 200
```

### Avoiding Duplicate Data with Table Setup and Teardown

To avoid duplicate data issues, modify the fixture to create and drop your database tables around each test. Using the yield statement in the fixture allows you to run setup code before the test and cleanup code after the test completes:

```
import pytest
from fastapi.testclient import TestClient
from app.database import Base, engine
from app.main import app


@pytest.fixture
def client():
    # Setup: Create all tables before the test runs
    Base.metadata.create_all(bind=engine)
    yield TestClient(app)
    # Teardown: Drop all tables after the test finishes
    Base.metadata.drop_all(bind=engine)


def test_root(client):
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello World"}
```

In this configuration:

- Before running the test, `Base.metadata.create_all(bind=engine)` ensures that all required tables are created.
- The fixture yields a `TestClient` instance for testing.
- After the test, `Base.metadata.drop_all(bind=engine)` cleans up by dropping the tables.

### Alternative Approach: Dropping Tables Before Creation

Another approach is to drop existing tables before re-creating them. This guarantees that any previous state is immediately cleared:

```
import pytest
from fastapi.testclient import TestClient
from app.database import Base, engine
from app.main import app


@pytest.fixture
def client():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    yield TestClient(app)


def test_root(client):
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello World"}
```

This method is useful if you want to inspect the database state in case of a test failure. Running pytest with the `-x` flag (which stops on the first error) can help examine the database before it is dropped.

### Using Alembic for Database Migrations

If you prefer not to use SQLAlchemy's built-in methods for managing tables, you can integrate Alembic for database migrations. With Alembic, you can upgrade to the latest migration before tests begin and downgrade afterward:

```
import pytest
from alembic import command
from alembic.config import Config
from fastapi.testclient import TestClient
from app.main import app


alembic_cfg = Config("alembic.ini")


@pytest.fixture
def client():
    # Upgrade to head before tests run
    command.upgrade(alembic_cfg, "head")
    yield TestClient(app)
    # Downgrade to base after tests complete
    command.downgrade(alembic_cfg, "base")


def test_root(client):
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello World"}
```

> [!important]
> **Important**
>
> Ensure that Alembic is properly configured in your project before using it for database migration in your tests.

## Summary

By using pytest fixtures, you can ensure that each test starts with a fresh database, thereby avoiding errors like duplicate key violations. Whether you choose SQLAlchemy’s metadata methods or Alembic for managing your database schema, the objective is to maintain a consistent and isolated test environment that leads to more reliable and debuggable tests.

For more information:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/eed445e5-68aa-46b3-9922-0fdf2a57b8f1/lesson/0c21d6f7-8a68-4974-aef7-396c6ab917cf)**
>
> Watch video content
