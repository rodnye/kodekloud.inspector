# Bitwise Operators - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Golang/Operators-and-Control-Flow/Bitwise-Operators)

---

## Table of Contents

- Bitwise Operators
  - Bitwise AND Operator
  - Bitwise OR Operator
  - Bitwise XOR Operator
  - Left Shift Operator
  - Right Shift Operator
  - Summary
  - Watch Video
  - Practice Lab

---

## Content

Golang

Operators and Control Flow

# Bitwise Operators

Bitwise operators enable manipulation of individual bits within numeric values, setting them apart from conventional arithmetic and logical operators. In this guide, we explore the various bitwise operators available in Golang and provide SEO-friendly examples to help you understand their functionality and usage. These operators include:

- Bitwise AND (&)
- Bitwise OR (|)
- Bitwise XOR (^)
- Left shift (<<)
- Right shift (>>)

Let's dive into each operator with detailed explanations and Go code examples.

## Bitwise AND Operator

The bitwise AND operator (`&`) compares the corresponding bits of two numbers. In an AND operation, a bit in the result is set to 1 only if both corresponding bits are 1; otherwise, the bit is set to 0.

For instance, examine the numbers 12 and 25. Their binary representations reveal that only the bits with a value of 1 in both numbers are retained, leading to a decimal result of 8.

![The image explains the bitwise AND operation, showing how it processes binary numbers 12 and 25 to produce the result 8.](https://kodekloud.com/kk-media/image/upload/v1752877739/notes-assets/images/Golang-Bitwise-Operators/frame_70.jpg)

Below is a Go code snippet demonstrating the bitwise AND operation:

```
package main


import "fmt"


func main() {
    var x, y int = 12, 25
    z := x & y
    fmt.Println(z)  // Output: 8
}
```

> [!important]
> **Note**
>
> The bitwise AND operator is especially useful for masking operations, where you want to extract specific bits of a number.

## Bitwise OR Operator

The bitwise OR operator (`|`) compares corresponding bits of two numbers and returns 1 if at least one of the bits is 1; otherwise, it returns 0. Using the same numbers, 12 and 25, the OR operation generates a result of 29.

The binary process for the OR operation is as follows:

```
12 = 00001100 (binary)
25 = 00011001 (binary)


      00001100
  OR  00011001
  =   00011101 (equals 29 in decimal)
```

Here's the Go code that illustrates the bitwise OR operator:

```
package main


import "fmt"


func main() {
    var x, y int = 12, 25
    z := x | y
    fmt.Println(z)  // Output: 29
}
```

## Bitwise XOR Operator

The bitwise XOR operator (`^`) returns 1 for each pair of bits that differ between two numbers and 0 for each pair that is identical. With the numbers 12 and 25, this process yields a result of 21.

The XOR operation in binary is depicted below:

```
12 = 00001100 (binary)
25 = 00011001 (binary)


      00001100
 XOR  00011001
  =   00010101 (equals 21 in decimal)
```

Below is the Go code that demonstrates the bitwise XOR operator:

```
package main


import "fmt"


func main() {
    var x, y int = 12, 25
    z := x ^ y
    fmt.Println(z)  // Output: 21
}
```

## Left Shift Operator

The left shift operator (`<<`) moves all bits of a number to the left by a specified number of positions. When bits are shifted out on the left, they are discarded, and new bits on the right are filled with 0. For example, left-shifting the number 212 by 1 bit transforms its binary representation, effectively multiplying it by 2.

```
212 in binary : 11010100
After shifting: 110101000 (equals 424 in decimal)
```

The Go code below depicts the left shift operation:

```
package main


import "fmt"


func main() {
    var x int = 212
    z := x << 1
    fmt.Println(z)  // Output: 424
}
```

> [!important]
> **Tip**
>
> Left shift operations are useful for quickly multiplying numbers by powers of two.

## Right Shift Operator

The right shift operator (`>>`) moves all bits of a number to the right by a defined number of positions. When bits shift out on the right, they are discarded. Consider right-shifting 212 by 2 bits:

```
212 in binary : 11010100
After shifting: 00110101 (equals 53 in decimal)
```

The following Go code snippet demonstrates the right shift operation:

```
package main


import "fmt"


func main() {
    var x int = 212
    z := x >> 2
    fmt.Println(z)  // Output: 53
}
```

> [!important]
> **Remember**
>
> Right shift operations are often used for efficient division of integers by powers of two.

## Summary

Below is a quick reference table summarizing the bitwise operators covered in this guide:

| Operator    | Symbol | Description                                              | Example Outcome                                  |
| ----------- | ------ | -------------------------------------------------------- | ------------------------------------------------ | ----- | ------- |
| AND         | &      | Returns 1 only if both corresponding bits are 1          | 12 & 25 = 8                                      |
| OR          | \\     |                                                          | Returns 1 if at least one corresponding bit is 1 | 12 \\ | 25 = 29 |
| XOR         | ^      | Returns 1 if corresponding bits are different            | 12 ^ 25 = 21                                     |
| Left Shift  | <<     | Shifts bits to the left, multiplying the original number | 212 << 1 = 424                                   |
| Right Shift | \\>>   | Shifts bits to the right, dividing the original number   | 212 >> 2 = 53                                    |

This comprehensive guide on bitwise operators in Go is designed to help you understand and effectively implement them in your coding projects. Experiment with these operators to deepen your understanding and enhance your programming skills.

For more detailed information on Go programming, check out the [Go Documentation](https://golang.org/doc/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/golang/module/036484d6-1e16-46e2-908d-77e545bde2bf/lesson/fd041fad-e23c-418a-9251-a78316437f74)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/golang/module/036484d6-1e16-46e2-908d-77e545bde2bf/lesson/5d8ca114-b153-4000-9a57-c35e5d27cb07)**
>
> Practice lab
