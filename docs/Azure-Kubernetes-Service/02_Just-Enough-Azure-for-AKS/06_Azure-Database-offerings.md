# Azure Database offerings - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Azure-Kubernetes-Service/Just-Enough-Azure-for-AKS/Azure-Database-offerings)

---

## Table of Contents

- Azure Database offerings
  - At a Glance
  - Azure SQL Offerings
  - Azure Database for Open Source Relational Engines
  - Azure Cosmos DB
  - Links and References
  - Watch Video
    - Deployment and Scaling
    - Global Distribution & Throughput

---

## Content

Azure Kubernetes Service

Just Enough Azure for AKS

# Azure Database offerings

When building cloud-native or hybrid applications on Azure, choosing the right database service is critical. Azure’s data platform spans relational and NoSQL offerings, delivering fully managed options, predictable performance, global distribution, and enterprise-grade security.

## At a Glance

| Category                                 | Service                             | Deployment Type | Key Benefits                                   |
| ---------------------------------------- | ----------------------------------- | --------------- | ---------------------------------------------- |
| Azure SQL                                | Azure SQL Database                  | PaaS            | Single DB, elastic pools, Hyperscale scaling   |
|                                          | Azure SQL Managed Instance          | PaaS            | Near 100% SQL Server compatibility             |
|                                          | SQL Server on Azure Virtual Machine | IaaS            | Full OS/SQL control, custom extensions         |
| Open Source Relational Engines           | Azure Database for MySQL            | PaaS            | Community MySQL, high availability, scaling    |
|                                          | Azure Database for MariaDB          | PaaS            | Predictable performance, built-in security     |
|                                          | Azure Database for PostgreSQL       | PaaS            | Single & Flexible Server, HA, enterprise-grade |
| Globally Distributed NoSQL (Multi-Model) | Azure Cosmos DB                     | PaaS            | JSON, MongoDB, Gremlin, Cassandra, Table APIs  |

## Azure SQL Offerings

Azure SQL delivers managed SQL Server–based engines with varying levels of control and compatibility:

| Service                        | Description                                                                             | Ideal Use Case                               |
| ------------------------------ | --------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Azure SQL Database**         | Fully managed single databases, elastic pools, or Hyperscale for large-scale workloads. | New cloud apps, SaaS, rapid scaling          |
| **Azure SQL Managed Instance** | Hosted PaaS instance with near-100% compatibility to on-premises SQL Server.            | Lift-and-shift migrations, legacy apps       |
| **SQL Server on Azure VM**     | Infrastructure-level control over the OS and SQL Server instance.                       | Custom extensions, unsupported PaaS features |

### Deployment and Scaling

```
# Create a single Azure SQL Database
az sql db create \
  --resource-group myRG \
  --server mySqlServer \
  --name myDatabase \
  --service-objective S0
```

> [!important]
> **Note**
>
> Azure SQL Database Hyperscale supports up to 100 TB of storage and rapid auto-scaling—ideal for unpredictable workloads.

## Azure Database for Open Source Relational Engines

Azure’s managed services for MySQL, MariaDB, and PostgreSQL deliver community-driven engines with enterprise features:

| Engine         | Deployment Model         | High Availability | Scaling Options            |
| -------------- | ------------------------ | ----------------- | -------------------------- |
| **MySQL**      | Single Server            | Zone redundant    | Vertical and read replicas |
| **MariaDB**    | Single Server            | Zone redundant    | Vertical scaling           |
| **PostgreSQL** | Single & Flexible Server | Built-in HA       | Read replicas, burst       |

**Quickstart: Deploy PostgreSQL Flexible Server**

```
az postgres flexible-server create \
  --resource-group myRG \
  --name myFlexServer \
  --location eastus \
  --tier Burstable \
  --storage-size 128
```

## Azure Cosmos DB

Azure Cosmos DB is a fully managed, globally distributed NoSQL database service with multi-model support and five well-defined consistency levels:

- **Core (SQL) API** for schemaless JSON.
- **MongoDB API** for wire-protocol compatibility.
- **Gremlin API** for graph data models.
- **Cassandra API** for wide-column workloads.
- **Table API** for key–value storage.

> [!important]
> **Warning**
>
> Selecting a consistency level has cost and performance implications. Review [Consistency levels in Azure Cosmos DB](https://docs.microsoft.com/azure/cosmos-db/consistency-levels) before production deployments.

### Global Distribution & Throughput

```
{
  "location": "East US",
  "locations": [
    { "locationName": "East US", "failoverPriority": 0 },
    { "locationName": "West Europe", "failoverPriority": 1 }
  ],
  "databaseThroughput": 400
}
```

## Links and References

- [Azure SQL Database Documentation](https://docs.microsoft.com/azure/azure-sql/)
- [Azure Database for MySQL](https://docs.microsoft.com/azure/mysql/)
- [Azure Database for PostgreSQL](https://docs.microsoft.com/azure/postgresql/)
- [Azure Cosmos DB Overview](https://docs.microsoft.com/azure/cosmos-db/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/azure-kubernetes-service/module/4a7168ba-8262-47d0-a9de-7a4342b0b0f6/lesson/198e355c-e2bb-40bd-84c3-5f649d9c5960)**
>
> Watch video content
