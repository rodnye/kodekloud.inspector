# Parametrize - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Testing/Parametrize)

---

## Table of Contents

- Parametrize
  - Introducing Pytest Parameterization
  - Watch Video

---

## Content

Python API Development with FastAPI

Testing

# Parametrize

Testing arithmetic functions with only one set of numbers may not expose all edge cases. The examples below demonstrate how to test functions such as add, subtract, multiply, and divide more thoroughly.

Below is an initial approach using single test cases for each function:

```
from app.calculations import add, subtract, multiply, divide


def test_add():
    print("testing add function")
    assert add(5, 3) == 8


def test_subtract():
    assert subtract(9, 4) == 5


def test_multiply():
    assert multiply(4, 3) == 12
```

When you execute your tests using Pytest, you may see an output similar to this:

```
> pytest
platform win32 -- Python 3.9.5, pytest-6.2.5, py-1.10.0, pluggy-1.0.0
rootdir: C:\Users\sanje\Documents\Courses\fastapi
plugins: cov-2.12.1
collected 4 items


tests/test_calculations.py ....                      [100%]


4 passed in 0.07s
```

> [!important]
> **Note**
>
> Testing with a single set of input values does not guarantee that all possible scenarios are handled correctly by your functions.

## Introducing Pytest Parameterization

Replicating test functions for different input values can lead to repetitive and hard-to-maintain code. Instead, leverage Pytest's parameterization feature to run the same test logic with multiple sets of inputs. This approach not only reduces duplication but also enhances your test coverage.

To set up parameterized tests, import pytest and use the `@pytest.mark.parametrize` decorator. This decorator requires a string with variable names and a list of tuples. Each tuple represents a test case, containing both the input values and the expected output.

Below is an example of using parameterization for the `add` function:

```
import pytest
from app.calculations import add, subtract, multiply, divide


@pytest.mark.parametrize("num1, num2, expected", [
    (3, 2, 5),
    (7, 1, 8),
    (12, 4, 16)
])
def test_add(num1, num2, expected):
    print("testing add function")
    assert add(num1, num2) == expected


def test_subtract():
    assert subtract(9, 4) == 5


def test_multiply():
    assert multiply(4, 3) == 12


def test_divide():
    # Assuming divide performs division correctly
    assert divide(9, 3) == 3
```

Running the tests in verbose mode provides confirmation that the `test_add` function is executed with each set of parameters:

```
> pytest -v
collected 6 items


tests/test_calculations.py::test_add[3-2-5] PASSED
tests/test_calculations.py::test_add[7-1-8] PASSED
tests/test_calculations.py::test_add[12-4-16] PASSED
tests/test_calculations.py::test_subtract PASSED
tests/test_calculations.py::test_multiply PASSED
tests/test_calculations.py::test_divide PASSED


6 passed in 0.08s
```

> [!important]
> **Note**
>
> The parameterization approach makes your tests more modular and maintainable. It facilitates the easy addition or modification of test cases without redundant code.

By adopting Pytest parameterization for your arithmetic function tests, you streamline your code and ensure a more robust and efficient testing strategy.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/eed445e5-68aa-46b3-9922-0fdf2a57b8f1/lesson/8ed28f2f-e080-4f10-98fb-9e00d72bf4c4)**
>
> Watch video content
