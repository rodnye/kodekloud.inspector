# Select Statement - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Golang/Concurrency/Select-Statement)

---

## Table of Contents

- Select Statement
  - Practical Example: Goroutines and Channels
  - Using a Default Case
  - The Break Keyword in Select
  - Comparing Select and Switch Statements
  - Watch Video

---

## Content

Advanced Golang

Concurrency

# Select Statement

In this lesson, we will explore the Select Statement in Golang—a powerful construct specifically designed for channel operations. Unlike the conventional Switch statement, which evaluates expressions sequentially, the Select Statement enables a Goroutine to wait on multiple communication operations (SEND or RECEIVE) simultaneously.

Two key characteristics of the Select Statement are:

1.  It blocks execution until at least one of the case operations is ready.
2.  If multiple operations are ready, one is selected at random.

The basic syntax of the Select Statement is as follows:

```
select {
    case channelSendOrReceive:
        // Do something
    case channelSendOrReceive:
        // Do something
    // Optional default case:
    default:
        // Execute if no other case is ready
}
```

The Select Statement excels in concurrent programming when dealing with channels and Goroutines, offering a robust way to manage synchronization and concurrency.

![The image is a slide discussing the applications of the "select" statement in programming, highlighting its use in managing synchronization and concurrency with go-routines and channels.](https://kodekloud.com/kk-media/image/upload/v1752868712/notes-assets/images/Advanced-Golang-Select-Statement/select-statement-go-routines-concurrency.jpg)

Imagine a scenario where you need to fetch data from two servers simultaneously. By leveraging a Select Statement, you can initiate both calls concurrently. The first server to respond triggers its corresponding case to execute, making it an invaluable tool for handling asynchronous operations in Golang.

---

## Practical Example: Goroutines and Channels

Let's walk through a practical example. Initially, we create two channels, `ch1` and `ch2`, which are designated to transfer string data. Then, two Goroutines are launched to send values to these channels.

```
package main


func main() {
    ch1 := make(chan string)
    ch2 := make(chan string)


    go goOne(ch1)
    go goTwo(ch2)
}


func goOne(ch1 chan string) {
    // Send a string value to ch1
    ch1 <- "Channel-1"
}


func goTwo(ch2 chan string) {
    // Send a string value to ch2
    ch2 <- "Channel-2"
}
```

Next, we incorporate a Select Statement in the main function to receive values from these channels. Each case waits for data from its respective channel, executing the corresponding code once a value is received:

```
package main


import "fmt"


func main() {
    ch1 := make(chan string)
    ch2 := make(chan string)


    go goOne(ch1)
    go goTwo(ch2)


    select {
    case val1 := <-ch1:
        fmt.Println(val1)
    case val2 := <-ch2:
        fmt.Println(val2)
    }


    // Optional: wait for Goroutines to finish
    // time.Sleep(1 * time.Second)
}


func goOne(ch1 chan string) {
    ch1 <- "Channel-1"
}


func goTwo(ch2 chan string) {
    ch2 <- "Channel-2"
}
```

When you run the program, you might see an output such as:

```
Channel-2
```

> [!important]
> **Non-Deterministic Behavior**
>
> Keep in mind that the output is non-deterministic. If both channels have data ready at the same time, the Select Statement randomly chooses one, emphasizing the importance of designing your concurrent logic with this behavior in mind.

---

## Using a Default Case

The Select Statement can include a default case to make it non-blocking. Without a default case, the select will block until one of the channel operations is ready. With the default case, the program can continue execution without waiting.

For instance, consider this example without a default case:

```
package main


import (
    "fmt"
    "time"
)


func main() {
    ch1 := make(chan string)
    ch2 := make(chan string)


    go goOne(ch1)
    go goTwo(ch2)


    select {
    case val1 := <-ch1:
        fmt.Println(val1)
    case val2 := <-ch2:
        fmt.Println(val2)
    }


    time.Sleep(1 * time.Second)
}


func goOne(ch1 chan string) {
    ch1 <- "Channel-1"
}


func goTwo(ch2 chan string) {
    ch2 <- "Channel-2"
}
```

Adding a default case ensures the select is non-blocking:

```
package main


import (
    "fmt"
    "time"
)


func main() {
    ch1 := make(chan string)
    ch2 := make(chan string)


    go goOne(ch1)
    go goTwo(ch2)


    select {
    case val1 := <-ch1:
        fmt.Println(val1)
    case val2 := <-ch2:
        fmt.Println(val2)
    default:
        fmt.Println("Executed default block")
    }


    time.Sleep(1 * time.Second)
}


func goOne(ch1 chan string) {
    ch1 <- "Channel-1"
}


func goTwo(ch2 chan string) {
    ch2 <- "Channel-2"
}
```

In this scenario, if neither channel has a value when the select is evaluated, the default case executes immediately, allowing the program to proceed without delay.

---

## The Break Keyword in Select

Similar to the Switch statement, the break keyword can be used within a Select case to terminate its execution early. Consider the following example:

```
package main


import (
    "fmt"
    "time"
)


func main() {
    ch1 := make(chan string)
    ch2 := make(chan string)


    go goOne(ch1)
    go goTwo(ch2)


    select {
    case val1 := <-ch1:
        fmt.Println(val1)
        break
        fmt.Println("After break") // This line will never be executed.
    case val2 := <-ch2:
        fmt.Println(val2)
    }


    time.Sleep(1 * time.Second)
}


func goOne(ch1 chan string) {
    ch1 <- "Channel-1"
}


func goTwo(ch2 chan string) {
    ch2 <- "Channel-2"
}
```

In this example, once a value is printed from the selected channel, the break statement terminates that case, and the program immediately moves on to subsequent statements (here, the sleep function).

> [!important]
> **Note on Using Break**
>
> Remember that any code after the break statement within the same case will not be executed.

---

## Comparing Select and Switch Statements

Understanding the differences between Select and Switch statements is crucial when designing concurrent programs in Golang. The table below highlights the main distinctions:

| Statement Type | Blocking Behavior                        | Use Case                                | Characteristics                                               |
| -------------- | ---------------------------------------- | --------------------------------------- | ------------------------------------------------------------- |
| Switch         | Non-blocking                             | Evaluating sequential expressions       | Deterministic; executes the first matching case               |
| Select         | Blocks unless a default case is provided | Handling multiple channel communication | Can block; non-deterministic when multiple channels are ready |

![The image compares "select" and "switch" statements, highlighting differences in blocking behavior and determinism. "Switch" is non-blocking and deterministic, while "select" can block and is non-deterministic.](https://kodekloud.com/kk-media/image/upload/v1752868713/notes-assets/images/Advanced-Golang-Select-Statement/select-vs-switch-statements-comparison.jpg)

In summary, the Select Statement is an essential tool for Golang developers. It enables efficient management of multiple channel operations, ensuring smooth synchronization and concurrency within your applications.

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-golang/module/5a3833bd-1030-4e53-a886-007bd0b9fbf3/lesson/85e4a2e0-62f6-47f9-aa9d-ef03b9cc4304)**
>
> Watch video content
