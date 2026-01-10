# Immutable and Mutable References - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Rust-Programming/Ownership/Immutable-and-Mutable-References)

---

## Table of Contents

- Immutable and Mutable References
  - Immutable References
  - Mutable References
  - Dangling References
  - Summary
  - Watch Video
    - Example 1: Stack-Allocated Data
    - Example 2: Heap-Allocated Data

---

## Content

Rust Programming

Ownership

# Immutable and Mutable References

In this lesson, we will explore how Rust handles immutable, mutable, and dangling references. Understanding these concepts is crucial for writing safe and efficient Rust code.

## Immutable References

Immutable references allow you to read data without modifying it. You can have multiple immutable references to the same data, which is especially useful for concurrent read operations. Below are two examples demonstrating immutable references on both stack-allocated and heap-allocated data.

### Example 1: Stack-Allocated Data

In the following example, an integer is stored on the stack. Two immutable references are created using the `&` operator:

```
fn main() {
    let x = 5;
    let r1 = &x; // Immutable reference to x
    let r2 = &x; // Another immutable reference to x
    println!("r1: {}, r2: {}", r1, r2); // Both references are valid and can be used
}
```

### Example 2: Heap-Allocated Data

This example works with a string stored on the heap. Again, two immutable references are created for the same string:

```
fn main() {
    let s = String::from("hello");
    let r1 = &s; // Immutable reference to s
    let r2 = &s; // Another immutable reference to s
    println!("r1: {}, r2: {}", r1, r2); // Both references are valid and can be used
}
```

Both examples illustrate that immutable references enable you to safely read data without the risk of modifying it.

## Mutable References

Mutable references permit you to modify the data they point to. Rust enforces a strict rule: you can only have one mutable reference to a particular piece of data at a time. This rule prevents data races and ensures memory safety.

Consider the following example where a string is modified through a mutable reference:

```
fn main() {
    let mut s = String::from("hello");
    let r = &mut s; // Mutable reference to s
    r.push_str(", world"); // Modify the value through the mutable reference
    println!("s: {}", s); // s now contains "hello, world"
}
```

In this scenario, the mutable reference `r` allows the string `s` to be safely modified.

## Dangling References

Dangling references occur when a reference points to memory that has been deallocated. Rust’s ownership system and borrow checker prevent dangling references at compile time, ensuring memory safety.

![The image explains that a dangling reference is a reference pointing to invalid or deallocated memory.](https://kodekloud.com/kk-media/image/upload/v1752883947/notes-assets/images/Rust-Programming-Immutable-and-Mutable-References/dangling-reference-invalid-memory.jpg)

> [!important]
> **Note**
>
> Although the diagram above provides a visual explanation, the code example below further illustrates how dangling references can occur in Rust.

In this example, a variable `x` is declared within an inner block, and a reference to `x` is assigned to `r` outside that block:

```
fn main() {
    let r;
    {
        let x = 5;
        r = &x; // r borrows x within this block
    }
    println!("r: {}", r); // Error: r would be pointing to deallocated memory
}
```

Here, `x` is defined inside an inner block and then goes out of scope, which would leave `r` as a dangling reference. However, Rust's borrow checker prevents this issue, ensuring that references do not outlive the data they point to.

If you try to compile the code above, you will see an error similar to the following:

```
> rustc main.rs
error[E0597]: `x` does not live long enough
 --> main.rs:5:13
  |
4 |     let x = 5;
  |         - binding `x` declared here
5 |     r = &x; // Error: x does not live long enough
  |         ^^ borrowed value does not live long enough
6 |     }
  |     - `x` dropped here while still borrowed
7 |     println!("r: {}", r);
  |                       - borrow later used here


error: aborting due to 1 previous error
For more information about this error, try `rustc --explain E0597`.
```

This error message indicates that the reference `r` is being used outside the lifetime of `x`, preventing potential undefined behavior.

## Summary

Rust's strict rules regarding references ensure memory safety without the need for a garbage collector. Immutable references allow safe, concurrent reading of data, while mutable references enable controlled modifications. Furthermore, Rust's compile-time checks prevent dangling references by ensuring that no reference outlives its data. These features form the backbone of Rust's memory safety guarantees.

For further reading on Rust’s ownership and borrowing concepts, check out the [Rust Book](https://doc.rust-lang.org/book/).

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/rust/module/48702f90-cc95-4c81-939c-a4565969de71/lesson/b4ef8a6b-b3fd-4697-b8c1-577a793b33ea)**
>
> Watch video content
