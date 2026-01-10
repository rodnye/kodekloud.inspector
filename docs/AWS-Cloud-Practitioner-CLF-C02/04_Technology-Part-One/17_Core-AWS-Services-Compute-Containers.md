# Core AWS Services Compute Containers - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Cloud-Practitioner-CLF-C02/Technology-Part-One/Core-AWS-Services-Compute-Containers)

---

## Table of Contents

- Core AWS Services Compute Containers
  - What Are Containers?
  - The Need for Container Orchestrators
  - AWS Elastic Container Service (ECS)
  - Introduction to Kubernetes and AWS Elastic Kubernetes Service (EKS)
  - Comparing ECS and EKS
  - Summary
  - Watch Video
    - Benefits of EKS

---

## Content

AWS Cloud Practitioner CLF-C02

Technology Part One

# Core AWS Services Compute Containers

In this lesson, we dive into container technology and explore the key AWS services for deploying and managing containerized applications: Elastic Container Service (ECS) and Elastic Kubernetes Service (EKS).

## What Are Containers?

Containers enable you to package an application along with all its necessary files, libraries, and dependencies into a single, self-contained unit. With containers, your application can run uniformly across different environments—functioning similarly to lightweight virtual machines.

![The image explains containers as tools for packaging applications with necessary files, deployable on machines, and likened to lightweight virtual machines.](https://kodekloud.com/kk-media/image/upload/v1752861877/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Compute-Containers/frame_60.jpg)

By bundling everything together, containers ensure that your application behaves consistently, regardless of the underlying infrastructure.

## The Need for Container Orchestrators

Deploying containerized applications across multiple hosts introduces several challenges:

- Deploying containers on several machines to ensure redundancy.
- Balancing incoming traffic across containers on different hosts.
- Enabling seamless communication between containers on separate machines.
- Automatically detecting failures and restarting or relocating containers.
- Dynamically scaling the number of containers in response to traffic changes.

Container orchestrators simplify these tasks by managing deployment, load balancing, inter-container communication, failure recovery, and auto-scaling for your containerized applications.

![The image explains container orchestrators like Kubernetes, Apache Mesos, and ECS, highlighting their responsibilities such as deploying containers, load-balancing, connectivity, restarting, and moving containers.](https://kodekloud.com/kk-media/image/upload/v1752861878/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Compute-Containers/frame_200.jpg)

## AWS Elastic Container Service (ECS)

AWS Elastic Container Service (ECS) is a fully managed container orchestration service designed to streamline the deployment and scaling of containerized applications. ECS acts as the brain behind your container environment by managing the configuration you provide and overseeing the lifecycle of your containers.

> [!important]
> **Note**
>
> Containers managed by ECS run on either EC2 instances or using the serverless Fargate option. However, ECS itself does not run containers directly—it manages container orchestration within the AWS ecosystem.

Although ECS offers simplicity and tight integration with AWS services, its proprietary nature may pose challenges when migrating to other cloud providers.

![The image explains AWS Elastic Container Service (ECS), highlighting its management, scalability, and proprietary nature, with containers running on EC2 instances or Fargate.](https://kodekloud.com/kk-media/image/upload/v1752861880/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Compute-Containers/frame_280.jpg)

## Introduction to Kubernetes and AWS Elastic Kubernetes Service (EKS)

Before exploring EKS, it’s essential to understand Kubernetes. Kubernetes is an open-source container orchestrator renowned for managing containerized workloads. A typical Kubernetes cluster is composed of two types of nodes:

- **Control Plane Nodes:** These nodes oversee the overall cluster state by managing tasks like scheduling, monitoring, and maintaining cluster health.
- **Worker Nodes:** These nodes run your containerized applications and perform the actual workload processing.

![The image explains Kubernetes, highlighting its open-source container orchestration, control-plane nodes for cluster management, and worker nodes for running containerized workloads.](https://kodekloud.com/kk-media/image/upload/v1752861881/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Compute-Containers/frame_310.jpg)

Managing the control plane can be complex, involving challenges in setup, scaling, and security. This is where AWS Elastic Kubernetes Service (EKS) comes into the picture.

EKS is a managed Kubernetes service that offloads the burden of running the control plane by handling scaling, high availability, and backups. While AWS manages the control plane, you are responsible for the worker nodes. With the Fargate integration in EKS, AWS can also handle worker node management for you.

![The image explains AWS Elastic Kubernetes Service (EKS), highlighting user responsibilities, control plane management, and EKS's role in managing the control plane.](https://kodekloud.com/kk-media/image/upload/v1752861882/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Compute-Containers/frame_360.jpg)

### Benefits of EKS

EKS offers several advantages, including:

- High availability through control plane management across multiple availability zones.
- Seamless integration with other AWS services like IAM for authentication, Elastic Load Balancing, and ECR for container image storage.
- Simplified Kubernetes operation, allowing you to focus on deploying and scaling your applications.

![The image outlines the benefits of AWS EKS, highlighting control-plane scaling across availability zones, integration with AWS services, IAM authentication, and elastic load balancing.](https://kodekloud.com/kk-media/image/upload/v1752861883/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Compute-Containers/frame_430.jpg)

## Comparing ECS and EKS

When choosing between ECS and EKS, consider the following factors:

- **Proprietary vs. Open Source:**  
  ECS is exclusively integrated with the AWS ecosystem, which might lead to limitations when migrating. On the other hand, EKS leverages Kubernetes—a robust, open-source platform offering greater flexibility, though migration can still be complex if deeply integrated with AWS-specific services.
- **Complexity:**  
  ECS features a simpler architecture and API, which may benefit teams needing a quick start. In contrast, Kubernetes (and by extension, EKS) has a steeper learning curve due to its extensive features and configuration options.
- **Community and Ecosystem:**  
  Kubernetes boasts a vibrant open-source community with significant support, a wide range of tooling (such as Helm, Kustomize, and Argo CD), and substantial resources for best practices and troubleshooting.
- **Cost Considerations:**  
  With ECS, you are charged solely for the infrastructure running your containers, with no additional fee for the control plane. In contrast, EKS incurs costs for both the managed control plane and worker nodes, which might lead to higher expenses.

## Summary

In this lesson, we covered the following key points:

- Containers bundle all necessary application components, ensuring consistent deployment across environments.
- Container orchestrators simplify the deployment, scaling, and management of containerized applications.
- AWS ECS offers a simple, proprietary solution ideal for seamless integration within the AWS ecosystem, running containers on EC2 instances or via Fargate.
- Kubernetes is a popular open-source orchestrator, and AWS EKS further simplifies its operation by managing the control plane.
- The choice between ECS and EKS depends on factors such as migration complexity, learning curve, ecosystem support, and cost.

![The image summarizes container concepts, highlighting packaging applications, container orchestrators, AWS ECS, and Kubernetes as an open-source orchestrator.](https://kodekloud.com/kk-media/image/upload/v1752861884/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Compute-Containers/frame_590.jpg)

EKS allows you to focus on your application workloads by automating control plane management, which is crucial for scaling and optimizing containerized environments.

For further reading and detailed guides, explore additional resources:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [AWS Container Services](https://aws.amazon.com/ecs/)
- [AWS EKS User Guide](https://docs.aws.amazon.com/eks/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-cloud-practitioner-clf-c02/module/dcba3ea8-580a-4aac-ad89-48969e6876ee/lesson/f280781e-c404-4a83-a6c2-715e50b3ebe2)**
>
> Watch video content
