# DynamoDB API - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Databases/DynamoDB-API)

---

## Table of Contents

- DynamoDB API
  - CRUD Operations
  - Querying Data in DynamoDB
  - Additional Table Operations
  - Projection Expression
  - Summary
  - Watch Video
    - Retrieve an Item (GetItem)
    - Add, Update, and Delete Items
    - GetItem
    - Query
    - Scan

---

## Content

AWS Certified Developer - Associate

Databases

# DynamoDB API

In this lesson, you'll learn about the DynamoDB API and how to perform essential CRUD operations—Create, Read, Update, and Delete—on a DynamoDB table. These operations form the backbone of most applications that integrate with DynamoDB.

## CRUD Operations

### Retrieve an Item (GetItem)

The **GetItem** API is used to fetch an item from the table by providing its partition key (and sort key when applicable). This operation returns the exact item that matches the provided key values.

### Add, Update, and Delete Items

- **PutItem:** Use this API to add a new item or replace an entire item in your DynamoDB table.
- **UpdateItem:** This API helps you modify attributes of an existing item.
- **DeleteItem:** Employ this API to remove an item based on its key values.

## Querying Data in DynamoDB

DynamoDB offers several methods to read data tailored to different use cases:

### GetItem

- Retrieves a single item by its unique partition key (and sort key, if applicable).

### Query

- Returns one or more items that share the same partition key, with the option to filter further using a sort key.
- Query operations are optimized using indexes, making them highly efficient.
- This method is particularly useful when working with Global Secondary Indexes (GSIs) and Local Secondary Indexes (LSIs).

### Scan

- Scans the entire table and returns all items, regardless of their key values.
- Although comprehensive, scans are less efficient and more resource-intensive because every item is read before any filtering is applied.

## Additional Table Operations

DynamoDB also supports table-level API actions that go beyond basic CRUD operations:

- **CreateTable:** Create a new table.
- **DeleteTable:** Remove an existing table.
- **BatchWriteItem:** Add or delete up to 25 items in a single API call.
- **BatchGetItem:** Retrieve up to 100 items from one or more tables concurrently.

![The image outlines four basic operations related to table management: CreateTable, DeleteTable, BatchWriteItem, and BatchGetItem, each with a brief description.](https://kodekloud.com/kk-media/image/upload/v1752858698/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-API/table-management-operations-diagram.jpg)

## Projection Expression

By default, read operations like GetItem, Query, or Scan return all attributes of an item. If only a subset of attributes is required, you can use a **Projection Expression**.

For example, if you have a user table and only need the user ID and email address, a projection expression allows you to retrieve just these attributes. This method minimizes data transfer and improves performance.

![The image explains "Projection Expression" in data retrieval, showing how "GetItem," "Query," and "Scan" return all attributes, while "Projection Expressions" retrieve a subset. It includes a table with attributes like id, email, name, and more.](https://kodekloud.com/kk-media/image/upload/v1752858699/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-API/projection-expression-data-retrieval.jpg)

> [!important]
> **Note**
>
> Using projection expressions not only enhances performance but also reduces costs by ensuring that only necessary data is transmitted.

## Summary

This lesson explored the key DynamoDB APIs for CRUD operations, data querying, and table management. Additionally, it discussed the use of projection expressions to optimize data retrieval. Understanding these features will enable you to build more efficient and scalable applications with DynamoDB.

For more details on DynamoDB and its applications, visit the [AWS DynamoDB Documentation](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/a1267c00-fc48-4a9b-8d41-fd642fa743ea/lesson/9cb66487-1e0e-4ef6-9980-6b8934302d11)**
>
> Watch video content
