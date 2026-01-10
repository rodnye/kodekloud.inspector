# Demo WASM and Docker Integration - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Exploring-WebAssembly-WASM/Future-WebAssembly-in-Cloud/Demo-WASM-and-Docker-Integration)

---

## Table of Contents

- Demo WASM and Docker Integration
  - Prerequisites
  - 1. Write a simple C program
  - 2. Compile to a WASM binary
  - 3. Create the Dockerfile
  - 4. Build the Docker image
  - 5. Run the WASM container
  - Links and References
  - Watch Video

---

## Content

Exploring WebAssembly (WASM)

Future WebAssembly in Cloud

# Demo WASM and Docker Integration

Learn how to compile a simple C program to WebAssembly (WASM) using a WASI-compatible compiler and then package it into a Docker image with a minimal runtime.

> [!important]
> **Warning**
>
> Docker’s WASM integration is currently a beta feature available in a special technical-preview build of Docker Desktop. Refer to [Docker’s experimental WASM support](https://docs.docker.com/desktop/experimental-features/wasm/) when testing locally.

## Prerequisites

| Tool             | Version                    | Purpose                               |
| ---------------- | -------------------------- | ------------------------------------- |
| Clang (WASI SDK) | v16+                       | Compile C to WASM via WASI            |
| Docker Desktop   | Latest (technical preview) | Build and run WASM containers         |
| WasmEdge         | v0.14+                     | Execute the WASM binary inside Docker |

## 1\. Write a simple C program

Create a file named `helloworld.c`:

```
#include <stdio.h>


int main() {
    printf("hello, world\n");
    return 0;
}
```

## 2\. Compile to a WASM binary

Use the WASI SDK’s Clang to target `wasm32-wasi`:

```
clang --target=wasm32-wasi -O3 helloworld.c -o helloworld.wasm
```

This produces a standalone `helloworld.wasm` in your working directory.

## 3\. Create the Dockerfile

We’ll build **FROM scratch** so the final image only contains the WASM binary:

```
FROM scratch
COPY helloworld.wasm /helloworld.wasm
ENTRYPOINT [ "/helloworld.wasm" ]
```

Save this as `Dockerfile` alongside `helloworld.wasm`.

## 4\. Build the Docker image

Run:

```
cd path/to/your/project
docker build --platform=wasm/wasm32 -t helloworld-wasm .
```

> [!important]
> **Note**
>
> The `--platform=wasm/wasm32` flag instructs Docker to treat this as a WASM container.

## 5\. Run the WASM container

Execute with the WasmEdge runtime support in containerd:

```
docker run --rm \
  --name wasm-docker-c-program \
  --runtime=io.containerd.wasmedge.v1 \
  helloworld-wasm
```

You should see:

```
hello, world
```

Congratulations! You’ve compiled a C program to WebAssembly and run it inside a Docker container.

## Links and References

- [Docker’s experimental WASM support](https://docs.docker.com/desktop/experimental-features/wasm/)
- [WASI SDK releases](https://github.com/WebAssembly/wasi-sdk/releases)
- [WasmEdge runtime](https://github.com/WasmEdge/WasmEdge)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/exploring-webassembly-wasm/module/a9d35579-0f55-465c-8d70-eec38ff7c750/lesson/f5015961-66ac-4aba-b50e-419e7e356ac4)**
>
> Watch video content
