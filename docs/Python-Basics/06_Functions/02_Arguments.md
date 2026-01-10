# Arguments - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-Basics/Functions/Arguments)

---

## Table of Contents

- Arguments
  - Single Parameter Example
  - Multiple Parameters in Functions
  - Utilizing Named Parameters
  - Default Parameter Values
  - Watch Video

---

## Content

Python Basics

Functions

# Arguments

In this lesson, we'll explore how to pass values—known as arguments—to a Python function. Arguments allow you to customize a function's behavior by providing it with specific data during invocation.

## Single Parameter Example

Consider a function that multiplies the user's input by a given value. In the example below, the function `input_number` has a single parameter named `num`. When calling this function, you supply an argument (in this case, 10), which is assigned to `num`. The function then multiplies the user's input by this value.

```
def input_number(num):
    return int(input("Enter a number: ")) * num


input1 = input_number(10)
```

If the user enters `12`, the function calculates 12 × 10, resulting in 120.

## Multiple Parameters in Functions

A function can accept multiple parameters that are separated by commas. The order in which you pass the arguments is important because the first argument is assigned to the first parameter, the second to the second, and so on. For example:

```
def input_number(num1, num2):
    return int(input("Enter a number: ")) * num1 - num2


input1 = input_number(10, 20)
```

In this case, `num1` receives the value 10, and `num2` receives 20. So if the user inputs 12, the function computes 12 × 10 and then subtracts 20, resulting in 100.

## Utilizing Named Parameters

To reduce dependency on the order of arguments, you can use named parameters when calling a function. This approach enables you to explicitly assign values to specific parameters, even if they are provided in a different order. For example, to swap the values assigned to `num1` and `num2`, you can call the function like this:

```
def input_number(num1, num2):
    return int(input("Enter a number: ")) * num1 - num2


# Explicitly assign values to parameters regardless of their order
input1 = input_number(num2=10, num1=20)
```

> [!important]
> **Warning**
>
> Avoid assigning a value to the same parameter more than once. For example, providing `num1` both positionally and by name will result in an error:

```
def input_number(num1, num2):
    return int(input("Enter a number: ")) * num1 - num2


# This will raise an error because num1 is provided twice:
input1 = input_number(10, num1=20)
```

## Default Parameter Values

Python also allows you to define default values for parameters. When calling the function, if the caller does not supply an argument for a parameter with a default value, Python automatically uses that default. For instance, if we set the default value of `num` to 10, the function will multiply the user’s input by 10 if no argument is provided:

```
def input_number(num=10):
    return int(input("Enter a number: ")) * num


# Using the default value of 10
print(input_number())
```

If the user enters 12, the output is 120 because 12 × 10 = 120.

Alternatively, if you specify a value (for example, 5), Python overrides the default value:

```
def input_number(num=10):
    return int(input("Enter a number: ")) * num


# Overriding the default value by passing 5
print(input_number(5))
```

In this case, if the input is 12, the function computes 12 × 5, yielding 60.

---

That's the end of our discussion on passing arguments to Python functions. It's time to get hands-on and practice these concepts. For further reading on Python functions, consider visiting the [Python Documentation](https://docs.python.org/3/tutorial/controlflow.html#defining-functions).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-basics/module/e169dc83-5d71-40ac-8437-4f500246efe6/lesson/7e6d0bc3-0286-4025-aec1-a5d5b131f77e)**
>
> Watch video content
