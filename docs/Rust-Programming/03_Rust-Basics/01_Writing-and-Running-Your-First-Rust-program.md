# Writing and Running Your First Rust program - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Rust-Programming/Rust-Basics/Writing-and-Running-Your-First-Rust-program)

---

## Table of Contents

- Writing and Running Your First Rust program
  - Creating the Rust File
  - Writing the Code
  - Compiling and Running the Program
  - Recap of Steps
  - Quick Exercise: Creating a New Rust Project with Cargo
  - Watch Video
    - Step 1: Compile the Program
    - Step 2: Execute the Program

---

## Content

Rust Programming

Rust Basics

# Writing and Running Your First Rust program

In this article, you'll learn how to write, compile, and run your very first Rust program. By the end of this lesson, you will understand the basic steps to create a Rust file, compile it using the Rust compiler, and execute the program from the terminal.

## Creating the Rust File

Begin by creating a new Rust source file named `main.rs`. Remember that Rust source files must have the `.rs` extension. If you want to use multiple words for the filename, separate them with an underscore. For example, use `hello_world.rs` instead of `hello world.rs`.

![The image shows a folder icon labeled "main.rs" and a file named "hello_world.rs" with a checkmark, under the title "Writing and Running Your First Rust Program."](https://kodekloud.com/kk-media/image/upload/v1752883993/notes-assets/images/Rust-Programming-Writing-and-Running-Your-First-Rust-program/writing-running-first-rust-program.jpg)

## Writing the Code

Open the `main.rs` file in your favorite text editor or IDE and add the following code. This simple program prints "Hello, world!" to the terminal:

```
fn main() {
    println!("Hello, world!");
}
```

The code above defines the `main` function, which serves as the entry point for every Rust executable program. Inside the `main` function, the `println!` macro (identified by the exclamation mark) outputs the string "Hello, world!" to the console.

> [!important]
> **Note**
>
> In Rust, semicolons are used to differentiate between expressions and statements. Understanding when and how to use them is essential to prevent unexpected behavior.

## Compiling and Running the Program

Once you have saved the file, open your terminal and navigate to the directory where your `main.rs` file is located. You will compile the program using the Rust compiler (`rustc`), which generates an executable file.

### Step 1: Compile the Program

Run the following command in your terminal:

```
$ rustc main.rs
```

This command compiles your Rust code and creates an executable file named `main`.

### Step 2: Execute the Program

To run your compiled Rust program, execute the following command:

```
$ ./main
```

If everything is set up correctly, you should see the following output in your terminal:

```
Hello, world!
```

## Recap of Steps

In this lesson, you have:

- Created a `main.rs` file.
- Defined a `main` function that prints a message using the `println!` macro.
- Compiled the Rust program with `rustc`.
- Executed the generated executable file from your terminal.

> [!important]
> **Rust Project Management**
>
> While using `rustc` is sufficient for compiling simple programs, larger projects benefit from Cargo—a tool that manages dependencies, build configurations, and code sharing.

## Quick Exercise: Creating a New Rust Project with Cargo

Before wrapping up, try creating a new project using Cargo. Write your "Hello, world!" program within the Cargo project structure and build it. To ensure your code remains consistent and properly formatted, use the `rustfmt` tool included with the Rust distribution. Simply run:

```
$ rustfmt main.rs
```

This command automatically formats your Rust code according to community style guidelines.

![The image provides a quick exercise for creating a new Rust project using Cargo, writing a "Hello World" program, and using the `rustfmt` tool for code formatting.](https://kodekloud.com/kk-media/image/upload/v1752883994/notes-assets/images/Rust-Programming-Writing-and-Running-Your-First-Rust-program/rust-project-hello-world-exercise.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/rust/module/f232d417-91e4-49e7-b538-be7db1e23daf/lesson/f0beaa1a-4703-42c6-b7ce-c1efd94cc5a7)**
>
> Watch video content
