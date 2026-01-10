# Delete Posts Sql - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Databases-with-Python/Delete-Posts-Sql)

---

## Table of Contents

- Delete Posts Sql
  - Watch Video

---

## Content

Python API Development with FastAPI

Databases with Python

# Delete Posts Sql

In this lesson, you will learn how to safely delete a post from a database within a Python API using SQL. This process uses a DELETE statement with a parameterized query, ensuring that user input is properly handled to prevent SQL injection. The SQL statement also incorporates a RETURNING clause to retrieve the details of the post before it is deleted, which can be useful for validation and logging purposes.

> [!important]
> **Note**
>
> Converting the post ID to a string and including an extra comma in the parameter tuple is essential for preventing errors during query execution.

Below is the updated Python code for the DELETE endpoint:

```
@app.delete("/posts/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_post(id: int):
    cursor.execute(
        """DELETE FROM posts WHERE id = %s RETURNING *""", (str(id),)
    )
    deleted_post = cursor.fetchone()


    if deleted_post is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Post with id: {id} does not exist"
        )


    connection.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
```

Once the DELETE operation executes successfully, you can verify the remaining posts in the database with a simple SQL query. For example:

```
select * from posts;
```

Assume that before deletion, the database contains posts with IDs 1, 2, and 4. When the DELETE endpoint is called for the post with ID 4, the API will return a 204 No Content status, indicating a successful deletion.

Here is an example of the JSON response from a GET request that displays the details of the post with ID 4 before deletion:

```
{
    "post_detail": {
        "id": 4,
        "title": "hey this is my new post",
        "content": "something somethng beaches",
        "published": true,
        "created_at": "2021-08-21T23:34:18.169728-04:00"
    }
}
```

After the deletion operation, the console output confirms that the database connection was successful:

```
Database connection was successful!
```

If you attempt to delete the post with ID 4 again, the API returns a 404 error with a message stating that the post does not exist. This precaution ensures that the client is informed of any attempts to delete non-existent resources, thereby maintaining the integrity of the application.

> [!important]
> **SEO Tip**
>
> Using clear, structured steps and code examples not only assists developers in understanding the process but also improves the page's SEO by including relevant keywords like "Python API", "SQL DELETE", and "safe database operations".

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/1c3ad280-5fee-4b8e-a891-42a61f9a2dd0/lesson/1bf3969e-7e12-4061-8817-e993a7b4c68a)**
>
> Watch video content
