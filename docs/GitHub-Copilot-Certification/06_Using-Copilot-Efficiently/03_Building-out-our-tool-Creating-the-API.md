# Building out our tool Creating the API - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Copilot-Certification/Using-Copilot-Efficiently/Building-out-our-tool-Creating-the-API)

---

## Table of Contents

- Building out our tool Creating the API
  - Importing Fake Data into SQLite
  - Scaffolding the Python Project
  - Choosing the Right Framework
  - Generating the FastAPI Project Structure
  - Implementing the FastAPI Application
  - Defining the Database Dependency
  - Creating the Pydantic Request Model
  - Implementing the Fake Data Endpoint
  - Testing the POST Endpoint
  - Next Steps
  - Links and References
  - Watch Video

---

## Content

GitHub Copilot Certification

Using Copilot Efficiently

# Building out our tool Creating the API

In this tutorial, we’ll import fake data from a CSV into SQLite and then wrap it in a RESTful API using FastAPI—with help from GitHub Copilot. By the end, you'll have a working API that generates and persists fake data.

## Importing Fake Data into SQLite

First, open **DB Browser for SQLite** and create a database called `fake_data_generator.db`. Then import `fake-data.csv` into a table named `fake_data`:

![The image shows a code editor with a CSV file open, displaying a list of fake data entries including names, emails, ages, cities, and occupations. The file is part of a project named "FakeDataGenerator" in a directory structure.](https://kodekloud.com/kk-media/image/upload/v1752876954/notes-assets/images/GitHub-Copilot-Certification-Building-out-our-tool-Creating-the-API/fake-data-generator-csv-editor.jpg)

1.  In DB Browser, choose **File > Import > Table from CSV file**.
2.  Select `fake-data.csv`.
3.  Set the table name to `fake_data`, enable **Column names in the first line**, and click **OK**.

![The image shows a screenshot of a database management application, specifically DB Browser for SQLite, with a CSV import dialog open. It displays options for importing data into a table named "fake_data" and shows a preview of the data with columns like first name, last name, age, and occupation.](https://kodekloud.com/kk-media/image/upload/v1752876955/notes-assets/images/GitHub-Copilot-Certification-Building-out-our-tool-Creating-the-API/db-browser-sqlite-csv-import-dialog.jpg)

> [!important]
> **Note**
>
> Ensure your CSV headers match the column names you want in SQLite. This makes querying and persistence more straightforward.

Once imported, confirm that `fake_data` is populated and ready for queries.

## Scaffolding the Python Project

Open your project root in **VS Code**:

![The image shows a Visual Studio Code interface with a file explorer open on the left, displaying various files. A warning message indicates that a file is not displayed because it is either binary or uses an unsupported text encoding.](https://kodekloud.com/kk-media/image/upload/v1752876956/notes-assets/images/GitHub-Copilot-Certification-Building-out-our-tool-Creating-the-API/vscode-file-explorer-warning-message.jpg)

Create `main.py` to invoke the CLI generator:

```
# main.py
import sys
from fake_data_generator import FakeDataGenerator


def main():
    """
    Entry point for the FakeDataGenerator CLI.
    """
    generator = FakeDataGenerator()
    generator.run()


if __name__ == "__main__":
    main()
```

Open **GitHub Copilot Chat** in VS Code and ask:

```
I would like to create a web API in Python with my existing file.
```

If it suggests the wrong stack (e.g., TypeScript), use the context menu to clear or restart:

![The image shows a code editor with a file directory on the right, and a context menu open with options related to code suggestions or issues.](https://kodekloud.com/kk-media/image/upload/v1752876957/notes-assets/images/GitHub-Copilot-Certification-Building-out-our-tool-Creating-the-API/code-editor-file-directory-menu.jpg)

> [!important]
> **Warning**
>
> Refine prompts carefully. Copilot can veer off into other languages or frameworks if not guided.

## Choosing the Right Framework

Let Copilot compare FastAPI, Flask, and Django REST Framework:

```
Which is the best Python framework for building a web API? List the pros and cons.
```

![The image shows a comparison of pros and cons for FastAPI, Flask, and Django REST Framework, highlighting features like performance, documentation, and community support.](https://kodekloud.com/kk-media/image/upload/v1752876958/notes-assets/images/GitHub-Copilot-Certification-Building-out-our-tool-Creating-the-API/fastapi-flask-django-comparison.jpg)

Here’s a quick comparison:

| Framework             | Pros                                     | Cons                                |
| --------------------- | ---------------------------------------- | ----------------------------------- |
| FastAPI               | High performance, auto-docs, async-ready | Learning curve for async patterns   |
| Flask                 | Lightweight, simple                      | Manual docs, slower for heavy loads |
| Django REST Framework | Batteries-included, admin UI             | Heavier footprint, more boilerplate |

We’ll proceed with **FastAPI** for its speed and automatic documentation.

## Generating the FastAPI Project Structure

Ask Copilot:

```
Create a FastAPI project with best practices.
```

It may suggest:

```
fastapi-project
└── src
    ├── api
    │   └── endpoints
    ├── core
    ├── db
    └── models
```

Open the workspace, rename it to **FakeDataGeneratorAPI**, then:

1.  Move `src` contents to the project root.
2.  Remove unused files (`.env`, `README.md`, etc.).
3.  Add a `tests` folder at the root.

![The image shows a Visual Studio Code interface with a Python project directory structure for a REST API. The left panel displays the file explorer, and the right panel shows a proposed directory structure and a chat with GitHub Copilot.](https://kodekloud.com/kk-media/image/upload/v1752876960/notes-assets/images/GitHub-Copilot-Certification-Building-out-our-tool-Creating-the-API/vscode-python-rest-api-directory.jpg)

Final layout:

```
FakeDataGeneratorAPI
├── api
│   └── endpoints
├── core
├── db
├── models
├── main.py
└── tests
```

Use Copilot iteratively until you’re happy:

![The image shows a Visual Studio Code interface with a project directory structure for a FastAPI project, including various Python files and folders. The right panel displays a GitHub Copilot chat discussing the setup of the project.](https://kodekloud.com/kk-media/image/upload/v1752876961/notes-assets/images/GitHub-Copilot-Certification-Building-out-our-tool-Creating-the-API/vscode-fastapi-project-structure.jpg)

## Implementing the FastAPI Application

Install dependencies:

```
pip install fastapi uvicorn
```

Create `main.py` at the root:

```
# main.py
from fastapi import FastAPI
from api.endpoints.router import router


app = FastAPI(title="FakeDataGeneratorAPI")
app.include_router(router, prefix="/api")


@app.get("/")
async def read_root():
    return {"message": "Welcome to FakeDataGeneratorAPI"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

Run and verify:

```
python main.py
# Visit http://localhost:8000
```

## Defining the Database Dependency

In `db/database.py`, configure SQLAlchemy for SQLite:

```
# db/database.py
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


DATABASE_URL = "sqlite:///./fake_data_generator.db"


engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    """
    Yields a database session and ensures it closes after use.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

## Creating the Pydantic Request Model

Define `models/fake_data_request.py`:

```
# models/fake_data_request.py
from pydantic import BaseModel
from typing import Optional


class FakeDataRequest(BaseModel):
    """
    Schema for fake data generation requests.
    """
    data_type: str            # e.g., 'name', 'email'
    count: int                # number of records to generate
    locale: Optional[str] = "en_US"
```

## Implementing the Fake Data Endpoint

Install Faker:

```
pip install faker
```

Add `/getfakedata` in `api/endpoints/router.py`:

```
# api/endpoints/router.py
from fastapi import APIRouter, HTTPException, Depends
from faker import Faker
from sqlalchemy.orm import Session
from models.fake_data_request import FakeDataRequest
from db.database import get_db


router = APIRouter()


@router.post("/getfakedata")
async def generate_fake_data(
    request: FakeDataRequest,
    db: Session = Depends(get_db)
) -> dict:
    """
    Generate and return fake data based on request parameters.
    """
    fake = Faker(request.locale)
    if not hasattr(fake, request.data_type):
        raise HTTPException(
            status_code=400,
            detail=f"Invalid data_type: {request.data_type}"
        )


    data = [getattr(fake, request.data_type)() for _ in range(request.count)]
    # TODO: Persist `data` to the database using `db`
    return {"data": data}
```

## Testing the POST Endpoint

Send this request:

```
POST http://localhost:8000/api/getfakedata
Content-Type: application/json


{
  "data_type": "name",
  "count": 3
}
```

Expected response:

```
{
  "data": [
    "John Doe",
    "Jane Smith",
    "Michael Johnson"
  ]
}
```

## Next Steps

- Persist generated records into SQLite.
- Add OpenAPI metadata and detailed endpoint docs.
- Write tests in `tests/` to validate both database and API layers.

## Links and References

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [SQLAlchemy ORM Tutorial](https://docs.sqlalchemy.org/en/14/orm/tutorial.html)
- [Pydantic Docs](https://pydantic-docs.helpmanual.io/)
- [Faker Library](https://faker.readthedocs.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-copilot-certification/module/a8b1c2a2-f3f7-4470-9347-0ad31f2ab3cc/lesson/6d744be0-5629-41a8-9435-1cde4802185b)**
>
> Watch video content
