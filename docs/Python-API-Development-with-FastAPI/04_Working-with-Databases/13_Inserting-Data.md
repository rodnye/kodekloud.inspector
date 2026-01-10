# Inserting Data - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Working-with-Databases/Inserting-Data)

---

## Table of Contents

- Inserting Data
  - Understanding the INSERT Statement
  - Inserting a Single Row
  - Matching Column and Value Order
  - Using the RETURNING Clause
  - Inserting Multiple Rows
  - Summary
  - Watch Video
    - Viewing Existing Data
    - Basic Syntax

---

## Content

Python API Development with FastAPI

Working with Databases

# Inserting Data

In this lesson, we will explore how to insert new rows into a PostgreSQL database using SQL. While PgAdmin’s GUI offers a manual method for administrative tasks, real-world applications typically use SQL queries to insert data.

## Understanding the INSERT Statement

When constructing an INSERT statement, you must specify the target table and the columns that need to be populated. In our example, the "products" table requires values for the "name" and "price" columns. Optional columns such as "is_sale" and "inventory" automatically default to false and zero, respectively, if not provided.

### Viewing Existing Data

Before inserting new data, it can be helpful to review the current entries in your table. You can do this using:

```
select * from products;
```

### Basic Syntax

The basic syntax for inserting a new row is:

```
INSERT INTO products (column1, column2, ...) VALUES (value1, value2, ...);
```

> [!important]
> **Note**
>
> Ensure that the order of the columns in the INSERT statement exactly matches the order of the corresponding values provided.

## Inserting a Single Row

Below is an example that inserts values into the "name", "price", and "inventory" columns. By omitting the "is_sale" column, PostgreSQL will use its default value (false):

```
INSERT INTO products (name, price, inventory) VALUES ('tortilla', 4, 1000);
```

Upon successful execution, PostgreSQL returns a message similar to:

```
INSERT 0 1
Query returned successfully in 95 msec.
```

> The "0" in the message represents the OID by default. The key takeaway is that one row was successfully inserted.

To verify your insertion, run:

```
select * from products;
```

You should see the newly added product "tortilla" with a price of 4, an inventory of 1000, and default values for any omitted columns.

## Matching Column and Value Order

It is crucial to accurately match the order of the columns with the corresponding values. Consider the following example where the order is rearranged:

```
INSERT INTO products (price, name, inventory) VALUES (4, 'tortilla', 1000);
```

In this case, the first value (4) is interpreted as the price, the second ('tortilla') as the name, and the third (1000) as the inventory.

## Using the RETURNING Clause

When developing APIs, you might want to immediately return the newly created row, including fields such as the creation timestamp and any auto-assigned default values. PostgreSQL’s RETURNING clause facilitates this:

```
INSERT INTO products (price, name, inventory) VALUES (4, 'tortilla', 1000) RETURNING *;
```

This query returns all columns from the newly inserted row, which can be useful for confirmation or further processing.

## Inserting Multiple Rows

To insert multiple rows at once, separate each row’s values with commas. For example:

```
INSERT INTO products (name, price, is_sale, inventory) VALUES
  ('car', 10000, false, 1000),
  ('laptop', 25, false, 25),
  ('monitor', 60, false, 4) RETURNING *;
```

If you prefer to return only selected columns from the inserted rows, modify the RETURNING clause accordingly:

```
INSERT INTO products (name, price, is_sale, inventory) VALUES
  ('laptop', 25, false, 25),
  ('monitor', 60, false, 4) RETURNING id, created_at, name;
```

Alternatively, when defaults are acceptable for certain fields, you can insert only required columns:

```
INSERT INTO products (name, price) VALUES ('laptop', 25), ('monitor', 4) RETURNING id, created_at, name;
```

## Summary

This lesson has demonstrated how to create new entries in a PostgreSQL database using SQL INSERT statements. The key points include:

- Using proper syntax and ensuring the order of columns matches the values.
- Leveraging default values for optional columns.
- Utilizing the RETURNING clause for immediate feedback.
- Inserting multiple rows in a single statement for efficiency.

By following these guidelines, you can effectively manage data insertion in your PostgreSQL database while ensuring data integrity and ease of maintenance.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/0304b044-64ce-4fd6-a384-156867f36547/lesson/8504055c-33d7-4423-a4f5-cf955f98395c)**
>
> Watch video content
