# AWS RDS Overview - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Databases/AWS-RDS-Overview)

---

## Table of Contents

- AWS RDS Overview
  - Read Replicas
  - Multi-AZ Deployments and Standby Databases
  - Summary
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Databases

# AWS RDS Overview

In this article, we explore Amazon's Relational Database Service (RDS) and its ability to simplify database management for your applications.

Imagine an e-commerce website where users interact with your platform. This website requires a reliable system to store and retrieve user data, product information, order details, payment records, and more. Your application depends on a robust, scalable, and secure database to handle this persistent data efficiently.

![The image is a diagram illustrating the interaction between users, an e-commerce website, and a database, highlighting the management of user information and product catalogs with a focus on robustness, scalability, and reliability.](https://kodekloud.com/kk-media/image/upload/v1752858662/notes-assets/images/AWS-Certified-Developer-Associate-AWS-RDS-Overview/ecommerce-website-user-database-diagram.jpg)

Managing your own database can be challenging. Traditionally, you would need to provision hardware, configure the operating system and database software, and manage human resources to ensure security, high availability, and scalability. This complexity often necessitates hiring specialized database administrators.

![The image is a diagram illustrating the management of a database, highlighting components like hardware, software, human resources, availability, and security.](https://kodekloud.com/kk-media/image/upload/v1752858663/notes-assets/images/AWS-Certified-Developer-Associate-AWS-RDS-Overview/database-management-diagram-components.jpg)

> [!important]
> **Managed Service Benefits**
>
> AWS RDS is a fully managed service that automates routine tasks such as hardware provisioning, software configuration, patching, backups, and scaling. This allows you to focus on developing your application and growing your business.

As your platform grows, RDS scales effortlessly to accommodate increased traffic. Features such as automatic OS patching, multi-AZ deployments, and automated backups ensure high availability, resiliency, and minimal data loss during failures.

![The image lists four benefits of AWS RDS: Fully Managed Service, Scalability, Automatic OS Patching, and High Availability and Disaster Recovery.](https://kodekloud.com/kk-media/image/upload/v1752858664/notes-assets/images/AWS-Certified-Developer-Associate-AWS-RDS-Overview/aws-rds-benefits-list.jpg)

RDS instances use Amazon's Elastic Block Store (EBS) for storage, which delivers reliable, scalable, high-performance block storage with snapshot capabilities for enhanced durability. RDS supports various database engines, including Amazon Aurora, MySQL, PostgreSQL, MariaDB, Oracle Database, SQL Server, and IBM DB2. One standout feature, storage autoscaling, automatically increases storage when capacity limits are reached—for example, scaling from 100 GB to 150 GB as needed.

![The image illustrates RDS storage autoscaling, showing an RDS instance increasing its storage from 100GB to 150GB after reaching a storage threshold.](https://kodekloud.com/kk-media/image/upload/v1752858665/notes-assets/images/AWS-Certified-Developer-Associate-AWS-RDS-Overview/rds-storage-autoscaling-diagram.jpg)

Since RDS leverages EBS, you can take snapshots of your data and store them in S3, which enables quick restoration in case of failures or data corruption, resulting in minimal downtime.

![The image is a diagram illustrating an RDS setup, showing a DB instance in Availability Zone A connected to an EBS Volume, with EBS Snapshots stored in an S3 Bucket, and a failure alert indicated.](https://kodekloud.com/kk-media/image/upload/v1752858667/notes-assets/images/AWS-Certified-Developer-Associate-AWS-RDS-Overview/rds-setup-db-instance-ebs-s3.jpg)

## Read Replicas

During peak sales periods—like holidays or Black Friday—your e-commerce application's heavy read operations (such as browsing product details, reviews, and inventory) may overwhelm the primary RDS instance. Read replicas help mitigate this issue.

By configuring up to 15 read replicas, you can offload read-only queries from the master instance. The master handles both reads and writes, while data is asynchronously replicated to these replicas. This distribution of read operations significantly improves response times during high-demand periods.

![The image is a diagram illustrating an RDS (Relational Database Service) setup with a master database and two read replicas, showing read/write and read-only access paths, along with asynchronous replication.](https://kodekloud.com/kk-media/image/upload/v1752858668/notes-assets/images/AWS-Certified-Developer-Associate-AWS-RDS-Overview/rds-setup-master-replicas-diagram.jpg)

> [!important]
> **Cost Consideration**
>
> If the master instance and its read replicas are located within the same region, asynchronous replication incurs no additional fees. However, replication between different regions is subject to cross-region data transfer charges.

## Multi-AZ Deployments and Standby Databases

AWS RDS supports multi-AZ (Availability Zone) deployments to enhance database availability and reliability. In a multi-AZ configuration, a master instance in one availability zone synchronously replicates data to a standby instance in another zone.

While the standby instance remains passive during normal operations, it is continuously updated. In the event of a failure, the DNS entry automatically fails over to the standby instance, ensuring minimal disruption and data loss.

![The image illustrates an RDS Multi-AZ Deployment, showing a setup with an RDS Master in Availability Zone A and an RDS Standby Replica in Availability Zone B, connected via synchronous replication.](https://kodekloud.com/kk-media/image/upload/v1752858670/notes-assets/images/AWS-Certified-Developer-Associate-AWS-RDS-Overview/rds-multi-az-deployment-diagram.jpg)

In a typical setup, your application (for instance, running on an EC2 instance) connects to the database via an RDS-provided DNS entry. The master handles read and write requests, while synchronously replicating changes to the standby. If the master becomes unreachable, the DNS entry updates automatically to point to the standby, ensuring seamless continuity.

![The image illustrates a diagram of synchronous replication in a cloud environment, showing clients connecting to an EC2 instance, which then interacts with a DNS entry and RDS instances across two availability zones.](https://kodekloud.com/kk-media/image/upload/v1752858671/notes-assets/images/AWS-Certified-Developer-Associate-AWS-RDS-Overview/synchronous-replication-cloud-diagram.jpg)

## Summary

AWS RDS offers a managed relational database service supporting popular engines such as PostgreSQL, MySQL, MariaDB, Oracle, SQL Server, IBM Db2, and Aurora. Key features include:

- Automated provisioning, patching, and continuous backups.
- Storage management via EBS, with support for snapshots and autoscaling.
- High availability and disaster recovery through multi-AZ deployments.
- Offloading of read queries via up to 15 read replicas using asynchronous replication.
- Cost efficiencies when replicating within the same region versus cross-region transfers.

![The image is a summary of key points about Read Replicas, highlighting their ability to offload read requests, support up to 15 replicas, asynchronous data syncing, regional network fee differences, and standby database deployment.](https://kodekloud.com/kk-media/image/upload/v1752858672/notes-assets/images/AWS-Certified-Developer-Associate-AWS-RDS-Overview/read-replicas-summary-key-points.jpg)

In essence, AWS RDS simplifies database management by handling routine administrative tasks and offering robust features like read replicas and multi-AZ deployments—ensuring your database remains performant, secure, and highly available.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/a1267c00-fc48-4a9b-8d41-fd642fa743ea/lesson/d8a734ed-504d-4a0a-952e-3ea3b699c3da)**
>
> Watch video content
