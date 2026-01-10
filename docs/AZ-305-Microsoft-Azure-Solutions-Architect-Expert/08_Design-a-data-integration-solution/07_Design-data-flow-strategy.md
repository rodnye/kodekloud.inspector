# Design data flow strategy - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-305-Microsoft-Azure-Solutions-Architect-Expert/Design-a-data-integration-solution/Design-data-flow-strategy)

---

## Table of Contents

- Design data flow strategy
  - Choosing the Right Data Path
  - Modern Data Platform Architecture
  - Leveraging Real-Time Analytics
  - Conclusion
  - Watch Video

---

## Content

AZ-305: Microsoft Azure Solutions Architect Expert

Design a data integration solution

# Design data flow strategy

In this article, we explore a comprehensive data flow strategy that incorporates three distinct processing paths—hot, warm, and cold—to meet various data processing and analytics needs. This strategy is designed around the type of data, its usage, and the frequency of data ingestion.

## Choosing the Right Data Path

Selecting the appropriate data path depends on your specific data requirements:

- **Hot Path:**  
  The hot path is ideal for scenarios that require real-time processing and immediate display. This is especially useful for data from IoT sensors or environments where data changes frequently. It supports stream analytics to process data instantly.
- **Warm Path:**  
  The warm path temporarily stores or displays a recent subset of data, making it suitable for small-scale analytics or batch processing. Typically, data is initially ingested via the hot path, processed in real time, and then stored in warm storage for additional operations.
- **Cold Path:**  
  The cold path is tailored for data that is infrequently accessed but needs to be retained for compliance, legal purposes, or long-term batch analytics. After initial processing via the hot or warm paths, older data—spanning months or years—can be analyzed using complex aggregations or joins.

![The image is a table explaining when to use hot, warm, and cold data paths, detailing their requirements and use cases. It highlights the frequency of data changes and processing needs for each path.](https://kodekloud.com/kk-media/image/upload/v1752866889/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-data-flow-strategy/data-paths-hot-warm-cold-table.jpg)

## Modern Data Platform Architecture

Integrating multiple data paths is essential for building a robust modern data platform, as outlined by Microsoft. The architecture begins with various data sources on the left-hand side, such as relational databases, semi-structured formats (e.g., CSV, JSON, XML), and unstructured data (images, videos, audio, free text). Below is an overview of how these sources are managed:

1.  **Relational Databases:**
    - Data is extracted using Azure Data Factory pipelines.
    - Ingested data is stored in Azure Data Lake Storage (ADLS).
    - Tools like Synapse Analytics with PolyBase pull data from ADLS for visualization in Power BI, or data can be routed to Databricks for analytical processes.
    - Processed data may be stored in Azure Cosmos DB for application delivery.
    - Additionally, data can be forwarded to Cognitive Services for developing machine learning models.

2.  **Semi-Structured Data (CSV, JSON, XML):**
    - Data collection is performed with Azure Data Factory.
    - The collected data is sent to ADLS, where further analytics are conducted and processed data is routed to necessary applications.

3.  **Unstructured Data:**
    - Data such as images, videos, audio files, and textual information is ingested via Data Factory.
    - This data is stored in ADLS, processed by tools like Synapse Analytics, and ultimately utilized for analytics and application delivery.

![The image is a diagram of a modern data platform reference architecture, illustrating the flow of data from various sources through processes like ingestion, storage, and analytics using tools such as Azure Data Lake, Databricks, and Power BI. It highlights components like Event Hubs, Data Factory, and Azure Synapse Analytics, showing their roles in data processing and serving business users.](https://kodekloud.com/kk-media/image/upload/v1752866891/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-data-flow-strategy/modern-data-platform-architecture-diagram.jpg)

## Leveraging Real-Time Analytics

For scenarios that require immediate data processing—such as data streaming from IoT devices—the following strategies are implemented:

- **Hot Path for Real-Time Analysis:**
  - Data is collected directly from IoT devices using Event Hubs.
  - The data stream is processed by Stream Analytics to deliver real-time insights.
  - Results are pushed directly to Power BI dashboards for immediate visualization.

- **Cold Path for Historical Trend Analysis:**
  - The same data collected by Event Hubs is stored in ADLS.
  - Over time, this historical data is processed by tools like Databricks or Synapse Analytics to uncover trends and build in-depth analytics.

> [!important]
> **Note**
>
> By combining the hot and cold paths, businesses can benefit from both instantaneous stream processing and comprehensive historical analysis.

## Conclusion

This modern data platform architecture, inspired by Microsoft’s design principles, clearly demonstrates how different data paths can be integrated to address both real-time and long-term analytical needs. The hot path facilitates immediate data processing for live insights, the warm path efficiently manages recent data for batch processing, and the cold path ensures long-term data retention for historical analyses and compliance.

This concludes our module on designing data flow strategies. In the next module, we will delve deeper into additional components of data architecture. Thank you for reading.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-305-microsoft-azure-solutions-architect-expert/module/acee17bd-e9e6-4b46-a8da-fb80d01b1523/lesson/5ad8ffa6-3602-43ae-ad41-234852208a14)**
>
> Watch video content
