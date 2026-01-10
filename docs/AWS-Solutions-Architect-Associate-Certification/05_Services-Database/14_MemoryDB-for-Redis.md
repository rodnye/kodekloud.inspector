# MemoryDB for Redis - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Database/MemoryDB-for-Redis)

---

## Table of Contents

- MemoryDB for Redis
  - MemoryDB Components
  - Use Cases and Benefits
  - Watch Video
    - Clusters and Nodes
    - Shards
    - Other Key Components

---

## Content

AWS Solutions Architect Associate Certification

Services Database

# MemoryDB for Redis

In this lesson, we explore AWS MemoryDB for Redis—a fully managed, Redis-compatible, in-memory database service engineered for high performance and streamlined architecture.

MemoryDB for Redis allows you to consolidate both caching and primary data storage into a single database instance. Unlike ElastiCache for Redis—which is typically deployed as a caching layer to offload frequently accessed data from primary databases (like SQL databases)—MemoryDB simplifies your architecture by using Redis as your main database. This consolidation offers microsecond read latencies, low single-digit millisecond writes, and enterprise-grade security with scalability.

## MemoryDB Components

Let's dive into the key components of MemoryDB and see how they work together.

### Clusters and Nodes

A MemoryDB cluster consists of one or more nodes serving a single dataset. Within each cluster:

- The **primary node** manages both read and write requests.
- **Replica nodes** handle read requests, offloading the primary node to improve read scalability.

![The image illustrates the components of Amazon MemoryDB for Redis, showing a cluster with a primary node and two replica nodes, along with read and write operations from a computer.](https://kodekloud.com/kk-media/image/upload/v1752865174/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-MemoryDB-for-Redis/amazon-memorydb-redis-cluster-diagram.jpg)

In the event of a primary node failure, a replica can be promoted to become the new primary, ensuring high availability. Each node runs on an EC2 instance using the selected version of Redis and belongs to a shard within the cluster.

### Shards

MemoryDB partitions the dataset across shards. Each shard contains:

- One primary node dedicated to write operations.
- Up to five replicas that serve read requests.

Every cluster features at least one shard, ensuring that workload distribution and scalability are maintained as your data grows.

### Other Key Components

- **Parameter Groups:** Named collections of engine-specific parameters and configuration settings applied to your cluster.
- **Subnet Groups:** Ensure that only designated traffic has access to your cluster.
- **Access Control Lists:** Define user permissions for executing Redis commands and accessing data.

![The image is a diagram illustrating the components of Amazon MemoryDB for Redis, showing a cluster with primary and replica nodes, parameter groups, subnet groups, and access control lists.](https://kodekloud.com/kk-media/image/upload/v1752865175/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-MemoryDB-for-Redis/amazon-memorydb-redis-diagram.jpg)

MemoryDB stores your entire dataset in memory while employing a distributed multi-AZ transactional log for durability, consistency, and recoverability. By replicating data across multiple availability zones, MemoryDB supports swift recovery and restarts. Its in-memory architecture ensures ultra-fast performance and high throughput compared to traditional disk-based databases.

![The image is a diagram illustrating the components of Amazon MemoryDB for Redis, showing a cluster with a primary node, replicas, and a multi-AZ transactional log, along with read and write operations.](https://kodekloud.com/kk-media/image/upload/v1752865176/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-MemoryDB-for-Redis/amazon-memorydb-redis-diagram-2.jpg)

Scaling is versatile with MemoryDB:

- **Horizontally:** Add or remove nodes (replicas or shards) to scale as required.
- **Vertically:** Choose different node types to meet performance demands.
- Write throughput can be enhanced by adding additional shards, and read throughput can be improved by increasing the number of read replicas.

## Use Cases and Benefits

MemoryDB for Redis caters to various workloads that demand high performance and low latency. Here are some common use cases:

| Use Case                          | Description                                                                                                                                                                  |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Web and Mobile Applications       | Use Redis data structures to deliver personalized experiences, manage user profiles, store preferences, and track inventories with extremely fast read and write operations. |
| Online Gaming                     | Build robust data stores for player data, session histories, and leaderboards that demand massive scale and high concurrency for real-time updates.                          |
| Streaming Media and Entertainment | Support high concurrency for streaming data feeds, ingest user activity, and process millions of requests per day seamlessly.                                                |

> [!important]
> **Note**
>
> MemoryDB’s ability to serve both as a primary database and cache simplifies your architecture by reducing the overhead of managing separate systems for caching and primary data storage.

![The image shows four use cases for technology applications: building web and mobile applications, quickly accessing customer data, online games, and streaming media and entertainment. Each use case is represented with an icon and a brief description.](https://kodekloud.com/kk-media/image/upload/v1752865177/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-MemoryDB-for-Redis/technology-use-cases-applications.jpg)

In summary, AWS MemoryDB for Redis is a managed service that combines high throughput, low latency, and simplified database management. It is an ideal solution for applications requiring fast, reliable, and scalable data operations—making it a strong choice for modern, high-demand workloads.

![The image is a summary of MemoryDB, highlighting its features as an AWS managed service offering a Redis-compatible, in-memory database with high performance and low latency. It emphasizes microsecond read and millisecond write latencies for demanding applications.](https://kodekloud.com/kk-media/image/upload/v1752865179/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-MemoryDB-for-Redis/memorydb-aws-redis-summary.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/9fb73cb5-caf2-4dc2-ad5c-fe5fe69507e3/lesson/aac177b8-0b74-44e6-9191-591be98db35f)**
>
> Watch video content
