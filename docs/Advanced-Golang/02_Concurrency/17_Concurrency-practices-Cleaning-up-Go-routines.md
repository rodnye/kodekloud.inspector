# Concurrency practices Cleaning up Go routines - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Golang/Concurrency/Concurrency-practices-Cleaning-up-Go-routines)

---

## Table of Contents

- Concurrency practices Cleaning up Go routines
  - Setting Up the WaitGroup
  - Creating the Leak Function
  - Analyzing the Goroutine Leak
  - Key Takeaways
  - Watch Video

---

## Content

Advanced Golang

Concurrency

# Concurrency practices Cleaning up Go routines

In this article, we explore best practices for managing concurrency in Golang, with a strong focus on cleaning up goroutines to prevent resource leaks. Proper management of goroutines is essential, as failing to terminate them correctly can lead to persistent memory usage and eventual application deadlocks.

When launching a goroutine, ensure that it is designed to eventually exit. A goroutine that never terminates will continue to occupy memory indefinitely. Common causes of such issues include blocking indefinitely on I/O operations (like channel communications) or falling into an infinite loop.

Below, we provide a detailed example that illustrates how a goroutine leak can occur when a goroutine is inadvertently left waiting on a channel.

## Setting Up the WaitGroup

The first step is to declare a `WaitGroup` in the main function. The `WaitGroup` helps synchronize the completion of multiple goroutines:

```
package main


import "sync"


func main() {
    var wg sync.WaitGroup
}
```

Next, we demonstrate launching two goroutines. The `WaitGroup` counter is increased by two with `wg.Add(2)`. Then, a goroutine is started by calling the `leak` function and passing a pointer to the `WaitGroup`. The main function then calls `wg.Wait()`, which blocks until all goroutines have signaled completion.

```
package main


import "sync"


func main() {
    var wg sync.WaitGroup
    wg.Add(2)
    go leak(&wg)
    wg.Wait()
}
```

## Creating the Leak Function

Within the `leak` function, a channel for integer values is created. This channel is local to the function, and its scope is limited to within the `leak` function:

```
package main


import (
    "fmt"
    "sync"
)


func main() {
    var wg sync.WaitGroup
    wg.Add(2)
    go leak(&wg)
    wg.Wait()
}


func leak(s *sync.WaitGroup) {
    ch := make(chan int)
}
```

After creating the channel, an anonymous goroutine is spawned. This goroutine attempts to receive a value from `ch`, prints it using `fmt.Println`, and then calls `s.Done()` on the `WaitGroup`. Meanwhile, the main `leak` function prints a message and also calls `s.Done()`:

```
package main


import (
    "fmt"
    "sync"
)


func main() {
    var wg sync.WaitGroup
    wg.Add(2)
    go leak(&wg)
    wg.Wait()
}


func leak(s *sync.WaitGroup) {
    ch := make(chan int)


    go func() {
        val := <-ch
        fmt.Println("Received", val)
        s.Done()
    }()


    fmt.Println("Exiting leak method")
    s.Done()
}
```

## Analyzing the Goroutine Leak

When you run this program, the output is similar to the following:

```
Exiting leak method
fatal error: all goroutines are asleep - deadlock!


goroutine 1 [semacquire]:
sync.runtime_Semacquire(0x0000014250?)
    /usr/local/go/src/runtime/sema.go:62 +0x25
sync.(*WaitGroup).Wait(0x0?)
```

The problem arises because the anonymous goroutine inside the `leak` function is permanently blocked waiting for a value from the channel `ch`. Since no value is ever sent into `ch`, the goroutine remains stuck, leading to a deadlock.

> [!important]
> **Warning**
>
> Be cautious when designing goroutines that wait on channels. Always ensure that the expected value is sent, or include a timeout or cancellation mechanism to prevent indefinite blocking.

Below is a snippet highlighting the problematic code that causes the deadlock:

```
func leak(s *sync.WaitGroup) {
    ch := make(chan int)


    go func() {
        val := <-ch
        fmt.Println("Received", val)
        s.Done()
    }()


    fmt.Println("Exiting leak method")
}
```

Running the program using:

```
go run main.go
```

will produce:

```
Exiting leak method
fatal error: all goroutines are asleep - deadlock!
```

## Key Takeaways

- Always ensure that every goroutine you launch has an exit strategy.
- Goroutines that wait on channels must receive the necessary data, or else they will block indefinitely.
- Use synchronization tools like `WaitGroup` responsibly to safely manage goroutine lifecycles.

> [!important]
> **Note**
>
> If you plan to use channels for synchronization, consider implementing graceful shutdowns or incorporating timeouts to avoid goroutine leaks.

That's all for this article. In our next discussion, we'll dive deeper into more advanced concurrency patterns in Golang. For further reading on Goroutines and concurrency, check out the [Golang Documentation](https://golang.org/doc/) and ensure your applications are not vulnerable to goroutine leaks.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-golang/module/5a3833bd-1030-4e53-a886-007bd0b9fbf3/lesson/3b06859c-5ff4-4ff3-ac30-60ee1fac6f93)**
>
> Watch video content
