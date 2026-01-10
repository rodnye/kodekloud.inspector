# Create Posts - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/FastAPI-Basics/Create-Posts)

---

## Table of Contents

- Create Posts
  - Initial Implementation
  - Improved Endpoint Definition
  - Simulating Data Persistence
  - Watch Video
    - Code Breakdown

---

## Content

Python API Development with FastAPI

FastAPI Basics

# Create Posts

In previous examples, we discussed best practices and naming conventions for building APIs. In this updated guide, our FastAPI code is refactored to align with RESTful principles and industry standards.

## Initial Implementation

Initially, our application defined GET and POST endpoints as follows:

```
@app.get("/")
def root():
    return {"message": "Hello World"}


@app.get("/posts")
def get_posts():
    return {"data": "This is your posts"}


@app.post("/createposts")
def create_posts(post: Post):
    print(post)
    print(post.dict())
    return {"data": post}
```

Notice that the POST endpoint is defined with the path `/createposts`, which is inconsistent with RESTful naming standards. Our goal is to standardize all endpoints, so we update the POST endpoint to use `/posts`.

## Improved Endpoint Definition

By changing the POST endpoint to `/posts`, our API maintains a consistent naming scheme. The updated endpoint is shown below:

```
@app.post("/posts")
def create_posts(post: Post):
    print(post)
    print(post.dict())
    return {"data": post}
```

After updating the endpoint, be sure to adjust your testing tools—such as [Postman](https://www.postman.com)—with the new endpoint URL. For example, sending the following JSON in a POST request:

```
{
  "title": "top beaches in florida",
  "content": "something something beaches",
  "rating": 4
}
```

will now target the `/posts` endpoint. When tested, this endpoint responds as expected.

> [!important]
> **Note**
>
> Keep in mind that this example only prints and returns the submitted post; it does not persist data in a database.

## Simulating Data Persistence

Since this simple example does not use a database, we simulate data persistence by storing posts in an in-memory list. In a production setting, these posts would be saved to a database where ID creation is handled automatically. Here, we assign a unique ID to each post using a random integer.

Below is the consolidated version of our FastAPI application:

```
from typing import Optional
from fastapi import FastAPI
from pydantic import BaseModel
from random import randrange


app = FastAPI()


class Post(BaseModel):
    title: str
    content: str
    published: bool = True
    rating: Optional[int] = None


# In-memory storage for posts
my_posts = [
    {"title": "title of post 1", "content": "content of post 1", "id": 1},
    {"title": "favorite foods", "content": "I like pizza", "id": 2}
]


@app.get("/")
def root():
    return {"message": "Hello World"}


@app.get("/posts")
def get_posts():
    return {"data": my_posts}


@app.post("/posts")
def create_posts(post: Post):
    # Convert the Pydantic model to a dictionary
    post_dict = post.dict()
    # Assign a unique ID using a random number for demonstration purposes
    post_dict['id'] = randrange(0, 100000)
    my_posts.append(post_dict)
    # Return the newly created post including its ID
    return {"data": post_dict}
```

### Code Breakdown

1.  **Data Model:**  
    The `Post` class (a Pydantic model) defines the structure and validation rules for incoming post data.
2.  **In-Memory Storage:**  
    The `my_posts` list simulates a database and is pre-populated with two sample posts. Note that any data stored here will be lost when the server restarts.
3.  **GET Endpoint:**  
    The `/posts` GET endpoint returns all stored posts in response to client requests.
4.  **POST Endpoint:**  
    The `/posts` POST endpoint validates the input post using the `Post` model, converts it to a dictionary, assigns a unique ID using `randrange`, appends the post to the in-memory list, and returns the new post data.

When you test the GET endpoint (using Postman, for example), you should see a response similar to this:

```
{
  "data": [
    {
      "title": "title of post 1",
      "content": "content of post 1",
      "id": 1
    },
    {
      "title": "favorite foods",
      "content": "I like pizza",
      "id": 2
    }
  ]
}
```

> [!important]
> **Next Steps**
>
> As you continue to enhance your API, consider incorporating input validation and error handling mechanisms to build a fully functional CRUD-based application.

By following these guidelines, you ensure your API is both maintainable and aligned with RESTful best practices.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/b1fa1425-07bf-49c6-b19d-ccded17d940d/lesson/bd56f1cf-6508-4b3c-986f-8db7c8ab4369)**
>
> Watch video content
