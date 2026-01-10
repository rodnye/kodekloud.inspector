# Introduction to Testing in Rust - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Rust-Programming/Testing-Continuous-Integration/Introduction-to-Testing-in-Rust)

---

## Table of Contents

- Introduction to Testing in Rust
  - Creating a Rust Library Project with Tests
  - Writing and Running Simple Tests
  - Example of a Failing Test
  - Understanding Test Assertions
  - Testing for Panics with #[should_panic]
  - Using Result<T, E> in Tests
  - Best Practices for Writing Unit Tests
  - What's Next?
  - Watch Video

---

## Content

Rust Programming

Testing Continuous Integration

# Introduction to Testing in Rust

Welcome to our comprehensive guide on testing in Rust. Testing is an essential part of software development that verifies your code behaves as expected and helps prevent bugs from reaching production. Rust, renowned for its safety and performance, offers powerful built-in tools for writing effective tests.

![The image is about "Testing in Rust" and highlights two benefits: ensuring code behavior and preventing bugs, with accompanying icons.](https://kodekloud.com/kk-media/image/upload/v1752884000/notes-assets/images/Rust-Programming-Introduction-to-Testing-in-Rust/testing-in-rust-benefits-icons.jpg)

In this guide, we will cover the basics of testing in Rust. By the end, you will know how to set up and run unit tests, utilize various assertions to confirm code behavior, and maintain a high level of code quality.

To begin, let's prepare our environment for testing.

![The image shows an agenda for a presentation on testing in Rust, including topics like introduction to testing, setting up unit tests, using assertions, and maintaining code quality. The agenda is visually organized with numbered steps and a gradient background.](https://kodekloud.com/kk-media/image/upload/v1752884000/notes-assets/images/Rust-Programming-Introduction-to-Testing-in-Rust/rust-testing-presentation-agenda.jpg)

## Creating a Rust Library Project with Tests

When you create a new Rust library project using Cargo, a sample test module is automatically included in your main library file. Consider the following example:

```
pub fn add(left: u64, right: u64) -> u64 {
    left + right
}


#[cfg(test)]
mod tests {
    use super::*;


    #[test]
    fn it_works() {
        let result: u64 = add(2, 2);
        assert_eq!(result, 4);
    }
}
```

Here, the `#[cfg(test)]` attribute instructs the Rust compiler to compile the test module only during testing. The block `mod tests` contains the test functions, and `use super::*;` imports items from the parent module, making them accessible within the tests.

## Writing and Running Simple Tests

Let’s explore a simple example by writing a function called `multiply`, which multiplies two numbers, and then creating a unit test to verify its functionality.

```
pub fn multiply(a: i32, b: i32) -> i32 {
    a * b
}


#[cfg(test)]
mod tests {
    use super::*;


    #[test]
    fn test_multiply() {
        let result: i32 = multiply(3, 4);
        assert_eq!(result, 12);
    }
}
```

In this example:

- The test module is conditionally compiled only during testing.
- The `#[test]` attribute designates the function `test_multiply` as a test case.
- The `assert_eq!` macro verifies that the result of `multiply` matches our expected output.

When you run `cargo test`, Cargo compiles all functions marked with `#[test]` and executes them, providing a summary of passing or failing tests.

![The image is a flowchart explaining the process of understanding test output in Rust, including steps for compiling code, running tests, viewing test results, and compiling code again. Each step is accompanied by a brief description of its function.](https://kodekloud.com/kk-media/image/upload/v1752884001/notes-assets/images/Rust-Programming-Introduction-to-Testing-in-Rust/rust-test-output-flowchart.jpg)

## Example of a Failing Test

To understand how test failures are reported, modify the expected value in the `test_multiply` function, as shown below:

```
#[cfg(test)]
mod tests {
    use super::*;


    #[test]
    fn test_multiply() {
        let result: i32 = multiply(3, 4);
        assert_eq!(result, 15);
    }
}
```

When you run the tests, Cargo will display an error because the expected value (15) does not match the actual result (12). The command-line output will be similar to:

```
calculator on 🏺 master [?] is 📦 v0.1.0 via 🦀 v1.82.0
➜ cargo test --quiet
running 1 test
test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s
running 0 tests
test result: ok. 0 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s
calculator on 🏺 master [?] is 📦 v0.1.0 via 🦀 v1.82.0
```

And here is the detailed error message:

```
#[cfg(test)]
mod tests {
    use super::*;


    #[test]
    fn test_multiply() {
        let result: i32 = multiply(3, 4);
        assert_eq!(result, 15);
    }
}


right: 15
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace


failures:
    tests::test_multiply


test result: FAILED. 0 passed; 1 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s


error: test failed, to rerun pass `--lib`


calculator on ✗ master [?] is v0.1.0 via 🔧 v1.82.0
```

This output shows the expected vs. actual outcome, enabling you to quickly pinpoint the issue.

## Understanding Test Assertions

Rust provides a variety of assertion macros to verify code behavior during testing:

- `assert!`: Confirms that a condition is true.
- `assert_eq!`: Checks that two expressions are equal.
- `assert_ne!`: Ensures that two expressions are not equal.
- Custom assertions: Allow you to supply a custom error message to be displayed if the assertion fails.

Consider this example demonstrating several assertions:

```
#[cfg(test)]
mod tests {
    use super::*;


    #[test]
    fn test_assertions() {
        // Assert that two values are equal
        assert_eq!(multiply(2, 3), 6);

        // Assert that two values are not equal
        assert_ne!(multiply(2, 3), 7);

        // Assert with a custom message
        assert!(multiply(2, 2) == 5, "Multiplication failed!");
    }
}
```

When this test runs, the third assertion will fail, and the custom message "Multiplication failed!" will be displayed along with additional error details:

```
thread 'tests::test_assertions' panicked at 'src/lib.rs:21:9: Multiplication failed!',
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace


failures:
    tests::test_assertions


test result: FAILED. 0 passed; 1 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s
error: test failed, to rerun pass `--lib`
```

> [!important]
> **Tip**
>
> Use assertions wisely to ensure clarity in understanding test failures. Custom error messages can be particularly helpful when debugging complex issues.

## Testing for Panics with #\[should_panic\]

Occasionally, you want to ensure that your code correctly handles erroneous situations by panicking. Rust offers the `#[should_panic]` attribute for tests that expect a panic. In the following example, the `divide` function panics if division by zero is attempted:

```
pub fn divide(a: i32, b: i32) -> i32 {
    if b == 0 {
        panic!("Division by zero!");
    }
    a / b
}


#[cfg(test)]
mod tests {
    use super::*;


    #[test]
    #[should_panic(expected = "Division by zero!")]
    fn test_divide_by_zero() {
        divide(10, 0);
    }
}
```

The `expected` parameter defines the panic message you anticipate. Running `cargo test` confirms that the test passes when the expected panic occurs.

The test output is similar to:

```
➜ cargo test --quiet
running 1 test
.
test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s
```

## Using Result<T, E> in Tests

Rust test functions can return a `Result<T, E>`, which allows the use of the `?` operator for smoother error handling. The following example checks if the file "Cargo.toml" exists:

```
use std::fs;


#[cfg(test)]
mod tests {
    use super::*;
    use std::fs;


    #[test]
    fn test_file_exists() -> Result<(), String> {
        let file_path = "Cargo.toml";
        if fs::metadata(file_path).is_ok() {
            Ok(())
        } else {
            Err(format!("File {} does not exist.", file_path))
        }
    }
}
```

This test returns `Ok(())` if "Cargo.toml" is found, and an error message if not. Running `cargo test` confirms if the file is present.

```
➜ cargo test --quiet
running 1 test
test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s
```

## Best Practices for Writing Unit Tests

Adhering to best practices in testing leads to more reliable and maintainable code. Here are some guidelines for writing unit tests in Rust:

- **Keep tests independent:** Avoid interdependencies between tests to prevent cascading failures.
- **Use descriptive names:** Clear test names help identify the functionality being verified.
- **Cover edge cases:** Test both common scenarios and edge cases, including potential error conditions.
- **Refactor tests as needed:** Update your tests to match code changes and improvements.

![The image outlines best practices for writing unit tests, including keeping tests independent, using descriptive names, testing edge cases, and refactoring regularly.](https://kodekloud.com/kk-media/image/upload/v1752884002/notes-assets/images/Rust-Programming-Introduction-to-Testing-in-Rust/unit-test-best-practices-outline.jpg)

> [!important]
> **Best Practice**
>
> A robust test suite not only validates your current code but also safeguards against future regressions.

Following these best practices will help you catch bugs early and maintain a healthy codebase.

## What's Next?

In the next article, we will delve deeper into mocking and integration testing. You will learn how to test more complex scenarios and manage external interactions effectively.

For more detailed information on Rust testing techniques, you might find these resources helpful:

- [Rust Testing Documentation](https://doc.rust-lang.org/book/ch11-00-testing.html)
- [The Cargo Book](https://doc.rust-lang.org/cargo/)

Happy testing!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/rust/module/e9736aa9-07fd-49d2-b348-ab9c4534b367/lesson/5e629a8e-da68-410c-8071-405d1a7e86b5)**
>
> Watch video content
