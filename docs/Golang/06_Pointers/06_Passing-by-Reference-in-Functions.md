# Passing by Reference in Functions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Golang/Pointers/Passing-by-Reference-in-Functions)

---

## Table of Contents

- Passing by Reference in Functions
  - Slices Example
  - Maps Example
  - Watch Video
  - Practice Lab

---

## Content

Golang

Pointers

# Passing by Reference in Functions

In this lesson, we'll explore how to pass variables by reference in functions using Golang pointers. Unlike passing by value, where a copy of the variable is sent to the function, passing by reference allows a function to modify the original variable by using its address.

Golang supports pointers, which let you pass the memory address of a variable to a function. When you pass a pointer, any changes made inside the function affect the original variable.

For example, consider a variable "a" created in the main function. When we call the function modify, we pass the address of "a". Inside the modify function, dereferencing the pointer updates the original variable. In the following example, if "a" is modified from "hello" to "world", the change is visible after the function call.

Below is the complete code demonstrating this concept:

```
package main

import "fmt"

func modify(s *string) {
	*s = "world"
}

func main() {
	a := "hello"
	fmt.Println(a)
	modify(&a)
	fmt.Println(a)
}
```

Console output:

```
>>> go run main.go
hello
world
```

> [!important]
> **Note**
>
> In the example above:
>
> - A string variable "a" is initialized with "hello".
> - Passing `&a` sends the address of "a" to the `modify` function.
> - Inside the function, dereferencing the pointer (`*s`) updates the value.
> - The modified value is printed after the function call.

Another key point in Golang is that slices and maps are passed by reference by default. This means modifications inside the function will affect the original data structure.

## Slices Example

Consider the following example where we update a slice:

```
package main

import "fmt"

func modify(s []int) {
	s[0] = 100
}

func main() {
	slice := []int{10, 20, 30}
	fmt.Println(slice)
	modify(slice)
	fmt.Println(slice)
}
```

Console output:

```
>>> go run main.go
[10 20 30]
[100 20 30]
```

> [!important]
> **Note**
>
> A slice in Go is a reference type. When you pass the slice to a function, it points to the same underlying array. Hence, changes inside the function are reflected in the original slice.

## Maps Example

Maps in Go also behave as reference types. When you pass a map to a function, any changes made to the map inside the function will affect the original map. Here’s an example:

```
package main

import "fmt"

func modify(m map[string]int) {
	m["K"] = 75
}

func main() {
	ascii_codes := make(map[string]int)
	ascii_codes["A"] = 65
	ascii_codes["F"] = 70
	fmt.Println(ascii_codes)
	modify(ascii_codes)
	fmt.Println(ascii_codes)
}
```

Console output:

```
>>> go run main.go
map[A:65 F:70]
map[A:65 F:70 K:75]
```

> [!important]
> **Note**
>
> In the above example:
>
> - A map named `ascii_codes` is created with key-value pairs.
> - The `modify` function adds a new key "K" with the value 75.
> - The changes are visible after running the function, confirming that maps are passed by reference.

This lesson demonstrated how pointers enable passing-by-reference in functions and how slices and maps inherently behave as references in Golang. With these concepts, you can efficiently manage data modifications within your functions.

Now, let's dive deeper by applying these concepts in practice.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/golang/module/ee351938-02d0-4200-ac8f-78b0da517e29/lesson/db985458-8adb-4d0b-9ec2-2cd07444c158)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/golang/module/ee351938-02d0-4200-ac8f-78b0da517e29/lesson/7421e704-1eea-4007-8ea9-e21e6dad929b)**
>
> Practice lab
