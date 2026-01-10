# Dockerfile Best Practices - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Image-Management/Dockerfile-Best-Practices)

---

## Table of Contents

- Dockerfile Best Practices
  - 1. Build Modular Images
  - 2. Keep Containers Stateless
  - 3. Minimize Image Size
  - 4. Use Multi-Stage Builds
  - 5. Optimize Your Build Context with .dockerignore
  - Links and References
  - Watch Video

---

## Content

Docker Certified Associate Exam Course

Docker Image Management

# Dockerfile Best Practices

Containerizing applications effectively requires more than just writing a Dockerfile. In this guide, we’ll highlight common pitfalls to avoid and share best practices for building efficient, secure, and maintainable Docker images.

## 1\. Build Modular Images

Avoid combining multiple services (e.g., web servers, databases, and supporting tools) into a single image. Instead, adopt a modular approach:

- **Dedicated images per component**
  - Web server
  - Database
  - Supporting services
- **Independent scaling**
- **Clear dependency management**

When deployed together, these containers communicate over the network, forming a cohesive application without unnecessary coupling.

## 2\. Keep Containers Stateless

Containers are ephemeral by design. Any data written to the container’s filesystem is lost when it’s removed or recreated.

> [!important]
> **Note**
>
> Use volumes or external storage to persist data across container restarts.

| Strategy            | Description                                | Example                                                             |
| ------------------- | ------------------------------------------ | ------------------------------------------------------------------- |
| Host Volume         | Mount a host directory into the container  | `docker run -v /host/data:/app/data`                                |
| Docker Named Volume | Use Docker-managed volumes for portability | `docker volume create app-data`                                     |
| External Service    | Offload state to services like Redis or S3 | [Redis](https://redis.io/), [Amazon S3](https://aws.amazon.com/s3/) |

## 3\. Minimize Image Size

Smaller images pull faster and consume fewer resources. Follow these tips to trim your Docker images:

- Choose a minimal base image (e.g., Alpine)
- Install only runtime dependencies
- Clean package manager caches (`apk cache clean`, `rm -rf /var/cache/*`)
- Exclude development tools from production stages

![The image is a slide titled "Slim/Minimal Images" with three best practice tips: create slim/minimal images, find an official minimal image, and only install necessary packages. There's also a globe icon and a "Best Practice" label.](https://kodekloud.com/kk-media/image/upload/v1752873919/notes-assets/images/Docker-Certified-Associate-Exam-Course-Dockerfile-Best-Practices/slim-minimal-images-best-practices.jpg)

## 4\. Use Multi-Stage Builds

Multi-stage builds let you separate build-time dependencies from your final runtime image. This ensures only the necessary artifacts ship in production.

```
# Builder stage
FROM golang:1.19-alpine AS builder
WORKDIR /app
COPY . .
RUN go build -o myapp


# Final stage
FROM alpine:latest
COPY --from=builder /app/myapp /usr/local/bin/myapp
ENTRYPOINT ["myapp"]
```

> [!important]
> **Note**
>
> You can name and reuse stages to optimize builds and caching.

## 5\. Optimize Your Build Context with .dockerignore

Every file in your build context is sent to the Docker daemon. Exclude unnecessary files to speed up builds and reduce image bloat.

```
# .dockerignore
node_modules
.git
.DS_Store
tests
```

> [!important]
> **Warning**
>
> Forgetting to exclude large directories (e.g., `.git` or `node_modules`) can dramatically increase build time and image size.

---

## Links and References

- [Docker Documentation](https://docs.docker.com/)
- [Dockerfile reference](https://docs.docker.com/engine/reference/builder/)
- [Best practices for writing Dockerfiles](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/f2e605a0-1ea7-434b-a139-0db000b0a250/lesson/bf0b2394-1106-4f4f-8ef6-b61fec69f6be)**
>
> Watch video content
