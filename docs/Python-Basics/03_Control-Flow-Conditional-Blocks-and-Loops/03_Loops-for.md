# Loops for - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-Basics/Control-Flow-Conditional-Blocks-and-Loops/Loops-for)

---

## Table of Contents

- Loops for
  - Using a For Loop with range()
  - Breaking Out of a Loop
  - Skipping Iterations with continue
  - Recap
  - Final Thoughts
  - Watch Video

---

## Content

Python Basics

Control Flow Conditional Blocks and Loops

# Loops for

A for loop is a fundamental control structure in Python that allows you to execute a block of code repeatedly for each element in an iterable. In this guide, we will explore how to use a for loop with the range() function, how to exit a loop prematurely using the break keyword, and how to skip specific iterations with the continue keyword.

## Using a For Loop with range()

The range() function generates a sequence of numbers. In the following example, `range(10)` produces numbers from 0 to 9. The variable `i` automatically takes on each value in the sequence, and the loop prints each number:

```
for i in range(10):
    print("i is:", i)
```

Expected output:

```
i is: 0
i is: 1
i is: 2
i is: 3
i is: 4
i is: 5
i is: 6
i is: 7
i is: 8
i is: 9
```

You can customize the iteration by specifying a starting value in the range() function if you need the sequence to begin at a number other than 0.

## Breaking Out of a Loop

By default, a for loop continues until it has gone through the entire sequence. However, if you want to stop the loop early based on a condition (for example, when `i` equals 2), you can combine an if statement with the break keyword.

Consider this standard loop without interruption:

```
for i in range(5):
    print("i is:", i)
```

Output:

```
i is: 0
i is: 1
i is: 2
i is: 3
i is: 4
```

Now, to exit the loop when `i` equals 2, modify the code as follows:

```
for i in range(5):
    if i == 2:
        break
    print("i is:", i)
```

Output:

```
i is: 0
i is: 1
```

When `i` becomes 2, the condition is met and the break statement terminates the loop immediately.

> [!important]
> **Note**
>
> Remember that using break will exit the loop entirely, so any code below the break statement will not be executed for the current iteration.

## Skipping Iterations with continue

Sometimes, you may want to skip only the current iteration of a loop instead of terminating it completely. The continue keyword allows you to do just that by skipping the rest of the code inside the loop for that particular iteration and moving on to the next one.

In the following example, the iteration is skipped when `i` equals 2:

```
for i in range(5):
    if i == 2:
        continue
    print("i is:", i)
```

Output:

```
i is: 0
i is: 1
i is: 3
i is: 4
```

When the loop encounters `i` equal to 2, the continue statement causes Python to skip the print statement for that iteration.

> [!important]
> **Tip**
>
> Use continue when you simply want to omit certain iterations without breaking the entire loop. This helps to keep the loop structure intact while filtering out unwanted cases.

## Recap

| Concept          | Description                                                                    | Example                     |
| ---------------- | ------------------------------------------------------------------------------ | --------------------------- |
| For Loop         | Iterates over each element in an iterable.                                     | `for i in range(10):`       |
| Range Function   | Generates a sequence of numbers.                                               | `range(10)` produces 0 to 9 |
| Break Keyword    | Exits the loop immediately when a specific condition is met.                   | `if i == 2: break`          |
| Continue Keyword | Skips the current iteration and proceeds to the next one in the loop sequence. | `if i == 2: continue`       |

## Final Thoughts

For loops are essential for iterating over sequences and automating repetitive tasks in Python. By mastering the use of `range()`, `break`, and `continue`, you can write more efficient and cleaner code. Start practicing these concepts with hands-on exercises to reinforce your learning and boost your Python programming skills.

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-basics/module/87023015-df32-4bcb-a972-659f3e76b1d1/lesson/090ca7ec-b094-4840-8dce-424e236fc372)**
>
> Watch video content
