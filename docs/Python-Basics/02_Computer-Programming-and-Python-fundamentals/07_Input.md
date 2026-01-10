# Input - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-Basics/Computer-Programming-and-Python-fundamentals/Input)

---

## Table of Contents

- Input
  - Understanding the Input Function
  - Capturing User Input
  - Working with Numerical Input
  - Summary
  - Watch Video
    - Example: Capturing a Favorite Color
    - Converting Input Using Typecasting

---

## Content

Python Basics

Computer Programming and Python fundamentals

# Input

In our previous article, we examined the print function and how it outputs values to the console. In this lesson, we dive into another essential function: the input function. The input function prompts the user to enter data via the console and returns the entered value as a string.

## Understanding the Input Function

The input function is designed to pause program execution until the user provides an input. You can include a prompt within the input function to guide the user on what to enter. Consider the following example demonstrating the output of a simple print command:

```
>>> print("Hello!")
Hello!
```

## Capturing User Input

To capture user input, you assign the result of the input function to a variable. In the snippet below, a prompt is displayed, and the user's response is stored:

```
>>> input("How are you feeling today? ")
How are you feeling today? Fantastic!
```

### Example: Capturing a Favorite Color

If you want to know a user's favorite color, assign the input to a variable and then use that variable later in your program:

```
favorite_color = input("What is your favorite color? ")
print("Your favorite color is " + favorite_color)
```

> [!important]
> **Note**
>
> Remember that the value returned by the input function is always a string. This is an important detail when you are handling arithmetic operations.

## Working with Numerical Input

When a user enters a number, it is returned as a string. Attempting to perform arithmetic operations on a string will result in a TypeError. Consider this example:

```
>>> age = input("How old are you? ")
How old are you? 22
>>> print(age - 10)
TypeError: unsupported operand type(s) for -: 'str' and 'int'
```

To enable arithmetic operations, you need to convert the input string into a numerical type. Python provides typecasting functions such as `int()` to convert a string to an integer or `float()` for a floating-point number.

### Converting Input Using Typecasting

Here’s how you can convert the user input from a string to an integer before performing subtraction:

```
age = input("How old are you? ")
print(int(age) - 10)
```

Alternatively, you can wrap the input function with `int()` directly to ensure that the returned value is numeric:

```
age = int(input("How old are you? "))
print(age - 10)
```

## Summary

Let's review what we've learned about the Python input function:

- The input function pauses the program and waits for a user response.
- You can provide a prompt string inside the input function to guide the user.
- The value returned by input() is always a string.
- Use typecasting functions such as `int()` or `float()` to convert the input into a numeric type for arithmetic operations.

This concludes our exploration of the input function. Stay tuned for more in-depth Python tutorials in the next lesson!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-basics/module/4178f96e-8dcd-46a2-a9c9-f65a8c9c73b0/lesson/5e399606-2372-4eb6-9ebb-78ce82329f1e)**
>
> Watch video content
