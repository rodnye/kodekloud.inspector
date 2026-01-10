# Sql Ordering Results - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Working-with-Databases/Sql-Ordering-Results)

---

## Table of Contents

- Sql Ordering Results
  - Ordering by a Specific Column
  - Sorting Products by Inventory
  - Using Multiple Columns for Sorting
  - Ordering by Creation Date
  - Combining Filtering and Ordering
  - Summary
  - Watch Video

---

## Content

Python API Development with FastAPI

Working with Databases

# Sql Ordering Results

In this lesson, you will learn how to order query results in PostgreSQL. By default, PostgreSQL may return rows based on the physical order in which they were inserted rather than a specific column order. To ensure your results are returned in your desired order, you must explicitly specify the sorting criteria using the ORDER BY clause.

## Ordering by a Specific Column

When you want to sort results based on a specific column—for example, ordering products by their price—you can use the following query:

```
SELECT * FROM products ORDER BY price;
```

By default, the ORDER BY clause sorts the results in ascending order. If you want to be explicit or need a descending order, you can use the ASC (for ascending) or DESC (for descending) keywords. For instance, to sort the products by price in descending order, use:

```
SELECT * FROM products ORDER BY price DESC;
```

> [!important]
> **Note**
>
> If no sort direction is specified, PostgreSQL uses ascending order by default.

## Sorting Products by Inventory

Suppose you're interested in viewing products based on their inventory levels. To display products with the highest inventory first, use the DESC keyword with the inventory column:

```
SELECT * FROM products ORDER BY inventory DESC;
```

When you run this query, PostgreSQL retrieves the products starting with the highest inventory value. If you notice that several rows have the same inventory value (for example, many rows with inventory of zero), you can break ties by adding a secondary sort criterion.

## Using Multiple Columns for Sorting

When sorting using multiple columns, the second column acts as a tiebreaker if the first column's values are identical. For example, if you want to sort rows first by inventory (in descending order) and then by price (in ascending order), your query should look like this:

```
SELECT * FROM products ORDER BY inventory DESC, price;
```

In this query, PostgreSQL sorts the results by inventory in descending order. Any rows with the same inventory value are further ordered by price in ascending order.

## Ordering by Creation Date

Another common requirement is to sort products based on their creation timestamps. Assume the products table has a timestamp column named created_at. To display products from the oldest to the newest, use:

```
SELECT * FROM products ORDER BY created_at;
```

Since the default is ascending, the earliest created product appears first. If you prefer to list the most recent products at the top, you can sort in descending order:

```
SELECT * FROM products ORDER BY created_at DESC;
```

This will retrieve products starting with the most recent creation date.

## Combining Filtering and Ordering

You can combine the ORDER BY clause with other SQL keywords like WHERE to fine-tune your data retrieval. For example, if you want to retrieve only products with a price greater than 20 and then sort them by the most recent creation date, use:

```
SELECT * FROM products WHERE price > 20 ORDER BY created_at DESC;
```

This query first filters products by the price condition and then orders the resulting set by the created_at column in descending order.

## Summary

Using the ORDER BY clause in SQL gives you precise control over how your query results are displayed. By sorting by one or multiple columns, combining sorting with filtering, and adjusting the sort direction, you can retrieve exactly the data in the exact sequence you need.

Happy querying!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/0304b044-64ce-4fd6-a384-156867f36547/lesson/83abcc21-a129-45e9-84a6-ea42f682d7c5)**
>
> Watch video content
