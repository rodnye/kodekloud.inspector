# Docker Trusted Registry Operations - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Trusted-Registry/Docker-Trusted-Registry-Operations)

---

## Table of Contents

- Docker Trusted Registry Operations
  - Recap: Docker Image Naming Conventions
  - Using an Internal Registry
  - Links and References
  - Watch Video
    - 1. Build and Tag Your Image
    - 2. Create the Repository in DTR UI
    - 3. Push the Image to DTR
    - 4. Pulling the Image

---

## Content

Docker Certified Associate Exam Course

Docker Trusted Registry

# Docker Trusted Registry Operations

In this lesson, we’ll walk through the end-to-end workflow for working with Docker Trusted Registry (DTR). You’ll learn how to name, tag, push, and share images within your organization’s private registry.

## Recap: Docker Image Naming Conventions

When you reference an image without specifying a registry host, Docker defaults to Docker Hub (`docker.io`). An image reference is composed of three parts:

| Component  | Description                   | Example     |
| ---------- | ----------------------------- | ----------- |
| Registry   | Host address for the registry | `docker.io` |
| Namespace  | Account or organization name  | `httpd`     |
| Repository | Repository (image) name       | `httpd`     |

```
# Explicitly specifying Docker Hub
image: docker.io/httpd/httpd


# Omitting the registry (defaults to Docker Hub)
image: httpd/httpd
```

> [!important]
> **Note**
>
> If you leave out the registry host, Docker assumes `docker.io`. Always include the full path when pushing to a private registry.

---

## Using an Internal Registry

In a Docker Enterprise environment with your own registry (e.g., `registry.company.org`), image references must include that host:

```
registry.company.org/httpd/httpd
```

> [!important]
> **Warning**
>
> If you don’t have a DNS entry for your registry, you can use its IP address. However, using a stable DNS name is recommended to avoid future disruptions.

### 1\. Build and Tag Your Image

Build your application and tag it for the internal registry. Replace `54.145.234.153` with your registry’s IP or hostname, and adjust the namespace/repository as needed:

```
docker build . -t 54.145.234.153/yogeshraheja/kodekloud
```

### 2\. Create the Repository in DTR UI

Before pushing, create the repository via the DTR web interface:

- Click **New Repository**.
- Enter the **Namespace** (user or organization).
- Provide a **Repository name**.
- (Optional) Add a **Description**.
- Set the **Visibility** (public or private).

![The image shows a form for creating a new repository, with fields for the repository name, description, and visibility options (public or private).](https://kodekloud.com/kk-media/image/upload/v1752873960/notes-assets/images/Docker-Certified-Associate-Exam-Course-Docker-Trusted-Registry-Operations/new-repository-form-fields.jpg)

### 3\. Push the Image to DTR

With the repository created, push your tagged image:

```
# Build and tag (if not already done)
docker build . -t 54.145.234.153/yogeshraheja/kodekloud


# Push to your private registry
docker push 54.145.234.153/yogeshraheja/kodekloud
```

Once the push completes, you’ll see the repository listed under **Repositories** in the DTR interface.

![The image shows a Docker Enterprise Trusted Registry interface with a repository named "yogeshraja / kodekloud" displayed. The sidebar includes options like Repositories, Organizations, Users, and System.](https://kodekloud.com/kk-media/image/upload/v1752873961/notes-assets/images/Docker-Certified-Associate-Exam-Course-Docker-Trusted-Registry-Operations/docker-enterprise-trusted-registry.jpg)

### 4\. Pulling the Image

Other team members can now retrieve the image:

```
docker pull 54.145.234.153/yogeshraha/kodekloud
```

This completes the standard workflow: build, tag, create, push, and pull images within Docker Trusted Registry.

---

## Links and References

- [Docker Official Documentation](https://docs.docker.com/)
- [Docker Trusted Registry Guide](https://docs.docker.com/ee/dtr/)
- [Docker Hub](https://hub.docker.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/d0ef5db6-09b0-45f3-a220-9036d58086c6/lesson/c82b52a7-775f-4f0c-82b8-0915b762e546)**
>
> Watch video content
