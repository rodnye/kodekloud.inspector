# Runtime Classes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/Minimize-Microservice-Vulnerabilities/Runtime-Classes)

---

## Table of Contents

- Runtime Classes
  - Under the Hood
  - The Role of runc
  - Alternative Container Runtimes
  - Conclusion
  - Watch Video

---

## Content

Certified Kubernetes Security Specialist (CKS)

Minimize Microservice Vulnerabilities

# Runtime Classes

In this lesson, we explore how container sandboxing tools such as gVisor and Kata Containers enhance container deployments. We begin by examining the high-level steps that occur when a container is executed. For instance, consider the following Docker command:

```
docker run -d nginx
```

When you run this command, Docker first checks if the NGINX image exists locally. If the image is missing, Docker pulls it from the default Docker registry, [Docker Hub](https://hub.docker.com). A typical output for this process might look like:

```
docker run -d nginx
Unable to find image 'nginx:latest' locally
latest: Pulling from library/nginx
ac2522cc7269: Pull complete
09de04dc3c75: Pull complete
b0c8a51e6628: Pull complete
08b11a3d692c: Pull complete
a0e0e6bcfd2c: Pull complete
4fcb23e29ba1: Pull complete
Digest: sha256:b0ea179ab61c789ce759dbe491cc534e293428ad232d00df83ce44bf86261179
Status: Downloaded newer image for nginx:latest
7a4100de26b527713f0f1079308a6432d86fe91509315784d0f0dac109054995
```

## Under the Hood

When a container is launched via the Docker CLI, the following steps are executed:

1.  **CLI to REST API Conversion:**  
    The Docker client translates the command into a RESTful API call that is sent to the Docker daemon.
2.  **Image Verification:**  
    The Docker daemon checks if the specified image is already stored on the local system. If it isn’t found, the image is downloaded from [Docker Hub](https://hub.docker.com).
3.  **Container Creation:**  
    After the image is available, the Docker daemon instructs containerd to start the container. Containerd converts the image into an [OCI-compliant](https://opencontainers.org) bundle and passes it to the containerd shim.
4.  **Runtime Invocation:**  
    The containerd shim calls the container runtime (runc by default) to create the container. Runc interacts with the system's namespaces and cgroups to establish an isolated environment.

Below is the Docker command that triggers this entire process:

```
docker run -d nginx
```

> [!important]
> **Note**
>
> The conversion to an OCI bundle provides a standardized way to encapsulate container images, enabling compatibility across various container runtimes.

## The Role of runc

runc is the default container runtime implementing the standards defined by the Open Containers Initiative (OCI). When runc is installed, containers can be created directly using its CLI without relying on Docker’s additional management features. For example, you could start a container with:

```
runc run nginx
```

While Docker utilizes runc under the hood, alternative tools like Podman and CRI-O also adopt it as their default runtime.

## Alternative Container Runtimes

Besides runc, specialized container runtimes are available for enhanced isolation, particularly through sandboxing technologies like Kata Containers and gVisor. Key alternatives include:

- **Kata Containers:** Implements its own runtime to provide an extra layer of isolation.
- **gVisor:** Uses a runtime known as runsc to offer secure container sandboxing.

Since these runtimes adhere to OCI standards, you can specify them when starting a container through Docker. For example, use the following commands to choose a particular runtime:

```
docker run --runtime kata -d nginx
```

```
docker run --runtime runsc -d nginx
```

Each command instructs Docker to utilize the specified runtime—`kata` for Kata Containers and `runsc` for gVisor—to create the container.

## Conclusion

In this lesson, we detailed the steps involved in launching a container with Docker—from checking and downloading the image to converting it into an OCI bundle, and finally creating the container using either runc or an alternative runtime.

> [!important]
> **Upcoming Topics**
>
> Stay tuned for our next lesson, where we cover installing gVisor on Kubernetes nodes and deploying sandboxed containers within Kubernetes pods.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/7431dd03-f5c2-4ebb-b94a-2d35615bbd8c/lesson/14d2da52-15a2-407e-89cb-9ea0a72d96d0)**
>
> Watch video content
