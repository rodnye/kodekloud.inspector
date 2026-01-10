# Processing Modes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DP-900-Microsoft-Azure-Data-Fundamentals/Analyzing-Data/Processing-Modes)

---

## Table of Contents

- Processing Modes
  - Batch Processing
  - Stream Processing
  - Hybrid Processing
  - Stream Processing Components
  - Further Reading
  - Watch Video
    - Rolling Time Windows
    - Hybrid Transactional and Analytical Processing (HTAP)

---

## Content

DP-900: Microsoft Azure Data Fundamentals

Analyzing Data

# Processing Modes

Welcome to the Azure Data Fundamentals course. In this article, we’ll compare three key data processing modes—batch, streaming, and hybrid—to help you architect the right solution for your analytics needs.

## Batch Processing

Batch processing aggregates data over a period, loads it into storage, and runs analytics as a single job. It’s ideal for large-scale reporting when real-time insights aren’t required.

Key steps:

- Collect data (e.g., all sales transactions across Canada).
- Load into a central data warehouse.
- Execute analytics on a schedule (daily, weekly, monthly).
- Generate dashboards and reports.

![The image illustrates two modes of data processing: "Batch" and "Stream," with a focus on batch processing, which involves standard analytic processing triggered after data is gathered.](https://kodekloud.com/kk-media/image/upload/v1752872895/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Processing-Modes/batch-stream-data-processing-illustration.jpg)

You can trigger batch jobs in different ways:

| Trigger Type | Description                                 | Example                           |
| ------------ | ------------------------------------------- | --------------------------------- |
| Time-based   | Runs at fixed calendar intervals            | Daily sales report at midnight    |
| Event-based  | Starts when data reaches a predefined count | Forecast after 5,000 transactions |
| Conditional  | Activates on custom business logic          | Inventory update on low stock     |

## Stream Processing

Stream processing ingests and analyzes data continuously, delivering low-latency insights. It’s commonly used for IoT telemetry, clickstreams, and other real-time workloads.

Core characteristics:

- Continuous data flow (e.g., sensor readings, user events).
- Processing aimed at real time or near real time.
- Rolling time windows to group and analyze recent data slices.

![The image illustrates two modes of data processing: "Batch" and "Stream," with a focus on stream processing as a continuous, uninterrupted flow of data.](https://kodekloud.com/kk-media/image/upload/v1752872896/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Processing-Modes/batch-stream-data-processing-illustration-2.jpg)

### Rolling Time Windows

A rolling time window processes events within a fixed duration that shifts forward by a defined increment. For example, with a 5-minute window that advances every minute:

- **5:29 PM:** process data from 5:24–5:29
- **5:30 PM:** process data from 5:25–5:30

> [!important]
> **Note**
>
> Time windows longer than one second are generally considered near real-time rather than true real-time.

## Hybrid Processing

Hybrid processing combines continuous ingestion with scheduled batch analytics. You ingest stream data in real time and also store it for periodic batch processing.

![The image illustrates a "Hybrid Modes" concept, showing a data warehouse labeled "Build History" and a laptop, with a note about stream processing being ingested into the data warehouse.](https://kodekloud.com/kk-media/image/upload/v1752872897/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Processing-Modes/hybrid-modes-data-warehouse-laptop.jpg)

Use case: A connected refrigerator streams temperature data continuously but only needs trend analysis every few hours or daily.

### Hybrid Transactional and Analytical Processing (HTAP)

HTAP merges OLTP and OLAP in a single pipeline. With [Azure Cosmos DB](https://learn.microsoft.com/azure/cosmos-db/) for high-volume transactions and [Azure Synapse Link](https://learn.microsoft.com/azure/cosmos-db/online-transactional-analytic-processing-htap-overview/) to feed data directly into [Azure Synapse Analytics](https://learn.microsoft.com/azure/synapse-analytics/), you can eliminate separate ETL tasks.

![The image illustrates "Hybrid Modes" in data processing, specifically focusing on Hybrid Transaction and Analytical Processing (HTAP) with components like OLTP, OLAP, Cosmos DB, and Azure Synapse Link.](https://kodekloud.com/kk-media/image/upload/v1752872899/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Processing-Modes/hybrid-modes-data-processing-htap.jpg)

## Stream Processing Components

To build a robust streaming pipeline, you need:

- **Events**  
  Individual messages from devices or applications (e.g., temperature readings, status updates).
- **Ingestion Services**
  - [Azure Event Hubs](https://learn.microsoft.com/azure/event-hubs/) for large-scale streaming.
  - [Azure IoT Hub](https://learn.microsoft.com/azure/iot-hubs/) optimized for IoT scenarios.
  - Apache [Kafka](https://kafka.apache.org/) as an open-source alternative.

- **Sinks**  
  Downstream targets such as data lakes, data warehouses, or analytics platforms.
- **Analytic Clusters**  
  Scalable compute clusters for resource-intensive, near real-time processing when single-node compute isn’t enough.

![The image illustrates stream components, highlighting "Sinks" for data storage using Data Lake, Azure Synapse, and Databricks, and "Analytic Clusters" for resource-intensive processing.](https://kodekloud.com/kk-media/image/upload/v1752872900/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Processing-Modes/stream-components-sinks-analytic-clusters.jpg)

## Further Reading

- [Azure Data Lake Storage overview](https://learn.microsoft.com/azure/storage/blobs/data-lake-storage-introduction)
- [Azure Synapse Analytics documentation](https://learn.microsoft.com/azure/synapse-analytics/)
- [Design patterns for streaming pipelines](https://learn.microsoft.com/azure/architecture/data-guide/relational-data/stream-processing)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/dp-900-microsoft-azure-data-fundamentals/module/a4f1a604-4743-4a3a-81ac-8210d6f9bb96/lesson/853ea3f8-6a73-4028-92ea-ff848487a9f5)**
>
> Watch video content
