# Best Practices for Writing Secure WASM Code - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Exploring-WebAssembly-WASM/Compiling-to-WebAssembly/Best-Practices-for-Writing-Secure-WASM-Code)

---

## Table of Contents

- Best Practices for Writing Secure WASM Code
  - WebAssembly Security Features
  - Best Practices for Secure WASM Coding
  - Conclusion
  - Links and References
  - Watch Video
    - Sandbox & File System Restrictions
    - Same-Origin Policy Enforcement
    - Linear Memory Model
    - Digital Signatures
    - 1. Validate Inputs
    - 2. Safe Memory Management
    - 3. Constant-Time Operations
    - 4. Use Typed Arrays
    - 5. Restrict Imports
    - 6. Avoid Direct System Calls
    - 7. Mark Unverified Code

---

## Content

Exploring WebAssembly (WASM)

Compiling to WebAssembly

# Best Practices for Writing Secure WASM Code

In previous lessons, we explored how to compile code to WebAssembly using toolchains like [Emscripten](https://emscripten.org), [WASM-Pack](https://rustwasm.github.io/wasm-pack/), and [AssemblyScript](https://www.assemblyscript.org/). We also examined common pitfalls, performance optimizations, and debugging techniques. Now, it’s time to focus on security—leveraging WASM’s built-in protections and adopting coding practices to harden your modules against threats.

![The image shows an introduction to WebAssembly (WA) with icons for Emscripten, WASM-Pack, and AssemblyScript.](https://kodekloud.com/kk-media/image/upload/v1752874769/notes-assets/images/Exploring-WebAssembly-WASM-Best-Practices-for-Writing-Secure-WASM-Code/webassembly-introduction-emscripten-wasm-pack-assemblyscript.jpg)

---

## WebAssembly Security Features

Below is a quick overview of core WASM protections enforced by modern browsers:

| Feature                      | Description                                                                               | Browser Enforced                                                                           |
| ---------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Sandbox & File System Limits | Modules run in a restricted environment with no direct access to the host file system.    | Yes                                                                                        |
| Same-Origin Policy           | Prevents cross-origin requests unless explicitly permitted by CORS or other headers.      | Yes ([MDN Docs](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)) |
| Linear Memory Model          | Each module has a contiguous memory block; out-of-bounds access is trapped automatically. | Yes ([MDN Docs](https://developer.mozilla.org/en-US/docs/WebAssembly/Memory))              |
| Digital Signatures           | Optional code signing enables integrity checks before execution.                          | Depends on runtime                                                                         |

### Sandbox & File System Restrictions

WASM modules cannot read or write host files directly:

```
// This will throw an error in the browser or runtime
const data = Deno.readFileSync('/etc/passwd');
```

The sandbox ensures your local files remain off-limits.

### Same-Origin Policy Enforcement

A WASM module loaded from `example.com` cannot fetch data from `anotherwebsite.com` without proper CORS headers. This prevents unauthorized cross-site data leaks.

![The image illustrates a concept where data from "www.example.com" is not shared with "www.anotherwebsite.com," as indicated by a red cross between them. It includes icons representing web pages and user data.](https://kodekloud.com/kk-media/image/upload/v1752874770/notes-assets/images/Exploring-WebAssembly-WASM-Best-Practices-for-Writing-Secure-WASM-Code/data-sharing-restriction-diagram.jpg)

### Linear Memory Model

WebAssembly’s memory is a single, contiguous array of bytes. Any attempt to access outside its allocated bounds is immediately trapped, mitigating buffer overflow exploits:

```
const buffer = new ArrayBuffer(16);
const view = new Uint8Array(buffer);
view[20] = 0xFF; // RangeError: Offset is outside the bounds of the DataView
```

### Digital Signatures

To guarantee integrity, sign your `.wasm` artifacts and verify them at load time. A mismatched signature stops execution:

![The image shows an introduction to a concept linking WebAssembly Modules and Digital Signatures, represented by icons and a connecting link symbol.](https://kodekloud.com/kk-media/image/upload/v1752874771/notes-assets/images/Exploring-WebAssembly-WASM-Best-Practices-for-Writing-Secure-WASM-Code/webassembly-modules-digital-signatures-intro.jpg)

---

## Best Practices for Secure WASM Coding

Beyond inherent sandboxing, follow these guidelines to further strengthen your modules:

### 1\. Validate Inputs

Ensure every external input adheres to expected types and ranges:

```
function sum(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Invalid input: numbers required');
  }
  return a + b;
}
```

> [!important]
> **Note**
>
> Invalid or unchecked inputs often lead to overflows or unexpected behavior. Always validate early and fail fast.

### 2\. Safe Memory Management

When allocating and manipulating memory, explicitly check boundaries and free resources when finished:

```
// Allocate 64 bytes and write a 32-bit integer
const memory = new ArrayBuffer(64);
const dv = new DataView(memory);
dv.setInt32(0, 12345, true);
```

### 3\. Constant-Time Operations

Avoid leaking sensitive data via timing variations:

```
function secureCompare(a, b) {
  let diff = a.length ^ b.length;
  for (let i = 0; i < a.length && i < b.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}
```

### 4\. Use Typed Arrays

Typed arrays enforce strict data layouts and reduce overflow risks:

```
const intBuffer = new Int32Array(8);
intBuffer[0] = 256;
```

### 5\. Restrict Imports

Only import required functions from vetted, trusted modules:

```
;; trusted_math.wat
(module
  (func $add (param i32 i32) (result i32)
    local.get 0
    local.get 1
    i32.add
  )
  (export "add" (func $add))
)

;; main.wat
(module
  (import "trusted_math" "add" (func $add (param i32 i32) (result i32)))
  (func (export "computeSum") (param i32 i32) (result i32)
    (call $add (local.get 0) (local.get 1))
  )
)
```

### 6\. Avoid Direct System Calls

Leverage mature libraries instead of crafting raw OS interfaces.

> [!important]
> **Warning**
>
> Direct syscalls can introduce subtle memory and permission bugs. Prefer high-quality, well-audited libraries.

![The image shows a computer screen with a magnifying glass highlighting a bug icon, accompanied by a message suggesting to use pre-built functions due to risk.](https://kodekloud.com/kk-media/image/upload/v1752874772/notes-assets/images/Exploring-WebAssembly-WASM-Best-Practices-for-Writing-Secure-WASM-Code/computer-screen-bug-icon-message.jpg)

### 7\. Mark Unverified Code

Label modules or functions that require additional review:

```
(module
  ;; TODO: Security audit required for this function
  (func $potentiallyUnsafe (param i32) (result i32)
    local.get 0
    i32.const 0
    i32.add
  )

  ;; Reviewed and approved
  (func $safeFunction (param i32) (result i32)
    i32.const 42
  )
)
```

---

## Conclusion

By combining WebAssembly’s sandbox, linear memory model, same-origin enforcement, and optional digital signatures with disciplined coding practices—such as input validation, boundary checks, and restricted imports—you can deliver high-performance WASM modules that stand up to real-world threats.

---

## Links and References

- [WebAssembly Documentation (MDN)](https://developer.mozilla.org/en-US/docs/WebAssembly)
- [Emscripten](https://emscripten.org)
- [WASM-Pack](https://rustwasm.github.io/wasm-pack/)
- [AssemblyScript](https://www.assemblyscript.org/)
- [Same-Origin Policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)
- [WebAssembly Memory](https://developer.mozilla.org/en-US/docs/WebAssembly/Memory)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/exploring-webassembly-wasm/module/2589f119-decc-4dae-b626-5a5841b86220/lesson/947d7fe7-e03e-48f8-88a6-aa13627fe571)**
>
> Watch video content
