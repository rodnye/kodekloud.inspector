# Declaring Variables - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Golang/Data-Types-and-Variables/Declaring-Variables)

---

## Table of Contents

- Declaring Variables
  - Standard Variable Declaration and Assignment
  - Type Safety
  - Shorthand Variable Declaration
  - Reassigning Variables
  - Watch Video
    - Declaring Multiple Variables of the Same Type
    - Declaring Variables with Different Types
    - Short Variable Declaration Using := Operator

---

## Content

Golang

Data Types and Variables

# Declaring Variables

In this article, we explore the various methods to declare variables in Go. Understanding how to declare and assign variables is fundamental to writing clear, effective, and type-safe Go programs.

---

## Standard Variable Declaration and Assignment

Variables can be declared first and assigned values later. In the example below, we declare a variable and then assign it a value:

```
package main


import "fmt"


func main() {
    var user string
    user = "Harry"
    fmt.Println(user)
}
```

Running the program produces:

```
Harry
```

In Go, the data type of a variable determines the kind of values it can hold. For example, a variable declared as type string cannot be assigned an integer value. The compiler will generate an error if such an assignment is attempted.

---

## Type Safety

Go’s strong typing system prevents assigning values of an incorrect data type. Consider the example below:

```
package main


import "fmt"


func main() {
    var s string
    s = 123
    fmt.Println(s)
}
```

Attempting to run this code will generate an error:

```
Error: cannot use 123 (type untyped int) as type string in assignment
```

> [!important]
> **Type Safety Reminder**
>
> Always ensure that the value you assign matches the declared variable type. This prevents compile-time errors and maintains the integrity of your code.

---

## Shorthand Variable Declaration

Go offers a shorthand declaration method that combines declaration and assignment into one concise statement. The compiler automatically infers the variable's type based on the assigned value.

### Declaring Multiple Variables of the Same Type

You can declare and assign multiple variables of the same type in a single line. For example:

```
package main


import "fmt"


func main() {
    var s, t string = "foo", "bar"
    fmt.Println(s)
    fmt.Println(t)
}
```

The output will be:

```
foo
bar
```

### Declaring Variables with Different Types

When working with variables of different types, you can use a multi-line declaration format enclosed in parentheses, as shown below:

```
package main


import "fmt"


func main() {
    var (
        s string = "foo"
        i int    = 5
    )
    fmt.Println(s)
    fmt.Println(i)
}
```

Running this program will display the values `"foo"` and `5`.

### Short Variable Declaration Using := Operator

The shorthand declaration using the `:=` operator is a quick and efficient way to declare and initialize a variable. For example:

```
package main


import "fmt"


func main() {
    s := "Hello World"
    fmt.Println(s)
}
```

In this case, the variable `s` is automatically inferred as a string because of the assigned literal `"Hello World"`.

---

## Reassigning Variables

Variables declared with shorthand notation can be reassigned new values of the same type. Take the following example:

```
package main


import "fmt"


func main() {
    name := "Lisa"
    name = "Peter"
    fmt.Println(name)
}
```

The output will be:

```
Peter
```

Since `name` was inferred as a string during its initial declaration, it can only be reassigned a string value. Attempting to assign a different type will result in a compile-time error:

```
package main


import "fmt"


func main() {
    name := "Lisa"
    name = 12
    fmt.Println(name)
}
```

This code produces the following error:

```
Error: cannot use 12 (type untyped int) as type string in assignment
```

> [!important]
> **Important Reminder**
>
> Reassign variables only with values of the same type. Mixing data types will lead to compile-time errors due to Go's strict type safety.

---

That concludes our lesson on declaring variables in Go. We hope you now have a clearer understanding of variable declaration, assignment, and the importance of type safety in Go programming.

For more information on Go and programming best practices, consider exploring [Go by Example](https://gobyexample.com/) and the [official Go documentation](https://golang.org/doc/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/golang/module/eeafa284-50db-4de2-a58a-759d3926fced/lesson/508427a3-82a4-49c7-8d86-38c27445dc70)**
>
> Watch video content
