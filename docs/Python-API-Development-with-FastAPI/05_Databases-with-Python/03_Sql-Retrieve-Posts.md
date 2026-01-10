# Sql Retrieve Posts - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Databases-with-Python/Sql-Retrieve-Posts)

---

## Table of Contents

- Sql Retrieve Posts
  - Establishing a Database Connection
  - Defining FastAPI Routes
  - Final Thoughts
  - Watch Video
    - Root Endpoint
    - Retrieve Posts Endpoint
    - Create Post Endpoint

---

## Content

Python API Development with FastAPI

Databases with Python

# Sql Retrieve Posts

In this lesson, we demonstrate how to retrieve posts from a PostgreSQL database using Python with FastAPI and psycopg2. The guide covers establishing a database connection, executing a SQL query to retrieve posts, and defining the corresponding API endpoints. This tutorial will help you integrate SQL operations seamlessly into your FastAPI applications.

---

## Establishing a Database Connection

The code below continuously attempts to connect to your PostgreSQL database. Using the `RealDictCursor` ensures that query results are returned as dictionaries, making them easier to work with. Although an initial in-memory array of posts (`my_posts`) is defined for demonstration purposes, later in the lesson, the actual database results are used.

```
while True:
    try:
        conn = psycopg2.connect(
            host='localhost',
            database='fastapi',
            user='postgres',
            password='password123',
            cursor_factory=RealDictCursor
        )
        cursor = conn.cursor()
        print("Database connection was successful!")
        break
    except Exception as error:
        print("Connecting to database failed")
        print("Error:", error)
        time.sleep(2)


my_posts = [{"title": "title of post 1", "content": "content of post 1", "id": 1}, ...]
```

The output log may include messages similar to the following:

```
Connecting to database failed
Error: FATAL: password authentication failed for user "postgres"
WARNING: WatchGodReload detected file change in 'C:\Users\sanje\Documents\Courses\fastapi\app\main.py'. Reloading...
Database connection was successful!
INFO:     Started server process [26976]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

---

## Defining FastAPI Routes

### Root Endpoint

The root endpoint returns a simple greeting message to confirm that the server is up and running.

```
@app.get("/")
def root():
    return {"message": "Hello World"}
```

### Retrieve Posts Endpoint

In this section, we define an endpoint that retrieves posts directly from the PostgreSQL database. The code executes a SQL query to fetch all posts and returns the retrieved data as JSON.

```
@app.get("/posts")
def get_posts():
    cursor.execute("""SELECT * FROM posts""")
    posts = cursor.fetchall()
    print(posts)
    return {"data": posts}
```

A sample log output after fetching posts might look like this:

```
Connecting to database failed
Error: FATAL: password authentication failed for user "postgres"
WARNING: WatchGodReload detected file change in 'C:\Users\sanje\Documents\Courses\fastapi\app\main.py'. Reloading...
Database connection was successful!
INFO:     Started server process [22420]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     127.0.0.1:53076 - "GET /posts HTTP/1.1" 200 OK
```

When making a request via Postman, the endpoint may return a response like:

```
[
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
```

### Create Post Endpoint

This endpoint demonstrates how to create a new post. The incoming post is converted to a dictionary, given a random ID, and appended to the in-memory posts array. In a production environment, the new post would be written to the database.

```
@app.post("/posts", status_code=status.HTTP_201_CREATED)
def create_posts(post: Post):
    post_dict = post.dict()
    post_dict['id'] = randrange(0, 100000)
    my_posts.append(post_dict)
    return post_dict
```

After the application starts, you might see log statements such as:

```
WARNING: WatchGodReload detected file change in 'C:\Users\sanje\Documents\Courses\fastapi\app\main.py.dfbc928ea7d1f64e03ca5f2a29d1b.tmp'. Reloading...
Database connection was successful!
INFO:     Started server process [29036]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
[RealDictRow([('id', 1), ('title', 'first post'), ('content', 'some interesting stuff'), ('published', True), ('created_at', datetime.datetime(2021, 8, 21, 23, 8, 39, 633120), tzinfo=datetime.timezone(datetime.timedelta(0, 72000)))])], RealDictRow([('id', 2), ('title', 'second post'), ('content', 'yadayadayada'), ('published', True), ('created_at', datetime.datetime(2021, 8, 21, 23, 8, 39, 633120), tzinfo=datetime.timezone(datetime.timedelta(0, 72000)))])
INFO:     127.0.0.1:64826 - "GET /posts HTTP/1.1" 200 OK
```

The consolidated final version of the endpoints is shown below:

```
@app.get("/posts/")
def get_posts():
    cursor.execute("""SELECT * FROM posts""")
    posts = cursor.fetchall()
    return {"data": posts}


@app.post("/posts/", status_code=status.HTTP_201_CREATED)
def create_posts(post: Post):
    post_dict = post.dict()
    post_dict['id'] = randrange(0, 100000)
    my_posts.append(post_dict)
    return post_dict
```

The final log output may appear as:

```
WARNING: watchGodReload detected file change in 'C:\Users\sanje\Documents\Courses\fastapi\app\main.py.dfbc928ea7d1f64e03ca5f2a29d1b.tmp'. Reloading...
Database connection was successful!
INFO:     Started server process [20880]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     127.0.0.1:52499 - "GET /posts HTTP/1.1" 200 OK
```

When a GET request is made, the JSON response from the database could be:

```
[
    {
        "id": 1,
        "title": "first post",
        "content": "some interesting stuff",
        "published": true,
        "created_at": "2021-08-21T23:08:39.631320-04:00"
    },
    {
        "id": 2,
        "title": "second post",
        "content": "yadayadayada",
        "published": true
    }
]
```

---

## Final Thoughts

Integrating SQL within your Python code using FastAPI is straightforward once you understand the basic operations such as executing queries and fetching results. This lesson has illustrated how to establish a PostgreSQL database connection, retrieve posts with SQL queries, and expose common operations via FastAPI endpoints.

> [!important]
> **Note**
>
> Remember, in production environments, it is best to write changes directly to the database rather than relying on in-memory arrays.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/1c3ad280-5fee-4b8e-a891-42a61f9a2dd0/lesson/b3cf1457-19af-423a-8ab1-a4f70c3585b9)**
>
> Watch video content
