# Weak Breaking Reference Cycles - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Rust-Programming/Advanced-Rust-Concepts/Weak-Breaking-Reference-Cycles)

---

## Table of Contents

- Weak Breaking Reference Cycles
  - Watch Video

---

## Content

Rust Programming

Advanced Rust Concepts

# Weak Breaking Reference Cycles

In this article, we explore reference cycles in Rust and demonstrate how to resolve them using weak smart pointers. Rust’s ownership system guarantees memory safety without a garbage collector; however, certain designs can inadvertently create reference cycles that lead to memory leaks.

---

Rust’s ownership model works well in most cases, but sometimes two or more objects reference each other, preventing their reference counts from ever reaching zero. As a result, the allocated memory is never released.

![The image is an introduction slide about the Rust Ownership System, highlighting its benefits like memory safety and no need for garbage collection, as well as a problem with reference cycles causing memory leaks.](https://kodekloud.com/kk-media/image/upload/v1752883792/notes-assets/images/Rust-Programming-Weak-Breaking-Reference-Cycles/rust-ownership-system-introduction.jpg)

A reference cycle occurs when pointers or references continuously refer back to one another, creating a loop that stops automatic memory cleanup. For instance, if Node A points to Node B and Node B points back to Node A, neither will ever have a strong reference count of zero. This mutual retention is the root cause of memory leaks.

![The image illustrates a concept of reference cycles, showing two references, A and B, pointing to a memory block labeled "Occupied Memory."](https://kodekloud.com/kk-media/image/upload/v1752883793/notes-assets/images/Rust-Programming-Weak-Breaking-Reference-Cycles/reference-cycles-occupied-memory.jpg)

Below is an example demonstrating how a cycle might be created using a simple tree structure. In this code, a `Node` struct contains a value, an optional parent, and a list of children. Initially, we use only strong references (`Rc<T>`) for both parent and child relationships.

```
use std::cell::RefCell;
use std::rc::Rc;


#[derive(Debug)]
struct Node {
    value: i32,                       // Value of the node
    parent: RefCell<Option<Rc<Node>>>, // Optional parent node wrapped in a RefCell
    children: RefCell<Vec<Rc<Node>>>,  // Vector of child nodes wrapped in a RefCell
}


fn main() {
    // Create the child node with no parent and no children.
    let child: Rc<Node> = Rc::new(Node {
        value: 3,
        parent: RefCell::new(None),
        children: RefCell::new(vec![]),
    });


    // Create the parent node with the child node in its children vector.
    let parent: Rc<Node> = Rc::new(Node {
        value: 5,
        parent: RefCell::new(None),
        children: RefCell::new(vec![Rc::clone(&child)]),
    });


    // Establish the parent-child relationship by setting the child's parent.
    *child.parent.borrow_mut() = Some(Rc::clone(&parent));


    println!("Parent: {:?}", parent);
    println!("Child: {:?}", child);
}
```

Running this example may print a deeply nested structure because the parent's children contain the child, and the child's parent points back to the parent. This recursive reference is a clear sign of a reference cycle. Since each node holds a strong reference to the other, neither node’s reference count drops to zero, leading to a memory leak.

> [!important]
> **Understanding Reference Cycles**
>
> In scenarios where two entities hold strong references to each other, careful design is needed to allow proper memory deallocation. This is especially common in parent-child relationships and cyclic graph structures.

---

To resolve this issue, Rust provides the `Weak<T>` smart pointer. Unlike `Rc<T>`, a weak reference does not contribute to the strong count of an object. Using weak pointers for back-references, such as the parent pointer in a tree structure, breaks the cycle and allows Rust to reclaim memory when there are no remaining strong references.

![The image explains the concept of `Weak<T>` in Rust, highlighting it as a smart pointer that provides a non-owning reference to data managed by `Rc<T>`, doesn't increase the reference count, and prevents reference cycles.](https://kodekloud.com/kk-media/image/upload/v1752883795/notes-assets/images/Rust-Programming-Weak-Breaking-Reference-Cycles/weak-pointer-rust-explanation.jpg)

Converting an `Rc<T>` to a weak pointer using `Rc::downgrade` increments only the weak count. This allows you to later attempt to “upgrade” the weak reference back to an `Rc<T>` (yielding an `Option<Rc<T>>`) if access to the data is necessary, without preventing the object’s deallocation.

![The image illustrates how `Weak<T>` works in programming, showing a person pointing to a flowchart with `Rc<T>`, `Weak<T>`, and an `upgrade()` function.](https://kodekloud.com/kk-media/image/upload/v1752883796/notes-assets/images/Rust-Programming-Weak-Breaking-Reference-Cycles/weak-rct-upgrade-flowchart.jpg)

---

Below is an improved version of the earlier example that employs a weak pointer for the parent reference, thereby avoiding a reference cycle:

```
use std::cell::RefCell;
use std::rc::{Rc, Weak};


#[derive(Debug)]
struct Node {
    value: i32,                   // Integer value for the node
    parent: RefCell<Weak<Node>>,  // Weak reference to the parent node
    children: RefCell<Vec<Rc<Node>>>, // Vector of strong references to child nodes
}


fn main() {
    // Create the child node with no parent initially.
    let child: Rc<Node> = Rc::new(Node {
        value: 3,
        parent: RefCell::new(Weak::new()),
        children: RefCell::new(vec![]),
    });


    // Create the parent node and add the child node to its children.
    let parent: Rc<Node> = Rc::new(Node {
        value: 5,
        parent: RefCell::new(Weak::new()),
        children: RefCell::new(vec![Rc::clone(&child)]),
    });


    // Establish the parent-child relationship using a weak reference.
    *child.parent.borrow_mut() = Rc::downgrade(&parent);


    println!("Parent: {:?}", parent);
    println!("Child: {:?}", child);
    println!("Child's parent (upgraded): {:?}", child.parent.borrow().upgrade());
}
```

In this revised example, the child's parent field is a `Weak<Node>`, so using `Rc::downgrade(&parent)` does not increase the parent's strong count. When you print the upgraded weak reference with `child.parent.borrow().upgrade()`, it will successfully return an `Rc<Node>` as long as the parent is still alive. Once all strong references to the parent are dropped, the parent will be deallocated, and the weak reference will no longer be upgradable.

> [!important]
> **When to Use Weak Pointers**
>
> Using weak pointers is especially beneficial in scenarios such as parent-child relationships or cyclic data structures where a strong back-reference could inadvertently keep an object alive. This ensures that your application remains memory efficient.

![The image illustrates when to use `Weak<T>` in programming, showing a parent-child relationship where children reference parents with weak references, meaning they don't keep them alive.](https://kodekloud.com/kk-media/image/upload/v1752883797/notes-assets/images/Rust-Programming-Weak-Breaking-Reference-Cycles/weak-references-parent-child-relationship.jpg)

By leveraging weak pointers, you can build complex data structures in Rust that remain free from unintended memory leaks and maintain the high performance and safety guarantees that Rust’s ownership system provides.

For further reading and more detailed examples, explore the [Rust Documentation](https://doc.rust-lang.org/book/) or check out additional resources on [Rust smart pointers](https://doc.rust-lang.org/std/rc/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/rust/module/37d4032f-c90d-43ee-a0cd-981b95ab22b0/lesson/e5d3b123-ee9b-4a49-b56f-85a37967279e)**
>
> Watch video content
