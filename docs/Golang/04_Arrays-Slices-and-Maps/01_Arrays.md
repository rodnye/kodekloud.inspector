# Arrays - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Golang/Arrays-Slices-and-Maps/Arrays)

---

## Table of Contents

- Arrays
  - Why Use Arrays?
  - Declaring Arrays in Go
  - Example: Printing an Array
  - Initializing Arrays
  - Working with Array Length
  - Array Indices
  - Modifying Array Elements
  - Looping Through Arrays
  - Multi-Dimensional Arrays
  - Watch Video
  - Practice Lab
    - Explicit Initialization
    - Shorthand Declaration
    - Using Ellipses
    - Example: Index Out of Bounds
    - Using a Traditional For Loop
    - Using the Range Keyword

---

## Content

Golang

Arrays Slices and Maps

# Arrays

Golang supports primitive data types such as numbers, booleans, and strings. In this guide, we explore arrays, slices, and maps, beginning with arrays.

An array is a collection of elements stored in contiguous memory locations. For instance, you could use an array to hold a series of integers representing students’ roll numbers or strings representing character names in a show.

Because array elements are stored contiguously, if an integer occupies 4 bytes and the first element is at memory address 200, the next will be at address 204. Arrays are known as homogeneous collections since they store elements of a single data type.

## Why Use Arrays?

In many situations, you may need to store a significant amount of data of the same type. For example, instead of creating three different integer variables to store a student's marks in three subjects, you can declare an array named `grades` to hold all the values together.

Remember, arrays in Go have a fixed length. After declaring an array with a specific size, you cannot change its length, and every element must be of the same type. In Go, an array stores a pointer to its first element along with its length (the number of elements) and capacity (which, for arrays, is the same as the length).

![The image explains arrays, highlighting fixed length, same data type elements, and shows an array with elements 1-5 and their corresponding memory addresses.](https://kodekloud.com/kk-media/image/upload/v1752877703/notes-assets/images/Golang-Arrays/frame_150.jpg)

Because of the contiguous nature of memory allocation, you can even compute the address of any element using its index.

## Declaring Arrays in Go

Declaring arrays is straightforward. You use the `var` keyword, specify the array name, define its size inside square brackets, and mention the data type. For example, to declare an array of five integers:

```
var grades [5]int
```

Similarly, to declare a string array with three elements:

```
var fruits [3]string
```

![The image illustrates array declaration syntax, showing examples for arrays named "grades" and "fruits" with specified sizes and data types.](https://kodekloud.com/kk-media/image/upload/v1752877704/notes-assets/images/Golang-Arrays/frame_220.jpg)

## Example: Printing an Array

Let’s declare an array of five integers and print its contents. By default, an uninitialized array of integers holds the zero value (0):

```
package main
import "fmt"

func main() {
    var grades [5]int
    fmt.Println(grades)
}
```

When you run the program:

```
>>> go run main.go
[0 0 0 0 0]
```

Since the array is not explicitly given values, each element defaults to zero.

We can also print an array of strings. Although empty strings may not be visibly apparent, each element is initialized to the empty string ("") by default:

```
package main
import "fmt"

func main() {
    var grades [5]int
    fmt.Println(grades)

    var fruits [3]string
    fmt.Println(fruits)
}
```

Output:

```
>>> go run main.go
[0 0 0 0 0]
[  ]
```

> [!important]
> **Note**
>
> An empty string is the zero value for a string in Go.

## Initializing Arrays

There are several methods to initialize arrays in Go:

### Explicit Initialization

Initialize an array of three integers by explicitly specifying all values:

```
var grades [3]int = [3]int{10, 20, 30}
```

If the number of provided values is less than the declared size, the remaining elements are set to the zero value. Conversely, if you supply more values than the array's capacity, the compiler will throw an error.

### Shorthand Declaration

You can use the shorthand declaration to both declare and initialize an array:

```
grades := [3]int{10, 20, 30}
```

### Using Ellipses

Let the compiler determine the array length automatically by using ellipses:

```
names := [...]string{"Rachel", "Phoebe", "Monica"}
```

This automatically sets the size of the `names` array to the number of elements provided.

Below is a complete example that declares and prints three arrays:

```
package main
import "fmt"

func main() {
    var fruits [2]string = [2]string{"apples", "oranges"}
    fmt.Println(fruits)

    marks := [3]int{10, 20, 30}
    fmt.Println(marks)

    names := [...]string{"Rachel", "Phoebe", "Monica"}
    fmt.Println(names)
}
```

Output:

```
>>> go run main.go
[apples oranges]
[10 20 30]
[Rachel Phoebe Monica]
```

## Working with Array Length

The built-in `len()` function returns an array's length. For example, consider the following code:

```
package main
import "fmt"

func main() {
    var fruits [2]string = [2]string{"apples", "oranges"}
    fmt.Println(len(fruits))
}
```

When executed, this program outputs:

```
>>> go run main.go
2
```

This confirms that the `fruits` array contains two elements.

## Array Indices

Array indexing starts at 0. For an array of five elements, the first element is at index 0 and the last element at index 4. The diagram below illustrates an array named "grades" with values 90, 86, 76, 42, and 85, along with their corresponding indices:

![The image shows an array labeled "grades" with values 90, 86, 76, 42, 85, and their corresponding indexes 0 to 4.](https://kodekloud.com/kk-media/image/upload/v1752877705/notes-assets/images/Golang-Arrays/frame_510.jpg)

To access an element, use its index within square brackets. For example, given that the element at index 1 is 86:

```
// Accessing element at index 1:
fmt.Println(grades[1]) // Outputs: 86

// Accessing element at index 0:
fmt.Println(grades[0]) // Outputs: 90
```

Accessing an index outside the valid range (0 to length-1) results in a compiler error.

### Example: Index Out of Bounds

Consider the following string array of size five:

```
package main
import "fmt"

func main() {
    var fruits [5]string = [5]string{"apples", "oranges", "grapes", "mango", "papaya"}
    fmt.Println(fruits[6])
}
```

When executed, this code produces an error:

```
>>> go run main.go
invalid array index 6 (out of bounds for 5-element array)
```

Since valid indices for a 5-element array range from 0 to 4, accessing index 6 is invalid.

## Modifying Array Elements

You can update array elements by referring to their indices. Consider the following example:

```
package main
import "fmt"

func main() {
    var grades [5]int = [5]int{90, 80, 70, 80, 97}
    fmt.Println(grades)
    grades[1] = 100
    fmt.Println(grades)
}
```

Initially, the array `grades` prints:

```
[90 80 70 80 97]
```

After updating the value at index 1 to 100, the output becomes:

```
[90 100 70 80 97]
```

## Looping Through Arrays

There are multiple ways to iterate over arrays in Go.

### Using a Traditional For Loop

A classic `for` loop lets you iterate through array elements by index:

```
package main
import "fmt"

func main() {
    var grades [5]int = [5]int{90, 80, 70, 80, 97}
    for i := 0; i < len(grades); i++ {
        fmt.Println(grades[i])
    }
}
```

Output:

```
>>> go run main.go
90
80
70
80
97
```

### Using the Range Keyword

Alternatively, the `range` keyword simplifies iteration by returning both the index and the element:

```
package main
import "fmt"

func main() {
    var grades [5]int = [5]int{90, 80, 70, 80, 97}
    for index, element := range grades {
        fmt.Println(index, "=>", element)
    }
}
```

Output:

```
>>> go run main.go
0 => 90
1 => 80
2 => 70
3 => 80
4 => 97
```

## Multi-Dimensional Arrays

A multi-dimensional array is essentially an array of arrays. The simplest form is a two-dimensional (2D) array. For example, a 3x2 array has three sub-arrays with two elements each.

To access elements in a 2D array, use two indices. Consider the following guidelines:

- To access the element 64, use: `arr[2][1]`
- To access the element 4, use: `arr[1][0]`
- To retrieve the first element of the first sub-array, use: `arr[0][0]`

Below is an example that demonstrates a 3x2 array and prints an element from it:

```
package main
import "fmt"

func main() {
    var arr [3][2]int = [3][2]int{
        {1, 2},
        {4, 5},
        {8, 64},
    }
    fmt.Println(arr[2][1]) // Output: 64
}
```

In this code, the sub-array at index 2 is `{8, 64}`, and the element at index 1 within that sub-array is `64`.

That's it for this guide on arrays in Go. Head over to the labs to start practicing these concepts. Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/golang/module/d42c8657-2eaa-4e17-8605-277e81ac1176/lesson/67233ce6-1b27-439e-9823-662d89170a67)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/golang/module/d42c8657-2eaa-4e17-8605-277e81ac1176/lesson/a9bc6d1b-e4d7-425a-8319-4cf45b6ac098)**
>
> Practice lab
