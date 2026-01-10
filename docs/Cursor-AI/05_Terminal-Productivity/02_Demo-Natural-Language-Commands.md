# Demo Natural Language Commands - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Cursor-AI/Terminal-Productivity/Demo-Natural-Language-Commands)

---

## Table of Contents

- Demo Natural Language Commands
  - Prerequisites
  - 1. Open the Integrated Terminal
  - 2. Generate a Flask API Project
  - 3. Set Up a Python Virtual Environment
  - 4. Install Testing and Database Drivers
  - 5. Handling Import Errors
  - 6. Best Practices for Natural Language Commands
  - Links and References
  - Watch Video

---

## Content

Cursor AI

Terminal Productivity

# Demo Natural Language Commands

Explore how Cursor’s integrated terminal—powered by Visual Studio Code—lets you run plain-language instructions to automate your development workflow.

## Prerequisites

- Visual Studio Code with Cursor AI extension installed
- Python 3.x and `venv` support
- Z Shell (Zsh) configured as your default shell

## 1\. Open the Integrated Terminal

Open the terminal via **Terminal > New Terminal** (or press Ctrl+ `on Windows/Linux, ⌘+` on macOS). You’ll start in a Z Shell session:

```
jeremy@MACSTUDIO kodekloud1 % ps
  PID   TTY          TIME CMD
 70600 ttys000    0:00.00 -zsh
 80016 ttys002    0:00.01 /bin/zsh -i
 80061 ttys006    0:00.02 /bin/zsh -i
jeremy@MACSTUDIO kodekloud1 % ls -la
total 0
drwxr-xr-x   2 jeremy  staff   64 Mar 24 21:26 .
drwxr-xr-x  28 jeremy  staff  896 Mar 24 21:26 ..
```

| Action          | Shortcut / Command       | Description                               |
| --------------- | ------------------------ | ----------------------------------------- |
| Open Terminal   | Ctrl+ `/ ⌘+`             | Launches the integrated terminal          |
| Command Palette | Ctrl+Shift+P / ⌘+Shift+P | Opens the Command Palette for NL commands |

## 2\. Generate a Flask API Project

Invoke the Command Palette (Ctrl+Shift+P / ⌘+Shift+P) and type your natural-language instruction:

> “Create a Flask API project with SQLAlchemy.”

After hitting Enter, Cursor AI runs:

```
jeremy@MACSTUDIO kodekloud1 % mkdir -p app/models app/routes \
  && touch app/__init__.py app/models/__init__.py app/routes/__init__.py \
  && echo -e "flask\nflask-sqlalchemy\nflask-migrate" > requirements.txt
```

## 3\. Set Up a Python Virtual Environment

Next, ask:

> “Create a Python virtual environment and activate it.”

```
jeremy@MACSTUDIO kodekloud1 % python3 -m venv venv && source venv/bin/activate
(venv) jeremy@MACSTUDIO kodekloud1 %
```

> [!important]
> **Note**
>
> Using virtual environments isolates dependencies per project. Always activate your `venv` before installing packages.

## 4\. Install Testing and Database Drivers

Ask Cursor AI:

> “Install PyTest and the PostgreSQL driver.”

```
(venv) jeremy@MACSTUDIO kodekloud1 % pip install pytest psycopg2-binary
Collecting pytest
  Downloading pytest-8.3.5-py3-none-any.whl
Collecting psycopg2-binary
  Downloading psycopg2_binary-2.9.10-cp313-cp313-macosx_*.whl
Successfully installed pytest-8.3.5 psycopg2-binary-2.9.10
```

Then update your `requirements.txt`:

```
(venv) jeremy@MACSTUDIO kodekloud1 % pip freeze > requirements.txt
```

## 5\. Handling Import Errors

If you encounter:

```
ModuleNotFoundError: No module named 'flask_sqlalchemy'
```

simply instruct Cursor AI:

```
(venv) jeremy@MACSTUDIO kodekloud1 % pip install flask-sqlalchemy
```

## 6\. Best Practices for Natural Language Commands

| Best Practice                 | Description                                                          |
| ----------------------------- | -------------------------------------------------------------------- |
| Be Specific Yet Concise       | Focus on required packages, directories, or flags without fluff.     |
| Include Essential Details     | Specify file names, frameworks, or versions in your instruction.     |
| Iterate: Run, Observe, Refine | Adjust your prompt based on Cursor’s output for accuracy.            |
| Combine Related Tasks         | Group folder creation, file initialization, and dependency installs. |
| Learn from AI Suggestions     | Study generated commands to level up your CLI proficiency.           |

> [!important]
> **Warning**
>
> Overly vague instructions may lead to unexpected operations. Always review generated commands before executing.

---

By leveraging Cursor AI’s natural language commands, you reduce context switching and automate routine setup tasks. Extend this workflow to SSH sessions, container orchestrations, and more advanced development scenarios.

## Links and References

- [Visual Studio Code Integrated Terminal](https://code.visualstudio.com/docs/editor/integrated-terminal)
- [Cursor AI Extension](https://marketplace.visualstudio.com/)
- [Python `venv` Documentation](https://docs.python.org/3/library/venv.html)
- [Flask Official Docs](https://flask.palletsprojects.com/)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)
- [pytest Documentation](https://docs.pytest.org/)
- [psycopg2-binary on PyPI](https://pypi.org/project/psycopg2-binary/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cursor-ai/module/90a13f7e-74a3-4207-8c34-c81c14757507/lesson/bfdf5529-37b9-4663-8b78-a73acb77e7e7)**
>
> Watch video content
