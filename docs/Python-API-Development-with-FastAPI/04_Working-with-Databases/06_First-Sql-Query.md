# First Sql Query - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Working-with-Databases/First-Sql-Query)

---

## Table of Contents

- First Sql Query
  - Running Your Query
  - Breaking Down the SQL Query
  - Retrieving Specific Columns
  - Renaming Columns with AS
  - Conclusion
  - Watch Video

---

## Content

Python API Development with FastAPI

Working with Databases

# First Sql Query

In this lesson, you'll run your first SQL command and learn essential querying techniques. Before proceeding, ensure that you add six or seven extra entries to your database. Vary the prices, is_sale Boolean values (mix of true and false), inventory numbers, and creation times. This variety in data will help you observe different query outcomes later on.

> [!important]
> **Note**
>
> Before you begin, run the following query to verify that your products table contains all the necessary entries:

```
SELECT * FROM public.products
ORDER BY id ASC;
```

This query displays all rows from the products table, ordered ascendingly by the id column.

## Running Your Query

Open your database (for example, a database named "FastAPI") in PgAdmin or your preferred SQL tool. Right-click on the database, select the query tool, and enter your command in the new tab. Once you've written your command, hit the play button (or execute command) to run it.

The basic SQL query to retrieve all data from the products table is:

```
SELECT * FROM products;
```

When executed, this command returns every row from the products table. Since your database currently holds only one table, this query effectively dumps every entry in the collection. If your database included multiple tables, this command would solely display data from the products table.

## Breaking Down the SQL Query

Let's examine the structure of the SQL command:

1.  **SELECT Keyword**: Indicates that you want to retrieve data.
2.  **Asterisk (\*)**: Specifies that you want to return every column from the table.
3.  **FROM Clause**: Identifies the source table (in this case, _products_) for retrieving the data.

> [!important]
> **Tip**
>
> Always include a semicolon (;) at the end of every SQL command. While some tools like PgAdmin may execute commands without it, other environments (e.g., the command line interface) require the semicolon.

## Retrieving Specific Columns

If you only need particular columns, you can replace the asterisk with the desired column names. For example, to retrieve solely the product names:

```
SELECT name FROM products;
```

For multiple specific columns—say, id, name, and price—in that order, write:

```
SELECT id, name, price FROM products;
```

Although SQL keywords such as SELECT and FROM are not case-sensitive, it is good practice to capitalize them to clearly distinguish SQL reserved words from user-defined identifiers.

## Renaming Columns with AS

At times, default column names can be confusing, especially when multiple tables have similar column names (like "id"). To improve clarity, you can rename columns using the AS keyword. For instance, to rename the _id_ column to _products_id_ and _is_sale_ to _on_sale_, use:

```
SELECT id AS products_id, is_sale AS on_sale FROM products;
```

The output will display the renamed columns. For example:

```
 products_id | on_sale
-------------+---------
           1 | false
           2 | false
           3 | false
           4 | true
           5 | false
           6 | false
           7 | false
           8 | true
           9 | false
          10 | true
          11 | true
          12 | true
          13 | true
(13 rows)
```

In another scenario, running the same query on a different dataset might produce:

```
 products_id | on_sale
-------------+---------
           1 | false
           7 | false
           9 | false
          10 | false
          12 | true
          13 | true
          15 | true
```

Notice that the query remains identical; only the underlying data changes.

## Conclusion

By understanding these basic SQL commands and techniques, you can efficiently query your database and tailor the output to your needs. Experiment with selecting specific columns and renaming them to enhance data clarity. Happy querying!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/0304b044-64ce-4fd6-a384-156867f36547/lesson/bcc0d08c-f5ec-4a2b-ba76-2da367462a29)**
>
> Watch video content
