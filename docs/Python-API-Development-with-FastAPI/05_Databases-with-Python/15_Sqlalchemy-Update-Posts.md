# Sqlalchemy Update Posts - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Databases-with-Python/Sqlalchemy-Update-Posts)

---

## Table of Contents

- Sqlalchemy Update Posts
  - 1. Original PostgreSQL-based Update (for reference)
  - 2. Deleting a Post with SQLAlchemy
  - 3. Update Operation Using SQLAlchemy
  - 4. Complete Updated Endpoint
  - 5. Testing the Update
  - 6. Important Considerations
  - Watch Video
    - Step 3.1: Preparing the Query and Validating the Post
    - Step 3.2: Updating the Post
    - Step 3.3: Returning the Updated Post

---

## Content

Python API Development with FastAPI

Databases with Python

# Sqlalchemy Update Posts

In this guide, we will demonstrate how to update posts using SQLAlchemy in a FastAPI application. The update operation follows a familiar pattern similar to deleting or retrieving a post by its ID. We will cover how to query the database, validate that the post exists, perform the update, and return the updated result.

---

## 1\. Original PostgreSQL-based Update (for reference)

Initially, a raw PostgreSQL update query might have been used:

```
@app.put("/posts/{id}")
def update_post(id: int, post: Post):
    cursor.execute("""UPDATE posts SET title = %s, content = %s, published = %s WHERE id = %s
    RETURNING *""",
                   (post.title, post.content, post.published, str(id)))
    updated_post = cursor.fetchone()
    conn.commit()


    if updated_post is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"post with id: {id} does not exist")


    return {"data": updated_post}
```

```
INFO:     Application startup complete.
INFO:     127.0.0.1:53042 - "DELETE /posts/6 HTTP/1.1" 204 No Content
INFO:     127.0.0.1:60950 - "DELETE /posts/444 HTTP/1.1" 404 Not Found
```

---

## 2\. Deleting a Post with SQLAlchemy

Before diving into the update, it is useful to review the deletion process using SQLAlchemy. This example ensures that database dependency configurations are set up correctly:

```
@app.delete("/posts/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_post(id: int, db: Session = Depends(get_db)):
    post = db.query(models.Post).filter(models.Post.id == id)


    if post.first() is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"post with id: {id} does not exist")


    post.delete(synchronize_session=False)
    db.commit()
```

```
INFO:     127.0.0.1:53042 - "DELETE /posts/6 HTTP/1.1" 204 No Content
INFO:     127.0.0.1:60950 - "DELETE /posts/444 HTTP/1.1" 404 Not Found
```

---

## 3\. Update Operation Using SQLAlchemy

The update process with SQLAlchemy follows these steps:

- Query the database for the post with the given ID.
- Validate if the post exists.
- Update the post using the values provided in the request.
- Commit the changes and return the updated post.

> [!important]
> **Note**
>
> Be sure to handle naming collisions between the input schema and the SQLAlchemy model instance. In our example, we use the name `existing_post` for the fetched instance.

### Step 3.1: Preparing the Query and Validating the Post

```
@app.put("/posts/{id}")
def update_post(id: int, post: Post, db: Session = Depends(get_db)):
    # Query the database for the post matching the id
    post_query = db.query(models.Post).filter(models.Post.id == id)
    existing_post = post_query.first()

    if existing_post is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Post with id: {id} does not exist")
```

### Step 3.2: Updating the Post

You can either use hardcoded updated values or dynamically update with the incoming Pydantic model. Typically in production, you would use the provided data:

```
    # Update the post using the data from the request body
    post_query.update(post.dict(), synchronize_session=False)
    db.commit()
```

### Step 3.3: Returning the Updated Post

After committing the update, re-query the database for the latest data to return:

```
    updated_post = post_query.first()
    return {"data": updated_post}
```

---

## 4\. Complete Updated Endpoint

Below is the final consolidated code for the update endpoint:

```
@app.put("/posts/{id}")
def update_post(id: int, post: Post, db: Session = Depends(get_db)):
    # Query for the existing post by ID
    post_query = db.query(models.Post).filter(models.Post.id == id)
    existing_post = post_query.first()

    if existing_post is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Post with id: {id} does not exist")

    # Update the post using the dictionary from the Pydantic model
    post_query.update(post.dict(), synchronize_session=False)
    db.commit()

    # Retrieve and return the updated post
    updated_post = post_query.first()
    return {"data": updated_post}
```

---

## 5\. Testing the Update

To test the endpoint, send an update request with JSON data. For instance, using the following JSON payload:

```
{
    "title": "updated title",
    "content": "This is the new content"
}
```

The server logs might then reflect:

```
INFO:  Application startup complete.
INFO:  127.0.0.1:60884 - "PUT /posts/1 HTTP/1.1" 200 OK
```

You can verify that the post has been updated in your database by running a query such as:

```
select * from posts;
```

---

## 6\. Important Considerations

- Ensure that the dependency `db: Session = Depends(get_db)` is correctly configured in your application.
- Avoid naming conflicts between the input schema (`post`) and the SQLAlchemy model instance by using a distinct variable name (e.g., `existing_post`).
- Utilize the `post.dict()` method to convert the Pydantic model to a dictionary before applying the update with SQLAlchemy.
- The `synchronize_session=False` flag is applied for performance optimization during updates.

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/1c3ad280-5fee-4b8e-a891-42a61f9a2dd0/lesson/d40e0421-b3aa-455d-bf51-834692d08d10)**
>
> Watch video content
