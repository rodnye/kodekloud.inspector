# Provisioning Azure Cosmos DB - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Exploring-Azure-Cosmos-DB/Provisioning-Azure-Cosmos-DB)

---

## Table of Contents

- Provisioning Azure Cosmos DB
  - Available APIs
  - Capacity Modes
  - Choosing the Right Capacity Mode
  - Watch Video
    - Azure Cosmos DB for NoSQL
    - Azure Cosmos DB for PostgreSQL
    - Cosmos DB for MongoDB
    - Azure Cosmos DB for Apache Cassandra
    - Azure Cosmos DB for Table
    - Azure Cosmos DB for Apache Gremlin
    - Understanding Capacity Models

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Exploring Azure Cosmos DB

# Provisioning Azure Cosmos DB

Provisioning Azure Cosmos DB involves selecting the appropriate API to best support your workload. Azure Cosmos DB supports multiple APIs, with each one tailored to different data models and application architectures. It is crucial to choose the correct API when creating your Cosmos DB account since the API selection is immutable.

## Available APIs

### Azure Cosmos DB for NoSQL

This core API, often referred to as the native API, uses a familiar SQL-based syntax to query JSON documents. It is ideal for developers accustomed to relational databases who need the flexibility of NoSQL.

### Azure Cosmos DB for PostgreSQL

This fully managed PostgreSQL service supports relational data alongside distributed query execution across multiple nodes. It is an excellent choice for applications that require a robust relational model combined with scalability.

### Cosmos DB for MongoDB

Designed for users with existing MongoDB applications, this API facilitates migration with minimal changes. It retains MongoDB syntax and data models while leveraging Cosmos DB's globally distributed architecture.

### Azure Cosmos DB for Apache Cassandra

For applications built with Cassandra, this API allows you to benefit from Cosmos DB's scalability and global distribution while remaining compatible with your existing Cassandra deployments.

### Azure Cosmos DB for Table

Ideal for developers familiar with Azure Table Storage, this API eases the migration of table-based applications, providing enhanced performance, scalability, and global distribution.

### Azure Cosmos DB for Apache Gremlin

This graph API is perfect for applications that model data as nodes and edges, supporting complex interrelationships, such as those found in social networks or recommendation engines.

## Capacity Modes

When deploying a Cosmos DB account, you must choose between two capacity modes: provisioned throughput and serverless.

![The image is a selection interface for creating an Azure Cosmos DB account, offering different database options like NoSQL, PostgreSQL, MongoDB, Apache Cassandra, Table, and Apache Gremlin. It also includes options for capacity mode: provisioned throughput or serverless.](https://kodekloud.com/kk-media/image/upload/v1752866455/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Provisioning-Azure-Cosmos-DB/azure-cosmos-db-account-interface.jpg)

### Understanding Capacity Models

Capacity mode in Azure Cosmos DB defines both billing and performance allocation. The two main options are:

- **Serverless:**  
  Best suited for applications with sporadic or infrequent traffic, serverless mode charges only for the request units (RUs) consumed. This eliminates the need to provision throughput ahead of time, making it a cost-efficient option for development, testing, or low-traffic applications.
- **Provisioned Throughput:**  
  This mode enables you to reserve a specific number of request units per second. Provisioned throughput can be managed in two ways:
  - **Autoscale:**  
    Automatically adjust throughput between 10% of the provisioned maximum and full capacity based on traffic demand. This setting is ideal for workloads with fluctuating traffic, optimizing both cost efficiency and performance.
  - **Manual Configuration:**  
    Specify a fixed throughput (in request units per second) to support consistent and predictable workloads. For example, you might provision 4,000 RUs for a production environment with steady demand.

Before diving deeper into capacity modes, it's important to understand the concept of request units (RUs), which serve as the currency for measuring the throughput needed to handle read and write operations.

> [!important]
> **Note**
>
> For a detailed exploration of request units and their calculation, refer to our dedicated lesson on this topic.

![The image is a flowchart illustrating different capacity modes for request units, including "Serverless," "Auto Scale," and "Manual" under the "Provisioned" category.](https://kodekloud.com/kk-media/image/upload/v1752866456/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Provisioning-Azure-Cosmos-DB/capacity-modes-request-units-flowchart.jpg)

## Choosing the Right Capacity Mode

- **Serverless Mode:**  
  Serverless is most effective for development, testing, and applications with low or sporadic traffic. It negates the need for pre-provisioned throughput, offering a cost-effective approach during the initial stages of application development.
- **Provisioned Throughput:**  
  For production workloads, provisioned throughput is generally recommended. Within this mode, you can choose between autoscale and manual configurations based on application demand:
  - **Autoscale:** Automatically adjusts throughput for workloads with variable traffic,
  - **Manual:** Offers precise control for applications with predictable usage patterns.

![The image compares serverless and provisioned capacity modes, highlighting serverless as best for developers and provisioned (auto scale and manual) as best for production.](https://kodekloud.com/kk-media/image/upload/v1752866458/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Provisioning-Azure-Cosmos-DB/serverless-vs-provisioned-capacity.jpg)

Now that you understand the fundamentals of request units, capacity modes, and the differences between serverless and provisioned throughput, you're ready to deploy Azure Cosmos DB through the Azure Portal.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/4324d56c-2a24-4e04-8462-56f31e16be95/lesson/53f48916-984e-4662-9f08-cba998717ac6)**
>
> Watch video content
