# Reporting - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DP-900-Microsoft-Azure-Data-Fundamentals/Analyzing-Data/Reporting)

---

## Table of Contents

- Reporting
  - Power BI Desktop: Create and Design
  - Data Modeling in Power BI
  - Next Steps
  - Links and References
  - Watch Video
    - 1. Power Query: Extract, Transform, Load (ETL)
    - 2. Power View: Design Interactive Reports
      - Import vs. DirectQuery
      - Filtering, Slicers & Hierarchies

---

## Content

DP-900: Microsoft Azure Data Fundamentals

Analyzing Data

# Reporting

Welcome back to the Azure Data Fundamentals DP-900 course. In this module, we explore reporting through Microsoft Power BI—your end-to-end platform for data analysis, from ingestion to distribution.

When we discuss “reporting” in the Microsoft ecosystem, we mean Power BI. Think of it as two distinct phases:

1.  Building interactive visualizations
2.  Distributing those reports to end users

Under the hood, Power BI’s design phase relies on Power Query and Power View, while publishing and sharing are handled by the Power BI Service.

![The image illustrates the components of Power BI, highlighting its three main parts: Power Query, Power View, and Power BI Service, along with their roles in creating, visualizing, and distributing data.](https://kodekloud.com/kk-media/image/upload/v1752872901/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Reporting/power-bi-components-query-view-service.jpg)

## Power BI Desktop: Create and Design

Power BI Desktop (formerly Power BI Designer) is the free Windows client that combines Power Query and Power View into a single workspace. Both the free and Pro versions offer full design capabilities, with Pro removing dataset size limits and adding collaboration features.

![The image is an illustration of Power BI, showing a computer screen with the Power BI logo. It describes Power BI Designer (also called Power BI Desktop) as combining Power Query and Power View, and mentions integration with Power BI Service.](https://kodekloud.com/kk-media/image/upload/v1752872902/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Reporting/power-bi-desktop-illustration-integration.jpg)

### 1\. Power Query: Extract, Transform, Load (ETL)

Power Query is where you connect to sources, shape data, and load it into your Power BI dataset. Common transformations include:

- Joining or splitting tables
- Cleaning invalid or null values
- Filtering out unneeded rows

Every step is recorded in M code, forming an ETL pipeline that reruns on each refresh.

![The image is about Power Query, highlighting its ability to customize the ETL process and create datasets for Power BI reports.](https://kodekloud.com/kk-media/image/upload/v1752872903/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Reporting/power-query-etl-customization-datasets.jpg)

> [!important]
> **Note**
>
> Power Query’s step-by-step transformation ensures reproducibility. When you refresh, only the final query runs against the source.

#### Import vs. DirectQuery

| Mode        | Characteristics                                                       | When to Use                                  |
| ----------- | --------------------------------------------------------------------- | -------------------------------------------- |
| Import      | Data is loaded into Power BI’s in-memory engine. Fast interaction.    | Datasets under size limit, offline analysis. |
| DirectQuery | Queries the source in real time. No import limits but slower visuals. | Large tables, always-up-to-date dashboards.  |

> [!important]
> **Warning**
>
> DirectQuery can add query latency to visuals. Always test performance when using live connections.

### 2\. Power View: Design Interactive Reports

Once data is loaded or connected, switch to Power View to craft visuals. Power BI Desktop offers over 40 built-in charts plus community-driven custom visuals. Visual interactions mean selecting one chart filters the rest, and date slicers dynamically slice time-series data.

![The image is an illustration related to Power BI, highlighting Power View's capability to create interactive reports with various data visualizations.](https://kodekloud.com/kk-media/image/upload/v1752872904/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Reporting/power-bi-power-view-interactive-reports.jpg)

#### Filtering, Slicers & Hierarchies

- Slicers for on-canvas filtering
- Drill-down/up through hierarchies (Region → Country → City → Customer)
- Automatic date hierarchies (Year → Quarter → Month → Week)

![The image is a Power BI Desktop slide showing a computer monitor with a filter icon, highlighting features like user interactivity, filtering, and creating hierarchies.](https://kodekloud.com/kk-media/image/upload/v1752872905/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Reporting/power-bi-desktop-filter-interactivity-slide.jpg)

## Data Modeling in Power BI

Central to unified reporting is a robust data model. Power BI lets you:

- Import tables from Excel, Azure SQL Database, Cosmos DB, and more
- Auto-detect relationships by column names or define them manually
- Build star or snowflake schemas with fact and dimension tables

![The image is an illustration related to Power BI Desktop, focusing on data modeling and creating relationships between tables. It features a computer monitor icon with a table graphic.](https://kodekloud.com/kk-media/image/upload/v1752872906/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Reporting/power-bi-desktop-data-modeling-illustration.jpg)

> [!important]
> **Note**
>
> In modeling view, drag to create relationships or adjust cardinality and cross-filter direction for accurate joins.

Once relationships are in place, your reports draw on a coherent, interrelated dataset:

![The image illustrates the process of creating data models in Power BI, showing how different tables from various sources are related. It includes a visual representation of tables with customer, sales, and product information.](https://kodekloud.com/kk-media/image/upload/v1752872907/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Reporting/power-bi-data-models-tables-relationship.jpg)

## Next Steps

By leveraging Power Query, Power View, and the Power BI Service, you can extract, transform, model, visualize, and distribute insights across your organization.

---

## Links and References

- [Power BI Documentation](https://docs.microsoft.com/power-bi)
- [Azure SQL Database Overview](https://docs.microsoft.com/azure/azure-sql/overview)
- [Cosmos DB Introduction](https://docs.microsoft.com/azure/cosmos-db/introduction)
- [Excel Overview](https://www.microsoft.com/microsoft-365/excel)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/dp-900-microsoft-azure-data-fundamentals/module/a4f1a604-4743-4a3a-81ac-8210d6f9bb96/lesson/36977f9d-a90e-43a1-811a-1d51ee64ae42)**
>
> Watch video content
