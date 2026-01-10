# Arguments Explained - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-Basics/Functions/Arguments-Explained)

---

## Table of Contents

- Arguments Explained
  - Mutable Types: Lists
  - Immutable Types: Scalars
  - Lists as Function Parameters
  - Summary
  - Watch Video

---

## Content

Python Basics

Functions

# Arguments Explained

In this lesson, we explore how variables and parameters behave differently based on whether they represent mutable objects (such as lists) or immutable scalar values (such as strings and numbers). Understanding these differences is crucial for avoiding unintended side effects in your Python code.

## Mutable Types: Lists

When a list is passed between variables, both references point to the same memory location. This means that a change made through one reference is reflected in all others. Consider the following example:

```
>>> name = "Lydia"
>>> ages = [56, 72, 24, 46]
>>> ages2 = ages
>>> ages[0] = 92
>>> print(ages2[0])
92
```

In the example above, both `ages` and `ages2` refer to the same list. Modifying an element via one variable affects the shared object, as demonstrated by the output.

## Immutable Types: Scalars

Immutable scalar values such as numbers and strings behave differently. When passed as parameters to functions, they are copied locally, so modifications do not affect the original variable. For example, consider the following code:

```
>>> age = 22
>>> def multiply(num):
...     num *= 2
...     print("In multiply:", num)
...
>>> multiply(age)
In multiply: 44
```

Even after calling the `multiply` function, if you check the value of `age`, it remains 22 because the function only modifies a local copy of the variable.

## Lists as Function Parameters

Let's look at another example that demonstrates how mutable objects like lists behave when passed as function parameters. In this example, a function modifies the first element of a list:

```
>>> nums = [1, 2, 3]
>>> def change_first_item(lst):
...     lst[0] = 9
...
>>> change_first_item(nums)
```

Since `nums` is a mutable object, the change made inside the function affects the original list. This example reinforces the fact that mutable objects are passed by reference, and modifications within a function impact the original data.

> [!important]
> **Note**
>
> Understanding the distinction between mutable and immutable data types is essential for writing predictable and bug-free code. Always consider whether a function should alter the original object or work with a copy to avoid unintended side effects.

## Summary

- **Mutable Objects (Lists):** Passed by reference. Changes within functions will modify the original object.
- **Immutable Objects (Scalars):** Passed by value. Functions work with a copy, leaving the original variable unchanged.

That’s all for this article, and I’ll see you in the next one!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-basics/module/e169dc83-5d71-40ac-8437-4f500246efe6/lesson/d768c65f-6d6b-4bd2-b8b8-8adbdd648e02)**
>
> Watch video content
