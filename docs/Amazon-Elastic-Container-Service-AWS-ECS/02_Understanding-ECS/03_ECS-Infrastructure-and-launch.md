# ECS Infrastructure and launch - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Amazon-Elastic-Container-Service-AWS-ECS/Understanding-ECS/ECS-Infrastructure-and-launch)

---

## Table of Contents

- ECS Infrastructure and launch
  - Understanding ECS Clusters
  - EC2 Launch Type
  - Watch Video

---

## Content

Amazon Elastic Container Service (AWS ECS)

Understanding ECS

# ECS Infrastructure and launch

[Amazon Elastic Container Service (AWS ECS)](https://learn.kodekloud.com/user/courses/amazon-elastic-container-service-aws-ecs) offers two primary launch types for containerized applications: the EC2 launch type and the Fargate launch type. In this article, we delve into both options and explain the underlying infrastructure concepts that power them.

## Understanding ECS Clusters

Before exploring the specifics of each launch type, it is essential to understand what an ECS cluster is. An ECS cluster serves as the backbone for container deployment—it orchestrates container operations without providing compute capacity directly.

ECS is designed exclusively for container management and does not include built-in server or compute functionality. When a container is deployed, it must run on a physical or virtual machine. Typically, ECS uses a pool of EC2 instances or similar infrastructure to host these containers. In essence, an ECS cluster is a grouping of compute resources (such as virtual machines on EC2) where your containerized applications run.

> [!important]
> **Key Point**
>
> ECS manages the container lifecycle, while actual compute operations rely on the underlying infrastructure you set up.

## EC2 Launch Type

The EC2 launch type gives you full control over your compute infrastructure. With this configuration, you manage the EC2 instances in your cluster, while ECS handles the orchestration of container operations. Consider the following key points when using the EC2 launch type:

- The ECS control plane orchestrates container operations but does not manage compute resources.
- You are responsible for provisioning and managing the EC2 instances that form your cluster.
- Every EC2 instance must have Docker installed to run containers and must run the ECS agent, which enables communication with the ECS control plane.
- Routine tasks such as configuring firewalls, applying security patches, and performing upgrades are handled by you.

> [!important]
> **Summary**
>
> When using the EC2 launch type, ECS simplifies container lifecycle management while you maintain full control over the infrastructure, allowing customized configuration and security management.

![The image is a diagram explaining the management of EC2 instances within an ECS cluster, highlighting the need to manage infrastructure while ECS handles containers. It emphasizes full control over the infrastructure.](https://kodekloud.com/kk-media/image/upload/v1752869152/notes-assets/images/Amazon-Elastic-Container-Service-AWS-ECS-ECS-Infrastructure-and-launch/ec2-instances-ecs-cluster-diagram.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/amazon-elastic-container-service-aws-ecs/module/cec2a3ca-2cb6-4e9c-a1f2-693b3303765d/lesson/6ee158fd-eb66-4b8e-80d5-848df6bc9c09)**
>
> Watch video content
