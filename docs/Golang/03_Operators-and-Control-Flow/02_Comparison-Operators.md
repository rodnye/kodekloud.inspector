# Comparison Operators - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Golang/Operators-and-Control-Flow/Comparison-Operators)

---

## Table of Contents

- Comparison Operators
  - Equal To Operator
  - Not Equal To Operator
  - Less Than Operator
  - Less Than or Equal To Operator
  - Greater Than Operator
  - Greater Than or Equal To Operator
  - Watch Video
  - Practice Lab

---

## Content

Golang

Operators and Control Flow

# Comparison Operators

In this article, we explore the various comparison operators in Golang. These operators compare two operands and return a Boolean value based on the result—either true or false. They are essential in evaluating relationships between numbers, strings, and more, such as checking for equality or determining if one value is greater or smaller than another.

The most commonly used comparison operators in Go include:

- Equal to (==)
- Not equal to (!=)
- Less than (<)
- Less than or equal to (<=)
- Greater than (>)
- Greater than or equal to (>=)

Below is a diagram summarizing these operators:

![The image displays comparison operators: equal (==), not equal (!=), less than (<), less than or equal to (<=), greater than (>), and greater than or equal to (>=).](https://kodekloud.com/kk-media/image/upload/v1752877740/notes-assets/images/Golang-Comparison-Operators/frame_60.jpg)

---

## Equal To Operator

The equal to operator (==) checks whether two values are equal and returns true if they are; otherwise, it returns false.

Consider the following example where we compare two strings:

```
package main
import "fmt"


func main() {
    var city string = "Kolkata"
    var city_2 string = "Calcutta"
    fmt.Println(city == city_2)
}
```

When you run the program:

```
>>> go run main.go
false
```

Since "Kolkata" is not equal to "Calcutta", the output is false.

> [!important]
> **Tip**
>
> Remember that comparison of strings is case-sensitive in Go.

---

## Not Equal To Operator

The not equal to operator (!=) returns true if the two operands are not equal, and false if they are equal. This operator is helpful when you need to ensure values differ.

Here’s an example using two strings:

```
package main
import "fmt"


func main() {
    var city string = "Kolkata"
    var city_2 string = "Calcutta"
    fmt.Println(city != city_2)
}
```

When you run the program, the output is:

```
>>> go run main.go
true
```

Because the two strings differ, the expression evaluates to true.

---

## Less Than Operator

The less than operator (<) determines if the left operand is smaller than the right operand.

Consider the following example with two integers:

```
package main
import "fmt"


func main() {
    var a, b int = 5, 10
    fmt.Println(a < b)
}
```

Since 5 is less than 10, the program outputs:

```
>>> go run main.go
true
```

---

## Less Than or Equal To Operator

The less than or equal to operator (<=) compares two values and returns true if the left operand is either less than or equal to the right operand.

For example:

```
package main
import "fmt"


func main() {
    var a, b int = 10, 10
    fmt.Println(a <= b)
}
```

Here, both integers are equal, so the result is true.

---

## Greater Than Operator

The greater than operator (>) checks if the left operand is greater than the right operand.

In the example below, two integers are compared:

```
package main
import "fmt"


func main() {
    var a, b int = 20, 10
    fmt.Println(a > b)
}
```

As 20 is greater than 10, running the program produces:

```
>>> go run main.go
true
```

---

## Greater Than or Equal To Operator

The greater than or equal to operator (>=) returns true if the left operand is greater than or equal to the right operand.

Consider this example:

```
package main
import "fmt"


func main() {
    var a, b int = 20, 20
    fmt.Println(a >= b)
}
```

Since both numbers are equal, the output is:

```
>>> go run main.go
true
```

---

That's it for this article. Now it's time to practice what you've learned about Go's comparison operators and enhance your coding skills!

> [!important]
> **Additional Resources**
>
> For more information on Go programming and best practices, visit the [Golang Documentation](https://golang.org/doc/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/golang/module/036484d6-1e16-46e2-908d-77e545bde2bf/lesson/ea9cf2b6-be7e-4a39-a712-cba0525c0553)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/golang/module/036484d6-1e16-46e2-908d-77e545bde2bf/lesson/501bf696-1e86-4055-993b-bcf4654f1805)**
>
> Practice lab
