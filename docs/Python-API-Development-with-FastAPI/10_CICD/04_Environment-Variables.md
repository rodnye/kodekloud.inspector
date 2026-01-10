# Environment Variables - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/CICD/Environment-Variables)

---

## Table of Contents

- Environment Variables
  - Job-Specific Environment Variables
  - Conditional Environment Variables
  - Global Environment Variables
  - Handling Workflow Errors
  - Summary
  - Watch Video

---

## Content

Python API Development with FastAPI

CICD

# Environment Variables

Environment variables play a critical role in configuring your CI/CD workflows. They can be defined either globally for all jobs or specifically for an individual job. This guide explains how to set these variables effectively within your workflow file while keeping them secure and appropriately scoped.

## Job-Specific Environment Variables

Defining environment variables at the job level ensures that they are accessible only within that particular job. For instance, if you have a job named "job1", you can set a variable by adding an `env` section to that job. In the following example, the environment variable for the database hostname is set to "localhost":

```
name: Build and Deploy Code

on: [push, pull_request]

jobs:
  job1:
    runs-on: ubuntu-latest
    env:
      DATABASE_HOSTNAME: localhost
    steps:
      - name: Pull Git repository
        uses: actions/checkout@v2
      - name: Install Python 3.9
        uses: actions/setup-python@v2
        with:
          python-version: "3.9"
      - name: Update pip
        run: python -m pip install --upgrade pip
      - name: Install all dependencies
        run: pip install -r requirements.txt
      - name: Test with pytest
        run: |
          pip install pytest
          pytest
```

In this scenario, the variable `DATABASE_HOSTNAME` is limited to `job1`. When you need to add other environment-specific variables, follow the same approach to ensure each variable is available only where necessary.

## Conditional Environment Variables

You can also set multiple environment variables dynamically based on certain conditions. Consider the example below in which a job runs only on a specific day:

```
jobs:
  weekday_job:
    runs-on: ubuntu-latest
    steps:
      - name: "Hello world when it's Monday"
        if: ${{ env.DAY_OF_WEEK == 'Mon' }}
        run: echo "Hello ${{ steps.firstname.outputs.middle_name }} ${{ steps.firstname.outputs.last_name }}, today is Monday!"
        env:
          FIRST_NAME: Mona
          middle_name: The
          LAST_NAME: Octocat
```

This snippet demonstrates how to set several environment variables that the job will use if the condition evaluates to true.

## Global Environment Variables

For scenarios where an environment variable needs to be accessible by all jobs in your workflow, define it at the root level. The example below demonstrates setting several global environment variables:

```
name: Build and Deploy Code
on: [push, pull_request]

env:
  DATABASE_HOSTNAME: localhost
  DATABASE_PORT: 5432
  DATABASE_PASSWORD: password123
  DATABASE_NAME: fastapi
  DATABASE_USERNAME: postgres
  SECRET_KEY: 09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b888d3e7
  ALGORITHM: HS256
  ACCESS_TOKEN_EXPIRE_MINUTES: 30

jobs:
  job1:
    runs-on: ubuntu-latest
    steps:
      - name: Pull Git repository
        uses: actions/checkout@v2
      - name: Install Python 3.9
        uses: actions/setup-python@v2
        with:
          python-version: "3.9"
      - name: Update pip
        run: python -m pip install --upgrade pip
      - name: Install all dependencies
        run: pip install -r requirements.txt
      - name: Test with pytest
        run: |
          pip install pytest
          pytest
```

Here, all jobs within this workflow will have access to the global environment variables. However, keep in mind that any variable set at the job level will override the global setting for that job only.

> [!important]
> **Security Consideration**
>
> It is crucial to avoid hardcoding sensitive information such as database credentials or secret keys in your repository. For improved security, store such data as encrypted secrets in your CI/CD system so that they remain concealed yet accessible during runtime.

## Handling Workflow Errors

When testing your workflow, you might encounter issues, especially if your runner lacks the necessary infrastructure. For example, if an environment variable points to a local database (`localhost`) that isn’t actually available on the runner, you may see SQLAlchemy connection failures:

```
Error: Process completed with exit code 4.
```

This behavior is expected when using a temporary environment like a fresh runner. To resolve this, consider setting up a temporary database on the runner or configure the workflow to use a remote database service (such as on [Heroku](https://www.heroku.com/) or [AWS](https://aws.amazon.com/)).

Below is a snippet from a typical runner log, indicating that the environment variables are correctly used as it installs dependencies and executes tests:

```
pip install pytest
pytest
shell: /usr/bin/bash -c {0}
env:
  DATABASE_HOSTNAME: localhost
  DATABASE_PORT: 5432
  DATABASE_PASSWORD: password123
  DATABASE_NAME: fastapi
  DATABASE_USERNAME: postgres
  SECRET_KEY: 92e3456fabc256688167b956393799f60f4caafc6f80b83e7
  ALGORITHM: HS256
  ACCESS_TOKEN_EXPIRE_MINUTES: 30
  PYTHONPATH: ./python:./app
Collecting pytest
  Downloading pytest-6.2.5-py3-none-any.whl (280 kB)
Collecting attrs>=19.2.0
  Downloading attrs-21.2.0-py2.py3-none-any.whl (53 kB)
...
```

## Summary

Environment variables in your CI/CD workflows can be defined at both the job and global levels, providing flexibility and scope isolation. Job-specific variables ensure that only relevant jobs have access, whereas global variables facilitate shared configurations across multiple jobs. Tailor your environment setup according to your testing environment and security requirements.

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/4979410a-af57-460b-8f71-5a177fa10d2d/lesson/ec656f7d-b5c2-4654-91d8-570cfd938d63)**
>
> Watch video content
