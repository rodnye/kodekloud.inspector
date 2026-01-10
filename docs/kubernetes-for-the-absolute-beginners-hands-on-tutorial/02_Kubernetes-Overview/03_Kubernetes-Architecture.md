# Kubernetes Architecture - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/kubernetes-for-the-absolute-beginners-hands-on-tutorial/Kubernetes-Overview/Kubernetes-Architecture)

---

## Table of Contents

- Kubernetes Architecture
  - Nodes and Clusters
  - The Master Node
  - Key Components Explained
  - Distribution of Components
  - The kubectl Command-Line Tool
  - Watch Video
    - etcd Key-Value Store
    - Scheduler
    - Controllers
    - Container Runtime
    - Kubelet

---

## Content

Kubernetes for the Absolute Beginners - Hands-on Tutorial

Kubernetes Overview

# Kubernetes Architecture

Welcome to this comprehensive guide on Kubernetes architecture. Before setting up a Kubernetes cluster, it is essential to understand the fundamental concepts and key components that make up the system. This article explains nodes, clusters, master components, and tools to help you get started with Kubernetes.

## Nodes and Clusters

A node is a physical or virtual machine where Kubernetes is installed. Acting as a worker in your cluster, nodes run your containerized applications. You might also encounter the term "minions" from earlier Kubernetes documentation.

To ensure high availability, it is important to have multiple nodes grouped into a cluster. In a clustered environment, if one node fails, the application can continue running on other nodes while the workload is distributed evenly.

![The image illustrates a Kubernetes cluster with three nodes, each represented by a blue rectangle and a Kubernetes logo.](https://kodekloud.com/kk-media/image/upload/v1752884914/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Kubernetes-Architecture/frame_60.jpg)

## The Master Node

Managing a cluster requires a central control point, which is where the master node comes into play. The master node hosts components that control and monitor the cluster’s state. It is responsible for keeping track of cluster membership, managing containers across nodes, and handling failures by orchestrating replacement strategies.

![The image depicts a Kubernetes cluster architecture with one master node and three worker nodes, each running a Redis container.](https://kodekloud.com/kk-media/image/upload/v1752884915/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Kubernetes-Architecture/frame_90.jpg)

![The image depicts a Kubernetes architecture with one master node and three worker nodes, each running a Redis instance.](https://kodekloud.com/kk-media/image/upload/v1752884917/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Kubernetes-Architecture/frame_100.jpg)

When you install Kubernetes, several components are deployed:

- **API Server:** The front end for Kubernetes, handling commands from users and management interfaces.
- **etcd Key-Value Store:** A distributed, reliable store for all cluster data.
- **kubelet:** An agent that runs on each node, ensuring containers are running as expected.
- **Container Runtime:** Software such as Docker that runs the containers.
- **Controllers:** Processes that monitor cluster state and ensure the system matches the desired configuration.
- **Scheduler:** Assigns containers to nodes based on resource availability and other scheduling policies.

All these components interact through the API server to create a seamless and resilient cluster environment.

![The image illustrates Kubernetes components, including API Server, etcd, kubelet, Scheduler, Controller, and Container Runtime, connected to various devices.](https://kodekloud.com/kk-media/image/upload/v1752884918/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Kubernetes-Architecture/frame_130.jpg)

## Key Components Explained

### etcd Key-Value Store

etcd is a reliable distributed key-value store used for saving all cluster data. In multi-node and multi-master environments, etcd ensures that cluster configuration is synchronized across all the nodes. It also implements locking mechanisms to avoid conflicts between multiple masters.

![The image shows a diagram of Kubernetes components: API Server, etcd, kubelet, Container Runtime, Controller, and Scheduler, linked to a key-value store.](https://kodekloud.com/kk-media/image/upload/v1752884919/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Kubernetes-Architecture/frame_150.jpg)

### Scheduler

The scheduler is responsible for detecting newly created container requests and assigning them to the most suitable nodes based on available resources and defined policies.

![The image shows a diagram of Kubernetes components: API Server, etcd, kubelet, Container Runtime, Controller, and Scheduler, arranged in a hexagonal pattern.](https://kodekloud.com/kk-media/image/upload/v1752884920/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Kubernetes-Architecture/frame_170.jpg)

### Controllers

Controllers continuously monitor the state of nodes, containers, and endpoints. They act as the brain behind Kubernetes orchestration by making decisions such as restarting containers when failures occur.

![The image shows a diagram of Kubernetes components: API Server, etcd, kubelet, Scheduler, Controller, and Container Runtime, with a brain icon and arrow.](https://kodekloud.com/kk-media/image/upload/v1752884921/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Kubernetes-Architecture/frame_190.jpg)

### Container Runtime

The container runtime is the software responsible for running containers. Although Docker is the most popular container runtime, alternatives like Rocket or CRI-O may also be used.

### Kubelet

The kubelet agent runs on every node, ensuring that each container is healthy and running as expected. It regularly communicates with the master node to provide updates on node status and overall health.

## Distribution of Components

The architecture is divided between the master and worker nodes to optimize performance and management. The master node runs critical components such as the kube-apiserver, control manager, scheduler, and the etcd key-value store. In contrast, worker nodes host the kubelet agent and the container runtime.

![The image compares Kubernetes Master and Worker Nodes, showing components like kube-apiserver, etcd, controller, scheduler, kubelet, and container runtime.](https://kodekloud.com/kk-media/image/upload/v1752884922/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Kubernetes-Architecture/frame_310.jpg)

Understanding the roles of these components will enable you to effectively install and configure your Kubernetes infrastructure.

## The kubectl Command-Line Tool

An indispensable tool for managing your Kubernetes cluster is the command-line interface, kubectl. This tool allows you to deploy, manage, and troubleshoot applications running on Kubernetes. With kubectl, you can retrieve detailed cluster information, monitor node status, and manage workloads.

Below are some basic kubectl commands:

```
kubectl run hello-minikube
kubectl cluster-info
kubectl get nodes
```

- The `kubectl run` command is used to deploy an application.
- The `kubectl cluster-info` command provides details about the cluster.
- The `kubectl get nodes` command lists all the nodes that are part of the cluster.

> [!important]
> **Tip**
>
> Familiarize yourself with kubectl commands as you progress. They are essential for interacting with your Kubernetes cluster and performing day-to-day operations.

This concludes our introductory guide to Kubernetes architecture. Continue exploring more advanced topics and tools in our next lesson.

See you in the next article!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-for-the-absolute-beginners-hands-on-tutorial/module/101e958e-d0aa-4b44-8f0b-abda59a1e398/lesson/6250bc00-52a3-4932-864a-f6aae67144aa)**
>
> Watch video content
