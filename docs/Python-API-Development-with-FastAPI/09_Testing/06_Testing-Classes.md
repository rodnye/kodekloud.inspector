# Testing Classes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Testing/Testing-Classes)

---

## Table of Contents

- Testing Classes
  - Testing the BankAccount Constructor
  - Testing the withdraw Method
  - Testing the deposit Method
  - Testing the collect_interest Method
  - Watch Video

---

## Content

Python API Development with FastAPI

Testing

# Testing Classes

In this lesson, we explore how to test classes in Python by building on our previous experience with testing simple functions. While testing functions is usually straightforward, testing classes requires writing more code and ensuring that each method behaves as expected. Here, we illustrate this process with a simple dummy class called BankAccount, which models a person's bank account by incorporating methods for deposits, withdrawals, and interest collection, along with a helper function for division.

Below is the consolidated code snippet defining the BankAccount class:

```
def divide(num1: int, num2: int):
    return num1 / num2


class BankAccount:
    def __init__(self, starting_balance=0):
        self.balance = starting_balance


    def deposit(self, amount):
        self.balance += amount


    def withdraw(self, amount):
        self.balance -= amount


    def collect_interest(self):
        self.balance *= 1.1
```

Many of the tests for basic functions (such as subtract, multiply, and divide) have already been implemented. For example, test outputs might look similar to the following:

```
tests/test_calculations.py::test_subtract PASSED
tests/test_calculations.py::test_multiply PASSED
tests/test_calculations.py::test_divide PASSED
```

The BankAccount class is structured to behave as follows:

1.  The constructor (`__init__`) initializes the bank account's balance. If no starting balance is provided, it defaults to zero.
2.  The `deposit` method increases the account balance by the deposited amount.
3.  The `withdraw` method decreases the account balance by the specified amount.
4.  The `collect_interest` method multiplies the current balance by 1.1 to simulate a 10% interest accumulation.

Let's now explore the tests written for the BankAccount class.

## Testing the BankAccount Constructor

We start by verifying that we can set an initial balance when creating a new BankAccount. For example, providing an initial balance of 50 should result in the account reflecting that balance:

```
def test_bank_set_initial_amount():
    bank_account = BankAccount(50)
    assert bank_account.balance == 50
```

It is equally important to check that when no initial value is provided, the balance defaults to zero:

```
def test_bank_default_amount():
    bank_account = BankAccount()
    assert bank_account.balance == 0
```

The output for these tests may appear as follows:

```
tests/test_calculations.py::test_bank_set_initial_amount PASSED
tests/test_calculations.py::test_bank_default_amount PASSED
```

## Testing the withdraw Method

Next, we test the withdraw functionality. For instance, starting with a balance of 50 and withdrawing 20 should leave the account with a balance of 30:

```
def test_withdraw():
    bank_account = BankAccount(50)
    bank_account.withdraw(20)
    assert bank_account.balance == 30
```

After executing this test along with others, you might see output like:

```
tests/test_calculations.py::test_withdraw PASSED
```

## Testing the deposit Method

Similarly, it's essential to confirm that the deposit method correctly increases the balance. Starting from a balance of 50 and depositing 30 should update the balance to 80:

```
def test_deposit():
    bank_account = BankAccount(50)
    bank_account.deposit(30)
    assert bank_account.balance == 80
```

This test may produce the following output:

```
tests/test_calculations.py::test_deposit PASSED
```

## Testing the collect_interest Method

The final test checks the `collect_interest` method. Given an initial balance, applying this method should multiply the balance by 1.1. For example, a starting balance of 50 is expected to become roughly 55. However, due to floating-point arithmetic, the result might slightly differ (e.g., 55.000000000001). To handle this, the test uses the `round` function:

> [!important]
> **Note**
>
> Due to floating-point precision issues in Python, rounding the balance ensures accurate comparisons in tests.

```
def test_collect_interest():
    bank_account = BankAccount(50)
    bank_account.collect_interest()
    # Round the balance to account for floating point precision issues
    assert round(bank_account.balance, 6) == 55
```

The complete suite of tests may produce output akin to:

```
tests/test_calculations.py::test_subtract PASSED
tests/test_calculations.py::test_multiply PASSED
tests/test_calculations.py::test_divide PASSED
tests/test_calculations.py::test_bank_set_initial_amount PASSED
tests/test_calculations.py::test_bank_default_amount PASSED
tests/test_calculations.py::test_withdraw PASSED
tests/test_calculations.py::test_deposit PASSED
tests/test_calculations.py::test_collect_interest PASSED
```

Finally, all tests pass:

```
11 passed in 0.07s
```

This lesson demonstrated how to write and organize tests for a Python class. We covered testing the constructor, deposit, and withdrawal methods, as well as handling floating-point precision when applying interest calculations. For more insights into Python testing, consider exploring [pytest documentation](https://docs.pytest.org/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/eed445e5-68aa-46b3-9922-0fdf2a57b8f1/lesson/b440fd43-03ea-4631-bf01-babe2651c30a)**
>
> Watch video content
