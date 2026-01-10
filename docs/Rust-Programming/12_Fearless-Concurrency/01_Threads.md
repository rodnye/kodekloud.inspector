# Threads - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Rust-Programming/Fearless-Concurrency/Threads)

---

## Table of Contents

- Threads
  - What Is a Thread?
  - Creating a Thread
  - Ensuring Thread Completion with Join
  - Moving Ownership into Threads with the Move Keyword
  - Handling Panics in Threads
  - Watch Video

---

## Content

Rust Programming

Fearless Concurrency

# Threads

In this article, we explore threads and concurrency in Rust—a fundamental aspect of modern programming that enables the simultaneous execution of multiple tasks. Rust's safe concurrency model leverages its powerful ownership and borrowing system to prevent common issues like data races, making it an ideal choice for building robust, parallel applications.

In this lesson, we cover Rust's threading model by discussing how to create threads, join them, and transfer ownership using the move keyword. We provide concrete code examples to illustrate each concept and explain why these features are necessary.

![The image is an illustration related to concurrency, featuring a person at a desk with programming symbols and three labeled sections: "Thread Creation," "Joining Threads," and "Move Keyword."](https://kodekloud.com/kk-media/image/upload/v1752883885/notes-assets/images/Rust-Programming-Threads/concurrency-illustration-thread-creation.jpg)

## What Is a Thread?

A thread is a lightweight unit of a process that runs concurrently with other threads in the same process. While each thread has its own execution context—complete with its own stack and program counter—all threads share the same memory space. This shared memory enables effective inter-thread communication but also poses challenges such as data races. Rust’s ownership model is designed to prevent these issues by enforcing strict rules on memory access.

![The image illustrates the concept of threads and execution contexts using interconnected gears, with each gear labeled as either a "Thread" or "Execution Context."](https://kodekloud.com/kk-media/image/upload/v1752883886/notes-assets/images/Rust-Programming-Threads/threads-execution-contexts-gears.jpg)

## Creating a Thread

Creating a thread in Rust is straightforward with the help of the standard library's thread module and its `spawn` function. The `spawn` function takes a closure that contains the code to run concurrently with the main thread. Consider the following example:

```
fn main() {
    std::thread::spawn(|| {
        for i in 1..5 {
            println!("Hello from the spawned thread: {}", i);
        }
    });

    for i in 1..5 {
        println!("Hello from the main thread: {}", i);
    }
}
```

In this snippet, a new thread is spawned to print messages from 1 to 4, while the main thread executes its own loop concurrently. Since thread scheduling is handled by the operating system, the output may interleave differently with every run.

> [!important]
> **Interleaved Output**
>
> Keep in mind that because threads run concurrently, the order of printed messages between the spawned thread and the main thread is not guaranteed.

For example, one execution might display:

```
Hello from the main thread: 1
Hello from the main thread: 2
Hello from the main thread: 3
Hello from the main thread: 4
Hello from the spawned thread: 1
Hello from the spawned thread: 2
Hello from the spawned thread: 3
Hello from the spawned thread: 4
```

However, if the main thread completes its loop before the spawned thread finishes, some output from the spawned thread might be lost as the process exits.

## Ensuring Thread Completion with Join

To ensure that a spawned thread completes its execution before the main thread terminates, Rust offers the `join` method. The `spawn` function returns a join handle representing the spawned thread, and calling `join()` on this handle blocks the main thread until the spawned thread finishes.

Here’s an example that demonstrates how to use `join`:

```
fn main() {
    // Spawn a new thread and store its join handle.
    let handle = std::thread::spawn(|| {
        for i in 1..5 {
            println!("Hello from the spawned thread: {}", i);
        }
    });

    // The main thread executes its own loop.
    for i in 1..5 {
        println!("Hello from the main thread: {}", i);
    }

    // Wait for the spawned thread to finish before exiting.
    handle.join().unwrap();
}
```

Using `join` guarantees that both the main and spawned threads complete their tasks, thereby preventing premature termination of the spawned thread.

## Moving Ownership into Threads with the Move Keyword

Rust allows you to transfer ownership of variables into threads using the `move` keyword. This is particularly useful when data owned by the main thread needs to be accessed within a spawned thread. Without `move`, the closure might borrow values from the parent thread, leading to potential lifetime issues.

Consider the following code that attempts to borrow a vector from the main thread:

```
fn main() {
    let v: Vec<i32> = vec![1, 2, 3];

    let handle = std::thread::spawn(|| {
        // This closure attempts to borrow `v`
        println!("Vector: {:?}", v);
    });

    handle.join().unwrap();
}
```

The compiler will produce an error because the closure is borrowing `v`, which is owned by the main function. To resolve this issue, add the `move` keyword to transfer ownership of `v` into the closure:

```
fn main() {
    let v: Vec<i32> = vec![1, 2, 3];

    let handle = std::thread::spawn(move || {
        // Ownership of `v` has been moved into the closure.
        println!("Vector: {:?}", v);
    });

    handle.join().unwrap();

    // Uncommenting the line below will cause a compile-time error,
    // as `v` has already been moved.
    // println!("Main thread: {:?}", v);
}
```

> [!important]
> **Ownership Transfer**
>
> Using the `move` keyword ensures that the data remains valid for the spawned thread, but remember that the original owner in the main thread loses access to that data.

![The image explains the concept of capturing variables in threads, highlighting the use of the "move" keyword, the necessity for thread ownership, and potential borrowing issues.](https://kodekloud.com/kk-media/image/upload/v1752883887/notes-assets/images/Rust-Programming-Threads/capturing-variables-threads-move.jpg)

## Handling Panics in Threads

Sometimes a thread may panic during execution. When you call `join()` on a thread that has panicked, the panic is propagated back to the main thread. You can handle this scenario gracefully by matching on the `Result` returned by `join()`. For example:

```
use std::thread;
use std::thread::JoinHandle;

fn main() {
    let handle: JoinHandle<()> = thread::spawn(|| {
        panic!("Oh no! Something went wrong.");
    });

    let result: Result<(), Box<dyn std::any::Any + Send>> = handle.join();

    match result {
        Ok(_) => println!("Thread completed successfully."),
        Err(e) => println!("Thread panicked with error: {:?}", e),
    }
}
```

In this code, the spawned thread panics, and the panic is captured when calling `join()`. By matching on the result, you can gracefully handle the error and take appropriate measures as needed.

---

By understanding and leveraging thread spawning, joining, and ownership transfer with the `move` keyword, you can effectively manage concurrency in Rust. These techniques safeguard against common pitfalls such as data races and ensure that all threads complete their execution as expected.

For further details, you might want to explore more about Rust's concurrency guarantees and how its ownership model contributes to thread safety.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/rust/module/0418d83c-2090-4aac-8b6e-8c3eab45d649/lesson/1207f543-389e-44e6-9df6-759290d79b20)**
>
> Watch video content
