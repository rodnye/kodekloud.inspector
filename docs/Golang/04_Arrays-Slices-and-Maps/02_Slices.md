# Slices - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Golang/Arrays-Slices-and-Maps/Slices)

---

## Table of Contents

- Slices
  - Declaring and Initializing a Slice
  - Understanding Slices with Arrays
  - Creating Slices with the make Function
  - Slices as References
  - Appending Elements to a Slice
  - Deleting Elements from a Slice
  - Copying Elements Between Slices
  - Looping Through Slices
  - Watch Video
  - Practice Lab

---

## Content

Golang

Arrays Slices and Maps

# Slices

In this lesson, we will explore slices in Go—a flexible and powerful alternative to arrays. Slices in Go represent continuous segments of an underlying array and provide access to a numbered sequence of elements. Unlike arrays, slices are dynamically sized, allowing you to easily add or remove elements as needed.

A slice consists of three key components:

- **Pointer:** Refers to the first accessible element in the underlying array (which may not be the first element of the entire array).
- **Length:** The number of elements contained in the slice.
- **Capacity:** The total number of elements in the underlying array starting from the first element in the slice.

For example, a slice with a length of 4 and a capacity of 5 will allow the functions `len` and `cap` to retrieve these values respectively.

---

## Declaring and Initializing a Slice

Declaring a slice in Go is straightforward and similar to creating an array—except that you do not need to specify its size. When you declare a slice, the compiler creates an underlying array and returns a reference to it. For instance, to create an integer slice named `grades` with the values 10, 20, and 30:

```
// Declaration format: <slice_name> := []<data_type>{<values>}
grades := []int{10, 20, 30}
```

Consider this complete example that creates and prints a slice:

```
package main

import "fmt"

func main() {
    slice := []int{10, 20, 30}
    fmt.Println(slice)
}
```

When you run the program:

```
>>> go run main.go
[10 20 30]
```

---

## Understanding Slices with Arrays

A slice is essentially a reference to an underlying array. You can construct a slice from an array by specifying a start index and an end index. The slice starts at the given start index and includes elements up to, but not including, the end index. For example:

```
array[start_index : end_index]
// Example:
array[0:3]
```

If you omit the lower bound, it defaults to 0. Similarly, omitting the upper bound causes the slice to include the entire array.

Consider the following example where an array with 10 elements is sliced from index 1 to 8 (which includes indices 1 through 7):

```
package main

import "fmt"

func main() {
    arr := [10]int{10, 20, 30, 40, 50, 60, 70, 80, 90, 100}
    slice_1 := arr[1:8]
    fmt.Println(slice_1)
}
```

Output:

```
>>> go run main.go
[20 30 40 50 60 70 80]
```

You can also create a new slice from an existing slice using the same slicing syntax:

```
package main

import "fmt"

func main() {
    arr := [10]int{10, 20, 30, 40, 50, 60, 70, 80, 90, 100}
    slice := arr[1:8]
    fmt.Println(slice)
    sub_slice := slice[0:3]
    fmt.Println(sub_slice)
}
```

Output:

```
>>> go run main.go
[20 30 40 50 60 70 80]
[20 30 40]
```

---

## Creating Slices with the make Function

Another method to create a slice is by using the built-in `make` function. This function requires the data type, initial length, and capacity. The syntax is:

```
// Syntax:
slice := make([]<data_type>, length, capacity)
// Example:
slice := make([]int, 5, 10)
```

The `make` function allocates an underlying array of the specified capacity and returns a slice that refers to it. This approach is especially useful when you want to create an empty slice with a predetermined capacity.

For example, this code creates a slice with a length of 5 and a capacity of 8, printing its contents, length, and capacity:

```
package main

import "fmt"

func main() {
    slice := make([]int, 5, 8)
    fmt.Println(slice)
    fmt.Println(len(slice))
    fmt.Println(cap(slice))
}
```

Output:

```
>>> go run main.go
[0 0 0 0 0]
5
8
```

> [!important]
> **Note**
>
> The default zero value for integers is 0. When working with arrays, remember that the array's capacity is equal to its length. However, for slices, the capacity begins from the first element accessed in the underlying array.

Consider the following example, which compares the capacities of an array and a slice derived from that array:

```
package main

import "fmt"

func main() {
    arr := [10]int{10, 20, 30, 40, 50, 60, 70, 80, 90, 100}
    slice := arr[1:8]
    fmt.Println(cap(arr))
    fmt.Println(cap(slice))
}
```

Output:

```
>>> go run main.go
10
9
```

Since the slice starts at index 1, its capacity is 9.

---

## Slices as References

Because a slice is a reference to an underlying array, modifying an element in the slice will also modify the corresponding element in the array. However, keep in mind that the slice maintains its own indexing starting at 0; therefore, the index in the slice does not always match the index in the underlying array.

![The image illustrates a slice and its index numbers from an underlying array, highlighting the relationship between them.](https://kodekloud.com/kk-media/image/upload/v1752877706/notes-assets/images/Golang-Slices/frame_510.jpg)

![The image illustrates the relationship between a slice and its underlying array, showing their respective index numbers and values.](https://kodekloud.com/kk-media/image/upload/v1752877706/notes-assets/images/Golang-Slices/frame_520.jpg)

Below is an example that demonstrates modifying a slice and how the change reflects in the underlying array:

```
package main

import "fmt"

func main() {
    arr := [5]int{10, 20, 30, 40, 50}
    // Create a slice containing indices 0, 1, and 2.
    slice := arr[:3]
    fmt.Println("Before modification:")
    fmt.Println("Array:", arr)
    fmt.Println("Slice:", slice)

    // Modify the element at index 1 in the slice.
    slice[1] = 9000

    fmt.Println("After modification:")
    fmt.Println("Array:", arr)
    fmt.Println("Slice:", slice)
}
```

After you run the program, you'll see that the change in the slice directly affects the underlying array.

---

## Appending Elements to a Slice

Appending new elements to a slice is done using the built-in `append` function. This function takes the original slice followed by new values, and returns a new slice containing both the existing and added elements. If the underlying array lacks sufficient capacity, a new, larger array is allocated—often doubling the previous capacity.

The syntax of the `append` function is as follows:

```
// General syntax:
func append(s []T, vs ...T) []T

// Example usage:
slice = append(slice, 10, 20, 30)
```

Consider this scenario: You start with an underlying array and create a slice from index 1 to 3 (which has a length of 2 and capacity of 3). Then, you append the element 900:

```
slice := arr[1:3]
slice_1 := append(slice, 900)
```

If you need to append more elements (for example, -90 and 500), and if the original capacity is insufficient, the `append` function allocates a new array with increased capacity. The following complete example demonstrates this behavior:

```
package main

import "fmt"

func main() {
    arr := [4]int{10, 20, 30, 40}
    slice := arr[1:3]

    fmt.Println("Original slice:", slice)
    fmt.Println("Length:", len(slice))
    fmt.Println("Capacity:", cap(slice))

    // Append values to the slice.
    slice = append(slice, 900, -90, 50)

    fmt.Println("Updated slice:", slice)
    fmt.Println("New length:", len(slice))
    fmt.Println("New capacity:", cap(slice))
}
```

Additionally, you can append one slice to another by using the three dots (`...`) operator, which unpacks all elements from the second slice:

```
slice = append(slice, anotherSlice...)
```

For example:

```
package main

import "fmt"

func main() {
    arr := [5]int{10, 20, 30, 40, 50}
    slice := arr[:2]
    arr_2 := [5]int{5, 15, 25, 35, 45}
    slice_2 := arr_2[:2]
    new_slice := append(slice, slice_2...)
    fmt.Println(new_slice)
}
```

Output:

```
>>> go run main.go
[10 20 5 15]
```

---

## Deleting Elements from a Slice

Deleting an element from a slice involves creating a new slice that omits the undesired element. This is typically achieved by:

1.  Slicing elements before the target index.
2.  Slicing elements after the target index.
3.  Appending the two slices together.

For example, to delete the element at index 2 (which is the element 30):

```
package main

import "fmt"

func main() {
    arr := [5]int{10, 20, 30, 40, 50}
    i := 2  // Index to delete (element 30)
    fmt.Println("Original array:", arr)

    slice_1 := arr[:i]      // Elements before index 2: [10, 20]
    slice_2 := arr[i+1:]    // Elements after index 2: [40, 50]

    newSlice := append(slice_1, slice_2...)
    fmt.Println("New slice (after deletion):", newSlice)
}
```

After execution, the new slice does not include the element at index 2.

---

## Copying Elements Between Slices

Go provides a built-in `copy` function to copy elements from one slice to another. This function returns the number of elements that were successfully copied, which is the minimum of the lengths of the source and destination slices. The syntax is:

```
// Syntax:
func copy(dst, src []Type) int

// Example:
num := copy(dest_slice, src_slice)
```

Ensure that both slices are of the same data type. Consider the following example:

```
package main

import "fmt"

func main() {
    src_slice := []int{10, 20, 30, 40, 50}
    dest_slice := make([]int, 3)  // Destination slice with length and capacity 3
    num := copy(dest_slice, src_slice)
    fmt.Println(dest_slice)
    fmt.Println("Number of elements copied:", num)
}
```

Output:

```
>>> go run main.go
[10 20 30]
Number of elements copied: 3
```

Only three elements are copied because the destination slice's length is 3.

---

## Looping Through Slices

Looping through a slice is similar to iterating over an array. The `range` keyword offers a concise way to access both the index and value of each element in the slice. Here's an example:

```
package main

import "fmt"

func main() {
    arr := []int{10, 20, 30, 40, 50}
    for index, value := range arr {
        fmt.Println(index, "=>", value)
    }
}
```

If you only need the values and not the indices, you can use the underscore (`_`) to ignore the index:

```
package main

import "fmt"

func main() {
    arr := []int{10, 20, 30, 40, 50}
    for _, value := range arr {
        fmt.Println(value)
    }
}
```

Output:

```
>>> go run main.go
10
20
30
40
50
```

---

That covers the basics of slices in Go. With these examples and explanations, you are now ready to implement slices effectively in your Go programs. Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/golang/module/d42c8657-2eaa-4e17-8605-277e81ac1176/lesson/dcb45d41-6c98-4f64-85e7-4364f068bac7)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/golang/module/d42c8657-2eaa-4e17-8605-277e81ac1176/lesson/50b246ac-129e-4b74-be05-84bba4d9aa95)**
>
> Practice lab
