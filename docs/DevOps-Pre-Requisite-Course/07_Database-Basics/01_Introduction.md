# Introduction - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevOps-Pre-Requisite-Course/Database-Basics/Introduction)

---

## Table of Contents

- Introduction
  - SQL vs. NoSQL Databases
  - Comparing SQL and NoSQL Databases
  - Querying Data
  - Watch Video

---

## Content

DevOps Pre-Requisite Course

Database Basics

# Introduction

In this lesson, we explore the fundamentals of databases—an essential subject for anyone pursuing a career in Cloud or DevOps engineering. Understanding how databases function is vital not only for software development but also for operations. Database servers are deployed and managed by operations engineers, while software developers design applications that interact with these databases. Mastering both aspects is key to designing effective software architectures.

For DevOps professionals, understanding database deployment, how applications connect to databases, and troubleshooting common connectivity issues is crucial. You'll frequently work in environments where applications interface with databases, and the concepts discussed in this lesson will help you replicate these scenarios locally.

Stack Overflow insights reveal that the most widely used databases generally fall into two primary categories: SQL and NoSQL. The image below from a Stack Overflow survey illustrates a database popularity chart that highlights MySQL and MongoDB, with MySQL leading at 54%.

![The image shows a database popularity chart from a Stack Overflow survey, highlighting MySQL and MongoDB, with MySQL being the most popular at 54%.](https://kodekloud.com/kk-media/image/upload/v1752873422/notes-assets/images/DevOps-Pre-Requisite-Course-Introduction/frame_80.jpg)

While MySQL and PostgreSQL are two of the leading SQL databases, MongoDB, Redis, and DynamoDB represent some of the top NoSQL alternatives. Although Redis and Elasticsearch might not appear as traditional databases, they are classified based on their data storage and manipulation techniques. In this lesson, we will focus on two types of databases:

- A SQL-based database (MySQL)
- A NoSQL database (MongoDB)

## SQL vs. NoSQL Databases

Traditionally, SQL databases are organized in tables, where data is stored in rows and columns. For example, consider a table that holds information about individuals: each row represents a person, and each column represents a specific detail (like name, age, etc.). If additional details—such as salary or grades—need to be recorded, a new column is added. However, this can often result in many empty cells when the details do not apply to every record.

In contrast, NoSQL databases store data as documents. Each document contains all relevant information for an individual and can have a unique structure. For instance, work-related records may include a salary field, while student records might contain grades. This flexibility ensures that changes to one document do not affect others. Although NoSQL databases can store simple key-value pairs, they often handle complex data in JSON format, making JSON a critical skill for developers and DevOps engineers alike.

> [!important]
> **Note**
>
> Understanding JSON is essential not only for working with NoSQL databases but also because it is widely used in configuration files for JavaScript-based applications.

Here is how NoSQL documents can represent data differently from SQL tables:

```
{
  "name": "John Doe",
  "age": 45,
  "location": "New York",
  "salary": 5000
}
```

```
{
  "name": "Dave Smith",
  "age": 34,
  "location": "New York",
  "salary": 4000,
  "organization": "ACME"
}
```

```
{
  "name": "Aryan Kumar",
  "age": 10,
  "location": "New York",
  "Grade": "A"
}
```

```
{
  "name": "Lauren Rob",
  "age": 13,
  "location": "Bangalore",
  "Grade": "C"
}
```

```
{
  "name": "Lily Oliver",
  "age": 15,
  "location": "Bangalore",
  "Grade": "B"
}
```

In a SQL database, each person's data is stored in a row within a table, while in a NoSQL database, each document is part of a collection. SQL queries are used for retrieving and filtering data from structured tables, and NoSQL databases like MongoDB have their own query syntax for handling JSON-like documents.

The image below compares SQL tables with NoSQL collections, clearly illustrating the differences in data representation:

![The image compares SQL tables and NoSQL collections, showing data representation differences between structured tables and JSON-like documents.](https://kodekloud.com/kk-media/image/upload/v1752873424/notes-assets/images/DevOps-Pre-Requisite-Course-Introduction/frame_280.jpg)

## Comparing SQL and NoSQL Databases

| Feature        | SQL Databases                    | NoSQL Databases                       |
| -------------- | -------------------------------- | ------------------------------------- |
| Data Model     | Tabular (rows and columns)       | Document-based (JSON-like)            |
| Schema         | Rigid and predefined             | Dynamic and flexible                  |
| Query Language | SQL                              | Varies (e.g., MongoDB Query Language) |
| Use Case       | Structured data and transactions | Unstructured or semi-structured data  |

## Querying Data

Below are examples of how to query data from both a SQL database and a NoSQL database using MongoDB:

**SQL Query**

```
SELECT * FROM persons WHERE age > 10;
```

**MongoDB Query**

```
db.persons.find({ age: { $gt: 10 } });
```

Both queries retrieve all records of individuals older than 10 from their respective data stores. Today, both SQL and NoSQL databases are widely used. Traditional SQL databases like MySQL, PostgreSQL, and Microsoft SQL Server are popular for structured data and transactions, whereas NoSQL solutions like MongoDB, DynamoDB, and Cassandra offer scalability and flexibility for modern applications.

> [!important]
> **Next Steps**
>
> In subsequent lessons, we will dive deeper into both SQL and NoSQL systems, providing hands-on exercises to build your proficiency in managing these databases.

For more information on databases, consider visiting:

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devops-pre-requisite-course/module/5166a1fb-2506-4fa7-81d8-ad176fa067a2/lesson/f0ad6ca5-c2e7-4782-81d7-a933241bc178)**
>
> Watch video content
