# Tuples - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-Basics/Dictionaries/Tuples)

---

## Table of Contents

- Tuples
  - Creating and Using Tuples
  - Tuple Characteristics
  - Comparing Lists and Tuples
  - Watch Video
    - Single-Element Tuples

---

## Content

Python Basics

Dictionaries

# Tuples

Python offers two primary sequence data types: lists and tuples. While lists are mutable—allowing you to modify their data by deleting items or appending new ones—tuples are immutable, meaning their data remains constant once created.

> [!important]
> **Immutability Reminder**
>
> Remember: Unlike lists, tuples cannot be modified after creation. This property makes them useful in scenarios where a constant set of values is required.

## Creating and Using Tuples

A tuple is defined using parentheses or simply comma-separated values. Below is an example of creating and printing a tuple:

```
>>> tuple1 = (1, 2, 3)
>>> print(tuple1)
(1, 2, 3)
```

Much like lists, tuples support data access through loops and slicing. For instance, you can iterate through a tuple using a for loop:

```
>>> tuple1 = (1, 2, 3)
>>> for item in tuple1:
...     print(item)
```

Attempting to modify a tuple, however, results in errors. Unlike lists, tuples do not support methods like `append`, nor can you assign a new value to an individual element:

```
>>> tuple1 = (1, 2, 3)
>>> tuple1.append(4)
AttributeError: 'tuple' object has no attribute 'append'


>>> tuple1[1] = 9
TypeError: 'tuple' object does not support item assignment
```

## Tuple Characteristics

- **Immutable Structure:** Once a tuple is created, its contents cannot be changed.
- **Versatile Storage:** Tuples can store elements of different data types including integers, strings, variables, and even other tuples.

For example, you can combine multiple data types into a single tuple:

```
>>> age = 22
>>> tuple1 = (1, "Lydia", age, (1, 2))
```

### Single-Element Tuples

Creating a tuple with a single element requires a trailing comma to distinguish it from a regular parenthesized expression:

```
>>> tuple1 = (1,)
>>> tuple2 = 1,
```

## Comparing Lists and Tuples

While lists offer flexibility through mutability, tuples provide a reliable structure for fixed data. A quick comparison:

| Data Type | Mutability | Creation Syntax        | Use Case                          |
| --------- | ---------- | ---------------------- | --------------------------------- |
| List      | Mutable    | Square brackets \\[\\] | Data that may change over time    |
| Tuple     | Immutable  | Parentheses ()         | Fixed data that should not change |

That’s it for now! Dive into some hands-on practice with tuples in this lesson to reinforce your understanding and explore their practical applications.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-basics/module/999967d9-7cca-48f8-893c-5e61014671f8/lesson/b8cb75b0-f340-45ec-ae6c-a188272e9f3f)**
>
> Watch video content
