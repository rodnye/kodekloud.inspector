# Looping With For - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Golang/Operators-and-Control-Flow/Looping-With-For)

---

## Table of Contents

- Looping With For
  - Basic Loop Concept
  - For Loop Syntax
  - Example: Printing Squares of Numbers
  - Infinite Loops
  - Controlling Loop Execution: break and continue
  - Additional Resources
  - Watch Video
  - Practice Lab
    - Full For Loop Syntax
    - Simplified Loop with External Initialization
    - Using break
    - Using continue

---

## Content

Golang

Operators and Control Flow

# Looping With For

Loops are control structures that repeatedly execute a block of code until a specified condition is met. In this article, we explore the for loop in Go, demonstrating how it can be used to repeat tasks, manage iterations, and control loop execution using the break and continue statements.

---

## Basic Loop Concept

Imagine you need to print "Hello World!" three times. Writing the print statement three times is inefficient compared to using a loop. A counter variable (commonly named i) can track iterations, and a for loop can repeatedly execute your print statement.

Consider this process:

1.  Initialize i with 1.
2.  Check if i is between 1 and 3 (inclusive).
3.  If the condition is true, print "Hello World!".
4.  Increment i by 1.
5.  Repeat steps 2–4 until the condition fails.

When i becomes 4, the condition no longer holds, and the loop terminates.

Below is a simple pseudocode representation of printing "Hello World!" three times:

```
fmt.Println("Hello World!")
```

After three iterations, the console output will be:

```
Hello World!
Hello World!
Hello World!
```

---

## For Loop Syntax

The general syntax for a for loop in Go is:

```
for initialization; condition; post {
    // statements
}
```

- **Initialization Statement (Optional):** Executed once before the loop starts. It typically declares and assigns a starting value.
- **Condition Statement:** A Boolean expression evaluated before each iteration. If it evaluates to true, the loop body executes; if false, the loop exits.
- **Post Statement (Optional):** Executed at the end of each iteration. This is often used to update the counter variable.

For example, to print "Hello World!" three times using a counter variable:

```
for i := 1; i <= 3; i++ {
    fmt.Println("Hello World")
}
```

---

## Example: Printing Squares of Numbers

Let's create a Go program that prints the square of numbers from 1 to 5. There are two common approaches.

### Full For Loop Syntax

This version uses the complete for loop header:

```
package main
import "fmt"

func main() {
    for i := 1; i <= 5; i++ {
        fmt.Println(i * i)
    }
}
```

Running this program produces the following output:

```
1
4
9
16
25
```

### Simplified Loop with External Initialization

Alternatively, you can initialize the variable outside the loop and include only the condition in the header:

```
package main
import "fmt"

func main() {
    i := 1
    for i <= 5 {
        fmt.Println(i * i)
        i++  // Increment i inside the loop
    }
}
```

Both approaches yield the same result.

---

## Infinite Loops

A for loop in Go becomes an infinite loop if both the initialization and post statements are omitted, and the condition is not specified. Consider this example:

```
package main
import "fmt"

func main() {
    sum := 0
    for {
        sum++ // This will execute indefinitely
    }
    fmt.Println(sum) // This line is never reached
}
```

> [!important]
> **Warning**
>
> Infinite loops can cause your program to run endlessly, which may lead to resource exhaustion. Always ensure there's a proper exit condition.

---

## Controlling Loop Execution: break and continue

In certain situations, you may want to exit the loop prematurely or skip specific iterations. The `break` and `continue` statements are useful tools for such scenarios.

### Using break

The `break` statement immediately terminates the loop when a particular condition is met. In the program below, the loop stops processing when i equals 3:

```
package main
import "fmt"

func main() {
    for i := 1; i <= 5; i++ {
        if i == 3 {
            break
        }
        fmt.Println(i)
    }
}
```

The output will be:

```
1
2
```

### Using continue

If you want to skip the current iteration and proceed with the next one, use the `continue` statement. The example below bypasses printing the value when i equals 3:

```
package main
import "fmt"

func main() {
    for i := 1; i <= 5; i++ {
        if i == 3 {
            continue
        }
        fmt.Println(i)
    }
}
```

This program produces the following output:

```
1
2
4
5
```

> [!important]
> **Note**
>
> The `continue` statement allows your loop to skip over specific iterations without exiting the entire loop, providing greater control over loop execution.

---

That concludes our detailed tutorial on using for loops in Go programming. For more hands-on practice, consider exploring additional lab exercises and examples available in our documentation.

---

## Additional Resources

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/golang/module/036484d6-1e16-46e2-908d-77e545bde2bf/lesson/7d801227-066a-453c-85f6-296c05179f1a)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/golang/module/036484d6-1e16-46e2-908d-77e545bde2bf/lesson/21e59bb1-e21f-4e26-9fae-7b4d5e636ec3)**
>
> Practice lab
