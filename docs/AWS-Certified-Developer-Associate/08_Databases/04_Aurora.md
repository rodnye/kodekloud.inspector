# Aurora - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Databases/Aurora)

---

## Table of Contents

- Aurora
  - Key Features of Amazon Aurora
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Databases

# Aurora

Amazon Aurora is a fully managed, high-performance database engine compatible with both MySQL and PostgreSQL. With Aurora, you can achieve up to five times the throughput of MySQL and three times that of PostgreSQL, making it an ideal drop-in replacement that delivers superior performance.

Aurora’s enhanced performance is powered by its distributed, fault-tolerant, and self-healing storage system. By replicating data six times across three availability zones (AZs)—with two copies in each AZ—Aurora ensures high availability and durability. Although Aurora comes at a higher price point compared to standard RDS instances, it significantly simplifies database management by automating routine administrative tasks without the need to modify your database drivers or tooling.

![The image shows supported database engines, specifically Aurora with MySQL and PostgreSQL.](https://kodekloud.com/kk-media/image/upload/v1752858690/notes-assets/images/AWS-Certified-Developer-Associate-Aurora/aurora-mysql-postgresql-engines.jpg)

When examining a typical application architecture, a user request is initially directed to an EC2 instance hosting your application. The application then interacts with an Aurora database to process the query and return the result through the same pathway.

![The image is a diagram illustrating a network setup with users accessing an EC2 instance in a public subnet, which connects to an Aurora MySQL DB cluster in a private subnet within a VPC.](https://kodekloud.com/kk-media/image/upload/v1752858691/notes-assets/images/AWS-Certified-Developer-Associate-Aurora/network-setup-ec2-aurora-diagram.jpg)

> [!important]
> **Aurora Deployment Model**
>
> In an Aurora database cluster, there are two types of instances:
>
> 1.  **Primary Instance:** Handles both read and write operations and manages all modifications to the cluster volume.
> 2.  **Replica Instances:** Up to 15 replicas are available to serve read operations only. These replicas, typically distributed across multiple AZs, can be promoted to primary status in under 100 milliseconds in the event of a primary instance failure.

Aurora continuously monitors the cluster's health. If the primary instance becomes unresponsive or encounters an issue, the system automatically promotes one of the replicas to primary, ensuring minimal disruption to application performance.

![The image is an infographic titled "HA With Aurora," illustrating features like Multi-AZ Deployment, Data Replication, Primary and Replica Instances, Automatic Failover, and Fault-Tolerant Storage.](https://kodekloud.com/kk-media/image/upload/v1752858692/notes-assets/images/AWS-Certified-Developer-Associate-Aurora/ha-with-aurora-infographic.jpg)

The cluster volume in Aurora is designed as a distributed and redundant storage solution spanning multiple AZs. Managed automatically by Aurora, this storage dynamically scales up to 128 terabytes as your data grows. Additionally, the self-healing storage continuously scans for and repairs any faulty disks or corrupted data blocks, leveraging SSDs and cross-AZ replication to maintain high durability even during an AZ failure.

![The image illustrates a high availability setup with Amazon Aurora, showing a primary instance and replicas across three availability zones, with data copies in a cluster volume.](https://kodekloud.com/kk-media/image/upload/v1752858693/notes-assets/images/AWS-Certified-Developer-Associate-Aurora/amazon-aurora-high-availability-setup.jpg)

![The image is an infographic titled "Aurora Cluster Volume," highlighting three features: distributed and redundant storage, automatically managed, and self-healing.](https://kodekloud.com/kk-media/image/upload/v1752858694/notes-assets/images/AWS-Certified-Developer-Associate-Aurora/aurora-cluster-volume-infographic.jpg)

Aurora provides multiple DNS endpoints to help efficiently route queries within the database cluster:

- **Cluster/Writer Endpoint:** Handles all write operations.
- **Reader Endpoint:** Distributes read operations across all available replicas.
- **Custom Endpoints:** Allow you to group instances with unique performance characteristics, such as those optimized for memory-intensive read operations.

These endpoints ensure that your application can quickly and efficiently perform the appropriate database operations.

![The image is a diagram illustrating Aurora Endpoints, showing the distribution of an Aurora Primary Instance and Aurora Replicas across three availability zones, with cluster, reader, and custom endpoints.](https://kodekloud.com/kk-media/image/upload/v1752858695/notes-assets/images/AWS-Certified-Developer-Associate-Aurora/aurora-endpoints-diagram-availability-zones.jpg)

## Key Features of Amazon Aurora

- Up to five times the throughput of MySQL and three times that of PostgreSQL.
- Data is replicated across three availability zones with six copies maintained.
- A single primary instance manages all writes, complemented by up to 15 read-only replicas.
- A distributed, self-healing cluster volume that scales dynamically up to 128 terabytes.
- Multiple DNS endpoints to optimize read and write operations.

![The image is a summary of features for a high-performance database management system compatible with Postgres and MySQL, highlighting its throughput, data replication, and endpoint connections. It includes points about availability zones, read/write handling, and cluster volume spanning.](https://kodekloud.com/kk-media/image/upload/v1752858696/notes-assets/images/AWS-Certified-Developer-Associate-Aurora/high-performance-database-summary.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/a1267c00-fc48-4a9b-8d41-fd642fa743ea/lesson/1306f6ad-ca93-4425-a1e0-b5d94649c1cb)**
>
> Watch video content
