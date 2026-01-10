# Creating a simple WebAssembly Module - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Exploring-WebAssembly-WASM/Getting-Started-with-WebAssembly/Creating-a-simple-WebAssembly-Module)

---

## Table of Contents

- Creating a simple WebAssembly Module
  - 1. Defining the Celsius→Fahrenheit Function
  - 2. Compiling to WebAssembly with Emscripten
  - 3. Loading and Running the WASM Module in JavaScript
  - Links and References
  - Watch Video
    - How It Works

---

## Content

Exploring WebAssembly (WASM)

Getting Started with WebAssembly

# Creating a simple WebAssembly Module

In this guide, you’ll learn how to build a WebAssembly (WASM) module that converts temperatures from Celsius to Fahrenheit. We’ll cover:

1.  Writing the C conversion function
2.  Compiling to a `.wasm` binary with Emscripten
3.  Loading and invoking the module from JavaScript

By the end, you’ll understand the end-to-end workflow of compiling native code into WebAssembly and integrating it into a web page.

> [!important]
> **Prerequisites**
>
> Make sure you have the [Emscripten SDK](https://emscripten.org/docs/introducing_emscripten/about_emscripten.html) installed and configured on your system. A basic understanding of C and JavaScript is assumed.

## 1\. Defining the Celsius→Fahrenheit Function

Create a file named `converter.c` with the following implementation:

```
// converter.c
double Celsius_to_Fahrenheit(double celsius) {
    return (celsius * 9.0 / 5.0) + 32.0;
}
```

This function applies the standard formula: multiply by 9/5, then add 32.

![The image is an example of a WebAssembly module for temperature unit conversion between Celsius and Fahrenheit, featuring a circular icon with a Celsius symbol.](https://kodekloud.com/kk-media/image/upload/v1752874846/notes-assets/images/Exploring-WebAssembly-WASM-Creating-a-simple-WebAssembly-Module/wasm-temperature-conversion-icon.jpg)

## 2\. Compiling to WebAssembly with Emscripten

Use the `emcc` compiler driver to produce a `.wasm` binary:

```
emcc -O3 -s WASM=1 -o converter.wasm converter.c
```

| Flag        | Purpose                                                         | Example                    |
| ----------- | --------------------------------------------------------------- | -------------------------- |
| `-O3`       | Aggressive optimizations for speed and size                     | `-O0`, `-O1`, `-O2`, `-O3` |
| `-s WASM=1` | Enables WebAssembly output (avoids emitting JavaScript wrapper) |                            |
| `-o`        | Sets the output filename                                        | `-o converter.wasm`        |
| source file | Your C source code                                              | `converter.c`              |

> [!important]
> **Optimization Levels**
>
> You can experiment with `-O0` (no optimizations) for faster builds during development.

After compilation, `converter.wasm` will export the `Celsius_to_Fahrenheit` function for JavaScript to consume.

## 3\. Loading and Running the WASM Module in JavaScript

To invoke your WASM module from the browser, follow these steps:

```
// script.js
async function runConverter() {
  // 1. Fetch the WASM file
  const response = await fetch('converter.wasm');
  const bytes = await response.arrayBuffer();


  // 2. Instantiate the WebAssembly module
  const { instance } = await WebAssembly.instantiate(bytes);


  // 3. Call the exported function
  const celsius = 30;
  const fahrenheit = instance.exports.Celsius_to_Fahrenheit(celsius);
  console.log(`${celsius}°C → ${fahrenheit}°F`);
}


runConverter().catch(console.error);
```

![The image illustrates a browser environment running a JavaScript (JS) module that interacts with a WebAssembly (WASM) file named "converter.wasm."](https://kodekloud.com/kk-media/image/upload/v1752874848/notes-assets/images/Exploring-WebAssembly-WASM-Creating-a-simple-WebAssembly-Module/browser-js-module-wasm-converter.jpg)

> [!important]
> **Browser Support**
>
> Some older browsers may not support streaming compilation or certain WASM features. Test on the latest versions of Chrome, Firefox, or Edge.

### How It Works

1.  **Fetch**: Retrieve `converter.wasm` via the `fetch` API.
2.  **Instantiate**: Convert the response into an `ArrayBuffer` and pass it to `WebAssembly.instantiate`.
3.  **Execute**: Call `instance.exports.Celsius_to_Fahrenheit` with a numeric argument.

This pattern lets you integrate high-performance, statically-typed code into your web applications.

## Links and References

- [Emscripten Documentation](https://emscripten.org/docs/introducing_emscripten/about_emscripten.html)
- [MDN WebAssembly Overview](https://developer.mozilla.org/docs/WebAssembly)
- [WebAssembly Specification](https://www.w3.org/TR/wasm-core-1/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/exploring-webassembly-wasm/module/35f32a4b-b0a4-45ba-a4a8-827feffc5940/lesson/f3b62365-10f2-42bf-a971-f46987757322)**
>
> Watch video content
