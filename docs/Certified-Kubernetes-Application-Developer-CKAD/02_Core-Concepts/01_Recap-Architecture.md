# Recap Architecture - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/Core-Concepts/Recap-Architecture)

---

## Table of Contents

- Recap Architecture
  - Nodes and Clusters
  - The Master Node and Cluster Management
  - Distribution of Components
  - Managing the Cluster with kubectl
  - Watch Video

---

## Content

Certified Kubernetes Application Developer - CKAD

Core Concepts

# Recap Architecture

Welcome to this lesson. In this article, we review the key components of Kubernetes architecture, focusing on nodes, clusters, master nodes, and essential Kubernetes command-line tools. This guide is ideal for beginners and professionals alike who want to understand the inner workings of Kubernetes.

## Nodes and Clusters

A node is a machine—physical or virtual—on which Kubernetes is installed. Previously known as minions, nodes serve as the worker machines where containers run. Relying on a single node can lead to application downtime in the event of a failure. To mitigate this risk, nodes are grouped into clusters, ensuring high availability and load distribution. Even if one node fails, the application continues to run on other nodes without interruption.

![The image depicts a cluster with three nodes, each containing a Redis container, represented by Kubernetes icons.](https://kodekloud.com/kk-media/image/upload/v1752871182/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Recap-Architecture/frame_50.jpg)

## The Master Node and Cluster Management

Managing a Kubernetes cluster requires robust coordination and monitoring. The master node plays a pivotal role by overseeing the entire cluster. Configured with Kubernetes, the master node stores critical cluster information, monitors node health, and redistributes workloads when necessary.

![The image depicts a Kubernetes cluster with one master and three nodes, each node running a Redis instance.](https://kodekloud.com/kk-media/image/upload/v1752871183/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Recap-Architecture/frame_80.jpg)

> [!important]
> **Key Components Deployed with Kubernetes**
>
> When installing Kubernetes, several core components are automatically deployed:
>
> - **API Server:** Serves as the front end, processing commands from users and interfaces.
> - **etcd:** A distributed key-value store that holds all cluster data and ensures consistency.
> - **Kubelet:** An agent on every node that ensures containers are running as expected.
> - **Container Runtime:** Software (such as Docker) that runs the containers.
> - **Controllers:** Monitor cluster state and take corrective actions, like replacing containers when nodes fail.
> - **Scheduler:** Distributes container workloads across nodes by assigning new containers to the most suitable node.

![The image illustrates Kubernetes components: API Server, etcd, kubelet, Container Runtime, Controller, and Scheduler, with a key-value store representation.](https://kodekloud.com/kk-media/image/upload/v1752871184/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Recap-Architecture/frame_140.jpg)

## Distribution of Components

In a Kubernetes cluster:

- The **master node** hosts the API server, controller manager, scheduler, and the etcd key-value store.
- The **worker nodes** run the kubelet agent and the container runtime (like Docker) to host and run containers.

The master node continually communicates with worker nodes to monitor their health and manage container deployment, while all operational data is securely stored in etcd.

## Managing the Cluster with kubectl

The Kubernetes command-line tool, kubectl, is essential for deploying and managing applications within the cluster. It allows you to retrieve cluster information, control nodes, and perform various administrative tasks. Here are some fundamental commands:

```
kubectl run hello-minikube
kubectl cluster-info
kubectl get nodes
```

- The first command launches an application.
- The second displays cluster information.
- The third lists all nodes in the cluster.

> [!important]
> **Next Steps**
>
> As you advance in your Kubernetes journey, you will explore additional kubectl commands and more complex cluster management tasks.

That concludes this lesson on Kubernetes architecture. Stay tuned for upcoming lessons where we delve deeper into advanced commands and concepts.

For additional resources, check out the following:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/eae8cedf-d483-471f-8796-49f69baec6cf/lesson/6fda39c3-97ba-4639-b64e-4c0d62be2813)**
>
> Watch video content
