# Variables Syntax and Declaration - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Golang/Data-Types-and-Variables/Variables-Syntax-and-Declaration)

---

## Table of Contents

- Variables Syntax and Declaration
  - Declaring a String Variable
  - Declaring an Integer Variable
  - Declaring a Boolean Variable
  - Declaring a Float Variable
  - Running a Simple Example
  - References
  - Watch Video

---

## Content

Golang

Data Types and Variables

# Variables Syntax and Declaration

In the previous lesson, we covered the various data types available in Go. In this lesson, we focus on storing data in variables by exploring variable declaration and syntax.

A variable in Go is a named storage location that holds a value. It serves as a reference to that value, forming the backbone of programming logic. Even if the value stored in a variable changes, its name remains constant.

Since Go is a statically typed language, each variable must have a data type—either explicitly stated by the programmer or inferred at compile time.

![The image is a slide titled "Declaring Variables," explaining that Go is statically typed and variables are assigned types explicitly or implicitly.](https://kodekloud.com/kk-media/image/upload/v1752877724/notes-assets/images/Golang-Variables-Syntax-and-Declaration/frame_50.jpg)

One common method to declare a variable in Go is by using the `var` keyword. The general steps involved in variable declaration include:

1.  Using the `var` keyword.
2.  Specifying the variable name.
3.  Declaring the variable’s data type.
4.  Using the assignment operator (`=`) to assign a value.

Below are examples of variable declarations for different data types.

## Declaring a String Variable

To declare a string variable, use the following syntax:

```
var s string = "Hello world"
```

In this example, the variable `s` is assigned the string value "Hello world".

![The image shows a syntax example for declaring a string variable with the value "Hello world" using the format: `var s string = "Hello world"`.](https://kodekloud.com/kk-media/image/upload/v1752877725/notes-assets/images/Golang-Variables-Syntax-and-Declaration/frame_110.jpg)

## Declaring an Integer Variable

Similarly, you can declare an integer variable as shown below:

```
var i int = 100
```

Here, the variable `i` is of type `int` and stores the value 100.

## Declaring a Boolean Variable

For Boolean values, the `bool` data type is used. Always write Boolean literals in lowercase:

```
var b bool = false
```

This statement initializes a Boolean variable `b` with the value `false`.

## Declaring a Float Variable

Go supports two floating-point types: `float32` and `float64`. The following declaration uses `float64`:

```
var f float64 = 77.90
```

This creates a variable `f` of type `float64` set to the value 77.90.

> [!important]
> **Note**
>
> Variables in Go can also be declared without an initial value. In such cases, Go automatically assigns a zero value based on the type. For example, an uninitialized `int` variable gets a value of `0`.

## Running a Simple Example

Below is a complete program that demonstrates variable declaration and usage within the `main` function. This example uses the `fmt` package to print a variable's value.

```
package main


import "fmt"


func main() {
    var greeting string = "Hello World"
    fmt.Println(greeting)
}
```

To execute the program, run the following command:

```
$ go run main.go
Hello World
```

In this program, the variable `greeting` is assigned the value "Hello World", which is then displayed in the console.

That concludes the discussion on variable syntax and declaration in Go—an essential concept that underpins building robust Go applications. We'll see you in the next lesson.

## References

- [Go Official Documentation](https://golang.org/doc/)
- [Go by Example](https://gobyexample.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/golang/module/eeafa284-50db-4de2-a58a-759d3926fced/lesson/3181d520-6ddf-42a0-be63-924588545efc)**
>
> Watch video content
