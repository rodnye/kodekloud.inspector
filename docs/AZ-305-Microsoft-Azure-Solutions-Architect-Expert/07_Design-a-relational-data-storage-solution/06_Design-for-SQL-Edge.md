# Design for SQL Edge - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-305-Microsoft-Azure-Solutions-Architect-Expert/Design-a-relational-data-storage-solution/Design-for-SQL-Edge)

---

## Table of Contents

- Design for SQL Edge
  - Connectivity
  - Editions and Deployment Models
  - Key Features
  - Architecture Overview
  - Conclusion
  - Watch Video

---

## Content

AZ-305: Microsoft Azure Solutions Architect Expert

Design a relational data storage solution

# Design for SQL Edge

SQL Edge is a specialized relational database engineered for IoT and IoT Edge deployments. In this guide, we explore the fundamental design elements, the available deployment models, and the robust architecture that make SQL Edge the ideal choice for managing diverse IoT scenarios.

## Connectivity

SQL Edge is designed to operate in environments with intermittent or no network connectivity. This capability makes it especially suitable for deployments in remote or isolated locations. For instance, an IoT device installed in a remote setting without reliable internet access can still benefit from SQL Edge by running it as a container. This enables local data collection and processing without depending on continuous connectivity.

> [!important]
> **Key Benefit**
>
> SQL Edge’s local database capability ensures that limited network bandwidth does not compromise performance.

## Editions and Deployment Models

SQL Edge is available in two distinct editions that offer similar feature sets, differing primarily in usage rights and resource allocations:

- **SQL Edge Developer Edition**  
  Intended for development purposes, this edition limits each developer container to four CPU cores and 32 GB of memory.
- **SQL Edge Production Edition**  
  Optimized for production environments, production containers can utilize up to eight CPU cores and 64 GB of memory.

Additionally, there are two primary deployment models:

- **Connected Deployment**  
  Deploy SQL Edge via IoT Edge in scenarios where devices maintain a network connection.
- **Disconnected Deployment**  
  Deploy SQL Edge as a standalone Docker container or within a Kubernetes cluster in environments where devices are isolated from a network.

## Key Features

SQL Edge comes with a suite of powerful features tailored for IoT applications:

- **Bandwidth Efficiency**  
  With a local database, SQL Edge minimizes performance impacts caused by low network bandwidth.
- **Security**  
  Robust security measures include Role-Based Access Control (RBAC), encryption, and data classification.
- **Data Synchronization**  
  Seamlessly synchronizes data with Azure SQL Database, SQL Server, and Cosmos DB.
- **Developer Familiarity**  
  Developers experienced with SQL Server or SQL Database will find SQL Edge intuitive, as it shares the same codebase and development practices.

## Architecture Overview

SQL Edge leverages a powerful streaming engine at its core to manage and transform incoming IoT data. The process workflow is outlined below:

1.  IoT devices send data to the streaming engine.
2.  The streaming engine processes the incoming data and stores it in the SQL Server database.
3.  Developers can implement custom stored procedures and functions to further analyze or process the data.
4.  The stored data supports more advanced analysis, including the creation of machine learning models.
5.  Finally, the ingested data is synchronized with external services such as Cosmos DB, SQL Database, and SQL Managed Instance.

![The image is a diagram illustrating the design for SQL Edge, showing the flow from IoT devices through ingestion, processing, and analysis using Azure SQL Edge, with machine learning and data exchange components.](https://kodekloud.com/kk-media/image/upload/v1752867169/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-SQL-Edge/sql-edge-iot-flow-diagram.jpg)

This diagram effectively represents the overall working architecture of SQL Edge. It visualizes how data from IoT devices is captured, processed, and then exchanged with external databases or analytical platforms.

## Conclusion

This article has provided a comprehensive overview of SQL Edge, including its connectivity options, edition differences, deployment configurations, and underlying architecture. SQL Edge empowers efficient data management for IoT devices in both connected and disconnected environments.

Future sections will delve into data integration strategies, examining complementary services such as Data Factory, Data Lake, and other related technologies.

> [!important]
> **Further Reading**
>
> For additional insights into IoT and data management, consider exploring [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/) and [Azure Documentation](https://docs.microsoft.com/azure/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-305-microsoft-azure-solutions-architect-expert/module/9697e3cc-0c47-4c28-aac7-fd0fcc89cdb2/lesson/7eb18d12-ca8a-4e3a-ac05-7e10f50d0e8e)**
>
> Watch video content
