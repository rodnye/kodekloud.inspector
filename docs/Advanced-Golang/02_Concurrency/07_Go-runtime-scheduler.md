# Go runtime scheduler - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Golang/Concurrency/Go-runtime-scheduler)

---

## Table of Contents

- Go runtime scheduler
  - Starting a Go Program
  - Calculating Logical Processors and Goroutine Multiplexing
  - Understanding the Go Runtime Scheduler
  - Cooperative Scheduling in Go
  - Context Switching
  - Goroutines vs. Threads
  - Next Steps
  - Watch Video

---

## Content

Advanced Golang

Concurrency

# Go runtime scheduler

In this article, we explore the intricacies of the Go Runtime Scheduler and how it efficiently manages Goroutines alongside operating system threads. We will examine the startup process of a Go program, the multiplexing of Goroutines, and the cooperative scheduling strategy that makes Go unique.

## Starting a Go Program

When a Go program starts, the runtime creates a set of operating system threads equal to the number of logical CPUs available. The operating system handles the creation, blocking, and scheduling of these threads on CPU cores. You can determine the number of available logical processors using the `runtime.NumCPU` method. This method calculates the count by multiplying the number of physical cores by the number of hardware threads each core supports.

![The image is a slide discussing what happens when you start a Go program, highlighting the use of the `runtime.NumCPU` method to find the number of logical processors and explaining the calculation of logical cores.](https://kodekloud.com/kk-media/image/upload/v1752868705/notes-assets/images/Advanced-Golang-Go-runtime-scheduler/go-program-runtime-numcpu-slide.jpg)

## Calculating Logical Processors and Goroutine Multiplexing

Goroutines are lightweight application-level threads that execute independently. The Go runtime employs an M:N scheduling technique to multiplex many Goroutines over a limited number of operating system threads. This efficient model allows you to run an arbitrary number of Goroutines on a fixed pool of threads, ensuring optimal resource utilization.

![The image is a slide explaining Go-routines, describing them as lightweight application-level threads with independent execution, and detailing how the Go runtime schedules them using m:n multiplexing.](https://kodekloud.com/kk-media/image/upload/v1752868706/notes-assets/images/Advanced-Golang-Go-runtime-scheduler/go-routines-lightweight-threads-explained.jpg)

## Understanding the Go Runtime Scheduler

The operating system scheduler manages threads for each logical core. Within the Go runtime, each thread is associated with a local run queue (LRQ) that stores Goroutines designated for that specific thread. Additionally, the runtime uses a global run queue (GRQ) to hold Goroutines that have not yet been assigned to any LRQ. Periodically, the scheduler moves Goroutines from the GRQ to LRQs based on execution needs.

![The image is a diagram illustrating the Go scheduler, showing how goroutines (G1 to G10) are managed across OS threads and logical CPUs. It includes components like the OS scheduler, Go scheduler, and queues (GRQ and LRQ).](https://kodekloud.com/kk-media/image/upload/v1752868707/notes-assets/images/Advanced-Golang-Go-runtime-scheduler/go-scheduler-goroutines-diagram.jpg)

## Cooperative Scheduling in Go

The Go scheduler operates on a cooperative basis, meaning it does not force preemptive context switches based on time slices. Instead, Goroutines voluntarily yield control at predefined checkpoints. For example, context switching may occur during function calls, garbage collection, network operations, or channel operations, as well as when launching new Goroutines with the `go` keyword.

> [!important]
> **Note**
>
> Goroutines must yield control voluntarily, which depends on checkpoints within the code such as I/O operations and function calls.

![The image is a slide explaining the concept of a cooperative scheduler, highlighting that the Golang scheduler is cooperative, where processes voluntarily yield control, and context switches occur at specific checkpoints.](https://kodekloud.com/kk-media/image/upload/v1752868708/notes-assets/images/Advanced-Golang-Go-runtime-scheduler/cooperative-scheduler-golang-explanation.jpg)

## Context Switching

Context switching in Go occurs when a Goroutine makes a function call, prompting the scheduler to evaluate whether to switch execution to another Goroutine. Although the scheduler can switch contexts, it might also continue with the current Goroutine if no better candidate is available. Common triggers for a context switch include:

- Function calls
- Garbage collection
- Network operations
- Channel communications

![The image is a slide titled "Context Switching" with a list of items: Functions Call, Garbage Collection, Network Calls, Channel operations, and On using go keyword.](https://kodekloud.com/kk-media/image/upload/v1752868709/notes-assets/images/Advanced-Golang-Go-runtime-scheduler/context-switching-functions-garbage-network-channel-go.jpg)

## Goroutines vs. Threads

Goroutines are much lighter than traditional operating system threads. Typically, they require only a few kilobytes of stack space, which can dynamically grow or shrink as needed, whereas threads usually have a fixed stack size (e.g., one megabyte). This low overhead enables developers to spawn hundreds or even thousands of Goroutines while keeping the number of OS threads relatively low. The Go runtime’s efficient scheduling leads to faster context switches compared to the OS-level thread scheduling.

Goroutines also communicate using channels, which provide a safe mechanism to synchronize memory access and data exchange between concurrent operations.

![The image is a slide comparing Go-routines and threads, highlighting that Go-routines are cheaper, multiplexed to fewer OS threads, have faster context switching, and communicate using channels.](https://kodekloud.com/kk-media/image/upload/v1752868711/notes-assets/images/Advanced-Golang-Go-runtime-scheduler/go-routines-vs-threads-comparison.jpg)

## Next Steps

In upcoming lessons, we will dive deeper into channels and explore their role in managing concurrent processes with Go.

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-golang/module/5a3833bd-1030-4e53-a886-007bd0b9fbf3/lesson/ab4280e7-18f9-4fbd-a4e8-d8ad2894f93b)**
>
> Watch video content
