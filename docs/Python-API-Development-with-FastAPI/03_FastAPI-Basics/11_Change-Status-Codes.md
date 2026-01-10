# Change Status Codes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/FastAPI-Basics/Change-Status-Codes)

---

## Table of Contents

- Change Status Codes
  - Customizing the Response for Non-Existent Posts
  - Returning a Custom Error Message
  - Using HTTPException for Cleaner Error Handling
  - Changing the Default Status Code on Entity Creation
  - Summary
  - Watch Video

---

## Content

Python API Development with FastAPI

FastAPI Basics

# Change Status Codes

In this lesson, we explore how to customize HTTP status codes in FastAPI for GET and POST operations. By default, retrieving a non-existent post returns a 200 OK status, even if the item does not exist. This can be confusing for front-end applications since it fails to clearly differentiate between an absent resource and other types of errors.

Below is our basic setup for creating and retrieving posts:

```
@app.post("/posts")
def create_posts(post: Post):
    post_dict = post.dict()
    post_dict["id"] = randrange(0, 100000)
    my_posts.append(post_dict)
    return {"data": post_dict}


@app.get("/posts/{id}")
def get_post(id: int):
    post = find_post(id)
    return {"post_detail": post}
```

When testing with Postman, if you try to retrieve a post with a non-existent ID (for example, using an ID of 5 while available posts include only IDs 1 and 2), you may receive a response like this:

```
{
  "post_detail": null
}
```

Even though the response body indicates the post is not found, the 200 OK status does not provide enough information for the client to understand whether the issue is due to a missing resource or another error.

A similar approach is taken by GitHub. When you enter a URL for a non-existent repository, GitHub responds with a 404 Not Found error. This is illustrated in the following diagram:

![The image shows a webpage from the Mozilla Developer Network (MDN) detailing HTTP response status codes, including sections on information and successful responses.](https://kodekloud.com/kk-media/image/upload/v1752883434/notes-assets/images/Python-API-Development-with-FastAPI-Change-Status-Codes/mdn-http-response-status-codes.jpg)

HTTP status codes play a crucial role in communicating the outcome of an operation. For example, when creating an entity via a POST request, the conventional response should be 201 Created rather than the default 200 OK. The diagram below shows a listing of commonly used HTTP status codes:

![The image shows a webpage listing HTTP status codes and their descriptions, including categories like redirection messages.](https://kodekloud.com/kk-media/image/upload/v1752883435/notes-assets/images/Python-API-Development-with-FastAPI-Change-Status-Codes/http-status-codes-listing.jpg)

For error responses, the 400 series indicate client-side issues such as a bad request (400) or a missing resource (404), while the 500 series represents server-side errors. The diagram below focuses on the 404 Not Found response:

![The image shows a webpage from the Mozilla Developer Network (MDN) detailing HTTP status codes, specifically focusing on client error responses like "404 Not Found."](https://kodekloud.com/kk-media/image/upload/v1752883436/notes-assets/images/Python-API-Development-with-FastAPI-Change-Status-Codes/mdn-http-status-codes-404.jpg)

And here is a diagram illustrating various 500-series server error responses:

![The image shows a webpage from Mozilla Developer Network (MDN) detailing various HTTP server error responses, including descriptions of error codes like 500, 501, 502, and others.](https://kodekloud.com/kk-media/image/upload/v1752883437/notes-assets/images/Python-API-Development-with-FastAPI-Change-Status-Codes/mdn-http-server-error-responses.jpg)

## Customizing the Response for Non-Existent Posts

By default, our GET operation returns a 200 status code even when the post is not found. To give clearer feedback to the front end, adjust the response using FastAPI’s `Response` object.

First, import `Response` from FastAPI. Then, modify your GET endpoint as follows:

```
@app.get("/posts/{id}")
def get_post(id: int, response: Response):
    post = find_post(id)
    if not post:
        response.status_code = 404
    return {"post_detail": post}
```

Now, when a non-existent post is requested, the endpoint returns a 404 status code, even though the response body remains `{"post_detail": null}`.

## Returning a Custom Error Message

Returning a null value might not provide enough clarity. Instead, consider returning a meaningful error message when the post is missing:

```
@app.get("/posts/{id}")
def get_post(id: int, response: Response):
    post = find_post(id)
    if not post:
        response.status_code = status.HTTP_404_NOT_FOUND
        return {"message": f"Post with id: {id} was not found"}
    return {"post_detail": post}
```

> [!important]
> **Tip**
>
> Using clear and descriptive error messages improves the quality of API responses and the overall developer experience.

## Using HTTPException for Cleaner Error Handling

A more streamlined method is to use FastAPI's built-in `HTTPException`. This approach automatically sends the designated HTTP status code along with the error message. First, import `HTTPException` from FastAPI:

```
from fastapi import FastAPI, Response, status, HTTPException
```

Update your GET endpoint to raise an exception if the post is not found:

```
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

Using `HTTPException` not only simplifies the code by eliminating the need for manual status code adjustments, but it also standardizes error handling across the application.

## Changing the Default Status Code on Entity Creation

When creating a new post, the HTTP specification recommends returning a 201 Created status instead of the default 200 OK. To achieve this, simply specify the `status_code` parameter in the POST route decorator:

```
@app.post("/posts", status_code=status.HTTP_201_CREATED)
def create_posts(post: Post):
    post_dict = post.dict()
    post_dict["id"] = randrange(0, 100000)
    my_posts.append(post_dict)
    return {"data": post_dict}
```

After making this modification, creating a new post will result in a response with the 201 status code. For example, if you send the following JSON data:

```
{
  "title": "top beaches in florida",
  "content": "something somethign beaches",
  "rating": 4
}
```

The response might look like this:

Status: 201 Created

```
{
    "data": {
        "title": "top beaches in florida",
        "content": "something somethign beaches",
        "published": true,
        "rating": 4,
        "id": 528891
    }
}
```

## Summary

In this article, we learned how to adjust HTTP status codes in FastAPI by:

- Manually changing the response status code using the `Response` object.
- Returning a custom error message when a resource is not found.
- Utilizing `HTTPException` for cleaner, more consistent error handling.
- Specifying the default status code for a path operation (e.g., returning 201 Created on POST requests).

> [!important]
> **Final Note**
>
> Implementing these techniques enhances the clarity and robustness of your API responses, ensuring that front-end applications receive accurate and contextual feedback for each request.

For further reading, consider exploring these resources:

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- [REST API Best Practices](https://restfulapi.net/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/b1fa1425-07bf-49c6-b19d-ccded17d940d/lesson/6e56daeb-8acf-44bf-bb47-980057551f50)**
>
> Watch video content
