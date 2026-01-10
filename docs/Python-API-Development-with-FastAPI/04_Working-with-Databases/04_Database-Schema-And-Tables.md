# Database Schema And Tables - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Working-with-Databases/Database-Schema-And-Tables)

---

## Table of Contents

- Database Schema And Tables
  - Understanding Columns and Rows
  - Data Types in PostgreSQL
  - Primary Keys
  - Column Constraints
  - Conclusion
  - Watch Video
    - Unique Constraint
    - Not Null Constraint

---

## Content

Python API Development with FastAPI

Working with Databases

# Database Schema And Tables

Understanding the basic concepts behind tables is essential when configuring a PostgreSQL database. In relational database design, a table represents a subject or event within your application. For instance, an e-commerce platform may have separate tables for users, products, purchases, and reviews. Each table stores specific data related to its subject and forms relationships with other tables—for example, a purchase record is linked to a user account and includes details of the products purchased. This relationship-driven design is crucial for building an efficient and well-structured database.

Similarly, in a social media application, there might be a table for users and another for posts. Each post is associated with one user (the creator), which establishes a direct relationship between the two tables.

## Understanding Columns and Rows

Tables are fundamentally composed of columns and rows. Columns represent different attributes of the data. For example, in a users table, you might include columns for the user's name, age, gender, email, and addresses. Each column is designed to store a specific type of information.

![The image explains the difference between columns and rows in a table, with an example table showing IDs, names, ages, and sexes.](https://kodekloud.com/kk-media/image/upload/v1752883486/notes-assets/images/Python-API-Development-with-FastAPI-Database-Schema-And-Tables/table-columns-rows-example.jpg)

Rows, on the other hand, represent individual entries within the table. In the users table example, each row corresponds to a unique user—such as Vanessa in the first row and Carl in the second.

## Data Types in PostgreSQL

Just as programming languages have data types, so do databases. When defining a column, you must specify its data type based on the attribute's nature. For numeric values—such as the total number of likes or retweets in a social media app—use integer or decimal types, similar to Python's integers and floats. For text-based data like names, emails, or addresses, PostgreSQL offers data types such as VARCHAR (which stands for varying character) and TEXT, analogous to Python strings.

Additionally, PostgreSQL supports Boolean values (true/false), just like Python. When you need to represent a collection of values, PostgreSQL provides an array type, much like Python lists. However, it is often more effective to establish a separate table when dealing with multiple related items.

![The image is a comparison table showing data types in Postgres and Python, highlighting numeric, text, boolean, and sequence types. It emphasizes that databases have data types similar to programming languages.](https://kodekloud.com/kk-media/image/upload/v1752883487/notes-assets/images/Python-API-Development-with-FastAPI-Database-Schema-And-Tables/postgres-python-data-types-comparison.jpg)

## Primary Keys

When creating a table, you designate one or more columns as the primary key. The primary key uniquely identifies each record in the table, ensuring no two rows share the same key. While this is commonly an “ID” column, any unique attribute—such as an email address in a users table—can serve as the primary key. Other unique identifiers like phone numbers or social security numbers can also be used.

![The image explains the concept of a primary key in a database, highlighting that the email column can serve as a primary key because it uniquely identifies each record. It includes a table with columns for ID, name, email, password, and phone number.](https://kodekloud.com/kk-media/image/upload/v1752883489/notes-assets/images/Python-API-Development-with-FastAPI-Database-Schema-And-Tables/primary-key-email-database-diagram.jpg)

The key requirement for primary keys is that they must be unique for every row, ensuring reliable record identification across the database.

## Column Constraints

In addition to specifying data types, you can enforce extra constraints on table columns to maintain data integrity.

### Unique Constraint

A unique constraint ensures that every entry in a specific column contains a distinct value. For example, if you want to ensure that no two users have the same name, you can add a unique constraint to the name column. PostgreSQL then validates entries, throwing an error if a duplicate is detected.

![The image explains the concept of unique constraints in databases, showing a table where the "name" column is marked as unique, highlighting that duplicates are not allowed.](https://kodekloud.com/kk-media/image/upload/v1752883490/notes-assets/images/Python-API-Development-with-FastAPI-Database-Schema-And-Tables/unique-constraints-database-table.jpg)

### Not Null Constraint

By default, PostgreSQL allows columns to contain null values. For instance, if you create a user without specifying a name or age, PostgreSQL will store a null value in those columns. To enforce that certain columns always contain a valid entry, you can apply a NOT NULL constraint. This ensures that any attempt to insert a record without a necessary value will result in an error.

![The image explains null constraints in databases, highlighting that columns can be left blank by default, resulting in a null value, and that a NOT NULL constraint ensures a column is never left blank. It includes a table example showing a null value in the "Age" column.](https://kodekloud.com/kk-media/image/upload/v1752883491/notes-assets/images/Python-API-Development-with-FastAPI-Database-Schema-And-Tables/null-constraints-database-example.jpg)

> [!important]
> **Note**
>
> Ensuring your constraints are well-defined is key to maintaining the integrity and reliability of your database.

## Conclusion

A solid understanding of tables, columns, rows, data types, primary keys, and column constraints is essential when designing a relational database in PostgreSQL. With this foundational knowledge, you can create database schemas that accurately model your application's data while enforcing data integrity across relationships. Master these concepts to efficiently design and manage your PostgreSQL databases and pave the way for more advanced topics such as query optimization and data transformation.

For more detailed documentation on PostgreSQL and database design, consider exploring the [PostgreSQL Documentation](https://www.postgresql.org/docs/) and related resources.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/0304b044-64ce-4fd6-a384-156867f36547/lesson/38c9dfa8-e705-42e2-8db5-7e2559a4fdac)**
>
> Watch video content
