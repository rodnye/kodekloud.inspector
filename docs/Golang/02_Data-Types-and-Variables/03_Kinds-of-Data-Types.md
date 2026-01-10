# Kinds of Data Types - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Golang/Data-Types-and-Variables/Kinds-of-Data-Types)

---

## Table of Contents

- Kinds of Data Types
  - Numbers
  - Strings
  - Booleans
  - Arrays, Slices, and Maps
  - Watch Video
  - Practice Lab
    - Integers
    - Floating-point Numbers
    - Example Code Block
    - Data Structures Overview

---

## Content

Golang

Data Types and Variables

# Kinds of Data Types

In this article, we explore the various data types available in Go, focusing on numbers, strings, and booleans. Understanding these types is essential for writing efficient Go programs.

## Numbers

Go supports two primary numeric types: integers and floating-point numbers.

### Integers

The `int` type in Go represents signed integers, which means it can store both negative and positive numbers (e.g., -90, 453, 1000000). In addition to `int`, Go provides several specific integer types that vary in memory allocation:

- `int8` uses 8 bits (1 byte) and has a limited range.
- `uint16` uses 16 bits (2 bytes) to represent unsigned integers (only non-negative numbers, including 0).

![The image is a table showing integer data types and their memory usage, with "uint" meaning "unsigned integer." It lists uint8, uint16, uint32, uint64, int8, int16, int32, int64, and int.](https://kodekloud.com/kk-media/image/upload/v1752877714/notes-assets/images/Golang-Kinds-of-Data-Types/frame_70.jpg)

> [!important]
> **Note**
>
> When choosing an integer type in your Go programs, consider the required range of values and memory footprint.

### Floating-point Numbers

Floating-point numbers, or floats, are numbers that include a decimal component. Go provides two floating-point types:

- `float32` (single precision, 32 bits or 4 bytes)
- `float64` (double precision, 64 bits or 8 bytes)

For most cases, especially on modern CPUs, `float64` is recommended due to its higher precision. Examples of floating-point numbers include: 80.09, 0.775, and 50.76.

![The image shows a table comparing float data types: float32 uses 32 bits or 4 bytes, and float64 uses 64 bits or 8 bytes.](https://kodekloud.com/kk-media/image/upload/v1752877715/notes-assets/images/Golang-Kinds-of-Data-Types/frame_110.jpg)

## Strings

A string in Go is a sequence of characters that may include letters, numbers, and symbols. Strings are created using the `string` type and must be enclosed in double quotes. For example:

- "abc"
- "90%"
- "home"
- "cat"
- "kodekloud"

![The image illustrates examples of strings, including "abc", "90%", "home", "cat", and "kodekloud", with a focus on the concept of strings in programming.](https://kodekloud.com/kk-media/image/upload/v1752877716/notes-assets/images/Golang-Kinds-of-Data-Types/frame_140.jpg)

In Go, a string generally occupies 16 bytes of memory.

## Booleans

The boolean data type in Go is defined using the `bool` keyword. Booleans can only take one of the two values: `true` or `false` (always in lowercase). Unlike some other programming languages that allow numeric representations (e.g., 1 and 0), Go requires an explicit boolean value. A boolean in Go occupies 1 byte of memory.

![The image illustrates the Boolean data type, showing "bool" with values "true" and "false."](https://kodekloud.com/kk-media/image/upload/v1752877717/notes-assets/images/Golang-Kinds-of-Data-Types/frame_160.jpg)

> [!important]
> **Quick Tip**
>
> When working with booleans in Go, always use `true` or `false` explicitly rather than numeric equivalents.

## Arrays, Slices, and Maps

Beyond the basic data types, Go offers more complex data structures such as arrays, slices, and maps. These structures are fundamental for managing collections of data.

### Example Code Block

Below is an example showcasing arrays, slices, and maps in Go:

```
// Arrays & Slices
numbers := [4]int{1, 2, 4, 9}
words := []string{"foo", "bar"}
floats := []float64{7.0, 9.43, 0.65}


// Maps
// In maps, keys can be of types like strings or integers.
mapping := map[string]int{
    "x": 30,
}
numberMap := map[int]int{
    1: 100,
}
keyValueMap := map[string]string{
    "key": "value",
}
```

### Data Structures Overview

| Data Structure | Description                                  | Example Syntax           |
| -------------- | -------------------------------------------- | ------------------------ |
| Array          | Fixed-size sequence of elements              | `[4]int{1,2,4,9}`        |
| Slice          | Dynamically-sized, flexible view into arrays | `[]string{"foo", "bar"}` |
| Map            | Collection of key-value pairs                | `map[string]int{"x":30}` |

That concludes our overview of the primary data types in Go. Now, let's dive into some hands-on practice with these concepts to strengthen your Go programming skills.

For more information, check out the [Go Documentation](https://golang.org/doc/) and dive deeper into Go's robust type system.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/golang/module/eeafa284-50db-4de2-a58a-759d3926fced/lesson/cc76497a-c6ca-47fd-b23c-c808d1c2d6b1)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/golang/module/eeafa284-50db-4de2-a58a-759d3926fced/lesson/095b2a5a-1443-44f2-a747-27ab864aca88)**
>
> Practice lab
