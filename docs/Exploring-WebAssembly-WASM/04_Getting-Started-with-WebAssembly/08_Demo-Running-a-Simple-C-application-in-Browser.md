# Demo Running a Simple C application in Browser - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Exploring-WebAssembly-WASM/Getting-Started-with-WebAssembly/Demo-Running-a-Simple-C-application-in-Browser)

---

## Table of Contents

- Demo Running a Simple C application in Browser
  - 1. Create the C Source File
  - 2. Compile to WebAssembly
  - 3. Run in the Browser
  - 4. Explore the Generated Loader
  - References
  - Watch Video
  - Practice Lab

---

## Content

Exploring WebAssembly (WASM)

Getting Started with WebAssembly

# Demo Running a Simple C application in Browser

In this tutorial, you'll learn how to compile and execute a basic C program directly in your browser using WebAssembly. By following these steps, you can seamlessly port native C code to the web.

> [!important]
> **Prerequisites**
>
> - [Emscripten SDK](https://emscripten.org) installed and configured
> - [Visual Studio Code](https://code.visualstudio.com) (or any code editor)
> - A modern browser (e.g., [Google Chrome](https://www.google.com/chrome))

## 1\. Create the C Source File

1.  Open your project folder (e.g., `WASM`) in Visual Studio Code.
2.  Create a file named `hello.c` with the following content:

```
#include <stdio.h>


int main() {
    printf("Hello, WebAssembly!\n");
    return 0;
}
```

## 2\. Compile to WebAssembly

In the integrated terminal, run:

```
emcc hello.c -o hello.html
```

This command produces three output files:

| Filename   | Description                                   |
| ---------- | --------------------------------------------- |
| hello.html | HTML shell to load and run the WASM module    |
| hello.js   | JavaScript loader and glue code               |
| hello.wasm | WebAssembly binary containing compiled C code |

Verify the files:

```
ls
# hello.c  hello.html  hello.js  hello.wasm
```

> [!important]
> **Note**
>
> Ignore any `cache:INFO` messages during compilation—they’re just Emscripten diagnostics.

## 3\. Run in the Browser

Serve the folder with a static server (for example, Live Server in VS Code) and open `hello.html`. You should see:

```
Hello, WebAssembly!
```

## 4\. Explore the Generated Loader

Open `hello.html` to inspect how it integrates the loader:

```
<script>
  Module.setStatus('Downloading...');
  window.onerror = (event) => {
    Module.setStatus('Exception thrown, see JavaScript console');
    spinnerElement.style.display = 'none';
    Module.setStatus = (text) => {
      if (text) console.error('[post-exception status] ' + text);
    };
  };
</script>
<script async type="text/javascript" src="hello.js"></script>
```

Next, examine the key loader function in `hello.js`:

```
function instantiateAsync(binary, binaryFile, imports, callback) {
  if (!binary &&
      typeof WebAssembly.instantiateStreaming === 'function' &&
      isDataUri(binaryFile) &&
      !isFileURI(binaryFile)) {
    return fetch(binaryFile, { credentials: 'same-origin' })
      .then(response => {
        // Handle WebAssembly.instantiateStreaming response
      });
  }
}
```

![The image shows a code editor with JavaScript code open, specifically focusing on WebAssembly (WASM) file handling. The editor displays syntax highlighting and a file explorer on the left.](https://kodekloud.com/kk-media/image/upload/v1752874849/notes-assets/images/Exploring-WebAssembly-WASM-Demo-Running-a-Simple-C-application-in-Browser/javascript-wasm-file-handling-editor.jpg)

This snippet demonstrates how the `.wasm` binary is fetched and instantiated, completing the path from C source to browser execution.

## References

- [WebAssembly](https://webassembly.org)
- [Emscripten SDK](https://emscripten.org)
- [Visual Studio Code](https://code.visualstudio.com)
- [Google Chrome](https://www.google.com/chrome)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/exploring-webassembly-wasm/module/35f32a4b-b0a4-45ba-a4a8-827feffc5940/lesson/5faa1d73-f079-4ffb-bea5-f639e88b4a5a)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/exploring-webassembly-wasm/module/35f32a4b-b0a4-45ba-a4a8-827feffc5940/lesson/36283a85-1a9e-4c45-b475-a6c8bc7f5eb4)**
>
> Practice lab
