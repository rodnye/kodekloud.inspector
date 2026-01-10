# Constants - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Rust-Programming/Rust-Basics/Constants)

---

## Table of Contents

- Constants
  - Differences Between Constants and Variables
  - Naming Conventions
  - Benefits of Using Constants
  - Watch Video

---

## Content

Rust Programming

Rust Basics

# Constants

In Rust, constants are values bound to a name that remain unchanged throughout the execution of your program. Unlike immutable and mutable variables, constants are inherently immutable, declared with the keyword `const`, and require explicit type annotations.

For example, the following constant represents the maximum number of users:

```
const MAX_USERS: u32 = 1000;
```

In this snippet, `MAX_USERS` is a constant with a value of 1000. The type annotation `u32` indicates that this constant is an unsigned 32-bit integer.

> [!important]
> **Note**
>
> Constants are particularly useful for defining values that are referenced repeatedly across your codebase, enhancing readability and simplifying maintenance by centralizing changes.

## Differences Between Constants and Variables

There are several key differences between constants and variables in Rust:

1.  **Immutability Enforcement:**  
    Constants are inherently immutable. Unlike variables, you cannot use the `mut` keyword with constants.
2.  **Scope Flexibility:**  
    Constants can be declared in any scope, including the global scope, making them ideal for values accessed by multiple parts of your application (for example, configuration settings or device addresses).
3.  **Compile-Time Evaluation:**  
    Constants must be assigned constant expressions, meaning their values are determined at compile time rather than runtime. This ensures that the value remains fixed, which is essential for certain computations.

Below is an example that demonstrates compile-time computation using constants:

```
const SECONDS_IN_A_MINUTE: u32 = 60;
const MINUTES_IN_AN_HOUR: u32 = 60;
const HOURS_IN_A_DAY: u32 = 24;
const SECONDS_IN_A_DAY: u32 = SECONDS_IN_A_MINUTE * MINUTES_IN_AN_HOUR * HOURS_IN_A_DAY;


const SERVER_ADDRESS: &str = "192.168.1.1";


fn main() {
    println!("Server address: {}", SERVER_ADDRESS);
}
```

In this code, `SECONDS_IN_A_DAY` is computed at compile time using other constant values, ensuring accuracy and efficiency.

## Naming Conventions

Rust follows a clear naming convention for constants: use all uppercase letters with underscores to separate words. This practice makes constants easily identifiable compared to variables. For example:

```
const PI: f64 = 3.141592653589793;
const MAX_SCORE: u32 = 100;
const DEFAULT_TIMEOUT: u64 = 30;
```

Using descriptive names like `PI`, `MAX_SCORE`, and `DEFAULT_TIMEOUT` helps eliminate ambiguous "magic numbers" and improves overall code readability.

## Benefits of Using Constants

| Benefit                      | Description                                                                                         |
| ---------------------------- | --------------------------------------------------------------------------------------------------- |
| Improved Readability         | Assigning meaningful names to fixed values clarifies their purpose in your code.                    |
| Ease of Maintenance          | Update a value in one centralized location rather than searching through the entire codebase.       |
| Elimination of Magic Numbers | Constants help avoid the use of unexplained hard-coded values, making the code more understandable. |

By leveraging constants in Rust, you can write more robust, maintainable, and readable code. Their use enhances clarity, reduces errors, and simplifies future modifications.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/rust/module/f232d417-91e4-49e7-b538-be7db1e23daf/lesson/db3eb3af-a44d-45fa-a295-3ea769f60fb3)**
>
> Watch video content
