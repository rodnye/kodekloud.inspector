# Message passing - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Rust-Programming/Fearless-Concurrency/Message-passing)

---

## Table of Contents

- Message passing
  - What Is a Channel?
  - Creating and Using Channels
  - Message Passing Between Threads
  - Cloning the Sender for Multiple Producers
  - Recap
  - Watch Video
    - Receiving Messages

---

## Content

Rust Programming

Fearless Concurrency

# Message passing

In this lesson, we'll explore message passing in Rust, a powerful model for handling concurrency that enables safe communication between threads. By sending and receiving messages rather than sharing data directly, you can minimize the risk of data races while adhering to Rust’s ownership and borrowing principles.

When working with message passing in Rust, channels serve as the primary mechanism. They allow threads to send values to each other in a safe and efficient manner.

## What Is a Channel?

A channel in Rust is a communication primitive that enables threads to pass messages between one another. Think of it as a pipeline: one end (the sender) pushes data into the channel, while the other end (the receiver) pulls data out.

![The image is a diagram about "Message Passing" in programming, highlighting concepts of "Ownership" and "Borrowing," with a focus on doing so "Safely" and "Efficiently."](https://kodekloud.com/kk-media/image/upload/v1752883873/notes-assets/images/Rust-Programming-Message-passing/message-passing-ownership-borrowing-diagram.jpg)

Rust provides the `std::sync::mpsc` module—where MPSC stands for "multiple producers, single consumer"—as the standard way to create channels. This allows multiple threads to send messages into the channel while a single thread is designated to receive them.

Below is a simple example illustrating how to create a channel:

```
rust
use std::sync::mpsc;


fn main() {
    let (tx, rx) = mpsc::channel();
}
```

In this code, `tx` represents the sender and `rx` represents the receiver. While this MPSC channel is suitable for many message-passing scenarios, Rust also supports more complex configurations like multi-consumer channels when needed.

![The image illustrates Rust's channel mechanism, highlighting "Multiple-Producer, Single-Consumer" with sections for "Multi-Producer" and "Multi-Consumer Channels."](https://kodekloud.com/kk-media/image/upload/v1752883874/notes-assets/images/Rust-Programming-Message-passing/rust-channel-mechanism-mpsc.jpg)

## Creating and Using Channels

Channels in Rust are created with the `channel` function, which returns a tuple containing a sender and a receiver. Here’s how you can create a channel for sending `String` messages:

```
rust
use std::sync::mpsc::{self, Sender, Receiver};


fn main() {
    let (tx, rx): (Sender<String>, Receiver<String>) = mpsc::channel();
}
```

If the type of messages is ambiguous, clear type annotations or sending an initial message can help the compiler infer the correct type.

For example, to send a message using the channel:

```
rust
use std::sync::mpsc::{self, Sender, Receiver};


fn main() {
    let (tx, rx): (Sender<String>, Receiver<String>) = mpsc::channel();
    tx.send(String::from("Hello")).unwrap();
}
```

The `send` method transfers ownership of the value into the channel. If the receiver is not present, this method will return an error.

> [!important]
> **Compiler Warning**
>
> When running the program above, you might see a warning about the unused variable `rx`. To suppress this warning, either use the receiver in your code or prefix it with an underscore (i.e., `_rx`).

### Receiving Messages

On the receiving side, you can use the blocking `recv` method to wait for a message:

```
rust
use std::sync::mpsc::{self, Sender, Receiver};


fn main() {
    let (tx, rx): (Sender<String>, Receiver<String>) = mpsc::channel();
    tx.send(String::from("Hello")).unwrap();


    let received: String = rx.recv().unwrap();
    println!("Received: {}", received);
}
```

In the example above, `rx.recv()` blocks the current thread until a message is available, and the message is then printed to the console.

Alternatively, if you prefer a non-blocking approach, you can use `try_recv`. This method immediately returns an error if no message has arrived yet:

```
rust
use std::sync::mpsc::{self, Sender, Receiver};


fn main() {
    let (tx, rx): (Sender<String>, Receiver<String>) = mpsc::channel();
    tx.send(String::from("Hello")).unwrap();


    let received: String = rx.try_recv().unwrap();
    println!("Received: {}", received);
}
```

Running either of these examples should produce the following output:

```
bash
cargo run --quiet
Received: Hello
```

## Message Passing Between Threads

A common scenario for using channels is communicating between threads. Consider this example, where a child thread sends a message to the main thread:

```
rust
use std::sync::mpsc::{self, Sender, Receiver};
use std::thread;


fn main() {
    let (tx, rx): (mpsc::Sender<String>, mpsc::Receiver<String>) = mpsc::channel();


    thread::spawn(move || {
        let msg = String::from("Hi from thread");
        tx.send(msg).unwrap(); // Sends a message to the main thread
    });


    let received = rx.recv().unwrap(); // Receives the message
    println!("Received: {}", received);
}
```

Notice how the `move` keyword is used to transfer ownership of the sender `tx` into the child thread. Attempting to use `tx` in the main thread after the move would result in a compiler error.

To ensure proper synchronization, you can capture the thread handle and call `join` to wait for the thread to complete:

```
rust
use std::sync::mpsc::{self, Sender, Receiver};
use std::thread::{self, JoinHandle};


fn main() {
    let (tx, rx): (mpsc::Sender<String>, mpsc::Receiver<String>) = mpsc::channel();


    let handle: JoinHandle<()> = thread::spawn(move || {
        let msg = String::from("Hi from thread");
        tx.send(msg).unwrap(); // Sends a message to the main thread
    });


    let received = rx.recv().unwrap(); // Receives the message
    println!("Received: {}", received);
    handle.join().unwrap();
}
```

## Cloning the Sender for Multiple Producers

When you need multiple threads to send messages to a single receiver, you can clone the sender. The example below spawns five threads, each sending an integer to the receiver:

```
rust
use std::sync::mpsc::{self, Sender, Receiver};
use std::thread;


fn main() {
    let (tx, rx): (mpsc::Sender<i32>, mpsc::Receiver<i32>) = mpsc::channel();


    for i in 0..5 {
        // Clone the sender for each thread
        let tx_clone = tx.clone();
        thread::spawn(move || {
            tx_clone.send(i).unwrap();
        });
    }


    // Use the iterator interface to receive exactly five messages
    for received in rx.iter().take(5) {
        println!("Received: {}", received);
    }
}
```

A sample output might be:

```
bash
cargo run --quiet
Received: 0
Received: 1
Received: 2
Received: 4
Received: 3
```

Since thread execution is non-deterministic, the order of messages may vary.

Alternatively, you can let the receiver’s iterator run until all sender handles are dropped, automatically ending the loop once all messages have been processed:

```
rust
use std::sync::mpsc::{self, Sender, Receiver};
use std::thread;


fn main() {
    let (tx, rx): (mpsc::Sender<i32>, mpsc::Receiver<i32>) = mpsc::channel();


    for i in 0..5 {
        let tx_clone = tx.clone();
        thread::spawn(move || {
            tx_clone.send(i).unwrap();
        });
    }


    // Iterates over incoming messages until the channel is closed
    for received in rx {
        println!("Received: {}", received);
    }
}
```

Once all messages are received and all sender handles go out of scope, the receiver’s iterator exits, and the program terminates gracefully.

## Recap

Message passing in Rust offers a safe and efficient mechanism to manage concurrency by transferring ownership through channels. Use this approach when you need to coordinate work among several threads without sharing mutable state. Its seamless integration with Rust's ownership and borrowing model makes it an essential tool in your Rust programming toolkit.

For more detailed information, consider checking out [Rust's official documentation](https://doc.rust-lang.org/std/sync/mpsc/) on channels.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/rust/module/0418d83c-2090-4aac-8b6e-8c3eab45d649/lesson/5b733589-f0b5-479b-97ce-12f03026d5fc)**
>
> Watch video content
