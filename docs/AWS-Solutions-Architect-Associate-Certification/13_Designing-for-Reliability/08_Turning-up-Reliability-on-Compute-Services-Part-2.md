# Turning up Reliability on Compute Services Part 2 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Designing-for-Reliability/Turning-up-Reliability-on-Compute-Services-Part-2)

---

## Table of Contents

- Turning up Reliability on Compute Services Part 2
  - Amazon Elastic Container Service (ECS)
  - Amazon Elastic Kubernetes Service (EKS)
  - Amazon Elastic Container Registry (ECR)
  - AWS App Runner
  - AWS Batch
  - Summary
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Designing for Reliability

# Turning up Reliability on Compute Services Part 2

In this article, we explore advanced strategies for designing reliable architectures using AWS container services. Our discussion covers Amazon Elastic Container Service (ECS), Amazon Elastic Kubernetes Service (EKS), Amazon Elastic Container Registry (ECR), AWS App Runner, and AWS Batch. We emphasize the importance of spreading compute instances across multiple Availability Zones (AZs) and leveraging auto scaling and health checks to maintain high availability.

---

## Amazon Elastic Container Service (ECS)

ECS is one of the pioneering container management services on AWS. When building a resilient ECS architecture, consider the following best practices:

- **Multi-AZ Deployment:**  
  For EC2-based clusters, deploy multiple EC2 instances across different AZs. For example, an auto scaling group might allocate one instance in a public subnet in AZ-1, another in AZ-2, and so on. Distributing tasks across these instances ensures high availability if an instance or AZ fails.

  ![The image is a diagram illustrating the architecture of AWS Elastic Container Service (ECS) within a Virtual Private Cloud (VPC), showing components like EC2 instances, AWS Fargate, and AWS ECR, along with user interaction through AWS CLI and Management Console.](https://kodekloud.com/kk-media/image/upload/v1752863663/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Compute-Services-Part-2/aws-ecs-architecture-diagram-vpc.jpg)

- **Task Definitions and Service Scaling:**  
  Multiple containers that run together are defined within a single ECS task definition. You can specify the number of task instances and distribute them across multiple AZs. This practice increases resiliency by ensuring that application components remain available even if some tasks fail.

  ![The image presents a question about deploying a containerized application to Amazon ECS, asking how containers are specified for coordination. It provides four options: ECS service configuration, ECS task definition, tagging containers in Docker, and ECR repository policy.](https://kodekloud.com/kk-media/image/upload/v1752863664/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Compute-Services-Part-2/amazon-ecs-container-deployment-question.jpg)

- **Container Scaling:**  
  For applications using the EC2 launch type, ensure that your task definitions run on multiple instances. Implement auto scaling policies (such as target tracking) to automatically restart unhealthy tasks.

  ![The image provides a question about automating ECS task scaling and lists four options: using EC2 Auto Scaling groups, configuring alarm-based autoscaling, enabling predictive scaling, and setting target tracking scaling policies.](https://kodekloud.com/kk-media/image/upload/v1752863665/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Compute-Services-Part-2/ecs-task-scaling-options-question.jpg)

- **Capacity Providers:**  
  Utilize ECS capacity providers to support various infrastructure types (e.g., Windows, Amazon Linux 2, or Graviton processors with Bottlerocket). Each capacity provider has built-in auto scaling capabilities to allocate the necessary EC2 capacity based on demand.

  ![The image is a diagram of an Amazon Elastic Container Service (ECS) setup within a Virtual Private Cloud (VPC), showing different ECS capacity providers and their associated services, linked to auto-scaling groups running on various EC2 instances.](https://kodekloud.com/kk-media/image/upload/v1752863666/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Compute-Services-Part-2/amazon-ecs-vpc-diagram-capacity-providers.jpg)

- **Extended Resiliency with VPC Lattice:**  
  Enhance service communication resiliency by integrating AWS VPC Lattice. This service network allows resilient communications between services in separate VPCs without the need for direct peering.

  ![The image is a diagram of an AWS Elastic Container Service architecture, showing various services like Order, Inventory, Delivery, and Payment within a VPC Lattice Service network. It includes components such as load balancers, ECS services, and a Lambda function.](https://kodekloud.com/kk-media/image/upload/v1752863667/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Compute-Services-Part-2/aws-ecs-architecture-diagram.jpg)

- **Fargate Option:**  
  When you choose Fargate, AWS manages the underlying EC2 instances for you. However, note that Fargate currently does not support GPU workloads. For GPU-intensive applications, use the EC2 launch type.

  ![The image presents a question about supporting GPU workloads on AWS Fargate, with four options provided. The correct answer highlighted is that GPU workloads are not supported on Fargate.](https://kodekloud.com/kk-media/image/upload/v1752863668/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Compute-Services-Part-2/gpu-workloads-aws-fargate-question.jpg)

- **CI/CD Integration:**  
  Integrate CI/CD pipelines to deploy Fargate services across multiple environments, such as development and production. Auto scaling across these environments maximizes task availability.

  ![The image is a diagram illustrating the architecture of an Elastic Container Service (ECS) setup, showing both development and production accounts with components like VPC, IAM roles, ECS clusters, and a CI/CD pipeline.](https://kodekloud.com/kk-media/image/upload/v1752863669/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Compute-Services-Part-2/ecs-architecture-diagram-development-production.jpg)

- **Health Checks and Task Auto Healing:**  
  Enable health checks and auto recovery mechanisms to ensure that failed tasks are automatically restarted. Group related tasks into ECS services to maintain dependency isolation and consistent scaling.

  ![The image provides strategies for maximizing ECS task availability, including enabling health checks, using ECS Anywhere, scheduling tasks across multiple zones, and leveraging AWS Auto Scaling.](https://kodekloud.com/kk-media/image/upload/v1752863670/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Compute-Services-Part-2/ecs-task-availability-strategies.jpg)

  ![The image presents a question about managing related tasks in an Amazon ECS cluster, with four options: ECS task placement strategies, ECS capacity providers, ECS target tracking scaling, and ECS services.](https://kodekloud.com/kk-media/image/upload/v1752863671/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Compute-Services-Part-2/ecs-task-management-options.jpg)

> [!important]
> **Advanced Task Placement Strategies**
>
> Advanced task placement strategies like random, spread, and binpack help determine how tasks are allocated across hosts. Although more relevant for the professional-level exam, understanding these strategies can further enhance resiliency.

---

## Amazon Elastic Kubernetes Service (EKS)

EKS leverages Kubernetes’ inherent resiliency features, yet additional strategies are essential for maximizing availability.

- **Multi-AZ and Node Distribution:**  
  Distribute your cluster nodes across at least three AZs for maximum resiliency. Whether using EC2 launch type or self-managed node groups, this multi-AZ strategy prevents single-point failures.

  ![The image presents a question about deploying an Amazon EKS cluster for maximum reliability, with four suggested strategies: enabling cluster autoscaling, deploying across multiple availability zones, launching spot instances for worker nodes, and using provisioned concurrency for workloads.](https://kodekloud.com/kk-media/image/upload/v1752863673/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Compute-Services-Part-2/eks-cluster-reliability-strategies.jpg)

- **EKS Cluster Architecture:**  
  Spread nodes across AZs and consider using an Application Load Balancer (ALB) for TLS over TCP. For even greater redundancy, AWS Global Accelerator can route traffic across multiple regions.

  ![The image is a diagram of an Elastic Kubernetes Service (EKS) architecture on AWS, showing components like VPCs, subnets, and various AWS services interacting within the system. It illustrates the flow of application traffic, internet-bound traffic, and internal API traffic.](https://kodekloud.com/kk-media/image/upload/v1752863674/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Compute-Services-Part-2/eks-architecture-aws-diagram.jpg)

  ![The image is a diagram illustrating the architecture of an Elastic Kubernetes Service (EKS) with multi-region traffic routing, featuring components like Route 53, Global Accelerator, Network Load Balancers, and Amazon EKS regions.](https://kodekloud.com/kk-media/image/upload/v1752863676/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Compute-Services-Part-2/eks-architecture-multi-region-diagram.jpg)

- **Persistent Storage:**  
  For stateful applications, use Kubernetes StatefulSets with Amazon EFS. Unlike EBS, which is limited to a single AZ, EFS provides shared storage across multiple AZs.

  ![The image presents a question about storage options for Amazon EKS pods, with four choices: Instance Store Volumes, Amazon S3, Amazon EBS Volumes, and Amazon EFS File System. The correct answer, Amazon EFS File System, is highlighted.](https://kodekloud.com/kk-media/image/upload/v1752863677/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Compute-Services-Part-2/amazon-eks-storage-options-question.jpg)

- **Scalability Benefits:**  
  Utilize pod autoscaling with the Horizontal Pod Autoscaler. Tools like Carpenter also aid in achieving both cluster-level and node-level scalability.

  ![The image is a diagram showing clients attaching to the EKS control plane. It illustrates multiple Amazon EC2 instances in different AZs along with a Fargate pool, emphasizing resiliency.](https://kodekloud.com/kk-media/image/upload/v1752863678/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Compute-Services-Part-2/eks-architecture-aws-diagram-2.jpg)

- **Management Considerations:**  
  Managed node groups in EKS automatically replace unhealthy nodes, whereas self-managed nodes require manual intervention or custom auto scaling groups.

  ![The image is a diagram comparing responsibilities in Elastic Kubernetes Service (EKS) between self-managed workers and managed node groups, highlighting customer and AWS responsibilities.](https://kodekloud.com/kk-media/image/upload/v1752863680/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Compute-Services-Part-2/eks-responsibilities-comparison-diagram.jpg)

- **Service Discovery and Logging:**  
  Kubernetes’ DNS-based service discovery enables loosely coupled microservices. Ensure that logging and monitoring (using CloudWatch Logs and optionally OpenSearch) are set up for enhanced operational visibility.
- **Shared Persistent Storage (Revisited):**  
  For applications requiring shared storage across AZs, Amazon EFS is the preferred solution over instance storage or EBS volumes.

---

## Amazon Elastic Container Registry (ECR)

ECR is a managed container image repository ideal for storing and managing Docker images. Although its configuration options for resiliency are limited, consider the following:

- **Cross-Region Redundancy:**  
  For businesses operating on a global scale, replicate ECR repositories across multiple regions using the new cross-region replication feature. This ensures image availability even during regional outages.
- **CI/CD Pipeline Integration:**  
  ECR integrates seamlessly with CI/CD pipelines—similar to Docker Hub or Quay. Images stored in ECR can be easily pulled into ECS or EKS clusters for deployment.

---

## AWS App Runner

AWS App Runner is designed for developers who want to run containerized web applications without managing the underlying servers.

- **Resiliency and Load Distribution:**  
  App Runner deploys container images across multiple AZs with built-in load balancing. Specify the desired number of application instances to meet your fault tolerance requirements.

  ![The image is a diagram illustrating the workflow of an App Runner, showing how a user creates a service that interacts with a code/image repository to deploy and monitor web applications.](https://kodekloud.com/kk-media/image/upload/v1752863680/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Compute-Services-Part-2/app-runner-workflow-diagram.jpg)

  ![The image is a diagram showing how App Runner fits into task statements, illustrating the flow from a user creating a service to deploying it via App Runner, with interactions involving a code/image repository. It also notes that App Runner shares features like logging and encryption with other container-based compute services.](https://kodekloud.com/kk-media/image/upload/v1752863682/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Compute-Services-Part-2/app-runner-task-flow-diagram.jpg)

- **Integration with Load Balancers:**  
  For additional redundancy, App Runner can be paired with a Network Load Balancer (NLB). This results in a robust, serverless deployment model for containerized web applications.
- **Comparison with Fargate:**  
  While AWS Fargate offers serverless computing within ECS and EKS, App Runner abstracts even more infrastructure complexity, making it an ideal choice for developers focused on code over configuration.

  ![The image presents a question about deploying containerized web applications without managing servers or clusters, with four AWS service options: AWS App Runner, AWS Fargate, Amazon ECS, and Amazon EKS.](https://kodekloud.com/kk-media/image/upload/v1752863683/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Compute-Services-Part-2/deploying-containerized-apps-aws-options.jpg)

---

## AWS Batch

AWS Batch is intended for running large-scale batch jobs on containerized workloads. It orchestrates compute environments (using EC2, ECS, EKS, or Fargate) to process data-intensive tasks in parallel.

- **Job Resiliency:**  
  Enhance resiliency by configuring your Batch jobs to automatically retry upon failure. Although AWS Batch distributes jobs across multiple compute instances, retry strategies are crucial to address transient issues.

  ![The image is a diagram illustrating the AWS Batch workflow, showing how a user submits a job container image to AWS Batch, which then orchestrates the compute environment within a VPC, utilizing EC2 Container Registry and S3 for storage.](https://kodekloud.com/kk-media/image/upload/v1752863684/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Compute-Services-Part-2/aws-batch-workflow-diagram.jpg)

  ![The image presents a question about AWS Batch reliability for batch workloads, with four options: retrying failed jobs automatically, running jobs on spot instances, enabling multi-AZ for job queues, and auto-scaling based on queue depth.](https://kodekloud.com/kk-media/image/upload/v1752863685/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Compute-Services-Part-2/aws-batch-reliability-options.jpg)

- **Integration Example:**  
  A typical AWS Batch workflow might involve an S3 file upload triggering a Lambda function, which in turn submits a Batch job (for example, on ECS Fargate). The job processes the data and writes the results to DynamoDB. Including retry strategies in your Batch job definitions further improves reliability.

  ![The image is a diagram illustrating AWS Batch application orchestration using AWS Fargate, showing the flow of data and interactions between various AWS services like S3, Lambda, and DynamoDB.](https://kodekloud.com/kk-media/image/upload/v1752863687/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Compute-Services-Part-2/aws-batch-fargate-orchestration-diagram.jpg)

  ![The image presents a question about how AWS Batch automates running batch jobs, with four options: automatically provisioning EC2 capacity, retrying failed jobs, scaling based on CloudWatch alarms, and enabling Multi-AZ for queues.](https://kodekloud.com/kk-media/image/upload/v1752863688/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Compute-Services-Part-2/aws-batch-automation-question.jpg)

> [!important]
> **Key Takeaway for AWS Batch**
>
> Beyond leveraging automatic retries, AWS Batch is engineered to self-manage capacity, scaling, and workload distribution. This minimizes manual configuration at the associate level.

---

## Summary

Across all AWS compute services—whether deploying containerized applications via ECS or EKS, running web apps with App Runner, or processing batch workloads with AWS Batch—the cornerstone of achieving reliability is to:

- Deploy multiple instances across diverse AZs.
- Enable auto scaling and health checks for automatic recovery.
- Use shared storage (e.g., Amazon EFS) for stateful workloads.
- Integrate comprehensive logging and monitoring for operational transparency.

By leveraging these resilient design strategies and the inherent features of each service, you can ensure high uptime and robust performance for your applications.

For more details on AWS services and best practices, visit the [AWS Documentation](https://aws.amazon.com/documentation/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/2a99d085-acf0-4910-924f-737bfc1652da/lesson/a30266b7-505b-4341-b175-13686e91c8fd)**
>
> Watch video content
