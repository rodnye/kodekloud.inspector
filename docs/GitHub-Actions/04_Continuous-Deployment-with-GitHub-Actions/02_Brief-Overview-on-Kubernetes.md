# Brief Overview on Kubernetes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions/Continuous-Deployment-with-GitHub-Actions/Brief-Overview-on-Kubernetes)

---

## Table of Contents

- Brief Overview on Kubernetes
  - Kubernetes Architecture and Cluster Components
  - Pods and Workloads
  - Service Discovery and Networking
  - Links and References
  - Watch Video
    - ReplicaSets and Deployments
    - Ingress

---

## Content

GitHub Actions

Continuous Deployment with GitHub Actions

# Brief Overview on Kubernetes

Kubernetes is an open-source container orchestration platform initially developed by Google and now maintained by the Cloud Native Computing Foundation (CNCF). It automates deployment, scaling, and management of containerized applications, enabling resilient, portable workloads across on-premises and cloud environments.

## Kubernetes Architecture and Cluster Components

A Kubernetes cluster consists of **control plane** nodes and **worker** nodes. Control plane components manage and maintain cluster state, while worker nodes run application containers.

| Component                  | Role                                            | Notes                                                    |
| -------------------------- | ----------------------------------------------- | -------------------------------------------------------- |
| kube-apiserver             | Central API endpoint                            | Validates and configures data for API objects.           |
| etcd                       | Distributed key–value store                     | Stores all cluster data and configuration.               |
| kube-controller-manager    | Control loops to enforce desired state          | Manages node health, replication, and endpoint tracking. |
| kube-scheduler             | Pod placement based on resource availability    | Assigns pods to suitable nodes.                          |
| kubelet (worker)           | Node agent ensuring containers run as expected  | Registers node with control plane and reports status.    |
| kube-proxy (worker)        | Networking and load balancing for pods          | Maintains network rules on nodes.                        |
| Container runtime (worker) | Executes container images (e.g., Docker, CRI-O) | Interfaces with kubelet to pull and run containers.      |

![The image is a diagram illustrating the basics of Kubernetes architecture, showing the interaction between developers, admins, and operations with the controller node and worker nodes, including components like etcd, kube apiserver, and pods.](https://kodekloud.com/kk-media/image/upload/v1752876443/notes-assets/images/GitHub-Actions-Brief-Overview-on-Kubernetes/kubernetes-architecture-diagram-developers-admins.jpg)

## Pods and Workloads

A **Pod** is the smallest deployable unit in Kubernetes, encapsulating one or more containers that share:

- A network namespace (IP address and ports)
- Shared storage volumes
- Container execution configuration

Pods are ephemeral by default; they do not self-heal once terminated.

> [!important]
> **Note**
>
> To achieve high availability and self-healing, wrap pods in higher-level controllers such as ReplicaSets and Deployments.

### ReplicaSets and Deployments

- **ReplicaSet**: Ensures a specified number of pod replicas are running at any time.
- **Deployment**: Declaratively manages ReplicaSets to facilitate rolling updates and rollbacks.

Example Deployment manifest:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:latest
        ports:
        - containerPort: 80
```

## Service Discovery and Networking

Kubernetes Services provide stable endpoints to access pods. Common types include:

| Service Type | Scope                        | Use Case                                        |
| ------------ | ---------------------------- | ----------------------------------------------- |
| ClusterIP    | Internal cluster only        | Microservices communicating within the cluster. |
| NodePort     | Static port on every node    | Development or simple external access.          |
| LoadBalancer | External cloud load balancer | Production traffic with a single public IP.     |

> [!important]
> **Warning**
>
> Provisioning a `LoadBalancer` service may incur additional cloud provider costs. Review your cloud network pricing before use.

### Ingress

Ingress resources enable advanced HTTP(S) routing:

- **Path-based routing**: Route requests by URL path (e.g., `/app1`, `/app2`).
- **Host-based routing**: Direct traffic based on hostname (e.g., `app.example.com`).
- **TLS termination**: Consolidate HTTPS certificates at the edge.

Ingress controllers often pair with ClusterIP services to secure internal access and reduce the number of external load balancers.

## Links and References

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Kubernetes Components](https://kubernetes.io/docs/concepts/overview/components/)
- [Managing Services](https://kubernetes.io/docs/concepts/services-networking/service/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions/module/92928734-1d5a-462d-9414-2d3865f5ef79/lesson/75fab793-ac60-4076-9d09-e0af0184667f)**
>
> Watch video content
