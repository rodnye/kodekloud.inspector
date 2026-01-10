# Docker Storage - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Kubernetes/Docker-Storage)

---

## Table of Contents

- Docker Storage
  - Key Docker Storage Mechanisms
  - Storage Drivers
  - Volume Driver Plugins
  - Watch Video
    - Popular Storage Drivers

---

## Content

Docker Certified Associate Exam Course

Kubernetes

# Docker Storage

Understanding how Docker handles storage is essential for working with container orchestration platforms like [Kubernetes](https://kubernetes.io/). This guide covers the two primary Docker storage mechanisms—**Storage Drivers** and **Volume Driver Plugins**—laying the groundwork for deeper Kubernetes storage concepts.

> [!important]
> **Prerequisite**
>
> If you’re already familiar with Docker storage drivers, feel free to skip ahead to the [Volume Driver Plugins](#volume-driver-plugins) section.

![The image is a slide titled "DOCKER STORAGE" with two sections labeled "STORAGE DRIVERS" and "VOLUME DRIVERS."](https://kodekloud.com/kk-media/image/upload/v1752873996/notes-assets/images/Docker-Certified-Associate-Exam-Course-Docker-Storage/docker-storage-drivers-volume-drivers.jpg)

## Key Docker Storage Mechanisms

Docker storage relies on two core components:

- **Storage Drivers**: Manage how image and container layers are stored on the host filesystem.
- **Volume Driver Plugins**: Provide integration with external block, file, or distributed storage solutions.

| Mechanism             | Purpose                                                      | Common Examples                    |
| --------------------- | ------------------------------------------------------------ | ---------------------------------- |
| Storage Drivers       | Controls layer management for images and containers          | `overlay2`, `aufs`, `devicemapper` |
| Volume Driver Plugins | Connects containers to external storage systems and services | `azurefile`, `flocker`, `nfs`      |

---

## Storage Drivers

Storage drivers determine how Docker writes and manages the union filesystem for images and containers. They affect performance, stability, and compatibility. Docker supports multiple drivers; choosing the right one depends on your host OS and workload requirements.

### Popular Storage Drivers

- **overlay2**: Default on most Linux distributions.
- **aufs**: Supported on older kernels; deprecated in many distros.
- **devicemapper**: Uses block devices; suited for environments needing thin provisioning.

> [!important]
> **Driver Compatibility**
>
> Not all storage drivers work on every kernel version. Check your OS documentation before switching drivers.

To view the currently active driver:

```
docker info --format '{{.Driver}}'
```

---

## Volume Driver Plugins

Volume driver plugins enable Docker to mount volumes from external storage backends. This approach decouples container data from the host, making it easier to manage persistence, backups, and scaling.

| Plugin Type             | Use Case                             | Example Command                                                                                                |
| ----------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| Cloud File Share        | Shared storage across multiple hosts | `docker volume create --driver azurefile myvolume`                                                             |
| Network File System     | On-prem NFS mounts                   | `docker volume create --driver local --opt type=nfs --opt o=addr=<nfs-server>,rw --opt device=:/export nfsvol` |
| Distributed File System | High-availability clustered storage  | `docker plugin install flocker/flocker:latest`                                                                 |

Refer to the [Docker Volume plugins documentation](https://docs.docker.com/storage/volumes/) for a full list of supported drivers and configuration options.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/d9358627-4fc7-4acc-ab96-fa25232555c6/lesson/4f4ef658-d2b1-45a8-a40d-286a03c830bf)**
>
> Watch video content
