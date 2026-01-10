# Buffered Channels - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Golang/Concurrency/Buffered-Channels)

---

## Table of Contents

- Buffered Channels
  - Creating a Buffered Channel
  - A Buffered Channel Example with Goroutines
  - Exceeding the Buffer Limit
  - Blocking Behavior on Empty Channels
  - Summary
  - Watch Video
    - The sell Function
    - The buy Function

---

## Content

Advanced Golang

Concurrency

# Buffered Channels

In this lesson, we explore buffered channels in Go—an essential concept for managing concurrent data flow. Unlike unbuffered channels, which require a receiver to be ready as soon as a value is sent, buffered channels come equipped with a finite capacity to hold data. This capability allows a sender to transmit multiple values without waiting for an immediate receiver, as long as the buffer is not full.

A channel that demands a receiver as soon as a message is emitted is known as an unbuffered channel. Since no capacity is declared for an unbuffered channel, it cannot store any data.

Conversely, a buffered channel has a predetermined capacity. The send operation will block the sending Goroutine only if the buffer is full. For instance, if the buffer can hold 8 values, the sending operation proceeds smoothly until a ninth value is sent. Similarly, receiving from a channel will block only when the buffer is empty.

![The image is a slide titled "Unbuffered Channels," explaining that such channels require a receiver as soon as a message is emitted and cannot store data.](https://kodekloud.com/kk-media/image/upload/v1752868698/notes-assets/images/Advanced-Golang-Buffered-Channels/unbuffered-channels-receiver-message.jpg)

![The image is a slide discussing "Buffered Channels," explaining that they have capacity to hold data, and detailing when sending and receiving operations block in a go-routine.](https://kodekloud.com/kk-media/image/upload/v1752868699/notes-assets/images/Advanced-Golang-Buffered-Channels/buffered-channels-go-routine-slide.jpg)

## Creating a Buffered Channel

Creating channels in Go involves using the `make` function. When you specify a buffer capacity, the channel becomes buffered. For instance, to create a buffered channel that carries integers with a capacity of 10, use the following syntax:

```
c := make(chan int, 10)
```

You can check how many elements are currently stored in the channel's buffer using the built-in `len` function. Note that the length (the number of elements queued) will always be less than or equal to the channel's capacity. For an unbuffered channel, the length remains constantly at 0.

## A Buffered Channel Example with Goroutines

The following example demonstrates the behavior of buffered channels. Here, we create a buffered channel with a capacity of 3 and use a WaitGroup to synchronize our Goroutines. The code illustrates that a send operation only blocks when the buffer has reached its maximum capacity.

```
package main

import (
	"fmt"
	"sync"
)

func main() {
	var wg sync.WaitGroup
	wg.Add(2)

	ch := make(chan int, 3)

	go sell(ch, &wg)
	go buy(ch, &wg)

	wg.Wait()
}
```

### The sell Function

The `sell` function sends three integer values (10, 11, and 12) to the channel. After sending these values, it prints a confirmation message and decrements the WaitGroup counter to signify completion.

```
func sell(ch chan int, wg *sync.WaitGroup) {
	ch <- 10
	ch <- 11
	ch <- 12
	fmt.Println("Sent all data to the channel")
	wg.Done()
}
```

### The buy Function

The `buy` function waits to receive a value from the channel. It prints a waiting message, then prints the received value, and finally marks its completion via the WaitGroup.

```
func buy(ch chan int, wg *sync.WaitGroup) {
	fmt.Println("Waiting for data")
	fmt.Println("Received data:", <-ch)
	wg.Done()
}
```

When you run the program, the output is:

```
Waiting for data
Received data: 10
Sent all data to the channel
```

This behavior shows that the `sell` function did not block because the number of values sent did not exceed the channel's buffer capacity.

## Exceeding the Buffer Limit

When more values are sent than a buffered channel can hold, the send operation will block until there is room in the buffer. Consider this modified version of the `sell` function, where a fourth value is sent:

```
func sell(ch chan int, wg *sync.WaitGroup) {
	ch <- 10
	ch <- 11
	ch <- 12
	ch <- 13  // This send blocks if the buffer is full
	go buy(ch, wg)
	fmt.Println("Sent all data to the channel")
	wg.Done()
}
```

Running this version might result in a deadlock error:

```
fatal error: all goroutines are asleep - deadlock!
```

This error occurs because the `sell` function blocks at the fourth send (`ch <- 13`) when the buffer is full, while the receiving Goroutine (`buy`) is not scheduled quickly enough to free up space.

!!! note "Note" To resolve the issue, ensure the receiving Goroutine is started before sending an extra value. For instance:

```
func sell(ch chan int, wg *sync.WaitGroup) {
	ch <- 10
	ch <- 11
	ch <- 12
	go buy(ch, wg)  // Start the buyer Goroutine first
	ch <- 13        // Now, this send succeeds once there's room in the buffer
	fmt.Println("Sent all data to the channel")
	wg.Done()
}
```

With this adjustment, the program runs without encountering a deadlock.

## Blocking Behavior on Empty Channels

Receiving from a channel blocks if the channel is empty. For example, if a Goroutine attempts to receive data from an empty channel, it will wait indefinitely for a value to be sent. Consider this snippet:

```
package main

import (
	"fmt"
	"sync"
)

func main() {
	var wg sync.WaitGroup
	wg.Add(2)

	ch := make(chan int, 3)
	go sell(ch, &wg)
	go buy(ch, &wg)

	wg.Wait()
}

func sell(ch chan int, wg *sync.WaitGroup) {
	// Send values to the channel
	ch <- 10
	ch <- 11
	ch <- 12
	go buy(ch, wg)
	// The following send may block if there is no receiver to drain the channel
	ch <- 13
}

func buy(ch chan int, wg *sync.WaitGroup) {
	fmt.Println("Waiting for data")
	fmt.Println("Received data:", <-ch)
	wg.Done()
}
```

If no value is sent when the receiver is waiting, the `buy` function will block indefinitely, potentially resulting in a deadlock. Always make sure that each receive operation is paired with a corresponding send to avoid such circumstances.

!!! warning "Warning" Be cautious when designing concurrent operations. A receive operation on an empty channel will block, which might lead to undesired deadlocks if not managed correctly.

## Summary

Buffered channels offer a robust mechanism for temporarily storing values, enabling Goroutines to continue execution without getting blocked by immediate send requests—provided the buffer is not full. However, if the buffer limit is exceeded, the sending Goroutine blocks until space is available. Likewise, a receive operation on an empty channel will cause the receiver to block. By carefully coordinating the order of send and receive operations, you can avoid deadlocks and ensure efficient, concurrent operations in your Go programs.

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-golang/module/5a3833bd-1030-4e53-a886-007bd0b9fbf3/lesson/15e04ebf-2292-482f-8f6f-23de2df8bab9)**
>
> Watch video content
