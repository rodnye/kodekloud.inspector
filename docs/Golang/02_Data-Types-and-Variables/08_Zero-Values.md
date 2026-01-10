# Zero Values - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Golang/Data-Types-and-Variables/Zero-Values)

---

## Table of Contents

- Zero Values
  - Integer Example
  - Floating-Point Example
  - Watch Video
  - Practice Lab

---

## Content

Golang

Data Types and Variables

# Zero Values

In Golang, every variable declared without an explicit initialization automatically receives a default value known as its zero value. These zero values differ based on the variable's data type. Understanding how zero values work is essential for building robust Go applications and can help prevent common programming errors.

When a variable is declared without an initialization value, Go assigns the following defaults:

- For a boolean (`bool`), the zero value is `false`.
- For an integer (`int`), the zero value is `0`.
- For a floating-point number (e.g., `float64`), the zero value is `0.00`.
- For a string (`string`), the zero value is an empty string (`""`).

For more complex types—such as pointers, functions, slices, maps, channels, and interfaces—the zero value is `nil`. These topics will be discussed in more detail in later sections.

> [!important]
> **Note**
>
> Zero values are not only default assignments; they also help in determining whether a variable has been explicitly initialized. This behavior is especially useful when using conditional checks or when passing variables to functions.

## Integer Example

Consider the declaration of an integer variable without initialization. The following code snippet demonstrates this concept:

```
package main


import "fmt"


func main() {
    var i int
    fmt.Printf("%d", i)
}
```

When you run this code:

```
>>> go run main.go
```

The output will be:

```
0
```

This output occurs because `0` is the default zero value for an integer variable.

## Floating-Point Example

Similarly, here is an example of a floating-point variable (`float64`) that hasn't been explicitly initialized:

```
package main


import "fmt"


func main() {
    var fl float64
    fmt.Printf("%.2f", fl)
}
```

When you execute the code:

```
>>> go run main.go
```

The resulting output is:

```
0.00
```

This output confirms that the default zero value for a `float64` variable is `0.00`.

![The image shows a table of zero values for different data types, including int, float64, string, bool, and pointers, with their default values.](https://kodekloud.com/kk-media/image/upload/v1752877730/notes-assets/images/Golang-Zero-Values/frame_110.jpg)

By understanding zero values, you can write more reliable and predictable Go applications. Experiment with these examples and observe how Golang automatically assigns default values to declared variables. For more detailed insights into Go's default behavior and variable initialization, consider exploring [Go's Official Documentation](https://golang.org/doc/).

That's all for now. Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/golang/module/eeafa284-50db-4de2-a58a-759d3926fced/lesson/d9a9a14e-2042-462e-a210-7bf6e91eb252)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/golang/module/eeafa284-50db-4de2-a58a-759d3926fced/lesson/a1aa1d7e-d722-4111-8948-8903c5bc7eee)**
>
> Practice lab
