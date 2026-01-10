# Design for Azure Data Lake Storage - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-305-Microsoft-Azure-Solutions-Architect-Expert/Design-a-data-integration-solution/Design-for-Azure-Data-Lake-Storage)

---

## Table of Contents

- Design for Azure Data Lake Storage
  - How ADLS Works
  - When to Use ADLS
  - ADLS vs. Blob Storage
  - Creating an ADLS Storage Account
  - Watch Video

---

## Content

AZ-305: Microsoft Azure Solutions Architect Expert

Design a data integration solution

# Design for Azure Data Lake Storage

Azure Data Lake Storage (ADLS) is a purpose-built repository that stores data in its native format as blobs or files. Unlike standard Blob Storage, ADLS is optimized for analytics, allowing you to store structured, semi-structured, and unstructured data without requiring transformation into a new format.

When working on data analytics projects, ADLS is the preferred solution. Although its cost is equivalent to that of Azure Blob Storage, ADLS is specifically tuned for analytic workloads.

## How ADLS Works

Data can be ingested into ADLS from various sources, ensuring your data remains available in its native state. The main ingestion methods include:

- **Ad-hoc Data:**  
  Data can be uploaded using tools such as PowerShell, Azure CLI, or Storage Explorer.
- **Relational Data:**  
  Data originating from SQL databases, SQL Managed Instances, PostgreSQL, or Cosmos DB can be ingested via Azure Data Factory, which includes connectors for these sources.
- **Streaming Data:**  
  Real-time data from Azure Data Explorer, Stream Analytics, Hadoop, and similar sources can be streamed directly into ADLS.

All these varied types of data—ad-hoc, relational, and streaming—are preserved in their original formats. To access this stored data, you can use Storage Explorer, which offers a user interface similar to that of table storage. Alternatively, you can interact with ADLS using PowerShell, Azure CLI, HDFS CLI, and several programming SDKs. Access is controlled using Azure RBAC and granular access control lists (ACLs).

![The image is a diagram explaining how ADLS (Azure Data Lake Storage) works, showing the flow of ad hoc, relational, and streaming data into ADLS. It includes icons representing different data types and processes.](https://kodekloud.com/kk-media/image/upload/v1752866905/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Data-Lake-Storage/adls-data-flow-diagram.jpg)

## When to Use ADLS

ADLS is ideal for three primary scenarios:

1.  **Large Amounts of Data:**  
    ADLS serves as a cloud-based data warehouse capable of managing massive volumes of data. Its scalability and reliability allow for automatic billing adjustments as storage needs increase.

    ![The image is an infographic from KodeKloud explaining when to use Azure Data Lake Storage (ADLS) for large amounts of data, managing multiple file types, and real-time streaming.](https://kodekloud.com/kk-media/image/upload/v1752866906/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Data-Lake-Storage/azure-data-lake-storage-infographic.jpg)

2.  **Multiple File Types:**  
    By supporting a wide range of file types (such as JSON, CSV, XML, etc.), ADLS offers flexible ingestion of ad-hoc, relational, or streaming data. This diversity enables robust processing using tools like Data Explorer and Data Factory.
3.  **Real-Time Streaming:**  
    ADLS can ingest real-time data from sources such as IoT Hub, Azure Event Hub, or Stream Analytics, making it a perfect choice for immediate analytical applications.

## ADLS vs. Blob Storage

Although ADLS and Blob Storage share the same pricing model, there are significant differences in functionality and use cases:

| Feature              | Blob Storage                                                        | Azure Data Lake Storage (ADLS)                                                                      |
| -------------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Data Type            | Best for unstructured, non-text data like photos, videos, documents | Optimized for large volumes of textual data, both relational and non-relational                     |
| Redundancy Options   | Offers multiple redundancy configurations (LRS, ZRS, GRS, GZRS)     | Default replication can be enabled via the Azure portal                                             |
| Namespace Structure  | Uses a flat namespace                                               | Employs a hierarchical namespace beneficial for complex directory structures and Hadoop integration |
| Hadoop Compatibility | Not optimized for Hadoop ecosystems                                 | Designed to work natively with Hadoop storage solutions                                             |
| Security             | Access control mainly at the storage account or container level     | Granular control with detailed ACLs                                                                 |

![The image is a comparison between Azure Blob Storage and ADLS, highlighting differences in data storage, replication, namespace, Hadoop compatibility, and access granularity.](https://kodekloud.com/kk-media/image/upload/v1752866907/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Data-Lake-Storage/azure-blob-storage-adls-comparison.jpg)

For analytics solutions like Databricks, HDInsight, and others, ADLS provides an optimal storage back-end.

## Creating an ADLS Storage Account

Setting up an ADLS-enabled storage account in the Azure portal is straightforward. Follow these steps:

1.  Navigate to **Storage Accounts** in the Azure portal and create a new storage account.
2.  Choose a resource group and select an account type. You can use either a General Purpose v2 (standard account) or a Premium Block Blobs account.
3.  For this example, select **Standard** and **LRS** as your options.
4.  In the **Advanced** settings, enable **Data Lake Storage Gen2** to activate the hierarchical namespace and unlock ADLS capabilities.

![The image shows a Microsoft Azure portal page for creating a storage account, displaying various configuration options under the "Review" tab. It includes sections for basics and advanced settings, with options like subscription, resource group, location, and replication.](https://kodekloud.com/kk-media/image/upload/v1752866908/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Data-Lake-Storage/azure-portal-storage-account-review.jpg)

> [!important]
> **Upgrading an Existing Storage Account**
>
> You can also upgrade an existing storage account to support ADLS:
>
> 1.  Select the storage account you want to upgrade.
> 2.  Notice that the hierarchical namespace is disabled.
> 3.  Click the corresponding button to enable it and follow the validation process.
> 4.  Once validated, your storage account will be upgraded to support Azure Data Lake Storage Gen2 capabilities.

![The image shows a Microsoft Azure portal interface for upgrading a storage account to Azure Data Lake Gen2 capabilities. It includes steps for reviewing, validating, and upgrading the account, all marked as "Not started."](https://kodekloud.com/kk-media/image/upload/v1752866910/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Data-Lake-Storage/azure-portal-storage-upgrade-datalake.jpg)

With your storage account configured for ADLS, you are ready to integrate with Azure Databricks or other analytics solutions to process your data efficiently.

> [!important]
> **Further Resources**
>
> For additional guidance on Azure analytics solutions and storage configurations, consider exploring the following resources:
>
> - [Azure Data Lake Storage Documentation](https://docs.microsoft.com/en-us/azure/storage/data-lake-storage/)
> - [Azure Databricks Documentation](https://docs.microsoft.com/en-us/azure/databricks/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-305-microsoft-azure-solutions-architect-expert/module/acee17bd-e9e6-4b46-a8da-fb80d01b1523/lesson/a52b6f0e-c77a-427d-9bea-c1ffc67a1171)**
>
> Watch video content
