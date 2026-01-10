# Parsing command line args with clap - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Rust-Programming/Building-Command-Line-Tools/Parsing-command-line-args-with-clap)

---

## Table of Contents

- Parsing command line args with clap
  - Setting Up Your Rust Project
  - Adding Clap as a Dependency
  - A Basic CLI Example
  - Enhancing Your CLI with Flags and Options
  - Implementing Subcommands for Multiple Actions
  - Conclusion
  - Watch Video

---

## Content

Rust Programming

Building Command Line Tools

# Parsing command line args with clap

In this lesson, you'll learn how to set up the Clap library for Rust to pass command-line arguments, add flags and options, and work with subcommands. This tutorial covers creating a new Rust project, installing dependencies, and building a versatile CLI tool.

---

## Setting Up Your Rust Project

Begin by creating a new Rust project for your CLI tool. In your terminal, run the following commands:

```
cargo new my_cli_tool
cd my_cli_tool
tree
```

The output should resemble:

```
.
├── Cargo.toml
└── src
    └── main.rs


2 directories, 2 files
```

Open the project in your favorite code editor, such as VS Code, to get started.

---

## Adding Clap as a Dependency

To integrate Clap into your project, add it to the project's dependencies. You can do this in one of two ways:

1.  Using the Cargo add command:

    ```
    cargo add clap
    ```

2.  Manually editing your Cargo.toml file to include:

    ```
    [package]
    name = "my_cli_tool"
    version = "0.1.0"
    edition = "2021"


    [dependencies]
    clap = { version = "4.5.20", features = ["derive"] }
    ```

The `derive` feature enables you to leverage Rust's powerful macros for auto-generating argument-parsing logic.

---

## A Basic CLI Example

Start with a simple example that accepts a name input and prints a greeting. Insert the following code into your `src/main.rs`:

```
use clap::Parser;


/// Simple program to greet a person
#[derive(Parser)]
#[command(name = "greeter")]
#[command(about = "A simple CLI tool to greet a person", long_about = None)]
struct Cli {
    /// Name of the person to greet
    #[arg(short, long)]
    name: String,
}


fn main() {
    let args: Cli = Cli::parse();
    println!("Hello, {}!", args.name);
}
```

The `#[derive(Parser)]` macro automatically generates the code needed for parsing command-line arguments based on the defined `Cli` struct. Run the program with:

```
cargo run -- --name Priyanka
```

> [!important]
> **Tip**
>
> Include the double hyphens (`--`) to separate cargo arguments from your CLI tool's arguments.

---

## Enhancing Your CLI with Flags and Options

Next, extend your CLI tool with a customizable greeting and an option to display the greeting in uppercase. Update your `Cli` struct as follows:

```
use clap::Parser;


/// Simple program to greet a person
#[derive(Parser)]
#[command(name = "greeter")]
#[command(about = "A simple CLI tool to greet a person", long_about = None)]
struct Cli {
    /// Name of the person to greet
    #[arg(short, long)]
    name: String,


    /// Customize the greeting message
    #[arg(short, long, default_value_t = String::from("Hello"))]
    greeting: String,


    /// Print the greeting in uppercase
    #[arg(short, long, action = clap::ArgAction::SetTrue)]
    uppercase: bool,
}


fn main() {
    let args: Cli = Cli::parse();


    let mut message = format!("{} {}", args.greeting, args.name);
    if args.uppercase {
        message = message.to_uppercase();
    }
    println!("{}!", message);
}
```

This code introduces:

- The `greeting` option to allow a custom greeting message (defaults to “Hello”).
- The `uppercase` flag, which converts the output to uppercase when specified.

Test the updated CLI tool with:

```
cargo run -- --name Priyanka --greeting Hey --uppercase
```

If you omit the `--uppercase` flag, the printed greeting retains its original case.

---

## Implementing Subcommands for Multiple Actions

Subcommands allow you to design more complex command-line interfaces that can handle multiple actions. In this example, you'll add two subcommands: `hello` and `goodbye`. Replace your existing code in `src/main.rs` with the following:

```
use clap::{Parser, Subcommand};


/// A CLI tool with subcommands to greet people
#[derive(Parser)]
#[command(name = "greeter")]
#[command(about = "A CLI tool to greet people", long_about = None)]
struct Cli {
    #[command(subcommand)]
    command: Commands,
}


#[derive(Subcommand)]
enum Commands {
    /// Say hello to someone
    Hello {
        #[arg(short, long)]
        name: String,
    },
    /// Say goodbye to someone
    Goodbye {
        #[arg(short, long)]
        name: String,
    },
}


fn main() {
    let args: Cli = Cli::parse();


    match args.command {
        Commands::Hello { name } => println!("Hello, {}!", name),
        Commands::Goodbye { name } => println!("Goodbye, {}!", name),
    }
}
```

Key elements in this implementation include:

- The `Cli` struct, which delegates to a `Commands` enum that defines available subcommands.
- Two subcommands (`Hello` and `Goodbye`), each expecting a `name` argument.
- A `match` statement in `main` that decides which subcommand is executed based on user input.

To run the subcommands, use:

```
cargo run --quiet -- hello --name Alice
```

and

```
cargo run --quiet -- goodbye --name Alice
```

The expected outputs are:

```
Hello, Alice!
```

and

```
Goodbye, Alice!
```

---

## Conclusion

This lesson demonstrated how to integrate Clap into a Rust project for efficient command-line argument parsing. You learned how to:

- Set up a new Rust project.
- Add and configure the Clap dependency.
- Create a basic CLI tool with flags and options.
- Implement subcommands for handling multiple commands.

With Clap, you can build powerful and flexible CLI tools tailored to your needs. For further reading and detailed documentation, check out the [Clap GitHub repository](https://github.com/clap-rs/clap) and the [Rust CLI book](https://rust-cli.github.io/book/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/rust/module/bb7ae445-2739-4b78-a1f2-e30c0b7944e3/lesson/ff51c989-4123-4930-92ff-900e50b86bd8)**
>
> Watch video content
