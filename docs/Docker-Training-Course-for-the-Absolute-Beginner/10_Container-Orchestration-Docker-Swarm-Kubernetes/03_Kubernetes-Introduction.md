# Kubernetes Introduction - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Training-Course-for-the-Absolute-Beginner/Container-Orchestration-Docker-Swarm-Kubernetes/Kubernetes-Introduction)

---

## Table of Contents

- Kubernetes Introduction
  - Running Applications: Docker vs. Kubernetes
  - Kubernetes Architecture Overview
  - The kubectl Command-Line Tool
  - Conclusion
  - Watch Video
    - Nodes
    - Master

---

## Content

Docker Training Course for the Absolute Beginner

Container Orchestration Docker Swarm Kubernetes

# Kubernetes Introduction

This article offers a concise introduction to key Kubernetes concepts, contrasting it with Docker while highlighting its advanced orchestration capabilities. Whether you are just starting out or looking to expand your infrastructure knowledge, this guide covers the basics, architectural components, and essential commands.

## Running Applications: Docker vs. Kubernetes

When using Docker, you can run a single instance of an application using a straightforward command:

```
docker run my-web-server
```

Kubernetes, on the other hand, enables seamless scaling. For instance, the following command deploys a thousand instances simultaneously:

```
kubectl run --replicas=1000 my-web-server
```

Beyond simple scaling, Kubernetes supports dynamic adjustments—up to two thousand instances with another command. It also facilitates rolling upgrades, allowing you to update one instance at a time, and includes a rollback mechanism if issues arise. Moreover, Kubernetes enables you to experiment with new features by upgrading only a subset of instances using A/B testing methodologies.

Below is an example demonstrating Kubernetes' rolling update and scaling features:

```
docker run my-web-server
kubectl rolling-update my-web-server --rollback
kubectl rolling-update my-web-server --image=web-server:2
kubectl scale --replicas=2000 my-web-server
```

> [!important]
> **Tip**
>
> Remember to monitor and adjust resource limits when scaling applications to ensure optimal performance.

## Kubernetes Architecture Overview

Kubernetes leverages container runtimes like Docker, Rocket, or CRI-O to execute applications within isolated containers. A Kubernetes cluster consists of multiple nodes managed by a master node that orchestrates containerized applications.

### Nodes

Nodes are physical or virtual machines running Kubernetes software. They act as workers where containers are deployed. A typical Kubernetes cluster includes multiple nodes to guarantee high availability; if one node fails, the remaining nodes continue to operate, ensuring uninterrupted service.

### Master

The master node runs the control plane components that manage and monitor the state of the cluster. Its responsibilities include maintaining cluster health, monitoring nodes, and reallocating workloads in the event of node failures.

When installing Kubernetes, the following core components are set up:

- **API Server:** Serves as the primary interface for all administrative tasks. It allows users, management devices, and CLI tools to communicate with the Kubernetes cluster.
- **etcd:** A distributed and reliable key-value store that contains all cluster data, ensuring consistency across multiple nodes.
- **Scheduler:** Responsible for distributing newly created containers across available nodes.
- **Controllers:** Detect changes in the cluster (like node failures or container issues) and initiate corrective actions by deploying new containers as needed.
- **Container Runtime:** The underlying software (e.g., Docker) that runs containers.
- **kubelet:** An agent that runs on each node to ensure containers operate as expected.

The diagram below illustrates these components and their interactions:

![The image shows a presentation slide about Kubernetes components, featuring hexagons labeled with API Server, etcd, kubelet, Scheduler, Controller, and Container Runtime, alongside a speaker.](https://kodekloud.com/kk-media/image/upload/v1752874125/notes-assets/images/Docker-Training-Course-for-the-Absolute-Beginner-Kubernetes-Introduction/frame_220.jpg)

## The kubectl Command-Line Tool

kubectl is the essential CLI tool for deploying and managing applications on a Kubernetes cluster. It is also used for retrieving critical cluster-related information, such as node status. Some basic commands include:

```
kubectl run hello-minikube
kubectl cluster-info
kubectl get nodes
```

These commands deploy an application, display cluster details, and list all nodes within the cluster. Additionally, you can deploy more complex applications. For example, to launch an application with 100 replicas, use:

```
kubectl run my-web-app --image=my-web-app --replicas=100
```

> [!important]
> **Quick Tip**
>
> Using kubectl commands effectively allows you to manage large-scale applications with simple, repeatable commands.

## Conclusion

In this article, we provided a brief overview of Kubernetes, contrasting it with Docker while delving into its architecture and key management commands. For those interested in advancing from beginner basics to expert proficiency, consider exploring our comprehensive [Kubernetes for the Absolute Beginners - Hands-on Tutorial](https://learn.kodekloud.com/user/courses/kubernetes-for-the-absolute-beginners-hands-on-tutorial).

Transcribed by https://otter.ai

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-training-course-for-the-absolute-beginner/module/8e0fd79f-1dee-4c31-ae6b-5ce9cd1861e8/lesson/a6c50f21-6073-4431-82e2-5abcf09bde5f)**
>
> Watch video content
