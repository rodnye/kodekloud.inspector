# Instructions and Data Types - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Exploring-WebAssembly-WASM/WebAssembly-Core-Concepts/Instructions-and-Data-Types)

---

## Table of Contents

- Instructions and Data Types
  - WebAssembly Instructions
  - WebAssembly Data Types
  - Fundamental WebAssembly Instructions
  - Further Reading
  - Watch Video
    - Basic Arithmetic Examples

---

## Content

Exploring WebAssembly (WASM)

WebAssembly Core Concepts

# Instructions and Data Types

In this guide, we’ll dive into WebAssembly’s core instructions (the verbs) and data types (the nouns) that power efficient, predictable execution in browsers and other WASM runtimes. By mastering these fundamentals, you can write low-level modules that perform reliably across platforms.

## WebAssembly Instructions

WebAssembly instructions are low-level opcodes executed by the WASM virtual machine. Because they resemble machine code more than high-level languages, browsers can optimize them aggressively for speed.

### Basic Arithmetic Examples

- `i32.add` ‒ adds two 32-bit integers
- `f64.sub` ‒ subtracts one 64-bit float from another

```
i32.add    ;; adds two i32 values
f64.sub    ;; subtracts one f64 value from another
```

Each instruction strictly enforces its operand types. Supplying mismatched types (e.g., passing a boolean into an arithmetic opcode) will trigger a runtime trap.

> [!important]
> **Warning**
>
> Always verify operand types before invoking an instruction. WebAssembly performs no implicit conversions and will trap on type mismatches.

## WebAssembly Data Types

Choosing the right data type in WebAssembly ensures efficient memory usage and accurate calculations. For instance, consider a web app that displays two temperature readings:

- 25 °C (an integer)
- 25.5 °C (a decimal)

In WASM you’d represent these as:

- 25 °C → `i32`
- 25.5 °C → `f64`

![The image illustrates WebAssembly data types, showing temperature values (25°C and 25.5°C) alongside a code snippet with "i32" and "f64" data types.](https://kodekloud.com/kk-media/image/upload/v1752874883/notes-assets/images/Exploring-WebAssembly-WASM-Instructions-and-Data-Types/webassembly-data-types-temperature-code.jpg)

Below is a quick overview of the core WebAssembly types:

| Data Type   | Size & Kind                 | Use Case                             |
| ----------- | --------------------------- | ------------------------------------ |
| `i32`       | 32-bit integer              | Counters, array indices              |
| `i64`       | 64-bit integer              | High-precision integer math          |
| `f32`       | 32-bit floating point       | Graphics, simple physics             |
| `f64`       | 64-bit floating point       | Scientific calculations, audio DSP   |
| `v128`      | 128-bit SIMD vector         | Parallel data processing             |
| `funcref`   | Reference to a function     | Indirect calls, function tables      |
| `externref` | Reference to external value | Interop with host (e.g., JavaScript) |

![The image is a diagram showing WebAssembly data types, categorized into integers (i32, i64), floating-point numbers (f32, f64), and others (v128, funcref, externref).](https://kodekloud.com/kk-media/image/upload/v1752874885/notes-assets/images/Exploring-WebAssembly-WASM-Instructions-and-Data-Types/wasm-data-types-diagram.jpg)

## Fundamental WebAssembly Instructions

WebAssembly categorizes its instructions into arithmetic, comparison, control flow, and memory operations. Here’s a concise reference:

```
;; Arithmetic
i32.add      ;; add two 32-bit integers
i64.sub      ;; subtract two 64-bit integers
f32.mul      ;; multiply two 32-bit floats
f64.div      ;; divide two 64-bit floats


;; Comparison
i32.eq       ;; equal? (32-bit integers)
f64.ne       ;; not equal? (64-bit floats)
i32.lt_s     ;; less than (signed 32-bit integers)
f32.ge       ;; greater than or equal (32-bit floats)


;; Control Flow
block        ;; start a block
loop         ;; start a loop
if           ;; conditional branch
br           ;; branch to a label


;; Memory
i32.load     ;; load a 32-bit integer from memory
f64.store    ;; store a 64-bit float to memory
memory.size  ;; query current memory pages
memory.grow  ;; expand memory by pages
```

## Further Reading

- [Official WebAssembly Specification](https://webassembly.github.io/spec/core/)
- [MDN Web Docs: WebAssembly](https://developer.mozilla.org/en-US/docs/WebAssembly)
- [WebAssembly on GitHub](https://github.com/WebAssembly)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/exploring-webassembly-wasm/module/50924ac0-6bb9-4e73-975d-55fc8d997574/lesson/da693135-cf92-4a49-a2da-8fe0b89ead2e)**
>
> Watch video content
