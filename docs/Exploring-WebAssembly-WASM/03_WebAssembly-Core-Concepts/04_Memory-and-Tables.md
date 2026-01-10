# Memory and Tables - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Exploring-WebAssembly-WASM/WebAssembly-Core-Concepts/Memory-and-Tables)

---

## Table of Contents

- Memory and Tables
  - WebAssembly Memory
  - WebAssembly Tables
  - Summary
  - Further Reading
  - Watch Video

---

## Content

Exploring WebAssembly (WASM)

WebAssembly Core Concepts

# Memory and Tables

In the WebAssembly ecosystem, two core components—**memory** and **tables**—provide structured storage and dynamic function lookup. Think of your application as a city:

- **Memory** is the land where data “buildings” (variables, arrays, structs) stand.
- **Tables** are the city directory listing services (function references) for quick access.

![The image illustrates the concept of a program as a city, with buildings representing functions and data, and memory and tables depicted as foundational elements.](https://kodekloud.com/kk-media/image/upload/v1752874886/notes-assets/images/Exploring-WebAssembly-WASM-Memory-and-Tables/program-as-city-functions-data-illustration.jpg)

## WebAssembly Memory

WebAssembly memory is a sandboxed, growable linear buffer of bytes. It holds everything from your module’s numeric data to string buffers.

| Feature    | Description                                                  |
| ---------- | ------------------------------------------------------------ |
| Continuous | Represented as one contiguous array of bytes                 |
| Resizable  | Can be expanded at runtime (within limits)                   |
| Isolated   | Sandboxed to prevent corruption of the host or other modules |

![The image is an illustration about WebAssembly Memory, highlighting its features as "Continuous" and "Resizable," with icons representing these concepts.](https://kodekloud.com/kk-media/image/upload/v1752874887/notes-assets/images/Exploring-WebAssembly-WASM-Memory-and-Tables/webassembly-memory-continuous-resizable.jpg)

> [!important]
> **Note**
>
> Out-of-bounds memory accesses in WebAssembly always trap, ensuring that modules cannot read or write arbitrary host memory.

You can define memory in your `.wat` module like this:

```
(module
  (memory $mem 1 2)    ;; initial size = 1 page (64KiB), max size = 2 pages
  ;; ...
)
```

And from JavaScript:

```
const wasm = await WebAssembly.instantiateStreaming(fetch('module.wasm'));
const memoryBuffer = new Uint8Array(wasm.instance.exports.memory.buffer);
// Read or write to memoryBuffer as needed
```

![The image illustrates a comparison between two concepts related to WebAssembly memory, with one side showing a warning symbol and the other a checkmark.](https://kodekloud.com/kk-media/image/upload/v1752874888/notes-assets/images/Exploring-WebAssembly-WASM-Memory-and-Tables/webassembly-memory-comparison-diagram.jpg)

## WebAssembly Tables

Tables are lookup structures for function references (and, with the **reference types** proposal, external references). They don’t contain code—only pointers—enabling **indirect calls** and dynamic dispatch.

![The image is a diagram titled "WebAssembly Tables," featuring icons representing "Dynamic Interaction" and "Function Calls" connected to a central icon resembling a notebook or directory.](https://kodekloud.com/kk-media/image/upload/v1752874889/notes-assets/images/Exploring-WebAssembly-WASM-Memory-and-Tables/webassembly-tables-diagram.jpg)

For instance, define a table of `funcref` entries:

```
(module
  (table $t 2 funcref)           ;; table with 2 function slots
  (elem (i32.const 0) $f1 $f2)   ;; initialize slots
  (func $f1 (result i32) (i32.const 42))
  (func $f2 (result i32) (i32.const 100))
  (func (export "call_indirect") (param i32) (result i32)
    (call_indirect (type $t) (local.get 0))
  )
)
```

When you call `call_indirect` with `0` or `1`, WebAssembly jumps to `$f1` or `$f2` respectively—just like dialing a number on a menu.

![The image illustrates a concept of WebAssembly tables, showing a grid connected to three groups of code symbols, labeled as "Graphics Renderer."](https://kodekloud.com/kk-media/image/upload/v1752874890/notes-assets/images/Exploring-WebAssembly-WASM-Memory-and-Tables/webassembly-tables-graphics-renderer.jpg)

> [!important]
> **Warning**
>
> If you call an uninitialized or out-of-bounds table index, WebAssembly will trap immediately.

With the **`externref`** feature, tables can also hold references to host objects (e.g., JS DOM nodes or game entities). This powerful extension enables seamless interoperability between WebAssembly modules and their host environment.

![The image is about "WebAssembly Tables" and features icons representing robustness and adaptability, with a central graphic of a web page and mobile device.](https://kodekloud.com/kk-media/image/upload/v1752874891/notes-assets/images/Exploring-WebAssembly-WASM-Memory-and-Tables/webassembly-tables-robustness-adaptability.jpg)

## Summary

WebAssembly’s memory and tables provide:

- Secure, linear storage for all data
- Dynamic, sandboxed function dispatch
- Runtime growth and module evolution without rewriting callers

Mastering these primitives is essential for building high-performance, modular WebAssembly applications that integrate smoothly with JavaScript or other host environments.

---

## Further Reading

- [MDN WebAssembly Memory](https://developer.mozilla.org/en-US/docs/WebAssembly/Memory)
- [MDN WebAssembly Table](https://developer.mozilla.org/en-US/docs/WebAssembly/Table)
- [WebAssembly Reference Types Proposal](https://github.com/WebAssembly/reference-types)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/exploring-webassembly-wasm/module/50924ac0-6bb9-4e73-975d-55fc8d997574/lesson/b2ee2fe6-dd5f-4edb-a398-a32890232c95)**
>
> Watch video content
