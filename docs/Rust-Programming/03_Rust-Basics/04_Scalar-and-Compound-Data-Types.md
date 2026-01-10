# Scalar and Compound Data Types - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Rust-Programming/Rust-Basics/Scalar-and-Compound-Data-Types)

---

## Table of Contents

- Scalar and Compound Data Types
  - Scalar Types
  - Compound Types
  - Summary
  - Watch Video
    - Integers
    - Floating-Point Numbers
    - Booleans
    - Characters
    - Tuples
    - Arrays
      - Out-of-Bounds Access
      - Handling Invalid Access Gracefully

---

## Content

Rust Programming

Rust Basics

# Scalar and Compound Data Types

Rust is a statically typed language, which means the compiler must know the type of every variable at compile time. In this guide, we explore Rust's built-in data types, categorized into two groups: scalar types and compound types. Understanding these types is fundamental for writing safe and efficient Rust code.

## Scalar Types

Scalar types represent a single value. Rust offers four primary scalar types: integers, floating-point numbers, booleans, and characters.

### Integers

Integers are numbers without fractional components. Rust provides several integer types, which can be either signed or unsigned. Signed integers can represent both positive and negative numbers, while unsigned integers represent only positive values.

![The image is a diagram showing the classification of integers into "Signed" and "Unsigned" categories, with signed integers including both positive and negative values, and unsigned integers including only positive values.](https://kodekloud.com/kk-media/image/upload/v1752883991/notes-assets/images/Rust-Programming-Scalar-and-Compound-Data-Types/integer-classification-signed-unsigned-diagram.jpg)

Below is a visual representation of Rust's integer types. By default, Rust uses the `i32` type (a 32-bit signed integer), but you can specify other types as needed.

![The image shows a table of Rust integer types categorized by bit length, including signed (i8, i16, i32, i64, i128, isize) and unsigned (u8, u16, u32, u64, u128, usize) integers, with 32-bit marked as the default.](https://kodekloud.com/kk-media/image/upload/v1752883992/notes-assets/images/Rust-Programming-Scalar-and-Compound-Data-Types/rust-integer-types-table.jpg)

Here's an example demonstrating various integer literals in different numerical bases:

```
fn main() {
    let decimal = 98_222;    // Decimal (base 10)
    let hex = 0xff;          // Hexadecimal (base 16)
    let octal = 0o77;        // Octal (base 8)
    let binary = 0b1111_0000; // Binary (base 2)
    let byte = b'A';         // Byte literal (u8 only)


    println!("Decimal: {:?}", decimal);
    println!("Hex: {:?}", hex);
    println!("Octal: {:?}", octal);
    println!("Binary: {:?}", binary);
    println!("Byte: {:?}", byte);
}
```

### Floating-Point Numbers

Floating-point numbers include a fractional component. Rust has two floating-point types: `f32` and `f64`. The default is `f64` due to its higher precision.

```
fn main() {
    let x = 2.0;      // f64 by default
    let y: f32 = 3.0; // f32 with explicit type annotation
}
```

### Booleans

The boolean type, `bool`, can hold one of two values: `true` or `false`. These values are typically used in conditional expressions and logic.

```
fn main() {
    let t = true;
    let f: bool = false; // Explicit type annotation for clarity
}
```

### Characters

The `char` type represents a Unicode scalar value and occupies four bytes of memory. It supports a vast range of characters beyond basic ASCII.

```
fn main() {
    let c = 'z';
    let z: char = 'Z';       // Explicit type annotation
    let heart_eyed_cat = '😻';
}
```

## Compound Types

Compound types group multiple values into one type. Rust provides two primitive compound types: tuples and arrays.

### Tuples

Tuples allow you to combine values of different types into a single compound type. Once declared, the length of a tuple cannot change.

Consider the following example, where a tuple is declared with an `i32`, an `f64`, and a `u8`:

```
fn main() {
    let tup: (i32, f64, u8) = (500, 6.4, 1);


    // Destructuring the tuple into individual variables
    let (x, y, z) = tup;
    println!("The value of y is: {}", y);


    // Accessing tuple elements directly using dot notation
    let five_hundred = tup.0;
    let six_point_four = tup.1;
    let one = tup.2;
}
```

### Arrays

Arrays in Rust are collections of values of the same type with a fixed length. Array indexing starts at 0 and goes up to the length of the array minus one.

Below is an example of creating an array and accessing its elements:

```
fn main() {
    let a = [1, 2, 3, 4, 5];


    let first = a[0];
    let second = a[1];
    println!("The first element is: {}", first);
    println!("The second element is: {}", second);
}
```

#### Out-of-Bounds Access

Accessing an array element at an index outside its bounds will compile successfully but result in a runtime panic. For example, attempting to access index 6 in an array of five elements causes a panic.

```
fn main() {
    let a = [1, 2, 3, 4, 5];
    let index = 6;
    let element = a[index];


    println!("The value of the element at index {} is: {}", index, element);
}
```

> [!important]
> **Warning**
>
> Accessing an invalid array index will cause your program to panic at runtime. Rust performs runtime checks to ensure memory safety. Always ensure your indices are within range.

#### Handling Invalid Access Gracefully

To safely access array elements, use the `get` method, which returns an `Option`. This allows you to handle out-of-bound indices without causing a runtime panic.

```
fn main() {
    let a = [1, 2, 3, 4, 5];
    let index = 3;


    match a.get(index) {
        Some(element) => println!("The value of the element at index {} is: {}", index, element),
        None => println!("Invalid index!"),
    }
}
```

## Summary

In this lesson, we've covered the basics of Rust's data types:

- **Scalar Types:**
  - **Integers:** Numbers without fractional parts, with support for various formats and both signed and unsigned integers.
  - **Floating-Point Numbers:** Numbers with decimals, available as `f32` and `f64`, with `f64` as the default.
  - **Booleans:** The `bool` type, representing `true` or `false`.
  - **Characters:** The `char` type for Unicode scalar values.

- **Compound Types:**
  - **Tuples:** Fixed-length collections of values of different types.
  - **Arrays:** Fixed-length collections of elements of the same type, including techniques for handling out-of-bound access.

Understanding these types is essential for mastering Rust and serves as the building blocks for writing robust, safe, and efficient applications.

For more detailed insights on Rust's data handling and advanced topics, explore additional [Rust documentation](https://doc.rust-lang.org/book/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/rust/module/f232d417-91e4-49e7-b538-be7db1e23daf/lesson/f025239d-bafa-4f21-b96c-859757f73ba5)**
>
> Watch video content
