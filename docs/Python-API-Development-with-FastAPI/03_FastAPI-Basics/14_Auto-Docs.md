# Auto Docs - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/FastAPI-Basics/Auto-Docs)

---

## Table of Contents

- Auto Docs
  - Managing Posts with HTTP Methods
  - Example: Retrieving All Posts
  - Example: Creating a New Post
  - Dynamic Documentation Updates
  - Additional Resources
  - Watch Video

---

## Content

Python API Development with FastAPI

FastAPI Basics

# Auto Docs

FastAPI is renowned for its built-in support for automatic API documentation. This feature enables developers to effortlessly generate interactive documentation, which is critical for understanding and testing API endpoints. Instead of manually updating documentation for every change in your API, FastAPI handles this automatically.

When you build your API, simply navigate to `/docs` in your browser to access interactive documentation powered by Swagger UI. If you prefer a different interface, FastAPI also offers documentation via Redoc—allowing you to choose the interface that best suits your needs without any extra configuration.

> [!important]
> **Did You Know?**
>
> FastAPI automatically generates and updates documentation based on your path operations, ensuring that your documentation is always in sync with your API implementation.

## Managing Posts with HTTP Methods

The diagram below illustrates the HTTP methods available for managing posts:

![The image shows a FastAPI Swagger UI interface displaying various HTTP methods (GET, POST, PUT, DELETE) for managing posts, along with their respective endpoints.](https://kodekloud.com/kk-media/image/upload/v1752883433/notes-assets/images/Python-API-Development-with-FastAPI-Auto-Docs/fastapi-swagger-http-methods-posts.jpg)

Common operations include:

- Retrieving all posts
- Creating a new post
- Fetching an individual post
- Updating a specific post
- Deleting a post

Clicking on any of these endpoints provides detailed information, including example input data. You can use the "Try it out" button to execute queries directly against your API server. The result is displayed instantly within the interface, making it easy to verify functionality.

## Example: Retrieving All Posts

Below is a sample curl command to fetch all posts:

```
curl -X GET \
  http://127.0.0.1:8000/posts \
  -H 'accept: application/json'
```

The expected JSON response might look like this:

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

Additionally, the HTTP response headers may include:

```
Response headers
content-length: 134
content-type: application/json
date: Sat, 21 Aug 2021 23:52:07 GMT
server: uvicorn
```

## Example: Creating a New Post

When creating a new post, FastAPI provides an example schema for the required data structure:

```
{
  "title": "string",
  "content": "string",
  "published": true,
  "rating": 0
}
```

You can adjust this schema based on your requirements. For a more engaging post, your JSON payload might look like this:

```
{
  "title": "Treating new post with document",
  "content": "This is really cool.",
  "published": true,
  "rating": 0
}
```

After entering your JSON payload in the documentation interface, click "Execute" to send the request to your API. FastAPI also displays the equivalent curl command for each request, which is useful for command-line interactions.

Here’s how you can create a new post using curl:

```
curl -X 'POST' \
  'http://127.0.0.1:8000/posts' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "title": "creating new post with documents",
  "content": "this is really cool.",
  "published": true,
  "rating": 4
}'
```

The response confirms that the post was successfully created:

```
{
  "data": {
    "title": "creating new post with documents",
    "content": "this is really cool.",
    "published": true,
    "rating": 4,
    "id": 231802
  }
}
```

And the response headers may appear as follows:

```
content-length: 125
content-type: application/json
date: Sat, 21 Aug 2021 23:32:46 GMT
server: uvicorn
```

> [!important]
> **Interactive Testing**
>
> FastAPI's interactive documentation via Swagger UI or Redoc allows you to experiment with API endpoints without requiring external tools like Postman.

## Dynamic Documentation Updates

One of FastAPI’s major advantages is its dynamic documentation feature. Whenever you modify your API—such as adding a new field to your data models—the documentation is automatically updated to reflect these changes. This dynamic synchronization ensures that your API users always have access to the most current API specifications, significantly reducing the risk of outdated documentation.

Explore FastAPI's automatic documentation feature to streamline the process of API testing and validation. Happy coding!

## Additional Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Swagger UI](https://swagger.io/tools/swagger-ui/)
- [Redoc](https://github.com/Redocly/redoc)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/b1fa1425-07bf-49c6-b19d-ccded17d940d/lesson/c66aba83-bf8a-415b-86ab-5de77f1c73d3)**
>
> Watch video content
