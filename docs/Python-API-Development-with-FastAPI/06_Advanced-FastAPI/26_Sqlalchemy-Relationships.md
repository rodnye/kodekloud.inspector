# Sqlalchemy Relationships - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Advanced-FastAPI/Sqlalchemy-Relationships)

---

## Table of Contents

- Sqlalchemy Relationships
  - Setting Up the Models
  - Updating the Pydantic Schemas
  - Application Logging
  - Final Model Configuration
  - Summary
  - Watch Video

---

## Content

Python API Development with FastAPI

Advanced FastAPI

# Sqlalchemy Relationships

When designing a social media–type application, it's common to retrieve posts along with details about the post creator. Instead of returning just an owner ID— which holds little meaning for end users— you can include user information such as username or email. SQLAlchemy relationships enable the automatic fetching of this related user data when querying posts.

For example, consider the following JSON response when fetching posts:

```
[
    {
        "title": "asdfsdf",
        "content": "this is the new content",
        "published": true,
        "id": 4,
        "created_at": "2021-08-28T21:18:13.460585-04:00",
        "owner_id": 21
    },
    {
        "title": "this is the new title wahoo",
        "content": "this is the new content",
        "published": true,
        "id": 9,
        "created_at": "2021-08-28T21:48:30.323527-04:00",
        "owner_id": 3
    }
]
```

Without a relationship, you would need to execute a separate query for each post, fetching the user details associated with the owner ID. With SQLAlchemy's relationship feature, the ORM automatically performs the necessary join to include the corresponding user details.

> [!important]
> **How It Works**
>
> This setup does not add a foreign key constraint in the database by itself; it simply instructs SQLAlchemy to retrieve the related user based on the `owner_id` when querying the posts.

## Setting Up the Models

Below is an example of how you can configure your models with a relationship between posts and users.

```
from sqlalchemy import Column, Integer, String, Boolean, TIMESTAMP, ForeignKey, text
from sqlalchemy.orm import relationship
from .database import Base


class Post(Base):
    __tablename__ = "posts"


    id = Column(Integer, primary_key=True, nullable=False)
    title = Column(String, nullable=False)
    content = Column(String, nullable=False)
    published = Column(Boolean, server_default='TRUE', nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))
    owner_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)


    # Automatically fetch the User based on owner_id.
    owner = relationship("User")


class User(Base):
    __tablename__ = "users"


    id = Column(Integer, primary_key=True, nullable=False)
    email = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))
```

With this setup, when you retrieve a post, SQLAlchemy will automatically fetch the corresponding user and attach it as the `owner` property.

## Updating the Pydantic Schemas

Even though SQLAlchemy fetches the related user automatically, your JSON responses may still only display the `owner_id`. To include the complete user information, update your Pydantic schemas to include an `owner` field.

```
from datetime import datetime
from pydantic import BaseModel, EmailStr


class PostBase(BaseModel):
    title: str
    content: str
    published: bool


class UserOut(BaseModel):
    id: int
    email: EmailStr
    created_at: datetime


    class Config:
        orm_mode = True


class Post(PostBase):
    id: int
    created_at: datetime
    owner_id: int
    owner: UserOut  # Now returns detailed user information


    class Config:
        orm_mode = True


class UserCreate(BaseModel):
    email: EmailStr
    password: str
```

> [!important]
> **Important**
>
> Ensure that the `UserOut` class is defined before the `Post` schema to avoid any errors due to the order of declaration.

After these changes, the posts endpoint will provide responses that include user details such as user ID, email, and account creation date. This enhancement eliminates the need for an extra query to fetch user details on the client side.

## Application Logging

When you test these changes and start your server, you should see log output similar to the following:

```
INFO:     127.0.0.1:57933 - "GET /posts/ HTTP/1.1" 200 OK
```

Once the updated relationships and schemas are in place, the posts endpoint might produce logs like these:

```
INFO:     127.0.0.1:57933 - "GET /posts HTTP/1.1" 307 Temporary Redirect
INFO:     127.0.0.1:57933 - "GET /posts HTTP/1.1" 200 OK
INFO:     127.0.0.1:55079 - "GET /posts/10 HTTP/1.1" 200 OK
```

## Final Model Configuration

Below is the final configuration for the Post model, which includes the relationship setup:

```
from sqlalchemy import Column, Integer, String, Boolean, TIMESTAMP, ForeignKey, text
from sqlalchemy.orm import relationship
from .database import Base


class Post(Base):
    __tablename__ = "posts"


    id = Column(Integer, primary_key=True, nullable=False)
    title = Column(String, nullable=False)
    content = Column(String, nullable=False)
    published = Column(Boolean, server_default='TRUE', nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))
    owner_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)


    owner = relationship("User")
```

When you start your server, you can confirm that the relationship is working as expected with logs similar to the following:

```
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Database connection was successful
INFO:     Started server process [5996]
INFO:     127.0.0.1:62004 - "GET /posts HTTP/1.1" 307 Temporary Redirect
INFO:     127.0.0.1:62004 - "GET /posts HTTP/1.1" 200 OK
INFO:     127.0.0.1:55079 - "GET /posts/10 HTTP/1.1" 200 OK
```

## Summary

By defining a relationship in your SQLAlchemy model and updating your Pydantic schemas, you can streamline your application's data handling by automatically including comprehensive user information with each post. This approach not only simplifies client-side operations but also improves the overall efficiency of your API responses.

For more details on SQLAlchemy relationships, check out the [SQLAlchemy documentation](https://docs.sqlalchemy.org/en/14/orm/basic_relationships.html).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/ed782f8c-495c-4ff8-8703-c9ab0ab04a4d/lesson/78ac5ab4-6a0f-459b-aa3f-96b86b60cc7e)**
>
> Watch video content
