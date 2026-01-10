# Votes With Sqlalchemy - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Advanced-FastAPI/Votes-With-Sqlalchemy)

---

## Table of Contents

- Votes With Sqlalchemy
  - Watch Video

---

## Content

Python API Development with FastAPI

Advanced FastAPI

# Votes With Sqlalchemy

In this lesson, we will create the model for the votes table in our models.py file using SQLAlchemy. The model, named Vote, will extend Base and include two columns: one for the user ID and another for the post ID. Both columns are of type Integer, serve as foreign keys to the users and posts tables respectively, have "ON DELETE CASCADE" enabled, and together form a composite primary key.

Below is an example of how the models might be defined:

```
class Post(Base):
    __tablename__ = "posts"
    id = Column(Integer, primary_key=True, nullable=False)
    title = Column(String, nullable=False)
    content = Column(String, nullable=False)
    published = Column(Boolean, server_default='TRUE', nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))
    owner_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    owner = relationship("User")

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

After saving these changes, restart the application without errors. You can verify the new votes table in PgAdmin by refreshing the database view. In PgAdmin, inspect the table properties to confirm that:

- The votes table includes both the user_id and post_id columns.
- These columns together act as a composite primary key, ensuring that neither column is null.
- Both columns have correctly defined foreign keys with "CASCADE" on delete enabled.

> [!important]
> **Verification**
>
> Double-check the votes table in PgAdmin by inspecting its properties. The composite primary key and foreign key settings are essential for maintaining integrity between your posts and users tables.

To further test the setup, run the following SQL query. This query retrieves data from the votes table, sorted by user_id and post_id:

```
SELECT * FROM public.votes
ORDER BY user_id ASC, post_id ASC;
```

This query will display vote records. For instance, if there is a vote with user_id 21 and post_id 10, it will appear in the results. Attempting to insert a record with an invalid user or post reference will produce an error, confirming that the foreign key constraints and cascade delete behavior are enforced correctly.

By following these steps, you ensure that your votes table is correctly modeled and seamlessly integrated with the posts and users tables using SQLAlchemy.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/ed782f8c-495c-4ff8-8703-c9ab0ab04a4d/lesson/289a0126-164b-4954-916b-d8d3f4a33524)**
>
> Watch video content
