# Multi AZ Architectures for Various AWS Services Overview - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-2-Reliability-and-BCP/Multi-AZ-Architectures-for-Various-AWS-Services-Overview)

---

## Table of Contents

- Multi AZ Architectures for Various AWS Services Overview
  - Understanding Managed AWS Service Redundancy
  - Single-AZ vs. Multi-AZ Architectures
  - Amazon RDS: A Practical Multi-AZ Example
  - Application Load Balancers and Auto Scaling
  - Inherently Redundant AWS Services
  - Elastic File System (EFS) in a Multi-AZ Configuration
  - Key Takeaways
  - Conclusion
  - Watch Video

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 2 Reliability and BCP

# Multi AZ Architectures for Various AWS Services Overview

Welcome to this lesson on multi-AZ architectures in AWS. In this article, we explore the evolution from single-AZ setups to multi-AZ architectures and discuss the built-in redundancy provided by many AWS services.

## Understanding Managed AWS Service Redundancy

AWS managed services are generally configured to ensure high availability within a region. While this redundancy isn’t full disaster recovery, it offers a robust framework to keep your applications running even if a single component fails.

## Single-AZ vs. Multi-AZ Architectures

The diagram below compares single-AZ and multi-AZ configurations. It details how components such as subnets, databases, auto scaling groups, Elastic Load Balancers, and security groups work together to enhance reliability and security.

![The image illustrates a Multi-AZ Architecture on AWS, showing a Virtual Private Cloud (VPC) with multiple availability zones, public and private subnets, auto-scaling groups, and Amazon RDS instances.](https://kodekloud.com/kk-media/image/upload/v1752860152/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Multi-AZ-Architectures-for-Various-AWS-Services-Overview/multi-az-architecture-aws-vpc.jpg)

This basic multi-AZ architecture facilitates data redundancy, automatic failover, and elevated availability. When combined with a global load balancer, it can also support disaster recovery by replicating the setup across multiple regions.

## Amazon RDS: A Practical Multi-AZ Example

Amazon RDS is a prime example of multi-AZ deployment. By simply enabling the Multi-AZ option in the configuration, RDS creates a primary-secondary (active-passive) environment. In this setup, synchronous replication ensures that a write operation on the primary is simultaneously applied to the standby replica before confirmation is returned to the client.

![The image illustrates an Amazon RDS Multi-AZ Deployment, showing a master and standby replica setup with synchronous replication across two availability zones.](https://kodekloud.com/kk-media/image/upload/v1752860153/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Multi-AZ-Architectures-for-Various-AWS-Services-Overview/amazon-rds-multi-az-deployment.jpg)

> [!important]
> **Note**
>
> For scenarios where minimal replication lag is acceptable, asynchronous replication using read replicas is an alternative. This option is also available for other services like ElastiCache.

## Application Load Balancers and Auto Scaling

Configuring an application load balancer to distribute traffic across three subnets attached to an auto scaling group enhances both high availability and scalability. This architecture efficiently manages varying loads—from a single instance to hundreds—depending on business requirements.

## Inherently Redundant AWS Services

Services such as Amazon S3, DynamoDB, and Lambda are designed for high availability by operating across multiple data centers within a region.

![The image shows icons for Amazon S3, Amazon DynamoDB, and AWS Lambda, with their respective names and logos.](https://kodekloud.com/kk-media/image/upload/v1752860154/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Multi-AZ-Architectures-for-Various-AWS-Services-Overview/amazon-s3-dynamodb-lambda-icons.jpg)

> [!important]
> **Note**
>
> These services typically require no extra configuration for intra-region redundancy. However, if you need enhanced disaster recovery (DR), consider options like DynamoDB Global Tables, S3 cross-region replication, or replicating Lambda code and configuration to another region.

## Elastic File System (EFS) in a Multi-AZ Configuration

Elastic File System (EFS) leverages the NFS protocol and, when paired with a load-balanced application, provides shared file storage that is automatically redundant across the entire region.

![The image is a diagram illustrating the architecture of an Elastic File System (EFS) within a Virtual Private Cloud (VPC), showing traffic flow through Elastic Load Balancing to Amazon EC2 instances across three availability zones, with file access to EFS.](https://kodekloud.com/kk-media/image/upload/v1752860156/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Multi-AZ-Architectures-for-Various-AWS-Services-Overview/efs-architecture-vpc-diagram.jpg)

## Key Takeaways

| Service/Configuration                       | Benefit                                        | Recommendation                                                      |
| ------------------------------------------- | ---------------------------------------------- | ------------------------------------------------------------------- |
| Amazon RDS                                  | High availability via synchronous replication  | Enable Multi-AZ to support automatic failover                       |
| Application Load Balancer with Auto Scaling | Dynamic scaling and multi-AZ high availability | Distribute traffic to ensure resilience                             |
| AWS Managed Services (S3, DynamoDB, Lambda) | Built-in regional redundancy                   | Consider additional DR configurations for cross-region requirements |
| Elastic File System (EFS)                   | Region-wide shared storage redundancy          | Use with load balancers for optimal file accessibility              |

> [!important]
> **Warning**
>
> Achieving true multi-region disaster recovery goes beyond simple Multi-AZ configurations. Ensure you implement additional measures like cross-region replication or global tables where necessary.

## Conclusion

Many AWS services provide built-in or easily configurable redundancy with just a few clicks. Amazon RDS exemplifies how a multi-AZ setup can offer seamless failover, while services such as S3, DynamoDB, and Lambda are inherently robust within a region. For comprehensive disaster recovery and true multi-region redundancy, additional configurations are required.

Understanding these concepts will enable you to design resilient, highly available systems tailored to your business needs.

We'll see you in the next lesson.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/1b592900-bdef-468a-9a2b-de667b7e9cae/lesson/2cd352fc-f270-4b6a-879b-13febc8c3c75)**
>
> Watch video content
