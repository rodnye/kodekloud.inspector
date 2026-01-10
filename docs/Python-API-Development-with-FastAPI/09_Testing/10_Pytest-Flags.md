# Pytest Flags - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Testing/Pytest-Flags)

---

## Table of Contents

- Pytest Flags
  - Suppressing Warning Messages
  - Stopping on the First Failure
  - Resetting Changes and Final Verification
  - Watch Video

---

## Content

Python API Development with FastAPI

Testing

# Pytest Flags

In this guide, we explore two essential Pytest flags that can streamline your testing process: one flag to suppress excessive warnings and another to halt test execution upon the first failure. These techniques are invaluable for improving both output clarity and debugging efficiency.

---

## Suppressing Warning Messages

When running tests, you might encounter numerous warning messages from packages or deprecated code practices. For example, consider the following parameterized test:

```
@pytest.mark.parametrize("num1, num2, expected", [
    (3, 2, 5),
    (7, 1, 8),
    (12, 4, 16)
])
def test_add(num1, num2, expected):
    print("testing add function")
    assert add(num1, num2) == expected
```

The typical output may include repeated warnings similar to the snippet below:

```
venv\lib\site-packages\aiofiles\os.py:10
venv\lib\site-packages\aiofiles\os.py:10
venv\lib\site-packages\aiofiles\os.py:10
venv\lib\site-packages\aiofiles\os.py:10
c:\users\sanje\documents\courses\fastapi\venv\lib\site-packages\aiofiles\os.py:10: DeprecationWarning: "@coroutine" decorator is deprecated since Python 3.8, use "async def" instead
-- Docs: https://docs.pytest.org/en/stable/warnings.html
============================= short test summary info =============================
16 passed, 5 warnings in 0.63s
```

> [!important]
> **Tip**
>
> To eliminate these distractions, run Pytest with a flag such as `--disable-warnings`. This ensures that your test output remains focused on essential information.

---

## Stopping on the First Failure

By default, Pytest executes all tests even if some fail. While this is useful for a full test run, during active development you might prefer to halt at the first error. This allows you to quickly address failures without running the entire suite.

Consider a scenario where the `subtract` function is deliberately modified to produce an incorrect result. A snippet of your test suite might look like this:

```
import pytest
from app.calculations import add, subtract, multiply, divide, BankAccount, InsufficientFunds


@pytest.fixture
def zero_bank_account():
    print("creating empty bank account")
    return BankAccount()


@pytest.fixture
def bank_account():
    return BankAccount(50)


@pytest.mark.parametrize("num1, num2, expected", [
    # Add your test cases for add function here.
])
```

If you alter a test to intentionally fail, for instance:

```
def test_subtract():
    assert subtract(9, 4) == 6
```

A complete test run might output:

```
rootdir: C:\Users\sanje\Documents\Courses\fastapi
plugins: cov-2.12.1
collected 16 items


tests/test_calculations.py::test_add[3-2-5] PASSED
tests/test_calculations.py::test_add[7-1-8] PASSED
tests/test_calculations.py::test_add[12-4-16] PASSED
tests/test_calculations.py::test_subtract PASSED
tests/test_calculations.py::test_multiply PASSED
tests/test_calculations.py::test_divide PASSED
tests/test_calculations.py::test_bank_set_initial_amount PASSED
tests/test_calculations.py::test_bank_default_amount PASSED
tests/test_calculations.py::test_withdraw PASSED
tests/test_calculations.py::test_deposit PASSED
tests/test_calculations.py::test_collect_interest FAILED
tests/test_calculations.py::test_bank_transaction[200-100-100] PASSED
tests/test_calculations.py::test_bank_transaction[50-10-40] PASSED
```

Passing the `-x` flag to Pytest will modify this behavior. With `-x`, execution halts immediately on encountering the first failed test:

```
platform win32 -- Python 3.9.5, pytest-6.2.5, py-1.10.0, pluggy-1.0.0 -- c:\users\sanje\documents\courses\fastapi\venv\scripts\python.exe
cachedir: .pytest_cache
rootdir: C:\Users\sanje\Documents\Courses\fastapi
plugins: cov-2.12.1
collected 16 items


tests/test_calculations.py::test_add[3-2-5] PASSED
tests/test_calculations.py::test_add[7-1-8] PASSED
tests/test_calculations.py::test_add[12-4-16] PASSED
tests/test_calculations.py::test_subtract FAILED
!!!!!!!!!!!!!!!!!!!!!!!! stopping after 1 failures !!!!!!!!!!!!!!!!!!!!!!!
```

This immediate halting is particularly beneficial when debugging issues in a large test suite or when tests involve time-consuming operations such as database queries or API calls.

---

## Resetting Changes and Final Verification

After experimenting with different testing flags, you might need to revert any modifications made for testing purposes. For example, reset the `subtract` function test to its intended state:

```
def test_add(num1, num2, expected):
    print("testing add function")
    assert add(num1, num2) == expected


def test_subtract():
    assert subtract(9, 4) == 5


def test_multiply():
    assert multiply(4, 3) == 12
```

If adjustments were made to the `collect_interest` test, ensure the expected value is corrected:

```
def test_collect_interest(bank_account):
    bank_account.collect_interest()
    assert round(bank_account.balance, 6) == 55
```

Similarly, update any parameterized tests, such as those for bank transactions:

```
@pytest.mark.parametrize("deposited, withdrew, expected", [
    (200, 100, 100),
    (50, 40, 10),
    (1200, 200, 1000),
])
def test_bank_transaction(zero_bank_account, deposited, withdrew, expected):
    zero_bank_account.deposit(deposited)
    zero_bank_account.withdraw(withdrew)
```

After reverting changes, a full test run should confirm that all tests pass without errors:

```
tests\test_calculations.py:27: AssertionError
FAILED tests/test_calculations.py::test_subtract - assert 5 == 6
=========================== short test summary info ============================
FAILED tests/test_calculations.py::test_subtract - assert 5 == 6
========================== 1 failed, 3 passed, 5 warnings in 0.85s ============================
```

Once all issues are resolved, the complete suite of tests will run successfully, ensuring your code meets all quality standards.

---

By leveraging these Pytest flags, you can create a more efficient and developer-friendly testing environment. Whether you're suppressing unnecessary warnings or halting on the first failure for rapid debugging, these techniques help maintain a smooth and effective workflow.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/eed445e5-68aa-46b3-9922-0fdf2a57b8f1/lesson/0a275a8c-c649-419d-af5a-ec420127256e)**
>
> Watch video content
