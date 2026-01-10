# Building a Concurrent URL Pinger - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Rust-Programming/Asynchronous-Programming/Building-a-Concurrent-URL-Pinger)

---

## Table of Contents

- Building a Concurrent URL Pinger
  - Project Goals
  - Components Overview
  - Setting Up the Project
  - Implementing the URL Pinger
  - Running the Program
  - Ideas for Extending the Project
  - Conclusion
  - Watch Video
  - Practice Lab

---

## Content

Rust Programming

Asynchronous Programming

# Building a Concurrent URL Pinger

In this lesson, you'll learn how to build a concurrent URL pinger in Rust. This project showcases asynchronous programming by concurrently pinging multiple URLs and displaying their HTTP status codes using Rust's async features.

## Project Goals

The primary objectives for this project are:

- Make HTTP GET requests to several URLs concurrently.
- Display each URL’s response status code or provide an error message if the request fails.
- Limit the number of concurrent requests to prevent overloading the system.

![The image is a slide titled "Project: Building a Concurrent URL Pinger in Rust," outlining goals such as making concurrent HTTP GET requests, displaying response status codes, and limiting concurrent requests.](https://kodekloud.com/kk-media/image/upload/v1752883802/notes-assets/images/Rust-Programming-Building-a-Concurrent-URL-Pinger/project-building-concurrent-url-pinger-rust.jpg)

## Components Overview

This project leverages the following components:

- **HTTP Client:** The `reqwest` library is used for making HTTP GET requests.
- **Concurrency:** The Tokio runtime's `tokio::spawn` function enables asynchronous task management.
- **Error Handling:** Errors during HTTP requests are managed gracefully with informative error messages.

![The image is a slide titled "Project: Building a Concurrent URL Pinger in Rust," outlining components such as using `reqwest` for HTTP requests, `tokio::spawn` for concurrency, and error handling strategies.](https://kodekloud.com/kk-media/image/upload/v1752883804/notes-assets/images/Rust-Programming-Building-a-Concurrent-URL-Pinger/building-concurrent-url-pinger-rust.jpg)

## Setting Up the Project

Start by creating a new Rust project. Open your project in your favorite editor (e.g., VS Code) and update your `Cargo.toml` file to include the dependencies for Tokio and reqwest:

```
[package]
name = "concurrent_url_pinger"
version = "0.1.0"
edition = "2021"


[dependencies]
tokio = { version = "1", features = ["full"] }
reqwest = "0.11"
```

## Implementing the URL Pinger

Below is the full implementation of our URL pinger. This code demonstrates how to perform asynchronous HTTP requests, spawn tasks for each URL, and use a semaphore to limit the number of concurrent requests.

```
use reqwest::StatusCode;
use reqwest;
use tokio::task;
use tokio::task::JoinHandle;
use std::sync::Arc;
use tokio::sync::{Semaphore, OwnedSemaphorePermit};


async fn ping_url(url: &str) -> Result<StatusCode, reqwest::Error> {
    let response = reqwest::get(url).await?;
    Ok(response.status())
}


async fn ping_urls(urls: Vec<&str>, max_concurrent: usize) {
    let semaphore = Arc::new(Semaphore::new(max_concurrent));
    let mut handles: Vec<JoinHandle<()>> = Vec::new();


    for &url in &urls {
        // Acquire a permit to limit concurrent tasks.
        let permit: OwnedSemaphorePermit = semaphore.clone().acquire_owned().await.unwrap();
        let url_str = url.to_string();
        let handle = task::spawn(async move {
            // The permit is automatically released at the end of this async block.
            match ping_url(&url_str).await {
                Ok(status) => println!("{} -> {}", url_str, status),
                Err(err) => println!("{} -> Error: {}", url_str, err),
            }
            drop(permit); // Explicitly drop the permit when done.
        });
        handles.push(handle);
    }


    // Await completion for all spawned tasks.
    for handle in handles {
        let _ = handle.await;
    }
}


#[tokio::main]
async fn main() {
    let urls = vec![
        "https://www.rust-lang.org",
        "https://www.google.com",
        "https://www.github.com",
        "https://thisurldoesnotexist.xyz",
    ];


    println!("Pinging URLs...");
    // Limit the number of concurrent tasks to 5.
    ping_urls(urls, 5).await;
    println!("Done!");
}
```

> [!important]
> **Code Explanation**
>
> 1.  **Dependencies and Imports**
>     The necessary modules are imported to manage HTTP requests using `reqwest` and handle asynchronous tasks using `tokio`. Concurrency is controlled with a semaphore wrapped in an Arc.
> 2.  **`ping_url` Function**
>     This async function sends an HTTP GET request to the given URL and returns its status code. Errors during the request are propagated using the `?` operator.
> 3.  **`ping_urls` Function**
>     This function accepts a list of URLs and a concurrency limit. It creates a semaphore to restrict the number of simultaneous HTTP requests. Each URL is processed within an asynchronous task that waits for a permit before proceeding. Once the request is finished, the permit is released.
> 4.  **`main` Function**
>     The entry point of the application, which initializes the Tokio runtime, defines the target URLs (including one invalid URL for error demonstration), and calls `ping_urls` with a limit of 5 concurrent tasks.

## Running the Program

After building the project, run it from the terminal with the following command:

```
cargo run --quiet
```

You should see output similar to the following:

```
Pinging URLs...
https://thisurldoesnotexist.xyz -> Error: error sending request for url (https://thisurldoesnotexist.xyz): error trying to connect: dns error: failed to lookup address information: nodename nor servname provided, or not known
https://www.google.com -> 200 OK
https://www.rust-lang.org -> 200 OK
https://www.github.com -> 200 OK
Done!
```

This output shows that valid URLs returned HTTP status code 200, while the invalid URL resulted in an appropriate error message.

## Ideas for Extending the Project

There are several ways to enhance your concurrent URL pinger project:

- **Retry Failed Requests:** Implement a mechanism to retry URLs that initially fail.
- **Timeouts and Delays:** Add configurable timeouts or delays to handle slow responses.
- **Response Time Tracking:** Measure and log how long each request takes.
- **Saving Results:** Write the output to a file for later analysis.
- **Dynamic URL Input:** Allow URLs to be read from an external file or user input instead of being hardcoded.

![The image is a slide titled "Project: Building a Concurrent URL Pinger in Rust," listing enhancement ideas such as retrying failed requests, tracking response times, saving results, and inputting from a file.](https://kodekloud.com/kk-media/image/upload/v1752883804/notes-assets/images/Rust-Programming-Building-a-Concurrent-URL-Pinger/project-building-concurrent-url-pinger-rust-2.jpg)

## Conclusion

In this lesson, we covered:

- How to perform asynchronous operations in Rust using `async` and `await`.
- How to spawn multiple concurrent tasks with `tokio::spawn`.
- How to control the level of concurrency with a semaphore to manage simultaneous HTTP requests.

![The image is a conclusion slide highlighting two points: using `async` and `await` for asynchronous programming, and sending multiple HTTP requests concurrently with `tokio::spawn`.](https://kodekloud.com/kk-media/image/upload/v1752883805/notes-assets/images/Rust-Programming-Building-a-Concurrent-URL-Pinger/async-await-tokio-conclusion-slide.jpg)

Congratulations on creating a fast and efficient concurrent URL pinger in Rust!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/rust/module/9f40c3c7-3b88-4cd7-b65e-7a45fc7d0d64/lesson/becb9670-dc72-4a93-aca7-6ecb779bcac1)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/rust/module/9f40c3c7-3b88-4cd7-b65e-7a45fc7d0d64/lesson/1dd2b295-e79a-4fd3-951a-0d825dc68851)**
>
> Practice lab
