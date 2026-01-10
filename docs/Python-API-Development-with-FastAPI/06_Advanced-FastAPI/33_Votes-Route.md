# Votes Route - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Advanced-FastAPI/Votes-Route)

---

## Table of Contents

- Votes Route
  - Setting Up the Vote Router
  - Defining the Vote Schema
  - Implementing the Vote Logic
  - Testing the Vote Route with Postman
  - Including the Vote Router in the Main Application
  - Displaying Vote Counts on Posts
  - Handling Votes on Non-existent Posts
  - Visual Confirmation
  - Watch Video

---

## Content

Python API Development with FastAPI

Advanced FastAPI

# Votes Route

In this lesson, we will set up the voting route for our FastAPI application. This endpoint handles likes and unlikes for posts based on the vote direction provided in the request. A vote direction of 1 indicates a "like" while a direction of 0 indicates that the user wants to remove their like.

Below is an example payload that the route expects in the request body:

```
{
  "post_id": 1432,
  "dir": 0
}
```

The route is created at `/vote` and requires only the post ID and vote direction. The user ID is extracted from the JWT token, reducing the parameters needed in the request body.

When a user votes, the logic is as follows:

1.  If the vote direction is 1 and the user has already liked the post, the endpoint returns an HTTP 409 Conflict error.
2.  If the vote direction is 0 and the user has not liked the post, the endpoint returns an HTTP 404 Not Found error.
3.  Otherwise, the vote is either added or removed accordingly.

## Setting Up the Vote Router

Create a new file `vote.py` in the routers folder. Start by copying the necessary import statements from one of the other routers:

```
from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter
```

When you save the file, you might see server log messages similar to:

```
WARNING: WatchGodReload detected file change in '['C:\\Users\\sanje\\Documents\\Courses\\fastapi\\app\\routers\\vote.py.77e8e3b44d0396d5c89b3f4c1b82083.tmp']'. Reloading...
INFO:     Started server process [2776]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

Next, create an instance of the router with the `/vote` prefix and the tag "Vote":

```
from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter


router = APIRouter(
    prefix="/vote",
    tags=["Vote"]
)
```

This route uses the POST method to send data for creating or removing votes. The default status is set to 201 (Created). The initial function definition is:

```
@router.post("/", status_code=status.HTTP_201_CREATED)
def vote():
    # Logic for handling the vote will be implemented here
    pass
```

## Defining the Vote Schema

Since vote data is received in the request body, defining a Pydantic schema for validation is essential. The schema includes the post ID (an integer) and the vote direction. We use the Pydantic type `conint(Le=1)` to ensure that the maximum value is 1. Although this approach accepts negative numbers, it is acceptable for now. Future improvements can enforce strictly 0 or 1 values.

Below is an example of our Pydantic schemas (including other models for context):

```
from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional
from pydantic.types import conint


class PostBase(BaseModel):
    title: str
    content: str
    published: bool = True


class PostCreate(PostBase):
    pass


class UserOut(BaseModel):
    id: int
    email: EmailStr


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    id: Optional[str] = None


class Vote(BaseModel):
    post_id: int
    dir: conint(Le=1)
```

When updating your file, you might see similar logs:

```
WARNING: WatchGodReload detected file change in '['C:\\Users\\sanje\\Documents\\Courses\\fastapi\\app\\routers\\vote.py.77e8e3b44d039d5c89b3']'. Reloading...
postgres
INFO:     Started server process [2776]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

## Implementing the Vote Logic

Import the necessary schemas, database utilities, models, and OAuth2 authentication logic as shown below:

```
from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter
from .. import schemas, database, models, oauth2


router = APIRouter(
    prefix="/vote",
    tags=["Vote"]
)
```

Update the `vote` function to require the vote data via the schema, a database session, and the currently authenticated user:

```
@router.post("/", status_code=status.HTTP_201_CREATED)
def vote(vote: schemas.Vote, db: database.Session = Depends(database.get_db),
         current_user: int = Depends(oauth2.get_current_user)):
    # Check if the target post exists
    post = db.query(models.Post).filter(models.Post.id == vote.post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    # Query to verify if the user has already voted on this post
    vote_query = db.query(models.Vote).filter(
        models.Vote.post_id == vote.post_id,
        models.Vote.user_id == current_user.id
    )
    found_vote = vote_query.first()


    # If the vote direction is 1, the user wants to add a vote
    if vote.dir == 1:
        if found_vote:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail=f"user {current_user.id} has already voted on post {vote.post_id}"
            )
        new_vote = models.Vote(post_id=vote.post_id, user_id=current_user.id)
        db.add(new_vote)
        db.commit()
        return {"message": "successfully added vote"}
    else:
        # If the vote direction is 0, the user wants to remove their vote
        if not found_vote:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Vote does not exist")
        vote_query.delete(synchronize_session=False)
        db.commit()
        return {"message": "successfully deleted vote"}
```

> [!important]
> **Note**
>
> Always validate that the target post exists before processing any vote changes. This prevents unnecessary database operations and improves the robustness of your endpoint.

A simplified version of the vote logic is as follows:

```
if vote.dir == 1:
    if found_vote:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                            detail=f"user {current_user.id} has already voted on post {vote.post_id}")
    else:
        # Logic to add the vote goes here
        pass
else:
    if not found_vote:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Vote does not exist")
    else:
        # Logic to delete the vote goes here
        pass
```

## Testing the Vote Route with Postman

After implementing the voting logic, test the endpoint using Postman. Follow these steps:

1.  Log in to obtain a JWT token.
2.  Create a new POST request for the vote functionality.
3.  Set the request body with the post ID and vote direction (use 1 for liking):

    ```
    {
      "post_id": 10,
      "dir": 1
    }
    ```

4.  Ensure the Authorization header is set to "Bearer <your_token>".
5.  For a successful vote, you should receive the response:

    ```
    {
      "message": "successfully added vote"
    }
    ```

If you attempt to like the same post again, the response will be:

```
{
    "detail": "user 24 has already voted on post 10"
}
```

To remove a vote, change the direction to 0:

```
{
  "post_id": 10,
  "dir": 0
}
```

If successful, the confirmation will be:

```
{
  "message": "successfully deleted vote"
}
```

If the vote does not exist, a 404 error with the detail "Vote does not exist" is returned.

> [!important]
> **Tip**
>
> Before testing, you may want to clean your votes table using SQL:
>
> - Delete all votes:
>
> ```
> DELETE FROM votes;
> ```
>
> - Verify with:
>
> ```
> SELECT * FROM votes;
> ```

## Including the Vote Router in the Main Application

Ensure that your main application file (`main.py`) includes the vote router. Import the vote router along with the others:

```
from fastapi import FastAPI
from . import models
from .database import engine
from .routers import post, user, auth, vote
from .config import settings


models.Base.metadata.create_all(bind=engine)


app = FastAPI()


app.include_router(post.router)
app.include_router(user.router)
app.include_router(auth.router)
app.include_router(vote.router)  # Include the vote router here


@app.get("/")
def root():
    return {"message": "Hello World"}
```

When the vote router is added correctly, you will see similar log entries when the application starts:

```
INFO:     Application startup complete.
INFO:     127.0.0.1:50601 - "POST /vote HTTP/1.1" 404 Not Found
```

Once wired correctly, the `/vote` endpoint becomes available for use.

## Displaying Vote Counts on Posts

A future enhancement is to include the number of votes as a field when retrieving post data. This allows the front-end application to display the like count without issuing an additional query. Implementing this typically involves advanced SQL and SQLAlchemy techniques such as join operations or subqueries.

## Handling Votes on Non-existent Posts

If a user attempts to vote on a non-existent post, the endpoint returns a 404 error. This is managed by first querying the posts table using the provided post ID. If the post is not found, an HTTPException with a 404 status code is raised.

The updated logic snippet reiterates how to handle this case:

```
@router.post("/", status_code=status.HTTP_201_CREATED)
def vote(vote: schemas.Vote, db: database.Session = Depends(database.get_db),
         current_user: int = Depends(oauth2.get_current_user)):
    # Check if the target post exists
    post = db.query(models.Post).filter(models.Post.id == vote.post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    vote_query = db.query(models.Vote).filter(
        models.Vote.post_id == vote.post_id,
        models.Vote.user_id == current_user.id
    )
    found_vote = vote_query.first()


    if vote.dir == 1:
        if found_vote:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail=f"user {current_user.id} has already voted on post {vote.post_id}"
            )
        new_vote = models.Vote(post_id=vote.post_id, user_id=current_user.id)
        db.add(new_vote)
        db.commit()
        return {"message": "successfully added vote"}
    else:
        if not found_vote:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Vote does not exist")
        vote_query.delete(synchronize_session=False)
        db.commit()
        return {"message": "successfully deleted vote"}
```

## Visual Confirmation

Below are images showing a code editor session and a Postman interface during testing. These images confirm that the changes have been applied correctly and help provide context.

![The image shows a Visual Studio Code interface with Python code, including class definitions and a terminal displaying server startup information.](https://kodekloud.com/kk-media/image/upload/v1752883345/notes-assets/images/Python-API-Development-with-FastAPI-Votes-Route/vscode-python-code-class-definitions.jpg)

![The image shows the Postman application interface with a workspace open, displaying various API request options like GET, POST, and DELETE on the left sidebar. The main area is set up for creating a new GET request, with sections for parameters, headers, and other settings.](https://kodekloud.com/kk-media/image/upload/v1752883346/notes-assets/images/Python-API-Development-with-FastAPI-Votes-Route/postman-api-request-interface.jpg)

By following these steps, you have implemented a robust voting feature in your FastAPI application. For more details on FastAPI and deployment, consider checking out the [FastAPI Documentation](https://fastapi.tiangolo.com) and exploring additional resources such as [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/).

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/ed782f8c-495c-4ff8-8703-c9ab0ab04a4d/lesson/7b503633-91d0-4745-9504-2e8e43648e65)**
>
> Watch video content
