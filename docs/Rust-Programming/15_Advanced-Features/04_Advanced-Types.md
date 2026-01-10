# Advanced Types - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Rust-Programming/Advanced-Features/Advanced-Types)

---

## Table of Contents

- Advanced Types
  - New Type Pattern
  - Type Aliases
  - The Never Type
  - Dynamically Sized Types (DSTs)
  - Conclusion
  - Watch Video

---

## Content

Rust Programming

Advanced Features

# Advanced Types

In this lesson, we dive into some of the advanced features of Rust's type system, including new types, type aliases, the never type, and dynamically sized types. These tools enhance Rust's ability to produce safe and flexible code. Let's get started.

![The image shows an agenda with four items: Newtypes, Type aliases, The never type (!), and Dynamically sized types (DSTs), presented in a colorful, numbered list.](https://kodekloud.com/kk-media/image/upload/v1752883747/notes-assets/images/Rust-Programming-Advanced-Types/agenda-newtypes-type-aliases-dsts.jpg)

## New Type Pattern

Rust's new type pattern enforces type safety and abstraction by wrapping primitive types into distinct types. Imagine a project that involves different units of measurement such as kilometers, meters, and millimeters. Using the new type pattern ensures that functions expecting a value in meters won't accidentally receive a value in kilometers.

For example, wrapping a `u32` into `Meters` and `Kilometers`:

```
struct Meters(u32);
struct Kilometers(u32);


fn drive(distance: Meters) {
    println!("Driving {} meters!", distance.0);
}
```

In this code, the `drive` function strictly requires a `Meters` value, preventing accidental misuse. This pattern not only enforces type safety but also encapsulates the inner details of the wrapped type.

![The image explains the benefits of the newtype pattern in Rust, highlighting type safety to prevent mixing types like meters and kilometers, and abstraction to hide internal details of a type.](https://kodekloud.com/kk-media/image/upload/v1752883748/notes-assets/images/Rust-Programming-Advanced-Types/newtype-pattern-rust-benefits.jpg)

## Type Aliases

Type aliases provide a way to give a more descriptive name to an existing type, making the code shorter and more readable without creating a new, distinct type. This feature is especially useful for reducing repetition and clarifying code intent. For instance, you can create an alias for a `u32` as `UserId` and define `Coordinates` as a tuple representing latitude and longitude:

```
type UserId = u32;
type Coordinates = (f64, f64);


struct User {
    id: UserId,
    location: Coordinates,
}


fn display_user_info(user: &User) {
    println!(
        "User ID: {}, Location: ({}, {})",
        user.id, user.location.0, user.location.1
    );
}


fn main() {
    let user = User {
        id: 1001,
        location: (37.7749, -122.4194), // San Francisco
    };


    display_user_info(&user);
}
```

> [!important]
> **Note**
>
> Type aliases simply provide alternate names to existing types and do not create new type-checking boundaries. For example, `UserId` and `u32` will be treated as the same type by the compiler.

![The image explains how type aliases help in programming by reducing repetition and improving readability. It highlights that type aliases prevent the need to write long types repeatedly and make code clearer by using meaningful names.](https://kodekloud.com/kk-media/image/upload/v1752883749/notes-assets/images/Rust-Programming-Advanced-Types/type-aliases-programming-readability.jpg)

## The Never Type

The never type, denoted by an exclamation mark (`!`), is used for functions that never return a value. This might initially seem unusual, but it is particularly useful for functions that represent infinite loops or faults that result in a panic.

For example, here is a function that enters an endless loop:

```
fn endless_loop() -> ! {
    loop {
        println!("This loop never ends.");
    }
}
```

Moreover, the `panic!` macro in Rust also returns the never type, which clearly indicates that the function call will not return normally.

![The image features a laptop icon with an exclamation mark on the screen, accompanied by text explaining the "Never Type" in programming, specifically related to the panic! macro.](https://kodekloud.com/kk-media/image/upload/v1752883750/notes-assets/images/Rust-Programming-Advanced-Types/never-type-panic-macro-laptop.jpg)

## Dynamically Sized Types (DSTs)

Unlike most types in Rust, which have a well-defined size at compile time, dynamically sized types (DSTs) such as strings (`str`) or trait objects have their sizes determined at runtime. For instance, the actual length of a string literal is not known until the program is running.

Consider this example:

```
let message: &str = "Hello, world!";
```

Here, the `&str` type is dynamically sized, and Rust handles this by storing a pointer to the data along with its runtime length. DSTs are typically used behind a pointer, such as references or a `Box<T>`, to facilitate appropriate memory handling at runtime.

## Conclusion

In this lesson, we explored several advanced features of Rust's type system:

- **New Type Pattern:** Enhances type safety and abstraction.
- **Type Aliases:** Improves code clarity and reduces repetitive type definitions.
- **The Never Type (`!`):** Indicates functions that do not return a value.
- **Dynamically Sized Types (DSTs):** Allows types with sizes determined at runtime to be used safely.

These techniques empower you to write robust, maintainable, and safe Rust code while fully utilizing the language's capabilities.

For further details, consider exploring more on [Rust's Official Documentation](https://doc.rust-lang.org/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/rust/module/bff86fa1-7afc-44e5-b0ac-00b8be577bf8/lesson/4bf3b6ac-987d-4e56-904e-8e1c1ada94e3)**
>
> Watch video content
