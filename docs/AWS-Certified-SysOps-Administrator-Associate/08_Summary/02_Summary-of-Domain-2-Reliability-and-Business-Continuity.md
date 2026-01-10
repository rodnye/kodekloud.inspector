# Summary of Domain 2 Reliability and Business Continuity - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Summary/Summary-of-Domain-2-Reliability-and-Business-Continuity)

---

## Table of Contents

- Summary of Domain 2 Reliability and Business Continuity
  - Reliability in Cloud Operations
  - Resiliency Mechanisms and Auto Scaling
  - The Importance of Caching
  - Data Replication and Resiliency
  - Loose Coupling and Abstraction
  - VPC Architecture and Availability Zones
  - Disaster Recovery Strategies
  - Backup and Restore Processes
  - Amazon S3, Versioning, and Lifecycle Management
  - S3 Cross-Region Replication
  - Conclusion
  - Watch Video

---

## Content

AWS Certified SysOps Administrator - Associate

Summary

# Summary of Domain 2 Reliability and Business Continuity

In this lesson, we review key AWS concepts related to system reliability and business continuity. This refresher revisits important topics to help you reinforce your understanding as you prepare for your exam.

## Reliability in Cloud Operations

Reliability is the system's ability to operate consistently and correctly over time, even when components fail. In Domain 2, the following topics were covered:

- **Fault Tolerance:** The capacity of a system to continue operating when some components fail (for example, by leveraging multiple Availability Zones).
- **Resiliency:** The ability of a system to detect, recover from, and resist failures.
- **Redundancy:** The practice of duplicating systems or components so that if a primary component fails, the overall system remains operational.

![The image is a diagram explaining "Reliability in Cloud Operations," highlighting three key concepts: Fault Tolerance, Resiliency, and Redundancy, with brief descriptions of each.](https://kodekloud.com/kk-media/image/upload/v1752861305/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Summary-of-Domain-2-Reliability-and-Business-Continuity/reliability-cloud-operations-diagram.jpg)

## Resiliency Mechanisms and Auto Scaling

Enhancing resiliency leads to improved performance. AWS offers multiple auto scaling policies:

- **Dynamic Scaling:** Implements policies such as target tracking, simple scaling, and step scaling.
- **Predictive Scaling:** Uses historical data to forecast traffic and adjust capacity accordingly.
- **Scheduled Scaling:** Adjusts resources based on pre-defined times, like scaling out during peak weekend usage.

![The image is a diagram showing types of AWS Auto Scaling, including Dynamic Scaling, Predictive Scaling, and Scheduled Scaling. Dynamic Scaling is further divided into Target Tracking Scaling, Step Scaling, and Simple Scaling.](https://kodekloud.com/kk-media/image/upload/v1752861306/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Summary-of-Domain-2-Reliability-and-Business-Continuity/aws-auto-scaling-diagram.jpg)

AWS auto scaling extends beyond EC2: services like EMR, ECS, Aurora, and several serverless resources also incorporate auto scaling features.

![The image is a diagram titled "Auto Scaling Resources," showing Amazon EC2 Scaling and a list of application auto-scaling services like AppStream 2.0 fleets, Aurora replicas, and more.](https://kodekloud.com/kk-media/image/upload/v1752861307/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Summary-of-Domain-2-Reliability-and-Business-Continuity/auto-scaling-resources-ec2-diagram.jpg)

## The Importance of Caching

Caching improves performance by reducing latency and offloading server traffic while boosting resiliency. The benefits include:

- Reduced latency and improved response times
- Lower server load
- Increased cost efficiency

![The image illustrates the importance of caching with four benefits: reduced latency, improved performance, reduced load, and cost efficiency. Each benefit is represented by a numbered icon with a corresponding graphic.](https://kodekloud.com/kk-media/image/upload/v1752861309/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Summary-of-Domain-2-Reliability-and-Business-Continuity/caching-benefits-latency-performance.jpg)

Key caching services include:

- **ElastiCache:** Available in two forms:
  - **Redis:** Supports multi-AZ deployments, complex data structures, and list sorting.
  - **Memcached:** Offers a lightweight and simple caching solution.
- **DAX (DynamoDB Accelerator):** A fully managed cache for DynamoDB, reducing read latencies to microseconds even under high load.

![The image illustrates the uses of AWS DynamoDB Accelerator (DAX), highlighting that it is fully managed and increases performance to microseconds.](https://kodekloud.com/kk-media/image/upload/v1752861310/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Summary-of-Domain-2-Reliability-and-Business-Continuity/aws-dynamodb-accelerator-uses.jpg)

## Data Replication and Resiliency

Replication plays a vital role in maintaining system resiliency, especially for stateful applications. It helps offload reporting tasks, populates data warehouses, performs backups, and supports auditing. Replication methods include:

- **Within a Region:** Local replication for short distances and low latencies.
- **Cross-Region:** For long-distance replication using asynchronous techniques.

![The image illustrates a data replication process from a primary site to a secondary site, involving various users and functions such as reporting, ETL, backup, and auditing.](https://kodekloud.com/kk-media/image/upload/v1752861312/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Summary-of-Domain-2-Reliability-and-Business-Continuity/data-replication-primary-secondary.jpg)

For a quick visual comparison:

![The image is a comparison table of RDS replication types, detailing features like replication type, read performance, failover, use case, and region for Multi-AZ (Instance and Cluster), Read Replicas, and Cross-Region Replication.](https://kodekloud.com/kk-media/image/upload/v1752861314/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Summary-of-Domain-2-Reliability-and-Business-Continuity/rds-replication-types-comparison-table.jpg)

Database services such as Aurora, Redshift, and DynamoDB offer various replication options, including cross-region setups and multiple Availability Zone deployments for robust performance and global data availability.

![The image is a diagram illustrating Amazon Aurora replicas within the same region, showing a writer instance and reader instances across different availability zones with shared storage. It highlights synchronous writes and asynchronous replication processes.](https://kodekloud.com/kk-media/image/upload/v1752861315/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Summary-of-Domain-2-Reliability-and-Business-Continuity/amazon-aurora-replicas-diagram.jpg)

## Loose Coupling and Abstraction

Design architectures with loose coupling to further enhance resiliency. Using microservices, message-driven, or event-driven approaches allows each component to operate independently, resulting in higher fault tolerance and easier scalability.

![The image illustrates three loose coupling scenarios: Microservices Architecture, Message-Driven Architecture, and Event-Driven Architecture, each with a diagram showing their components and interactions.](https://kodekloud.com/kk-media/image/upload/v1752861316/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Summary-of-Domain-2-Reliability-and-Business-Continuity/loose-coupling-microservices-diagram.jpg)

High availability is reinforced with abstraction layers like load balancers, which distribute web connections and mask direct server access. Together with auto scaling, these components create a robust resilient cloud architecture.

![The image compares high availability and fault tolerance in a system, illustrating differences in redundancy, uptime, and cost using diagrams of EC2 instances across availability zones.](https://kodekloud.com/kk-media/image/upload/v1752861318/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Summary-of-Domain-2-Reliability-and-Business-Continuity/high-availability-fault-tolerance-diagram.jpg)

Additionally, AWS Route 53 enforces resiliency through various DNS routing policies, including:

- Latency-based routing
- Geolocation routing
- Geoproximity routing
- Failover routing
- IP-based routing
- Multivalue answer routing

![The image lists eight Route 53 routing policies: Simple Routing, Weighted Routing, Latency Based, Geolocation Routing, Geoproximity Routing, Failover Routing, IP-based Routing, and Multivalue Answer Routing.](https://kodekloud.com/kk-media/image/upload/v1752861319/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Summary-of-Domain-2-Reliability-and-Business-Continuity/route-53-routing-policies-list.jpg)

For global traffic management, AWS Global Accelerator acts as a global load balancer that directs users to the optimal regional endpoint.

![The image is a diagram illustrating how AWS Global Accelerator works with Elastic Load Balancers (ELB) across different regions, showing user connections and components like EC2 and EBS.](https://kodekloud.com/kk-media/image/upload/v1752861322/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Summary-of-Domain-2-Reliability-and-Business-Continuity/aws-global-accelerator-elb-diagram.jpg)

## VPC Architecture and Availability Zones

AWS best practices recommend deploying resources across multiple Availability Zones to enhance resiliency. Typically, private subnets house most resources while load balancers reside in public subnets. This design supports auto scaling groups and ensures that the failure of one zone does not impact the overall system.

## Disaster Recovery Strategies

Disaster recovery (DR) strategies are essential for maintaining business continuity. Key concepts include:

- **Recovery Time Objective (RTO):** The maximum acceptable downtime.
- **Recovery Point Objective (RPO):** The maximum tolerable period in which data might be lost.

DR strategies range from backup and restore to pilot light, warm standby, and active-active configurations.

![The image is a chart illustrating disaster recovery strategies, ranging from "Backup and Restore" to "Multi-Site Active/Active," with increasing levels of recovery point objective (RPO) and recovery time objective (RTO) from low to high. Each strategy is associated with different costs and service priorities.](https://kodekloud.com/kk-media/image/upload/v1752861324/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Summary-of-Domain-2-Reliability-and-Business-Continuity/disaster-recovery-strategies-chart.jpg)

A detailed backup methodology also distinguishes between full backups and incremental snapshots (which capture only data changes). While backups are vital for recovery, it is equally important to ensure the backup data's integrity.

![The image illustrates the differences between backups and EBS snapshots, showing how data is backed up over three days. On Day 1, all data is backed up, while on Days 2 and 3, only the changed data is backed up.](https://kodekloud.com/kk-media/image/upload/v1752861325/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Summary-of-Domain-2-Reliability-and-Business-Continuity/backups-vs-ebs-snapshots-diagram.jpg)

## Backup and Restore Processes

An effective backup plan should include:

- Creating backup vaults and plans.
- Replicating backups across different regions.
- Automating data restoration as necessary.
- Ensuring data integrity to avoid corruption.

![The image is a diagram showing an AWS cloud backup and restoration process between two regions: N. Virginia (us-east-1) and N. California (us-west-1). It illustrates the use of AWS services like EC2, EFS, EBS, RDS, and AWS Backup for WebApp 1.](https://kodekloud.com/kk-media/image/upload/v1752861327/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Summary-of-Domain-2-Reliability-and-Business-Continuity/aws-cloud-backup-restore-diagram.jpg)

Additional measures in the backup process include monitoring and validating backups. Point-in-time restore capabilities, such as those available in DynamoDB, enable recovery from a specific moment—crucial for mitigating accidental deletions or data corruptions.

![The image is a flowchart illustrating the AWS Backup process, including steps like creating a backup plan, assigning resources, and protecting them, with additional actions such as monitoring and restoring.](https://kodekloud.com/kk-media/image/upload/v1752861328/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Summary-of-Domain-2-Reliability-and-Business-Continuity/aws-backup-process-flowchart.jpg)

![The image illustrates a point-in-time restore process, showing a timeline of full, differential, and transaction log backups, with a focus on data loss due to accidental deletion at 13:30.](https://kodekloud.com/kk-media/image/upload/v1752861329/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Summary-of-Domain-2-Reliability-and-Business-Continuity/point-in-time-restore-backup-timeline.jpg)

Read replicas, especially in RDS and Aurora, provide additional redundancy and offload read traffic. These replicas can be promoted to serve as the primary database if required.

![The image outlines steps to promote a read replica, including locating, promoting, configuring settings, and monitoring status, alongside a database replication status table.](https://kodekloud.com/kk-media/image/upload/v1752861330/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Summary-of-Domain-2-Reliability-and-Business-Continuity/promote-read-replica-steps-diagram.jpg)

## Amazon S3, Versioning, and Lifecycle Management

Amazon S3 contributes to resiliency through versioning, which keeps a history of every change to an object. Versioning is useful for delete protection and historical recovery. However, to manage potential storage cost increases, it is advisable to combine versioning with lifecycle rules. These rules transition older versions to colder storage classes like S3 Glacier, optimizing both performance and cost.

![The image explains Amazon S3 versioning, highlighting features like creating new versions with each upload, delete protection, and data retention using S3 Lifecycle.](https://kodekloud.com/kk-media/image/upload/v1752861331/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Summary-of-Domain-2-Reliability-and-Business-Continuity/amazon-s3-versioning-features-diagram.jpg)

Amazon S3 supports multiple storage classes, including:

- S3 Standard
- S3 Standard Infrequent Access
- One Zone Infrequent Access
- Glacier Instant Retrieval
- Glacier Flexible Retrieval
- Glacier Deep Archive
- Intelligent Tiering

![The image illustrates a versioning and lifecycle process for data management, showing transitions from current version to deletion over a timeline from August 15, 2017, to October 14, 2018, with specific rules for storage class changes and expiration.](https://kodekloud.com/kk-media/image/upload/v1752861333/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Summary-of-Domain-2-Reliability-and-Business-Continuity/data-management-versioning-lifecycle.jpg)

## S3 Cross-Region Replication

S3 Cross-Region Replication offers disaster recovery benefits, regulatory compliance, improved latency for global applications, and enhanced data protection. It allows data in one bucket to be replicated to another bucket in the same or a different region, with customizable options for ownership override and storage class adjustments.

![The image is an infographic explaining the benefits of Amazon S3 Cross-Region Replication, highlighting features like disaster recovery, compliance requirements, improved latency, and data protection. It includes diagrams of bucket replication and options for data set selection and storage class optimization.](https://kodekloud.com/kk-media/image/upload/v1752861335/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Summary-of-Domain-2-Reliability-and-Business-Continuity/amazon-s3-cross-region-replication-infographic.jpg)

## Conclusion

This lesson on Domain 2 has explored a broad spectrum of AWS resilience and business continuity topics—from fault tolerance and auto scaling to caching, replication, and disaster recovery strategies. By integrating strategies such as loose coupling, effective backup plans, and comprehensive data management solutions, you can design highly resilient cloud architectures.

> [!important]
> **Exam Preparation Tip**
>
> As you continue your studies, use this overview as a refresher and a reference point to reinforce your understanding of AWS resiliency and continuity strategies. For deeper insights, consider exploring the [AWS Documentation](https://aws.amazon.com/documentation/).

Next, we will move on to Domain 3.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/6110feb5-fd80-4769-83cd-4624ebc6a21d/lesson/0851c6e1-1c82-43ec-8be3-d4607c7d1d20)**
>
> Watch video content
