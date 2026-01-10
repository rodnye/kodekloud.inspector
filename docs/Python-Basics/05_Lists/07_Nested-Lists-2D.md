# Nested Lists 2D - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-Basics/Lists/Nested-Lists-2D)

---

## Table of Contents

- Nested Lists 2D
  - Representing a Classroom with a 2D List
  - Accessing Elements in a 2D List
  - Practice with 2D Lists
  - Watch Video

---

## Content

Python Basics

Lists

# Nested Lists 2D

So far, we've explored simple lists that hold single values. Now, let's dive into two-dimensional (2D) lists—lists whose elements are themselves lists. This structure is especially useful for representing more complex data, such as a classroom layout where students are organized in rows.

> [!important]
> **Overview**
>
> A 2D list (or matrix) in Python represents a grid-like structure where each element of an outer list is itself a list. This is ideal for modeling arrangements like classroom rows or grids.

## Representing a Classroom with a 2D List

Imagine a classroom arranged in rows with four students per row. In Python, you can represent this structure with a 2D list where each sublist corresponds to a row of students:

```
classroom = [
    ["Sam", "Max", "Joe", "Anne"],
    ["Sofie", "Lisa", "Tim", "Sasha"],
    ["Claire", "Sara", "Leo", "Kim"],
    ["Zoe", "Guy", "Anna", "Eva"],
]
```

## Accessing Elements in a 2D List

To retrieve a specific student's name from the classroom, you need to determine their row and then the position within that row. For example, to access the student "Sara":

1.  "Sara" is in the third row. Since Python indexing starts at 0, the third row is at index 2.
2.  Within that row, "Sara" is the second element (index 1).

Here's how you can access "Sara" from the 2D list:

```
# Retrieve the student "Sara" from the classroom
student = classroom[2][1]
print(student)  # Output: Sara
```

This snippet demonstrates how to access an element in a 2D list by first selecting the appropriate row and then the specific element within that row.

## Practice with 2D Lists

Now that you've learned how to create and access elements in 2D lists, it's time to gain some hands-on practice. Experiment with different data structures by modifying rows and columns, and try retrieving elements based on various indices.

For more insights on working with Python data structures, consider exploring additional [Python documentation](https://docs.python.org/3/tutorial/datastructures.html) and [tutorials on data manipulation](https://www.programiz.com/python-programming/list).

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-basics/module/a115db9d-996c-4cfc-be27-9cfd7e6d77f5/lesson/8f230e73-dd88-4977-9471-bc72c558e188)**
>
> Watch video content
