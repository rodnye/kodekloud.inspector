# Docker on Windows - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Training-Course-for-the-Absolute-Beginner/Docker-on-Mac-Windows/Docker-on-Windows)

---

## Table of Contents

- Docker on Windows
  - Docker Toolbox
  - Docker Desktop for Windows
  - Final Considerations
  - Watch Video

---

## Content

Docker Training Course for the Absolute Beginner

Docker on Mac Windows

# Docker on Windows

In this guide, we explore how Docker operates on Windows and outline the available options for running Docker containers on a Windows host. A key concept to remember is that containers share the underlying operating system kernel. This means you cannot run a Windows container on a Linux host or vice versa. Let’s dive into the two primary solutions available for Docker on Windows.

## Docker Toolbox

Docker Toolbox is the legacy method for running Docker on Windows. Imagine working on a Windows laptop without direct access to a Linux system—whether in a lab or the cloud—but still wanting to experiment with Docker. In such cases, you can install virtualization software (such as Oracle VirtualBox or VMware Workstation) on your Windows machine and deploy a Linux virtual machine (for example, Ubuntu or Debian). Once Docker is installed on the Linux VM, you’re ready to experiment.

Docker Toolbox simplifies this process by bundling several components together:

- Oracle VirtualBox
- Docker Engine
- Docker Machine
- Docker Compose
- Kitematic (a graphical user interface)

By downloading and running the Docker Toolbox installer, VirtualBox is automatically set up and a lightweight Linux VM, Boot2Docker, is deployed with Docker pre-installed. This approach enables users to quickly get started with Docker on a Windows host.

![The image describes the Docker toolbox, featuring components like Oracle VirtualBox, Docker Engine, Docker Machine, Docker Compose, and Kitematic GUI, with related visuals.](https://kodekloud.com/kk-media/image/upload/v1752874156/notes-assets/images/Docker-Training-Course-for-the-Absolute-Beginner-Docker-on-Windows/frame_110.jpg)

Before using Docker Toolbox, ensure your system meets these requirements:

- Your operating system must be 64-bit Windows 7 or higher.
- Virtualization must be enabled on your system.

> [!important]
> **Note**
>
> Docker Toolbox is ideal for legacy Windows systems that do not qualify for the newer Docker Desktop option.

![The image describes Docker Toolbox requirements and components, including Oracle VirtualBox, Docker Engine, Docker Machine, Docker Compose, and Kitematic GUI, with a person presenting.](https://kodekloud.com/kk-media/image/upload/v1752874158/notes-assets/images/Docker-Training-Course-for-the-Absolute-Beginner-Docker-on-Windows/frame_150.jpg)

## Docker Desktop for Windows

Docker Desktop for Windows is the modern solution that leverages Microsoft's native virtualization technology, Hyper-V, rather than relying on third-party VirtualBox. During installation, Docker Desktop automatically creates a Linux VM through Hyper-V, on which Docker runs seamlessly.

Docker Desktop for Windows is supported only on:

- Windows 10 Enterprise or Professional Edition.
- Windows Server 2016.

By default, Docker Desktop for Windows runs Linux containers. If you intend to run Windows containers, you must explicitly switch Docker Desktop from Linux to Windows container mode.

With the advent of Windows Server 2016, Microsoft introduced native support for Windows containers, allowing you to package and run Windows applications within Docker images. Windows containers come in two types:

| Container Type              | Description                                                                         |
| --------------------------- | ----------------------------------------------------------------------------------- |
| Windows Server Containers   | Share the host's kernel, similar to Linux containers.                               |
| Hyper-V Isolated Containers | Each container runs inside a highly optimized virtual machine for kernel isolation. |

When creating a Dockerfile in the Windows ecosystem, you typically choose from two primary base image options:

- **Windows Server Core**
- **Nano Server** (a lightweight, headless deployment option, akin to Alpine in Linux)

Windows containers are supported on Windows Server 2016, Nano Server, and Windows 10 Professional/Enterprise editions. Note that on Windows 10 Professional and Enterprise, only Hyper-V isolated containers are available.

![The image discusses Docker Desktop for Windows, highlighting support for Windows 10 Enterprise/Professional and Windows Server 2016, with logos for Windows, Microsoft Hyper-V, and Docker.](https://kodekloud.com/kk-media/image/upload/v1752874159/notes-assets/images/Docker-Training-Course-for-the-Absolute-Beginner-Docker-on-Windows/frame_240.jpg)

![The image explains Windows containers, showing container types (Windows Server and Hyper-V Isolation) and base images, with a person presenting.](https://kodekloud.com/kk-media/image/upload/v1752874161/notes-assets/images/Docker-Training-Course-for-the-Absolute-Beginner-Docker-on-Windows/frame_370.jpg)

## Final Considerations

Before switching between Docker Toolbox and Docker Desktop, be aware of an important limitation:

> [!important]
> **Warning**
>
> VirtualBox and Hyper-V cannot coexist on the same Windows host. If you initially set up Docker Toolbox using VirtualBox and later decide to transition to Docker Desktop with Hyper-V, you must remove or disable the VirtualBox-based setup. Refer to Docker's official migration guide for detailed instructions.

That concludes our discussion on Docker on Windows. We hope this guide helps you understand the differences and choose the right solution for your setup. Happy Dockering!

For more detailed information, visit the [Docker Documentation](https://docs.docker.com/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-training-course-for-the-absolute-beginner/module/39bf8a8d-5eef-426c-82c2-31a6c464b17a/lesson/f575a12b-a726-42a1-bd98-b87c41f1367e)**
>
> Watch video content
