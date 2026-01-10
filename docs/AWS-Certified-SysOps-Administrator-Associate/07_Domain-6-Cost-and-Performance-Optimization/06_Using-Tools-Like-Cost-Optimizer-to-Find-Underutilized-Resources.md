# Using Tools Like Cost Optimizer to Find Underutilized Resources - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-6-Cost-and-Performance-Optimization/Using-Tools-Like-Cost-Optimizer-to-Find-Underutilized-Resources)

---

## Table of Contents

- Using Tools Like Cost Optimizer to Find Underutilized Resources
  - Overview of Compute Optimizer
  - How Compute Optimizer Works
  - Detailed Analysis and Recommendations
  - Limitations and Focus Areas
  - Conclusion
  - Watch Video
    - EC2 Instance Recommendations
    - EBS, Fargate, and Lambda Optimization

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 6 Cost and Performance Optimization

# Using Tools Like Cost Optimizer to Find Underutilized Resources

Welcome to this guide on AWS cost management tools. In this lesson, we explore AWS Compute Optimizer and its role in identifying underutilized resources to maximize the efficiency and performance of your infrastructure. This article is part of the AWS SysOps Associate certification course and builds on previously covered cost management strategies.

## Overview of Compute Optimizer

AWS Compute Optimizer leverages machine learning to analyze your AWS environment continuously. It evaluates compute services, including Amazon EC2, AWS Fargate (for containerized applications in ECS/EKS), AWS Lambda, and associated Amazon EBS storage volumes. This analysis generates insightful recommendations that align your resource configurations with both performance and budget requirements.

![The image illustrates AWS Compute Optimizer, showing its integration with AWS resources like Amazon EC2, Amazon EBS, AWS Fargate, and AWS Lambda.](https://kodekloud.com/kk-media/image/upload/v1752861165/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Using-Tools-Like-Cost-Optimizer-to-Find-Underutilized-Resources/aws-compute-optimizer-integration.jpg)

## How Compute Optimizer Works

Compute Optimizer performs a detailed resource analysis and delivers actionable recommendations through a three-phase process:

1.  **Resource Analysis** – Evaluates historical and current performance data along with resource specifications.
2.  **Providing Recommendations** – Offers suggestions for optimal configurations to ensure efficiency.
3.  **Resource Reconfiguration** – Guides you on making adjustments manually or automatically.

![The image is a diagram titled "Compute Optimizer" with three sections: "Resource analysis," "Provide recommendations," and "Reconfigure resource," each represented by an icon.](https://kodekloud.com/kk-media/image/upload/v1752861166/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Using-Tools-Like-Cost-Optimizer-to-Find-Underutilized-Resources/compute-optimizer-diagram-icons.jpg)

## Detailed Analysis and Recommendations

Compute Optimizer examines key metrics such as CPU utilization, memory consumption, I/O throughput, and network bandwidth. By comparing current configurations against historical performance data, it ensures that your resources maintain an optimal balance between cost and performance. For example, the tool might suggest an instance type change if a resource is identified as either under-provisioned or over-provisioned.

![The image lists five features: performance risk analysis, cost-saving recommendations, EC2 instance type recommendations, EBS volume recommendations, and optimization for Fargate.](https://kodekloud.com/kk-media/image/upload/v1752861167/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Using-Tools-Like-Cost-Optimizer-to-Find-Underutilized-Resources/performance-risk-analysis-features.jpg)

### EC2 Instance Recommendations

For Amazon EC2, Compute Optimizer analyzes various parameters including local disk performance (with NVMe storage on certain instances) and attached EBS volumes. If, for instance, a T2 micro instance is deemed insufficient, the tool might recommend a switch to a T3 micro for improved performance and cost benefits.

![The image is a chart titled "EC2 Instance Recommendations," categorizing resources into "Under-Provisioned," "Over-Provisioned," and "Optimized" with a list of components like CPU, Memory, and Network Bandwidth.](https://kodekloud.com/kk-media/image/upload/v1752861168/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Using-Tools-Like-Cost-Optimizer-to-Find-Underutilized-Resources/ec2-instance-recommendations-chart.jpg)

![The image shows a table of EC2 instance recommendations, comparing current instance types and prices with recommended types and prices, along with the price differences.](https://kodekloud.com/kk-media/image/upload/v1752861169/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Using-Tools-Like-Cost-Optimizer-to-Find-Underutilized-Resources/ec2-instance-recommendations-table.jpg)

### EBS, Fargate, and Lambda Optimization

Compute Optimizer also evaluates other services:

- **Amazon EBS:** It reviews volume types and may advise switching to a more cost-efficient option that meets performance needs.
- **AWS Fargate:** The tool assesses container configurations to detect if resources are under-provisioned, over-provisioned, or optimally configured.
- **AWS Lambda:** It examines memory allocation, execution costs, and other parameters to ensure functions are tuned for efficiency while managing workloads effectively.

![The image shows a dashboard for "Lambda Function Recommendations," displaying options to filter and view recommendations for improving cost and performance of Lambda functions. It includes fields for account information, tag filters, and columns for memory and cost details.](https://kodekloud.com/kk-media/image/upload/v1752861170/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Using-Tools-Like-Cost-Optimizer-to-Find-Underutilized-Resources/lambda-function-recommendations-dashboard.jpg)

> [!important]
> **Note**
>
> AWS Compute Optimizer focuses exclusively on compute services and their associated EBS volumes. It does not extend recommendations to other storage solutions such as Amazon EFS, Lustre, FSx, or S3.

## Limitations and Focus Areas

It's important to note that Compute Optimizer is targeted specifically at compute services and attached EBS volumes. If you are managing other storage solutions, alternative tools or strategies might be necessary to optimize those resources.

## Conclusion

This article demonstrated how AWS Compute Optimizer helps in identifying underutilized resources across various services including EC2, Fargate, Lambda, and EBS volumes. By analyzing performance metrics and providing tailored recommendations, Compute Optimizer enables you to optimize your AWS environment for both cost and performance efficiency. Incorporating its recommendations into your infrastructure management practices can lead to significant improvements in resource utilization and overall cost savings.

Thank you for reading, and we hope this guide assists you in optimizing your AWS infrastructure effectively.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/c363221d-1b2d-4c1c-876a-cb6108f473e3/lesson/2cd68111-4c9f-4235-b2de-674ccee0034d)**
>
> Watch video content
