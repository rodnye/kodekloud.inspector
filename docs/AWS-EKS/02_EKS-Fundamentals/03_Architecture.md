# Architecture - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-EKS/EKS-Fundamentals/Architecture)

---

## Table of Contents

- Architecture
  - Kubernetes Control Plane Components
  - Regional and Availability Zone Distribution
  - AWS-Specific Control Plane Integrations
  - EKS Data Plane Extensions
  - Watch Video

---

## Content

AWS EKS

EKS Fundamentals

# Architecture

In this lesson/article, we’ll delve into the Amazon EKS control plane and examine every component AWS provisions and manages when you launch an EKS cluster.

## Kubernetes Control Plane Components

When you create an Amazon EKS cluster, AWS automatically sets up the core Kubernetes control plane, ensuring high availability and fault tolerance:

| Component           | Role                                                                                                                                          |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| etcd                | Distributed key–value store. EKS runs a minimum of three etcd nodes (up to five for extra resilience) to maintain quorum and leader election. |
| API Servers         | Multiple instances handle all Kubernetes API requests (e.g., `kubectl` commands for pods, deployments, services).                             |
| Controller Managers | Execute control loops to reconcile the desired and current cluster state (for example, maintaining the right number of pod replicas).         |
| Schedulers          | Assign pods to nodes based on resource requirements, node labels, taints, and affinity rules.                                                 |

> [!important]
> **Note**
>
> Amazon EKS automatically manages patching, scaling, and failover for these control plane components so you can focus on deploying applications.

## Regional and Availability Zone Distribution

Amazon EKS is a regional service. Each cluster’s control plane is distributed across at least three Availability Zones (AZs) to guarantee high availability:

- **Automatic Failover**: If one AZ becomes unavailable, etcd maintains quorum (read-only until a new leader is elected), and API servers route traffic through healthy AZs.
- **Cross-AZ Replication**: AWS handles networking, latency optimization, and data replication between AZs without any additional configuration.

> [!important]
> **Warning**
>
> When deploying your own Kubernetes cluster, you’d need to configure multiple data centers, replicate etcd manually, and set up API servers, controllers, and schedulers across zones. EKS eliminates this operational overhead.

## AWS-Specific Control Plane Integrations

Beyond the standard Kubernetes control plane, EKS includes built-in AWS integrations to streamline authentication, logging, and access control:

| Integration            | Purpose                                                                            | Configuration                                  |
| ---------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------- |
| OIDC Endpoint          | Issues tokens for IAM-to-Kubernetes identity mapping                               | Enabled by default when you create the cluster |
| CloudWatch Logs        | Forwards API server, controller manager, and scheduler logs to Amazon CloudWatch   | Configure via the EKS console or AWS CLI       |
| EKS Authentication API | Defines which IAM principals can access your cluster (replaces aws-auth ConfigMap) | Managed through IAM roles and policies         |

For more details, see the [Amazon EKS User Guide](https://docs.aws.amazon.com/eks/latest/userguide/).

## EKS Data Plane Extensions

EKS extends the Kubernetes API with custom resources and services in your AWS account, handling your workloads and cluster add-ons:

| Extension   | Description                                                                                              |
| ----------- | -------------------------------------------------------------------------------------------------------- |
| Node Groups | Managed or self-managed EC2 instances (Linux/Windows) where your pods run. Supports Auto Scaling groups. |
| Add-ons     | Core cluster services (CoreDNS, kube-proxy, VPC CNI) deployed as pods. Managed via the EKS Add-on API.   |

These data plane components reside within your AWS account, giving you control over scaling, updates, and monitoring.

![The image is a diagram illustrating the components of an EKS (Elastic Kubernetes Service) control plane, including etcd nodes, controller managers, schedulers, API servers, and integrations with AWS CloudWatch and OIDC Endpoint. It also shows add-ons and node groups.](https://kodekloud.com/kk-media/image/upload/v1752862775/notes-assets/images/AWS-EKS-Architecture/eks-control-plane-components-diagram.jpg)

This diagram provides a holistic view of the Amazon EKS control plane services, AWS integrations, and data plane extensions that power a resilient Kubernetes cluster on AWS.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-eks/module/b84e1a30-d946-4325-96d8-f457dd1817f8/lesson/592fdf5f-3c1c-4664-a30e-a0f15ca62de4)**
>
> Watch video content
