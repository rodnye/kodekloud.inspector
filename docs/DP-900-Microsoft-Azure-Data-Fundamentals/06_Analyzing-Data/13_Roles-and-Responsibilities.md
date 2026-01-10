# Roles and Responsibilities - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DP-900-Microsoft-Azure-Data-Fundamentals/Analyzing-Data/Roles-and-Responsibilities)

---

## Table of Contents

- Roles and Responsibilities
  - Data Analysis Roles
  - Key Takeaways
  - Power BI Reporting
  - Further Reading
  - Watch Video
    - 1. OLAP & Data Processing Patterns
    - 2. Integrated Analytics Platforms
    - 3. Batch & Stream Processing
    - 4. Orchestration Tools
    - 5. Data Lake Querying
    - 6. Common Storage & Querying Options
    - 7. Popular Analytics Frameworks & Languages

---

## Content

DP-900: Microsoft Azure Data Fundamentals

Analyzing Data

# Roles and Responsibilities

In this final section of the Data Analysis module, we’ll define the core roles driving insights and then recap the essential concepts you’ve learned.

## Data Analysis Roles

We categorize data analysis stakeholders into three main roles:

| Role                 | Focus                            | Key Responsibilities      |
| -------------------- | -------------------------------- | ------------------------- |
| **Analysts (Users)** | Diagnostic & predictive insights | \\- Create visualizations |

- Formulate analysis questions
- Write exploratory scripts (Python, R) | | **Administrators**| Security, permissions & infrastructure stability | - Grant/revoke user access
- Schedule & monitor ETL/ELT jobs
- Perform backups and restores | | **Data Engineers**| Pipeline architecture & data integration | - Design & build ETL/ELT workflows
- Integrate heterogeneous data sources
- Optimize performance and resource configurations |

![The image outlines roles and responsibilities for Analysts, Administrators, and Engineers, detailing tasks like applying analysis tools, controlling data access, and building transformation pipelines.](https://kodekloud.com/kk-media/image/upload/v1752872908/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Roles-and-Responsibilities/roles-responsibilities-analysts-admins-engineers.jpg)

> [!important]
> **Note**
>
> Analysts only need access to their datasets and BI tools, while administrators and engineers require broader interfaces to manage, secure, and optimize pipelines.

## Key Takeaways

Here’s a summary of the core concepts, tools, and patterns you’ve learned for effective data processing and analysis.

### 1\. OLAP & Data Processing Patterns

- **Online Analytical Processing (OLAP):** Multi-dimensional queries on large datasets for deep insights.
- **ETL vs. ELT**
  - ETL: _Extract → Transform → Load_
  - ELT: _Extract → Load → Transform_ (leverages raw data query engines)

### 2\. Integrated Analytics Platforms

- **Azure Synapse Analytics:** Unified analytics service combining data warehousing and big data
- **Azure Databricks:** Managed Apache Spark environment for collaborative data engineering and machine learning

### 3\. Batch & Stream Processing

- **Batch Processing:** Scheduled jobs for high-volume data transformations.
- **Real-time Streaming:** SQL-based analytics against streaming sources (e.g., [Azure Event Hubs](https://docs.microsoft.com/azure/event-hubs/)) for immediate insights.

### 4\. Orchestration Tools

- **Azure Data Factory:** Automate and monitor ETL/ELT workflows across on-premises and cloud data stores.

### 5\. Data Lake Querying

- **PolyBase:** Query file formats in situ without pre-loading.
- **Synapse serverless SQL:** On-demand querying of Data Lake Storage via T-SQL.

![The image is a summary of data processing concepts, highlighting ETL processes, Azure Data Factory, and Data Lake support for queries with PolyBase.](https://kodekloud.com/kk-media/image/upload/v1752872909/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Roles-and-Responsibilities/data-processing-etl-azure-summary.jpg)

### 6\. Common Storage & Querying Options

| Storage Type          | Technologies                   | Use Case                             |
| --------------------- | ------------------------------ | ------------------------------------ |
| Relational Warehouses | Star & Cube Schemas in Synapse | Structured reporting & BI            |
| NoSQL Stores          | Apache Hive, HBase             | Semi-structured or unstructured data |
| Ad Hoc Analytics      | Azure Data Explorer (KQL)      | Exploratory & operational analytics  |

### 7\. Popular Analytics Frameworks & Languages

| Category         | Examples                          |
| ---------------- | --------------------------------- |
| Programming      | Python, R                         |
| Big Data Engines | Apache Spark, Hadoop on HDInsight |

![The image is a summary slide about data analysis tools, mentioning Azure Synapse, programming languages like R and Python, and other tools such as Apache Spark and Hadoop.](https://kodekloud.com/kk-media/image/upload/v1752872910/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Roles-and-Responsibilities/data-analysis-tools-azure-synapse-r-python.jpg)

## Power BI Reporting

- **Report Types:** Descriptive, Diagnostic, Predictive, Prescriptive
- **Power BI Desktop:** Free authoring environment with integrated [Power Query](https://docs.microsoft.com/power-query/) for ETL
- **Power BI Service:** Cloud-hosted platform for sharing dashboards, paginated reports, and real-time monitoring

> [!important]
> **Warning**
>
> Carefully manage dataset permissions in Power BI Service to maintain data privacy and security.

This concludes our module on analyzing data. You now have a clear understanding of the roles, responsibilities, and tools that form the foundation of any analytics lifecycle.

## Further Reading

- [Azure Synapse Analytics Documentation](https://docs.microsoft.com/azure/synapse-analytics/)
- [Azure Databricks Documentation](https://docs.microsoft.com/azure/databricks/)
- [Azure Data Factory Documentation](https://docs.microsoft.com/azure/data-factory/)
- [PolyBase Overview](https://docs.microsoft.com/sql/relational-databases/polybase/polybase-guide)
- [Power BI Documentation](https://docs.microsoft.com/power-bi/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/dp-900-microsoft-azure-data-fundamentals/module/a4f1a604-4743-4a3a-81ac-8210d6f9bb96/lesson/3191c2f9-22f5-4ab1-8921-84941cbb10af)**
>
> Watch video content
