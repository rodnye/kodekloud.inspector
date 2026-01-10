# Schema Validation Pydantic - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/FastAPI-Basics/Schema-Validation-Pydantic)

---

## Table of Contents

- Schema Validation Pydantic
  - Watch Video

---

## Content

Python API Development with FastAPI

FastAPI Basics

# Schema Validation Pydantic

In this lesson, you'll learn how to enforce a strict data schema for your API endpoints using FastAPI and Pydantic. When clients send POST requests, they might include arbitrary data in the request body. Manually extracting and validating each value not only makes your code error‐prone but also less secure. By defining an API schema as a contract between the front end and back end, FastAPI—using the power of Pydantic—automatically validates that incoming data meets your specifications.

Below, we demonstrate how to define and enforce a schema to ensure that the client sends exactly what is expected (for example, a “title” and “content” for a post, along with optional fields like “published” or “rating”).

───────────────────────────── Using a Basic Example Without Pydantic ─────────────────────────────

Initially, your code might look similar to this, where the POST endpoint accepts a dictionary payload and manually extracts values:

```
from fastapi import FastAPI, Body


app = FastAPI()


@app.get("/posts")
def get_posts():
    return {"data": "This is your posts"}


@app.post("/createposts")
def create_posts(payload: dict = Body(...)):
    print(payload)
    return {
        "new_post": f"title {payload['title']} content: {payload['content']}"
    }
```

While the server logs confirm that requests are processed as expected, this approach accepts arbitrary data without any validation.

───────────────────────────── Introducing Pydantic for Schema Validation ─────────────────────────────

FastAPI leverages the Pydantic library—which comes bundled with FastAPI—to define models that represent the expected data schema. Although Pydantic is a standalone library that can work with any Python application, FastAPI utilizes it to automatically validate request data.

For example, you can define a Pydantic model for a post like so:

```
from fastapi import FastAPI, Body
from pydantic import BaseModel


app = FastAPI()


class Post(BaseModel):
    title: str
    content: str


@app.get("/")
def root():
    return {"message": "Hello World"}
```

With this model in place, you simply update your POST endpoint to reference the model:

```
@app.post("/createposts")
def create_posts(new_post: Post):
    print(new_post)
    return {"data": "new post"}
```

FastAPI automatically checks that the incoming JSON has a string value for both the "title" and "content". For instance, sending the following JSON:

```
{
  "title": "top beaches in florida",
  "content": "check out these awesome beaches"
}
```

returns a successful response. However, if a field is missing or the data type is incorrect, FastAPI responds with a 422 Unprocessable Entity error.

───────────────────────────── Enhancing the Schema with Additional Fields and Default Values ─────────────────────────────

To enforce additional fields, such as whether a post is published (a Boolean) or an optional rating (an integer), simply update your Pydantic model as demonstrated below:

```
from typing import Optional
from fastapi import FastAPI, Body
from pydantic import BaseModel


app = FastAPI()


class Post(BaseModel):
    title: str
    content: str
    published: bool = True  # Defaults to True if not provided
    rating: Optional[int] = None  # Optional field


@app.get("/")
def root():
    return {"message": "Hello World"}
```

If a client sends a JSON payload without a "published" field, it automatically defaults to True; similarly, if "rating" is omitted, its value becomes None.

> [!important]
> **Validation Error Example**
>
> If the client sends a value that does not match the expected type (e.g., a non-integer for "rating"), FastAPI returns a validation error. For example, a request with an invalid "rating" field:
>
> ```
> {
> "title": "top beaches in florida",
> "content": "something something beaches",
> "rating": "Hello"
> }
> ```
>
> produces the following response:
>
> ```
> {
> "detail": {
> "loc": [{"body": "rating"}],
> "msg": "value is not a valid integer",
> "type": "type_error.integer"
> }
> }
> ```

───────────────────────────── Accessing Validated Data and Converting the Model to a Dictionary ─────────────────────────────

After FastAPI validates and assigns the incoming data to your Pydantic model (referred to as `new_post` in the example), you can access its properties using dot notation (e.g., `new_post.title`). Additionally, each Pydantic model includes a `.dict()` method that converts the model into a standard Python dictionary.

Consider the following example:

```
@app.post("/createposts")
def create_posts(new_post: Post):
    print(new_post)          # e.g., Post(title='top beaches in florida', content='something something beaches', published=True, rating=4)
    print(new_post.dict())   # Dictionary representation of the Pydantic model
    return {"data": new_post.dict()}
```

You can test this by sending a JSON payload such as:

```
{
  "title": "top beaches in florida",
  "content": "something something beaches",
  "rating": 4
}
```

The endpoint prints both the Pydantic model and its dictionary representation, returning the validated post data as a JSON response.

───────────────────────────── Conclusion ─────────────────────────────

Using Pydantic models with FastAPI allows you to enforce strict API schemas, ensuring that the client-sent data (and the data returned) exactly conforms to the expected format. This automatic data validation makes your application more robust, maintainable, and secure while eliminating the need for manual data checks.

In this lesson, we covered:

- Replacing manual extraction of payload data with a Pydantic model.
- Enforcing data types and default values for various fields.
- Handling optional fields using Python’s typing.Optional.
- Accessing validated data and converting the Pydantic model to a dictionary with the `.dict()` method.

Use these techniques to maintain data consistency and integrity in your API development.

For more information, explore additional resources:

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Pydantic Documentation](https://pydantic-docs.helpmanual.io/)
- [Python Type Hints](https://docs.python.org/3/library/typing.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/b1fa1425-07bf-49c6-b19d-ccded17d940d/lesson/daf8dc7f-a91c-42bf-a559-2ac631a5cd2d)**
>
> Watch video content
