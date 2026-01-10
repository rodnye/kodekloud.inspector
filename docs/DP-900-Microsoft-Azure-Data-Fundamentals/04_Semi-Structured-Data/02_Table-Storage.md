# Table Storage - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DP-900-Microsoft-Azure-Data-Fundamentals/Semi-Structured-Data/Table-Storage)

---

## Table of Contents

- Table Storage
  - Relational vs. Semi-Structured Databases
  - Where to Create Table Storage
  - PartitionKey and RowKey
  - Choosing a PartitionKey
  - Application Scope and Access Patterns
  - Timestamp Property
  - Browsing and Managing Table Storage
  - Links and References
  - Watch Video

---

## Content

DP-900: Microsoft Azure Data Fundamentals

Semi Structured Data

# Table Storage

Azure Table Storage is Microsoft’s fully managed NoSQL key-value store within Azure Storage accounts. It’s designed for massive scale—supporting up to 25× the capacity of a single Azure SQL Database—while providing a flexible schema: each row has two keys (PartitionKey and RowKey) plus any number of custom properties. Unlike relational tables, rows in Table Storage can have completely different sets of properties.

![The image is an overview of Microsoft's Table Storage, describing it as a key-value, semi-structured database that uses tables with non-identical rows and can hold large amounts of data.](https://kodekloud.com/kk-media/image/upload/v1752873038/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Table-Storage/microsoft-table-storage-overview-key-value.jpg)

---

## Relational vs. Semi-Structured Databases

Moving from relational to semi-structured (NoSQL) databases means trading rich relational features for scale and performance.

| Feature                 | Relational Database | Semi-Structured Database |
| ----------------------- | ------------------- | ------------------------ |
| Relationships           | ✔                   | ✖                        |
| Views & Stored Procs    | ✔                   | ✖                        |
| Indexes & Normalization | ✔                   | ✖                        |
| Flexible Schema         | ✖                   | ✔                        |
| High Throughput         | ✖                   | ✔                        |

![The image compares relational and semi-structured databases, highlighting features lost when moving from relational to semi-structured databases, such as relationships, views, stored procedures, indexes, and normalization.](https://kodekloud.com/kk-media/image/upload/v1752873039/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Table-Storage/relational-semi-structured-databases-comparison.jpg)

While you lose traditional indexing, Table Storage excels at high-velocity inserts and lookups, handling millions of transactions per day with sub-millisecond reads on keyed queries.

![The image is an infographic about a semi-structured database, highlighting its fast row addition, ability to process millions of transactions daily, and limited search options compared to relational databases. It also notes that some searches can be very fast.](https://kodekloud.com/kk-media/image/upload/v1752873041/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Table-Storage/semi-structured-database-infographic.jpg)

---

## Where to Create Table Storage

You can store table-style NoSQL data in Azure via:

| Service                     | Description                               | Reference                                                                                            |
| --------------------------- | ----------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Azure Storage Account       | Native Table Storage in a storage account | [Storage Account overview](https://docs.microsoft.com/azure/storage/common/storage-account-overview) |
| Azure Cosmos DB (Table API) | Globally distributed, multi-model NoSQL   | [Cosmos DB service](https://azure.microsoft.com/services/cosmos-db/)                                 |

In this guide, we focus on **Table Storage within an Azure Storage Account**.

![The image illustrates the creation of a Table Storage Database, showing that it can be created in an Azure Storage Account or Cosmos DB.](https://kodekloud.com/kk-media/image/upload/v1752873042/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Table-Storage/table-storage-database-azure-cosmos-db.jpg)

> [!important]
> **Note**
>
> Azure Cosmos DB’s Table API offers global distribution and automatic indexing, but at a higher cost compared to native Azure Storage Table.

---

## PartitionKey and RowKey

Every row in Table Storage must include these system properties:

| Property     | Role                                                                  |
| ------------ | --------------------------------------------------------------------- |
| PartitionKey | Groups related rows into partitions for load distribution and scaling |
| RowKey       | Unique identifier within its PartitionKey                             |
| Timestamp    | Auto-managed last-modified time, updated on any row change            |

The combination of PartitionKey + RowKey is automatically indexed—queries specifying both keys return results in sub-millisecond time.

![The image illustrates a data storage concept, showing rows consisting of a partition key and a row key, with the row key being unique within the partition to support efficient searching.](https://kodekloud.com/kk-media/image/upload/v1752873043/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Table-Storage/data-storage-partition-row-key-diagram.jpg)

---

## Choosing a PartitionKey

A well-designed PartitionKey evenly distributes data and request load across partitions. For example, a customer database keyed by country:

- **Canada**: few customers → light traffic
- **USA**: many customers → heavier traffic
- **India**: very large customer base → potential hotspot

Imbalanced partitions can lead to throttling and degraded performance. Aim for partitions of roughly equal size and activity.

![The image illustrates the importance of partition keys in databases, showing how they speed up searching by dividing data into equally sized and busy groups across different regions (Canada, USA, India).](https://kodekloud.com/kk-media/image/upload/v1752873044/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Table-Storage/partition-keys-database-searching-importance.jpg)

---

## Application Scope and Access Patterns

Relational systems let you index many columns; Table Storage limits fast lookups to PartitionKey and RowKey. Design your tables around your application’s primary access patterns.

- **Customer Management**  
  PartitionKey = country works if you always filter by country when retrieving data.
- **New Customer Onboarding**  
  If the country is unknown at insert time, a country-based PartitionKey may not fit this scenario.

> [!important]
> **Warning**
>
> Designing the wrong PartitionKey for your access patterns can lead to inefficient queries or throttling under load.

![The image compares semi-structured and relational databases, highlighting that semi-structured databases are tied to a particular application, while relational databases can support many different applications.](https://kodekloud.com/kk-media/image/upload/v1752873045/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Table-Storage/semi-structured-relational-databases-comparison.jpg)

![The image illustrates the concept of a semi-structured database, highlighting the flexibility of using the right key for a customer management application, but noting it may not be suitable for finding new customers.](https://kodekloud.com/kk-media/image/upload/v1752873046/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Table-Storage/semi-structured-database-customer-management.jpg)

---

## Timestamp Property

The **Timestamp** property is updated automatically on any row insert or update. Use it for optimistic concurrency: compare the stored timestamp before writing to ensure no concurrent modification occurred.

![The image shows a data table with columns for PartitionKey, RowKey, Timestamp, Name, and City, along with a note explaining that each row has a timestamp and varying properties.](https://kodekloud.com/kk-media/image/upload/v1752873048/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Table-Storage/data-table-partitionkey-rowkey-timestamp.jpg)

---

## Browsing and Managing Table Storage

You can inspect and manage Table Storage with:

1.  **Storage Browser**  
    Available in the Azure portal. View and edit tables, rows, and properties directly in your browser without any local installation.
2.  **Azure Storage Explorer**  
    A standalone desktop app for Windows, macOS, and Linux. Provides rich table-management capabilities, including bulk import/export and advanced filtering.  
    [Download & Documentation](https://docs.microsoft.com/azure/storage/common/storage-explorer)

---

## Links and References

- [Azure Storage Account Overview](https://docs.microsoft.com/azure/storage/common/storage-account-overview)
- [Azure Cosmos DB Table API](https://azure.microsoft.com/services/cosmos-db/)
- [Azure Storage Explorer Documentation](https://docs.microsoft.com/azure/storage/common/storage-explorer)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/dp-900-microsoft-azure-data-fundamentals/module/cf08821c-abc1-43a0-b8aa-a294849914c0/lesson/6cf9e9df-d48c-4ad1-b80d-f95018de46af)**
>
> Watch video content
