# Sqlalchemy Delete Posts - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Databases-with-Python/Sqlalchemy-Delete-Posts)

---

## Table of Contents

- Sqlalchemy Delete Posts
  - Initial Implementation Using Raw SQL
  - Enhancing with Dependency Injection
  - Verifying the Server Log
  - Implementing a Helper Function for Post Retrieval
  - Final Delete Endpoint Implementation
  - Alternative Approach: Using SQLAlchemy Core
  - Verifying the Deletion Operation
  - Conclusion
  - Watch Video

---

## Content

Python API Development with FastAPI

Databases with Python

# Sqlalchemy Delete Posts

In this article, we will demonstrate how to implement a DELETE path operation using [SQLAlchemy](https://www.sqlalchemy.org/) and [FastAPI](https://fastapi.tiangolo.com/). We start with executing a raw SQL DELETE command and gradually enhance our code by leveraging the SQLAlchemy ORM and dependency injection for managing database sessions.

## Initial Implementation Using Raw SQL

Below is the initial approach where we directly execute an SQL DELETE command using a cursor. This method uses raw SQL to delete a post by its ID:

```
@app.delete("/posts/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_post(id: int):
    cursor.execute(
        """DELETE FROM posts WHERE id = %s returning *""", (str(id),)
    )
    deleted_post = cursor.fetchone()
    conn.commit()

    if deleted_post is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"post with id: {id} does not exist"
        )

    return Response(status_code=status.HTTP_204_NO_CONTENT)

@app.put("/posts/{id}")
def update_post(id: int, post: Post):
    # code for updating a post
```

## Enhancing with Dependency Injection

Next, we update the delete operation to use dependency injection for accessing the database session. In this version, we comment out the raw SQL commands and replace them with SQLAlchemy ORM logic:

```
@app.delete("/posts/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_post(id: int, db: Session = Depends(get_db)):
    # The raw SQL deletion code has been commented out:
    # cursor.execute(
    #     """DELETE FROM posts WHERE id = %s returning *""", (str(id),)
    # )
    # deleted_post = cursor.fetchone()
    # conn.commit()

    # Using the ORM to perform the deletion:
    post_query = db.query(models.Post).filter(models.Post.id == id)
    if post_query.first() is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"post with id: {id} does not exist"
        )
    post_query.delete(synchronize_session=False)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
```

> [!important]
> **Note**
>
> Remember to commit the database session after deletion to persist the changes.

## Verifying the Server Log

After running your server with the enhanced implementation, you should see logs similar to the following in your console:

```
INFO:     Started server process [20488]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

## Implementing a Helper Function for Post Retrieval

For better code organization, we create a helper function to retrieve a post by its ID. Instead of executing a raw SQL SELECT, we use the SQLAlchemy query:

```
def get_post(id: int, db: Session = Depends(get_db)):
    # Raw SQL alternative:
    # cursor.execute("""SELECT * from posts WHERE id = %s """, (str(id),))
    post = db.query(models.Post).filter(models.Post.id == id).first()

    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"post with id: {id} was not found"
        )
    return {"post_detail": post}
```

## Final Delete Endpoint Implementation

For our delete endpoint, we apply the same pattern: filtering posts by ID, checking for existence, and then performing the deletion using the ORM's delete method. After deletion, the session is committed:

```
@app.delete("/posts/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_post(id: int, db: Session = Depends(get_db)):
    post_query = db.query(models.Post).filter(models.Post.id == id)

    if post_query.first() is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"post with id: {id} does not exist"
        )

    post_query.delete(synchronize_session=False)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
```

When the server is restarted with these changes, the console output may look like this:

```
INFO:     Started server process [29364]
INFO:     Waiting for application startup.
INFO:     Application startup.
INFO:     Application shutdown complete.
```

> [!important]
> **Tip**
>
> Using dependency injection with SQLAlchemy ORM not only cleans up your code but also improves maintainability and testing.

## Alternative Approach: Using SQLAlchemy Core

For scenarios where you might prefer SQLAlchemy Core, consider the following alternative. Although our example utilizes the ORM, this approach is both efficient and reliable:

```
from sqlalchemy import delete

stmt = delete(User).where(User.name == "squidward").execution_options(synchronize_session="fetch")
session.execute(stmt)
session.commit()
```

## Verifying the Deletion Operation

After successfully performing a deletion, verify the change through your [PostgreSQL](https://www.postgresql.org/) database. You can use this SQL command to list the remaining posts:

```
select * from posts;
```

Test your delete endpoint using [Postman](https://www.postman.com/). For example, sending a DELETE request for a non-existent post (e.g., with ID 4) should return a response like:

```
{
  "detail": "post with id: 4 does not exist"
}
```

When deleting an existing post (for instance, the post with ID 6), the deletion should be successful. Running the SQL query again will confirm that the post has been removed.

## Conclusion

This article illustrated the transition from a raw SQL approach to an ORM-based deletion strategy using FastAPI and SQLAlchemy. By leveraging dependency injection and the ORM's robust query capabilities, you achieve a cleaner, more maintainable codebase. Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/1c3ad280-5fee-4b8e-a891-42a61f9a2dd0/lesson/10b146da-fe34-45c2-98ef-e2e441dbdaad)**
>
> Watch video content
