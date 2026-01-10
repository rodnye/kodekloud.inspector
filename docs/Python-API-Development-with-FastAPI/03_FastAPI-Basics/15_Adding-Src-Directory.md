# Adding Src Directory - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/FastAPI-Basics/Adding-Src-Directory)

---

## Table of Contents

- Adding Src Directory
  - FastAPI Endpoint for Updating a Post
  - Sample Console Output
  - Restructuring the Project
  - Updating the Startup Command
  - Main File Code Snippet
  - Running the Application
  - Verifying the Endpoint
  - Watch Video

---

## Content

Python API Development with FastAPI

FastAPI Basics

# Adding Src Directory

In this lesson, we will adjust the project structure to improve code organization by moving the main file into a dedicated folder named "app". This change groups all application-specific code in one place and simplifies package management.

## FastAPI Endpoint for Updating a Post

Below is an example of a FastAPI endpoint for updating a post. Notice that this code sample is presented only once for clarity:

```
@app.put("/posts/{id}")
def update_post(id: int, post: Post):
    index = find_index_post(id)


    if index is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Post with id: {id} does not exist"
        )


    post_dict = post.dict()
    post_dict['id'] = id
    my_posts[index] = post_dict
    return {"data": post_dict}
```

## Sample Console Output

The following snippet shows a sample of the console output you may see when making requests to the API:

```
INFO:     127.0.0.1:63024 - "GET /posts HTTP/1.1" 200 OK
INFO:     127.0.0.1:60784 - "PUT /posts HTTP/1.1" 200 OK
INFO:     127.0.0.1:60785 - "GET /posts HTTP/1.1" 200 OK
```

## Restructuring the Project

We are now creating a new folder named **app** to store our main application file. In Python, a folder can be used as a package if it contains an `__init__.py` file.

> [!important]
> **Note**
>
> Even though the `__init__.py` file can be empty, its presence is essential as it signals to Python that the folder should be treated as a package.

After creating the **app** folder and adding an `__init__.py` file inside it, move the main file into the **app** directory. At this point, you'll encounter an error because the startup command is still referencing the main file from the base directory.

## Updating the Startup Command

Previously, the application was launched using a command similar to:

```
(venv) C:\Users\sanje\Documents\Courses\fastapi>uvicorn main:app --reload
```

In this command, **main** referred to the file in the project’s base directory. Now that the main file has been moved into the **app** package, the startup command must be updated to indicate the new package location:

```
(venv) C:\Users\sanje\Documents\Courses\fastapi>uvicorn app.main:app --reload
```

This updated command directs Uvicorn to search for the file named **main** within the **app** folder and then use the FastAPI instance (named **app**) defined therein.

## Main File Code Snippet

Below is a snippet from the main file for clarity:

```
from typing import Optional
from fastapi import FastAPI, Response, status, HTTPException
from fastapi.params import Body
from pydantic import BaseModel
from random import randrange


app = FastAPI()
```

## Running the Application

After starting the application with the updated command, you might see output similar to the following:

```
(venv) C:\Users\sanje\Documents\Courses\fastapi>uvicorn app.main:app --reload
INFO: Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO: Started reloader process [21236] using watchgod
INFO: Started server process [4760]
INFO: Waiting for application startup.
INFO: Application startup complete.
127.0.0.1:50834 - "GET /posts/1 HTTP/1.1" 200 OK
```

## Verifying the Endpoint

Finally, test the endpoint for retrieving an individual post. For example, a GET request to the endpoint might return a JSON response similar to this:

```
{
    "post_detail": {
        "title": "title of post 1",
        "content": "content of post 1",
        "id": 1
    }
}
```

Everything should now function as expected. This new structure will help keep your application code well-organized as you continue development.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/b1fa1425-07bf-49c6-b19d-ccded17d940d/lesson/596cd5ff-911e-42b0-b1bf-4382941d04c1)**
>
> Watch video content
