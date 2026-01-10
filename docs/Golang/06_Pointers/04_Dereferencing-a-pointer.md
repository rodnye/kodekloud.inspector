# Dereferencing a pointer - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Golang/Pointers/Dereferencing-a-pointer)

---

## Table of Contents

- Dereferencing a pointer
  - Basic Syntax
  - Example 1: Simple Dereferencing
  - Example 2: Practical Pointer Dereferencing in Go
  - Watch Video
  - Practice Lab

---

## Content

Golang

Pointers

# Dereferencing a pointer

In this article, we explore how to dereference pointers in Go. Dereferencing a pointer means accessing the value stored in the memory address that the pointer holds.

> [!important]
> **Understanding Dereferencing**
>
> By placing the dereference operator (an asterisk) before a pointer, you gain access to the value stored in the pointer’s referenced memory location. Moreover, you can modify the value by using the dereference operator in an assignment.

## Basic Syntax

To read and modify the value of the variable pointed to by a pointer, use the following syntax:

```
*<pointer_name>
*<pointer_name> = <new_value>
```

## Example 1: Simple Dereferencing

Consider this example where we have a variable `x` holding a numeric value and a pointer `ptr` that stores the address of `x`:

```
x := 77
var ptr *int := &x
```

Here, the pointer `ptr` stores an address (e.g., 0x0301). When we dereference `ptr` and assign a new value, `x` is updated accordingly:

```
x := 77
var ptr *int = &x
*ptr = 100
```

## Example 2: Practical Pointer Dereferencing in Go

This Go program demonstrates a practical application of pointer dereferencing using a string variable. Initially, the string variable `s` is set to "hello". We then create a pointer `ps` (using the shorthand operator) to store the address of `s`. By dereferencing `ps`, we update the value of `s` from "hello" to "world". The program prints the type and the updated value of `s`.

```
package main
import "fmt"


func main() {
    s := "hello"
    fmt.Printf("%T %v\n", s, s)
    ps := &s
    *ps = "world"
    fmt.Printf("%T %v\n", s, s)
}
```

When you run this program, the output will be:

```
>>> go run main.go
string hello
string world
```

> [!important]
> **Pro Tip**
>
> Regular practice of these examples in your Go development environment will help reinforce your understanding of pointer dereferencing.

That concludes our guide on dereferencing pointers in Go. To further enhance your skills, be sure to explore additional concepts in the [Go Documentation](https://golang.org/doc/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/golang/module/ee351938-02d0-4200-ac8f-78b0da517e29/lesson/1fd616b4-0b19-4ffc-a5e8-dba23a449645)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/golang/module/ee351938-02d0-4200-ac8f-78b0da517e29/lesson/a42a8c45-60c8-435c-8a9a-a31f726a0dbc)**
>
> Practice lab
