# Variables and Data Interacting with Move - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Rust-Programming/Ownership/Variables-and-Data-Interacting-with-Move)

---

## Table of Contents

- Variables and Data Interacting with Move
  - What is Move?
  - How Does Move Work?
  - Rust Internals: How Moving Works with Strings
  - Why Move Instead of Copy?
  - Double-Free Errors and Rust's Ownership Model
  - The Process of Moving a String
  - Watch Video
    - Moving with Integer Types
    - Understanding Traits and the Copy Trait
    - Moving with String Types

---

## Content

Rust Programming

Ownership

# Variables and Data Interacting with Move

In this article, we dive deep into how variables and data interact with the concept of Move in Rust. We will explore how ownership transfer works, why it’s beneficial for performance and memory safety, and how Rust’s design prevents common pitfalls like double-free errors.

## What is Move?

In Rust, a move transfers the ownership of a value from one variable to another. After a value is moved, the original variable becomes invalid, and trying to access it results in a compile-time error. This design enforces memory safety and prevents data races without relying on a garbage collector.

![The image explains the concept of "Move" in programming, highlighting memory safety and data race prevention without a garbage collector. It shows that Variable A becomes invalid after its value is moved to Variable B.](https://kodekloud.com/kk-media/image/upload/v1752883964/notes-assets/images/Rust-Programming-Variables-and-Data-Interacting-with-Move/move-concept-memory-safety-diagram.jpg)

## How Does Move Work?

When one variable is assigned to another, Rust transfers ownership of the data instead of making a copy. This is particularly important for types that allocate data on the heap, such as `String` or `Vector`, where shallow or deep copying would be less efficient.

![The image explains how ownership is moved rather than copied in programming, specifically for types that allocate data on the heap. It shows a diagram where ownership is transferred from Variable A to Variable B.](https://kodekloud.com/kk-media/image/upload/v1752883965/notes-assets/images/Rust-Programming-Variables-and-Data-Interacting-with-Move/ownership-transfer-heap-variables-diagram.jpg)

### Moving with Integer Types

For types that implement the `Copy` trait, like integers, Rust performs a simple bitwise copy. Both variables remain usable because integers are stored on the stack and the duplication is inexpensive.

Consider the following example:

```
fn main() {
    let x = 5;
    let y = x; // Copy trait in action
    println!("x: {}, y: {}", x, y); // Both x and y are valid
}
```

Since integers implement the `Copy` trait, the value is duplicated, leaving both `x` and `y` valid.

### Understanding Traits and the Copy Trait

In Rust, a trait defines shared behavior across different types, functioning similarly to interfaces in other programming languages. The `Copy` trait allows values to be duplicated rather than moved. For instance, since integers implement the `Copy` trait, assigning one integer to another does not invalidate the original variable.

> [!important]
> **Note**
>
> Later in this article, we will discuss traits in greater detail. For now, understand that the `Copy` trait enables efficient duplication of values on the stack.

### Moving with String Types

For string types, data is moved instead of copied. When you transfer ownership of a string, the original variable is invalidated to ensure that only one variable owns the heap-allocated data at any time. Consider this example:

```
fn main() {
    let s1 = String::from("hello");
    let s2 = s1; // s1 is moved to s2
    // println!("{}", s1); // Uncommenting this line will cause a compile-time error
    println!("{}", s2); // s2 is valid
}
```

Using `s1` after the move causes a compile-time error because Rust enforces a single owner for heap-allocated data.

## Rust Internals: How Moving Works with Strings

A Rust `String` is a heap-allocated type that contains three components:

- A pointer to the heap-allocated buffer holding the string data.
- The current length of the string.
- The total capacity of the allocated buffer.

This structure is represented as:

```
struct String {
    ptr: *mut u8,
    len: usize,
    capacity: usize,
}
```

When a string is created, Rust allocates memory on the heap for the data and stores the pointer, length, and capacity in a stack-allocated struct.

![The image explains the internals of a string in Rust, showing how the string struct is stored on the stack with a pointer, length, and capacity, while the actual string data is stored on the heap.](https://kodekloud.com/kk-media/image/upload/v1752883966/notes-assets/images/Rust-Programming-Variables-and-Data-Interacting-with-Move/rust-string-internals-struct.jpg)

## Why Move Instead of Copy?

Moving ownership for heap-allocated types like `String` offers several advantages:

| Benefit       | Explanation                                                                                                                    |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Performance   | Only a shallow copy of the pointer, length, and capacity is performed, avoiding the overhead of duplicating large buffers.     |
| Memory Safety | Ensures that only one owner is responsible for deallocating the heap memory, preventing double-free errors and similar issues. |

![The image outlines the benefits of moving ownership instead of copying ownership, highlighting advantages in performance and safety. It explains that moving is faster and prevents memory safety issues like double free errors.](https://kodekloud.com/kk-media/image/upload/v1752883968/notes-assets/images/Rust-Programming-Variables-and-Data-Interacting-with-Move/moving-ownership-benefits-performance-safety.jpg)

## Double-Free Errors and Rust's Ownership Model

A double-free error occurs when the same memory is deallocated twice. In languages like C or C++, improper memory management can result in two pointers referencing the same memory, leading to such errors. For example, consider this C code:

```
#include <stdlib.h>
#include <string.h>

int main() {
    char* s1 = malloc(6);
    strcpy(s1, "hello");
    char* s2 = s1; // s2 points to the same memory as s1
    free(s1);      // Free the memory
    free(s2);      // Error: Double free
}
```

Rust's ownership model prevents this scenario by invalidating the original variable once ownership is moved:

```
fn main() {
    let s1 = String::from("hello");
    let s2 = s1; // Move ownership from s1 to s2
    // s1 is no longer valid here
    // println!("{}", s1); // Uncommenting this line would cause a compile-time error
    println!("{}", s2); // s2 is valid
}
```

> [!important]
> **Note**
>
> Rust's ownership model guarantees that there is always a single owner for a heap-allocated resource, which inherently prevents double-free errors and other memory safety issues.

## The Process of Moving a String

When a string is moved in Rust, the following process occurs:

1.  A shallow copy of the string struct (with its pointer, length, and capacity) is created for the new variable.
2.  The original string is marked as invalid at compile time, ensuring it cannot be used further.
3.  The heap-allocated data is now exclusively owned by the new variable.
4.  When the new variable goes out of scope, Rust automatically calls `drop` to deallocate the heap memory.

![The image explains the process of moving a string in programming, detailing steps like creating a shallow copy, invalidating the original string, and transferring memory ownership. It includes diagrams showing the transition from `s1` to `s2` with associated data structures.](https://kodekloud.com/kk-media/image/upload/v1752883969/notes-assets/images/Rust-Programming-Variables-and-Data-Interacting-with-Move/string-move-process-diagram.jpg)

An essential design choice in Rust is that it never automatically creates deep copies of data. This approach ensures that ownership transfers remain efficient and predictable. Topics such as deep copying and more about Rust’s memory management will be covered in future articles.

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/rust/module/48702f90-cc95-4c81-939c-a4565969de71/lesson/bc943cc7-c04e-48ab-983e-f1e6299d5e09)**
>
> Watch video content
