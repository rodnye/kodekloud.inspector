# Ownership and Functions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Rust-Programming/Ownership/Ownership-and-Functions)

---

## Table of Contents

- Ownership and Functions
  - Transferring Ownership to Functions
  - Working with Types that Implement the Copy Trait
  - Returning Ownership from Functions
  - Modifying a String by Transferring Ownership
  - Copying and Returning Primitive Types
  - Watch Video

---

## Content

Rust Programming

Ownership

# Ownership and Functions

Understanding how ownership interacts with functions is crucial for writing safe and efficient Rust code. In this article, we'll explore how Rust manages memory when variables are passed to functions and returned. This knowledge is essential for avoiding common pitfalls and ensuring your code operates as expected.

## Transferring Ownership to Functions

When you pass a variable to a function in Rust, you transfer ownership of that variable. Once ownership is transferred, the original variable is no longer accessible in its previous scope.

For example, consider passing a string to a function:

```
fn main() {
    let s = String::from("hello");
    takes_ownership(s); // s is moved into the function
    // println!("{}", s); // Error: s is no longer valid
}


fn takes_ownership(some_string: String) {
    println!("{}", some_string);
}
```

In the example above, the string `s` is created in the `main` function and then moved into the `takes_ownership` function. Attempting to use `s` after the function call will trigger a compile-time error because its ownership has been transferred.

## Working with Types that Implement the Copy Trait

Rust’s primitive types, like integers, implement the `Copy` trait. When an integer is passed to a function, Rust creates a copy instead of moving it, meaning that the original variable remains valid after the function call.

For example:

```
fn main() {
    let x = 5;
    makes_copy(x); // x is copied into the function
    println!("{}", x); // x is still valid
}


fn makes_copy(some_integer: i32) {
    println!("{}", some_integer);
}
```

Here, even though the value of `x` is passed to `makes_copy`, a copy is made, and the original variable `x` remains intact for use in subsequent code.

## Returning Ownership from Functions

Functions can also transfer ownership back to the caller. This is useful when you create or modify values within a function and need the modified value outside its scope.

Consider the following example where one function gives ownership of a string and another function takes a string and returns it:

```
fn main() {
    let s1 = gives_ownership(); // s1 takes ownership of the returned String
    let s2 = String::from("hello");
    let s3 = takes_and_gives_back(s2); // s2 is moved and ownership is returned to s3


    // println!("{}", s2); // Error: s2 is no longer valid
    println!("{}", s3);
}


fn gives_ownership() -> String {
    let some_string = String::from("hello");
    some_string // Ownership is transferred to the caller
}


fn takes_and_gives_back(a_string: String) -> String {
    a_string // Ownership is transferred back to the caller
}
```

> [!important]
> **Tip**
>
> Functions returning ownership provide flexibility when modifying data. Keep in mind that once a variable’s ownership is transferred, it cannot be used in its original form unless returned.

## Modifying a String by Transferring Ownership

A function can accept a value by taking ownership, modify it, and then return it. This is a common pattern for functions that need to transform input data without borrowing it.

For example, consider a function that appends text to a string:

```
fn main() {
    let s = String::from("hello");
    let result = modify_string(s); // s is moved into modify_string
    println!("{}", result); // result now owns the modified String
}


fn modify_string(mut s: String) -> String {
    s.push_str(", world");
    s // Return the modified String, transferring ownership back to the caller
}
```

In this code, the string `s` is passed to `modify_string`. After appending additional text, the modified string is returned and printed in the `main` function.

## Copying and Returning Primitive Types

Since primitives like integers implement the `Copy` trait, passing these values to and returning them from functions involves copying rather than moving. This ensures that original values remain unchanged and accessible.

For example:

```
fn main() {
    let x1 = gives_copy(); // x1 receives a copied integer
    let x2 = 5;
    let x3 = takes_and_returns_copy(x2); // x2 is copied into the function, and a copy is returned to x3


    println!("{}", x2); // x2 is still valid
    println!("{}", x3);
}


// Creates an integer and returns a copy to the caller
fn gives_copy() -> i32 {
    let some_integer = 5;
    some_integer
}


// Accepts an integer and returns a copy of it
fn takes_and_returns_copy(a_integer: i32) -> i32 {
    a_integer
}
```

Here, both passing and returning integers from functions involve making copies, thereby preserving the original variable\`s validity.

---

Through these examples, we have explored how Rust's ownership model interacts with functions:

- Variables can have their ownership transferred to functions, rendering them inaccessible in their original scope.
- Primitive types implementing the `Copy` trait are duplicated rather than moved, allowing them to remain available.
- Functions can return ownership, making it simpler to modify data within functions and then pass it back.

Understanding these patterns is key to effectively managing memory and ensuring your Rust code is both safe and efficient.

For more insights on Rust’s ownership rules, check out the [Rust Ownership Guide](https://doc.rust-lang.org/book/ch04-00-understanding-ownership.html).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/rust/module/48702f90-cc95-4c81-939c-a4565969de71/lesson/4f54dfcc-ff3d-4ef6-afe2-98ad64dec5de)**
>
> Watch video content
