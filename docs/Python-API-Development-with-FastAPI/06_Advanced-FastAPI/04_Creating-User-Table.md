# Creating User Table - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Advanced-FastAPI/Creating-User-Table)

---

## Table of Contents

- Creating User Table
  - Watch Video

---

## Content

Python API Development with FastAPI

Advanced FastAPI

# Creating User Table

In this article, we introduce user functionality into our application. Users will be able to register, log in, and create posts linked to their accounts. The first step is to allow new users to register. To do this, we define our data model by creating a new table in our PostgreSQL database that stores user information.

Since we’re using SQLAlchemy, we will create an ORM model for users similar to the one used for posts. Below is the complete final version of our models, including the previously defined Post model:

```
class Post(Base):
    __tablename__ = "posts"


    id = Column(Integer, primary_key=True, nullable=False)
    title = Column(String, nullable=False)
    content = Column(String, nullable=False)
    published = Column(Boolean, server_default='TRUE', nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))




class User(Base):
    __tablename__ = "users"


    id = Column(Integer, primary_key=True, nullable=False)
    email = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))
```

After saving these changes, the application will automatically reload. You might see an output similar to the following in your console:

```
app/models.py', 'C:\\Users\\sanje\\Documents\\Courses\\fastapi\\app\\models.py.915f4585d116cbdbbab21f73e5527481.tmp']. Reloading...
Database connection was successful!
INFO:     Started server process [18836]
INFO:     Waiting for application startup.
Application startup complete.
```

> [!important]
> **Note**
>
> In the User model:
>
> - The ID column serves as the primary key.
> - The email column is defined as a unique, non-nullable String to prevent duplicate registrations.
> - The password column is non-nullable.
> - The created_at column automatically records when a record is added.

After the application restarts, open PgAdmin and refresh your tables to verify that the "users" table has been created with the necessary columns and constraints.

To verify the posts, run the following SQL query:

```
SELECT * FROM public.posts
ORDER BY id ASC;
```

At this stage, the users table will be empty. To test user creation, right-click on the table in PgAdmin, select "View/Edit Data," and insert a new record. For example, add a user with the email "john@gmail.com" and any password. Upon saving, the generated ID and created timestamp should appear.

Next, test duplicate prevention by trying to insert another user with the same email. Execute the following SQL query to check the "users" table:

```
SELECT * FROM public/users
ORDER BY id ASC;
```

If you attempt to insert a duplicate email, the database will throw a unique constraint error on the email field. To resolve this, change the email—for instance, to "cindy@gmail.com"—and save the record.

Use the following SQL query to view the current records in the "users" table:

```
SELECT * FROM public/users
ORDER BY id ASC;
```

With the table and constraints now established, the first step is complete. The next phase will involve creating a new path operation in our API that enables users to register by submitting their email and password.

For more details on database design and managing SQL schemas, consider checking out the following resources: [PostgreSQL Documentation](https://www.postgresql.org/docs/) and [SQLAlchemy Documentation](https://docs.sqlalchemy.org/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/ed782f8c-495c-4ff8-8703-c9ab0ab04a4d/lesson/a5a7f26e-04b9-42e2-a3a2-012b09969d26)**
>
> Watch video content
