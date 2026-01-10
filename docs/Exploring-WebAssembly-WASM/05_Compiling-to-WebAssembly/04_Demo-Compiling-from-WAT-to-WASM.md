# Demo Compiling from WAT to WASM - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Exploring-WebAssembly-WASM/Compiling-to-WebAssembly/Demo-Compiling-from-WAT-to-WASM)

---

## Table of Contents

- Demo Compiling from WAT to WASM
  - Prerequisites
  - 1. Write the WAT Module
  - 2. Install the WebAssembly Binary Toolkit (WABT)
  - 3. Compile WAT to WASM
  - 4. Create the HTML Loader
  - 5. Run and Verify
  - References
  - Watch Video
  - Practice Lab

---

## Content

Exploring WebAssembly (WASM)

Compiling to WebAssembly

# Demo Compiling from WAT to WASM

In this guide, you’ll learn how to write a simple WebAssembly Text Format (WAT) module, compile it into a WASM binary using the WebAssembly Binary Toolkit (WABT), and load it in an HTML page. By the end, you’ll see “Hello, WebAssembly!” printed in your browser console.

## Prerequisites

- A modern web browser
- A local HTTP server (e.g., VS Code Live Server, `python -m http.server`, `http-server`)
- [Node.js](https://nodejs.org/) or another environment to run a local server

> [!important]
> **Note**
>
> You cannot load a WASM module via `file://`. Always serve your files over HTTP or HTTPS.

---

## 1\. Write the WAT Module

Create a file named `hello-wasm.wat`:

```
(module
  (import "console" "log" (func $log (param i32)))
  (memory 1)
  (export "memory" (memory 0))
  (data (i32.const 0) "Hello, WebAssembly!\00")
  (func $main
    (i32.const 0)
    call $log)
  (export "main" (func $main))
)
```

This module:

- Imports the JavaScript `console.log` function
- Allocates 1 page (64 KiB) of memory
- Stores the null-terminated string `"Hello, WebAssembly!"` at offset 0
- Defines a `main` function that pushes the string offset and calls `log`

---

## 2\. Install the WebAssembly Binary Toolkit (WABT)

WABT provides the `wat2wasm` compiler. Install it on your platform:

| Platform | Install Command                               |
| -------- | --------------------------------------------- |
| macOS    | `brew install wabt`                           |
| Windows  | `choco install wabt`                          |
| Linux    | `sudo apt-get install wabt` _(Debian/Ubuntu)_ |

> [!important]
> **Note**
>
> For other distributions, visit the [WABT GitHub releases](https://github.com/WebAssembly/wabt/releases) page.

---

## 3\. Compile WAT to WASM

Run the following command in the directory containing `hello-wasm.wat`:

```
wat2wasm hello-wasm.wat -o hello-wasm.wasm
```

After compilation, you’ll see `hello-wasm.wasm` in your working folder.

---

## 4\. Create the HTML Loader

Make an `hello-wasm.html` file alongside your `.wasm` binary:

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Hello WASM</title>
</head>
<body>
  <script>
    let memory;


    fetch('hello-wasm.wasm')
      .then(res => res.arrayBuffer())
      .then(bytes =>
        WebAssembly.instantiate(bytes, {
          console: {
            log: offset => {
              const bytes = new Uint8Array(memory.buffer, offset);
              const message = new TextDecoder().decode(bytes);
              console.log(message);
            }
          }
        })
      )
      .then(result => {
        memory = result.instance.exports.memory;
        result.instance.exports.main();
      })
      .catch(err => console.error('WASM error:', err));
  </script>
</body>
</html>
```

This loader:

1.  Fetches the `.wasm` binary
2.  Instantiates it with an imported `console.log` function
3.  Retrieves the exported memory and calls `main()`

---

## 5\. Run and Verify

1.  Start your local HTTP server in the project folder.
2.  Open `http://localhost:PORT/hello-wasm.html` in your browser.
3.  Check the developer console. You should see:

    ```
    Hello, WebAssembly!
    ```

Congratulations! You’ve successfully written a WAT file, compiled it to WASM, and run it in a browser.

---

## References

- [MDN WebAssembly Guide](https://developer.mozilla.org/docs/WebAssembly)
- [WebAssembly Official Site](https://webassembly.org/)
- [WABT GitHub Repository](https://github.com/WebAssembly/wabt)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/exploring-webassembly-wasm/module/2589f119-decc-4dae-b626-5a5841b86220/lesson/59f55ddc-2457-4b7e-aad2-bff647514a7a)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/exploring-webassembly-wasm/module/2589f119-decc-4dae-b626-5a5841b86220/lesson/201f3268-9776-4a53-a4db-ef2ba8d5f324)**
>
> Practice lab
