# WaitGroup Examples - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Golang/Concurrency/WaitGroup-Examples)

---

## Table of Contents

- WaitGroup Examples
  - Adding a WaitGroup
  - Signaling Completion with Done()
  - Execution and Output
  - Watch Video

---

## Content

Advanced Golang

Concurrency

# WaitGroup Examples

In this article, we explore how to use WaitGroups to enhance concurrent programs in Go. Specifically, we will modify a program that calculates the squares of numbers using Goroutines by adding synchronization through the sync package’s WaitGroup. This ensures that the main function waits for all Goroutines to complete before exiting.

Previously, the following program calculated squares concurrently without synchronization:

```
package main


import (
	"fmt"
	"time"
)


func calculateSquare(i int) {
	fmt.Println(i * i)
}


func main() {
	start := time.Now()
	for i := 0; i < 10; i++ {
		go calculateSquare(i)
	}
	elapsed := time.Since(start)
	fmt.Println("Function took", elapsed)
}
```

The above code launches 10 Goroutines to compute squares concurrently. However, since no synchronization mechanism is in place, the main function might terminate before all Goroutines have completed their execution.

## Adding a WaitGroup

To synchronize the Goroutines, we introduce a WaitGroup from the sync package. First, declare a WaitGroup variable and set its counter to 10 (the number of Goroutines):

```
package main


import (
	"fmt"
	"sync"
	"time"
)


func calculateSquare(i int) {
	fmt.Println(i * i)
}


func main() {
	var wg sync.WaitGroup
	start := time.Now()
	wg.Add(10)
	for i := 0; i < 10; i++ {
		go calculateSquare(i)
	}
	elapsed := time.Since(start)
	fmt.Println("Function took", elapsed)
}
```

> [!important]
> **Note**
>
> The code above sets the WaitGroup counter to 10 with `wg.Add(10)`, but currently, it does not indicate when individual Goroutines complete their work.

## Signaling Completion with Done()

To update the WaitGroup counter as each Goroutine completes its execution, modify the `calculateSquare` function to accept a pointer to the WaitGroup and call the `Done()` method right after processing the square calculation. This can be implemented using `defer wg.Done()`:

```
package main


import (
	"fmt"
	"sync"
	"time"
)


func calculateSquare(i int, wg *sync.WaitGroup) {
	defer wg.Done()
	fmt.Println(i * i)
}


func main() {
	var wg sync.WaitGroup
	start := time.Now()


	// Set the WaitGroup counter to 10
	wg.Add(10)
	for i := 0; i < 10; i++ {
		go calculateSquare(i, &wg)
	}


	// Wait until all Goroutines have signaled completion
	wg.Wait()
	elapsed := time.Since(start)
	fmt.Println("Function took", elapsed)
}
```

In this updated version, each Goroutine calls `wg.Done()` after computing the square, which decrements the WaitGroup counter. The `wg.Wait()` in the main function ensures that the program only proceeds once all Goroutines have finished executing.

## Execution and Output

To run the program, execute the following command in your terminal:

```
go run main.go
```

You will observe that all square values are printed, though not necessarily in sequential order due to the non-deterministic scheduling of Goroutines. An example output might look like:

```
81
16
25
36
49
64
9
Function took 43.328µs
```

The printed execution time (e.g., 43.328µs) reflects the total duration after all Goroutines have signaled completion.

> [!important]
> **Next Steps**
>
> In the next lesson, we will delve into more advanced topics with Goroutines and concurrency in Go.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-golang/module/5a3833bd-1030-4e53-a886-007bd0b9fbf3/lesson/c67dcf0a-65fa-45d4-8531-aabb7907f8bc)**
>
> Watch video content
