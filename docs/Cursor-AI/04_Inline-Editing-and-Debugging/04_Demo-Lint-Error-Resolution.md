# Demo Lint Error Resolution - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Cursor-AI/Inline-Editing-and-Debugging/Demo-Lint-Error-Resolution)

---

## Table of Contents

- Demo Lint Error Resolution
  - Table of Contents
  - 1. Install Linters and Formatters
  - 2. Configure Pylint
  - 3. Running and Fixing Pylint Errors
  - 4. Example Application Snippet
  - 5. Database Schema Definition
  - 6. Automating Lint Fixes
  - 7. References
  - Watch Video
    - 3.1 Trailing Whitespace (C0303)
    - 3.2 Missing Final Newline (C0304)
    - 3.3 Import Order (C0411)
    - 3.4 Missing Docstrings (C0116)
    - 3.5 Redefining Built-ins (W0622)

---

## Content

Cursor AI

Inline Editing and Debugging

# Demo Lint Error Resolution

In this guide, we’ll walk through resolving linting errors in a Python project using Flake8, Pylint, and isort. You’ll learn how to install and configure these tools, run them against your codebase, and fix common issues such as trailing whitespace, missing newlines, import order problems, and missing docstrings. By the end, your Python code will be more readable, consistent, and PEP 8–compliant.

## Table of Contents

1.  [Install Linters and Formatters](#1-install-linters-and-formatters)
2.  [Configure Pylint](#2-configure-pylint)
3.  [Running and Fixing Pylint Errors](#3-running-and-fixing-pylint-errors)
    - 3.1 [Trailing Whitespace (C0303)](#31-trailing-whitespace-c0303)
    - 3.2 [Missing Final Newline (C0304)](#32-missing-final-newline-c0304)
    - 3.3 [Import Order (C0411)](#33-import-order-c0411)
    - 3.4 [Missing Docstrings (C0116)](#34-missing-docstrings-c0116)
    - 3.5 [Redefining Built-ins (W0622)](#35-redefining-built-ins-w0622)
4.  [Example Application Snippet](#4-example-application-snippet)
5.  [Database Schema Definition](#5-database-schema-definition)
6.  [Automating Lint Fixes](#6-automating-lint-fixes)
7.  [References](#7-references)

---

## 1\. Install Linters and Formatters

Install Flake8, Pylint, isort, and their dependencies:

```
pip install flake8 pylint isort tomlkit pyflakes pycodestyle mccabe
```

Verify installation:

```
Successfully installed flake8-7.1.2 pylint-3.3.6 isort-5.12.0 ...
```

| Tool   | Purpose                      | Command         |
| ------ | ---------------------------- | --------------- |
| Flake8 | Combined style & error check | `flake8 .`      |
| Pylint | Static code analysis         | `pylint app.py` |
| isort  | Automatic import sorting     | `isort .`       |

## 2\. Configure Pylint

Create a `.pylintrc` at the project root:

```
[MASTER]
jobs=1


[MESSAGES CONTROL]
disable=
    C0114,  # Missing module docstring
    C0115,  # Missing class docstring
    C0116   # Missing function docstring


[REPORTS]
output-format=colorized
score=yes
reports=no


[FORMAT]
max-line-length=79
indent-string=' '
indent-after-paren=4
expected-line-ending-format=LF


[DESIGN]
max-args=5
max-locals=15
```

> [!important]
> **Note**
>
> Adjust `max-line-length` and other limits to match your team's style guide.

## 3\. Running and Fixing Pylint Errors

Run Pylint on your main file:

```
pylint app.py
```

Sample output:

```
app.py:14:4: C0303: Trailing whitespace
app.py:136:0: C0304: Final newline missing
app.py:144:0: C0116: Missing function docstring
...
Your code has been rated at 7.11/10
```

| Code  | Description                | Fix Example                        |
| ----- | -------------------------- | ---------------------------------- |
| C0303 | Trailing whitespace        | Remove trailing spaces on a line   |
| C0304 | Missing final newline      | Add a blank line at end of file    |
| C0116 | Missing function docstring | Write a docstring for the function |
| C0411 | Incorrect import order     | Group and reorder imports          |
| W0622 | Redefining built-in        | Rename variable to avoid shadowing |

### 3.1 Trailing Whitespace (C0303)

Before:

```
@app.route('/dashboard')
@login_required
def dashboard():
    ...
```

Remove the extra spaces:

```
pylint app.py
```

### 3.2 Missing Final Newline (C0304)

Add a blank line at the end:

```
-    return result
+    return result
+
```

### 3.3 Import Order (C0411)

Incorrect:

```
import flask
from datetime import datetime
```

Correct:

```
import os
from datetime import datetime


import flask
from flask import Flask
```

Automatically sort imports:

```
isort app.py
```

### 3.4 Missing Docstrings (C0116)

Before:

```
def get_db():
    if 'db' not in g:
        ...
    return g.db
```

After adding:

```
def get_db():
    """Return a database connection, creating it if necessary."""
    if 'db' not in g:
        ...
    return g.db
```

### 3.5 Redefining Built-ins (W0622)

Rename variables that shadow built-ins:

Before:

```
def get_task(id):
    # ...
```

After:

```
def get_task(task_id):
    # ...
```

## 4\. Example Application Snippet

```
from flask import Flask, render_template, request, redirect, url_for, flash, session, g
from datetime import datetime
import os
import sqlite3
import csv


# Initialize Flask app
app = Flask(__name__)
app.config['SECRET_KEY'] = 'dev'  # Use a secure random key in production
app.config['DATABASE'] = os.path.join(app.instance_path, 'task_manager.sqlite')


def read_csv(file_path):
    """Read and print rows from a CSV file."""
    with open(file_path, 'r', encoding='utf-8') as f:
        csvreader = csv.reader(f)
        for row in csvreader:
            print(row)


# Ensure the instance folder exists
try:
    os.makedirs(app.instance_path)
except OSError:
    pass


def get_db():
    """Get or create the SQLite database connection."""
    if 'db' not in g:
        g.db = sqlite3.connect(
            app.config['DATABASE'],
            detect_types=sqlite3.PARSE_DECLTYPES
        )
        g.db.row_factory = sqlite3.Row
    return g.db


def close_db(e=None):
    """Close the database connection if it exists."""
    db = g.pop('db', None)
    if db is not None:
        db.close()


@app.teardown_appcontext
def teardown_db(exception):
    """Teardown database connection after request."""
    close_db()
```

## 5\. Database Schema Definition

```
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS tasks;


CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL
);


CREATE TABLE tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by INTEGER NOT NULL,
    assigned_to INTEGER NOT NULL,
    FOREIGN KEY (created_by) REFERENCES users (id),
    FOREIGN KEY (assigned_to) REFERENCES users (id)
);
```

## 6\. Automating Lint Fixes

You can integrate AI assistants or editor plugins to highlight lint errors and suggest fixes inline. For example, selecting an error message and asking “Help me fix this error” can automatically apply minor corrections like adding newlines or renaming variables.

> [!important]
> **Warning**
>
> Relying solely on automated fixes may overlook context-specific issues. Always review changes before committing.

## 7\. References

- [Flake8 Documentation](https://flake8.pycqa.org/)
- [Pylint Documentation](https://pylint.pycqa.org/)
- [isort Documentation](https://pycqa.github.io/isort/)
- [PEP 8 – Style Guide for Python Code](https://peps.python.org/pep-0008/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cursor-ai/module/d1d14592-151e-49c5-912f-1070dae4d5a8/lesson/90fdaf83-1575-4804-9513-16f836f9becc)**
>
> Watch video content
