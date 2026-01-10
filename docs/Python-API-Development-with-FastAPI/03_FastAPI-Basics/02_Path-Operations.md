# Path Operations - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/FastAPI-Basics/Path-Operations)

---

## Table of Contents

- Path Operations
  - Components of a Path Operation
  - Quick Recap on Path Operations
  - Creating a New Path Operation
  - Understanding HTTP Methods
  - Order of Path Operations
  - Final Example
  - Watch Video
    - Detailed Look at the Function
    - Understanding the Role of the Decorator
    - Modifying the Returned Message

---

## Content

Python API Development with FastAPI

FastAPI Basics

# Path Operations

In this lesson, we will break down the code used to define a Path Operation in FastAPI, explaining each key component. A Path Operation is how FastAPI handles endpoints, similar to routes in other web frameworks.

Below is a simple FastAPI application:

```
from fastapi import FastAPI


app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}
```

When you run this application using Uvicorn (for example, with the command `uvicorn main:app`), the console output might look like this:

```
WARNING: You are using pip version 21.1.1; however, version 21.2.4 is available.
You should consider upgrading via the 'c:\Users\sanje\Documents\Courses\fastapi\venv\Scripts\python.exe -m pip install --upgrade pip' command.
(venv) C:\Users\sanje\Documents\Courses\fastapi>uvicorn main:app
INFO:     Started server process [5480]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     127.0.0.1:59919 - "GET / HTTP/1.1" 200 OK
INFO:     127.0.0.1:59919 - "GET /favicon.ico HTTP/1.1" 404 Not Found
```

Each line in the console output provides details about server startup, the listening URL, and the requests that have been processed.

> [!important]
> **FastAPI Path Operations Reminder**
>
> FastAPI calls these endpoint definitions **Path Operations**. While similar frameworks might refer to them as routes, FastAPI consistently uses the term "Path Operation."

Below is the same code snippet again for clarity:

```
from fastapi import FastAPI


app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}
```

## Components of a Path Operation

A Path Operation in FastAPI is composed of two main parts:

1.  **The Function**  
    This is a typical Python function that contains the endpoint's logic. In the example above, the function returns a Python dictionary, which FastAPI automatically converts to JSON.
2.  **The Decorator**  
    The decorator (indicated by the `@` symbol) converts the function into a Path Operation. For instance, `@app.get("/")` designates the function to handle GET requests at the root URL.

### Detailed Look at the Function

Notice that the function is defined as an asynchronous function using the `async` keyword. Asynchronous functions are beneficial when performing tasks that may cause delays, such as API calls or database queries. If your function does not require asynchronous ability, you can define it as a regular function:

```
from fastapi import FastAPI


app = FastAPI()


@app.get("/")
def root():
    return {"message": "Hello World"}
```

It's a best practice to use descriptive function names. For example, if the endpoint is designed for user login, you could name it as follows:

```
from fastapi import FastAPI


app = FastAPI()


@app.get("/")
def login_user():
    return {"message": "Hello World"}
```

Remember that the function name does not affect API behavior; it only helps with code readability.

### Understanding the Role of the Decorator

The decorator designates the function as a Path Operation. It tells FastAPI which HTTP method (e.g., GET, POST, PUT, DELETE) to handle and what URL path to associate with the function. Here are a few examples:

- **Basic GET Endpoint:**

  ```
  from fastapi import FastAPI


  app = FastAPI()


  @app.get("/")
  def root():
      return {"message": "Hello World"}
  ```

- **Endpoint with a Specific Path:**

  ```
  from fastapi import FastAPI


  app = FastAPI()


  @app.get("/login")
  def login():
      return {"message": "Hello World"}
  ```

- **Endpoint for Voting on Posts:**

  ```
  from fastapi import FastAPI


  app = FastAPI()


  @app.get("/posts/vote")
  def vote_post():
      return {"message": "Hello World"}
  ```

### Modifying the Returned Message

You can easily change the response by modifying the returned data. For example, to update the message to "welcome to my api", you can modify the function as shown:

```
from fastapi import FastAPI


app = FastAPI()


@app.get("/")
def root():
    return {"message": "welcome to my api"}
```

> [!important]
> **Auto-Reload Reminder**
>
> When you update the code, ensure you restart the server or use Uvicorn's `--reload` flag to reflect the changes automatically. Running `uvicorn main:app --reload` is especially useful during development.

## Quick Recap on Path Operations

A Path Operation in FastAPI is defined by two elements:

- **The Decorator:**  
  It determines the HTTP method and URL path. For example:

  ```
  @app.get("/")
  ```

- **The Function:**  
  It contains the endpoint logic and returns data, as shown below:

  ```
  def root():
      return {"message": "Hello World"}
  ```

## Creating a New Path Operation

Let’s add an endpoint to retrieve social media posts. In a real-world scenario, this function would interact with a database to fetch posts. For demonstration purposes, it returns a static message:

```
from fastapi import FastAPI


app = FastAPI()


@app.get("/")
def root():
    return {"message": "Hello World"}


@app.get("/posts")
def get_posts():
    return {"data": "This is your posts"}
```

When you visit [http://127.0.0.1:8000/posts](http://127.0.0.1:8000/posts), the application responds with:

```
{"data": "This is your posts"}
```

## Understanding HTTP Methods

FastAPI supports various HTTP methods. The GET method is standard for data retrieval. For operations such as creating or updating data, you would typically use POST, PUT, or DELETE. For further details on these HTTP methods, you can refer to [Mozilla Developer Network (MDN)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods).

![The image shows a webpage from the Mozilla Developer Network (MDN) detailing HTTP request methods, including GET, POST, PUT, and DELETE, with descriptions of each method. The page also includes a table of contents and related topics on the left sidebar.](https://kodekloud.com/kk-media/image/upload/v1752883442/notes-assets/images/Python-API-Development-with-FastAPI-Path-Operations/mdn-http-request-methods.jpg)

For example, the HTTP POST method is normally used to submit data to a server for creating or updating a resource. This is in contrast to the GET method, which is used exclusively for data retrieval.

![The image shows a webpage from MDN Web Docs detailing the HTTP POST method, including its syntax, examples, and related topics. The page is part of a guide for developers on HTTP request methods.](https://kodekloud.com/kk-media/image/upload/v1752883443/notes-assets/images/Python-API-Development-with-FastAPI-Path-Operations/http-post-method-mdn-web-docs.jpg)

## Order of Path Operations

FastAPI processes Path Operations in the order they are defined in the code. It uses both the HTTP method and the URL path to match incoming requests. The first matching Path Operation is executed, which means that if you define multiple endpoints with the same path (e.g., two GET operations for `/`), only the first one is used:

```
@app.get("/")
def root():
    return {"message": "Hello World"}


@app.get("/")
def get_posts():
    return {"data": "This is your posts"}
```

In this case, a GET request to `/` will always return `{"message": "Hello World"}` because FastAPI stops after the first match. Changing the order would change the behavior of the API.

## Final Example

Below is a consolidated example of a FastAPI application that includes multiple Path Operations:

```
from fastapi import FastAPI


app = FastAPI()


@app.get("/")
def root():
    return {"message": "Hello World"}


@app.get("/posts")
def get_posts():
    return {"data": "This is your posts"}
```

Using the `--reload` flag in development allows FastAPI to detect code changes automatically, ensuring that the latest updates are always reflected.

In the next section of this lesson, we will review what constitutes a Path Operation and reinforce the concepts covered so far. Remember, your API is simply a collection of Path Operations—each defined by an HTTP method, a URL path, and the function logic behind it.

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/b1fa1425-07bf-49c6-b19d-ccded17d940d/lesson/113eeddd-9161-408a-8f81-641b04783824)**
>
> Watch video content
