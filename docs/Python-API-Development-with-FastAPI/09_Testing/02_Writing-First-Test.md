# Writing First Test - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Testing/Writing-First-Test)

---

## Table of Contents

- Writing First Test
  - Installing Pytest
  - Writing a Sample Test
  - FastAPI Route Example
  - Creating a Simple Calculation Module
  - Writing Tests for the Calculation Module
  - Understanding Assert Statements
  - Leveraging Pytest’s Auto-Discovery
  - Conclusion
  - Resources
  - Watch Video

---

## Content

Python API Development with FastAPI

Testing

# Writing First Test

In this guide, we’ll walk you through creating your very first test using the pytest framework. If you’re new to pytest, consider searching for its documentation online to familiarize yourself with its setup and capabilities. We will cover installing pytest, writing an intentionally failing test to learn from its output, and building a simple test suite for a basic calculation module.

---

## Installing Pytest

Begin by installing pytest as you would any other Python package:

```
pip install pytest
```

After installation, confirm that the pytest command is available by running:

```
pytest
```

A successful run displays output similar to:

```
================================ test session starts =============================
platform linux -- Python 3.x.y, pytest-6.x.y, py-1.x.y, pluggy-1.x.y
cachedir: $PYTHON_PREFIX/.pytest_cache
rootdir: $REGENDOC_IMPDIR
collected 1 item

test_sample.py [100%]

============================= FAILURES ============================================
___________________________ test_answer ___________________________________________

def test_answer():
>       assert inc(3) == 5
E       assert 4 == 5
E        +   where 4 = inc(3)

test_sample.py:6: AssertionError
============================== short test summary info ============================
FAILED test_sample.py::test_answer - AssertionError: assert 4 == 5
```

This output indicates that a test failure occurred as expected. The failure stems from an error in the test setup, which we will address in the next section.

---

## Writing a Sample Test

Create a file named `test_sample.py` where we define a simple function alongside its failing test:

```
# content of test_sample.py
def inc(x):
    return x + 1

def test_answer():
    assert inc(3) == 5
```

When you run pytest, it reports the failure by comparing the expected value with the actual result. This behavior is crucial for debugging your code.

---

## FastAPI Route Example

Below is an example snippet of a FastAPI route, demonstrating how to implement a login endpoint. This snippet also emphasizes that test outputs might include details about the runtime environment:

```
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import schemas, models, database
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter(tags=['Authentication'])

@router.post('/login', response_model=schemas.Token)
def login(user_credentials: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
    user = db.query(models.User).filter(
        models.User.email == user_credentials.username
    ).first()
```

> [!important]
> **Note**
>
> Even if pytest sometimes displays "collected 0 items" (e.g., due to naming conventions or missing tests), always double-check that your tests follow the appropriate naming patterns.

---

## Creating a Simple Calculation Module

To practice testing, let’s build a module that performs basic arithmetic operations. Create a file (for example, `app/calculations.py`) with:

```
def add(num1: int, num2: int):
    return num1 + num2
```

---

## Writing Tests for the Calculation Module

Next, create a directory named `tests` (if it doesn’t already exist) and add a file called `test_calculations.py` to test the `add` function:

```
from app.calculations import add

def test_add():
    print("testing add function")
    # 5 + 3 should equal 8
    assert add(5, 3) == 8
```

> [!important]
> **Important**
>
> Pytest automatically discovers tests in files whose names start with <code>test\_</code> and functions that begin with <code>test\_</code>. If your file or function naming deviates from this convention (e.g., using <code>mytest.py</code> or <code>testing_add()</code>), pytest will not run the tests unless explicitly specified.

---

## Understanding Assert Statements

Pytest leverages Python’s built-in `assert` statement to confirm that conditions are met:

- A true assertion (e.g., `assert True`) results in a passing test.
- A false assertion (e.g., `assert False`) raises an `AssertionError` and marks the test as failed.

Consider these basic examples:

```
def test_assert_true():
    assert True  # This test passes

def test_assert_false():
    assert False  # This test fails
```

When running these tests, pytest provides visual feedback—a green dot for passing tests and a red dot for failing ones—accompanied by detailed error messages for debugging.

Keep in mind that print statements (like in the earlier `test_add` example) will appear in the output when running tests directly with a command like:

```
py -3 tests/test_calculations.py
```

However, pytest manages output differently when running an entire test suite.

---

## Leveraging Pytest’s Auto-Discovery

For seamless test discovery by pytest, adhere to these guidelines:

1.  Name test files with a prefix `test_` (for example, `test_calculations.py`).
2.  Ensure that test function names also begin with `test_` (e.g., `def test_add():`).

To execute your tests, simply run:

```
pytest
```

A typical output might look like this:

```
(venv) C:\Users\sanje\Documents\Courses\fastapi>pytest
================================ test session starts =============================
platform win32 -- Python 3.9.5, pytest-6.2.5, py-1.10.0, pluggy-1.0.0
rootdir: C:\Users\sanje\Documents\Courses\fastapi
plugins: cov-2.12.1
collected 1 item

tests/test_calculations.py .                                              [100%]

================================= 1 passed in 0.06s ================================
```

> [!important]
> **Warning**
>
> If pytest reports “collected 0 items”, verify that your test files and functions correctly follow the naming conventions and that an <code>**init**.py</code> file is present in your tests directory if required.

---

## Conclusion

In this tutorial, we covered:

- Installing pytest using pip
- Writing a basic failing test and analyzing its output
- Creating a simple arithmetic module and writing corresponding tests
- The significance of proper naming conventions for test discovery
- How Python’s `assert` statements help validate code functionality

By following these best practices, you are well on your way to mastering automated testing in Python. Happy testing!

---

## Resources

- [Pytest Documentation](https://docs.pytest.org/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)
- [Python Testing with Pytest](https://realpython.com/pytest-python-testing/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/eed445e5-68aa-46b3-9922-0fdf2a57b8f1/lesson/081b1b12-d234-4f5a-a8b1-d3d6d49ce979)**
>
> Watch video content
