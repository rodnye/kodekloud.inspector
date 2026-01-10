# Exam TIps - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Databases/Exam-TIps)

---

## Table of Contents

- Exam TIps
  - Amazon RDS
  - Amazon Aurora
  - Amazon RDS Proxy
  - Amazon DynamoDB
  - ElastiCache and MemoryDB
  - Conclusion
  - Watch Video
    - Capacity Modes
    - Capacity Calculations
    - Consistency and Throttling
    - Common API Operations
    - ElastiCache
    - MemoryDB
      - Indexes
      - Advanced Features

---

## Content

AWS Certified Developer - Associate

Databases

# Exam TIps

This article reviews several key AWS exam concepts, starting with RDS, and covers services such as Aurora, DynamoDB, ElastiCache, and MemoryDB. Understanding these services will help you tackle exam questions related to scalability, throughput management, high availability, and more.

---

## Amazon RDS

Amazon Relational Database Service (RDS) is a managed relational database service that offloads the heavy lifting of database administration tasks such as patching, backups, and security. RDS supports multiple database engines, including PostgreSQL, MySQL, and MariaDB, and provides features such as:

- Automated provisioning and patching
- Continuous backups
- High availability across multiple availability zones
- Automatic storage scaling
- Snapshots backed up on EBS

If the master instance experiences high CPU due to increased read requests, RDS allows the configuration of up to 15 asynchronous read replicas (with the exception of standby databases in different AZs, which are synchronized synchronously and might incur extra network fees). In the event of a master failure, the DNS record automatically fails over to a standby database.

![The image provides exam tips for AWS RDS, highlighting its features such as being a managed relational database service, supporting various database engines, and offering high availability and automated backups.](/images/AWS-Certified-Developer-Associate-Exam-TIps/aws-rds-exam-tips-features.jpg)

---

## Amazon Aurora

Aurora is a fully managed, high-performance database management system compatible with both PostgreSQL and MySQL. It is engineered to deliver up to five times the throughput of MySQL and three times that of PostgreSQL. Key features include:

- Replication across three availability zones (AZs) with six copies of data
- A primary instance handling read/write operations and replicas for read-only tasks
- Automatic failover via replica promotion if the primary fails
- Self-healing storage that continuously detects and repairs errors
- Two distinct endpoints:
  - A reader endpoint that distributes requests among read replicas
  - A writer endpoint that directs connections to the primary instance

![The image provides exam tips for Amazon Aurora, highlighting its compatibility with Postgres and MySQL, increased throughput, data replication across availability zones, and the roles of primary and replica instances.](/images/AWS-Certified-Developer-Associate-Exam-TIps/amazon-aurora-exam-tips.jpg)

---

## Amazon RDS Proxy

RDS Proxy is a fully managed database proxy designed for RDS. It efficiently pools connections to reduce the overhead of frequently opening and closing connections, thus conserving CPU and memory on your database instance.

> [!important]
> **Exam Tip**
>
> For scenarios where high CPU usage is observed due to a large number of open connections or frequent connection churn, consider implementing RDS Proxy.

![The image provides exam tips for Amazon RDS Proxy, highlighting its benefits such as efficient connection pooling, minimizing open connections, and conserving CPU and memory resources.](/images/AWS-Certified-Developer-Associate-Exam-TIps/amazon-rds-proxy-exam-tips.jpg)

---

## Amazon DynamoDB

Amazon DynamoDB is a fully managed NoSQL database service ideal for handling large volumes of unstructured data with flexible schema design. It automatically scales horizontally to accommodate workload demands and integrates seamlessly with AWS IAM and other services. Key aspects include:

- **Data Organization:**
  - Data is stored in tables containing items (records) with attributes.
  - Each item requires a primary key that can be a simple partition key or a composite key (partition key plus sort key).
- **Querying Data:**
  - PartiQL provides a familiar SQL-like syntax for querying tables.

### Capacity Modes

DynamoDB provides two capacity options:

| Capacity Mode | Description                                                                                                                                                |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Provisioned   | You specify read (RCUs) and write (WCUs) capacities in advance. Unused capacity is still billed, but burst capacity is available until limits are reached. |
| On-Demand     | Automatically scales with your workload. This is ideal for unpredictable workloads, though more expensive as you only pay for what you use.                |

> [!important]
> **Capacity Calculation Reminder**
>
> A single read capacity unit (RCU) supports one strongly consistent read per second, or two eventually consistent reads per second (for items up to 4 KB). A write capacity unit (WCU) supports one write per second (for items up to 1 KB).

![The image provides exam tips for DynamoDB, highlighting its features as a NoSQL database designed for handling large volumes of unstructured data, automatic scaling, low latency, and integration with IAM for security. It also explains that data is stored in tables, which comprise items and attributes.](/images/AWS-Certified-Developer-Associate-Exam-TIps/dynamodb-exam-tips-features.jpg)

---

### Capacity Calculations

- 1 RCU = 1 strongly consistent read per second OR 2 eventually consistent reads per second (for items up to 4 KB).
- 1 WCU = 1 write per second (for items up to 1 KB).

Eventually consistent reads might return outdated data immediately after a write whereas strongly consistent reads require more capacity but guarantee the latest data.

![The image provides exam tips for DynamoDB, focusing on On-Demand Mode and RCU (Read Capacity Units). It highlights features like scalability, cost, and read capabilities.](/images/AWS-Certified-Developer-Associate-Exam-TIps/dynamodb-exam-tips-on-demand-rcu.jpg)

---

### Consistency and Throttling

To perform a strongly consistent read, set the `consistent read` parameter to true in your API call. Exceeding your provisioned capacity can result in a throughput exceeded exception. Common causes for throttling include hot partition keys (excessive requests on a single partition) or insufficient key variance.

To mitigate throttling:

- Distribute partition keys effectively.
- Implement exponential backoff.
- Consider using DynamoDB Accelerator (DAX) to alleviate read capacity issues.

![The image provides exam tips for DynamoDB, explaining the differences between "eventually consistent read" and "strongly consistent read" in terms of data retrieval after a write.](/images/AWS-Certified-Developer-Associate-Exam-TIps/dynamodb-exam-tips-consistency-reads.jpg)

![The image provides exam tips for DynamoDB, highlighting capacity settings such as Read Capacity Unit (RCU), Write Capacity Unit (WCU), and the availability of temporary burst capacity.](/images/AWS-Certified-Developer-Associate-Exam-TIps/dynamodb-exam-tips-capacity-settings.jpg)

![The image provides exam tips for DynamoDB, focusing on handling "ProvisionedThroughputExceededException" by distributing partition keys, using exponential backoff, and utilizing DynamoDB Accelerator (DAX).](/images/AWS-Certified-Developer-Associate-Exam-TIps/dynamodb-exam-tips-throughput-exception.jpg)

---

### Common API Operations

Key DynamoDB API operations include:

- **GetItem:** Retrieves a single item from a table.
- **PutItem:** Creates or replaces an item.
- **UpdateItem:** Modifies attributes of an existing item or creates one if absent.
- **Scan:** Retrieves items by scanning the entire table or index (can be resource intensive).
- **Query:** Retrieves all items that match a specific partition key.
- **CreateTable/DeleteTable:** Creates or deletes a table.
- **BatchWriteItem:** Writes or deletes multiple items across tables.
- **BatchGetItem:** Retrieves up to 100 items across one or more tables.

By default, operations such as GetItem, Query, and Scan return all item attributes. Use projection expressions to retrieve only specific attributes.

#### Indexes

- **Local Secondary Indexes (LSIs):**
  - Allow an alternate sort key while using the main partition key.
  - Must be defined during table creation.
  - Limited to five LSIs per table.

- **Global Secondary Indexes (GSIs):**
  - Use a different partition key (and optionally a sort key).
  - Can be added or modified after table creation.
  - Require separate provisioned capacity.
  - Note: Throttled writes on GSIs can affect the main table.

![The image provides exam tips for DynamoDB, focusing on Local Secondary Index (LSI) and Global Secondary Index (GSI), including their creation, limitations, and requirements.](/images/AWS-Certified-Developer-Associate-Exam-TIps/dynamodb-exam-tips-lsi-gsi.jpg)

#### Advanced Features

- **Conditional Writes:**  
  Operations such as PutItem, UpdateItem, or DeleteItem can be conditioned on specific attribute states (e.g., existence, type, prefix, or size).
- **Transactions:**  
  Group multiple operations across tables into a single all-or-nothing action, ensuring ACID compliance. Transactions double capacity unit consumption (one for preparing and one for committing). Use:
  - TransactGetItems
  - TransactWriteItems

- **Optimistic Locking:**  
  Prevent accidental overwrites by maintaining a version attribute. The update succeeds only if the version number on the server matches the application's last known version.
- **DynamoDB Streams:**  
  Capture data modification events in near real time. Each stream record can include:
  - Keys Only
  - New Image (after modification)
  - Old Image (before modification)
  - Both New and Old Images

Stream records are stored for 24 hours.

![The image provides exam tips for DynamoDB, focusing on the optional feature of DynamoDB Streams, which captures data modification events and details the types of information stream records can contain.](/images/AWS-Certified-Developer-Associate-Exam-TIps/dynamodb-exam-tips-streams.jpg)

---

## ElastiCache and MemoryDB

### ElastiCache

Amazon ElastiCache is a fully managed in-memory caching service that supports both Redis and Memcached.

- **Redis:**
  - Supports complex data types such as hashes, lists, sets, and sorted sets.
  - Provides data persistence, replication, automatic failover, backup/restore, and data partitioning.

- **Memcached:**
  - Operates as a basic key-value store.
  - Does not support data persistence, replication, failover, or multi-AZ deployments.
  - Leverages multi-threading to efficiently utilize CPU resources.

![The image provides exam tips for ElastiCache, highlighting features of Memcached such as its basic key-value store design, lack of data persistence, absence of built-in replication and failover, and no support for Multi-AZ deployments.](/images/AWS-Certified-Developer-Associate-Exam-TIps/elasticsearch-exam-tips-memcached.jpg)

### MemoryDB

MemoryDB is designed as a drop-in replacement for Redis, offering additional features such as multi-AZ durability, high availability, and stronger consistency during failover. This makes MemoryDB an attractive option when you require enhanced resilience and replication for Redis-based applications.

![The image provides exam tips for MemoryDB, highlighting its use as a drop-in replacement for Redis with added durability, high availability, and strong consistency. It is recommended for scenarios where Redis can be the primary database.](/images/AWS-Certified-Developer-Associate-Exam-TIps/memorydb-exam-tips-redis-replacement.jpg)

---

## Conclusion

By understanding the key exam tips for AWS RDS, Aurora, DynamoDB, ElastiCache, and MemoryDB, you are better equipped to address exam scenarios related to managed services, scalability, throughput management, and high availability. Focus on best practices such as configuring read replicas, properly provisioning capacity, implementing conditional writes and transactions in DynamoDB, and choosing the right cache or database solution for your use case.

Happy studying and best of luck on your exam!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/a1267c00-fc48-4a9b-8d41-fd642fa743ea/lesson/43f097c7-299f-4e9c-a9b3-ce27c546811f)**
>
> Watch video content
