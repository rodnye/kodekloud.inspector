# Roles and Responsibilities - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DP-900-Microsoft-Azure-Data-Fundamentals/Semi-Structured-Data/Roles-and-Responsibilities)

---

## Table of Contents

- Roles and Responsibilities
  - Key Takeaways
  - Links and References
  - Watch Video

---

## Content

DP-900: Microsoft Azure Data Fundamentals

Semi Structured Data

# Roles and Responsibilities

In this final section, we explore the primary roles and responsibilities required to manage Azure Table Storage effectively. Understanding these roles helps ensure secure access, optimal performance, and maintainable schema design.

| Role                      | Primary Responsibilities                                                                                                                                                                                  |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Users**                 | \\- Interact with Table Storage through applications rather than direct access<br>- Require assigned permissions for both user accounts and service principals                                            |
| **Administrators**        | \\- Also known as Database Administrators (DBAs)<br>- Grant and revoke access rights to control who can perform specific actions<br>- Perform backups and restores for recovery                           |
| **Analysts & Developers** | \\- Determine optimal `PartitionKey` and `RowKey` values to distribute data and speed up queries<br>- Define entity properties to enforce a consistent schema<br>- Monitor performance and refine queries |

![The image outlines roles and responsibilities for users, administrators, and analysts/developers, detailing tasks like data extraction, security management, and key design.](https://kodekloud.com/kk-media/image/upload/v1752873037/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Roles-and-Responsibilities/roles-responsibilities-users-administrators-developers.jpg)

> [!important]
> **Schema Flexibility**
>
> Azure Table Storage supports a semi-structured schema: each entity can have different properties. However, aligning on a core set of attributes per row prevents uncontrolled schema growth and simplifies data handling.

## Key Takeaways

- **Deployment Options**
  - Native [Azure Table Storage](https://docs.microsoft.com/azure/storage/tables/table-storage-overview)
  - [Azure Cosmos DB Table API](https://docs.microsoft.com/azure/cosmos-db/table-introduction) for global distribution and low latency
- **NoSQL Key–Value Model**
  - Each entity (row) holds all related data for a single transaction
- **Required Keys**
  - Every row must include a `PartitionKey`, `RowKey`, and `Timestamp`
- **PartitionKey**
  - Determines how data is distributed across storage nodes
  - Narrow your query to a single partition to limit scanned rows and improve performance
- **RowKey**
  - Unique within its partition and automatically indexed for fast lookups
  - Requires an exact `PartitionKey` match to leverage the index
- **Flexible Schema**
  - Store varying properties per row
  - Maintain a baseline attribute set to ensure consistency and manageability

> [!important]
> **Performance Tip**
>
> An unbalanced partition strategy (e.g., “hot” partitions) can cause throttling. Monitor access patterns and adjust your `PartitionKey` design to distribute load evenly.

## Links and References

- [Azure Table Storage overview](https://docs.microsoft.com/azure/storage/tables/table-storage-overview)
- [Azure Cosmos DB Table API](https://docs.microsoft.com/azure/cosmos-db/table-introduction)
- [Design guidelines for Azure Table Storage](https://docs.microsoft.com/azure/storage/tables/table-storage-design-guide)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/dp-900-microsoft-azure-data-fundamentals/module/cf08821c-abc1-43a0-b8aa-a294849914c0/lesson/eace06b0-4c65-4b9c-8359-76ba8e4d61ee)**
>
> Watch video content
