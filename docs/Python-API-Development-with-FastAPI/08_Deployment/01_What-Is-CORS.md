# What Is CORS - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Deployment/What-Is-CORS)

---

## Table of Contents

- What Is CORS
  - Understanding CORS
  - Watch Video
    - Enabling CORS in FastAPI

---

## Content

Python API Development with FastAPI

Deployment

# What Is CORS

In this lesson, we explore Cross-Origin Resource Sharing (CORS) and its significance in modern API development. CORS is a crucial mechanism that allows applications to overcome the restrictions imposed by web browsers when requesting resources from a different domain than the one serving the web page. Throughout this lesson, we use Postman—a robust API testing tool—to demonstrate API interactions. It's important to understand that while Postman sends requests directly from your computer, your API may also receive requests from other sources such as servers, mobile devices, or web browsers.

For instance, if you test your API using Postman, it might return a response such as:

```
{
  "Post": {
    "title": "something something beaches, hello",
    "content": "something something beaches",
    "published": true,
    "id": 1,
    "created_at": "2021-08-29T23:47:46.533146-04:00",
    "owner_id": 1,
    "owner": {
      "id": 1,
      "email": "sanjeev123@gmail.com",
      "created_at": "2021-08-29T23:47:37.610675-04:00"
    }
  },
  "votes": 0
}
```

Similar requests could be made using tools such as cURL or from mobile devices. However, when a request is made via a web browser using JavaScript's Fetch API, the behavior differs. Consider the following JSON payload sent from the browser:

```
{
  "post": {
    "title": "something something beaches hello",
    "content": "something_something_beaches",
    "published": true,
    "id": 1,
    "created_at": "2021-08-29T23:47:46.533146-04:00",
    "owner_id": 1,
    "owner": {
      "id": 1,
      "email": "sanjeev123@gmail.com",
      "created_at": "2021-08-29T23:47:37.610275-04:00"
    }
  },
  "votes": 0
}
```

When the Fetch API is used, the browser enforces CORS policies. For example, a simple JavaScript snippet in the browser console may look like this:

```
fetch('http://localhost:8000/')
```

To properly handle the returned promise and display the output, you can extend the snippet as follows:

```
fetch('http://localhost:8000/')
  .then(res => res.json())
  .then(console.log);
```

If you run this snippet while on a website like google.com, you might encounter an error similar to:

```
Access to fetch at 'http://localhost:8000/' from origin 'https://www.google.com' has been blocked by CORS policy.
```

> [!important]
> **CORS Policy Warning**
>
> This error indicates that your browser is preventing the request because your API only accepts requests from the same origin. If your API is hosted on google.com, a request from ebay.com will be blocked.

When accessing your API directly on its domain (for example, by navigating to `http://localhost:8000` in your browser), the API responds successfully:

```
{"message": "Hello World"}
```

This confirms that accessing your API from the same domain bypasses CORS restrictions.

Below is an example of a simple FastAPI application without CORS handling:

```
from fastapi import FastAPI


app = FastAPI()


@app.get("/")
def root():
    return {"message": "Hello World"}
```

A sample console output when using Uvicorn might be:

```
INFO:     Started server process [22164]
INFO:     Waiting for application startup...
INFO:     Application startup complete.
INFO:     Uvicorn running on http://127.0.0.1:60904 (Press CTRL+C to quit)
INFO:     127.0.0.1:60904 - "GET / HTTP/1.1" 200 OK
INFO:     127.0.0.1:57060 - "GET /favicon.ico HTTP/1.1" 404 Not Found
INFO:     127.0.0.1:53500 - "GET / HTTP/1.1" 200 OK
```

## Understanding CORS

CORS (Cross-Origin Resource Sharing) enables web browsers to request resources from a server on a different domain, which is not allowed by default. Most web frameworks, including FastAPI, accept requests only from the same domain hosting the API.

Imagine your API is hosted on google.com while your web application is on ebay.com. In this scenario, ebay.com would be prevented from communicating with the API on google.com unless CORS is properly configured. Conversely, when both the website and the API are hosted on the same domain, communication happens seamlessly.

![The image explains Cross-Origin Resource Sharing (CORS), highlighting that it allows requests from a web browser on one domain to a server on a different domain, with a diagram showing a blocked request from ebay.com to an API on google.com.](https://kodekloud.com/kk-media/image/upload/v1752883431/notes-assets/images/Python-API-Development-with-FastAPI-What-Is-CORS/cors-cross-origin-resource-sharing-diagram.jpg)

When testing on `localhost:8000`—the same domain used by your web browser—the API logs a proper response in the developer tools console.

### Enabling CORS in FastAPI

To handle requests from different origins, you can enable CORS in your FastAPI application using its middleware. The FastAPI documentation provides clear guidance on configuring CORS. Below is an example of setting up CORS middleware:

```
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()


origins = [
    "http://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8888"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def read_main():
    return {"message": "Hello World"}
```

In this setup, the middleware allows requests from a pre-defined list of origins. This middleware function intercepts each request, ensuring that only the specified origins are permitted.

If your API includes multiple routers, you can integrate CORS middleware like this:

```
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import post, user, auth, vote  # assuming these are defined in your project


app = FastAPI()


origins = []  # Initially empty; later populate it with allowed domains


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(post.router)
app.include_router(user.router)
app.include_router(auth.router)
app.include_router(vote.router)
```

You can modify the list of allowed origins based on your application's requirements. For instance, to restrict access only to Google:

```
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import post, user


app = FastAPI()


origins = ["https://www.google.com"]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(post.router)
app.include_router(user.router)
```

If a request is made from a domain not specified in the allowed origins list (like youtube.com), the browser will block the request and log a CORS error in the console:

```
fetch('http://localhost:8000/')
  .then(res => res.json())
  .then(console.log);


Access to fetch at 'http://localhost:8000/' from origin 'https://www.youtube.com' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

For public APIs where unrestricted access is desired, you can use a wildcard ("\*") to allow requests from any domain:

```
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()


origins = ["*"]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def read_main():
    return {"message": "Hello World"}
```

> [!important]
> **Security Best Practices**
>
> Although using a wildcard ("\*") makes your API accessible from all domains, it is advisable to restrict origins to specific domains when deploying to production to ensure enhanced security.

Below is an example of a complete FastAPI setup using the wildcard configuration:

```
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import post, user, auth, vote  # adjust import paths as necessary


app = FastAPI()


origins = ["*"]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


app.include_router(post.router)
app.include_router(user.router)
app.include_router(auth.router)
app.include_router(vote.router)
```

When running your application with Uvicorn, you might see console output similar to:

```
INFO:     Started server process [30400]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://127.0.0.1:5167 (Press CTRL+C to quit)
INFO:     127.0.0.1:51038 - "GET / HTTP/1.1" 200 OK
```

This configuration simplifies testing by permitting requests from any domain. However, when deploying your API, ensure that you update the allowed origins to maintain a secure environment.

In summary, CORS is essential for controlling which domains are permitted to access your API. By configuring CORS middleware in FastAPI, you can balance accessibility and security for both development and production environments.

![The image shows a webpage from the FastAPI documentation discussing CORS (Cross-Origin Resource Sharing), including sections on origin, steps, and related topics.](https://kodekloud.com/kk-media/image/upload/v1752883433/notes-assets/images/Python-API-Development-with-FastAPI-What-Is-CORS/fastapi-cors-documentation-webpage.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/1af49f64-16e1-4559-841f-4b684c6a8f15/lesson/3635d588-8029-4552-b0e2-af9baa73d9e0)**
>
> Watch video content
