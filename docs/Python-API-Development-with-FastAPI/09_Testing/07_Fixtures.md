# Fixtures - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Testing/Fixtures)

---

## Table of Contents

- Fixtures
  - Creating Fixtures
  - Parameterizing Fixtures and Test Scenarios
  - Conclusion
  - Watch Video

---

## Content

Python API Development with FastAPI

Testing

# Fixtures

In this article, you'll learn how to reduce repetitive code in your bank account tests using pytest fixtures. When testing your bank account functionality, you might notice that each test requires initializing a bank account instance multiple times. For example:

```
assert bank_account.balance == 80

def test_collect_interest():
    bank_account = BankAccount(50)
    bank_account.collect_interest()
    assert round(bank_account.balance, 6) == 55
```

When running your tests, you might see output similar to this:

```
plugins: cov-2.12.1
collected 11 items

tests/test_calculations.py::test_add[3-2-5] PASSED
tests/test_calculations.py::test_add[7-1-8] PASSED
tests/test_calculations.py::test_add[2-4-16] PASSED
tests/test_calculations.py::test_subtract PASSED
tests/test_calculations.py::test_multiply PASSED
tests/test_calculations.py::test_divide PASSED
tests/test_calculations.py::test_bank_set_initial_amount PASSED
tests/test_calculations.py::test_bank_default_amount PASSED
tests/test_calculations.py::test_withdraw PASSED
tests/test_calculations.py::test_deposit PASSED
tests/test_calculations.py::test_collect_interest PASSED

============================= 11 passed in 0.09s =============================
```

Notice that every test involving the bank account starts by creating an instance:

```
def test_divide():
    assert divide(20, 5) == 4

def test_bank_set_initial_amount():
    bank_account = BankAccount(50)
    assert bank_account.balance == 50

def test_bank_default_amount():
    bank_account = BankAccount()
    assert bank_account.balance == 0

def test_withdraw():
    bank_account = BankAccount(50)
    bank_account.withdraw(20)
    assert bank_account.balance == 30
```

And similarly for deposit and interest collection:

```
def test_deposit():
    bank_account = BankAccount(50)
    bank_account.deposit(30)
    assert bank_account.balance == 80

def test_collect_interest():
    bank_account = BankAccount(50)
    bank_account.collect_interest()
    assert round(bank_account.balance, 6) == 55
```

This repetitive code can become tedious when you have many tests (for example, 50 tests in a single class). Pytest fixtures help minimize this redundancy.

> [!important]
> **Note**
>
> A fixture is simply a function that runs before your tests and sets up the necessary environment, such as creating an instance of a bank account.

## Creating Fixtures

We'll start by creating two fixtures. One fixture initializes a bank account with a zero balance and the other initializes it with a preset balance (e.g., 50). Although you can place fixtures anywhere, the best practice is to define them at the top of your test file. For example:

```
import pytest
from app.calculations import add, subtract, multiply, divide, BankAccount

@pytest.fixture
def zero_bank_account():
    print("Creating an empty bank account")
    return BankAccount()

@pytest.fixture
def bank_account():
    # Returns a bank account with an initial value of 50.
    return BankAccount(50)
```

You can use these fixtures by adding them as parameters to your test functions. Below is an example of refactored tests using these fixtures:

```
def test_divide():
    assert divide(20, 5) == 4

def test_bank_set_initial_amount(bank_account):
    # Using the bank_account fixture that initializes with 50.
    assert bank_account.balance == 50

def test_bank_default_amount(zero_bank_account):
    # Using the zero_bank_account fixture that initializes with 0.
    print("Testing my bank account")
    assert zero_bank_account.balance == 0

def test_withdraw(bank_account):
    bank_account.withdraw(20)
    assert bank_account.balance == 30
```

When running the tests with the `-s` flag (which shows print statements), you'll see that the fixture runs before your test function. For instance, the output for `test_bank_default_amount` will display:

```
Creating an empty bank account
Testing my bank account
PASSED
```

This confirms that the fixture is executed prior to the test itself.

## Parameterizing Fixtures and Test Scenarios

Fixtures can also be combined with pytest’s parameterization feature to test multiple scenarios. For example, you can parameterize addition test cases as shown below:

```
@pytest.mark.parametrize("num1, num2, expected", [
    (3, 2, 5),
    (7, 1, 8),
    (12, 4, 16)
])
def test_add(num1, num2, expected):
    print("Testing add function")
    assert add(num1, num2) == expected

def test_subtract():
    assert subtract(9, 4) == 5
```

Consider a more complex test case that involves both depositing and withdrawing money. Initially, you might write:

```
def test_bank_transaction(zero_bank_account):
    zero_bank_account.deposit(200)
    zero_bank_account.withdraw(100)
    assert zero_bank_account.balance == 100
```

You can further combine fixtures with parameterized data in this way:

```
@pytest.mark.parametrize("deposited, withdrew, expected", [
    (200, 100, 100),
    (50, 10, 40),
    (1200, 200, 1000),
])
def test_bank_transaction(zero_bank_account, deposited, withdrew, expected):
    zero_bank_account.deposit(deposited)
    zero_bank_account.withdraw(withdrew)
    assert zero_bank_account.balance == expected
```

When you run the tests, the output may look like this:

```
tests/test_calculations.py::test_withdraw PASSED
tests/test_calculations.py::test_deposit PASSED
tests/test_calculations.py::test_collect_interest PASSED
tests/test_calculations.py::test_bank_transaction[200-100-100] Creating an empty bank account
tests/test_calculations.py::test_bank_transaction[50-10-40] Creating an empty bank account
tests/test_calculations.py::test_bank_transaction[1200-200-1000] Creating an empty bank account
============================== 14 passed in 0.09s ==============================
```

Each parameterized scenario uses the fixture to set up the test environment correctly.

## Conclusion

Using pytest fixtures helps eliminate repetitive setup code across multiple tests. They not only simplify your test code for scenarios like deposit and withdrawal operations but also make it easier to manage more complex cases, such as setting up databases or external services.

> [!important]
> **Final Tip**
>
> By combining fixtures with parameterized test cases, you can efficiently cover a wide range of scenarios while keeping your test code concise, maintainable, and SEO-friendly.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/eed445e5-68aa-46b3-9922-0fdf2a57b8f1/lesson/b77bff5f-f83c-401c-a32b-7692f7ccd2ab)**
>
> Watch video content
