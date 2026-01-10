# Advanced Traits - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Rust-Programming/Advanced-Features/Advanced-Traits)

---

## Table of Contents

- Advanced Traits
  - Recap: Traits in Rust
  - Associated Types in Traits
  - Watch Video
    - Implementing the Container Trait for a Box
    - Implementing the Container Trait for a String Collection

---

## Content

Rust Programming

Advanced Features

# Advanced Traits

In this lesson, we explore advanced traits in Rust. You'll learn about associated types and how to implement traits for different types, deepening your understanding of Rust's powerful type system.

## Recap: Traits in Rust

Before exploring advanced topics, let's review the basics of traits in Rust. A trait defines a set of methods that a type must implement to exhibit a specific behavior, serving as a contract or interface for the type.

For example, consider the `Display` trait:

```
trait Display {
    fn display(&self);
}
```

Any type that implements the `Display` trait must provide its own definition of the `display` method. For instance, here’s how you might implement this trait for a `Person` struct:

```
struct Person {
    name: String,
}


impl Display for Person {
    fn display(&self) {
        println!("Person: {}", self.name);
    }
}
```

In this example, the `Person` struct implements the `display` method to print its `name` field.

## Associated Types in Traits

An associated type acts as a placeholder within a trait definition. When a type implements the trait, it replaces this placeholder with a concrete type. Consider the following `Container` trait, which uses an associated type `Item`:

```
trait Container {
    type Item;


    fn store(&self, item: Self::Item);
    fn retrieve(&self) -> Self::Item;
}
```

Here, the `store` method accepts an argument of type `Self::Item`, and the `retrieve` method returns a value of the same type. The actual type for `Item` is specified by the implementer of this trait.

### Implementing the Container Trait for a Box

Let's implement the `Container` trait for a simple `Box` struct that stores an integer value:

```
struct Box {
    value: i32,
}


impl Container for Box {
    type Item = i32;


    fn store(&self, item: i32) {
        println!("Storing value: {}", item);
    }


    fn retrieve(&self) -> i32 {
        self.value
    }
}
```

In this implementation, the associated type `Item` is set to `i32`. The `store` method accepts an integer and the `retrieve` method returns an integer. To see these methods in action:

```
let my_box = Box { value: 42 };
my_box.store(50);
println!("Retrieved: {}", my_box.retrieve());
```

The expected output will be:

```
Storing value: 50
Retrieved: 42
```

> [!important]
> **Note**
>
> Remember that specifying an associated type enables a more flexible and type-safe way of defining generic behaviors in Rust.

### Implementing the Container Trait for a String Collection

Now, let’s create a struct that acts as a collection for strings and implement the `Container` trait for it. In this example, the container will exclusively manage string values:

```
struct StringContainer {
    items: Vec<String>,
}


impl Container for StringContainer {
    type Item = String;


    fn store(&self, item: String) {
        println!("Storing item: {}", item);
    }


    fn retrieve(&self) -> String {
        self.items[0].clone() // Retrieve the first item
    }
}
```

Here, the associated type is explicitly set as `String`. The `store` method prints the stored string, and the `retrieve` method returns a clone of the first string in the `items` vector.

To use the `StringContainer`:

```
let my_container = StringContainer {
    items: vec!["Hello".to_string(), "World".to_string()],
};
my_container.store("Rust".to_string());
println!("Retrieved: {}", my_container.retrieve());
```

The output will be:

```
Storing item: Rust
Retrieved: Hello
```

This example demonstrates how associated types enable type-safe, flexible container implementations without ambiguity.

> [!important]
> **Additional Resources**
>
> For more details on Rust traits and associated types, consider checking out the [Rust Documentation](https://doc.rust-lang.org/book/ch10-02-traits.html).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/rust/module/bff86fa1-7afc-44e5-b0ac-00b8be577bf8/lesson/2836aa6a-dffa-4d80-b68c-febc9f09e532)**
>
> Watch video content
