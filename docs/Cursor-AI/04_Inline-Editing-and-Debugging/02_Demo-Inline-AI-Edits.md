# Demo Inline AI Edits - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Cursor-AI/Inline-Editing-and-Debugging/Demo-Inline-AI-Edits)

---

## Table of Contents

- Demo Inline AI Edits
  - Why Inline AI Editing?
  - Example: Simple Flask Authentication
  - Inline Prompt vs Separate Chat
  - Generating a Helper Function Inline
  - Evolving Code with Inline Edits
  - When to Use Each Mode
  - Links and References
  - Watch Video

---

## Content

Cursor AI

Inline Editing and Debugging

# Demo Inline AI Edits

In this guide, you’ll learn how to use inline AI-assisted editing directly within your code editor. We’ll compare two common modes—**separate chat windows** versus **inline prompts**—and demonstrate how inline editing can streamline your workflow and reduce context switching.

## Why Inline AI Editing?

- Keeps you in the flow of coding
- Provides suggestions as diffs you can accept or reject
- Accelerates prototyping, refactoring, and helper-function generation

> [!important]
> **Note**
>
> Inline prompts work best for focused, localized changes. For broad design discussions, consider a separate chat to maintain context.

---

## Example: Simple Flask Authentication

Below is a minimal Flask app that demonstrates password hashing, an authentication decorator, and basic routes. We’ll use this code to show inline AI-powered enhancements.

```
# app.py
import hashlib
import functools
from flask import Flask, request, session, redirect, url_for, flash


app = Flask(__name__)
app.secret_key = 'your-secret-key'


def hash_password(password: str) -> str:
    """Simple password hashing (not secure for production)."""
    return hashlib.sha1(password.encode()).hexdigest()


def login_required(view):
    """Decorator to ensure a user is logged in."""
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        if 'user_id' not in session:
            return redirect(url_for('login'))
        return view(**kwargs)
    return wrapped_view


@app.route('/')
def index():
    if 'user_id' in session:
        return redirect(url_for('dashboard'))
    return redirect(url_for('login'))


@app.route('/register', methods=['GET', 'POST'])
def register():
    error = None
    if request.method == 'POST':
        username = request.form.get('username', '').strip()
        password = request.form.get('password', '').strip()
        if not username:
            error = 'Username is required.'
        elif not password:
            error = 'Password is required.'
        else:
            # Insert user into the database...
            pass
    return f"Register Page. Error: {error}"
```

> [!important]
> **Warning**
>
> Using SHA-1 for password hashing is not secure for production. Consider `bcrypt` or `scrypt` for real-world applications.

---

## Inline Prompt vs Separate Chat

Most AI coding tools offer two modes. Choose based on your task:

| Mode          | Shortcut           | Best Use Cases                                       |
| ------------- | ------------------ | ---------------------------------------------------- |
| Separate Chat | Command L / Ctrl L | Deep discussions, design reviews, large refactors    |
| Inline Prompt | Command K / Ctrl K | Quick edits, helper functions, localized refactoring |

---

## Generating a Helper Function Inline

1.  Highlight the code location.
2.  Invoke the inline prompt (⌘-K / Ctrl-K).
3.  Ask for a helper function, e.g., _“Create a function to reverse a string.”_

The AI will generate:

```
def reverse_string(s: str) -> str:
    """
    Reverses a string.


    Args:
        s (str): The string to reverse.


    Returns:
        str: The reversed string.
    """
    return s[::-1]
```

Green lines indicate additions; red lines show removals. Press **⌘-Y / Ctrl-Y** to accept or **⌘-N / Ctrl-N** to reject.

---

## Evolving Code with Inline Edits

You can request optimizations or new features inline. For example, add logging and error handling to your `login_required` decorator:

```
def login_required(view):
    """Decorator to ensure a user is logged in, with logging and error handling."""
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        try:
            if 'user_id' not in session:
                app.logger.warning(f"Unauthorized access attempt to {request.path}")
                flash("Please log in to access this page", "error")
                return redirect(url_for('login'))
            return view(**kwargs)
        except Exception as e:
            app.logger.error(f"Error in login_required decorator: {e}")
            flash("An unexpected error occurred. Please try again.", "error")
            return redirect(url_for('login'))
    return wrapped_view
```

By refining code inline, you maintain momentum and iterate faster on performance, security, and feature improvements.

---

## When to Use Each Mode

- **Separate Chat**
  - Deep architectural discussions
  - Reviewing or documenting large codebases
- **Inline Prompt**
  - Fast helper functions
  - Small bug fixes or refactors
  - Localized testing and debugging

Experiment with both to find the balance that boosts your productivity and minimizes context switching.

---

## Links and References

- [Flask Documentation](https://flask.palletsprojects.com/)
- [Python `hashlib` Module](https://docs.python.org/3/library/hashlib.html)
- [bcrypt on PyPI](https://pypi.org/project/bcrypt/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cursor-ai/module/d1d14592-151e-49c5-912f-1070dae4d5a8/lesson/7a7f60e2-e53c-4291-a0f9-0c2486a20650)**
>
> Watch video content
