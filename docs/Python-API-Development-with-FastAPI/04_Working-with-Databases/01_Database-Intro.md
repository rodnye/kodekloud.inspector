# Database Intro - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Working-with-Databases/Database-Intro)

---

## Table of Contents

- Database Intro
  - Watch Video

---

## Content

Python API Development with FastAPI

Working with Databases

# Database Intro

In this lesson, we explore how to integrate databases with your FastAPI application. Up until now, your posts were stored in memory, but as your application scales, reliably persisting data on disk using a database becomes essential.

A database is an organized collection of data that can be easily accessed, managed, and updated. Many applications require the persistent storage of data—whether it’s registered users or created posts—in a database. Instead of directly interacting with the database, we use a Database Management System (DBMS) to act as an intermediary. When you perform an operation, you send a request to the DBMS, which then executes the operation on the database and returns the result. This abstraction allows you to focus on application development without dealing with low-level data storage details.

There are two major categories of databases: relational and NoSQL databases. In this lesson, we focus on relational databases by working exclusively with PostgreSQL. Although there are some subtle differences in SQL implementations across PostgreSQL, MySQL, Oracle, SQL Server, and others, most core functionalities—estimated at about 97% consistency—remain the same. This consistency means that the SQL concepts you learn here will be broadly applicable.

SQL (Structured Query Language) is the standard language used to communicate with the DBMS. With SQL, you perform various operations such as inserting, updating, and retrieving data. When you send SQL statements to the DBMS, it processes these commands and returns the requested results.

![The image explains that Structured Query Language (SQL) is used to communicate with a Database Management System (DBMS), illustrated with a flow from a person to a database.](https://kodekloud.com/kk-media/image/upload/v1752883474/notes-assets/images/Python-API-Development-with-FastAPI-Database-Intro/sql-database-communication-diagram.jpg)

> [!important]
> **Note**
>
> For more insight into SQL and DBMS communications, you can explore the [SQL Tutorial](https://www.w3schools.com/sql/) for additional examples and best practices.

In the following sections, we will cover the installation of PostgreSQL on both Windows and Mac OS environments. An important feature of PostgreSQL (and most other databases) is its ability to manage multiple isolated databases within a single server instance. By default, PostgreSQL creates a database named "Postgres" upon installation, but you have the flexibility to create separate databases for different applications.

For instance, if you have two distinct applications—App1 and App2—you can create two separate databases (DB1 and DB2) within the same PostgreSQL instance. This strategy ensures that each application's data is maintained separately, reducing the risk of interference and promoting data isolation.

![The image is a diagram illustrating how a single instance of Postgres can be divided into multiple separate databases, with two applications (App1 and App2) connecting to different databases (DB1 and DB2).](https://kodekloud.com/kk-media/image/upload/v1752883475/notes-assets/images/Python-API-Development-with-FastAPI-Database-Intro/postgres-multiple-databases-diagram.jpg)

When PostgreSQL is installed, it automatically creates a default database named "Postgres." This database serves as a starting point or fallback when connecting to the PostgreSQL instance. Although you may not use this default database once your application-specific databases are created, it remains an integral part of your PostgreSQL setup.

> [!important]
> **Quick Tip**
>
> Remember: While the "Postgres" default database is useful for initial configuration and testing, it's good practice to create dedicated databases for each of your production applications to maintain clear boundaries.

In summary, this lesson introduced the basic concepts of databases, the role of a Database Management System (DBMS), and SQL in the context of your FastAPI application. In the sections that follow, we will dive into installing PostgreSQL and configuring your FastAPI application to interact with it, ensuring data persistence and reliability as your application grows.

For more detailed instructions and best practices, consider checking out the [PostgreSQL Documentation](https://www.postgresql.org/docs/) and [FastAPI Guide](https://fastapi.tiangolo.com/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/0304b044-64ce-4fd6-a384-156867f36547/lesson/5dd40a4b-bf41-444b-82f6-64785fd76999)**
>
> Watch video content
