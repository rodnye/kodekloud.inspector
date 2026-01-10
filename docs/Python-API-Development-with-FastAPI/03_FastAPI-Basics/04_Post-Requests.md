# Post Requests - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/FastAPI-Basics/Post-Requests)

---

## Table of Contents

- Post Requests
  - Understanding GET vs POST Requests
  - Creating a POST Path Operation
  - Testing POST Requests with Postman
  - Sending Data in the Body of a POST Request
  - Extracting the Request Body in FastAPI
  - Returning a Response with Posted Data
  - Recap
  - Watch Video

---

## Content

Python API Development with FastAPI

FastAPI Basics

# Post Requests

In previous sections, we focused on handling GET requests. All our API interactions involved retrieving data from the server. In this guide, we'll explore POST requests, which are used to send data to the server for processing.

Below, you can find a simple example of our existing GET request configuration:

```
@app.get("/")
def root():
    return {"message": "Hello World"}


@app.get("/posts")
def get_posts():
    return {"data": "This is your posts"}
```

When you run your FastAPI application, the console output will look similar to this:

```
INFO:     Waiting for application shutdown.
INFO:     Application shutdown complete.
INFO:     Finished server process [26220]
INFO:     Stopping reloader process [17852]
(venv) C:\Users\sanje\Documents\Courses\fastapi>uvicorn main:app --reload
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [22656] using watchgod
INFO:     Started server process [17080]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     127.0.0.1:51249 - "GET / HTTP/1.1" 200 OK
INFO:     127.0.0.1:63457 - "GET /posts HTTP/1.1" 200 OK
```

## Understanding GET vs POST Requests

The main difference between GET and POST requests lies in how data is transmitted between the client and server:

- **GET Requests**  
  GET requests retrieve data from the API server. For example, when a user wants to fetch posts, a GET request is sent and the server returns the requested information.
- **POST Requests**  
  POST requests allow the client to send data to the server. This method is commonly used for creating new resources. For instance, if you want to add a new social media post, you would send an HTTP POST request containing details such as the title, content, and author. The server processes this data, stores it if necessary, and responds with a confirmation or the details of the newly created resource.

Imagine your device—a web browser or mobile app—as the client. In a GET request, the client asks for data, whereas in a POST request, the client submits data for the server to handle.

> [!important]
> **Note**
>
> While the demonstration URL "/createposts" is used here for clarity, best practices recommend using a resource-oriented endpoint name.

## Creating a POST Path Operation

Let’s extend our code to include a POST endpoint that creates posts by altering the HTTP method from GET to POST:

```
@app.get("/")
def root():
    return {"message": "Hello World"}


@app.get("/posts")
def get_posts():
    return {"data": "This is your posts"}


@app.post("/createposts")
def create_posts():
    return {"message": "succesfully creat"}
```

After saving the changes and restarting the server, your console output should display similar log messages:

```
INFO:     Waiting for application shutdown.
INFO:     Application shutdown complete.
INFO:     Finished server process [26220]
INFO:     Stopping reloader process [17852]
(venv) C:\Users\sanje\Documents\Courses\fastapi>uvicorn main:app --reload
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [22656]
INFO:     Started server process [17080]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
127.0.0.1:51249 - "GET / HTTP/1.1" 200 OK
127.0.0.1:63457 - "GET /posts HTTP/1.1" 200 OK
```

## Testing POST Requests with Postman

To test your new POST endpoint, follow these steps using Postman:

1.  Open Postman and change the request method to POST.
2.  Update the URL to "http://127.0.0.1:8000/createposts".
3.  Configure the request body with JSON data. For example, set the body to:

    ```
    {
      "data": "This is your post"
    }
    ```

4.  Click on "Send" to submit your request. The API should respond with:

    ```
    {
      "message": "succesfully creat"
    }
    ```

You can also save multiple GET and POST requests within Postman. This allows you to quickly verify that all endpoints are operating correctly.

![The image shows a Postman interface within Visual Studio Code, displaying an HTTP request to a local server with various HTTP methods available in a dropdown menu.](https://kodekloud.com/kk-media/image/upload/v1752883445/notes-assets/images/Python-API-Development-with-FastAPI-Post-Requests/postman-vscode-http-request-dropdown.jpg)

Next, explore the full configuration options in Postman by examining the parameters, headers, and body setup options.

![The image shows a Postman interface within Visual Studio Code, displaying a POST request setup to "http://127.0.0.1:8000/createposts" with options for parameters, authorization, headers, and body. The left sidebar includes options for collections, APIs, environments, and more.](https://kodekloud.com/kk-media/image/upload/v1752883446/notes-assets/images/Python-API-Development-with-FastAPI-Post-Requests/postman-vscode-post-request-setup.jpg)

## Sending Data in the Body of a POST Request

The key function of a POST request is to transmit data to the API server. In Postman, switch to the "Body" tab, select "raw", and choose "JSON" as the format. JSON objects are structured similarly to Python dictionaries, using key-value pairs within curly braces. For example:

```
{
  "title": "top beaches in florida"
}
```

You may also include additional fields:

```
{
  "title": "top beaches in florida",
  "content": "check out these awesome beaches"
}
```

## Extracting the Request Body in FastAPI

To handle incoming JSON data in FastAPI, you can use the Body function from FastAPI to parse the request payload into a Python dictionary. First, import Body:

```
from fastapi import FastAPI
from fastapi.params import Body


app = FastAPI()


@app.get("/")
def root():
    return {"message": "Hello World"}
```

Next, update the POST endpoint to extract the payload:

```
@app.get("/posts")
def get_posts():
    return {"data": "This is your posts"}


@app.post("/createposts")
def create_posts(payload: dict = Body(...)):
    print(payload)
    return {"message": "succesfully created posts"}
```

When a POST request is made, the payload (for example, `{'title': 'top beaches in florida', 'content': 'check out these awesome beaches'}`) is printed to the console.

## Returning a Response with Posted Data

Often, it's helpful to echo back the data that was sent in the request. Here’s how you can modify your POST endpoint to return the new post details:

```
@app.get("/posts")
def get_posts():
    return {"data": "This is your posts"}


@app.post("/createposts")
def create_posts(payload: dict = Body(...)):
    print(payload)
    return {
        "new_post": f"title: {payload['title']} content: {payload['content']}"
    }
```

After sending a request with this JSON body:

```
{
    "title": "top beaches in florida",
    "content": "check out these awesome beaches"
}
```

The response from the API will be:

```
{
  "new_post": "title: top beaches in florida content: check out these awesome beaches"
}
```

## Recap

- We imported Body from FastAPI to handle incoming JSON data.
- The payload from POST requests is parsed into a Python dictionary.
- The server prints and returns values extracted from the payload, simulating how data would be handled or stored in a real-world application.

> [!important]
> **Note**
>
> In production applications, the data received via POST requests would typically be validated and stored in a database.

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/b1fa1425-07bf-49c6-b19d-ccded17d940d/lesson/8a4b3163-e512-41f2-b037-c0c5176aee47)**
>
> Watch video content
