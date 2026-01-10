# Passing Structs to Functions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Golang/Struct-Methods-and-Interfaces/Passing-Structs-to-Functions)

---

## Table of Contents

- Passing Structs to Functions
  - Defining the Structure
  - Passing Struct by Value
  - Passing Struct by Reference
  - Summary
  - Watch Video

---

## Content

Golang

Struct Methods and Interfaces

# Passing Structs to Functions

In this tutorial, we will learn how to pass structs to functions in Go by exploring two different methods: passing by value and passing by reference. These concepts are essential for controlling whether changes within a function affect the original data.

## Defining the Structure

Begin by declaring the package and importing the required packages. Then, we define a `Circle` struct that contains four fields: `x`, `y`, `radius`, and `area`.

```
package main
import "fmt"


type Circle struct {
    x      int
    y      int
    radius float64
    area   float64
}
```

## Passing Struct by Value

In the first method, we pass the struct by value. The function `calcArea` accepts a `Circle` instance as its parameter. Within the function, the area of the circle is computed using the `radius` field, but because the struct is passed by value, the changes remain local to the function and do not affect the original `Circle` instance.

```
package main
import "fmt"


type Circle struct {
    x      int
    y      int
    radius float64
    area   float64
}


func calcArea(c Circle) {
    const PI float64 = 3.14
    var area float64
    area = PI * c.radius * c.radius
    // Note: c.area is not updated here because 'c' is a copy of the original struct.
}


func main() {
    c := Circle{x: 5, y: 5, radius: 5, area: 0}
    fmt.Printf("%+v \n", c)
    calcArea(c)
    // The original 'c' remains unchanged as calcArea received a copy.
    fmt.Printf("%+v \n", c)
}
```

> [!important]
> **Note**
>
> Passing by value means that modifications made inside the function do not alter the original struct. This is useful when you want to ensure the integrity of the initial data.

When you run this program, the struct's values remain unchanged after calling `calcArea`.

## Passing Struct by Reference

To modify the original struct within a function, pass the struct by reference using a pointer. In the modified version of `calcArea`, the function accepts a pointer to a `Circle` and directly updates the `area` field by dereferencing that pointer.

```
package main
import "fmt"


type Circle struct {
    x      int
    y      int
    radius float64
    area   float64
}


func calcArea(c *Circle) {
    const PI float64 = 3.14
    var area float64
    area = PI * c.radius * c.radius
    (*c).area = area
}


func main() {
    c := Circle{x: 5, y: 5, radius: 5, area: 0}
    fmt.Printf("%+v \n", c)
    // Passing the address of 'c' so that modifications affect the original variable.
    calcArea(&c)
    fmt.Printf("%+v \n", c)
}
```

> [!important]
> **Note**
>
> Passing by reference using pointers allows the function to alter the original data. This approach is ideal when you need to update the struct directly.

Upon execution, the output demonstrates that the `area` field has been correctly updated:

```
{x:5 y:5 radius:5 area:0}
{x:5 y:5 radius:5 area:78.5}
```

## Summary

In this guide, we examined two methods for passing structs to functions in Go:

| Method            | Description                                                                     | Use Case                                              |
| ----------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------- |
| Pass by Value     | The struct is copied, and modifications do not affect the original.             | When you need to preserve the initial data integrity. |
| Pass by Reference | The function receives a pointer, allowing direct modifications to the original. | When updating the struct directly is required.        |

Understanding the difference between these methods is crucial for managing data and memory efficiently in Go programming.

That concludes our exploration of passing structs to functions in Go. In our next article, we will dive deeper into advanced topics related to struct operations and memory management in Go.

For more detailed tutorials and Go programming tips, be sure to explore our [Go Documentation](https://golang.org/doc/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/golang/module/62591a5f-ea7d-40f5-923f-5b248d6b565b/lesson/8f8347dc-df35-494f-94ec-b8b2a19327dc)**
>
> Watch video content
