# Comparing Structs - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Golang/Struct-Methods-and-Interfaces/Comparing-Structs)

---

## Table of Contents

- Comparing Structs
  - Comparing Structs of Different Types
  - Comparing Structs of the Same Type
  - Summary
  - Watch Video
  - Practice Lab

---

## Content

Golang

Struct Methods and Interfaces

# Comparing Structs

This lesson explains how to compare structs in Go, focusing on type compatibility and field equality. You'll learn how the equality operators (== and !=) behave when applied to structs of both the same and different types.

## Comparing Structs of Different Types

When comparing two structs of different types, Go raises a compile-time error. Consider the example below where we define two separate struct types, s1 and s2, each containing an integer field x. In the code, we create an instance of each type and attempt to compare them using the equality operator.

```
package main


import "fmt"


type s1 struct {
    x int
}


type s2 struct {
    x int
}


func main() {
    c := s1{x: 5}
    c1 := s2{x: 5}
    if c == c1 {
        fmt.Println("yes")
    }
}
```

> [!important]
> **Warning**
>
> Attempting to compare struct instances of different types (s1 and s2) results in the error:
> "Invalid operation: c == c1 (mismatched types s1 and s2)".
> Ensure that both structs are of the same type before comparing them.

## Comparing Structs of the Same Type

Next, let's examine how to compare struct variables when they belong to the same type. In this example, we define a single struct type, s1, and create three variables in the main function. Variables c and c2 are initialized with the same value (5) while c1 is assigned a different value (6). The code then demonstrates both inequality and equality checks.

```
package main


import "fmt"


type s1 struct {
    x int
}


func main() {
    c := s1{x: 5}
    c1 := s1{x: 6}
    c2 := s1{x: 5}


    if c != c1 {
        fmt.Println("c and c1 have different values")
    }
    if c == c2 {
        fmt.Println("c is same as c2")
    }
}
```

Running this program produces the following output:

```
>>> go run main.go
c and c1 have different values
c is same as c2
```

In this case, the first condition evaluates to true because the field x in variable c (5) does not match the value in c1 (6). The second condition confirms that c and c2 are equal since both have the same value for x.

## Summary

In this lesson, you learned how to compare structs in Go, covering the following key points:

- Struct equality operators (== and !=) can only be utilized if both operands are of the same type.
- Comparing structs of different types will result in a compile-time error.
- When comparing structs of the same type, all corresponding fields must hold equal values for the structs to be considered equal.

> [!important]
> **Note**
>
> Experiment with these examples to solidify your understanding of struct comparisons in Go. For further learning, explore additional Go concepts in the [Go Documentation](https://golang.org/doc/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/golang/module/62591a5f-ea7d-40f5-923f-5b248d6b565b/lesson/bdfaf2aa-e98e-495d-b0cd-1a7754d550f3)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/golang/module/62591a5f-ea7d-40f5-923f-5b248d6b565b/lesson/f8c9a38d-a535-445e-8da9-7dbf6308258b)**
>
> Practice lab
