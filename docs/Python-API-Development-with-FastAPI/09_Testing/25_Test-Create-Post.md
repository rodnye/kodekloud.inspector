# Test Create Post - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Testing/Test-Create-Post)

---

## Table of Contents

- Test Create Post
  - Unauthorized Access and Retrieve Post Tests
  - Create Post Tests
  - Default Published Value Test
  - Unauthorized Post Creation Test
  - Pydantic Schemas for Posts and Users
  - Conclusion
  - Watch Video

---

## Content

Python API Development with FastAPI

Testing

# Test Create Post

In this article, we review a comprehensive suite of tests for our post endpoints. These tests ensure that unauthorized users cannot access posts, non-existent posts return appropriate status codes, posts are successfully created via the API, and that the default published value is correctly applied when not provided.

The sections below group the tests logically to improve readability and SEO. Each section includes detailed explanations and corresponding code blocks.

---

## Unauthorized Access and Retrieve Post Tests

The tests in this section verify that:

- Unauthorized users cannot retrieve posts.
- Requests for non-existing posts return a 404 status code.
- Authorized users can successfully retrieve an existing post with matching attributes.

```
def test_unauthorized_user_get_one_post(client, test_posts):
    res = client.get(f"/posts/{test_posts[0].id}")
    assert res.status_code == 401




def test_get_one_post_not_exist(authorized_client, test_posts):
    res = authorized_client.get(f"/posts/88888")
    assert res.status_code == 404




def test_get_one_post(authorized_client, test_posts):
    res = authorized_client.get(f"/posts/{test_posts[0].id}")
    post = schemas.PostOut(**res.json())
    assert post.id == test_posts[0].id
    assert post.title == test_posts[0].title
    assert post.content == test_posts[0].content
```

---

## Create Post Tests

This section tests the post creation functionality using parameterization. It verifies that:

- The correct HTTP status code (201) is returned.
- The post content matches the input.
- The owner ID of the post is correctly assigned.

```
import pytest


@pytest.mark.parametrize("title, content, published", [
    ("awesome new title", "awesome new content", True),
    ("favorite pizza", "i love pepperoni", False),
    ("tallest skyscrapers", "wahoo", True),
])
def test_create_post(authorized_client, test_user, test_posts, title, content, published):
    res = authorized_client.post("/posts/", json={
        "title": title,
        "content": content,
        "published": published
    })
    created_post = schemas.Post(**res.json())
    assert res.status_code == 201
    assert created_post.title == title
    assert created_post.content == content
    assert created_post.published == published
    assert created_post.owner_id == test_user['id']
```

---

## Default Published Value Test

> [!important]
> **Note**
>
> In the PostBase model, the "published" field defaults to True. This test confirms that when the "published" field is omitted, the system sets it to True by default.

```
def test_create_post_default_published_true(authorized_client, test_user, test_posts):
    res = authorized_client.post("/posts/", json={
        "title": "arbitrary title",
        "content": "aasdfjasdf"
    })

    created_post = schemas.Post(**res.json())
    assert res.status_code == 201
    assert created_post.title == "arbitrary title"
    assert created_post.content == "aasdfjasdf"
    assert created_post.published is True
    assert created_post.owner_id == test_user['id']
```

---

## Unauthorized Post Creation Test

This test confirms that only authorized users can create posts. Any attempt by an unauthorized user to access the post route will result in a 401 status code.

```
def test_unauthorized_user_create_post(client, test_user, test_posts):
    res = client.get("/posts/")
    assert res.status_code == 401
```

---

## Pydantic Schemas for Posts and Users

The following Pydantic schemas define the structure for posts and users used in the tests. Notice that the "published" attribute in the PostBase model defaults to True.

```
from pydantic import BaseModel, EmailStr
from datetime import datetime


class PostBase(BaseModel):
    title: str
    content: str
    published: bool = True


class PostCreate(PostBase):
    pass


class Post(PostBase):
    id: int
    created_at: datetime


    class Config:
        orm_mode = True


class UserOut(BaseModel):
    id: int
    email: EmailStr
    created_at: datetime


    class Config:
        orm_mode = True
```

---

## Conclusion

At this stage, all tests related to post creation have been implemented and verified, including:

- Validating unauthorized access attempts.
- Handling requests for non-existent posts.
- Confirming the correct creation of posts.
- Ensuring default values are set appropriately when omitted.

In the next article, we will explore tests for updating or deleting a post.

> [!important]
> **Warning**
>
> Note: Additional console warnings regarding external library deprecations, such as the `@coroutine` decorator warning from aiofiles, do not affect the test outcomes.

Additional console warnings may include:

```
=================================================================
warnings summary
=================================================================
/venv/lib/site-packages/aiofiles/os.py:10: DeprecationWarning: "@coroutine" decorator
  ...
```

This concludes our lesson on testing post creation functionality. For more details, refer to our [API Testing Documentation](#).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/eed445e5-68aa-46b3-9922-0fdf2a57b8f1/lesson/22be8076-4c5d-4338-b638-4ea314230005)**
>
> Watch video content
