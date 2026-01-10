# Traits Shared Behavior - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Rust-Programming/Advanced-Rust-Concepts/Traits-Shared-Behavior)

---

## Table of Contents

- Traits Shared Behavior
  - Why Use Traits?
  - A Simple Example: The Sendable Trait
  - Running the Code
  - Using Traits as Function Parameters
  - Default Implementations in Traits
  - Using Trait Bounds with Generics
  - Summary
  - Watch Video

---

## Content

Rust Programming

Advanced Rust Concepts

# Traits Shared Behavior

In this article, we explore how traits in Rust allow you to define shared behavior across different types. Think of a trait as a contract: when a type implements a trait, it promises to provide the behaviors defined by that trait. This is similar to interfaces in languages like Java or C#, but with a unique Rust twist.

![The image is an introduction to traits, explaining that they define shared behavior across types, act like contracts, promise certain behaviors when implemented, and enable polymorphism.](https://kodekloud.com/kk-media/image/upload/v1752883785/notes-assets/images/Rust-Programming-Traits-Shared-Behavior/introduction-to-traits-polymorphism.jpg)

Traits are crucial for writing reusable and flexible code since they let you define methods common to various types, thereby enabling polymorphism—a key feature in many programming languages.

## Why Use Traits?

Traits offer several benefits:

- **Code Reusability:** Define a set of methods once, and then implement them for various types. This reduces redundancy and makes code maintenance easier.
- **Polymorphism:** Write functions that operate on any type meeting a specific trait requirement, making your code adaptable and extensible.

![The image explains the benefits of using traits in programming, highlighting "Code Reusability" and "Polymorphism" with brief descriptions for each.](https://kodekloud.com/kk-media/image/upload/v1752883786/notes-assets/images/Rust-Programming-Traits-Shared-Behavior/traits-benefits-code-reusability-polymorphism.jpg)

## A Simple Example: The Sendable Trait

Imagine you are building a system that handles different types of messages, such as SMS and emails. Each message type should implement a `send` method. To achieve this, you can define a trait that enforces this behavior.

Below is an example of the `Sendable` trait along with two structs (`Email` and `SMS`) that implement it:

```
pub trait Sendable {
    fn send(&self) -> String;
}


struct Email {
    recipient: String,
    subject: String,
    body: String,
}


impl Sendable for Email {
    fn send(&self) -> String {
        format!("Sending email to {}: {}", self.recipient, self.subject)
    }
}


struct SMS {
    phone_number: String,
    message: String,
}


impl Sendable for SMS {
    fn send(&self) -> String {
        format!("Sending SMS to {}: {}", self.phone_number, self.message)
    }
}
```

In the code above, the `Sendable` trait guarantees that any type that implements it will provide a definition for the `send` method. Both `Email` and `SMS` offer their own specific implementations.

## Running the Code

Below is a `main` function that creates instances of `Email` and `SMS` and calls their respective `send` implementations:

```
fn main() {
    let email = Email {
        recipient: String::from("alice@example.com"),
        subject: String::from("Meeting Reminder"),
        body: String::from("Don't forget about our meeting tomorrow at 10 AM."),
    };


    let sms = SMS {
        phone_number: String::from("+1234567890"),
        message: String::from("Your OTP is 123456."),
    };


    println!("{}", email.send());
    println!("{}", sms.send());
}
```

When you compile and run the program, the output should look like:

```
Sending email to alice@example.com: Meeting Reminder
Sending SMS to +1234567890: Your OTP is 123456.
```

> [!important]
> **Note**
>
> The `Sendable` trait acts as a contract ensuring that both `Email` and `SMS` provide a `send` method even though their implementations differ.

## Using Traits as Function Parameters

Traits enable polymorphism by allowing functions to accept any type that implements a specific trait. For example, consider the following function that accepts an item that implements `Sendable`:

```
fn send_message(item: &impl Sendable) {
    println!("{}", item.send());
}
```

Both `Email` and `SMS` can be passed to this function:

```
fn main() {
    let email = Email {
        recipient: String::from("alice@example.com"),
        subject: String::from("Meeting Reminder"),
        body: String::from("Don't forget about our meeting tomorrow at 10 AM."),
    };


    let sms = SMS {
        phone_number: String::from("+1234567890"),
        message: String::from("Your OTP is 123456."),
    };


    send_message(&email);
    send_message(&sms);
}
```

This approach demonstrates polymorphism: the `send_message` function doesn't care if the item is an email or SMS—it only requires that the item implements `Sendable`.

## Default Implementations in Traits

Rust allows you to provide default method implementations within a trait. If a type does not offer its own version, the default is used. For instance, consider an updated `Sendable` trait with a default `send` method:

```
pub trait Sendable {
    fn send(&self) -> String {
        String::from("Sending a message...")
    }
}
```

If a type, such as `PushNotification`, implements `Sendable` without overriding the `send` method, the default implementation is applied. Here is the complete example:

```
pub trait Sendable {
    fn send(&self) -> String {
        String::from("Sending a message...")
    }
}


struct Email {
    recipient: String,
    subject: String,
    body: String,
}


impl Sendable for Email {
    fn send(&self) -> String {
        format!("Sending email to {}: {}", self.recipient, self.subject)
    }
}


struct SMS {
    phone_number: String,
    message: String,
}


impl Sendable for SMS {
    fn send(&self) -> String {
        format!("Sending SMS to {}: {}", self.phone_number, self.message)
    }
}


struct PushNotification {
    title: String,
    content: String,
}


impl Sendable for PushNotification {}


fn send_message(item: &impl Sendable) {
    println!("{}", item.send());
}


fn main() {
    let push = PushNotification {
        title: String::from("Update Available"),
        content: String::from("Your app has a new update!"),
    };
    send_message(&push);
}
```

Running this code outputs:

```
Sending a message...
```

> [!important]
> **Note**
>
> Default implementations are useful when a specific behavior is not required for a type, yet the type benefits from implementing the trait.

## Using Trait Bounds with Generics

Traits can also be combined with generics to constrain the types that can be passed to a function. The example below creates a function to log any message that implements `Sendable`:

```
pub trait Sendable {
    fn send(&self) -> String {
        String::from("Sending a message...")
    }
}


fn log_message<T: Sendable>(item: &T) {
    println!("Logging: {}", item.send());
}


struct Email {
    recipient: String,
    subject: String,
    body: String,
}


impl Sendable for Email {
    fn send(&self) -> String {
        format!("Sending email to {}: {}", self.recipient, self.subject)
    }
}


fn main() {
    let email = Email {
        recipient: String::from("alice@example.com"),
        subject: String::from("Meeting Reminder"),
        body: String::from("Don't forget about our meeting tomorrow at 10 AM."),
    };


    log_message(&email);
}
```

Here, the trait bound `T: Sendable` guarantees that the generic type `T` implements `Sendable`. This makes the `log_message` function both flexible and type-safe.

![The image is a slide titled "Trait Bounds and Generics," explaining that a generic type must implement a trait and that generics make functions flexible and type-safe.](https://kodekloud.com/kk-media/image/upload/v1752883787/notes-assets/images/Rust-Programming-Traits-Shared-Behavior/trait-bounds-generics-slide.jpg)

## Summary

Traits in Rust empower developers to define shared behavior with clear contracts, promoting modularity, reusability, and type safety. Here are the key takeaways:

1.  **Shared Behavior:** Traits define methods that various types can implement, ensuring consistent behavior.
2.  **Polymorphism:** Functions can operate on any type that implements the necessary trait.
3.  **Default Implementations:** Traits can provide a default behavior that can be overridden by specific types.
4.  **Generics and Trait Bounds:** Traits with generics offer flexibility while maintaining type safety.

![The image is a summary of key points about traits in programming, highlighting shared behavior, implementation, polymorphism, default methods, and generics. It is visually organized with numbered points and a gradient background.](https://kodekloud.com/kk-media/image/upload/v1752883788/notes-assets/images/Rust-Programming-Traits-Shared-Behavior/programming-traits-summary-gradient.jpg)

By leveraging traits, you can build modular, reusable, and extensible programs in Rust that enforce clear contracts and ensure robust type safety.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/rust/module/37d4032f-c90d-43ee-a0cd-981b95ab22b0/lesson/2954d325-ac20-4645-b8c3-0aa70b77f30a)**
>
> Watch video content
