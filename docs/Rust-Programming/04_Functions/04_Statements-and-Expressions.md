# Statements and Expressions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Rust-Programming/Functions/Statements-and-Expressions)

---

## Table of Contents

- Statements and Expressions
  - Statements
  - Expressions
  - Summary
  - Watch Video
  - Practice Lab
    - Arithmetic Expressions
    - Code Blocks as Expressions
    - Control Flow Constructs as Expressions

---

## Content

Rust Programming

Functions

# Statements and Expressions

Understanding the difference between statements and expressions is crucial for writing efficient Rust code. These two core concepts determine how your Rust programs are structured and executed. In this guide, we will explore what statements and expressions are in Rust, how they differ, and the impact they have on functions and control flow.

## Statements

Statements in Rust are instructions that perform actions without returning a value. They are commonly used for variable declarations, function definitions, and managing control flow. For example, when you declare a variable using the `let` keyword, you are executing a statement.

Consider the following simple example where `let y = 6` declares a variable `y` and assigns it the value 6:

```
fn main() {
    let y = 6;
}
```

In this snippet, the statement initializes `y` but does not produce a value. Function definitions, such as the entire `main` function, are also regarded as statements.

Since statements do not return values, they cannot be used directly in value contexts. For example, the following code will produce an error because a `let` statement is used where a value is expected:

```
fn main() {
    let x = (let y = 6);
}
```

Running this code results in the error message below:

```
$ cargo run
   Compiling functions v0.1.0 (file:///projects/functions)
error: expected expression, found `let` statement
 --> src/main.rs:2:14
  |
2 |     let x = (let y = 6);
  |              ^^^^^^^^^^
  |
  = note: only supported directly in conditions of `if` and `while` expressions
```

This error occurs because Rust expects an expression in that context, not a statement.

## Expressions

Expressions, on the other hand, evaluate to a value. Nearly all Rust code is made up of expressions, including arithmetic operations, function calls, and code blocks that yield values.

![The image explains that expressions evaluate to a value, unlike statements, and includes a Venn diagram showing the overlap between arithmetic operations and function calls.](https://kodekloud.com/kk-media/image/upload/v1752883898/notes-assets/images/Rust-Programming-Statements-and-Expressions/expressions-statements-venn-diagram.jpg)

### Arithmetic Expressions

Arithmetic expressions are a basic example of expressions that evaluate to a value. For instance, the expression `5 + 6` evaluates to `11`:

```
fn main() {
    let sum = 5 + 6;
    println!("The sum is: {}", sum);
}
```

Here, the result of the arithmetic operation is computed and stored in the variable `sum`.

### Code Blocks as Expressions

In Rust, code blocks delimited by curly braces `{}` can serve as expressions if they yield a value. The return value of a block is determined by its last expression, provided the expression is not terminated by a semicolon.

![The image explains that in Rust, code blocks in "{}" can be expressions if they yield a value, and the block's value is the last expression inside it.](https://kodekloud.com/kk-media/image/upload/v1752883899/notes-assets/images/Rust-Programming-Statements-and-Expressions/rust-code-blocks-expressions.jpg)

For example, consider this code where the block evaluates to `4` because the last expression `x + 1` does not have a semicolon:

```
fn main() {
    let y = {
        let x = 3;
        x + 1
    };


    println!("The value of y is: {}", y);
}
```

Note that including a semicolon after `x + 1` would convert the expression into a statement, which would not yield a value.

### Control Flow Constructs as Expressions

Rust's control flow constructs, such as `if` and `match`, are also expressions because they yield a value based on the branch that is executed. This feature enables these constructs to be used in value contexts.

![The image illustrates "Control Flow Constructs as Expressions" with "if" and "match" highlighted, and a note stating they can be used where a value is expected.](https://kodekloud.com/kk-media/image/upload/v1752883900/notes-assets/images/Rust-Programming-Statements-and-Expressions/control-flow-constructs-expressions.jpg)

For example, an `if` expression can evaluate to different values depending on the condition:

```
fn main() {
    let number = 10;
    let result = if number < 5 { 5 } else { 10 };
    println!("The result is: {}", result);
}
```

Similarly, the `match` expression evaluates patterns and assigns the corresponding value based on the pattern matched.

## Summary

Understanding the difference between statements and expressions is fundamental to mastering Rust programming. Statements perform actions without returning values, whereas expressions evaluate to values and can be used where a value is required. Mastering these concepts leads to more concise and efficient code.

![The image is a summary slide about Rust programming, highlighting the importance of understanding statements and expressions, their differences, and how this knowledge improves code quality.](https://kodekloud.com/kk-media/image/upload/v1752883901/notes-assets/images/Rust-Programming-Statements-and-Expressions/rust-programming-statements-expressions-summary.jpg)

> [!important]
> **Note**
>
> Mastering statements and expressions lays a strong foundation for advanced Rust programming and enables you to write more expressive and higher quality code.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/rust/module/7ec396a4-7aea-4d77-abd2-48f4cee7fd94/lesson/89f96c8d-0254-4551-8d75-3ac0f45fe58e)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/rust/module/7ec396a4-7aea-4d77-abd2-48f4cee7fd94/lesson/01416b40-113b-4042-a701-9d2f08bfb56b)**
>
> Practice lab
