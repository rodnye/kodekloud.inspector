# A note on Docker Deprecation - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Core-Concepts/A-note-on-Docker-Deprecation)

---

## Table of Contents

- A note on Docker Deprecation
  - Background
  - Docker's Role in Modern Development
  - Watch Video

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Core Concepts

# A note on Docker Deprecation

In this lesson, we address common questions regarding Docker’s deprecation and clarify why Docker remains relevant despite its deprecated status in Kubernetes. This explanation aims to resolve the confusion many students experience.

## Background

Originally, Docker was the sole supported container runtime for Kubernetes. To enable compatibility with other container runtimes, the Container Runtime Interface (CRI) was introduced. Docker, as a complete platform, bundled several tools together, including:

- The Docker CLI
- The API
- Build tools for creating images
- Volume support
- Security configurations
- The container runtime (runc)
- The daemon (containerd) that managed the runtime

Containerd is now CRI-compatible and functions as a standalone component that interacts directly with Kubernetes. Thanks to this change, Kubernetes no longer depends on Docker’s additional tools since it manages container operations natively.

![The image illustrates container runtimes, showing rkt, containerd, and Docker, with Kubernetes using the Container Runtime Interface (CRI). Docker is marked as deprecated.](https://kodekloud.com/kk-media/image/upload/v1752869700/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-A-note-on-Docker-Deprecation/frame_70.jpg)

## Docker's Role in Modern Development

While Kubernetes has officially deprecated Docker as its runtime, Docker remains the most popular container solution for day-to-day development and build processes. Kubernetes simply leverages containerd for orchestration but many development practices still benefit from Docker’s extensive toolset.

> [!important]
> **Key Insight**
>
> Even though Kubernetes doesn’t require Docker for container orchestration, using Docker to understand container fundamentals remains beneficial. Once these basics are mastered, shifting focus to Kubernetes and containerd becomes more intuitive.

Throughout the course, Docker is used as a primary example to explain container concepts. This strategy allows learners to grasp fundamental ideas before transitioning to Kubernetes-specific orchestration. If Docker is not installed on your system or if you prefer using containerd, you can convert Docker commands to their equivalent [kubectl](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands) commands as needed.

This clarification sets the context for the remainder of the course and ensures a smooth transition from understanding container concepts with Docker to applying them within Kubernetes environments.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/c6d2ac7d-8192-4cff-aa54-e36d888c5bd9/lesson/73b29769-5515-44f5-b6e8-2377a406ff2e)**
>
> Watch video content
