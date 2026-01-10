# Advanced Functions and Closures - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Rust-Programming/Advanced-Features/Advanced-Functions-and-Closures)

---

## Table of Contents

- Advanced Functions and Closures
  - Function Pointers: Using Functions as Arguments
  - Closures Versus Functions
  - Key Takeaways
  - Watch Video

---

## Content

Rust Programming

Advanced Features

# Advanced Functions and Closures

In this lesson, we dive deep into advanced functions and closures in Rust. We'll explore how to leverage function pointers, pass regular functions as arguments, and even return closures from functions. These advanced techniques can help you write more flexible and reusable Rust code.

## Function Pointers: Using Functions as Arguments

Often, you might find the need to pass a function as an argument in your code. In Rust, this is done using function pointers, represented by the lowercase `fn` type. Function pointers enable you to use regular functions just like closures.

Consider a common scenario: you have a function that calculates the square of a number and another function that applies an operation three times to a given value. With function pointers, you can seamlessly pass the square function as an argument to the other function, avoiding repetitive code.

![The image is a slide titled "Function Pointers – Using Functions as Arguments," explaining that in Rust, closures and regular functions can be passed to other functions using function pointers.](https://kodekloud.com/kk-media/image/upload/v1752883746/notes-assets/images/Rust-Programming-Advanced-Functions-and-Closures/function-pointers-rust-closures.jpg)

Below is an example of how this works in Rust:

```
fn square(x: i32) -> i32 {
    x * x
}


fn apply_three_times(f: fn(i32) -> i32, value: i32) -> i32 {
    f(value) + f(value) + f(value)
}


fn main() {
    let result = apply_three_times(square, 2);
    println!("Result is: {}", result); // Output: 12
}
```

In this example, the `square` function returns the square of a number. The `apply_three_times` function accepts a function pointer `f` (which takes an `i32` and returns an `i32`) along with a value, applies `f` to that value three times, and then sums the results. Calling `apply_three_times(square, 2)` computes the square of 2 (i.e., 4) three times and sums them up, resulting in 12.

> [!important]
> **Tip**
>
> Choosing function pointers is a great way to avoid code duplication when the same functionality is needed in multiple contexts.

## Closures Versus Functions

While functions and closures can accomplish similar tasks, closures offer extra flexibility by capturing variables from their surrounding environment. This feature makes closures particularly useful for inline transformations and quick operations.

For example, consider using a closure with the `map` method on a vector:

```
fn main() {
    let numbers = vec![1, 2, 3];
    let strings: Vec<String> = numbers.iter()
        .map(|num| format!("Number: {}", num))
        .collect();
    println!("{:?}", strings);
}
```

In this example, the closure inside the `map` function converts each number into a formatted string. The resulting output is:

```
["Number: 1", "Number: 2", "Number: 3"]
```

Alternatively, you can achieve the same result by defining a standalone function and passing it to `map`:

```
fn number_to_string(num: &i32) -> String {
    format!("Number: {}", num)
}


fn main() {
    let numbers = vec![1, 2, 3];
    let strings: Vec<String> = numbers.iter()
        .map(number_to_string)
        .collect();
    println!("{:?}", strings);
}
```

Both approaches produce an identical output:

```
["Number: 1", "Number: 2", "Number: 3"]
```

> [!important]
> **Note**
>
> When deciding between closures and regular functions, opt for closures if the transformation is simple and used only once. Use regular functions to promote code reuse and enhance maintainability.

## Key Takeaways

By mastering the use of function pointers and closures, you can significantly enhance the flexibility and clarity of your Rust programs. Remember:

- Use **function pointers** for passing simple, reusable functions as arguments.
- Leverage **closures** when you need to capture environmental variables for inline data transformations.

This advanced understanding of Rust's functional programming capabilities will empower you to write more efficient and elegant code.

For more details on Rust's programming patterns and best practices, visit the [Rust Documentation](https://doc.rust-lang.org/book/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/rust/module/bff86fa1-7afc-44e5-b0ac-00b8be577bf8/lesson/0a4897e2-c6f8-4bc8-81ce-5dfe6a8075ef)**
>
> Watch video content
