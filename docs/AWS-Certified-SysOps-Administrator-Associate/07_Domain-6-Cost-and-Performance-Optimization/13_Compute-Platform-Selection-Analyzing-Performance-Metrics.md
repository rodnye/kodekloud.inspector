# Compute Platform Selection Analyzing Performance Metrics - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-6-Cost-and-Performance-Optimization/Compute-Platform-Selection-Analyzing-Performance-Metrics)

---

## Table of Contents

- Compute Platform Selection Analyzing Performance Metrics
  - Overview of Compute Platforms
  - Key Considerations for Platform Selection
  - CPU Utilization
  - Latency and Throughput
  - Memory Utilization
  - Revisiting Latency
  - Network I/O and Disk I/O
  - Summary and Recommendations
  - Watch Video

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 6 Cost and Performance Optimization

# Compute Platform Selection Analyzing Performance Metrics

Welcome to this comprehensive guide on selecting the right compute platform based on performance metrics. In this article, we evaluate four primary AWS compute platforms—EC2 virtual machines, ECS container orchestration, EKS (Kubernetes-based orchestration), and Lambda (serverless)—and offer insights to help you choose the best option for your application's needs.

## Overview of Compute Platforms

Choosing the right compute platform depends on your workload and desired performance characteristics. Below is a brief overview of each:

- **EC2 (Virtual Machines):** Provides high control, robust performance, and is ideal for enterprise-grade applications.
- **ECS (Container Orchestration):** Optimized for containerized applications; supports deployment via EC2 launch types or the serverless Fargate option.
- **EKS (Kubernetes-based Orchestration):** Designed for Kubernetes users; available with both EC2 and Fargate launch options.
- **Lambda (Serverless):** Delivers a completely serverless experience. This option may require re-architecting your application and comes with specific resource limitations.

## Key Considerations for Platform Selection

When selecting your compute platform, keep the following factors in mind:

- **Architecture Requirements:**  
  Lambda is tailored for serverless architectures and may need substantial application redesign, while EC2 supports traditional VM-based deployments.
- **Container Orchestration:**  
  Use ECS for container orchestration if you prefer not to manage Kubernetes. If you already rely on Kubernetes, then EKS might be the better choice.
- **Launch Types:**  
  Both ECS and EKS offer Fargate (serverless) and EC2 launch types. Although Fargate provides serverless advantages, it has certain resource constraints compared to a direct EC2 deployment (e.g., CPU and memory flexibility).

## CPU Utilization

CPU performance is crucial when evaluating compute platforms. For CPU-intensive workloads, EC2 (or ECS/EKS with EC2 launch types) offer greater flexibility due to the underlying robust infrastructure.

> [!important]
> **Note**
>
> When monitoring CPU metrics, consider factors like CPU credit balance, disk operations, and network throughput—metrics that are more detailed in EC2-based deployments.

![The image displays a grid of ten icons, each representing different system metrics such as CPU utilization, disk operations, and network activity. Each icon is labeled with a specific metric name and number.](https://kodekloud.com/kk-media/image/upload/v1752860946/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Compute-Platform-Selection-Analyzing-Performance-Metrics/system-metrics-icons-grid.jpg)

## Latency and Throughput

Latency—the time taken between a request and its response—is critical in performance evaluation:

- **EC2:** Offers low latency with rapid response times, especially in high-end instances with substantial processing power and memory.
- **Lambda:** May experience higher latency due to cold starts and provisioning delays, making it less suitable for low-latency, high-performance applications.
- **Fargate:** Generally provides faster responses than Lambda; however, its performance may depend on the configured resource limits.

![The image illustrates CPU utilization using a sports car analogy, highlighting that it's great for speed but not ideal for daily commutes or small tasks.](https://kodekloud.com/kk-media/image/upload/v1752860947/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Compute-Platform-Selection-Analyzing-Performance-Metrics/cpu-utilization-sports-car-analogy.jpg)

## Memory Utilization

Memory capacity is comparable to cargo space in a vehicle. Your application's memory demands will influence your platform choice:

- **High Memory Workloads:**  
  For requirements exceeding 10 GB of memory, EC2-based deployments are preferable since Lambda and Fargate are typically capped at 10 GB.
- **Moderate or Low Memory Workloads:**  
  Applications with memory needs within the 10 GB limit can effectively use Lambda or Fargate on ECS/EKS.

![The image illustrates memory utilization using a metaphor of cargo space, showing a small car overloaded with boxes and a larger truck with adequate space for boxes. It highlights the concept of high memory utilization with a focus on heavy loads versus groceries.](https://kodekloud.com/kk-media/image/upload/v1752860948/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Compute-Platform-Selection-Analyzing-Performance-Metrics/memory-utilization-cargo-space-diagram.jpg)

![The image illustrates memory utilization for an application, showing different memory modules and a comparison of memory usage levels, with a note on the need for larger memory or optimized code.](https://kodekloud.com/kk-media/image/upload/v1752860949/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Compute-Platform-Selection-Analyzing-Performance-Metrics/memory-utilization-application-comparison.jpg)

## Revisiting Latency

Latency remains a pivotal consideration:

- **Lambda:**  
  May introduce delay due to necessary pre-provisioning and efforts to keep instances warm.
- **EC2 and Fargate:**  
  Pre-allocated capacities in EC2 (and to some extent in Fargate) generally result in lower latency.

![The image compares a fast car representing low latency and a slow truck representing high latency, illustrating the concept of latency in terms of speed.](https://kodekloud.com/kk-media/image/upload/v1752860951/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Compute-Platform-Selection-Analyzing-Performance-Metrics/latency-comparison-fast-car-slow-truck.jpg)

![The image illustrates the concept of latency, showing the time between a request and its completion, with icons for AWS Lambda and Amazon EC2.](https://kodekloud.com/kk-media/image/upload/v1752860952/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Compute-Platform-Selection-Analyzing-Performance-Metrics/latency-aws-lambda-ec2-illustration.jpg)

## Network I/O and Disk I/O

Applications with high network or disk I/O requirements may favor specific platforms:

- **Network I/O:**  
  Although all platforms offer reliable network performance, EC2-based instances (including EKS/ECS on EC2) are typically superior for sustained, high-throughput scenarios.
- **Disk I/O:**  
  EC2 delivers fast, local NVMe storage and offers EBS volumes with provisioned IOPS for high-performance disk operations. While Lambda can integrate with EFS, its 15-minute execution cap makes EC2 a more dependable choice for prolonged, heavy disk I/O needs.

![The image is an infographic about disk I/O, showing options for heavy and less frequent disk usage, including Amazon EC2 and standard SSDs. It includes icons for read and write operations.](https://kodekloud.com/kk-media/image/upload/v1752860953/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Compute-Platform-Selection-Analyzing-Performance-Metrics/disk-io-infographic-ec2-ssds.jpg)

![The image is a diagram comparing Amazon EC2 and AWS Lambda with Amazon EFS, highlighting "More Value" for EC2 and a 15-minute duration for Lambda with EFS.](https://kodekloud.com/kk-media/image/upload/v1752860954/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Compute-Platform-Selection-Analyzing-Performance-Metrics/ec2-vs-lambda-efs-comparison.jpg)

## Summary and Recommendations

To summarize, consider the following guidelines when selecting your compute platform:

- **For High Resource Demands (CPU, Memory, Network, Disk I/O):**
  - Prioritize EC2, or use ECS/EKS with the EC2 launch type to leverage dedicated hardware capabilities.

- **For Lower or Sporadic Workloads:**
  - Lambda or Fargate on ECS/EKS can be a cost-effective solution if your application's demands are modest (e.g., under 10 GB of memory) or intermittent.

These insights are crucial for architects designing scalable cloud solutions and for professionals preparing for AWS certification exams.

![The image is a summary table comparing metrics across different AWS compute platforms (EC2, Lambda, ECS, EKS) in terms of CPU utilization, memory utilization, latency, network I/O, and disk I/O.](https://kodekloud.com/kk-media/image/upload/v1752860956/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Compute-Platform-Selection-Analyzing-Performance-Metrics/aws-compute-platforms-metrics-summary.jpg)

Thank you for reading this guide. Leverage these performance metrics to make an informed decision on the compute platform that best aligns with your application's requirements.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/c363221d-1b2d-4c1c-876a-cb6108f473e3/lesson/6c888f28-aeff-439b-a152-08ec95af6843)**
>
> Watch video content
