# Path Order Matters - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/FastAPI-Basics/Path-Order-Matters)

---

## Table of Contents

- Path Order Matters
  - Retrieving a Post by ID
  - Introducing the Latest Post Endpoint
  - Evolving the Code
  - Storing and Returning the Latest Post
  - The Corrected Latest Post Route
  - The Route Conflict Issue
  - Correcting the Route Order
  - Example Responses
  - Watch Video
    - Sample Console Output
    - An Initial Attempt
    - Console Output for the Initial Attempt
    - Console Output Remains Similar
    - Console Output for the Updated Code
    - Illustrative Route Definitions

---

## Content

Python API Development with FastAPI

FastAPI Basics

# Path Order Matters

In this lesson, we explore a common pitfall related to route ordering in FastAPI. FastAPI matches incoming requests based on the defined routes, and the sequence in which the routes are declared is crucial for ensuring that each request is handled by its intended endpoint. Misordering routes can lead to unexpected behavior.

## Retrieving a Post by ID

Below is a simple GET endpoint that retrieves a post by its ID. When a request is made to this route, it prints and returns the corresponding post details.

```
@app.get("/posts/{id}")
def get_post(id: int):
    post = find_post(id)
    print(post)
    return {"post_detail": post}
```

### Sample Console Output

```
INFO:     Started server process [3048]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
None
INFO:     127.0.0.1:53457 - "GET /posts/asdf sdf HTTP/1.1" 200 OK
None
INFO:     127.0.0.1:53458 - "GET /posts/123123 HTTP/1.1" 200 OK
None
INFO:     127.0.0.1:53462 - "GET /posts/2 HTTP/1.1" 200 OK
```

## Introducing the Latest Post Endpoint

Now, consider adding another GET endpoint intended to retrieve the latest post. The goal is to process a request to `/posts/latest` and return the most recent post.

### An Initial Attempt

The following handler is an initial attempt to implement this functionality:

```
@app.get("/po")
def get_latest_post():
    my_posts = []
    my_posts.append(post_dict)
    return {"my_posts": my_posts}
```

### Console Output for the Initial Attempt

```
INFO:     Started server process [3048]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     127.0.0.1:53457 - "GET /posts/asdfasdf HTTP/1.1" 200 OK
INFO:     127.0.0.1:53458 - "GET /posts/123123 HTTP/1.1" 200 OK
INFO:     127.0.0.1:53462 - "GET /posts/2 HTTP/1.1" 200 OK
```

## Evolving the Code

The code evolves to determine the latest post by subtracting one from the length of the posts list. In this version, the routes are defined as follows:

```
post_dict['id'] = randrange(0, 100000)
my_posts.append(post_dict)
return {"data": post_dict}


@app.get("/posts/{id}")
def get_post(id: int):
    post = find_post(id)
    print(post)
    return {"post_detail": post}


@app.get("/posts/latest")
def get_latest_post():
    my_posts[len(my_posts) - 1]
```

### Console Output Remains Similar

```
INFO:     Started server process [3048]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
127.0.0.1:53457 - "GET /posts/asdfsdf HTTP/1.1" 200 OK
127.0.0.1:53458 - "GET /posts/123123 HTTP/1.1" 200 OK
127.0.0.1:53462 - "GET /posts/2 HTTP/1.1" 200 OK
```

## Storing and Returning the Latest Post

After further modifications, the code tries to store the latest post in a variable and return it:

```
my_posts.append(post_dict)
return {'data': post_dict}


@app.get("/posts/{id}")
def get_post(id: int):
    post = find_post(id)
    print(post)
    return {'post_detail': post}


@app.get("/posts/latest")
def get_latest_post():
    my_posts[len(my_posts)-1]
    return {'detail': {}}
```

The logging output still remains the same:

```
INFO:     Started server process [3048]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
None
127.0.0.1:53457 - "GET /posts/asdfasdf HTTP/1.1" 200 OK
127.0.0.1:53458 - "GET /posts/123123 HTTP/1.1" 200 OK
127.0.0.1:53462 - "GET /posts/2 HTTP/1.1" 200 OK
```

## The Corrected Latest Post Route

A new test call is made by copying the URL from a previous request. The updated code now looks like this:

```
@app.get("/posts/{id}")
def get_post(id: int):
    post = find_post(id)
    print(post)
    return {"post_detail": post}


@app.get("/posts/latest")
def get_latest_post():
    post = my_posts[len(my_posts)-1]
    return {"detail": post}
```

### Console Output for the Updated Code

```
INFO:     127.0.0.1:53458 - "GET /posts/123123 HTTP/1.1" 200 OK
INFO:     127.0.0.1:53462 - "GET /posts/2 HTTP/1.1" 200 OK
WARNING: WatchGodReload detected file change in ['C:\\Users\\sanje\\Documents\\Courses\\fastapi\\main.py', 'C:\\Users\\sanje\\Documents\\Courses\\fastapi\\main.py.4d1dc43f362bd42d8b85c468f089fc.tmp'] - Reloading...
WARNING: WatchGodReload detected file change in ['C:\\Users\\sanje\\Documents\\Courses\\fastapi\\main.py', 'C:\\Users\\sanje\\Documents\\Courses\\fastapi\\main.py.4d1dc43f362bd42d8b85c468f089fc.tmp', 'C:\\Users\\sanje\\Documents\\Courses\\fastapi\\main.py'] - Reloading...
```

## The Route Conflict Issue

If you change the request URL to `/posts/latest`, you might see the following error response:

```
{
  "detail": [
    {
      "loc": [
        "path",
        "id"
      ],
      "msg": "value is not a valid integer",
      "type": "type_error.integer"
    }
  ]
}
```

> [!important]
> **Understanding the Error**
>
> This error occurs because FastAPI processes routes in the order they are defined. The route `/posts/{id}` appears before `/posts/latest`, causing the string "latest" to be interpreted as the integer parameter `id`. Since "latest" is not an integer, FastAPI throws a type validation error.

### Illustrative Route Definitions

Consider the following set of route definitions that illustrate the issue:

```
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


@app.get("/posts/latest")
def latest_post():
    # Intended to return the latest post
    post = my_posts[len(my_posts)-1]
    return {"detail": post}
```

In this configuration, the route `/posts/{id}` catches any requests to `/posts/...`, including `/posts/latest`, because "latest" fits the dynamic segment `{id}`. FastAPI attempts to convert "latest" to an integer, resulting in the error.

## Correcting the Route Order

To resolve this issue, ensure that the specific route (`/posts/latest`) is declared before the dynamic route (`/posts/{id}`). Here is the corrected ordering:

```
@app.post("/posts")
def create_posts(post: Post):
    post_dict = post.dict()
    post_dict['id'] = randrange(0, 100000)
    my_posts.append(post_dict)
    return {"data": post_dict}


@app.get("/posts/latest")
def get_latest_post():
    post = my_posts[len(my_posts)-1]
    return {"detail": post}


@app.get("/posts/{id}")
def get_post(id: int):
    post = find_post(id)
    print(post)
    return {"post_detail": post}
```

With this ordering, a GET request to `/posts/latest` is handled correctly by its dedicated endpoint, while requests for posts by integer ID are processed separately.

## Example Responses

When accessing a specific post by its ID, a successful response might look like this:

```
{
    "post_detail": {
        "title": "title of post 1",
        "content": "content of post 1",
        "id": 1
    }
}
```

For the latest post endpoint, a successful response might appear as follows:

```
{
  "detail": {
    "title": "favorite foods",
    "content": "I like pizza",
    "id": 2
  }
}
```

> [!important]
> **Key Takeaway**
>
> Remember that FastAPI evaluates routes in the order they are added. Always define fixed routes (e.g., `/posts/latest`) before dynamic ones (e.g., `/posts/{id}`) to prevent unintended matches and to avoid type validation errors.

For more information on FastAPI routing, check out the [FastAPI Documentation](https://fastapi.tiangolo.com/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/b1fa1425-07bf-49c6-b19d-ccded17d940d/lesson/f5656cd1-8318-4ad4-ae7c-ee728c91d141)**
>
> Watch video content
