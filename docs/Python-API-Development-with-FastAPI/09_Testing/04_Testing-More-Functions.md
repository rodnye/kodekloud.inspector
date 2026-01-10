# Testing More Functions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Testing/Testing-More-Functions)

---

## Table of Contents

- Testing More Functions
  - Arithmetic Functions Overview
  - Testing the Add Function
  - Expanding Tests to Additional Functions
  - Introducing a Bug and Catching It with Tests
  - Watch Video

---

## Content

Python API Development with FastAPI

Testing

# Testing More Functions

In this article, we explore how to verify the functionality of arithmetic operations using automated tests. We demonstrate testing a simple add function first and then expand our coverage to include subtract, multiply, and divide functions. This guide will walk you through setting up tests, interpreting pytest outputs, and troubleshooting common issues.

> [!important]
> **Overview**
>
> Automated tests help ensure code reliability and quickly catch regressions or bugs introduced during development.

## Arithmetic Functions Overview

The table below summarizes the arithmetic functions, their operations, and examples:

| Function | Operation      | Example       |
| -------- | -------------- | ------------- |
| add      | Addition       | 5 + 3 = 8     |
| subtract | Subtraction    | 9 - 4 = 5     |
| multiply | Multiplication | 4 \\\* 3 = 12 |
| divide   | Division       | 20 / 5 = 4    |

## Testing the Add Function

We begin with a basic test of the add function. Below is the sample test code:

```
from app.calculations import add


def test_add():
    print("testing add function")
    assert add(5, 3) == 8
```

When you run pytest, a typical output might look like this:

```
platform win32 -- Python 3.9.5, pytest-6.2.5, py-1.10.0, pluggy-1.0.0 -- c:\users\sanje\documents\courses\fastapi\venv\scripts\python.exe
cachedir: .pytest_cache
rootdir: C:\Users\sanje\Documents\Courses\fastapi
plugins: cov-2.12.1
collected 1 item


tests/test_calculations.py::test_add testing add function
PASSED                        1 passed in 0.05s
```

This output confirms that the add function works correctly.

## Expanding Tests to Additional Functions

Next, add the other arithmetic operations to your calculations module. Below is an example implementation:

```
def add(num1: int, num2: int):
    return num1 + num2


def subtract(num1: int, num2: int):
    return num1 - num2


def multiply(num1: int, num2: int):
    return num1 * num2


def divide(num1: int, num2: int):
    return num1 / num2
```

We then write tests for each function, ensuring they behave as expected. The complete set of tests is shown below:

```
from app.calculations import add, subtract, multiply, divide


def test_add():
    print("testing add function")
    # If there is a bug causing the function to output an incorrect result,
    # for example returning 9 for add(5, 3) instead of 8, this assertion will fail.
    assert add(5, 3) == 8


def test_subtract():
    assert subtract(9, 4) == 5


def test_multiply():
    assert multiply(4, 3) == 12


def test_divide():
    assert divide(20, 5) == 4
```

When running these tests, a successful test run might yield the following output:

```
platform win32 -- Python 3.9.5, pytest-6.2.5, py-1.10.0, pluggy-1.0.0
collected 4 items


tests/test_calculations.py ...                                            [100%]


4 passed in 0.07s
```

> [!important]
> **Tip**
>
> If you are new to pytest, consider referring to the [pytest documentation](https://docs.pytest.org/en/stable/) for more detailed guidance and best practices.

## Introducing a Bug and Catching It with Tests

To illustrate the importance of automated testing, imagine that a colleague accidentally introduces a bug in the add function by adding an extra number. For instance, modifying the function to return 9 for add(5, 3) instead of 8. Running the tests in this scenario would produce output similar to the following:

```
FAILURES
test_add
def test_add():
    print("testing add function")
    assert add(5, 3) == 8
E       assert 9 == 8
E       -8


tests/test_calculations.py:6: AssertionError
=========================== short test summary info ============================
FAILED tests/test_calculations.py::test_add - assert 9 == 8
========================= 1 failed, 1 passed in 0.14s ==========================
```

This output clearly flags the error, allowing developers to promptly locate and fix the issue.

> [!important]
> **Warning**
>
> Always run your test suite after making changes to critical functions. Automated testing is key to maintaining code stability and quickly catching unwanted bugs.

After correcting the bug, all tests should pass successfully, providing confidence in the reliability of the arithmetic functions.

Happy testing!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/eed445e5-68aa-46b3-9922-0fdf2a57b8f1/lesson/68f4e08d-efa6-4102-8d94-dbd1b66fe680)**
>
> Watch video content
