# Channels Closing a channel - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Golang/Concurrency/Channels-Closing-a-channel)

---

## Table of Contents

- Channels Closing a channel
  - Complete Example Program
  - Watch Video
    - Running the Program
    - Explanation of the Output

---

## Content

Advanced Golang

Concurrency

# Channels Closing a channel

In this lesson, you'll learn how to properly close a channel in Go and understand the behavior of channels upon closure. Closing a channel signals that no further data will be sent, which is particularly useful when you've transmitted all necessary data.

When receiving a value from a channel, you can check if the channel is closed by capturing a second boolean return value in the receive expression. For example:

```
v, ok := <-ch
```

Here, the variable "ok" will be true if the channel is open (and there is a value to receive) and false if the channel is closed (and no more data is available).

> [!important]
> **Note**
>
> In Go, closing a channel does not clear its buffered values; any remaining buffered data can still be received after closing.

## Complete Example Program

Consider the following complete Go program, which demonstrates creating a buffered channel for integers, sending two values (10 and 11) into it, closing the channel, and then receiving the values:

```
package main


import (
	"fmt"
)


func main() {
	// Create a buffered channel with a capacity of 10.
	ch := make(chan int, 10)
	ch <- 10
	ch <- 11

	// Receive the first value from the channel.
	val, ok := <-ch
	fmt.Println(val, ok)  // Expected output: 10 true

	// Close the channel.
	close(ch)

	// Receive the second value after closing the channel.
	val, ok = <-ch
	fmt.Println(val, ok)  // Expected output: 11 true

	// Try to receive from the channel again.
	// Since the channel is closed and empty, we receive the zero value (0) and false.
	val, ok = <-ch
	fmt.Println(val, ok)  // Expected output: 0 false
}
```

### Running the Program

You can run the above program using the following command:

```
go run main.go
```

The output will be:

```
10 true
11 true
0 false
```

### Explanation of the Output

- **10 true:** The first output indicates that the value 10 was received from the open channel.
- **11 true:** After the channel is closed, the remaining buffered value 11 is still available, resulting in a true status.
- **0 false:** A final receive operation on a closed and empty channel returns the zero value for the type (here, 0 for int) along with false, indicating that no further values can be received.

> [!important]
> **Warning**
>
> Attempting to send data to a closed channel will cause a runtime panic. Always ensure you close a channel only when you're certain no further data will be transmitted.

This lesson has provided an in-depth look at channel closure in Go, demonstrating how to use the close function and handle data reception correctly with the accompanying boolean flag. For more insights into Go concurrency, refer to the [Go Documentation](https://golang.org/doc/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-golang/module/5a3833bd-1030-4e53-a886-007bd0b9fbf3/lesson/01ae12d8-adff-4078-811b-7214d6f00a74)**
>
> Watch video content
