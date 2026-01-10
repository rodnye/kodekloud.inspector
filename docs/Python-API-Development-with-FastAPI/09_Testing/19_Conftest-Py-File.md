# Conftest Py File - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Testing/Conftest-Py-File)

---

## Table of Contents

- Conftest Py File
  - Testing the Login Endpoint
  - Shared Fixtures in Conftest.py
  - Custom Client Fixture
  - Creating a Test User Fixture
  - Example Test File Usage
  - Modular Fixture Management
  - Conclusion
  - Watch Video

---

## Content

Python API Development with FastAPI

Testing

# Conftest Py File

In this article, we explore how to organize test fixtures using a dedicated file called `conftest.py`. Pytest automatically discovers and loads fixtures defined in this file for all tests within the same package (including sub-packages). This centralized approach simplifies database and client initialization, allowing you to reuse common setup logic across multiple test modules.

---

## Testing the Login Endpoint

Below is a sample test that logs in a user. This test uses the `client` fixture (provided via `conftest.py`) to send a POST request to the `/login` endpoint. The returned JWT token is decoded to verify the user ID and token type.

```
def test_login_user(test_user, client):
    res = client.post(
        "/login", data={"username": test_user['email'], "password": test_user['password']}
    )
    login_res = schemas.Token(**res.json())
    payload = jwt.decode(login_res.access_token, settings.secret_key, algorithms=[settings.algorithm])

    user_id = payload.get('user_id')
    assert user_id == test_user['id']
    assert login_res.token_type == "bearer"
    assert res.status_code == 200
```

The following console output shows the results when running the tests, along with deprecation warnings related to `aiofiles`:

```
venv\lib\site-packages\aiofiles\os.py:10
venv\lib\site-packages\aiofiles\os.py:10
venv\lib\site-packages\aiofiles\os.py:10
venv\lib\site-packages\fastapi\venv\lib\site-packages\aiofiles\os.py:10: DeprecationWarning: "@coroutine" decorator is deprecated since Python 3.8, use "async def" instead
============================= test session starts ==============================
collected 2 items

tests/test_users.py::test_login_user PASSED                            [ 50%]
tests/test_calculations.py::test_calculations PASSED                  [100%]

============================== 2 passed, 5 warnings in 1.67s ==============================
```

> [!important]
> **Note**
>
> The `conftest.py` file makes its fixtures available to all tests in the same package, eliminating the need for repetitive import statements.

---

## Shared Fixtures in Conftest.py

By moving all database-related logic and fixtures to `conftest.py`, every test in the package can seamlessly use them without extra import statements. For example, consider the following segments of console output, which confirm that tests using shared fixtures like `session` and `client` are executing within a consistent test environment:

```
venv\lib\site-packages\aiofiles\os.py:10
venv\lib\site-packages\aiofiles\os.py:10
C:\users\sanje\documents\courses\fastapi\venv\lib\site-packages\aiofiles\os.py:10: DeprecationWarning: "@coroutine" decorator is deprecated since Python 3.8, use "async def" instead
-- Docs: https://docs.pytest.org/en/stable/warnings.html
===================== 2 passed, 5 warnings in 1.67s =====================
```

---

## Custom Client Fixture

The `client` fixture further demonstrates how to override the default database dependency by providing a custom session. This ensures that any test relying on database interactions automatically uses this setup.

```
@pytest.fixture()
def client(session):
    def override_get_db():
        try:
            yield session
        finally:
            session.close()
    app.dependency_overrides[get_db] = override_get_db
    yield TestClient(app)
```

When running tests that exercise the `client` fixture, you might see output such as:

```
venv\lib\site-packages\aiofiles\os.py:10
venv\lib\site-packages\aiofiles\os.py:10
venv\lib\site-packages\aiofiles\os.py:10
C:\users\sanje\documents\courses\fastapi\venv\lib\site-packages\aiofiles\os.py:10: DeprecationWarning: "@coroutine" decorator is deprecated since Python 3.8, use "async def" instead
=== 2 passed, 5 warnings in 1.67s ===
```

> [!important]
> **Warning**
>
> Ensure that you update deprecated decorators (such as `@coroutine`) in your dependencies to avoid future compatibility issues, particularly if upgrading Python versions.

---

## Creating a Test User Fixture

Another common scenario is creating a test user. By defining the test user fixture in `conftest.py`, you can share it across multiple test modules (e.g., user, voting, posts tests), eliminating redundancy.

```
@pytest.fixture
def test_user(client):
    user_data = {"email": "sanjeev@gmail.com", "password": "password123"}
    res = client.post("/users/", json=user_data)
    assert res.status_code == 201

    new_user = res.json()
    new_user['password'] = user_data['password']
    return new_user
```

The console output for tests that depend on this fixture may look as follows:

```
venv\lib\site-packages\aiofiles\os.py:10
venv\lib\site-packages\aiofiles\os.py:10
venv\lib\site-packages\aiofiles\os.py:10
C:\users\sanje\documents\courses\fastapi\venv\lib\site-packages\aiofiles\os.py:10: DeprecationWarning: "@coroutine" decorator is deprecated since Python 3.8, use "async def" instead
===================== test session starts =====================
...
2 passed, 5 warnings in 1.67s
```

---

## Example Test File Usage

In your test files (e.g., `test_users.py`), you do not need to import the `client` or `test_user` fixtures explicitly. They are automatically available thanks to `conftest.py`. The following example illustrates how to use these fixtures:

```
def test_create_user(client):
    res = client.post(
        "/users/", json={"email": "hello123@gmail.com", "password": "password123"}
    )
    new_user = schemas.UserOut(**res.json())
    assert new_user.email == "hello123@gmail.com"
    assert res.status_code == 201

def test_login_user(test_user, client):
    res = client.post(
        "/login", data={"username": test_user['email'], "password": test_user['password']}
    )
    login_res = schemas.Token(**res.json())
    payload = jwt.decode(login_res.access_token, settings.secret_key, algorithms=[settings.algorithm])

    user_id = payload.get('user_id')
    assert user_id == test_user['id']
    assert login_res.token_type == "bearer"
    assert res.status_code == 200
```

The corresponding console output confirms that everything is functioning correctly:

```
venv\lib\site-packages\aiofiles\os.py:10
venv\lib\site-packages\aiofiles\os.py:10
venv\lib\site-packages\aiofiles\os.py:10
C:\users\sanje\documents\courses\fastapi\venv\lib\site-packages\aiofiles\os.py:10: DeprecationWarning: "@coroutine" decorator is deprecated since Python 3.8, use "async def" instead
======================= warnings summary =======================
2 passed, 5 warnings in 1.67s
```

---

## Modular Fixture Management

For modular testing, you can define package-specific fixtures by including a `conftest.py` file within a given package scope. Tests within that package will use its fixtures, while tests outside will use the top-level `conftest.py`. For instance, consider the following snippet from a test file in a different package:

```
def test_create_user(client):
    res = client.post("/users/", json={"email": "hello123@gmail.com", "password": "password123"})
```

This design allows for flexible and modular fixture management. Even if multiple `conftest.py` files exist throughout the project, each one scopes its fixtures to its directory and subdirectories, ensuring that tests only have access to the fixtures they require.

---

## Conclusion

Centralizing fixtures in `conftest.py` simplifies test organization, reduces redundancy, and enhances maintainability across the testing suite. By properly leveraging shared fixtures such as `client` and `test_user`, you can improve test consistency and streamline your testing process.

For more information on testing with Pytest, refer to the [Pytest Documentation](https://docs.pytest.org/en/stable/).

Happy Testing!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/eed445e5-68aa-46b3-9922-0fdf2a57b8f1/lesson/37f8fe5c-3c5b-4c9e-b106-ab632664cae2)**
>
> Watch video content
