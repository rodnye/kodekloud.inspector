# Return Types Multiple Named Variadic - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Golang/Using-Functions/Return-Types-Multiple-Named-Variadic)

---

## Table of Contents

- Return Types Multiple Named Variadic
  - Returning a Single Value
  - Returning Multiple Values
  - Variadic Functions
  - Using the Blank Identifier
  - Watch Video
  - Practice Lab
    - Named Return Parameters
    - Variadic Functions with Multiple Parameters

---

## Content

Golang

Using Functions

# Return Types Multiple Named Variadic

In this article, we explore various function return types in Go, including single and multiple return values, named return parameters, and variadic functions. Understanding these concepts will help you write more expressive and concise code in Go.

---

## Returning a Single Value

Returning a single value from a function is a common practice in Go. One key aspect is ensuring that the returned value matches the type declared in the function's signature. Consider the following example where the function is declared to return a string, but it mistakenly returns an integer:

```
package main
import "fmt"

func addNumbers(a int, b int) string {
    sum := a + b
    return sum
}

func main() {
    sumOfNumbers := addNumbers(2, 3)
    fmt.Print(sumOfNumbers)
}
```

Running this program produces a type mismatch error because the function is expected to return a string while returning an integer instead. The error message will indicate that the integer variable "sum" cannot be returned as a string.

---

## Returning Multiple Values

Go provides the flexibility to return multiple values from a function. When declaring such a function, you enclose the return types in parentheses. The following example demonstrates a function, `operation`, that accepts two integers and returns both their sum and difference:

```
package main
import "fmt"

func operation(a int, b int) (int, int) {
    sum := a + b
    diff := a - b
    return sum, diff
}

func main() {
    sum, difference := operation(20, 10)
    fmt.Println(sum, difference)
}
```

When executed, this program displays the sum and difference of the two numbers.

### Named Return Parameters

By naming the return parameters in the function signature, Go allows you to simplify the function's return statement. Here's how the `operation` function looks when using named return parameters:

```
package main
import "fmt"

func operation(a int, b int) (sum int, diff int) {
    sum = a + b
    diff = a - b
    return
}

func main() {
    sum, difference := operation(20, 10)
    fmt.Println(sum, " ", difference)
}
```

> [!important]
> **Note**
>
> When you name the return parameters, you can use an empty `return` statement to return the current values of those parameters. This approach can make your code clearer and easier to maintain.

---

## Variadic Functions

Variadic functions accept a variable number of arguments. In Go, you declare a variadic parameter by prefixing its type with an ellipsis (`...`). This feature is useful for functions where the number of inputs may vary.

![The image explains variadic functions, which accept a variable number of arguments, using an ellipsis to declare the final parameter type.](https://kodekloud.com/kk-media/image/upload/v1752877757/notes-assets/images/Golang-Return-Types-Multiple-Named-Variadic/frame_220.jpg)

For example, the syntax for declaring a variadic function that sums integers is as follows:

```
func <func_name>(param1 type, param2 type, param3 ...type) <return_type>

func sumNumbers(numbers ...int) int
```

Inside the function, the variadic parameter `numbers` behaves like a slice containing all the passed integers. The following complete example demonstrates how `sumNumbers` calculates the sum of all provided integers:

```
package main
import "fmt"

func sumNumbers(numbers ...int) int {
    sum := 0
    for _, value := range numbers {
        sum += value
    }
    return sum
}

func main() {
    fmt.Println(sumNumbers())
    fmt.Println(sumNumbers(10))
    fmt.Println(sumNumbers(10, 20))
    fmt.Println(sumNumbers(10, 20, 30, 40, 50))
}
```

The output of the program will be:

- 0 (when no arguments are provided)
- 10 (with a single argument)
- 30 (10 + 20)
- 150 (10 + 20 + 30 + 40 + 50)

---

### Variadic Functions with Multiple Parameters

A variadic function can accept additional parameters, but the variadic parameter must always be the last in the function signature. The example below shows a function that takes a mandatory string parameter followed by a variadic string parameter:

```
package main
import "fmt"

func printDetails(student string, subjects ...string) {
    fmt.Println("hey", student, ", here are your subjects -")
    for _, sub := range subjects {
        fmt.Printf("%s, ", sub)
    }
}

func main() {
    printDetails("Joe", "Physics", "Biology")
}
```

When executed, the output will be:

```
hey Joe , here are your subjects -
Physics, Biology,
```

In this function, the first argument "Joe" is assigned to the `student` parameter, and the remaining arguments are collected in the `subjects` slice.

---

## Using the Blank Identifier

In cases where a function returns multiple values but not all are needed, the blank identifier (`_`) is used to ignore the unneeded values. Consider the following example where the function `f` returns two integers:

```
package main
import "fmt"

func f() (int, int) {
    return 42, 53
}

func main() {
    a, b := f()
    fmt.Println(a, b)
}
```

The program outputs:

```
42 53
```

If you only require the first return value, you can use the blank identifier to discard the second value:

```
package main
import "fmt"

func f() (int, int) {
    return 42, 53
}

func main() {
    v, _ := f()
    fmt.Println(v)
}
```

Executing this version will produce:

```
42
```

The blank identifier `_` effectively acts as a placeholder to ignore any return value you do not need.

---

That concludes our comprehensive overview of return types in Go, including single returns, multiple returns, named return parameters, variadic functions, and the use of the blank identifier. These concepts are key to writing flexible and maintainable Go programs. Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/golang/module/71aef76c-bfcd-4e49-926e-fa7fbf73827c/lesson/d8032228-6f98-40f4-aa35-77d61f60091f)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/golang/module/71aef76c-bfcd-4e49-926e-fa7fbf73827c/lesson/adc59be2-1b29-47df-8b39-37a655bec239)**
>
> Practice lab
