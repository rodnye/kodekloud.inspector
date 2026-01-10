# Main Go routine - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Golang/Concurrency/Main-Go-routine)

---

## Table of Contents

- Main Go routine
  - Watch Video

---

## Content

Advanced Golang

Concurrency

# Main Go routine

In this article, we explore how the main function in the main package serves as the primary goroutine. All additional goroutines are spawned from this main goroutine and execute concurrently. It's important to note that goroutines operate independently without any inherent parent-child relationship. When the main goroutine (i.e., the one running the main function) exits, the entire program terminates regardless of any goroutines still running.

To clearly demonstrate this concept, we create two functions: one named start and another named process. The start function is launched as a goroutine from the main function, and within start, the process function is also invoked as a goroutine. To ensure that the main function remains active long enough for the goroutines to execute, we add a one-second sleep timer. Here is the complete code for this example:

```
package main


import (
	"fmt"
	"time"
)


func main() {
	go start()
	time.Sleep(1 * time.Second)
}


func start() {
	go process()
	fmt.Println("In start")
}


func process() {
	fmt.Println("In process")
}
```

When you run the program, you might observe that the output order of "In start" and "In process" is non-deterministic. For instance, you could see:

```
$ go run main.go
In start
In process
```

Or:

```
$ go run main.go
In process
In start
```

> [!important]
> **Note**
>
> This behavior underscores that goroutines run independently and concurrently. There is no guaranteed execution order between them, and as soon as any goroutine’s function returns, it terminates unless the main function is still running.

Remember, if the main goroutine ends, the entire program exits—even if other goroutines are still active. This fundamental behavior is crucial when designing concurrent programs using Go.

That concludes our discussion on the main goroutine and its behavior. We hope this explanation helps you understand how goroutines are managed in Go and look forward to sharing more insights in our next lesson.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-golang/module/5a3833bd-1030-4e53-a886-007bd0b9fbf3/lesson/6c527df4-5259-4c46-a635-3b94b9b57dc7)**
>
> Watch video content
