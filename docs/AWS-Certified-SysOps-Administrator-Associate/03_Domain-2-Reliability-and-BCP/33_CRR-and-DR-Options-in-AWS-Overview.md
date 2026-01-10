# CRR and DR Options in AWS Overview - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-2-Reliability-and-BCP/CRR-and-DR-Options-in-AWS-Overview)

---

## Table of Contents

- CRR and DR Options in AWS Overview
  - Watch Video

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 2 Reliability and BCP

# CRR and DR Options in AWS Overview

Welcome to this comprehensive guide on cross-region replication (CRR) and disaster recovery (DR) strategies in AWS. In this article, we explore how CRR enhances data durability, improves performance through reduced latency, and serves as an effective backup mechanism. We also discuss four common DR strategies that help maintain service continuity during unexpected outages.

Imagine managing an e-commerce platform with customers across the globe. Now, consider an outage in your primary AWS region that hosts your database. How do you quickly restore service while ensuring your data remains secure? CRR answers this challenge by asynchronously copying data from one region to another.

CRR offers the following benefits:

- Enhanced data durability
- Reduced latency for users near the replicated data
- A robust backup mechanism during regional failures

While CRR is not a real-time solution, it provides an optimal balance of cost and performance for many applications.

![The image illustrates AWS Cross-Region Replication, showing data replication between S3 buckets in different regions for data durability, low latency, and backup.](https://kodekloud.com/kk-media/image/upload/v1752860023/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-CRR-and-DR-Options-in-AWS-Overview/aws-cross-region-replication-s3.jpg)

In addition to CRR, planning for disaster recovery (DR) is crucial. DR strategies prepare you for a wide range of disruptions—from natural disasters like hurricanes and earthquakes to human-induced configuration errors. A robust DR plan not only outlines the recovery process but also emphasizes the importance of regular drills to ensure a swift response when needed.

Below are four DR strategies that balance cost and recovery objectives:

1.  **Backup and Restore:**  
    Data is backed up at scheduled intervals. Although there might be a potential loss of a few hours’ data and a longer recovery time, this cost-effective method is ideal for non-critical systems.
2.  **Pilot Light:**  
    In this approach, a minimally active (or “pilot”) version of your environment is continuously running. Most services remain inactive until a disaster occurs, reducing recovery time to approximately 10–30 minutes with minimal data loss.
3.  **Warm Standby:**  
    Both applications and data are partially live, which allows for quicker recovery (typically under 10 minutes) compared to the pilot light approach. However, the costs are slightly higher as more resources are maintained in an active state.
4.  **Active-Active:**  
    This is the most robust DR strategy, offering near real-time recovery by running two fully active sites concurrently. In an active-active setup, if one site experiences an outage, the other immediately takes over, ensuring continuous service delivery.

![The image is a diagram illustrating different disaster recovery (DR) strategies, ranging from "Backup and Restore" to "Multi-Site Active/Active," with varying recovery point objectives (RPO), recovery time objectives (RTO), and associated costs.](https://kodekloud.com/kk-media/image/upload/v1752860023/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-CRR-and-DR-Options-in-AWS-Overview/disaster-recovery-strategies-diagram.jpg)

> [!important]
> **Tip**
>
> Regularly test and update your disaster recovery plan to ensure your organization is prepared for any unexpected event.

AWS offers a range of services that support CRR. The table below summarizes key services along with their CRR capabilities and common use cases:

| AWS Service                     | CRR Capability                                     | Use Case                                          |
| ------------------------------- | -------------------------------------------------- | ------------------------------------------------- |
| Amazon S3                       | Cross-region replication of S3 buckets             | Data durability, low latency access, and backup   |
| DynamoDB Global Tables          | Asynchronous replication with eventual consistency | Global distributed database management            |
| Amazon RDS                      | Cross-region read replicas                         | Database failover and disaster recovery           |
| Aurora                          | Cluster replication or global databases            | High availability with near real-time replication |
| AWS Secrets Manager             | Multi-region replication                           | Secure, cross-region secret management            |
| Systems Manager Parameter Store | Cross-region replication                           | Centralized configuration management              |
| Elastic File System (EFS)       | Replication across regions                         | Shared data management across regions             |

Other AWS services such as SQS, AWS Backup, Redshift, DocumentDB, and Kinesis are continually evolving to include cross-region replication features.

![The image lists AWS services that support CRR, including Amazon S3, DynamoDB Global Tables, RDS Cross-Region Read Replicas, Aurora, Secrets Manager, Systems Manager Parameter Store, Elastic File System, SQS, and AWS Backup.](https://kodekloud.com/kk-media/image/upload/v1752860024/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-CRR-and-DR-Options-in-AWS-Overview/aws-services-supporting-crr.jpg)

By implementing these CRR and DR options, you can create a resilient AWS environment that minimizes downtime and maintains service quality even during unforeseen disruptions.

Thank you for reading this article.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/1b592900-bdef-468a-9a2b-de667b7e9cae/lesson/184dfdeb-f3d2-490e-94d7-882b731e223a)**
>
> Watch video content
