# Trailing Slashes In Path - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Testing/Trailing-Slashes-In-Path)

---

## Table of Contents

- Trailing Slashes In Path
  - Example: Testing the "Create User" Endpoint
  - Impact of Omitting the Trailing Slash
  - Conclusion
  - Watch Video

---

## Content

Python API Development with FastAPI

Testing

# Trailing Slashes In Path

Before moving forward, it's essential to understand how trailing slashes in endpoint paths can affect your FastAPI application, especially during testing. An endpoint defined with a trailing slash, such as `/users/`, requires that all requests strictly match this pattern. Sending a request to `/users` (without the trailing slash) will trigger FastAPI's built-in behavior: it issues a 307 Temporary Redirect to the correct URL (`/users/`). While this redirect is helpful in production, it can lead to unexpected results during testing.

## Example: Testing the "Create User" Endpoint

Consider the following code, which tests the "create user" endpoint:

```
from app import schemas
from .database import client, session


def test_root(client):
    res = client.get("/")
    print(res.json().get('message'))
    assert res.json().get('message') == 'Hello World'
    assert res.status_code == 200


def test_create_user(client):
    res = client.post("/users/", json={"email": "hello123@gmail.com", "password": "password123"})


    new_user = schemas.UserOut(**res.json())
    assert new_user.email == "hello123@gmail.com"
    assert res.status_code == 201
```

In this snippet, the endpoint is defined as `/users/`, so the request URL must include the trailing slash. If a request is made to `/users` without the trailing slash, FastAPI first sends a 307 redirect before processing it.

## Impact of Omitting the Trailing Slash

When testing, if the request URL omits the trailing slash, the following behavior occurs:

1.  FastAPI issues a 307 Temporary Redirect.
2.  The test might capture this redirect response (307) instead of the expected 201 Created response.

For example, consider the test code below where schema validation is commented out to focus solely on the status code:

```
def test_create_user(client):
    res = client.post(
        "/users", json={"email": "hello123@gmail.com", "password": "password123"}
    )
    # new_user = schemas.UserOut(**res.json())
    # assert new_user.email == "hello123@gmail.com"
    assert res.status_code == 201
```

The output from this scenario might show:

```
"/users", json={"email": "hello123@gmail.com", "password": "password123"})
# new_user = schemas.UserOut(**res.json())
assert res.status_code == 201
assert 307 == 201
# where 307 => Response[307].status_code
```

This results in a test failure, as the initial 307 status code from the redirect does not match the expected 201.

> [!important]
> **Note**
>
> Always include the trailing slash in your request URL when your route is defined with one (e.g., `/users/`). This practice prevents unnecessary redirects and ensures your API responds as expected during tests.

## Conclusion

By consistently using the correct endpoint path with the required trailing slash, you eliminate the risk of unwanted 307 redirects. This ensures that your endpoints are accurately reached and that your API behaves reliably both in production and during testing.

For further details on FastAPI behavior and endpoint configuration, you can also review the [FastAPI Documentation](https://fastapi.tiangolo.com/).

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/eed445e5-68aa-46b3-9922-0fdf2a57b8f1/lesson/e3ad7f36-073b-4dbe-ba59-52c732e3fbdf)**
>
> Watch video content
