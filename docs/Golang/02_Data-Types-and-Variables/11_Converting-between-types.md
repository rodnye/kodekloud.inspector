# Converting between types - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Golang/Data-Types-and-Variables/Converting-between-types)

---

## Table of Contents

- Converting between types
  - Converting an Integer to a Float
  - Converting a Float to an Integer
  - String Conversion with the strconv Package
  - Hands-On Practice
  - Watch Video
  - Practice Lab
    - Converting an Integer to a String
    - Converting a String to an Integer

---

## Content

Golang

Data Types and Variables

# Converting between types

In this guide, you'll learn how to perform type conversion (also known as type casting) in Go by converting variables from one data type to another. While converting variables is straightforward, be aware that the actual value may change after conversion due to differences in data representation.

---

## Converting an Integer to a Float

Converting an integer to a floating-point number in Go is simple. You can convert an integer by wrapping it with the desired float type (either float64 or float32).

For example, consider the following Go program. It declares an integer variable i, converts it to a float64 stored in variable f, and then prints the result.

![The image explains type casting, the process of converting one data type to another, noting that value integrity isn't guaranteed.](https://kodekloud.com/kk-media/image/upload/v1752877711/notes-assets/images/Golang-Converting-between-types/frame_30.jpg)

```
package main


import "fmt"


func main() {
    var i int = 90
    var f float64 = float64(i)
    fmt.Printf("%.2f\n", f)
}
```

Console output:

```
>>> go run main.go
90.00
```

> [!important]
> **Note**
>
> When converting an integer to a float, the numeric value remains the same, but may be represented differently with added precision.

---

## Converting a Float to an Integer

Go also allows you to convert a floating-point number to an integer. This conversion will truncate the decimal portion, losing any fractional precision.

Consider this example:

```
package main


import "fmt"


func main() {
    var f float64 = 45.89
    var i int = int(f)
    fmt.Printf("%v\n", i)
}
```

Console output:

```
>>> go run main.go
45
```

Here, converting 45.89 to an integer results in 45 because the conversion truncates the fractional part.

> [!important]
> **Warning**
>
> Keep in mind that converting a float to an integer results in a loss of precision. Ensure this behavior is acceptable for your application's use case.

---

## String Conversion with the strconv Package

Go’s built-in package, `strconv`, makes it easy to convert between strings and integers. Two frequently used functions in this package are:

- `Itoa`: Converts an integer to a string.
- `Atoi`: Converts a string to an integer and returns both the integer value and an error if the conversion fails.

### Converting an Integer to a String

To convert an integer to a string, import the `strconv` package and use the `Itoa` function. The code below demonstrates this conversion:

```
package main


import (
    "fmt"
    "strconv"
)


func main() {
    var i int = 42
    var s string = strconv.Itoa(i) // convert int to string
    fmt.Printf("%q", s)
}
```

Console output:

```
>>> go run main.go
"42"
```

The output `"42"` verifies that the conversion from integer to string was successful.

---

### Converting a String to an Integer

To convert a string to an integer, use the `Atoi` function, which returns both the converted integer and an error value. When the string represents a valid integer, the error will be nil.

For example, consider this conversion of a valid string:

```
package main


import (
    "fmt"
    "strconv"
)


func main() {
    var s string = "200"
    i, err := strconv.Atoi(s)
    fmt.Printf("%v, %T \n", i, i)
    fmt.Printf("%v, %T", err, err)
}
```

Since "200" is a valid numerical string, the conversion succeeds, and err remains nil.

The `strconv` package comes equipped with helpful functions like `Itoa` and `Atoi` for converting between types, with built-in error handling to ensure the conversion is successful.

![The image describes the `strconv` package functions: `Itoa()` converts integers to strings, and `Atoi()` converts strings to integers, returning an integer and an error.](https://kodekloud.com/kk-media/image/upload/v1752877712/notes-assets/images/Golang-Converting-between-types/frame_200.jpg)

Now, take a look at an example where the string cannot be converted into an integer:

```
package main


import (
    "fmt"
    "strconv"
)


func main() {
    var s string = "200abc"
    i, err := strconv.Atoi(s)
    fmt.Printf("%v, %T \n", i, i)
    fmt.Printf("%v, %T", err, err)
}
```

Console output:

```
>>> go run main.go
0, int
strconv.Atoi: parsing "200abc": invalid syntax, *strconv.NumError
```

Here, "200abc" is not a valid integer string, so the conversion returns 0 along with an error describing the invalid syntax.

---

## Hands-On Practice

Now that you've seen examples of converting between various data types in Go—including integers, floats, and strings—it's time to put these techniques into practice. Experiment with different data types and conversion methods in your own projects to solidify your understanding of Go's type conversion mechanisms.

Explore more about Go programming on the [official Go documentation](https://golang.org/doc/). Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/golang/module/eeafa284-50db-4de2-a58a-759d3926fced/lesson/e862e62c-80b5-4d9d-9f7d-686aa1ca611c)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/golang/module/eeafa284-50db-4de2-a58a-759d3926fced/lesson/da3019bd-092d-4cc8-854a-cb30980acd84)**
>
> Practice lab
