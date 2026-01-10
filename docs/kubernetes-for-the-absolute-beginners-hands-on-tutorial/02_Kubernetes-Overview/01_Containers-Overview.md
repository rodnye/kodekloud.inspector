# Containers Overview - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/kubernetes-for-the-absolute-beginners-hands-on-tutorial/Kubernetes-Overview/Containers-Overview)

---

## Table of Contents

- Containers Overview
  - Containers and Docker Overview
  - What Are Containers?
  - Containers vs. Virtual Machines
  - Running Containerized Applications
  - Images vs. Containers
  - Streamlining Development and Operations
  - Conclusion
  - Watch Video

---

## Content

Kubernetes for the Absolute Beginners - Hands-on Tutorial

Kubernetes Overview

# Containers Overview

Welcome to this comprehensive overview of Kubernetes. In this article, we explore Kubernetes—a powerful open-source container orchestration platform initially developed by Google. To truly appreciate Kubernetes, it's essential to understand core concepts like containers and orchestration. Once these concepts are clear, Kubernetes’ capabilities become much easier to grasp.

We begin by examining containers.

![The image describes Kubernetes, also known as K8s, highlighting its role in container orchestration.](https://kodekloud.com/kk-media/image/upload/v1752884893/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Containers-Overview/frame_50.jpg)

## Containers and Docker Overview

Let's dive into containers by exploring Docker, the most popular container technology available. If you're already comfortable with Docker, feel free to continue to later sections. Otherwise, this section will cover the essential fundamentals.

![The image features a blue and white design with the word "Containers" and an icon of an open box, along with the name "mumshad mannambeth" at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752884894/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Containers-Overview/frame_70.jpg)

My name is Mumshad Mannambeth, and I'll guide you through the fundamentals of Docker. My first encounter with Docker was during a project where we built an end-to-end technology stack. This stack included a Node.js web server, a MongoDB database, a Redis messaging system, and an orchestration tool like Ansible. We faced several challenges during this project:

1.  Hardware and operating system compatibility across different components.
2.  Dependency conflicts where one application required a specific library version while another needed a different one.
3.  Constantly evolving application architecture, which I often refer to as the "matrix from hell."
4.  Onboarding complexities, as new developers had to meticulously follow extensive setup instructions, leading to inconsistencies among development, testing, and production environments.

![A person stands beside a diagram explaining the need for containers, featuring Node.js, Express, MongoDB, Redis, and Ansible, with interconnected layers of libraries, dependencies, OS, and hardware.](https://kodekloud.com/kk-media/image/upload/v1752884896/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Containers-Overview/frame_140.jpg)

To overcome these challenges, we turned to Docker. Docker enabled us to encapsulate each component in its own container, bundled with all necessary libraries and dependencies. This approach allowed everything to run on the same virtual machine (VM) and host operating system. With a single Docker configuration, developers could initiate work using a simple Docker run command, independent of platform differences—as long as Docker is installed.

![A person stands beside a diagram explaining containerized applications using Docker, featuring Node.js, MongoDB, CouchDB, Redis, and Ansible, layered over OS and hardware infrastructure.](https://kodekloud.com/kk-media/image/upload/v1752884897/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Containers-Overview/frame_260.jpg)

## What Are Containers?

Containers are isolated environments that can run their own processes and services, manage mounts, and have dedicated networking interfaces—much like virtual machines (VMs). However, containers are more efficient because they share the host's OS kernel rather than carrying separate OS images. Although container technology has been around for about a decade (with examples like LXC, LXD, and LXCFS), Docker revolutionized container usage by providing a high-level interface with enhanced functionality.

![The image explains containers, showing a person presenting a diagram with containers, Docker, and OS Kernel layers, highlighting processes, network, and mounts.](https://kodekloud.com/kk-media/image/upload/v1752884898/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Containers-Overview/frame_320.jpg)

To better understand Docker, it's helpful to revisit some operating system basics. Popular operating systems such as Ubuntu, Fedora, SUSE, or CentOS consist of two main components:

1.  The OS kernel, which directly interacts with the hardware.
2.  A suite of software that differentiates one distribution from another (including user interfaces, drivers, compilers, file managers, and developer tools).

Since Docker containers share the host's Linux kernel, you can run containers based on various Linux distributions (like Debian, Fedora, SUSE, or CentOS) on an Ubuntu host. However, because containers rely on the Linux kernel, Windows-based containers cannot run on a Linux Docker host; you need Docker installed on a Windows server for that type of deployment.

![A person stands in front of a diagram explaining operating systems, featuring logos of various Linux distributions and a layered structure showing software and OS kernel components.](https://kodekloud.com/kk-media/image/upload/v1752884899/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Containers-Overview/frame_360.jpg)

![A person stands beside a diagram explaining kernel sharing in Docker, featuring various software containers on an Ubuntu operating system.](https://kodekloud.com/kk-media/image/upload/v1752884900/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Containers-Overview/frame_430.jpg)

> [!important]
> **Note**
>
> Docker's goal is not to virtualize different operating systems like hypervisors do; instead, it focuses on containerizing and deploying applications with consistent behavior across environments.

## Containers vs. Virtual Machines

Understanding the differences between Docker containers and virtual machines (VMs) is crucial. Here's a brief comparison:

- In a Docker-based architecture, the flow is:  
  Hardware → Operating System → Docker → Containers (with their own libraries and dependencies)
- In a VM setup, the flow is:  
  Hardware → Host Operating System → Hypervisor (e.g., ESXi) → Virtual Machines (each with its own guest OS, libraries, and applications)

![The image compares containers and virtual machines, illustrating their architecture layers, including applications, dependencies, operating systems, and infrastructure.](https://kodekloud.com/kk-media/image/upload/v1752884901/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Containers-Overview/frame_530.jpg)

Docker containers are lightweight (typically measured in megabytes) and boot in seconds. In contrast, VMs require more disk space (often in gigabytes) and take minutes to boot since each VM runs a complete operating system. While Docker containers provide less isolation—by sharing the host kernel—VMs offer complete isolation with separate OS instances.

![The image compares containers and virtual machines, highlighting differences in utilization, size, and boot-up, with a diagram and a person explaining.](https://kodekloud.com/kk-media/image/upload/v1752884902/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Containers-Overview/frame_570.jpg)

## Running Containerized Applications

Today, many containerized applications are available in public Docker registries such as Docker Hub or Docker Store. These registries host images for operating systems, databases, and various services. Once you identify the necessary images, you can install Docker on your host and deploy your application stack with a single command. For instance, to deploy services like Ansible, MongoDB, Redis, or Node.js, you can use:

```
docker run ansible
docker run mongodb
docker run redis
docker run nodejs
```

When deploying a service like Node.js, simply point to your code repository on the host. In cases where multiple instances are needed, running several containers concurrently and configuring a load balancer to distribute traffic is straightforward. If an instance fails, quickly destroying it and launching a new one is one of Docker's advantages. More advanced solutions for managing container lifecycles will be covered later in this article.

## Images vs. Containers

It's important to distinguish between images and containers. An image is a template, similar to a VM template, used to create one or more containers. Containers are the running instances of these images, each operating as an isolated environment with its own processes.

![The image explains the difference between a Docker image and Docker containers, illustrating how one image can create multiple containers.](https://kodekloud.com/kk-media/image/upload/v1752884903/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Containers-Overview/frame_710.jpg)

If you can't find a specific image in a public registry, you have the option to create your own and push it to Docker Hub for public access.

## Streamlining Development and Operations

Traditionally, development and deployment were separate processes. Developers built the application, and then the operations team used detailed instructions to deploy and manage it. This handoff often led to misconfigurations and delays. With Docker, developers can package setup instructions directly into a Dockerfile, ensuring that the same environment is utilized in both development and production. This approach minimizes deployment issues, as the operations team works with a pre-tested image.

![The image illustrates the "Container Advantage," showing a developer with "App.war" and "DockerFile" icons, and an operations person, highlighting streamlined deployment.](https://kodekloud.com/kk-media/image/upload/v1752884904/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Containers-Overview/frame_780.jpg)

## Conclusion

Docker simplifies containerization by resolving compatibility issues, accelerating environment setup, and ensuring consistent deployments across diverse environments. With an abundance of containerized application images available, Docker’s lightweight and efficient design sets it apart from traditional virtual machines. This article has provided an overview of containers, Docker fundamentals, and a comparison between containers and VMs, paving the way for a deeper exploration of container orchestration through Kubernetes.

For further learning, consider exploring additional courses such as [Docker Training Course for the Absolute Beginner](https://learn.kodekloud.com/user/courses/docker-training-course-for-the-absolute-beginner) and [Docker - SWARM | SERVICES | STACKS - Hands-on](https://learn.kodekloud.com/user/courses/docker-swarm-services-stacks-hands-on) to gain practical experience with Docker commands and Dockerfiles.

![The image shows two Docker courses on sale, highlighting "Docker - SWARM | SERVICES | STACKS" and "Docker for the Absolute Beginner," with ratings and discounted prices.](https://kodekloud.com/kk-media/image/upload/v1752884906/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Containers-Overview/frame_830.jpg)

Thank you for reading this article on containers and Docker. See you in the next article!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-for-the-absolute-beginners-hands-on-tutorial/module/101e958e-d0aa-4b44-8f0b-abda59a1e398/lesson/83a32118-c13e-46a7-8990-1866708ce02c)**
>
> Watch video content
