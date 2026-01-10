# Creating Relationships - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DP-900-Microsoft-Azure-Data-Fundamentals/Structured-Data/Creating-Relationships)

---

## Table of Contents

- Creating Relationships
  - Why Relationships Matter
  - Primary Keys vs. Foreign Keys
  - Performance Considerations
  - Links and References
  - Watch Video
    - Sample Tables
    - Querying Across Tables

---

## Content

DP-900: Microsoft Azure Data Fundamentals

Structured Data

# Creating Relationships

Welcome back to our series on structured data. In this lesson, we’ll explore how to define and leverage relationships between tables to model real-world business transactions.

When you normalize your database, you often end up with one table per entity—**Customer**, **Product**, **SalesOrder**, and so on. Yet, a single transaction typically spans multiple tables. For example, to display the details of a given sales order, you must know:

- Which customer placed the order
- Which products were purchased

To connect these entities, we use relationships.

## Why Relationships Matter

Relationships let you:

- Maintain data integrity
- Avoid duplication by referencing shared data
- Query across entities using `JOIN` operations

> [!important]
> **Note**
>
> Refer to [Database Normalization](https://en.wikipedia.org/wiki/Database_normalization) for best practices on organizing tables.

## Primary Keys vs. Foreign Keys

Each table defines a **primary key**, a column (or set of columns) that uniquely identifies each row. A **foreign key** is simply a copy of a primary key added to another table to create a link.

| Key Type    | Purpose                                                 | Example      |
| ----------- | ------------------------------------------------------- | ------------ |
| Primary Key | Unique identifier for a table’s rows                    | `CustomerID` |
| Foreign Key | References a primary key in another table for integrity | `CustomerID` |

### Sample Tables

**Customer**

| CustomerID | Name        |
| ---------- | ----------- |
| 0001       | Alice Smith |
| 0002       | Peter Vogel |
| 0003       | Linda Jones |

**SalesOrder**

| OrderID | CustomerID | ProductID |
| ------- | ---------- | --------- |
| A123    | 0002       | P456      |
| A124    | 0001       | P789      |

- In **Customer**, `CustomerID` is the primary key.
- In **SalesOrder**, `CustomerID` and `ProductID` are foreign keys referencing the **Customer** and **Product** tables, respectively.

### Querying Across Tables

To find who placed order `A123`:

1.  Query **SalesOrder** for `OrderID = 'A123'`.
2.  Retrieve `CustomerID = 0002`.
3.  Look up `0002` in **Customer** to get **Peter Vogel**.

## Performance Considerations

As your database grows, frequent `JOIN` operations can impact query response times.

> [!important]
> **Warning**
>
> Excessive joins on large tables without proper indexing can lead to slow queries. Always index foreign key columns and consider query optimization techniques like denormalization or materialized views when necessary.

In the next lesson, we’ll explore strategies—such as indexing, query planning, and denormalization—to optimize relationship performance in large datasets.

## Links and References

- [SQL JOINs](https://dev.mysql.com/doc/refman/8.0/en/join.html)
- [Indexing Best Practices](https://www.postgresql.org/docs/current/indexes.html)
- [Database Normalization (Wikipedia)](https://en.wikipedia.org/wiki/Database_normalization)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/dp-900-microsoft-azure-data-fundamentals/module/ab06c95a-37f6-40d4-9dd8-b5a6961866b5/lesson/d2071a76-3480-4d74-ab6b-a864f369dafb)**
>
> Watch video content
