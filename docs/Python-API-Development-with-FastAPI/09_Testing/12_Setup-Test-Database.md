# Setup Test Database - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Testing/Setup-Test-Database)

---

## Table of Contents

- Setup Test Database
  - Watch Video

---

## Content

Python API Development with FastAPI

Testing

# Setup Test Database

Before proceeding, it's important to note that running tests against your development database is not ideal. Using your development, staging, or production databases for tests can cause interference and unexpected issues. To mitigate this, we will create and use a completely separate database specifically for testing.

Below is an example test for creating a user:

```
def test_create_user():
    res = client.post(
        "/users/", json={"email": "hello123@gmail.com", "password": "password123"}
    )
    new_user = schemas.UserOut(**res.json())
    assert new_user.email == "hello123@gmail.com"
    assert res.status_code == 201
```

When you run the tests, you might see output similar to the following:

```
tests/test_users.py::test_root Hello World
PASSED
tests/test_users.py::test_create_user PASSED
============================= 2 passed, 5 warnings in 0.87s =============================
```

Currently, the application imports the client from the main app. This causes the tests to use the existing development database (typically viewed in [PgAdmin](https://www.pgadmin.org)). Since the development database might contain pre-existing data, tests can unexpectedly fail. It is best to use a dedicated testing database.

Consider this test file snippet that includes the necessary changes to use a separate test database:

```
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

The test outputs remain consistent:

```
tests/test_users.py::test_root Hello World
PASSED
tests/test_users.py::test_create_user PASSED


========== 2 passed, 5 warnings in 0.87s ==========
```

One key advantage of our setup is the dependency injection configured in our `database.py` file. The original database configuration resembles the following:

```
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import psycopg2
import time
from .config import settings


SQLALCHEMY_DATABASE_URL = f'postgresql://{settings.database_username}:{settings.database_password}@{settings.database_hostname}:{settings.database_port}/{settings.database_name}'


engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
```

This configuration creates a session dependency using a function like:

```
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

Every SQLAlchemy query in your routes depends on this session object from `get_db`. To test in isolation, you can override this dependency with one that connects to your dedicated test database.

For example, a router file might include database dependency code similar to:

```
import psycopg2
from psycopg2.extras import RealDictCursor
import time
from .config import settings


SQLALCHEMY_DATABASE_URL = f'postgresql://{settings.database_username}:{settings.database_password}@{settings.database_hostname}:{settings.database_port}/{settings.database_name}'


engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
```

The dependency `get_db` is injected into the routes, making it easy to override for testing. To point tests to the dedicated database, create an override function (commonly named `override_get_db`) that returns a session connected to your test database. For example:

```
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


Base.metadata.create_all(bind=engine)


def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db


client = TestClient(app)
```

> [!important]
> **Note**
>
> This configuration ensures that whenever a route depends on `get_db`, FastAPI uses the testing session rather than the default development session.

Here’s an example demonstrating the testing of a user creation route using the dependency override:

```
@router.post("/", status_code=status.HTTP_201_CREATED, response_model=schemas.Post)
def create_posts(post: schemas.PostCreate, db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
    # cursor.execute("""INSERT INTO posts (title, content, published) VALUES (%s, %s, %s) RETURNING """)
    new_post = cursor.fetchone()
```

After setting up the override, your tests run against the dedicated test database, yielding an output similar to:

```
tests/test_users.py::test_root Hello World PASSED
tests/test_users.py::test_create_user PASSED
```

To complete the test setup, copy your database configuration into your tests and adjust the SQLAlchemy URL to point to your test database. One example is as follows:

```
import psycopg2
from psycopg2.extras import RealDictCursor
import time
from app.config import settings
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


# Use a separate test database by appending '_test' to the database name.
SQLALCHEMY_DATABASE_URL = f'postgresql://{settings.database_username}:{settings.database_password}@{settings.database_hostname}:{settings.database_port}/{settings.database_name}_test'


engine = create_engine(SQLALCHEMY_DATABASE_URL)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
```

Then, define the testing dependency:

```
def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()
```

Finally, override the dependency in your FastAPI app:

```
from app.database import get_db


app.dependency_overrides[get_db] = override_get_db


client = TestClient(app)
```

> [!important]
> **Warning**
>
> If your test database is new, you might encounter errors due to missing tables. Make sure to create all the necessary tables before running your tests.

One common strategy is to have SQLAlchemy create all tables from your models before the tests execute:

```
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app import models
from app.database import engine
from app.routers import post, user, auth, vote
from app.config import settings


models.Base.metadata.create_all(bind=engine)


app = FastAPI()


origins = ["*"]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

With this setup, the test database (e.g., `fastapi_test`) is automatically created and populated with the necessary tables when the tests run. You can verify the existence of tables by executing a query like:

```
SELECT * FROM public.users
ORDER BY "id" ASC;
```

After running your test suite, you should see output confirming that tests passed, and you can view the new table entries in your test database via your favorite database tool (such as [PgAdmin](https://www.pgadmin.org)):

```
tests/test_users.py::test_root Hello World PASSED
tests/test_users.py::test_create_user PASSED
=================================== 2 passed, 5 warnings in 1.00s ===================================
```

Below is the final summary snippet showing the test database setup:

```
from app.database import get_db, Base
from app.config import settings
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


# Configure the test database URL by appending '_test' to the existing name.
SQLALCHEMY_DATABASE_URL = f'postgresql://{settings.database_username}:{settings.database_password}@{settings.database_hostname}:{settings.database_port}/{settings.database_name}_test'


engine = create_engine(SQLALCHEMY_DATABASE_URL)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


Base.metadata.create_all(bind=engine)


def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db
```

FastAPI’s dependency override functionality allows you to easily swap out dependencies, such as the database session, during testing. This separation ensures that your tests run in an isolated environment, protecting your development data. Moreover, the test database can be hosted on your local machine, in a Docker container, or on a remote server—simply adjust your connection details accordingly.

![The image shows a webpage from the FastAPI documentation, specifically a section on testing a database. It includes a table of contents and instructions for adding tests for an SQL app.](https://kodekloud.com/kk-media/image/upload/v1752883472/notes-assets/images/Python-API-Development-with-FastAPI-Setup-Test-Database/fastapi-testing-database-docs.jpg)

Before running tests against your dedicated testing database (e.g., `fastapi_test`), make sure that the database exists. In [PgAdmin](https://www.pgadmin.org), you can create the database by executing:

```
SELECT * FROM public.users
ORDER BY id ASC;
```

If you need to drop or create databases for testing purposes, tools like [PgAdmin](https://www.pgadmin.org) offer a graphical interface. For example, you might see a confirmation dialog when dropping a database:

![The image shows a pgAdmin interface with a confirmation dialog asking if the user wants to drop the database "fastapi_test." The background displays a list of databases and a data output table.](https://kodekloud.com/kk-media/image/upload/v1752883473/notes-assets/images/Python-API-Development-with-FastAPI-Setup-Test-Database/pgadmin-drop-database-confirmation.jpg)

After setting up the test database and overriding the dependency, you can run your tests. A final example of the configuration is as follows:

```
# Configure test database connection.
SQLALCHEMY_DATABASE_URL = f'postgresql://{settings.database_username}:{settings.database_password}@{settings.database_hostname}:{settings.database_port}/{settings.database_name}_test'
engine = create_engine(SQLALCHEMY_DATABASE_URL)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base.metadata.create_all(bind=engine)


def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()
```

When you run the tests:

```
tests/test_users.py::test_root Hello World PASSED
tests/test_users.py::test_create_user PASSED
```

you can verify, using your database tool, that all necessary tables (such as the users table) have been created and populated appropriately.

This concludes our guide on setting up a separate test database in FastAPI. By leveraging dependency overrides, you can ensure that tests run in a fully isolated environment without affecting your development data.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/eed445e5-68aa-46b3-9922-0fdf2a57b8f1/lesson/2a793148-83cc-41c6-acaa-1196dc2c1139)**
>
> Watch video content
