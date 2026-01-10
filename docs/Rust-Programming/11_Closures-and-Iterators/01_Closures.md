# Closures - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Rust-Programming/Closures-and-Iterators/Closures)

---

## Table of Contents

- Closures
  - What Are Closures?
  - Basic Syntax
  - Capturing the Environment
  - Closure Traits
  - Returning Closures from Functions
  - Best Practices with Closures
  - Watch Video
    - Surrounding Environment
    - Capturing by Mutable Reference
    - Using the Fn Trait
    - Using the FnMut Trait
    - Using the FnOnce Trait

---

## Content

Rust Programming

Closures and Iterators

# Closures

Closures in Rust are powerful, anonymous functions that can capture variables from their surrounding environment. This unique characteristic makes them highly flexible for encapsulating behavior, particularly when you need to pass a block of code for later execution, such as with iterators, callbacks, or higher-order functions.

## What Are Closures?

Closures are similar to regular functions but with the added ability to automatically capture variables from their defining scope. This means that closures can access variables defined outside their immediate scope without requiring explicit parameter passing.

![The image explains closures, highlighting that they can use variables defined outside their immediate scope, unlike regular functions which require variables to be passed explicitly as arguments. It features two arrows pointing in opposite directions.](https://kodekloud.com/kk-media/image/upload/v1752883831/notes-assets/images/Rust-Programming-Closures/closures-variable-scope-diagram.jpg)

Closures are particularly useful in scenarios like iterating over collections or handling events, where the encapsulated behavior benefits from access to external variables.

![The image is a slide titled "Closures – Use Cases" with two colored boxes labeled "Iterators" and "Callbacks in event-driven programming."](https://kodekloud.com/kk-media/image/upload/v1752883832/notes-assets/images/Rust-Programming-Closures/closures-use-cases-iterators-callbacks.jpg)

## Basic Syntax

In Rust, closures feature a compact and expressive syntax. Below is an example of a simple closure that adds two numbers. Although Rust often infers parameter and return types, explicit annotations can help clarify the developer's intent (as highlighted by the Rust Analyzer extension).

```
fn main() {
    let add: impl Fn(i32, i32) -> i32 = |x: i32, y: i32| x + y;
    let result: i32 = add(2, 3);
    println!("2 + 3 = {}", result);
}
```

In the example above:

- The closure is defined using vertical pipes (`| |`) to enclose its parameters.
- The arrow (`-> i32`) indicates that the closure returns an integer.
- The closure invocation with values 2 and 3 then prints the result, 5.

Rust’s type inference allows you to omit parameter types in many cases, streamlining your code while still ensuring type safety.

## Capturing the Environment

One of the key features of closures in Rust is their ability to capture variables from the surrounding environment. This enables the closure to maintain context without explicitly passing all dependencies.

> [!important]
> **Note**
>
> Closures can capture variables by value, by reference, or by mutable reference. Rust automatically determines the most appropriate capture semantics based on how the closure is used.

Consider the following example where the closure captures the variable `num` from its scope:

```
fn main() {
    let num: i32 = 5;
    let add_num = |x: i32| x + num;
    let result: i32 = add_num(10);
    println!("10 + 5 = {}", result);
}
```

In this case, the variable `num` is captured automatically. Depending on how the closure interacts with the variable, the capture method may be by value, by reference, or by mutable reference.

### Surrounding Environment

The "surrounding environment" of a closure comprises any variables that are in scope when the closure is defined. For instance, a global static variable can be accessed directly by a closure without requiring capture:

```
static GLOBAL_NUM: i32 = 42;


fn main() {
    let closure: impl Fn(i32) -> i32 = |x: i32| x + GLOBAL_NUM;
    println!("Result: {}", closure(8)); // Directly accesses GLOBAL_NUM
}
```

Since `GLOBAL_NUM` has a static lifetime, it remains accessible throughout the program’s execution.

### Capturing by Mutable Reference

Closures can also capture variables by mutable reference, which allows them to modify the captured variables. The example below demonstrates this capability:

```
fn main() {
    let mut num: i32 = 3;
    let mut closure: impl FnMut(i32) = |x: i32| num += x; // Captures `num` by mutable reference
    closure(2); // Modifies `num` within the closure
    println!("{}", num); // Prints: 5
}
```

This example emphasizes Rust’s strict ownership and borrowing rules, which also apply to closures.

## Closure Traits

Closures automatically implement one of three traits based on their interaction with captured variables:

- **Fn**: For closures that capture variables immutably (read-only).
- **FnMut**: For closures that capture variables mutably (can modify).
- **FnOnce**: For closures that capture variables by taking ownership (the variables can be used only once).

### Using the Fn Trait

The following example demonstrates how to create a function that accepts a closure implementing the `Fn` trait:

```
fn apply<F>(g: F)
where
    F: Fn(),
{
    g();
}


fn main() {
    let greeting = || println!("Hello, world!");
    apply(greeting); // The closure only reads from its environment.
}
```

### Using the FnMut Trait

When a closure needs to modify an external variable, it implements the `FnMut` trait. Consider this example:

```
fn apply_mut<F>(mut g: F)
where
    F: FnMut(),
{
    g();
}


fn main() {
    let mut counter: i32 = 0;
    let mut increment: impl FnMut() = || counter += 1;
    apply_mut(increment); // The closure modifies `counter`.
    println!("Counter: {}", counter); // Output: Counter: 1
}
```

### Using the FnOnce Trait

Closures that take ownership of captured variables using the `move` keyword implement the `FnOnce` trait. Once a variable is moved into the closure, it is no longer accessible outside of it:

```
fn apply_once<F>(g: F)
where
    F: FnOnce(),
{
    g();
}


fn main() {
    let name: String = String::from("Rust");
    let consume_name = move || println!("Goodbye, {}", name);
    apply_once(consume_name);
    // Uncommenting the next line will cause an error because `name` has been moved:
    // println!("Hello, {}", name);
}
```

## Returning Closures from Functions

Returning closures from functions in Rust requires using either trait objects or generics because closures do not have a fixed type. A common solution is to return a boxed closure:

```
fn create_closure() -> Box<dyn Fn(i32) -> i32> {
    Box::new(|x: i32| x + 10)
}


fn main() {
    let closure: Box<dyn Fn(i32) -> i32> = create_closure();
    let result: i32 = closure(5);
    println!("Result: {}", result); // Output: Result: 15
}
```

In this example, the closure is boxed into a `Box<dyn Fn(i32) -> i32>`, allowing dynamic dispatch at runtime.

## Best Practices with Closures

When using closures in Rust, consider the following best practices:

1.  **Minimize the Captured Environment**: Capture only what is necessary to reduce overhead.
2.  **Choose the Right Trait**: Select between `Fn`, `FnMut`, or `FnOnce` based on whether the closure reads, modifies, or takes ownership of its captured variables.
3.  **Be Aware of Lifetime Issues**: Understand how closures interact with Rust’s lifetime system to avoid borrowing conflicts and ownership errors.

![The image outlines three best practices: minimizing the captured environment, choosing the right trait, and being aware of lifetime issues, presented in a colorful, numbered format.](https://kodekloud.com/kk-media/image/upload/v1752883833/notes-assets/images/Rust-Programming-Closures/best-practices-captured-environment.jpg)

Understanding and effectively leveraging closures is essential for writing efficient and expressive Rust code. Their ability to capture their environment in various ways—by immutable reference, mutable reference, or by taking ownership—empowers developers to write clean, concise, and powerful functions while maintaining Rust’s strong safety guarantees.

> [!important]
> **Additional Resources**
>
> Learn more about Rust and closures by exploring the [Rust Programming Language](https://doc.rust-lang.org/book/) and [Rust by Example](https://doc.rust-lang.org/rust-by-example/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/rust/module/ec5f51b7-2bd4-4b24-bff0-94947cac5257/lesson/21fbcda1-2e3c-40ab-b0a8-8e3a9763d22a)**
>
> Watch video content
