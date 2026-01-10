# Delete Update Only Your Own Posts - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Advanced-FastAPI/Delete-Update-Only-Your-Own-Posts)

---

## Table of Contents

- Delete Update Only Your Own Posts
  - Enforcing Ownership in the Delete Operation
  - Enforcing Ownership in the Update Operation
  - Testing the Endpoints
  - Recap
  - Watch Video

---

## Content

Python API Development with FastAPI

Advanced FastAPI

# Delete Update Only Your Own Posts

In this lesson, you will learn how to restrict delete and update operations so that users can only modify or remove their own posts. Previously, our application allowed any authenticated user to delete or update any post regardless of ownership. This behavior is undesirable because users should never be permitted to modify or delete another user's post.

Below is a detailed walkthrough demonstrating how to enforce an ownership check, ensuring that the authenticated user can only make changes to posts they own.

---

## Enforcing Ownership in the Delete Operation

Initially, the endpoint fetched a post by its ID without verifying whether the current user was the owner:

```
post = db.query(models.Post).filter(models.Post.id == id).first()

if not post:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                        detail=f"post with id: {id} was not found")

return post

post.delete(synchronize_session=False)
db.commit()

return Response(status_code=status.HTTP_204_NO_CONTENT)
```

This implementation allowed any authenticated user to delete any post. To secure this operation, we add a check that verifies the post's `owner_id` matches the current user's ID.

Below is the improved delete endpoint with the ownership check implemented:

```
@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_post(id: int, db: Session = Depends(get_db),
                current_user: int = Depends(oauth2.get_current_user)):
    post_query = db.query(models.Post).filter(models.Post.id == id)
    post = post_query.first()

    if post is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"post with id: {id} does not exist")

    if post.owner_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail="Not authorized to perform requested action")

    post_query.delete(synchronize_session=False)
    db.commit()

    return Response(status_code=status.HTTP_204_NO_CONTENT)
```

> [!important]
> **Note**
>
> The code first fetches the post for deletion. If the post is not found, the endpoint returns a 404 error. Then, it verifies that the post belongs to the current user before allowing deletion.

---

## Enforcing Ownership in the Update Operation

The same ownership verification logic applies to the update operation. Before processing an update, we ensure that the post exists and that the logged-in user is its owner.

Below is the updated endpoint for modifying a post:

```
@router.put("/{id}", response_model=schemas.Post)
def update_post(id: int, updated_post: schemas.PostCreate, db: Session = Depends(get_db),
                current_user: int = Depends(oauth2.get_current_user)):
    post_query = db.query(models.Post).filter(models.Post.id == id)
    post = post_query.first()

    if post is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"post with id: {id} does not exist")

    if post.owner_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail="Not authorized to perform requested action")

    post_query.update(updated_post.dict(), synchronize_session=False)
    db.commit()
    return post_query.first()
```

> [!important]
> **Note**
>
> In the update endpoint, after ensuring the existence of the post, we check if the `current_user.id` matches the `post.owner_id`. Only when this condition is met does the update proceed.

---

## Testing the Endpoints

When testing these endpoints, consider the following scenarios:

1.  **Listing Posts**  
    Sending a GET request to the posts endpoint returns a list of posts. For example:

    ```
    [
        {
            "published": true,
            "id": 4,
            "created_at": "2021-08-28T21:18:13.460585-04:00",
            "owner_id": 21
        },
        {
            "title": "top beaches in florida",
            "contents": "something something beaches",
            "published": true,
            "id": 8,
            "created_at": "2021-08-28T21:36:39.369534-04:00",
            "owner_id": 23
        }
    ]
    ```

2.  **Authentication Token**  
    The authentication token indicates the current logged-in user. For example:

    ```
    {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjM0NTY3ODkwLCJleHBpcmF0aW9uIjoxNzYwNjg2MTYwfQ.3pw0Pbhb6bJ2kMo_KmhB2MwTfqfZtrRnsdZo",
      "token_type": "bearer"
    }
    ```

    In tests, assume that the user represented by this token has an ID of 23.

3.  **Unauthorized Delete Attempt**  
    If the logged-in user (ID 23) tries to delete a post owned by another user (e.g., owner_id 21), the endpoint correctly responds with a 403 Forbidden error.
4.  **Successful Deletion and Update**  
    When the logged-in user attempts to delete or update a post they own (owner_id 23), the operation is successful. For instance, deleting a post with ID 8 (where owner_id is 23) returns a 204 status code. Similarly, updating the post modifies its content correctly.

Here is an example of an updated post returned after a successful update:

```
{
    "title": "this is the new title",
    "content": "this is the new content",
    "published": true,
    "id": 9,
    "created_at": "2021-08-28T21:48:30.323507-04:00",
    "owner_id": 23
}
```

---

## Recap

In summary, both the delete and update endpoints now include the following safeguards:

- They initially verify whether the specified post exists.
- They check if the authenticated user is the owner of the post.
- A 403 Forbidden error is returned when a user attempts an unauthorized operation.
- Only when these conditions are met does the operation proceed.

This approach ensures that users can only update or delete their own posts, thereby maintaining data integrity and enhancing application security.

For more information on securing your API endpoints, visit the [FastAPI Documentation](https://fastapi.tiangolo.com/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/ed782f8c-495c-4ff8-8703-c9ab0ab04a4d/lesson/c6daba96-de0e-4a3b-ab3f-cdbbfde7521e)**
>
> Watch video content
