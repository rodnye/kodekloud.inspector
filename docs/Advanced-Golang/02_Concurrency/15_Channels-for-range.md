# Channels for range - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Golang/Concurrency/Channels-for-range)

---

## Table of Contents

- Channels for range
  - Iterating Over Arrays
  - Using For-Range with Channels
  - Avoiding Deadlocks by Closing Channels
  - Working with Buffered Channels
  - Conclusion
  - Watch Video

---

## Content

Advanced Golang

Concurrency

# Channels for range

In this article, you will learn how to use a for-range loop to receive values from a channel in Go. Before diving into channel operations, let's quickly review how a for-range loop works with arrays and slices.

## Iterating Over Arrays

First, consider an array named `nums` that is initialized with integer values. The following code snippet demonstrates how to iterate over the array using the `range` keyword to print each index along with its corresponding value:

```
package main


import "fmt"


func main() {
    // for-range over an array
    nums := [5]int{1, 2, 3, 4, 5}

    // Iterate over the array elements
    for i, item := range nums {
        fmt.Println(i, item)
    }
}
```

When you run this program, the output will display indices 0 through 4 with the corresponding values 1 through 5.

---

## Using For-Range with Channels

The for-range loop is also useful for iterating over values received from a channel. In this example, we have two goroutines: one that sends values to a channel using the `sell` function and another that receives values using the `buy` function.

```
package main


import (
    "fmt"
    "sync"
)


func main() {
    var wg sync.WaitGroup
    wg.Add(2)
    ch := make(chan int)
    go sell(ch, &wg)
    go buy(ch, &wg)
    wg.Wait()
}


func sell(ch chan int, wg *sync.WaitGroup) {
    ch <- 1
    ch <- 2
    fmt.Println("Sent all data")
    close(ch)
    wg.Done()
}


func buy(ch chan int, wg *sync.WaitGroup) {
    fmt.Println("Waiting for data")
    for val := range ch {
        fmt.Println(val)
    }
    wg.Done()
}
```

When you run the program with:

```
go run main.go
```

The expected output is similar to:

```
Waiting for data
1
Sent all data
2
```

The for-range loop on the channel receives each element sent by `sell` until the channel is closed.

> [!important]
> **Note**
>
> Always close your channels when using for-range loops to ensure that the loop terminates correctly.

---

## Avoiding Deadlocks by Closing Channels

It is important to note what happens if the channel remains open. If you comment out the `close(ch)` line in the `sell` function, the for-range loop in the `buy` function will never terminate, leading to a deadlock. Check out the following code to see the issue:

```
func sell(ch chan int, wg *sync.WaitGroup) {
    ch <- 1
    ch <- 2
    fmt.Println("Sent all data")
    // close(ch) is commented out
    wg.Done()
}


func buy(ch chan int, wg *sync.WaitGroup) {
    fmt.Println("Waiting for data")
    for val := range ch {
        fmt.Println("Received:", val)
    }
    wg.Done()
}
```

The output for the above code may look like:

```
Sent all data
Received: 2
fatal error: all goroutines are asleep - deadlock!
...
```

> [!important]
> **Warning**
>
> Failing to close the channel when using for-range loops can result in an infinite wait, causing deadlock issues in your program.

---

## Working with Buffered Channels

The behavior of for-range loops is similar with unbuffered channels, but let’s explore a buffered channel example. In the example below, we create a buffered channel with a capacity of 5, send some values, and then close the channel. The for-range loop iterates over the buffered values before terminating.

```
package main


import (
    "fmt"
)


func main() {
    ch := make(chan int, 5)
    ch <- 100
    ch <- 200
    close(ch)


    for val := range ch {
        fmt.Println(val)
    }
}
```

When you run this program using:

```
go run main.go
```

The output will be:

```
100
200
```

This example demonstrates that if a channel is closed, the for-range loop will still process all buffered values before exiting.

---

## Conclusion

In this article, you learned how to use the for-range loop in Go to iterate over arrays and channels. We highlighted the importance of closing channels to prevent deadlocks and ensured that proper iteration occurs, even with buffered channels. For more details on Go channels, be sure to check out the [Go Documentation](https://golang.org/doc/).

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-golang/module/5a3833bd-1030-4e53-a886-007bd0b9fbf3/lesson/463b1cef-4576-4d58-a6af-d98f777a4d97)**
>
> Watch video content
