# A note on Docker Deprecation - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/kubernetes-for-the-absolute-beginners-hands-on-tutorial/Kubernetes-Overview/A-note-on-Docker-Deprecation)

---

## Table of Contents

- A note on Docker Deprecation
  - Watch Video
  - Practice Lab

---

## Content

Kubernetes for the Absolute Beginners - Hands-on Tutorial

Kubernetes Overview

# A note on Docker Deprecation

In this article, we address a frequently asked question: Why do we still discuss Docker if it has been deprecated as the container runtime in Kubernetes? Many learners have experienced confusion around Docker's deprecation, so this guide clarifies the topic and its implications.

Originally, Docker was the sole container runtime supported by Kubernetes. However, to accommodate additional runtimes, Kubernetes introduced the Container Runtime Interface (CRI). Docker historically combined several integrated tools, including:

- Docker CLI
- Docker API
- Build tools for image creation
- Volume management
- Security features
- The container runtime known as runc

![The image illustrates Docker's components and its integration with Kubernetes via the Container Runtime Interface (CRI), alongside the rkt container runtime.](https://kodekloud.com/kk-media/image/upload/v1752884885/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-A-note-on-Docker-Deprecation/frame_40.jpg)

Docker also featured a daemon that managed the runtime called containerd. Containerd is fully CRI-compatible and can interact directly with Kubernetes as other runtimes do. This means containerd functions as a standalone runtime independent of Docker, allowing Kubernetes to manage functionalities like the Docker CLI, API, and build tools on its own.

![The image illustrates container runtimes, showing rkt, containerd, and Docker, with Kubernetes using the Container Runtime Interface (CRI). Docker is marked as deprecated.](https://kodekloud.com/kk-media/image/upload/v1752884886/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-A-note-on-Docker-Deprecation/frame_70.jpg)

> [!important]
> **Key Insight**
>
> Although Kubernetes has deprecated Docker as its runtime, Docker itself remains an integral tool in container management. It continues to be the most popular container solution used in development and build processes.

When exploring container technologies, Docker is frequently used as a baseline example. This strategy is effective because it builds a solid foundation in understanding container fundamentals, which is essential before diving into advanced container orchestration with Kubernetes. Even if Docker is not installed on your machine, or if you are exclusively using containerd, you can typically substitute Docker commands with equivalent kubectl commands during tutorials and examples.

![The image shows Docker's logo with features like CLI, API, and security, suggesting a transition from Docker to nerdctl.](https://kodekloud.com/kk-media/image/upload/v1752884887/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-A-note-on-Docker-Deprecation/frame_130.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-for-the-absolute-beginners-hands-on-tutorial/module/101e958e-d0aa-4b44-8f0b-abda59a1e398/lesson/73b29769-5515-44f5-b6e8-2377a406ff2e)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/kubernetes-for-the-absolute-beginners-hands-on-tutorial/module/101e958e-d0aa-4b44-8f0b-abda59a1e398/lesson/52f89cce-7c35-4906-9d7b-e1353c571e70)**
>
> Practice lab
