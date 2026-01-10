# Declaring and Initialising a Struct - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Golang/Struct-Methods-and-Interfaces/Declaring-and-Initialising-a-Struct)

---

## Table of Contents

- Declaring and Initialising a Struct
  - Declaring a Struct
  - Example: Circle Struct
  - Example: Student Struct Declaration
  - Initializing a Struct
  - Conclusion
  - Watch Video
    - 1. Initializing with the var Keyword
    - 2. Initializing with the new Keyword
    - 3. Initializing with a Struct Literal using Field Names
    - 4. Initializing with a Struct Literal Without Field Names

---

## Content

Golang

Struct Methods and Interfaces

# Declaring and Initialising a Struct

In this guide, you'll learn how to declare and initialize a struct in Go, a powerful way to group together related data elements. Structs in Go are user-defined data types that allow you to create complex data structures by combining variables under a single name.

## Declaring a Struct

A struct in Go is declared using the following syntax:

```
type <struct_name> struct {
    // list of fields
}
```

Here, the keyword `type` creates a new user-defined type. The `struct` keyword indicates that you are defining a struct type, followed by a list of fields enclosed in curly braces. Each field consists of a name and a type, and they are laid out sequentially in memory.

## Example: Circle Struct

Consider a simple example of a `Circle` struct. This struct is named `Circle` and contains three fields: `x`, `y`, and `r`, each of type `float64`.

```
type Circle struct {
    x float64
    y float64
    r float64
}
```

## Example: Student Struct Declaration

Likewise, you can declare a more complex struct like `Student`, which combines different data types including a string, an integer, a slice of integers, and a map from strings to integers:

```
type Student struct {
    name   string
    rollNo int
    marks  []int
    grades map[string]int
}
```

Keep in mind that these declarations do not assign actual values. They act as blueprints for creating instances (or objects) of these structs.

> [!important]
> **Note**
>
> No values are assigned during declaration, so each field is set to its default value (for example, zero for integers and an empty string for strings) until explicitly initialized.

## Initializing a Struct

After declaring a struct, you can initialize it using several methods. Each method caters to different use cases, ranging from simple declaration to partial initialization with explicit field names.

### 1\. Initializing with the var Keyword

Using the `var` keyword declares a variable of the struct type with all its fields automatically set to their zero values:

```
var s Student
```

The following complete example demonstrates how to declare a `Student` struct and print its default values:

```
package main

import "fmt"

type Student struct {
    name   string
    rollNo int
    marks  []int
    grades map[string]int
}

func main() {
    var s Student
    fmt.Printf("%+v", s)
}
```

When you run this program (using `go run main.go`), the output will be similar to:

```
{name: rollNo:0 marks:[] grades:map[]}
```

### 2\. Initializing with the new Keyword

You can also create an instance of a struct using the `new` keyword, which allocates memory, initializes the fields to their default zero values, and returns a pointer to the struct.

```
st := new(Student)
```

Below is a complete example demonstrating initialization using the `new` keyword:

```
package main

import "fmt"

type Student struct {
    name   string
    rollNo int
    marks  []int
    grades map[string]int
}

func main() {
    st := new(Student)
    fmt.Printf("%+v", st) // st is a pointer to Student
}
```

### 3\. Initializing with a Struct Literal using Field Names

For more precise control, you can initialize a struct using a literal with field names to assign initial values explicitly:

```
st := Student{
    name:   "Joe",
    rollNo: 12,
}
```

Here’s a complete example that initializes a `Student` struct with specific values:

```
package main

import "fmt"

type Student struct {
    name   string
    rollNo int
}

func main() {
    st := Student{
        name:   "Joe",
        rollNo: 12,
    }
    fmt.Printf("%+v", st)
}
```

The output of this program will be:

```
{name:Joe rollNo:12}
```

### 4\. Initializing with a Struct Literal Without Field Names

It is possible to initialize a struct without specifying field names, simply by listing the values in the order they were declared. Although valid, this method is less maintainable and generally not recommended for clarity:

```
st := Student{"Joe", 12}
```

The complete example is as follows:

```
package main

import "fmt"

type Student struct {
    name   string
    rollNo int
}

func main() {
    st := Student{"Joe", 12}
    fmt.Printf("%+v", st)
}
```

Running this program produces the same output:

```
{name:Joe rollNo:12}
```

> [!important]
> **Warning**
>
> Avoid using struct literals without field names in larger codebases, as they can lead to errors if the struct definition changes.

## Conclusion

Structs in Go offer an effective way to group related data under a single type. Whether you use simple declarations with the `var` keyword or initialize with explicit values using struct literals, understanding these methods is essential for writing clean and maintainable Go programs. Choose the appropriate method based on your application’s requirements.

For further reading on Go and programming, consider exploring additional topics in our [Go Programming Guides](#) and [Advanced Structs and Interfaces](#).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/golang/module/62591a5f-ea7d-40f5-923f-5b248d6b565b/lesson/5097801d-54e1-4473-99b5-153ff095c024)**
>
> Watch video content
