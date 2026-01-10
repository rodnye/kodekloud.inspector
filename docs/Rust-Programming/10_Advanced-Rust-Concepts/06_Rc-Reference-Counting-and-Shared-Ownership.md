# Rc Reference Counting and Shared Ownership - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Rust-Programming/Advanced-Rust-Concepts/Rc-Reference-Counting-and-Shared-Ownership)

---

## Table of Contents

- Rc Reference Counting and Shared Ownership
  - What is Rc<T>?
  - Basic Usage of Rc<T>
  - When to Use Rc<T>
  - Example: Sharing Ownership in a Tree Structure
  - Limitations of Rc<T>
  - Summary
  - Watch Video

---

## Content

Rust Programming

Advanced Rust Concepts

# Rc Reference Counting and Shared Ownership

In this lesson, we dive into the Rust smart pointer Rc (Reference Counted), which facilitates shared ownership of heap-allocated data through reference counting. Unlike Box<T>, which offers exclusive ownership, Rc<T> enables multiple parts of your program to access the same data while automatically deallocating it once there are no remaining references.

![The image is an agenda slide with a gradient background, listing four topics related to "Rc<T>": Diving into, Exploring, Importance of, and How to use.](https://kodekloud.com/kk-media/image/upload/v1752883774/notes-assets/images/Rust-Programming-Rc-Reference-Counting-and-Shared-Ownership/rc-topics-agenda-slide.jpg)

## What is Rc<T>?

Rc<T> is a smart pointer that allows several parts of a program to share ownership of the same heap-allocated data. It keeps track of the number of owners and automatically cleans up the data when the reference count drops to zero. This makes Rc<T> especially useful when building complex data structures such as graphs or trees that require multiple ownership.

![The image is a diagram illustrating the concept of reference counting in Rust using `Rc<T>`, showing data creation and ownership by three different owners, with a reference count of three.](https://kodekloud.com/kk-media/image/upload/v1752883774/notes-assets/images/Rust-Programming-Rc-Reference-Counting-and-Shared-Ownership/reference-counting-rust-rc-diagram.jpg)

> [!important]
> **Single-Threaded Use**
>
> Note that Rc<T> is designed for single-threaded scenarios. For multi-threaded contexts, use Arc<T> (atomic reference counting) to ensure thread safety.

![The image explains the concept of `Rc<T>` in Rust, highlighting its use for reference counting and its suitability for single-threaded scenarios. It also mentions using `Arc<T>` for shared ownership in multi-threaded contexts.](https://kodekloud.com/kk-media/image/upload/v1752883775/notes-assets/images/Rust-Programming-Rc-Reference-Counting-and-Shared-Ownership/rust-rc-arc-reference-counting.jpg)

## Basic Usage of Rc<T>

The following example demonstrates how to create an Rc<T> that points to an integer value and how cloning the pointer increases the reference count without copying the underlying data:

```
use std::rc::Rc;


fn main() {
    let a = Rc::new(5);
    let b = Rc::clone(&a);
    let c = Rc::clone(&a);


    println!("a: {}, b: {}, c: {}", a, b, c);
    println!("Reference count: {}", Rc::strong_count(&a));
}
```

In this example, we:

- Create an Rc<T> containing the integer 5.
- Clone it twice using `Rc::clone`, which increments the reference count.
- Use `Rc::strong_count(&a)` to display the three references (a, b, and c) pointing to the same data.

## When to Use Rc<T>

Rc<T> is ideal for scenarios where you need to share data across various parts of your program without transferring ownership. It is particularly useful in data structures like trees and graphs. While Box<T> ensures single ownership, Rc<T> offers a flexible solution for shared ownership with automatic memory management.

![The image explains the benefits of using `Rc<T>` in Rust, highlighting shared ownership and memory safety for building complex structures like graphs or trees.](https://kodekloud.com/kk-media/image/upload/v1752883777/notes-assets/images/Rust-Programming-Rc-Reference-Counting-and-Shared-Ownership/rust-rc-benefits-memory-safety.jpg)

## Example: Sharing Ownership in a Tree Structure

Consider a scenario where you need to build a binary tree structure with shared nodes. The following code sample illustrates how to wrap tree nodes in Rc<T> to enable shared ownership:

```
use std::rc::Rc;


#[derive(Debug)]
struct Node {
    value: i32,
    left: Option<Rc<Node>>,
    right: Option<Rc<Node>>,
}


fn main() {
    // Create a leaf node with no children.
    let leaf: Rc<Node> = Rc::new(Node {
        value: 3,
        left: None,
        right: None,
    });


    // Create a branch node with the left child pointing to the leaf.
    let branch: Rc<Node> = Rc::new(Node {
        value: 5,
        left: Some(Rc::clone(&leaf)),
        right: None,
    });


    // Create the root node with children pointing to both the branch and the leaf.
    let root: Rc<Node> = Rc::new(Node {
        value: 10,
        left: Some(Rc::clone(&branch)),
        right: Some(Rc::clone(&leaf)),
    });


    println!("Root node: {:?}", root);
    println!("Leaf node reference count: {}", Rc::strong_count(&leaf));
}
```

In this example:

- A leaf node with value 3 is created.
- A branch node (value 5) is created and references the leaf node.
- The root node (value 10) references both the branch and the leaf.
- The call to `Rc::strong_count(&leaf)` confirms that the leaf node is shared three times:
  1.  The initial creation.
  2.  Cloning into the branch.
  3.  Cloning into the root.

## Limitations of Rc<T>

While Rc<T> offers significant benefits for shared ownership, it has certain limitations:

- **Mutability:** Rc<T> does not permit modifying the shared data. If your application requires mutable shared data, consider combining Rc<T> with RefCell<T> for interior mutability.
- **Thread Safety:** Rc<T> is not safe for use across multiple threads. For multi-threaded shared ownership, switch to Arc<T>, which supports atomic reference counting.

> [!important]
> **Important Consideration**
>
> Avoid using Rc<T> in multi-threaded environments or when you need mutability without interior mutability support. In such cases, consider using Arc<T> or combining Rc<T> with RefCell<T>.

![The image provides guidance on when to avoid using `Rc<T>` in programming, highlighting issues with mutability and multi-threaded contexts. It suggests using `RefCell<T>` for mutability and `Arc<T>` for thread safety.](https://kodekloud.com/kk-media/image/upload/v1752883778/notes-assets/images/Rust-Programming-Rc-Reference-Counting-and-Shared-Ownership/avoid-using-rct-mutability-thread-safety.jpg)

## Summary

Rc<T> is a powerful tool in Rust for managing shared ownership of heap-allocated data through reference counting. It simplifies memory management by automatically deallocating data once there are no remaining references, thus eliminating manual memory management burdens. In upcoming lessons, we will explore how RefCell<T> works with Rc<T> to provide interior mutability, expanding on the capabilities of shared ownership in Rust.

![The image is a summary slide about `Rc<T>` in Rust, highlighting its use for sharing data ownership, providing automatic reference counting, and eliminating manual memory management.](https://kodekloud.com/kk-media/image/upload/v1752883779/notes-assets/images/Rust-Programming-Rc-Reference-Counting-and-Shared-Ownership/rust-rc-summary-data-ownership.jpg)

For more detailed information about Rust's ownership model and smart pointers, refer to the [Rust Documentation](https://doc.rust-lang.org/book/ch15-00-smart-pointers.html).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/rust/module/37d4032f-c90d-43ee-a0cd-981b95ab22b0/lesson/291fc5f8-da53-4b4d-8286-9b4f8a6791e1)**
>
> Watch video content
