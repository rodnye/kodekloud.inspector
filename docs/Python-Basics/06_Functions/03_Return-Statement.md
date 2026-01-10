# Return Statement - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-Basics/Functions/Return-Statement)

---

## Table of Contents

- Return Statement
  - Printing the Sum of Two Numbers
  - Exiting a Function Early
  - Implicit Return Value: None
  - Summary
  - Watch Video

---

## Content

Python Basics

Functions

# Return Statement

The return keyword is a cornerstone in Python programming, providing both control over a function’s execution flow and the ability to return values. It's important to note that functions do not always have to return a value; they can also perform actions like printing output to the console.

Below are some examples that demonstrate different uses of the return statement in Python.

## Printing the Sum of Two Numbers

In the following example, the function calculates the sum of its arguments and prints the result. Notice that even though the function uses a return keyword in other contexts, here it simply performs an action by printing the sum directly to the console.

```
>>> def print_sum(num1, num2):
...     sum = num1 + num2
...     print("The sum is: ", str(sum))
>>> print_sum(10, 20)
The sum is: 30
```

## Exiting a Function Early

Sometimes, you might want to exit a function before it completes all its statements based on a certain condition. For example, if the computed sum equals 0, we may wish to exit the function immediately without printing anything.

> [!important]
> **Note**
>
> If the condition for early exit is met, the function stops executing, and any code after the return statement will not run.

Consider the following example:

```
python
>>> def print_sum(num1, num2):
...     sum = num1 + num2
...     if sum == 0:
...         return
...     print("The sum is: ", str(sum))
...
>>> print_sum(4, 2)
The sum is: 6
```

In this example, when the sum equals 0 (for instance, by passing -1 and 1), the function returns immediately without printing any output.

## Implicit Return Value: None

The return keyword not only controls the execution flow but also specifies the value that a function call will evaluate to. If no return statement is explicitly provided in a function, Python returns a default value, None.

The next example defines a function that returns True when the provided argument is an even number. If the input is not even, the function ends without an explicit return, so it returns None by default.

```
python
>>> def is_even(num):
...     if num % 2 == 0:
...         return True
>>> print(is_even(6))
True
>>> print(is_even(7))
None
```

## Summary

The return keyword is a versatile tool in Python that:

- Stops the execution of a function when encountered.
- Can be used to exit a function early based on a condition.
- Returns a value to the caller, or defaults to None if no value is explicitly specified.

That concludes this lesson on the return statement. Now, try practicing what you've just learned to solidify your understanding of this essential Python feature.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-basics/module/e169dc83-5d71-40ac-8437-4f500246efe6/lesson/ec323045-5336-47c4-ad6f-d75f3d29495a)**
>
> Watch video content
