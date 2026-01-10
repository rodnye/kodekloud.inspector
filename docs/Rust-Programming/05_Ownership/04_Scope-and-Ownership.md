# Scope and Ownership - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Rust-Programming/Ownership/Scope-and-Ownership)

---

## Table of Contents

- Scope and Ownership
  - Variable Scope in Rust
  - Ownership in Rust
  - Comparison with Garbage-Collected Languages
  - Watch Video

---

## Content

Rust Programming

Ownership

# Scope and Ownership

In this guide, we'll explore how Rust manages variable scope and ownership to ensure safe and efficient memory handling.

## Variable Scope in Rust

When you declare a variable in Rust, its scope begins immediately at the point of declaration and lasts until the end of the enclosing block. For example:

```
let x = 5; // x is valid from this point forward
```

Here, the variable `x` is in scope throughout the current block. Once the block terminates, `x` goes out of scope and Rust automatically cleans up its memory.

## Ownership in Rust

Rust’s ownership model is key to its memory safety guarantees. When an owning variable goes out of scope, Rust automatically frees the memory it holds by calling a special function called `drop`.

Consider the `String` type, which represents a mutable, growable piece of text stored on the heap. Unlike fixed-size types, a `String` requires runtime memory allocation because its size isn’t known at compile time. Once a `String` is no longer needed, its allocated memory is automatically returned to the allocator.

The following example demonstrates this behavior. The variable `s` is initialized using `String::from`. When `s` leaves scope at the end of the block, Rust automatically deallocates the associated memory:

```
fn main() {
    let s = String::from("hello"); // s comes into scope
    // Use s for some operations
    println!("{}", s); // s is still valid here
} // s goes out of scope and is dropped automatically
```

> [!important]
> **Note**
>
> Rust's ownership model avoids the overhead of garbage collection by ensuring that resources are automatically cleaned up when they are no longer needed, reducing the risk of memory leaks and errors.

## Comparison with Garbage-Collected Languages

In languages that use garbage collection, an external process tracks and cleans up unused memory. This can introduce overhead and unpredictability. In contrast, languages without garbage collection require developers to manually manage memory, which can lead to errors and inefficiencies.

Rust provides the best of both worlds by automatically deallocating memory when an owning variable goes out of scope. This compile-time checked approach to memory management enhances both safety and efficiency.

For a deeper dive into Rust's ownership and borrowing rules, visit the [Rust Book](https://doc.rust-lang.org/book/ch04-00-understanding-ownership.html).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/rust/module/48702f90-cc95-4c81-939c-a4565969de71/lesson/ec8082bd-4044-489b-bbf8-85bd229949be)**
>
> Watch video content
