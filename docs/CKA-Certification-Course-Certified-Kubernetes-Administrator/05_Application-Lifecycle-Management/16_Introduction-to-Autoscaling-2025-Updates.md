# Introduction to Autoscaling 2025 Updates - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Application-Lifecycle-Management/Introduction-to-Autoscaling-2025-Updates)

---

## Table of Contents

- Introduction to Autoscaling 2025 Updates
  - Manual Scaling
  - Automated Scaling
  - Watch Video

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Application Lifecycle Management

# Introduction to Autoscaling 2025 Updates

In this lesson series, we explore autoscaling, a key topic for the Certified Kubernetes Administrator (CKA) exam. We will focus on Horizontal Pod Autoscaling (HPA) and Vertical Pod Autoscaling (VPA) to give you the essential knowledge in a concise format. For a comprehensive dive into autoscaling, consider the [Kubernetes Autoscaling course on KodeKloud](https://learn.kodekloud.com/user/courses/kubernetes-autoscaling).

Before diving into autoscaling in Kubernetes, let’s review the traditional concepts of scaling using physical servers.

Imagine a past scenario where applications were deployed on physical servers with fixed CPU and memory capacities. When the application load exceeded server capacity, you had two options:

1.  Shut down the application and upgrade the existing server by adding more CPU and memory (vertical scaling).
2.  If the application could run multiple instances, add another server to distribute the load without downtime (horizontal scaling).

Vertical scaling means enhancing a single server’s resources, whereas horizontal scaling means incorporating additional servers to manage increased load.

![The image illustrates the concepts of horizontal and vertical scaling, showing two server units with CPU and memory resources, and arrows indicating scaling directions.](https://kodekloud.com/kk-media/image/upload/v1752869664/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Introduction-to-Autoscaling-2025-Updates/scaling-concepts-horizontal-vertical.jpg)

Now, let’s see how these concepts apply to Kubernetes and containerized environments. Kubernetes is designed to dynamically scale containerized applications. Two primary scaling strategies in Kubernetes are:

1.  Scaling workloads – adding or removing containers (Pods) in the cluster.
2.  Scaling the underlying cluster infrastructure – adding or removing nodes (servers) in the cluster.

![The image illustrates a concept of scaling workloads with orchestration, showing multiple user icons and container icons organized in two sections.](https://kodekloud.com/kk-media/image/upload/v1752869665/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Introduction-to-Autoscaling-2025-Updates/scaling-workloads-orchestration-diagram.jpg)

To clarify:

- For the cluster infrastructure:
  - **Horizontal scaling:** Add more nodes to the cluster.
  - **Vertical scaling:** Increase resources (CPU, memory) on existing nodes.

- For workloads:
  - **Horizontal scaling:** Create more Pods.
  - **Vertical scaling:** Increase resource limits and requests for existing Pods.

There are two approaches to scaling in Kubernetes: manual and automated.

> [!important]
> **Manual vs. Automated Scaling**
>
> Manual scaling and automated scaling both have their place. Manual scaling involves direct intervention and command execution, while automated scaling leverages Kubernetes controllers for dynamic adjustments.

## Manual Scaling

For manual scaling, use the following methods:

- **Cluster Infrastructure Horizontal Scaling:**  
  Manually provision new nodes and add them to the cluster:

  ```
  kubeadm join ...
  ```

- **Workload Horizontal Scaling:**  
  Adjust the number of Pods using:

  ```
  kubectl scale --replicas=<number> <workload-type>/<workload-name>
  ```

- **Workload Vertical Scaling:**  
  Edit the deployment, stateful set, or ReplicaSet to change resource limits and requests:

  ```
  kubectl edit <workload-type>/<workload-name>
  ```

Vertical scaling of cluster nodes is less common in Kubernetes because it often requires downtime. In virtualized environments, it may be easier to provision a new VM with higher resources, add it to the cluster, and then decommission the older node.

## Automated Scaling

Automated scaling in Kubernetes simplifies operations:

- **Cluster Infrastructure:**  
  Managed by the Kubernetes Cluster Autoscaler.
- **Workload Horizontal Scaling:**  
  Managed by the Horizontal Pod Autoscaler (HPA).
- **Workload Vertical Scaling:**  
  Managed by the Vertical Pod Autoscaler (VPA).

The manual commands summarized earlier are:

```
kubeadm join ...
```

```
kubectl scale --replicas=<number> <workload-type>/<workload-name>
```

```
kubectl edit <workload-type>/<workload-name>
```

This lesson provided a high-level overview of scaling concepts—both in traditional environments and in containerized applications managed by Kubernetes. In upcoming lessons, we will explore these autoscaling methods in greater detail.

See you in the next lesson!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/2ddcf79b-abb0-4aeb-ad0c-3d54c7b4fc64/lesson/17d4aa01-4f21-434e-90e0-9aa2a876d9eb)**
>
> Watch video content
