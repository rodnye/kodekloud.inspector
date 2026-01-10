# Get One Post Test - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Testing/Get-One-Post-Test)

---

## Table of Contents

- Get One Post Test
  - Unauthorized Access Tests
  - Handling Non-Existent Posts
  - Retrieving a Valid Post
  - Test Run Summary
  - Watch Video

---

## Content

Python API Development with FastAPI

Testing

# Get One Post Test

In this article, we extend our testing suite by verifying the retrieval of individual posts. We start by ensuring that unauthorized users are prevented from accessing posts and then validate both valid and invalid post retrieval scenarios using an authorized client.

–––––––

## Unauthorized Access Tests

First, we verify that an unauthorized user cannot retrieve all posts. The following code snippet demonstrates this test:

```
def test_unauthorized_user_get_all_posts(client, test_posts):
    res = client.get("/posts/")
    assert res.status_code == 401
```

Next, we ensure that an unauthorized user cannot access a single post. We use the ID of the first post in our test data. Depending on your data structure, the ID may be accessed as a dictionary key or as an object attribute. Here, we assume it is provided by the SQLAlchemy model as an attribute:

```
def test_unauthorized_user_get_one_post(client, test_posts):
    res = client.get(f"/posts/{test_posts[0].id}")
    assert res.status_code == 401
```

–––––––

## Handling Non-Existent Posts

It is essential to confirm that the service returns a 404 error when a request is made for a post which does not exist. In the example below, we simulate a request for a post with an ID that is very unlikely to exist (e.g., 88888):

```
def test_get_one_post_not_exist(authorized_client, test_posts):
    res = authorized_client.get(f"/posts/88888")
    assert res.status_code == 404
```

> [!important]
> **Note**
>
> When running these tests, you might encounter warnings similar to the following. These warnings do not affect the test outcomes.

```
venv\lib\site-packages\aiofiles\os.py:10: DeprecationWarning: "@coroutine" decorator is deprecated since Python 3.8, use "async def" instead
-- Docs: https://docs.pytest.org/en/stable/warnings.html
```

–––––––

## Retrieving a Valid Post

Finally, we test the retrieval of a valid post with an authorized client. The test includes printing the returned JSON response (useful for debugging) and then validating the response against our Pydantic schema. Note that the JSON response contains a "Post" property nested within the returned data; thus, the details are accessed from this nested object.

```
def test_get_one_post(authorized_client, test_posts):
    res = authorized_client.get(f"/posts/{test_posts[0].id}")
    # Optional: Print the JSON response for debugging purposes.
    # print(res.json())
    post = schemas.PostOut(**res.json())
    # Confirm that the retrieved post's ID and content match the expected test post.
    assert post.Post.id == test_posts[0].id
    assert post.Post.content == test_posts[0].content
```

For your reference, the Pydantic schema for a post is defined as follows:

```
class Post(PostBase):
    id: int
    created_at: datetime
    owner_id: int
    owner: UserOut


    class Config:
        orm_mode = True
```

This configuration ensures that the data returned by SQLAlchemy is compatible with our schema, which is why we access the nested "Post" property in our validation assertions.

–––––––

## Test Run Summary

When you run the tests with pytest, you will see an output similar to this:

```
venv\lib\site-packages\aiofiles\os.py:10: DeprecationWarning: "@coroutine" decorator is deprecated since Python 3.8, use "async def" instead
-- Docs: https://docs.pytest.org/en/stable/warnings.html
...
5 passed, 5 warnings in 1.65s
```

This output confirms that the tests for unauthorized access, handling non-existent posts, and retrieving a valid post are functioning as expected.

––––––– In the next article, we will explore testing the creation of a post.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/eed445e5-68aa-46b3-9922-0fdf2a57b8f1/lesson/33d882ec-f7de-4850-97ed-17ec77dc301b)**
>
> Watch video content
