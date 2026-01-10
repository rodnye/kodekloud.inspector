# Deleting Posts - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/FastAPI-Basics/Deleting-Posts)

---

## Table of Contents

- Deleting Posts
  - Defining the GET Endpoint for a Single Post
  - Starting the DELETE Endpoint Implementation
  - Implementing the Deletion Logic
  - Full Example with Helper Functions
  - Implementing the DELETE Endpoint Correctly
  - Testing the DELETE Endpoint
  - Verifying Deletion with the Updated Status Code
  - Conclusion
  - Additional Resources
  - Watch Video

---

## Content

Python API Development with FastAPI

FastAPI Basics

# Deleting Posts

In this lesson, we'll learn how to implement a DELETE endpoint in FastAPI to remove a post based on its ID. By following this guide, you will understand how to:

- Verify a post exists using a GET endpoint.
- Remove a post from an in-memory list.
- Handle scenarios where the post is not found.
- Return the appropriate HTTP response, using a 204 status code for a successful deletion.

> [!important]
> **Note**
>
> Before deleting a post, ensure you have helper functions in place to locate the post and its index within your list.

Below is an outline of the solution:

1.  Retrieve a single post using a GET endpoint for verification.
2.  Define the DELETE endpoint to:
    - Accept the post ID via the URL.
    - Find the index of the post with the given ID.
    - Remove the post from the list.
    - Return a response with a 204 status code if deleted, or a 404 error if not found.

## Defining the GET Endpoint for a Single Post

We start by defining a simple GET endpoint that retrieves a post by its ID. If the post isn’t found, an HTTPException with a 404 status code is raised.

```
@app.get("/posts/{id}")
def get_post(id: int):
    post = find_post(id)
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Post {id} was not found"
        )
    return {"post_detail": post}
```

## Starting the DELETE Endpoint Implementation

When creating the DELETE endpoint, ensure the post ID is included in the URL. Initially, the function signature might look like this:

```
@app.delete("/posts/{id}")
def delete_post():
```

However, this is incomplete because we need to accept the post ID as a parameter.

## Implementing the Deletion Logic

The deletion process involves:

- Locating the specific post (dictionary) in the in-memory array using its ID.
- Removing it with the list method `pop()`.

A simplified snippet for finding a matching post looks like this:

```
for p in my_posts:
    if p['id'] == id:
        return p
```

Later, we use a similar strategy to find the index of the post for deletion.

## Full Example with Helper Functions

Below is a complete example that sets up the FastAPI application along with helper functions to locate a post and its index for deletion. Notice the use of the `enumerate()` function in `find_index_post`.

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
    for p in my_posts:
        if p['id'] == id:
            return p

def find_index_post(id: int):
    for i, p in enumerate(my_posts):
        if p['id'] == id:
            return i

@app.get("/")
def root():
    return {"message": "Hello World"}

@app.get("/posts")
def get_posts():
    return {"data": my_posts}

@app.post("/posts", status_code=status.HTTP_201_CREATED)
def create_posts(post: Post):
    post_dict = post.dict()
    post_dict['id'] = randrange(0, 1000000)
    my_posts.append(post_dict)
    return {"data": post_dict}

@app.get("/posts/{id}")
def get_post(id: int):
    post = find_post(id)
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Post with id: {id} was not found"
        )
    return {"post_detail": post}
```

## Implementing the DELETE Endpoint Correctly

To implement the DELETE endpoint correctly, update the endpoint to include the post ID in the function parameters, handle scenarios where the post cannot be found, and return a 204 status code (No Content) on success.

```
@app.delete("/posts/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_post(id: int):
    # Find the index matching the given post ID
    index = find_index_post(id)
    if index is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Post with ID {id} does not exist"
        )
    my_posts.pop(index)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
```

> [!important]
> **Warning**
>
> Do not include any content in the response body when using a 204 status code, as this might cause errors related to the declared Content-Length.

## Testing the DELETE Endpoint

You can test the DELETE endpoint using tools like Postman. For example, sending a DELETE request to remove the post with ID 1 might initially yield an error like:

TypeError: 'NoneType' object cannot be interpreted as an integer

This error indicates that the helper function `find_index_post` returned `None`, meaning that the post with the specified ID does not exist. Once the conditional check is added, attempting to delete a non-existent post will raise an HTTPException with a 404 status code.

When the deletion is successful, the server will log a 204 No Content response:

```
INFO:     127.0.0.1:61307 - "GET /posts HTTP/1.1" 200 OK
...
INFO:     127.0.0.1:51801 - "DELETE /posts/1 HTTP/1.1" 204 No Content
```

The image below from the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) shows various HTTP response status codes, including the expected 204 code for a successful deletion.

![The image shows a webpage from the Mozilla Developer Network (MDN) documentation, detailing HTTP response status codes, specifically focusing on successful responses like "200 OK" and "201 Created." The page includes descriptions and explanations of various status codes.](https://kodekloud.com/kk-media/image/upload/v1752883439/notes-assets/images/Python-API-Development-with-FastAPI-Deleting-Posts/mdn-http-status-codes-success.jpg)

After deleting the post, running a GET request to retrieve all posts confirms that the post has been removed:

![The image shows the Postman application interface with a GET request being sent to a local server endpoint. The request is part of a collection named "fastapi-course" and is retrieving posts.](https://kodekloud.com/kk-media/image/upload/v1752883440/notes-assets/images/Python-API-Development-with-FastAPI-Deleting-Posts/postman-get-request-fastapi-course.jpg)

## Verifying Deletion with the Updated Status Code

The final DELETE endpoint returns a 204 status code with no content, which is shown in the following snippet:

```
@app.delete("/posts/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_post(id: int):
    # Find the index in the list based on the given post ID
    index = find_index_post(id)
    if index is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Post with ID {id} does not exist"
        )
    my_posts.pop(index)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
```

Sending a DELETE request now returns a 204 response with no content:

![The image shows a Postman interface with a DELETE request to a local server endpoint. The response status is 204 No Content, indicating a successful request.](https://kodekloud.com/kk-media/image/upload/v1752883441/notes-assets/images/Python-API-Development-with-FastAPI-Deleting-Posts/postman-delete-request-204-response.jpg)

## Conclusion

In this article, we demonstrated how to implement a DELETE endpoint in FastAPI to remove posts from an in-memory list. Key takeaways include:

- Using a GET endpoint to verify a post's existence.
- Implementing logic to remove a post by locating its index.
- Handling errors when a post is not found.
- Returning a 204 No Content response upon successful deletion.

In the next lesson, we will explore how to update posts in FastAPI. Happy coding!

## Additional Resources

- [FastAPI Official Documentation](https://fastapi.tiangolo.com/)
- [MDN Web Docs on HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/b1fa1425-07bf-49c6-b19d-ccded17d940d/lesson/a93d2966-1c3b-4250-aa86-8b38d99c895b)**
>
> Watch video content
