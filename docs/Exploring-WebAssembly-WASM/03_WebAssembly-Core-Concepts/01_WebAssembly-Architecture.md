# WebAssembly Architecture - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Exploring-WebAssembly-WASM/WebAssembly-Core-Concepts/WebAssembly-Architecture)

---

## Table of Contents

- WebAssembly Architecture
  - Binary Format
  - Stack-Based Virtual Machine
  - Linear Memory
  - Modules
  - Security and Sandboxing
  - JavaScript Interoperability
  - Links and References
  - Watch Video

---

## Content

Exploring WebAssembly (WASM)

WebAssembly Core Concepts

# WebAssembly Architecture

WebAssembly (WASM) is revolutionizing web development by delivering near-native performance in the browser. Its modular, sandboxed design and compact binary format make it ideal for compute-intensive applications, gaming, and cross-platform libraries. The following sections break down WebAssembly’s core components and show how they interact to power modern web apps.

![The image features a stylized illustration of a mechanical or robotic component with two circular icons, one with a lightning bolt and the other with an arrow. The word "WebAssembly" is written in the top left corner.](https://kodekloud.com/kk-media/image/upload/v1752874906/notes-assets/images/Exploring-WebAssembly-WASM-WebAssembly-Architecture/webassembly-robotic-component-illustration.jpg)

## Binary Format

WebAssembly’s Binary Format is a highly efficient, machine-friendly encoding. It reduces transfer size and accelerates parsing compared to text-based formats, enabling faster start-up times in browsers and runtimes.

![The image shows a series of orange circles with binary code inside them and a purple square with "WA" on it, labeled "Binary Format."](https://kodekloud.com/kk-media/image/upload/v1752874907/notes-assets/images/Exploring-WebAssembly-WASM-WebAssembly-Architecture/binary-format-orange-circles-wa.jpg)

Consider this simple C function:

```
int add(int a, int b) {
    return a + b;
}
```

When compiled to WASM, it becomes a compact byte sequence optimized for decoding and execution.

> [!important]
> **Note**
>
> Reducing code size and parse overhead is critical for applications with large codebases or limited bandwidth.

## Stack-Based Virtual Machine

WebAssembly uses a stack-based virtual machine (VM) with a Last-In, First-Out (LIFO) execution model. Operands are pushed onto the stack, operations pop them, then push results back on.

![The image illustrates a stack-based virtual machine with a vertical stack of colored disks, labeled as "Stack based" and "Last-in First-out (LIFO)."](https://kodekloud.com/kk-media/image/upload/v1752874908/notes-assets/images/Exploring-WebAssembly-WASM-WebAssembly-Architecture/stack-based-virtual-machine-lifo.jpg)

Example in WebAssembly Text Format (WAT):

```
(func $add (param $a i32) (param $b i32) (result i32)
  local.get $a
  local.get $b
  i32.add
)
```

1.  `local.get $a` → Pushes the first parameter.
2.  `local.get $b` → Pushes the second parameter.
3.  `i32.add` → Pops both values, adds them, then pushes the sum.

## Linear Memory

Linear memory in WASM is a contiguous, mutable array of bytes with addresses starting at zero. Data types (`i32`, `i64`, `f32`, `f64`) specify how many bytes to read/write.

![The image illustrates a concept of linear memory with a calculation for byte address, showing a slot number multiplied by size per slot, and includes a visual representation of memory slots.](https://kodekloud.com/kk-media/image/upload/v1752874909/notes-assets/images/Exploring-WebAssembly-WASM-WebAssembly-Architecture/linear-memory-byte-address-diagram.jpg)

| Instruction | Description                               |
| ----------- | ----------------------------------------- |
| `i32.load`  | Read 4 bytes (32 bits) from linear memory |
| `i32.store` | Write 4 bytes (32 bits) to linear memory  |

The example below allocates one 64 KiB page of memory, stores the integer `7` at byte address 16, and then reads it back:

```
(module
  (memory 1)               ;; 1 page = 64 KiB


  (func $storeValue
    i32.const 7            ;; Push 7
    i32.store offset=16    ;; Store at address 16
  )
  (export "storeValue" (func $storeValue))


  (func $loadValue (result i32)
    i32.load offset=16     ;; Load from address 16
  )
  (export "loadValue" (func $loadValue))
)
```

## Modules

A WebAssembly module bundles functions, memory, globals, and tables into a self-contained unit. Modules can be imported, instantiated, and linked with other modules or JavaScript.

![The image shows a diagram with a purple puzzle piece labeled "WebAssembly" connected by an arrow to an orange circle labeled "Modules," featuring cube icons.](https://kodekloud.com/kk-media/image/upload/v1752874910/notes-assets/images/Exploring-WebAssembly-WASM-WebAssembly-Architecture/webassembly-modules-puzzle-diagram.jpg)

Example of a module exporting an `add` function:

```
(module
  (func $add (param $a i32) (param $b i32) (result i32)
    local.get $a
    local.get $b
    i32.add
  )
  (export "add" (func $add))
)
```

You can load this module in JavaScript and invoke `add` at runtime.

## Security and Sandboxing

WebAssembly executes inside a secure sandbox, preventing unauthorized access to host resources. The browser enforces strict boundaries: any out-of-bounds memory access or forbidden system call triggers an immediate trap.

![The image is a diagram showing a browser containing a sandbox with a "WA" (WebAssembly) module inside, illustrating a security concept.](https://kodekloud.com/kk-media/image/upload/v1752874911/notes-assets/images/Exploring-WebAssembly-WASM-WebAssembly-Architecture/browser-sandbox-webassembly-diagram.jpg)

> [!important]
> **Warning**
>
> Always validate and limit the memory and table sizes a module can request. Untrusted modules should never be granted excessive resource quotas.

## JavaScript Interoperability

WebAssembly modules interoperate seamlessly with JavaScript. You can import functions from JS into WASM and export WASM functions back to JS, sharing linear memory when needed.

![The image illustrates the interoperability between JavaScript and WebAssembly within an application, highlighting the use of exposed functions and shared linear memory in a runtime environment like a browser or Node.js.](https://kodekloud.com/kk-media/image/upload/v1752874912/notes-assets/images/Exploring-WebAssembly-WASM-WebAssembly-Architecture/javascript-webassembly-interoperability-diagram.jpg)

Example of invoking a WASM `add` function from JavaScript:

```
// After compiling and instantiating your WebAssembly module:
const { instance } = await WebAssembly.instantiateStreaming(fetch('add.wasm'));
const result = instance.exports.add(3, 4);
console.log(result); // 7
```

> [!important]
> **Note**
>
> The WebAssembly Text Format (WAT) is invaluable for debugging and learning, but production workflows typically use the binary format for performance.

---

## Links and References

- [WebAssembly.org](https://webassembly.org/)
- [MDN Web Docs: WebAssembly](https://developer.mozilla.org/docs/WebAssembly)
- [WASM Specification](https://webassembly.github.io/spec/)
- [WebAssembly Text Format (WAT) Guide](https://webassembly.github.io/spec/core/text/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/exploring-webassembly-wasm/module/50924ac0-6bb9-4e73-975d-55fc8d997574/lesson/036c5f3d-8e73-4354-86e2-09ec36dc4385)**
>
> Watch video content
