# Sequential program - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Golang/Concurrency/Sequential-program)

---

## Table of Contents

- Sequential program
  - Overview
  - Sequential Code Example
  - Expected Output
  - Transition to Goroutines
  - Watch Video

---

## Content

Advanced Golang

Concurrency

# Sequential program

This guide demonstrates how to implement a simple sequential program in Go that calculates the squares of numbers from 1 to 10,000. This example illustrates basic programming concepts such as function calls, time measurement, and paves the way for understanding concurrency with Goroutines in future topics.

## Overview

The program begins by declaring the package and defining the main function. Inside the main function, a `for` loop iterates from 1 to 10,000. For each iteration, the program calls the `calculateSquare` function, passing in the current loop variable as an argument.

The `calculateSquare` function has two primary responsibilities:

1.  **Delay Execution:** It uses the `Sleep` function from the `time` package to pause execution for one second. While such delays are uncommon in production, they are useful here to visibly demonstrate the performance gains when switching to Goroutines.
2.  **Calculate and Print Square:** It calculates the square of the given number and prints the result.

To measure the total execution time, the program captures the start time using `time.Now()` before entering the loop and computes the elapsed time with `time.Since(start)` after the loop completes. Given the one-second delay per calculation, the sequential execution takes roughly 10,000 seconds.

> [!important]
> **Note**
>
> This example is designed for educational purposes. In practical applications, avoid artificial delays unless necessary.

## Sequential Code Example

Below is the complete sequential Go code:

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

## Expected Output

When you run the program, it prints the square of each number sequentially. A snippet of the output is:

```
1
4
9
16
...
```

After processing all numbers, the program outputs the total execution time, which will be approximately 10,000 seconds because of the one-second delay for each iteration.

## Transition to Goroutines

The approach demonstrated above processes tasks sequentially. An alternative, more efficient method involves using Goroutines to perform calculations concurrently. This concurrency can dramatically reduce the overall execution time.

For additional insights on Go's concurrency model, check out the [Goroutines Documentation](https://golang.org/doc/effective_go#concurrency).

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-golang/module/5a3833bd-1030-4e53-a886-007bd0b9fbf3/lesson/9cacf2b5-7c45-4e7b-a038-be9bf80d02c1)**
>
> Watch video content
