# Concurrency practices Spawning Go routine closures in a loop - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Golang/Concurrency/Concurrency-practices-Spawning-Go-routine-closures-in-a-loop)

---

## Table of Contents

- Concurrency practices Spawning Go routine closures in a loop
  - Understanding Closures and Goroutines
  - A Complete Example with Proper Imports
  - Expected Versus Actual Output
  - The Underlying Problem
  - Passing Data to Goroutines Correctly
  - Demonstration of Expected Output
  - Conclusion
  - Watch Video

---

## Content

Advanced Golang

Concurrency

# Concurrency practices Spawning Go routine closures in a loop

In this article, we explore a common concurrency pattern in Go: spawning goroutines from within a closure inside a loop. We'll explain how closures capture variables from their surrounding scope, highlight potential pitfalls with this approach, and demonstrate the correct technique to ensure each goroutine works with the intended value.

## Understanding Closures and Goroutines

A closure in Go is a function defined within another function that has access to the parent function’s local variables. Consider the following example:

```
func main() {
    var wg sync.WaitGroup
    wg.Add(10)
    for i := 0; i < 10; i++ {
        go func() {
            fmt.Println(i)
            wg.Done()
        }()
    }
    fmt.Println("Done.")
    wg.Wait()
}
```

In this snippet, a `WaitGroup` is used to synchronize 10 goroutines. The loop runs from 0 to 9 and spawns a new goroutine on each iteration. Each goroutine captures the loop variable `i` and prints its value before calling `wg.Done()`.

> [!important]
> **Note**
>
> Although this code appears straightforward, the goroutines capture the variable `i` from the outer scope. Because goroutines may start executing after the loop has advanced or finished, they can all see the same (possibly final) value of `i`.

## A Complete Example with Proper Imports

Below is the complete program with all necessary imports and a proper structure:

```
package main


import (
    "fmt"
    "sync"
)


func main() {
    var wg sync.WaitGroup
    wg.Add(10)


    for i := 0; i < 10; i++ {
        go func() {
            fmt.Println(i)
            wg.Done()
        }()
    }


    wg.Wait()
    fmt.Println("Done.")
}
```

When executed, you might expect the output to contain the numbers 0 through 9 (in any order) followed by the "Done." message. However, due to the nature of closures and asynchronous execution, the output may become non-deterministic, showing unexpected values.

## Expected Versus Actual Output

A developer might anticipate output similar to this:

```
0
1
2
3
4
5
6
7
8
9
Done.
```

However, due to the delay in starting the goroutines relative to the loop progression, the actual output might instead resemble:

```
go run main.go
10
10
8
8
8
8
8
10
Done.
```

In this case, each goroutine prints the value of `i` as it is at the time of execution, which may not reflect the intended loop iteration.

## The Underlying Problem

The core issue is that goroutines do not begin execution immediately. They are scheduled concurrently, meaning by the time a goroutine runs, the loop variable `i` might have already been incremented (or the loop might have ended), causing all goroutines to print an unexpected value (for example, all printing `10`).

## Passing Data to Goroutines Correctly

To ensure that each goroutine captures the intended value of `i` at the moment it is spawned, the common solution is to pass `i` as an argument to the closure. This approach ensures that each goroutine has its own copy of the variable with the correct value.

Below is the revised version of the program:

```
package main


import (
    "fmt"
    "sync"
)


func main() {
    var wg sync.WaitGroup
    wg.Add(10)


    for i := 1; i <= 10; i++ {
        go func(i int) {
            fmt.Println(i)
            wg.Done()
        }(i)
    }


    wg.Wait()
    fmt.Println("Done.")
}
```

In this corrected example, passing `i` as an argument to the anonymous function guarantees that each goroutine works with its own copy of the value. Running this program should correctly print the numbers 1 through 10 in any order, followed by "Done.".

## Demonstration of Expected Output

A sample output from the corrected program might look like this:

```
go run main.go
10
6
3
4
5
8
2
1
9
7
Done.
```

Each goroutine prints the correct number from its corresponding loop iteration, even though the order might vary due to concurrent execution.

## Conclusion

When spawning goroutines within a loop in Go, it's crucial to be aware of how closures capture variables. To avoid issues that arise from the deferred evaluation of loop variables, always pass the loop variable as an argument to the closure. This technique not only leads to more predictable behavior but also ensures that each goroutine processes the intended value.

We hope you found this guide helpful. For more insights and advanced topics on Go concurrency, stay tuned to our future articles.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-golang/module/5a3833bd-1030-4e53-a886-007bd0b9fbf3/lesson/5e21107a-09fb-4f01-b0b6-e096afe3a959)**
>
> Watch video content
