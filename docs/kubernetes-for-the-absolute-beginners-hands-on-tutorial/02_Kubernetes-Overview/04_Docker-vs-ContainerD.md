# Docker vs ContainerD - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/kubernetes-for-the-absolute-beginners-hands-on-tutorial/Kubernetes-Overview/Docker-vs-ContainerD)

---

## Table of Contents

- Docker vs ContainerD
  - A Brief History of Containers
  - Exploring Containerd
  - CRI Tools from the Kubernetes Community
  - Kubernetes Endpoint Updates
  - Summary
  - Watch Video
    - nerdctl: A Docker-like CLI for Containerd
    - Comparison of CLI Tools

---

## Content

Kubernetes for the Absolute Beginners - Hands-on Tutorial

Kubernetes Overview

# Docker vs ContainerD

In this article, we delve into the differences between Docker and Containerd and explain how Kubernetes interacts with these container runtimes. As container orchestration evolves, you’ll notice that older documentation often pairs Docker with Kubernetes, while recent articles predominantly mention Containerd. Additionally, you may encounter CLI tools such as CTR, crictl, and nerdctl. This guide provides a historical perspective and technical details to help you understand these tools and choose the right one for your specific needs.

![The image shows logos for Docker and containerd, with buttons labeled "ctr," "nerdctl," and "crictl" below them.](https://kodekloud.com/kk-media/image/upload/v1752884907/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Docker-vs-ContainerD/frame_30.jpg)

## A Brief History of Containers

Originally, Docker was the leading container tool thanks to its superior user experience, which led to its widespread adoption. Kubernetes was initially designed to orchestrate Docker containers, creating a tight coupling between the two. However, as Kubernetes gained popularity, the need to support additional container runtimes such as Rocket (rkt) grew.

To address this, Kubernetes introduced the Container Runtime Interface (CRI), enabling any OCI-compliant container runtime to integrate seamlessly. The Open Container Initiative (OCI) later defined two key standards:

- **Image Spec:** Outlines how container images should be built.
- **Runtime Spec:** Establishes the guidelines for developing a container runtime.

While runtimes like Rocket effortlessly integrated via CRI, Docker predates CRI and wasn’t built to support these standards. As a temporary measure, Kubernetes implemented a solution known as the Docker shim.

![The image illustrates container technologies and standards, including rkt, Docker, dockershim, Kubernetes, Container Runtime Interface (CRI), and Open Container Initiative (OCI) with imagespec and runtimespec.](https://kodekloud.com/kk-media/image/upload/v1752884909/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Docker-vs-ContainerD/frame_160.jpg)

During this period, most container runtimes interfaced with Kubernetes via CRI, while Docker continued to run outside this interface. Remember, Docker is more than just a container runtime—it is a comprehensive platform that includes a CLI, API, image building tools, volume management, authentication, and security features. Its runtime component, known as runc, is managed by a daemon called Containerd.

Containerd is CRI-compatible and can work directly with Kubernetes, independent of Docker. Although Kubernetes long supported the Docker engine, the Docker shim eventually became a redundant and complex component. Starting with Kubernetes version 1.24, the Docker shim was removed. Nonetheless, Docker-built images remain compatible because they adhere to OCI standards.

![The image illustrates the relationship between Docker, Kubernetes, and container runtimes, highlighting components like containerd, dockershim, and the Container Runtime Interface (CRI).](https://kodekloud.com/kk-media/image/upload/v1752884910/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Docker-vs-ContainerD/frame_190.jpg)

## Exploring Containerd

Containerd originated as a component of Docker but has evolved into an independent project under the Cloud Native Computing Foundation with graduated status. It can be installed as a standalone runtime, making it a preferred alternative for users who do not need Docker’s complete set of features.

Traditionally, containers were launched with the `docker run` command. When using Containerd, you have access to the CTR tool—a CLI primarily focused on debugging rather than everyday container management. For example, installing Containerd can be done as follows:

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

After installation, the CTR tool provides basic commands to pull images and run containers. For instance, to pull a Redis image and run a container:

```
$ ctr images pull docker.io/library/redis:alpine
$ ctr run docker.io/library/redis:alpine redis
```

> [!important]
> **Note**
>
> CTR is primarily designed for debugging purposes. For production environments, consider using alternatives that offer a richer feature set.

### nerdctl: A Docker-like CLI for Containerd

To enhance the user experience, the nerdctl CLI provides Docker-like commands while leveraging advanced Containerd features. It supports functionalities such as encrypted container images, lazy image pulling, P2P distribution, image signing, and Kubernetes namespace verification. This makes it easy to replace Docker commands with nerdctl commands, often with minimal modifications.

For example, instead of using Docker commands like:

```
$ docker run --name redis redis:alpine
$ docker run --name webserver -p 80:80 -d nginx
```

you can achieve similar results with nerdctl using almost identical syntax.

## CRI Tools from the Kubernetes Community

Another valuable tool is crictl, a CLI utility designed to interact with any CRI-compatible container runtime, such as Containerd or CRI-O. Maintained by the Kubernetes community, crictl is geared more towards inspecting and debugging container environments than creating containers.

Using crictl, you can perform basic container operations:

```
$ crictl pull busybox
$ crictl images
$ crictl ps -a
```

To execute a command inside a container:

```
$ crictl exec -i -t 3e025dd50a72d956c4f14881fbb5b1080c9275674e95fb67f965f6478a957d60 ls
```

To view logs from a container:

```
$ crictl logs 3e025dd50a72d956c4f14881fbb5b1080c9275674e95fb67f965f6478a957d60
```

And for managing pods:

```
$ crictl pods
```

> [!important]
> **Note**
>
> Crictl is an essential tool for troubleshooting and debugging container runtimes and complements the kubelet’s functionality in Kubernetes.

![The image explains "crictl," a CLI for CRI-compatible container runtimes, used for inspecting and debugging, not creating containers, and works across different runtimes.](https://kodekloud.com/kk-media/image/upload/v1752884910/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Docker-vs-ContainerD/frame_470.jpg)

### Comparison of CLI Tools

The following image compares Docker and crictl commands, highlighting common operations such as attach, exec, images, info, inspect, logs, ps, stats, and version. For a detailed list of differences, refer to the Kubernetes documentation linked in the chart.

![The image compares Docker CLI and crictl commands, describing their functions and listing unsupported features for debugging information retrieval.](https://kodekloud.com/kk-media/image/upload/v1752884912/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Docker-vs-ContainerD/frame_640.jpg)

![A comparison table of Docker CLI and crictl commands, showing their functions and unsupported features, with a link to Kubernetes documentation.](https://kodekloud.com/kk-media/image/upload/v1752884913/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Docker-vs-ContainerD/frame_650.jpg)

## Kubernetes Endpoint Updates

In earlier Kubernetes versions, the kubelet connected to container runtimes using the following endpoints in order:

- unix:///var/run/dockershim.sock
- unix:///run/containerd/containerd.sock
- unix:///run/crio/crio.sock
- unix:///var/run/cri-dockerd.sock

With Kubernetes 1.24, the dockershim was removed and the default endpoints were updated to:

- unix:///run/containerd/containerd.sock
- unix:///run/crio/crio.sock
- unix:///var/run/cri-dockerd.sock

Users are encouraged to manually set the endpoint. For example:

```
$ crictl --runtime-endpoint
$ export CONTAINER_RUNTIME_ENDPOINT=<endpoint>
```

For more in-depth information, see the [Kubernetes CRI tools repository](https://github.com/kubernetes/cri-tools) where you can reference pull request #869 and issue #868.

## Summary

- **CTR Tool:** Provided with Containerd and ideal for debugging. Not recommended for production workloads.
- **nerdctl:** Offers a Docker-like CLI for Containerd with enhanced features for container management.
- **crictl:** A Kubernetes-maintained debugging and inspection tool for any CRI-compatible runtime.

By understanding the distinct capabilities of these tools, you can select the appropriate CLI to manage containers—whether you are working with Containerd directly or interfacing with multiple runtimes via Kubernetes.

Thank you for reading this article.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-for-the-absolute-beginners-hands-on-tutorial/module/101e958e-d0aa-4b44-8f0b-abda59a1e398/lesson/5288c4b4-75b0-442f-84ee-0a36d5c4b508)**
>
> Watch video content
