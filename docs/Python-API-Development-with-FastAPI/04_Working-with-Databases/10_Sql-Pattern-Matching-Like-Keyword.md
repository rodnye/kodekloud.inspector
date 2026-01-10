# Sql Pattern Matching Like Keyword - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Working-with-Databases/Sql-Pattern-Matching-Like-Keyword)

---

## Table of Contents

- Sql Pattern Matching Like Keyword
  - Retrieving and Adding Records
  - Filtering Records Using the LIKE Operator
  - Conclusion
  - Watch Video
    - Finding Products That Start with "TV"
    - Changing the Pattern for Different Searches
    - Finding Products That End with a Specific Letter
    - Excluding Certain Patterns
    - Matching a Substring Anywhere in the Name
    - Handling Unexpected Errors

---

## Content

Python API Development with FastAPI

Working with Databases

# Sql Pattern Matching Like Keyword

In this tutorial, we will work with a products database to demonstrate how to use SQL pattern matching with the LIKE operator. We will begin by retrieving all records from the database, add new entries, and then explore filtering records using various LIKE patterns. This guide is perfect for developers and database administrators seeking to enhance their SQL querying skills.

## Retrieving and Adding Records

Start by retrieving all products to check the current state of the database:

```
SELECT * FROM products;
```

Next, insert some TV items with descriptive names. For example, add products named "TV BLUE", "TV RED", and "TV YELLOW" with designated prices—200 for one, a different value for another, and 50 for "TV YELLOW" (indicating less popularity). After inserting these entries, re-run the following query to verify your changes:

```
SELECT * FROM products;
```

> [!important]
> **Tip**
>
> Ensure that you have the necessary permissions to insert and retrieve records from your products database.

## Filtering Records Using the LIKE Operator

Standard comparison operators (such as equals, greater than, or less than) are not flexible enough for partial text matching. The LIKE operator, combined with wildcard characters, offers the ability to filter text columns—similar to regular expressions in Python.

### Finding Products That Start with "TV"

To fetch products whose names start with "TV", use the percent sign (%) as a wildcard representing any sequence of characters after "TV". For example:

```
SELECT * FROM products WHERE name LIKE 'TV%';
```

This query returns every product with a name beginning with "TV."

### Changing the Pattern for Different Searches

You can modify the pattern to search for products starting with any other letter. For example, to find products starting with "A", use:

```
SELECT * FROM products WHERE name LIKE 'A%';
```

Similarly, to retrieve products starting with "R" (e.g., products like "Remote"), run:

```
SELECT * FROM products WHERE name LIKE 'R%';
```

### Finding Products That End with a Specific Letter

To filter products ending with a particular letter, place the wildcard at the beginning of the pattern. For instance, to select names ending with "E":

```
SELECT * FROM products WHERE name LIKE '%E';
```

If no products end with the specified letter (say, "n"), the query returns an empty result set.

### Excluding Certain Patterns

To exclude records that contain a specific substring, combine the NOT operator with LIKE. For example, to exclude rows containing 'jené', use:

```
SELECT * FROM products WHERE name NOT LIKE '%jené%';
```

An example result after running this query is presented in the table below:

| name         | price | id  | is\\\_sale | inventory | created\\\_at                 |
| ------------ | ----- | --- | ---------- | --------- | ----------------------------- |
| TV           | 200   | 1   | false      | 0         | 2021-08-20 00:49:58.021274-04 |
| DVD Players  | 80    | 2   | false      | 0         | 2021-08-20 00:49:58.021274-04 |
| Car          | 40    | 3   | false      | 0         | 2021-08-20 00:49:58.021274-04 |
| pencil       | 4     | 4   | true       | 0         | 2021-08-20 00:49:58.021274-04 |
| keyboard     | 28    | 5   | false      | 0         | 2021-08-20 00:49:58.021274-04 |
| soda         | 2     | 6   | false      | 0         | 2021-08-20 00:49:58.021274-04 |
| pizza        | 30    | 7   | true       | 0         | 2021-08-20 00:49:58.021274-04 |
| toothbrush   | 5     | 8   | false      | 0         | 2021-08-20 00:49:58.021274-04 |
| xbox         | 380   | 9   | false      | 0         | 2021-08-20 00:49:58.021274-04 |
| toilet paper | 4     | 10  | false      | 0         | 2021-08-20 00:49:58.021274-04 |
| TV BLUE      | 100   | 11  | false      | 45        | 2021-08-20 00:49:58.021274-04 |
| TV RED       | 20    | 12  | true       | 0         | 2021-08-20 00:49:58.021274-04 |
| TV YELLOW    | 50    | 20  | false      | 0         | 2021-08-21 01:03:42.829215-04 |

### Matching a Substring Anywhere in the Name

To match any product that contains a specific substring (for example, "EN"), enclose the substring with wildcards on both sides:

```
SELECT * FROM products WHERE name LIKE '%EN%';
```

If you want to exclude rows containing a particular pattern—such as the substring "enn"—use the NOT operator:

```
SELECT * FROM products WHERE name NOT LIKE '%enn%';
```

> [!important]
> **Quick Fix**
>
> If you encounter an error due to a possible typo or syntax issue, retyping the query (for example, updating '%jené%' to '%enn%') might resolve the problem.

### Handling Unexpected Errors

During testing, you may run into unexpected errors. For instance, attempting the query below resulted in an error:

```
SELECT * FROM products WHERE name LIKE '%$nk%';
```

After identifying the issue, modify the query to search for a valid substring such as "pen":

```
SELECT * FROM products WHERE name LIKE '%pen%';
```

This corrected query returns the expected results.

## Conclusion

The SQL LIKE operator is a powerful tool for pattern matching in text columns. Whether you are searching for records that start with a specific string, end with a particular character, or contain a substring anywhere within the text, the flexibility of wildcards can refine your queries effectively. Experiment with different patterns to fully harness the capabilities of SQL pattern matching and to understand potential pitfalls along the way.

For further reading, check out the [SQL documentation](https://www.w3schools.com/sql/) for more advanced querying techniques.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/0304b044-64ce-4fd6-a384-156867f36547/lesson/c66f07e5-f0f9-46b3-9dff-7f0c0e724d22)**
>
> Watch video content
