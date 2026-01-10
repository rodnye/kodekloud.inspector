# Normalizing Data - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DP-900-Microsoft-Azure-Data-Fundamentals/Structured-Data/Normalizing-Data)

---

## Table of Contents

- Normalizing Data
  - Structured Data and Relational Databases
  - Why Normalization Matters
  - Designing a Normalized Schema
  - Further Reading and References
  - Watch Video
    - Example: Customer Table
    - Denormalized Example
    - Normalized Schema Overview

---

## Content

DP-900: Microsoft Azure Data Fundamentals

Structured Data

# Normalizing Data

Welcome back to the Azure Data Fundamentals course. In this lesson, we’ll dive into how Relational Database Management Systems (RDBMS) rely on structured data, why normalization is essential, and how to design an efficient, normalized database schema.

## Structured Data and Relational Databases

Relational databases organize information into **tables**, where each table consists of **rows** (records) and **columns** (fields). Every column has a defined data type, and each row adheres to the same column structure.

### Example: Customer Table

- **Customer ID**: Primary key (unique identifier)
- **First Name**: Text / string
- **Last Name**: Text / string

Each row represents one customer entity.

> [!important]
> **Note**
>
> The diagram below illustrates the Customer table structure, highlighting the primary key.

![The image illustrates a table normalization concept with columns for Customer ID, First Name, and Last Name, highlighting the Customer ID as the primary key.](https://kodekloud.com/kk-media/image/upload/v1752873082/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Normalizing-Data/table-normalization-customer-id-diagram.jpg)

## Why Normalization Matters

Normalization is the process of organizing columns and tables to minimize redundancy and prevent update anomalies. Its main objectives are:

1.  **Entity Separation**: Each table contains data for a single entity (e.g., Customer, Order, Product).
2.  **Eliminate Duplicates**: No two rows should have identical values across all columns.

Without normalization, you risk:

- **Data Redundancy**: Repeated storage of the same information.
- **Inconsistent Updates**: Changing a customer’s address requires updates in multiple places.

### Denormalized Example

A denormalized **Sales Order** table might look like this:

- Sales Order ID
- Name
- Address
- Product
- Quantity

Here, a customer’s name and address are stored with every order.

> [!important]
> **Note**
>
> Below is a denormalized sales order table showing repeated customer details.

![The image is a table illustrating why entities matter, showing columns for Sales Order ID, Name, Address, Product, and Quantity with sample data.](https://kodekloud.com/kk-media/image/upload/v1752873083/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Normalizing-Data/entities-matter-sales-order-table.jpg)

## Designing a Normalized Schema

To normalize your data:

1.  **Identify Entities**: Separate data into tables like Customer, Product, and Sales Order.
2.  **Define Keys**: Assign a primary key for each table and use foreign keys for relationships.
3.  **Specify Data Types**: Choose appropriate types (e.g., `numeric(10,2)` for prices).

### Normalized Schema Overview

> [!important]
> **Note**
>
> This diagram shows the normalized schema with three tables and their relationships.

![The image shows a table schema with three sections: customer information, product details, and sales order data, each with corresponding fields and values. It illustrates how data is organized in a database table format.](https://kodekloud.com/kk-media/image/upload/v1752873085/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Normalizing-Data/table-schema-customer-product-sales.jpg)

| Table       | Primary Key    | Foreign Keys            | Key Columns             |
| ----------- | -------------- | ----------------------- | ----------------------- |
| Customer    | Customer ID    | —                       | First Name, Last Name   |
| Product     | Product ID     | —                       | Price (`numeric(10,2)`) |
| Sales Order | Sales Order ID | Customer ID → Customer, | Quantity                |
|             |                | Product ID → Product    |                         |

**How It Works**  
To find all orders for “Peter Vogel,” you simply join the `Sales Order` table with the `Customer` table on `Customer ID`. Normalized design:

- Reduces storage costs
- Enforces data integrity
- Simplifies maintenance and queries

## Further Reading and References

- [Azure Data Fundamentals (DP-900) Microsoft Learn](https://docs.microsoft.com/learn/certifications/exams/dp-900)
- [Relational Database Concepts](https://docs.microsoft.com/azure/architecture/data-guide/relational-data/)
- [Database Normalization Basics](https://www.ibm.com/docs/en/db2/11.5?topic=design-database-normalization)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/dp-900-microsoft-azure-data-fundamentals/module/ab06c95a-37f6-40d4-9dd8-b5a6961866b5/lesson/4d30ef4b-be55-42c2-8f7d-aa0fd70d98db)**
>
> Watch video content
