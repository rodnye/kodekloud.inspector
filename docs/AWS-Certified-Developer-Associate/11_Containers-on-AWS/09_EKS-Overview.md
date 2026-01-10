# EKS Overview - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Containers-on-AWS/EKS-Overview)

---

## Table of Contents

- EKS Overview
  - ECS vs. EKS
  - In Summary
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Containers on AWS

# EKS Overview

In this article, we provide an in-depth look at AWS Elastic Kubernetes Service (EKS), exploring Kubernetes fundamentals, its architecture, and how EKS streamlines the management of containerized applications.

Before diving into EKS, it is important to understand Kubernetes, an open-source container orchestrator. Much like [Amazon Elastic Container Service (AWS ECS)](https://learn.kodekloud.com/user/courses/amazon-elastic-container-service-aws-ecs), Kubernetes offers flexible, community-driven solutions for container orchestration. A Kubernetes cluster consists of several nodes grouped into two categories:

1.  **Control Plane Nodes** – These nodes function as the management layer or “brains” of the cluster. They continuously monitor cluster health, manage scaling, and enforce security.
2.  **Worker Nodes** – These nodes run the containerized workloads (applications) deployed by the user.

![The image is a diagram explaining Kubernetes, showing a control-plane node managing worker nodes, with text describing Kubernetes as an open-source container orchestrator.](https://kodekloud.com/kk-media/image/upload/v1752858575/notes-assets/images/AWS-Certified-Developer-Associate-EKS-Overview/kubernetes-control-plane-diagram.jpg)

> [!important]
> **Kubernetes Architecture**
>
> Managing both control plane and worker nodes in a Kubernetes cluster can be complex, as administrators must address scaling, security, backups, and high availability across multiple locations.

This complexity led to the development of AWS Elastic Kubernetes Service (EKS). With EKS, AWS manages the control plane, taking responsibility for its running, scaling, high availability, and security. In this setup, you only need to configure and manage the worker nodes.

![The image is an illustration explaining AWS Elastic Kubernetes Service (EKS), showing the division of responsibilities between users and EKS for managing control planes and worker nodes. It highlights that EKS manages the control plane while users manage the worker nodes.](https://kodekloud.com/kk-media/image/upload/v1752858576/notes-assets/images/AWS-Certified-Developer-Associate-EKS-Overview/aws-eks-control-plane-illustration.jpg)

For those who prefer not to manage worker nodes directly, AWS provides an alternative with Fargate. By using Fargate, AWS manages the underlying compute resources for your worker nodes, allowing you to focus solely on deploying your containers without worrying about infrastructure management.

One of the standout advantages of EKS is that the control plane nodes are run and scaled by Amazon across multiple Availability Zones. These nodes dynamically scale to handle load and integrate seamlessly with other AWS services such as AWS Identity and Access Management (IAM) for authentication and Elastic Load Balancing (ELB) for distributing incoming traffic. Integration with AWS Elastic Container Registry (ECR) also enables efficient management and retrieval of Docker images.

![The image outlines the benefits of Amazon EKS, highlighting its ability to run and scale control-plane instances across multiple availability zones, integrate with AWS services, and use IAM for authentication and Elastic Load Balancing.](https://kodekloud.com/kk-media/image/upload/v1752858577/notes-assets/images/AWS-Certified-Developer-Associate-EKS-Overview/amazon-eks-benefits-control-plane.jpg)

EKS supports two launch types, similar to ECS:

- **Fargate**: AWS takes care of the underlying compute resources, removing the need to provision or maintain worker nodes.
- **EC2**: You are responsible for configuring, provisioning, and maintaining the [Amazon Elastic Compute Cloud (EC2)](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2) instances that serve as worker nodes.

![The image illustrates an Amazon EKS launch type using EC2 instances, each running a pod.](https://kodekloud.com/kk-media/image/upload/v1752858579/notes-assets/images/AWS-Certified-Developer-Associate-EKS-Overview/amazon-eks-ec2-pods-launch.jpg)

Kubernetes comes with powerful networking capabilities through its Service model. When you create a Service, Kubernetes can automatically provision a load balancer using AWS Elastic Load Balancer (ELB). This load balancer efficiently directs incoming traffic to the appropriate pods, ensuring optimal performance for your application.

![The image illustrates an EKS (Elastic Kubernetes Service) load balancer setup, showing traffic flow from the internet through a load balancer to an EKS cluster with an EC2 instance running a pod.](https://kodekloud.com/kk-media/image/upload/v1752858580/notes-assets/images/AWS-Certified-Developer-Associate-EKS-Overview/eks-load-balancer-traffic-flow.jpg)

## ECS vs. EKS

When deciding between ECS and EKS, keep the following in mind:

- **ECS**:
  - Proprietary to AWS, which can complicate migrations to other cloud providers.
  - Offers a simpler architecture with a straightforward API, making it easier for new team members to adopt.

- **EKS**:
  - Leverages the open-source Kubernetes platform, providing access to a broad ecosystem of tools such as [Helm for Beginners](https://learn.kodekloud.com/user/courses/helm-for-beginners), [Kustomize](https://learn.kodekloud.com/user/courses/kustomize), and [GitOps with ArgoCD](https://learn.kodekloud.com/user/courses/gitops-with-argocd).
  - Involves a steeper learning curve and increased complexity due to the integration of various AWS services, potentially complicating future cloud migrations.

In terms of pricing:

- **ECS**: You only pay for the underlying compute resources (EC2 instances or Fargate), as managing the control plane is free.
- **EKS**: Charges apply for both the control plane and the worker nodes’ compute resources, resulting in a slightly higher cost.

![The image is a comparison between ECS and EKS, highlighting differences in architecture, complexity, learning curve, and pricing. ECS is described as simpler and proprietary to AWS, while EKS is open-source Kubernetes with more complexity and tooling options.](https://kodekloud.com/kk-media/image/upload/v1752858582/notes-assets/images/AWS-Certified-Developer-Associate-EKS-Overview/ecs-vs-eks-comparison.jpg)

## In Summary

AWS EKS is a managed Kubernetes service that offloads the complexities of control plane management to AWS, providing scalability, high availability, and seamless integration with other AWS services. Whether you choose EC2 or Fargate for your worker nodes, EKS offers flexibility tailored to your container orchestration needs.

> [!important]
> **Key Takeaways**
>
> - EKS manages the control plane, simplifying Kubernetes operations.
> - Fargate can be used to eliminate the burden of managing worker nodes.
> - Integration with AWS services enhances scalability and security.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/c28ddfac-bdff-4566-b056-f6c6391a0d11/lesson/58262287-5576-4336-8ccc-5259730e2af2)**
>
> Watch video content
