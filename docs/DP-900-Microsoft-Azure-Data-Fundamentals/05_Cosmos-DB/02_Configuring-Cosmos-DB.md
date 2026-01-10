# Configuring Cosmos DB - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DP-900-Microsoft-Azure-Data-Fundamentals/Cosmos-DB/Configuring-Cosmos-DB)

---

## Table of Contents

- Configuring Cosmos DB
  - 1. Create a Cosmos DB Account
  - 2. Scale Storage with Containers & Partitions
  - 3. Design Effective Partition Keys
  - 4. Configure Consistency Levels
  - 5. Provision Throughput & Manage Request Units (RUs)
  - Links and References
  - Watch Video
    - Estimating & Allocating RUs

---

## Content

DP-900: Microsoft Azure Data Fundamentals

Cosmos DB

# Configuring Cosmos DB

In this guide, you’ll learn how to create and optimize an Azure Cosmos DB account for your global, low-latency applications. We’ll cover account creation, storage scaling, partition key design, consistency tuning, and throughput provisioning.

## 1\. Create a Cosmos DB Account

1.  Sign in to the [Azure portal](https://portal.azure.com).
2.  Go to **Azure Cosmos DB** and click **\+ Create**.
3.  Enter a unique account name, then select your subscription, resource group, and preferred region.
4.  Choose the API for your workload. Options include:
    - Core (SQL)
    - MongoDB
    - Cassandra
    - Gremlin
    - Table
    - Azure Cosmos DB for PostgreSQL

    > [!important]
    > **API Selection**
    >
    > You can select only one API per account. For JSON-like documents or MongoDB migrations, choose **MongoDB**.

    ![The image is a diagram explaining how to define a Cosmos DB using the Azure Portal, showing various APIs like NoSQL, PostgreSQL, and MongoDB, and options for global distribution.](https://kodekloud.com/kk-media/image/upload/v1752872920/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Configuring-Cosmos-DB/cosmos-db-azure-portal-diagram.jpg)

5.  (Optional) Enable **Multi-region writes** to allow write operations in all selected regions.
6.  Add additional regions for global distribution and high availability.

---

## 2\. Scale Storage with Containers & Partitions

Azure Cosmos DB distributes your data across containers and partitions for virtually unlimited storage and throughput:

- **Container**: A logical namespace for your items (documents, rows, edges). Use multiple containers to isolate workloads.
- **Partition**: Each container is automatically sharded into physical partitions up to 20 GB. Proper partition key design ensures balanced data distribution.

![The image illustrates the capacity structure of Cosmos DB, showing how containers are divided into partitions, with each partition having a size limit of 20 GB. It also highlights the ability to add more storage by adding containers.](https://kodekloud.com/kk-media/image/upload/v1752872920/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Configuring-Cosmos-DB/cosmos-db-capacity-structure-partitions.jpg)

| Concept   | Description                                                           |
| --------- | --------------------------------------------------------------------- |
| Container | Namespace for items; scales throughput at container or database level |
| Partition | Physical shard up to 20 GB; automatically managed by Cosmos DB        |

---

## 3\. Design Effective Partition Keys

A well-chosen partition key is crucial for performance and cost optimization:

- Use a property that is frequently present in your queries.
- Ensure high cardinality and even distribution to avoid “hot” partitions.

> [!important]
> **Partition Key Best Practices**
>
> Select a key with many unique values (e.g., `userId` or `orderId`) to spread traffic and storage evenly.

![The image illustrates the concept of partition keys in Cosmos DB, showing how partitions are used to speed up searching and ensure even distribution without hotspots. It includes a diagram with two containers, each containing different regions.](https://kodekloud.com/kk-media/image/upload/v1752872922/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Configuring-Cosmos-DB/cosmos-db-partition-keys-diagram.jpg)

---

## 4\. Configure Consistency Levels

Azure Cosmos DB provides five consistency levels tailored to different SLAs:

| Level             | Latency | Failure Impact      | Guarantee                                            |
| ----------------- | ------- | ------------------- | ---------------------------------------------------- |
| Strong            | High    | Higher failure risk | Reads always see the latest committed write          |
| Bounded Staleness | Medium  | Moderate            | Reads lag by a fixed version interval or time window |
| Session           | Low     | Low                 | Monotonic reads/writes within a session              |
| Consistent Prefix | Low     | Low                 | Reads never see out-of-order writes                  |
| Eventual          | Lowest  | Lowest              | Reads may be stale until replicas catch up           |

![The image illustrates a world map with icons representing data centers or regions, highlighting the flexibility of Cosmos DB in providing complete and eventual consistency. It emphasizes that no write is complete until every region is updated.](https://kodekloud.com/kk-media/image/upload/v1752872923/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Configuring-Cosmos-DB/cosmos-db-world-map-data-centers.jpg)

Choose the level that balances latency, throughput, and your application’s tolerance for stale reads.

---

## 5\. Provision Throughput & Manage Request Units (RUs)

Throughput in Cosmos DB is expressed in **Request Units per second (RUs/sec)**:

- If operations exceed your provisioned RUs, Cosmos DB returns HTTP 429 (throttled) errors.
- Throttled requests are retried automatically based on your retry policy, which can increase response times.

> [!important]
> **Avoid Throttling**
>
> Monitor RU consumption in Azure Monitor. Adjust your retry policy and increase RUs if you observe frequent HTTP 429 errors.

![The image shows a world map highlighting Mumbai with a focus on transaction throughput and a note about exceeding RU limits leading to throttling.](https://kodekloud.com/kk-media/image/upload/v1752872924/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Configuring-Cosmos-DB/mumbai-world-map-transaction-throughput.jpg)

### Estimating & Allocating RUs

1.  Profile your workload: reads/writes per second and item sizes.
2.  Use the [Azure Cosmos DB capacity calculator](https://cosmos.azure.com/capacitycalculator/) for accurate RU estimates.
3.  Provision at:
    - **Database level** – shared across all containers
    - **Container level** – dedicated throughput per container

| Container Name      | Provisioned RUs | Use Case                  |
| ------------------- | --------------- | ------------------------- |
| `shipping-orders`   | 800             | High-traffic transactions |
| `customer-profiles` | 100             | Low-volume user lookups   |
| `inventory`         | 100             | Periodic stock updates    |

---

## Links and References

- [Azure Cosmos DB Documentation](https://learn.microsoft.com/azure/cosmos-db-overview)
- [Azure Cosmos DB RU Calculator](https://cosmos.azure.com/capacitycalculator/)
- [Partitioning in Azure Cosmos DB](https://learn.microsoft.com/azure/cosmos-db/partitioning-overview)
- [Consistency levels in Azure Cosmos DB](https://learn.microsoft.com/azure/cosmos-db/consistency-levels)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/dp-900-microsoft-azure-data-fundamentals/module/06b26525-f54a-46ed-84c1-da4191607325/lesson/963b266c-e71a-41f6-9165-41cf6bdefed0)**
>
> Watch video content
