# Parameters - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Rust-Programming/Functions/Parameters)

---

## Table of Contents

- Parameters
  - Defining Functions with Parameters in Rust
  - Summary
  - Watch Video
    - Example: Greeting with a Parameter
    - Example: Calculating the Area of a Rectangle
    - Example: Adding a Prefix to a Message

---

## Content

Rust Programming

Functions

# Parameters

Parameters allow you to pass dynamic information into functions by serving as placeholders for the actual values. They enhance the flexibility and reusability of your code by determining the function's behavior based on the input provided.

![The image explains the concept of parameters in programming, showing how they pass information to functions and serve as placeholders for actual values.](https://kodekloud.com/kk-media/image/upload/v1752883892/notes-assets/images/Rust-Programming-Parameters/programming-parameters-functions-placeholder.jpg)

Consider a coffee machine analogy: just as you specify the amount of water and coffee beans to brew your favorite cup of coffee, parameters allow functions to process diverse data inputs. This analogy highlights how providing different values can alter the outcome, much like different recipes yield unique beverages.

![The image is a diagram titled "Understanding Parameters," highlighting that functions are flexible and reusable, and perform tasks based on different inputs.](https://kodekloud.com/kk-media/image/upload/v1752883893/notes-assets/images/Rust-Programming-Parameters/understanding-parameters-functions-diagram.jpg)

![The image illustrates the process of making coffee, showing coffee beans and water being added to a coffee machine, resulting in a cup of coffee. A note emphasizes specifying the amount of water and coffee beans.](https://kodekloud.com/kk-media/image/upload/v1752883894/notes-assets/images/Rust-Programming-Parameters/coffee-making-process-illustration.jpg)

## Defining Functions with Parameters in Rust

In Rust, defining a function that accepts parameters is straightforward. When you declare a function, include parameters within parentheses right after the function name, ensuring you specify both the parameter name and its data type. For example:

```
fn function_name(parameter1: Type, parameter2: Type) {
    // code to run
}
```

> [!important]
> **Note**
>
> Defining parameters with explicit types not only enhances code readability but also leverages Rust’s strong type system to prevent many common programming errors.

### Example: Greeting with a Parameter

The following example demonstrates a simple function that accepts a person's name as a parameter and prints a personalized greeting. In the `main` function, the `greet` function is called with different arguments to generate greetings dynamically.

```
fn main() {
    greet("Alice");
    greet("Bob");
}


fn greet(name: &str) {
    println!("Hello, {}!", name);
}
```

In this example, the `greet` function takes a `&str` parameter called `name` and uses it within the `println!` macro to display a custom greeting. When you run the program, you will see the following output:

```
Hello, Alice!
Hello, Bob!
```

### Example: Calculating the Area of a Rectangle

Functions can handle multiple parameters. The example below uses the `calculate_area` function to compute the area of a rectangle using its width and height.

```
fn main() {
    let area = calculate_area(5, 10);
    println!("The area is: {}", area);
}


fn calculate_area(width: i32, height: i32) -> i32 {
    width * height
}
```

Here, the `calculate_area` function multiplies two `i32` parameters and returns the resulting product. The result is then stored in the `area` variable and printed.

### Example: Adding a Prefix to a Message

Another common scenario is formatting a message by adding a prefix. The `add_prefix` function combines a prefix with a message to create a formatted string. See the example below:

```
fn main() {
    let message1 = add_prefix("Error", "File not found");
    let message2 = add_prefix("Warning", "Low disk space");


    println!("{}", message1);
    println!("{}", message2);
}


fn add_prefix(prefix: &str, message: &str) -> String {
    format!("[{}] {}", prefix, message)
}
```

This example demonstrates how the `add_prefix` function uses two `&str` parameters along with the `format!` macro to produce dynamic, formatted output based on the provided inputs.

## Summary

Parameters are a critical concept in programming that enable functions to be modular, dynamic, and reusable. In Rust, you define functions with parameters by using the `fn` keyword, which is followed by the function name, a list of parameters with their types, and the function's code block. Real-world examples, such as generating personalized greetings, calculating areas, and adding prefixes to messages, illustrate how parameters empower developers to write clean, maintainable, and efficient code.

![The image is a summary slide with three points about function parameters, including their role, how to define them, and examples of their use. It features a gradient background and numbered markers for each point.](https://kodekloud.com/kk-media/image/upload/v1752883895/notes-assets/images/Rust-Programming-Parameters/function-parameters-summary-slide.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/rust/module/7ec396a4-7aea-4d77-abd2-48f4cee7fd94/lesson/c332a8a7-daff-4e47-bec7-2c94c61f6ef8)**
>
> Watch video content
