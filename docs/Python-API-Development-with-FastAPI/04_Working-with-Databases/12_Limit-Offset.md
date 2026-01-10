# Limit Offset - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Working-with-Databases/Limit-Offset)

---

## Table of Contents

- Limit Offset
  - Using the LIMIT Keyword
  - Ordering Results Before Limiting
  - Implementing OFFSET for Pagination
  - Watch Video

---

## Content

Python API Development with FastAPI

Working with Databases

# Limit Offset

In production environments where tables may contain millions of rows, running a query that returns every record—such as:

```
SELECT * FROM products;
```

—is impractical. Retrieving millions of rows at once can overwhelm the database and client applications.

To handle large datasets efficiently, it's crucial to limit the number of rows returned in a query. This not only improves performance but also reduces the load on your infrastructure.

> [!important]
> **Tip**
>
> When working with vast amounts of data, always consider fetching only the necessary subset of rows rather than the complete dataset.

## Using the LIMIT Keyword

The LIMIT keyword allows you to restrict your result set to a specified number of rows. For example, if you need to filter for specific products by their IDs, you might start with:

```
SELECT * FROM products WHERE id = 1 OR id = 2 OR id = 3;
```

To limit the results to only the first 10 rows, simply add the LIMIT keyword:

```
SELECT * FROM products LIMIT 10;
```

If a smaller subset is needed, such as the first 5 rows, adjust the query accordingly:

```
SELECT * FROM products LIMIT 5;
```

You can also apply LIMIT to more complex queries. For instance, if you want to select products priced above 10, and then limit the results:

```
SELECT * FROM products WHERE price > 10 LIMIT 2;
```

## Ordering Results Before Limiting

You may need to order the results prior to applying a limit. For example, to sort products by their ID and then fetch the top five records:

```
SELECT * FROM products ORDER BY id LIMIT 5;
```

This query orders the dataset by product ID and returns the first five records from the sorted list.

## Implementing OFFSET for Pagination

In many scenarios, particularly when implementing pagination, you might want to skip a certain number of rows. OFFSET comes into play in these cases. For example, to skip the first two rows in an ordered list:

```
SELECT * FROM products ORDER BY id LIMIT 5 OFFSET 2;
```

This instructs the database to bypass the initial two rows and then return the next five records. Adjusting the OFFSET value alters the starting position of the returned subset. For instance, to skip the first five rows:

```
SELECT * FROM products ORDER BY id LIMIT 5 OFFSET 5;
```

This combination of LIMIT and OFFSET is particularly useful for developing APIs that support pagination, as it provides precise control over the data subset returned in each query.

> [!important]
> **Summary**
>
> Using LIMIT and OFFSET together helps you efficiently manage and paginate large datasets by retrieving only the necessary subset of rows.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/0304b044-64ce-4fd6-a384-156867f36547/lesson/5bfa4f01-8910-4416-bebf-52d4fa7d88e6)**
>
> Watch video content
