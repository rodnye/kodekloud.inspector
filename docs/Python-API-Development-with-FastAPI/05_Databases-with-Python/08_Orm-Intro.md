# Orm Intro - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Databases-with-Python/Orm-Intro)

---

## Table of Contents

- Orm Intro
  - Watch Video

---

## Content

Python API Development with FastAPI

Databases with Python

# Orm Intro

When building a Python application that interacts with a database, you have multiple approaches to choose from. One common way is to work directly with the database using the default PostgreSQL driver and raw SQL commands. This approach is appealing if you're comfortable with SQL and prefer having complete control over your queries.

Alternatively, you can use an Object Relational Mapper (ORM). An ORM acts as an abstraction layer between your application (for example, a FastAPI server) and the underlying database. Instead of writing SQL statements by hand, you interact with the database using standard Python code. The ORM handles converting your Python instructions into SQL commands, streamlining database interactions.

Below is a diagram that compares traditional SQL database interaction with using an ORM in a FastAPI application:

![The image compares traditional SQL database interaction with using an Object Relational Mapper (ORM) in FastAPI. It shows how ORM uses Python and psycopg to interact with the database, simplifying the process.](https://kodekloud.com/kk-media/image/upload/v1752883386/notes-assets/images/Python-API-Development-with-FastAPI-Orm-Intro/sql-vs-orm-fastapi-diagram.jpg)

In the traditional setup, the FastAPI server communicates with the PostgreSQL database by sending SQL commands through the default driver. With an ORM, the application instead operates through Python-based interactions. The ORM translates these interactions into SQL, leveraging the same driver for database communication. This abstraction minimizes the direct use of complex SQL commands.

> [!important]
> **Note**
>
> One major advantage of using an ORM is the ability to define your database tables as Python models. This approach eliminates the need to manually create tables via a database management tool like PgAdmin.

For instance, consider the following model that defines a table:

```
class Post(Base):
    __tablename__ = "posts"


    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    content = Column(String, nullable=False)
    published = Column(Boolean)
```

This model creates a "posts" table with columns tailored for specific data types, constraints, and indexes. Once your table is defined in Python, you can easily execute database operations without writing raw SQL. For example, to retrieve a single post by its ID, you might write:

```
db.query(models.Post).filter(models.Post.id == id).first()
```

Using an ORM allows you to chain methods to build and execute queries in a more Pythonic manner, making database operations simpler and more maintainable.

It is important to note that while ORMs provide significant conveniences, they are standalone libraries. The most popular ORM in the Python ecosystem is SQLAlchemy. Remember, SQLAlchemy is not a part of FastAPI; it is an independent library that can be seamlessly integrated with various web frameworks or even used in non-web applications.

Below is a diagram that underscores SQLAlchemy’s role as a standalone Python ORM, highlighting its compatibility with different applications and frameworks:

![The image is a slide about SQLAlchemy, describing it as a popular Python ORM that is standalone and can be used with any Python web framework or application, without association with FastAPI.](https://kodekloud.com/kk-media/image/upload/v1752883388/notes-assets/images/Python-API-Development-with-FastAPI-Orm-Intro/sqlalchemy-python-orm-slide.jpg)

> [!important]
> **Next Steps**
>
> In the upcoming lesson, you'll learn how to set up a database connection using SQLAlchemy instead of the default PostgreSQL driver. This lesson will demonstrate how to integrate SQLAlchemy with a FastAPI application effectively.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/1c3ad280-5fee-4b8e-a891-42a61f9a2dd0/lesson/20b84dc3-81d9-4072-b423-da48474cda3c)**
>
> Watch video content
