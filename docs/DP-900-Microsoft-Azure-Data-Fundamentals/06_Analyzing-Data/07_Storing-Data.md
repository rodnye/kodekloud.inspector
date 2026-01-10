# Storing Data - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DP-900-Microsoft-Azure-Data-Fundamentals/Analyzing-Data/Storing-Data)

---

## Table of Contents

- Storing Data
  - Data Stores for Batch Processing
  - Data Warehouse Schemas for Analytics
  - Links and References
  - Watch Video
    - Key Batch Storage Options
    - Azure Synapse Analytics and Azure Data Lake Storage
    - Apache HBase
    - Apache Hive
    - Star Schema
    - Cube Schema

---

## Content

DP-900: Microsoft Azure Data Fundamentals

Analyzing Data

# Storing Data

In this lesson from the **Azure Data Fundamentals (DP-900)** course, we explore the **Storing** phase of the data pipeline. After extracting and transforming data with **Azure Data Factory**, the next step is to load your cleansed data into the optimal storage solution for **batch processing**, reporting, and analytical workloads.

## Data Stores for Batch Processing

Whether you’re aggregating sales metrics or preparing large datasets for machine learning, choosing the right batch storage is crucial.

![The image is a flowchart illustrating the process of storing data, starting from various data sources, transforming the data, and then storing it, before analyzing and reporting on it.](https://kodekloud.com/kk-media/image/upload/v1752872911/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Storing-Data/data-storage-flowchart-process-analysis.jpg)

### Key Batch Storage Options

| Data Store           | Type                  | Key Features                                                   | Common Use Case                         |
| -------------------- | --------------------- | -------------------------------------------------------------- | --------------------------------------- |
| Azure Synapse & ADLS | Cloud analytics lake  | PolyBase for direct querying, supports Parquet/CSV/JSON        | Large-scale data lake for SQL analytics |
| Apache HBase         | NoSQL wide-column     | Horizontally scalable, HDFS-native, low I/O bottlenecks        | Real-time reads/writes on big tables    |
| Apache Hive          | Hadoop data warehouse | ORC columnar storage, fast `SUM`/`AVG`/`COUNT`, fault-tolerant | Ad-hoc aggregations on Hadoop clusters  |

### Azure Synapse Analytics and Azure Data Lake Storage

Azure Synapse Analytics integrates seamlessly with Azure Data Lake Storage (ADLS). You can store data in multiple formats—**CSV, Parquet, JSON**, and more—and use **PolyBase** to run T-SQL queries directly against your files.

> [!important]
> **Note**
>
> No ETL is required before querying. PolyBase pushes computation down to ADLS, boosting performance and reducing costs.

### Apache HBase

Apache HBase is a Java-based, NoSQL wide-column store built on Hadoop Distributed File System (HDFS). It offers:

- **Horizontal scalability**: Distributes data across many nodes for parallel reads and writes.
- **HDFS ecosystem**: Leverages existing Hadoop clusters, minimizing I/O bottlenecks.
- **Easy migration**: On-premises HBase schemas lift-and-shift to Azure effortlessly.

### Apache Hive

Apache Hive transforms Hadoop into a fault-tolerant data warehouse. Hive uses the **Optimized Row Columnar (ORC)** format to:

- Accelerate aggregations like `SUM`, `AVG`, and `COUNT`.
- Read only relevant columns, reducing I/O overhead.
- Maintain schema-on-read for flexible data ingestion.

![The image is a comparison of data storage technologies: Azure Synapse and Data Lake, Apache HBase, and Apache Hive, highlighting their features and purposes.](https://kodekloud.com/kk-media/image/upload/v1752872912/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Storing-Data/data-storage-comparison-azure-hbase-hive.jpg)

## Data Warehouse Schemas for Analytics

When designing for analytics, your table schemas often deviate from OLTP patterns. Two popular modeling techniques are the **Star Schema** and the **Cube Schema**.

| Schema Type | Structure                                       | Best For                                  |
| ----------- | ----------------------------------------------- | ----------------------------------------- |
| Star Schema | Central fact table + surrounding dimensions     | Multi-dimensional filters, ad-hoc queries |
| Cube Schema | Multiple “slices” of the same fact by dimension | High-speed aggregations across axes       |

### Star Schema

A **star schema** centers around a **fact table** containing numeric measures (e.g., sales amounts), linked to multiple **dimension tables** (e.g., Customer, Product, Date).

- **Fact table**: Holds transactional metrics over time.
- **Dimension tables**: Store descriptive attributes for filtering and grouping.

This model simplifies SQL joins and enhances query performance, especially in **Azure Synapse dedicated SQL pools**.

![The image depicts a star schema for data analysis, showing a central fact table "Quantity Sold" connected to four dimension tables: Countries, Customers, Date Sold, and Products. It also explains the difference between fact and dimension tables.](https://kodekloud.com/kk-media/image/upload/v1752872913/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Storing-Data/star-schema-data-analysis-fact-dimension.jpg)

### Cube Schema

A **cube schema** extends beyond two dimensions by stacking multiple slices of data—each slice represents the fact table at a specific dimension value (e.g., year).

- Fast aggregations along time, geography, and product axes.
- Pre-aggregated views reduce query runtime.
- Scales to 4+ dimensions in many OLAP systems.

Cubes optimize dashboards and BI tools that require instant drill-downs and rollups.

![The image illustrates an analytical schema using a cube to represent multi-dimensional data, with axes labeled for columns (quantity sold), entities (products), and time (2010 to next year). It explains that cubes speed up data aggregation compared to two-dimensional tables.](https://kodekloud.com/kk-media/image/upload/v1752872915/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Storing-Data/multi-dimensional-data-cube-schema.jpg)

Some OLAP solutions support even more dimensions—each tailored for specialized analytical queries.

## Links and References

- [Azure Data Factory Overview](https://docs.microsoft.com/azure/data-factory/overview)
- [Azure Synapse Analytics Documentation](https://docs.microsoft.com/azure/synapse-analytics/)
- [Apache HBase Reference Guide](https://hbase.apache.org/book.html)
- [Apache Hive ORC Format](https://orc.apache.org/)
- [DP-900 Microsoft Certified: Azure Data Fundamentals](https://docs.microsoft.com/certifications/exams/dp-900/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/dp-900-microsoft-azure-data-fundamentals/module/a4f1a604-4743-4a3a-81ac-8210d6f9bb96/lesson/04b55b53-3ad2-4c60-9e0f-17a195417e71)**
>
> Watch video content
