# Comment driven Development - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Copilot-Certification/Introduction/Comment-driven-Development)

---

## Table of Contents

- Comment driven Development
  - Table of Contents
  - Overview
  - Prerequisites
  - Generate a Python Class from Comments
  - Extend with Domain-Specific Methods
  - Comment-Driven Function Generation
  - Auto-Generate Unit Tests
  - Resources & References
  - Watch Video
    - Instantiate and Verify

---

## Content

GitHub Copilot Certification

Introduction

# Comment driven Development

Leverage descriptive comments to auto-generate boilerplate classes, domain-specific methods, and tests in Python using GitHub Copilot. This workflow speeds up development and enforces consistency across your codebase.

## Table of Contents

1.  [Overview](#overview)
2.  [Prerequisites](#prerequisites)
3.  [Generate a Python Class from Comments](#generate-a-python-class-from-comments)
4.  [Extend with Domain-Specific Methods](#extend-with-domain-specific-methods)
5.  [Comment-Driven Function Generation](#comment-driven-function-generation)
6.  [Auto-Generate Unit Tests](#auto-generate-unit-tests)
7.  [Resources & References](#resources--references)

---

## Overview

Comment-driven development (CDD) lets you write plain-English comments that describe the code you need. GitHub Copilot reads these comments and generates the corresponding implementation, including:

- Classes with type hints and validation
- Data-processing methods
- Standalone functions
- `pytest` unit tests

CDD reduces boilerplate and keeps your focus on business logic.

---

## Prerequisites

Before you begin, ensure the following are installed:

| Tool                     | Purpose                | Install Command                   |
| ------------------------ | ---------------------- | --------------------------------- |
| GitHub Copilot extension | AI code completion     | Available via VS Code Marketplace |
| Python ≥ 3.8             | Language runtime       | https://www.python.org/downloads/ |
| pandas                   | Data processing        | `pip install pandas`              |
| pytest                   | Unit testing framework | `pip install pytest`              |

---

## Generate a Python Class from Comments

Open `main.py` and write a high-level description of the class you want:

```
# Create an Employee class with name, age, and salary attributes
# Include type hints and validation for each field
```

> [!important]
> **Note**
>
> GitHub Copilot will trigger on typing patterns like `def` or `class`. Press `Tab` (or your configured shortcut) to accept the suggestion.

After accepting Copilot’s suggestion, your file should look like this:

```
import pandas as pd
import numpy as np


class Employee:
    def __init__(self, name: str, age: int, salary: float):
        self.name = name
        self.age = age
        self.salary = salary


    @property
    def name(self) -> str:
        return self._name


    @name.setter
    def name(self, value: str):
        if not isinstance(value, str):
            raise TypeError("Name must be a string")
        self._name = value


    @property
    def age(self) -> int:
        return self._age


    @age.setter
    def age(self, value: int):
        if not isinstance(value, int):
            raise TypeError("Age must be an integer")
        self._age = value


    @property
    def salary(self) -> float:
        return self._salary


    @salary.setter
    def salary(self, value: float):
        if not isinstance(value, (int, float)):
            raise TypeError("Salary must be a number")
        self._salary = value
```

### Instantiate and Verify

```
# main.py
employee = Employee("Alice", 30, 50000.0)
print(employee.name)    # Alice
print(employee.age)     # 30
print(employee.salary)  # 50000.0
```

```
(venv) $ python main.py
Alice
30
50000.0
```

---

## Extend with Domain-Specific Methods

You can drive Copilot to add data-processing methods by writing comments in the class. For example, to analyze stock data:

```
# create a method that processes stock market data
# calculate moving averages, volatility, and trading signals
# handle missing data and outliers
def process_stock_data(self, data: pd.DataFrame) -> pd.DataFrame:
    # calculate moving averages
    data['SMA_50'] = data['Close'].rolling(window=50).mean()
    data['SMA_200'] = data['Close'].rolling(window=200).mean()


    # calculate volatility
    data['daily_return'] = data['Close'].pct_change()
    data['volatility'] = data['daily_return'].rolling(window=50).std()


    # generate signals
    data['signal'] = 0
    data.loc[data['SMA_50'] > data['SMA_200'], 'signal'] = 1
    data.loc[data['SMA_50'] < data['SMA_200'], 'signal'] = -1


    # handle missing values
    data.fillna(method='ffill', inplace=True)
    return data
```

Add this directly under the `Employee` class. Running `main.py` again confirms existing behavior is preserved:

```
(venv) $ python main.py
Alice
30
50000.0
```

---

## Comment-Driven Function Generation

Standalone functions are just as easy. In `main.py`, add:

```
# Validate trading parameters before order execution
```

Copilot generates:

```
def validate_trading_parameters(price: float, volume: int, symbol: str) -> bool:
    """Validate trading parameters before order execution"""
    if not isinstance(price, (int, float)):
        raise TypeError("Price must be a number")
    if not isinstance(volume, int):
        raise TypeError("Volume must be an integer")
    if not isinstance(symbol, str):
        raise TypeError("Symbol must be a string")
    if price <= 0:
        raise ValueError("Price must be positive")
    if volume <= 0:
        raise ValueError("Volume must be positive")
    return True
```

---

## Auto-Generate Unit Tests

Create `test_main.py` and write test-descriptive comments:

```
# test process_stock_data function
```

Copilot suggests:

```
import pytest
import pandas as pd
import main


def test_process_stock_data():
    data = pd.DataFrame({'Close': list(range(1, 201))})
    emp = main.Employee("Alice", 30, 50000.0)
    processed = emp.process_stock_data(data.copy())


    assert 'SMA_50' in processed
    assert 'SMA_200' in processed
    assert 'volatility' in processed
    assert 'signal' in processed
    assert processed['signal'].iloc[-1] == 1


def test_validate_trading_parameters_success():
    assert main.validate_trading_parameters(100.5, 1000, 'AAPL') is True


@pytest.mark.parametrize("price,volume,symbol,exception", [
    (-1,   100, 'AAPL', ValueError),
    (100.5,   0, 'AAPL', ValueError),
    (100.5, 1000,    123, TypeError),
])
def test_validate_trading_parameters_errors(price, volume, symbol, exception):
    with pytest.raises(exception):
        main.validate_trading_parameters(price, volume, symbol)
```

Run tests:

```
(venv) $ pytest -q
```

---

> [!important]
> **Warning**
>
> Always review generated code for edge cases and security considerations—AI suggestions may not cover every scenario.

---

## Resources & References

- [GitHub Copilot](https://github.com/features/copilot)
- [pandas Documentation](https://pandas.pydata.org/docs/)
- [pytest Documentation](https://docs.pytest.org/)
- [Python Type Hints](https://docs.python.org/3/library/typing.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-copilot-certification/module/b02a5227-ee17-43dc-b006-51fef8272f13/lesson/159f6e4d-16da-4bf2-9047-12d0bba43a28)**
>
> Watch video content
