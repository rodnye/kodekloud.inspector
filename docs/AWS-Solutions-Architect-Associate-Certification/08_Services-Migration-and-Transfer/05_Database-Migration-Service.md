# Database Migration Service - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Migration-and-Transfer/Database-Migration-Service)

---

## Table of Contents

- Database Migration Service
  - Key Components of DMS
  - Migration Types
  - Continuous Data Replication and Schema Conversion
  - Endpoints and Tasks
  - Use Cases of Database Migration Service
  - Watch Video
    - DMS Fleet Advisor
    - DMS Schema Conversion Tool
    - Replication Instance

---

## Content

AWS Solutions Architect Associate Certification

Services Migration and Transfer

# Database Migration Service

In this lesson, we explore the AWS Database Migration Service (DMS), a managed solution designed to help you quickly and securely migrate databases and analytics workloads to AWS with minimal downtime and zero data loss. DMS is to databases what Application Migration Service is to servers and applications – offering specialized tools that streamline the migration process. This service is ideal for moving databases from on-premises environments to the cloud, supporting over 20 different database and analytics platforms including MySQL, PostgreSQL, and more.

---

## Key Components of DMS

### DMS Fleet Advisor

The DMS Fleet Advisor gathers data from multiple database environments to provide comprehensive insights into your data infrastructure. It supports popular databases such as Microsoft SQL Server, MySQL, Oracle, and PostgreSQL. A data collector is installed on your database server (for example, a MySQL on-premises server) and captures essential information, which is then reported to DMS. This data can be exported for further analysis.

![The image is a flowchart illustrating the components of the DMS Fleet Advisor, showing data flow from a Data Center to DMS Data Collector, then to S3, AWS DMS, and finally exporting to CSV.](https://kodekloud.com/kk-media/image/upload/v1752865416/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Database-Migration-Service/dms-fleet-advisor-flowchart.jpg)

This process is similar to the discovery phase in other migration services, where an agent collects environment data to help you assess migration requirements.

---

### DMS Schema Conversion Tool

The DMS Schema Conversion Tool is specifically designed to simplify migrations between different database types. It evaluates the complexity of the migration and converts database schemas along with associated code objects. For example, when switching from MySQL to PostgreSQL, the tool addresses subtle differences in schema definitions between the two systems.

![The image is a diagram of DMS Schema Conversion Tool components, showing a database icon connected to "Predictable Schema Analysis" and "Evaluate Complexity" processes.](https://kodekloud.com/kk-media/image/upload/v1752865417/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Database-Migration-Service/dms-schema-conversion-tool-diagram.jpg)

> [!important]
> **Note**
>
> The Schema Conversion Tool is particularly beneficial when migrating between systems with differing SQL dialects, ensuring that your target environment is correctly configured.

---

### Replication Instance

During the migration process, the replication instance continuously transfers data from your on-premises source to the AWS target environment. This ensures that the target always mirrors the most current data. AWS DMS connects to your data stores via endpoints, which function as access points for both the source and the target databases. When configuring these endpoints, details such as endpoint type (source or target), database engine (e.g., Oracle or MySQL), server address, port number, encryption options, and credentials must be specified to guarantee secure connectivity.

![The image illustrates a diagram of DMS components, showing a corporate data center with a database connected to a replication instance on Amazon EC2.](https://kodekloud.com/kk-media/image/upload/v1752865418/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Database-Migration-Service/dms-components-diagram-amazon-ec2.jpg)

![The image illustrates components of a DMS (Database Migration Service) replication instance, highlighting endpoint information such as source or target, DB type, server name and port, encryption, and credentials.](https://kodekloud.com/kk-media/image/upload/v1752865420/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Database-Migration-Service/dms-replication-instance-endpoints.jpg)

After defining the endpoints, you create a replication task by selecting the replication instance and specifying the source (on-premises) and target (AWS) endpoints. This task then manages the migration process seamlessly.

---

## Migration Types

DMS supports several migration strategies to suit different use cases:

1.  **Full Load:** Migrates all current data from the source to the target database while creating necessary tables. This method is suitable if you can allocate a brief period of downtime.
2.  **Full Load plus CDC (Change Data Capture):** Performs a complete initial data load and then captures any ongoing changes in the source database. This ensures that after the initial migration, the target database is continuously updated until final cutover.
3.  **CDC Only:** When a bulk initial load is handled by another method, DMS can be used solely for capturing and applying ongoing changes during the migration process, particularly in homogeneous environments using native tools.

![The image illustrates the components of a DMS replication task, showing the flow from a source endpoint to a target endpoint, with options for full load, full load plus CDC, and CDC only.](https://kodekloud.com/kk-media/image/upload/v1752865421/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Database-Migration-Service/dms-replication-task-components-diagram.jpg)

---

## Continuous Data Replication and Schema Conversion

One of the key strengths of AWS DMS is its ability to maintain continuous data replication between the source and target databases, keeping both environments in sync throughout the migration period.

![The image illustrates a continuous data replication process using AWS Database Migration Service (AWS DMS) to replicate data from Oracle and MongoDB instances to Oracle and Amazon DocumentDB in the AWS Cloud.](https://kodekloud.com/kk-media/image/upload/v1752865422/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Database-Migration-Service/aws-dms-data-replication-diagram.jpg)

Additionally, AWS DMS provides automatic schema conversion. This feature adapts the source database schema to match the target. For example, it can map an Oracle VARCHAR2 data type to a PostgreSQL VARCHAR or convert schemas from various data warehouse formats to Amazon Redshift.

![The image illustrates a schema conversion process from an on-premise Oracle instance to AWS Cloud using a Schema Conversion Tool (SCT), targeting Oracle and Amazon Redshift instances.](https://kodekloud.com/kk-media/image/upload/v1752865424/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Database-Migration-Service/oracle-to-aws-schema-conversion.jpg)

---

## Endpoints and Tasks

Endpoints in AWS DMS represent source and target databases. For instance, an on-premises Oracle database serves as a source endpoint, while an Amazon Aurora database in the cloud serves as a destination endpoint. A migration task defines how data moves from the source to the target. These tasks can be started, stopped, paused, updated, and monitored to ensure real-time progress and receive actionable alerts.

![The image illustrates a Database Migration Service process, showing the migration of an Oracle instance from a corporate data center to AWS Cloud using DMS Migration. It includes task actions like stop, pause, modify, and task monitoring features.](https://kodekloud.com/kk-media/image/upload/v1752865425/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Database-Migration-Service/database-migration-service-aws-dms.jpg)

> [!important]
> **Warning**
>
> Ensure that all endpoint configurations, including encryption and credential settings, are correct before initiating the migration to prevent potential data loss or security issues.

---

## Use Cases of Database Migration Service

AWS Database Migration Service is a versatile tool that can be used in several scenarios:

| Use Case                    | Description                                                                                                    | Example                                                   |
| --------------------------- | -------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| Data Migration              | Transfer databases from legacy systems or on-premises environments to AWS-managed cloud environments.          | Migrating an on-premise Oracle database to Amazon Aurora. |
| Change Data Capture         | Continuously replicate and apply data changes between source and target databases in real time.                | Syncing a MySQL source with a PostgreSQL target.          |
| Integration with Data Lakes | Facilitate the construction of data lakes and enable real-time processing of changes from various data stores. | Ingesting and processing data for analytics on AWS.       |

![The image shows three use cases: "Migrate Data," "CDC," and "Data Lake," each represented by an icon within a purple circle.](https://kodekloud.com/kk-media/image/upload/v1752865426/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Database-Migration-Service/data-use-cases-migrate-cdc-lake.jpg)

By leveraging its robust set of features, AWS DMS provides a seamless and efficient database migration experience with minimal disruption to your operations.

---

For more information on database migration and other AWS services, explore the [AWS Documentation](https://aws.amazon.com/documentation/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/4fd27446-288a-44dc-a3f3-99e943f92fe2/lesson/8e9dde9b-0f3b-40b7-a0d0-afbb7da81871)**
>
> Watch video content
