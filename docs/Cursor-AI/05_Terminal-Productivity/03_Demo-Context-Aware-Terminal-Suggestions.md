# Demo Context Aware Terminal Suggestions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Cursor-AI/Terminal-Productivity/Demo-Context-Aware-Terminal-Suggestions)

---

## Table of Contents

- Demo Context Aware Terminal Suggestions
  - Project Context Overview
  - 1. Installing PyTest and Updating Dependencies
  - 2. Generating a Test Suite
  - 3. Running Tests and Interpreting Failures
  - 4. Profiling Data Processing
  - 5. Handling Port Conflicts
  - Best Practices for Context-Aware Commands
  - Inline Terminal Questions
  - Links and References
  - Watch Video
    - Example Prompt Context

---

## Content

Cursor AI

Terminal Productivity

# Demo Context Aware Terminal Suggestions

In this lesson, we explore how Cursor AI leverages your project’s full context—its file structure, code contents, environment variables, and more—to generate precise, actionable terminal commands.

## Project Context Overview

Below is the entry point for our Flask-based Task Manager. Cursor AI reads this file to understand imports, configuration, and helper functions:

```
# app.py
import csv
import sqlite3
import os
from flask import Flask, render_template, request, redirect, url_for, flash, session, g
from datetime import datetime
import hashlib
import logging


# Initialize Flask app
app = Flask(__name__)
app.config['SECRET_KEY'] = 'dev'  # Change this to a random secret key in production
app.config['DATABASE'] = os.path.join(app.instance_path, 'task_manager.sqlite')


def read_csv(file_path):
    """Read and print rows from a CSV file."""
    with open(file_path, 'r') as f:
        csvreader = csv.reader(f)
        for row in csvreader:
            print(row)


# Ensure the instance folder exists
os.makedirs(app.instance_path, exist_ok=True)


def init_db():
    """Initialize the SQLite database with the required schema."""
    conn = sqlite3.connect(app.config['DATABASE'])
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS tasks (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        title TEXT NOT NULL,
                        description TEXT,
                        due_date TEXT,
                        created_at TEXT NOT NULL
                      )''')
    conn.commit()
    conn.close()
```

With this context loaded, Cursor AI can suggest commands and scaffolding that align perfectly with your codebase.

## 1\. Installing PyTest and Updating Dependencies

To add testing support to your project:

```
pip install pytest
pip freeze | grep pytest >> requirements.txt
```

You can prompt Cursor AI with:

> Install PyTest and update requirements.txt

…and it will execute the above two commands for you.

> [!important]
> **Note**
>
> Pin your test dependencies to avoid version conflicts. For example, add `pytest>=8.0,<9.0` in your `requirements.txt`.

## 2\. Generating a Test Suite

Cursor AI can scaffold test files based on your code structure. For example:

```
touch tests/test_app.py
```

And populate it with:

```
# tests/test_app.py
import os
import tempfile
import pytest
from app import app, init_db


@pytest.fixture
def client():
    # Create a temporary database
    db_fd, app.config['DATABASE'] = tempfile.mkstemp()
    app.config['TESTING'] = True


    with app.test_client() as client:
        with app.app_context():
            init_db()
        yield client


    os.close(db_fd)
    os.unlink(app.config['DATABASE'])


def test_delete_task(client):
    response = client.post('/task/1/delete', follow_redirects=True)
    assert response.status_code == 200
    assert b'Task deleted successfully!' in response.data
    assert b'Test Task' not in response.data
```

## 3\. Running Tests and Interpreting Failures

To run your tests:

```
python -m pytest tests/test_app.py
```

Example output:

```
=================================== test session starts ====================================
platform darwin -- Python 3.13.1, pytest-8.3.5, pluggy-1.5.0
rootdir: /Users/jeremy/Projects/KodeKloudTaskManager
collected 6 items


tests/test_app.py .....F.                                                        [100%]
========================================= FAILURES =========================================
___________________________________ test_register __________________________________________


    def test_register(client):
>       assert b'Account created successfully!' in response.data
E       AssertionError: assert b'Account created successfully!' in b'<!DOCTYPE html>\n<html lang="en">\n<head>...'
```

Failures like these are expected. Refining your prompt—by specifying file paths, function names, or expected output—will help Cursor AI generate more accurate assertions.

## 4\. Profiling Data Processing

To profile your `app.py` or any CPU-bound function:

```
python -m cProfile -o profile.stats app.py
```

Analyze the results:

```
197138 function calls (190006 primitive calls) in 0.138 seconds


   ncalls  tottime  percall  cumtime  percall filename:lineno(function)
   ...
```

## 5\. Handling Port Conflicts

When you start the Flask server and port 5000 is occupied, you’ll see an error:

```
OSError: [Errno 98] Address already in use
```

> [!important]
> **Warning**
>
> If you encounter a port conflict, restart the server on a different port:
>
> ```
> flask run --port=5001
> ```

## Best Practices for Context-Aware Commands

| Best Practice                      | Description                                                                       |
| ---------------------------------- | --------------------------------------------------------------------------------- |
| Provide a Project Overview         | Explain your app’s framework (e.g., Flask), directory layout, and key components. |
| Reference Actual Files and Paths   | Use exact file names like `app.py` or `tests/test_app.py` in your prompt.         |
| Specify Environment Details        | Include Python version, virtual environment name, and dependency constraints.     |
| Define Constraints or Requirements | For example: “Use `httpx` instead of `requests`” or “No global variables.”        |

### Example Prompt Context

```
This is a Flask project at ~/Projects/KodeKloudTaskManager.
I want to run only tests in tests/test_app.py using Python 3.13.1 in my venv.
```

## Inline Terminal Questions

You can ask quick questions directly in the terminal:

```
# Ask: What is pylintrc?
```

Cursor AI responds:

> A `.pylintrc` file is the configuration for [pylint](https://pylint.org/), a static code analysis tool for Python.

---

## Links and References

- [Flask Documentation](https://flask.palletsprojects.com/en/latest/)
- [pytest Documentation](https://docs.pytest.org/en/stable/)
- [cProfile Usage Guide](https://docs.python.org/3/library/profile.html)
- [pylint Configuration](https://pylint.org/)
- [Stack Overflow](https://stackoverflow.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cursor-ai/module/90a13f7e-74a3-4207-8c34-c81c14757507/lesson/33201b75-117a-4299-9be5-9f8fe1651fd3)**
>
> Watch video content
