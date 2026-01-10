# Pre Requisite Docker Overview - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenShift-4/Pre-Requisite-Docker-and-Kubernetes/Pre-Requisite-Docker-Overview)

---

## Table of Contents

- Pre Requisite Docker Overview
  - Containers and Docker
  - Understanding Docker and the Operating System
  - Running Containerized Applications
  - Further Learning and Resources
  - Watch Video
    - What Are Containers?
    - Containers vs. Virtual Machines
    - Images vs. Containers

---

## Content

OpenShift 4

Pre Requisite Docker and Kubernetes

# Pre Requisite Docker Overview

Hello and welcome to this in-depth article on Kubernetes Overview. My name is Mumshad Manambath, and today we will explore the foundation of Kubernetes by first understanding the core concepts of containers and orchestration.

Kubernetes, also known as K8s, was developed by Google from their production container experience. Now an open source project, Kubernetes stands as one of the most popular container orchestration platforms available. In this article, we will gain a high-level understanding of Kubernetes, starting with the essential concepts of containers and orchestration.

![The image contains text that reads "kubernetes or K8s" and "Container + Orchestration" with a blue border at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752882757/notes-assets/images/OpenShift-4-Pre-Requisite-Docker-Overview/kubernetes-k8s-container-orchestration.jpg)

We begin our journey by exploring containers.

## Containers and Docker

Containers offer an isolated environment to run applications, and Docker is the most popular technology in this space. If you are already familiar with Docker, you can skip ahead. However, let me share how I was first introduced to Docker during one of my projects.

![The image features a blue and white design with the word "Containers" on the left and an icon of an open box in the center. The name "mumshad mannambeth" is at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752882758/notes-assets/images/OpenShift-4-Pre-Requisite-Docker-Overview/containers-open-box-mumshad-mannambeth.jpg)

In one of my earlier projects, I was tasked with setting up a complete stack that included a Node.js web server, a MongoDB database, Redis for messaging, and Ansible for orchestration. We quickly encountered challenges like cross-platform compatibility and dependency conflicts between different services, a situation we humorously referred to as the "matrix from hell."

![The image is a presentation slide discussing the need for containers, highlighting issues like compatibility, long setup times, and different environments, with a diagram labeled "The Matrix from Hell" illustrating complex dependencies.](/images/OpenShift-4-Pre-Requisite-Docker-Overview/containers-compatibility-setup-issues.jpg)

Furthermore, creating new environments for every developer was a painstaking process. Each team member had to manually configure the operating system, correct versions, and all dependencies. The inconsistencies between development, testing, and production environments often led to unpredictable application behavior.

> [!important]
> **Tip**
>
> Docker simplifies the process by allowing each component to run in its own container with dedicated libraries and dependencies, mitigating compatibility issues across different systems.

To overcome these issues, I needed a tool that simplified compatibility management and enabled modular adjustments without impacting the entire system. This need led me to Docker. Docker allowed us to encapsulate each component in its own container, ensuring consistency regardless of the underlying operating system.

![The image shows a person explaining a diagram about containerization, featuring components like web servers, databases, messaging, and orchestration, all running on Docker.](https://kodekloud.com/kk-media/image/upload/v1752882759/notes-assets/images/OpenShift-4-Pre-Requisite-Docker-Overview/containerization-diagram-docker-explanation.jpg)

With Docker, you build the container configuration once and then deploy it using a simple Docker command, regardless of the host OS as long as Docker is installed.

### What Are Containers?

Containers are isolated environments capable of running their own processes, managing networking interfaces, and handling mounts—similar to virtual machines but sharing the same operating system kernel. Although containers have become popular recently, the concept has been around for over a decade with implementations such as LXC, LXD, and LXCFS. Docker leverages LXC containers and enhances their usability with higher-level tools.

![The image shows a person standing in front of a presentation slide titled "What are containers?" with icons representing containers and their components like processes, network, and mounts, above an "OS Kernel" label.](https://kodekloud.com/kk-media/image/upload/v1752882760/notes-assets/images/OpenShift-4-Pre-Requisite-Docker-Overview/what-are-containers-presentation-slide.jpg)

## Understanding Docker and the Operating System

A solid grasp of operating system fundamentals helps in understanding Docker. Popular Linux distributions such as Ubuntu, Fedora, SUSE, and CentOS consist of two main parts:

- An OS kernel that interacts directly with hardware.
- A collection of software, including user interfaces, drivers, compilers, file managers, and developer tools that differ among distributions.

Docker containers share the OS kernel of the host. For example, on an Ubuntu system with Docker installed, you can run containers based on other Linux distributions (like Debian, Fedora, SUSE, or CentOS) because they all share the same Linux kernel. However, Windows-based containers cannot run on a Linux Docker host since they require a different kernel. For Windows containers, Docker must be installed on a Windows server.

Unlike hypervisors, Docker is not intended for running multiple operating system kernels on the same hardware—it is optimized for containerizing, shipping, and running applications efficiently.

### Containers vs. Virtual Machines

There are several key differences between Docker containers and virtual machines (VMs):

- Docker containers share the host OS kernel and only include the necessary libraries and dependencies, which makes them lightweight.
- Virtual machines run an entire OS along with their dependencies, leading to increased resource consumption. VMs are typically larger in size, measured in gigabytes, and take minutes to boot, compared to containers that are measured in megabytes and start in seconds.
- While Docker containers offer less isolation due to the shared kernel, VMs provide complete isolation, allowing different operating system kernels to run concurrently on the same hardware.

![The image compares containers and virtual machines, highlighting differences in utilization, size, and boot-up processes, with a person standing in front of the diagram.](https://kodekloud.com/kk-media/image/upload/v1752882761/notes-assets/images/OpenShift-4-Pre-Requisite-Docker-Overview/containers-vs-virtual-machines-diagram.jpg)

Another significant distinction is that VMs allow you to run different operating systems (e.g., Linux and Windows on the same hypervisor), a flexibility not supported on a single Docker host.

## Running Containerized Applications

Today, containerized applications have become the de facto strategy for packaging and deploying software. Public Docker registries like Docker Hub or Docker Store provide container images for various technologies including operating systems, databases, and other services.

Once you have the necessary images, all you need is Docker installed on your host. Deploying an application stack then becomes as simple as running a Docker command. For example, you can run services such as Ansible, MongoDB, Redis, or Node.js with the following commands:

```
docker run ansible
docker run mongodb
docker run redis
docker run nodejs
```

If you require multiple instances of a web service, you can scale by running additional containers and use a load balancer to manage traffic. In case of a container failure, simply remove and relaunch the instance. Advanced orchestration solutions that handle such scenarios are covered later in this course.

### Images vs. Containers

It is crucial to understand the distinction between Docker images and containers:

- A Docker image is like a template or blueprint used to create one or more containers.
- A Docker container is an active instance of a Docker image, running as an isolated application with its own processes and environment.

![The image illustrates the difference between a Docker image and Docker containers, showing a person explaining the concept with visual representations of a Docker image and three Docker containers.](https://kodekloud.com/kk-media/image/upload/v1752882762/notes-assets/images/OpenShift-4-Pre-Requisite-Docker-Overview/docker-image-vs-containers-diagram.jpg)

If you cannot find the image you need in a public registry, you always have the option of creating your own and pushing it to Docker Hub for broader accessibility.

Traditionally, developers built applications and passed them to the operations (Ops) team, who then followed exhaustive instructions to configure host environments, prerequisites, and dependencies. This process was error-prone and often led to significant troubleshooting sessions.

> [!important]
> **Developer Insight**
>
> Docker streamlines this process by shifting much of the configuration responsibility to developers. By writing a Dockerfile that encapsulates the entire setup, you ensure that the containerized application runs consistently across any deployment, reducing potential issues for the Ops team.

![The image illustrates the concept of "Container Advantage" with icons representing a developer, a Docker image, and operations.](https://kodekloud.com/kk-media/image/upload/v1752882763/notes-assets/images/OpenShift-4-Pre-Requisite-Docker-Overview/container-advantage-developer-docker-icons.jpg)

## Further Learning and Resources

To gain deeper insights into containers and Docker, consider exploring these courses:

- [Docker for the Absolute Beginners](https://learn.kodekloud.com/user/courses/docker-training-course-for-the-absolute-beginner)
- [Docker Swarm](https://learn.kodekloud.com/user/courses/docker-swarm-services-stacks-hands-on)

These courses cover essential Docker commands, Dockerfile creation, and advanced container orchestration techniques.

That concludes our lecture on containers and Docker. I look forward to seeing you in the next lecture.

![The image shows two online courses about Docker, one labeled "Highest Rated" and the other "Best Seller," both with ratings and reviews.](https://kodekloud.com/kk-media/image/upload/v1752882764/notes-assets/images/OpenShift-4-Pre-Requisite-Docker-Overview/docker-online-courses-ratings-reviews.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/openshift-4/module/44c3552b-c55b-4984-9d51-ca96ce452824/lesson/992f8614-481e-446f-91f2-36e5f6a87a16)**
>
> Watch video content
