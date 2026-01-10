# Assignment Operators - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Golang/Operators-and-Control-Flow/Assignment-Operators)

---

## Table of Contents

- Assignment Operators
  - Simple Assignment Operator
  - Addition Assignment Operator
  - Subtraction Assignment Operator
  - Multiplication Assignment Operator
  - Division Assignment Operator
  - Modulus Assignment Operator
  - Watch Video
  - Practice Lab

---

## Content

Golang

Operators and Control Flow

# Assignment Operators

This article provides a comprehensive overview of assignment operators in Golang. Golang's assignment operators not only allow you to assign values but also enable shorthand arithmetic operations. In this guide, you'll find detailed explanations and examples for each operator, including:

- Simple assignment (=)
- Addition assignment (+=)
- Subtraction assignment (-=)
- Multiplication assignment (\*=)
- Division assignment (/=)
- Modulus assignment (%=)

Understanding these operators can help you write more concise and efficient Go code.

---

## Simple Assignment Operator

The simple assignment operator (=) assigns the value from the right-hand side to the variable on the left-hand side. For example, writing x = y assigns the current value of y to x.

Example:

```
package main


import "fmt"


func main() {
    var x int = 10
    var y int
    y = x
    fmt.Println(y)
}
```

In this example, the variable x is initialized to 10, and y is subsequently assigned the value of x. The output will be:

10

---

## Addition Assignment Operator

The addition assignment operator (+=) adds the right-hand operand to the left-hand operand and updates the left-hand operand with the new value. In other words, x += y is equivalent to x = x + y.

Example:

```
package main


import "fmt"


func main() {
    var x, y int = 10, 20
    x += y
    fmt.Println(x)
}


// Expected output: 30
```

Here, starting with x equal to 10, adding y (which is 20) results in x becoming 30.

---

## Subtraction Assignment Operator

The subtraction assignment operator (-=) subtracts the right-hand operand from the left-hand operand and stores the result back in the left-hand operand. That is, x -= y is the same as x = x - y.

Example:

```
package main


import "fmt"


func main() {
    var x, y int = 10, 20
    x -= y
    fmt.Println(x)
}
```

In this example, subtracting 20 from 10 results in -10.

---

## Multiplication Assignment Operator

The multiplication assignment operator (\*=) multiplies the left-hand operand by the right-hand operand and assigns the product to the left-hand operand. This operation is equivalent to x = x \* y.

Example:

```
package main


import "fmt"


func main() {
    var x, y int = 10, 20
    x *= y
    fmt.Println(x)
}
```

Multiplying 10 by 20 results in 200.

---

## Division Assignment Operator

The division assignment operator (/=) divides the left-hand operand by the right-hand operand and updates the left-hand operand with the quotient. Essentially, x /= y means x = x / y.

Example:

```
package main


import "fmt"


func main() {
    var x, y int = 200, 20
    x /= y
    fmt.Println(x)
}
```

Here, 200 divided by 20 produces 10.

---

## Modulus Assignment Operator

The modulus assignment operator (%=) divides the left-hand operand by the right-hand operand and assigns the remainder back to the left-hand operand. In other words, x %= y divides x by y and stores the remainder in x.

Example:

```
package main


import "fmt"


func main() {
    var x, y int = 210, 20
    x %= y
    fmt.Println(x)
}
```

Dividing 210 by 20 leaves a remainder of 10.

---

> [!important]
> **Note**
>
> Practice these assignment operators with your own examples to deepen your understanding of Golang's efficient coding practices.

By incorporating these assignment operators into your Golang projects, you can write cleaner code and simplify arithmetic expressions. Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/golang/module/036484d6-1e16-46e2-908d-77e545bde2bf/lesson/2e1c154f-9dad-40ea-8adc-70eb1b3afd52)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/golang/module/036484d6-1e16-46e2-908d-77e545bde2bf/lesson/7be5c940-bd13-4689-9866-8ecc919d30b2)**
>
> Practice lab
