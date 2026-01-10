# Enums - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Rust-Programming/Collections-Error-Handling/Enums)

---

## Table of Contents

- Enums
  - Basic Concept and Syntax
  - Using Option to Handle Errors
  - Enums with Associated Data
  - Enums and Error Handling with the Result Type
  - Implementing Methods on Enums
  - Combining Enums with Structs
  - Conclusion
  - Watch Video

---

## Content

Rust Programming

Collections Error Handling

# Enums

In this article, we dive deep into enums in Rust—a powerful feature that allows you to define a type by listing its possible values. Enums not only make your code more expressive, but they also enforce type-safety, making your programs robust and easier to maintain.

Below, we explore the fundamental concepts and syntax for creating enums, how to instantiate them, and how to apply pattern matching. We also cover advanced examples including enums with associated data, error handling with the Option and Result types, and combining enums with structs to encapsulate behavior.

---

## Basic Concept and Syntax

An enum in Rust represents a set of possible options that a value can take. Each option, or variant, represents a different state or type. For example, to represent cardinal directions, an enum might define the variants: `North`, `South`, `East`, and `West`.

The basic syntax for defining an enum is:

```
enum EnumName {
    Variant1,
    Variant2,
    // More variants...
}


enum Direction {
    North,
    South,
    East,
    West,
}
```

To create instances of an enum, specify one of its variants using the double-colon syntax. For example:

```
enum Direction {
    North,
    South,
    East,
    West,
}


fn main() {
    let dir1 = Direction::North;
    let dir2 = Direction::South;


    println!("{:?}", dir1);
    println!("{:?}", dir2);
}
```

> [!important]
> **Debug Trait Required**
>
> Printing enums with `println!("{:?}", ...)` requires the `Debug` trait. If you encounter formatting errors, add `#[derive(Debug)]` above your enum definition.

The Rust standard library also provides useful enums such as `Option` and `Result`:

- **Option:** Represents an optional value. Every `Option` is either `Some(value)` or `None`.
- **Result:** Used for error handling. It is either `Ok(value)` for success or `Err(error)` for failure.

![The image is a diagram explaining enums, specifically the `Option<T>` and `Result<T, E>` types, detailing their purposes and variants.](https://kodekloud.com/kk-media/image/upload/v1752883842/notes-assetshttps://kodekloud.com/kk-media/image/upload/v1752883842/notes-assets/images/Rust-Programming-Enums/enums-option-result-diagram.jpg)

> [!important]
> **Note**
>
> The explanation provided here and in subsequent sections gives a complete understanding of how the `Option` and `Result` types work, making external diagrams optional.

---

## Using Option to Handle Errors

The `Option` type is particularly useful when a function may not return a valid result. For instance, while performing a division operation, you can return `None` if the denominator is zero.

```
fn divide(numerator: f64, denominator: f64) -> Option<f64> {
    if denominator == 0.0 {
        None
    } else {
        Some(numerator / denominator)
    }
}


fn main() {
    let result = divide(4.0, 2.0);
    match result {
        Some(value) => println!("Result: {}", value),
        None => println!("Cannot divide by zero"),
    }
}
```

If the denominator is 0.0:

```
fn main() {
    let result = divide(4.0, 0.0);


    match result {
        Some(value) => println!("Result: {:?}", value),
        None => println!("Cannot divide by zero"),
    }
}
```

When executed:

- With a non-zero denominator, the output is:  
  `Result: 2`
- With a zero denominator, the output is:  
  `Cannot divide by zero`

---

## Enums with Associated Data

Rust enums can be enhanced by associating data with each variant. This feature allows each variant to store different types and amounts of data, offering more flexibility.

Consider the following example with a `Message` enum where:

- `Quit` holds no data.
- `Move` contains two named fields, accessible just like a struct.
- `Write` holds a string.
- `ChangeColor` consists of three `i32` values representing RGB components.

```
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}


fn main() {
    let msg1 = Message::Quit;
    let msg2 = Message::Move { x: 10, y: 20 };
    let msg3 = Message::Write(String::from("Hello"));
    let msg4 = Message::ChangeColor(255, 0, 0);


    // Using pattern matching to handle each variant:
    match msg2 {
        Message::Quit => println!("Quit!"),
        Message::Move { x, y } => println!("Move to x: {}, y: {}", x, y),
        Message::Write(text) => println!("Text message: {}", text),
        Message::ChangeColor(r, g, b) => println!("Change color to RGB({}, {}, {})", r, g, b),
    }
}
```

In this example:

- Replacing `msg2` with `msg3` or `msg4` will output the corresponding associated data.
- The pattern matching technique extracts and prints the data based on the variant.

> [!important]
> **Unused Variables**
>
> If you assign variables like `msg3` or `msg4` without using them, the compiler may generate warnings. To suppress these warnings intentionally, prefix the variable name with an underscore (e.g., `_msg`).

Another example with different variants demonstrates pattern matching:

```
enum Animal {
    Dog(String),
    Cat(String),
    Bird(String),
}


fn sound(animal: Animal) -> &'static str {
    match animal {
        Animal::Dog(_) => "Bark",
        Animal::Cat(_) => "Meow",
        Animal::Bird(_) => "Tweet",
    }
}


fn main() {
    let pet1 = Animal::Dog(String::from("Buddy"));
    let pet2 = Animal::Cat(String::from("Whiskers"));
    let pet3 = Animal::Bird(String::from("Tweety"));


    println!("Pet1 makes a sound: {}", sound(pet1));
    println!("Pet2 makes a sound: {}", sound(pet2));
    println!("Pet3 makes a sound: {}", sound(pet3));
}
```

In the above code, the underscore is used in the match arms to ignore the associated string data since only the animal type is necessary to determine the sound.

---

## Enums and Error Handling with the Result Type

Enums are essential in managing error cases, particularly through file I/O operations using the `Result` type. The `Result` enum represents an operation that can either succeed (`Ok`) or fail (`Err`).

Consider the following example using file operations:

```
use std::fs::File;
use std::io::ErrorKind;


fn main() {
    let file_result = File::open("hello.txt");
    match file_result {
        Ok(file) => println!("File opened successfully: {:?}", file),
        Err(error) => match error.kind() {
            ErrorKind::NotFound => println!("File not found"),
            other_error => println!("Error opening file: {:?}", other_error),
        },
    }
}
```

This code attempts to open "hello.txt" and:

- Prints file details if successful.
- Matches the error kind if unsuccessful, outputting "File not found" for a missing file or printing further error details for other issues.

When "hello.txt" is absent, you'll see the "File not found" message. Creating the file will result in a successful file details printout.

![The image is a diagram explaining enums, specifically the `Option<T>` and `Result<T, E>` types, detailing their purposes and variants.](https://kodekloud.com/kk-media/image/upload/v1752883842/notes-assetshttps://kodekloud.com/kk-media/image/upload/v1752883842/notes-assets/images/Rust-Programming-Enums/enums-option-result-diagram.jpg)

> [!important]
> **Comprehensive Error Handling**
>
> The explanation in this section, in conjunction with the earlier discussion on Option and Result types, clearly illustrates error handling in Rust without the need for external diagrams.

---

## Implementing Methods on Enums

Similar to structs, enums in Rust can have methods defined in an `impl` block. These methods associate behaviors directly with the enum. Consider a `TrafficLight` enum representing traffic signal states:

```
enum TrafficLight {
    Red,
    Yellow,
    Green,
}


impl TrafficLight {
    fn duration(&self) -> u8 {
        match self {
            TrafficLight::Red => 60,
            TrafficLight::Yellow => 5,
            TrafficLight::Green => 30,
        }
    }
}


fn main() {
    let red_light = TrafficLight::Red;
    let yellow_light = TrafficLight::Yellow;
    let green_light = TrafficLight::Green;


    println!("Red light duration: {} seconds", red_light.duration());
    println!("Yellow light duration: {} seconds", yellow_light.duration());
    println!("Green light duration: {} seconds", green_light.duration());
}
```

Here, the `duration` method provides the active time for each traffic light state using pattern matching:

- Red lasts for 60 seconds.
- Yellow lasts for 5 seconds.
- Green lasts for 30 seconds.

---

## Combining Enums with Structs

Enums often work hand-in-hand with structs to model complex behaviors. For example, consider a job application process where a candidate's application status is tracked using an enum.

Start by defining a `JobStatus` enum and a `Candidate` struct:

```
enum JobStatus {
    Applied,
    Interviewing,
    Offered,
    Rejected,
}


struct Candidate {
    name: String,
    status: JobStatus,
}


impl Candidate {
    fn new(name: String, status: JobStatus) -> Candidate {
        Candidate { name, status }
    }


    fn get_status(&self) -> &str {
        match self.status {
            JobStatus::Applied => "Applied",
            JobStatus::Interviewing => "Interviewing",
            JobStatus::Offered => "Offered",
            JobStatus::Rejected => "Rejected",
        }
    }


    fn update_status(&mut self, new_status: JobStatus) {
        self.status = new_status;
    }
}
```

In this example:

- The `Candidate` struct holds a candidate's name and their current application `status` (of type `JobStatus`).
- The `new` function serves as a constructor.
- `get_status` returns a text description of the candidate’s application status.
- `update_status` allows modifications to the candidate’s current status.

The following main function demonstrates creating and updating a candidate's status:

```
fn main() {
    let mut candidate = Candidate::new(String::from("Alice"), JobStatus::Applied);
    println!("{} is currently {}", candidate.name, candidate.get_status());


    candidate.update_status(JobStatus::Interviewing);
    println!("{} is currently {}", candidate.name, candidate.get_status());


    candidate.update_status(JobStatus::Offered);
    println!("{} is currently {}", candidate.name, candidate.get_status());
}
```

The output should be:

```
Alice is currently Applied
Alice is currently Interviewing
Alice is currently Offered
```

This design pattern, combining enums with structs, helps encapsulate both data and behavior, leading to clean and expressive code.

---

## Conclusion

Enums are a cornerstone feature in Rust for modeling expressive and safe data structures. With pattern matching, associated data, and integration with structs, enums empower you to build robust, maintainable, and clear code. From handling optional values and errors using `Option` and `Result` to effectively modeling complex state machines, enums play an indispensable role in Rust programming.

Happy coding!

For further reading, consider these resources:

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Rust Documentation](https://doc.rust-lang.org/book/)
- [Rust Error Handling](https://doc.rust-lang.org/book/ch09-02-recoverable-errors-with-result.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/rust/module/29fbe393-bae3-4a16-8fc5-a854a2400daa/lesson/b0560571-b8f0-4a7d-8b26-2ef3e2750adf)**
>
> Watch video content
