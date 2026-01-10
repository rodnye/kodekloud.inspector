# Anonymous Go routine - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Golang/Concurrency/Anonymous-Go-routine)

---

## Table of Contents

- Anonymous Go routine
  - Launching an Anonymous Goroutine
  - Example: Anonymous Goroutine in Action
  - Running the Program
  - Watch Video

---

## Content

Advanced Golang

Concurrency

# Anonymous Go routine

Anonymous functions in Go allow you to define and immediately execute functions without having to declare a name. These functions are especially useful when you need to run code concurrently. By combining anonymous functions with Goroutines, you can easily launch lightweight concurrent tasks.

## Launching an Anonymous Goroutine

To run an anonymous function as a Goroutine, simply prefix the function definition with the `go` keyword. The syntax is as follows:

```
go func() {
    // code to execute concurrently
}(args...)
```

This approach is identical to launching a named function as a Goroutine, ensuring that the behavior remains consistent.

## Example: Anonymous Goroutine in Action

Below is a complete example that demonstrates how to launch an anonymous function as a Goroutine. In this example, the anonymous Goroutine prints a simple statement:

```
package main


import (
	"fmt"
	"time"
)


func main() {
	// Launching an anonymous function as a Goroutine
	go func() {
		fmt.Println("In anonymous method")
	}()


	// Pause the main Goroutine to allow the anonymous Goroutine to finish execution
	time.Sleep(1 * time.Second)
}
```

> [!important]
> **Note**
>
> Ensure that the main Goroutine sleeps long enough to allow the anonymous Goroutine to complete its execution. Otherwise, the program may terminate before the concurrent task finishes.

## Running the Program

To execute the program, use the following command:

```
go run main.go
```

After running the command, you should observe the following output on your console:

```
In anonymous method
```

This output confirms that the anonymous Goroutine executed concurrently as expected.

That concludes this article on using anonymous Goroutines in Go. We hope you found this guide helpful for understanding how to implement concurrency in your Go applications.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-golang/module/5a3833bd-1030-4e53-a886-007bd0b9fbf3/lesson/f2bf6fd5-f69b-47a1-9bb5-64794bfa5dae)**
>
> Watch video content
