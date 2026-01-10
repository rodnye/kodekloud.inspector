# Storage in Docker - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/State-Persistence/Storage-in-Docker)

---

## Table of Contents

- Storage in Docker
  - Docker Data Storage on the Host
  - Layered Architecture in Docker Images
  - Understanding Image and Container Layers
  - Persisting Data with Volumes
  - Docker Storage Drivers
  - Conclusion
  - Further Reading
  - Watch Video
    - Reusing Layers for Similar Applications
    - Creating and Using Volumes
    - Bind Mounts
    - Using the --mount Option

---

## Content

Certified Kubernetes Application Developer - CKAD

State Persistence

# Storage in Docker

Welcome to this lesson on advanced Docker concepts. In this guide, we will explore Docker storage drivers, file systems, and how Docker manages local filesystem data for images, containers, and volumes.

## Docker Data Storage on the Host

When Docker is installed, it organizes data within the `/var/lib/docker` directory. This folder contains several subdirectories such as `aufs`, `containers`, `images`, and `volumes`. Each subdirectory serves a specific role in Docker’s architecture:

- **containers:** Stores all files related to running containers.
- **images:** Contains stored images.
- **volumes:** Holds data for persistent storage created by containers.

![The image shows a file system structure for Docker, highlighting directories like "aufs," "containers," "image," and "volumes" under "/var/lib/docker."](https://kodekloud.com/kk-media/image/upload/v1752871318/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Storage-in-Docker/frame_50.jpg)

## Layered Architecture in Docker Images

Docker images use a layered architecture where each instruction in a Dockerfile creates a new layer capturing only the changes from the previous one. Consider the following example Dockerfile:

```
FROM Ubuntu

RUN apt-get update && apt-get -y install python

RUN pip install flask flask-mysql

COPY . /opt/source-code

ENTRYPOINT FLASK_APP=/opt/source-code/app.py flask run
```

You can build this image with the following command:

```
docker build -t mmumshad/my-custom-app .
```

In this example:

- The **base layer** is the Ubuntu operating system.
- Subsequent layers add APT packages, Python packages, application source code, and finally, the entry point configuration.

Each layer only stores the differences from its predecessor. For example, although the base Ubuntu image might be around 120 MB and the APT updates add an additional 300 MB, the remaining layers are much smaller. This strategy optimizes build times and minimizes disk space usage.

### Reusing Layers for Similar Applications

> [!important]
> **Tip**
>
> If subsequent applications share many common layers, Docker will reuse the unchanged layers from its cache, significantly speeding up builds.

Consider a second application similar to the first, with the same base image and dependencies but a different source file and entry point:

```
FROM Ubuntu

RUN apt-get update && apt-get -y install python

RUN pip install flask flask-mysql

COPY app2.py /opt/source-code

ENTRYPOINT FLASK_APP=/opt/source-code/app2.py flask run
```

Build this image using:

```
docker build -t mmumshad/my-custom-app-2 .
```

Because the first three layers are identical across both applications, Docker reuses the cached layers and only builds the new layers corresponding to the changes.

## Understanding Image and Container Layers

A Docker image consists of several read-only layers:

1.  **Base Layer:** The Ubuntu operating system.
2.  **Packages Layer:** APT packages installed on top of Ubuntu.
3.  **Dependencies Layer:** Python packages such as Flask.
4.  **Source Code Layer:** Your application code included in the image.
5.  **Entry Point Layer:** The layer that sets the container’s entry point.

When building the image:

```
docker build -t mmumshad/my-custom-app Dockerfile
```

the resulting layers remain read-only. Running a container from this image creates a new writable layer on top, which stores changes such as logs, temporary files, or modifications made during runtime. This mechanism is known as copy-on-write. Even if you modify a read-only file from the image, Docker creates a separate copy in the writable layer before applying the changes.

```
docker run mmumshad/my-custom-app
```

![The image illustrates the "Copy-on-Write" concept, showing container and image layers with "Read Write" and "Read Only" permissions for files like "app.py" and "temp.txt".](https://kodekloud.com/kk-media/image/upload/v1752871319/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Storage-in-Docker/frame_410.jpg)

> [!important]
> **Important**
>
> Remember, when you remove a container, its writable layer and any associated changes will be lost. The original image remains unchanged unless it is rebuilt.

## Persisting Data with Volumes

For data persistence outside the container’s ephemeral writable layer—such as database storage—use Docker volumes.

### Creating and Using Volumes

First, create a volume:

```
docker volume create data_volume
```

Then, mount the created volume when launching a container. For example, to store MySQL data in the volume, run:

```
docker run -v data_volume:/var/lib/mysql mysql
```

If a specified volume does not exist, Docker automatically creates it. To inspect the volumes, you can list the contents of `/var/lib/docker/volumes`.

### Bind Mounts

Alternatively, if you prefer using external storage (for instance, storing database files in `/data/mysql` on your host), you can use bind mounts:

```
docker run -v /data/mysql:/var/lib/mysql mysql
```

This technique maps a directory on the host to the container, enabling direct access to the host’s filesystem.

### Using the --mount Option

The newer `--mount` flag provides a clearer and more explicit syntax. The equivalent bind mount example using `--mount` is:

```
docker run \
  --mount type=bind,source=/data/mysql,target=/var/lib/mysql \
  mysql
```

This syntax explicitly defines each parameter (type, source, target) and is recommended for its clarity.

## Docker Storage Drivers

Docker uses storage drivers to manage layered filesystems, the creation of writable layers, and copy-on-write operations. Common storage drivers include:

- AUFS
- ZFS
- BTRFS
- Device Mapper
- Overlay
- Overlay2

The default storage driver varies by operating system: for example, Ubuntu typically uses AUFS, whereas Fedora or CentOS may use Device Mapper if AUFS is unavailable. Each driver offers unique performance and stability characteristics, so choose one based on your application’s requirements.

![The image lists storage drivers: AUFS, ZFS, BTRFS, Device Mapper, Overlay, and Overlay2, with a whale graphic in the background.](https://kodekloud.com/kk-media/image/upload/v1752871320/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Storage-in-Docker/frame_730.jpg)

For more detailed information on these storage drivers, please refer to the documentation provided in the relevant links.

## Conclusion

This lesson on Docker’s storage architecture covered the fundamentals of how Docker organizes data on the host, utilizes a layered image architecture, and manages persistent data with volumes and bind mounts. Understanding these concepts is crucial for optimizing Docker builds, ensuring efficient disk usage, and managing data persistence.

Thank you for reading, and we look forward to sharing more advanced Docker topics in our next lesson.

## Further Reading

- [Docker Documentation](https://docs.docker.com/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Docker Hub](https://hub.docker.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/cb16c9a3-1608-48cf-bfd5-2465f64b4f93/lesson/5aefaee8-ec07-4dbd-8c91-b001f712dbd3)**
>
> Watch video content
