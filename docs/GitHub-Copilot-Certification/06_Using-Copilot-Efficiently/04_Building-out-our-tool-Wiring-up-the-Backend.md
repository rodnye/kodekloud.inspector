# Building out our tool Wiring up the Backend - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Copilot-Certification/Using-Copilot-Efficiently/Building-out-our-tool-Wiring-up-the-Backend)

---

## Table of Contents

- Building out our tool Wiring up the Backend
  - Table of Contents
  - Module Overview
  - 1. Database Repository
  - 2. Request Model
  - 3. API Endpoint Router
  - 4. Main Application Integration
  - 5. Testing & Debugging
  - 6. Takeaways
  - References
  - Watch Video

---

## Content

GitHub Copilot Certification

Using Copilot Efficiently

# Building out our tool Wiring up the Backend

In this lesson, we’ll finish wiring our FastAPI application to an SQLite database—replacing the previous Faker-based generator. We will:

1.  Create a repository module for database operations
2.  Define a Pydantic request model
3.  Refactor our router to call the repository
4.  Integrate the router into the main application
5.  Test and debug the implementation

> [!important]
> **Note**
>
> This tutorial assumes you have a working FastAPI project structure and `uvicorn` installed.

---

## Table of Contents

- [Module Overview](#module-overview)
- [1\. Database Repository](#1-database-repository)
- [2\. Request Model](#2-request-model)
- [3\. API Endpoint Router](#3-api-endpoint-router)
- [4\. Main Application Integration](#4-main-application-integration)
- [5\. Testing & Debugging](#5-testing--debugging)
- [6\. Takeaways](#6-takeaways)
- [References](#references)

---

## Module Overview

| Module                  | File Path                             | Responsibility                         |
| ----------------------- | ------------------------------------- | -------------------------------------- |
| Repository Layer        | `src/data/fake_data_repository.py`    | Encapsulate SQLite operations          |
| Request Validation      | `src/api/models/fake_data_request.py` | Define Pydantic model for requests     |
| API Router              | `src/api/endpoints/router.py`         | Handle incoming requests and call repo |
| Application Entry Point | `src/main.py`                         | Initialize FastAPI and include router  |

---

## 1\. Database Repository

Create `src/data/fake_data_repository.py` to centralize all SQLite interactions following the repository pattern.

```
# src/data/fake_data_repository.py
"""Database operations for fake data using SQLite."""
import sqlite3
from typing import List, Dict, Any
from fastapi import HTTPException


def get_db_connection() -> sqlite3.Connection:
    """
    Establish a connection to the SQLite database.


    Returns:
        sqlite3.Connection: A connection object with row factory set.


    Raises:
        HTTPException: If the database connection fails.
    """
    try:
        conn = sqlite3.connect("fakedata.db")
        conn.row_factory = sqlite3.Row
        return conn
    except sqlite3.Error as e:
        raise HTTPException(
            status_code=500,
            detail=f"Database connection error: {e}"
        )


def get_fake_data(count: int) -> List[Dict[str, Any]]:
    """
    Retrieve a specified number of random records from the database.


    Args:
        count (int): How many records to retrieve.


    Returns:
        List[Dict[str, Any]]: A list of dictionaries representing fake data.


    Raises:
        HTTPException: On query execution error.
    """
    query = """
        SELECT first_name,
               last_name,
               email_address,
               age,
               city,
               occupation
        FROM fake_data
        ORDER BY RANDOM()
        LIMIT ?
    """
    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        cursor.execute(query, (count,))
        rows = cursor.fetchall()
        return [dict(row) for row in rows]
    except sqlite3.Error as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")
    finally:
        conn.close()
```

---

## 2\. Request Model

Define a Pydantic model in `src/api/models/fake_data_request.py` to validate incoming JSON payloads.

```
# src/api/models/fake_data_request.py
from pydantic import BaseModel
from typing import Optional


class FakeDataRequest(BaseModel):
    """
    Model to validate fake data retrieval requests.


    Attributes:
        count (int): Number of records to return.
        locale (Optional[str]): Locale code (unused in SQLite).
    """
    count: int
    locale: Optional[str] = "en_US"
```

---

## 3\. API Endpoint Router

Refactor your router in `src/api/endpoints/router.py` to delegate data retrieval to the repository.

```
# src/api/endpoints/router.py
from fastapi import APIRouter
from api.models.fake_data_request import FakeDataRequest
from data.fake_data_repository import get_fake_data


router = APIRouter()


@router.post("/getfakedata", tags=["Fake Data"])
async def generate_fake_data(request: FakeDataRequest) -> dict:
    """
    POST endpoint to fetch fake data from SQLite.


    Args:
        request (FakeDataRequest): Request schema with parameters.


    Returns:
        dict: Contains a list of fake data objects.
    """
    data = get_fake_data(request.count)
    return {"data": data}
```

---

## 4\. Main Application Integration

Include the endpoint router in your FastAPI app entry point at `src/main.py`.

```
# src/main.py
from fastapi import FastAPI
from api.endpoints.router import router as fake_data_router


app = FastAPI(
    title="FastAPI Fake Data Generator",
    description="API that serves random fake data from an SQLite database",
    version="1.0.0",
)


app.include_router(fake_data_router, prefix="/api")
```

> [!important]
> **Warning**
>
> Always close the database connection in a `finally` block to prevent resource leaks.

---

## 5\. Testing & Debugging

1.  Start the server with hot reload:

    ```
    uvicorn src.main:app --reload
    ```

2.  Send a POST request to `/api/getfakedata`:

    ```
    {
      "count": 5
    }
    ```

3.  Example successful response:

    ```
    {
      "data": [
        {
          "first_name": "Alice",
          "last_name": "Smith",
          "email_address": "alice.smith@example.com",
          "age": 29,
          "city": "Seattle",
          "occupation": "Engineer"
        },
        ...
      ]
    }
    ```

4.  If you encounter `no such table: fake_data`, verify your database schema:

    ```
    -- List existing tables
    SELECT name FROM sqlite_master WHERE type='table';


    -- Inspect table columns
    PRAGMA table_info(fake_data);
    ```

---

## 6\. Takeaways

- **Separation of Concerns**: Keep database logic in a repository and routing logic in the API layer.
- **Validation**: Use Pydantic models for input validation and automatic documentation.
- **Clean Architecture**: Slim routers and well-documented modules lead to maintainable code.
- **Automation with Oversight**: Tools like GitHub Copilot can accelerate development but always review generated code.

---

## References

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [SQLite Official Documentation](https://www.sqlite.org/docs.html)
- [Pydantic User Guide](https://pydantic-docs.helpmanual.io/)
- [Uvicorn Server](https://www.uvicorn.org/)
- [Repository Pattern in Python](https://martinfowler.com/eaaCatalog/repository.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-copilot-certification/module/a8b1c2a2-f3f7-4470-9347-0ad31f2ab3cc/lesson/0c92989b-a5cd-4094-893b-e0167f376eda)**
>
> Watch video content
