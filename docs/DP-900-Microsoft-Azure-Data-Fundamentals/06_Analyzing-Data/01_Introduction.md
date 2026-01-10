# Introduction - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DP-900-Microsoft-Azure-Data-Fundamentals/Analyzing-Data/Introduction)

---

## Table of Contents

- Introduction
  - Case Study: Sales Forecast Analysis
  - Three Phases of Data Preparation (ETL)
  - Watch Video

---

## Content

DP-900: Microsoft Azure Data Fundamentals

Analyzing Data

# Introduction

In this lesson, we dive into **Online Analytical Processing (OLAP)**—the backbone of modern data analysis. Unlike Online Transaction Processing (OLTP), OLAP systems are designed to:

| Characteristic                     | Description                                                                                |
| ---------------------------------- | ------------------------------------------------------------------------------------------ |
| No in-place updates                | Only a continuous **load** process appends new data; no record modifications or deletions. |
| Large-scale data handling          | Efficiently processes terabytes of historical data to derive business insights and trends. |
| Optimized for read-heavy workloads | Uses specialized storage engines tailored for fast aggregations and complex queries.       |

![](https://kodekloud.com/kk-media/image/upload/v1752872888/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Introduction/olap-infographic-data-analysis-tools.jpg)

We’ll explore how OLAP transforms raw data into actionable intelligence by stitching together various Azure services.

---

## Case Study: Sales Forecast Analysis

Consider a scenario where you must predict next year’s revenue. Your data sources include:

| Data Source                | Storage Service               | Description                                                      |
| -------------------------- | ----------------------------- | ---------------------------------------------------------------- |
| Sales forecasts            | Azure Blob Storage            | Excel files detailing each customer’s projected product volumes. |
| Actual sales               | Azure Cosmos DB Table Storage | Semi-structured, globally replicated transaction records.        |
| Customer & product masters | Azure SQL Database            | Structured relational tables for customer and product details.   |

![The image is a diagram titled "Analyzing Our Sales," showing Azure SQL with icons representing databases and shopping carts, indicating customer and product information stored as structured data.](https://kodekloud.com/kk-media/image/upload/v1752872888/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Introduction/analyzing-our-sales-azure-sql-diagram.jpg)

---

## Three Phases of Data Preparation (ETL)

1.  **Extract**  
    Retrieve blobs from Azure Storage, tables from Cosmos DB, and rows from Azure SQL.
2.  **Transform**  
    Standardize formats, cleanse data, and perform aggregations (e.g., sum of sales by region).
3.  **Load**  
    Persist the cleansed and transformed dataset into a high-performance analytical store such as **Azure Synapse Analytics** or **Azure Data Lake Storage Gen2**.

> [!important]
> **Note**
>
> Learn more about ETL best practices in the [Azure Data Factory documentation](https://docs.microsoft.com/azure/data-factory/concepts-pipelines-activities).

![The image illustrates three kinds of tools for data management: data gathering and transformation, housing the data, and analyzing the selected data, each with corresponding icons and brief descriptions.](https://kodekloud.com/kk-media/image/upload/v1752872890/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Introduction/data-management-tools-gathering-housing-analysis.jpg)

After loading, you can run complex queries and generate dashboards using tools like **Power BI** or **Azure Analysis Services**.

![The image illustrates the Extract-Transform-Load (ETL) process, showing the flow from data extraction from various sources, through transformation, storage, and finally analysis and reporting.](https://kodekloud.com/kk-media/image/upload/v1752872890/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Introduction/etl-process-data-flow-diagram.jpg)

---

> [!important]
> **Warning**
>
> Data transfer charges apply when moving data across Azure regions. To minimize egress fees, deploy your ETL pipelines and analytical storage within the **same region** as your source systems.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/dp-900-microsoft-azure-data-fundamentals/module/a4f1a604-4743-4a3a-81ac-8210d6f9bb96/lesson/a13d9b99-a121-4503-889f-ab5a0d4bac0a)**
>
> Watch video content
