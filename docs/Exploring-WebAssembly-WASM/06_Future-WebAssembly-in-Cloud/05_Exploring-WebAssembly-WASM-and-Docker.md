# Exploring WebAssembly WASM and Docker - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Exploring-WebAssembly-WASM/Future-WebAssembly-in-Cloud/Exploring-WebAssembly-WASM-and-Docker)

---

## Table of Contents

- Exploring WebAssembly WASM and Docker
  - Introduction
  - Understanding Docker’s Architecture Dependency
  - What Is WebAssembly (WASM) and WASI?
  - Hands-On Example: Rust Web Server
  - Browser Support
  - Host Interaction and Security
  - Combining Docker and WASM
  - Conclusion
  - References
  - Watch Video
    - 1. Compile to WASM
    - 2. Compare Package Sizes
    - 3. Running the Server
    - Docker Engine & Runtime Architecture

---

## Content

Exploring WebAssembly (WASM)

Future WebAssembly in Cloud

# Exploring WebAssembly WASM and Docker

## Introduction

Docker revolutionized software deployment by ensuring applications run identically across environments—whether on a developer’s laptop or a cloud server. However, Docker images remain tied to CPU architectures (Intel, ARM, etc.), often causing “works on my machine” problems.

WebAssembly (WASM) offers a platform-agnostic solution: precompiled binaries that run on any host with a compatible runtime—such as [Wasmtime](https://wasmtime.dev/) or [WasmEdge](https://wasmedge.org/)—regardless of CPU type. Instead of bundling full OS filesystems, WASM modules rely on the [WebAssembly System Interface (WASI)](https://wasi.dev/) for only the essential system calls.

## Understanding Docker’s Architecture Dependency

- Images contain OS layers and binaries compiled for specific CPUs
- Switching between x86_64 and ARM64 often requires rebuilding
- Typical Rust web server Docker images range from 100 MB to 200 MB

## What Is WebAssembly (WASM) and WASI?

WASM modules are lightweight binaries executed inside a sandboxed runtime. WASI exposes a minimal set of system interfaces, reducing attack surface and simplifying deployment.

![The image is a diagram showing how WASM (WebAssembly) modules and runtime can be used across different platforms, including mobile (ARM), servers (Intel), and desktop (AMD).](https://kodekloud.com/kk-media/image/upload/v1752874811/notes-assets/images/Exploring-WebAssembly-WASM-Exploring-WebAssembly-WASM-and-Docker/wasm-modules-runtime-diagram.jpg)

> [!important]
> **Note**
>
> WebAssembly’s sandboxed execution enhances security by limiting direct host access.
> WASI exposes only selected syscalls, keeping modules portable and efficient.

## Hands-On Example: Rust Web Server

We’ll demonstrate with a simple Rust HTTP server:

1.  Build and run a Docker container
2.  Compile the same code to a WASM binary (`wasm32-wasi`)
3.  Compare image sizes, startup times, and UX

### 1\. Compile to WASM

```
cargo build --target wasm32-wasi --release
```

### 2\. Compare Package Sizes

| Package      | Size Range      |
| ------------ | --------------- |
| Docker Image | 100 MB – 200 MB |
| WASM Binary  | 1 MB – 10 MB    |

![The image illustrates the size of a Docker image package, which is between 100-200 MB, with a graphic of a Docker whale and code.](https://kodekloud.com/kk-media/image/upload/v1752874812/notes-assets/images/Exploring-WebAssembly-WASM-Exploring-WebAssembly-WASM-and-Docker/docker-image-size-whale-graphic.jpg)

> [!important]
> **Size Comparison**
>
> WASM binaries are significantly smaller, reducing network transfer and storage overhead.

### 3\. Running the Server

```
docker run -p 3030:3030 rust-hello-world
wasmtime target/wasm32-wasi/release/myapp.wasm
```

- **Docker**: Container initialization takes seconds
- **WASM**: Wasmtime startup in milliseconds

![The image compares start-up times between containers and WebAssembly, highlighting container size and complexity versus smaller, fast, and efficient apps.](https://kodekloud.com/kk-media/image/upload/v1752874813/notes-assets/images/Exploring-WebAssembly-WASM-Exploring-WebAssembly-WASM-and-Docker/containers-vs-webassembly-startup-times.jpg)

## Browser Support

- **Docker**: Designed for servers and desktops
- **WASM**: Built for the web, runs in browsers without plugins

## Host Interaction and Security

| Aspect         | Docker Containers                        | WASM Modules (WASI)                       |
| -------------- | ---------------------------------------- | ----------------------------------------- |
| Host Access    | Direct OS calls via namespaces & cgroups | Sandboxed, only WASI syscalls             |
| Security Model | OS-level isolation                       | Runtime-level sandbox                     |
| Use Cases      | Stateful services, legacy apps           | Microservices, serverless, edge computing |

## Combining Docker and WASM

Rather than choosing one over the other, you can blend Docker’s portability with WASM’s performance. Docker Desktop’s technical preview supports WASM containers, enabling you to package WASM modules alongside traditional images.

![The image compares Docker and WASM, highlighting Docker's revolutionized deployment and high portability, and WASM's high security and efficiency.](https://kodekloud.com/kk-media/image/upload/v1752874814/notes-assets/images/Exploring-WebAssembly-WASM-Exploring-WebAssembly-WASM-and-Docker/docker-vs-wasm-deployment-comparison.jpg)

> [!important]
> **Warning**
>
> WASM container support in Docker Desktop is in technical preview and may change.

### Docker Engine & Runtime Architecture

- **Docker Engine**: Manages container lifecycle
- **Linux Containers**: `runc` + `containerd-shim`
- **WASM Containers**: `WasmEdge` + `containerd-wasm-shim`

![The image is a diagram showing the integration of Docker and WASM, with components like Docker Engine and containerd-wasm-shim, leading to multiple wasmedge instances.](https://kodekloud.com/kk-media/image/upload/v1752874815/notes-assets/images/Exploring-WebAssembly-WASM-Exploring-WebAssembly-WASM-and-Docker/docker-wasm-integration-diagram.jpg)

This integration streamlines deployment: you get Docker’s orchestration, WASM’s fast startup, and sandboxed security all in one workflow.

![The image outlines benefits to developers, highlighting early stage development, availability in Docker Desktop, and enhanced implementation and management.](https://kodekloud.com/kk-media/image/upload/v1752874816/notes-assets/images/Exploring-WebAssembly-WASM-Exploring-WebAssembly-WASM-and-Docker/developer-benefits-docker-desktop.jpg)

## Conclusion

By combining Docker and WASM, you can build cross-platform, secure, and lightweight applications that run seamlessly from cloud to edge to browser. As WASM support in Docker matures, expect deeper integration with Kubernetes and other cloud-native ecosystems.

## References

- [Wasmtime](https://wasmtime.dev/)
- [WasmEdge](https://wasmedge.org/)
- [WASI](https://wasi.dev/)
- [Kubernetes](https://kubernetes.io/)
- [Docker Documentation](https://docs.docker.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/exploring-webassembly-wasm/module/a9d35579-0f55-465c-8d70-eec38ff7c750/lesson/22eaa88c-7d23-4dc7-b5e7-ca0f69388675)**
>
> Watch video content
