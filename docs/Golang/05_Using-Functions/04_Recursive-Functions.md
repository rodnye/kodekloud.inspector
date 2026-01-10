# Recursive Functions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Golang/Using-Functions/Recursive-Functions)

---

## Table of Contents

- Recursive Functions
  - Understanding Recursion with Factorials
  - Recursive Factorial Implementation in Go
  - How the Recursive Function Works
  - Conclusion
  - Watch Video
  - Practice Lab

---

## Content

Golang

Using Functions

# Recursive Functions

In this article, we explore recursive functions—a powerful programming technique where a function calls itself, either directly or indirectly, to solve problems by breaking them down into smaller instances of the same problem. This method is particularly effective when dealing with tasks such as calculating mathematical sequences or traversing data structures.

## Understanding Recursion with Factorials

Recursion can simplify complex problems by defining a base case and a recursive step. One common example is computing the factorial of a number. The factorial of a number n (denoted as n!) is the product of all positive integers less than or equal to n. For example:

- Factorial of 5:  
  5 × 4 × 3 × 2 × 1 = 120
- Factorial of 3:  
  3 × 2 × 1 = 6

> [!important]
> **Note**
>
> In the factorial function, the base case is defined when n equals 0, because 0! is defined as 1.

## Recursive Factorial Implementation in Go

Below is the complete Go code that implements the factorial calculation using recursion. The function named `factorial` takes an integer as input and returns its factorial. The recursion continues until it reaches the base case where n equals 0.

```
package main
import "fmt"


func factorial(n int) int {
    if n == 0 {  // Base case: factorial(0) is defined as 1
        return 1
    }
    return n * factorial(n-1)
}


func main() {
    n := 5
    result := factorial(n)
    fmt.Println("Factorial of", n, "is:", result)
}
```

## How the Recursive Function Works

When the program is executed, the following steps occur:

1.  The `main` function sets the value of n to 5 and calls `factorial(5)`.
2.  Since 5 is not 0, `factorial(5)` returns 5 multiplied by `factorial(4)`.
3.  The function continues to call itself:
    - `factorial(4)` returns 4 multiplied by `factorial(3)`.
    - `factorial(3)` returns 3 multiplied by `factorial(2)`.
    - `factorial(2)` returns 2 multiplied by `factorial(1)`.
    - `factorial(1)` returns 1 multiplied by `factorial(0)`.
4.  Once `factorial(0)` is reached, the base case is met and the function returns 1.
5.  The recursive calls then resolve in reverse order:
    - `factorial(1)` becomes 1 × 1 = 1.
    - `factorial(2)` becomes 2 × 1 = 2.
    - `factorial(3)` becomes 3 × 2 = 6.
    - `factorial(4)` becomes 4 × 6 = 24.
    - `factorial(5)` becomes 5 × 24 = 120.
6.  Finally, the `main` function prints:  
    Factorial of 5 is: 120

> [!important]
> **Recap**
>
> Each recursive call reduces the problem size until the simplest case (n = 0) is reached, after which the results are combined to form the final output.

## Conclusion

Understanding recursion is fundamental for solving problems where a solution depends on solutions to smaller instances of the same problem. The recursive factorial function is a classic example that illustrates the importance of defining both the base case and the recursive step.

Practice creating recursive functions in your preferred programming language to deepen your understanding of this essential concept. Additional resources and tutorials on recursion can further enhance your programming skills.

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/golang/module/71aef76c-bfcd-4e49-926e-fa7fbf73827c/lesson/abc3d0a1-1e99-4875-8a95-545e257de3d5)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/golang/module/71aef76c-bfcd-4e49-926e-fa7fbf73827c/lesson/07a80f80-5803-499a-a74d-d0a8dfab73b3)**
>
> Practice lab
