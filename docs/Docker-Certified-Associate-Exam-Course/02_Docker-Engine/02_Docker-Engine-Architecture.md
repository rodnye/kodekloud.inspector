# Docker Engine Architecture - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Engine/Docker-Engine-Architecture)

---

## Table of Contents

- Docker Engine Architecture
  - Key Components
  - From LXC to Libcontainer
  - The Open Container Initiative (OCI)
  - Core Docker Objects
  - Docker Registry
  - Container Creation Flow
  - Verifying Your Installation
  - References
  - Watch Video

---

## Content

Docker Certified Associate Exam Course

Docker Engine

# Docker Engine Architecture

In this article, we dive into Docker Engine architecture, exploring its core components, how it evolved from LXC to Libcontainer, and the standards defined by the Open Container Initiative (OCI). You’ll also learn about key Docker objects, the registry model, the container creation flow, and how to verify your Docker installation.

---

## Key Components

Docker Engine consists of three primary parts that work together to build, ship, and run containers:

- **Docker Daemon (`dockerd`)**  
  The background service that manages images, containers, networks, and volumes on your host.
- **REST API**  
  A set of HTTP endpoints that expose the daemon’s functionality to clients and automation tools.
- **Docker CLI (`docker`)**  
  The command-line interface that sends commands to the REST API.

---

## From LXC to Libcontainer

When Docker launched in 2013, it used [Linux Containers (LXC)](https://linuxcontainers.org/) to isolate processes via namespaces and cgroups. By version 0.9, Docker introduced **Libcontainer**, a Go library that interfaces directly with kernel primitives—eliminating the LXC dependency and simplifying container management.

---

## The Open Container Initiative (OCI)

Before 2015, container formats and runtimes were fragmented. Docker, CoreOS, and other industry leaders formed the **Open Container Initiative (OCI)** to standardize:

1.  **Runtime Specification**  
    Defines lifecycle operations (`create`, `start`, `delete`, etc.).
2.  **Image Specification**  
    Specifies how container images are formatted and distributed.

With these standards, Docker Engine 1.11 was refactored into modular components:

![The image illustrates the Docker Engine Architecture, showing components like Docker CLI, REST API, Docker Daemon, runC, and OCI specifications. It also includes a timeline with key years and versions.](https://kodekloud.com/kk-media/image/upload/v1752873906/notes-assets/images/Docker-Certified-Associate-Exam-Course-Docker-Engine-Architecture/docker-engine-architecture-diagram.jpg)

- **runC**  
  The OCI-compliant runtime that handles low-level container operations.
- **containerd**  
  A daemon responsible for managing runC instances, image transfer, and storage.
- **containerd-shim**  
  Allows containers to keep running independently of containerd, ensuring resilience if the daemon restarts.

![The image illustrates the Docker Engine Architecture, showing components like Docker CLI, REST API, Docker Daemon, containerd, and runC, along with a timeline and OCI specifications.](https://kodekloud.com/kk-media/image/upload/v1752873907/notes-assets/images/Docker-Certified-Associate-Exam-Course-Docker-Engine-Architecture/docker-engine-architecture-diagram-2.jpg)

---

## Core Docker Objects

Docker Engine manages four primary resource types:

| Object         | Description                                                                  |
| -------------- | ---------------------------------------------------------------------------- |
| **Images**     | Read-only templates composed of layered filesystem snapshots and metadata.   |
| **Containers** | Instances of images providing a writable layer and running processes.        |
| **Networks**   | Virtual networks enabling container-to-container and external communication. |
| **Volumes**    | Persistent storage volumes decoupled from container lifecycles.              |

![The image illustrates Docker objects, including images (CentOS and NGINX), networks, containers, and volumes, with a visual representation for each category.](https://kodekloud.com/kk-media/image/upload/v1752873908/notes-assets/images/Docker-Certified-Associate-Exam-Course-Docker-Engine-Architecture/docker-objects-images-networks-containers.jpg)

---

## Docker Registry

A **registry** is a service for storing and distributing Docker images:

- **Docker Hub** (default public registry)
- **Private Registry** (self-hosted)
- **Docker Trusted Registry (DTR)** (enterprise-grade, on-premises)

---

## Container Creation Flow

When you run `docker run`, Docker follows a series of steps:

1.  **CLI to API**  
    The Docker CLI translates your command into a REST API call.
2.  **Daemon Processing**  
    The daemon checks for the image locally or pulls it from the registry.
3.  **containerd**  
    Converts the image into an OCI bundle.
4.  **containerd-shim**  
    Hands off the bundle to runC and monitors the container’s lifecycle.
5.  **runC**  
    Uses kernel namespaces and cgroups to spawn and isolate the container.

Example:

```
docker container run -it ubuntu
```

---

## Verifying Your Installation

After installing Docker on CentOS or Ubuntu, confirm that everything is set up correctly:

```
docker version
```

Sample output:

```
Client: Docker Engine - Community
 Version:           19.03.5
 API version:       1.40
 Go version:        go1.12.12

Server: Docker Engine - Community
 Engine:
  Version:          19.03.5
  API version:      1.40 (minimum version 1.12)
 containerd:
  Version:          1.2.10
 runc:
  Version:          1.0.0-rc8+dev
```

Check the CLI version:

```
docker --version
# Docker version 19.03.5, build 633a0ea
```

And get system-wide details:

```
docker system info
```

Sample excerpt:

```
Server:
 Containers: 0
 Running: 0
 Images: 0
 Server Version: 19.03.5
 Storage Driver: overlay2
```

---

## References

- [Docker Official Documentation](https://docs.docker.com/)
- [Open Container Initiative](https://opencontainers.org/)
- [Docker Hub](https://hub.docker.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/871494af-49f8-42e9-95e9-cb0df80c2b21/lesson/a5f2fdd6-86ad-44d2-a4e0-e9c164f4ae3a)**
>
> Watch video content
