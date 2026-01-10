# SQL and NoSQL - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GCP-Cloud-Digital-Leader-Certification/Database/SQL-and-NoSQL)

---

## Table of Contents

- SQL and NoSQL
  - SQL Databases
  - NoSQL Databases
  - Categorizing Database Models
  - Conclusion
  - Watch Video

---

## Content

GCP Cloud Digital Leader Certification

Database

# SQL and NoSQL

Hello and welcome back.

In this article, we explore the fundamental differences between SQL and NoSQL databases, discuss their unique use cases, and illustrate how various databases in Google Cloud Platform (GCP) fit into these categories.

## SQL Databases

Relational (SQL) databases store data in a tabular format and adhere strictly to the ACID properties: Atomicity, Consistency, Isolation, and Durability. These properties ensure robust transaction management and data integrity—an essential requirement in online transaction processing (OLTP) systems. Common examples include ticketing, order processing, and authentication systems where transactional integrity is critical.

![The image compares relational databases (SQL) and non-relational databases (NoSQL), highlighting their storage methods, performance, and use cases. It mentions examples like Cloud SQL and Cloud Spanner for SQL, and Cloud Bigtable and Firestore for NoSQL.](https://kodekloud.com/kk-media/image/upload/v1752875228/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-SQL-and-NoSQL/sql-nosql-database-comparison.jpg)

In GCP, prominent SQL databases include:

- **Cloud SQL**
- **Cloud Spanner**

These databases are optimized for managing structured data and ensure consistency across multiple transactions.

## NoSQL Databases

NoSQL databases diverge from the traditional tabular structure by using storage models such as document-based or key-value pair systems. Each data entry is stored as a key and its corresponding value, which allows for a more flexible schema design. This flexibility makes NoSQL databases ideal for applications requiring rapid scalability and adaptable data structures.

For instance, if you are analyzing which restaurants a customer ordered from in 2022, you might store the customer ID as the key and the associated restaurant IDs as values. This method is particularly effective for data science applications—such as tailoring personalized recommendations based on ordering patterns and taste preferences.

In GCP, the key NoSQL databases include:

- **Cloud Bigtable**
- **Memory Store**
- **Firestore**

Depending on your application’s requirements, you can choose between a SQL system for transactional reliability or a NoSQL system for flexible scalability.

> [!important]
> **Choosing the Right Database**
>
> When deciding on a database, it is crucial to evaluate your application needs. For data integrity and complex transactions, lean towards SQL databases. If your primary focus is on scalability and flexible data models, a NoSQL solution might be more appropriate.

## Categorizing Database Models

A practical way to differentiate between SQL and NoSQL databases is by grouping them according to their design models—relational, non-relational, and in-memory databases. Each group is tailored to specific use cases:

| Database Type          | Use Case Description                                                           | GCP Examples                            |
| ---------------------- | ------------------------------------------------------------------------------ | --------------------------------------- |
| Relational (SQL)       | High data integrity and transaction management                                 | Cloud SQL, Cloud Spanner                |
| Non-relational (NoSQL) | Flexible schema designs, scalable for analytics and recommendations            | Cloud Bigtable, Firestore, Memory Store |
| In-memory              | Fast data retrieval, often combined with other models for enhanced performance | (Various caching services)              |

This classification not only helps in understanding the inherent differences between databases but also assists in selecting the right GCP service based on your project’s specific needs.

## Conclusion

SQL and NoSQL databases each serve unique roles in modern application architectures. From handling structured transactional data to providing flexible, scalable solutions, understanding these models is key to optimizing your application performance on Google Cloud Platform.

That is it for this article. We look forward to sharing more insights in our next discussion.

Thank you for reading!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gcp-cloud-digital-leader-certification/module/8bcad91c-3036-4438-ae54-6ad95434bbeb/lesson/de31ba7c-cf6e-4004-9119-7aa9abb8b79f)**
>
> Watch video content
