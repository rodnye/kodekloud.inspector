# Default Generic Type Parameters - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Rust-Programming/Advanced-Features/Default-Generic-Type-Parameters)

---

## Table of Contents

- Default Generic Type Parameters
  - Understanding Generics in Rust
  - Operator Overloading in Rust
  - Example 1: Overloading the Plus Operator for Complex Numbers
  - Example 2: Overloading Addition for Different Types (Inches and Feet)
  - Summary
  - Watch Video

---

## Content

Rust Programming

Advanced Features

# Default Generic Type Parameters

In this article, we explore how Rust leverages generics and operator overloading to enable flexible and expressive code. We cover default generic type parameters and demonstrate operator overloading with practical examples.

## Understanding Generics in Rust

In Rust, generics serve as placeholders for types. When you see a generic parameter in a trait or function, it indicates that the precise type is not yet specified—it will be provided when the trait or function is used. Rust also supports default generic type parameters, where a default type is assumed if none is explicitly supplied. This feature simplifies code when the default type suffices.

## Operator Overloading in Rust

Operator overloading enables you to customize the behavior of standard operators such as the `+` operator for your custom types. While Rust natively supports operators for built-in types, you can extend this functionality to your own types by implementing traits like `Add` from the standard library.

![The image explains operator overloading in Rust, specifically using the "Add" trait to define the behavior of the "+" operator. It includes a brief description and a visual icon representing the concept.](https://kodekloud.com/kk-media/image/upload/v1752883752/notes-assets/images/Rust-Programming-Default-Generic-Type-Parameters/rust-operator-overloading-add-trait.jpg)

The `Add` trait is defined as follows:

```
trait Add<Rhs = Self> {
    type Output;
    fn add(self, rhs: Rhs) -> Self::Output;
}
```

Here, `Rhs` (right-hand side) defaults to the same type as `Self` if not explicitly specified. The `Output` associated type represents the result of the addition. In the `add` method, `self` refers to the left-hand operand, while `rhs` refers to the right-hand operand.

## Example 1: Overloading the Plus Operator for Complex Numbers

Consider a struct representing complex numbers with `real` and `imag` fields. We can overload the `+` operator to add two complex numbers by summing their corresponding parts. Below is the complete Rust example:

```
use std::ops::Add;


#[derive(Debug, Clone, Copy, PartialEq)]
struct ComplexNumber {
    real: f64,
    imag: f64,
}


impl Add for ComplexNumber {
    type Output = ComplexNumber; // The result is a new ComplexNumber


    fn add(self, other: ComplexNumber) -> ComplexNumber {
        ComplexNumber {
            real: self.real + other.real, // Sum the real parts
            imag: self.imag + other.imag, // Sum the imaginary parts
        }
    }
}


fn main() {
    let num1 = ComplexNumber { real: 3.0, imag: 4.0 };
    let num2 = ComplexNumber { real: 1.0, imag: 2.0 };


    let result = num1 + num2; // Use the overloaded + operator
    println!("Result: {:?}", result); // Expected output: ComplexNumber { real: 4.0, imag: 6.0 }
}
```

> [!important]
> **Note**
>
> Operator overloading in Rust is implemented through traits, promoting code reuse and clarity.

## Example 2: Overloading Addition for Different Types (Inches and Feet)

In this scenario, we demonstrate how to add two different measurement types: one representing inches and the other feet, with the result always expressed in inches. We define two simple structs, `Inches` and `Feet`, and implement the `Add` trait for them as shown below:

```
use std::ops::Add;


struct Inches(u32);
struct Feet(u32);


// Implement Add for Inches, specifying that we're adding Feet to Inches.
impl Add<Feet> for Inches {
    type Output = Inches;


    fn add(self, other: Feet) -> Inches {
        // Convert feet to inches (1 foot = 12 inches) before adding.
        Inches(self.0 + (other.0 * 12))
    }
}


fn main() {
    let length_in_inches = Inches(24); // 24 inches
    let length_in_feet = Feet(2);        // 2 feet


    let result = length_in_inches + length_in_feet; // Expected to add 24 inches and 2 feet
    println!("Result: {} inches", result.0);        // Expected output: 48 inches
}
```

> [!important]
> **Warning**
>
> When overloading operators with different types, ensure you apply the correct conversion logic. Incorrect conversions may lead to unexpected results.

## Summary

These examples demonstrate the power and flexibility of Rust's operator overloading mechanism and default generic type parameters. By customizing operator behavior through traits, you can write code that is both clean and expressive.

For further reading:

- [Rust Programming Language](https://www.rust-lang.org/)
- [Rust Documentation: Traits](https://doc.rust-lang.org/book/ch10-02-traits.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/rust/module/bff86fa1-7afc-44e5-b0ac-00b8be577bf8/lesson/0054ff69-127f-4c79-a4ee-f313d3a0c97e)**
>
> Watch video content
