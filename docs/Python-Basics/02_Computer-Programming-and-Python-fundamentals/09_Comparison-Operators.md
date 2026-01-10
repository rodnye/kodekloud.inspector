# Comparison Operators - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-Basics/Computer-Programming-and-Python-fundamentals/Comparison-Operators)

---

## Table of Contents

- Comparison Operators
  - Equal Operator (==)
  - Not Equal Operator (!=)
  - Greater Than Operator (>)
  - Greater Than or Equal To Operator (>=)
  - Less Than Operator (<)
  - Less Than or Equal To Operator (<=)
  - Watch Video

---

## Content

Python Basics

Computer Programming and Python fundamentals

# Comparison Operators

In this lesson, we'll explore Python's comparison operators, which are essential for evaluating conditions in your code. Unlike logical operators that combine boolean conditions, comparison operators directly compare values and return either True or False.

![The image displays various comparison operators: "==", "!=", ">", ">=", "<", and "<=", used in programming for evaluating conditions.](https://kodekloud.com/kk-media/image/upload/v1752883511/notes-assets/images/Python-Basics-Comparison-Operators/frame_10.jpg)

These six comparison operators enable you to perform a variety of checks within your programs:

> [!important]
> **Note**
>
> Comparison operators are fundamental building blocks in Python that help control the flow of your applications. Understanding how they work is crucial for writing effective conditional code.

## Equal Operator (==)

The equal operator checks whether both operands are equal. When used in a conditional expression, it evaluates to True if the two values are the same.

```
print(2 == 2)                # True because 2 equals 2
print(2 == 4)                # False because 2 does not equal 4
print("Hello!" == "Hello!")  # True because the strings are identical
print("Hello!" == "Goodbye!")# False because the strings differ
print(4 == (2 * 2))          # True because 4 equals 2 multiplied by 2
```

## Not Equal Operator (!=)

The not equal operator returns True if the operands are not equal. It is particularly useful for conditions where inequality needs to be verified.

```
print(2 != 2)                # False because 2 equals 2
print(2 != 4)                # True because 2 does not equal 4
print("Hello!" != "Hello!")  # False because the strings are identical
print("Hello!" != "Goodbye!")# True because the strings differ
print(4 != (2 * 2))          # False because 4 equals 2 multiplied by 2
```

## Greater Than Operator (>)

The greater than operator checks if the left-hand value is greater than the right-hand value. This comparison is frequently used when determining sizes, weights, or other numerical relationships.

```
print(4 > 2)  # True because 4 is greater than 2
print(2 > 4)  # False because 2 is not greater than 4
print(2 > 2)  # False because 2 is not greater than 2


cost_of_apple = 2
cost_of_banana = 3
print(cost_of_apple > cost_of_banana)  # False because 2 is not greater than 3
```

## Greater Than or Equal To Operator (>=)

This operator verifies if the left-hand operand is greater than or equal to the right-hand operand. It is helpful for inclusive comparisons.

```
print(4 >= 2)  # True because 4 is greater than 2
print(2 >= 4)  # False because 2 is not greater than 4
print(2 >= 2)  # True because 2 equals 2
```

## Less Than Operator (<)

The less than operator checks whether the left-hand operand is smaller than the right-hand operand. It is commonly used in range validations and similar conditions.

```
print(4 < 2)  # False because 4 is not less than 2
print(2 < 4)  # True because 2 is less than 4
print(2 < 2)  # False because 2 is not less than 2


cost_of_apple = 2
cost_of_banana = 3
print(cost_of_apple < cost_of_banana)  # True because 2 is less than 3
```

## Less Than or Equal To Operator (<=)

This operator tests if the left-hand operand is less than or equal to the right-hand operand. It is useful when equality is considered along with a smaller value.

```
print(4 <= 2)  # False because 4 is not less than or equal to 2
print(2 <= 4)  # True because 2 is less than 4
print(2 <= 2)  # True because 2 equals 2
```

Comparison operators are vital for evaluating conditions and directing the flow of your Python programs. Practice these examples to reinforce your understanding of how to use them effectively.

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-basics/module/4178f96e-8dcd-46a2-a9c9-f65a8c9c73b0/lesson/67201484-5cee-4377-a872-0e85fd7cd6ee)**
>
> Watch video content
