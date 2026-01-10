# Implementing Interfaces - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Golang/Struct-Methods-and-Interfaces/Implementing-Interfaces)

---

## Table of Contents

- Implementing Interfaces
  - Defining the Interface
  - Implementing the Interface with a Square
  - Implementing the Interface with a Rectangle
  - Using the Interface
  - Summary of the Implementation
  - Watch Video
  - Practice Lab

---

## Content

Golang

Struct Methods and Interfaces

# Implementing Interfaces

In this lesson, we dive into the powerful concept of interfaces in Golang. Through practical examples, you'll learn how to define an interface, implement it using different structures, and leverage it to elegantly access methods provided by distinct types.

## Defining the Interface

We begin by defining an interface named `shape`. This interface requires any implementing type to provide two methods: `area` and `perimeter`. Both methods must return a value of type float64, ensuring a consistent design across all shapes.

```
package main

import "fmt"

type shape interface {
	area() float64
	perimeter() float64
}
```

Any type that implements these two methods effectively conforms to the `shape` interface.

## Implementing the Interface with a Square

Next, we demonstrate how to implement the `shape` interface using a `square` struct. The struct includes a single field, `side`, and implements the required `area` and `perimeter` methods. Notice how the method signatures exactly match those defined in the interface, ensuring proper implementation.

```
package main

import "fmt"

type shape interface {
	area() float64
	perimeter() float64
}

type square struct {
	side float64
}

func (s square) area() float64 {
	return s.side * s.side
}

func (s square) perimeter() float64 {
	return 4 * s.side
}
```

> [!important]
> **Note**
>
> The `square` type implements the `shape` interface by providing both the `area` and `perimeter` methods, which is a fundamental requirement in Golang for interface satisfaction.

## Implementing the Interface with a Rectangle

Similarly, you can implement the same interface with a `rect` struct designed for rectangles. This struct introduces two fields: `length` and `breadth`. The corresponding `area` and `perimeter` methods are implemented in a way that adheres perfectly to the interface's contract.

```
package main

type rect struct {
	length, breadth float64
}

func (r rect) area() float64 {
	return r.length * r.breadth
}

func (r rect) perimeter() float64 {
	return 2*r.length + 2*r.breadth
}
```

Both methods in the `rect` struct fulfill the exact signatures required by the `shape` interface, reinforcing the importance of consistency when working with interfaces.

## Using the Interface

To illustrate the power of interfaces, we define a function called `printData` that accepts any type conforming to the `shape` interface. This function prints the area and perimeter for whichever shape is passed to it. In the `main` function, instances of both `rect` and `square` are created and passed to `printData`, demonstrating how a single function can seamlessly handle different types.

```
package main

import "fmt"

func printData(s shape) {
	fmt.Println(s.area())
	fmt.Println(s.perimeter())
}

func main() {
	r := rect{length: 3, breadth: 4}
	c := square{side: 5}

	printData(r)
	printData(c)
}
```

When you run the program, you'll observe that the `printData` function correctly manages both the rectangle and square types. This flexibility highlights the immense power of using interfaces in your Golang applications.

## Summary of the Implementation

| Component                | Description                                                       | Code Snippet                                                        |
| ------------------------ | ----------------------------------------------------------------- | ------------------------------------------------------------------- |
| Interface                | Declares the `shape` interface with `area` and `perimeter` cut.   | (See code in "Defining the Interface" section)                      |
| Square Implementation    | Implements the interface with a single `side` attribute.          | (See code in "Implementing the Interface with a Square" section)    |
| Rectangle Implementation | Uses `length` and `breadth` to fulfill the interface contract.    | (See code in "Implementing the Interface with a Rectangle" section) |
| Function Usage           | Demonstrates how to dynamically apply the method for any `shape`. | (See code in "Using the Interface" section)                         |

By harnessing interfaces in Golang, you create more modular, flexible, and maintainable code.

For deeper understanding, refer to [Golang Interfaces](https://golang.org/doc/effective_go.html#interfaces).

And that concludes our lesson on implementing interfaces in Golang. Now it's time to get hands-on practice and further explore these concepts in your applications!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/golang/module/62591a5f-ea7d-40f5-923f-5b248d6b565b/lesson/5df2a56c-41fe-407f-8bb4-11a40199f7c2)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/golang/module/62591a5f-ea7d-40f5-923f-5b248d6b565b/lesson/87af7338-9976-41f5-ac97-b112aac09698)**
>
> Practice lab
