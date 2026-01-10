# RDS Aurora and Aurora Serverless - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Database/RDS-Aurora-and-Aurora-Serverless)

---

## Table of Contents

- RDS Aurora and Aurora Serverless
  - The Challenge with Traditional Database Architectures
  - Aurora Storage Architecture
  - Components of an Aurora Database Cluster
  - Deployment Options: Provisioned vs. Serverless
  - Aurora Global Database
  - Integrations with Other AWS Services
  - Summary
  - Watch Video
    - Provisioned
    - Serverless

---

## Content

AWS Solutions Architect Associate Certification

Services Database

# RDS Aurora and Aurora Serverless

In this lesson, we explore AWS Aurora, a cloud-based relational database service built to deliver next-generation commercial database features with cost efficiency. Engineered for high performance, scalability, and durability, Aurora offers significant advantages over traditional database solutions—all while reducing overall costs.

Aurora is fully compatible with both MySQL and PostgreSQL, making it a straightforward drop-in replacement. Let’s dive into the unique benefits and architectural innovations that distinguish Aurora from conventional databases.

---

## The Challenge with Traditional Database Architectures

Traditional databases typically combine compute and storage within a single instance, which introduces several challenges:

- Longer snapshot durations since the entire dataset must be copied.
- Difficulty scaling storage independently of compute resources, potentially leading to downtime or complex migrations.
- Extended backup and restore times, especially when dealing with large storage volumes.
- The necessity to overprovision storage for peak capacity, resulting in unnecessary expenses.

These limitations underscore the importance of decoupling compute and storage to boost scalability, availability, and durability.

![The image compares traditional database architecture, which combines compute and storage in a single instance, with Aurora architecture, which separates compute and storage.](https://kodekloud.com/kk-media/image/upload/v1752865218/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-RDS-Aurora-and-Aurora-Serverless/database-architecture-comparison-aurora.jpg)

---

## Aurora Storage Architecture

Aurora overcomes these challenges with a unique, log-structured distributed storage system designed for modern cloud environments. Key characteristics include:

- The storage volume is striped across hundreds of nodes with locally attached SSDs, ensuring high performance and durability.
- Continuous backup capability to Amazon S3 for seamless data protection and recovery.
- Data distribution across multiple Availability Zones (AZs), providing built-in high availability and resilience to data center failures.
- Automatic scaling of storage capacity, eliminating the need for manual intervention or downtime.

![The image compares traditional database architecture, which combines compute and storage, with Aurora architecture, which decouples them for better scalability, availability, and durability.](https://kodekloud.com/kk-media/image/upload/v1752865219/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-RDS-Aurora-and-Aurora-Serverless/database-architecture-comparison-aurora-2.jpg)

Aurora further optimizes read-write I/O efficiency using its distributed design and a quorum model for operation approvals, ensuring data integrity and fault tolerance. In the event of an AZ failure, Aurora’s multi-AZ deployment supports continued write operations through effective data replication across zones.

![The image is a diagram explaining the need for Amazon Aurora, showing its integration with applications and storage volumes across multiple availability zones, highlighting features like distributed storage and continuous backup to Amazon S3.](https://kodekloud.com/kk-media/image/upload/v1752865221/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-RDS-Aurora-and-Aurora-Serverless/amazon-aurora-diagram-integration.jpg)

Additionally, Aurora employs a gossip protocol to rapidly identify and repair node discrepancies, significantly reducing recovery time in distributed systems.

---

## Components of an Aurora Database Cluster

An Aurora database cluster is comprised of several key components:

- **Database Instances:**
  - **Primary Instance:**  
    Supports both read and write operations while updating the cluster volume. Each Aurora cluster has exactly one primary instance.
  - **Replicas:**  
    Support read-only operations and share the same storage volume as the primary. Up to 15 replicas can be deployed across different AZs, providing enhanced availability. If the primary fails, one of these replicas can be promoted to become the new primary.

- **Cluster Volume:**  
  Acts as a virtualized storage layer that spans multiple AZs, with each zone maintaining a copy of the entire database cluster's data.

![The image illustrates the components of an AWS Aurora DB Cluster, showing a primary instance and Aurora replicas across three availability zones, with data copies in a shared cluster volume.](https://kodekloud.com/kk-media/image/upload/v1752865222/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-RDS-Aurora-and-Aurora-Serverless/aws-aurora-db-cluster-components.jpg)

Aurora organizes its database volume into 10-gigabyte segments. Each segment is recorded as a protection group, consisting of six copies spread across three AZs (one full segment with data pages and log records, and one tail segment with log records only per AZ). This design facilitates automatic scaling, maximizes I/O efficiency, and maintains data integrity.

---

## Deployment Options: Provisioned vs. Serverless

When deploying an Aurora database cluster, you have two configuration options:

### Provisioned

- Allocate a database instance with pre-configured CPU, memory, storage, and IOPS.
- Scale resources manually as needed.
- Benefit from Aurora Global Databases, which provide low latency global reads and regional failover capabilities.

### Serverless

- Ideal for workloads with unpredictable capacity requirements.
- Automatically scales capacity on demand based on application load.
- Payment is based solely on the actual resources consumed.
- Aurora Serverless v2 offers enhanced scalability and integration with Aurora Global features.

![The image compares two types of AWS Aurora: "Provisioned" with fixed capacity for planned workloads, and "Serverless" with on-demand scaling for variable workloads.](https://kodekloud.com/kk-media/image/upload/v1752865223/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-RDS-Aurora-and-Aurora-Serverless/aws-aurora-provisioned-serverless-comparison.jpg)

> [!important]
> **Choosing the Right Deployment Option**
>
> Consider serverless for applications with variable load and provisioned for stable, predictable workloads.

---

## Aurora Global Database

Aurora Global Database clusters enable deployment of a consistent database system across multiple AWS regions:

- A primary database cluster in one region accepts write operations.
- Up to five secondary clusters in different regions serve as read-only replicas.
- Data is asynchronously replicated from the primary to each secondary cluster via a low latency, high throughput system.

For Aurora Serverless, capacity is measured using Aurora Capacity Units (ACUs). Each ACU approximates 2 GB of memory along with the corresponding CPU and networking capacity. When configuring an Aurora cluster, you specify a range—from a minimum of 0.5 ACU up to a maximum of 128 ACUs.

![The image depicts a map illustrating an Aurora Global Database setup with one master database (M) and three read replicas (R) distributed across different global locations.](https://kodekloud.com/kk-media/image/upload/v1752865224/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-RDS-Aurora-and-Aurora-Serverless/aurora-global-database-map.jpg)

Aurora Serverless continuously monitors and adjusts database capacity, ensuring cost effectiveness by charging only for the compute resources used.

![The image provides information about Aurora Serverless V2, explaining the Aurora Capacity Unit (ACU) as a measure of memory, CPU, and networking, with a range from 0.5 to 128 ACUs. It also notes the automation of monitoring processes and usage-based payment.](https://kodekloud.com/kk-media/image/upload/v1752865226/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-RDS-Aurora-and-Aurora-Serverless/aurora-serverless-v2-acu-info.jpg)

While Aurora Serverless v1 still exists, AWS primarily recommends Aurora Serverless v2 for modern deployments, as v1 is being phased out.

![The image is a comparison chart detailing the differences between Aurora Serverless v1 and v2, highlighting aspects like scaling, compute regions, and failover capabilities.](https://kodekloud.com/kk-media/image/upload/v1752865227/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-RDS-Aurora-and-Aurora-Serverless/aurora-serverless-v1-v2-comparison.jpg)

---

## Integrations with Other AWS Services

Aurora integrates seamlessly with various AWS services to enhance its functionality:

- **Amazon S3:** Used for scheduled backups and data recovery.
- **CloudWatch:** Provides robust monitoring of performance metrics.
- **AWS Lambda, EKS, ECS, etc.:** Facilitates connectivity between your applications and the database.
- **Secrets Manager:** Securely stores database credentials.

![The image illustrates Amazon Aurora integration with various AWS services, highlighting its features like high performance, scalability, and compatibility with MySQL and PostgreSQL. It shows how Aurora can integrate with services such as Amazon S3, AWS Lambda, and Amazon Redshift for enhanced analytics and security.](https://kodekloud.com/kk-media/image/upload/v1752865228/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-RDS-Aurora-and-Aurora-Serverless/amazon-aurora-aws-integration-diagram.jpg)

Aurora's capabilities make it well-suited for:

- Modernizing enterprise applications (CRMs, ERPs, and supply chain or billing systems).
- Building SaaS applications that require flexible compute and storage scaling.
- Implementing efficient serverless architectures where you pay only for actual usage.
- Developing globally distributed applications, including mobile games and social media platforms.

![The image outlines four use cases for Aurora: modernizing enterprise applications, building SAAS applications, going serverless, and creating globally distributed applications. Each use case is represented with a distinct color and icon.](https://kodekloud.com/kk-media/image/upload/v1752865229/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-RDS-Aurora-and-Aurora-Serverless/aurora-use-cases-modernization-saas.jpg)

---

## Summary

Aurora is a fully managed relational database service that automates hardware provisioning, database setup, patching, and backups. Its advanced, fault-tolerant, and self-healing storage system can scale up to 128 terabytes per instance, ensuring both high performance and reliability.

Key features include:

- Up to five times the throughput of MySQL and three times that of PostgreSQL.
- Support for up to 15 replicas across three Availability Zones, enhancing read scalability and availability.
- Fast cloning capabilities for rapid database replication in development and testing environments.
- Seamless integration with multi-AZ and global deployments for improved local read-write performance and disaster recovery.
- Aurora Serverless, which automatically adjusts capacity based on demand, offering significant cost savings.

![The image is a summary of Amazon Aurora's features, highlighting its performance, scalability, and fast database cloning capabilities. It includes points about throughput, availability zones, and failover times.](https://kodekloud.com/kk-media/image/upload/v1752865231/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-RDS-Aurora-and-Aurora-Serverless/amazon-aurora-features-summary.jpg)

Aurora’s powerful features and flexible deployment options make it an excellent choice for enterprises and developers seeking a robust, scalable, and highly available cloud-based database solution.

> [!important]
> **Learn More**
>
> Explore additional details on [AWS Aurora Documentation](https://aws.amazon.com/rds/aurora/) to further enhance your understanding and deployment strategies.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/9fb73cb5-caf2-4dc2-ad5c-fe5fe69507e3/lesson/b983ffe0-1e95-4835-a4ff-761dc633a2fa)**
>
> Watch video content
