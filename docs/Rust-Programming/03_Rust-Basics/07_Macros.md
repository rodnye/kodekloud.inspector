# Macros - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Rust-Programming/Rust-Basics/Macros)

---

## Table of Contents

- Macros
  - A Simple Macro Example
  - Macros with Arguments
  - Practical Use Cases of Macros
  - Watch Video
  - Practice Lab
    - Logging Macros
    - The println! Macro

---

## Content

Rust Programming

Rust Basics

# Macros

In this guide, we delve into one of Rust's most powerful features: macros. Macros enable developers to write cleaner and more efficient code by generating code at compile time—a technique known as metaprogramming. This comprehensive Rust macros tutorial covers both basic and practical examples to help you reduce boilerplate code, design domain-specific languages (DSLs), and simplify repetitive tasks.

![The image contains a text box explaining that macros in Rust are a way of writing code that writes other code, known as metaprogramming.](https://kodekloud.com/kk-media/image/upload/v1752883990/notes-assets/images/Rust-Programming-Macros/rust-macros-metaprogramming-explanation.jpg)

Macros in Rust come primarily in two forms: declarative and procedural. In this article, we focus on declarative macros, which use the `macro_rules!` keyword. Declarative macros are the most commonly used macros in Rust.

> [!important]
> **Did You Know?**
>
> Declarative macros allow you to define pattern-matching rules that generate code, making your codebase easier to maintain.

## A Simple Macro Example

Consider a basic macro named `greet` that prints a greeting message. The following example shows how a macro can expand into a `println!` statement:

```
macro_rules! greet {
    () => {
        println!("Hello, Rustaceans!");
    };
}


fn main() {
    greet!();
}
```

When you run this code, the `greet!()` macro expands to the `println!` statement, printing the greeting "Hello, Rustaceans!" to the console.

## Macros with Arguments

Enhance the flexibility of your macros by allowing them to accept arguments. The updated `greet` macro below demonstrates how to receive an expression, such as a literal or variable, and insert it into the output message:

```
macro_rules! greet {
    ($name:expr) => {
        println!("Hello, {}!", $name);
    };
}


fn main() {
    greet!("Alice");
    greet!("Bob");
}
```

When called with arguments like `"Alice"` or `"Bob"`, the macro outputs `Hello, Alice!` and `Hello, Bob!`, respectively.

## Practical Use Cases of Macros

Macros are particularly useful in scenarios where repeated code patterns emerge. They are also indispensable in crafting DSLs. Below are some practical applications of macros in Rust.

### Logging Macros

A common use case for macros is logging. The following logging macro streamlines the process by automatically prefixing log messages with a consistent tag:

```
macro_rules! log {
    ($msg:expr) => {
        println!("[LOG]: {}", $msg);
    };
}


fn main() {
    log!("Application started");
}
```

This macro encapsulates a standard log format, simplifying logging throughout your application.

### The println! Macro

Rust’s built-in `println!` macro showcases how macros can offer both custom functionalities and built-in conveniences. Here’s a simple example using `println!`:

```
fn main() {
    println!("Hello, world!");
}
```

This provides a clear demonstration of how fundamental macros work in Rust to print messages to the console.

> [!important]
> **Key Takeaway**
>
> Understanding macros in Rust can significantly reduce code redundancy and improve readability. As you explore further, you'll discover that macros offer a powerful way to express complex logic concisely.

In this guide, we have covered the basics of declarative macros in Rust, including simple macro definitions, macros with arguments, and several practical applications like logging. With practice, you'll unlock the full potential of macros to write more expressive and efficient Rust code.

For more in-depth learning, consider exploring additional resources on Rust metaprogramming and procedural macros. Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/rust/module/f232d417-91e4-49e7-b538-be7db1e23daf/lesson/5cd8bafb-c8e8-47e9-acd0-704c79bd8490)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/rust/module/f232d417-91e4-49e7-b538-be7db1e23daf/lesson/caec6763-4bfc-423e-a736-4c86e34f0457)**
>
> Practice lab
