# AWS Question 12 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevOps-Interview-Preparation-Course/AWS/AWS-Question-12)

---

## Table of Contents

- AWS Question 12
  - What Are Read-Replicas?
  - How Lag Occurs
  - Monitoring and Managing Lag
  - Interview Tip: Explaining Replication Lag
  - Watch Video
    - When Lag Happens

---

## Content

DevOps Interview Preparation Course

AWS

# AWS Question 12

In this article, we discuss what lag is in a database read-replica and how it can impact data synchronization and performance.

## What Are Read-Replicas?

A read-replica is a read-only copy of a primary database. While the primary database handles both read and write operations—primarily write operations—the read-replica is designed to offload read requests from the primary instance, enhancing system performance and scalability.

## How Lag Occurs

Consider the following scenario:

1.  An application writes a new record with an ID of 189 to the primary database.
2.  Once the write operation is complete, the system starts copying the new data to the read-replica.
3.  The application then issues a read request for the record with ID 189. Since the replica is optimized for read operations, it serves the request.

Ideally, the new record should be present on the read-replica when the read request is made. However, because replication does not occur instantly, there is often a brief delay—referred to as lag—while the primary database and its read-replica synchronize new changes. This synchronization may happen every millisecond, second, or longer, depending on the workload.

![The image is a diagram illustrating a database architecture with a main database and a read-replica database. It shows data flow, synchronization, and notes about application read access and potential lag.](https://kodekloud.com/kk-media/image/upload/v1752873321/notes-assets/images/DevOps-Interview-Preparation-Course-AWS-Question-12/database-architecture-diagram-replica.jpg)

### When Lag Happens

Lag typically occurs when the primary database is under heavy load or when any issues cause delays in the synchronization process. In such cases, even though the record with ID 189 has been successfully written to the primary database, it may not immediately appear on the read-replica. This delay can be measured in milliseconds, seconds, or even minutes.

> [!important]
> **Key Insight**
>
> Lag in a read-replica is defined as the delay in reflecting the most recent changes from the primary database. Monitoring this lag is critical to ensure data consistency and maintain performance.

## Monitoring and Managing Lag

It is essential to track replication lag to uphold data consistency and ensure optimal performance. AWS RDS provides a dedicated monitoring dashboard that displays the replication lag between the primary database and its read-replica. This tool enables administrators to quickly identify delays and take corrective actions when needed.

![The image is a flowchart illustrating a database system with a main database and a read-replica database, showing data synchronization and read-only access for applications. It includes notes on load handling, synchronization timing, and data update restrictions.](https://kodekloud.com/kk-media/image/upload/v1752873322/notes-assets/images/DevOps-Interview-Preparation-Course-AWS-Question-12/database-system-flowchart-replica.jpg)

If significant lag is detected, administrators typically allow the primary database time to recover from heavy workloads or implement automated alerts and recovery measures. Managed services like [AWS Aurora](https://aws.amazon.com/rds/aurora/) help mitigate these issues by automating many aspects of replication management.

## Interview Tip: Explaining Replication Lag

When facing an interview question about replication lag in a read-replica, you might answer as follows:

"The lag in a read-replica occurs when the replica does not immediately reflect the most recent data written to the primary database. This delay can be due to heavy load or performance issues on the primary database, causing the synchronization process to fall behind. The lag may be measured in milliseconds, seconds, or longer, and AWS provides monitoring tools within the RDS console to track these delays. Managed services like AWS Aurora further reduce the risk of significant lag by automating replication processes."

> [!important]
> **Final Thoughts**
>
> Understanding and managing replication lag is vital for ensuring high performance and data integrity in your database architecture.

This concludes our discussion on replication lag in AWS read-replicas. For further insights and best practices, explore additional resources in [AWS Documentation](https://aws.amazon.com/documentation/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devops-interview-preparation-course/module/f1169a2e-23de-4377-bc4f-a07c136a11d6/lesson/dff652f3-b02d-42c0-8824-db532f6783ab)**
>
> Watch video content
