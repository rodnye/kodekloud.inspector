# Panic Situations - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Golang/Concurrency/Panic-Situations)

---

## Table of Contents

- Panic Situations
  - Panic Situation 1: Sending to a Closed Channel
  - Panic Situation 2: Closing an Already Closed Channel
  - Watch Video

---

## Content

Advanced Golang

Concurrency

# Panic Situations

In this lesson, we explore panic situations in Go—comparable to exceptions in other programming languages—that occur at runtime due to unexpected conditions. Specifically, we'll examine panic scenarios involving channels.

Panic in channels can arise in two common cases:

1.  Sending a value to a channel after it has been closed.
2.  Attempting to close a channel that has already been closed.

Below are improved examples and detailed explanations of these scenarios.

---

## Panic Situation 1: Sending to a Closed Channel

In this example, we create a channel, send a couple of values, receive one value, and then close the channel. When a value is sent to the channel after it is closed, a panic occurs.

```
package main


import "fmt"


func main() {
    ch := make(chan int, 10)
    ch <- 10
    ch <- 11
    val, ok := <-ch
    fmt.Println(val, ok)
    close(ch)
    // Sending to a closed channel will trigger a panic.
    ch <- 11
}
```

When you run the program, the output will be:

```
10 true
panic: send on closed channel


goroutine 1 [running]:
main.main()
```

> [!important]
> **Note**
>
> Always ensure that you send all values to a channel **before** closing it. This practice helps you avoid runtime panics related to channel mismanagement.

---

## Panic Situation 2: Closing an Already Closed Channel

In this scenario, we demonstrate the mistake of attempting to close a channel that has already been closed. Once a channel is closed, it should not be closed again, as doing so will also trigger a panic.

```
package main


import "fmt"


func main() {
    ch := make(chan int, 10)
    ch <- 10
    ch <- 11
    val, ok := <-ch
    fmt.Println(val, ok)
    close(ch)
    // Attempting to close the channel a second time will trigger a panic.
    close(ch)
}
```

When running the program, you may see output similar to:

```
10 true
panic: close of closed channel


goroutine 1 [running]:
main.main()
/Users/priyanka/Desktop/kodeK_loud/main.go:12 +0xe5
exit status 2
```

> [!important]
> **Warning**
>
> Do not attempt to close a channel more than once. Ensure your program logic accounts for proper channel state to prevent such panics.

---

These examples highlight common pitfalls when working with channels in Go. Be diligent in sending values only when no further sends are expected after closing a channel, and avoid closing channels multiple times.

That concludes this lesson. We'll see you in the next article.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-golang/module/5a3833bd-1030-4e53-a886-007bd0b9fbf3/lesson/9636c29a-97b1-44d5-b0a0-5587aa806a7e)**
>
> Watch video content
