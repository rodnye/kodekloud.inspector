# Delete Post - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Testing/Delete-Post)

---

## Table of Contents

- Delete Post
  - Testing with an Unauthorized User
  - Authorized User Deletion Tests
  - Test Output Example
  - Watch Video
    - Authorized Post Creation
    - Unauthorized Actions
    - Successful Deletion
    - Deletion of a Non-Existent Post
    - Preventing Deletion of Another User’s Post

---

## Content

Python API Development with FastAPI

Testing

# Delete Post

In this lesson, we explore various scenarios for deleting posts using API endpoints. We will cover tests for unauthorized and authorized users, handling non-existent posts, and ensuring that users cannot delete posts they do not own. This guide is ideal for developers looking to improve their API testing strategies and secure their endpoints.

## Testing with an Unauthorized User

Before testing deletion, we first verify that an unauthorized user cannot create or delete posts.

### Authorized Post Creation

To set up the tests, we begin by creating a post with an authorized client. This confirms that the post creation flow works as expected.

```
res = authorized_client.post(
    "/posts/", json={"title": "arbitrary title", "content": "aasdfjasdf"}
)

created_post = schemas.Post(**res.json())
assert res.status_code == 201
assert created_post.title == "arbitrary title"
assert created_post.content == "aasdfjasdf"
assert created_post.published is True
assert created_post.owner_id == test_user['id']
```

### Unauthorized Actions

Now, we confirm that an unauthorized client is prevented from creating or deleting posts.

```
def test_unauthorized_user_create_post(client, test_user, test_posts):
    res = client.post(
        "/posts/", json={"title": "arbitrary title", "content": "aasdfjasdf"}
    )
    assert res.status_code == 401

def test_unauthorized_user_delete_post(client, test_user, test_posts):
    res = client.delete(f"/posts/{test_posts[0].id}")
    assert res.status_code == 401
```

> [!important]
> **Note**
>
> Notice that the DELETE HTTP method is used when attempting to delete a post. This ensures that the endpoint is correctly handling HTTP methods and returns the appropriate error code for unauthorized users.

## Authorized User Deletion Tests

Once the unauthorized actions are confirmed, we move on to testing deletion scenarios using an authorized client.

### Successful Deletion

When a user is logged in, deleting a post should return a 204 status code, indicating that the deletion was successful. While you could check for a decrease in the total post count, verifying the status code is sufficient for this test.

```
def test_delete_post_success(authorized_client, test_user, test_posts):
    res = authorized_client.delete(f"/posts/{test_posts[0].id}")
    assert res.status_code == 204
```

### Deletion of a Non-Existent Post

It’s important to handle cases where the user attempts to delete a post that does not exist. In such cases, the API should return a 404 response.

```
def test_delete_post_non_exist(authorized_client, test_user, test_posts):
    res = authorized_client.delete(f"/posts/800000")
    assert res.status_code == 404
```

### Preventing Deletion of Another User’s Post

To ensure proper security, a user should not be able to delete a post they do not own. In our test setup, we simulate a multi-user environment. Typically, this involves adding a fixture for a second user and creating posts accordingly. Below is an example of a fixture that creates a test user:

```
import pytest

@pytest.fixture
def test_user(client):
    user_data = {"email": "sanjeev@gmail.com", "password": "password123"}
    res = client.post("/users/", json=user_data)
    assert res.status_code == 201

    new_user = res.json()
    new_user['password'] = user_data['password']
    return new_user
```

Assuming that our posts data contains multiple posts and that the fourth post (index 3) is owned by a different user, the following test ensures that the authorized client (logged in as test_user) receives a 403 Forbidden response when attempting to delete that post:

```
def test_delete_other_user_post(authorized_client, test_user, test_posts):
    res = authorized_client.delete(f"/posts/{test_posts[3].id}")
    assert res.status_code == 403
```

> [!important]
> **Warning**
>
> Always ensure that API endpoints enforce proper ownership checks to avoid unauthorized deletions.

## Test Output Example

When you run the tests, you might see output similar to the following. This output confirms that all delete tests for posts have been executed successfully:

```
venv\lib\site-packages\aiofiles\os.py:10
venv\lib\site-packages\aiofiles\os.py:10: DeprecationWarning: "@coroutine" decorator is deprecated since Python 3.8, use "async def" instead
-- Docs: https://docs.pytest.org/en/stable/warnings.html
1 passed, 5 warnings in 3.45s
```

A detailed summary of the tests might look as follows:

```
pytest tests\test_posts.py -v -s
platform win32 -- Python 3.9.5, pytest-6.2.5, py-1.10.0, pluggy-1.0.0 -- c:\users\sanje\documents\courses\fastapi\venv\scripts\python.exe
cachedir: pytest_cache
rootdir: C:\Users\sanje\Documents\Courses\fastapi
plugins: cov-2.12.1
collected 13 items

tests/test_posts.py::test_get_all_posts PASSED
tests/test_posts.py::test_unauthorized_user_get_all_posts PASSED
tests/test_posts.py::test_unauthorized_user_get_one_post PASSED
tests/test_posts.py::test_get_one_post PASSED
tests/test_posts.py::test_get_one_post_not_exist PASSED
tests/test_posts.py::test_create_post[awesome new title-awesome new content-True] PASSED
tests/test_posts.py::test_create_post[favorite pizza-i love pepperoni-False] PASSED
tests/test_posts.py::test_create_post_default_published_true PASSED
tests/test_posts.py::test_unauthorized_user_create_post PASSED
tests/test_posts.py::test_unauthorized_user_delete_post PASSED
tests/test_posts.py::test_delete_post_success PASSED
tests/test_posts.py::test_delete_post_non_exist PASSED
tests/test_posts.py::test_delete_other_user_post PASSED
```

This concludes the delete tests for our posts. In the next lesson, we will review procedures for updating posts, further enhancing your API's robustness and security.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/eed445e5-68aa-46b3-9922-0fdf2a57b8f1/lesson/0a0b6597-f851-43d9-8ecb-4a2529a66282)**
>
> Watch video content
