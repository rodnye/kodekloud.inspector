# Brief Overview on Kubernetes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins-Pipelines/Kubernetes-and-GitOps/Brief-Overview-on-Kubernetes)

---

## Table of Contents

- Brief Overview on Kubernetes
  - Nodes and Their Roles
  - Pods
  - Accessing Pods with Services
  - Additional Resources
  - Watch Video
    - Service Types

---

## Content

Jenkins Pipelines

Kubernetes and GitOps

# Brief Overview on Kubernetes

This lesson provides an introduction to Kubernetes, the leading open-source container orchestration platform. Originally developed by Google and now maintained by the Cloud Native Computing Foundation (CNCF), Kubernetes simplifies the deployment, scaling, and management of containerized applications.

## Nodes and Their Roles

Kubernetes clusters are composed of individual machines known as nodes, which can be either physical or virtual. Nodes are classified into two main types:

- **Worker Nodes:** These nodes run the containerized applications.
- **Control Plane Nodes:** These nodes manage the cluster’s overall operation. They host critical components such as the API server (the entry point for all cluster operations), controller manager, scheduler, and etcd.

## Pods

A pod is the smallest deployable unit in Kubernetes, representing a single instance of a running process within a cluster. Each pod may encapsulate one or more containers that share a common network namespace, IP address, and storage. This design is particularly effective for grouping containers that must work together.

**Key Points:**

- In our example, each pod encapsulates only one container.
- Pods follow a specific restart policy where individual containers may be restarted automatically; however, if a pod itself is terminated, it must be recreated manually or by using higher-level constructs.
- To ensure high availability and consistency, pods are managed through replication controllers or deployments. Deployments offer a declarative update mechanism, allowing you to define your desired application state and let Kubernetes maintain it.

> [!important]
> **Note**
>
> For more details on pod management, review the [Kubernetes Pods documentation](https://kubernetes.io/docs/concepts/workloads/pods/).

## Accessing Pods with Services

After the pods are created, external components need to communicate with them reliably. Kubernetes services provide stable and consistent network endpoints to enable this communication. Services also distribute incoming traffic among multiple pods, ensuring efficient load balancing.

### Service Types

- **ClusterIP:** The default service type that exposes the service on an internal IP within the cluster. This is ideal for internal communication.
- **Load Balancer:** In cloud environments, this service type creates an external load balancer (like AWS ELB or GCP load balancer) to direct traffic to the service. Note that the specific features and costs may vary depending on the provider.
- **Ingress:** To reduce the number of load balancers, Kubernetes Ingress functions as an alternative mechanism. Ingress manages and routes HTTP and HTTPS traffic based on rules like paths and domain names. Services typically use a ClusterIP type when exposed via Ingress, ensuring controlled and secure access.

> [!important]
> **Warning**
>
> Be aware that utilizing external load balancers might incur additional costs with your cloud provider. Always check pricing details before extensive deployment.

![The image illustrates the basic architecture of Kubernetes, showing the interaction between controller nodes, worker nodes, and various components like pods, services, and ingress. It highlights roles such as developers, admins, and ops, and includes elements like UI, CLI, and load balancing.](https://kodekloud.com/kk-media/image/upload/v1752879705/notes-assets/images/Jenkins-Pipelines-Brief-Overview-on-Kubernetes/kubernetes-architecture-controller-worker-diagram.jpg)

## Additional Resources

For additional insights and detailed guides, explore the following resources:

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Cloud Native Computing Foundation](https://www.cncf.io/)

This comprehensive overview should provide you with a strong foundational understanding of how Kubernetes orchestrates containerized applications. Whether you're getting started or looking to deepen your expertise, Kubernetes offers robust solutions for modern application deployment and management.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins-pipelines/module/fb6b2c83-178c-4962-b4e6-ca5528721170/lesson/d9f8b01c-c3ea-4fac-9567-b364b63a9fe6)**
>
> Watch video content
