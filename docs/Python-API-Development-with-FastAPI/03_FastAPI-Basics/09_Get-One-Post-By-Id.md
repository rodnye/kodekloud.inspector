# Get One Post By Id - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/FastAPI-Basics/Get-One-Post-By-Id)

---

## Table of Contents

- Get One Post By Id
  - Retrieving an Individual Post
  - Using a Helper Function to Locate a Post
  - Handling Type Conversions
  - Leveraging FastAPI’s Validation
  - Final Function Example
  - Watch Video

---

## Content

Python API Development with FastAPI

FastAPI Basics

# Get One Post By Id

In this guide, we'll enhance our CRUD application by introducing the functionality to retrieve a single post using its ID. Previously, we implemented features to create a new post and to retrieve all posts. Now, we'll add a function that returns one specific post based on an ID provided as a path parameter in the URL.

Below is the code snippet for creating a post. When a new post is created, it is assigned a random ID before being appended to our list of posts.

```
@app.post("/posts")
def create_posts(post: Post):
    post_dict = post.dict()
    post_dict['id'] = randrange(0, 100000)
    my_posts.append(post_dict)
    return {"data": post_dict}
```

## Retrieving an Individual Post

We'll implement a function called `get_post` for retrieving a single post. The endpoint will have the following structure: `/posts/{id}`, where `{id}` is a path parameter representing the post's ID requested by the user. FastAPI automatically extracts this parameter and makes it available to the function.

Initially, you might define the endpoint like this:

```
@app.get("/posts/{id}")
def get_post():
```

To access the provided ID, simply include it as a parameter in the function. For testing purposes, we can print the ID and return a hard-coded response:

```
@app.get("/posts/{id}")
def get_post(id):
    print(id)
    return {"post_detail": f"Here is post {id}"}
```

When a GET request is made to a URL such as `/posts/1`, FastAPI extracts the value `1` as a string and passes it to the function. Such a parameter embedded in the URL is known as a _path parameter_.

## Using a Helper Function to Locate a Post

Our application stores posts in a list called `my_posts`. To find a post by its specific ID, we can define a helper function, `find_post`, which iterates through the list and returns the matching post:

```
def find_post(id):
    for p in my_posts:
        if p["id"] == id:
            return p
```

Consider the following sample data structure and helper function:

```
class Post(BaseModel):
    title: str
    content: str
    published: bool = True
    rating: Optional[int] = None


my_posts = [
    {"title": "title of post 1", "content": "content of post 1", "id": 1},
    {"title": "favorite foods", "content": "I like pizza", "id": 2}
]
```

Now, update the `get_post` function to utilize the `find_post` helper function and return the located post:

```
@app.get("/posts/{id}")
def get_post(id):
    post = find_post(id)
    return {"post_detail": post}
```

## Handling Type Conversions

Keep in mind that path parameters are received as strings by default. For instance, when the URL `/posts/2` is accessed, the `id` inside the function will be the string `"2"`, not the integer `2`. This mismatch could cause the equality check to fail when comparing with integers stored in `my_posts`.

To address this, convert the `id` to an integer before using it in `find_post`:

```
@app.get("/posts/{id}")
def get_post(id):
    post = find_post(int(id))
    print(post)
    return {"post_detail": post}
```

> [!important]
> **Note**
>
> If a non-numeric value is passed (e.g., `/posts/asdfasdf`), converting the string to an integer will raise a `ValueError` and result in an internal server error.

## Leveraging FastAPI’s Validation

FastAPI simplifies parameter types by validating and converting them automatically. By declaring the `id` parameter as an `int` in the function signature, FastAPI converts the parameter before the function is executed. If the conversion fails, FastAPI provides a clear and informative error message.

Update the function signature accordingly:

```
@app.get("/posts/{id}")
def get_post(id: int):
    post = find_post(id)
    print(post)
    return {"post_detail": post}
```

Now, if a user sends a request with a non-numeric `id`, FastAPI responds with a validation error similar to the following:

```
{
  "detail": [
    {
      "loc": ["path", "id"],
      "msg": "value is not a valid integer",
      "type": "type_error.integer"
    }
  ]
}
```

In contrast, any numeric input is seamlessly converted into an integer before processing.

## Final Function Example

Below is the complete version of our individual post retrieval implementation, including the helper function and the supporting code:

```
from fastapi import FastAPI
from fastapi.params import Body
from pydantic import BaseModel
from random import randrange
from typing import Optional


app = FastAPI()


class Post(BaseModel):
    title: str
    content: str
    published: bool = True
    rating: Optional[int] = None


my_posts = [
    {"title": "title of post 1", "content": "content of post 1", "id": 1},
    {"title": "favorite foods", "content": "I like pizza", "id": 2}
]


def find_post(id):
    for p in my_posts:
        if p["id"] == id:
            return p


@app.get("/")
def root():
    return {"message": "Hello World"}


@app.get("/posts")
def get_posts():
    return {"data": my_posts}


@app.post("/posts")
def create_posts(post: Post):
    post_dict = post.dict()
    post_dict['id'] = randrange(0, 100000)
    my_posts.append(post_dict)
    return {"data": post_dict}


@app.get("/posts/{id}")
def get_post(id: int):
    post = find_post(id)
    print(post)
    return {"post_detail": post}
```

> [!important]
> **Tip**
>
> This implementation not only provides robust type validation for the path parameter but also lays the groundwork for future extensions like updating or deleting posts. Explore additional documentation in the [FastAPI official docs](https://fastapi.tiangolo.com/) for further enhancements.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/b1fa1425-07bf-49c6-b19d-ccded17d940d/lesson/27110f26-4b81-4bf8-b40d-748d016a325f)**
>
> Watch video content
