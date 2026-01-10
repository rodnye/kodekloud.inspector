# Optimizing Compiled WASM code - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Exploring-WebAssembly-WASM/Compiling-to-WebAssembly/Optimizing-Compiled-WASM-code)

---

## Table of Contents

- Optimizing Compiled WASM code
  - 1. Dead Code Elimination
  - 2. Post-Processing with wasm-opt
  - 3. Compiler Flags for Maximum Speed
  - 4. Efficient Memory Management
  - 5. Runtime Selection: JIT vs. AOT
  - 6. Pre-Initialization with Wizer
  - 7. Language Choice: C++ vs. Rust
  - Watch Video

---

## Content

Exploring WebAssembly (WASM)

Compiling to WebAssembly

# Optimizing Compiled WASM code

In this guide, we walk through seven practical steps to shrink and speed up a WebAssembly (WASM) module for matrix multiplication. Starting from a 500 KB C++ build running in 150 ms, you’ll learn how to apply dead code elimination, post-processing, compiler flags, memory management, runtime choices, pre-initialization, and a language switch to dramatically improve both size and performance.

![The image shows a module designed for matrix multiplication in C++, with performance metrics of 150 ms and 500 KB.](https://kodekloud.com/kk-media/image/upload/v1752874789/notes-assets/images/Exploring-WebAssembly-WASM-Optimizing-Compiled-WASM-code/matrix-multiplication-module-cpp.jpg)

## 1\. Dead Code Elimination

Removing unused functions and redundant branches is the fastest way to get immediate savings. By running a dead code pass in your compiler or using [`wasm-snip`](https://github.com/WebAssembly/wabt#wasm-snip), you can:

- Decrease binary size by ~100 KB (500 KB → 400 KB)
- Reduce execution time by ~10 ms (150 ms → 140 ms)

## 2\. Post-Processing with wasm-opt

The [Binaryen](https://github.com/WebAssembly/binaryen) toolkit’s [`wasm-opt`](https://github.com/WebAssembly/binaryen#wasm-opt) applies aggressive size and speed rewrites:

```
wasm-opt -Oz -o matrix.opt.wasm matrix.dead.wasm
```

Result:

- Size: 400 KB → ~190 KB
- Runtime: 140 ms → 100 ms

![The image shows a module designed for matrix multiplication, featuring a "Wasm-opt" label and performance metrics of 100 ms and 190 KB.](https://kodekloud.com/kk-media/image/upload/v1752874790/notes-assets/images/Exploring-WebAssembly-WASM-Optimizing-Compiled-WASM-code/wasm-opt-matrix-multiplication-module.jpg)

## 3\. Compiler Flags for Maximum Speed

Leveraging [Emscripten](https://emscripten.org) with `-O3` and LTO can push performance further:

```
emcc matrix.cpp -O3 -flto -o matrix.emcc.wasm
```

- Size: 190 KB → 170 KB
- Runtime: 100 ms → 90 ms

![The image is a diagram illustrating a module designed for matrix multiplication, featuring compiler support, a speed of 90 ms, and a size range of 190-(20 to 170) KB.](https://kodekloud.com/kk-media/image/upload/v1752874791/notes-assets/images/Exploring-WebAssembly-WASM-Optimizing-Compiled-WASM-code/matrix-multiplication-module-diagram.jpg)

## 4\. Efficient Memory Management

WASM’s linear memory model can leak if allocations aren’t released. Use tools like [AddressSanitizer](https://clang.llvm.org/docs/AddressSanitizer.html) to catch issues:

> [!important]
> **Warning**
>
> Always validate memory allocation and deallocation. Leaks in long-running modules can negate performance gains.

With no leaks, you can shave off ~5 ms:

- Runtime: 90 ms → 85 ms
- Size: unchanged at 170 KB

## 5\. Runtime Selection: JIT vs. AOT

Choosing the right execution engine can yield major wins:

| Runtime Type | Examples                 | Impact        |
| ------------ | ------------------------ | ------------- |
| JIT          | Wasmer, Wasmtime         | 85 ms → 75 ms |
| AOT          | Wasmer AOT, Wasmtime AOT | 75 ms → 70 ms |

![The image is a diagram illustrating a module designed for matrix multiplication, featuring Wasmtime with performance metrics of 75 ms and a size range of 190-(20 to 170) KB.](https://kodekloud.com/kk-media/image/upload/v1752874792/notes-assets/images/Exploring-WebAssembly-WASM-Optimizing-Compiled-WASM-code/matrix-multiplication-module-diagram-2.jpg)

## 6\. Pre-Initialization with Wizer

[Wizer](https://github.com/bytecodealliance/wizer) freezes module initialization state into the WASM binary. After the first run:

- Cold-start time drops from 70 ms → 60 ms
- Size remains at 170 KB

![The image is a diagram illustrating a module designed for matrix multiplication, featuring "Wizer for Pre-Initialization" with performance metrics of 60 ms and a size reduction from 190 KB to 170 KB.](https://kodekloud.com/kk-media/image/upload/v1752874794/notes-assets/images/Exploring-WebAssembly-WASM-Optimizing-Compiled-WASM-code/matrix-multiplication-module-diagram-3.jpg)

## 7\. Language Choice: C++ vs. Rust

Switching to Rust often produces smaller, faster binaries. In a Fermyon study:

- Size: 170 KB → ~82.5 KB
- Runtime: 60 ms → 30 ms

![The image illustrates a module designed for matrix multiplication, featuring a "WA" block with performance metrics of 30 ms and 82.5 KB, surrounded by concentric dotted lines.](https://kodekloud.com/kk-media/image/upload/v1752874795/notes-assets/images/Exploring-WebAssembly-WASM-Optimizing-Compiled-WASM-code/matrix-multiplication-wa-block-diagram.jpg)

---

Fermyon’s research (Matt Butcher, Radu Matei) evaluated six optimization dimensions for file size and speed. Their key insights:

![The image discusses optimizing WebAssembly (WASM) for performance and file size, featuring Fermyon, Matt Butcher, Radu Matei, and the SPIN Framework. It includes a link to an article on six optimization methods.](https://kodekloud.com/kk-media/image/upload/v1752874796/notes-assets/images/Exploring-WebAssembly-WASM-Optimizing-Compiled-WASM-code/wasm-optimization-performance-file-size.jpg)

| Factor                               | Benefit                                     | Example                        |
| ------------------------------------ | ------------------------------------------- | ------------------------------ |
| Programming Language                 | Smaller, faster binaries                    | Rust “Hello, world!” vs. Swift |
| Compiler Flags                       | Drastic size reduction (`-O3`, `--release`) | Bartholomew CMS: 84 MB → 7 MB  |
| Post-Processing Tools                | Additional compression                      | Rust binary: 9 MB → 4 MB       |
| Runtime Choice                       | JIT for flexibility, AOT for speed          | Interpreters vs. JIT compilers |
| AOT Compilation & Pre-Initialization | Lower startup overhead                      | WASI + Wizer pre-init          |

![The image illustrates the optimization of "Bartholomew CMS" using a compiler flag, reducing its size from 84M to 7M. It shows a process flow with icons and text.](https://kodekloud.com/kk-media/image/upload/v1752874796/notes-assets/images/Exploring-WebAssembly-WASM-Optimizing-Compiled-WASM-code/bartholomew-cms-optimization-diagram.jpg)  
![The image compares interpreters and JIT compilers, highlighting that interpreters are suitable for smaller, resource-constrained environments, while JIT compilers are better for large applications.](https://kodekloud.com/kk-media/image/upload/v1752874797/notes-assets/images/Exploring-WebAssembly-WASM-Optimizing-Compiled-WASM-code/interpreters-vs-jit-compilers-comparison.jpg)

For the full technical deep dive, see Fermyon’s [blog post](https://fermyon.com/blog).

---

Optimizing WASM modules delivers fast load times, efficient resource usage, and better user experiences across browsers, cloud, edge, and embedded systems.

1.  Fast initialization is vital for web and serverless apps.
2.  Lower memory and CPU footprints empower mobile and IoT devices.
3.  Responsive performance boosts user satisfaction.

![The image illustrates the significance of optimization with three key points: fast, efficient, and satisfaction, each represented by an icon and a number.](https://kodekloud.com/kk-media/image/upload/v1752874798/notes-assets/images/Exploring-WebAssembly-WASM-Optimizing-Compiled-WASM-code/optimization-fast-efficient-satisfaction.jpg)

WebAssembly isn’t just for browsers—it powers plugins, edge compute, and embedded scenarios.

![The image illustrates the tech landscape after WebAssembly (WASM), highlighting its applications in browsers, cloud and edge computing, and embedded programming.](https://kodekloud.com/kk-media/image/upload/v1752874800/notes-assets/images/Exploring-WebAssembly-WASM-Optimizing-Compiled-WASM-code/wasm-tech-landscape-applications.jpg)

Effective WASM optimization ensures your modules are lean, fast, and ready for any environment.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/exploring-webassembly-wasm/module/2589f119-decc-4dae-b626-5a5841b86220/lesson/3bdb7446-c931-4f52-9455-c5e9bdf1215c)**
>
> Watch video content
