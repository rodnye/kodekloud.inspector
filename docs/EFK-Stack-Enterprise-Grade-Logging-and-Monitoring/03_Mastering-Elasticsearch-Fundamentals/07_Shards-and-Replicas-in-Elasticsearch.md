# Shards and Replicas in Elasticsearch - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring/Mastering-Elasticsearch-Fundamentals/Shards-and-Replicas-in-Elasticsearch)

---

## Table of Contents

- Shards and Replicas in Elasticsearch
  - Understanding the Scenario
  - The Role of Shards
  - The Importance of Replicas
  - Putting It All Together
  - Watch Video
    - Key Benefits of Replicas

---

## Content

EFK Stack: Enterprise-Grade Logging and Monitoring

Mastering Elasticsearch Fundamentals

# Shards and Replicas in Elasticsearch

Previously, we explored what indexes are in Elasticsearch. In this discussion, we dive deeper into the critical concepts of shards and replicas and how they work together to ensure efficient data distribution, fault tolerance, and high availability in your Elasticsearch clusters.

## Understanding the Scenario

Imagine you have multiple servers with Elasticsearch installed. In this setup, you maintain two indices: one for web application logs (web_app_logs) and another for login application logs (login_app_logs). The logs from your web application are stored in the web_app_logs index, while the login_app_logs index contains logs from your login application.

![The image illustrates the concept of shards and replicas in Elasticsearch, showing two indices ("web_app_logs" and "login_app_logs") distributed across multiple servers.](https://kodekloud.com/kk-media/image/upload/v1752874261/notes-assets/images/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring-Shards-and-Replicas-in-Elasticsearch/elasticsearch-shards-replicas-indices.jpg)

> [!important]
> **Note**
>
> In production environments, infrastructure challenges are inevitable. For instance, if one node in your Elasticsearch cluster fails, the indices hosted there are at risk. Without proper replication, losing a node could result in the loss of critical data.

## The Role of Shards

Replicating an entire index might seem like an idea, but for massive datasets—such as terabytes of log files—it becomes impractical. Elasticsearch addresses this challenge by using shards to break the index into smaller, manageable pieces.

Consider a 1-terabyte login_app_logs index. By dividing this index into 4 shards, each shard would be roughly 256 GB. This segmentation has several key benefits:

- **Efficient Data Management:** Each shard acts like a self-contained index that stores and processes a portion of the overall dataset.
- **Parallel Processing:** Shards allow for parallel search and indexing, which significantly boosts performance.
- **Enhanced Fault Tolerance:** If a node fails, Elasticsearch can relocate the affected shards to other nodes, ensuring data remains accessible.

![The image illustrates the concept of shards and replicas in Elasticsearch, showing a 1 TB index divided into four shards.](https://kodekloud.com/kk-media/image/upload/v1752874262/notes-assets/images/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring-Shards-and-Replicas-in-Elasticsearch/elasticsearch-shards-replicas-diagram.jpg)

As your dataset grows and query load increases, you can scale horizontally by adding more nodes to your cluster. Elasticsearch continuously monitors the cluster and dynamically rebalances shards across available nodes to distribute processing loads evenly. Remember that the choice of shard size is critical—larger shards may benefit bulk indexing, whereas smaller shards provide more flexibility for rebalancing and scaling. Once an index is created, the number of primary shards cannot be changed, so careful planning during the creation phase is crucial.

## The Importance of Replicas

While shards improve scalability and parallelism, they alone do not guarantee fault tolerance. This is where replicas come in. A replica is an exact copy of a shard, and its primary functions include:

- **Data Redundancy:** Multiple copies of your data ensure that even if one node fails, the information remains available.
- **Increased Read Capacity:** Distributing read operations across several nodes reduces the load on individual nodes and enhances performance during peak times.
- **Automated Shard Allocation and Recovery:** Elasticsearch automatically allocates replicas across the cluster and promotes a replica to a primary shard if a node fails.
- **Zero Downtime Scaling:** The dynamic allocation of replicas supports seamless scaling, allowing nodes to be added or removed without any downtime.

![The image illustrates the distribution of shards and replicas across four nodes in an Elasticsearch cluster, with each shard and replica being 256GB in size.](https://kodekloud.com/kk-media/image/upload/v1752874263/notes-assets/images/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring-Shards-and-Replicas-in-Elasticsearch/elasticsearch-shards-replicas-nodes.jpg)

> [!important]
> **Important**
>
> Each shard in your Elasticsearch cluster should have a corresponding replica to ensure high availability. For example, consider Shard A on Node 1; it is replicated as Replica 1 on Node 2. This replication strategy guarantees that your data remains accessible even if a node becomes unavailable.

### Key Benefits of Replicas

| Benefit                   | Description                                                                       |
| ------------------------- | --------------------------------------------------------------------------------- |
| Data Redundancy           | Multiple copies of data across different nodes protect against node failures.     |
| Enhanced Read Performance | Distributing read requests reduces individual node load and improves query speed. |
| Automated Shard Recovery  | If a primary shard fails, a replica is automatically promoted to primary.         |
| Seamless Scaling          | Replicas facilitate the addition or removal of nodes without causing downtime.    |

## Putting It All Together

To visualize the complete operation within an Elasticsearch cluster, consider a scenario where a 1 TB login_app_logs index is distributed over 4 nodes (Shard A, Shard B, Shard C, and Shard D, each about 256 GB). If Node 1, housing Shard A, goes down, the replicated Shard A on Node 2 ensures that your data remains safe and accessible.

![The image illustrates the benefits of replicas in Elasticsearch, highlighting features like data redundancy, increased read capacity, automatic shard allocation, and zero downtime scaling.](https://kodekloud.com/kk-media/image/upload/v1752874264/notes-assets/images/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring-Shards-and-Replicas-in-Elasticsearch/elasticsearch-replicas-benefits-diagram.jpg)

In summary, the combination of shards and replicas forms a robust foundation for deploying Elasticsearch in a production environment. While shards manage large datasets by breaking them into smaller pieces, replicas guarantee data redundancy and operational continuity. Balancing these two features is essential for maintaining high availability, optimal performance, and fault tolerance in your Elasticsearch clusters.

This concludes our discussion on shards and replicas in Elasticsearch. Thank you for reading.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/efk-stack-enterprise-grade-logging-and-monitoring/module/a70164d0-faba-407d-a6e8-4e227044c3aa/lesson/835a93c6-d98e-4544-b147-a5b11c08a8cc)**
>
> Watch video content
