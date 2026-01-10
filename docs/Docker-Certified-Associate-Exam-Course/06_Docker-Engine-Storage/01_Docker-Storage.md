# Docker Storage - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Engine-Storage/Docker-Storage)

---

## Table of Contents

- Docker Storage
  - Why Docker Storage Matters
  - Key Concepts
  - Storage Drivers
  - Volume Driver Plugins
  - Next Steps
  - Links and References
  - Watch Video
    - Common Storage Drivers
    - Built-in Volume Drivers
    - Third-Party Plugins

---

## Content

Docker Certified Associate Exam Course

Docker Engine Storage

# Docker Storage

Understanding how storage works in Docker is a critical first step before tackling [storage in Kubernetes](https://kubernetes.io/docs/concepts/storage/). Docker storage is built on two core components:

- **Storage drivers** that manage the container’s writable layer
- **Volume driver plugins** that provide persistent storage beyond the container lifecycle

In this guide, we’ll explore both in detail—starting with storage drivers, and then moving on to volume drivers.

![The image is a slide titled "DOCKER STORAGE" with two sections labeled "STORAGE DRIVERS" and "VOLUME DRIVERS."](https://kodekloud.com/kk-media/image/upload/v1752873903/notes-assets/images/Docker-Certified-Associate-Exam-Course-Docker-Storage/docker-storage-storage-volume-drivers.jpg)

## Why Docker Storage Matters

Effective storage management ensures data integrity, performance isolation, and smooth scaling. Whether you’re running single-node applications or distributed clusters, choosing the right storage mechanism can make or break your deployment.

> [!important]
> **Note**
>
> Docker containers are ephemeral by design. Without proper use of volumes or external storage, any data written inside a container will be lost when the container stops or is removed.

## Key Concepts

| Component             | Function                                                                            | Typical Use Case                                     |
| --------------------- | ----------------------------------------------------------------------------------- | ---------------------------------------------------- |
| Storage Drivers       | Manages how the container filesystem is graphically layered and stored on the host. | Optimizing I/O performance and space utilization.    |
| Volume Driver Plugins | Interfaces with external storage systems (local, cloud, SAN, NFS).                  | Persisting data across container restarts and nodes. |

## Storage Drivers

Storage drivers implement the copy-on-write layers for images and containers. Docker supports several drivers—`overlay2`, `aufs`, `btrfs`, `devicemapper`, and more—each with trade-offs in performance and features.

### Common Storage Drivers

- **overlay2**: The recommended default on modern Linux kernels.
- **aufs**: Historically popular but less maintained.
- **btrfs**: Offers snapshots and quotas.
- **devicemapper**: Used for block-level storage on older systems.

For a full list and configuration options, see the [Docker Storage Drivers documentation](https://docs.docker.com/storage/storagedriver/).

## Volume Driver Plugins

While storage drivers handle the container’s writable layer, volumes are designed for persistent data. Docker volumes can be managed by built-in drivers or extended via plugins to connect with cloud or network storage.

### Built-in Volume Drivers

- **local**: Stores data on the Docker host filesystem.
- **tmpfs**: In-memory storage, cleared at shutdown.

### Third-Party Plugins

You can integrate with storage solutions like AWS EBS, Azure Disk, or NFS using volume driver plugins:

```
docker plugin install vieux/sshfs
docker volume create \
  --driver vieux/sshfs \
  --opt sshcmd=user@host:/remote/path \
  ssh_volume
```

> [!important]
> **Warning**
>
> When using network-backed volumes, verify your plugin’s compatibility and performance constraints to prevent I/O bottlenecks in production.

## Next Steps

- Explore [Docker Volumes](https://docs.docker.com/storage/volumes/) for advanced volume management.
- Learn how to mount volumes into containers with `docker run --mount` and `docker-compose`.
- Compare Docker’s storage options with Kubernetes PersistentVolumes and CSI drivers in our [Kubernetes storage overview](/docs/concepts/storage/persistent-volumes/).

## Links and References

- [Docker Storage Drivers](https://docs.docker.com/storage/storagedriver/)
- [Docker Volumes](https://docs.docker.com/storage/volumes/)
- [Kubernetes Persistent Volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/44e269a4-bbba-4b6a-9540-696a6f90bace/lesson/7352fb0f-cbcc-4d5f-aefc-f925c254c4db)**
>
> Watch video content
