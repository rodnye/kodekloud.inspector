# Rules of References - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Rust-Programming/Ownership/Rules-of-References)

---

## Table of Contents

- Rules of References
  - Combining Immutable and Mutable References in Different Scopes
  - Creating Immutable References Followed by a Mutable Reference
  - Conflict Between Immutable and Mutable References
  - Key Borrowing Rules in Rust
  - Watch Video
    - Example: Immutable References
    - Example: Mutable Reference

---

## Content

Rust Programming

Ownership

# Rules of References

In this lesson, we explore Rust’s borrowing rules using references, illustrating how to safely use mutable and immutable references. Rust enforces a strict rule: you can have either one mutable reference or any number of immutable references at any given time. Once data is moved or goes out of scope, referencing it is not allowed. The examples below demonstrate how to combine mutable and immutable references while adhering to Rust’s safety constraints.

---

## Combining Immutable and Mutable References in Different Scopes

In the first example, two immutable references are created within an inner block and used for reading data. After the inner block ends, these references go out of scope, allowing the creation of a mutable reference that modifies the data.

![The image outlines key borrowing rules in Rust programming, focusing on multiple immutable references, mutability exclusivity, and the non-overlap between mutable and immutable references to ensure memory safety and data consistency.](https://kodekloud.com/kk-media/image/upload/v1752883954/notes-assets/images/Rust-Programming-Rules-of-References/rust-borrowing-rules-memory-safety.jpg)

```
fn main() {
    let mut s = String::from("hello");


    {
        let r1 = &s; // Immutable reference
        let r2 = &s; // Another immutable reference
        println!("r1: {}, r2: {}", r1, r2); // Both references are valid
    } // Immutable references go out of scope here


    let r3 = &mut s; // Mutable reference
    r3.push_str(", world");
    println!("r3: {}", r3); // Mutable reference is valid
}
```

When compiled and executed, this program produces:

```
rustc main.rs
./main
r1: hello, r2: hello
r3: hello, world
```

> [!important]
> **Note**
>
> Rust allows multiple immutable references because they only read data without modifying it. After they go out of scope, a mutable reference can safely modify the original data.

---

## Creating Immutable References Followed by a Mutable Reference

This example shows immutable references being used in a print statement. Once their purpose is fulfilled, a mutable reference is then created within the same outer block. Rust detects that the immutable references are no longer needed and permits the mutable borrow.

```
fn main() {
    let mut s = String::from("hello");


    let r1 = &s; // Immutable reference
    let r2 = &s; // Another immutable reference
    println!("r1: {}, r2: {}", r1, r2); // The immutable references are used here


    let r3 = &mut s; // Mutable reference, allowed since r1 and r2 are no longer used
    r3.push_str(", world");
    println!("r3: {}", r3); // Mutable reference is valid
}
```

The output from compiling and running this code is:

```
rustc main.rs
./main
r1: hello, r2: hello
r3: hello, world
```

Once the immutable references are used in the print statement, they are no longer active, allowing the mutable reference to safely modify the string.

---

## Conflict Between Immutable and Mutable References

In this example, a mutable reference is attempted while immutable references are still in scope. The immutable references are reused after trying to borrow mutably, leading to a compile-time error.

```
fn main() {
    let mut s = String::from("hello");


    let r1 = &s; // Immutable reference
    let r2 = &s; // Another immutable reference
    println!("r1: {}, r2: {}", r1, r2); // Both immutable references are valid here


    let r3 = &mut s; // Attempt to create a mutable reference while r1 and r2 are still in scope
    r3.push_str(", world");
    println!("r3: {}", r3); // Mutable reference is valid
    println!("r1: {}, r2: {}", r1, r2); // Error: immutable references used after mutable borrow
}
```

The compiler produces an error similar to:

```
~/projects/hello_rust via 🦀 v1.81.0
error: cannot borrow `s` as mutable because it is also borrowed as immutable
 --> main.rs:8:17
  |
6 |     let r1 = &s; // Immutable reference
  |              -- immutable borrow occurs here
7 |     let r2 = &s; // Another immutable reference
8 |     println!("r1: {}, r2: {}", r1, r2); // Both references are valid
  |                                     --- immutable borrow later used here
9 |
10|     let r3 = &mut s; // Mutable reference
  |                 ^^^^^ mutable borrow occurs here
```

> [!important]
> **Warning**
>
> This error occurs because r1 and r2 remain in scope when the mutable reference r3 is created. Ensure that immutable references are not used after a mutable borrow to maintain memory safety.

For further details on this error, run: `rustc --explain E0502`.

---

## Key Borrowing Rules in Rust

Rust’s strict borrowing rules are designed to ensure data consistency and memory safety. The fundamentals include:

- **Multiple Immutable References:** Numerous immutable references are allowed as long as they only read data, preventing data races.
- **Single Mutable Reference:** Only one mutable reference is allowed at a time to avoid concurrent data modifications.
- **No Overlap:** Immutable and mutable references cannot coexist. Once immutable references exist, you cannot create a mutable reference until they fall out of scope, and vice versa.

![The image explains the benefits of multiple immutable references and the limitations of a single mutable reference in programming, highlighting data consistency and potential interference issues.](https://kodekloud.com/kk-media/image/upload/v1752883955/notes-assets/images/Rust-Programming-Rules-of-References/immutable-references-programming-benefits.jpg)

### Example: Immutable References

Consider the following scenario where immutable references share the same data:

```
fn main() {
    let s = String::from("hello");

    let r1 = &s; // Immutable reference
    let r2 = &s; // Another immutable reference

    println!("r1: {}, r2: {}", r1, r2); // Both references can be used simultaneously
}
```

### Example: Mutable Reference

Using a mutable reference is equally simple, with the key restriction of only one mutable borrow at a time:

```
fn main() {
    let mut s = String::from("hello");
    let r1 = &mut s; // Mutable reference
    // let r2 = &mut s; // This would cause an error: cannot borrow `s` as mutable more than once

    r1.push_str(", world");
    println!("r1: {}", r1);
}
```

Attempting to create another mutable reference when one is already in use will result in a compile-time error, thereby protecting your program from data races.

---

In summary, Rust’s reference rules ensure safe and consistent data management by allowing multiple immutable references for reading and a single mutable reference for writing. By following these guidelines, you can write efficient and memory-safe Rust code. For more on Rust's borrowing system, check out the [Rust Documentation](https://www.rust-lang.org/learn).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/rust/module/48702f90-cc95-4c81-939c-a4565969de71/lesson/332fc2b7-d1bb-40e3-a2c1-01789587dff6)**
>
> Watch video content
