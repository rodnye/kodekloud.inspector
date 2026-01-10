# Configuring Python in Pipeline - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/CICD/Configuring-Python-in-Pipeline)

---

## Table of Contents

- Configuring Python in Pipeline
  - 1. Checking Out the Repository
  - 2. Setting Up Python
  - 3. Upgrading pip and Installing Dependencies
  - 4. Running Tests with Pytest
  - 5. Observing the Workflow Run
  - Conclusion
  - Watch Video

---

## Content

Python API Development with FastAPI

CICD

# Configuring Python in Pipeline

In this guide, we elevate our GitHub Actions workflow by configuring Python, upgrading pip, installing dependencies, and running tests with Pytest. Follow the steps below to create an efficient CI/CD pipeline tailored for Python projects.

---

## 1\. Checking Out the Repository

The first step in our workflow is to pull the Git repository. This ensures that all subsequent actions have access to the latest version of your code. For example:

```
name: Build and Deploy Code
on: [push, pull_request]

jobs:
  job1:
    runs-on: ubuntu-latest
    steps:
      - name: Pull Git Repository
        uses: actions/checkout@v2
```

After the checkout step, the logs typically display output similar to:

```
Enumerating objects: 31, done.
Counting objects: 100% (31/31), done.
Delta compression using up to 12 threads
Compressing objects: 100% (15/15), done.
Writing objects: 100% (17/17), 4.37 KiB | 1.46 MiB/s, done.
Total 17 (delta 8), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (8/8), completed with 8 local objects.
To https://github.com/Sanjeev-Thiyagarajan/fastapi-course.git
   809eaz27..5f6a415  main -> main
```

---

## 2\. Setting Up Python

It is possible to install Python manually (e.g., using `sudo apt install python3`), but using a pre-built GitHub Action simplifies the process considerably. The [actions/setup-python@v2](https://github.com/actions/setup-python) action not only installs Python but also lets you test your code against multiple Python versions if needed. In this guide, we will configure Python version 3.9.

```
name: Build and Deploy Code
on: [push, pull_request]
jobs:
  job1:
    runs-on: ubuntu-latest
    steps:
      - name: Pull Git Repository
        uses: actions/checkout@v2
      - name: Install Python version 3.9
        uses: actions/setup-python@v2
        with:
          python-version: "3.9"
```

Upon successful installation, the console will display messages confirming that Python has been configured correctly:

```
Enumerating objects: 31, done.
Counting objects: 100% (31/31), done.
Delta compression using up to 12 threads
Compressing objects: 100% (15/15), done.
Writing objects: 100% (17/17), 4.37 KiB | 1.46 MiB/s, done.
Total 21 (delta 0), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (8/8), completed with 8 local objects.
To https://github.com/Sanjeev-Thiyagarajan/fastapi-course.git
   89e2a27..5f6a15  main -> main
```

For visual reference, see the image below which shows the GitHub page for the Python setup action:

![The image shows a GitHub page for "Setup Python," detailing a GitHub Action for setting up a Python environment, including features and usage instructions.](https://kodekloud.com/kk-media/image/upload/v1752883366/notes-assets/images/Python-API-Development-with-FastAPI-Configuring-Python-in-Pipeline/setup-python-github-action.jpg)

:::note Tip Using the setup-python action makes it easy to extend your pipeline to test multiple versions of Python by simply adjusting the matrix strategy. :::

---

## 3\. Upgrading pip and Installing Dependencies

After setting up Python, it is important to upgrade pip to ensure you are using the latest package management features. The next step is to install your project dependencies from the `requirements.txt` file.

```
name: Build and Deploy Code
on: [push, pull_request]
jobs:
  job1:
    runs-on: ubuntu-latest
    steps:
      - name: Pull Git Repository
        uses: actions/checkout@v2
      - name: Install Python version 3.9
        uses: actions/setup-python@v2
        with:
          python-version: "3.9"
      - name: Update pip
        run: python -m pip install --upgrade pip
      - name: Install All Dependencies
        run: pip install -r requirements.txt
```

After pushing these updates, you will see log outputs similar to:

```
Enumerating objects: 31, done.
Counting objects: 100% (31/31), done.
Delta compression using up to 12 threads
Compressing objects: 100% (15/15), done.
Writing objects: 100% (17/17), 4.37 KiB | 1.46 MiB/s, done.
Total 17 (delta 0), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (8/8), completed with 8 local objects.
To https://github.com/Sanjeev-Thiyagarajan/fastapi-course.git
   e890a27..56fa415  main -> main
```

This confirms that your repository was successfully checked out, Python was installed, pip was upgraded, and your project dependencies have been installed.

---

## 4\. Running Tests with Pytest

Testing is a critical step in any CI/CD pipeline. Here, we incorporate Pytest for executing your test suite. If Pytest is not already listed in your dependencies, this step will install it and run your tests.

```
name: Build and Deploy Code
on: [push, pull_request]
jobs:
  job1:
    runs-on: ubuntu-latest
    steps:
      - name: Pull Git Repository
        uses: actions/checkout@v2
      - name: Install Python version 3.9
        uses: actions/setup-python@v2
        with:
          python-version: "3.9"
      - name: Update pip
        run: python -m pip install --upgrade pip
      - name: Install All Dependencies
        run: pip install -r requirements.txt
      - name: Test with Pytest
        run: |
          pip install pytest
          pytest
```

When running Pytest, the log should show a confirmation similar to:

```
Enumerating objects: 9, done.
Counting objects: 100% (9/9), done.
Delta compression using up to 12 threads
Compressing objects: 100% (3/3), done.
Writing objects: 100% (5/5), 607 bytes | 607.00 KiB/s, done.
Total 5 (delta 1), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (1/1), completed with 1 local object.
To https://github.com/Sanjeev-Thiyagarajan/fastapi-course.git
   5f64415..6d64294  main -> main
```

:::note Testing Note Ensure your test cases are properly configured in your repository. If there are any failures, review the logs carefully for troubleshooting. :::

---

## 5\. Observing the Workflow Run

Upon committing and pushing your changes, navigate to the GitHub Actions tab to monitor the progress of your workflow. The pipeline executes the following sequential steps:

- Pulling the Git repository
- Installing Python version 3.9 using a GitHub action
- Upgrading pip
- Installing project dependencies from `requirements.txt`
- Running Pytest to validate your code

During the workflow run, you might see a log message such as:

```
Run echo "hello sanjeev"
hello sanjeev
```

This output confirms that the workflow has begun executing correctly.

If the Pytest step fails, inspect the logs for error details. In the example below, the failure occurred due to missing environment variables required for the database connection:

```
/usr/bin/git version
git version 2.31.0
/usr/bin/git config --local --name-only --get-regexp core.sshCommand
&& git config --local --unset-all 'core.sshCommand' || :
/usr/bin/git config --local --name-only --get-regexp http.https://github.com/.extraheader
&& git config --local --unset-all http.https://github.com/.extraheader || :
```

The image below highlights the error details from the GitHub Actions log:

![The image shows a computer screen displaying a GitHub Actions log with error messages related to missing environment variables during a job run. The left side of the screen shows a navigation pane with a job labeled "job1."](https://kodekloud.com/kk-media/image/upload/v1752883368/notes-assets/images/Python-API-Development-with-FastAPI-Configuring-Python-in-Pipeline/github-actions-error-log-job1.jpg)

:::warning Warning The failure indicates that certain environment variables for the database connection have not been set. Ensure that these variables are configured before running the tests. :::

---

## Conclusion

In this article, we configured a GitHub Actions workflow to:

- Checkout the repository
- Install Python using a pre-built GitHub Action
- Upgrade pip and install the necessary dependencies
- Run tests with Pytest to verify that our application functions as expected

In the next lesson, we will discuss how to configure environment variables within the workflow, ensuring proper configuration for your database connections and other critical services.

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/4979410a-af57-460b-8f71-5a177fa10d2d/lesson/3a05d90b-1c8d-4f6d-9c24-39d872cf3972)**
>
> Watch video content
