# Querying and Updating Data - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DP-900-Microsoft-Azure-Data-Fundamentals/Structured-Data/Querying-and-Updating-Data)

---

## Table of Contents

- Querying and Updating Data
  - Data Manipulation Language (DML)
  - Data Definition Language (DDL)
  - Data Control Language (DCL)
  - References
  - Watch Video
    - SELECT
    - UPDATE
    - DELETE
    - INSERT

---

## Content

DP-900: Microsoft Azure Data Fundamentals

Structured Data

# Querying and Updating Data

Structured Query Language (SQL) is the industry-standard language for interacting with relational databases. Pronounced “S-Q-L” or “sequel,” SQL is governed by ANSI/ISO, with each vendor—such as Microsoft’s T-SQL or Oracle’s PL/SQL—adding its own extensions. Mastering standard SQL lets you work across virtually any relational database.

Although SQL suggests only querying, it actually consists of three sublanguages:

- Data Manipulation Language (DML): retrieve and modify data
- Data Definition Language (DDL): create, alter, and drop database objects
- Data Control Language (DCL): manage user permissions

![The image is an informational graphic about Structured Query Language (SQL), explaining its ANSI/ISO standard, common names, vendor-specific features, and its three parts: Data Manipulation Language (DML), Data Definition Language (DDL), and Data Control Language (DCL).](https://kodekloud.com/kk-media/image/upload/v1752873090/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Querying-and-Updating-Data/sql-ansi-iso-standards-overview.jpg)

---

## Data Manipulation Language (DML)

DML is where you spend most of your SQL time. Each DML statement begins with one of these commands:

| Command | Purpose                    | Example                              |
| ------- | -------------------------- | ------------------------------------ |
| SELECT  | Retrieve rows from a table | `SELECT * FROM Customer;`            |
| UPDATE  | Modify existing rows       | `UPDATE Customer SET ... WHERE ...;` |
| DELETE  | Remove rows                | `DELETE FROM Customer WHERE ...;`    |
| INSERT  | Add new rows               | `INSERT INTO ... VALUES (...);`      |

Common clauses include:

- **FROM**: specify source table(s)
- **JOIN**: combine rows from multiple tables
- **WHERE**: filter rows affected by the statement

### SELECT

Retrieve data from a `Customer` table:

```
SELECT CustomerId,
       FirstName,
       LastName
FROM Customer
WHERE CustomerId = '0001';
```

This returns the row where `CustomerId` equals `0001`.

### UPDATE

Modify an existing row:

```
UPDATE Customer
SET LastName = 'Irvine'
WHERE CustomerId = '0001';
```

Only the `LastName` for customer `0001` is updated.

### DELETE

> [!important]
> **Warning**
>
> Always include a `WHERE` clause in a `DELETE` statement. Omitting it will remove **all** rows from the table.

```
DELETE
FROM Customer
WHERE CustomerId = '0001';
```

This deletes only the matching customer.

### INSERT

Add a new record:

```
INSERT INTO Customer (CustomerId, FirstName, LastName)
VALUES ('0003', 'Jason', 'van de Velde');
```

This creates a new row with the specified values.

---

## Data Definition Language (DDL)

DDL statements manage database structures—tables, views, indexes, and more.

| Command | Purpose                                           | Example                                   |
| ------- | ------------------------------------------------- | ----------------------------------------- |
| CREATE  | Add a new table, view, index, or stored procedure | `CREATE TABLE Orders (...);`              |
| DROP    | Remove an existing object                         | `DROP TABLE Orders;`                      |
| ALTER   | Modify an existing object (e.g., add a column)    | `ALTER TABLE Customer ADD Email VARCHAR;` |

![The image describes three additional statements in Data Definition Language: "Create" to add a table, "Drop" to remove a table, and "Alter" to add, rename, or change columns in a table.](https://kodekloud.com/kk-media/image/upload/v1752873091/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Querying-and-Updating-Data/ddl-create-drop-alter-statements.jpg)

---

## Data Control Language (DCL)

DCL commands grant or revoke permissions to users and roles:

| Command | Purpose                                           | Example                                          |
| ------- | ------------------------------------------------- | ------------------------------------------------ |
| GRANT   | Give permissions (SELECT, INSERT, UPDATE, DELETE) | `GRANT SELECT ON Customer TO report_user;`       |
| REVOKE  | Remove previously granted permissions             | `REVOKE DELETE ON Orders FROM temp_backup_role;` |

![The image explains two Data Control Language (DCL) statements: "Grant" to allow user access to a table, and "Revoke" to remove user access, both for DDL and DML operations.](https://kodekloud.com/kk-media/image/upload/v1752873093/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Querying-and-Updating-Data/dcl-grant-revoke-access-explanation.jpg)

---

## References

- [ANSI SQL Standard Overview](https://www.iso.org/standard/63555.html)
- [Microsoft Transact-SQL (T-SQL)](https://docs.microsoft.com/sql/t-sql/)
- [Oracle PL/SQL Documentation](https://docs.oracle.com/en/database/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/dp-900-microsoft-azure-data-fundamentals/module/ab06c95a-37f6-40d4-9dd8-b5a6961866b5/lesson/9f784dc3-d423-4401-acce-eeeb1ddc26f3)**
>
> Watch video content
