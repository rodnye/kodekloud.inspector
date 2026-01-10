# Channels Reading and Writing - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Golang/Concurrency/Channels-Reading-and-Writing)

---

## Table of Contents

- Channels Reading and Writing
  - Declaring and Creating a Channel
  - Sending Data Through a Channel
  - Receiving Data from the Channel
  - Blocking Behavior and Order of Execution
  - Behavior of Unbuffered Channels
  - Summary
  - Watch Video

---

## Content

Advanced Golang

Concurrency

# Channels Reading and Writing

In this article, you'll learn how to use channels in Go to enable communication between goroutines. We will explore how to create channels, send data to them, receive data from them, and understand their blocking behavior. This guide is ideal for developers looking to build concurrent programs using Go.

## Declaring and Creating a Channel

To begin, declare a channel using Go’s built-in `make` function. In the example below, we create a channel that only transmits string data, ensuring that only string values can be communicated.

```
package main


func main() {
    ch := make(chan string)
}


// sends data to the channel
func sell() {
}


// receives data from the channel
func buy() {
}
```

## Sending Data Through a Channel

Next, update the `sell` function to send a string value (e.g., "Furniture") via the channel. Instead of using the channel `ch` directly within the function (which causes unresolved reference errors), pass the channel as a parameter.

```
package main


func main() {
    ch := make(chan string)
}


// sends data to the channel
func sell(ch chan string) {
    ch <- "Furniture"
}


// receives data from the channel
func buy() {
}
```

> [!important]
> **Note**
>
> A channel in Go is passed by reference, similar to slices or maps. Therefore, you do not need to use the ampersand (`&`) or asterisk (`*`) operators.

## Receiving Data from the Channel

Now, enhance the `buy` function to receive a string from the channel and print it. In the updated code below, the `sell` function also logs a message indicating that data was sent to the channel.

```
package main


import "fmt"


func main() {
    ch := make(chan string)

    // sends data to the channel as a goroutine
    go sell(ch)

    // receives data from the channel
    fmt.Println(<-ch)
}


func sell(ch chan string) {
    ch <- "Furniture"
    fmt.Println("Sent data to the channel")
}


func buy() {
}
```

## Blocking Behavior and Order of Execution

The `buy` function demonstrates how to wait for data by using a blocking receive operation. Here, a message "Waiting for data" is printed before retrieving the value from the channel and displaying it.

```
package main


import "fmt"


func main() {
    ch := make(chan string)


    // sends data to the channel as a goroutine
    go sell(ch)

    // receives data from the channel
    buy(ch)
}


// sends data to the channel
func sell(ch chan string) {
    ch <- "Furniture"
    fmt.Println("Sent data to the channel")
}


// receives data from the channel
func buy(ch chan string) {
    fmt.Println("Waiting for data")
    val := <-ch
    fmt.Println("Received data -", val)
}
```

In this scenario, the `sell` function sends "Furniture" to the channel and logs a confirmation message, while the `buy` function waits, retrieves the data, and prints the received value. To prevent the program's main function from exiting before the goroutines complete, consider implementing a timer or using a WaitGroup, depending on your application's needs.

Below is an example of the program's output:

```
go run main.go
Waiting for data
Received data - Furniture
Sent data to the channel
```

## Behavior of Unbuffered Channels

Understanding the nature of unbuffered channels is crucial when designing concurrent applications in Go. Here are a few key points:

- A value sent to a channel can be received only once.
- By default, channels are unbuffered. This means that a send operation blocks the sending goroutine until another goroutine performs a receive.
- Similarly, a receive operation blocks until data is available, ensuring synchronization between goroutines.

The example below illustrates that the send operation in `sell` is blocked at the line `ch <- "Furniture"` until another goroutine calls the receive operation on the same channel:

```
package main


func sell(ch chan string) {
    ch <- "Furniture"
    fmt.Println("Sent data to the channel")
}


func buy(ch chan string) {
    fmt.Println("Waiting for data")
    val := <-ch
    fmt.Println("Received data -", val)
}
```

When executed, you may observe output similar to:

```
go run main.go
Waiting for data
Received data - Furniture
Sent data to the channel
```

> [!important]
> **Warning**
>
> Remember that because goroutines run concurrently, the ordering of the printed messages after unblocking may vary with each execution.

## Summary

This article demonstrated how to create unbuffered channels in Go to exchange data between goroutines effectively. The key points covered include:

- Channels are created with the `make` function and are type-restricted.
- Channels are passed by reference, eliminating the need for explicit pointers.
- Unbuffered channels block the sending goroutine until the data is received, ensuring synchronization.
- The order of execution between concurrent goroutines is non-deterministic once unblocked.

By mastering these concepts, you'll be better equipped to build robust, concurrent applications in Go. For further reading on Go concurrency, check out [Go Concurrency Patterns](https://blog.golang.org/pipelines) and stay tuned for more advanced topics on Go programming.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-golang/module/5a3833bd-1030-4e53-a886-007bd0b9fbf3/lesson/9d42c47c-1df7-4011-9a3e-8010117c4af8)**
>
> Watch video content
