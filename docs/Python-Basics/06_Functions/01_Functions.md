# Functions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-Basics/Functions/Functions)

---

## Table of Contents

- Functions
  - Why Use Functions?
  - Defining the Function
  - Important Consideration
  - Watch Video

---

## Content

Python Basics

Functions

# Functions

In this lesson, you'll learn how to create and use custom functions in Python. So far, we've worked with built-in functions like `print`, `len`, and `input`, and we've distinguished between functions and methods. In Python, functions can come from the core language, external modules, or be defined by you.

> [!important]
> **Key Point**
>
> Encapsulating repeated code into functions enhances readability and minimizes potential bugs.

## Why Use Functions?

Repeating blocks of code can make your programs harder to maintain and increase the risk of errors. By defining a function, you bundle the code into a reusable unit, reducing redundancy and improving clarity.

Consider the following example where the same input logic is repeated multiple times:

```
input1 = int(input("Enter a number: "))
input2 = int(input("Enter a number: "))
input3 = int(input("Enter a number: "))
input4 = int(input("Enter a number: "))
input5 = int(input("Enter a number: "))
```

To streamline this, we can define a function named `input_number`:

## Defining the Function

We create a function using Python's `def` keyword. The function starts with the function name and parentheses, followed by a colon to indicate the beginning of the function body. In this case, the function prompts the user for a number, converts the input to an integer using `int()`, and returns the value.

Here's how to rewrite the repetitious code using our new `input_number` function:

```
def input_number():
    return int(input("Enter a number: "))


input1 = input_number()
input2 = input_number()
input3 = input_number()
input4 = input_number()
input5 = input_number()
```

Each time you call `input_number()`, the function executes its internal code, prompting the user, converting the input to an integer, and returning the resulting value. For example, the variable `input1` holds the number provided by the user.

## Important Consideration

It is crucial to define a function before calling it. If you attempt to use a function before its definition, Python will throw an error:

```
>>> input1 = input_number()
def input_number():
    return int(input("Enter a number: "))
NameError: name 'input_number' is not defined
```

This error occurs because Python processes the code sequentially and has not encountered the definition of `input_number` when it is called.

> [!important]
> **Reminder**
>
> Always define your functions before invoking them to avoid `NameError` issues.

That’s all for this lesson. Keep practicing your function definitions and usage. [Learn more about Python functions](https://docs.python.org/3/tutorial/controlflow.html#defining-functions) for additional insights.

See you in the next lesson!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-basics/module/e169dc83-5d71-40ac-8437-4f500246efe6/lesson/07eeb9c0-46aa-45f3-92b4-b1cb2c06e30d)**
>
> Watch video content
