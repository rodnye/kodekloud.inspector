# Section Summary - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Exploring-WebAssembly-WASM/Getting-Started-with-WebAssembly/Section-Summary)

---

## Table of Contents

- Section Summary
  - Key Topics
  - Useful Resources
  - Watch Video

---

## Content

Exploring WebAssembly (WASM)

Getting Started with WebAssembly

# Section Summary

In this section, we’ll explore the fundamentals of WebAssembly and its practical applications:

- WebAssembly Binary Format (WASM)
- Human-readable Text Format (WAT)
- WebAssembly System Interface (WASI)

You’ll build a simple “Hello World” module in C, C++, or Rust, compile it to WASM, and embed it in a web page using the WebAssembly JavaScript API. Hands-on labs will guide you through environment setup, compilation, and execution in both browser and WASI runtimes.

## Key Topics

| Topic                        | Description                                                      | Reference                                                                                     |
| ---------------------------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| WebAssembly Binary Format    | Compact bytecode optimized for performance                       | [WASM Spec](https://webassembly.github.io/spec/)                                              |
| Text Format (WAT)            | Readable s-expression syntax that assembles into WASM binary     | [MDN WAT Guide](https://developer.mozilla.org/docs/WebAssembly/Understanding_the_text_format) |
| WebAssembly System Interface | POSIX-like APIs for file I/O and networking in WASI environments | [WASI Docs](https://wasi.dev/)                                                                |
| Module Creation & Execution  | Compiling from Rust/C/C++ to WASM and running modules locally    | [wasm-bindgen](https://github.com/rustwasm/wasm-bindgen)                                      |
| JavaScript Integration       | Loading and calling WASM functions via the WebAssembly JS API    | [MDN WebAssembly API](https://developer.mozilla.org/docs/WebAssembly/JavaScript_interface)    |

> [!important]
> **Prerequisites**
>
> Make sure you have:
>
> - Node.js (v14 or later)
> - Rust/C/C++ toolchain with WebAssembly targets
> - A modern browser supporting WASM

By the end of this lesson, you will be able to:

- Differentiate between WASM binary and text formats
- Compile and run WebAssembly modules locally and in the browser
- Leverage WASI for system-level interactions
- Embed and interact with WebAssembly modules from JavaScript

![The image lists objectives related to WebAssembly, including working with its formats, creating and running modules, and gaining practical experience through hands-on demos.](https://kodekloud.com/kk-media/image/upload/v1752874861/notes-assets/images/Exploring-WebAssembly-WASM-Section-Summary/webassembly-objectives-modules-demos.jpg)

## Useful Resources

- [Official WebAssembly Documentation](https://webassembly.org/docs/)
- [MDN WebAssembly Guides](https://developer.mozilla.org/docs/WebAssembly)
- [Wasmtime Runtime](https://github.com/bytecodealliance/wasmtime)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/exploring-webassembly-wasm/module/35f32a4b-b0a4-45ba-a4a8-827feffc5940/lesson/59f1ae71-daf3-426d-af9d-218d300c4b81)**
>
> Watch video content
