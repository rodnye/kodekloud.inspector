# Constants - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Golang/Data-Types-and-Variables/Constants)

---

## Table of Contents

- Constants
  - Untyped Constants
  - Typed Constants
  - Immutability of Constants
  - Declaration Requirements
  - Use Case: Calculating the Area of a Circle
  - Watch Video
  - Practice Lab
    - Duplicate Code Block Explanation

---

## Content

Golang

Data Types and Variables

# Constants

In this article, we explore how constants work in Go. Constants in Go are similar to variables, except that their values, once assigned, cannot be modified. Understanding constants is essential for writing efficient and error-free Go code.

The syntax for declaring a constant begins with the `const` keyword, followed by the constant's name. You can optionally specify a data type (although Go can infer it if omitted) and then assign an initial value using the assignment operator.

There are two main types of constants in Go:

- **Untyped Constants:** These are flexible and do not have a fixed data type unless explicitly defined.
- **Typed Constants:** These require a specific data type, offering stronger type checking.

---

## Untyped Constants

By default, constants in Go are untyped. This flexibility allows you to declare and initialize a constant without specifying its data type:

```
const age = 12
```

Multiple untyped constants can be declared in a similar manner.

---

## Typed Constants

In contrast, typed constants require that you explicitly state the data type. This approach enforces stronger type checking but reduces some flexibility. For instance, creating a constant of the string data type is done as follows:

```
const name string = "Harry Potter"
```

For the remainder of this lesson, most examples utilize untyped constants for simplicity.

---

## Immutability of Constants

Once a constant is declared and initialized, its value cannot be changed. Attempting to alter its value will trigger a compile-time error. Consider the following example, which illustrates an error caused by trying to reassign a constant:

```
package main
import "fmt"

func main() {
    const name = "Harry Potter"
    name = "Hermione Granger"
    fmt.Printf("%v: %T \n", name, name)
}
```

Running this code produces an error:

```
>>> go run main.go
Error: cannot assign to name (declared const)
```

> [!important]
> **Warning**
>
> Once set, constant values in Go are immutable. Modifying a constant will result in a compile-time error.

### Duplicate Code Block Explanation

The same error is demonstrated again in the code below:

```
package main

import "fmt"

func main() {
    const name = "Harry Potter"
    name = "Hermione Granger"
    fmt.Printf("%v: %T \n", name, name)
}
```

This will result in the identical compile-time error:

```
>>> go run main.go
Error: cannot assign to name (declared const)
```

---

## Declaration Requirements

Constants must be initialized at the time of their declaration. Declaring a constant without an initial value will produce an error. For example, consider this snippet:

```
package main

import "fmt"

func main() {
	const name = "Hermione Granger"
	fmt.Printf("%v: %T \n", name, name)
}
```

Running the code produces the following error:

```
>>> go run main.go
missing value in const declaration,
undefined: name
```

In addition, the shorthand variable declaration (`:=`) cannot be used with constants. Attempting to use it will result in a syntax error:

```
package main
import "fmt"

func main() {
    const name := "Hermione Granger"
    fmt.Printf("%v: %T \n", name, name)
}
```

This will produce:

```
>>> go run main.go
Error: syntax error: unexpected :=, expecting =
```

> [!important]
> **Warning**
>
> Remember: Constants in Go must be assigned a value at the time of declaration, and the shorthand `:=` is not permitted.

---

## Use Case: Calculating the Area of a Circle

Constants are especially useful in mathematical computations where certain values remain unchanged. A classic example is using the constant π (pi) to calculate the area of a circle. In the example below, we declare a global `float64` constant for π, compute the area of a circle using a given radius, and print the result:

```
package main
import "fmt"

const PI float64 = 3.14 // global constant

func main() {
    var radius float64 = 5.0
    var area float64
    area = PI * radius * radius
    fmt.Println("Area of Circle is :", area)
}
```

The output when running this code is:

```
>>> go run main.go
Area of Circle is : 78.5
```

---

That concludes our discussion on constants in Go. Understanding the distinction between untyped and typed constants, as well as their immutability and declaration requirements, is fundamental when writing reliable Go programs. For further reading, check out the [Go Documentation](https://golang.org/doc/) and experiment with these concepts in your own projects for hands-on experience.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/golang/module/eeafa284-50db-4de2-a58a-759d3926fced/lesson/c5940572-0cdf-43f2-8592-2f85ab20c918)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/golang/module/eeafa284-50db-4de2-a58a-759d3926fced/lesson/4ab92b66-2c37-4a24-a337-ba3a7f0873b5)**
>
> Practice lab
