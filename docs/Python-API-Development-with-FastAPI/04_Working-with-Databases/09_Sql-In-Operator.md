# Sql In Operator - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Working-with-Databases/Sql-In-Operator)

---

## Table of Contents

- Sql In Operator
  - Example: Using OR Conditions
  - Example: Simplifying with the IN Operator
  - Recap of the IN Operator
  - Watch Video

---

## Content

Python API Development with FastAPI

Working with Databases

# Sql In Operator

In this article, learn how to simplify SQL queries by using the IN operator in place of multiple OR conditions, ensuring cleaner syntax and easier maintenance.

## Example: Using OR Conditions

Suppose you want to retrieve products where the price is either greater than 100 or less than 20. A common approach using OR conditions is as follows:

```
SELECT * FROM products WHERE price > 100 OR price < 20;
```

This query returns output similar to:

```
 name              | price | id | is_sale | inventory |           created_at
-------------------+-------+----+---------+-----------+-------------------------------
 TV                |   200 |  1 | false   |         0 | 2021-08-20 00:49:58.012724-04
 remote            |    10 |  3 | false   |         0 | 2021-08-20 00:49:58.012724-04
 pencil            |     4 |  4 | true    |         0 | 2021-08-20 00:49:58.012724-04
 pencil sharpener  |     4 |  9 | false   |         0 | 2021-08-20 00:49:58.012724-04
 soda              |     2 |  8 | true    |         0 | 2021-08-20 00:49:58.012724-04
 toothbrush        |     2 | 11 | true    |        22 | 2021-08-20 23:01:37.283204-04
 toilet paper      |    13 | 12 | true    |         8 | 2021-08-20 23:01:37.283204-04
 xbox              |   380 | 15 | false   |        45 | 2021-08-20 23:04:23.608326-04
```

## Example: Simplifying with the IN Operator

If you need to filter products based on specific IDs—such as 1, 2, and 3—the OR approach can be verbose:

```
SELECT * FROM products WHERE id = 1 OR id = 2 OR id = 3;
```

Instead, using the IN operator streamlines the query considerably:

```
SELECT * FROM products WHERE id IN (1, 2, 3);
```

The output for this query may be as follows:

```
Data Output
| name          | character varying | price | integer | id | [PK] integer | is_sale | boolean | inventory | integer | created_at | timestamp with time zone |
|---------------|-------------------|-------|---------|----|---------------|---------|---------|-----------|---------|-------------|--------------------------|
| TV            |                   | 200   | 1       | false | 0            | 2021-08-20 00:49:58.021274-04 |
| DVD Players   |                   | 80    | 2       | false | 0            | 2021-08-20 00:49:58.021274-04 |
| remote        |                   | 10    | 3       | false | 0            | 2021-08-20 00:49:58.021274-04 |
```

> [!important]
> **Note**
>
> Using the IN operator not only reduces the repetition of SQL keywords but also improves readability, especially when filtering based on multiple values.

## Recap of the IN Operator

Both methods—chaining multiple OR conditions and using the IN operator—yield the same result. However, the IN operator provides a more robust and clear solution to filter data across multiple values. Here is the concise version once again:

```
SELECT * FROM products WHERE id IN (1, 2, 3);
```

This approach is especially beneficial when dealing with larger sets of filtering criteria, making your queries easier to write and understand.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/0304b044-64ce-4fd6-a384-156867f36547/lesson/dca528bf-6957-457b-8981-b8623c46a682)**
>
> Watch video content
