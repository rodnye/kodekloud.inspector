# Sqlalchemy Foreign Keys - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Advanced-FastAPI/Sqlalchemy-Foreign-Keys)

---

## Table of Contents

- Sqlalchemy Foreign Keys
  - Defining Models with a Foreign Key
  - How It Works
  - Updating the Database Schema
  - Verifying the Changes in PostgreSQL
  - Testing the Foreign Key Constraint
  - Testing the "On Delete Cascade" Functionality
  - Final Notes
  - Watch Video

---

## Content

Python API Development with FastAPI

Advanced FastAPI

# Sqlalchemy Foreign Keys

In this lesson, you'll learn how to establish foreign key relationships in SQLAlchemy. This approach not only defines table columns but also automatically sets up the relationships between them, enhancing data integrity.

────────────────────────────────────────────

## Defining Models with a Foreign Key

Begin by opening your `models.py` file where your table schemas are defined. In the `Post` model, add a new column named `owner_id` to reference the user who owns the post. This column should have the same data type as the primary key in the `users` table (i.e., an integer). Additionally, set a foreign key constraint to reference the `id` column of the `users` table with a cascading delete option. This ensures that if a user is removed, all associated posts will be automatically deleted. Mark the field as non-nullable so that every post must have an owner.

Here is the final code implementation for the models:

```
from .database import Base
from sqlalchemy import Column, Integer, String, Boolean, TIMESTAMP, text, ForeignKey


class Post(Base):
    __tablename__ = "posts"


    id = Column(Integer, primary_key=True, nullable=False)
    title = Column(String, nullable=False)
    content = Column(String, nullable=False)
    published = Column(Boolean, server_default='TRUE', nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))
    owner_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)


class User(Base):
    __tablename__ = "users"


    id = Column(Integer, primary_key=True, nullable=False)
    email = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))
```

────────────────────────────────────────────

## How It Works

1.  The `owner_id` column in the `posts` table is defined as an `Integer` to mirror the `id` column in the `users` table.
2.  The parameter `ForeignKey("users.id", ondelete="CASCADE")` creates the relationship between the tables. The `CASCADE` option ensures that if a user is deleted, all their associated posts are removed automatically.
3.  By setting `nullable=False`, you enforce that every post must be linked to an existing user.

────────────────────────────────────────────

## Updating the Database Schema

When you restart your application, SQLAlchemy verifies if the table already exists. If the `posts` table is already present, the new column won’t be added automatically. In production environments, it is recommended to use a migration tool, such as Alembic, to update table schemas safely. However, during development, you can manually drop the `posts` table using PgAdmin or executing SQL, then restart the application to let SQLAlchemy create a new table based on the updated models.

> [!important]
> **Note**
>
> Remember to always back up your data before performing manual database schema modifications.

────────────────────────────────────────────

## Verifying the Changes in PostgreSQL

After restarting your application, ensure that the new schema is applied. Use your PostgreSQL query tool to run the following command:

```
select * from posts;
```

You should now see an `owner_id` column defined as non-null. Additionally, if you inspect the column constraints, the foreign key will include the "on delete cascade" action.

────────────────────────────────────────────

## Testing the Foreign Key Constraint

Before testing, verify that there are entries in the `users` table:

```
select * from users;
```

Next, insert a new post with a valid `owner_id` (make sure it matches an existing user ID):

```
-- Example SQL insertion (the actual insertion may depend on your application's method)
insert into posts (title, content, published, created_at, owner_id)
values ('Post One', 'Some sample content', TRUE, now(), 21);
```

Attempting to insert a post with a missing or invalid `owner_id` (e.g., using `NULL` or a non-existent user ID) will result in a database error due to the non-null constraint or a foreign key violation.

────────────────────────────────────────────

## Testing the "On Delete Cascade" Functionality

To verify the cascading delete behavior, delete a user whose ID is referenced by one or more posts. For example, if a user with an ID of `20` exists, execute:

```
DELETE FROM users WHERE id = 20;
```

Then check the `posts` table with the query below:

```
select * from posts;
```

Any post associated with an `owner_id` of `20` should have been automatically deleted because of the cascade rule.

> [!important]
> **Warning**
>
> Be cautious when using cascading deletes in production. Unintended deletions may occur if proper validations and backups are not in place.

────────────────────────────────────────────

## Final Notes

Hard-coding your schema means that adding new fields to an existing table may trigger errors elsewhere in your application until corresponding updates are made to your codebase. For production environments, always use a migration tool like Alembic to manage schema changes and ensure a smooth transition.

This lesson has demonstrated how to set up foreign key relationships in SQLAlchemy, enforce data integrity with cascaded deletions, and verify schema changes in PostgreSQL. For further details, check out the [SQLAlchemy Documentation](https://docs.sqlalchemy.org/) and learn more about [PostgreSQL](https://www.postgresql.org/).

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/ed782f8c-495c-4ff8-8703-c9ab0ab04a4d/lesson/9d8f7bb1-f950-4bad-885d-3030208aa9ed)**
>
> Watch video content
