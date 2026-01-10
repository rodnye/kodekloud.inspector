# Anonymous Functions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Golang/Using-Functions/Anonymous-Functions)

---

## Table of Contents

- Anonymous Functions
  - Example 1: Storing an Anonymous Function in a Variable
  - Example 2: Directly Invoking an Anonymous Function
  - Additional Resources
  - Watch Video
  - Practice Lab

---

## Content

Golang

Using Functions

# Anonymous Functions

Anonymous functions in Go are functions declared without an identifier. Although they behave like regular functions—accepting inputs and returning outputs—they are primarily used for short-lived operations where reusing the functionality later is unnecessary.

> [!important]
> **Note**
>
> Anonymous functions are especially useful in cases where you want to encapsulate functionality without polluting the global namespace or when using function literals in higher-order functions.

## Example 1: Storing an Anonymous Function in a Variable

In this example, we declare an anonymous function inside the `main` function. The function takes two integers as parameters and returns their product. Notice that there is no name for the function since it is anonymous; instead, it is assigned directly to the variable `x`.

```
package main
import "fmt"


func main() {
    x := func(l int, b int) int {
        return l * b
    }
    fmt.Printf("%T\n", x)
    fmt.Println(x(20, 30))
}
```

When you run the program using the command `go run main.go`, you will see the following output:

```
func(int, int) int
600
```

This output confirms that `x` is a function taking two integers and returning an integer. The call `x(20, 30)` computes the product, resulting in 600.

## Example 2: Directly Invoking an Anonymous Function

Here, the anonymous function is defined and invoked immediately without being stored in a variable. The function is executed with the provided arguments (20 and 30), and its result is directly assigned to `x`. Since the function returns an integer value (600), the type of `x` is `int`.

```
package main
import "fmt"


func main() {
    x := func(l int, b int) int {
        return l * b
    }(20, 30)
    fmt.Printf("%T\n", x)
    fmt.Println(x)
}
```

Upon running this program, the output will be:

```
int
600
```

In this scenario, `x` directly holds the result of the function call, emphasizing how you can use anonymous functions for immediate operations.

## Additional Resources

For more information on Go and its features, be sure to check out these useful links:

- [Go Programming Language](https://golang.org/)
- [Effective Go](https://golang.org/doc/effective_go.html)
- [The Go Blog](https://blog.golang.org/)

That's it for this overview of anonymous functions in Go. To reinforce your understanding, consider practicing with hands-on exercises and exploring how anonymous functions can simplify code when used appropriately.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/golang/module/71aef76c-bfcd-4e49-926e-fa7fbf73827c/lesson/744c3799-efce-47d0-a875-c71ff2664795)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/golang/module/71aef76c-bfcd-4e49-926e-fa7fbf73827c/lesson/8633d5eb-7e45-4e6d-b610-10798d128c63)**
>
> Practice lab
