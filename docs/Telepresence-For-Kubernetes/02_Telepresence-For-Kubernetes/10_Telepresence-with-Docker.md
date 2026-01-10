# Telepresence with Docker - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Telepresence-For-Kubernetes/Telepresence-For-Kubernetes/Telepresence-with-Docker)

---

## Table of Contents

- Telepresence with Docker
  - 1. Starting the Telepresence Daemon in Docker
  - 2. Key Docker Flags
  - 3. Intercepting a Service Normally
  - 4. Running the Intercepted Service in Docker
  - 5. Building and Running in One Command
  - Links and References
  - Watch Video

---

## Content

Telepresence For Kubernetes

Telepresence For Kubernetes

# Telepresence with Docker

In this guide, you’ll discover how to run the Telepresence daemon inside a Docker container, enabling local development against your Kubernetes cluster without requiring admin privileges on your machine. By isolating the daemon’s networking stack and filesystem, Docker eliminates the need to modify host network routes or DNS, making Telepresence accessible on corporate laptops and environments with restricted permissions.

![The image illustrates a "Telepresence daemon in Docker" setup, highlighting that it provides an independent networking stack and its own filesystem without requiring admin privileges on the machine.](https://kodekloud.com/kk-media/image/upload/v1752884095/notes-assets/images/Telepresence-For-Kubernetes-Telepresence-with-Docker/telepresence-daemon-docker-setup.jpg)

> [!important]
> **Prerequisites**
>
> - Docker Engine installed and running
> - Kubernetes cluster context configured (`kubectl config current-context`)
> - Telepresence CLI installed (see [Telepresence Docs](https://www.telepresence.io/docs/installation/telepresence-cli/))

## 1\. Starting the Telepresence Daemon in Docker

Launch Telepresence with the `--docker` flag to spin up its daemon inside a container:

```
telepresence connect --docker
```

> [!important]
> **Note**
>
> Using `--docker` gives the Telepresence daemon its own network namespace, avoiding any host‐level network or DNS changes.

## 2\. Key Docker Flags

| Flag                   | Purpose                                                                  |
| ---------------------- | ------------------------------------------------------------------------ |
| `--docker`             | Run the Telepresence daemon in a Docker container                        |
| `--docker-run <image>` | Start your intercepted service inside the specified Docker image         |
| `--docker-build <dir>` | Build a Docker image from `<dir>` (containing Dockerfile or source code) |
| `--docker-build-opt`   | Additional build options (e.g., `tag=new-image-name`)                    |

## 3\. Intercepting a Service Normally

With the daemon running, you can intercept a Kubernetes service and route its traffic to your machine:

```
telepresence intercept products-depl --port 8000
```

![The image illustrates a setup for intercepting with a Docker container, showing a laptop connected via a tunnel to a Kubernetes environment with a traffic manager and a product deployment.](https://kodekloud.com/kk-media/image/upload/v1752884097/notes-assets/images/Telepresence-For-Kubernetes-Telepresence-with-Docker/docker-container-kubernetes-setup.jpg)

## 4\. Running the Intercepted Service in Docker

Instead of running your code locally, you can launch the intercepted service inside a container:

```
telepresence intercept products-depl \
  --port 8000 \
  --docker-run your-image-name
```

Replace `your-image-name` with the Docker image you’ve built for the `products` service.

## 5\. Building and Running in One Command

Skip manual builds by letting Telepresence build and run your image in a single step:

```
telepresence intercept products-depl \
  --port 8000 \
  --docker-build products/src \
  --docker-build-opt tag=new-image-name \
  --docker-run new-image-name
```

- `--docker-build products/src` points to the directory with your `Dockerfile` or source code.
- `--docker-build-opt tag=new-image-name` sets the image tag.
- `--docker-run new-image-name` runs the freshly built container and establishes the intercept.

This command compiles your code into a Docker image, starts the container locally, and directs Kubernetes cluster traffic to your container.

## Links and References

- [Telepresence Documentation](https://www.telepresence.io/docs/installation/telepresence-cli/)
- [Docker Engine Overview](https://docs.docker.com/engine/)
- [Kubernetes Concepts](https://kubernetes.io/docs/concepts/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/telepresence-for-kubernetes/module/0eb5dcb6-2e2a-40d9-9caa-bd3149741aeb/lesson/2d3612c3-fef3-40ed-8533-af05ab280e53)**
>
> Watch video content
