# Creating In code Documentation - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Copilot-Certification/Using-Copilot-Efficiently/Creating-In-code-Documentation)

---

## Table of Contents

- Creating In code Documentation
  - Table of Contents
  - 1. Basic FastAPI Endpoint
  - 2. Adding Inline Comments
  - 3. Writing Comprehensive Docstrings
  - 4. Using GitHub Copilot to Generate Comments
  - 5. Documenting Your Pydantic Models
  - 6. Generating a README with Copilot
  - 7. Summary & Best Practices
  - Links and References
  - Watch Video
    - Example README.md

---

## Content

GitHub Copilot Certification

Using Copilot Efficiently

# Creating In code Documentation

In this guide, you’ll learn how to write clear, maintainable documentation directly inside your Python code. We’ll cover:

- Inline comments
- Structured docstrings (PEP 257)
- Leveraging [GitHub Copilot](https://github.com/features/copilot)
- Documenting [Pydantic](https://pydantic-docs.helpmanual.io/) models
- Generating a `README.md` automatically

Our running example is a simple FastAPI service that generates fake data.

## Table of Contents

1.  [Basic FastAPI Endpoint](#1-basic-fastapi-endpoint)
2.  [Adding Inline Comments](#2-adding-inline-comments)
3.  [Writing Comprehensive Docstrings](#3-writing-comprehensive-docstrings)
4.  [Using GitHub Copilot to Generate Comments](#4-using-github-copilot-to-generate-comments)
5.  [Documenting Your Pydantic Models](#5-documenting-your-pydantic-models)
6.  [Generating a README with Copilot](#6-generating-a-readme-with-copilot)
7.  [Summary & Best Practices](#7-summary--best-practices)
8.  [Links and References](#links-and-references)

---

## 1\. Basic FastAPI Endpoint

Start with a minimal router in `router.py`:

```
from fastapi import APIRouter
from ..models.fake_data_request import FakeDataRequest
from ...data.fake_data_repository import get_fake_data

router = APIRouter()

@router.post("/getfakedata")
async def generate_fake_data(request: FakeDataRequest) -> dict:
    data = get_fake_data(request.data_type, request.count)
    return {"data": data}
```

Run the server:

```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
127.0.0.1:56608 - "POST /getfakedata HTTP/1.1" 200 OK
```

---

## 2\. Adding Inline Comments

Inline comments help readers follow the code flow without jumping to external docs:

```
@router.post("/getfakedata")
async def generate_fake_data(request: FakeDataRequest) -> dict:
    # Fetch fake data based on request parameters
    data = get_fake_data(request.data_type, request.count)
    # Return JSON response with the data list
    return {"data": data}
```

> [!important]
> **Tip**
>
> Keep inline comments concise—explain **why**, not **what**. The code itself should reveal the “what.”

---

## 3\. Writing Comprehensive Docstrings

Use PEP 257-style docstrings to detail arguments, return values, and examples:

```
@router.post("/getfakedata")
async def generate_fake_data(request: FakeDataRequest) -> dict:
    """
    Generate fake data according to the provided request.

    Args:
        request (FakeDataRequest):
            - data_type (str): Type of data (e.g., "user", "email").
            - count (int): Number of items to generate.

    Returns:
        dict:
            JSON response with a "data" key containing the list of results.

    Example:
        POST /getfakedata
        {
            "data_type": "user",
            "count": 5
        }
    """
    data = get_fake_data(request.data_type, request.count)
    return {"data": data}
```

```
127.0.0.1:56599 - "POST /getfakedata HTTP/1.1" 422 Unprocessable Entity
127.0.0.1:56599 - "POST /getfakedata HTTP/1.1" 200 OK
```

---

## 4\. Using GitHub Copilot to Generate Comments

Let Copilot accelerate your documentation:

1.  Open `router.py` in VS Code (or your editor).
2.  Place cursor above the function.
3.  Type:

    ```
    # Please generate a docstring explaining this function
    ```

Copilot will suggest a structured docstring and inline notes:

```
@router.post("/getfakedata")
async def generate_fake_data(request: FakeDataRequest) -> dict:
    """
    Generate a list of fake data items.

    Args:
        request (FakeDataRequest):
            Contains 'data_type' (str) and 'count' (int).

    Returns:
        dict:
            - data (List): Generated fake data.
    """
    # Retrieve fake data
    data = get_fake_data(request.data_type, request.count)
    # Return JSON-serializable response
    return {"data": data}
```

> [!important]
> **Warning**
>
> Review Copilot’s suggestions carefully—AI-generated docs may need tweaks to match your project conventions.

---

## 5\. Documenting Your Pydantic Models

Enhance your request schema with docstrings for automatic API docs (Swagger UI):

```
from pydantic import BaseModel
from typing import Optional

class FakeDataRequest(BaseModel):
    """
    Request model for the fake data generator.

    Attributes:
        data_type (str): The category of data to produce (e.g., "name", "email").
        count (int): Number of records to generate.
        locale (Optional[str]): Locale for formatting (default: "en_US").
    """
    data_type: str
    count: int
    locale: Optional[str] = "en_US"
```

```
127.0.0.1:8000 - "POST /getfakedata HTTP/1.1" 200 OK
```

---

## 6\. Generating a README with Copilot

Use Copilot to scaffold a `README.md`:

```
# Generate a README for a FastAPI-based fake-data-generator
```

### Example `README.md`

````
A FastAPI service that produces realistic fake data for testing.

## Features
| Resource      | Description                                |
|---------------|--------------------------------------------|
| POST endpoint | `/getfakedata` accepts `data_type` & `count` |
| Pydantic Model| `FakeDataRequest` with optional `locale`   |
| Response      | JSON `{ "data": [...] }`                  |

## Installation

```sh
git clone https://github.com/yourusername/fake-data-generator.git
cd fake-data-generator
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```text

## Usage

```sh
uvicorn main:app --reload
```text

Send a POST request:

```json
POST /getfakedata
{
  "data_type": "user",
  "count": 10
}
```text
````

---

## 7\. Summary & Best Practices

- **Inline Comments**: Clarify logic and intent.
- **Docstrings**: Follow PEP 257 for consistency and auto-generated docs.
- **Copilot**: Speeds up writing but always review AI-generated text.
- **Pydantic Models**: Document attributes for better schema validation and API docs.

Documented code helps teams onboard faster and reduces maintenance overhead. Next, explore unit testing strategies to ensure your endpoints behave as expected.

---

## Links and References

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [GitHub Copilot](https://github.com/features/copilot)
- [Pydantic Docs](https://pydantic-docs.helpmanual.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-copilot-certification/module/a8b1c2a2-f3f7-4470-9347-0ad31f2ab3cc/lesson/dab60660-d063-4358-95e5-42ebfdeeeb7f)**
>
> Watch video content
