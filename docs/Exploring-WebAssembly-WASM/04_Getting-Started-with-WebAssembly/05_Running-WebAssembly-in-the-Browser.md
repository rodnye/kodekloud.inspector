# Running WebAssembly in the Browser - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Exploring-WebAssembly-WASM/Getting-Started-with-WebAssembly/Running-WebAssembly-in-the-Browser)

---

## Table of Contents

- Running WebAssembly in the Browser
  - 1. Loading and Instantiating WASM with JavaScript
  - 2. JavaScript ↔ WebAssembly Memory Sharing
  - 3. A Simple HTML Example
  - 4. How Browsers Run WebAssembly
  - Links and References
  - Watch Video
    - Streaming Instantiation
    - Fallback for Older Browsers

---

## Content

Exploring WebAssembly (WASM)

Getting Started with WebAssembly

# Running WebAssembly in the Browser

After compiling our temperature-converter to a WebAssembly module, you can load and execute it directly in the browser using JavaScript as a bridge. In this guide, we’ll cover:

- Fetching and instantiating a `.wasm` module
- Sharing memory between JavaScript and WebAssembly
- Building a minimal HTML example
- Understanding how browsers run WebAssembly

![The image shows a computer screen displaying a temperature converter application with Celsius and Fahrenheit symbols. There's also a rocket icon above the screen and the word "Introduction" on the left.](https://kodekloud.com/kk-media/image/upload/v1752874852/notes-assets/images/Exploring-WebAssembly-WASM-Running-WebAssembly-in-the-Browser/temperature-converter-app-introduction.jpg)

## 1\. Loading and Instantiating WASM with JavaScript

The easiest way to download and compile a `.wasm` module in one step is with `WebAssembly.instantiateStreaming`. Modern browsers support this API, but if you need to support older environments, a two-step fallback is required.

| Approach                         | Browser Support | Behavior                                   |
| -------------------------------- | --------------- | ------------------------------------------ |
| `instantiateStreaming`           | Modern browsers | Streams fetch → compile → instantiate      |
| `fetch` → `instantiate` fallback | Legacy browsers | Downloads binary → compiles → instantiates |

> [!important]
> **Ensure correct MIME type**
>
> Your server must serve `.wasm` files with `application/wasm`. Otherwise, streaming instantiation will fail.

### Streaming Instantiation

```
const importObject = {};


WebAssembly.instantiateStreaming(
  fetch('converter.wasm'),
  importObject
).then(({ instance }) => {
  const result = instance.exports.celsius_to_fahrenheit(25);
  console.log(`25°C is ${result}°F`);
}).catch(err => {
  console.error('WASM streaming failed:', err);
});
```

### Fallback for Older Browsers

```
fetch('converter.wasm')
  .then(resp => resp.arrayBuffer())
  .then(buffer =>
    WebAssembly.instantiate(buffer, importObject)
  )
  .then(({ instance }) => {
    const result = instance.exports.celsius_to_fahrenheit(25);
    console.log(`25°C is ${result}°F`);
  })
  .catch(err => {
    console.error('WASM instantiation failed:', err);
  });
```

Both methods produce an `instance` whose `exports` object contains your converter function.

## 2\. JavaScript ↔ WebAssembly Memory Sharing

JavaScript and WebAssembly exchange data through **linear memory**—a shared `ArrayBuffer` where both sides can read and write.

![The image illustrates how JavaScript bridges the gap for WebAssembly in the browser, showing a connection between WebAssembly and JavaScript through a shared memory space.](https://kodekloud.com/kk-media/image/upload/v1752874854/notes-assets/images/Exploring-WebAssembly-WASM-Running-WebAssembly-in-the-Browser/javascript-webassembly-connection-diagram.jpg)

WebAssembly’s linear memory is simply a contiguous array of bytes:

![The image illustrates the concept of WebAssembly's linear memory, featuring an icon and a graphic of storage shelves.](https://kodekloud.com/kk-media/image/upload/v1752874855/notes-assets/images/Exploring-WebAssembly-WASM-Running-WebAssembly-in-the-Browser/webassembly-linear-memory-graphic.jpg)

When JavaScript needs to pass a value (like the number 25) to WebAssembly:

1.  JS writes the value into the shared buffer.
2.  WASM reads it, performs the conversion, and writes the result back.
3.  JS reads the converted value (e.g., 77) from the same buffer.

![The image illustrates the concept of shared memory between JavaScript and WebAssembly, featuring icons for both technologies and a storage shelf symbolizing shared memory.](https://kodekloud.com/kk-media/image/upload/v1752874856/notes-assets/images/Exploring-WebAssembly-WASM-Running-WebAssembly-in-the-Browser/shared-memory-javascript-webassembly.jpg)

> [!important]
> **Note**
>
> By default, linear memory grows in 64 KB pages. You can configure initial and maximum sizes in your toolchain.

## 3\. A Simple HTML Example

Combine everything into a minimal web page:

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Temperature Converter</title>
</head>
<body>
  <label>
    Enter Celsius:
    <input id="celsiusInput" type="number" />
  </label>
  <button onclick="convert()">Convert</button>
  <div id="output"></div>


  <script src="script.js"></script>
</body>
</html>
```

In **script.js**, handle both instantiation paths and wire up the `convert()` function:

```
const importObject = {};
let wasmInstance = null;


// Try streaming instantiation
WebAssembly.instantiateStreaming(fetch('converter.wasm'), importObject)
  .then(({ instance }) => {
    wasmInstance = instance;
  })
  .catch(() => {
    // Fallback
    return fetch('converter.wasm')
      .then(res => res.arrayBuffer())
      .then(buffer => WebAssembly.instantiate(buffer, importObject))
      .then(({ instance }) => {
        wasmInstance = instance;
      });
  });


function convert() {
  const c = parseFloat(
    document.getElementById('celsiusInput').value
  );
  const f = wasmInstance.exports.celsius_to_fahrenheit(c);
  document.getElementById('output').innerText =
    `That's ${f.toFixed(2)}°F!`;
}
```

Open the page in your browser, input a Celsius value, and click **Convert**—the result comes straight from WebAssembly.

![The image shows a browser window with a temperature conversion tool, converting 22 degrees Celsius to 75 degrees Fahrenheit. The title mentions ensuring compatibility with WebAssembly instantiate options.](https://kodekloud.com/kk-media/image/upload/v1752874857/notes-assets/images/Exploring-WebAssembly-WASM-Running-WebAssembly-in-the-Browser/temperature-conversion-tool-browser.jpg)

## 4\. How Browsers Run WebAssembly

Browsers like Chrome (V8), Firefox (SpiderMonkey), Safari, and Edge integrate WebAssembly support directly into their JavaScript engines. They treat `.wasm` as bytecode, decoding and compiling it alongside JS.

When a `.wasm` module loads, the engine:

1.  Parses the binary format.
2.  Compiles it to native machine code.
3.  Links it with the JS context (including linear memory).

![The image illustrates the concept of a WASM (WebAssembly) browser runtime, showing a connection between a "WA" module and "Bytecode" with binary digits, along with performance-related icons.](https://kodekloud.com/kk-media/image/upload/v1752874858/notes-assets/images/Exploring-WebAssembly-WASM-Running-WebAssembly-in-the-Browser/wasm-browser-runtime-diagram.jpg)

This approach allows WebAssembly to leverage the same JIT optimizations, garbage collection, and security sandbox as JavaScript.

| Engine  | JavaScript Engine | WebAssembly Engine |
| ------- | ----------------- | ------------------ |
| Chrome  | V8                | Integrated WAsm    |
| Firefox | SpiderMonkey      | Integrated WAsm    |
| Safari  | JavaScriptCore    | Integrated WAsm    |
| Edge    | Chakra/Sparta     | Integrated WAsm    |

![The image illustrates a comparison between WebAssembly (WASM) and JavaScript (JS) engines, featuring icons for each and a question mark under the WASM section.](https://kodekloud.com/kk-media/image/upload/v1752874859/notes-assets/images/Exploring-WebAssembly-WASM-Running-WebAssembly-in-the-Browser/wasm-vs-js-engine-comparison.jpg)

![The image illustrates a computer screen displaying a browser with icons for WebAssembly (WA) and JavaScript (JS), indicating an active WASM browser runtime.](https://kodekloud.com/kk-media/image/upload/v1752874859/notes-assets/images/Exploring-WebAssembly-WASM-Running-WebAssembly-in-the-Browser/wasm-browser-runtime-icons.jpg)

By understanding these internals, you can harness WebAssembly to accelerate compute-intensive tasks and integrate seamlessly with your existing JavaScript code.

## Links and References

- [MDN WebAssembly Guide](https://developer.mozilla.org/en-US/docs/WebAssembly)
- [MDN Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Can I use `instantiateStreaming`](https://caniuse.com/?search=instantiateStreaming)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/exploring-webassembly-wasm/module/35f32a4b-b0a4-45ba-a4a8-827feffc5940/lesson/d5c1a04f-eb81-4fb7-9528-5e1a168c61bc)**
>
> Watch video content
