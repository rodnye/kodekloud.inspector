# Send and Sync traits - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Rust-Programming/Fearless-Concurrency/Send-and-Sync-traits)

---

## Table of Contents

- Send and Sync traits
  - Understanding the Send Trait
  - Understanding the Sync Trait
  - Manual Implementation of Send and Sync
  - Ownership Transfer and Channels
  - Summary
  - Watch Video
  - Practice Lab

---

## Content

Rust Programming

Fearless Concurrency

# Send and Sync traits

In this article, we explore Rust's Send and Sync traits—cornerstones of thread safety in concurrent programming. Leveraging Rust’s robust ownership and borrowing rules, these traits help prevent concurrency bugs such as data races, ensuring that types shared across threads are used safely.

![The image illustrates "Concurrency Safety With Send and Sync" using two icons: one for "Send" with an envelope symbol and another for "Sync" with overlapping documents.](https://kodekloud.com/kk-media/image/upload/v1752883875/notes-assets/images/Rust-Programming-Send-and-Sync-traits/concurrency-safety-send-sync-icons.jpg)

## Understanding the Send Trait

The Send trait permits ownership of a value to be transferred across threads. When a type implements Send, it indicates that moving its ownership into another thread is safe. The Rust compiler auto-implements Send for types that are thread-safe to transfer.

![The image is a slide titled "Understanding Send Trait" with two sections: "Ownership" represented by an icon, and "Threads" in a blue rectangle.](https://kodekloud.com/kk-media/image/upload/v1752883876/notes-assets/images/Rust-Programming-Send-and-Sync-traits/understanding-send-trait-ownership-threads.jpg)

Consider the following example where a vector is transferred to a new thread using the `move` keyword:

```
use std::thread;


fn main() {
    let v = vec![1, 2, 3];


    let handle = thread::spawn(move || {
        println!("Here's a vector: {:?}", v);
    });


    handle.join().unwrap();
}
```

In this code, the vector `v` is moved into a new thread because `Vec<T>` implements Send. If it didn't, the compiler would prevent the transfer to ensure safety.

> [!important]
> **Tip**
>
> Use the Send trait to safely pass data between threads, enabling concurrent operations without risking data corruption.

## Understanding the Sync Trait

The Sync trait indicates that a type can be safely referenced from multiple threads concurrently. When a type implements Sync, immutable references to it can be shared across threads without concerns for data races. Primitive types are typically Sync, whereas types like `RefCell<T>`, which allow interior mutability, are not.

Here's an example employing `Arc` (Atomic Reference Counting) to share a vector safely between threads:

```
use std::sync::Arc;
use std::thread;


fn main() {
    let v = Arc::new(vec![1, 2, 3]);


    let v1 = Arc::clone(&v);
    let handle = thread::spawn(move || {
        println!("Here's a vector: {:?}", v1);
    });


    println!("Here's the main thread vector: {:?}", v);

    handle.join().unwrap();
}
```

In this example, `Arc` provides thread-safe shared ownership. If `Arc` were not Sync, the Rust compiler would prevent such shared access, thereby averting potential data races.

> [!important]
> **Did You Know?**
>
> Most types in Rust automatically implement both Send and Sync. This seamless implementation is part of what makes Rust a powerful language for concurrent programming.

## Manual Implementation of Send and Sync

Generally, Rust’s compiler handles trait implementations automatically. However, there are rare cases where manual implementation becomes necessary, particularly for custom types comprising non-primitive data or raw pointers. Manual implementation must be approached with caution, as it bypasses safety checks.

For instance, consider a custom type containing a raw pointer:

```
use std::thread;


fn main() {
    struct MyType {
        data: *const u8,
    }


    unsafe impl Send for MyType {}
}
```

In the example above, since raw pointers are inherently unsafe for thread sharing, the `unsafe impl Send` declaration must be used only when you are completely certain that transferring the type across threads is secure.

> [!important]
> **Caution**
>
> Manual implementations of Send and Sync should be used sparingly. Always ensure a thorough understanding of concurrency implications before overriding the compiler's safety guarantees.

## Ownership Transfer and Channels

When creating new threads in Rust, data transfer is commonly performed using the `move` keyword. This approach ensures that data ownership is safely handed over to another thread as long as the type implements Send.

Channels facilitate thread communication by allowing data to be sent between threads. The data traversing these channels must implement Send, ensuring safe data transfer among threads.

Consider the following example where a vector is sent from one thread to another via a channel:

```
use std::sync::mpsc;
use std::thread;


fn main() {
    let (tx, rx) = mpsc::channel();


    thread::spawn(move || {
        let v = vec![1, 2, 3];
        tx.send(v).unwrap();
    });


    let received = rx.recv().unwrap();
    println!("Got: {:?}", received);
}
```

Here, the vector's ownership is seamlessly transferred through the channel because `Vec<T>` adheres to the Send trait. This design ensures thread safety and leverages Rust's robust concurrency model.

## Summary

The Send and Sync traits are essential to Rust's approach to concurrency. The Send trait ensures that data ownership can be moved between threads, while the Sync trait allows multiple threads to share immutable references safely. Together, these traits provide a solid foundation for building reliable and concurrent Rust applications.

![The image explains the interaction between "Send" and "Sync" in programming, where "Send" allows data ownership to move between threads, and "Sync" allows data references to be shared between threads.](https://kodekloud.com/kk-media/image/upload/v1752883877/notes-assets/images/Rust-Programming-Send-and-Sync-traits/send-sync-thread-interaction.jpg)

In practice, most Rust types automatically implement these traits, reducing the manual overhead on developers. However, with complex types involving interior mutability or raw pointers, always verify and ensure the correct implementation of Send and Sync to maintain concurrency safety.

![The image outlines best practices for Rust programming, emphasizing trust in the compiler's automatic implementations, caution in manual trait implementation, and the use of concurrency tools for safe data management.](https://kodekloud.com/kk-media/image/upload/v1752883878/notes-assets/images/Rust-Programming-Send-and-Sync-traits/rust-programming-best-practices.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/rust/module/0418d83c-2090-4aac-8b6e-8c3eab45d649/lesson/a9178bb8-b90f-425f-8b8b-b139e5c65d97)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/rust/module/0418d83c-2090-4aac-8b6e-8c3eab45d649/lesson/aff4e058-f816-4768-a4c0-93475f5afbcf)**
>
> Practice lab
