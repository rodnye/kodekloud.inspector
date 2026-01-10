# Roles and Responsibilities - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DP-900-Microsoft-Azure-Data-Fundamentals/Cosmos-DB/Roles-and-Responsibilities)

---

## Table of Contents

- Roles and Responsibilities
  - Overview
  - Key Roles
  - Choosing the Right API
  - Main Takeaways
  - Links and References
  - Watch Video
    - Application Users
    - Database Administrators (DBAs)
    - Analysts and Developers
    - Data Engineers

---

## Content

DP-900: Microsoft Azure Data Fundamentals

Cosmos DB

# Roles and Responsibilities

This lesson walks through the key roles involved in planning, configuring, and maintaining an Azure Cosmos DB account. We’ll also highlight best practices and summarize the main takeaways at the end.

## Overview

Configuring a production-ready Cosmos DB environment is more complex than a simple Table Storage or many relational database deployments. Multiple teams collaborate to ensure secure access, optimal throughput, and global distribution.

## Key Roles

### Application Users

Application users never interact with Cosmos DB directly. Instead, they connect through your application layer, which enforces authorization and business logic.

- Ensures least-privileged access to data
- Prevents unauthorized operations
- Centralizes validation and auditing

> [!important]
> **Note**
>
> Follow the principle of least privilege: grant only the minimum permissions required for each user role.

### Database Administrators (DBAs)

DBAs own the overall health and configuration of the Cosmos DB account:

- Manage role-based access control (RBAC) for users and applications
- Implement backup, restore, and point-in-time restore policies
- Configure global distribution, failover regions, and consistency levels
- Fine-tune throughput (Request Units) at the database and container level
- Coordinate schema-change processes with development teams

### Analysts and Developers

Developers and data analysts define your data model and choose the best API for your workload. They typically:

- Design JSON document structures or graph models
- Evaluate query patterns and indexing strategies
- Recommend one of Cosmos DB’s APIs (see table below)
- Provide schema recommendations to DBAs or apply them via CI/CD

### Data Engineers

Data engineers estimate and monitor throughput requirements to balance performance and cost:

- Analyze historical traffic patterns and logs
- Map request rates to Request Units (RUs) consumed
- Generate RU allocation plans at the database or container level
- Provide dashboards and alerts for RU consumption

> [!important]
> **Warning**
>
> Under-provisioning RUs can lead to rate-limiting errors (429 responses). Always include a buffer for traffic spikes.

## Choosing the Right API

Cosmos DB supports multiple APIs. Use the table below to select the best one for your workload:

| API                | Use Case                         | Protocol / Query Language        |
| ------------------ | -------------------------------- | -------------------------------- |
| Core (NoSQL) API   | JSON documents, SQL-like queries | SQL over HTTP                    |
| MongoDB API        | MongoDB-compatible applications  | MongoDB wire protocol            |
| Cassandra API      | Wide-column stores, CQL queries  | Cassandra Query Language (CQL)   |
| Apache Gremlin API | Graph and network data models    | Gremlin graph traversal language |

## Main Takeaways

- Azure Cosmos DB is a **globally distributed**, **multi-model** database service
- Delivers single-digit millisecond write latency at 99% SLA
- Supports JSON document stores via Core (NoSQL) and MongoDB APIs
- Offers Cassandra API for CQL workloads and Gremlin API for graph data
- Wire-protocol compatibility simplifies migration from MongoDB or Cassandra
- Throughput is managed through Request Units (RUs) at the database or container level

![The image is a summary slide listing three points: Apache Gremlin for graph databases, Azure Cassandra and MongoDB support easy migration, and control throughput by purchasing Request Units (RUs).](https://kodekloud.com/kk-media/image/upload/v1752872943/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Roles-and-Responsibilities/apache-gremlin-azure-cassandra-mongodb-summary.jpg)

## Links and References

- [Azure Cosmos DB overview](https://docs.microsoft.com/azure/cosmos-db/introduction)
- [Choose the right API in Azure Cosmos DB](https://docs.microsoft.com/azure/cosmos-db/multiple-apis)
- [Azure Cosmos DB Request Units and throughput](https://docs.microsoft.com/azure/cosmos-db/request-units)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/dp-900-microsoft-azure-data-fundamentals/module/06b26525-f54a-46ed-84c1-da4191607325/lesson/9d2a282b-d889-4e1d-b0da-7dae41cf66d7)**
>
> Watch video content
