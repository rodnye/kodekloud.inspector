# Configuring First CI CD Pipeline - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/CICD/Configuring-First-CI-CD-Pipeline)

---

## Table of Contents

- Configuring First CI CD Pipeline
  - Creating the Workflow Directory
  - A Quick Overview of Pytest Fixtures
  - Creating a Simple GitHub Actions Workflow
  - Configuring Workflow Triggers
  - Defining Jobs and Steps
  - Committing and Viewing Your Workflow
  - Final Thoughts
  - Watch Video
    - Basic Workflow Example
    - Running One-Line and Multi-Line Scripts

---

## Content

Python API Development with FastAPI

CICD

# Configuring First CI CD Pipeline

In this guide, we will configure a simple CI/CD pipeline using GitHub Actions. Before you begin, make sure you have these resources open for reference:

- [GitHub Actions documentation](https://docs.github.com/en/actions) (especially the Quick Start and Reference pages)
- [GitHub Marketplace](https://github.com/marketplace?type=actions) to explore available actions
- The example tutorial for setting up a CI/CD pipeline for a Python application, which inspired this workflow

Below, you’ll find an example of a Python package workflow that gives a good starting point:

```
name: python package
on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      python-version: [3.6, 3.7, 3.8, 3.9]
    steps:
      - uses: actions/checkout@v2
      - name: Set up Python ${{ matrix.python-version }}
        uses: actions/setup-python@v2
        with:
          python-version: ${{ matrix.python-version }}
      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install -r requirements.txt
```

This example illustrates the basic use of GitHub Actions. In the following sections, we will cover the steps to set up and customize your workflow.

---

## Creating the Workflow Directory

As detailed in the [GitHub Actions documentation](https://docs.github.com/en/actions), you need to create a specific folder structure in your project. This structure includes a `.github` folder that contains a `workflows` subfolder, where all your YAML workflow files reside.

![The image shows a webpage from GitHub Docs titled "Quickstart for GitHub Actions," providing instructions on creating a workflow with a sample YAML code snippet. The page includes a sidebar with navigation links related to GitHub Actions.](https://kodekloud.com/kk-media/image/upload/v1752883361/notes-assets/images/Python-API-Development-with-FastAPI-Configuring-First-CI-CD-Pipeline/github-actions-quickstart-workflow-yaml.jpg)

Within your project directory, follow these steps:

1.  Create a folder named `.github`.
2.  Inside `.github`, create another folder called `workflows`.

This directory will house your workflow definitions. Although you can set up multiple pipelines, this guide will use a single workflow for simplicity.

---

## A Quick Overview of Pytest Fixtures

Here is an example of a Pytest fixture used in our testing setup. Duplicate occurrences of this code block have been removed to avoid redundancy:

```
@pytest.fixture()
def session():
    print("my session fixture ran")
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        pass
```

Console output example:

```
-- Docs: https://docs.pytest.org/en/stable/warnings.html
46 passed, 5 warnings in 15.14s
```

> [!important]
> **Note**
>
> The Pytest fixture shown above resets the database before running tests, ensuring a clean state for each test session.

---

## Creating a Simple GitHub Actions Workflow

GitHub Actions workflows are defined using YAML. Below are two examples that demonstrate basic workflow configurations.

### Basic Workflow Example

```
name: GitHub Actions Demo
on: [push]
jobs:
  github-actions:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v2
      - name: Show status
        run: echo "The job status is ${{ job.status }}"
```

### Running One-Line and Multi-Line Scripts

```
name: GitHub Actions Demo
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2
      - name: Run a one-line script
        run: echo "Hello, World!"
      - name: Run a multi-line script
        run: |
          echo "Add other scripts here"
          echo "The job status is ${{ job.status }}"
```

To activate your workflow, create a new file named `build-deploy.yaml` inside your `.github/workflows` folder and paste your configuration there. While the file name is arbitrary, remember to specify the workflow’s name within the YAML file using the `name` key.

---

## Configuring Workflow Triggers

Workflow triggers define when your workflow will run. For example, to run on both push events and pull requests across all branches, use:

```
name: Build and Deploy Code
on: [push, pull_request]
```

To restrict the workflow to specific branches, you can adjust the configuration as follows:

```
name: Build and Deploy Code
on:
  push:
    branches:
      - "main"
      - "anotherbranch"
  pull_request:
    branches:
      - "test-branch"
```

This configuration ensures that the workflow runs only for pushes and pull requests on the specified branches. For additional details, refer to the [GitHub Actions events documentation](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows).

![The image shows a GitHub documentation page about triggering workflows with scheduled events, including details on using cron syntax.](https://kodekloud.com/kk-media/image/upload/v1752883362/notes-assets/images/Python-API-Development-with-FastAPI-Configuring-First-CI-CD-Pipeline/github-triggering-workflows-cron.jpg)

---

## Defining Jobs and Steps

In GitHub Actions, a job represents a series of steps executed on a runner (a virtual machine). The workflow below breaks down a simple job configuration:

1.  Specify the operating system for the runner with the `runs-on` field (e.g., `ubuntu-latest`).
2.  Define the steps to execute, each with a descriptive name.

Refer to the [GitHub Actions documentation](https://docs.github.com/en/actions) for more details on available runners, such as Windows and macOS. In this guide, we use Ubuntu since our production environment runs on Linux.

![The image shows a webpage from GitHub Docs about GitHub Actions, featuring a diagram of components like events, jobs, and runners, along with explanatory text on workflows, events, jobs, steps, and actions.](https://kodekloud.com/kk-media/image/upload/v1752883363/notes-assets/images/Python-API-Development-with-FastAPI-Configuring-First-CI-CD-Pipeline/github-actions-diagram-workflows.jpg)

Below is an example of a job with two straightforward steps:

```
name: Build and Deploy Code
on: [push, pull_request]

jobs:
  job1:
    runs-on: ubuntu-latest
    steps:
      - name: Pulling Git repository
        uses: actions/checkout@v2
      - name: Say hi to Sanjeev
        run: echo "Hello, Sanjeev"
```

In this example:

- The first step checks out the repository using a pre-built action available on the GitHub Marketplace.
- The second step executes an echo command on the Linux runner.

For more advanced checkout options (e.g., specifying a branch or using SSH), refer to the [actions/checkout documentation](https://github.com/actions/checkout).

![The image shows a GitHub page detailing the usage instructions for the "actions/checkout" action, including configuration options like repository, branch, and personal access token. The browser window displays multiple open tabs and a visible taskbar at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752883364/notes-assets/images/Python-API-Development-with-FastAPI-Configuring-First-CI-CD-Pipeline/github-actions-checkout-usage.jpg)

---

## Committing and Viewing Your Workflow

After saving your workflow file (for example, `build-deploy.yaml`) in the `.github/workflows` directory, commit your changes to your Git repository using these commands:

```
git add .
git commit -m "Adding first GitHub Action"
git push origin main
```

Once pushed, navigate to the "Actions" tab in your GitHub repository. You will see an entry corresponding to your commit (e.g., "adding first GitHub action"). Click the entry to view the detailed job log, which displays each executed step.

![The image shows a GitHub Actions interface with a job log for a workflow titled "adding first github action Build and Deploy Code #10." The log details various steps such as setting up the job, pulling the git repository, and completing the job.](https://kodekloud.com/kk-media/image/upload/v1752883365/notes-assets/images/Python-API-Development-with-FastAPI-Configuring-First-CI-CD-Pipeline/github-actions-job-log-build-deploy.jpg)

Key highlights from the job log include:

- Launching a runner (a virtual machine) with the specified operating system.
- Checking out the repository using the configured action.
- Executing a custom echo command to validate the step.

---

## Final Thoughts

This simple CI/CD pipeline demonstrates how GitHub Actions can automate tasks such as checking out code, running tests, and executing custom commands on a Linux runner. While GitHub Actions offers free build minutes on their hosted solution, you might consider self-hosted runners if your usage needs increase.

> [!important]
> **Tip**
>
> By now, you should have a clear understanding of how to configure your first GitHub Actions workflow and trigger it using pushes or pull requests. Feel free to customize and extend this setup to match your project requirements.

Happy Coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/4979410a-af57-460b-8f71-5a177fa10d2d/lesson/3f706649-5b36-4005-972a-d9528a21ef63)**
>
> Watch video content
