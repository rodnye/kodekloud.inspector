# DynamoDB Overview - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Databases/DynamoDB-Overview)

---

## Table of Contents

- DynamoDB Overview
  - Key Benefits & Features
  - Data Storage and Structure in DynamoDB
  - Primary Keys
  - Querying with PartiQL
  - Summary
  - Watch Video
    - Naming Rules

---

## Content

AWS Certified Developer - Associate

Databases

# DynamoDB Overview

In this lesson, we provide a comprehensive overview of DynamoDB, AWS's renowned fully managed NoSQL database service. This material is essential for the Developer Associate exam, so it's crucial to grasp DynamoDB's core concepts and features.

Before we dive into DynamoDB, let's briefly revisit NoSQL databases. Unlike traditional SQL databases—such as those managed with [AWS RDS](https://learn.kodekloud.com/user/courses/aws-rds)—which require predefined schemas, NoSQL databases excel at managing large volumes of unstructured or semi-structured data. They offer flexibility by allowing dynamic schema changes and support various data models, including:

- **Key-Value Stores:** Retrieve values using unique keys.
- **Document Stores:** Use document-like structures (e.g., JSON or XML) that can include nested documents.
- **Column-Family Stores:** Organize data into rows and columns, accommodating varied column structures.
- **Graph Databases:** Represent data as nodes, edges, and properties, ideal for depicting complex relationships.

![The image illustrates four types of NoSQL databases: Key-Value Stores, Document Stores, Column-Family Stores, and Graph Databases.](https://kodekloud.com/kk-media/image/upload/v1752858770/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-Overview/nosql-databases-key-value-document-column-graph.jpg)

DynamoDB offers high performance and seamless scalability with low latency, similar to how [AWS RDS](https://learn.kodekloud.com/user/courses/aws-rds) manages relational databases. With DynamoDB, AWS handles the infrastructure, allowing you to focus on storing application data—be it user information, product details, or other business-critical data.

![The image is a diagram showing the interaction between end users, an application, and DynamoDB, illustrating data flow between these components.](https://kodekloud.com/kk-media/image/upload/v1752858771/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-Overview/data-flow-application-dynamodb-diagram.jpg)

## Key Benefits & Features

DynamoDB comes with several significant advantages:

- **Seamless Scalability:** Effortlessly adapt to growth without provisioning hardware or managing complex database configurations.
- **High Performance:** Enjoy fast and predictable performance with low-latency data retrieval.
- **Flexible Data Model:** Design your data schema to perfectly match your application requirements.
- **Cost-Effectiveness:** Only pay for the resources you actually use thanks to its pay-as-you-go pricing model.

![The image highlights four features of DynamoDB: scalability, high performance, flexible data model, and cost-effectiveness, each represented by an icon.](https://kodekloud.com/kk-media/image/upload/v1752858773/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-Overview/dynamodb-features-scalability-performance.jpg)

Beyond these benefits, DynamoDB is engineered for high availability and durability. It replicates data across multiple Availability Zones automatically, ensuring continuous operation. Additional features include support for streams—capturing a time-ordered sequence of item-level modifications that can trigger workflows or enable data replication—and ACID-compliant transactions. These ensure that all database operations maintain:

- **Atomicity:** All operations in a transaction succeed or fail as one.
- **Consistency:** Data modifications adhere to established database constraints.
- **Isolation:** In-progress transactions remain invisible to other operations, eliminating race conditions.
- **Durability:** Committed transactions remain permanent, even during system failures.

![The image is an infographic highlighting the features of DynamoDB, including stream integration, AWS ecosystem integration, performance at scale, being fully managed, seamless scalability, and high availability and durability.](https://kodekloud.com/kk-media/image/upload/v1752858774/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-Overview/dynamodb-features-infographic.jpg)

## Data Storage and Structure in DynamoDB

Data in DynamoDB is organized into three main components: tables, items, and attributes.

- **Table:** A collection of items, similar to a table in relational databases. For example, you could have tables for users or products.
- **Item:** A single record within a table. In a "users" table, each record represents a unique user.
- **Attributes:** The data elements within an item. For instance, a user record might include attributes like email, phone number, and password.

Consider the following example of an "employees" table, where each item represents a single employee:

```
{
  "EmployeeID": "E67890",
  "FirstName": "Jane",
  "LastName": "Smith",
  "Email": "jane.smith@example.com",
  "Position": "Product Manager",
  "Department": "Product",
  "HireDate": "2019-03-15",
  "ContactInfo": {
    "PhoneNumber": "555-1234",
    "Address": "123 Main St, Anytown, USA"
  }
}
```

In this example, simple key/value pairs (like "EmployeeID") co-exist with nested attributes (like "ContactInfo") that include detailed information.

### Naming Rules

DynamoDB enforces specific naming conventions for tables, indexes, and attributes:

- Names must be encoded in UTF-8 and are case sensitive.
- Table and index names must be between 3 and 255 characters.
- Attribute names must be at least one character and less than 64 kilobytes.
- Only allowed characters may be used.

![The image outlines DynamoDB naming rules, showing examples for table, index, and attribute names, along with guidelines on encoding, case sensitivity, character length, and allowed characters.](https://kodekloud.com/kk-media/image/upload/v1752858775/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-Overview/dynamodb-naming-rules-examples.jpg)

> [!important]
> **Note**
>
> Ensure your naming conventions are consistent to avoid any potential issues when interacting with DynamoDB.

## Primary Keys

Each DynamoDB item must have a unique primary key. You can define primary keys in two ways:

1.  **Partition Key:** A single attribute that uniquely identifies an item. For example, using "EmployeeID" ensures every employee record is unique.
2.  **Composite Key:** A combination of two attributes—a partition key and a sort key—where the combination uniquely identifies each item. For instance, in a product reviews table, a composite key combining "user ID" and "product ID" lets a user review multiple products while preventing duplicate reviews for a single product.

![The image is a table illustrating the concept of a primary key as a partition key, showing employee data with columns for employee ID, name, email, and salary. It highlights that the partition key must be unique for each item in the table.](https://kodekloud.com/kk-media/image/upload/v1752858776/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-Overview/primary-key-partition-key-table.jpg)

![The image explains the concept of a primary key composed of a partition key and a sort key, using a table with columns for user ID, product ID, rating, and review. It highlights that the combination of partition and sort keys must be unique.](https://kodekloud.com/kk-media/image/upload/v1752858777/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-Overview/primary-key-partition-sort-key-diagram.jpg)

Your choice of primary key should be guided by your application's requirements. For example, if each user has a unique email address, you might choose to use "email" as the primary key.

## Querying with PartiQL

DynamoDB supports PartiQL, an SQL-compatible query language that simplifies querying by using familiar SQL-like syntax. This enables users to run queries that are intuitive and efficient. For example, to retrieve a specific review, you might use:

```
SELECT * FROM reviews WHERE user_id = 'sam@gmail.com' AND product_id = '99999';
```

This approach allows you to interact with DynamoDB tables in a more conventional and readable way.

> [!important]
> **Tip**
>
> Using PartiQL can streamline development for those who are already familiar with SQL, reducing the learning curve.

## Summary

In summary, here's what you need to know about DynamoDB:

- **NoSQL Databases:** Optimized for large, dynamic datasets and horizontal scaling.
- **DynamoDB:** AWS's fully managed, ACID-compliant NoSQL database offering low latency and seamless integration with other AWS services like Lambda, S3, and Redshift.
- **Data Organization:** Utilizes a table-based model where items (records) are composed of attributes.
- **Primary Keys:** Ensure uniqueness of each item, defined using either a single partition key or a composite key.
- **PartiQL:** Simplifies query operations with SQL-like syntax.

![The image is a summary slide about NoSQL databases, highlighting their ability to handle large volumes of unstructured data, scale horizontally, and mentioning DynamoDB as Amazon's flagship NoSQL service.](https://kodekloud.com/kk-media/image/upload/v1752858778/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-Overview/nosql-databases-summary-dynamodb.jpg)

This overview should help you better understand DynamoDB's architecture and its powerful capabilities in managing application data efficiently.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/a1267c00-fc48-4a9b-8d41-fd642fa743ea/lesson/da590403-c3a4-45ff-95e1-7f539adf90e8)**
>
> Watch video content
