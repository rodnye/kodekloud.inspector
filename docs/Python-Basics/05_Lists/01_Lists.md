# Lists - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-Basics/Lists/Lists)

---

## Table of Contents

- Lists
  - Creating a List
  - Modifying List Elements
  - Determining List Length
  - Removing Elements from a List
  - Using Negative Indices
  - Handling Index Errors
  - Watch Video

---

## Content

Python Basics

Lists

# Lists

A list in Python is an ordered collection of elements where each element is stored as a scalar value and assigned an index. The indexing starts at 0, meaning the first element is at index 0, the second at index 1, and so on. You can easily access and modify list elements by specifying their index within square brackets.

## Creating a List

Consider the following example of a list containing country names:

```
countries = ["USA", "Canada", "India"]
```

## Modifying List Elements

To modify an element in a list, assign a new value to the desired index. For example, to change "USA" (at index 0) to "UK", use the following code:

```
countries[0] = "UK"
```

## Determining List Length

The built-in `len` function is used to obtain the number of elements in a list. For instance, to get the length of the `countries` list:

```
print(len(countries))
```

Since the list contains three elements, the output will be `3`.

## Removing Elements from a List

You can delete an element using the `del` keyword. For example, to remove the second item (index 1) from the list:

```
del countries[1]
```

After executing the above code, "Canada" is removed and the list now reindexes "India" to index 1.

## Using Negative Indices

Python lists support negative indexing, which allows you to access elements from the end of the list. For example, to retrieve the last element:

```
print(countries[-1])
```

## Handling Index Errors

Accessing an index that does not exist, such as trying to retrieve a fourth element from a three-element list, will result in an error. For example:

```
print(countries[4])
```

> [!important]
> **Warning**
>
> Attempting to access an out-of-range index will raise an `IndexError: list index out of range`. Always validate the existence of an element before accessing its index.

This concludes our explanation of Python lists. With these fundamentals, you're ready to gain some hands-on practice and explore more advanced list operations.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-basics/module/a115db9d-996c-4cfc-be27-9cfd7e6d77f5/lesson/3db6a9ed-88c8-47c4-a67d-c9a45908e113)**
>
> Watch video content
