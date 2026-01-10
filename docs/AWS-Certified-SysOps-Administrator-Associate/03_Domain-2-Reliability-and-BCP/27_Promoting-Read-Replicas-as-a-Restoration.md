# Promoting Read Replicas as a Restoration - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-2-Reliability-and-BCP/Promoting-Read-Replicas-as-a-Restoration)

---

## Table of Contents

- Promoting Read Replicas as a Restoration
  - Understanding AWS Read Replicas
  - Differences in Multi-AZ Deployments
  - Considerations for Standalone Read Replica Setups
  - Steps to Promote a Read Replica
  - Watch Video

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 2 Reliability and BCP

# Promoting Read Replicas as a Restoration

Welcome students,

In this lesson, we explore how promoting read replicas can play a crucial role in the backup and recovery process, particularly when working with AWS RDS. This method offers a flexible way to scale read operations and boost database redundancy.

## Understanding AWS Read Replicas

Consider an RDS database instance configured with asynchronous replication to a read replica. In configurations without multi-AZ support—such as single-instance deployments—the system employs asynchronous replication. Although this may introduce replication lag, the primary database always maintains read/write capability, while the read replica remains read-only.

The primary benefit of this setup is that you can interrupt asynchronous replication to promote the read replica, turning it into a standalone database with full read/write functionality. This process is ideal for offloading read operations, scaling capacity, and ensuring data redundancy through controlled replication.

![The image illustrates the concept of read replicas in databases using Amazon RDS, showing asynchronous replication from a primary DB instance to a read replica for offloading read operations, scaling read capacity, and providing data redundancy. It highlights the benefits of read replicas, such as handling read-heavy workloads and ensuring data availability across regions.](https://kodekloud.com/kk-media/image/upload/v1752860163/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Promoting-Read-Replicas-as-a-Restoration/read-replicas-amazon-rds-diagram.jpg)

This approach is especially useful in scenarios such as cross-region replication, reporting, and creating production database copies for testing and quality assurance.

## Differences in Multi-AZ Deployments

In multi-AZ configurations, the setup behaves differently. For multi-AZ cluster deployments:

- Secondary instances are available for read operations.
- There is a dedicated mechanism to promote a secondary as the primary in the event of a failure.

When the primary instance fails, one of the secondary instances is automatically promoted. The CNAME DNS record is updated immediately, ensuring rapid recovery and high availability. Although the promoted instance is no longer classified as a read replica, it now functions as a synchronous failover copy. This integration can be both a cost-effective and efficient method to maintain high availability.

> [!important]
> **Note**
>
> In single-instance deployments that use multi-AZ, the secondary instance is inaccessible for direct reads because there is no dedicated URL provided.

## Considerations for Standalone Read Replica Setups

For configurations utilizing pure read replicas (i.e., those not part of a multi-AZ deployment), it remains essential to maintain a robust backup strategy. Read replicas are not substitutes for backups; they do not capture point-in-time snapshots. Backups are indispensable for recovering from data corruption or unexpected failures.

Before promoting a read replica, follow these precautions:

- Pause write transactions on the primary database to minimize data inconsistencies.
- Set the read-only parameter to zero in the database parameter group for the replica.  
  This adjustment allows you to perform modifications—such as creating indexes or executing DDL operations—on the replica prior to its promotion.

![The image outlines three prerequisites for promoting a read replica: reviewing backup strategy, stopping write transactions to the primary database, and setting the read-only parameter to 0 in the database parameter group for the read replica.](https://kodekloud.com/kk-media/image/upload/v1752860164/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Promoting-Read-Replicas-as-a-Restoration/read-replica-prerequisites-diagram.jpg)

## Steps to Promote a Read Replica

Follow these steps to successfully promote a read replica:

1.  Verify that the replication state is current.
2.  Identify the appropriate read replica.
3.  Initiate the promotion process (commonly via a right-click action) to break the replication link.
4.  Provide any additional parameters needed, such as backup settings or adjustments to the parameter group.
5.  Monitor the process to ensure that replication has ceased and that the new primary database is functioning correctly.

![The image outlines steps to promote a read replica, including locating the replica, promoting it, configuring promotion settings, and monitoring the replication status. It also shows a database replication table with details on instances and their roles.](https://kodekloud.com/kk-media/image/upload/v1752860165/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Promoting-Read-Replicas-as-a-Restoration/promote-read-replica-steps-diagram.jpg)

AWS has streamlined this process to provide a reliable and straightforward mechanism for database restoration. Whether promoting a replica within the same region or across regions, this technique offers diverse options for maintaining database availability and performance.

That concludes our discussion on promoting read replicas. We look forward to seeing you in the next lesson.

For more information on AWS RDS best practices, visit the [AWS Documentation](https://aws.amazon.com/documentation/rds/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/1b592900-bdef-468a-9a2b-de667b7e9cae/lesson/c60d0660-0d76-44f4-aedb-ca4b3bb14882)**
>
> Watch video content
