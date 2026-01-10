# Slicing Lists - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-Basics/Lists/Slicing-Lists)

---

## Table of Contents

- Slicing Lists
  - Basic Slicing Syntax
  - Slicing with Single Indices
  - Using Negative Indices
  - Copying the Entire List
  - Slicing vs. Assignment
  - Using the del Keyword with Slicing
  - Summary
  - Watch Video

---

## Content

Python Basics

Lists

# Slicing Lists

In this lesson, you'll learn how to extract portions of a list—commonly known as "slicing"—using Python's built-in slicing syntax. Slicing allows you to create a new list that contains only the elements you want without modifying the original list.

## Basic Slicing Syntax

The general syntax for slicing a list is:

```
list[start:end]
```

- The element at the "start" index is included.
- The element at the "end" index is excluded; slicing stops just before it.

For instance, suppose we have the following list and want to create a new list containing only its first two elements ("A" and "B"):

```
letters = ["A", "B", "C", "D", "E"]
firstTwo = letters[0:2]
print(firstTwo)  # Output: ["A", "B"]
```

## Slicing with Single Indices

If you provide only one index, Python interprets it differently based on its position in the slicing expression:

1.  **Only a Starting Index:**  
    The slice will include elements from the given start index to the end of the list.

    ```
    letters = ["A", "B", "C", "D", "E"]
    print(letters[1:])  # Output: ["B", "C", "D", "E"]
    ```

2.  **Only an Ending Index:**  
    The slice will include elements from the beginning of the list up to, but not including, the specified end index.

    ```
    letters = ["A", "B", "C", "D", "E"]
    print(letters[:3])  # Output: ["A", "B", "C"]
    ```

## Using Negative Indices

Negative indices are particularly useful when you don't want to calculate the exact length of a list. They allow you to start counting from the end of the list. For example, to create a new list that excludes the first and last elements:

```
letters = ["A", "B", "C", "D", "E"]
print(letters[1:-1])  # Output: ["B", "C", "D"]
```

Here, slicing starts at index 1 and stops before the final element (index -1).

## Copying the Entire List

If no indices are provided, slicing makes a complete copy of the list:

```
letters = ["A", "B", "C", "D", "E"]
copy_of_letters = letters[:]
print(copy_of_letters)  # Output: ["A", "B", "C", "D", "E"]
```

> [!important]
> **Note**
>
> Creating a copy using slicing produces a new list in memory. Therefore, modifying the new list will not affect the original list.

## Slicing vs. Assignment

When you assign one list to another, both variables point to the same list in memory. Any changes made to the list using one variable will be reflected through the other:

```
name = "Lydia"
ages = [56, 72, 24, 46]
ages2 = ages
ages[0] = 92
print(ages2[0])  # Output: 92
```

However, slicing creates a new list. Modifications to the sliced list do not alter the original list.

## Using the del Keyword with Slicing

The `del` keyword can be used alongside slicing to remove multiple elements from the original list. For example, to delete a slice from a list:

```
letters = ["A", "B", "C", "D", "E"]
del letters[1:3]
print(letters)  # Output: ["A", "D", "E"]
```

If you use `del` without any indices, it will remove all elements, resulting in an empty list.

> [!important]
> **Warning**
>
> Be careful when using the `del` keyword, as it modifies the original list permanently.

## Summary

Slicing is a powerful feature in Python that allows you to work with subsets of lists efficiently. Here’s what you learned:

- Use `list[start:end]` to extract a portion of a list.
- Omitting the start or end index enables flexible slicing.
- Negative indices help target elements based on their position from the end.
- A slice without indices creates a copy of the list.
- Using `del` with slicing modifies the original list.

Practice these slicing techniques to build familiarity and enhance your Python skills. Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-basics/module/a115db9d-996c-4cfc-be27-9cfd7e6d77f5/lesson/ca83f5cc-90e4-4176-8a20-7afc9cff8e83)**
>
> Watch video content
