# Understanding the WebAssembly Text Format WAT - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Exploring-WebAssembly-WASM/Getting-Started-with-WebAssembly/Understanding-the-WebAssembly-Text-Format-WAT)

---

## Table of Contents

- Understanding the WebAssembly Text Format WAT
  - 1. A Simple Add Function
  - 2. Grammar & Whitespace
  - 3. Adding Comments
  - 4. Lexical Structure
  - 5. Numeric and Vector Types
  - 6. Control Flow
  - 7. Memory and Tables
  - Links and References
  - Watch Video
    - 5.1 Floating-Point Addition
    - 5.2 SIMD Vector Addition
    - 6.1 Conditional Branching
    - 6.2 Loops and Breaks
    - 7.1 Linear Memory
    - 7.2 Tables & Indirect Calls

---

## Content

Exploring WebAssembly (WASM)

Getting Started with WebAssembly

# Understanding the WebAssembly Text Format WAT

WebAssembly Text Format (WAT) is a human-readable, S-expression syntax for writing, debugging, and inspecting WebAssembly (WASM) modules. By representing the binary format in text form, WAT helps bridge the gap between high-level languages and the compact WebAssembly binary.

## 1\. A Simple Add Function

Here’s a minimal WAT module that exports a function `add` taking two 32-bit integers and returning their sum:

```
(module
  (func $add (param $a i32) (param $b i32) (result i32)
    get_local $a
    get_local $b
    i32.add)
  (export "add" (func $add))
)
```

- **`(module …)`** wraps the entire definition.
- **`(func $add …)`** declares a function named `$add`.
- **`(param $a i32)`**, **`(param $b i32)`** specify two 32-bit integer inputs.
- **`(result i32)`** marks the return type.
- Instructions:
  - `get_local $a`, `get_local $b` push parameters onto the stack.
  - `i32.add` pops both values, adds them, and pushes the result.
- **`(export "add" (func $add))`** makes the function available to the host environment.

## 2\. Grammar & Whitespace

WAT uses S-expressions; parentheses define hierarchy and whitespace (spaces, newlines) separates tokens for readability:

```
(module
  (func $add
    (param $a i32) (param $b i32)
    (result i32)
    get_local $a
    get_local $b
    i32.add)
  (export "add" (func $add))
)
```

## 3\. Adding Comments

Inline comments start with `;;`:

```
(module
  ;; Define a function to add two 32-bit integers
  (func $add (param $a i32) (param $b i32) (result i32)
    get_local $a
    get_local $b
    i32.add)
  (export "add" (func $add))
)
```

## 4\. Lexical Structure

- **Identifiers** begin with `$` (e.g., `$add`, `$ptr`).
- **Types** include `i32`, `f32`, `v128`, etc.
- **Tokens** are keywords, numbers, or symbols.
- **Whitespace** and **comments** separate tokens but do not affect execution.

## 5\. Numeric and Vector Types

WAT supports multiple primitive types. Below is a quick reference:

| Type | Description               |
| ---- | ------------------------- |
| i32  | 32-bit signed integer     |
| f32  | 32-bit IEEE-754 float     |
| v128 | 128-bit SIMD vector value |

### 5.1 Floating-Point Addition

```
(module
  ;; Integer addition
  (func $add (param $a i32) (param $b i32) (result i32)
    get_local $a
    get_local $b
    i32.add)

  ;; Floating-point addition
  (func $add_f32 (param $a f32) (param $b f32) (result f32)
    get_local $a
    get_local $b
    f32.add)

  (export "add"      (func $add))
  (export "add_f32"  (func $add_f32))
)
```

### 5.2 SIMD Vector Addition

```
(module
  ;; Add two 128-bit SIMD vectors
  (func $add_vectors (param $v1 v128) (param $v2 v128) (result v128)
    get_local $v1
    get_local $v2
    v128.add)
  (export "add_vectors" (func $add_vectors))
)
```

> [!important]
> **Note**
>
> SIMD operations require a WebAssembly engine with the SIMD extension enabled.

## 6\. Control Flow

### 6.1 Conditional Branching

Use `if`, `else`, and `end` to branch based on a condition:

```
(func $add_nonneg (param $a f32) (param $b f32) (result f32)
  get_local $a
  f32.const 0
  f32.lt               ;; compare a < 0
  if (result f32)
    f32.const 0        ;; return 0 if negative
  else
    get_local $a
    get_local $b
    f32.add            ;; otherwise add
  end)
```

### 6.2 Loops and Breaks

Accumulate the sum of an array of `i32` values:

```
(module
  (func $sum_array (param $ptr i32) (param $length i32) (result i32)
    (local $i i32)    ;; index
    (local $sum i32)  ;; accumulator

    (block $exit
      (loop $loop
        ;; break if $i == $length
        (br_if $exit (i32.eq (get_local $i) (get_local $length)))

        ;; load element and add
        (set_local $sum
          (i32.add
            (get_local $sum)
            (i32.load (get_local $ptr))))

        ;; advance pointer and counter
        (set_local $ptr (i32.add (get_local $ptr) (i32.const 4)))
        (set_local $i   (i32.add (get_local $i)   (i32.const 1)))

        (br $loop)
      )
    )
    (get_local $sum)
  )
  (export "sum_array" (func $sum_array))
)
```

> [!important]
> **Warning**
>
> Deeply nested loops may impact performance in some WASM runtimes. Benchmark before optimizing.

## 7\. Memory and Tables

### 7.1 Linear Memory

Declare a 64 KiB memory and load two integers from offsets:

```
(module
  (memory 1)  ;; 1 page = 64 KiB

  (func $add_from_mem (result i32)
    i32.load offset=0    ;; load at byte 0
    i32.load offset=4    ;; load at byte 4
    i32.add)

  (export "add_from_mem" (func $add_from_mem))
)
```

### 7.2 Tables & Indirect Calls

Create a function table for dynamic dispatch:

```
(module
  (memory 1)
  (table 2 anyfunc)

  ;; Define two operations
  (func $add_i32  (param $a i32) (param $b i32) (result i32)
    get_local $a
    get_local $b
    i32.add)
  (func $add_f32  (param $a f32) (param $b f32) (result f32)
    get_local $a
    get_local $b
    f32.add)

  ;; Initialize table entries
  (elem (i32.const 0) $add_i32 $add_f32)

  ;; Type for indirect calls
  (type $i32_add_t (func (param i32 i32) (result i32)))

  (func $call_by_index (param $idx i32) (result i32)
    i32.const 10        ;; first argument
    i32.const 20        ;; second argument
    get_local $idx      ;; table index
    call_indirect (type $i32_add_t)
  )

  (export "add_i32"        (func $add_i32))
  (export "add_f32"        (func $add_f32))
  (export "call_by_index"  (func $call_by_index))
)
```

## Links and References

- [WebAssembly Spec: WAT Format](https://webassembly.github.io/spec/core/text/index.html)
- [WebAssembly Concepts](https://developer.mozilla.org/en-US/docs/WebAssembly)
- [SIMD in WebAssembly](https://github.com/WebAssembly/simd)
- [Rust and WAT Integration](https://rustwasm.github.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/exploring-webassembly-wasm/module/35f32a4b-b0a4-45ba-a4a8-827feffc5940/lesson/4962256d-9db4-4127-a8d2-324c83a9c5e5)**
>
> Watch video content
