# Consistency Levels - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Exploring-Azure-Cosmos-DB/Consistency-Levels)

---

## Table of Contents

- Consistency Levels
  - Consistency Levels in Azure Cosmos DB
  - Comparing Consistency Levels
  - Choosing the Right Consistency Level
  - Deploying an Azure Cosmos DB Account
  - Watch Video
    - Strong Consistency
    - Bounded Staleness
    - Session Consistency
    - Consistent Prefix
    - Eventual Consistency

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Exploring Azure Cosmos DB

# Consistency Levels

Consistency levels define the behavior of read operations in a distributed database. They determine how synchronized or up-to-date the data is across replicas in systems like Azure Cosmos DB, which is globally distributed. Balancing between data accuracy, availability, latency, and throughput, these consistency levels allow you to fine-tune your application performance according to specific requirements.

Below is an in-depth look at the different consistency levels supported by Azure Cosmos DB.

## Consistency Levels in Azure Cosmos DB

### Strong Consistency

Strong consistency guarantees that every read returns the most recent committed version of an item. This means once a write operation is acknowledged, all subsequent reads reflect that write immediately. This level is ideal for scenarios where data precision is critical, such as financial applications. However, it may incur higher latency and lower throughput due to the strict synchronization required.

> [!important]
> **Important**
>
> Ensure that strong consistency is used in scenarios where data correctness is paramount, even if it might affect performance.

### Bounded Staleness

Bounded staleness allows reads to lag behind writes by a specified interval, sequence number, or a defined number of operations. For instance, you can configure your system to return data that is X seconds or Y versions old. This option offers a middle ground between strong consistency and high availability, making it suitable when a slight delay is acceptable.

### Session Consistency

Session consistency offers consistent reads and writes within a single session. In this model, data modifications made during a session are immediately visible within that same session, even if there might be some divergence across different sessions or users. This level is perfect for user-centric applications, ensuring that the user’s interactions remain internally consistent.

### Consistent Prefix

Consistent prefix maintains the order of data updates across replicas. Although it may not immediately reflect the latest updates, it guarantees that all responses preserve the sequence in which writes occurred, preventing out-of-order data. This consistency level is especially useful for event logging systems where maintaining chronological order is essential.

### Eventual Consistency

Eventual consistency is the most lenient model, where reads may not reflect the very latest writes, but all replicas eventually converge to the same state. It is optimized for high availability, low latency, and high throughput, making it ideal for applications such as social media feeds or product catalogs, where real-time precision is less critical.

As you move from strong to eventual consistency, the guarantee of data accuracy decreases while improvements in availability, latency, and throughput increase.

![The image illustrates a spectrum of consistency levels in databases, ranging from "Strong" to "Eventual," with stronger consistency on the left and weaker consistency on the right. It also notes that higher availability, lower latency, and higher throughput are associated with weaker consistency.](https://kodekloud.com/kk-media/image/upload/v1752866438/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Consistency-Levels/database-consistency-spectrum-diagram.jpg)

## Comparing Consistency Levels

Understanding how consistency levels impact data consistency, application availability, latency, and throughput is crucial. The table below summarizes these trade-offs:

| Criterion        | Strong Consistency | Bounded Staleness | Session Consistency | Consistent Prefix | Eventual Consistency |
| ---------------- | ------------------ | ----------------- | ------------------- | ----------------- | -------------------- |
| Data Consistency | Highest            | High              | Moderate            | Moderate          | Lowest               |
| App Availability | Limited            | Moderate          | Good                | Good              | Highest              |
| Latency          | High               | Moderate          | Low                 | Low               | Lowest               |
| Throughput       | Lower              | Moderate          | Higher              | Higher            | Highest              |

![The image is a table comparing different consistency levels (Strong, Bounded Staleness, Session, Consistent Prefix, Eventual) across four criteria: Data Consistency, App Availability, Latency, and Throughput. Each criterion is represented by filled or partially filled circles indicating varying levels of performance.](https://kodekloud.com/kk-media/image/upload/v1752866444/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Consistency-Levels/consistency-levels-comparison-table.jpg)

Selecting the right consistency level is critical for exam scenarios and practical applications. Your choice should align with your application’s needs for correctness, availability, and performance.

## Choosing the Right Consistency Level

Azure Cosmos DB offers a range of consistency levels tailored for diverse use cases and APIs. Consider the following guidelines when making your selection:

- **Session Consistency:** Ideal for many user-centric applications due to its balanced approach. It ensures that within a session, reads and writes are consistent.
- **Bounded Staleness Consistency:** Best for scenarios where global data freshness is required with a tolerable delay.
- **Eventual Consistency:** Recommended when the primary focus is on high availability and low latency, and immediate synchronization is not crucial.

For wire protocol–compatible APIs like MongoDB, Cassandra, and Gremlin, Cosmos DB provides native support while allowing you to choose the consistency level that best meets your needs. With MongoDB and Cassandra APIs, you can set the consistency level explicitly, whereas for Apache Gremlin, the account’s default consistency level applies unless configured otherwise.

> [!important]
> **Key Insight**
>
> Note that the probability-bounded staleness metric in Cosmos DB can help predict how often a stronger consistency level might effectively be achieved compared to the configured setting, highlighting the trade-offs involved.

![The image illustrates the concept of choosing the right consistency level for Azure Cosmos DB, showing options for Tables and NoSQL.](https://kodekloud.com/kk-media/image/upload/v1752866446/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Consistency-Levels/azure-cosmos-db-consistency-levels.jpg)

## Deploying an Azure Cosmos DB Account

After understanding consistency guarantees, the next step is to deploy an Azure Cosmos DB account. Use the Azure Portal to set up your environment by following these steps:

1.  Log in to the [Azure Portal](https://portal.azure.com/) and select the option to create a new Azure Cosmos DB account.
2.  Choose the appropriate API (for example, the NoSQL native API).
3.  Create a new resource group if needed.
4.  Enter a unique Cosmos DB account name (e.g., AZ-204-Cosmos-DB-01). Account names must be unique across Azure; reserved words or names already in use will be rejected.
5.  Configure additional settings such as:
    - **Availability Zones and Region:** Select the optimal region for your workload.
    - **Throughput:** Choose between provisioned throughput (with a free tier option of the first 1000 Request Units and 25 GB of storage) or a serverless configuration.
    - **Networking, Backup Policy, and Encryption:** Decide whether to use service-managed or customer-managed encryption keys.

![The image shows a web interface for creating an Azure Cosmos DB account, with fields for project and instance details, including subscription, resource group, and account name. A pop-up window is open for creating a new resource group.](https://kodekloud.com/kk-media/image/upload/v1752866449/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Consistency-Levels/azure-cosmos-db-account-creation.jpg)

After configuring these options, validate the settings and click "Create" to deploy your Azure Cosmos DB account. Once the account is provisioned, you can proceed to create a database and multiple containers to store your JSON documents (items).

![The image shows a Microsoft Azure portal page for creating an Azure Cosmos DB account for NoSQL, displaying configuration details like subscription, resource group, location, and backup policy.](https://kodekloud.com/kk-media/image/upload/v1752866450/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Consistency-Levels/azure-cosmos-db-account-creation-2.jpg)

The next section will guide you on managing and querying your data using the Azure Cosmos DB .NET libraries.

Thank you for following along. This concludes our comprehensive overview of Azure Cosmos DB consistency levels. For additional resources on Azure and distributed databases, visit the [Azure Documentation](https://docs.microsoft.com/en-us/azure/cosmos-db/) and the [Cosmos DB Overview](https://docs.microsoft.com/en-us/azure/cosmos-db/introduction).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/4324d56c-2a24-4e04-8462-56f31e16be95/lesson/1e985e41-a3f4-4e61-8a05-f2b9a70f639b)**
>
> Watch video content
