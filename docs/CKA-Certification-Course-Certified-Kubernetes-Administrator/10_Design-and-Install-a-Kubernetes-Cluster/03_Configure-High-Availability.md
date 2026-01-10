# Configure High Availability - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Design-and-Install-a-Kubernetes-Cluster/Configure-High-Availability)

---

## Table of Contents

- Configure High Availability
  - High Availability Master Components
  - Cluster Design Summary
  - Watch Video
    - API Server in Active-Active Mode
    - Scheduler and Controller Manager in Active-Standby Mode
    - etcd Topologies in High Availability

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Design and Install a Kubernetes Cluster

# Configure High Availability

Welcome to this guide on configuring high availability in Kubernetes. In this article, we explain what happens when a master node fails and how to set up your environment to ensure continuous operation. We focus on maintaining sufficient redundancy for the control plane components while highlighting the crucial role of each component.

When a master node becomes unavailable, the worker nodes and the applications running on them continue to function normally. However, if a container or pod (especially one managed by a replica set) crashes, the replication controller on the master is responsible for starting a new pod. Without a functioning master, its controllers, schedulers, and the Kube API server become unreachable, meaning you cannot manage the cluster externally with commands like kubectl or via the API.

> [!important]
> **Note**
>
> To mitigate this single point of failure, it is essential to deploy multiple master nodes in a high availability configuration. This setup builds redundancy across all critical components—from the master nodes and control plane components to the worker nodes and applications managed by replica sets and services.

The remainder of the article focuses on the master node components and their operation in a high availability environment.

## High Availability Master Components

In a standard three-node cluster, you start with one master and two worker nodes. The master node hosts the core control plane components, including the API server, controller manager, scheduler, and etcd server. When you add a second master node for high availability, the same components are deployed on the new master.

### API Server in Active-Active Mode

The Kube API server processes requests and provides cluster information. It runs in an active-active mode; multiple API servers can operate concurrently on different nodes. In a typical configuration, the kubectl utility contacts the master node on port 6443 as specified in the kubeconfig file. However, when multiple master nodes are present, you must avoid sending duplicate requests to all of them. Instead, use a load balancer to distribute traffic evenly among the API servers.

![The image depicts a high-availability architecture with two active master nodes, each containing an API server, ETCD, controller manager, and scheduler, connected via a load balancer.](https://kodekloud.com/kk-media/image/upload/v1752869762/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Configure-High-Availability/frame_180.jpg)

You can implement load balancing with tools such as nginx or HAProxy to ensure smooth operation.

### Scheduler and Controller Manager in Active-Standby Mode

Both the scheduler and controller manager continuously monitor the cluster state to perform required actions. Running multiple instances of these components simultaneously could lead to duplicate operations, like launching extra pods. To prevent this, they should run in an active-standby mode. A leader election process ensures that only one instance manages the operations at a time.

For instance, the controller manager uses leader election (enabled by default) to secure a lock on a specific Kubernetes endpoint known as the "kube-controller-manager" endpoint. The first instance to update this endpoint becomes active, while the others remain passive. The active process holds the lock for a defined lease duration (default is 15 seconds) and renews it every 10 seconds, while all instances attempt to acquire leadership every 2 seconds. If the active instance fails, a passive instance can quickly take over.

Below is an example command to start the controller manager with leader election enabled:

```
kube-controller-manager --leader-elect true [other options]
```

The scheduler is configured similarly, using the same leader election options.

### etcd Topologies in High Availability

etcd is the Kubernetes component that stores all cluster data. There are two common topologies for its deployment:

1.  **Stacked Control Plane Nodes Topology:**  
    In this model, etcd runs on the same nodes as the Kubernetes control plane. This configuration simplifies deployment and management since it requires fewer nodes. However, a failure on one node results in losing both the etcd member and the corresponding control plane components.
2.  **External etcd Servers Topology:**  
    Here, etcd is deployed on separate servers independent of the control plane nodes. This design minimizes risk since a control plane node failure does not directly affect the etcd cluster. The trade-off is that this setup demands twice as many servers compared to the stacked topology.

![The image illustrates an "External ETCD Topology" with components like ETCD, API Server, Controller Manager, and Scheduler, highlighting risks and setup complexity.](https://kodekloud.com/kk-media/image/upload/v1752869763/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Configure-High-Availability/frame_380.jpg)

Remember that even in high availability configurations, only the API server communicates directly with etcd. In your API server configuration, you must specify the list of etcd servers (it can be a single address or multiple addresses, depending on your chosen topology).

> [!important]
> **Further Reading**
>
> In upcoming articles, we will delve deeper into how etcd operates within a cluster and outline best practices for determining the optimal number of nodes in your etcd cluster.

## Cluster Design Summary

Originally, many clusters were designed with a single master node. With high availability in mind, modern configurations deploy multiple master nodes and incorporate a load balancer for the API servers. This design typically results in a cluster with five nodes: multiple masters, an external load balancer, and worker nodes.

![The image depicts a network design with load balancer, ETCD masters, and worker nodes, featuring logos for Weaveworks and Kubernetes.](https://kodekloud.com/kk-media/image/upload/v1752869764/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Configure-High-Availability/frame_460.jpg)

This high availability setup ensures that even if one master node fails, the control plane remains operational and is able to manage workloads effectively.

For more information on Kubernetes best practices, configuration details, and community resources, consider visiting [Kubernetes Documentation](https://kubernetes.io/docs/) and other reputable guides.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/245617d7-2c45-44bc-84f8-5209c0e816d0/lesson/47648a31-286d-4ff6-8f66-c3525220c7d4)**
>
> Watch video content
