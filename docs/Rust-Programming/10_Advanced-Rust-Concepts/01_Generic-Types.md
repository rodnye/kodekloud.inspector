# Generic Types - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Rust-Programming/Advanced-Rust-Concepts/Generic-Types)

---

## Table of Contents

- Generic Types
  - Generic Functions
  - Generic Structs
  - Generic Enums
  - Generic Methods
  - Performance Considerations
  - Conclusion
  - Watch Video
    - Mixing Generic and Concrete Fields

---

## Content

Rust Programming

Advanced Rust Concepts

# Generic Types

Discover how generics in Rust help you write flexible, reusable, and efficient code. Generics allow your functions, structs, enums, and methods to work with any data type. This reduces code duplication and makes your projects easier to maintain. In this guide, we will explore various aspects of generics and discuss performance considerations.

![The image is a diagram titled "Generics," highlighting four benefits: efficient (improves code efficiency), flexible (works with any data type), cleaner (makes code cleaner), and reusable (reduces redundancy).](https://kodekloud.com/kk-media/image/upload/v1752883762/notes-assets/images/Rust-Programming-Generic-Types/generics-diagram-benefits-efficiency-flexibility.jpg)

## Generic Functions

Generics empower you to write functions that are not restricted to a single data type. Instead of implementing separate functions for different types, you can create one generic function that accommodates any input.

Below is an example that demonstrates non-generic functions versus a generic function using Python-like syntax for illustration:

```
# Non-generic functions to print specific types
def print_integer(num: int):
    print(num)


def print_string(text: str):
    print(text)


# Generic function to print any type of data
def print_item(item):
    print(item)


# Usage
print_integer(5)
print_string("Hello")
print_item(5)
print_item("Hello")
```

Using a generic function like `print_item` prevents code redundancy and maintains consistency. Now, let's take a look at a Rust implementation that returns the first element of a slice regardless of its type:

```
fn first_element<T>(list: &[T]) -> Option<&T> {
    if list.is_empty() {
        None
    } else {
        Some(&list[0])
    }
}


fn main() {
    let numbers: Vec<i32> = vec![1, 2, 3];
    let words: Vec<&str> = vec!["apple", "banana", "cherry"];


    if let Some(first) = first_element(&numbers) {
        println!("First number: {}", first);
    }

    if let Some(first) = first_element(&words) {
        println!("First word: {}", first);
    }
}
```

In this Rust example, the generic type parameter `T` allows the function to handle slices containing any type. The return type is `Option<&T>`, which gracefully deals with the possibility of an empty slice.

![The image explains the benefits of using generics, highlighting two points: avoiding code duplication and improving flexibility and robustness.](https://kodekloud.com/kk-media/image/upload/v1752883763/notes-assets/images/Rust-Programming-Generic-Types/generics-benefits-code-duplication-flexibility.jpg)

## Generic Structs

Rust structs also support generics, letting you define data structures that work with any type. Consider a struct that represents a pair of values:

```
// Using generics in structs
struct Pair<T> {
    first: T,
    second: T,
}


fn main() {
    let int_pair = Pair { first: 1, second: 2 };
    let float_pair = Pair { first: 1.0, second: 2.0 };
    let string_pair = Pair {
        first: String::from("Hello"),
        second: String::from("World")
    };


    println!("Integer Pair: {}, {}", int_pair.first, int_pair.second);
    println!("Float Pair: {}, {}", float_pair.first, float_pair.second);
    println!("String Pair: {}, {}", string_pair.first, string_pair.second);
}
```

![The image is a slide titled "Using Generics in Structs," with a note stating that Rust structs can be generic to store any type of value.](https://kodekloud.com/kk-media/image/upload/v1752883764/notes-assets/images/Rust-Programming-Generic-Types/using-generics-in-structs-rust.jpg)

The type parameter `T` in the `Pair` struct allows you to store any type, and Rust infers the specific type based on the provided values.

### Mixing Generic and Concrete Fields

You may sometimes need to mix generic fields with fields that have fixed types. For example, if you want to add a mandatory `i32` field to your struct, you can do so while still using generics:

```
struct Pair<T> {
    first: T,
    second: T,
    third: i32,
}


fn main() {
    let int_pair = Pair { first: 1, second: 2, third: 3 };
    println!("Integer Pair: ({}, {}, {})", int_pair.first, int_pair.second, int_pair.third);
}
```

In this example, while `first` and `second` remain generic, `third` is explicitly defined as an `i32`.

## Generic Enums

Enums in Rust can also leverage generics to represent multiple types. For instance, consider a custom `Result` type that encapsulates either a success result or an error message:

```
enum MyResult<T, E> {
    Ok(T),
    Err(E),
}


fn main() {
    let success: MyResult<i32, &str> = MyResult::Ok(200);
    let error: MyResult<i32, &str> = MyResult::Err("Something went wrong");


    match success {
        MyResult::Ok(value) => println!("Success with value: {}", value),
        MyResult::Err(err) => println!("Error: {}", err),
    }


    match error {
        MyResult::Ok(value) => println!("Success with value: {}", value),
        MyResult::Err(err) => println!("Error: {}", err),
    }
}
```

Here, `T` represents the type for a successful result and `E` represents the error type, providing a robust way to handle different outcomes.

## Generic Methods

Generic methods on structs allow you to implement functionality that works across various types. For example, consider a method to swap the two values in a `Pair` struct. This method consumes the original struct and returns a new one with swapped values:

```
struct Pair<T> {
    first: T,
    second: T,
}


impl<T> Pair<T> {
    fn swap(self) -> Pair<T> {
        Pair {
            first: self.second,
            second: self.first,
        }
    }
}


fn main() {
    let int_pair = Pair { first: 10, second: 20 };
    let swapped_pair = int_pair.swap();
    println!("Swapped Pair: ({}, {})", swapped_pair.first, swapped_pair.second);
}
```

Each method call works for any instantiation of `Pair<T>`, making your code more versatile.

## Performance Considerations

> [!important]
> **Monomorphization in Rust**
>
> Rust uses a process called monomorphization during compilation to generate type-specific versions of your generic code. This ensures that there is no runtime overhead, and your generic code performs as efficiently as if it were written specifically for each type.

## Conclusion

Generics in Rust enable you to create versatile, clean, and high-performance code. By leveraging generics in functions, structs, enums, and methods, you can reduce duplication and build robust libraries that work seamlessly with various data types.

For further reading, check out these resources:

- [Rust Programming Language](https://www.rust-lang.org/)
- [Rust Documentation](https://doc.rust-lang.org/)
- [Learning Rust](https://www.rust-lang.org/learn)

Embrace generics to write code that adapts to your needs without compromising on performance.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/rust/module/37d4032f-c90d-43ee-a0cd-981b95ab22b0/lesson/5806e4de-49f2-4b17-be72-c528e394e2c0)**
>
> Watch video content
