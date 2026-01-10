# Logging Libraries - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Rust-Programming/Collections-Error-Handling/Logging-Libraries)

---

## Table of Contents

- Logging Libraries
  - Why Logging Matters
  - Using the log Crate
  - Advanced Logging with Structured Logging (Slog)
  - Conclusion
  - Watch Video
    - Setting Up the Basic Logger
    - Adding Dependencies for Slog
    - Setting Up Slog
    - Explaining the Slog Components

---

## Content

Rust Programming

Collections Error Handling

# Logging Libraries

Logging is a crucial aspect of any application, offering insights into runtime behavior, aiding in debugging, and acting as an audit trail. In this article, we explore popular logging libraries in Rust, demonstrate how to set them up, and discuss best practices for their effective use.

## Why Logging Matters

Effective logging serves multiple purposes:

- **Debugging:** Logs reveal what your application is doing, making it easier to identify and resolve issues.
- **Monitoring:** In production, logs are invaluable for monitoring application health and detecting issues before they escalate.
- **Audit Trails:** Detailed logs provide a sequence of events leading to specific states or errors.
- **Performance Tuning:** By recording operation durations, logs help pinpoint performance bottlenecks.

![The image illustrates the importance of logging, highlighting its roles in debugging, monitoring, audit trails, and performance tuning. Each section explains how logging provides insights, detects problems, helps understand issues, and identifies performance bottlenecks.](https://kodekloud.com/kk-media/image/upload/v1752883847/notes-assets/images/Rust-Programming-Logging-Libraries/importance-of-logging-debugging-monitoring.jpg)

## Using the log Crate

In Rust, the `log` crate is widely used for logging. It introduces macros like `info`, `warn`, `error`, and `debug` to emit log messages without coupling to a specific backend. This flexibility lets you choose and switch your logging implementation as needed.

### Setting Up the Basic Logger

First, add the following dependencies to your `Cargo.toml`:

```
[package]
name = "log_demo"
version = "0.1.0"
edition = "2021"


[dependencies]
log = "0.4"
env_logger = "0.10"
```

The `env_logger` crate simplifies logger initialization, allowing you to control behavior via environment variables. Consider the following example:

```
use log::{debug, error, info, warn};


fn main() {
    env_logger::init();
    info!("This is an info message");
    warn!("This is a warning");
    error!("This is an error");
    debug!("This is a debug message");
}
```

By default, messages at `warn`, `error`, and higher severities are printed. Adjust the logging level by setting the `RUST_LOG` environment variable. For example, specifying `debug` will enable all log messages:

```
RUST_LOG=debug cargo run
```

This produces an output similar to:

```
2024-10-16T22:38:49Z INFO  log_demo] This is an info message
2024-10-16T22:38:49Z WARN  log_demo] This is a warning
2024-10-16T22:38:49Z ERROR log_demo] This is an error
2024-10-16T22:38:49Z DEBUG log_demo] This is a debug message
```

Setting the log level to `info` restricts the output to info, warning, and error messages:

```
RUST_LOG=info cargo run
```

Output:

```
[2024-10-16T22:39:18Z INFO  log_demo] This is an info message
[2024-10-16T22:39:18Z WARN  log_demo] This is a warning
[2024-10-16T22:39:18Z ERROR log_demo] This is an error
```

Similarly, use `RUST_LOG=warn` to print only warnings and errors:

```
RUST_LOG=warn cargo run
```

Output:

```
[2024-10-16T22:39:31Z WARN  log_demo] This is a warning
[2024-10-16T22:39:31Z ERROR log_demo] This is an error
```

> [!important]
> **Dynamic Logging**
>
> Using `env_logger` makes your logging behavior dynamic, adapting to various execution environments without code changes.

## Advanced Logging with Structured Logging (Slog)

For production environments and large-scale applications, structured logging provides machine-readable logs with key-value data for enhanced analysis. The [slog](https://crates.io/crates/slog) framework is designed for this purpose.

### Adding Dependencies for Slog

Include the following dependencies in your `Cargo.toml`:

```
[package]
name = "log_demo"
version = "0.1.0"
edition = "2021"


[dependencies]
slog = "2.7"
slog-async = "2.7"
slog-term = "2.8"
slog-json = "2.4"
slog-log = "0.4"
```

The roles of each dependency are as follows:

| Dependency | Role                                        | Example Usage                                |
| ---------- | ------------------------------------------- | -------------------------------------------- |
| slog       | Core structured logging framework           | `Logger::root(...)`                          |
| slog-async | Provides asynchronous, non-blocking logging | `slog_async::Async::new(...)`                |
| slog-term  | Enhances terminal output formatting         | `slog_term::TermDecorator::new().build()`    |
| slog-json  | Outputs logs in JSON format                 | Configurable drain for JSON logs             |
| slog-log   | Integrates slog with standard log macros    | Use along with conventional logging patterns |

### Setting Up Slog

Below is an example demonstrating how to configure and use `slog` with asynchronous logging and terminal formatting:

```
use slog::{info, o, Drain, Logger};
use slog_async;
use slog_term;


fn main() {
    // Create a decorator for terminal output
    let decorator = slog_term::TermDecorator::new().build();


    // Build a drain with full formatting and fuse it to handle errors gracefully
    let drain = slog_term::FullFormat::new(decorator).build().fuse();


    // Wrap the drain in an asynchronous handler for non-blocking logging
    let drain = slog_async::Async::new(drain).build().fuse();


    // Create the root logger without any global metadata
    let log = Logger::root(drain, o!());


    // Log structured messages with key-value pairs
    info!(log, "Application started"; "version" => "1.0.0");
    info!(log, "This is an info message"; "user" => "JohnDoe");
}
```

When executed, the program outputs logs with structured key-value pairs:

```
Oct 16 22:46:43.123 INFO Application started; version: 1.0.0
Oct 16 22:46:43.123 INFO This is an info message; user: JohnDoe
```

> [!important]
> **Efficient Non-Blocking Logging**
>
> The use of `slog_async` ensures that logging does not block your application, which is crucial for high-throughput systems.

### Explaining the Slog Components

1.  **Decorator and Drain:**  
    The `slog_term::TermDecorator` enhances terminal output, and the `FullFormat` drain uses this decorator to produce readable logs. The drain is fused to gracefully handle logging errors.
2.  **Asynchronous Logging:**  
    Wrapping the drain with `slog_async::Async` ensures that log messages are handled in a non-blocking, asynchronous manner, which is beneficial for performance.
3.  **Structured Log Messages:**  
    Using the `o!()` macro and structured logging functions like `info!` allows you to attach additional metadata (such as version and user details) to each log entry, facilitating centralized log analysis.

## Conclusion

In this article, we've covered two popular logging solutions in Rust:

- **Conventional Logging with the log Crate:**  
  Set up an easy-to-use logging system with environment-controlled behavior using `env_logger`.
- **Advanced Structured Logging with Slog:**  
  Configure and implement structured, asynchronous logging suitable for production environments.

Both approaches offer scalability and flexibility, enabling developers to monitor and debug Rust applications effectively. For further reading and exploration, consider browsing the [official Rust logging documentation](https://docs.rs/log) and exploring structured logging patterns with [slog](https://crates.io/crates/slog).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/rust/module/29fbe393-bae3-4a16-8fc5-a854a2400daa/lesson/6879a9f7-ab0d-448e-a0a5-fb9d34b7d102)**
>
> Watch video content
