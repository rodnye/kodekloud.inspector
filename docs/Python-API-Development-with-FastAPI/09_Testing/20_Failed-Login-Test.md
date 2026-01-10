# Failed Login Test - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Testing/Failed-Login-Test)

---

## Table of Contents

- Failed Login Test
  - Basic Incorrect Login Test
  - Parameterized Tests for Multiple Scenarios
  - Summary
  - Watch Video

---

## Content

Python API Development with FastAPI

Testing

# Failed Login Test

In this article, we explore tests for failed login scenarios. After confirming that valid login attempts work as intended, it is crucial to verify that incorrect or incomplete credentials are properly handled by the API.

---

## Basic Incorrect Login Test

The following initial test implementation verifies that providing an incorrect password results in the expected response from the API.

```
def test_incorrect_login(test_user, client):
    res = client.post(
        "/login", data={"username": test_user['email'], "password": "wrongPassword"}
    )
    # The API should return a 403 status code when the credentials are invalid.
    assert res.status_code == 403
    # Verify that the error message matches exactly.
    assert res.json().get('detail') == 'Invalid Credentials'
```

The login endpoint is implemented as shown below:

```
@router.post("/login", response_model=schemas.Token)
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

    # (Token generation code would go here)
```

When executing the tests, you might see output similar to:

```
venv\lib\site-packages\aiofiles\os.py:10
venv\lib\site-packages\aiofiles\os.py:10
venv\lib\site-packages\aiofiles\os.py:10
C:\Users\sanjeev\documents\courses\fastapi\venv\lib\site-packages\aiofiles\os.py:10: DeprecationWarning: "@coroutine" decorator
tests/test_users.py::test_create_user PASSED
tests/test_users.py::test_login_user PASSED
tests/test_users.py::test_incorrect_login PASSED
```

---

## Parameterized Tests for Multiple Scenarios

To thoroughly test the login functionality, we extend the tests to cover various failure cases. These include scenarios with a wrong email, wrong password, both credentials wrong, or even missing credentials. Pytest's parameterization feature allows us to efficiently test these different cases.

> [!important]
> **Note**
>
> Before adding parameterized tests, make sure you have imported Pytest in your test module:
>
> import pytest

Consider the following parameterized test implementation:

```
@pytest.mark.parametrize("email, password, status_code", [
    # Wrong email with a valid password should return 403.
    ('wrongemail@gmail.com', 'password123', 403),
    # Valid email with wrong password should return 403.
    ('sanjeev@gmail.com', 'wrongpassword', 403),
    # Both email and password are incorrect; should return 403.
    ('wrongemail@gmail.com', 'wrongpassword', 403),
    # Missing email should fail schema validation and return 422.
    (None, 'password123', 422),
    # Missing password should fail schema validation and return 422.
    ('sanjeev@gmail.com', None, 422)
])
def test_incorrect_login(test_user, client, email, password, status_code):
    res = client.post(
        "/login", data={"username": email, "password": password}
    )
    assert res.status_code == status_code
    # When status_code is 403, you can optionally check for the error message.
    # For example:
    # if status_code == 403:
    #     assert res.json().get('detail') == 'Invalid Credentials'
```

Running the tests with this approach should yield an output similar to:

```
tests/test_users.py::test_create_user PASSED
tests/test_users.py::test_login_user PASSED
tests/test_users.py::test_incorrect_login PASSED
```

Any warnings, such as deprecation warnings from aiofiles, will be listed after the test summaries.

---

## Summary

In summary, we now have a comprehensive set of tests that ensure the API responds appropriately when invalid credentials are provided. Whether the issue stems from an incorrect password, a wrong email, or missing fields, the API should return the correct status code and error details. These tests provide a robust baseline for your application's authentication logic, and they can be extended with additional assertions to verify other response fields as needed.

Happy testing!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/eed445e5-68aa-46b3-9922-0fdf2a57b8f1/lesson/f32ec73b-a9bf-44b8-ab60-c7464cb0ac1b)**
>
> Watch video content
