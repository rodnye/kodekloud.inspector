# Validate Token - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Testing/Validate-Token)

---

## Table of Contents

- Validate Token
  - Testing User Creation and Login
  - Login Endpoint Implementation
  - Decoding and Validating the Access Token
  - Finalizing the Login Test with Token Decoding
  - Watch Video

---

## Content

Python API Development with FastAPI

Testing

# Validate Token

This article explains how to enhance the token validation process for a login user route in FastAPI. We not only ensure that a valid token is received but also confirm that it carries the correct user information. The sections below provide detailed explanations of the logic and code samples that demonstrate how to implement these features.

---

## Testing User Creation and Login

In this section, we first test the user creation flow by verifying that the response returns the correct email and status code. Then, we test the login route by performing a POST request with the user's credentials and ensuring that a valid token is generated.

```
new_user = schemas.UserOut(**res.json())
assert new_user.email == "hello123@gmail.com"
assert res.status_code == 201


def test_login_user(test_user, client):
    res = client.post(
        "/login", data={"username": test_user['email'], "password": test_user['password']}
    )
    assert res.status_code == 200
```

Below is a sample of terminal output showing deprecation warnings related to aiofiles and its deprecated use of the "@coroutine" decorator:

```
venv\lib\site-packages\aiofiles\os.py:10
venv\lib\site-packages\aiofiles\os.py:10
c:\Users\sanje\documents\courses\fastapi\venv\lib\site-packages\aiofiles\os.py:10: DeprecationWarning: "@coroutine" decorator
is deprecated since Python 3.8, use "async def" instead
   def run(*args, loop=None, executor=None, **kwargs):
-- Docs: https://docs.pytest.org/en/stable/warnings.html
(collected 2 items)


 2 passed, 5 warnings in 1.53s
```

---

## Login Endpoint Implementation

Within the authentication router (typically found in your `auth.py` under the routers directory), the login endpoint uses a Token schema as its response model. The code snippet below shows the login route that confirms the user's existence and validates the provided password:

```
@router.post('/login', response_model=schemas.Token)
def login(user_credentials: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
    user = db.query(models.User).filter(models.User.email == user_credentials.username).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Invalid Credentials"
        )
    if not utils.verify(user_credentials.password, user.password):
        raise HTTPException
```

After testing this endpoint, you may observe similar warnings together with confirmation output:

```
venv\lib\site-packages\aiofiles\os.py:10
venv\lib\site-packages\aiofiles\os.py:10
c:\users\sanje\documents\courses\fastapi\venv\lib\site-packages\aiofiles\os.py:10: DeprecationWarning: "@coroutine" decorator is deprecated since Python 3.8, use "async def" instead
============================= test session starts ==============================
platform win32 -- Python 3.9.5, pytest-6.2.4, py-1.10.0, pluggy-0.13.1
collected 2 items


tests/test_calculations.py .. [100%]


============================== 2 passed, 5 warnings in 1.53s ===============================
```

For user creation testing, the `schemas` module provides access to the necessary token schema. The following code snippet demonstrates the user creation test:

```
def test_create_user(client):
    res = client.post(
        "/users/", json={"email": "hello123@gmail.com", "password": "password123"}
    )
    new_user = schemas.UserOut(**res.json())
    assert new_user.email == "hello123@gmail.com"
    assert res.status_code == 201


def test_login_user(test_user, client):
    # Login test will be defined below.
```

---

## Decoding and Validating the Access Token

Once the access token is received, decoding it is crucial to verify that it contains the correct user information. The logic used is similar to what is implemented in the `OAuth2.py` file for retrieving the current user. The `get_current_user` function decodes the token and uses the embedded `user_id` to fetch the corresponding user from the database:

```
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(database.get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"}
    )


    token = verify_access_token(token, credentials_exception)
    user = db.query(models.User).filter(models.User.id == token.id).first()
```

The `verify_access_token` function leverages the `jwt.decode` method to validate the token and extract the user's ID. If the token is invalid, it immediately raises an exception:

```
def verify_access_token(token: str, credentials_exception):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        id: str = payload.get("user_id")
        if id is None:
            raise credentials_exception
        token_data = schemas.TokenData(id=id)
    except JWTError:
        raise credentials_exception


    return token_data
```

---

## Finalizing the Login Test with Token Decoding

After obtaining the token from the login response, decode it using your application settings (imported from your configuration module). This allows you to extract and validate the `user_id`. The final login test confirms that the decoded token contains the correct user details and that the token type is set to "bearer".

```
new_user = schemas.UserOut(**res.json())
assert new_user.email == "hello123@gmail.com"
assert res.status_code == 201


def test_login_user(test_user, client):
    res = client.post(
        "/login", data={"username": test_user['email'], "password": test_user['password']}
    )
    login_res = schemas.Token(**res.json())
    payload = jwt.decode(login_res.access_token, settings.secret_key, algorithms=[settings.algorithm])
    id = payload.get("user_id")
    assert id == test_user['id']
    assert login_res.token_type == "bearer"
    assert res.status_code == 200
```

Ensure that the configuration from, for example, `app.config import settings` is properly imported so that the `secret_key` and `algorithm` values are correctly referenced during the token decoding process.

> [!important]
> **Note**
>
> The test fixture used to create a test user is vital for ensuring consistent test results. Ensure that the test user creation code is correctly configured.

Below is an example of a test fixture for creating a test user:

```
import pytest


@pytest.fixture
def test_user(client):
    user_data = {"email": "sanjeev@gmail.com", "password": "password123"}
    res = client.post("/users/", json=user_data)
    assert res.status_code == 201
    new_user = res.json()
    new_user['password'] = user_data['password']
    return new_user
```

When running the tests, you might see deprecation warnings from the aiofiles module:

```
venv\lib\site-packages\aiofiles\os.py:10
venv\lib\site-packages\aiofiles\os.py:10
c:\users\sanje\documents\courses\fastapi\venv\lib\site-packages\aiofiles\os.py:10: DeprecationWarning: "@coroutine" decorator is deprecated since Python 3.8, use "async def" instead
-- Docs: https://docs.pytest.org/en/stable/warnings.html
2 passed, 5 warnings in 1.53s
```

The final login user test confirms that the token correctly decodes to the expected user details and that the token type is set to "bearer". This robust validation ensures that both the login process and token authentication work seamlessly in your FastAPI application.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/eed445e5-68aa-46b3-9922-0fdf2a57b8f1/lesson/4cd307f8-727f-4ae4-89d2-bf1162adc589)**
>
> Watch video content
