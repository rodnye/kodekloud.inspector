# Fetch Post By Id Sql - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Databases-with-Python/Fetch-Post-By-Id-Sql)

---

## Table of Contents

- Fetch Post By Id Sql
  - Step 1: Basic GET and DELETE Endpoints
  - Step 2: Incorporating SQL Queries
  - Step 3: Filtering Posts by the Given ID
  - Step 4: Parameterizing the SQL Query
  - Step 5: Final Cleaned-Up Code
  - Additional Notes
  - Watch Video

---

## Content

Python API Development with FastAPI

Databases with Python

# Fetch Post By Id Sql

In this article, we demonstrate how to retrieve an individual post from a PostgreSQL database using FastAPI. We will build a secure GET endpoint that fetches a post by its ID using a parameterized SQL query, significantly reducing the risk of SQL injection attacks. Additionally, we briefly cover the DELETE endpoint for completeness.

Below is the step-by-step evolution of the implementation along with key points and code examples.

---

## Step 1: Basic GET and DELETE Endpoints

Initially, you define the endpoints for retrieving and deleting posts. Starting with a basic structure, the endpoints might look like this:

```
@app.get("/posts/{id}")
def get_post(id: int):
    post = find_post(id)
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"post with id: {id} was not found"
        )
    return {"post_detail": post}


@app.delete("/posts/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_post(id: int):
    # Endpoint to delete a post (implementation details omitted)
```

When executing the application, you may see console output similar to the following:

```
INFO:     Started server process [22040]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://127.0.0.1:62206 (Press CTRL+C to quit)
INFO:     127.0.0.1:62206 - "POST /posts HTTP/1.1" 201 Created
```

---

## Step 2: Incorporating SQL Queries

To fetch posts from the database, the cursor object is used to execute SQL queries. An initial approach might involve fetching all posts:

```
@app.get("/posts/{id}")
def get_post(id: int):
    cursor.execute("SELECT * FROM posts")
    post = find_post(id)
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"post with id: {id} was not found"
        )
    return {"post_detail": post}


@app.delete("/posts/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_post(id: int):
    # deletion logic here
```

> [!important]
> **Note**
>
> This approach retrieves all records from the posts table. Later, we will optimize the query to ensure that only the specified post is selected.

---

## Step 3: Filtering Posts by the Given ID

Instead of retrieving all posts, we update the SQL statement to fetch a single record that matches the provided ID. For testing purposes, you might initially hardcode the query with a known ID (for example, 1):

```
@app.get("/posts/{id}")
def get_post(id: int):
    cursor.execute("SELECT * FROM posts WHERE id = 1")
    cursor.fetchone()
    post = find_post(id)
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"post with id: {id} was not found"
        )
    return {"post_detail": post}


@app.delete("/posts/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_post(id: int):
```

After verifying the query using a direct SQL command like `SELECT * FROM posts;` in your database client, you can proceed to parameterize the query.

---

## Step 4: Parameterizing the SQL Query

To safeguard against SQL injection, replace the hardcoded ID with the provided path parameter through parameter substitution. Although the path parameter is already validated as an integer, it’s converted to a string for compatibility with the SQL driver. The `%s` placeholder is used in the SQL statement:

```
@app.get("/posts/{id}")
def get_post(id: int):
    cursor.execute("SELECT * FROM posts WHERE id = %s", (str(id),))
    test_post = cursor.fetchone()
    print(test_post)
    post = find_post(id)
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"post with id: {id} was not found"
        )
    return {"post_detail": post}
```

> [!important]
> **Warning**
>
> Be sure to include an extra comma in the tuple (i.e., `(str(id),)`) to prevent unexpected issues with parameter tuple assignment.

---

## Step 5: Final Cleaned-Up Code

After removing debugging statements and ensuring robust input validation, the final version of the GET endpoint is as follows. The DELETE endpoint is also updated for completeness:

```
@app.get("/posts/{id}")
def get_post(id: int):
    # Execute a parameterized SQL query to safely fetch the post by its ID.
    cursor.execute("SELECT * FROM posts WHERE id = %s", (str(id),))
    post = cursor.fetchone()
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"post with id: {id} was not found"
        )
    return {"post_detail": post}


@app.delete("/posts/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_post(id: int):
    # Find the index of the post in the internal list and remove it.
    index = find_index_post(id)
    if index is not None:
        my_posts.pop(index)
```

When the GET endpoint is called for an existing post (for example, with an ID of 1), the JSON response may appear as:

```
{
  "post_detail": {
    "id": 1,
    "title": "first post",
    "content": "some interesting stuff.",
    "published": true,
    "created_at": "2021-08-21T23:08:39.631328-04:00"
  }
}
```

In contrast, when a post is not found (for example, an ID of 5), the API returns an error response:

```
{
  "detail": "post with id: 5 was not found"
}
```

---

## Additional Notes

During development, you might encounter an error such as:

```
return await loop.run_in_executor(None, func, *args)
  File "C:\Users\sanje\AppData\Local\Programs\Python\Python39\lib\concurrent\futures\thread.py", line 52, in run
```

This error should resolve once the SQL query correctly uses parameter substitution. If issues persist with the parameter tuple, double-check for the extra comma, ensuring it is written as `(str(id),)`.

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/1c3ad280-5fee-4b8e-a891-42a61f9a2dd0/lesson/cb897d35-af84-4d34-8ecf-2adf47b33592)**
>
> Watch video content
