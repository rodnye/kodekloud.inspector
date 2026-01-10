# Switch Statement - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Golang/Operators-and-Control-Flow/Switch-Statement)

---

## Table of Contents

- Switch Statement
  - Basic Example
  - Default Case Execution
  - Using the fallthrough Keyword
  - Switch Statements Without an Expression
  - Conclusion
  - Watch Video
  - Practice Lab

---

## Content

Golang

Operators and Control Flow

# Switch Statement

In this article, we build on our understanding of if-else statements—which allow us to specify conditions and execute corresponding actions—and explore the switch statement, a similar control mechanism in Go. The switch statement evaluates an expression and directs program flow into one of several branches based on matching cases. Choosing between if-else and switch depends on the specific use case and programmer preference.

Below is the general syntax of a switch statement:

```
switch expression {
case value_1:
    // execute when expression equals value_1
case value_2:
    // execute when expression equals value_2
default:
    // execute when no match is found
}
```

Once a matching case is found, the associated block of statements is executed. Each case in the switch block represents a specific value (or a set of values) against which the switch expression is compared. If no matching case is found, the default block runs.

> [!important]
> **How It Works**
>
> Switch statements provide a clean and efficient way to handle multiple conditions, especially when comparing a single variable to several possible values.

## Basic Example

Consider an example where we initialize an integer variable with the value 100 and use it as the switch expression. The switch statement checks the value, and if it matches a specific case, it prints the corresponding message.

```
package main
import "fmt"


func main() {
    var i int = 100
    switch i {
    case 10:
        fmt.Println("i is 10")
    case 100, 200:
        fmt.Println("i is either 100 or 200")
    default:
        fmt.Println("i is neither 0, 100 or 200")
    }
}
```

Running the program produces the following output:

```
i is either 100 or 200
```

This confirms that when i is 100, the case block for 100 (or 200) is executed.

## Default Case Execution

Now, consider what happens when the value of i is changed to 800. Since neither case for 10 nor for 100/200 matches, the default block executes:

```
package main
import "fmt"


func main() {
    var i int = 800
    switch i {
    case 10:
        fmt.Println("i is 10")
    case 100, 200:
        fmt.Println("i is either 100 or 200")
    default:
        fmt.Println("i is neither 0, 100 or 200")
    }
}
```

The output will be:

```
>>> go run main.go
i is neither 0, 100 or 200
```

## Using the fallthrough Keyword

An interesting feature of Go's switch statement is the use of the fallthrough keyword. This keyword forces the execution to continue into the next case block, regardless of whether that subsequent case matches the switch expression.

Consider the following example where the integer variable is initialized to 10:

```
package main
import "fmt"


func main() {
    var i int = 10
    switch i {
    case -5:
        fmt.Println("-5")
    case 10:
        fmt.Println("10")
        fallthrough
    case 20:
        fmt.Println("20")
        fallthrough
    default:
        fmt.Println("default")
    }
}
```

Here's how the program executes:

1.  Since i is 10, the case for 10 executes, printing "10".
2.  The fallthrough keyword forces execution into the next case (20), printing "20".
3.  Again, due to fallthrough, the default case executes, printing "default".

The final output is:

```
10
20
default
```

> [!important]
> **Caution**
>
> Use the fallthrough keyword carefully as it can lead to unintended execution of additional case blocks. It bypasses typical case matching rules, so ensure it aligns with your program logic.

## Switch Statements Without an Expression

Switch statements in Go can also operate without an expression, allowing conditions to be specified directly within each case. This approach is particularly useful when you need to evaluate multiple conditions:

```
switch {
case condition_1:
    // execute when condition_1 is true
case condition_2:
    // execute when condition_2 is true
default:
    // execute when no condition is true
}
```

For example, consider two variables, a and b. The following switch statement evaluates conditions directly without providing an expression after the switch keyword:

```
package main
import "fmt"


func main() {
    var a, b int = 10, 20
    switch {
    case a+b == 30:
        fmt.Println("equal to 30")
    case a+b <= 30:
        fmt.Println("less than or equal to 30")
    default:
        fmt.Println("greater than 30")
    }
}
```

When a equals 10 and b equals 20, their sum is 30. Although both conditions (equal to 30 and less than or equal to 30) evaluate to true, Go automatically breaks after the first matching case. Therefore, only "equal to 30" is printed.

## Conclusion

Switch statements in Go provide a versatile way to handle multiple conditions more cleanly than traditional if-else chains, with features like multiple values per case and the fallthrough keyword enhancing their flexibility.

That's all for now. Let's get some hands-on labs to further explore switch statements in Go.

For more information on Go and its control structures, refer to the [Go Documentation](https://golang.org/doc/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/golang/module/036484d6-1e16-46e2-908d-77e545bde2bf/lesson/01fef729-499c-4de8-ae38-d4428a2a98bf)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/golang/module/036484d6-1e16-46e2-908d-77e545bde2bf/lesson/00680f3f-7fc8-4fa1-9f31-ce637765ee77)**
>
> Practice lab
