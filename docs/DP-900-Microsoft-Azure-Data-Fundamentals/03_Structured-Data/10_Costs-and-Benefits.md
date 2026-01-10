# Costs and Benefits - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DP-900-Microsoft-Azure-Data-Fundamentals/Structured-Data/Costs-and-Benefits)

---

## Table of Contents

- Costs and Benefits
  - Advantages of the Relational Model
  - Performance Overhead in OLTP Workloads
  - Modeling Diverse Entities with a Fixed Schema
  - Reporting Challenges on Normalized Schemas
  - Alternative Data Storage Solutions
  - Data Warehousing and ETL Strategies
  - References
  - Watch Video

---

## Content

DP-900: Microsoft Azure Data Fundamentals

Structured Data

# Costs and Benefits

By now, we’ve covered relational schemas, structured data modeling, core SQL operations, and transaction integrity. This section evaluates when to use relational databases—and when to consider alternative storage solutions.

## Advantages of the Relational Model

Relational databases excel at organizing structured data with clear relationships:

- **Flexible schema design:** Link tables like **Customer**, **SalesOrder**, and **Product** through foreign keys.
- **Data integrity:** Enforce constraints to eliminate duplicates.
- **Powerful queries:** Use joins to answer questions such as “Which products did each customer purchase?”

![The image is a diagram illustrating the benefits of a database design, highlighting features like flexible design, data association through joins, and elimination of repeated data. It includes tables for customer information, sales orders, and product details, showing relationships between them.](https://kodekloud.com/kk-media/image/upload/v1752873049/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Costs-and-Benefits/database-design-benefits-diagram.jpg)

## Performance Overhead in OLTP Workloads

In an OLTP environment, minimizing latency and maximizing throughput are critical. Multi‐table updates—for example, transferring funds between savings and checking accounts—require:

1.  Coordinated, transactional updates across multiple tables
2.  Locking and logging for ACID compliance

These operations can become a bottleneck, limiting transactions per second.

![The image illustrates the concept of OLTP (Online Transaction Processing) with a central figure at a desk, surrounded by icons of people, highlighting challenges like high transaction loads and maintaining transaction integrity.](https://kodekloud.com/kk-media/image/upload/v1752873050/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Costs-and-Benefits/oltp-transaction-processing-challenges-diagram.jpg)

> [!important]
> **Warning**
>
> High transaction volumes with complex joins can degrade performance. For latency-sensitive workloads, consider specialized data stores or caching layers.

## Modeling Diverse Entities with a Fixed Schema

A rigid table structure forces all records to share the same columns. Selling books, gas stoves, and laptops in one table leads to:

- Many nullable columns
- Multiple specialized tables or EAV patterns

This complexity can be hard to maintain and query.

## Reporting Challenges on Normalized Schemas

Normalized schemas are ideal for OLTP but often problematic for large‐scale analytics. Generating a report over hundreds of thousands of orders requires:

- Joining **Customer**, **SalesOrder**, and **Product** tables for each row
- Scanning large indexes repeatedly

![The image shows a person at a desk with a computer, surrounded by multiple database tables, illustrating the complexity of integrating reports in a normalized database. The text mentions the potential need to integrate dozens of tables.](https://kodekloud.com/kk-media/image/upload/v1752873052/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Costs-and-Benefits/database-integration-reports-complexity.jpg)

## Alternative Data Storage Solutions

To overcome these limitations, teams often adopt:

| Storage Pattern            | Use Case                                  | Benefits                                         |
| -------------------------- | ----------------------------------------- | ------------------------------------------------ |
| NoSQL (Document/Key-Value) | High-volume, schema-flexible transactions | Eliminates multi-table updates; low latency      |
| Columnar/Analytical Stores | Large-scale analytics and reporting       | Optimized for scans and aggregations             |
| Data Warehouse             | Centralized analytics at scale            | Denormalized/star schemas reduce expensive joins |

## Data Warehousing and ETL Strategies

In a data warehouse, you might merge **Customer**, **SalesOrder**, and **Product** into a single, denormalized table. This sacrifices update efficiency but speeds up reporting dramatically.

![The image presents a solution for handling more transactions, unstructured data, and large data tables, with a focus on unstructured data and data warehouses.](https://kodekloud.com/kk-media/image/upload/v1752873053/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Costs-and-Benefits/data-warehouse-unstructured-data-solution.jpg)

> [!important]
> **Note**
>
> ETL pipelines, Change Data Capture (CDC), and other integration patterns ensure the warehouse stays up to date with your OLTP system. These will be covered in a later lesson.

---

## References

- [Azure SQL Database overview](https://docs.microsoft.com/azure/azure-sql/)
- [Introduction to NoSQL](https://docs.microsoft.com/azure/cosmos-db/introduction)
- [Data Warehouse concepts](https://docs.microsoft.com/azure/synapse-analytics/overview-what-is)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/dp-900-microsoft-azure-data-fundamentals/module/ab06c95a-37f6-40d4-9dd8-b5a6961866b5/lesson/9405cab9-27f0-4e93-9d79-55391540d21a)**
>
> Watch video content
