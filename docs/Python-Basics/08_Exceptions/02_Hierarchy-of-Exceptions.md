# Hierarchy of Exceptions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-Basics/Exceptions/Hierarchy-of-Exceptions)

---

## Table of Contents

- Hierarchy of Exceptions
  - Watch Video

---

## Content

Python Basics

Exceptions

# Hierarchy of Exceptions

Python 3 includes 63 built-in exceptions that are structured in a tree hierarchy. For example, the exception ZeroDivisionError is a specific instance of the more general ArithmeticError exception. In turn, ArithmeticError is a subclass of Exception, which itself is derived from BaseException.

Because ZeroDivisionError is a type of ArithmeticError, you can choose to handle all arithmetic-related errors with a single ArithmeticError branch instead of addressing ZeroDivisionError separately. However, keep in mind that an ArithmeticError might be raised in scenarios other than division by zero. Therefore, ensure that your error messages are appropriately general.

> [!important]
> **Note**
>
> When multiple except branches are present, only the first matching branch is executed. This makes the order of the branches crucial for proper error handling.

Below is an example that demonstrates how to handle exceptions using specific branches:

```
try:
    x = int(input("Enter a number: "))
    y = 1 / x
    print(y)
except ZeroDivisionError:
    print("You cannot divide by zero.")
except ArithmeticError:
    print("Calculation failed.")
except Exception:
    print("Something else went wrong")

print("All done!")
```

Sample console output:

```
Enter a number:
0
You cannot divide by zero.
All done!
```

If you need to handle two or more exceptions in the same way, you can list them in a comma-separated tuple within a single except block:

```
try:
    x = int(input("Enter a number: "))
    y = 1 / x
    print(y)
except (ZeroDivisionError, ValueError):
    print("Invalid input value")
except ArithmeticError:
    print("Calculation failed.")
except Exception:
    print("Something else went wrong")


print("All done!")
```

Sample console output:

```
Enter a number:
0
Invalid input value
All done!
```

Errors can also be raised within functions. You have the flexibility to handle them either inside or outside the function. The following example illustrates handling exceptions within a function:

```
def calculate_user_input():
    try:
        x = int(input("Enter a number: "))
        y = 1 / x
        print(y)
    except ZeroDivisionError:
        print("You cannot divide by zero.")
    except Exception:
        print("Something else went wrong")
    return None


calculate_user_input()
```

Sample console output:

```
Enter a number:
0
```

To handle exceptions outside the function, call the function within a try block:

```
def calculate_user_input():
    x = int(input("Enter a number: "))
    y = 1 / x
    print(y)
    return None


try:
    calculate_user_input()
except ZeroDivisionError:
    print("You cannot divide by zero.")
except Exception:
    print("Something else went wrong")
```

Sample console output:

```
Enter a number:
0
You cannot divide by zero.
```

You can manually raise an exception using the raise keyword. This is useful for simulating exceptions during testing or delegating part of the error handling process to other sections of your code:

```
raise ZeroDivisionError
```

Console output:

```
ZeroDivisionError
```

The following example demonstrates how to raise a ZeroDivisionError directly within a function:

```
def calculate_user_input():
    raise ZeroDivisionError


try:
    calculate_user_input()
except ZeroDivisionError:
    print("You cannot divide by zero.")
except Exception:
    print("Something else went wrong")
```

Sample console output:

```
Enter a number:
0
You cannot divide by zero.
```

It is important to note that you can only use an unnamed raise (i.e., re-raise the current exception) within an except block. In this scenario, the same exception is immediately re-raised:

```
def calculate_user_input():
    try:
        x = int(input("Enter a number: "))
        y = 1 / x
        print(y)
    except Exception:
        print("Something else went wrong")
        raise
    return None


calculate_user_input()
```

To handle a re-raised exception, you need an additional try-except block around the function call.

Another useful keyword in Python is assert. The assert statement evaluates an expression; if the expression is true (or non-zero, non-empty, etc.), nothing happens. If the expression is false, Python automatically raises an AssertionError. This mechanism is particularly useful for verifying that your code does not proceed with invalid data, especially in functions that might be reused by others.

For example:

```
import math
x = int(input("Enter a number: "))
assert x >= 0
x = math.sqrt(x)
print("Result:", x)
```

Sample console output:

```
Enter a number:
0
Result: 0.0


Enter a number:
-1
Traceback (most recent call last):
  ...
AssertionError
```

> [!important]
> **Tip**
>
> Using assertions in your code can help prevent the program from producing invalid results when input data has not been pre-validated.

The official Python documentation provides a comprehensive overview of all possible exceptions. While memorizing each exception is not necessary, it is beneficial to be familiar with the most common ones to ensure that your code reliably handles errors.

That's it for this lesson. Now start practicing what you've learned with the provided exercises.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-basics/module/b7dfa718-4f50-4b8b-bc7c-51915b87a2a7/lesson/bdbdc28f-4dca-436f-8675-aa6257914c8e)**
>
> Watch video content
