# Implementing Your Own Smart Pointer - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Rust-Programming/Advanced-Rust-Concepts/Implementing-Your-Own-Smart-Pointer)

---

## Table of Contents

- Implementing Your Own Smart Pointer
  - The Deref Trait
  - The Drop Trait
  - Summary
  - Additional Resources
  - Watch Video
  - Practice Lab

---

## Content

Rust Programming

Advanced Rust Concepts

# Implementing Your Own Smart Pointer

In this lesson, you’ll learn how to create a custom smart pointer in Rust. Smart pointers are specialized data structures that not only store memory addresses but also manage the underlying resources. They offer advanced features such as reference counting and interior mutability, which enhance resource management. Although Rust provides robust smart pointers like Box<T>, Rc<T>, and RefCell<T> in its standard library, there are scenarios where a customized solution is necessary.

We will walk you through the process of building a custom smart pointer by implementing two critical traits: Deref and Drop. The Deref trait allows your smart pointer to behave like a regular reference, while the Drop trait ensures automatic resource cleanup when the pointer goes out of scope.

---

## The Deref Trait

The Deref trait enables your smart pointer to be used like any other reference. By implementing Deref, you can use the dereference operator (`*`) to access the data inside the smart pointer, making it compatible in contexts where a regular reference is needed.

![The image is a diagram explaining the implementation of the Deref trait, showing a "MySmartPointer" containing "Data" that points to "Underlying Data" and interacts with the "Deref Trait."](https://kodekloud.com/kk-media/image/upload/v1752883764/notes-assets/images/Rust-Programming-Implementing-Your-Own-Smart-Pointer/deref-trait-mysmartpointer-diagram.jpg)

Consider the following example where we define a generic tuple struct, `MySmartPointer<T>`, that wraps around a value of any type `T`. The implementation block includes a constructor method that initializes the smart pointer:

```
struct MySmartPointer<T>(T);


impl<T> MySmartPointer<T> {
    fn new(x: T) -> MySmartPointer<T> {
        MySmartPointer(x)
    }
}
```

Without implementing the Deref trait, using the dereference operator (`*`) on an instance of `MySmartPointer` would not be possible. Below, we implement the Deref trait so that our custom smart pointer behaves like a standard reference:

```
use std::ops::Deref; // Import the Deref trait


struct MySmartPointer<T>(T);


impl<T> Deref for MySmartPointer<T> {
    type Target = T; // Specify the type returned on dereferencing


    fn deref(&self) -> &T {
        &self.0 // Return a reference to the inner value
    }
}


impl<T> MySmartPointer<T> {
    fn new(x: T) -> MySmartPointer<T> {
        MySmartPointer(x)
    }
}


fn main() {
    // Create a smart pointer holding an integer
    let int_pointer: MySmartPointer<i32> = MySmartPointer::new(42);


    // Create a smart pointer holding a string
    let string_pointer: MySmartPointer<String> = MySmartPointer::new(String::from("Hello, Rust!"));


    // Using the dereference operator to access the inner value
    println!("Integer pointer created with value: {:?}", *int_pointer);
    // Alternatively, direct field access for tuple structs
    println!("String pointer created with value: {:?}", string_pointer.0);
}
```

By implementing Deref, our custom smart pointer can be seamlessly passed to functions and contexts that expect a regular reference, enhancing code reusability and maintainability.

---

## The Drop Trait

The Drop trait is essential for defining custom behavior when a smart pointer goes out of scope. It allows you to implement cleanup logic for resources such as memory, file handles, or network connections.

![The image is titled "The Drop Trait – Managing Cleanup" and features a diagram of a smart pointer managing memory, file handles, and network connections.](https://kodekloud.com/kk-media/image/upload/v1752883765/notes-assets/images/Rust-Programming-Implementing-Your-Own-Smart-Pointer/drop-trait-managing-cleanup-diagram.jpg)

In the following example, we extend our previous implementation by adding a custom Drop implementation. When an instance of `MySmartPointer` is dropped, the `drop` method is triggered, which in this example prints a message to indicate that the pointer is being cleaned up.

```
use std::ops::{Deref, Drop};


struct MySmartPointer<T>(T);


impl<T> Deref for MySmartPointer<T> {
    type Target = T;


    fn deref(&self) -> &T {
        &self.0
    }
}


impl<T> Drop for MySmartPointer<T> {
    fn drop(&mut self) {
        println!("Dropping MySmartPointer!");
    }
}


impl<T> MySmartPointer<T> {
    fn new(x: T) -> MySmartPointer<T> {
        MySmartPointer(x)
    }
}


fn main() {
    let x: i32 = 5;
    // Create an instance of MySmartPointer. When 'y' goes out of scope, the drop method is called.
    let y: MySmartPointer<i32> = MySmartPointer::new(x);
    println!("Value of y: {}", *y);
}
```

When the variable `y` falls out of scope at the end of `main`, Rust automatically calls the `drop` method, ensuring that any associated resources are properly released.

> [!important]
> **Console Output**
>
> The sample console output for this code is:
>
> Value of y: 5
> Dropping MySmartPointer!

---

## Summary

By implementing the Deref trait, your custom smart pointer works seamlessly as a regular reference, simplifying its integration with functions that expect references. Meanwhile, the Drop trait guarantees automatic cleanup of resources when the smart pointer goes out of scope, ensuring efficient resource management.

![The image is a conclusion slide with three key points about smart pointers, emphasizing flexibility, resource management, and control over memory. It features a gradient background and is copyrighted by KodeKloud.](https://kodekloud.com/kk-media/image/upload/v1752883767/notes-assets/images/Rust-Programming-Implementing-Your-Own-Smart-Pointer/smart-pointers-conclusion-slide.jpg)

Together, these traits offer you fine-grained control over memory and resource management in Rust, paving the way for more advanced and safe programming paradigms.

---

## Additional Resources

- [Rust Official Documentation](https://www.rust-lang.org/learn)
- [Understanding Ownership in Rust](https://doc.rust-lang.org/book/ch04-00-understanding-ownership.html)

For further reading on implementing custom smart pointers and advanced memory management techniques, explore additional tutorials available in the [Rust Programming Language Book](https://doc.rust-lang.org/book/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/rust/module/37d4032f-c90d-43ee-a0cd-981b95ab22b0/lesson/8b5a96f3-ce71-459b-8bff-e068e4bbb6a8)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/rust/module/37d4032f-c90d-43ee-a0cd-981b95ab22b0/lesson/0d9e02ac-0cc6-4e47-9a30-5443c6706575)**
>
> Practice lab
