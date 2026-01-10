# Design for database availability - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-305-Microsoft-Azure-Solutions-Architect-Expert/Design-a-relational-data-storage-solution/Design-for-database-availability)

---

## Table of Contents

- Design for database availability
  - High Availability Models in SQL Database
  - Standard Availability Model
  - Premium Availability Model
  - Hyperscale Model
  - Failover Strategies
  - Summary
  - Watch Video

---

## Content

AZ-305: Microsoft Azure Solutions Architect Expert

Design a relational data storage solution

# Design for database availability

In this article, we discuss the various models available to ensure high availability in SQL Database. We cover three primary tiers that address differing performance, scalability, and resiliency needs: Standard, Premium, and Hyperscale.

## High Availability Models in SQL Database

SQL Database provides three tiers of availability based on the selected performance model:

1.  **Standard Availability Model:** Activated when you select the basic/standard tier (DTU model) or the general-purpose option from the vCore model.
2.  **Premium Availability Model:** Utilized when opting for the premium tier in the DTU model or the business-critical tier in the vCore model.
3.  **Hyperscale Model:** Chosen when using the hyperscale tier.

![The image is an infographic titled "High Availability in SQL Database" by KodeKloud, featuring a 3D puzzle cube with labels for different SQL models: Standard, Premium, and Hyperscale.](https://kodekloud.com/kk-media/image/upload/v1752867171/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-database-availability/high-availability-sql-database-infographic.jpg)

These models differ significantly in their underlying architectures, though the complex details are abstracted since SQL Database is provided as a Platform as a Service (PaaS). Below, we explore the architecture behind each model.

## Standard Availability Model

In the Standard Model, the compute and storage layers are decoupled:

- **Compute Layer:** Hosts the SQL Server executable along with TempDB and cache data.
- **Storage Layer:** Houses the database files on Azure Premium Storage, leveraging replication options like GRS, LRS, or ZRS to maintain backup redundancy.

![The image is an infographic explaining the "Standard Model – General Purpose / Standard / Basic" for database availability in Azure, highlighting the separation of compute and storage layers, use of Azure Storage for database files, and backup implementation. It includes a diagram showing the flow between application, primary replica, and storage.](https://kodekloud.com/kk-media/image/upload/v1752867172/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-database-availability/azure-database-availability-infographic.jpg)

> [!important]
> **Key Highlights**
>
> - The architecture shows a primary replica with secondary replicas across different nodes.
> - The compute layer is dedicated to running SQL Server.exe, whereas the storage layer secures database files.
> - Azure Storage is employed for backup operations, ensuring redundancy in case of compute layer issues.

This is the architecture utilized when opting for the general-purpose, standard, or basic tier.

## Premium Availability Model

The Premium Model integrates both compute and storage within a single node. Key characteristics include:

- **Integrated Architecture:** SQL Server executable and directly attached SSD storage co-exist on the same server.
- **Multi-Node Cluster:** Typically deployed in clusters of three or four nodes for high availability.
- **Designed for OLTP Applications:** Ensures high transaction rates and ultra-low I/O latency.

![The image is an infographic from KodeKloud explaining the Premium Model for Business Critical/Premium databases, highlighting features like high transaction rates, low latency, and data replication using Azure's AlwaysON Availability Group. It includes a diagram showing the architecture with primary and secondary replicas, SSD storage, and Azure standard storage for backups.](https://kodekloud.com/kk-media/image/upload/v1752867173/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-database-availability/premium-database-model-infographic.jpg)

> [!important]
> **Key Highlights**
>
> - Primary replica leverages directly attached SSD storage to minimize latency.
> - All write operations occur on the primary replica. An Always On Availability Group ensures data is replicated to secondary nodes before commit.
> - Backup processes continue to use Azure Storage.
> - Managed entirely by Microsoft when deploying a business-critical or premium tier.

## Hyperscale Model

The Hyperscale Model is designed for complex and high business-critical workloads. Its multi-layered approach includes:

1.  **Stateless Compute Layer:** Runs SQL Server.exe, manages transient data, cache, and operates in a primary/secondary configuration.
2.  **Stateless Storage Layer:** A distributed storage engine, featuring page servers that cache transient and processed data.
3.  **Stateful Transaction Log Layer:** Captures all transactions from the primary compute and replicates log and cache data to secondary compute nodes.
4.  **Stateful Storage Layer:** Preserves the definitive database files, ensuring data integrity even if compute nodes encounter failures.

![The image illustrates the Hyperscale Model for database availability, detailing its architecture with components like stateless compute and storage layers, stateful transaction log layers, and Azure storage integration. It includes a diagram showing the flow between compute nodes, page servers, and log services.](https://kodekloud.com/kk-media/image/upload/v1752867175/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-database-availability/hyperscale-database-availability-diagram.jpg)

> [!important]
> **Key Highlights**
>
> - The compute layer directly handles read/write operations along with running the SQL Server process.
> - Page servers (stateless storage) manage transient and cached data.
> - A dedicated log service layer ensures all transactions and cache data are replicated.
> - This model is ideal for workloads that demand extremely low latency and high data integrity.

## Failover Strategies

While these models are generally deployed within a single data center, additional strategies are essential to mitigate complete data center or regional failures:

1.  **Availability Zones:** Within the premium tier, distributing compute nodes across multiple availability zones protects against data center-level failures. If one zone fails, the remaining zones ensure continuous operation.
2.  **Geo-Replication:** For regional failures, geo-replication involves duplicating the SQL Database to a secondary logical server in a different region. The primary server handles read/write operations while redirecting read-only requests to the secondary. In the event of a primary region failure, the secondary region assumes full operations.

![The image illustrates a failover strategy for high availability using Azure Traffic Manager, showing the setup of primary and secondary replicas across different availability zones and regions. It includes diagrams of traffic flow, replication, and backup storage configurations.](https://kodekloud.com/kk-media/image/upload/v1752867176/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-database-availability/azure-traffic-manager-failover-strategy.jpg)

> [!important]
> **Failover Strategies Overview**
>
> - **Availability Zones:** Ensure continuity within the same region.
> - **Geo-Replication:** Provides robust protection across different regions with automatic failover capabilities.

## Summary

To summarize, SQL Database availability can be achieved through different architectural models tailored for specific business needs:

| Availability Model | Key Features                                                                                          | Ideal For                                                                      |
| ------------------ | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Standard           | Decoupled compute and storage; Azure Storage for backups; replication options (GRS, LRS, ZRS)         | General-purpose workloads                                                      |
| Premium            | Integrated compute and storage on SSD; Always On Availability Group for failover; low I/O latency     | OLTP applications and high transaction rates                                   |
| Hyperscale         | Multi-layer architecture with stateless and stateful components; advanced transaction log replication | High business-critical workloads requiring extreme scalability and low latency |

This concludes our discussion on SQL Database availability models. In the next section, we will explore advanced data security strategies to further safeguard your SQL Database deployments.

For more detailed technical guidance, refer to the [Microsoft Azure Documentation](https://docs.microsoft.com/) and [SQL Database best practices](https://docs.microsoft.com/en-us/azure/azure-sql/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-305-microsoft-azure-solutions-architect-expert/module/9697e3cc-0c47-4c28-aac7-fd0fcc89cdb2/lesson/526e07c9-423c-4165-93d9-545908cbe6c2)**
>
> Watch video content
