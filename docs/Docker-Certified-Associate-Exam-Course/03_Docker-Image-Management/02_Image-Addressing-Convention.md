# Image Addressing Convention - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Image-Management/Image-Addressing-Convention)

---

## Table of Contents

- Image Addressing Convention
  - Pulling an Image
  - Docker Image Naming Components
  - Referencing Other Registries
  - Links and References
  - Watch Video
    - Implicit Namespace
    - Default Registry

---

## Content

Docker Certified Associate Exam Course

Docker Image Management

# Image Addressing Convention

In this lesson, you’ll learn how Docker interprets image names when you pull or reference them. Understanding these conventions helps you avoid naming conflicts and ensures you’re pulling or pushing images to the correct registry.

## Pulling an Image

For example, running:

```
docker image pull httpd
```

might look simple—but what does `httpd` actually represent, and where does Docker retrieve it from?

## Docker Image Naming Components

A complete Docker image reference can include up to three parts:

| Component  | Description                                       | Example                         |
| ---------- | ------------------------------------------------- | ------------------------------- |
| Registry   | Hostname of the registry (defaults to Docker Hub) | `docker.io`                     |
| Namespace  | User or organization under which the image lives  | `library` (for official images) |
| Repository | Name of the image project                         | `httpd`                         |

### Implicit Namespace

When you specify only `httpd`, Docker assumes you want the official image from Docker Hub’s **library** namespace.  
Effectively, Docker interprets:

```
image: library/httpd
```

Here, `library` is the namespace for curated, official images on Docker Hub, and `httpd` is the repository name.

### Default Registry

By default, Docker pulls from Docker Hub (`docker.io`). Omitting the registry is shorthand for:

```
image: docker.io/library/httpd
```

The registry is where images are stored. When you build and push an image, it goes to this registry; when you pull, it comes from here.

> [!important]
> **Note**
>
> You can verify the full reference of an existing image with:
>
> ```
> docker image inspect httpd --format '{{.RepoDigests}}'
> ```

## Referencing Other Registries

If your image lives in a different registry—such as Google Container Registry or a private registry—you must prepend the registry hostname:

```
# Google Container Registry (GCR)
image: gcr.io/your-project/httpd

# Private registry
image: registry.example.com/your-namespace/httpd
```

Before interacting with private registries, authenticate using:

```
docker login <registry-hostname>
```

> [!important]
> **Warning**
>
> Always ensure you’re logged in to the correct registry. Pushing to the wrong registry can overwrite critical images.

---

## Links and References

- [Docker Image Overview](https://docs.docker.com/engine/reference/commandline/image/)
- [Docker Hub Documentation](https://docs.docker.com/docker-hub/)
- [Google Container Registry](https://cloud.google.com/container-registry)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/f2e605a0-1ea7-434b-a139-0db000b0a250/lesson/e8931b12-5d64-4451-baf3-49a6376bad10)**
>
> Watch video content
