# Roles and Responsibilities - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DP-900-Microsoft-Azure-Data-Fundamentals/Structured-Data/Roles-and-Responsibilities)

---

## Table of Contents

- Roles and Responsibilities
  - User Accounts and Permission Models
  - Applications and Reporting Tools
  - Database Administrators
  - Data Analysts
  - Data Engineers
  - Core Characteristics of Structured Data
  - Deployment Options and Considerations
  - Watch Video

---

## Content

DP-900: Microsoft Azure Data Fundamentals

Structured Data

# Roles and Responsibilities

In a relational database environment, clear separation of duties ensures data security, integrity, and availability. Below, we outline each role’s scope, permission level, and core tasks.

## User Accounts and Permission Models

Regular users require finely tuned access to perform their daily tasks without overstepping boundaries.

| Permission Type       | Description                                    |
| --------------------- | ---------------------------------------------- |
| Read Only             | View existing rows and schema definitions only |
| Insert Without Select | Add new rows without seeing existing data      |
| Delete Rows           | Remove rows under controlled conditions        |

> [!important]
> **Best Practice**
>
> Grant the minimum necessary permissions following the principle of least privilege. Regularly audit roles to ensure they match current job functions.

## Applications and Reporting Tools

Applications and BI tools should inherit or explicitly receive the same permissions as individual users.

- Honor end-user credentials by default
- Require explicit grants when operating under a service account
- Prevent unauthorized data operations through role-based access

## Database Administrators

DBAs oversee the entire lifecycle of database operations:

- Assign and revoke user permissions
- Configure automated backups and restore procedures
- Monitor system health and performance metrics
- Plan and execute disaster recovery drills

## Data Analysts

Analysts focus on schema design and data model optimization:

- Use Data Definition Language (DDL) to create or modify tables
- Implement normalization rules to reduce redundancy
- Typically cannot SELECT sensitive production data directly

## Data Engineers

Engineers specialize in deployment and performance tuning:

- Configure database clusters and edge deployments (e.g., Azure IoT Edge)
- Optimize indexing, partitioning, and query plans
- Maintain schema integrity without viewing or exporting raw data

![The image outlines roles and responsibilities for Users, Database Administrators, Analysts, and Engineers, detailing their tasks in data management and system configuration.](https://kodekloud.com/kk-media/image/upload/v1752873094/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Roles-and-Responsibilities/roles-responsibilities-users-database-engineers.jpg)

## Core Characteristics of Structured Data

Structured data lives in relational tables with well-defined schemas and relationships:

- Stored in relational database management systems (RDBMS)
- Supports Online Transaction Processing (OLTP) and batch workflows
- Organized into normalized tables with consistent column definitions
- Relationships enforced via primary keys (PK) and foreign keys (FK)
- Accessed and manipulated using SQL (SELECT, INSERT, UPDATE, DELETE)

![The image summarizes key characteristics of structured data, highlighting its storage in relational databases, support for transaction processing, use of normalized tables, relationships with keys, and interaction through SQL statements.](https://kodekloud.com/kk-media/image/upload/v1752873095/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Roles-and-Responsibilities/structured-data-relational-databases-summary.jpg)

## Deployment Options and Considerations

Choosing the right infrastructure impacts cost, scalability, and reliability:

| Deployment Type         | Pros                           | Cons                       |
| ----------------------- | ------------------------------ | -------------------------- |
| Virtual Machines + DBMS | Full control, custom tuning    | Requires server management |
| Serverless Databases    | Automatic scaling, pay-per-use | Potential cold starts      |

- Scale horizontally or vertically as transaction volume increases
- Enforce ACID properties to maintain consistency across updates
- Administrators manage network access, encryption, and patching

> [!important]
> **Warning**
>
> Improper configuration of network security groups or firewall rules can expose your database to external threats. Always restrict access to known IP ranges.

![The image is a summary of structured data, highlighting solutions like VMs with DBMSes, transaction limits, integrity for consistency, and administrator roles in access and security management.](https://kodekloud.com/kk-media/image/upload/v1752873097/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Roles-and-Responsibilities/structured-data-summary-vms-dbms-solutions.jpg)

- [Relational Database Concepts](https://docs.microsoft.com/azure/architecture/data-guide/relational-data/)
- [Azure SQL Database Documentation](https://learn.microsoft.com/azure/azure-sql/)
- [Principles of Least Privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/dp-900-microsoft-azure-data-fundamentals/module/ab06c95a-37f6-40d4-9dd8-b5a6961866b5/lesson/acd63a62-eeec-4404-ba69-e0a7c4c78921)**
>
> Watch video content
