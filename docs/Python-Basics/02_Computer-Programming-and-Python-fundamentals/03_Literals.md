# Literals - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-Basics/Computer-Programming-and-Python-fundamentals/Literals)

---

## Table of Contents

- Literals
  - Integer Literals
  - Floating-Point Numbers
  - String Literals
  - Boolean Literals
  - Summary
  - Watch Video
    - Octal Numbers
    - Hexadecimal Numbers

---

## Content

Python Basics

Computer Programming and Python fundamentals

# Literals

In this lesson, we explore Python literals and how they embed fixed data directly into your code. A literal is a data value explicitly defined in your source code. For instance, numbers like 200 and -89, or strings such as "hello" and "Python" are literals. Identifiers like name, c, h, or print are not literals because their values are determined during runtime.

Python categorizes literals into four primary types: integers, floating-point numbers, strings, and booleans.

---

## Integer Literals

An integer literal represents a whole number without a fractional part. Examples include 200, 1289901, -90, and 1_000_000. The underscore in numbers such as 1_000_000 improves readability; Python ignores these underscores when evaluating the value.

![The image lists types of literals, focusing on integers, with examples like 200, 1298901, -90, and 1_000_000.](https://kodekloud.com/kk-media/image/upload/v1752883512/notes-assets/images/Python-Basics-Literals/frame_50.jpg)

Python also supports octal and hexadecimal integer representations.

### Octal Numbers

Octal numbers in Python are indicated by a leading `0o` (or simply `0` in older notations). To compute the value of an octal number, each digit is multiplied by 8 raised to the power corresponding to its position (with the rightmost digit at position 0). For instance, with an octal number:

- The weights are calculated as follows:
  - 8² = 64
  - 8¹ = 8
  - 8⁰ = 1

Each digit is then multiplied by its positional weight and summed to determine the final value.

![The image explains literal types, focusing on octal numbers, with an example "0o123" and powers of eight (8², 8¹, 8⁰) shown.](https://kodekloud.com/kk-media/image/upload/v1752883513/notes-assets/images/Python-Basics-Literals/frame_80.jpg)

### Hexadecimal Numbers

Hexadecimal numbers function similarly to octal numbers but use base 16. They always start with `0x`. The positional weights are based on powers of 16:

- 16² = 256
- 16¹ = 16
- 16⁰ = 1

For example, consider the hexadecimal literal `0x123`:

- Leftmost digit multiplied by 256,
- The next digit by 16, and
- The rightmost digit by 1,  
  resulting in the calculation:

(1 × 256) + (2 × 16) + (3 × 1) = 256 + 32 + 3 = 291

![The image explains literal types, focusing on hexadecimal numbers, with an example of "0x123" and its positional values (16², 16¹, 16⁰).](https://kodekloud.com/kk-media/image/upload/v1752883514/notes-assets/images/Python-Basics-Literals/frame_130.jpg)

---

## Floating-Point Numbers

Floating-point literals represent real numbers that include a decimal point. They denote fractional values and can also be expressed using scientific notation (using the letter E) to represent very large or very small numbers efficiently.

---

## String Literals

String literals handle textual data in Python. To define a string, enclose the text in either single (`'`) or double (`"`) quotes. This differentiation allows Python to easily distinguish text from other data types.

For example, both of these string definitions are valid:

```
'Hello! "Python" is cool'
"Hello! 'Python' is cool"
```

If you need to use matching quotes within the string, alternate between single and double quotes or use the escape character (`\`):

```
"Hello! \"Python\" is cool"
```

> [!important]
> **Note**
>
> When working with strings, always choose a quoting style that minimizes the need for escaping characters. This makes your code cleaner and more readable.

---

## Boolean Literals

Boolean literals represent one of two truth values: `True` or `False`. In certain contexts, such as when interfacing with external data systems, booleans can also be represented numerically, where `1` indicates `True` and `0` indicates `False`.

---

## Summary

Below is a quick summary of Python literals:

- **Numbers:**
  - **Integers:** Whole numbers that can be expressed in decimal, octal (with a `0o` prefix), or hexadecimal (with a `0x` prefix) formats.
  - **Floating-point:** Numbers that contain a decimal point and can also be represented using scientific notation.

- **Strings:**
  - Enclosed in single or double quotes.
  - Use alternating quotes or escape characters to include quotes within strings.

- **Booleans:**
  - Represent truth values with `True` or `False`.
  - Numerical representations of booleans can also be used in certain contexts.

![The image explains literals in programming, categorizing them into numbers, strings, and booleans, with examples for each type, including integers, quotes, and true/false values.](https://kodekloud.com/kk-media/image/upload/v1752883516/notes-assets/images/Python-Basics-Literals/frame_250.jpg)

That concludes our lesson on Python literals. Practice what you've learned through available hands-on exercises to solidify your understanding.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-basics/module/4178f96e-8dcd-46a2-a9c9-f65a8c9c73b0/lesson/bbf32558-e044-44e3-b893-427dc5421bdb)**
>
> Watch video content
