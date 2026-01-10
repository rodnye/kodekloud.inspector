# A note on Docker Deprecation - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/Core-Concepts/A-note-on-Docker-Deprecation)

---

## Table of Contents

- A note on Docker Deprecation
  - Watch Video

---

## Content

Certified Kubernetes Application Developer - CKAD

Core Concepts

# A note on Docker Deprecation

Every time we mention Docker in this article, we receive questions like: Why discuss Docker if it's deprecated? This article aims to clarify the situation and dispel any confusion surrounding Docker's deprecation in Kubernetes.

Previously, Docker was the only supported container runtime for Kubernetes. Docker combined several essential components into one platform, including the Docker CLI, API, image build tools, volume support, security features, the container runtime (runc), and the daemon (containerd). However, to support a variety of runtimes, Kubernetes introduced the Container Runtime Interface (CRI).

The key takeaway is that the component containerd is CRI-compatible and operates directly with Kubernetes, independent of Docker’s other components. This means containerd can function as a standalone runtime. With containerd managing container operations, Kubernetes no longer depends on Docker-specific tools such as its CLI, API, or volume management, as these needs are now handled internally by Kubernetes.

![The image illustrates container runtimes, showing rkt, containerd, and Docker, with Kubernetes using the Container Runtime Interface (CRI). Docker is marked as deprecated.](https://kodekloud.com/kk-media/image/upload/v1752871167/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-A-note-on-Docker-Deprecation/frame_70.jpg)

> [!important]
> **Clarification**
>
> Kubernetes' deprecation of Docker as a runtime does not mean Docker is obsolete. It simply indicates that Kubernetes now uses containerd directly through CRI, bypassing Docker-specific integrations.

Docker remains the most popular container solution among developers for daily development and build processes. In discussions throughout this article, Docker is often used as an example to illustrate container concepts. This is acceptable because beginners typically start with Docker before transitioning to container orchestration with Kubernetes. For those who use containerd exclusively or do not have Docker installed, tools like [nerdctl](https://github.com/containerd/nerdctl) provide equivalent commands with a Docker-compatible interface.

![The image features the Docker logo, highlighting components like CLI, API, and security, with a transition from "docker" to "nerdctl" command.](https://kodekloud.com/kk-media/image/upload/v1752871168/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-A-note-on-Docker-Deprecation/frame_130.jpg)

For further reading on container runtimes and Kubernetes integrations, consider exploring these resources:

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [nerdctl GitHub Repository](https://github.com/containerd/nerdctl)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/eae8cedf-d483-471f-8796-49f69baec6cf/lesson/73b29769-5515-44f5-b6e8-2377a406ff2e)**
>
> Watch video content
