# Introduction to Our Real Life Application - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Chaos-Engineering/Introduction-to-Real-life-Application/Introduction-to-Our-Real-Life-Application)

---

## Table of Contents

- Introduction to Our Real Life Application
  - 1. Pet Adoption Web Microservice
  - 2. Pet Search API Microservice
  - 3. Pet Payment API Microservice
  - Links and References
  - Watch Video

---

## Content

Chaos Engineering

Introduction to Real life Application

# Introduction to Our Real Life Application

In this hands-on lab, you will deploy a microservices-based pet adoption website on AWS and run Fault Injection Simulator (FIS) experiments. The application showcases pets available for adoption, complete with images, pricing, and details, and leverages AWS services for high availability, scalability, and resilience.

> [!important]
> **Note**
>
> This tutorial uses real AWS resources and may incur charges. Clean up your environment after completion to avoid unexpected costs.

The complete source code for each microservice is available on GitHub. This lab is adapted from the AWS Workshop Studio and provides step-by-step instructions to replicate the environment in your AWS account.

The pet adoption system follows microservices principles and is composed of three core services. Each service uses multiple AWS components to ensure redundancy, scalability, and secure data handling.

| Microservice     | Compute                         | High Availability   | Auto Scaling           | Core Services                                     |
| ---------------- | ------------------------------- | ------------------- | ---------------------- | ------------------------------------------------- |
| Pet Adoption Web | Amazon EKS (2 EC2 worker nodes) | Multi-AZ EC2 spread | EC2 Auto Scaling Group | Application Load Balancer (ALB)                   |
| Pet Search API   | Amazon ECS (2 EC2 instances)    | Multi-AZ EC2 spread | EC2 Auto Scaling Group | ALB, DynamoDB (metadata), Amazon S3 (images)      |
| Pet Payment API  | AWS Fargate (2 tasks)           | ALB balanced tasks  | Fargate Auto Scaling   | API Gateway, AWS Lambda, Amazon Aurora PostgreSQL |

## 1\. Pet Adoption Web Microservice

- **Compute**: Runs on an Amazon EKS cluster backed by two EC2 worker nodes.
- **High Availability**: EC2 instances are distributed across two separate Availability Zones.
- **Traffic Distribution**: Incoming web traffic is routed through an Application Load Balancer (ALB).
- **Scalability**: The EC2 nodes are managed by an Auto Scaling group that scales out based on CPU and network utilization.

## 2\. Pet Search API Microservice

- **Compute**: Deployed in an Amazon ECS cluster on two EC2 instances.
- **High Availability**: Instances run across two Availability Zones for fault tolerance.
- **Traffic Distribution**: An ALB fronts the ECS service to balance search requests.
- **Scalability**: The ECS cluster uses an Auto Scaling group to adjust capacity dynamically.
- **Data Storage**:
  - **Amazon DynamoDB** stores pet metadata (name, price, availability).
  - **Amazon S3** hosts pet images, enabling efficient content delivery.

## 3\. Pet Payment API Microservice

- **Compute**: Leverages AWS Fargate to run two serverless containers.
- **High Availability**: Fargate tasks are spread across multiple Availability Zones and balanced by an ALB.
- **Scalability**: Task counts adjust automatically via AWS Application Auto Scaling.
- **API Integration**:
  1.  **Amazon API Gateway** receives payment requests.
  2.  **AWS Lambda** functions validate the request, fetch pet details from DynamoDB, and process images from S3.
- **Database**:
  - **Amazon Aurora PostgreSQL** handles transactional data with a Multi-AZ configuration (one writer, one reader) for automatic failover.

![The image is a diagram of a cloud architecture for a pet adoption application, showing components like a Virtual Private Cloud (VPC), availability zones, and various AWS services such as Lambda, S3, and databases. It illustrates the flow of data and services between users and the cloud infrastructure.](https://kodekloud.com/kk-media/image/upload/v1752871952/notes-assets/images/Chaos-Engineering-Introduction-to-Our-Real-Life-Application/cloud-architecture-pet-adoption-diagram.jpg)

As illustrated above, the architecture spans multiple Availability Zones, incorporates load balancers and auto-scaling groups, and is designed to maximize uptime and resilience.

## Links and References

- [AWS Workshop Studio](https://aws.amazon.com/training/engineering-workshops/)
- [Amazon EKS Documentation](https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html)
- [Amazon ECS Documentation](https://docs.aws.amazon.com/ecs/latest/developerguide/Welcome.html)
- [AWS Fargate Documentation](https://docs.aws.amazon.com/fargate/latest/userguide/what-is-fargate.html)
- [AWS FIS Documentation](https://docs.aws.amazon.com/fis/latest/userguide/what-is-fis.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/chaos-engineering/module/a6b84b48-a401-48a4-8278-0be5a8bb0d38/lesson/395d7778-393c-4af9-8555-36a325877e8a)**
>
> Watch video content
