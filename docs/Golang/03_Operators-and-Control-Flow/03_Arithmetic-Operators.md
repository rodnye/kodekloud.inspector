# Arithmetic Operators - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Golang/Operators-and-Control-Flow/Arithmetic-Operators)

---

## Table of Contents

- Arithmetic Operators
  - Addition Operator
  - Subtraction Operator
  - Multiplication Operator
  - Division Operator
  - Modulus Operator
  - Increment Operator
  - Decrement Operator
  - Watch Video
  - Practice Lab

---

## Content

Golang

Operators and Control Flow

# Arithmetic Operators

In this lesson, you'll learn how arithmetic operators work in Golang. These operators are essential for building advanced conditional logic when combined with comparison operators. They help you perform common mathematical operations such as addition, subtraction, multiplication, division, modulus (remainder), as well as increment and decrement operations.

![The image displays six arithmetic operators: addition, subtraction, multiplication, division, modulus, increment, and decrement, each with their respective symbols.](https://kodekloud.com/kk-media/image/upload/v1752877738/notes-assets/images/Golang-Arithmetic-Operators/frame_70.jpg)

Below, you will find detailed explanations and examples for each arithmetic operator.

---

## Addition Operator

The addition operator (+) is used to add the left and right operands. Although most commonly applied to numeric values, it also supports string concatenation. Consider the following example:

```
package main
import "fmt"

func main() {
    var a, b string = "foo", "bar"
    fmt.Println(a + b)
}
```

When executed, the program produces:

```
>>> go run main.go
foobar
```

> [!important]
> **Note**
>
> Using the addition operator for strings concatenates them, making it a versatile tool in Golang.

---

## Subtraction Operator

The subtraction operator (-) subtracts the right operand from the left operand. This operator works with numeric types but cannot be applied to strings. Attempting string subtraction results in a compilation error:

```
package main
import "fmt"

func main() {
    var a, b string = "foo", "bar"
    fmt.Println(a - b)
}
```

The error message is as follows:

```
>>> go run main.go
invalid operation: a - b (operator - not defined on string)
```

Below is a correct usage example with numeric values:

```
package main
import "fmt"

func main() {
    var a, b float64 = 79.02, 75.66
    fmt.Printf("%.2f", a - b)
}
```

Executing this snippet returns:

```
>>> go run main.go
3.36
```

---

## Multiplication Operator

The multiplication operator (\*) multiplies two operands. Here's an example demonstrating the multiplication of two integers:

```
package main
import "fmt"

func main() {
    var a, b int = 12, 2
    fmt.Println(a * b)
}
```

When run, the output is:

```
>>> go run main.go
24
```

---

## Division Operator

Using the division operator (/) in Golang returns the quotient of the left operand divided by the right operand. For instance:

```
package main
import "fmt"

func main() {
    var a, b int = 24, 2
    fmt.Println(a / b)
}
```

This code outputs:

```
>>> go run main.go
12
```

> [!important]
> **Note**
>
> Ensure that when using the division operator with integers, Golang performs integer division, which may truncate any fractional part.

---

## Modulus Operator

The modulus operator (%) returns the remainder from dividing the left operand by the right operand. Check out the example below:

```
package main
import "fmt"

func main() {
    var a, b int = 24, 7
    fmt.Println(a % b)
}
```

The result of this operation is:

```
>>> go run main.go
3
```

---

## Increment Operator

Golang's increment operator (++) is a unary operator that increases the value of its operand by one. It must always be used as a post-fix operator. Below is a sample code:

```
package main
import "fmt"

func main() {
    var i int = 1
    i++
    fmt.Println(i)
}
```

Running this snippet produces:

```
>>> go run main.go
2
```

---

## Decrement Operator

Similarly, the decrement operator (--) is a unary operator that decreases the value of its operand by one and is also used as a post-fix. For example:

```
package main
import "fmt"

func main() {
    var i int = 1
    i--
    fmt.Println(i)
}
```

When executed, the output is:

```
>>> go run main.go
0
```

---

That's all for this lesson. Practice using these arithmetic operators in your Golang projects to enhance your programming skills and understanding of the language.

For further reading, consider exploring more about Golang operators in the [Golang documentation](https://golang.org/doc/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/golang/module/036484d6-1e16-46e2-908d-77e545bde2bf/lesson/dbef6919-87e6-4911-a745-3a76165893f4)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/golang/module/036484d6-1e16-46e2-908d-77e545bde2bf/lesson/73d86f8d-5756-41c0-a076-e4f9e175a1c8)**
>
> Practice lab
