# Async Await and Futures - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Rust-Programming/Asynchronous-Programming/Async-Await-and-Futures)

---

## Table of Contents

- Async Await and Futures
  - Why Asynchronous Programming?
  - The Async Runtime
  - Setting Up Tokio
  - Understanding Futures and Tasks
  - Writing Async Functions in Rust
  - The Await Keyword
  - Running Tasks Concurrently
  - Joining Tasks
  - Best Practices for Async Rust
  - Watch Video
    - Example: Concurrent Execution with Tokio
    - Summary

---

## Content

Rust Programming

Asynchronous Programming

# Async Await and Futures

In this guide, we explore how Rust implements efficient concurrency using async/await and futures. We will examine the async runtime, the difference between futures and tasks, and demonstrate how you can write asynchronous functions, spawn concurrent tasks, and join them correctly.

## Why Asynchronous Programming?

Modern applications often need to handle multiple operations simultaneously—such as processing user input, fetching data from servers, or writing to databases—without blocking the user interface. Asynchronous programming enables you to write non-blocking, efficient code even during intensive I/O operations. Unlike traditional blocking models, this approach ensures your application remains responsive, even when waiting on slow tasks.

> [!important]
> **Key Benefit**
>
> Asynchronous programming is particularly beneficial when dealing with I/O-bound tasks, as it maximizes resource utilization and improves overall performance.

## The Async Runtime

The async runtime is at the heart of managing and scheduling asynchronous tasks. It handles interactions with the operating system for I/O events and ensures that tasks run efficiently. The runtime is composed of three main components:

- **Reactor/Event Loop:** Listens for and processes I/O events.
- **Scheduler:** Determines the execution order of tasks.
- **Executor:** Drives tasks to completion by running them.

Since Rust does not ship with a built-in async runtime, developers often opt for external libraries like [Tokio](https://tokio.rs/)—which is the runtime used in our examples.

![The image is a slide titled "The Async Runtime" and lists key components: Reactor/Event Loop, Scheduler, and Executor, with brief descriptions of their functions.](https://kodekloud.com/kk-media/image/upload/v1752883797/notes-assets/images/Rust-Programming-Async-Await-and-Futures/async-runtime-reactor-scheduler-executor.jpg)

## Setting Up Tokio

To start using Tokio, include it in your `Cargo.toml` file with the full features enabled:

```
[dependencies]
tokio = { version = "1", features = ["full"] }
```

In your main file, use the `#[tokio::main]` macro to initialize the runtime, which allows your `main` function to be asynchronous:

```
#[tokio::main]
async fn main() {
    // Your async code here
}
```

This setup allows you to tap into the full potential of asynchronous programming with Tokio.

## Understanding Futures and Tasks

Before diving deeper, it is important to grasp two fundamental concepts in asynchronous programming:

| Concept | Description                                                                                                               |
| ------- | ------------------------------------------------------------------------------------------------------------------------- |
| Futures | Objects representing a computation that will eventually produce a value. They are like promises that yield results later. |
| Tasks   | Units of execution managed by the async runtime, responsible for driving futures to completion concurrently.              |

An async function returns a future, while tasks are the logical execution units created to run these futures.

![The image is a comparison between "Futures" and "Tasks" in programming, explaining their roles and relationship. Futures represent values available in the future and are inert until polled, while tasks are logical units of execution managed by the runtime.](https://kodekloud.com/kk-media/image/upload/v1752883799/notes-assets/images/Rust-Programming-Async-Await-and-Futures/futures-tasks-comparison-programming.jpg)

## Writing Async Functions in Rust

Declaring an async function in Rust is straightforward—simply add the `async` keyword before the function declaration. It’s important to note that calling an async function does not execute its code immediately; instead, it returns a future that you must await.

```
async fn fetch_data() -> Result<Data, Error> {
    // Async code here
}
```

Within an async function, you can call other async functions and use the `await` keyword to wait for their results.

## The Await Keyword

The `await` keyword extracts the result from a future. When a future is awaited, and if it is ready, its value is returned immediately. If the future is still pending (waiting on I/O or other asynchronous tasks), the async function yields control back to the runtime so that other tasks can be executed.

Consider this example:

```
async fn say_hello() {
    println!("Hello, world!");
}


#[tokio::main]
async fn main() {
    say_hello().await;
}
```

Without using `.await`, the body of `say_hello` would not execute, and no output would be produced.

> [!important]
> **Remember**
>
> Always use `await` when calling async functions to ensure their execution.

## Running Tasks Concurrently

By default, async functions executed with `await` will run sequentially. For example:

```
async fn main() {
    task1().await;
    task2().await;
}
```

In this instance, `task1` completes fully before `task2` begins. To run tasks concurrently and improve performance, you can spawn them using Tokio:

```
#[tokio::main]
async fn main() {
    tokio::spawn(task1());
    tokio::spawn(task2());
    // Optionally, wait for tasks to complete if necessary
}
```

Spawning tasks allows the async runtime to manage them concurrently. Here’s another way to spawn a simple async block:

```
tokio::spawn(async {
    // Task code here
});
```

### Example: Concurrent Execution with Tokio

The following example demonstrates how to run two async functions concurrently using Tokio’s spawn functionality. Since the tasks are executed concurrently, the output may appear in any order.

```
async fn say_hello() {
    println!("Hello");
}


async fn say_world() {
    println!("World");
}


#[tokio::main]
async fn main() {
    tokio::spawn(say_hello());
    tokio::spawn(say_world());


    // Allow spawned tasks enough time to complete before the program exits.
    tokio::time::sleep(tokio::time::Duration::from_secs(1)).await;
}
```

## Joining Tasks

There are situations when you need to wait for a spawned task to complete and retrieve its result. This process is known as joining. When you spawn a task, it returns a join handle, which can be awaited:

```
let handle = tokio::spawn(task());
let result = handle.await;
```

The join handle is itself a future that returns a `Result<T, E>` indicating whether the task executed successfully (`Ok`) or encountered an error (`Err`). If you are confident the task will not panic, you may use `.await.unwrap()` to directly access the result.

![The image is an informational graphic explaining "JoinHandle" in programming, detailing its role as a handle to a spawned task and how it implements Future for awaiting. It also describes the process of awaiting a JoinHandle, including the return of a Result and handling of task completion or errors.](https://kodekloud.com/kk-media/image/upload/v1752883800/notes-assets/images/Rust-Programming-Async-Await-and-Futures/joinhandle-programming-graphic.jpg)

## Best Practices for Async Rust

- Always await futures; otherwise, the code inside the async function will not be executed.
- Avoid blocking operations such as the standard sleep. Instead, use asynchronous variants like `tokio::time::sleep`.
- Only spawn tasks when you need concurrency. Unnecessary spawning can lead to increased resource consumption and added complexity.

> [!important]
> **Performance Tip**
>
> Be cautious with excessive task spawning as it can lead to resource contention. Use concurrency only when it benefits your application's performance.

### Summary

Async functions in Rust return futures, which can be executed using the `await` keyword. Spawning tasks allows for concurrent execution, and joining tasks lets you retrieve their results once they are finished. Understanding these concepts is crucial for developing responsive, efficient applications in Rust.

![The image is a summary slide with key takeaways about async functions, stating that they return futures and that "await" is used to execute futures.](https://kodekloud.com/kk-media/image/upload/v1752883801/notes-assets/images/Rust-Programming-Async-Await-and-Futures/async-functions-key-takeaways-summary.jpg)

For further exploration, consider delving into async I/O operations or investigating async streams and channels to build even more sophisticated concurrent applications. For more information, check out the official [Tokio documentation](https://tokio.rs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/rust/module/9f40c3c7-3b88-4cd7-b65e-7a45fc7d0d64/lesson/2eab58dd-ae54-48e3-b449-6548e109ecca)**
>
> Watch video content
