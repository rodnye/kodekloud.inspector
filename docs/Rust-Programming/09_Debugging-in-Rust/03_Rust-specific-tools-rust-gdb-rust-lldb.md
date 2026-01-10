# Rust specific tools rust gdb rust lldb - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Rust-Programming/Debugging-in-Rust/Rust-specific-tools-rust-gdb-rust-lldb)

---

## Table of Contents

- Rust specific tools rust gdb rust lldb
  - What is LLDB?
  - Introducing Rust LLDB
  - Launching Rust LLDB
  - Writing and Compiling a Factorial Program
  - Introducing a Bug for Debugging
  - Setting Breakpoints and Starting a Debug Session
  - Fixing the Bug
  - Watch Video
  - Practice Lab

---

## Content

Rust Programming

Debugging in Rust

# Rust specific tools rust gdb rust lldb

In this lesson, we explore a powerful debugging tool tailored for Rust development: Rust LLDB. Although debugging might seem challenging at first, this guide will walk you through the essential concepts and procedures step by step.

## What is LLDB?

LLDB (Low-Level Debugger) is an efficient and user-friendly debugger that is part of the LLVM project. As the default debugger on macOS, it enables you to pause program execution, inspect variables, and step through code interactively.

![The image introduces "lldb" with an illustration of a person interacting with a laptop displaying code, highlighting features like being "Fast" and "User Friendly."](https://kodekloud.com/kk-media/image/upload/v1752883866/notes-assets/images/Rust-Programming-Rust-specific-tools-rust-gdb-rust-lldb/lldb-fast-user-friendly-illustration.jpg)

## Introducing Rust LLDB

Rust LLDB is a customized version of LLDB designed specifically for Rust. It is configured to understand Rust’s unique memory management, data types, and error handling. This Rust-friendly debugger is integrated seamlessly into the Rust toolchain. If you installed Rust via Rustup, Rust LLDB is already available. Confirm your installation with:

```
rust-lldb --version
```

If version information is displayed, Rust LLDB is installed and ready to use.

![The image describes "Rust lldb," a tool designed for a smoother debugging experience with Rust code, highlighting its configuration for Rust's unique features. It includes two arrows pointing in opposite directions.](https://kodekloud.com/kk-media/image/upload/v1752883867/notes-assets/images/Rust-Programming-Rust-specific-tools-rust-gdb-rust-lldb/rust-lldb-debugging-tool-diagram.jpg)

Rust LLDB is ready to use out of the box as it comes bundled with the Rust toolchain.

![The image describes "Rust lldb" as a tool that is Rust-friendly and built for Rust developers, highlighting its ease of use and integration with the Rust toolchain.](https://kodekloud.com/kk-media/image/upload/v1752883868/notes-assets/images/Rust-Programming-Rust-specific-tools-rust-gdb-rust-lldb/rust-lldb-tool-rust-developers.jpg)

## Launching Rust LLDB

To start debugging, launch Rust LLDB by executing the following command with the compiled executable from your project's debug directory:

```
rust-lldb target/debug/your_project_name
```

For demonstration, consider a simple Rust program that calculates the factorial of a number.

## Writing and Compiling a Factorial Program

Before debugging, compile your Rust program with debug information. Below is a basic example of a factorial function:

```
fn factorial(n: u32) -> u32 {
    if n <= 1 {
        1
    } else {
        n * factorial(n - 1)
    }
}


fn main() {
    let number: u32 = 5;
    let result: u32 = factorial(number);
    println!("The factorial of {} is {}", number, result);
}
```

Compile the program using Cargo:

```
cargo build --quiet
```

After a successful build, the executable will be located in your project's debug folder.

## Introducing a Bug for Debugging

To demonstrate the debugging process, let's intentionally introduce a subtle bug. Instead of subtracting 1 in the recursive call, we accidentally add 1:

```
fn factorial(n: u32) -> u32 {
    if n <= 1 {
        1
    } else {
        n * factorial(n + 1)  // Bug: should be n - 1
    }
}


fn main() {
    let number: u32 = 5;
    let result: u32 = factorial(number);
    println!("The factorial of {} is {}", number, result);
}
```

Rebuild the project with:

```
cargo build --quiet
```

This error causes the recursion never to satisfy the base case, leading to a stack overflow.

Next, navigate to your project directory (for example, "debug-rust") and launch Rust LLDB with:

```
rust-lldb target/debug/debug_rust
```

Once launched, you'll see the LLDB prompt. Type `help` for a list of available commands.

## Setting Breakpoints and Starting a Debug Session

You can set breakpoints to inspect your code execution. To set a breakpoint at the beginning of the `factorial` function, enter:

```
(lldb) breakpoint set --name factorial
```

Alternatively, set a breakpoint at a specific line (e.g., line 5):

```
(lldb) breakpoint set --line 5
```

A sample output might look like:

```
(lldb) breakpoint set --name factorial
Breakpoint 1: where = debug_rust`debug_rust::factorial::hc2078a81714cb92f + 20 at main.rs:2:8, address = 0x00000001000148c


(lldb) breakpoint set --line 5
Breakpoint 2: where = debug_rust`debug_rust::factorial::hc2078a81714cb92f + 36 at main.rs:5:23, address = 0x00000001000149c
```

Now, start the debugging session by running:

```
(lldb) run
```

When the first breakpoint is hit, you will see output similar to:

```
Process 70628 launched: '/Users/priyadav/projects/debug_rust/target/debug/debug_rust' (arm64)
Process 70628 stopped
* thread #1, name = 'main', queue = 'com.apple.main-thread', stop reason = breakpoint 1.1
frame #0: 0x00000001000148c debug_rust`factorial::hc2078a81714cb92f(n=5) at main.rs:2:8
    1    fn factorial(n: u32) -> u32 {
 -> 2        if n <= 1 {
    3            1
    4        } else {
    5            n * factorial(n + 1)
    6        }
    7    }
Target 2: (debug_rust) stopped.
```

At this point, inspect variables like `n`:

```
(lldb) print n
(unsigned int) 5
```

Stepping through the code reveals that the value of `n` increases rather than decreasing. For example, after stepping into the recursive call, you might see:

```
(lldb) step
Process 70628 stopped
* thread #1, name = 'main', queue = 'com.apple.main-thread', stop reason = breakpoint 2.1
frame #0: 0x00000001000149c debug_rust`debug_rust::factorial::hc2078a81714cb92f(n=6) at main.rs:5:23
```

This confirms that `n` becomes 6 and continues increasing, which prevents the recursion from reaching its base case and ultimately leads to a stack overflow.

> [!important]
> **Warning**
>
> Using an incorrect recursive call (i.e., adding instead of subtracting) will cause an infinite loop, leading to a stack overflow error. Always verify the logic of recursive functions.

## Fixing the Bug

Exit the debugger and correct the error by replacing `n + 1` with `n - 1` in the recursive call. The fixed code is:

```
fn factorial(n: u32) -> u32 {
    if n <= 1 {
        1
    } else {
        n * factorial(n - 1)
    }
}


fn main() {
    let number: u32 = 5;
    let result: u32 = factorial(number);
    println!("The factorial of {} is {}", number, result);
}
```

Compile and run your project:

```
cargo run --quiet
```

The output should now correctly display:

```
The factorial of 5 is 120
```

For comparison, running the buggy version would result in a stack overflow error:

```
fn factorial(n: u32) -> u32 {
    if n <= 1 {
        1
    } else {
        n * factorial(n + 1)
    }
}


fn main() {
    let number: u32 = 5;
    let result: u32 = factorial(number);
    println!("The factorial of {} is {}", number, result);
}
```

```
cargo run --quiet
thread 'main' has overflowed its stack
fatal runtime error: stack overflow
zsh: abort      cargo run --quiet
```

> [!important]
> **Note**
>
> By using Rust LLDB to step through your code and inspect variable values, you can efficiently pinpoint and resolve subtle bugs in your Rust applications.

Happy debugging!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/rust/module/fdebf97c-bade-4db7-bfcf-9881f9ec96fc/lesson/5db13f94-0b56-4bca-8c94-1999c4118a1f)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/rust/module/fdebf97c-bade-4db7-bfcf-9881f9ec96fc/lesson/0de0f591-4119-47f9-a1ac-27449ee43040)**
>
> Practice lab
