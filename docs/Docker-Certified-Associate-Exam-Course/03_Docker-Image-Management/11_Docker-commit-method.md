# Docker commit method - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Image-Management/Docker-commit-method)

---

## Table of Contents

- Docker commit method
  - Overview
  - When to Use docker commit
  - Step-by-Step Example
  - Comparison: Dockerfile vs. docker commit
  - References
  - Watch Video

---

## Content

Docker Certified Associate Exam Course

Docker Image Management

# Docker commit method

In this guide, you’ll learn how to create a Docker image from a running container using `docker container commit`. This technique can be useful for rapid prototyping or debugging changes without writing a Dockerfile. For production-grade images, you should still prefer the Dockerfile approach to ensure repeatability and version control.

## Overview

Typically, custom images are built with a Dockerfile:

```
docker build -t myapp:latest .
```

Alternatively, you can:

1.  Launch a container from a base image (e.g., `httpd`).
2.  Modify files or install packages inside the container.
3.  Commit the container’s state as a new image.

> [!important]
> **Warning**
>
> The `docker commit` workflow is not recommended for production systems. Use a Dockerfile for maintainability, readability, and versioning.

## When to Use `docker commit`

| Scenario                        | Recommended? | Alternative           |
| ------------------------------- | ------------ | --------------------- |
| One-off experiments             | Yes          | Dockerfile (optional) |
| Capturing state for debugging   | Yes          | Volumes, logging      |
| Production-ready, repeatable CI | No           | Dockerfile            |

## Step-by-Step Example

1.  **Run an `httpd` container in detached mode**

    ```
    docker run -d --name httpd httpd
    ```

2.  **Enter the container and update the default web page**

    ```
    docker exec -it httpd bash
    root@container:/# cat > /usr/local/apache2/htdocs/index.html <<EOF
    Welcome to my custom web application
    EOF
    root@container:/# exit
    ```

3.  **Commit the container state to a new image**

    ```
    docker container commit -a "Ravi" httpd customhttpd
    ```

4.  **Verify the new image**

    ```
    docker image ls
    REPOSITORY    TAG       IMAGE ID       CREATED         SIZE
    customhttpd   latest    adac0f56a7df   5 seconds ago   138MB
    httpd         latest    417af7dc28bc   8 days ago      138MB
    ```

## Comparison: Dockerfile vs. `docker commit`

| Feature                      | Dockerfile       | `docker commit`    |
| ---------------------------- | ---------------- | ------------------ |
| Version control              | Yes (plain text) | No                 |
| Automation                   | CI/CD pipelines  | Manual or scripted |
| Reproducibility              | High             | Low                |
| Ease of simple tweaks        | Moderate         | Very fast          |
| Best practice for production | ✔                | ✖                  |

## References

- [Dockerfile reference](https://docs.docker.com/engine/reference/builder/)
- [docker container commit](https://docs.docker.com/engine/reference/commandline/container_commit/)
- [docker exec documentation](https://docs.docker.com/engine/reference/commandline/exec/)
- [Docker image management](https://docs.docker.com/engine/reference/commandline/image_ls/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/f2e605a0-1ea7-434b-a139-0db000b0a250/lesson/d27a2ba1-260e-4ec8-b4b1-098db4ef3216)**
>
> Watch video content
