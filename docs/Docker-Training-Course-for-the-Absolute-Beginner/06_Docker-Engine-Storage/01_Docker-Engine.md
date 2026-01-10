# Docker Engine - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Training-Course-for-the-Absolute-Beginner/Docker-Engine-Storage/Docker-Engine)

---

## Table of Contents

- Docker Engine
  - Core Components of Docker on Linux
  - How Containers Isolate Applications
  - Managing Resources with cgroups
  - Summary
  - Watch Video
    - Understanding Process ID (PID) Namespaces

---

## Content

Docker Training Course for the Absolute Beginner

Docker Engine Storage

# Docker Engine

Welcome to this in-depth guide on Docker Engine. In this article, we explore Docker's architecture, the mechanics behind containerized applications, and the underlying processes that make Docker so powerful.

## Core Components of Docker on Linux

When you install Docker on a Linux host, you are integrating three essential components:

1.  **Docker Daemon:**  
    A background process that manages Docker objects such as images, containers, volumes, and networks.
2.  **Docker REST API Server:**  
    An interface enabling programs to communicate with the daemon. This API facilitates the development of custom tools and integrations.
3.  **Docker CLI:**  
    A command-line interface used to execute operations such as starting or stopping containers and managing images. The CLI communicates with the Docker daemon via the REST API.

> [!important]
> **Remote Management**
>
> It is important to note that the Docker CLI does not need to be on the same host as the Docker Engine. You can install it on a remote system (e.g., your laptop) and connect to a remote Docker Engine using the `-H` option, specifying the host address and port.

![The image illustrates the Docker Engine architecture, showing components: Docker CLI, REST API, and Docker Daemon, with a whale graphic in the background.](https://kodekloud.com/kk-media/image/upload/v1752874137/notes-assets/images/Docker-Training-Course-for-the-Absolute-Beginner-Docker-Engine/frame_80.jpg)

For example, to run an Nginx container on a remote Docker host, use the command below:

```
docker -H=10.123.2.1:2375 run nginx
```

## How Containers Isolate Applications

Docker leverages Linux namespaces to isolate various system resources including:

- Workspaces
- Process IDs
- Network interfaces
- Inter-process communication (IPC)
- Filesystem mounts
- Unix time-sharing systems

This isolation provides containers with the appearance of independent systems while sharing hardware resources with the host.

![The image illustrates containerization, showing a central "Namespace" connected to "Process ID," "Unix Timesharing," "Mount," "Network," and "InterProcess."](https://kodekloud.com/kk-media/image/upload/v1752874138/notes-assets/images/Docker-Training-Course-for-the-Absolute-Beginner-Docker-Engine/frame_140.jpg)

### Understanding Process ID (PID) Namespaces

At system boot, Linux starts with a single process (PID 1) which then branches out to create all subsequent processes. When a container is created, it obtains its own PID namespace. This means that:

- Processes inside the container appear to start from PID 1.
- In reality, these processes are managed by the host system with their own unique PID assignments.

For example, if you deploy an Nginx server inside a container, it may show as PID 1 within the container, even though it has a different PID when observed from the host using commands like `ps`.

![The image illustrates a Linux system's PID namespace, showing process IDs in the main system and a child container.](https://kodekloud.com/kk-media/image/upload/v1752874139/notes-assets/images/Docker-Training-Course-for-the-Absolute-Beginner-Docker-Engine/frame_240.jpg)

## Managing Resources with cgroups

Containers by default can use as much resource as they require, which may lead to resource exhaustion on the host. Docker utilizes Linux control groups (cgroups) to constrain the hardware resources available to each container, ensuring efficient resource management.

![The image illustrates a Linux system using cgroups to manage resources like CPU and memory for Docker containers.](https://kodekloud.com/kk-media/image/upload/v1752874140/notes-assets/images/Docker-Training-Course-for-the-Absolute-Beginner-Docker-Engine/frame_320.jpg)

You can limit resource usage by employing options such as `--cpus` and `--memory`. For instance, to restrict a container to using only 50% of the host CPU and 100 megabytes of memory, run:

```
docker run --cpus=0.5 ubuntu
docker run --memory=100m ubuntu
```

## Summary

This article provided an overview of Docker Engine’s architecture, the role of Linux namespaces in container isolation, and resource management via cgroups. For a deeper dive into these topics, consider exploring additional resources and Docker documentation.

In the next article, we will delve into advanced topics such as Docker storage and file systems. Stay tuned!

Transcribed by [Otter.ai](https://otter.ai)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-training-course-for-the-absolute-beginner/module/8eec0a67-f2a1-4b9b-8c25-9c9ddc3e48b6/lesson/79bc077c-b4f2-48fe-b094-0db12b9c5888)**
>
> Watch video content
