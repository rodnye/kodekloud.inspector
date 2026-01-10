# The Slice Type - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Rust-Programming/Ownership/The-Slice-Type)

---

## Table of Contents

- The Slice Type
  - What Is a Slice?
  - Array Slices in Rust
  - String Slices in Rust
  - Mutable Slices in Rust
  - Advantages of Using Slices
  - Watch Video

---

## Content

Rust Programming

Ownership

# The Slice Type

In this lesson, we'll explore slices in Rust—a powerful feature that allows you to reference a contiguous sequence of elements within a collection without creating a copy. Slices are commonly used with arrays, vectors, and strings, offering both efficiency and safety.

## What Is a Slice?

A slice is a reference to a segment of a collection. Instead of copying data, a slice provides a window into an array, vector, or string. This is particularly useful when you want to work with a subset of data without the overhead of duplication.

The syntax for creating a slice uses a range within square brackets:

```
let slice = &arr[start_index..end_index];
```

- The start index is **inclusive**, which means it marks the beginning of the slice.
- The end index is **exclusive**, indicating where the slice ends.

> [!important]
> **Note**
>
> Remember that the range syntax helps prevent out-of-bounds errors by enforcing that the slice only covers valid indices of the collection.

## Array Slices in Rust

Consider an array with the elements `[1, 2, 3, 4, 5]`. You can create a slice that references specific elements—in this case, from index 1 up to, but not including, index 4. The resulting slice contains the values `2`, `3`, and `4`.

```
fn main() {
    let arr = [1, 2, 3, 4, 5];
    let slice = &arr[1..4]; // Slice from index 1 to 4 (exclusive)
    println!("{:?}", slice);
}
```

The diagram below illustrates the array and its indices:

```
| 1 | 2 | 3 | 4 | 5 |
0 1 2 3 4 (array indices)
```

When executed, the code produces the output: `[2, 3, 4]`.

## String Slices in Rust

Slices work similarly with strings, allowing you to reference a portion of a string without copying it. For example, consider the string `"hello, world"`:

```
fn main() {
    let s = String::from("hello, world");
    let hello = &s[0..5];  // Slice from index 0 to 5 (exclusive)
    let world = &s[7..12]; // Slice from index 7 to 12 (exclusive)
    println!("{}, {}", hello, world); // Output: hello, world
}
```

In this example:

- The slice from index `0` to `5` returns `"hello"`.
- The slice from index `7` to `12` returns `"world"`.

When compiled and executed, the code outputs: `hello, world`.

## Mutable Slices in Rust

Mutable slices allow you to modify the referenced elements directly. In the following example, we start with a mutable array and create a mutable slice. Then, we update an element within the slice:

```
fn main() {
    let mut arr = [1, 2, 3, 4, 5];
    let slice = &mut arr[1..4]; // Mutable slice from index 1 to 4 (exclusive)
    slice[0] = 10; // Modify the first element of the slice
    println!("{:?}", arr); // Output: [1, 10, 3, 4, 5]
}
```

Even though the slice starts at index `1`, modifying `slice[0]` corresponds to changing the second element of the original array.

> [!important]
> **Warning**
>
> Always remember that modifying slices can affect the original collection. Ensure that your slice does not outlive the data it references to avoid unexpected behavior.

## Advantages of Using Slices

Slices offer several benefits:

| Advantage                   | Description                                                                                    | Example Use Case                                          |
| --------------------------- | ---------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| Memory Efficiency           | References parts of a collection without copying data, saving memory and boosting performance. | Working with large datasets without duplication.          |
| Safety with Bounds Checking | Automatically enforces boundaries to prevent accessing invalid memory locations.               | Preventing runtime errors when slicing arrays or strings. |

By using slices, you can write more efficient and robust Rust code.

Explore more about Rust slices to enhance your programming efficiency and ensure better memory management.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/rust/module/48702f90-cc95-4c81-939c-a4565969de71/lesson/3f1a164b-1daa-456d-b1cd-dec4d69121e1)**
>
> Watch video content
