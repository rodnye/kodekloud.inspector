# Recoverable Errors - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Rust-Programming/Collections-Error-Handling/Recoverable-Errors)

---

## Table of Contents

- Recoverable Errors
  - The Result Type in Detail
  - Propagating Errors with the Question Mark Operator
  - Handling Errors with unwrap_or_else
  - Best Practices for Handling Recoverable Errors
  - Watch Video
    - Example with Option
    - Example with Result

---

## Content

Rust Programming

Collections Error Handling

# Recoverable Errors

Unlike unrecoverable errors, which force your program to halt immediately, recoverable errors allow you to gracefully handle issues while keeping your application running smoothly. In this lesson, we will explore both basic and advanced error handling patterns in Rust using recoverable errors.

Recoverable errors occur when an operation might fail, but the failure can be managed. In Rust, these errors are represented by the standard library’s [`Result`](https://doc.rust-lang.org/std/result/) and [`Option`](https://doc.rust-lang.org/std/option/) types. The `Result` type is used for operations that can either succeed (returning an `Ok` variant) or fail (returning an `Err` variant). The `Option` type is useful when a value may be absent, represented by either `Some` (indicating a valid value) or `None`.

This powerful type system helps prevent common bugs by forcing developers to handle potential errors explicitly.

![The image explains "Recoverable Errors" using two concepts: `Result<T, E>`, which indicates success with `Ok(T)` or failure with `Err(E)`, and `Option<T>`, which contains a value with `Some(T)` or indicates absence with `None`.](https://kodekloud.com/kk-media/image/upload/v1752883849/notes-assets/images/Rust-Programming-Recoverable-Errors/recoverable-errors-result-option-diagram.jpg)

## The Result Type in Detail

The `Result` type is the primary tool for managing recoverable errors in Rust. Consider the following example where the `divide` function divides two numbers. If the denominator is zero, the function returns an error with an appropriate message; otherwise, it wraps the result in an `Ok`.

```
fn divide(a: i32, b: i32) -> Result<i32, String> {
    if b == 0 {
        Err(String::from("Division by zero is not allowed"))
    } else {
        Ok(a / b)
    }
}


fn main() {
    let result = divide(10, 2);


    match result {
        Ok(value) => println!("Result: {}", value),
        Err(e) => println!("Error: {}", e),
    }
}
```

When executed, the output will be:

```
Result: 5
```

This design compels you to consider potential failure points and handle them proactively.

## Propagating Errors with the Question Mark Operator

The question mark operator (`?`) simplifies error handling in functions that return a `Result` or `Option`. When used, it checks the value: if it is `Ok` or `Some`, it unwraps and returns the inner value; if it is an `Err` or `None`, it returns early from the function with that error value.

Consider the refactored example below using the question mark operator:

```
fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        return Err(String::from("Division by zero error"));
    }
    Ok(a / b)
}


fn calculate() -> Result<(), String> {
    let result = divide(10.0, 0.0)?;
    println!("Result: {}", result);
    Ok(())
}


fn main() {
    if let Err(e) = calculate() {
        println!("Failed to calculate: {}", e);
    }
}
```

The output from this example is:

```
Failed to calculate: Division by zero error
```

In this code, if the `divide` function returns an error, the `?` operator causes an immediate return from the `calculate` function, skipping any remaining lines.

You can chain multiple operations with the `?` operator. For example, consider a scenario where you first read a username and then validate it:

```
fn read_username() -> Result<String, String> {
    // Simulate reading from an input source
    Ok("john_doe".to_string())
}


fn validate_username(username: &str) -> Result<(), String> {
    if username == "john_doe" {
        Ok(())
    } else {
        Err("Invalid username".to_string())
    }
}


fn main() -> Result<(), String> {
    let username = read_username()?; // Propagate error if reading fails
    validate_username(&username)?;   // Propagate error if validation fails
    println!("Username is valid!");
    Ok(())
}
```

If either `read_username` or `validate_username` fails, the error is immediately returned from the `main` function.

## Handling Errors with unwrap_or_else

The `unwrap_or_else` method offers fallback behavior when dealing with `Result` or `Option` types that encounter an error or an absence of a value. This method is ideal for logging errors, returning default values, or computing a fallback value based on the error.

### Example with Option

In this example, the `Option` value is `None`, so the closure passed to `unwrap_or_else` executes and returns a default value:

```
fn main() {
    let opt: Option<i32> = None;
    let value = opt.unwrap_or_else(|| {
        println!("No value found, returning default");
        10 // Default value when `opt` is None
    });
    println!("The value is: {}", value);
}
```

The output is:

```
No value found, returning default
The value is: 10
```

### Example with Result

For a `Result`, the closure receives the error as an argument. In this scenario, the operation fails, and the closure provides a fallback value:

```
fn main() {
    let result: Result<i32, &str> = Err("An error occurred");
    let value = result.unwrap_or_else(|err| {
        println!("Error encountered: {}", err);
        -1 // Fallback value if `result` is Err
    });
    println!("The result is: {}", value);
}
```

The output will be:

```
Error encountered: An error occurred
The result is: -1
```

## Best Practices for Handling Recoverable Errors

When working with recoverable errors in Rust, keep these best practices in mind:

1.  Use `Result` for operations that might fail.
2.  Leverage the question mark operator (`?`) to streamline error propagation.
3.  Provide clear, meaningful error messages.
4.  Utilize combinators like `map`, `and_then`, and `unwrap_or_else` to handle errors gracefully.
5.  Handle errors at appropriate points in your code to avoid excessive error propagation.

> [!important]
> **Note**
>
> For a quick reference on Rust error handling, consult the [Rust Error Handling Guide](https://doc.rust-lang.org/book/ch09-00-error-handling.html).

Consider the following consolidated example, which demonstrates the use of both `Result` and `Option` along with the `unwrap_or_else` method:

```
// Function that returns a Result for a division operation
fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        Err(String::from("Division by zero error"))
    } else {
        Ok(a / b)
    }
}


// Function that returns an Option for computing a square root
fn find_square_root(x: f64) -> Option<f64> {
    if x < 0.0 {
        None // Negative numbers don't have real square roots
    } else {
        Some(x.sqrt())
    }
}


fn main() {
    // Handling Result with unwrap_or_else
    let division_result = divide(10.0, 0.0).unwrap_or_else(|err| {
        println!("Error in division: {}", err);
        0.0 // Fallback value on error
    });
    println!("Division result: {}", division_result);


    // Handling Option with unwrap_or_else
    let sqrt_result = find_square_root(-9.0).unwrap_or_else(|| {
        println!("Error: Cannot find the square root of a negative number.");
        0.0 // Fallback value when no result is available
    });
    println!("Square root result: {}", sqrt_result);
}
```

The console output after running the program is:

```
Error in division: Division by zero error
Division result: 0
Error: Cannot find the square root of a negative number.
Square root result: 0
```

> [!important]
> **Tip**
>
> By following these techniques, you ensure your Rust applications can handle errors robustly, allowing them to continue operating smoothly even under unexpected conditions.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/rust/module/29fbe393-bae3-4a16-8fc5-a854a2400daa/lesson/6846e5a9-07f1-47c2-a41d-2b8b1157ed4b)**
>
> Watch video content
