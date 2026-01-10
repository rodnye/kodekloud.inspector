# Turning up Security on Compute Services Part 3 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Designing-for-Security/Turning-up-Security-on-Compute-Services-Part-3)

---

## Table of Contents

- Turning up Security on Compute Services Part 3
  - Designing for Security with Containers
  - Managing Secrets and Credential Security
  - ECS in Practice: Designing Scalable, Secure Architectures
  - Scaling Microservices with ECS Services
  - Migrating to ECS with Fargate
  - Monitoring ECS with CloudWatch
  - Final Thoughts on Security and Compute Services
  - Watch Video
    - Securing ECS Tasks

---

## Content

AWS Solutions Architect Associate Certification

Designing for Security

# Turning up Security on Compute Services Part 3

In this article, we explore AWS Lightsail and its relevance in cloud deployments. Although Lightsail is not covered in the AWS Solutions Architect Associate exam, it remains important to understand its use cases. Essentially, Lightsail is AWS’s entry-level offering for virtual private servers (VPS). For just a couple of dollars a month, you receive a single-processor instance with 2 GB of RAM—a solution ideal for hosting WordPress sites or small-scale applications, though it is not designed for enterprise-grade applications.

![The image shows a selection interface for Amazon Lightsail, allowing users to pick an instance image with options for platforms and blueprints, alongside a comparison between Amazon Lightsail and Amazon EC2.](https://kodekloud.com/kk-media/image/upload/v1752864078/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-3/amazon-lightsail-instance-selection-interface.jpg)

Remember that Lightsail consolidates several costs into one package and does not match the enterprise-level infrastructure provided by EC2. Therefore, if Lightsail is mentioned during your studies or in exam scenarios, keep in mind it is considered out of scope.

Consider this scenario: A startup evaluates Lightsail for deploying its web application due to its simplicity and affordability. However, because the application handles sensitive customer data, the startup must ensure robust security measures are in place.

![The image presents a scenario about a startup using AWS Lightsail for a web application, with a question on enhancing security, followed by four options related to firewall settings, snapshots, backups, and data encryption.](https://kodekloud.com/kk-media/image/upload/v1752864079/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-3/aws-lightsail-security-options-diagram.jpg)

The recommended security approach for Lightsail is to utilize automated backups and snapshots to protect data integrity. Relying solely on default firewall settings or storing unencrypted sensitive data is not advised.

> [!important]
> **Best Practice**
>
> Ensure that you enable automation and avoid embedding sensitive information directly on the instance.

---

## Designing for Security with Containers

This section focuses on container security using AWS Elastic Container Service (ECS) and Elastic Container Registry (ECR). ECS offers two deployment options: using EC2 launch types or the Fargate launch type. Fargate provides a serverless container experience by abstracting the management of the underlying infrastructure, enabling you to define tasks that launch containers effortlessly.

![The image is a diagram illustrating the architecture of AWS Elastic Container Service (ECS) within a Virtual Private Cloud (VPC), showing components like EC2 instances, AWS Fargate, and AWS ECR, along with user interaction through AWS CLI and Management Console.](https://kodekloud.com/kk-media/image/upload/v1752864081/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-3/aws-ecs-architecture-diagram-vpc.jpg)

ECS operates by defining tasks to launch containers according to your specifications. A load balancer typically routes traffic across multiple Availability Zones, and container images are securely pulled from a registry and deployed within your VPC.

### Securing ECS Tasks

Securing ECS tasks is similar to EC2 security but with container-specific nuances. Consider this scenario: A media streaming company deploys a video processing application on ECS. The application processes large video files and stores the outputs in an S3 bucket, scaling based on the processing queue length. Security is achieved by dynamically scaling the service and applying appropriate IAM roles to tasks to grant secure access to S3 resources.

![The image presents a scenario where a media streaming company is deploying a video processing application using Amazon ECS, with four approaches to achieve scalability and security. Each approach involves different methods of deployment and scaling, including manual task launching, fixed task counts, CloudWatch integration, and EC2 instances.](https://kodekloud.com/kk-media/image/upload/v1752864083/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-3/video-processing-application-ecs-scalability.jpg)

Deploying an ECS service that scales with the processing queue and assigning specific IAM roles to tasks is the most effective configuration. Manual task launching or fixed task counts do not provide the desired scalability and security automation.

ECS uses a container agent with a designated task execution role. This role ensures that tasks can securely access resources such as private container images from ECR, secrets from AWS Secrets Manager, or parameters stored in Systems Manager Parameter Store—without embedding credentials.

![The image is a diagram of the Amazon Elastic Container Service (ECS) architecture, showing the interaction between an ECS cluster, EC2 instance, ECS container agent, and external services like a private registry, secrets manager, and parameter store.](https://kodekloud.com/kk-media/image/upload/v1752864084/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-3/ecs-architecture-diagram.jpg)

> [!important]
> **Security Tip**
>
> Always ensure ECS tasks are assigned the proper IAM roles to prevent unauthorized access to critical resources.

---

## Managing Secrets and Credential Security

Imagine a FinTech company deploying a microservices application on ECS. To securely access other AWS services, ECS tasks should be assigned appropriate IAM roles instead of embedding AWS credentials in container images. This method, recommended by AWS, enhances security by eliminating the risk of exposing sensitive data.

---

## ECS in Practice: Designing Scalable, Secure Architectures

A detailed example from [ECSworkshop.com](https://ecsworkshop.com) illustrates an ECS architecture designed for multiple services. In this architecture, a load balancer directs traffic to front-end services that communicate securely via service meshes like App Mesh (with AWS Lattice on the horizon). This design guarantees encryption in transit and resilient infrastructure through load balancer scaling and automatic task replacement.

![The image is a diagram of an Amazon Elastic Container Service (ECS) architecture, showing private and public subnets with ECS services, EC2 instances, a load balancer, and AppMesh integration.](https://kodekloud.com/kk-media/image/upload/v1752864085/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-3/amazon-ecs-architecture-diagram.jpg)

Consider another scenario: A media streaming company integrates a load balancer with its ECS service to efficiently distribute incoming traffic. The optimal solution is to use an Application Load Balancer (ALB) configured with HTTPS listeners, ensuring encryption for communications between clients and ECS tasks.

![The image presents a scenario where a media streaming company is deploying a video processing application using Amazon ECS and needs to integrate a load balancer for security and traffic distribution. It lists four approaches to achieve these requirements, involving different types of load balancers and configurations.](https://kodekloud.com/kk-media/image/upload/v1752864087/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-3/media-streaming-ecs-load-balancer.jpg)

Deploying the ECS service with an ALB under HTTPS is the best practice for security, while alternatives like a network load balancer for SSL termination or relying solely on service discovery fall short of fully securing the traffic.

---

## Scaling Microservices with ECS Services

Consider a scenario where a FinTech startup deploys a microservices-based application using ECS. Each microservice (such as ordering, product management, or customer profiles) needs to scale independently based on demand, with automatic task replacement for failures. The best practice is to deploy each microservice as a separate ECS service with defined minimum and maximum task counts, leveraging CloudWatch metrics for autoscaling.

Using the ECS service abstraction, rather than deploying all microservices within a single ECS task or service, provides the necessary management functions for scaling and health monitoring.

![The image illustrates an architecture diagram for AWS Elastic Container Service, showing development and production accounts with VPCs, subnets, ECS clusters, and Fargate services, along with a CI/CD pipeline for code deployment and testing.](https://kodekloud.com/kk-media/image/upload/v1752864088/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-3/aws-ecs-architecture-diagram.jpg)

The diagram above depicts two ECS clusters—one for development and one for production—running on Fargate in public subnets across different Availability Zones. A CI/CD pipeline ensures that new code is both tested and deployed automatically, maintaining consistency between environments.

---

## Migrating to ECS with Fargate

For organizations seeking a serverless container experience without the burden of managing underlying infrastructure, ECS with Fargate is an excellent choice. Fargate abstracts the management of EC2 instances and provides a scalable, secure environment where AWS handles server provisioning, patching, and other maintenance tasks.

![The image presents a scenario where a media streaming company is migrating its application to AWS using ECS with Fargate, and it lists four statements to determine the benefits of this approach. The focus is on enabling application development without managing underlying infrastructure.](https://kodekloud.com/kk-media/image/upload/v1752864089/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-3/aws-ecs-fargate-migration-benefits.jpg)

The key advantages of using ECS with Fargate include running containers without the need for managing underlying EC2 instances and focusing solely on application development.

---

## Monitoring ECS with CloudWatch

A robust monitoring strategy is essential for any cloud deployment. For a FinTech company deploying microservices on ECS, AWS CloudWatch provides detailed metrics for tasks, services, and containers in real time. CloudWatch enables operations teams to set alarms, identify issues early, and visualize performance and system health—all without the need for manual agent installation on each container.

---

## Final Thoughts on Security and Compute Services

Securing compute services on AWS requires a comprehensive strategy that includes:

- Using Lightsail for basic VPS needs while understanding its limitations.
- Leveraging ECS for containerized applications with proper IAM roles to avoid embedding credentials.
- Deploying load balancers—preferably an Application Load Balancer with HTTPS—to secure traffic between clients and ECS tasks.
- Scaling microservices independently using ECS service autoscaling.
- Utilizing AWS Fargate for a serverless container experience that removes the complexity of managing EC2 instances.
- Employing AWS CloudWatch for continuous, real-time monitoring.

This approach ensures that your AWS deployments are secure, scalable, and efficient, ultimately strengthening your overall cloud architecture.

> [!important]
> **Key Takeaway**
>
> Implementing the above best practices will help maximize your security posture across AWS compute services while simplifying management and scaling challenges.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/fcdcac66-6274-4b2f-912a-d6e9de511e5a/lesson/617ddc84-e313-45e4-958c-07ea56c129f5)**
>
> Watch video content
