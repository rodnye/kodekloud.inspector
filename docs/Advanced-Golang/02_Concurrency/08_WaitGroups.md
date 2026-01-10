# WaitGroups - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Golang/Concurrency/WaitGroups)

---

## Table of Contents

- WaitGroups
  - Declaring and Using a WaitGroup
  - Understanding WaitGroups with an Example
  - Watch Video

---

## Content

Advanced Golang

Concurrency

# WaitGroups

In this lesson, we explore WaitGroups in Go, a key tool for managing concurrency. In Go programs, the main goroutine can sometimes terminate before spawned goroutines have begun or finished execution. WaitGroups provide an elegant solution to synchronize multiple goroutines without resorting to arbitrary timeouts.

![The image is a slide discussing "Wait groups" in programming, explaining their use in managing the execution of multiple go-routines and preventing the main go-routine from terminating prematurely.](https://kodekloud.com/kk-media/image/upload/v1752868718/notes-assets/images/Advanced-Golang-WaitGroups/wait-groups-go-routines-slide.jpg)

## Declaring and Using a WaitGroup

To get started, declare a WaitGroup just like any other variable using the `var` keyword. For example:

```
var wg sync.WaitGroup
```

Make sure to import the `sync` package at the beginning of your file:

```
import "sync"
```

A WaitGroup offers three primary methods to control goroutine execution:

1.  **Add**  
    Use this method to set the number of goroutines that the WaitGroup should wait for. It increases the internal counter by the specified number.

    ```
    wg.Add(n) // n is the number of goroutines to wait for
    ```

2.  **Wait**  
    This method blocks the execution of the code until the WaitGroup's internal counter reaches zero. Typically, you call it after all desired goroutines have been launched.

    ```
    wg.Wait()
    ```

3.  **Done**  
    Each goroutine should call `wg.Done()` when its work is completed. This method decreases the WaitGroup's counter by one.

    ```
    wg.Done()
    ```

> [!important]
> **Note**
>
> Ensure that every call to `wg.Add(n)` eventually corresponds to `n` calls to `wg.Done()`. Failing to do so will result in your program hanging indefinitely.

## Understanding WaitGroups with an Example

Consider a scenario where you need to manage three concurrent tasks. Initially, the WaitGroup's counter is zero. By invoking `wg.Add(3)`, the counter is increased to three. Each of the three goroutines will call `wg.Done()` upon task completion, decrementing the counter by one. Meanwhile, `wg.Wait()` blocks further execution until all goroutines complete and the counter reaches zero.

Below is a consolidated example that demonstrates the use of WaitGroups:

```
package main


import (
	"fmt"
	"sync"
	"time"
)


// worker simulates a task performed by a goroutine.
func worker(id int, wg *sync.WaitGroup) {
	defer wg.Done()
	// Simulate some work with a delay.
	time.Sleep(time.Second)
	fmt.Printf("Worker %d done\n", id)
}


func main() {
	var wg sync.WaitGroup
	numWorkers := 3


	// Increment the WaitGroup counter by the number of goroutines.
	wg.Add(numWorkers)


	// Launch the workers.
	for i := 1; i <= numWorkers; i++ {
		go worker(i, &wg)
	}


	// Block main until all goroutines finish.
	wg.Wait()
	fmt.Println("All workers complete")
}
```

In this example:

- The main function sets the WaitGroup counter to 3 using `wg.Add(3)`.
- Three goroutines are spawned, each executing the `worker` function.
- Each worker calls `wg.Done()` after finishing its task.
- The main goroutine waits on `wg.Wait()`, ensuring that it only proceeds after every worker has completed execution.

> [!important]
> **Performance Consideration**
>
> Using WaitGroups correctly helps to avoid potential issues with premature termination of your main routine, maintaining the reliability and predictability of concurrent execution.

That concludes our lesson on WaitGroups in Go. For further learning, you may explore more advanced concurrency patterns and synchronization techniques in Go.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-golang/module/5a3833bd-1030-4e53-a886-007bd0b9fbf3/lesson/883284e2-3658-4fc8-9b8d-d0140881a95f)**
>
> Watch video content
