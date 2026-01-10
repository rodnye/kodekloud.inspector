# Iterating Lists - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-Basics/Lists/Iterating-Lists)

---

## Table of Contents

- Iterating Lists
  - Step 1: Calculate the Total Sum of Ages
  - Step 2: Compute the Average Age
  - Watch Video

---

## Content

Python Basics

Lists

# Iterating Lists

In this lesson, we will explore how to use a for loop to iterate through a list in Python to calculate the average age from a dataset. The process involves summing all the ages and then dividing that total by the number of ages using the built-in len() function.

## Step 1: Calculate the Total Sum of Ages

Start by initializing a variable called total to zero. Then, iterate over each element in the list to accumulate the sum of the ages:

```
ages = [56, 72, 24, 46]
total = 0
for age in ages:
    total += age
```

During each iteration, the value of the current age is added to the total. After the loop completes, the total sum of the ages becomes 198.

## Step 2: Compute the Average Age

After obtaining the total sum, calculate the average by dividing the total by the number of items in the list:

```
average = total / len(ages)
print(average)
# Output:
# 49.5
```

> [!important]
> **Note**
>
> In this example, the average age is computed by dividing the sum of ages (198) by the length of the list (4), which results in an average age of 49.5.

That’s all for this lesson. More exciting topics and tutorials will be covered soon—stay tuned for further updates on Python programming techniques!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-basics/module/a115db9d-996c-4cfc-be27-9cfd7e6d77f5/lesson/0340fa6d-022a-4e45-a628-39b26b33a538)**
>
> Watch video content
