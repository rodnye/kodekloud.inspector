# Introduction - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DP-900-Microsoft-Azure-Data-Fundamentals/Semi-Structured-Data/Introduction)

---

## Table of Contents

- Introduction
  - What Is Semi-Structured Data?
  - Benefits of Semi-Structured Storage
  - Trade-offs and Limitations
  - Hybrid Data Architecture
  - Links and References
  - Watch Video
    - Example Record

---

## Content

DP-900: Microsoft Azure Data Fundamentals

Semi Structured Data

# Introduction

Modern e-commerce platforms like Amazon handle millions of transactions per day across a global customer base. Traditional relational databases often struggle under this load due to:

1.  Multiple table updates per transaction, which adds latency when enforcing ACID constraints.
2.  A rigid schema requiring every row to share the same columns, which doesn’t adapt well to a diverse product catalog.

![The image discusses the challenges of using structured data for online transactions, highlighting issues like the need for uniform table rows and the complexity of maintaining transaction integrity. It suggests that semi-structured data can address these issues by reducing the need for frequent updates and speeding up processing.](https://kodekloud.com/kk-media/image/upload/v1752873032/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Introduction/structured-data-online-transactions-challenges.jpg)

## What Is Semi-Structured Data?

Semi-structured data models store each transaction—including customer, order items, and shipping details—in a single record. This approach:

- Requires only one insert per transaction.
- Eliminates foreign-key joins and multi-step ACID enforcement.
- Scales effortlessly to millions of transactions daily.

![The image illustrates a solution for handling semi-structured data, highlighting benefits such as storing all data for a transaction in a single row, fewer updates, no relationships to maintain, no transaction integrity issues, and no table schemas.](https://kodekloud.com/kk-media/image/upload/v1752873033/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Introduction/semi-structured-data-solution-benefits.jpg)

Each record is self-describing (similar to JSON or XML), allowing fields to vary by record. For example, digital goods can omit shipping address fields.

## Benefits of Semi-Structured Storage

- **Schema Flexibility:** Add or remove fields per record without downtime.
- **Single-Row Transactions:** Faster inserts, no complex joins.
- **High Throughput:** Ideal for high-volume, write-heavy workloads.

---

## Trade-offs and Limitations

While semi-structured storage (e.g., [Azure Table Storage](https://docs.microsoft.com/azure/storage/tables/)) improves write performance, it introduces key limitations:

> [!important]
> **Warning**
>
> Azure Table Storage is a NoSQL (non-relational) database. It **does not** support SQL joins, rich secondary indexes, or transactions across multiple entities.

| Feature          | Relational Database    | Azure Table Storage        |
| ---------------- | ---------------------- | -------------------------- |
| Schema           | Fixed, enforced        | Flexible, per-entity       |
| Joins            | Supported              | Not supported              |
| Query Language   | SQL                    | OData/NoSQL REST APIs      |
| Indexing         | Rich secondary indexes | PartitionKey & RowKey only |
| Data Duplication | Minimal                | Higher (denormalization)   |

![The image illustrates a concept of semi-structured data with three entities: Customer, Sales Order, and Product, highlighting the lack of relationships between them and noting it as less flexible than a relational database.](https://kodekloud.com/kk-media/image/upload/v1752873034/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Introduction/semi-structured-data-customer-order-product.jpg)

![The image illustrates semi-structured data categories (Customer, Sales Order, Product) and notes that SQL cannot be used for querying or updating, referring to Microsoft's Table Storage as a "NoSQL" database solution.](https://kodekloud.com/kk-media/image/upload/v1752873035/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Introduction/semi-structured-data-categories-nosql.jpg)

---

## Hybrid Data Architecture

To balance performance and query flexibility, most organizations adopt a hybrid approach:

- **NoSQL tables** (e.g., Azure Table Storage) for high-volume, schema-flexible transactions.
- **Relational databases** for shared entities requiring rich querying and indexing (customer profiles, product catalogs).

![The image illustrates an ideal solution combining companies, a relational database, and a customer table to handle shared information. It emphasizes using relational databases to store customer information.](https://kodekloud.com/kk-media/image/upload/v1752873036/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Introduction/ideal-solution-relational-database-customer-table.jpg)

### Example Record

Below is a sample semi-structured transaction stored in Azure Table Storage:

```
{
  "PartitionKey": "Orders",
  "RowKey": "2023-10-01_0001",
  "order": {
    "customer": {
      "Name": "Peter Vogel",
      "Address": "London, Ontario"
    },
    "product": {
      "Name": "Widget",
      "Price": 15.10
    }
  }
}
```

> [!important]
> **Note**
>
> In Azure Table Storage, you use `PartitionKey` and `RowKey` to distribute and query your data efficiently.

---

## Links and References

- [Azure Table Storage Documentation](https://docs.microsoft.com/azure/storage/tables/)
- [NoSQL Overview on Microsoft Docs](https://docs.microsoft.com/azure/architecture/data-guide/big-data/nosql)
- [Azure Storage pricing](https://azure.microsoft.com/pricing/details/storage/)<br>

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/dp-900-microsoft-azure-data-fundamentals/module/cf08821c-abc1-43a0-b8aa-a294849914c0/lesson/dd98363b-2cd8-4a5a-b559-86e9c73d9e6d)**
>
> Watch video content
