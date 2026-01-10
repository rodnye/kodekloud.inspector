# Creating Custom Error Types - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Rust-Programming/Collections-Error-Handling/Creating-Custom-Error-Types)

---

## Table of Contents

- Creating Custom Error Types
  - Defining a Simple Custom Error Type
  - Implementing the Display and Error Traits
  - Using the Custom Error Type in a Function
  - Combining Multiple Error Types Using the From Trait
  - Best Practices for Custom Error Types
  - Watch Video

---

## Content

Rust Programming

Collections Error Handling

# Creating Custom Error Types

In this lesson, we explore how to create custom error types in Rust—an essential technique for writing robust and maintainable code. While Rust’s standard library provides strong error handling tools, there are scenarios where you need more specific control over error behavior. Custom error types allow you to design expressive, type-safe APIs and deliver detailed error messages that simplify debugging.

Custom error types offer several key benefits:

• Specificity – Precisely define different error scenarios in your domain, making your code more expressive.  
• Type Safety – Enforce strict type safety and minimize the chances of incorrect error handling.  
• Detailed Error Messages – Equip your errors with extra context to simplify diagnosing issues when they occur.  
• Composability – Combine multiple error kinds and handle them in a unified manner.

![The image explains the benefits of creating custom error types, highlighting specificity, type safety, detailed error messages, and composability. Each benefit is accompanied by a brief description and an icon.](https://kodekloud.com/kk-media/image/upload/v1752883838/notes-assets/images/Rust-Programming-Creating-Custom-Error-Types/custom-error-types-benefits-diagram.jpg)

---

## Defining a Simple Custom Error Type

A common pattern in Rust is to use an enum to represent different error cases. Below is an example of a basic custom error type called `CustomError`, which includes three variants: `NotFound`, `PermissionDenied`, and `ConnectionFailed`. The derived `Debug` trait enables simple error printing during development.

```
#[derive(Debug)]
enum CustomError {
    NotFound,
    PermissionDenied,
    ConnectionFailed,
}


fn main() {
    let error = CustomError::NotFound;
    println!("{:?}", error);
}
```

> [!important]
> **Note**
>
> When you compile this code, you might see warnings about unused variants. This warning is benign during development, but remember to address any warnings before deploying your code.

On compilation, you might see a warning similar to the following:

```
main.rs:6:5
enum CustomError {
    variants in this enum
    NotFound,
    PermissionDenied,
    ConnectionFailed,
}
note: `CustomError` has a derived impl for the trait `Debug`, but this is intentionally ignored during dead code analysis
note: `#[warn(dead_code)]` on by default
warning: 1 warning emitted
```

Despite the warning, running the program outputs the enum variant name (e.g., `NotFound`).

---

## Implementing the Display and Error Traits

To integrate your custom error type smoothly with Rust’s error handling ecosystem and provide user-friendly messages, implement the `Display` and `Error` traits. The following implementation offers meaningful messages for each error variant:

```
use std::fmt;


#[derive(Debug)]
enum CustomError {
    NotFound,
    PermissionDenied,
    ConnectionFailed,
}


impl fmt::Display for CustomError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            CustomError::NotFound => write!(f, "Resource not found"),
            CustomError::PermissionDenied => write!(f, "Permission denied"),
            CustomError::ConnectionFailed => write!(f, "Connection failed"),
        }
    }
}


impl std::error::Error for CustomError {}


fn main() {
    let error = CustomError::NotFound;
    // Using Debug format specifier:
    println!("Debug: {:?}", error);
    // Using Display format specifier:
    println!("Display: {}", error);
}
```

When you compile and run the code, the output confirms that the `Display` trait is working as intended:

```
$ cargo run
Display: Resource not found
```

---

## Using the Custom Error Type in a Function

Custom error types are especially useful when a function might fail. In the example below, the `find_user` function simulates various error scenarios based on the user ID. Depending on the input, it returns a corresponding error or a success message.

```
use std::fmt;


#[derive(Debug)]
enum CustomError {
    NotFound,
    PermissionDenied,
    ConnectionFailed,
}


impl fmt::Display for CustomError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            CustomError::NotFound => write!(f, "Resource not found"),
            CustomError::PermissionDenied => write!(f, "Permission denied"),
            CustomError::ConnectionFailed => write!(f, "Connection failed"),
        }
    }
}


impl std::error::Error for CustomError {}


fn find_user(user_id: u32) -> Result<String, CustomError> {
    if user_id == 0 {
        Err(CustomError::NotFound)
    } else if user_id == 1 {
        Err(CustomError::PermissionDenied)
    } else if user_id == 2 {
        Err(CustomError::ConnectionFailed)
    } else {
        Ok(String::from("User found"))
    }
}


fn main() {
    match find_user(1) {
        Ok(user) => println!("Success: {}", user),
        Err(e) => println!("Error: {}", e),
    }
}
```

Running the program with a user ID of 1 displays the user-friendly message "Permission denied". For a successful lookup (e.g., using a user ID of 5), the output is "User found".

Compile and execute the program using:

```
$ rustc main.rs
$ ./main
Success: User found
```

---

## Combining Multiple Error Types Using the From Trait

In real-world applications, you'll often handle multiple error types. Rust’s `From` trait simplifies error propagation by automatically converting one error type into another. The example below demonstrates how to combine a `NetworkError` with the previously defined `CustomError`.

```
use std::fmt;


#[derive(Debug)]
enum NetworkError {
    Disconnected,
    Timeout,
}


impl fmt::Display for NetworkError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            NetworkError::Disconnected => write!(f, "Network disconnected"),
            NetworkError::Timeout => write!(f, "Network timeout"),
        }
    }
}


#[derive(Debug)]
enum CustomError {
    NotFound,
    PermissionDenied,
    ConnectionFailed,
    Network(NetworkError), // Wraps a NetworkError
}


impl fmt::Display for CustomError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            CustomError::NotFound => write!(f, "Resource not found"),
            CustomError::PermissionDenied => write!(f, "Permission denied"),
            CustomError::ConnectionFailed => write!(f, "Connection failed"),
            CustomError::Network(e) => write!(f, "Network error: {}", e),
        }
    }
}


impl std::error::Error for NetworkError {}
impl std::error::Error for CustomError {}


// Convert NetworkError into CustomError automatically
impl From<NetworkError> for CustomError {
    fn from(error: NetworkError) -> Self {
        CustomError::Network(error)
    }
}


// Simulates a function that returns a NetworkError
fn connect_to_network() -> Result<(), NetworkError> {
    Err(NetworkError::Disconnected)
}


// Uses the From trait to convert NetworkError into CustomError via the `?` operator
fn perform_task() -> Result<(), CustomError> {
    connect_to_network()?;
    Ok(())
}


fn main() {
    match perform_task() {
        Ok(_) => println!("Task completed successfully"),
        Err(e) => println!("Task failed: {}", e),
    }
}
```

Here’s how the program works:

1.  The `connect_to_network` function simulates a network failure by returning `NetworkError::Disconnected`.
2.  The `perform_task` function calls `connect_to_network` and uses the `?` operator. Thanks to the `From` trait, any `NetworkError` is automatically converted into a `CustomError`.
3.  The `main` function prints a clear, user-friendly error message when an error occurs.

When you run the program, you should see:

```
$ ./main
Task failed: Network error: Network disconnected
```

---

## Best Practices for Custom Error Types

When designing custom error types in Rust, keep these best practices in mind:

| Best Practice                          | Description                                                                                            |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Be Specific                            | Clearly define each error scenario for improved expressiveness and easier debugging.                   |
| Implement the Display and Error Traits | Ensure your errors integrate seamlessly with Rust’s error handling and provide meaningful messages.    |
| Use the From Trait for Composition     | Simplify error propagation by converting one error type into another automatically.                    |
| Add Context                            | Include details about the operation or specific values that led to an error to aid in troubleshooting. |
| Keep Errors Lightweight                | Avoid unnecessary data to streamline error handling and propagation.                                   |

> [!important]
> **Note**
>
> By following these practices, you can design custom error types that are both expressive and user-friendly, making your code more robust and maintainable.

![The image outlines best practices for custom error types in Rust, including being specific, implementing display and error traits, and using "From" for error composition.](https://kodekloud.com/kk-media/image/upload/v1752883840/notes-assets/images/Rust-Programming-Creating-Custom-Error-Types/rust-custom-error-types-best-practices.jpg)

![The image provides best practices for custom error types, emphasizing adding context to errors and keeping errors lightweight. It includes brief descriptions and icons for each practice.](https://kodekloud.com/kk-media/image/upload/v1752883841/notes-assets/images/Rust-Programming-Creating-Custom-Error-Types/custom-error-types-best-practices.jpg)

---

By leveraging these techniques and adhering to best practices, you can create custom error types that integrate seamlessly with Rust’s error handling ecosystem. Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/rust/module/29fbe393-bae3-4a16-8fc5-a854a2400daa/lesson/86448e72-e8c9-4eba-8959-d79656e23357)**
>
> Watch video content
