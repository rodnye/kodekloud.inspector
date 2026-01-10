# Keyspaces - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Database/Keyspaces)

---

## Table of Contents

- Keyspaces
  - Throughput Capacity Modes
  - AWS Keyspaces Architecture
  - Multi-Region Capabilities
  - Key Use Cases
  - Summary
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Database

# Keyspaces

AWS Keyspaces is a fully managed, serverless Apache Cassandra database service designed to deliver fast, scalable, and highly available NoSQL solutions. Built on Apache Cassandra’s renowned performance for rapid read and write operations, AWS Keyspaces eliminates the operational complexity of managing a Cassandra cluster, such as scaling, node management, and specialized expertise.

![The image is a diagram explaining why AWS Keyspaces is needed, highlighting Cassandra's fast read-and-write performance, challenges, and the requirement for special skill sets.](https://kodekloud.com/kk-media/image/upload/v1752865166/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Keyspaces/aws-keyspaces-cassandra-diagram.jpg)

By offloading critical tasks like provisioning, patching, and scaling of the underlying infrastructure, AWS Keyspaces allows you to concentrate on developing your applications. Its serverless architecture means you pay only for the resources you consume, while the service automatically scales table capacity based on your traffic patterns.

In a traditional Apache Cassandra setup, you must manage a cluster of nodes—often spanning hundreds of machines across multiple data centers. This setup demands constant oversight using Cassandra Query Language (CQL), a SQL-like interface. With AWS Keyspaces, this complexity is removed, offering a fully managed environment compatible with your existing CQL queries.

## Throughput Capacity Modes

AWS Keyspaces supports two distinct throughput capacity modes for handling read and write operations:

- **On-Demand:**  
  With on-demand capacity, you pay solely for the reads and writes your application executes. There is no need to pre-allocate throughput, making it ideal for workloads with unpredictable traffic fluctuations.

![The image is a diagram explaining AWS Keyspaces for Apache Cassandra, highlighting two options: On-Demand and Provisioned, with their respective features.](https://kodekloud.com/kk-media/image/upload/v1752865167/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Keyspaces/aws-keyspaces-apache-cassandra-diagram.jpg)

- **Provisioned:**  
  For applications with predictable traffic, the provisioned mode allows you to specify the required throughput in advance. This approach not only optimizes cost but also provides the option for automatic scaling, with adjustments allowed once per day to align with changing usage patterns.

> [!important]
> **Note**
>
> For predictable workloads, provisioning capacity provides a straightforward way to manage costs while maintaining high performance.

## AWS Keyspaces Architecture

The AWS Keyspaces architecture is designed for seamless operation and high availability. When a client—using Cassandra drivers, CQLSH, or the AWS Keyspaces console—submits a CQL statement, AWS Keyspaces processes the request and stores three copies of your data across separate Availability Zones. This design not only ensures high availability but also integrates features such as encryption at rest and robust security with AWS IAM and VPC endpoints. Additionally, AWS Keyspaces automatically handles data expiration with Time to Live (TTL) management.

![The image illustrates the architecture of AWS Keyspaces, showing connections between Cassandra drivers, cqlsh, and the Amazon Keyspaces console to encrypted storage, with features like compatibility with Cassandra Query Language (CQL) and fully managed Time to Live (TTL).](https://kodekloud.com/kk-media/image/upload/v1752865168/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Keyspaces/aws-keyspaces-architecture-diagram.jpg)

## Multi-Region Capabilities

AWS Keyspaces also supports multi-region replication, which is essential for global applications. When you create a multi-region keyspace, each AWS region hosts a replica of your tables with an identical schema. Data written to one region is asynchronously replicated to other regions—typically with less than one second delay—ensuring that both reads and writes are served locally with single-digit millisecond latencies.

> [!important]
> **Key Benefit**
>
> Regional replication enhances business continuity by allowing your application to seamlessly switch to healthy regions in the event of a regional outage. The storage-based replication mechanism ensures high throughput even during replication activities.

Conflict resolution for simultaneous writes in different regions is automatically managed by AWS Keyspaces, ensuring data consistency across your deployments.

![The image illustrates AWS Keyspaces' multi-region replication with a world map showing interconnected locations, alongside benefits like global reads and writes, improved business continuity, high-speed replication, and consistency.](https://kodekloud.com/kk-media/image/upload/v1752865169/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Keyspaces/aws-keyspaces-multi-region-replication.jpg)

## Key Use Cases

AWS Keyspaces is ideal for applications that require low latency and are built on open-source technologies. It is particularly well-suited for:

- Industrial equipment monitoring
- Trade monitoring
- Fleet management and route optimization

By leveraging AWS Keyspaces, developers can focus more on application logic without the burden of manually managing complex Cassandra clusters.

![The image shows three use cases for Cassandra: applications requiring low latency, open-source Cassandra APIs, and migrating Cassandra workloads to the cloud.](https://kodekloud.com/kk-media/image/upload/v1752865169/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Keyspaces/cassandra-use-cases-low-latency-apis-cloud.jpg)

## Summary

AWS Keyspaces simplifies the deployment, management, and scaling of Apache Cassandra database tables by offering both on-demand and provisioned capacity models. Its architecture guarantees high availability, global replication, and seamless compatibility with Cassandra Query Language (CQL). Whether you are handling unpredictable or steady workloads, AWS Keyspaces provides the necessary scalability, security, and performance for modern applications.

![The image is a summary of Amazon Keyspaces, highlighting its scalability, management of Cassandra tables, and on-demand capacity features. It includes three main points with a gradient background and numbered icons.](https://kodekloud.com/kk-media/image/upload/v1752865171/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Keyspaces/amazon-keyspaces-summary-scalability.jpg)

For users with predictable workloads, the provisioned capacity mode lets you define the precise number of reads and writes your application needs, enabling cost optimization while maintaining optimal performance.

![The image is a slide titled "Summary Keyspaces" with points about predictable workloads and compatibility with Cassandra Query Language (CQL). It features a gradient background and numbered bullet points.](https://kodekloud.com/kk-media/image/upload/v1752865172/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Keyspaces/summary-keyspaces-predictable-workloads.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/9fb73cb5-caf2-4dc2-ad5c-fe5fe69507e3/lesson/32498a11-a111-4ebf-b3d9-075c9cdc17fe)**
>
> Watch video content
