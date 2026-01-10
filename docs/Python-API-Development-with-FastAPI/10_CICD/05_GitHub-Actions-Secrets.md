# GitHub Actions Secrets - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/CICD/GitHub-Actions-Secrets)

---

## Table of Contents

- GitHub Actions Secrets
  - Using Repository Secrets
  - Using Environment-Specific Secrets
  - Committing Your Workflow Changes
  - Troubleshooting Workflow Errors
  - Watch Video

---

## Content

Python API Development with FastAPI

CICD

# GitHub Actions Secrets

In the previous lesson, we learned that hard-coding environment variables directly into your GitHub Actions workflow can expose sensitive information. As illustrated in the diagram below, when these values are embedded in the workflow file, anyone with access to the repository is able to view them:

![The image shows a GitHub Actions page for a repository, displaying a list of workflow runs with their statuses and timestamps.](https://kodekloud.com/kk-media/image/upload/v1752883369/notes-assets/images/Python-API-Development-with-FastAPI-GitHub-Actions-Secrets/github-actions-workflow-runs-statuses.jpg)

For instance, a workflow might initially be configured as follows:

```
name: Build and Deploy Code
on: [push, pull_request]
jobs:
  job1:
    env:
      DATABASE_HOSTNAME: localhost
      DATABASE_PORT: 5432
      DATABASE_PASSWORD: password123
      DATABASE_NAME: fastapi
      DATABASE_USERNAME: postgres
      SECRET_KEY: 09d25e094faa6ca255c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7
      ALGORITHM: HS256
      ACCESS_TOKEN_EXPIRE_MINUTES: 30
    runs-on: ubuntu-latest
    steps:
      - name: pulling git repo
        uses: actions/checkout@v2
      - name: Install python version 3.9
```

Since these configuration values are visible in your repository, it’s recommended to use GitHub Secrets to ensure they remain hidden and secure.

## Using Repository Secrets

To protect sensitive data, navigate to your repository's **Settings** and locate the **Secrets** section. There, you can define repository secrets that are accessible across all branches. For example, you might create a secret named `DATABASE_HOSTNAME` with a value such as `localhost`.

![The image shows a GitHub repository settings page where a new secret is being added under "Actions secrets." The secret name is "DATABASE_HOSTNAME" with the value "localhost."](https://kodekloud.com/kk-media/image/upload/v1752883369/notes-assets/images/Python-API-Development-with-FastAPI-GitHub-Actions-Secrets/github-repo-settings-actions-secret.jpg)

After setting up your secret, update your workflow file to reference it using the following syntax:

```
name: Build and Deploy Code
on: [push, pull_request]
jobs:
  job1:
    env:
      DATABASE_HOSTNAME: ${{ secrets.DATABASE_HOSTNAME }}
      DATABASE_PORT: 5432
      DATABASE_PASSWORD: password123
      DATABASE_NAME: fastapi
      DATABASE_USERNAME: postgres
      SECRET_KEY: 09d25e094faa6ca255c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7
      ALGORITHM: HS256
      ACCESS_TOKEN_EXPIRE_MINUTES: 30
    runs-on: ubuntu-latest
    steps:
      - name: pulling git repo
        uses: actions/checkout@v2
      - name: Install python version 3.9
        uses: actions/setup-python@v2
```

In this updated configuration, using `${{ secrets.DATABASE_HOSTNAME }}` instructs the GitHub Actions runner to securely retrieve the secret without exposing its value in the workflow file or job logs.

## Using Environment-Specific Secrets

While repository secrets offer global coverage for your workflows, GitHub also supports environment secrets for more granular control. This distinction allows you to set up separate groups of secrets for different deployment environments (such as testing, development, or production).

To configure an environment secret:

1.  Open your repository's **Settings** and select **Environments**.
2.  Create a new environment (for example, name it `testing`).
3.  Add your secrets to the environment, ensuring the key names match your workflow variables for consistency.

Once the environment secrets are defined, modify your workflow to specify the target environment:

![The image shows a GitHub repository settings page focused on "Actions secrets," with options to manage environment and repository secrets. The page indicates there are no environment secrets, but a repository secret named "DATABASE_HOSTNAME" is listed.](https://kodekloud.com/kk-media/image/upload/v1752883371/notes-assets/images/Python-API-Development-with-FastAPI-GitHub-Actions-Secrets/github-repo-settings-actions-secrets.jpg)

Here’s an example of a workflow configured to use environment secrets:

```
name: Build and Deploy Code
on: [push, pull_request]
jobs:
  job1:
    environment:
      name: testing
    env:
      DATABASE_HOSTNAME: ${{ secrets.DATABASE_HOSTNAME }}
      DATABASE_PORT: ${{ secrets.DATABASE_PORT }}
      DATABASE_PASSWORD: ${{ secrets.DATABASE_PASSWORD }}
      DATABASE_NAME: ${{ secrets.DATABASE_NAME }}
      DATABASE_USERNAME: ${{ secrets.DATABASE_USERNAME }}
      SECRET_KEY: ${{ secrets.SECRET_KEY }}
      ALGORITHM: ${{ secrets.ALGORITHM }}
      ACCESS_TOKEN_EXPIRE_MINUTES: ${{ secrets.ACCESS_TOKEN_EXPIRE_MINUTES }}
    runs-on: ubuntu-latest
    steps:
      - name: pulling git repo
        uses: actions/checkout@v2
      - name: Install python version 3.9
        uses: actions/setup-python@v2
```

> [!important]
> **Note**
>
> If a secret exists in both the repository and environment scopes with the same name, check the GitHub documentation to understand the precedence rules.

## Committing Your Workflow Changes

After updating the workflow file, remember to commit your changes and push them to the repository:

```
(venv) C:\Users\sanje\Documents\Courses\fastapi>git commit -m "Update workflow to use secrets"
[main 416c649] 1 file changed, 10 insertions(+), 8 deletions(-)
(venv) C:\Users\sanje\Documents\Courses\fastapi>git push origin main
```

## Troubleshooting Workflow Errors

After pushing your changes, you might encounter errors in your GitHub Actions job. For example, an error like “unrecognized name, database_port” suggests that one of the environment variables was referenced without using the required `secrets.` prefix. The screenshot below highlights such an error:

![The image shows a GitHub Actions page with a build and deploy workflow that has failed due to an invalid workflow file error related to unrecognized named values.](https://kodekloud.com/kk-media/image/upload/v1752883372/notes-assets/images/Python-API-Development-with-FastAPI-GitHub-Actions-Secrets/github-actions-build-deploy-error.jpg)

To fix this issue, ensure that every secret is referenced using the correct syntax, `${{ secrets.VARIABLE_NAME }}`. Here is the corrected job configuration:

```
name: Build and Deploy Code
on: [push, pull_request]
jobs:
  job1:
    environment:
      name: testing
    env:
      DATABASE_HOSTNAME: ${{ secrets.DATABASE_HOSTNAME }}
      DATABASE_PORT: ${{ secrets.DATABASE_PORT }}
      DATABASE_PASSWORD: ${{ secrets.DATABASE_PASSWORD }}
      DATABASE_NAME: ${{ secrets.DATABASE_NAME }}
      DATABASE_USERNAME: ${{ secrets.DATABASE_USERNAME }}
      SECRET_KEY: ${{ secrets.SECRET_KEY }}
      ALGORITHM: ${{ secrets.ALGORITHM }}
      ACCESS_TOKEN_EXPIRE_MINUTES: ${{ secrets.ACCESS_TOKEN_EXPIRE_MINUTES }}
    runs-on: ubuntu-latest
    steps:
      - name: pulling git repo
        uses: actions/checkout@v2
      - name: Install python version 3.9
        uses: actions/setup-python@v2
```

Once you re-run the workflow, you should see that the secrets are correctly retrieved. The logs will mask the actual secret values, but you can verify that they are passed in correctly. Note that you might also encounter a database connection error (since no database exists on localhost), which is expected in this context.

For instance, running tests might produce error logs similar to the following:

```
pip install pytest
pytest
```

This error occurs because the workflow attempts to connect to a non-existent database. A future lesson will detail how to set up a test database on your runner to ensure that your tests execute properly.

![The image shows a GitHub Actions interface with a failed job titled "job1" that includes steps like setting up a job, pulling a git repo, installing Python, and testing with pytest. The log details show environment variables and the installation of pytest.](https://kodekloud.com/kk-media/image/upload/v1752883373/notes-assets/images/Python-API-Development-with-FastAPI-GitHub-Actions-Secrets/github-actions-failed-job1-pytest.jpg)

![The image shows a computer screen displaying a code editor with error logs from a failed job, likely related to a Python script using SQLAlchemy. The left side has a summary panel, and the right side shows detailed error messages and code snippets.](https://kodekloud.com/kk-media/image/upload/v1752883374/notes-assets/images/Python-API-Development-with-FastAPI-GitHub-Actions-Secrets/code-editor-error-logs-python-sqlalchemy.jpg)

In the next lesson, we will explore setting up a test database on the runner to enable successful connections and error-free test executions.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/4979410a-af57-460b-8f71-5a177fa10d2d/lesson/22c29e83-b0ea-4fe4-8e62-9fb89daded54)**
>
> Watch video content
