# Bitwise Operators - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-Basics/Logic-and-Bit-Operations/Bitwise-Operators)

---

## Table of Contents

- Bitwise Operators
  - Bitwise AND (&)
  - Bitwise OR (|)
  - Bitwise XOR (^)
  - Bitwise NOT (~)
  - Shortcut Operators
  - Bit Shifting
  - Recap
  - Watch Video
    - Right Shift (>>)
    - Left Shift (<<)
    - Summary: Shifts and Arithmetic Operations

---

## Content

Python Basics

Logic and Bit Operations

# Bitwise Operators

In this article, we'll explore the bitwise operators available in Python. In addition to the familiar logical operators (AND, OR, NOT), Python provides bitwise operators that let you manipulate individual bits of integers. Understanding these operators is essential for optimizing certain algorithms and performing low-level data manipulation.

![The image displays bitwise operators: conjunction (&), disjunction (|), negation (~), and exclusive (^) with their respective symbols.](https://kodekloud.com/kk-media/image/upload/v1752883531/notes-assets/images/Python-Basics-Bitwise-Operators/frame_10.jpg)

## Bitwise AND (&)

The bitwise AND operator compares the binary representation of two integers bit by bit. When performing a bitwise AND between two integers, such as 15 and 22, Python evaluates each corresponding bit:

- 1 AND 0 yields 0.
- 1 AND 1 yields 1.
- 0 AND 1 yields 0.

For example, applying bitwise AND on 15 and 22 results in the integer 6.

![The image shows a binary addition of numbers 15 and 22, with bitwise operations and carry propagation illustrated in red and green boxes.](https://kodekloud.com/kk-media/image/upload/v1752883533/notes-assets/images/Python-Basics-Bitwise-Operators/frame_60.jpg)

When you execute the corresponding operation in your code, printing the result displays the integer 6.

## Bitwise OR (|)

The bitwise OR operator compares each pair of corresponding bits between two integers and returns 1 if at least one of the bits is 1. Consider the following example using the numbers 15 and 22:

```
print(15 | 22)
```

Here’s the breakdown for each bit (in 5-bit form):

- 0 OR 1 yields 1
- 1 OR 0 yields 1
- 1 OR 1 yields 1
- 1 OR 1 yields 1
- 1 OR 0 yields 1
- The remaining (higher) bits yield 0

The resulting binary sequence 11111 corresponds to the integer 31, which is printed when you run the code.

## Bitwise XOR (^)

The bitwise exclusive OR (XOR) operator returns 1 if exactly one of the bits is 1; it returns 0 if both bits are the same (both 0 or both 1). For example:

- 1 XOR 0 yields 1.
- 1 XOR 1 yields 0.
- 0 XOR 1 yields 1.

Using these principles, when the XOR operation is applied to our example values, the resulting bits correspond to the integer 25.

## Bitwise NOT (~)

The bitwise NOT operator is a unary operator that inverts every bit in an integer. This means every 0 becomes 1 and every 1 becomes 0. For instance, applying the bitwise NOT operator to a given integer in our example returns -23.

> [!important]
> **Note**
>
> Keep in mind that bitwise NOT (~) is different from the logical NOT operator. The result for bitwise NOT is based on the two's complement representation of integers in Python.

## Shortcut Operators

Python provides shortcut operators for bitwise operations to make your code cleaner. Instead of writing:

```
bit1 = bit1 & 22
bit1 = bit1 | 22
bit1 = bit1 ^ 22
```

you can use:

```
bit1 &= 22
bit1 |= 22
bit1 ^= 22
```

These shortcut operators perform the operation and assignment in a single step.

## Bit Shifting

Bit shifting allows you to move the bits of an integer to the left or right. This operation is useful for efficiently performing multiplication or division by powers of 2.

### Right Shift (>>)

The right shift operator ">>" moves all bits to the right by a specified number of positions. For example:

```
print(22 >> 1)
```

This shifts the bits of 22 one position to the right, which divides the number by 2 (using integer division) and results in 11. Shifting by two positions:

```
print(22 >> 2)
```

divides the number by 4, yielding 5.

### Left Shift (<<)

Conversely, the left shift operator "<<" moves the bits to the left. For instance:

```
print(22 << 1)
```

shifts the bits of 22 one position to the left, multiplying the number by 2 and resulting in 44.

### Summary: Shifts and Arithmetic Operations

The relationship between shifts and arithmetic operations can be summarized as follows:

- A right shift by 1 is equivalent to integer division by 2.
- A right shift by 2 is like integer division by 4.
- A left shift by 1 multiplies the number by 2.
- A left shift by 2 multiplies the number by 4.

Here is a concise demonstration:

```
# Arithmetic operations
print(22 // 2)
print(22 // 4)
print(22 * 2)
print(22 * 4)


# Corresponding bit shifts
print(22 >> 1)
print(22 >> 2)
print(22 << 1)
print(22 << 2)
```

## Recap

- **Logical operators (AND, OR, NOT)** evaluate boolean expressions.
- **Bitwise operators (AND, OR, XOR, NOT)** work on individual bits of integers, returning results in binary form.
- Bitwise operators cannot be applied to floating-point numbers.
- **Bit shifting** (right ">>" and left "<<") effectively performs division or multiplication by powers of 2.

![The image explains logical and bitwise operators, including their functions and examples, such as `and`, `or`, `not`, `&`, `|`, `^`, `~`, `<<`, and `>>`.](https://kodekloud.com/kk-media/image/upload/v1752883534/notes-assets/images/Python-Basics-Bitwise-Operators/frame_290.jpg)

That concludes our detailed exploration of Python's bitwise operators. In the next article, we will continue to cover additional aspects of Python's core functionality.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-basics/module/24b7c33f-d6b5-4346-9b97-739cf4a7e698/lesson/c69cf016-3d7e-42ac-9a20-3097cea2c14f)**
>
> Watch video content
