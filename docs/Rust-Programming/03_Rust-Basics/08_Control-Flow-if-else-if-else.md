# Control Flow if else if else - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Rust-Programming/Rust-Basics/Control-Flow-if-else-if-else)

---

## Table of Contents

- Control Flow if else if else
  - The if Statement
  - The else Statement
  - The else if Statement
  - Combining Conditions
  - Using if in a let Statement
  - Summary
  - Watch Video

---

## Content

Rust Programming

Rust Basics

# Control Flow if else if else

Control flow is a fundamental concept in programming that allows you to determine which parts of your code execute based on specific conditions. This concept is key for writing dynamic and efficient programs. In Rust, control flow is managed using conditional statements such as if, else if, and else. Below, we explore these constructs with clear examples.

## The if Statement

The if statement is the most basic control flow construct. It executes a block of code only when a given condition evaluates to true. The syntax is as follows:

```
if condition {
    // code to execute if condition is true
}
```

Consider the following example where a number is checked to determine whether it is less than 10:

```
fn main() {
    let number = 7;
    if number < 10 {
        println!("The number is less than 10");
    }
}
```

Running this code produces the following output:

The number is less than 10

## The else Statement

The else statement offers an alternative code block that executes when the condition in the if statement is false. For example, in the following code, the number is set to 15:

```
fn main() {
    let number = 15;

    if number < 10 {
        println!("The number is less than 10");
    } else {
        println!("The number is 10 or greater");
    }
}
```

Since 15 is not less than 10, the else block executes, outputting:

The number is 10 or greater

## The else if Statement

To evaluate multiple conditions sequentially, you can use the else if statement. As soon as a condition evaluates to true, its corresponding block is executed, and the remaining conditions are skipped. The syntax is:

```
if condition1 {
    // code if condition1 is true
} else if condition2 {
    // code if condition2 is true
} else {
    // code if none of the conditions are true
}
```

Consider this example where a number is tested against several conditions:

```
fn main() {
    let number = 20;

    if number < 10 {
        println!("The number is less than 10");
    } else if number < 20 {
        println!("The number is between 10 and 19");
    } else {
        println!("The number is 20 or greater");
    }
}
```

In this code, both the first condition (`number < 10`) and the second condition (`number < 20`) are false, so the else block executes, and the output is:

The number is 20 or greater

## Combining Conditions

You can build more complex conditional statements by combining multiple conditions with logical operators like AND (&&) and OR (||).

> [!important]
> **Note**
>
> In Rust, combining conditions allows you to create highly specific checks. For example, use the && operator to ensure multiple conditions are true before executing a block.

Consider the example below where the number is initialized to 25:

```
fn main() {
    let number = 25;

    if number % 5 == 0 && number % 2 == 0 {
        println!("The number is divisible by both 5 and 2");
    } else if number % 5 == 0 {
        println!("The number is divisible by 5 but not by 2");
    }
}
```

Here, the first if condition checks if the number is divisible by both 5 and 2. Since 25 is not divisible evenly by 2, the else if condition is evaluated, resulting in:

The number is divisible by 5 but not by 2

## Using if in a let Statement

Rust also permits using an if expression to assign a value to a variable. This feature streamlines conditional assignments. Consider the following example:

```
fn main() {
    let condition = true;
    let number = if condition { 5 } else { 10 };

    println!("The value of number is: {}", number);
}
```

Since the condition is true, the variable `number` is assigned a value of 5. If the condition were false, `number` would be assigned 10. The output of this execution is:

The value of number is: 5

## Summary

In this overview, we covered the following control flow structures in Rust:

- **if statements:** Execute a block of code if a condition is true.
- **else statements:** Provide an alternative block of code when the if condition is false.
- **else if statements:** Allow checking multiple conditions sequentially.
- **Combining conditions:** Use logical operators to create more complex conditionals.
- **Using if in a let statement:** Conditionally assign values to variables in a concise manner.

By mastering these control flow structures, you can write more dynamic and responsive Rust programs that efficiently handle various scenarios.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/rust/module/f232d417-91e4-49e7-b538-be7db1e23daf/lesson/15158759-10b6-4ace-8f0e-c0f3c5cdfe35)**
>
> Watch video content
