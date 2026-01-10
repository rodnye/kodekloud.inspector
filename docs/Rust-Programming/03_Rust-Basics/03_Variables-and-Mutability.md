# Variables and Mutability - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Rust-Programming/Rust-Basics/Variables-and-Mutability)

---

## Table of Contents

- Variables and Mutability
  - Watch Video

---

## Content

Rust Programming

Rust Basics

# Variables and Mutability

Understanding the concept of mutability is essential for efficient programming. In computer science, mutability defines whether a variable’s value can be changed after its initialization. A mutable variable permits modifications, while an immutable one does not allow any changes once it is set.

Rust is designed with safety and concurrency in mind, which is why variables in Rust are immutable by default. This design decision encourages reliable code by preventing unexpected changes to data.

Consider the following Rust example that demonstrates the use of immutable variables:

```
fn main() {
    let y = 10;
    println!("The value of y is: {}", y);
    y = 20; // This line will cause a compilation error
    println!("The value of y is: {}", y);
}
```

If you compile this code, you will receive an error message similar to the following:

```
error[E0384]: cannot assign twice to immutable variable `y`
  |
2 |     let y = 10;
  |         ----- first assignment to `y`
4 |     y = 20;
  |     ^^^^^^ cannot assign twice to immutable variable
```

This compile-time error prevents bugs by ensuring that variable values do not change unexpectedly during the execution of your program.

> [!important]
> **Note**
>
> In Rust, immutability by default helps to ensure that your code remains more predictable and safe. This is especially important in concurrent programming scenarios.

However, there are situations where you need a variable that can change. Rust provides this flexibility by allowing you to declare mutable variables using the `mut` keyword. The example below shows how to modify the previous code to enable mutation:

```
fn main() {
    let mut y = 10;
    println!("The value of y is: {}", y);
    y = 20;
    println!("The value of y is: {}", y);
}
```

With the addition of `mut`, the variable `y` becomes mutable, allowing its value to be updated from 10 to 20. This not only ensures that your program compiles successfully, but it also improves code readability by clearly communicating the intent that `y` is designed to change.

For more insights on Rust and variable management, you can refer to the official [Rust Programming Language Book](https://doc.rust-lang.org/book/).

By understanding and properly managing variables and their mutability, you can write more secure and maintainable Rust code.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/rust/module/f232d417-91e4-49e7-b538-be7db1e23daf/lesson/452e7ec4-c30f-40dc-8d29-333d86102c32)**
>
> Watch video content
