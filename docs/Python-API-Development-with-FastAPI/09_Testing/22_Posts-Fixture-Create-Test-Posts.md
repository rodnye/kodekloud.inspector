# Posts Fixture Create Test Posts - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Testing/Posts-Fixture-Create-Test-Posts)

---

## Table of Contents

- Posts Fixture Create Test Posts
  - Improved Test Using the Fixture
  - Validating Response Data with Pydantic Schemas
  - Watch Video

---

## Content

Python API Development with FastAPI

Testing

# Posts Fixture Create Test Posts

In this lesson, we will create a fixture to add initial posts to our database. This approach not only simplifies testing for retrieving, updating, deleting, and voting on posts, but it also establishes a reusable framework across different test modules.

Below is a preliminary test that retrieves all posts using an authorized client. The test prints the JSON response and asserts that the HTTP status code is 200.

```
def test_get_all_posts(authorized_client):
    res = authorized_client.get("/posts/")
    print(res.json())
    assert res.status_code == 200
```

When running the tests, you may see output similar to the following:

```
(venv) C:\Users\sanje\Documents\Courses\fastapi>pytest tests/test_posts.py -v -s
platform win32 -- Python 3.9.5, pytest-6.2.5, py-1.10.0, pluggy-1.0.0 -- c:\users\sanje\documents\courses\fastapi\venv\scripts\python.exe
cachedir: .pytest_cache
rootdir: C:\Users\sanje\Documents\Courses\fastapi
plugins: cov-2.12.1
collected 1 item


tests/test_posts.py::test_get_all_posts [] PASSED
```

You might also encounter warnings such as:

```
================================= warnings summary =================================
venv\lib\site-packages\aiofiles\os.py:10
  venv\lib\site-packages\aiofiles\os.py:10: DeprecationWarning: "@coroutine" decorator
```

Since our tests will involve operations like updating or deleting posts, having a dedicated fixture to create initial posts is essential. In our test file (for example, `tests/test_posts.py`), this fixture streamlines the setup process for tests that need initial post data.

> [!important]
> **Fixture Usage Note**
>
> Every post must be associated with a test user. Ensure that you have a test user fixture and an active database session before invoking the post fixture.

Below is the complete fixture for creating test posts. This fixture first defines our list of test post data as dictionaries and then uses the SQLAlchemy `add_all` method to add all posts in one go. The Python `map` function converts each dictionary into a model instance.

```
@pytest.fixture
def test_posts(test_user, session):
    posts_data = [
        {
            "title": "first title",
            "content": "first content",
            "owner_id": test_user['id']
        },
        {
            "title": "2nd title",
            "content": "2nd content",
            "owner_id": test_user['id']
        },
        {
            "title": "3rd title",
            "content": "3rd content",
            "owner_id": test_user['id']
        }
    ]


    def create_post_model(post):
        return models.Post(**post)


    posts = list(map(create_post_model, posts_data))
    session.add_all(posts)
    session.commit()
    posts = session.query(models.Post).all()
    return posts
```

This fixture creates three posts in the database using the test user’s ID. You can now consistently use this fixture in any test requiring initial post data.

## Improved Test Using the Fixture

The following example demonstrates how to refactor our retrieval test to integrate the `test_posts` fixture:

```
from app import schemas


def test_get_all_posts(authorized_client, test_posts):
    res = authorized_client.get("/posts/")
    # Validate that the number of posts returned matches the number created by the fixture.
    assert len(res.json()) == len(test_posts)
    assert res.status_code == 200
```

## Validating Response Data with Pydantic Schemas

To leverage our Pydantic schemas for a more robust validation of the returned data, consider this enhanced approach. Here, a helper function named `validate` converts each dictionary in the response into a `PostOut` Pydantic model. This allows for detailed assertions on each post's data.

```
from app import schemas


def test_get_all_posts(authorized_client, test_posts):
    res = authorized_client.get("/posts/")


    def validate(post):
        return schemas.PostOut(**post)


    posts_map = map(validate, res.json())
    posts_list = list(posts_map)


    # Basic validations
    assert len(res.json()) == len(test_posts)
    assert res.status_code == 200


    # Example: Validate that the first post's ID matches (if the order is predictable).
    # If the retrieval order is not guaranteed, consider sorting or using alternative comparison methods.
    assert posts_list[0].Post.id == test_posts[0].id
```

When executing the tests with this configuration, your console output will confirm that the posts are created, retrieved, and validated correctly:

```
(venv) C:\Users\sanje\Documents\Courses\fastapi>pytest tests/test_posts.py -v -s
platform win32 -- Python 3.9.5, pytest-6.2.5, py-1.10.0, pluggy-1.0.0 -- C:\Users\sanje\Documents\Courses\fastapi\venv\Scripts\python.exe
cachedir: .pytest_cache
rootdir: C:\Users\sanje\Documents\Courses\fastapi
plugins: cov-2.12.1
collected 1 item


tests/test_posts.py::test_get_all_posts [{'Post': {'title': '2nd title', 'content': '2nd content', 'published': True, 'id': 2, 'owner_id': 1, 'owner': {...}}, {...}, ...] PASSED
```

> [!important]
> **Non-deterministic Order Warning**
>
> If the order of posts retrieved from the database is non-deterministic, consider sorting the results or modifying the assertions to ensure accurate comparisons.

By centralizing the post creation logic through this fixture, you not only simplify the testing environment but also enhance the maintainability of your tests, ensuring smooth transitions as your application evolves.

For additional information on testing best practices and related topics, check out our [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/) and [Kubernetes Documentation](https://kubernetes.io/docs/) pages.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/eed445e5-68aa-46b3-9922-0fdf2a57b8f1/lesson/8e577ef1-c37f-4898-b990-7d1deeca4e0d)**
>
> Watch video content
