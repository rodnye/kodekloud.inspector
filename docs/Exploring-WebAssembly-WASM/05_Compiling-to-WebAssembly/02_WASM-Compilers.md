# WASM Compilers - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Exploring-WebAssembly-WASM/Compiling-to-WebAssembly/WASM-Compilers)

---

## Table of Contents

- WASM Compilers
  - Top WebAssembly Compilers
  - Online WASM Tools
  - Further Reading and References
  - Watch Video
    - LLVM
    - Binaryen
    - Emscripten
    - wasm-pack
    - AssemblyScript
    - WasmFiddle
    - WebAssembly Explorer
    - Wasm by Example
    - WABT Online
    - WasmCloud

---

## Content

Exploring WebAssembly (WASM)

Compiling to WebAssembly

# WASM Compilers

WebAssembly (WASM) has revolutionized high-performance web applications by enabling near-native execution speeds. In this guide, we’ll cover the most popular WASM compilers and browser-based tools to help you build, optimize, and inspect your WebAssembly modules.

---

## Top WebAssembly Compilers

Picking the right compiler impacts binary size, execution speed, and integrations with browser APIs. The table below summarizes key WASM compilers and their strengths:

| Compiler       | Language Support  | Key Feature                              |
| -------------- | ----------------- | ---------------------------------------- |
| LLVM           | C, C++, Rust      | Mature optimizations and backend         |
| Binaryen       | WASM modules      | Fine-grained code manipulation           |
| Emscripten     | C, C++ (via LLVM) | Browser API bridge (WebGL, I/O, etc.)    |
| wasm-pack      | Rust              | Cargo integration and package publishing |
| AssemblyScript | TypeScript-like   | Familiar syntax with explicit memory     |

### LLVM

LLVM is a battle-tested compiler framework that emits highly optimized WebAssembly. It supports frontends for C, C++, and Rust, leveraging advanced analysis and transformation passes.

![The image features the LLVM logo in the center, with icons and text highlighting its optimization capabilities and support for WASM modules.](https://kodekloud.com/kk-media/image/upload/v1752874803/notes-assets/images/Exploring-WebAssembly-WASM-WASM-Compilers/llvm-logo-optimization-wasm-support.jpg)

### Binaryen

Binaryen focuses entirely on WebAssembly. It lets you assemble, optimize, and transform WASM binaries, making it ideal for minimizing code size and fine-tuning low-level performance.

![The image is a diagram about Binaryen, highlighting its features such as running efficiently, optimizing, customizing compilation, and faster execution of WASM code.](https://kodekloud.com/kk-media/image/upload/v1752874804/notes-assets/images/Exploring-WebAssembly-WASM-WASM-Compilers/binaryen-features-diagram.jpg)

### Emscripten

Emscripten builds on LLVM and Binaryen to compile large C/C++ codebases into WASM. It provides built-in support for WebGL, file I/O, pthreads, and other browser APIs.

> [!important]
> **Warning**
>
> Without `-O2` or `-O3` optimization flags, Emscripten output can be large and slower to load. Always benchmark with optimization enabled.

![The image illustrates the concept of Emscripten, showing a WASM binary file, the WebGL logo, and a computer screen with a browser icon.](https://kodekloud.com/kk-media/image/upload/v1752874805/notes-assets/images/Exploring-WebAssembly-WASM-WASM-Compilers/emscripten-wasm-webgl-browser.jpg)

### wasm-pack

Rust developers can use `wasm-pack` to compile, test, and publish WASM packages to npm. It wraps Cargo commands with sensible defaults for tooling, bundlers, and optimizations.

![The image features the Rust programming language logo with a small crab wearing a hard hat labeled "WA" on top, and two icons below representing security and performance.](https://kodekloud.com/kk-media/image/upload/v1752874806/notes-assets/images/Exploring-WebAssembly-WASM-WASM-Compilers/rust-logo-crab-hardhat-security-performance.jpg)

### AssemblyScript

AssemblyScript provides a TypeScript-flavored syntax that compiles directly to WASM. It exposes WebAssembly-specific types (e.g., `i32`, `f64`) for predictable performance.

```
// fib.ts
export function fib(n: i32): i32 {
  let a: i32 = 0;
  let b: i32 = 1;
  if (n > 0) {
    while (--n) {
      const t = a + b;
      a = b;
      b = t;
    }
  }
  return b;
}
```

Compile with:

```
asc fib.ts --outFile fib.wasm --optimize
```

> [!important]
> **Note**
>
> Install AssemblyScript with `npm install --save-dev assemblyscript` and use `npx asc` for local builds.

---

## Online WASM Tools

Browser-based environments let you prototype, inspect, and debug WASM modules without any local setup. Here’s a quick overview:

| Tool                 | Purpose                                | Demo Features                     |
| -------------------- | -------------------------------------- | --------------------------------- |
| WasmFiddle           | Live C/C++ to WASM experiments         | Instant REPL compilation          |
| WebAssembly Explorer | Visualize WAT & binary pipeline        | Source, WAT, and hex/binary views |
| Wasm by Example      | Step-by-step tutorials                 | Interactive code snippets         |
| WABT Online          | Text-to-binary conversion & validation | `wat2wasm` / `wasm2wat` demos     |
| WasmCloud            | WebAssembly microservices platform     | Service runtime and orchestration |

### WasmFiddle

WasmFiddle is a zero-config REPL for compiling C/C++ source into WebAssembly on the fly. Perfect for quick experiments.

### WebAssembly Explorer

Inspect each compilation stage side-by-side: your source code, the generated WebAssembly Text (WAT), and the final binary.

```
(module
  (table 0 anyfunc)
  (memory $0 1)
  (export "memory" (memory $0))
  (export "main" (func $main))
  (func $main (param $0 i32) (result i32)
    (i32.const 42)
  )
)
```

```
const wasmModule = new WebAssembly.Module(wasmCode);
const wasmInstance = new WebAssembly.Instance(wasmModule, wasmImports);
console.log(wasmInstance.exports.main());
```

Here’s a simple C++ example you can load:

```
#include <iostream>
using namespace std;

int main() {
  int x, y;
  cout << "Enter two integers: ";
  cin >> x >> y;
  cout << x << " + " << y << " = " << (x + y);
  return 0;
}
```

### Wasm by Example

Wasm by Example offers guided tutorials with live code editors to explore core WASM concepts.

![The image shows a webpage titled "Wasm by Example," which provides an introduction to WebAssembly using code snippets and examples. It includes options to select a programming language and language preference.](https://kodekloud.com/kk-media/image/upload/v1752874808/notes-assets/images/Exploring-WebAssembly-WASM-WASM-Compilers/wasm-by-example-introduction.jpg)

### WABT Online

Convert WAT to WASM (and back), inspect sections, and validate modules. Useful for low-level debugging.

![The image shows a screenshot of a WebAssembly online tool called "WABT Online," featuring a "wat2wasm" demo interface for converting text format to binary format.](https://kodekloud.com/kk-media/image/upload/v1752874809/notes-assets/images/Exploring-WebAssembly-WASM-WASM-Compilers/wabt-online-wat2wasm-demo-screenshot.jpg)

### WasmCloud

WasmCloud is a cloud-native platform for building, deploying, and scaling WebAssembly microservices.

![The image shows a screenshot of the KodeKloud WebAssembly Playground, featuring a welcome page with information about WebAssembly and a terminal interface.](https://kodekloud.com/kk-media/image/upload/v1752874810/notes-assets/images/Exploring-WebAssembly-WASM-WASM-Compilers/kodekloud-webassembly-playground-screenshot.jpg)

---

## Further Reading and References

- [WebAssembly Official Site](https://webassembly.org/)
- [MDN WebAssembly Documentation](https://developer.mozilla.org/en-US/docs/WebAssembly)
- [WebAssembly Specification](https://www.w3.org/TR/wasm-core-1/)

With these compilers and online tools in your toolkit, you’re ready to author, optimize, and debug robust WebAssembly applications.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/exploring-webassembly-wasm/module/2589f119-decc-4dae-b626-5a5841b86220/lesson/d62f24ae-c9b2-41b2-938b-a70081f295e4)**
>
> Watch video content
