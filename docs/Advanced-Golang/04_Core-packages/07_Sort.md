# Sort - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Golang/Core-packages/Sort)

---

## Table of Contents

- Sort
  - Creating and Sorting an Integer Slice
  - Documentation Overview
  - Sorting a Slice of Strings
  - Summary
  - Watch Video

---

## Content

Advanced Golang

Core packages

# Sort

Hello everyone! In this lesson, we'll explore Go’s built-in sort package, a powerful part of the Go standard library that simplifies sorting for built-in types and user-defined container types alike. Sorting is ubiquitous in programming, and understanding how to leverage this package can notably enhance the performance and maintainability of your code.

Below, you'll find detailed examples on sorting slices of integers and strings.

–––––––

## Creating and Sorting an Integer Slice

To get started, create a slice of integers with random values:

```
package main


func main() {
	vars := []int{5, 2, 0, 3, 4, 9, 6}
}
```

Next, import the sort package and sort the integer slice using the `sort.Ints` function:

```
package main


import "sort"


func main() {
	vars := []int{5, 2, 0, 3, 4, 9, 6}
	sort.Ints(vars)
}
```

To verify the output, print the sorted slice:

```
package main


import (
	"fmt"
	"sort"
)


func main() {
	vars := []int{5, 2, 0, 3, 4, 9, 6}
	sort.Ints(vars)
	fmt.Println(vars)
}
```

Running the program should produce the following output:

```
go run main.go
[0 2 3 4 5 6 9]
```

> [!important]
> **Note**
>
> The `sort.Ints` function sorts the slice in increasing order, making it ideal for numerical data that requires ordering.

–––––––

## Documentation Overview

A review of the documentation for `sort.Ints` confirms its purpose: sorting a slice of integers in ascending order. Running a command such as `godoc sort` will display various methods and types provided by the package. For instance:

```
import (
	"fmt"
	"sort"
)


func main() {
	vars := []int{5, 2, 0, 3, 4, 9, 6}
	sort.Ints(vars)
	fmt.Println(vars)
}
```

The documentation includes type declarations and helper functions, such as:

```
type IntSlice []int
type Interface interface{ ... }
func Reverse(data Interface) Interface
type StringSlice []string
```

```
Desktop/kodekloud/learn via v1.19.3
```

These examples highlight that the sort package not only supports integers but also provides functionalities for sorting floats and strings.

–––––––

## Sorting a Slice of Strings

Sorting strings is equally straightforward. Use the `sort.Strings` function to sort a slice of strings:

```
package main


import (
	"fmt"
	"sort"
)


func main() {
	vars := []string{"Learning", "Golang", "on", "Kodekloud"}
	sort.Strings(vars)
	fmt.Println(vars)
}
```

Running the above program produces the following output:

```
go run main.go
[Golang Kodekloud Learning on]
```

> [!important]
> **Tip**
>
> Remember that each data type has its specific sorting function. Use `sort.Ints` for integers and `sort.Strings` for strings to ensure optimal performance.

–––––––

## Summary

This lesson provided an in-depth look at Go’s sort package and demonstrated how to efficiently sort slices containing various built-in types. Mastering these sorting functions not only simplifies code management but also improves performance in scenarios where data ordering is critical.

For further details, you can explore the following resources:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

Happy coding with Go!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-golang/module/c29202d1-1463-42eb-806b-0d6e38042661/lesson/ccd4ef12-eeed-47f5-8718-efa04b1cf79e)**
>
> Watch video content
