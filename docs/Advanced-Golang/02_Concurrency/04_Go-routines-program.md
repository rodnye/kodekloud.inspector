# Go routines program - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Golang/Concurrency/Go-routines-program)

---

## Table of Contents

- Go routines program
  - Sequential Execution Example
  - Running Functions Concurrently
  - Ensuring Goroutines Complete Execution
  - Conclusion
  - Watch Video

---

## Content

Advanced Golang

Concurrency

# Go routines program

In this lesson, you'll learn how to execute functions concurrently in Go using goroutines. By simply prefixing any function call with the `go` keyword, you can run the function as a separate goroutine.

## Sequential Execution Example

The following example demonstrates a sequential program that calculates the square of an integer after a one-second delay:

```
package main

import (
	"fmt"
	"time"
)

func calculateSquare(i int) {
	time.Sleep(1 * time.Second)
	fmt.Println(i * i)
}

func main() {
	start := time.Now()
	for i := 1; i <= 10000; i++ {
		calculateSquare(i)
	}
	elapsed := time.Since(start)
	fmt.Println("Function took", elapsed)
}
```

In this version, each call to `calculateSquare` is executed one after the other, which accumulates a significant overall delay.

## Running Functions Concurrently

To run the same task concurrently, simply add the `go` keyword before the function call. This launches each call to `calculateSquare` as a separate goroutine:

```
package main

import (
	"fmt"
	"time"
)

func calculateSquare(i int) {
	time.Sleep(1 * time.Second)
	fmt.Println(i * i)
}

func main() {
	start := time.Now()
	for i := 1; i <= 10000; i++ {
		go calculateSquare(i)
	}
	elapsed := time.Since(start)
	fmt.Println("Function took", elapsed)
}
```

When you run this concurrent version, you might see output like:

```
$ go run main.go
Function took 13ms
```

> [!important]
> **Note**
>
> Although the elapsed time appears very short (e.g., 13 milliseconds), none of the squares are printed. This behavior occurs because the `main` function completes and exits before the goroutines have finished executing.

## Ensuring Goroutines Complete Execution

A simple workaround to allow all goroutines to finish is by adding a delay in the `main` function using `time.Sleep`. For example, adding a two-second pause gives the goroutines enough time to complete:

```
package main

import (
	"fmt"
	"time"
)

func calculateSquare(i int) {
	time.Sleep(1 * time.Second)
	fmt.Println(i * i)
}

func main() {
	start := time.Now()
	for i := 1; i <= 10000; i++ {
		go calculateSquare(i)
	}
	elapsed := time.Since(start)
	time.Sleep(2 * time.Second)
	fmt.Println("Function took", elapsed)
}
```

When you run the updated program:

```
$ go run main.go
```

You will see a large number of squares printed in the terminal along with an output similar to:

```
76475025
76492516
76580001
76527504
76545001
76562500
76615009
78287104
78446449
76597504
7665025
76667536
76685049
Function took 31.743525ms
~/GolandProjects/awesomeProject via 🐹 v1.19.3 took 2s
```

> [!important]
> **Warning**
>
> Using `time.Sleep` is not the most reliable method to wait for goroutines to complete. A better approach is to use synchronization primitives such as [WaitGroups](https://pkg.go.dev/sync#WaitGroup), which will be covered in an upcoming lesson.

## Conclusion

Goroutines are a powerful way to enable concurrency in your Go programs by allowing functions to execute concurrently with minimal changes to your code. As you continue, learn to manage synchronization between goroutines efficiently for more robust and production-ready applications.

Happy coding, and see you in the next lesson!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-golang/module/5a3833bd-1030-4e53-a886-007bd0b9fbf3/lesson/4f7f3ab2-0cf1-4ab0-a68a-14941b737fb1)**
>
> Watch video content
