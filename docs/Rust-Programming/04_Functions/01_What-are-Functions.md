# What are Functions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Rust-Programming/Functions/What-are-Functions)

---

## Table of Contents

- What are Functions
  - Defining Functions in Rust
  - A Simple Function Example
  - Watch Video

---

## Content

Rust Programming

Functions

# What are Functions

In this lesson, you'll learn how to define functions in Rust, work with parameters, return values, and understand the differences between statements and expressions. Functions are essential building blocks that allow you to break your code into modular, reusable units, making your programs easier to manage and maintain.

Think of functions as small machines: you provide inputs to the function, it processes the data, and then produces an output. For example, a coffee machine receives water and coffee beans (inputs), processes them, and then delivers a cup of coffee (output). This analogy perfectly encapsulates how functions operate in programming.

## Defining Functions in Rust

In Rust, functions are defined using the `fn` keyword, followed by the function name, parameters (if any) enclosed in parentheses, and a body enclosed in curly braces. Below is a basic example of a function definition:

```
fn function_name() {
    // code to run
}
```

## A Simple Function Example

Every Rust program starts with the `main` function, which serves as the entry point. In the example below, the `main` function calls another function named `greet`. This demonstrates how functions can be separated for clarity and reusability.

```
// main.rs
fn main() {
    greet();
}


fn greet() {
    println!("Hello, world!");
}
```

In the code above:

- The `main` function is the starting point for execution.
- The `greet` function is defined without parameters (as indicated by the empty parentheses) and contains a single instruction that prints "Hello, world!" to the console using the `println!` macro.

When you run this program, the output will be:

```
Hello, world!
```

> [!important]
> **Note**
>
> The simple `greet` function illustrated above is an excellent starting point for understanding function definitions in Rust. In upcoming sections, we will expand on this foundation to include functions with parameters and detailed return values.

In the following sections, you'll dive deeper into how to define functions with parameters and how to work with return values, further enhancing the modularity and flexibility of your Rust programs.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/rust/module/7ec396a4-7aea-4d77-abd2-48f4cee7fd94/lesson/0ed9be45-d7b0-46bf-a82c-37b17cfbc665)**
>
> Watch video content
