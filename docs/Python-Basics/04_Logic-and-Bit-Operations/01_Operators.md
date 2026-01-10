# Operators - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-Basics/Logic-and-Bit-Operations/Operators)

---

## Table of Contents

- Operators
  - Watch Video

---

## Content

Python Basics

Logic and Bit Operations

# Operators

When developing Python programs, it is essential to verify that certain conditions hold true. In this lesson, we compare two variables, age1 and age2, which represent ages, and then display corresponding messages to the console based on their values. This example demonstrates the use of logical operators to control the program flow.

For instance, if both ages are 18 or older, the program prints "You are both adults". If only one of the ages is 18 or older, it prints "One of you is an adult". Otherwise, it shows "You are both children".

Below is the complete Python code that illustrates these conditional checks using logical operators:

```
age1 = 24
age2 = 16


if age1 >= 18 and age2 >= 18:
    print("You are both adults")
elif age1 >= 18 or age2 >= 18:
    print("One of you is an adult")
else:
    print("You are both children")
```

The first condition uses the `and` operator to determine if both `age1` and `age2` are greater than or equal to 18. The `and` operator returns True only when both conditions are met; otherwise, it yields False, and the following code blocks are evaluated accordingly.

![The image shows a truth table for the logical "AND" operation with combinations of "True" and "False" values.](https://kodekloud.com/kk-media/image/upload/v1752883535/notes-assets/images/Python-Basics-Operators/frame_60.jpg)

The next condition employs the `or` operator. This operator returns True if at least one of the conditions is True. In this scenario, if either `age1` or `age2` is 18 or older, the program will execute the corresponding code block. Only when both conditions are False does the program fall through to the final block.

![The image shows a truth table for the logical "or" operation, illustrating combinations of "True" and "False" values.](https://kodekloud.com/kk-media/image/upload/v1752883536/notes-assets/images/Python-Basics-Operators/frame_90.jpg)

> [!important]
> **Understanding Logical Operators**
>
> Logical operators like `and`, `or`, and `not` are fundamental in programming. They help you combine or invert conditions to build complex decision-making logic in your code.

Another useful logical operator in Python is `not`. This operator reverses the truth value of a boolean expression. For example, if we want to display "You are not hungry" when the variable `is_hungry` is False, we can check this condition as follows:

```
is_hungry = False
if not is_hungry:
    print("You are not hungry")
```

Since `is_hungry` is False, the expression `not is_hungry` evaluates to True, and the message is printed.

That’s all for this lesson. Happy coding, and see you in the next article!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-basics/module/24b7c33f-d6b5-4346-9b97-739cf4a7e698/lesson/bcb63a16-5dd1-4ba2-b360-ed842918f1cd)**
>
> Watch video content
