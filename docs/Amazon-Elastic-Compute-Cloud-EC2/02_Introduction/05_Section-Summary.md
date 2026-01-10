# Section Summary - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Amazon-Elastic-Compute-Cloud-EC2/Introduction/Section-Summary)

---

## Table of Contents

- Section Summary
  - Lesson Summary
  - What Is Amazon EC2?
  - Key EC2 Features
  - Core Networking Concepts
  - Further Reading
  - Watch Video
    - 1. Instance Families
    - 2. Pricing Models
    - 3. Scalability & Reliability
    - 4. High Availability
    - 5. Flexible Configurations
    - 6. AWS Service Integrations
    - AWS Account
    - AWS Region & Availability Zones
    - Amazon VPC
    - Subnets
    - Internet Gateway
    - NAT Gateway
    - Route Table
    - Security Group

---

## Content

Amazon Elastic Compute Cloud (EC2)

Introduction

# Section Summary

## Lesson Summary

In this lesson, we explored Amazon Elastic Compute Cloud (EC2), AWS’s core IaaS offering for provisioning and managing virtual servers in the cloud. You learned key EC2 features, pricing models, scalability options, and the fundamental networking components that make up an AWS deployment.

---

## What Is Amazon EC2?

Amazon EC2 (Elastic Compute Cloud) is a web service launched by AWS in 2006 that lets you rent virtual machines—called _instances_—to run applications without investing in physical hardware or managing your own data center infrastructure. EC2 instances can be resized, scaled, and configured to meet workloads ranging from development environments to high-performance computing.

---

## Key EC2 Features

### 1\. Instance Families

Choose from multiple instance families optimized for different workloads:

| Instance Family       | Use Case                                      |
| --------------------- | --------------------------------------------- |
| General-purpose       | Balanced CPU, memory, and networking          |
| Compute-optimized     | High-performance processors for compute-heavy |
| Memory-optimized      | Large in-memory databases and caches          |
| Storage-optimized     | High, local I/O performance                   |
| Accelerated computing | GPU, FPGA, and machine learning workloads     |

> [!important]
> **Note**
>
> Selecting the right instance family ensures optimal performance and cost efficiency for your application.

### 2\. Pricing Models

| Pricing Model      | Description                                                    |
| ------------------ | -------------------------------------------------------------- |
| On-Demand          | Pay per second with no upfront commitment                      |
| Reserved Instances | Commit to 1–3 years for significant discounts                  |
| Spot Instances     | Bid on spare capacity for up to 90% off—and risk interruptions |
| Savings Plans      | Flexible pricing model across compute usage                    |

### 3\. Scalability & Reliability

- **On-demand scaling**: Launch or terminate instances programmatically.
- **Auto Scaling**: Automatically adjust capacity based on policies and health checks.
- **Elastic Load Balancing (ELB)**: Distribute incoming traffic across multiple instances for fault tolerance.

### 4\. High Availability

- Spread instances across multiple **Availability Zones (AZs)** within a Region.
- Built-in redundancy and rapid failover.

### 5\. Flexible Configurations

- Choose from dozens of operating systems (Linux, Windows) and preconfigured AMIs.
- Customize CPU, memory, storage (EBS or instance store), and networking (ENI, IP).

### 6\. AWS Service Integrations

EC2 seamlessly integrates with AWS services, including Amazon S3, AWS Lambda, Amazon RDS, AWS Identity and Access Management (IAM), and Amazon CloudWatch, enabling robust, scalable architectures.

---

## Core Networking Concepts

### AWS Account

Your root container for AWS resources, billing, and identity controls.

### AWS Region & Availability Zones

- **Region**: A geographical area (e.g., us-east-1) with multiple isolated data centers.
- **Availability Zone (AZ)**: An individual data center with its own power and networking setup.

### Amazon VPC

A Virtual Private Cloud where you define your own IP address range, subnets, route tables, and gateways.

### Subnets

- **Public Subnet**: Instances have direct internet access via an Internet Gateway.
- **Private Subnet**: Instances cannot be reached from the internet without a NAT Gateway or proxy.

### Internet Gateway

Attaches to your VPC to enable outbound and inbound internet traffic for public subnets.

### NAT Gateway

Provides outbound-only internet access for instances in private subnets, blocking inbound connections.

### Route Table

Determines how traffic flows within your VPC and to external networks (Internet Gateway, NAT Gateway, peering connections).

### Security Group

Stateful virtual firewall at the instance level that controls inbound and outbound traffic based on rules.

---

## Further Reading

- [AWS EC2 Documentation](https://docs.aws.amazon.com/ec2/index.html)
- [Amazon VPC User Guide](https://docs.aws.amazon.com/vpc/latest/userguide/)
- [Auto Scaling Groups](https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html)
- [Elastic Load Balancing](https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2/module/2f7acbdc-7cde-4d21-9c8d-e1095f159b48/lesson/922219c0-d558-467b-8052-3c955e0f6a30)**
>
> Watch video content
