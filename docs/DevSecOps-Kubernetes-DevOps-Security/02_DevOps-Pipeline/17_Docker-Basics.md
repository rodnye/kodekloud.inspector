# Docker Basics - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevSecOps-Kubernetes-DevOps-Security/DevOps-Pipeline/Docker-Basics)

---

## Table of Contents

- Docker Basics
  - 1. Writing a Dockerfile
  - 2. Building the Docker Image
  - 3. Pushing to Docker Hub
  - 4. Running the Container Locally
  - Quick Reference: Docker CLI Commands
  - Links and References
  - Watch Video

---

## Content

DevSecOps - Kubernetes DevOps & Security

DevOps Pipeline

# Docker Basics

Docker containers bundle everything an application needs to run—and nothing more—making it simple to move workloads across environments. In this guide, you’ll learn how to:

1.  Define your app environment with a **Dockerfile**
2.  **Build** a container image
3.  **Push** the image to a registry (e.g., Docker Hub)
4.  **Run** the image locally

---

## 1\. Writing a Dockerfile

Start by creating a `Dockerfile` in your project root. This example shows a Spring Boot application running on OpenJDK 8 (Alpine):

```
# Use OpenJDK 8 on Alpine Linux as the base image
FROM openjdk:8-jdk-alpine


# Document the port the application listens on
EXPOSE 9999


# Build-time variable for the JAR file
ARG JAR_FILE=target/*.jar


# Copy the packaged JAR into the container
ADD ${JAR_FILE} app.jar


# Run the JAR file when the container starts
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

Key directives:

- `FROM` sets the base image.
- `EXPOSE` documents which port the app listens on.
- `ARG` defines a build-time variable for your JAR.
- `ADD` copies your artifact into the image.
- `ENTRYPOINT` specifies the startup command.

---

## 2\. Building the Docker Image

Run this command from the directory containing your `Dockerfile`. Replace `<docker-hub-username>` and `<image-name>` as needed:

```
docker build -t <docker-hub-username>/<image-name>:v1 .
```

- `-t` tags your image in the format `repository/name:tag`.

> [!important]
> **Build Cache Optimizations**
>
> Docker caches each layer by default. When you rebuild without changing earlier steps, subsequent builds are faster. To bypass the cache, add `--no-cache`.

---

## 3\. Pushing to Docker Hub

First, authenticate using:

```
docker login
```

Then push your tagged image:

```
docker push <docker-hub-username>/<image-name>:v1
```

> [!important]
> **Authentication Required**
>
> You must be logged in to [Docker Hub](https://hub.docker.com/) before pushing images.
> Use `docker login` and enter your credentials when prompted.

---

## 4\. Running the Container Locally

Map port 9999 on your host to port 9999 in the container:

```
docker run -d -p 9999:9999 <docker-hub-username>/<image-name>:v1
```

- `-d` runs the container in detached mode.
- `-p host_port:container_port` publishes container ports to the host.

---

## Quick Reference: Docker CLI Commands

| Command       | Purpose                                    | Example                                      |
| ------------- | ------------------------------------------ | -------------------------------------------- |
| docker build  | Build an image from a Dockerfile           | `docker build -t user/app:latest .`          |
| docker push   | Push an image to a registry                | `docker push user/app:latest`                |
| docker login  | Authenticate with a Docker registry        | `docker login`                               |
| docker run    | Create and start a container from an image | `docker run -d -p 8080:8080 user/app:latest` |
| docker images | List all local images                      | `docker images`                              |
| docker ps     | List running containers                    | `docker ps`                                  |

---

## Links and References

- [Docker Documentation](https://docs.docker.com/)
- [Dockerfile reference](https://docs.docker.com/engine/reference/builder/)
- [Docker Hub | Official Images](https://hub.docker.com/search?q=&type=image)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/6942848d-9481-472e-a8ec-47357cf8ceaa/lesson/27afe3e0-2262-4663-b351-a527cff536ab)**
>
> Watch video content
