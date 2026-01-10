# Methods Introduction and Syntax - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Golang/Struct-Methods-and-Interfaces/Methods-Introduction-and-Syntax)

---

## Table of Contents

- Methods Introduction and Syntax
  - Example with Pointer Receiver
  - Example with Value Receiver
  - Summary
  - Watch Video

---

## Content

Golang

Struct Methods and Interfaces

# Methods Introduction and Syntax

In this article, we continue our exploration of Go by diving into methods. Previously, we discussed structs, and now we'll see how methods extend their functionality.

A method in Go resembles a function but includes an extra element: the receiver parameter. This parameter, specified immediately after the func keyword, indicates the type the method is associated with. Essentially, the receiver is the instance of the type on which the method operates.

The syntax for declaring a method is shown below:

```
func (<receiver>) <method_name>(<parameters>) <return_params> {
    // code
}
```

You can think of the receiver as the instance bound to a method. When there is a close association between a function and a struct, implementing the function as a method is natural. In essence, a method is a function with a designated receiver, which can be a named type (e.g., Circle) or a pointer to that type.

For example, consider the two method declarations for a Circle:

```
func (c Circle) area() float64 {
    // code
}

func (c *Circle) area() float64 {
    // code
}
```

In the first declaration, the receiver is a value of type Circle, whereas in the second, it is a pointer to Circle.

> [!important]
> **Note**
>
> Using pointer receivers allows methods to modify the original struct, while value receivers work on a copy of the struct.

Let's illustrate this with a practical example. We'll define a Circle struct with two fields: radius and area. Then, we add a method that calculates the circle's area using the standard area formula. Notice that this method uses a pointer receiver so that it can update the Circle struct's area field directly.

## Example with Pointer Receiver

In this example, the method modifies the Circle instance by calculating and updating its area.

```
package main

import "fmt"

type Circle struct {
    radius float64
    area   float64
}

// calcArea method uses a pointer receiver so that it can modify the circle's area field.
func (c *Circle) calcArea() {
    c.area = 3.14 * c.radius * c.radius
}

func main() {
    c := Circle{radius: 5}
    c.calcArea()
    fmt.Printf("%+v\n", c)
}
```

Run this code using:

```
>>> go run main.go
```

The output will be:

```
{radius:5 area:78.5}
```

Notice that during initialization, we did not set any value for the area field. Invoking the calcArea method computes and updates the area field within the Circle instance.

## Example with Value Receiver

Now, consider a second example where the receiver is a value (a copy of the Circle struct). The method computes the area but does not modify the original Circle instance.

```
package main

import "fmt"

type Circle struct {
    radius float64
    area   float64
}

// calcArea method uses a value receiver, so modifications affect only the copy.
func (c Circle) calcArea() {
    c.area = 3.14 * c.radius * c.radius
}

func main() {
    c := Circle{radius: 5}
    c.calcArea()
    fmt.Printf("%+v\n", c)
}
```

Execute the code with:

```
>>> go run main.go
```

The output will be:

```
{radius:5 area:0}
```

Since the method uses a value receiver, only a copy of the original Circle is modified inside the calcArea method. Therefore, the original Circle instance remains unchanged.

> [!important]
> **Key Takeaway**
>
> Choosing between pointer and value receivers is crucial: use pointer receivers when your method needs to modify the receiver; use value receivers when the method only needs to read data.

## Summary

Methods in Go serve as functions tied to a struct, and they can either work on the original instance (using pointer receivers) or on a copy of the instance (using value receivers). This fundamental concept enhances the organization and behavior of your Go programs.

Happy coding, and see you in the next lesson!

---

For more insights on Go and other programming topics, check out our [Go Documentation](https://golang.org/doc/) and related [Programming Tutorials](https://example.com/tutorials).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/golang/module/62591a5f-ea7d-40f5-923f-5b248d6b565b/lesson/b2a0a315-541e-44a6-b4d6-1046ecede61f)**
>
> Watch video content
