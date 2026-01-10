# Docker vs ContainerD - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Associate-KCNA/Kubernetes-Fundamentals/Docker-vs-ContainerD)

---

## Table of Contents

- Docker vs ContainerD
  - The Evolution of Container Runtimes
  - Understanding Docker’s Components
  - Using ContainerD and Its CLI Tools
  - nerdctl: A Docker-like CLI for ContainerD
  - The Role of crictl for CRI-Compatible Container Runtimes
  - Changes in CRI Endpoints with Kubernetes 1.24
  - Summary
  - Watch Video

---

## Content

Kubernetes and Cloud Native Associate - KCNA

Kubernetes Fundamentals

# Docker vs ContainerD

In this lesson, we explore the distinctions between Docker and ContainerD, along with several associated CLI tools. As containerization and Kubernetes evolve, you may find older documentation referring to Docker, while newer resources emphasize ContainerD. You might also encounter CLI tools such as CTR, nerdctl, and crictl, and wonder which one best fits your use case. This lesson aims to clarify these differences and outline their respective roles.

## The Evolution of Container Runtimes

Originally, Docker was the dominant tool in the container ecosystem due to its user-friendly approach to container management. When Kubernetes was initially developed, it was tightly integrated with Docker, which led to Docker’s pervasive use in container orchestration.

As Kubernetes expanded, alternative container runtimes like Rocket emerged. To address this diversity, the Kubernetes community introduced the Container Runtime Interface (CRI)—an API standard that enables any runtime adhering to the Open Container Initiative (OCI) standards to integrate with Kubernetes. The OCI specifies:

- How images should be built (image specification)
- Standards for container runtimes (runtime specification)

Although Docker images conform to OCI standards, Docker itself predates CRI and lacks native CRI support. To bridge this gap, Kubernetes implemented the Docker Shim, which allowed Kubernetes to interact with Docker despite its non-compliance with CRI. With the maturation of alternatives like ContainerD (which evolved from Docker’s architecture), Kubernetes now directly supports these CRI-compatible runtimes, thereby eliminating the extra maintenance overhead of the Docker shim.

![The image illustrates the relationship between Docker, containerd, Kubernetes, and rkt, highlighting components like CLI, API, and CRI, with a focus on container runtime interfaces.](https://kodekloud.com/kk-media/image/upload/v1752880645/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Docker-vs-ContainerD/frame_190.jpg)

## Understanding Docker’s Components

Docker is more than just a container runtime; it is a suite of tools that includes the Docker CLI, API, build utilities, volume management, authentication, and security features. One important component is containerd—a daemon responsible for container execution using the runc runtime. Although containerd was originally embedded within Docker, it is now maintained as a separate, CRI-compliant project. This separation allows you to install ContainerD independently if you do not require Docker’s additional features.

## Using ContainerD and Its CLI Tools

Historically, containers were managed using the Docker run command. When running ContainerD as a standalone tool, you can install it with a simple command:

```
$ tar -C /usr/local -xzvf containerd-1.6.2-linux-amd64.tar.gz
```

This installation extracts several binaries:

- containerd
- containerd-shim
- containerd-shim-runc-v1
- containerd-shim-runc-v2
- ctr
- containerd-stress

Once installed, ContainerD comes with the command-line tool CTR. Keep in mind that ctr was designed primarily for debugging ContainerD and only supports a limited range of features. For most container management tasks, you will interact with the ContainerD API, which is less user-friendly than a dedicated CLI tool.

For example, to pull a Redis image and run a container using ctr, you can execute:

```
$ ctr images pull docker.io/library/redis:alpine
$ ctr run docker.io/library/redis:alpine redis
```

> [!important]
> **Note**
>
> For day-to-day container management in production environments, consider using tools that provide a more comprehensive and user-friendly experience.

## nerdctl: A Docker-like CLI for ContainerD

The nerdctl tool, developed by the ContainerD community, offers a Docker-like command-line experience while incorporating advanced features such as:

- Encrypted images
- Lazy image pulling
- Peer-to-peer image distribution
- Image signing and verification
- Kubernetes namespace support

Using nerdctl is straightforward. Simply replace the Docker command with nerdctl. For instance, to run a container and map ports, you can use:

```
$ nerdctl run --name redis redis:alpine
$ nerdctl run --name webserver -p 80:80 -d nginx
```

![The image describes "nerdctl," a Docker-like CLI for containerD, supporting features like Docker Compose, encrypted images, lazy pulling, P2P distribution, image signing, and Kubernetes namespaces.](https://kodekloud.com/kk-media/image/upload/v1752880646/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Docker-vs-ContainerD/frame_380.jpg)

This tool not only mirrors Docker’s functionality but also provides access to innovative features emerging within ContainerD.

## The Role of crictl for CRI-Compatible Container Runtimes

crictl is another essential CLI utility designed to interact with CRI-compatible container runtimes from a Kubernetes perspective. Unlike ctr and nerdctl, which are ContainerD-focused, crictl offers a standardized approach that works across all CRI-supported runtimes—including ContainerD, Rocket, and CRI-O.

Maintained by the Kubernetes community, crictl is primarily used for inspecting and debugging container runtimes. Although it technically supports container creation, it is not recommended, as containers created outside the control of kubelet (the Kubernetes node agent) may be deleted.

Basic crictl commands include:

```
$ crictl pull busybox
$ crictl images
$ crictl ps -a
```

To run commands inside a container or to view logs, crictl provides syntax similar to Docker’s, while also handling pod-specific details—a feature Docker does not offer.

![The image explains "crictl," a CLI for CRI-compatible container runtimes, used for inspecting and debugging, not creating containers, and works across different runtimes.](https://kodekloud.com/kk-media/image/upload/v1752880647/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Docker-vs-ContainerD/frame_470.jpg)

A comparison of common Docker CLI commands versus crictl commands highlights many similarities in functionality, covering tasks such as attach, exec, images, info, inspect, logs, ps, stats, and version.

![A comparison table of Docker CLI and crictl commands, descriptions, and unsupported features for debugging information retrieval.](https://kodekloud.com/kk-media/image/upload/v1752880649/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Docker-vs-ContainerD/frame_640.jpg)

![A comparison table of Docker CLI and crictl commands, showing descriptions and unsupported features for container management tasks.](https://kodekloud.com/kk-media/image/upload/v1752880650/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Docker-vs-ContainerD/frame_650.jpg)

For additional details on these differences, refer to the documentation linked in the original repository.

## Changes in CRI Endpoints with Kubernetes 1.24

In earlier versions of Kubernetes, crictl connected to runtime endpoints using a default order that included several paths:

```
unix:///var/run/dockershim.sock
unix:///run/containerd/containerd.sock
unix:///run/crio/crio.sock
unix:///var/run/cri-dockerd.sock
```

With Kubernetes 1.24, the Docker shim was removed, and the default endpoint configuration was updated. The docker-socket has now been replaced, and users are encouraged to set the runtime endpoint manually:

```
$ crictl --runtime-endpoint
$ export CONTAINER_RUNTIME_ENDPOINT=<your_runtime_endpoint>
```

For example, valid endpoints include:

```
• unix:///run/containerd/containerd.sock
• unix:///run/crio/crio.sock
• unix:///var/run/cri-dockerd.sock
```

Reviewing pull request 869 and issue 868 in the Kubernetes CRI tools repository can provide further insights into these changes.

> [!important]
> **Warning**
>
> Always ensure your runtime endpoint is configured correctly to avoid connectivity issues between Kubernetes and your container runtime.

## Summary

To recap the key points:

- The CTR tool bundled with ContainerD is intended primarily for debugging, offering limited functionality.
- nerdctl provides a full-featured, Docker-like CLI for efficient container management with ContainerD and is ideal for production scenarios.
- crictl, maintained by the Kubernetes community, is excellent for debugging and inspecting container runtimes across any CRI-supported platform.

![The image compares container tools: ctr, nerdctl, and crictl, detailing their purposes, communities, and compatibility with ContainerD and Kubernetes.](https://kodekloud.com/kk-media/image/upload/v1752880651/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Docker-vs-ContainerD/frame_750.jpg)

Thank you for engaging with this lesson. We hope it has clarified the differences between Docker, ContainerD, and the various CLI tools used in managing containers and orchestrating Kubernetes deployments.

For more detailed information, please visit the [Kubernetes Documentation](https://kubernetes.io/docs/) or explore related articles on container management.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-associate-kcna/module/8403f56b-91f8-42f9-89e9-5c27a7438ef2/lesson/31329fc2-21e5-40ab-8092-d52ffa0b4717)**
>
> Watch video content
