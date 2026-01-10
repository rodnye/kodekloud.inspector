# Assigning Owner Id When Creating New Post - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Advanced-FastAPI/Assigning-Owner-Id-When-Creating-New-Post)

---

## Table of Contents

- Assigning Owner Id When Creating New Post
  - Understanding the Issue
  - Reviewing the API Endpoints
  - The Improved POST Operation
  - Expected JSON Response
  - Watch Video

---

## Content

Python API Development with FastAPI

Advanced FastAPI

# Assigning Owner Id When Creating New Post

In a previous lesson, we encountered an error during post creation. Instead of creating a new post successfully, the application returned a 500 status code. The logs revealed an SQL error indicating that a null value in the "owner_id" column violates the NOT NULL constraint.

> [!important]
> **Error Log Details**
>
> The error log was as follows:

```
line 1771, in _execute_context
    self.dialect.do_execute(
File "C:\users\sanje\documents\courses\fastapi\venv\lib\site-packages\sqlalchemy\engine\default.py", line 717, in do_execute
    cursor.execute(statement, parameters)
sqlalchemy.exc.IntegrityError: (psycopg2.errors.NotNullViolation) null value in column "owner_id" violates not-null constraint
[SQL: INSERT INTO posts (title, content, published, owner_id) VALUES (%(title)s, %(content)s, %(published)s, %(owner_id)s) RETURNING posts.id]
[parameters: {'title': 'top beaches in florida', 'content': 'something something beaches', 'published': True, 'owner_id': None}]
(Background on this error at: https://sqlalche.me/e/14/gkpj)
```

## Understanding the Issue

The database model defines the owner ID field as non-nullable. Here is a snippet from the model definition:

```
id = Column(Integer, primary_key=True, nullable=False)
title = Column(String, nullable=False)
content = Column(String, nullable=False)
published = Column(Boolean, server_default='TRUE', nullable=False)
created_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'))
owner_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)

class User(Base):
    __tablename__ = "users"
```

Despite the model expecting an owner ID, the post creation endpoint did not provide one. The SQL error confirms that when trying to insert a new post, the owner_id field was null.

The post schema was purposefully designed to exclude the owner ID from the request body since the authenticated user should be automatically assigned as the owner. Below is the post schema:

```
from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class PostBase(BaseModel):
    title: str
    content: str
    published: bool = True

class PostCreate(PostBase):
    pass

class Post(PostBase):
    id: int
    created_at: datetime
    owner_id: int

    class Config:
        orm_mode = True
```

## Reviewing the API Endpoints

For context, here are the GET and DELETE operations for individual posts:

```
@router.get("/{id}", response_model=schemas.Post)
def get_post(id: int, db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
    post = db.query(models.Post).filter(models.Post.id == id).first()
    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Post with id: {id} was not found")
    return post

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_post(id: int, db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
    # Deletion logic here...
    pass
```

In the initial POST operation, the owner ID was not set. The code omitted the owner ID, as shown below:

```
@router.post("/", status_code=status.HTTP_201_CREATED, response_model=schemas.Post)
def create_posts(post: schemas.PostCreate, db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
    cursor.execute("""
    INSERT INTO posts (title, content, published) VALUES (%s, %s, %s) RETURNING posts.id
    """, (post.title, post.content, post.published))
    cursor.fetchone()

    print(current_user.email)
    new_post = models.Post(**post.dict())
    db.add(new_post)
    db.commit()
    db.refresh(new_post)

    return new_post
```

Notice that the `PostCreate` model does not include the owner ID, as this value must be derived from the currently authenticated user.

## The Improved POST Operation

To resolve the issue, update the POST endpoint to automatically assign the owner ID from the authenticated user:

```
@router.post("/", status_code=status.HTTP_201_CREATED, response_model=schemas.Post)
def create_posts(post: schemas.PostCreate, db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
    # Using SQLAlchemy ORM to create a new post
    print(current_user.id)
    print(current_user.email)
    new_post = models.Post(owner_id=current_user.id, **post.dict())
    db.add(new_post)
    db.commit()
    db.refresh(new_post)

    return new_post
```

With this change, every new post is automatically linked to the user who is currently authenticated. Testing this change should confirm that the owner ID is stored correctly. For example, executing the following SQL query:

```
SELECT * FROM users;
```

might show that the user with ID 23 (e.g., Sanjeev at Gmail.com) is correctly associated with the new post.

## Expected JSON Response

After a successful post creation, the response should look similar to:

```
{
    "title": "top beaches in florida",
    "content": "something something beaches",
    "published": true,
    "id": 8,
    "created_at": "2021-08-28T21:36:39.369594-04:00",
    "owner_id": 23
}
```

> [!important]
> **Key Takeaway**
>
> The critical change is updating the post creation logic to include:
>
> new_post = models.Post(owner_id=current_user.id, \*\*post.dict())
>
> This adjustment ensures that each post is automatically linked to its creator.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/ed782f8c-495c-4ff8-8703-c9ab0ab04a4d/lesson/4f20d342-20f1-417a-a9cd-18a3d835b97b)**
>
> Watch video content
