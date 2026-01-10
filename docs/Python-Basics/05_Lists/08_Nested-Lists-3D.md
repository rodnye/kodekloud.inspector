# Nested Lists 3D - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-Basics/Lists/Nested-Lists-3D)

---

## Table of Contents

- Nested Lists 3D
  - Watch Video

---

## Content

Python Basics

Lists

# Nested Lists 3D

Python's flexibility with lists extends beyond simple 2D arrays, allowing you to create sophisticated 3D list structures. In this guide, we will demonstrate how to model an entire school building using a 3D list, where each classroom is represented as a floor. Every classroom (i.e., floor) is organized into rows of students, making it easy to visualize the layout of the building.

Each element in the main list represents a classroom. Inside each classroom, every sublist corresponds to a row of students, and each element within that sublist represents an individual student.

Below is a Python code snippet that defines a 3D list to model our school:

```
school = [
    [
        ["Sara", "Kim", "Anne", "Eva"],
        ["Johan", "Collin", "Sam", "Alex"],
        ["Luke", "Sara", "Haley", "Jennifer"],
        ["Katy", "Mara", "Max", "Roy"],
    ],
    [
        ["Anne", "Leo", "Sasha", "Tim"],
        ["Claire", "Guy", "Eva", "Zoe"],
        ["Lisa", "Max", "Evan", "Chloe"],
        ["Brent", "Sam", "Sarah", "Anne"],
    ],
    [
        ["Maria", "Julian", "Chris", "Tom"],
        ["Zoe", "Anna", "Kim", "Leo"],
        ["Vera", "Pim", "Leo", "Guy"],
        ["Anne", "Sofie", "Max", "Joe"],
    ],
    [
        ["Sam", "Max", "Joe", "Anne"],
        ["Sofie", "Lisa", "Tim", "Sasha"],
        ["Claire", "Sara", "Leo", "Kim"],
        ["Zoe", "Guy", "Anna", "Eva"],
    ],
]
```

This multi-dimensional list, sometimes described as a "cube," organizes the school structure as follows:

- **Classrooms (Floors):** The main list elements.
- **Rows:** Sublists within each classroom.
- **Student Seats:** Individual elements within each row.

> [!important]
> **Note**
>
> In Python, list indices start at 0. This zero-indexing is crucial when accessing elements in nested lists.

Suppose you want to retrieve the student named Max from this 3D list. In our example, Max is located in the second classroom (using index 1), in the third row (index 2), and at the second seat in that row (index 1). You can access the student with the following Python code:

```
student = school[1][2][1]
print(student)  # This will output: Max
```

This example illustrates not only how to structure 3D lists but also how to access deeply nested elements efficiently.

> [!important]
> **Practice Tip**
>
> Try modifying the list or accessing different elements to strengthen your understanding of 3D lists in Python. Experiment with different indices to explore the school building from various perspectives!

By integrating this approach into your projects, you can manage more complex data structures while keeping your code organized and easy to maintain. Feel free to expand on this example with additional functionalities such as searching, updating student names, or even modeling more complex school scenarios.

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-basics/module/a115db9d-996c-4cfc-be27-9cfd7e6d77f5/lesson/d2df49fd-8f86-41ae-a778-8fcca4b87f28)**
>
> Watch video content
