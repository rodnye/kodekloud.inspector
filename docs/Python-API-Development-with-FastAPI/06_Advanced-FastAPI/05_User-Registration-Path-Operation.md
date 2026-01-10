# User Registration Path Operation - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Advanced-FastAPI/User-Registration-Path-Operation)

---

## Table of Contents

- User Registration Path Operation
  - Updating Data with SQLAlchemy
  - Refactoring the Endpoint for User Creation
  - Defining the User Schema
  - Implementing the Create User Endpoint
  - Testing the Endpoint via Postman
  - Validating Email Input
  - Creating a Response Model for the User
  - Watch Video

---

## Content

Python API Development with FastAPI

Advanced FastAPI

# User Registration Path Operation

In this article, we extend our previous implementation for posts by adding a new path operation to create a user. While the process is similar to creating a post, there are key modifications needed to handle user-specific details like email and password.

Below is the original posts creation endpoint for reference:

```
@api.post("/posts", status_code=status.HTTP_201_CREATED, response_model=schemas.Post)
def create_posts(post: schemas.PostCreate, db: Session = Depends(get_db)):
    # cursor.execute("""INSERT INTO posts (title, content, published) VALUES (%s, %s, %s)
    #                   RETURNING * """,
    #                   (post.title, post.content, post.published))
    # new_post = cursor.fetchone()
    # conn.commit()


    new_post = models.Post(**post.dict())
    db.add(new_post)
    db.commit()
    db.refresh(new_post)


    return new_post
```

```
app/models.py", "C:\Users\sanje\Documents\Courses\fastapi\app\models.py.915f4585d116cbddab21f73e5527481.tmp": Reloading...
Database connection was successfull
INFO:     Started server process [27704]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

## Updating Data with SQLAlchemy

Later in the article, we update an existing post. The following snippet retrieves a post by its ID, raises an exception if it's not found, applies updates using new data, commits the changes, and returns the updated post:

```
post_query = db.query(models.Post).filter(models.Post.id == id)
post = post_query.first()


if post is None:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                        detail=f"post with id: {id} does not exist")


post_query.update(updated_post.dict(), synchronize_session=False)


db.commit()


return post_query.first()
```

```
INFO:     Started server process [27704]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

## Refactoring the Endpoint for User Creation

To create a new user, modify the decorator to target the `/users` URL. In this refactoring, we switch from handling posts to managing user registration. For simplicity, we temporarily remove the response model.

Below is the refactored endpoint for user creation:

```
@app.post("/users", status_code=status.HTTP_201_CREATED)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    new_user = models.User(**user.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user
```

```
WARNING:  WatchGodReload detected file change in '['C:\\Users\\sanje\\Documents\\Courses\\fastapi\\app\\main.py.dbfc928ea7d1f64e03ca5f2a29d1b.tmp']: Reloading...
INFO:     Database connection was successful!
INFO:     Started server process [2520]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

The function `create_user` clearly aligns with the endpoint's purpose. Remember that when creating any resource, the default status code should be 201.

## Defining the User Schema

When receiving registration data, the incoming JSON must include both an email and a password. We create a dedicated Pydantic schema to enforce required fields. Below are the model definitions for posts and the initial user creation schema:

```
class PostCreate(PostBase):
    pass


class Post(PostBase):
    id: int
    created_at: str


    class Config:
        orm_mode = True


class UserCreate:
    email: str
    password: str
```

For additional validation of email addresses, we use Pydantic’s `EmailStr`. This ensures that the provided email follows a valid format. Make sure the `email-validator` library is installed (it comes automatically when installing FastAPI with the all flag, or you can install it via `pip install email-validator`).

Below is an updated version that uses `EmailStr` and improves date handling for posts:

```
from pydantic import BaseModel, EmailStr
from datetime import datetime


class PostBase(BaseModel):
    title: str
    content: str
    published: bool = True


class PostCreate(PostBase):
    pass


class Post(PostBase):
    id: int
    created_at: datetime


    class Config:
        orm_mode = True


class UserCreate(BaseModel):
    email: EmailStr
    password: str
```

```
ani58061=7.0.0
async-exit-stack=1.0.1
async-generator=1.10
autotext=1.5.7
certifi=2021.5.30
charset-normalizer=2.0.4
click=7.1.2
colorama=0.4.4
dnspython=2.1.0
email-validator=1.1.3
fastapi=0.68.0
graphene=2.1.8
graphql-core=2.3.2
```

The updated schema validates the email field properly. You should see `email-validator` when running `pip freeze`.

> [!important]
> **Note**
>
> Returning a password in the response is not secure. Always ensure that sensitive information is excluded from API responses.

## Implementing the Create User Endpoint

Back in the main application file, define the endpoint to create a new user by adapting the logic from the post creation operation. Notice how we convert the incoming Pydantic object to a dictionary and unpack it when instantiating the SQLAlchemy model, which facilitates proper insertion.

The following snippet demonstrates the user creation endpoint:

```
@app.post("/users", status_code=status.HTTP_201_CREATED)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    new_user = models.User(**user.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user
```

Again, observe the console messages as the server reloads and confirms the database connection:

```
WARNING:  WatchGodReload detected file change in '['C:\\Users\\sanje\\Documents\\Courses\\fastapi\\app\\main.py.dfbc928ea7d1f64e03ca5f2a29d1b.tmp']: Reloading...
INFO:     Database connection was successful!
INFO:     Started server process [2520]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

## Testing the Endpoint via Postman

Use an API client like [Postman](https://www.postman.com/) to test the endpoint. Create a new POST request named "create user" and set the request body to raw JSON. For example, use the following payload:

```
{
    "email": "carl@gmail.com",
    "password": "password123"
}
```

Ensure that the URL points to `/users` instead of `/posts`. When the request is sent, you should receive a response containing the user's email, creation timestamp, and ID. For instance:

```
{
    "email": "carl@gmail.com",
    "password": "password123",
    "created_at": "2021-08-22T21:50:19.255781-04:00",
    "id": 4
}
```

To verify that the user was created, run an SQL query against the users table:

```
SELECT * FROM public.users
ORDER BY "id" ASC;
```

Alternatively, simply:

```
select * from users;
```

## Validating Email Input

To ensure the email validator is working, try submitting a request with an invalid email format. In this case, the schema validator returns an error message similar to:

```
{
    "detail": [
        {
            "loc": [
                "body",
                "email"
            ],
            "msg": "value is not a valid email address",
            "type": "value_error.email"
        }
    ]
}
```

After correcting the email—for example, using "newuser@gmail.com"—the endpoint successfully creates and returns the user.

## Creating a Response Model for the User

To prevent sensitive information (like the password) from being returned in the API response, define a new Pydantic model called `UserOut`. This model includes the user ID, email, and optionally the creation timestamp.

```
class UserOut(BaseModel):
    id: int
    email: EmailStr


    class Config:
        orm_mode = True
```

Now, update your user creation endpoint to use the `UserOut` response model:

```
@app.post("/users", status_code=status.HTTP_201_CREATED, response_model=schemas.UserOut)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    new_user = models.User(**user.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user
```

When a new user is created, the response will include only the fields defined in `UserOut`. For example:

```
{
    "id": 6,
    "email": "newusersrdfsdf@gmail.com"
}
```

To include all desired fields (such as `created_at`), ensure that your models are updated accordingly:

```
class PostCreate(PostBase):
    pass


class Post(PostBase):
    id: int
    created_at: datetime


    class Config:
        orm_mode = True


class UserCreate(BaseModel):
    email: EmailStr
    password: str


class UserOut(BaseModel):
    id: int
    email: EmailStr


    class Config:
        orm_mode = True
```

This configuration guarantees that the response model accurately represents the stored data without exposing sensitive details like the password. With these improvements, your API now securely processes user registration by enforcing email validation, handling user data safely, and returning only the necessary information to the client.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/ed782f8c-495c-4ff8-8703-c9ab0ab04a4d/lesson/123a3674-b6ad-4db9-8d74-16a184ed35b2)**
>
> Watch video content
