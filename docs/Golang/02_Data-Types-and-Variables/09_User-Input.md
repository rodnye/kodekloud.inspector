# User Input - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Golang/Data-Types-and-Variables/User-Input)

---

## Table of Contents

- User Input
  - Example 1: Reading a Single Input
  - Example 2: Reading Multiple Inputs
  - Example 3: Handling Input Errors
  - Summary
  - Watch Video

---

## Content

Golang

Data Types and Variables

# User Input

In this article, we'll explore how to read input from a user in Go using the fmt package. One common technique is to use the Scanf function, which requires a format string and a sequence of variables (passed with the address operator) where the input will be stored.

The basic syntax is:

```
fmt.Scanf("<format specifier>", object_arguments)
```

For example, if you want to read a string using the "%s" specifier, you would write:

```
fmt.Scanf("%s", object_arguments)
```

The following sections provide examples on how to read various types of data and handle potential input errors.

---

## Example 1: Reading a Single Input

In this example, we declare a variable to store the user's name. The program prompts the user for input and then greets them.

```
package main


import "fmt"


func main() {
    var name string
    fmt.Print("Enter your name: ")
    fmt.Scanf("%s", &name)
    fmt.Println("Hey there,", name)
}
```

When you run the program:

```
>>> go run main.go
Enter your name:
```

After entering a name (for instance, "Priyanka"), the output will be:

```
Hey there, Priyanka
```

---

## Example 2: Reading Multiple Inputs

You can capture multiple inputs in a single Scanf call by using multiple format specifiers and corresponding variables. In this example, the program asks for a user's name and then whether they are a muggle.

```
package main


import "fmt"


func main() {
    var name string
    var isMuggle bool
    fmt.Print("Enter your name & are you a muggle: ")
    fmt.Scanf("%s %t", &name, &isMuggle)
    fmt.Println(name, isMuggle)
}
```

If the user provides the input:

```
>>> go run main.go
Enter your name & are you a muggle: Hermione false
```

The output will be:

```
Hermione false
```

:::note Important Ensure that the order of the format specifiers in the format string exactly matches the order of the variables provided. :::

---

## Example 3: Handling Input Errors

The fmt.Scanf function returns two values: the number of arguments successfully read and an error if one occurred. This is useful when you need to handle input errors. Consider the following example:

```
package main


import "fmt"


func main() {
    var a string
    var b int
    fmt.Print("Enter a string and a number: ")
    count, err := fmt.Scanf("%s %d", &a, &b)
    fmt.Println("count:", count)
    fmt.Println("error:", err)
    fmt.Println("a:", a)
    fmt.Println("b:", b)
}
```

When you run the program:

```
>>> go run main.go
Enter a string and a number:
```

If the user mistakenly enters two strings (for example, "Priyanka yes"), the function will successfully store the first argument but fail to convert the second input to an integer. The output might look like:

```
count: 1
error: expected integer
a: Priyanka
b: 0
```

:::warning Input Mismatch Warning When the input doesn't match the expected format, the function may not store values for some variables. For example, in the above code, the integer `b` remains its default zero value due to the incorrect input type. :::

---

## Summary

This article demonstrated how to handle user input in Go using the fmt.Scanf function. We covered:

| Use Case        | Description                                                         | Example Command                                       |
| --------------- | ------------------------------------------------------------------- | ----------------------------------------------------- |
| Single Input    | Reading a simple string input for a variable                        | `fmt.Scanf("%s", &name)`                              |
| Multiple Inputs | Capturing several inputs with multiple format specifiers            | `fmt.Scanf("%s %t", &name, &isMuggle)`                |
| Error Handling  | Detecting and responding to input errors using Scanf's return value | Checking count and error values after Scanf execution |

In the next article, we will explore more advanced techniques and the role of pointers in reading user input in Go.

For further reading, check out these resources:

- [Go Input and Output](https://golang.org/doc/)
- [Understanding Pointers in Go](https://golang.org/doc/faq#Pointers)

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/golang/module/eeafa284-50db-4de2-a58a-759d3926fced/lesson/79096f63-fdff-4add-8d08-d019e6e9f367)**
>
> Watch video content
