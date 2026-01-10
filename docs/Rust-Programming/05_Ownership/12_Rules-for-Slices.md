# Rules for Slices - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Rust-Programming/Ownership/Rules-for-Slices)

---

## Table of Contents

- Rules for Slices
  - Dangling Slice Prevention
  - Rule 2: Multiple Immutable Slices
  - Mixing Mutable and Immutable Slices
  - Watch Video
  - Practice Lab

---

## Content

Rust Programming

Ownership

# Rules for Slices

In this lesson, we explore the essential rules governing slices in Rust, focusing on memory safety and proper borrowing practices. Slices, much like references, must follow strict borrowing rules to prevent data races and dangling references. The key rules to keep in mind are:

1.  Slices must always point to valid data.
2.  You can have either one mutable slice or any number of immutable slices to a piece of data—but not both at the same time.
3.  Slices must not outlive the data they reference.

Rust’s borrow checker enforces these rules, ensuring that your code remains both safe and efficient.

> [!important]
> **Memory Safety Reminder**
>
> Always ensure that any slice in your code points to valid and in-scope data. This is crucial to prevent runtime errors and data corruption.

## Dangling Slice Prevention

Rust prevents the creation of dangling slices by enforcing that a slice cannot outlive its underlying data. Consider the following example, where using a slice after the array goes out of scope results in a compile-time error:

```
fn main() {
    let slice;
    {
        let arr = [1, 2, 3, 4, 5];
        slice = &arr[1..4]; // Error: `arr` does not live long enough
    }
    // println!("{:?}", slice); // Uncommenting this line will cause an error
}
```

If you were to uncomment the `println!` statement, the Rust compiler would generate an error because the array `arr` is no longer valid when the slice is accessed.

```
fn main() {
    let slice;
    {
        let arr = [1, 2, 3, 4, 5];
        slice = &arr[1..4]; // Error: array does not live long enough
    }
    // println!("{:?}", slice); // Uncommenting this line will cause an error
}
```

## Rule 2: Multiple Immutable Slices

At any given time, Rust enforces that you can either have one mutable slice or any number of immutable slices—but cannot mix the two. The following example demonstrates the use of multiple immutable slices:

```
fn main() {
    let s = String::from("hello, world");

    let slice1 = &s[0..5];  // Immutable slice from index 0 to 5
    let slice2 = &s[7..12]; // Another immutable slice from index 7 to 12


    println!("slice1: {}, slice2: {}", slice1, slice2);
    // Both immutable slices can coexist without issues.
}
```

In this example, both `slice1` and `slice2` reference parts of the string `s` and coexist safely since they are immutable.

For mutable slices, observe this scenario:

```
fn main() {
    let mut arr = [1, 2, 3, 4, 5];
    let slice = &mut arr[1..4]; // Mutable slice referencing elements at indices 1 to 3


    slice[0] = 10; // Modify the first element of the slice
    println!("{:?}", arr); // Output: [1, 10, 3, 4, 5]
}
```

In this case, the mutable slice allows the modification of the array's elements, with the change reflected in the original data.

## Mixing Mutable and Immutable Slices

Combining mutable and immutable slices for the same piece of data leads to a compile-time error. For example, creating a mutable slice while existing immutable references are still active will result in an error:

```
fn main() {
    let mut s = String::from("hello");


    let r1 = &s[0..5]; // Immutable reference
    let r2 = &s[0..5]; // Another immutable reference
    // let r3 = &mut s[0..5]; // Error: cannot borrow `s` as mutable because it is also borrowed as immutable
}
```

However, by limiting the scope of the immutable references, you can later create a mutable reference. The following example demonstrates this best practice:

```
fn main() {
    let mut s = String::from("hello");
    {
        let r1 = &s; // Immutable reference
        let r2 = &s; // Another immutable reference
        println!("r1: {}, r2: {}", r1, r2); // Valid within this block
    } // Immutable references go out of scope here


    let r3 = &mut s; // Mutable reference is now allowed
    r3.push_str(" world");
    println!("r3: {}", r3); // Output: "hello world"
}
```

This approach ensures that the mutable reference does not conflict with any active immutable references, maintaining Rust’s guarantees for data safety.

> [!important]
> **Avoid Mixing References**
>
> Mixing mutable and immutable references in overlapping scopes is disallowed in Rust. Always structure your code to manage reference scopes properly, ensuring that mutable references are only introduced once all immutable references have expired.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/rust/module/48702f90-cc95-4c81-939c-a4565969de71/lesson/ccad49f3-5d95-4525-98a1-9336e137725a)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/rust/module/48702f90-cc95-4c81-939c-a4565969de71/lesson/41baa26d-08fe-4d9b-b521-640197f6f5d4)**
>
> Practice lab
