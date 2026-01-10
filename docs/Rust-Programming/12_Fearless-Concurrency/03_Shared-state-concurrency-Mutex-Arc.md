# Shared state concurrency Mutex Arc - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Rust-Programming/Fearless-Concurrency/Shared-state-concurrency-Mutex-Arc)

---

## Table of Contents

- Shared state concurrency Mutex Arc
  - What Is a Mutex?
  - Atomic Reference Counting with Arc
  - Simple Data Sharing Example Without Threads
  - Sharing Immutable Data Between Threads
  - Sharing Mutable Data Between Threads
  - Sharing Immutable Data Safely with Arc
  - Sharing Mutable Data with Mutex and Arc
  - Handling a Poisoned Mutex
  - Conclusion
  - Watch Video
    - Single-Threaded Mutable Data Example
    - Ownership Issues in Multi-Threaded Context
    - Cloning Data for Each Thread

---

## Content

Rust Programming

Fearless Concurrency

# Shared state concurrency Mutex Arc

In this article, we explore shared-state concurrency in Rust—a powerful approach that allows multiple threads to access and modify the same data concurrently. Unlike message passing, which involves threads communicating by sending messages to one another, shared-state concurrency permits direct data manipulation across threads. Rust’s unique ownership and borrowing system ensures safe concurrency by catching data races at compile time, while tools like Mutex and Arc provide the additional safety required for mutable shared access.

![The image illustrates "Shared-State Concurrency" with three gears labeled Thread 1, Thread 2, and Thread 3, all pointing to a shared data bar.](https://kodekloud.com/kk-media/image/upload/v1752883879/notes-assets/images/Rust-Programming-Shared-state-concurrency-Mutex-Arc/shared-state-concurrency-gears.jpg)

When threads share data directly, the risk of race conditions and inconsistent state increases if the data is not properly synchronized. Rust alleviates these risks with its ownership model and by providing synchronization primitives such as Mutex and ref-counting types like Arc.

![The image illustrates Rust's concurrency safety features, highlighting concepts like Ownership, Borrowing, Mutex<T>, and Arc<T>, with the Rust logo at the center.](https://kodekloud.com/kk-media/image/upload/v1752883880/notes-assets/images/Rust-Programming-Shared-state-concurrency-Mutex-Arc/rust-concurrency-safety-ownership-borrowing.jpg)

Shared-state concurrency is especially advantageous in scenarios such as managing a shared database or cache, where threads must operate on the same data simultaneously for high performance. While message passing can sidestep many of these concurrency issues, direct shared access offers a more immediate approach for collaboration on common data.

![The image is a flowchart explaining the concept of shared-state concurrency, highlighting its use in maintaining a shared database and cache.](https://kodekloud.com/kk-media/image/upload/v1752883881/notes-assets/images/Rust-Programming-Shared-state-concurrency-Mutex-Arc/shared-state-concurrency-flowchart.jpg)

---

## What Is a Mutex?

A Mutex (short for mutual exclusion) is a synchronization primitive designed to ensure that only one thread accesses the protected data at any moment. Think of a Mutex as a lock on a resource—only the thread that holds the lock can access or modify the resource. This mechanism prevents multiple threads from interfering with each other.

![The image illustrates a concept of mutual exclusion with three threads, where "Thread 1" is active and locked, accessing shared data.](https://kodekloud.com/kk-media/image/upload/v1752883882/notes-assets/images/Rust-Programming-Shared-state-concurrency-Mutex-Arc/mutual-exclusion-three-threads.jpg)

Without a Mutex, if several threads try to change the same data concurrently, race conditions may occur. For example, if multiple threads attempt to increment the same counter simultaneously, two threads may read the same initial value and both increment it, resulting in an incorrect count.

---

## Atomic Reference Counting with Arc

Rust’s standard reference counting type, Rc<T>, works well in single-threaded contexts but falls short when multiple threads are involved because it does not perform atomic operations. Without atomic operations, concurrent modification of the reference count can lead to race conditions or undefined behavior.

This is where Arc<T> (Atomic Reference Counting) becomes indispensable. Arc<T> allows multiple threads to safely share ownership of the same data by managing an atomic reference count. It functions similarly to Rc<T> but is designed for concurrent use, ensuring that data is only dropped when the last thread has finished using it.

Atomic operations guarantee that updates to the reference count occur without interruption, protecting it from corruption.

![The image illustrates atomic reference counting with Arc<T>, showing three threads accessing shared data through atomic operations. It includes gears representing threads and a bar labeled "Data" connected to "Arc<T>".](https://kodekloud.com/kk-media/image/upload/v1752883883/notes-assets/images/Rust-Programming-Shared-state-concurrency-Mutex-Arc/atomic-reference-counting-arc-threads.jpg)

---

## Simple Data Sharing Example Without Threads

Before diving into multithreading, consider a basic example of data sharing without threads. Here, immutability guarantees safety because the data cannot be modified, and types such as integers automatically implement the Copy trait.

```
// Simple Data Sharing Without Threads
fn main() {
    let data: i32 = 5; // Immutable and safe to access directly.
    println!("Data: {}", data);
}
```

Console output:

```
my_first_crate on ✗ master [!+] is 🦀 v0.1.0 via 🦠 v1.82.0
cargo run --quiet
Data: 5
my_first_crate on ✗ master [!+] is 🦀 v0.1.0 via 🦠 v1.82.0
```

Even in a single-threaded environment, the compiler enforces ownership rules. For instance, modifying a mutable integer is perfectly acceptable:

```
fn main() {
    let mut data: i32 = 5;
    data += 1;
    println!("Data: {}", data);
}
```

Console output:

```
my_first_crate on ✗ master [!+] is 📦 v0.1.0 via 📦 v1.82.0
cargo run --quiet
Data: 6
my_first_crate on ✗ master [!+] is 📦 v0.1.0 via 📦 v1.82.0
```

---

## Sharing Immutable Data Between Threads

Immutable data, like an integer, can be effortlessly shared between threads because each thread receives its own copy courtesy of the Copy trait. The following example spawns multiple threads that work with their own copy of the shared data:

```
use std::thread;


fn main() {
    let data: i32 = 5; // Immutable data.
    let handles: Vec<_> = (0..5)
        .map(|_| {
            let data_copy = data; // Each thread gets its own copy.
            thread::spawn(move || {
                println!("Thread sees: {}", data_copy);
            })
        })
        .collect();


    for handle in handles {
        handle.join().unwrap();
    }
}
```

Removing the `move` keyword results in a compile-time error because the threads would then attempt to borrow `data` from the main thread. The error highlights that the spawned threads require a static lifetime for captured data:

```
error[E0597]: `data` does not live long enough
  --> src/main.rs:12:45
   |
6  |     let data = 5; // Immutable data.
   |         ----- binding `data` declared here
...
10 |         .map(|_| {
   |       ----- value captured here
11 |             thread::spawn(|| {
12 |                 println!("Thread sees: {}", data);
   |                                    ^^^^^ borrowed value does not live long enough
...
14 |     } // argument requires that `data` is borrowed for `'static`
```

> [!important]
> **Note**
>
> To resolve this, use the `move` keyword to transfer ownership or copy the data into each thread.

---

## Sharing Mutable Data Between Threads

### Single-Threaded Mutable Data Example

For comparison, consider a single-threaded scenario where a mutable vector is modified successfully:

```
fn main() {
    let mut data: Vec<i32> = vec![1, 2, 3]; // Mutable vector.
    data.push(4); // Modify the vector.
    println!("Updated data: {:?}", data);
}
```

### Ownership Issues in Multi-Threaded Context

Sharing mutable data across threads without proper synchronization causes ownership issues. For example, the following code will not compile because the `move` keyword transfers ownership of `data` to the first thread, leaving it inaccessible to others:

```
use std::thread;


fn main() {
    let mut data: Vec<i32> = vec![1, 2, 3];
    let handles: Vec<_> = (0..5)
        .map(|_| {
            thread::spawn(move || {
                data.push(4); // Attempt to modify the vector from multiple threads.
            })
        })
        .collect();


    for handle in handles {
        handle.join().unwrap();
    }
}
```

Since vectors do not implement the Copy trait, cloning the data for each thread is one workaround:

### Cloning Data for Each Thread

```
// Cloning Data for Threads
use std::thread;


fn main() {
    let data: Vec<i32> = vec![1, 2, 3]; // Immutable vector.
    let handles: Vec<_> = (0..5)
        .map(|_| {
            let data_clone: Vec<i32> = data.clone();
            thread::spawn(move || {
                let mut local_data = data_clone;
                local_data.push(4);
                println!("Thread sees data: {:?}", local_data);
            })
        })
        .collect();


    for handle in handles {
        handle.join().unwrap();
    }
}
```

While cloning sidesteps ownership and synchronization challenges, it may be inefficient for large data sets and does not allow threads to share modifications.

---

## Sharing Immutable Data Safely with Arc

To share immutable data among threads without cloning the entire structure, use Arc. Note that Arc only provides immutable access:

```
use std::sync::Arc;
use std::thread;


fn main() {
    let data: Arc<Vec<i32>> = Arc::new(vec![1, 2, 3]); // Shared immutable data.
    let handles: Vec<_> = (0..5)
        .map(|_| {
            let data_clone = Arc::clone(&data); // Clone the Arc to increment the reference count.
            thread::spawn(move || {
                println!("Thread sees: {:?}", data_clone);
            })
        })
        .collect();


    for handle in handles {
        handle.join().unwrap();
    }
}
```

Attempting to modify the data inside an Arc will result in a compile-time error:

```
use std::sync::Arc;
use std::thread;


fn main() {
    let data: Arc<Vec<i32>> = Arc::new(vec![1, 2, 3]);
    let handles: Vec<_> = (0..5)
        .map(|_| {
            let data_clone = Arc::clone(&data);
            thread::spawn(move || {
                // data_clone.push(4); // Error: cannot borrow data in an Arc as mutable.
                println!("Thread sees: {:?}", data_clone);
            })
        })
        .collect();
}
```

Because the contents of an Arc are immutable by default, you must combine Arc with a Mutex if you need to modify shared data.

---

## Sharing Mutable Data with Mutex and Arc

To safely modify shared data across multiple threads, wrap the data in a Mutex and then further wrap the Mutex in an Arc. This approach guarantees that only one thread can access the data at a time:

```
use std::sync::{Arc, Mutex};
use std::thread;


fn main() {
    let data: Arc<Mutex<Vec<i32>>> = Arc::new(Mutex::new(vec![1, 2, 3])); // Shared and synchronized mutable data.


    let handles: Vec<_> = (0..5)
        .map(|_| {
            let data_clone = Arc::clone(&data); // Clone the Arc for each thread.
            thread::spawn(move || {
                let mut data = data_clone.lock().unwrap(); // Lock the Mutex for safe access.
                data.push(4); // Safely modify the shared vector.
                println!("Thread updated data: {:?}", data);
            })
        })
        .collect();


    for handle in handles {
        handle.join().unwrap(); // Wait for all threads to complete.
    }


    println!("Final data: {:?}", *data.lock().unwrap());
}
```

In this example, each thread locks the Mutex before accessing and modifying the vector. If the Mutex is already locked by another thread, the calling thread will block until the lock becomes available. The MutexGuard automatically releases the lock when it goes out of scope.

> [!important]
> **Note**
>
> Using Mutex with Arc is a common pattern in Rust for safely sharing mutable state between threads.

---

## Handling a Poisoned Mutex

A Mutex becomes poisoned when a thread panics while holding its lock. Subsequent attempts to acquire the lock will then return an error. The following example illustrates how to handle a poisoned Mutex:

```
use std::sync::{Arc, Mutex};
use std::thread;


fn main() {
    let data: Arc<Mutex<Vec<i32>>> = Arc::new(Mutex::new(vec![1, 2, 3]));
    let handles: Vec<_> = (0..5)
        .map(|i: i32| {
            let data_clone = Arc::clone(&data);
            thread::spawn(move || {
                let mut data = data_clone.lock().unwrap(); // Lock the Mutex.
                if i == 2 {
                    panic!("Thread panicked!"); // Simulate a panic in one thread.
                }
                data.push(i);
                println!("Thread {} updated data: {:?}", i, data);
            })
        })
        .collect();


    for handle in handles {
        let _ = handle.join(); // Join threads even if one panicked.
    }


    // Attempt to acquire the mutex after potential panic.
    let lock_result = data.lock();
    match lock_result {
        Ok(data) => println!("Final data: {:?}", data),
        Err(poisoned) => {
            println!("Mutex is poisoned! Recovering data...");
            let data = poisoned.into_inner(); // Recover the data despite the poison.
            println!("Recovered data: {:?}", data);
        }
    }
}
```

In the example above, one thread deliberately panics, which poisons the Mutex. When the main thread later tries to acquire the lock, it handles the error by recovering the data.

![The image shows a code editor with Rust programming code, focusing on thread handling and mutex locking. The terminal section is open at the bottom of the editor.](https://kodekloud.com/kk-media/image/upload/v1752883884/notes-assets/images/Rust-Programming-Shared-state-concurrency-Mutex-Arc/rust-code-editor-thread-mutex.jpg)

> [!important]
> **Warning**
>
> When a Mutex is poisoned, ensure your error handling logic properly recovers the data to maintain application stability.

---

## Conclusion

In this article, we delved into the fundamental concepts of shared-state concurrency in Rust. We examined how Rust's strict ownership model naturally enforces safe concurrent programming and how powerful primitives like Mutex and Arc allow for sharing and modifying data across threads. This knowledge is vital for developing robust, multi-threaded applications in Rust while avoiding common pitfalls such as race conditions and data corruption.

For further reading on Rust concurrency and advanced synchronization techniques, check out the [Rust Documentation](https://www.rust-lang.org/learn).

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/rust/module/0418d83c-2090-4aac-8b6e-8c3eab45d649/lesson/fe82cd9d-7201-4304-a7b6-2841ae1b7d86)**
>
> Watch video content
