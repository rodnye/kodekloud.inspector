# Exam Tips - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Containers-on-AWS/Exam-Tips)

---

## Table of Contents

- Exam Tips
  - Container Basics
  - AWS ECS (Elastic Container Service)
  - AWS EKS (Elastic Kubernetes Service)
  - AWS ECR (Elastic Container Registry)
  - Summary
  - Watch Video
    - ECS Roles
    - Placement Strategies and Autoscaling

---

## Content

AWS Certified Developer - Associate

Containers on AWS

# Exam Tips

This guide covers essential strategies and best practices to help you succeed in the AWS Developer Associate exam. It begins with fundamental container concepts before exploring key AWS container services and their configurations.

## Container Basics

Containers bundle an application with its libraries, dependencies, and configuration files, ensuring that it runs consistently across various environments. Container orchestrators manage these containerized environments by:

- Deploying containers across servers
- Load balancing incoming requests
- Ensuring container-to-container connectivity
- Monitoring container health and performance
- Restarting containers when necessary

> [!important]
> **Note**
>
> Mastering container basics is crucial as it lays the groundwork for understanding how AWS container services operate.

## AWS ECS (Elastic Container Service)

AWS ECS is a fully managed container orchestration service designed to simplify the deployment and scaling of containerized applications. ECS supports two launch types:

1.  **EC2 Launch Type**: You manage EC2 instances and install the ECS agent to handle container tasks.
2.  **Fargate Launch Type**: AWS handles the compute infrastructure, and billing is based solely on compute usage.

Tasks in ECS are defined using a task definition, a configuration file that specifies container settings, launch parameters, and task behaviors.

![The image provides exam tips for Amazon ECS, highlighting it as a fully managed container orchestration service with two launch types: EC2 and Fargate. It notes that there is no extra fee for ECS, only charges for the underlying compute.](https://kodekloud.com/kk-media/image/upload/v1752858583/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/amazon-ecs-exam-tips.jpg)

### ECS Roles

ECS relies on two primary roles:

- **Container Instance Role**: Assigned to your EC2 instances (or the ECS agent on these instances), this role enables pulling images, launching containers, and transmitting logs and metrics.
- **ECS Task Role**: Applied to tasks that require access to other AWS services.

Additionally, integrating ECS with Elastic Load Balancers allows direct traffic routing to tasks.

![The image provides exam tips for ECS, highlighting two roles: Container Instance Role and ECS Task Role, and mentions that load balancers route traffic to tasks.](https://kodekloud.com/kk-media/image/upload/v1752858584/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/ecs-exam-tips-roles-load-balancers.jpg)

### Placement Strategies and Autoscaling

For the EC2 launch type, ECS placement strategies determine how tasks are assigned to container instances. The strategies include:

| Strategy    | Description                                                                                                   |
| ----------- | ------------------------------------------------------------------------------------------------------------- |
| **Binpack** | Places tasks on instances to minimize unused CPU and memory, thereby reducing the number of instances needed. |
| **Random**  | Distributes tasks randomly across available container instances.                                              |
| **Spread**  | Evenly distributes tasks across instances based on specified attributes.                                      |

![The image provides exam tips for ECS, detailing placement strategies for EC2 instances, including Binpack, Random, and Spread, and notes that these do not apply to Fargate.](https://kodekloud.com/kk-media/image/upload/v1752858585/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/ecs-exam-tips-placement-strategies.jpg)

ECS also supports autoscaling:

- Tasks can autoscale based on CloudWatch metrics.
- ECS instances can be scaled using Auto Scaling Groups and Capacity Providers.
- When deploying new versions, configure both the minimum healthy percent and the maximum healthy percent to maintain service continuity.

![The image provides exam tips for ECS, covering topics like autoscaling with CloudWatch metrics, ASGs, Capacity Providers, and configuration values for deploying new versions.](https://kodekloud.com/kk-media/image/upload/v1752858586/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/ecs-exam-tips-autoscaling-cloudwatch.jpg)

## AWS EKS (Elastic Kubernetes Service)

EKS is AWS’s managed Kubernetes service, providing an easy way to deploy and manage Kubernetes clusters on AWS. With EKS:

- AWS handles the Kubernetes control plane.
- You can choose between Fargate (where AWS manages compute infrastructure) or EC2 (where you manage your own instances) for worker nodes.

![The image provides exam tips for EKS, highlighting that Kubernetes is an open-source container orchestrator, EKS is a managed service, AWS manages the control plane, and users have options for worker nodes with Fargate and EC2.](https://kodekloud.com/kk-media/image/upload/v1752858587/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/eks-exam-tips-kubernetes-aws.jpg)

> [!important]
> **Quick Tip**
>
> Familiarize yourself with both Fargate and EC2 options in EKS to choose the best fit for your application workloads.

## AWS ECR (Elastic Container Registry)

AWS ECR is a fully managed container registry that supports both private and public repositories. It offers advanced features such as:

- Image scanning for security vulnerabilities
- Lifecycle policies for automating image cleanup

![The image provides exam tips for AWS ECR, highlighting it as a fully-managed Docker container registry service that supports private and public repositories, as well as image scanning and lifecycle policies.](https://kodekloud.com/kk-media/image/upload/v1752858588/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/aws-ecr-exam-tips-docker-registry.jpg)

## Summary

This article provides a foundational overview of core container concepts and the AWS container services essential for the AWS Developer Associate exam. Understanding how ECS, EKS, and ECR work, along with their configurations, roles, and scaling options, is key to building robust, scalable, and efficient containerized applications on AWS.

For further reading and detailed guides, check out:

- [AWS Documentation](https://aws.amazon.com/documentation/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)

Good luck with your exam preparation!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/c28ddfac-bdff-4566-b056-f6c6391a0d11/lesson/18ebbd57-b837-4b01-a32f-990402eb5cc3)**
>
> Watch video content
