# Initialize Fastapi Projects - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/FastAPI-Basics/Initialize-Fastapi-Projects)

---

## Table of Contents

- Initialize Fastapi Projects
  - Installing FastAPI and Optional Dependencies
  - Creating a Basic FastAPI Application
  - Running the Server
  - Summary
  - Watch Video

---

## Content

Python API Development with FastAPI

FastAPI Basics

# Initialize Fastapi Projects

In this article, you'll learn how to set up a FastAPI project and run a simple web server. For a complete understanding, it's recommended to review the [FastAPI documentation](https://fastapi.tiangolo.com/) and its introductory tutorial before you begin.

## Installing FastAPI and Optional Dependencies

FastAPI can be easily installed via pip. It is recommended to install FastAPI with all its optional dependencies as they can be very useful when your project scales. Run the following command to install:

```
$ pip install fastapi[all]
```

During the installation process, you'll notice several additional packages being installed. For instance, you might see output similar to:

```
Collecting python-dotenv>=0.13
  Downloading python_dotenv-0.19.0-py2.py3-none-any.whl (17 kB)
Using legacy 'setup.py install' for promise, since package 'wheel' is not installed.
Using legacy 'setup.py install' for python-multipart, since package 'wheel' is not installed.
Using legacy 'setup.py install' for websockets, since package 'wheel' is not installed.
Installing collected packages: six, rx, promise, typing-extensions, h11, graphql-core, click, websockets, watchgod, uvicorn, urllib3, ujson, requests, python-multipart, orjson, jinja2, itsdangerous, graphene, fastapi, email-validator, async-generator, async-exit-stack, PyYAML, ...
```

After installation, if you run `pip freeze`, you'll see FastAPI along with its bundled optional dependencies, which may include GraphQL support, websockets, and more:

```
(venv) C:\Users\sanje\Documents\Courses\fastapi>pip freeze
aiofiles==0.5.0
async-exit-stack==1.0.1
async-generator==1.10
certifi==2021.5.30
charset-normalizer==2.0.4
click==7.1.2
colorama==0.4.4
dnspython==2.1.0
email-validator==1.1.3
...
```

> [!important]
> **Inspecting Packages**
>
> If you're curious about the package code, you can find all installed packages within the `lib` folder of your virtual environment.

## Creating a Basic FastAPI Application

After installing FastAPI, create a new Python file (e.g., `main.py`). In this file, import FastAPI and instantiate an application object named `app` following the documentation conventions:

```
from fastapi import FastAPI


app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}
```

The above code defines a basic path operation at the root URL (`/`) that returns a JSON response with a message saying "Hello World". Remember to save your file after making changes. If your editor prompts you regarding auto-formatting (for instance, PEP8 compliance), it's good practice to allow the change.

## Running the Server

Once your FastAPI application is ready, you can start the server using Uvicorn. Since you've installed FastAPI with the `[all]` flag, Uvicorn is already available. Activate your virtual environment and run:

```
$ uvicorn main:app --reload
```

This command runs the server with the following parameters:

- `main`: The name of your Python file (without the `.py` extension).
- `app`: The FastAPI instance to be served.
- `--reload`: Automatically reloads the server when code changes are detected.

You should see output similar to this:

```
INFO:     Started server process [5480]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
```

Open your web browser and visit [http://127.0.0.1:8000](http://127.0.0.1:8000) to see a JSON response:

```
{"message": "Hello World"}
```

Additionally, your terminal will log incoming requests:

```
127.0.0.1:59199 - "GET / HTTP/1.1" 200 OK
127.0.0.1:59199 - "GET /favicon.ico HTTP/1.1" 404 Not Found
```

This confirms that your FastAPI application is functioning correctly.

## Summary

In this lesson, you learned to:

1.  Install FastAPI along with optional dependencies using the `[all]` flag.
2.  Create a basic FastAPI application that provides a "Hello World" JSON response.
3.  Run the FastAPI server with Uvicorn and observe its output.

> [!important]
> **Next Steps**
>
> In the next section, we will explore each component of the code in more detail to understand the underlying functionality better.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/b1fa1425-07bf-49c6-b19d-ccded17d940d/lesson/dd2bd926-02d8-45e5-939f-e32395e75f80)**
>
> Watch video content
