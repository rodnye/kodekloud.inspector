# Docker on Windows - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-SWARM-SERVICES-STACKS-Hands-on/Docker-on-Windows/Docker-on-Windows)

---

## Table of Contents

- Docker on Windows
  - Docker on Windows: Available Options
  - Conclusion
  - Watch Video
    - Docker Toolbox
    - Docker for Windows
      - Windows Containers

---

## Content

Docker - SWARM | SERVICES | STACKS - Hands-on

Docker on Windows

# Docker on Windows

Hello and welcome to this detailed lesson on Docker on Windows. My name is Mumshad Mannambeth, and in this session we explore advanced Docker concepts when using Docker on Windows. Remember, containers share the underlying OS kernel, which means you cannot run a Windows container on a Linux host or vice versa. Keep this important detail in mind as you review the available Docker options for Windows.

## Docker on Windows: Available Options

There are two primary methods to run Docker on Windows:

1.  Docker Toolbox
2.  Docker for Windows

---

### Docker Toolbox

Docker Toolbox was the original solution for Windows users looking to work with Docker when a native Linux environment was not directly available. This approach is ideal if you are working on a Windows system without a built-in Linux host in the lab or cloud.

In this scenario, you install virtualization software such as Oracle VirtualBox or VMware Workstation on your Windows machine, then deploy a Linux virtual machine (for example, Ubuntu or Debian) where Docker is installed. Keep in mind that this method does not support running Windows-based Docker images and containers; it is primarily used to run Docker on a Linux virtual machine hosted from Windows.

Docker Toolbox simplifies the setup by bundling several helpful tools, including:

- Oracle VirtualBox
- Docker Engine
- Docker Machine
- Docker Compose
- A user-friendly interface called Kitematic

Once you download and run the Docker Toolbox executable on your system, VirtualBox is automatically installed and a lightweight VM known as boot2docker is deployed, enabling you to get started with Docker without much hassle.

![A presentation slide about Docker Toolbox, featuring a person speaking, a computer screen with the Docker logo, and a list of related components.](https://kodekloud.com/kk-media/image/upload/v1752874102/notes-assets/images/Docker-SWARM-SERVICES-STACKS-Hands-on-Docker-on-Windows/frame_130.jpg)

> [!important]
> **Note**
>
> Ensure that your system meets the prerequisites: a 64-bit processor, Windows 7 or later, and that virtualization is enabled on your machine.

---

### Docker for Windows

Docker for Windows is the modern solution that leverages Microsoft's native virtualization technology, Hyper-V, and eliminates the need for third-party tools like Oracle VirtualBox. During installation, Docker for Windows automatically sets up a lightweight Linux system running Docker Engine on Hyper-V.

Because Docker for Windows uses Hyper-V, it is supported only on:

- Windows 10 Enterprise or Professional editions
- Windows Server 2016

![The image features a person discussing "Docker for Windows," highlighting Windows, Microsoft Hyper-V, and Docker logos, with support for Windows 10 Enterprise/Professional and Windows Server 2016.](https://kodekloud.com/kk-media/image/upload/v1752874103/notes-assets/images/Docker-SWARM-SERVICES-STACKS-Hands-on-Docker-on-Windows/frame_220.jpg)

By default, Docker for Windows is configured to use Linux containers. However, users have the option to switch to Windows containers if their projects require a Windows-based environment.

---

#### Windows Containers

Introduced in early 2016, Windows containers allow you to create and run Windows-based images on a Windows Server environment, similar to how Linux containers operate on Linux systems. With Windows containers, you can containerize Windows applications and distribute them via platforms like Docker Store or Docker Hub.

There are two types of Windows containers available:

1.  **Windows Server Containers:** These containers share the OS kernel with the host, much like Linux containers.
2.  **Hyper-V Isolated Containers:** Each container is deployed in its own lightweight virtual machine, ensuring complete kernel isolation and enhanced security between the container and the host.

In Linux environments, you often select from various base images like Ubuntu, Debian, Fedora, or Alpine in your Dockerfile. For Windows, you typically choose between:

- **Windows Server Core**
- **Nano Server** – a minimal, headless version that is conceptually similar to Alpine Linux.

Windows containers are supported on:

- Windows Server 2016
- Nano Server
- Windows 10 Professional and Enterprise editions (supporting only Hyper-V isolated containers)

![The image explains Windows Containers, showing container types, base images, and support details, with a person presenting the information.](https://kodekloud.com/kk-media/image/upload/v1752874105/notes-assets/images/Docker-SWARM-SERVICES-STACKS-Hands-on-Docker-on-Windows/frame_360.jpg)

> [!important]
> **Security Note**
>
> Using Hyper-V isolation, each container operates within its own optimized virtual machine, ensuring full kernel isolation and increased security between your containers.

---

## Conclusion

In this lesson, we explored the main options for running Docker on Windows: Docker Toolbox and Docker for Windows. We also covered the evolution of Windows containers, including both shared kernel and Hyper-V isolated configurations.

Next, you'll have the opportunity to see these configurations in action with a practical demo. Thank you for following this lesson. Stay tuned for more advanced Docker tutorials in the coming lessons.

For additional resources and further reading, check out:

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Docker Hub](https://hub.docker.com/)
- [Microsoft Hyper-V Documentation](https://docs.microsoft.com/en-us/virtualization/hyper-v-on-windows/)

Happy Dockering!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-swarm-services-stacks-hands-on/module/1aae051a-66e1-48d9-838c-c8cecf506c57/lesson/d0d987ca-5bc8-45ab-8d3d-1fea32982f28)**
>
> Watch video content
