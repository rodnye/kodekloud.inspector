# List Methods - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-Basics/Lists/List-Methods)

---

## Table of Contents

- List Methods
  - Append and Insert
  - Swapping Values in a List
  - Sorting and Reversing Lists
  - Summary
  - Watch Video

---

## Content

Python Basics

Lists

# List Methods

In this article, we dive into several built-in Python list methods designed for effective data manipulation. List methods are special functions tied to list objects. Unlike standalone functions, these methods directly modify or work with the list they belong to, making them essential for managing and updating list items.

## Append and Insert

Python offers two primary methods for adding elements to a list: `append` and `insert`.

- The `append` method adds a new element to the **end** of the list.
- The `insert` method places a new element at a **specific index**, shifting the current and subsequent items to the right.

For example, to add "Spain" to the end of the list and insert "Italy" at index 2, use the following code:

```
countries = ["USA", "Canada", "India"]
countries.append("Spain")
countries.insert(2, "Italy")
```

> [!important]
> **Tip**
>
> Ensure that you choose between `append` and `insert` based on whether the element's position matters in your program.

## Swapping Values in a List

Swapping values in a list can be handled in a couple of different ways. One conventional method involves using a temporary variable:

```
countries = ["USA", "Canada", "India"]
temp = countries[0]
countries[0] = countries[1]
countries[1] = temp
```

Python also allows a succinct technique to swap two items without an extra variable:

```
countries[0], countries[1] = countries[1], countries[0]
```

This single line of code simultaneously assigns new positions to the first two items in the list, making your code both efficient and clean.

## Sorting and Reversing Lists

Two additional valuable methods for handling lists are `sort` and `reverse`.

- The `sort` method arranges the elements of the list in ascending order. This applies to both numeric (from lowest to highest) and string (alphabetical) data. Note that the original list is updated, and no new sorted list is returned. For example:

  ```
  ages = [56, 72, 24, 46]
  ages.sort()
  print(ages)  # Output: [24, 46, 56, 72]
  ```

- The `reverse` method inverts the order of the list elements, making the first element last and vice versa. Here’s how you can use it:

  ```
  ages = [56, 72, 24, 46]
  ages.reverse()
  print(ages)
  ```

When executed, the `reverse` method flips the order of elements relative to their original sequence.

## Summary

<table> <tr> <th>Method</th> <th>Purpose</th> <th>Example</th> </tr> <tr> <td>append</td> <td>Adds an element to the end of the list.</td> <td><code>countries.append("Spain")</code></td> </tr> <tr> <td>insert</td> <td>Adds an element at a specified index.</td> <td><code>countries.insert(2, "Italy")</code></td> </tr> <tr> <td>sort</td> <td>Sorts the list in ascending order.</td> <td><code>ages.sort()</code></td> </tr> <tr> <td>reverse</td> <td>Reverses the order of the list elements.</td> <td><code>ages.reverse()</code></td> </tr> </table>

This concludes our comprehensive discussion on built-in Python list methods. Experiment with these techniques to enhance your programming skills and efficiently manage your data with Python lists.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-basics/module/a115db9d-996c-4cfc-be27-9cfd7e6d77f5/lesson/4d2e93ca-94d6-40e0-a0c8-dee625f38c23)**
>
> Watch video content
