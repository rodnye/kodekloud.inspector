# Kubernetes Architecture - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Kubernetes/Kubernetes-Architecture)

---

## Table of Contents

- Kubernetes Architecture
  - Docker vs. Kubernetes
  - 1. Nodes and Cluster
  - 2. Control Plane Components
  - 3. Kubernetes CLI (kubectl)
  - Links and References
  - Watch Video
    - Example Workflow

---

## Content

Docker Certified Associate Exam Course

Kubernetes

# Kubernetes Architecture

In this lesson, you’ll get a concise overview of Kubernetes architecture and its core concepts. While Kubernetes is a vast ecosystem—entire courses cover every detail—this guide focuses on the essentials you need to understand how Kubernetes runs and scales containerized applications.

## Docker vs. Kubernetes

Docker and Kubernetes often appear together, but they serve different purposes:

- Docker provides a **container runtime** for packaging and running individual containers.
- Kubernetes is an **orchestration system** that automates deployment, scaling, and management of containerized applications across a cluster.

> [!important]
> **Note**
>
> Kubernetes supports multiple container runtimes. While Docker is the most common, you can also use CRI-O or containerd via the [Container Runtime Interface (CRI)](https://kubernetes.io/docs/concepts/architecture/cri/).

## 1\. Nodes and Cluster

A _node_ is a physical or virtual machine that runs containerized workloads. You group multiple nodes into a _cluster_ to achieve high availability and fault tolerance. If one node fails, other nodes continue serving your application.

![The image shows a diagram of a cluster with three nodes, each containing a Redis icon and a Kubernetes symbol, alongside a person standing to the right.](https://kodekloud.com/kk-media/image/upload/v1752873997/notes-assets/images/Docker-Certified-Associate-Exam-Course-Kubernetes-Architecture/kubernetes-redis-cluster-diagram.jpg)

## 2\. Control Plane Components

The control plane (formerly called “master”) runs components that maintain the cluster’s desired state:

![The image shows a diagram of Kubernetes components, including API Server, etcd, kubelet, Scheduler, Controller, and Container Runtime, with a person standing on the right side.](https://kodekloud.com/kk-media/image/upload/v1752873998/notes-assets/images/Docker-Certified-Associate-Exam-Course-Kubernetes-Architecture/kubernetes-components-diagram-person.jpg)

| Component             | Role                                                                                   |
| --------------------- | -------------------------------------------------------------------------------------- |
| **API Server**        | The cluster’s front end. All CLI (`kubectl`), UI, and internal requests go through it. |
| **etcd**              | A highly available key-value store for all cluster data and configuration.             |
| **Scheduler**         | Assigns pods to nodes based on resource requirements and policies.                     |
| **Controller**        | Monitors state and takes corrective actions (e.g., launching new pods on failure).     |
| **kubelet**           | Agent on each node ensuring containers described in PodSpecs are running and healthy.  |
| **Container Runtime** | Software that runs containers (e.g., Docker, containerd, CRI-O).                       |

> [!important]
> **Warning**
>
> Data in **etcd** is critical: back it up regularly. Loss of etcd data can render your cluster unusable.

## 3\. Kubernetes CLI (`kubectl`)

`kubectl` is the primary command-line tool to interact with the Kubernetes API. Here are common commands:

| Command                    | Description                                         |
| -------------------------- | --------------------------------------------------- |
| `kubectl run`              | Deploy an application (create a Deployment or Pod). |
| `kubectl get nodes`        | List all nodes in the cluster.                      |
| `kubectl get pods`         | List all pods in the current namespace.             |
| `kubectl cluster-info`     | Display addresses of the control plane.             |
| `kubectl scale deployment` | Adjust the number of replicas in a Deployment.      |
| `kubectl set image`        | Update the image of a Deployment.                   |
| `kubectl rollout undo`     | Roll back to a previous Deployment version.         |

### Example Workflow

```
# Deploy a simple BusyBox pod with a single replica
kubectl run hello-minikube --image=busybox --replicas=1

# Verify nodes and cluster
kubectl get nodes
kubectl cluster-info

# Scale up your application
kubectl scale deployment hello-minikube --replicas=3

# Perform a rolling update
kubectl set image deployment/hello-minikube hello-minikube=busybox:1.1 --record

# Roll back if needed
kubectl rollout undo deployment/hello-minikube
```

> [!important]
> **Note**
>
> You can also configure **Horizontal Pod Autoscaler** to automatically adjust replica counts based on CPU or custom metrics. See [Horizontal Pod Autoscaling](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/) for details.

---

Ready to dive deeper? Explore our in-depth Kubernetes courses to master topics like Networking, Storage, Security, and become a certified Kubernetes Administrator (CKA).

## Links and References

- [Kubernetes Official Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/d9358627-4fc7-4acc-ab96-fa25232555c6/lesson/c7a6816c-f8f7-4a9d-9764-a29c20ae9094)**
>
> Watch video content
