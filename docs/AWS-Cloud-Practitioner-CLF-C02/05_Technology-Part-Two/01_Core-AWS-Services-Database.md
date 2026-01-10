# Core AWS Services Database - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Cloud-Practitioner-CLF-C02/Technology-Part-Two/Core-AWS-Services-Database)

---

## Table of Contents

- Core AWS Services Database
  - Understanding Data Structures with a Bus Analogy
  - Self-Managed Database Options
  - SQL Database Services
  - NoSQL Database Services
  - Overview and Use Cases
  - Final Summary
  - Watch Video
    - Amazon RDS (Relational Database Service)
    - Amazon Aurora and Aurora Serverless v2
    - Amazon Redshift
    - Summary of SQL Services
    - Amazon DynamoDB
    - Amazon DocumentDB
    - Amazon Keyspaces
    - Amazon Neptune
    - Caching Solutions: ElastiCache
    - Amazon OpenSearch Service
    - Amazon Quantum Ledger Database (QLDB)
    - Amazon Timestream

---

## Content

AWS Cloud Practitioner CLF-C02

Technology Part Two

# Core AWS Services Database

Welcome, Cloud Practitioners! In this lesson, we delve into the core AWS services with an emphasis on databases. Databases are essential applications used to store both structured and unstructured data. In AWS, you primarily work with three types of data stores:

1.  Self-managed databases – where you set up and manage the database infrastructure yourself.
2.  SQL data stores (relational databases) – which rely on Structured Query Language (SQL) for querying data.
3.  NoSQL data stores – designed for handling semi-structured data with operational models distinct from SQL databases.

![The image illustrates three types of databases: Self-Managed Datastores, SQL Datastores, and NoSQL Datastores, each represented by distinct icons.](https://kodekloud.com/kk-media/image/upload/v1752862279/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Database/frame_50.jpg)

Below, we explore these concepts using a variety of analogies and diagrams.

---

## Understanding Data Structures with a Bus Analogy

Think of a fleet of buses to understand structured data. In this analogy, each bus symbolizes a table where rows and columns are like specific seats:

- In a structured data set, if Gordon occupies row one, column C, you can locate him immediately.
- Relationships, such as Gordon’s connection with Marconi in a different bus, may require changes across multiple tables.

This analogy can be summarized as follows:

- Structured data resembles multiple buses with fixed seating assignments.
- Unstructured data is like a single, large bus where you search for an individual by a key attribute, regardless of seat arrangement.

![The image compares structured and unstructured data using a bus seating analogy, showing organized rows and columns with highlighted names.](https://kodekloud.com/kk-media/image/upload/v1752862280/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Database/frame_140.jpg)

In structured systems (SQL data stores), tables (buses) have defined rows (seats) and columns. This design maintains clear relationships between tables, such as linking an employee to a department.

![The image illustrates a bus diagram comparing structured and unstructured data, with labeled rows and names, highlighting data organization.](https://kodekloud.com/kk-media/image/upload/v1752862281/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Database/frame_200.jpg)

In contrast, a NoSQL data store operates like a single large bus. Here, you search by a key attribute rather than a fixed seat assignment. For instance, searching for "Gordon" returns all associated attributes efficiently.

This analogy emphasizes:

- SQL data stores work best in environments with complex relationships, such as transactional systems.
- NoSQL data stores excel at simple, key-based lookups.

![The image compares SQL and NoSQL datastores, highlighting SQL's structured tables and complex relationships versus NoSQL's flexibility for simple, specific data needs.](https://kodekloud.com/kk-media/image/upload/v1752862282/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Database/frame_380.jpg)

---

## Self-Managed Database Options

Self-managed databases provide complete control over your database software. You handle setup, operations, and maintenance—similar to owning a car where you manage insurance, repairs, and customization. On AWS, this means running your database on an EC2 instance or within containers hosted on the Elastic Container Service (ECS) or Elastic Kubernetes Service (EKS).

![The image outlines five aspects of car ownership: owning, driving, repairing, customizing, and being fully responsible for the car.](https://kodekloud.com/kk-media/image/upload/v1752862283/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Database/frame_470.jpg)

> [!important]
> **Note**
>
> When using EC2, ECS, or EKS, you enjoy significant control and flexibility; however, you also assume full responsibility for operational overhead and maintenance.

![The image compares EC2 and Amazon EKS for database hosting, highlighting control, responsibility, cost, and operational overhead, with EKS offering Fargate as a mitigation option.](https://kodekloud.com/kk-media/image/upload/v1752862284/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Database/frame_500.jpg)

To summarize, self-managed options enable you to deploy your software on EC2 or container services. This choice is ideal when you have unique software requirements or stringent security needs.

![The image summarizes self-managed databases, highlighting control, flexibility, operational overhead, and specific software or security needs, with deployment on EC2 or container services.](https://kodekloud.com/kk-media/image/upload/v1752862285/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Database/frame_580.jpg)

---

## SQL Database Services

Before exploring AWS SQL services, ensure you have your notebook handy. AWS offers a variety of SQL solutions that cater to different needs.

### Amazon RDS (Relational Database Service)

Amazon RDS is AWS’s managed relational database service supporting several database engines, including MySQL, MariaDB, PostgreSQL, Oracle, and Microsoft SQL Server. It is highly suitable for transactional processing (OLTP) environments—such as e-commerce platforms—where data consistency and defined relationships are crucial.

![The image describes SQL Datastores as Relational Database Services (RDS), highlighting managed services, transactional processing, and growth challenges, featuring MySQL, MariaDB, PostgreSQL, and Oracle instances.](https://kodekloud.com/kk-media/image/upload/v1752862286/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Database/frame_760.jpg)

### Amazon Aurora and Aurora Serverless v2

Imagine leasing a dedicated car with a driver where you only worry about the backseat; Aurora enhances MySQL and PostgreSQL with cloud-native performance improvements. It is engineered for scalability and high performance.

Aurora Serverless v2 automatically scales and charges only for the compute resources you use, making it cost-effective when idle. Both offerings support MySQL and PostgreSQL.

![The image describes Amazon Aurora Serverless v2, highlighting its managed service, cloud-native nature, high capacity, flexible scaling, and cost-effective storage without compute charges when idle.](https://kodekloud.com/kk-media/image/upload/v1752862287/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Database/frame_1030.jpg)

### Amazon Redshift

For large-scale reporting and analytics, transactional systems might not be the best fit. Instead, consider a data warehouse like Amazon Redshift. Redshift is designed for online analytical processing (OLAP) and manages petabytes of data, available in both server and serverless variants.

![The image outlines leasing a dedicated bus with a driver, emphasizing 24/7 availability, driver inclusion, and responsibility for the bus interior.](https://kodekloud.com/kk-media/image/upload/v1752862289/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Database/frame_1070.jpg)

Redshift is optimized for reporting rather than transactional processing.

![The image describes Amazon Redshift as an AWS SQL data warehouse, highlighting its petabyte scale and availability in serverless and server versions.](https://kodekloud.com/kk-media/image/upload/v1752862290/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Database/frame_1110.jpg)

### Summary of SQL Services

- Use RDS for traditional, managed relational database needs.
- Leverage Aurora or Aurora Serverless v2 for an enhanced, cloud-native relational experience with MySQL or PostgreSQL.
- Choose Redshift for data warehousing and OLAP reporting scenarios.

![The image summarizes AWS SQL database services, including RDS, Aurora, Aurora Serverless v2, and RedShift, highlighting features like encryption, replication, and OLAP reporting.](https://kodekloud.com/kk-media/image/upload/v1752862291/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Database/frame_1230.jpg)

---

## NoSQL Database Services

AWS NoSQL database services are optimized for unstructured or semi-structured data and high-speed lookups.

### Amazon DynamoDB

Amazon DynamoDB is AWS’s leading key-value and document database. It provides extremely fast, low-latency performance, making it perfect for scenarios where you retrieve all attributes with a single key search—ideal for applications like content management or real-time analytics.

### Amazon DocumentDB

Designed for document storage and retrieval, Amazon DocumentDB offers a MongoDB-compatible service. It excels at managing hierarchical data, making it ideal for storing customer profiles or detailed essays.

![The image illustrates Amazon DocumentDB's NoSQL datastore services with MongoDB compatibility, featuring a hierarchical document structure for storing and retrieving data collections.](https://kodekloud.com/kk-media/image/upload/v1752862292/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Database/frame_1350.jpg)

### Amazon Keyspaces

Amazon Keyspaces is a scalable, globally distributed database service built for Apache Cassandra. It is tailored for semi-structured data requiring quick, worldwide access.

![The image illustrates Amazon Keyspaces for Apache Cassandra, highlighting its global scalability for structured, large-scale unstructured data across multiple locations.](https://kodekloud.com/kk-media/image/upload/v1752862294/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Database/frame_1400.jpg)

### Amazon Neptune

For graph-based use cases like social networking or fraud detection, Amazon Neptune serves as the dedicated graph database service. It is optimized for efficiently exploring and analyzing complex data relationships.

![The image illustrates Amazon Neptune, a NoSQL database service, highlighting its use in detecting data relationships, such as fraud detection or social network connections.](https://kodekloud.com/kk-media/image/upload/v1752862294/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Database/frame_1470.jpg)

### Caching Solutions: ElastiCache

Amazon ElastiCache offers two popular in-memory caching engines: Memcached and Redis. These engines significantly boost application performance by caching expensive database queries or storing transient session data.

![The image explains Amazon ElastiCache, highlighting its use for fast data storage with Memcached and Redis, compared to slower regular databases for applications.](https://kodekloud.com/kk-media/image/upload/v1752862296/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Database/frame_1560.jpg)

### Amazon OpenSearch Service

Formerly known as Elasticsearch, Amazon OpenSearch Service is designed to index and quickly search large volumes of data. It supports features such as autocomplete and approximate matching, functioning much like a Google search for your dataset.

![The image describes Amazon OpenSearch Service, a NoSQL datastore, with a search interface for finding relevant information, similar to Google search.](https://kodekloud.com/kk-media/image/upload/v1752862297/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Database/frame_1600.jpg)

### Amazon Quantum Ledger Database (QLDB)

Amazon QLDB is a specialized ledger database that maintains an immutable history of all transactions. Inspired by blockchain principles, it records every change along with detailed metadata—ideal for audit and compliance applications.

![The image describes Amazon Quantum Ledger Database (QLDB) as a NoSQL service providing an immutable record of every database change.](https://kodekloud.com/kk-media/image/upload/v1752862298/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Database/frame_1630.jpg)

### Amazon Timestream

Amazon Timestream is purpose-built for ingesting and analyzing time-series data, such as IoT device logs or streaming data. It automatically timestamps incoming data to facilitate efficient event analysis over time.

![The image illustrates Amazon Timestream, a NoSQL database service, capturing data from various sources while maintaining timestamps.](https://kodekloud.com/kk-media/image/upload/v1752862299/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Database/frame_1740.jpg)

---

## Overview and Use Cases

When selecting an AWS database service, consider the following guidelines:

- For structured, relational, transactional databases, use Amazon RDS or Aurora (including Aurora Serverless v2).
- For structured reporting and analytics, Amazon Redshift is optimal.
- For fast, key-value lookups and handling large unstructured data, choose DynamoDB.
- Store hierarchical document data with Amazon DocumentDB.
- Use Amazon Keyspaces for globally distributed, Apache Cassandra-compatible requirements.
- Boost application performance with in-memory caching via Amazon ElastiCache (or MemoryDB for Redis).
- Implement fast search capabilities using Amazon OpenSearch Service.
- Explore data relationships with Amazon Neptune for graph-based data.
- Maintain an immutable transaction record with Amazon QLDB.
- Manage time-series data efficiently with Amazon Timestream.

![The image is a diagram showing different Amazon database services connected to an application, highlighting various data needs like secure transactions, document collections, and structured reporting.](https://kodekloud.com/kk-media/image/upload/v1752862300/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Database/frame_1800.jpg)

---

## Final Summary

- Self-managed databases grant unparalleled control but require managing operational overhead.
- SQL solutions include Amazon RDS, Amazon Aurora (with Aurora Serverless v2), and Amazon Redshift for OLTP and OLAP use cases.
- NoSQL services like DynamoDB, DocumentDB, Keyspaces, Neptune, ElastiCache, OpenSearch, QLDB, and Timestream offer targeted solutions for diverse data requirements.

![The image summarizes database services, highlighting self-managed options, SQL systems like RDS and RedShift, supported engines, NoSQL services, and a note to review previous slides.](https://kodekloud.com/kk-media/image/upload/v1752862302/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Database/frame_1950.jpg)

Thank you for reading this comprehensive lesson on AWS database services. We look forward to exploring more AWS technologies in our upcoming articles.

For more details on AWS services, visit the [AWS Documentation](https://aws.amazon.com/documentation/) or check out our related guides.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-cloud-practitioner-clf-c02/module/f47a1e6e-5593-4fac-bc8b-f24ef6e6f418/lesson/b7ac91d2-ebf8-4081-ac0d-f6375343bfa8)**
>
> Watch video content
