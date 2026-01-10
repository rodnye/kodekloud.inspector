# Scopes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-Basics/Functions/Scopes)

---

## Table of Contents

- Scopes
  - Local Variables
  - Global Variables and Shadowing
  - Using the Global Keyword
  - Practice Exercises
  - Watch Video
    - Example of Variable Shadowing
    - Example Using Global Variable

---

## Content

Python Basics

Functions

# Scopes

In this lesson, we explore how variable scoping works in Python. By understanding the difference between local and global variables, you can write clearer and more effective code. This guide covers how variables declared inside a function are confined to that function, and when the global keyword is required.

## Local Variables

Variables defined inside a function are local to that function. They cannot be accessed outside of the function's scope. Consider the following example:

```
def input_number():
    result = int(input("Enter a number: ")) * 100
    return result
```

Here, the variable `result` is local to the `input_number` function. Trying to reference `result` elsewhere in your code will lead to an error because its scope is strictly within the function.

## Global Variables and Shadowing

It is possible to use variables that are declared outside a function (global variables) within the function body. However, if a variable with the same name exists both globally and locally, the local variable will take precedence—a concept known as shadowing.

### Example of Variable Shadowing

```
num = 100


def input_number():
    num = 50  # Local variable shadows the global 'num'
    result = int(input("Enter a number: ")) * num
    return result
```

In this example, the function uses the local variable `num` (which is 50) instead of the global `num`.

### Example Using Global Variable

If no local variable is defined, the function will use the global variable:

```
num = 100


def input_number():
    result = int(input("Enter a number: ")) * num  # Uses global 'num'
    return result
```

Python first looks in the function's local scope; if it doesn't find the variable there, it then checks the global scope.

## Using the Global Keyword

By default, variables declared inside a function are not accessible outside of it. To modify a global variable within a function, you must declare it as global using the `global` keyword.

> [!important]
> **Important**
>
> Declaring a variable as global allows you to modify it inside a function, making it accessible in the global scope after the function call.

Here's an example:

```
num = 100


def input_number():
    global own_num
    own_num = 50  # 'own_num' is now a global variable
    result = int(input("Enter a number: ")) * own_num
    return result
```

After calling `input_number()`, you can access the variable `own_num` from the global scope:

```
>>> input_number()
2  # Example output based on user input
>>> print(own_num)
50
```

## Practice Exercises

Now that you understand local and global variable scopes in Python, try practicing these concepts with some hands-on exercises. Experiment with variable shadowing and the global keyword to see how scope affects your code.

For further learning, check out the following:

- [Python Official Documentation](https://docs.python.org/3/tutorial/)
- [Understanding Python Scoping](https://realpython.com/python-scope-namespace/)

That's it for this lesson. Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-basics/module/e169dc83-5d71-40ac-8437-4f500246efe6/lesson/3728e477-4577-4026-9942-36f7dbaa7f87)**
>
> Watch video content
