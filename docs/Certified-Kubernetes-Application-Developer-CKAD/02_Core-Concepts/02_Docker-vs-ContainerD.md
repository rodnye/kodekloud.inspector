# Docker vs ContainerD - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/Core-Concepts/Docker-vs-ContainerD)

---

## Table of Contents

- Docker vs ContainerD
  - A Brief History of Container Runtimes
  - Diving Deeper into ContainerD
  - Running Containers: ctr vs. nerdctl
  - Interacting with CRI-Compatible Runtimes: crictl
  - Configuration Changes in Kubernetes 1.24
  - Summary
  - Watch Video

---

## Content

Certified Kubernetes Application Developer - CKAD

Core Concepts

# Docker vs ContainerD

In this article, we explore the evolution of container runtimes—from Docker to ContainerD—and clarify the roles of key command line tools: ctr, nerdctl, and crictl. This discussion explains why Docker and ContainerD coexisted for a period and what eventually led Kubernetes to change its runtime support.

## A Brief History of Container Runtimes

Initially, Docker emerged as the leading container tool with a user-friendly interface that simplified container management. Its early dominance meant that Kubernetes was built exclusively around Docker container orchestration. However, as Kubernetes grew in popularity, support for additional container runtimes became necessary. Runtimes like Rocket began adhering to the Open Container Initiative (OCI) standards, which define an image specification and a runtime specification for container operations.

To enable multiple runtimes, Kubernetes introduced the Container Runtime Interface (CRI). This interface allowed any runtime compliant with OCI standards to integrate with Kubernetes. Because Docker was developed before the advent of CRI, it did not natively support these standards. Kubernetes resolved this by implementing the Docker Shim—a temporary bridge that enabled Docker to work with the new CRI framework.

![The image illustrates the relationship between Docker, containerd, Kubernetes, and rkt, highlighting components like CLI, API, and CRI, with a focus on container runtime interfaces.](https://kodekloud.com/kk-media/image/upload/v1752871170/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Docker-vs-ContainerD/frame_190.jpg)

Docker is not simply a container runtime; it is a comprehensive suite of tools that includes the Docker CLI, Docker API, image building tools, volume management, authentication, and integrated security features. A notable component within Docker is containerd—a daemon that manages containers using runc under the hood. Containerd is now fully CRI-compatible and can operate independently. Although Kubernetes supported Docker directly for a period, the Docker Shim was eventually removed in Kubernetes version 1.24. It is important to note that images built with Docker remain compatible with ContainerD, as they adhere to the OCI image specification.

## Diving Deeper into ContainerD

ContainerD has matured into an independent project and is a graduated project within the CNCF. This means you can install ContainerD as a standalone container runtime without relying on Docker.

To install ContainerD, extract the archive using the following commands:

```
$ tar Cxzvf /usr/local containerd-1.6.2-linux-amd64.tar.gz
bin/
bin/containerd-shim-runc-v2
bin/containerd-shim
bin/ctr
bin/containerd-shim-runc-v1
bin/containerd
bin/containerd-stress
```

Once installed, ContainerD includes the command line utility "ctr", primarily designed for debugging. Its limited feature set means that for regular container management, a more user-friendly tool is preferred.

![The image is a README for containerd, an industry-standard container runtime, featuring a diagram of its architecture and components like GRPC, Metrics, and Storage.](https://kodekloud.com/kk-media/image/upload/v1752871171/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Docker-vs-ContainerD/frame_280.jpg)

## Running Containers: ctr vs. nerdctl

Traditionally, Docker users employed commands such as `docker run` to start containers. With ContainerD installed independently, similar operations can be performed using the "ctr" tool. For example, to pull an image and run a container, you would execute:

```
$ ctr images pull docker.io/library/redis:alpine
$ ctr run docker.io/library/redis:alpine redis
```

> [!important]
> **Tip**
>
> For more user-friendly operations, consider using nerdctl—a Docker-like CLI developed for ContainerD. Nerdctl not only mimics Docker command syntax but also supports enhanced features like encrypted images, lazy pulling, peer-to-peer image distribution, image signing, and Kubernetes namespace integration.

Using nerdctl, running containers resembles Docker commands:

```
$ nerdctl run --name redis redis:alpine
$ nerdctl run --name webserver -p 80:80 -d nginx
```

![The image describes "nerdctl," a Docker-like CLI for containerD, supporting features like Docker Compose, encrypted images, lazy pulling, P2P distribution, and Kubernetes namespaces.](https://kodekloud.com/kk-media/image/upload/v1752871172/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Docker-vs-ContainerD/frame_370.jpg)

## Interacting with CRI-Compatible Runtimes: crictl

crictl is a versatile command line tool developed by the Kubernetes community. Unlike ctr or nerdctl, which are specific to ContainerD, crictl is designed to work with any CRI-compatible runtime, such as ContainerD and CRI-O. Its primary focus is on debugging and inspecting container runtimes, not on extensive daily container management.

For example, you can use crictl to pull images, list available images or containers, and execute commands within containers:

```
$ crictl pull busybox
$ crictl images
$ crictl ps -a
```

crictl also offers functionality to execute commands inside running containers or view logs, similarly to Docker. One significant difference is its awareness of Kubernetes pods—a concept that is not native to Docker commands.

![The image explains "crictl," a CLI tool for CRI-compatible container runtimes, used for inspecting and debugging, not creating containers, and works across different runtimes.](https://kodekloud.com/kk-media/image/upload/v1752871173/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Docker-vs-ContainerD/frame_470.jpg)

A comparison between Docker and crictl reveals that many commands such as attach, exec, images, info, inspect, logs, ps, stats, and version are similar. This familiarity eases the transition for Docker users.

![The image compares Docker CLI and crictl commands, describing their functions and listing unsupported features for debugging information retrieval.](https://kodekloud.com/kk-media/image/upload/v1752871175/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Docker-vs-ContainerD/frame_640.jpg)

![A comparison table of Docker CLI and crictl commands, showing their functions and unsupported features, with a link to Kubernetes documentation.](https://kodekloud.com/kk-media/image/upload/v1752871176/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Docker-vs-ContainerD/frame_650.jpg)

## Configuration Changes in Kubernetes 1.24

Before Kubernetes 1.24, CRI tools attempted connections to runtime endpoints in a default order, including:

- unix:///var/run/dockershim.sock
- unix:///run/containerd/containerd.sock
- unix:///run/crio/crio.sock
- unix:///var/run/cri-dockerd.sock

With the release of Kubernetes 1.24, the support for the Docker socket was deprecated. This deprecation necessitates manually specifying the container runtime endpoint. For instance, you can configure the endpoint as shown:

```
$ crictl --runtime-endpoint
$ export CONTAINER_RUNTIME_ENDPOINT=unix:///run/containerd/containerd.sock
```

Other common endpoints include:

- unix:///run/crio/crio.sock
- unix:///var/run/cri-dockerd.sock

For a deeper understanding of these changes, refer to discussions in the Kubernetes CRI tools repository (see pull request 869 and issue 868).

## Summary

To summarize, there are three key command line tools associated with container runtimes:

1.  **ctr** – A debugging-oriented utility included with ContainerD that is used mainly for troubleshooting.
2.  **nerdctl** – A Docker-like CLI developed for ContainerD, offering a more comprehensive feature set for regular container operations.
3.  **crictl** – A versatile CLI tool from the Kubernetes community that works with any CRI-compatible runtime (including ContainerD and CRI-O) and is designed for debugging and inspection.

![The image compares container tools: ctr, nerdctl, and crictl, detailing their purposes, communities, and compatibility with ContainerD and Kubernetes.](https://kodekloud.com/kk-media/image/upload/v1752871177/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Docker-vs-ContainerD/frame_750.jpg)

Each tool serves a specific purpose, and the choice depends on whether you require advanced debugging options or a full-featured CLI for everyday container management. As container technologies continue to evolve, nerdctl is poised to become the preferred tool for general container operations in environments using ContainerD.

Thank you for reading this article.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/eae8cedf-d483-471f-8796-49f69baec6cf/lesson/5370b1a4-2d99-4b9e-a354-fb8b7fdae28b)**
>
> Watch video content
