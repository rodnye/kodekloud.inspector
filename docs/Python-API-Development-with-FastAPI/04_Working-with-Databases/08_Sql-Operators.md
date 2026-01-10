# Sql Operators - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Working-with-Databases/Sql-Operators)

---

## Table of Contents

- Sql Operators
  - Greater Than and Greater Than or Equal To Operators
  - Less Than and Less Than or Equal To Operators
  - Using the NOT Operator
  - Combining Multiple Operators
  - Watch Video
    - Using AND
    - Using OR

---

## Content

Python API Development with FastAPI

Working with Databases

# Sql Operators

SQL operators play a crucial role in filtering and comparing data across your databases. In this guide, we explore a variety of operators beyond the basic equals operator, enabling you to refine your data queries and gain deeper insights.

> [!important]
> **Tip**
>
> Mastering SQL operators can significantly enhance your data retrieval capabilities. Experiment with these operators to optimize your queries and ensure you get exactly the data you need.

For instance, to retrieve a product with a price of 20, you might start with the following query:

```
SELECT * FROM products WHERE price = 20;
```

If no results are returned, it may indicate that there is no product listed at that price. In such a case, you might adjust your criteria—perhaps searching instead for a product priced at 200:

```
SELECT * FROM products WHERE price = 200;
```

This query should correctly return the product, such as a TV, priced at 200.

## Greater Than and Greater Than or Equal To Operators

When you need to retrieve items costing more than a specific amount, you can use the greater than operator (>). Consider the following example:

```
SELECT * FROM products WHERE price > 50;
```

This query returns all products with a price of 51 or higher, as the operator does not include 50. To include products priced at 50, use the greater than or equal to operator (>=):

```
SELECT * FROM products WHERE price >= 50;
```

To illustrate, filtering products by a price of 80 works as follows:

- Using:

  ```
  SELECT * FROM products WHERE price > 80;
  ```

  will exclude products priced exactly at 80.

- Whereas using:

  ```
  SELECT * FROM products WHERE price >= 80;
  ```

  will include products with a price of 80. The expected output may look like this:

```
 name         | price | id | is_sale | inventory |          created_at
--------------+-------+----+---------+-----------+-------------------------------
 TV           |   200 |  1 | false   |         0 | 2021-08-20 00:49:58.021274-04
 DVD Players  |    80 |  2 | false   |         0 | 2021-08-20 00:49:58.021274-04
 xbox         |   380 | 15 | true    |        45 | 2021-08-20 20:34:23.608326-04
```

## Less Than and Less Than or Equal To Operators

Similarly, if you need to filter for products cost less than a certain amount, the less than operator (<) is used. For example, to obtain products priced below 80, you can run:

```
SELECT * FROM products WHERE price < 80;
```

This query may yield a result similar to:

```
 name         | price | id [PK]  | is_sale | inventory |           created_at
--------------+-------+----------+---------+-----------+-------------------------------
 remote       |    10 |    3     | false   |         0 | 2021-08-20 00:49:58.021274-04
 microphone   |    30 |    5     | false   |         0 | 2021-08-20 00:49:58.021274-04
 car          |    40 |    8     | false   |         2 | 2021-08-20 00:49:58.021274-04
 pencil       |     2 |    2     | false   |        10 | 2021-08-20 00:49:58.021274-04
 keyboard     |    28 |   10     | true    |        50 | 2021-08-20 00:49:58.021274-04
 soda         |    10 |   11     | true    |        10 | 2021-08-20 23:01:37.283204-04
 pizza        |     0 |   12     | true    |         2 | 2021-08-20 23:01:37.283204-04
 toothbrush   |    16 |   14     | false   |       100 | 2021-08-20 23:02:37.768205-04
```

To include products priced exactly at 80, combine the less than operator with the equals sign by using (<=).

## Using the NOT Operator

The NOT operator is a powerful tool that allows you to exclude rows matching a specified condition. For example, if you want to retrieve products that have available stock (i.e., inventory not equal to zero), you can use:

```
SELECT * FROM products WHERE inventory <> 0;
```

This query returns every product that has an inventory greater than zero, effectively filtering out items that are out of stock.

## Combining Multiple Operators

SQL also supports combining conditions using AND and OR operators, allowing you to craft more nuanced queries.

### Using AND

To filter products based on multiple conditions simultaneously, use the AND operator. For instance, to retrieve products that have an inventory greater than zero and are priced above $20:

```
SELECT * FROM products WHERE inventory > 0 AND price > 20;
```

A typical output may appear as follows:

```
 name     | price
----------|-------
 keyboard |   28
 (other columns as defined in your table...)
```

### Using OR

If you want to display products that meet at least one of two conditions, the OR operator is ideal. For example, to retrieve any product priced above $100 or below $20:

```
SELECT * FROM products WHERE price > 100 OR price < 20;
```

This query returns all products that satisfy either condition, broadening your data scope.

> [!important]
> **SEO Tip**
>
> Incorporating descriptive keywords and clear syntax examples not only enhances readability but also boosts your content's search engine visibility.

By understanding how to effectively use these SQL operators, you can precisely control your data queries to extract emerging patterns or pinpoint specific records.

Happy querying!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/0304b044-64ce-4fd6-a384-156867f36547/lesson/18e29f1f-09d5-4a3d-886f-65f9f1dceb87)**
>
> Watch video content
