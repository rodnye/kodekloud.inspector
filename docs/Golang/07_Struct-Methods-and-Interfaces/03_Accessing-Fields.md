# Accessing Fields - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Golang/Struct-Methods-and-Interfaces/Accessing-Fields)

---

## Table of Contents

- Accessing Fields
  - Basic Syntax
  - Example: Defining a Struct
  - Modifying Struct Fields
  - Handling Undefined Fields
  - Conclusion
  - Watch Video

---

## Content

Golang

Struct Methods and Interfaces

# Accessing Fields

In this article, we'll explore how to access and modify the fields of a struct in Go using the dot operator. The dot operator allows you to reference a specific field of a struct variable by following the variable name with a dot and then the field name.

## Basic Syntax

To access a field within a struct, use the following syntax:

```
<variable_name>.<field_name>
```

## Example: Defining a Struct

Below is an example of a simple struct named Circle that has three fields: x, y, and radius. In the main function, we declare a variable `c` of type Circle.

```
package main


import "fmt"


type Circle struct {
    x int
    y int
    radius int
}


func main() {
    // Struct initialization can be done here if needed.
}
```

## Modifying Struct Fields

To modify the fields of the `Circle` struct, you simply access each field using the dot operator and assign a new value. In the example below, the values of `x`, `y`, and `radius` are all set to 5.

```
package main


import "fmt"


type Circle struct {
    x int
    y int
    radius int
}


func main() {
    var c Circle
    c.x = 5
    c.y = 5
    c.radius = 5
    fmt.Printf("%+v \n", c)
}
```

When you run this program, the output displays the values assigned to each field:

```
>>> go run main.go
{x:5 y:5 radius:5}
```

> [!important]
> **Note**
>
> Remember that Go structs cannot be partially assigned. Each field must be explicitly set or initialized.

## Handling Undefined Fields

Attempting to access a field that is not defined in the struct will result in a compilation error. For example, trying to access `c.area` when `area` is not a field in the `Circle` struct will cause an error. The code snippet below demonstrates this issue:

```
package main


import "fmt"


type Circle struct {
    x int
    y int
    radius int
}


func main() {
    var c Circle
    c.x = 5
    c.y = 5
    c.radius = 5
    fmt.Printf("%+v \n", c)
    fmt.Printf("%+v \n", c.area)
}
```

Compiling this code will produce the following error:

```
>>> go run main.go
c.area undefined (type Circle has no field or method area)
```

> [!important]
> **Warning**
>
> Always ensure that you only access fields that are defined in your struct. Attempting to work with undefined fields will lead to compile-time errors.

## Conclusion

By following this guide, you now understand how to properly access and modify the fields of a struct in Go. Remember to use the dot operator to reference specific fields, and ensure that any field you access has been defined within the struct.

Happy coding in Go!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/golang/module/62591a5f-ea7d-40f5-923f-5b248d6b565b/lesson/cc0d7c17-4a6a-4396-a217-460b1ec1fd3d)**
>
> Watch video content
