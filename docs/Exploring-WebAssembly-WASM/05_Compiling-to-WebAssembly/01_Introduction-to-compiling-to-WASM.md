# Introduction to compiling to WASM - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Exploring-WebAssembly-WASM/Compiling-to-WebAssembly/Introduction-to-compiling-to-WASM)

---

## Table of Contents

- Introduction to compiling to WASM
  - JavaScript Compilation in the Browser
  - WebAssembly Compilation Overview
  - Key WebAssembly Compilation Techniques
  - Links and References
  - Watch Video
    - Comparison of WASM Compilation Techniques

---

## Content

Exploring WebAssembly (WASM)

Compiling to WebAssembly

# Introduction to compiling to WASM

In this lesson, we’ll compare how JavaScript and WebAssembly handle compilation in the browser. We start by revisiting JavaScript’s just-in-time (JIT) approach and then explore WebAssembly’s ahead-of-time (AOT) plus JIT workflow.

## JavaScript Compilation in the Browser

Originally, JavaScript was interpreted line by line. Modern engines have evolved to use JIT compilation for better performance:

1.  Browser parses the JS source code.
2.  An Abstract Syntax Tree (AST) is generated.
3.  Code is translated into machine instructions either immediately (interpretation) or just before execution (JIT).
4.  Optimized machine code is cached for faster subsequent runs.

![The image illustrates the JavaScript compilation process, showing the flow from source code to parsing, creating an abstract syntax tree, and then either compilation or interpretation.](https://kodekloud.com/kk-media/image/upload/v1752874783/notes-assets/images/Exploring-WebAssembly-WASM-Introduction-to-compiling-to-WASM/javascript-compilation-process-diagram.jpg)

## WebAssembly Compilation Overview

WebAssembly adds an AOT phase before the browser sees your code:

- High-level languages (Rust, C, C++) compile to the WASM binary format offline.
- The binary contains compact, low-level instructions that are quick to parse.
- Upon loading, the browser’s JIT further translates WASM into optimized, device-specific machine code.

![The image illustrates WebAssembly compilation in a browser, highlighting its role in ensuring optimal performance through JIT (Just-in-Time) compilation.](https://kodekloud.com/kk-media/image/upload/v1752874784/notes-assets/images/Exploring-WebAssembly-WASM-Introduction-to-compiling-to-WASM/webassembly-compilation-jit-browser.jpg)

## Key WebAssembly Compilation Techniques

Building on JavaScript’s foundation, WebAssembly employs multiple tiers of compilation:

1.  **Baseline Compiler**  
    Quickly translates WASM binaries into a basic form of machine code, ensuring the application starts running with minimal delay.
2.  **Optimizing Compiler**  
    Runs alongside the baseline compiler to identify hotspots and refine machine code, improving performance for long-running tasks.
3.  **Streaming Compilation**  
    Begins converting chunks of the WASM binary as they arrive over the network, so most of the code is ready by the time the download finishes.

> [!important]
> **Note**
>
> Streaming compilation can significantly reduce startup latency, especially for large modules.

![The image illustrates WebAssembly compilation techniques, showing a process involving packets, hot swapping, and optimal compilation on a main thread.](https://kodekloud.com/kk-media/image/upload/v1752874786/notes-assets/images/Exploring-WebAssembly-WASM-Introduction-to-compiling-to-WASM/webassembly-compilation-techniques-diagram.jpg)

![The image illustrates WebAssembly compilation techniques, showing an array buffer, a compilation process, and a comparison between baseline and optimized functions.](https://kodekloud.com/kk-media/image/upload/v1752874787/notes-assets/images/Exploring-WebAssembly-WASM-Introduction-to-compiling-to-WASM/webassembly-compilation-techniques-diagram-2.jpg)

4.  **Tiered Compilation**  
    Combines baseline and optimizing compilers: code starts on the baseline path and “tiers up” to the optimized version once it’s ready, all while streaming compilation continues to feed new segments.

> [!important]
> **Warning**
>
> Tiered compilation may increase memory usage as multiple compiler tiers run in parallel.

![The image illustrates WebAssembly compilation techniques, showing the relationship between Baseline Compiler, Optimizing Compiler, Streaming Compilation, and Tiered Compilation.](https://kodekloud.com/kk-media/image/upload/v1752874788/notes-assets/images/Exploring-WebAssembly-WASM-Introduction-to-compiling-to-WASM/webassembly-compilation-techniques-diagram-3.jpg)

### Comparison of WASM Compilation Techniques

| Technique             | Purpose                       | Benefit                                     |
| --------------------- | ----------------------------- | ------------------------------------------- |
| Baseline Compiler     | Fast initial machine code gen | Quick startup                               |
| Optimizing Compiler   | Refine code for performance   | Enhanced long-term execution                |
| Streaming Compilation | Compile during download       | Reduced load time                           |
| Tiered Compilation    | Combine baseline & optimized  | Balanced startup latency & peak performance |

---

In our next lesson, we’ll explore popular WASM compilers—examining their features, trade-offs, and how they fit into the broader WebAssembly ecosystem.

## Links and References

- [WebAssembly Documentation](https://webassembly.org/docs/)
- [Mozilla: WebAssembly Guide](https://developer.mozilla.org/en-US/docs/WebAssembly)
- [WebAssembly GitHub Repository](https://github.com/WebAssembly)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/exploring-webassembly-wasm/module/2589f119-decc-4dae-b626-5a5841b86220/lesson/7bb42dc6-cb43-49fe-984c-808db017ccc2)**
>
> Watch video content
