# Fastapi Testclient - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Testing/Fastapi-Testclient)

---

## Table of Contents

- Fastapi Testclient
  - Example 1: Testing a Sample "withdraw" Function
  - Example 2: Testing FastAPI Routes Using the TestClient
  - Conclusion
  - Watch Video
    - Setting Up a Basic Route for Testing
    - How the TestClient Works
    - Testing a User-Related Route
    - Verifying Response Content and Status Code

---

## Content

Python API Development with FastAPI

Testing

# Fastapi Testclient

In this tutorial, we dive into testing a FastAPI application using the built-in FastAPI TestClient. We cover two primary examples: testing a standalone function (e.g., a "withdraw" function) and verifying FastAPI routes.

---

## Example 1: Testing a Sample "withdraw" Function

Consider a simple function that checks whether an account has sufficient funds before permitting a withdrawal. If the requested amount exceeds the available balance, an exception is raised to simulate an error condition:

```
def withdraw(self, amount):
    if amount > self.balance:
        raise InsufficientFunds("Insufficient funds in account")
    self.balance -= amount
```

When testing this function, an error might be raised unexpectedly. For example, you might encounter output like this:

```
app/calculations.py:32: ZeroDivisionError
FAILED tests/test_calculations.py::test_insufficient_funds - ZeroDivisionError
================================= short test summary info =================================
1 failed, 14 passed in 0.16s
```

This output indicates that a test failed due to a `ZeroDivisionError` instead of the expected behavior.

> [!important]
> **Testing Tip**
>
> When writing tests for functions that can raise exceptions, ensure your test framework is set up to capture and assert on these exceptions appropriately.

---

## Example 2: Testing FastAPI Routes Using the TestClient

FastAPI provides a built-in TestClient, which simulates HTTP requests to your application similarly to the popular Requests library. This allows you to test your routes efficiently without running a live server.

### Setting Up a Basic Route for Testing

Create a simple FastAPI application with a route that returns a greeting message:

```
from fastapi import FastAPI
from fastapi.testclient import TestClient


app = FastAPI()


@app.get("/")
async def read_main():
    return {"msg": "Hello World"}


client = TestClient(app)


def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"msg": "Hello World"}
```

In this example, the TestClient is initialized by passing the FastAPI instance (`app`) to it. The test sends a GET request to the root route and verifies that the response status code is 200 and the JSON payload matches the expected message.

### How the TestClient Works

The FastAPI TestClient operates much like a Requests session object. This means you can customize your HTTP requests by setting methods (GET, POST, etc.), headers, payloads, or authorization credentials. For comparison, here’s a Requests example:

```
import requests


r = requests.get('https://api.github.com/user', auth=('user', 'pass'))
print(r.status_code)
print(r.headers['content-type'])  # 'application/json; charset=utf-8'
print(r.encoding)
f = r.json()
print(f['type'])                 # 'User'
print(f['private_gists'])        # 419
print(f['total_private_repos'])  # 77
```

While this sample uses Requests, FastAPI’s TestClient allows you to perform similar operations directly within your test suite.

### Testing a User-Related Route

For user functionalities such as creating users and retrieving profiles, you can create separate test modules (for example, `tests/test_users.py`). To test these routes, import the FastAPI application (commonly defined in `app/main.py`) and instantiate the TestClient:

```
from fastapi.testclient import TestClient
from app.main import app


client = TestClient(app)


def test_root():
    res = client.get("/")
    print(res.json())
```

Printing the response initially helps you inspect the returned payload. Later, you can include assertions to validate the content more precisely.

### Verifying Response Content and Status Code

After confirming the output, enhance your tests with assertions to check both the response payload and status code. For instance, if your route returns a dictionary with the key `"message"`, adjust the test as follows:

```
from app.main import app
from fastapi.testclient import TestClient


client = TestClient(app)


def test_root():
    res = client.get("/")
    print(res.json().get("message"))
    assert res.json().get("message") == "Hello World"
    assert res.status_code == 200
```

If the response does not match expectations—such as returning `"Hello World!"` (with an exclamation point) instead—the test output will flag the discrepancy:

```
AssertionError: assert 'Hello World!' == 'Hello World'
  + Hello World
```

In another scenario, if the route is accidentally modified to return HTTP status code 201 instead of 200:

```
@app.get("/", status_code=201)
def root():
    return {"message": "Hello World"}
```

The test will capture the mismatch with an error such as:

```
FAILED tests/test_users.py::test_root - assert 201 == 200
```

> [!important]
> **Pay Attention**
>
> Maintaining consistent response payloads and correct HTTP status codes is crucial for API reliability. Always update your test cases if you make deliberate changes to your API responses.

---

## Conclusion

In this guide, we covered how to:

• Test individual functions, including error handling using Python.  
• Leverage FastAPI's TestClient to simulate HTTP requests, akin to using the Requests library.  
• Write robust assertions to verify response payloads and status codes.

By integrating these testing techniques into your development workflow, you can automate and streamline the verification of your FastAPI application, ensuring both routes and business logic perform as expected.

Happy Testing!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/eed445e5-68aa-46b3-9922-0fdf2a57b8f1/lesson/2af119f2-02e7-4ba3-b200-afcbb8a124e2)**
>
> Watch video content
