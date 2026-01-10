# Updating Posts - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/FastAPI-Basics/Updating-Posts)

---

## Table of Contents

- Updating Posts
  - Setting Up a New Request in Postman
  - Understanding the FastAPI Application
  - Testing the Update Operation in Postman
  - The DELETE Operation for Context
  - Implementing the PUT Operation
  - Verifying the Update
  - Next Steps
  - Watch Video

---

## Content

Python API Development with FastAPI

FastAPI Basics

# Updating Posts

In this lesson, we complete the CRUD operations by implementing the update functionality using the HTTP PUT method. Building on the DELETE operation structure, this guide explains how to update a post by sending a complete payload that follows the defined schema.

## Setting Up a New Request in Postman

Begin by creating a new request in Postman using the same URL structure as for deleting a post (e.g., `/posts/{id}`). When updating a post, your request body must include all data fields defined in the post schema: title, content, a published flag, and an optional rating.

For instance, sending only a title like the example below will not work with the PUT method because it expects data for every field:

```
{
  "title": ""
}
```

Instead, when updating the title, the complete request body should look like:

```
{
  "title": "updated title",
  "content": "content of post 1",
  "published": true,
  "rating": null
}
```

## Understanding the FastAPI Application

The following snippet shows a basic FastAPI application that defines a Post model and stores posts in a list. Notice the helper functions used to locate posts by their ID.

```
from typing import Optional
from fastapi import FastAPI, Response, status, HTTPException
from pydantic import BaseModel
from random import randrange

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

def find_post(id: int):
    for post in my_posts:
        if post['id'] == id:
            return post

def find_index_post(id: int):
    for index, post in enumerate(my_posts):
        if post['id'] == id:
            return index
    return -1
```

> [!important]
> **Note**
>
> Ensure that the Postman request body is set as raw JSON. The initial test might just update a single field, but remember to include all required fields for a successful update.

## Testing the Update Operation in Postman

When testing in Postman, if you attempt to update only one field with:

```
{
  "title": "updated title"
}
```

you will encounter issues because the PUT method requires the complete post data. For example, if the original Post 1 is structured as:

```
my_posts = [
    {"title": "title of post 1", "content": "content of post 1", "id": 1},
    {"title": "favorite foods", "content": "I like pizza", "id": 2}
]
```

Then, to update Post 1, your request body must include all required fields:

```
{
  "title": "updated title",
  "content": "content of post 1",
  "published": true,
  "rating": null
}
```

## The DELETE Operation for Context

Below is the DELETE endpoint implementation that removes a post based on its ID:

```
@app.delete("/posts/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_post(id: int):
    index = find_index_post(id)
    if index == -1:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Post with id: {id} does not exist"
        )
    my_posts.pop(index)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
```

## Implementing the PUT Operation

The new PUT operation checks whether the post exists using the `find_index_post` helper function. If the post is not found, it raises a 404 error; otherwise, it updates the post by replacing the old values with the new data while preserving the original ID.

```
@app.put("/posts/{id}")
def update_post(id: int, post: Post):
    index = find_index_post(id)
    if index == -1:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Post with id: {id} does not exist"
        )
    post_dict = post.dict()
    post_dict['id'] = id
    my_posts[index] = post_dict
    return {"data": post_dict}
```

When you run the application, your terminal will log information similar to the following, confirming that the update operation is working:

```
INFO: title='updated title' content='content of post 1' published=True rating=None
INFO: 127.0.0.1:64051 - "PUT /posts/1 HTTP/1.1" 200 OK
```

## Verifying the Update

After updating a post (for example, changing the title to "updated title" and content to "This is the new content"), you should receive a response like:

```
{
    "data": {
        "title": "updated title",
        "content": "This is the new content",
        "published": true,
        "rating": null,
        "id": 1
    }
}
```

To confirm, perform a GET request on `/posts`. The updated list of posts should display the modified data:

```
{
    "data": [
        {
            "title": "updated title",
            "content": "This is the new content",
            "published": true,
            "rating": null,
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
> **Note**
>
> Review the JSON response in Postman to ensure every post object includes all the expected fields. This helps verify that the data is persisted correctly.

![The image shows the Postman application interface with a GET request to retrieve posts from a local server. The response is displayed in JSON format, showing data for multiple posts.](https://kodekloud.com/kk-media/image/upload/v1752883450/notes-assets/images/Python-API-Development-with-FastAPI-Updating-Posts/postman-get-request-json-response.jpg)

## Next Steps

After confirming the update operation, all CRUD operations have been successfully implemented in the FastAPI application. In the next lesson, we will refactor the code for enhanced readability and maintainability before integrating a PostgreSQL database to persist the data.

Transcribed by https://otter.ai

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/b1fa1425-07bf-49c6-b19d-ccded17d940d/lesson/38959a73-5725-489c-bd35-756e585b06c5)**
>
> Watch video content
