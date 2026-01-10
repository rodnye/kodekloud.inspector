# What Is Db Migration Tool - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Database-Migration/What-Is-Db-Migration-Tool)

---

## Table of Contents

- What Is Db Migration Tool
  - SQLAlchemy Model Definitions and Their Limitations
  - Demonstrating the Schema Limitation
  - Introducing Alembic: A Database Migration Tool
  - Summary
  - Related Resources
  - Watch Video

---

## Content

Python API Development with FastAPI

Database Migration

# What Is Db Migration Tool

In this article, we explore the limitations of SQLAlchemy when evolving database schemas and introduce Alembic—a powerful database migration tool that automates and streamlines schema updates.

---

## SQLAlchemy Model Definitions and Their Limitations

Consider the following SQLAlchemy models:

```
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, nullable=False)
    email = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))


class Vote(Base):
    __tablename__ = "votes"
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
    post_id = Column(Integer, ForeignKey("posts.id", ondelete="CASCADE"), primary_key=True)
```

When your application starts, SQLAlchemy uses these definitions to create the corresponding tables in the PostgreSQL database if they do not already exist. Below is a sample console output indicating a successful startup:

```
INFO: Application startup complete.
WARNING: WatchGodReload detected file change in 'C:\Users\sanje\Documents\Courses\fastapi\app\models.py': 915f4585d116cdbbab211f73e5527481.tmp'. Reloading...
INFO: Started server process [26152]
INFO: Waiting for application startup.
INFO: Application startup complete.
```

However, SQLAlchemy does not accommodate modifications to the schema after the tables are created. For instance, if you update your model definitions by adding new columns, deleting columns, or altering constraints, SQLAlchemy will not modify the existing tables. Even if the models are updated with the same definitions:

```
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, nullable=False)
    email = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))


class Vote(Base):
    __tablename__ = "votes"
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
    post_id = Column(Integer, ForeignKey("posts.id", ondelete="CASCADE"), primary_key=True)
```

... the logs will still simply show that the application was successfully started:

```
INFO: Application startup complete.
WARNING: WatchGodReload detected file change in 'C:\...\models.py': 915f485d116cbdbaab217f3e5527481.tmp'. Reloading...
INFO: Started server process [26152]
INFO: Waiting for application startup.
INFO: Application startup complete.
```

SQLAlchemy checks for the existence of a table by name, and if it already exists, it does not push any updates. Thus, if you modify your models, the changes will not reflect in the production database unless you manually drop the tables and restart your application.

> [!important]
> **Warning**
>
> Manually dropping tables in a production environment is not a viable strategy for managing schema updates.

---

## Demonstrating the Schema Limitation

Suppose you add a new column to the **User** model for demonstration purposes:

```
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, nullable=False)
    email = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))
    phone_number = Column(String)


class Vote(Base):
    __tablename__ = "votes"
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
    post_id = Column(Integer, ForeignKey("posts.id", ondelete="CASCADE"), primary_key=True)
```

Even after saving and reloading the application, SQLAlchemy will not update the PostgreSQL table to include the new `phone_number` column. When inspecting the **users** table in pgAdmin, the new column is missing:

![The image shows a pgAdmin interface with a table structure for "users," displaying columns for id, email, password, and created_at, along with their data types and constraints. The left panel shows a database schema with various tables and functions.](https://kodekloud.com/kk-media/image/upload/v1752883382/notes-assets/images/Python-API-Development-with-FastAPI-What-Is-Db-Migration-Tool/pgadmin-users-table-structure.jpg)

---

## Introducing Alembic: A Database Migration Tool

To overcome these limitations, Alembic automates database migrations by updating your database schema in line with your SQLAlchemy models. With Alembic you can:

- Automatically update columns based on model changes.
- Track incremental changes to your schema over time.
- Roll back changes to any previous state with simple commands.

For example, when you update the **User** model to include the `phone_number` column, Alembic can generate and execute the necessary migration scripts to update your PostgreSQL database. Here is the updated model:

```
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, nullable=False)
    email = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))
    phone_number = Column(String)


class Vote(Base):
    __tablename__ = "votes"
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
    post_id = Column(Integer, ForeignKey("posts.id", ondelete="CASCADE"), primary_key=True)
```

After incorporating Alembic, you might see console output similar to the following, indicating the detection of changes and the application of migrations:

```
INFO: Application startup complete.
WARNING: WatchGodReload detected file change in 'C:\Users\sanje\Documents\Courses\fastapi\app\models.py': 915f485d116cbdbba21f73e5527481.tmp'. Reloading...
INFO: Started server process [11820]
INFO: Waiting for application startup.
INFO: Application startup complete.
```

Alembic not only updates your schema automatically but also integrates smoothly with version control systems like Git, giving teams the flexibility to roll back to previous schema versions if needed.

---

## Summary

In this article, we discussed how SQLAlchemy creates database tables using model definitions but does not support automatic schema changes in an existing database. This limitation can force developers into undesirable practices like dropping tables—a risky approach in production environments.

Alembic addresses these challenges by automating database migrations. It reads your SQLAlchemy models, generates migration scripts, and applies incremental changes to keep your database schema synchronized with your codebase, all while offering robust versioning and rollback capabilities.

In upcoming lessons, we will delve deeper into Alembic—covering installation, configuration, and advanced usage for managing database migrations effectively.

---

## Related Resources

- [Alembic Documentation](https://alembic.sqlalchemy.org/)
- [SQLAlchemy Documentation](https://www.sqlalchemy.org/)
- [FastAPI Official Site](https://fastapi.tiangolo.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/a6a7b30d-5ca7-4d69-a323-c508340e9931/lesson/0ebc75ed-6e41-4876-a453-feeb958d1a78)**
>
> Watch video content
