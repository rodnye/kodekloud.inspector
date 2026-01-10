# Save and Load Images - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Image-Management/Save-and-Load-Images)

---

## Table of Contents

- Save and Load Images
  - Table of Contents
  - 1. Exporting and Transferring Docker Images
  - 2. Exporting a Container Filesystem and Importing as an Image
  - Docker CLI Reference
  - Links and References
  - Watch Video
    - Step-by-Step Guide

---

## Content

Docker Certified Associate Exam Course

Docker Image Management

# Save and Load Images

Learn how to export Docker images and containers to `tar` archives, move them into air-gapped or restricted environments, and load or import them back into Docker without direct internet access.

## Table of Contents

1.  [Exporting and Transferring Docker Images](#exporting-and-transferring-docker-images)
2.  [Exporting a Container Filesystem and Importing as an Image](#exporting-a-container-filesystem-and-importing-as-an-image)
3.  [Docker CLI Reference](#docker-cli-reference)
4.  [Links and References](#links-and-references)

---

## 1\. Exporting and Transferring Docker Images

When you cannot pull directly from Docker Hub (for example, in a restricted environment), follow these steps:

### Step-by-Step Guide

1.  Pull the desired image on an internet-connected host:

    ```
    docker pull alpine:latest
    ```

2.  Save the image into a tarball:

    ```
    docker image save alpine:latest -o alpine.tar
    ```

3.  Transfer `alpine.tar` to the target system (USB drive, SCP, shared NFS, etc.).
4.  Load the tarball on the restricted host:

    ```
    docker image load -i alpine.tar
    ```

    You should see output similar to:

    ```
    beee9f30bc1f: Loading layer [==================>]  5.862MB/5.862MB
    Loaded image: alpine:latest
    ```

5.  Confirm the image is available locally:

    ```
    docker image ls
    ```

    Example output:

    ```
    REPOSITORY   TAG       IMAGE ID       CREATED        SIZE
    alpine       latest    a187dde48cd2   4 weeks ago    5.6MB
    ```

> [!important]
> **Note**
>
> Always verify you’re using the correct `<repository>:<tag>` when saving and loading images to avoid version mismatches.> [!important]
> **Warning**
>
> Ensure you have sufficient disk space on both source and target systems before exporting large images.

---

## 2\. Exporting a Container Filesystem and Importing as an Image

You can snapshot a running container’s filesystem and convert it into a new Docker image:

1.  **Export** the container to a tar archive:

    ```
    docker export <container-name> > testcontainer.tar
    ```

2.  **Import** the tarball as a fresh image:

    ```
    docker image import testcontainer.tar newimage:latest
    ```

    Docker returns a new image ID, e.g.:

    ```
    sha256:8909b7da236bb21aa2e52e6e04dff4b7103753e4046e15457a3daf6dfa723a12
    ```

3.  **List** local images to confirm the import:

    ```
    docker image ls
    ```

    Example output:

    ```
    REPOSITORY    TAG       IMAGE ID       CREATED         SIZE
    newimage      latest    8090b7da236b   2 minutes ago   5.6MB
    alpine        latest    a187dde48cd2   4 weeks ago     5.6MB
    ```

---

## Docker CLI Reference

| Command                                       | Description                                        |
| --------------------------------------------- | -------------------------------------------------- |
| `docker pull <repo>:<tag>`                    | Download image from Docker Hub or private registry |
| `docker image save <image> -o <file>.tar`     | Save one or more images to a tar archive           |
| `docker image load -i <file>.tar`             | Load image(s) from a tar archive                   |
| `docker export <container>`                   | Export container filesystem as a tar archive       |
| `docker image import <file>.tar <name>:<tag>` | Create a new image from a container tarball        |
| `docker image ls`                             | List local Docker images                           |

---

## Links and References

- [Docker Save Command](https://docs.docker.com/engine/reference/commandline/image_save/)
- [Docker Load Command](https://docs.docker.com/engine/reference/commandline/image_load/)
- [Docker Export and Import](https://docs.docker.com/engine/reference/commandline/export/)
- [Docker CLI Overview](https://docs.docker.com/engine/reference/commandline/docker/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/f2e605a0-1ea7-434b-a139-0db000b0a250/lesson/8374d3c4-207d-4801-a29c-223aec0ef539)**
>
> Watch video content
