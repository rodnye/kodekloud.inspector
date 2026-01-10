# Testing Flags - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Testing/Testing-Flags)

---

## Table of Contents

- Testing Flags
  - Basic Test Setup
  - Increased Verbosity
  - Displaying Print Statements
  - Watch Video

---

## Content

Python API Development with FastAPI

Testing

# Testing Flags

Learn how to enhance your testing workflow by using additional Pytest flags. In this guide, you'll see how flags like verbose mode and print statement capturing can help you gain greater insight into your tests.

---

## Basic Test Setup

This section demonstrates a simple test setup for the `add` function. The test, located in `tests/test_calculations.py`, imports the `add` function and verifies its correctness using an assertion.

```
from app.calculations import add


def test_add():
    print("testing add function")
    assert add(5, 3) == 8
```

Running Pytest without any extra flags yields minimal output. For example, executing the following command:

```
pytest
```

generates output similar to:

```
(venv) C:\Users\sanje\Documents\Courses\fastapi>pytest
platform win32 -- Python 3.9.5, pytest-6.2.5, py-1.10.0, pluggy-1.0.0
rootdir: C:\Users\sanje\Documents\Courses\fastapi
plugins: cov-2.12.1
collected 1 item


tests\test_calculations.py .


(venv) C:\Users\sanje\Documents\Courses\fastapi>pytest
  1 passed in 0.06s
```

---

## Increased Verbosity

To see more detailed information during test execution, you can use the `-v` (verbose) flag. This flag lists each test function being run, rather than replacing the output with simple dots. To explore all available options, run:

```
pytest --help
```

When you run your tests with increased verbosity:

```
pytest -v
```

you might see output like:

```
(venv) C:\Users\sanje\Documents\Courses\fastapi>pytest -v
platform win32 -- Python 3.9.5, pytest-6.2.5, py-1.10.0, pluggy-1.0.0 -- c:\users\sanje\documents\courses\fastapi
cachedir: .pytest_cache
plugins: cov-2.12.1
collected 1 item


tests/test_calculations.py::test_add PASSED                       [100%]


================================================= 1 passed in 0.06s =================================================
```

This increased detail is particularly useful for tracking which specific test functions are executed.

---

## Displaying Print Statements

By default, Pytest captures output from print statements. As a result, even though the test function includes a print statement, you won't see "testing add function" in the default output. To disable this output capture and display print statements during your tests, combine the `-s` flag with the verbosity flag:

```
pytest -v -s
```

The output with print statements displayed looks like this:

```
(venv) C:\Users\sanje\Documents\Courses\fastapi>pytest -v -s
platform win32 -- Python 3.9.5, pytest-6.2.5, py-1.10.0, pluggy-1.0.0 -- c:\users\sanje\documents\courses\fastapi\venv\scripts\python.exe
cachedir: .pytest_cache
rootdir: C:\Users\sanje\Documents\Courses\fastapi
plugins: cov-2.12.1
collected 1 item


tests/test_calculations.py::test_add testing add function PASSED


========= 1 passed in 0.05s =========
```

> [!important]
> **Tip**
>
> Using the `-s` flag is particularly useful when debugging tests that rely heavily on console output.

---

This guide has demonstrated how Pytest flags can be leveraged to improve the clarity and amount of information displayed during tests. Whether you're running tests in a local development environment or as part of an automated pipeline, these flags can significantly enhance your debugging and verification process.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/eed445e5-68aa-46b3-9922-0fdf2a57b8f1/lesson/8d1fe7c2-c0a2-4640-ac19-9b1cf3505796)**
>
> Watch video content
