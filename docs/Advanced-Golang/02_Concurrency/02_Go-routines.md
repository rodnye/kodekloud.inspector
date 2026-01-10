# Go routines - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Golang/Concurrency/Go-routines)

---

## Table of Contents

- Go routines
  - Understanding Goroutines
  - Syntax Example
  - Summary
  - Watch Video

---

## Content

Advanced Golang

Concurrency

# Go routines

In this lesson, we explore goroutines, a fundamental component in Go's powerful concurrency model. Goroutines are essentially lightweight threads that run concurrently, managed efficiently by the Go Runtime Scheduler. Understanding how to use goroutines is key to writing high-performance Go applications.

## Understanding Goroutines

Goroutines enable you to execute functions or methods concurrently by using the special keyword `go`. When you prefix a function call with `go`, the function executes in its own goroutine. This allows the program to perform multiple tasks simultaneously without the overhead of traditional threading.

> [!important]
> **Note**
>
> If you omit the `go` keyword, the function executes as part of the main goroutine, following the standard sequential program flow.

## Syntax Example

Below is an example demonstrating how to start a goroutine that calls the `calculate` function concurrently:

```
go calculate()
```

This example clearly shows that by placing the `go` keyword before the function call, the function is executed concurrently in a separate goroutine.

## Summary

Goroutines are a cornerstone of Go's approach to concurrency, allowing efficient and easy parallel execution of code. By utilizing the simple syntax provided by the `go` keyword, developers can design applications that make effective use of multi-core systems and improve overall performance.

For further reading, consider exploring the following resources:

- [Goroutines: An Introduction](https://golang.org/doc/effective_go.html#goroutines)
- [Go Concurrency Patterns](https://blog.golang.org/pipelines)

That concludes our discussion on goroutines.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-golang/module/5a3833bd-1030-4e53-a886-007bd0b9fbf3/lesson/fb8fd544-30ac-48c9-ac48-6955ae399eba)**
>
> Watch video content
