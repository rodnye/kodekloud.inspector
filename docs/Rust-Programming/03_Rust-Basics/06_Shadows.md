# Shadows - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Rust-Programming/Rust-Basics/Shadows)

---

## Table of Contents

- Shadows
  - Basic Shadowing Example
  - Transforming Data Types with Shadowing
  - Shadowing vs. Mutability
  - Scope and Shadowing
  - Practical Use Case: Processing User Input
  - Conclusion
  - Watch Video

---

## Content

Rust Programming

Rust Basics

# Shadows

In this lesson, we will dive into a fascinating Rust feature known as shadowing. Shadowing in Rust allows you to reassign a variable name to a new value, even changing its type, without having to create an entirely new variable. This can lead to cleaner, more concise, and more readable code.

When you shadow a variable, you declare a new variable with the same name as a previous one. The new variable "shadows" the original, making only the latest version accessible within the current scope. This capability is particularly useful when you need to transform a value or change its type during processing.

> [!important]
> **Note**
>
> Shadowing is distinct from mutability. In mutable variables, the type must remain consistent, whereas shadowing allows the type to change.

## Basic Shadowing Example

Consider the following Rust code that demonstrates shadowing:

```
fn main() {
    let a = 5; // Original `a`
    let a = a + 1; // Shadowing the first `a`: now `a` is 6
    println!("The value of a is: {}", a);


    {
        let a = a * 2; // Shadowing within an inner scope: `a` is now 12
        println!("The value of a in the inner scope is: {}", a);
    }


    println!("The value of a is: {}", a); // Out of the inner scope, `a` reverts to 6
}
```

In this example, the variable `a` is shadowed twice. First, its value is incremented, and then within an inner block, it is multiplied by two. Note how after the inner block ends, the value of `a` reverts back to its outer scope binding.

## Transforming Data Types with Shadowing

Shadowing also allows you to change the variable's type during transformation. For instance, you might want to convert a string to its length as an integer:

```
fn main() {
    let spaces = "   "; // `spaces` is a string
    let spaces = spaces.len(); // Shadowing: now `spaces` is an integer representing its length
    println!("The length of spaces is: {:?}", spaces); // Outputs: 3
}
```

This example illustrates how shadowing can facilitate type transformation without introducing new variable names.

> [!important]
> **Warning**
>
> Do not confuse shadowing with mutability. While a mutable variable allows its value to change, its type remains constant. Shadowing, however, completely replaces the previous binding and can even change the variable’s type.

## Shadowing vs. Mutability

Let’s contrast shadowing with mutable variables using the following code:

```
fn main() {
    // Using mutability
    let mut count = 1;
    count = 2; // Mutating the variable; type remains the same
    println!("Count using mutability: {}", count); // Outputs: 2


    // Using shadowing
    let count = "one"; // First binding as a string
    let count = count.len(); // Shadowing to change type: now `count` is an integer
    println!("Count using shadowing: {}", count); // Outputs: 3
}
```

Notice how shadowing seamlessly allows for changing both the type and value of `count`, while mutable variables do not.

## Scope and Shadowing

Each time a variable is shadowed, the new binding is valid only in its declared scope. Once that scope ends, the previous variable binding is restored. Consider this example:

```
fn main() {
    let number = 10;
    {
        let number = 20; // Shadows `number` in this inner block
        println!("Number in inner scope: {}", number); // Outputs: 20
    }
    println!("Number in outer scope: {}", number); // Outputs: 10
}
```

In the inner block, the value of `number` is overridden, but it reverts once the block concludes.

## Practical Use Case: Processing User Input

A common scenario for shadowing is processing and validating user input. By reusing the same variable name, you can clearly indicate each transformation step without cluttering the code:

```
use std::io;


fn main() {
    println!("Please enter your age:");
    let mut input = String::new();
    io::stdin().read_line(&mut input).expect("Failed to read line");


    let input = input.trim(); // Shadowing to remove extra whitespace
    let input: u32 = input.parse().expect("Please enter a valid number!"); // Shadowing to convert the string into an integer


    println!("Your age is: {}", input);
}
```

This approach shows how shadowing can simplify the code by clearly delineating transformation stages.

## Conclusion

Rust's shadowing feature is a powerful tool that lets you reuse variable names while adjusting their values and, if needed, their types. Leveraging shadowing can lead to clearer and more maintainable code by keeping transformations concise and scoped. Whether you are simply modifying a value or entirely changing its type, shadowing provides a flexible mechanism that enhances code readability and maintainability.

For further reading on Rust and its features, check out the [Rust Programming Language Book](https://doc.rust-lang.org/book/).

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/rust/module/f232d417-91e4-49e7-b538-be7db1e23daf/lesson/4b85bf43-5d11-4d84-8ac6-e9d67769a067)**
>
> Watch video content
