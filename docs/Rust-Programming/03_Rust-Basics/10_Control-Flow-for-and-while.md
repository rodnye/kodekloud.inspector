# Control Flow for and while - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Rust-Programming/Rust-Basics/Control-Flow-for-and-while)

---

## Table of Contents

- Control Flow for and while
  - The for Loop
  - The while Loop
  - Using break and continue
  - Summary
  - Watch Video
    - Iterating Over an Array
    - Iterating Over a Range
    - Basic while Loop Example
    - Combining Multiple Conditions
    - Using break and continue in a for Loop
    - Using break and continue in a while Loop

---

## Content

Rust Programming

Rust Basics

# Control Flow for and while

Rust offers several looping constructs, including for, while, and loop. In this guide, we will focus on for and while loops—powerful tools for iterating over collections and executing code repeatedly based on conditions.

## The for Loop

The for loop is used to traverse collections such as arrays, vectors, ranges, or any type that implements the Iterator trait. Its fundamental syntax is:

```
for variable in collection {
    // Code to execute for each element in the collection
}
```

### Iterating Over an Array

In the following example, the for loop iterates through an array of numbers and prints each one:

```
fn main() {
    let numbers = [1, 2, 3, 4, 5];
    for num in numbers {
        println!("The number is: {}", num);
    }
}
```

Console output:

```
The number is: 1
The number is: 2
The number is: 3
The number is: 4
The number is: 5
```

### Iterating Over a Range

You can also use the for loop to iterate over a range. Note that the upper bound is exclusive. This example iterates from 1 to 5 (since 6 is excluded):

```
fn main() {
    for num in 1..6 {
        println!("The number is: {}", num);
    }
}
```

## The while Loop

The while loop repeatedly executes a block of code as long as a specified condition remains true. Its syntax is:

```
while condition {
    // Code to repeat while the condition is true
}
```

### Basic while Loop Example

Consider this example where the loop continues until the variable `number` reaches 0:

```
fn main() {
    let mut number = 3;
    while number != 0 {
        println!("{}!", number);
        number -= 1;
    }
    println!("Liftoff!");
}
```

Output:

```
3!
2!
1!
Liftoff!
```

When `number` is decremented to 0, the condition becomes false and the loop terminates, printing "Liftoff!".

### Combining Multiple Conditions

You can use logical operators to create more complex loop conditions. The following example demonstrates a while loop that runs as long as `number` is less than `limit` and even. The number is printed and incremented by 2 on each iteration:

```
fn main() {
    let mut number = 4;
    let limit = 10;
    while number < limit && number % 2 == 0 {
        println!("The number is: {}", number);
        number += 2;
    }
    println!("Loop terminated with number: {}", number);
}
```

Console output:

```
The number is: 4
The number is: 6
The number is: 8
Loop terminated with number: 10
```

In this scenario, when the number becomes 10, the condition (number < limit) fails, terminating the loop.

## Using break and continue

Rust offers the `break` and `continue` statements to control loop flow more precisely. Use `break` to exit a loop early and `continue` to skip the rest of the current iteration.

### Using break and continue in a for Loop

The example below demonstrates a for loop that breaks when the number is 5 and skips even numbers:

```
fn main() {
    for num in 1..10 {
        if num == 5 {
            println!("Breaking at number: {}", num);
            break;
        }
        if num % 2 == 0 {
            continue;
        }
        println!("Number: {}", num);
    }
}
```

Output:

```
Number: 1
Number: 3
Breaking at number: 5
```

### Using break and continue in a while Loop

The logic for break and continue can be similarly applied within a while loop. In the following example, the variable `num` is initialized to 0 and updated in each iteration:

```
fn main() {
    let mut num = 0;
    while num < 10 {
        num += 1;
        if num == 5 {
            println!("Breaking at number: {}", num);
            break;
        }
        if num % 2 == 0 {
            continue;
        }
        println!("Number: {}", num);
    }
}
```

Console output:

```
Number: 1
Number: 3
Breaking at number: 5
```

## Summary

Understanding and effectively using for and while loops in Rust provides you with the control-flow mechanisms necessary to write efficient, readable programs. In this guide, we covered:

- The for loop for iterating over collections such as arrays, vectors, and ranges.
- The while loop for repeating code blocks based on dynamic conditions.
- Combining logical conditions within while loops for advanced looping behavior.
- The use of `break` to terminate loops early and `continue` to skip to the next iteration.

![The image is a summary of programming loop concepts, including "for" loops, iterating over ranges, "while" loops, and combining conditions in "while" loops. It features a gradient background with numbered points.](https://kodekloud.com/kk-media/image/upload/v1752883984/notes-assets/images/Rust-Programming-Control-Flow-for-and-while/programming-loops-summary-gradient.jpg)

> [!important]
> **Note**
>
> Mastering these loop constructs in Rust not only enhances the clarity of your code but also ensures higher efficiency when processing collections.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/rust/module/f232d417-91e4-49e7-b538-be7db1e23daf/lesson/9d40d752-ca4a-4e91-b8d2-5a7e53682817)**
>
> Watch video content
