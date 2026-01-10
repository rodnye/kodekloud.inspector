# What is EKS - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-EKS/EKS-Fundamentals/What-is-EKS)

---

## Table of Contents

- What is EKS
  - Kubernetes Cluster Architecture
  - EKS Shared Responsibility Model
  - Control Plane ↔ Data Plane Communication
  - Learn More
  - Watch Video

---

## Content

AWS EKS

EKS Fundamentals

# What is EKS

Amazon Elastic Kubernetes Service (EKS) is AWS’s managed Kubernetes offering. By handling the control plane—API servers, etcd, schedulers, controllers—EKS lets you focus on deploying and operating your containerized workloads. Unlike a self-managed Kubernetes cluster, Amazon EKS splits responsibilities: AWS manages the control plane, while you maintain the data plane in your own AWS account.

## Kubernetes Cluster Architecture

A standard Kubernetes cluster consists of two main layers:

1.  **Control Plane**
    - etcd (the key/value store)
    - API Server
    - Scheduler
    - Controller Manager

2.  **Data Plane**
    - Worker nodes (EC2 instances or AWS Fargate)
    - Pods and containers

![The image is a diagram of an EKS (Elastic Kubernetes Service) Cluster, showing the components of the Control Plane (etcd, API server, scheduler) and the Data Plane (worker nodes).](https://kodekloud.com/kk-media/image/upload/v1752862789/notes-assets/images/AWS-EKS-What-is-EKS/eks-cluster-control-data-plane-diagram.jpg)

For more on Kubernetes components, see the [Kubernetes Documentation](https://kubernetes.io/docs/concepts/overview/components/).

## EKS Shared Responsibility Model

With Amazon EKS, AWS takes care of the highly available, secure control plane, while you manage your worker nodes and application workloads.

| AWS Manages (Control Plane)          | You Manage (Data Plane)                       |
| ------------------------------------ | --------------------------------------------- |
| etcd, API Server, Scheduler          | Worker Nodes (EC2 instances or Fargate)       |
| Controller Manager                   | Operating System patches & node upgrades      |
| Control Plane VPC networking & HA    | Kubernetes workloads, Namespaces, RBAC, CRDs  |
| Automatic backups, updates & scaling | Pod configuration, Security Groups, IAM roles |

> [!important]
> **Note**
>
> AWS provisions a dedicated VPC for the control plane and connects it to your VPC using cross-account Elastic Network Interfaces (ENIs).

![The image is a diagram of an EKS (Elastic Kubernetes Service) cluster, showing the control plane with components like etcd, API server, and scheduler, and the data plane with worker nodes.](https://kodekloud.com/kk-media/image/upload/v1752862791/notes-assets/images/AWS-EKS-What-is-EKS/eks-cluster-diagram-control-data-plane.jpg)

## Control Plane ↔ Data Plane Communication

Under the hood, your worker nodes in one VPC communicate with the managed control plane in another VPC. AWS uses cross-account ENIs to bridge the two, similar to connecting two physical network switches with a cable:

- **Your Network**: Worker nodes plugged into your VPC.
- **AWS’s Network**: Control plane components housed in AWS’s VPC.

This link ensures secure, low-latency API calls and etcd reads/writes from your pods to the managed control plane.

> [!important]
> **Warning**
>
> Make sure your VPC subnets, route tables, and security groups allow traffic between your nodes and the control plane ENIs. Misconfigured rules can cause API connectivity failures.

## Learn More

- [Amazon EKS Documentation](https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html)
- [Kubernetes Cluster Architecture](https://kubernetes.io/docs/concepts/overview/components/)
- [AWS VPC Networking](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html)
- [AWS Fargate for EKS](https://docs.aws.amazon.com/eks/latest/userguide/fargate.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-eks/module/b84e1a30-d946-4325-96d8-f457dd1817f8/lesson/e5ba24e8-6d4d-46d7-b1c9-a2388e9f13e4)**
>
> Watch video content
