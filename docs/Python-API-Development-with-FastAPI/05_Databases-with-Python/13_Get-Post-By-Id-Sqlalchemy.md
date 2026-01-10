# Get Post By Id Sqlalchemy - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Databases-with-Python/Get-Post-By-Id-Sqlalchemy)

---

## Table of Contents

- Get Post By Id Sqlalchemy
  - Creating a New Post
  - Legacy Raw SQL Endpoints
  - Migrating to SQLAlchemy
  - Sample Successful Response
  - Error Handling Example
  - Watch Video
    - Updated GET Endpoint with SQLAlchemy
    - Updating the Create Post Endpoint
    - Refining the SQLAlchemy Query for a Specific Post

---

## Content

Python API Development with FastAPI

Databases with Python

# Get Post By Id Sqlalchemy

In this article, we will explore how to query an individual post by its unique ID using SQLAlchemy. We transition from using raw SQL queries to leveraging SQLAlchemy’s ORM for improved abstraction, efficiency, and maintainability in database operations.

## Creating a New Post

Below is an example that demonstrates creating a new post using the Post model and then returning it:

```
new_post = models.Post(**post.dict())
db.add(new_post)
db.commit()
db.refresh(new_post)


return {"data": new_post}
```

## Legacy Raw SQL Endpoints

Previously, a GET endpoint for retrieving a single post was implemented using raw SQL as shown below:

```
@app.get("/posts/{id}")
def get_post(id: str):
    cursor.execute("""SELECT * from posts WHERE id = %s """, (str(id),))
    post = cursor.fetchone()
    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"post with id: {id} was not found")
    return {"post_detail": post}
```

Similarly, an endpoint to delete a post was defined as:

```
@app.delete("/posts/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_post(id: int):
    cursor.execute(
```

## Migrating to SQLAlchemy

We will now replace these raw SQL operations with SQLAlchemy ORM queries. First, it is crucial to ensure that the database dependency is correctly injected into the function and that the post ID is passed as an integer.

### Updated GET Endpoint with SQLAlchemy

Below is the modified GET endpoint using SQLAlchemy. Notice that the original raw SQL statements are retained as comments for reference:

```
@app.get("/posts/{id}")
def get_post(id: int, db: Session = Depends(get_db)):
    # cursor.execute("""SELECT * from posts WHERE id = %s """, (str(id),))
    # post = cursor.fetchone()

    # Query the Post model filtering for the matching id.
    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"post with id: {id} was not found")
    return {"post_detail": post}
```

### Updating the Create Post Endpoint

In the creation endpoint, after showing the legacy raw SQL usage as a comment, we first commit the connection and then create a new post using the Post model:

```
def create_posts(post: Post, db: Session = Depends(get_db)):
    # cursor.execute("""INSERT INTO posts (title, content, published) VALUES (%s, %s, %s)""",
    # (post.title, post.content, post.published))
    # new_post = cursor.fetchone()

    conn.commit()

    new_post = models.Post(**post.dict())
    db.add(new_post)
    db.commit()
    db.refresh(new_post)


    return {"data": new_post}
```

### Refining the SQLAlchemy Query for a Specific Post

When querying for a specific post, the goal is to mimic filtering by the post ID (i.e., the WHERE clause). Initially, the code was structured like this:

```
@app.get("/posts/{id}")
def get_post(id: int, db: Session = Depends(get_db)):
    # cursor.execute("""SELECT * from posts WHERE id = %s """, (str(id),))
    db.query


    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"post with id: {id} was not found")
```

To clarify the process, we first assign the query result to a variable and print it for debugging:

```
@app.get("/posts/{id}")
def get_post(id: int, db: Session = Depends(get_db)):
    # cursor.execute("""SELECT * from posts WHERE id = %s """, (str(id),))
    post = db.query(models.Post).filter(models.Post.id == id)
    print(post)


    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"post with id: {id} was not found")

    return {"post_detail": post}
```

After testing, you might encounter errors because the query is incomplete without evaluation. The correct approach is to fetch the first matching record using the `.first()` method:

```
@app.get("/posts/{id}")
def get_post(id: int, db: Session = Depends(get_db)):
    # cursor.execute("""SELECT * from posts WHERE id = %s """, (str(id),))
    # Using .first() returns the first instance that matches the filter condition.
    post = db.query(models.Post).filter(models.Post.id == id).first()
    print(post)


    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"post with id: {id} was not found")


    return {"post_detail": post}
```

> [!important]
> **Note**
>
> After confirming that the query works correctly, remember to remove debugging print statements from your production code.

## Sample Successful Response

After saving and testing these changes, a successful GET request for a post will return a JSON output similar to the following:

```
{
    "post_detail": {
        "id": 4,
        "title": "hey this is my new post",
        "content": "something something beaches",
        "published": true,
        "created_at": "2021-08-21T23:34:18.169278-04:00"
    }
}
```

SQLAlchemy will also log the exact SQL query executed, resembling:

```
SELECT posts.id AS posts_id, posts.title AS posts_title, posts.content AS posts_content, posts.published AS posts_published, posts.created_at AS posts_created_at
FROM posts
WHERE posts.id = %(id_1)s
```

## Error Handling Example

When trying to fetch a non-existent post (for example, with ID 666), the API returns a 404 error response:

```
{
  "detail": "post with id: 666 was not found"
}
```

> [!important]
> **Warning**
>
> Ensure that your error handling covers all edge cases to avoid exposing sensitive details about your database.

With these updates, the endpoint for fetching an individual post is now optimized, fully utilizing SQLAlchemy for database interactions, and is more maintainable for future improvements.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/1c3ad280-5fee-4b8e-a891-42a61f9a2dd0/lesson/d50398e8-46ac-46fb-a747-0e6c4a73e271)**
>
> Watch video content
