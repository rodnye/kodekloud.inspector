# List as Argument - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-Basics/Functions/List-as-Argument)

---

## Table of Contents

- List as Argument
  - Watch Video

---

## Content

Python Basics

Functions

# List as Argument

In this article, we explore how to pass lists as arguments to Python functions, enhancing flexibility beyond just handling strings and numbers. We will demonstrate this concept by creating a function named multiply_values that accepts a list and returns a new list with each element multiplied by 2.

Below is the implementation of the function:

```
def multiply_values(lst):
    multiplied_values = []
    for item in lst:
        multiplied_values.append(item * 2)
    return multiplied_values
```

In the function above, we:

1.  Initialize an empty list called multiplied_values.
2.  Iterate over each element in the provided list.
3.  Multiply each element by 2 and append the result to multiplied_values.
4.  Return the new list containing the multiplied values.

> [!important]
> **Note**
>
> When calling the function, ensure that the argument provided is an iterable (e.g., a list). Passing a non-iterable, like an integer, will result in a runtime error.

Let's test the multiply_values function with a sample list:

```
print(multiply_values([1, 2]))
```

When you run this code, the output will be a new list: \[2, 4\], where each element from the original list has been doubled.

For additional Python function tutorials and best practices, be sure to check out our [Python Functions Guide](https://www.python.org/doc/).

Thanks for reading! Enjoy practicing and mastering Python lists as arguments.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-basics/module/e169dc83-5d71-40ac-8437-4f500246efe6/lesson/2edefa1d-59ac-49e6-9c6a-2524a8476965)**
>
> Watch video content
