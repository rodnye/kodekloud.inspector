# Get One Post Join - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Advanced-FastAPI/Get-One-Post-Join)

---

## Table of Contents

- Get One Post Join
  - Creating a New Post
  - Original Endpoint for Fetching a Single Post
  - Integrating Vote Count with Join Queries
  - Updated Endpoint for a Single Post with Vote Count
  - Watch Video

---

## Content

Python API Development with FastAPI

Advanced FastAPI

# Get One Post Join

In this guide, we enhance our endpoint for retrieving an individual post by including the vote count in its JSON response. Previously, our endpoint for fetching multiple posts already used a join query to include votes, but the individual post retrieval did not incorporate this functionality.

## Creating a New Post

Below is the code snippet that demonstrates how a new post is created:

```
new_post = models.Post(owner_id=current_user.id, **post.dict())
db.add(new_post)
db.commit()
db.refresh(new_post)


return new_post
```

## Original Endpoint for Fetching a Single Post

The original implementation for retrieving a single post looked like this:

```
@router.get("/{id}", response_model=schemas.Post)
def get_post(id: int, db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
    # cursor.execute("""SELECT * from posts WHERE id = %s """, (str(id),))
    post = db.query(models.Post).filter(models.Post.id == id).first()


    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Post with id: {id} was not found")
    return post
```

During testing, the console logs generated were similar to the following:

```
WARNING:  WatchGodReload detected file change in '['C:\\Users\\sanje\\Documents\\Courses\\fastapi\\app\\routers\\post.py']'. Reloading...
INFO:     Started server process [10116]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     127.0.0.1:61470 - "GET /posts?limit=2 HTTP/1.1" 307 Temporary Redirect
INFO:     127.0.0.1:61470 - "GET /posts?limit=2 HTTP/1.1" 200 OK
```

## Integrating Vote Count with Join Queries

Since the JSON response did not include the vote count, we need to modify our query to join the votes table and count the votes. Here’s an example of the join query used for fetching multiple posts with their respective vote counts:

```
posts = db.query(models.Post, func.count(models.Vote.post_id).label("votes")).join(
    models.Vote, models.Vote.post_id == models.Post.id, isouter=True
).group_by(models.Post.id).filter(models.Post.title.contains(search)).limit(limit).offset(skip).all()
return posts
```

## Updated Endpoint for a Single Post with Vote Count

Next, we update the individual post retrieval endpoint to include a join that fetches the vote count. The improved endpoint appears below:

```
@router.get("/{id}", response_model=schemas.PostOut)
def get_post(id: int, db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
    # Fetch the post by its id
    post = db.query(models.Post).filter(models.Post.id == id).first()
    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Post with id: {id} was not found")

    # Join posts with votes to count the number of votes for this post
    result = db.query(models.Post, func.count(models.Vote.post_id).label("votes")).join(
        models.Vote, models.Vote.post_id == models.Post.id, isouter=True
    ).group_by(models.Post.id).filter(models.Post.id == id).first()

    return result
```

> [!important]
> **Note**
>
> The updated endpoint now returns a JSON structure that includes both the main post data and the associated vote count. This enhancement provides a more comprehensive view of the post’s engagement.

During testing, the console output confirmed that the endpoint was working as expected:

```
INFO:     127.0.0.1:61470 - "GET /posts/?limit=2 HTTP/1.1" 200 OK
INFO:     127.0.0.1:54833 - "GET /posts/10 HTTP/1.1" 200 OK
```

An example of a successful JSON response is:

```
{
  "Post": {
    "title": "asdf",
    "content": "sdfsf",
    "published": true,
    "id": 10,
    "created_at": "2021-08-28T21:49:28.150819-04:00",
    "owner_id": 23,
    "owner": {
      "id": 23,
      "email": "sanjeev@gmail.com",
      "created_at": "2021-08-28T21:03:56.927042-04:00"
    },
    "votes": 2
  }
}
```

> [!important]
> **Warning**
>
> Ensure that all variables used in your queries are properly defined within the current scope. Errors like `NameError: name 'post' is not defined` may occur if variables are misspelled or referenced before initialization.

While you could extend this functionality to the post creation and update endpoints so that they also return the vote count, it is usually sufficient to include it only when fetching posts.

By implementing these changes, the get individual post endpoint now provides both the detailed post data and its vote count, resulting in an improved and more informative API response.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/ed782f8c-495c-4ff8-8703-c9ab0ab04a4d/lesson/1b21a16b-ee6e-4ee3-8da1-6be4c14b145b)**
>
> Watch video content
