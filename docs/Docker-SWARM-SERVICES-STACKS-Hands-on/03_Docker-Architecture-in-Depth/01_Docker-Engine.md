# Docker Engine - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-SWARM-SERVICES-STACKS-Hands-on/Docker-Architecture-in-Depth/Docker-Engine)

---

## Table of Contents

- Docker Engine
  - Components of Docker Engine
  - Containerization with Namespaces
  - Resource Management with Control Groups (Cgroups)
  - Watch Video
    - Process ID Namespaces

---

## Content

Docker - SWARM | SERVICES | STACKS - Hands-on

Docker Architecture in Depth

# Docker Engine

Welcome to this comprehensive lesson on Docker Engine. I'm Mumshad Mannambeth, and in this session, you'll gain advanced insights into Docker's architecture. We will examine how Docker isolates applications using containers, understand the inner workings of Docker Engine, and dive into the underlying technologies that enable containerization.

## Components of Docker Engine

Docker Engine is the core component running on a host where Docker is installed. On a Linux host, Docker sets up three primary components:

1.  **Docker Daemon** – A background process that manages all Docker objects, including images, containers, volumes, and networks.
2.  **Docker REST API Server** – An interface enabling applications and custom tools to communicate with the Docker daemon.
3.  **Docker CLI** – A command-line interface that allows you to execute commands for running and managing containers. It communicates with the Docker daemon using the REST API. Notably, the CLI can be installed on a separate machine (such as your local laptop) to control a remote Docker Engine by specifying the remote host's address and port.

![A person stands beside a diagram explaining Docker Engine components: Docker CLI, REST API, and Docker Daemon, on a blue background with circuit-like designs.](https://kodekloud.com/kk-media/image/upload/v1752874051/notes-assets/images/Docker-SWARM-SERVICES-STACKS-Hands-on-Docker-Engine/frame_40.jpg)

To communicate with a remote Docker Engine, use the `-H` option as shown below:

```
docker -H=remote-docker-engine:2375 run nginx
```

For example, if your remote Docker host has the IP address 10.123.2.1, the command becomes:

```
docker -H=10.123.2.1:2375 run nginx
```

## Containerization with Namespaces

Understanding namespaces is key to grasping how Docker containers isolate applications. Docker leverages several types of namespaces such as process IDs, network, mounts, and more, to ensure that containers operate independently, despite sharing the same host system.

![A person stands beside a diagram about containerization, featuring terms like "Namespace," "Process ID," "Unix Timesharing," "Network," "Mount," and "InterProcess."](https://kodekloud.com/kk-media/image/upload/v1752874053/notes-assets/images/Docker-SWARM-SERVICES-STACKS-Hands-on-Docker-Engine/frame_140.jpg)

### Process ID Namespaces

At the core of a Linux system is a single process with a process ID (PID) of one – the root process. As the system operates, more processes start with unique PIDs. When a container is launched, it mimics an independent system by creating its own root process (PID 1) even though its processes are part of the host's process table. Docker uses process ID namespaces to maintain this separation.

Inside a container, processes have two distinct views:

- The actual PID in the host's process table.
- A unique PID within the container's namespace, starting at 1.

For example, while the host might assign PIDs 5 and 6 to processes in a container, those processes are referenced as PID 1 and PID 2 inside the container.

![The image shows a person explaining Linux PID namespaces, illustrating a parent system with PIDs 1-6 and a child container system with PIDs 1 and 2.](https://kodekloud.com/kk-media/image/upload/v1752874054/notes-assets/images/Docker-SWARM-SERVICES-STACKS-Hands-on-Docker-Engine/frame_250.jpg)

When you run an NGINX server in a container, the service inside will show a PID of 1 (within the container), while on the host, it will have a different PID. This demonstrates how containers are isolated using namespaces, even though they share underlying host resources.

## Resource Management with Control Groups (Cgroups)

Both Docker hosts and their containers share system resources like CPU and memory. By default, a container can access all available resources, but Docker uses control groups (Cgroups) to restrict and manage these allocations.

For example, you can limit CPU usage by using the `--cpus` option. Setting this value to `0.5` ensures the container uses no more than 50% of the host's CPU capacity. Similarly, memory can be capped by specifying the `--memory` option (e.g., `100M` limits the container to 100 megabytes).

```
docker run --cpus=0.5 ubuntu
docker run --memory=100m ubuntu
```

![A person stands beside a diagram explaining CGroups in a Linux system, showing Docker containers managing CPU and memory resources.](https://kodekloud.com/kk-media/image/upload/v1752874054/notes-assets/images/Docker-SWARM-SERVICES-STACKS-Hands-on-Docker-Engine/frame_330.jpg)

> [!important]
> **Learn More About Resource Management**
>
> To explore additional resource management techniques and best practices for Docker containers, check out our extended documentation on [Docker Resource Management](https://docs.docker.com/config/containers/resource_constraints/).

That concludes our detailed discussion on Docker Engine. In future lessons, we will explore advanced topics such as Docker Storage and Filesystems. Stay tuned for more in-depth insights that will help you master containerization with Docker.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-swarm-services-stacks-hands-on/module/01c6c0f6-50bd-495b-a164-52a82eeebd79/lesson/0305612d-b944-4baf-b4e9-6078169eaf6b)**
>
> Watch video content
