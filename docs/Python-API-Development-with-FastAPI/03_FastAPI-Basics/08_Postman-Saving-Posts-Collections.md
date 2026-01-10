# Postman Saving Posts Collections - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/FastAPI-Basics/Postman-Saving-Posts-Collections)

---

## Table of Contents

- Postman Saving Posts Collections
  - Step 1: Create a New Collection
  - Step 2: Save a GET Request
  - Step 3: Save a POST Request
  - Watch Video

---

## Content

Python API Development with FastAPI

FastAPI Basics

# Postman Saving Posts Collections

Before writing any further code, it's essential to save your HTTP requests. While Postman temporarily retains requests in memory, storing them in a collection ensures they persist between sessions—even after you close the application.

> [!important]
> **Tip**
>
> Saving your requests in a collection not only prevents data loss but also makes it easier to organize and reuse endpoints for future tests.

## Step 1: Create a New Collection

Begin by creating a collection:

1.  Select **"Create Collection"**.
2.  Name your collection according to your project. For example, you can name it "[Python API Development with FastAPI](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi)" or choose any name that fits your social media app project.
3.  Save the newly created collection.

## Step 2: Save a GET Request

Now, save a GET request to preserve it in your collection:

1.  Prepare your GET request.
2.  Click **"Save"**, then choose **"Save As"** to store the request in your new collection.
3.  Name this request **"GET posts"**.

After saving, your collection might return a response similar to the following JSON:

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

## Step 3: Save a POST Request

Similarly, save your POST request for creating posts:

1.  Set up the POST request.
2.  Click **"Save As"** and name the request **"Create post"**.
3.  Ensure that the request is saved within your collection. If it is not automatically associated with the most recent collection, manually select it from the collection list.

After successfully saving, even if you close Postman, you can easily retrieve these saved requests. Postman will remember all details, including fields in the request body for a POST request. For example, consider this sample response from a POST request:

```
{
  "data": {
    "title": "top beaches in florida",
    "content": "something something beaches",
    "published": true,
    "rating": 4,
    "id": 227019
  }
}
```

> [!important]
> **Key Information**
>
> Postman is a powerful tool for API development. Saving your requests in a collection not only helps manage your endpoints effectively but also streamlines your overall API development workflow.

As you progress through your API development journey, continue exploring Postman's robust features and techniques to enhance your productivity and maintain organized code samples.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/b1fa1425-07bf-49c6-b19d-ccded17d940d/lesson/338e2b52-7ff3-479b-b605-9ba586168985)**
>
> Watch video content
