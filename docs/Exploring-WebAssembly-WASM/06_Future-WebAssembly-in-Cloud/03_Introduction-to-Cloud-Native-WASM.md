# Introduction to Cloud Native WASM - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Exploring-WebAssembly-WASM/Future-WebAssembly-in-Cloud/Introduction-to-Cloud-Native-WASM)

---

## Table of Contents

- Introduction to Cloud Native WASM
  - Bytecode Alliance and Standalone Runtimes
  - Edge Compute and Kubernetes Integration
  - Core Pillars of Cloud-Native Architecture and WASM’s Role
  - Links and References
  - Watch Video
    - Microservices
    - Containers
    - Serverless
    - CI/CD Pipelines

---

## Content

Exploring WebAssembly (WASM)

Future WebAssembly in Cloud

# Introduction to Cloud Native WASM

Cloud-native applications are like beachfront homes: designed to endure shifting sands, high tides, and relentless sun. They automatically scale on demand, recover from failures, and adapt to traffic spikes. WebAssembly (WASM) complements this model with near-native performance, strict sandboxing, and cross-platform portability.

By merging WASM with cloud-native design, you get fast-starting services, minimal attack surfaces, and seamless deployments across any infrastructure.

![The image illustrates the concept of "Cloud-Native" with icons for cloud-native and WASM (WebAssembly), highlighting attributes like "Fast," "Safe," and "Anywhere."](https://kodekloud.com/kk-media/image/upload/v1752874817/notes-assets/images/Exploring-WebAssembly-WASM-Introduction-to-Cloud-Native-WASM/cloud-native-wasm-icons-attributes.jpg)

When you deploy WASM modules alongside containers and serverless functions, your applications handle peak traffic, self-heal from faults, and deliver ultra-low latency to users—no matter where they are.

## Bytecode Alliance and Standalone Runtimes

The [Bytecode Alliance](https://bytecodealliance.org/) unites industry leaders like Mozilla, Fastly, Intel, and Red Hat to standardize secure WASM runtimes outside the browser. Two flagship projects include:

| Runtime      | Compiler Type | Description                                                       |
| ------------ | ------------- | ----------------------------------------------------------------- |
| **Wasmtime** | JIT           | Production-grade WASM runtime with fast dynamic compilation.      |
| **Lucet**    | AOT           | Ahead-of-time compiler for instant startup and minimal footprint. |

> [!important]
> **Note**
>
> Both Wasmtime and Lucet target cloud scenarios—from microservices to edge functions—offering predictable performance and strict isolation.

![The image is a diagram titled "Adapted Cloud-Native WASM and Benefits," showing a section labeled "All Environment" with icons for "Alliance" and "WASM," alongside the terms "Wasmtime" and "Lucet."](https://kodekloud.com/kk-media/image/upload/v1752874818/notes-assets/images/Exploring-WebAssembly-WASM-Introduction-to-Cloud-Native-WASM/adapted-cloud-native-wasm-diagram.jpg)

## Edge Compute and Kubernetes Integration

**Fastly Compute@Edge** leverages WASM to run JavaScript, Rust, or C++ workloads at edge locations worldwide—shrinking response times and offloading origins. Meanwhile, **Krustlet** brings WASM to Kubernetes: it acts as a Kubelet replacement so you can schedule WASM modules (`.wasm` images) alongside containers.

- Compute@Edge: Ultra-low latency at edge POPs
- Krustlet: Run WASM pods through native Kubernetes APIs

## Core Pillars of Cloud-Native Architecture and WASM’s Role

Cloud-native philosophy centers on resilient, scalable services in dynamic infrastructures—public, private, or hybrid clouds.

![The image illustrates how WebAssembly (WASM) fits with the core pillars of cloud-native architecture, highlighting aspects like build, scale, public, private, and hybrid.](https://kodekloud.com/kk-media/image/upload/v1752874819/notes-assets/images/Exploring-WebAssembly-WASM-Introduction-to-Cloud-Native-WASM/wasm-cloud-native-architecture-diagram.jpg)

### Microservices

Breaking monoliths into independent microservices accelerates development cycles and isolates failures. Embedding WASM runtimes in each service ensures consistent sandboxing and performance across environments—from local dev to production clusters.

### Containers

Containers package code, libraries, and dependencies into portable units. Augment them with WASM for plugins, extensibility, or sidecar logic—benefiting from small binary sizes and stronger security boundaries.

![The image illustrates the core pillars of cloud-native technology, highlighting components like runtime, system tools, code, containers, and WebAssembly.](https://kodekloud.com/kk-media/image/upload/v1752874820/notes-assets/images/Exploring-WebAssembly-WASM-Introduction-to-Cloud-Native-WASM/cloud-native-technology-pillars.jpg)

### Serverless

Serverless platforms let you focus on functions, not infrastructure. Compiling functions to WASM means multi-language support, fast cold starts, and a unified, verifiable runtime across providers.

![The image illustrates the core pillars of cloud-native architecture, highlighting serverless computing, cloud providers, and WebAssembly (WASM) as key components.](https://kodekloud.com/kk-media/image/upload/v1752874821/notes-assets/images/Exploring-WebAssembly-WASM-Introduction-to-Cloud-Native-WASM/cloud-native-architecture-pillars.jpg)

> [!important]
> **Note**
>
> WASM-based serverless functions can run on any host that implements the WebAssembly System Interface (WASI), simplifying vendor portability.

### CI/CD Pipelines

Automated CI/CD workflows compile code (e.g., Rust, Go, C++) into WASM modules, run uniform tests in headless environments, and deploy artifacts across clusters or edge points—accelerating releases and ensuring consistency.

![The image illustrates the core pillars of a cloud-native process, showing a flow from coding in languages like C, Rust, and C++ to building and deploying WASM binaries through a CI/CD pipeline, followed by development, testing, staging, and production stages.](https://kodekloud.com/kk-media/image/upload/v1752874823/notes-assets/images/Exploring-WebAssembly-WASM-Introduction-to-Cloud-Native-WASM/cloud-native-process-pipeline.jpg)

---

## Links and References

- [Cloud Native Computing Foundation (CNCF)](https://www.cncf.io/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [WebAssembly.org](https://webassembly.org/)
- [Bytecode Alliance](https://bytecodealliance.org/)
- [Docker](https://www.docker.com/)
- [CI/CD Best Practices](https://martinfowler.com/bliki/Ci.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/exploring-webassembly-wasm/module/a9d35579-0f55-465c-8d70-eec38ff7c750/lesson/33b88e3c-adc7-4918-9c0d-d6bc58b786f5)**
>
> Watch video content
