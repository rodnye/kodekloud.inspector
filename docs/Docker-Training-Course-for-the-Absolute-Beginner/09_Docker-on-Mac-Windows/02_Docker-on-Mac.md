# Docker on Mac - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Training-Course-for-the-Absolute-Beginner/Docker-on-Mac-Windows/Docker-on-Mac)

---

## Table of Contents

- Docker on Mac
  - Docker Toolbox Overview
  - Docker Desktop for Mac Overview
  - Comparison Table
  - Summary
  - Watch Video

---

## Content

Docker Training Course for the Absolute Beginner

Docker on Mac Windows

# Docker on Mac

Docker on Mac provides a robust environment for running Linux containers directly on your macOS system. This guide explores two primary options: Docker Toolbox and Docker Desktop for Mac, each offering distinct approaches to virtualization and container management.

## Docker Toolbox Overview

Docker Toolbox is the legacy solution for Docker on macOS. It utilizes a Linux virtual machine through Oracle VirtualBox to run Docker Engine and its supporting components. Note that Docker Toolbox exclusively supports Linux containers; native macOS images or containers are not available.

Key components included in Docker Toolbox:

- Oracle VirtualBox
- Docker Engine
- Docker Machine
- Docker Compose
- Kitematic (a graphical user interface)

Upon installing the Docker Toolbox package, VirtualBox is automatically set up, and a lightweight VM called Boot2Docker (with Docker pre-installed) is deployed. This option requires macOS 10.8 or newer.

![The image features a presentation slide about the Docker toolbox, listing components like Oracle Virtualbox, Docker Engine, Docker Machine, Docker Compose, and Kitematic GUI.](https://kodekloud.com/kk-media/image/upload/v1752874154/notes-assets/images/Docker-Training-Course-for-the-Absolute-Beginner-Docker-on-Mac/frame_40.jpg)

## Docker Desktop for Mac Overview

Docker Desktop for Mac is the modern alternative for running Docker on macOS. Replacing VirtualBox with HyperKit for virtualization, Docker Desktop creates a dedicated Linux environment during installation where Docker operates efficiently.

System requirements for Docker Desktop for Mac include:

- macOS Sierra 10.12 or newer
- Mac models from 2010 or later

![The image is a presentation slide about Docker Desktop for Mac, showing macOS, HyperKit, and Docker logos, with system requirements and a presenter.](https://kodekloud.com/kk-media/image/upload/v1752874155/notes-assets/images/Docker-Training-Course-for-the-Absolute-Beginner-Docker-on-Mac/frame_90.jpg)

## Comparison Table

| Feature                   | Docker Toolbox                                           | Docker Desktop for Mac                        |
| ------------------------- | -------------------------------------------------------- | --------------------------------------------- |
| Virtualization Technology | Oracle VirtualBox                                        | HyperKit                                      |
| Minimum macOS Requirement | macOS 10.8 or newer                                      | macOS Sierra 10.12 or newer                   |
| Container Support         | Linux containers only                                    | Linux containers only                         |
| Included Tools            | Docker Engine, Docker Machine, Docker Compose, Kitematic | Integrated Docker Engine and management tools |

> [!important]
> **Note**
>
> Both Docker Toolbox and Docker Desktop for Mac enable the use of Linux containers on macOS. However, native macOS container support is not available in either option.

## Summary

In summary, Docker on Mac can be implemented using either Docker Toolbox or Docker Desktop for Mac. Docker Toolbox relies on VirtualBox and Boot2Docker, making it suitable for older macOS versions, while Docker Desktop for Mac uses HyperKit to provide an enhanced virtualization experience for newer macOS systems. Select the option that best suits your system requirements and development environment.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-training-course-for-the-absolute-beginner/module/39bf8a8d-5eef-426c-82c2-31a6c464b17a/lesson/9ee357ed-0def-4b80-89d9-6a48c010cedd)**
>
> Watch video content
