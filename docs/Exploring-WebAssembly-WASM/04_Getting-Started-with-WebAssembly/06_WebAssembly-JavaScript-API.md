# WebAssembly JavaScript API - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Exploring-WebAssembly-WASM/Getting-Started-with-WebAssembly/WebAssembly-JavaScript-API)

---

## Table of Contents

- WebAssembly JavaScript API
  - Table of Contents
  - Loading & Instantiating a WASM Module
  - Core API Constructors & Methods
  - Error Handling
  - Links and References
  - Watch Video
    - Example: Integrating with HTML
    - WebAssembly.Memory
    - WebAssembly.Table & Indirect Calls

---

## Content

Exploring WebAssembly (WASM)

Getting Started with WebAssembly

# WebAssembly JavaScript API

This guide explains how to load, instantiate, and interact with WebAssembly (WASM) modules in the browser using the WebAssembly JavaScript API. You’ll learn how the API ties together WASM binaries with JavaScript and HTML to build high-performance web applications.

## Table of Contents

1.  [Loading & Instantiating a WASM Module](#loading--instantiating-a-wasm-module)
2.  [Core API Constructors & Methods](#core-api-constructors--methods)
3.  [Error Handling](#error-handling)
4.  [Links and References](#links-and-references)

---

## Loading & Instantiating a WASM Module

Before calling exported functions, you first fetch and compile your `.wasm` binary. There are two primary methods:

| Method                             | Description                                                               |
| ---------------------------------- | ------------------------------------------------------------------------- |
| `WebAssembly.instantiate`          | Downloads the entire `ArrayBuffer` then compiles and instantiates.        |
| `WebAssembly.instantiateStreaming` | Streams, compiles, and instantiates on-the-fly, reducing startup latency. |

```
// 1. Fetch the binary
fetch('converter.wasm')
  // 2a. Instantiate after full download
  .then(res => res.arrayBuffer())
  .then(buf => WebAssembly.instantiate(buf, importObject))
  .then(({ instance }) => {
    wasmModule = instance;
  })
  .catch(console.error);


// 2b. Stream & instantiate
fetch('converter.wasm')
  .then(res => WebAssembly.instantiateStreaming(res, importObject))
  .then(({ instance }) => {
    const { celsius_to_fahrenheit } = instance.exports;
    console.log(celsius_to_fahrenheit(25)); // 77
  })
  .catch(console.error);
```

> [!important]
> **Note**
>
> `WebAssembly.instantiateStreaming` is more efficient in modern browsers because it begins compilation before the full binary is downloaded.

### Example: Integrating with HTML

```
<input id="celsiusInput" type="number" placeholder="°C">
<button onclick="convert()">Convert</button>
<div id="output"></div>


<script>
  let wasmModule;


  async function init() {
    const res = await fetch('converter.wasm');
    const { instance } = await WebAssembly.instantiateStreaming(res, {});
    wasmModule = instance;
  }


  function convert() {
    const c = parseFloat(document.getElementById('celsiusInput').value);
    const f = wasmModule.exports.celsius_to_fahrenheit(c);
    document.getElementById('output').innerText = `That's ${f.toFixed(2)}°F!`;
  }


  init().catch(console.error);
</script>
```

---

## Core API Constructors & Methods

Once you’ve instantiated your module, the WebAssembly JS API provides key constructors for building and interacting with binary modules:

| Constructor            | Purpose                                                 | Example                                                                 |
| ---------------------- | ------------------------------------------------------- | ----------------------------------------------------------------------- |
| `WebAssembly.Module`   | Compile raw WASM bytes into a reusable module blueprint | `const mod = new WebAssembly.Module(wasmCode);`                         |
| `WebAssembly.Instance` | Instantiate an executable module from a compiled module | `const inst = new WebAssembly.Instance(mod, imports);`                  |
| `WebAssembly.Memory`   | Allocate linear memory (64 KiB pages) for a module      | `const mem = new WebAssembly.Memory({ initial:10, maximum:100 });`      |
| `WebAssembly.Table`    | Store references to functions for indirect calls        | `const tbl = new WebAssembly.Table({ initial:10, element:'anyfunc' });` |

### WebAssembly.Memory

Memory pages are fixed to 64 KiB each:

```
// Allocate 10 pages (640 KiB), max 100 pages (6.4 MiB)
const memory = new WebAssembly.Memory({ initial: 10, maximum: 100 });
```

> [!important]
> **Note**
>
> Memory growth is restricted by the `maximum` value. Exceeding it throws a runtime error.

### WebAssembly.Table & Indirect Calls

A table acts like a virtual function table:

```
// Allocate a table for 10 function references (anyfunc)
const table = new WebAssembly.Table({ initial: 10, element: 'anyfunc' });


// After instantiation:
table.set(0, wasmInstance.exports.calculate);
// Indirect call via table index 0
const result = wasmInstance.exports.call_indirect(0, 1, 3);
console.log(result); // e.g., 4
```

```
// Example C code compiled to WASM
int add(int a, int b)       { return a + b; }
int subtract(int a,int b)   { return a - b; }
int multiply(int a,int b)   { return a * b; }
int divide(int a,int b)     { return a / b; }


int calculate(int op,int a,int b) {
  typedef int (*op_func)(int,int);
  op_func table[] = { add, subtract, multiply, divide };
  return table[op](a, b);
}
```

---

## Error Handling

Use standard `try/catch` blocks to handle compile, link, and runtime errors:

```
try {
  // e.g. WebAssembly.instantiate(...)
} catch (e) {
  if (e instanceof WebAssembly.CompileError) {
    console.error("Compile error:", e);
  } else if (e instanceof WebAssembly.LinkError) {
    console.error("Link error:", e);
  } else if (e instanceof WebAssembly.RuntimeError) {
    console.error("Runtime error:", e);
  } else {
    console.error("Unknown error:", e);
  }
}
```

---

## Links and References

- [WebAssembly JavaScript API (W3C)](https://www.w3.org/TR/wasm-js-api/)
- [MDN WebAssembly Guide](https://developer.mozilla.org/en-US/docs/WebAssembly)
- [WebAssembly Specification](https://webassembly.github.io/spec/)

---

Keywords: WebAssembly, WASM module, instantiateStreaming, WebAssembly.Memory, WebAssembly.Table, JS API, high-performance web.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/exploring-webassembly-wasm/module/35f32a4b-b0a4-45ba-a4a8-827feffc5940/lesson/b962cec0-bacf-4394-b319-c50ffba0ca6c)**
>
> Watch video content
