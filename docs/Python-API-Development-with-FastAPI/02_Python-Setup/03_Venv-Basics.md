# Venv Basics - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Python-Setup/Venv-Basics)

---

## Table of Contents

- Venv Basics
  - Understanding Virtual Environments
  - Creating Your First Virtual Environment
  - Watch Video

---

## Content

Python API Development with FastAPI

Python Setup

# Venv Basics

Now that Python and VS Code are set up, the next step is to create a virtual environment for your project. Virtual environments are essential for isolating project dependencies and preventing version conflicts.

## Understanding Virtual Environments

Imagine you have two projects:

- **Project One** requires FastAPI version 1.2.1.
- **Project Two** requires FastAPI version 2.4.3.

If FastAPI were installed globally and you upgraded to version 2.4.3 for Project Two, Project One might break if version 2.4.3 lacks backward compatibility with version 1.2.1. Virtual environments solve this problem by allowing you to install packages locally, ensuring that each project has its own separate dependencies.

> [!important]
> **Note**
>
> Using virtual environments ensures that different projects can use different versions of the same package without conflicts. This isolation is crucial for maintaining stability across your projects.

For example:

- In **Project One**, you can create a virtual environment (e.g., named "venv1") and install FastAPI version 1.2.1.
- In **Project Two**, create another virtual environment (e.g., "venv2") and install FastAPI version 2.4.3.

This method keeps your projects separate and avoids any unintended version conflicts.

![The image illustrates the structure of Python virtual environments for two projects, each with its own virtual environment and version of FastAPI.](https://kodekloud.com/kk-media/image/upload/v1752883461/notes-assets/images/Python-API-Development-with-FastAPI-Venv-Basics/python-virtual-environments-fastapi.jpg)

Each virtual environment is completely isolated, allowing you to work on multiple projects simultaneously without worrying about shared dependencies interfering with each other.

## Creating Your First Virtual Environment

With this understanding in hand, you're ready to create your first virtual environment and manage your project's dependencies. Follow the steps below to get started:

1.  Open your project folder in VS Code.
2.  Open the integrated terminal.
3.  Run the following command to create a virtual environment (replace "venv" with your preferred name):

    ```
    python -m venv venv
    ```

4.  Activate the virtual environment:
    - On Windows:

      ```
      venv\Scripts\activate
      ```

    - On macOS and Linux:

      ```
      source venv/bin/activate
      ```

5.  Once activated, you can install packages like FastAPI without affecting the global Python environment.

Moving forward, always ensure your virtual environment is activated before installing new packages or running your project. This practice helps maintain consistency and avoids potential conflicts.

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/441565b9-9f18-459f-9b0b-252b1caff7b1/lesson/d4a5561d-da6c-44df-a150-d4ea3b205b31)**
>
> Watch video content
