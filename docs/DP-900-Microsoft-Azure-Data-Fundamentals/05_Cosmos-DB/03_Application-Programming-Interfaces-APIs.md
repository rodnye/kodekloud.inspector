# Application Programming Interfaces APIs - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DP-900-Microsoft-Azure-Data-Fundamentals/Cosmos-DB/Application-Programming-Interfaces-APIs)

---

## Table of Contents

- Application Programming Interfaces APIs
  - NoSQL (Core) API
  - MongoDB API
  - Cassandra API
  - Gremlin (Graph) API
  - Table Storage API
  - API Comparison
  - Links and References
  - Watch Video

---

## Content

DP-900: Microsoft Azure Data Fundamentals

Cosmos DB

# Application Programming Interfaces APIs

Now that we’ve covered why Azure Cosmos DB is an outstanding semi-structured data platform and how to provision a Cosmos DB account, this article dives into the five supported APIs. You’ll learn how and when to use the native NoSQL (Core) API, MongoDB, Cassandra, Gremlin (graph), and Table Storage. By the end, you’ll be able to pick the right interface for your workload.

Two core advantages differentiate Cosmos DB from Azure Storage Accounts:

1.  **Global distribution & geo-redundancy**  
    Deploy multiple writable regions worldwide for low-latency reads and writes with built-in replication.
2.  **Infinite throughput scalability**  
    Purchase as many Request Units (RUs) per second as you need—up to tens of millions—without the fixed limits of Azure Storage.

---

## NoSQL (Core) API

The native NoSQL API stores JSON documents and offers a familiar SQL-like query language for JSON data. If you’re coming from relational databases, you can leverage your SQL skills to query documents.

![The image is an illustration of Cosmos DB's NoSQL API, highlighting its use of JSON documents and a SQL-like language for querying.](https://kodekloud.com/kk-media/image/upload/v1752872916/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Application-Programming-Interfaces-APIs/cosmos-db-nosql-api-json-query.jpg)

Key features:

- JSON-document model with automatic indexing
- SQL-style queries: `SELECT * FROM c WHERE c.category = 'electronics'`
- Cross-partition queries with rich filtering and aggregation

> [!important]
> **Note**
>
> The Core API automatically indexes all JSON properties by default, so there’s no need to manage schema migrations.

---

## MongoDB API

Azure Cosmos DB’s MongoDB API is wire-protocol compatible with existing MongoDB drivers. Simply point your application at Cosmos DB—no code changes required. You can also enforce schemas using JSON Schema validation.

![The image is a diagram showing MongoDB's integration with Cosmos DB, highlighting its document-oriented, NoSQL database features using JSON-like documents. It mentions optional schema use for structured tables and compatibility with non-Azure implementations.](https://kodekloud.com/kk-media/image/upload/v1752872917/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Application-Programming-Interfaces-APIs/mongodb-cosmosdb-integration-diagram.jpg)

Key points:

- Full support for MongoDB wire protocol v3.2+
- Zero-downtime migration with the Azure Cosmos DB Data Migration tool
- Optional JSON Schema enforcement for stricter models

> [!important]
> **Note**
>
> You can leverage MongoDB tools like `mongoexport` or `mongodump` to migrate data directly into Cosmos DB.

---

## Cassandra API

Built for wide-column workloads, the Cassandra API lets you define column families to group related columns for fast reads and writes. It’s wire-compatible with existing Cassandra drivers.

![The image is an infographic about Cassandra, a column-oriented NoSQL database, highlighting its focus on columns, wide column speed, column family organization, and use of Cassandra Query Language (CQL). It also mentions integration with Cosmos DB.](https://kodekloud.com/kk-media/image/upload/v1752872917/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Application-Programming-Interfaces-APIs/cassandra-infographic-column-oriented-database.jpg)

Highlights:

- Uses Cassandra Query Language (CQL) for familiar syntax
- Support for existing Cassandra driver versions
- Integrate with Apache Spark or Azure Databricks for ETL and analytics

---

## Gremlin (Graph) API

The Gremlin API enables graph databases where both vertices (nodes) and edges (relationships) can store properties. It excels when you need to traverse complex relationships.

![The image is an illustration of Apache Gremlin API for Cosmos DB, highlighting its use for working with graph or network databases, where both vertices and edges can hold data. It emphasizes the importance of relationships between items.](https://kodekloud.com/kk-media/image/upload/v1752872918/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Application-Programming-Interfaces-APIs/apache-gremlin-api-cosmos-db-illustration.jpg)

Common scenarios:

- Social networks (friends, followers)
- Network topology mapping (devices, connections)
- Fraud detection with path-finding queries

---

## Table Storage API

If you need a simple key-value store with schema-less tables, the Table Storage API gives you the same programming model as Azure Storage Tables—plus Cosmos DB’s global distribution and unlimited RUs.

Key advantages:

- PartitionKey/RowKey indexing for fast lookups
- Automatic horizontal partitioning and replication
- Ideal for telemetry, session stores, and lightweight metadata

---

## API Comparison

| API             | Data Model     | Query Language      | Best Use Case                               |
| --------------- | -------------- | ------------------- | ------------------------------------------- |
| Core (NoSQL)    | JSON documents | SQL-like            | Flexible JSON workloads with rich querying  |
| MongoDB         | JSON documents | MongoDB Query API   | Existing MongoDB apps with minimal changes  |
| Cassandra       | Wide-column    | CQL                 | High-throughput columnar reads/writes       |
| Gremlin (Graph) | Graph          | Gremlin traversal   | Complex relationship queries and traversals |
| Table Storage   | Key-value      | OData / Table query | Simple schema-less tables with fast lookups |

---

## Links and References

- [Azure Cosmos DB documentation](https://docs.microsoft.com/azure/cosmos-db/)
- [MongoDB Compatibility](https://docs.microsoft.com/azure/cosmos-db/mongodb-introduction)
- [Cassandra API in Azure Cosmos DB](https://docs.microsoft.com/azure/cosmos-db/cassandra-introduction)
- [Gremlin API in Azure Cosmos DB](https://docs.microsoft.com/azure/cosmos-db/graph-introduction)
- [Azure Storage Tables vs Cosmos DB Tables](https://docs.microsoft.com/azure/cosmos-db/table-introduction)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/dp-900-microsoft-azure-data-fundamentals/module/06b26525-f54a-46ed-84c1-da4191607325/lesson/394755ae-3a8f-4433-b5f4-d42d8193e589)**
>
> Watch video content
