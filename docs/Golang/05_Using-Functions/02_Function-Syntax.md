# Function Syntax - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Golang/Using-Functions/Function-Syntax)

---

## Table of Contents

- Function Syntax
  - Example: Adding Two Numbers
  - Naming Conventions
  - Parameters vs. Arguments
  - Input Parameters and Return Values
  - Watch Video
  - Practice Lab

---

## Content

Golang

Using Functions

# Function Syntax

In this lesson, you'll learn how to create functions in Go and understand how they communicate input and output details to both the compiler and the developer.

A function in Go is declared using the keyword `func`, followed by the function name and a pair of parentheses. Within the parentheses, you define the input parameters. After the parameters, you specify the return type, if any. The function body is enclosed within curly braces. The general function definition appears as follows:

```
func <function_name>(<params>) <return type> {
    // body of the function
}
```

The combination of the function name, parameters, and return type is called the function signature, while the code inside the curly braces is the function body where the implementation resides.

> [!important]
> **Key Concept**
>
> Understanding the function signature helps you quickly know how to call the function and what value to expect in return.

## Example: Adding Two Numbers

Consider a simple function `addNumbers` that accepts two integers and returns their sum. Below is how you can implement it in Go:

```
func addNumbers(a int, b int) int {
    sum := a + b
    return sum
}
```

In this example:

- The signature is `func addNumbers(a int, b int) int`.
- The function computes the sum inside its body and uses the `return` statement to pass that value back to the caller.

To call or invoke the function, simply write the function name followed by the required arguments in parentheses:

```
addNumbers(2, 3)
```

If you need the returned value for further use, store the result in a variable:

```
sumOfNumbers := addNumbers(2, 3)
```

## Naming Conventions

In Go, function names must adhere to specific naming rules:

- They must begin with a letter or an underscore.
- They can include additional letters, digits, and underscores.
- They are case sensitive.
- They cannot contain spaces.

The following image illustrates these naming conventions:

![The image outlines naming conventions for functions: start with a letter, allow additional letters/symbols, no spaces, and are case-sensitive. Example: "add_2".](https://kodekloud.com/kk-media/image/upload/v1752877750/notes-assets/images/Golang-Function-Syntax/frame_280.jpg)

## Parameters vs. Arguments

It's important to distinguish between parameters and arguments:

- Parameters are the variable names defined in the function signature.
- Arguments are the actual values passed to the function when it is called.

Below is an example that demonstrates this difference:

```
func addNumbers(a int, b int) int {
    sum := a + b
    return sum
}


func main() {
    sumOfNumbers := addNumbers(2, 3)
    fmt.Println(sumOfNumbers)
}
```

In this snippet:

- `a` and `b` are parameters.
- `2` and `3` are the arguments provided when invoking `addNumbers`.

## Input Parameters and Return Values

Go functions handle two types of parameters:

1.  **Input Parameters:** These values are passed into the function either by value or by address.
2.  **Return Parameters:** These define the outputs returned by the function.

Consider the following example which prints a greeting message. The `printGreeting` function takes a single string argument and prints a customized greeting:

```
package main
import "fmt"


func printGreeting(name string) {
    fmt.Println("Hey there,", name)
}


func main() {
    printGreeting("Joe")
}
```

When `printGreeting("Joe")` is called, the argument `"Joe"` is passed to the function, and the message "Hey there, Joe" is printed to the console.

> [!important]
> **Practice Tip**
>
> Practice by writing your own functions to reinforce your understanding of input, parameters, and return values.

That concludes this lesson. By mastering these fundamental concepts, you can build more sophisticated programs and deepen your understanding of Go's function mechanics.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/golang/module/71aef76c-bfcd-4e49-926e-fa7fbf73827c/lesson/621e7877-bf16-4819-bfab-07ac7eab8c2b)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/golang/module/71aef76c-bfcd-4e49-926e-fa7fbf73827c/lesson/d678efe3-59c5-4123-b070-f8552e080c3c)**
>
> Practice lab
