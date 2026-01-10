# EKS Explanation - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Chaos-Engineering/Chaos-Engineering-on-Kubernetes-EKS/EKS-Explanation)

---

## Table of Contents

- EKS Explanation
  - Architecture Overview
  - Experiment Design
  - Watch Video
    - Given
    - Hypothesis

---

## Content

Chaos Engineering

Chaos Engineering on Kubernetes EKS

# EKS Explanation

In this guide, we demonstrate how to use AWS Fault Injection Simulator (FIS) to simulate a high memory utilization scenario on an Amazon EKS cluster. You’ll learn how to design the experiment, inject a memory fault, and observe your system’s resilience under stress.

## Architecture Overview

![The image is a diagram illustrating a memory stress scenario on Amazon EKS, showing a Virtual Private Cloud (VPC) setup with various AWS services like Lambda, S3, and databases across two availability zones. It includes components for a pet adoption web application, search API, payment API, and database interactions.](https://kodekloud.com/kk-media/image/upload/v1752871897/notes-assets/images/Chaos-Engineering-EKS-Explanation/memory-stress-amazon-eks-diagram.jpg)

Our pet adoption application runs on Amazon EKS using a microservices architecture. Key resources involved:

| Resource           | Purpose                                      | Example Command                                                    |
| ------------------ | -------------------------------------------- | ------------------------------------------------------------------ |
| EKS Cluster        | Hosts and orchestrates Kubernetes workloads  | `eksctl create cluster --name pet-adopt-cluster`                   |
| VPC & Subnets      | Network isolation and multi-AZ deployment    | Custom VPC with public/private subnets                             |
| AWS FIS Experiment | Injects faults to test resilience            | `aws fis start-experiment --cli-input-json file://experiment.json` |
| CloudWatch Metrics | Monitors memory, CPU, and application health | Automatically integrated with EKS                                  |

## Experiment Design

To ensure a structured approach, we define the **Given** (current state) and the **Hypothesis** (expected outcome under failure conditions).

### Given

![The image illustrates a memory stress scenario on EKS, showing a diagram of a Pet Adoptions web app using microservices within a Virtual Private Cloud (VPC) on AWS. It highlights the deployment of a product details microservice across availability zones.](https://kodekloud.com/kk-media/image/upload/v1752871898/notes-assets/images/Chaos-Engineering-EKS-Explanation/memory-stress-eks-pet-adoptions-diagram.jpg)

The **product details** microservice is deployed across multiple Availability Zones to guarantee high availability and fault tolerance.

### Hypothesis

![The image illustrates a memory stress scenario on Amazon EKS, showing a Virtual Private Cloud (VPC) setup with multiple pods to ensure availability despite high memory utilization. It includes a hypothesis that high memory usage won't affect the app or customer experience.](https://kodekloud.com/kk-media/image/upload/v1752871900/notes-assets/images/Chaos-Engineering-EKS-Explanation/memory-stress-amazon-eks-vpc-pods.jpg)

Even if one pod in a single AZ experiences memory saturation, the remaining pods will handle the traffic without impacting the end-user experience.

> [!important]
> **Prerequisites**
>
> - An existing EKS cluster with worker nodes across at least two Availability Zones
> - IAM permissions for `eks:*`, `fis:*`, and CloudWatch metrics
> - AWS CLI configured for your target region

Next, we’ll create an AWS FIS experiment that injects a high-memory-hog workload into one pod. You can monitor the memory usage via CloudWatch dashboards and the Kubernetes Metrics API to validate the hypothesis.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/chaos-engineering/module/67947884-154a-43e4-a0cf-1137e1264eee/lesson/d70a20b7-92a7-40e4-9c9c-1e6e168a95ed)**
>
> Watch video content
