# Trusted Advisor Security Checks Overview - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-4-Security-and-Compliance/Trusted-Advisor-Security-Checks-Overview)

---

## Table of Contents

- Trusted Advisor Security Checks Overview
  - Watch Video

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 4 Security and Compliance

# Trusted Advisor Security Checks Overview

Welcome to this lesson on AWS Trusted Advisor—a robust service that provides real-time guidance on AWS best practices across key areas such as cost optimization, security, fault tolerance, performance, and service limits.

Trusted Advisor continuously reviews your AWS environment and issues actionable recommendations. For instance, it can alert you if your security groups are too permissive or if there are underutilized EC2 instances that could be optimized.

![The image is a diagram showing AWS Trusted Advisor's role in enhancing network security by implementing security group rules for Amazon EC2 within a Virtual Private Cloud (VPC).](https://kodekloud.com/kk-media/image/upload/v1752860627/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Trusted-Advisor-Security-Checks-Overview/aws-trusted-advisor-network-security-diagram.jpg)

In practice, if Trusted Advisor finds that your security group rules allow unrestricted internet access or include IP ranges outside your corporate network, it will notify you and recommend adjustments based on AWS best practices. It may also advise enabling lifecycle policies on S3 for data archiving and cost reduction or identifying underutilized EC2 instances to optimize resources.

![The image illustrates a process involving Amazon S3 and AWS Trusted Advisor, highlighting the use of lifecycle policies for data archiving and cost reduction.](https://kodekloud.com/kk-media/image/upload/v1752860628/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Trusted-Advisor-Security-Checks-Overview/amazon-s3-aws-trusted-advisor-lifecycle.jpg)

Beyond cost and performance insights, Trusted Advisor also monitors your AWS service quotas. For example, if you approach the maximum number of EC2 instances, it sends a timely warning, allowing you to take corrective action before limits are reached.

![The image lists five benefits: cost optimization, performance, security, fault tolerance, and service quotas, each with a brief description of how they are achieved.](https://kodekloud.com/kk-media/image/upload/v1752860630/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Trusted-Advisor-Security-Checks-Overview/benefits-cost-optimization-performance-security.jpg)

> [!important]
> **Note**
>
> Full access to Trusted Advisor is available only with specific AWS support plans. The Basic and Developer plans offer limited checks, primarily focused on security and service limits. In contrast, the Business, Enterprise On-Ramp, and Enterprise plans provide complete functionality—with the Business plan being the minimum requirement for full access.

Trusted Advisor presents its recommendations alongside detailed metadata such as severity levels, investigative insights, and potential monthly savings. Although it doesn’t fix issues automatically, it gives you actionable guidance similar to AWS Compute Optimizer.

![The image shows a dashboard for "Trusted Advisor Recommendations" with a summary of checks, including actions and investigations recommended, and potential monthly savings of $7,082.26. It categorizes issues into security, performance, fault tolerance, cost optimization, and service limits.](https://kodekloud.com/kk-media/image/upload/v1752860631/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Trusted-Advisor-Security-Checks-Overview/trusted-advisor-recommendations-dashboard.jpg)

Trusted Advisor's checks are organized into five core categories:

1.  **Cost Optimization:**  
    Trusted Advisor helps you identify opportunities for cost savings. It highlights areas such as:
    - Underutilized EC2 instances
    - Opportunities to use reserved instances
    - Idle load balancers
    - Excessive storage usage and redundant S3 buckets

    ![The image outlines four aspects of cost optimization in cloud services: Amazon EC2 Reserved Instances optimization, underutilized Amazon EC2 instances, idle load balancers, and Amazon RDS idle DB instances.](https://kodekloud.com/kk-media/image/upload/v1752860632/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Trusted-Advisor-Security-Checks-Overview/cost-optimization-cloud-services.jpg)

2.  **Performance:**  
    This category covers issues that may affect the responsiveness or efficiency of your applications. It inspects:
    - High resource utilization
    - Approaching service limits
    - Excessive database connection counts
    - CloudFront configuration needs
    - EBS throughput usage

    ![The image lists five performance-related topics: high utilization of Amazon EC2 instances, service limits, Amazon RDS DB instance connections, CloudFront content delivery optimization, and Amazon EBS throughput optimization.](https://kodekloud.com/kk-media/image/upload/v1752860633/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Trusted-Advisor-Security-Checks-Overview/performance-topics-amazon-ec2-rds-cloudfront-ebs.jpg)

3.  **Security:**  
    Trusted Advisor enhances your security posture by flagging potential vulnerabilities such as:
    - Absence of multi-factor authentication (MFA)
    - Outdated IAM access keys
    - Overly permissive security groups
    - Broad S3 bucket permissions
    - Lack of backups or publicly accessible snapshots

    ![The image is a flowchart related to security, listing five items: "MFA on Root Account," "IAM Access Key Rotation," "Security Groups-Unrestricted Ports," "S3 Bucket Permissions," and "RDS Public Snapshots."](https://kodekloud.com/kk-media/image/upload/v1752860635/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Trusted-Advisor-Security-Checks-Overview/security-flowchart-mfa-iam-s3-rds.jpg)

4.  **Fault Tolerance:**  
    Checks in this category ensure your environment is robust and can withstand failures. They may detect:
    - Imbalanced distribution of EC2 instances across availability zones
    - Lack of versioning on S3 buckets
    - Oversized load balancers
    - Insufficient database redundancy
    - Misconfigured auto-scaling groups

    ![The image illustrates fault tolerance strategies in cloud computing, highlighting aspects like auto scaling, EC2 availability, S3 bucket versioning, RDS deployment, and ELB optimization.](https://kodekloud.com/kk-media/image/upload/v1752860635/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Trusted-Advisor-Security-Checks-Overview/fault-tolerance-cloud-computing-strategies.jpg)

5.  **Service Limits:**  
    This straightforward category keeps you informed when you're nearing AWS resource limits, such as:
    - EC2 virtual machines
    - Load balancers
    - VPCs
    - Database instances

In summary, AWS Trusted Advisor is a valuable tool for maintaining operational excellence by offering targeted recommendations across cost optimization, performance, fault tolerance, security, and service limits. These insights empower you to proactively manage your AWS environment and adhere to best practices.

> [!important]
> **Remember**
>
> AWS Trusted Advisor's full functionality is available exclusively on the Business, Enterprise On-Ramp, and Enterprise support plans. Ensure you have the appropriate plan to leverage all of its capabilities.

Thank you for reading, and we'll catch you in the next lesson.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/0c9bb9a3-5201-434e-8085-a9f1e9f23f22/lesson/f424901e-e32e-44b7-a635-b55d0b20811f)**
>
> Watch video content
