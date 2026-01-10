# Demo WASM in Serverside with NodeJS - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Exploring-WebAssembly-WASM/Future-WebAssembly-in-Cloud/Demo-WASM-in-Serverside-with-NodeJS)

---

## Table of Contents

- Demo WASM in Serverside with NodeJS
  - Prerequisites
  - 1. Write the C Source
  - 2. Compile to WASM for Node.js
  - 3. Execute the WASM Module in Node.js
  - Links and References
  - Watch Video

---

## Content

Exploring WebAssembly (WASM)

Future WebAssembly in Cloud

# Demo WASM in Serverside with NodeJS

In this tutorial, you’ll learn how to compile a simple C program into WebAssembly (WASM) using Emscripten and then execute it in a Node.js environment. The workflow mirrors browser-based builds, but outputs a JavaScript “glue” file suitable for server-side execution.

## Prerequisites

- Node.js (tested with v14.18.2)
- Emscripten SDK with `emcc` available in your `PATH`

> [!important]
> **Note**
>
> Before you begin, make sure you’ve [installed Node.js](https://nodejs.org/) and set up the [Emscripten SDK](https://emscripten.org/docs/getting_started/downloads.html).
> Run `emcc --version` to verify your installation.

Check your Node.js version:

```
node -v
# Expected output:
# v14.18.2
```

## 1\. Write the C Source

Create a file named `helloworld.c` with the following contents:

```
#include <stdio.h>


int main() {
    printf("Hello World\n");
    return 0;
}
```

## 2\. Compile to WASM for Node.js

Use Emscripten’s `emcc` compiler to generate both the WebAssembly binary and the JavaScript loader:

```
emcc /path/to/helloworld.c -o /path/to/helloworld.js
```

This command produces:

| File            | Description                                                         |
| --------------- | ------------------------------------------------------------------- |
| helloworld.js   | JavaScript “glue” code that locates, loads, and runs the WASM asset |
| helloworld.wasm | Compiled WebAssembly module                                         |

The top of `helloworld.js` looks like this:

```
var Module = typeof Module != 'undefined' ? Module : {};
// …glue code to locate and instantiate helloworld.wasm…
```

## 3\. Execute the WASM Module in Node.js

Run your generated loader script with Node:

```
node /path/to/helloworld.js
# Output:
# Hello World
```

That’s all! You’ve successfully compiled a C program into WASM and executed it on the server with Node.js.

## Links and References

- [Node.js Official Website](https://nodejs.org/)
- [Emscripten Documentation](https://emscripten.org/docs/)
- [WebAssembly Developer Guide](https://webassembly.org/getting-started/developers-guide/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/exploring-webassembly-wasm/module/a9d35579-0f55-465c-8d70-eec38ff7c750/lesson/8c34bfa6-87bb-44e3-8809-8e80cfc69dc3)**
>
> Watch video content
