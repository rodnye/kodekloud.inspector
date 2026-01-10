# Using if expression in Jobs - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/GitHub-Actions-Core-Concepts/Using-if-expression-in-Jobs)

---

## Table of Contents

- Using if expression in Jobs
  - What Are Context Variables?
  - Common Contexts in Workflows
  - Sample Workflow: Build and Conditional Deploy
  - Observing Workflow Runs
  - Links and References
  - Watch Video

---

## Content

GitHub Actions Certification

GitHub Actions Core Concepts

# Using if expression in Jobs

In this guide, you’ll discover how to harness context variables and `if` expressions in GitHub Actions workflows to run jobs conditionally. This is essential for optimizing CI/CD pipelines, reducing unnecessary steps, and ensuring deployments only occur on the desired branch.

## What Are Context Variables?

When a workflow runs, GitHub makes a set of context variables available in JSON format. You can reference these contexts with expressions like `${{ github.ref }}` or `${{ env.VAR_NAME }}`.

```
{
  "token": "****",
  "job": "dump_contexts_to_log",
  "ref": "refs/heads/main",
  "sha": "ab3c0b9ccd2c8b0154e48e279bad3cf8c646",
  "repository": "sidd-harth-7/actions-1",
  "repository_owner_id": 147399322,
  "repository_owner": "sidd-harth-7",
  "repositoryUrl": "git://github.com/sidd-harth-7/actions-1.git",
  "run_id": 6492400732,
  "run_number": 1,
  "event_name": "push"
}
```

For a deep dive into expressions and context variables, see the [GitHub Actions Expressions docs](https://docs.github.com/en/actions/learn-github-actions/expressions).

![The image shows a GitHub Docs page about "Expressions" in GitHub Actions, explaining how to evaluate expressions in workflows and actions. It includes navigation links and a section on using expressions with the `if` keyword.](https://kodekloud.com/kk-media/image/upload/v1752876174/notes-assets/images/GitHub-Actions-Certification-Using-if-expression-in-Jobs/github-actions-expressions-docs-page.jpg)

## Common Contexts in Workflows

| Context   | Description                                   | Example                          |
| --------- | --------------------------------------------- | -------------------------------- |
| `github`  | Information about the workflow run and event  | `${{ github.ref }}`              |
| `env`     | Environment variables defined in the workflow | `${{ env.CONTAINER_REGISTRY }}`  |
| `secrets` | Encrypted secrets stored in your repository   | `${{ secrets.DOCKER_PASSWORD }}` |
| `vars`    | Repository-level variables                    | `${{ vars.DOCKER_USERNAME }}`    |

## Sample Workflow: Build and Conditional Deploy

Below is a workflow that builds a Docker image on every push but only deploys when the push targets the `main` branch.

```
name: Deploy on Main

on:
  push:
    branches: [ main ]

env:
  CONTAINER_REGISTRY: docker.io
  IMAGE_NAME: github-actions-nginx

jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      - name: Build Docker Image
        run: |
          docker build -t ${{ env.CONTAINER_REGISTRY }}/${{ vars.DOCKER_USERNAME }}/${{ env.IMAGE_NAME }}:latest .
      - name: Log In to Registry
        run: |
          echo "${{ secrets.DOCKER_PASSWORD }}" | docker login ${{ env.CONTAINER_REGISTRY }} --username ${{ vars.DOCKER_USERNAME }} --password-stdin
      - name: Push Image
        run: |
          docker push ${{ env.CONTAINER_REGISTRY }}/${{ vars.DOCKER_USERNAME }}/${{ env.IMAGE_NAME }}:latest

  deploy:
    if: github.ref == 'refs/heads/main'
    needs: docker
    concurrency:
      group: production-deployment
      cancel-in-progress: false
    runs-on: ubuntu-latest
    steps:
      - name: Run Container
        timeout-minutes: 10
        run: |
          docker run -d -p 8080:80 ${{ env.CONTAINER_REGISTRY }}/${{ vars.DOCKER_USERNAME }}/${{ env.IMAGE_NAME }}:latest
          sleep 600
```

> [!important]
> **Note**
>
> The `deploy` job is guarded by the `if` expression. It only runs when `github.ref` equals `refs/heads/main`.

## Observing Workflow Runs

1.  Push to a feature branch:

    ![The image shows a GitHub Actions interface with a list of workflow runs titled "Exploring Variables and Secrets." It displays details such as event triggers, status, branch, and execution time.](https://kodekloud.com/kk-media/image/upload/v1752876174/notes-assets/images/GitHub-Actions-Certification-Using-if-expression-in-Jobs/github-actions-exploring-variables-secrets.jpg)

2.  Notice that the `docker` job succeeded but the `deploy` job is skipped:

    ![The image shows a GitHub Actions workflow summary with a successful run, displaying jobs for "docker" and "deploy" in a sequence.](https://kodekloud.com/kk-media/image/upload/v1752876175/notes-assets/images/GitHub-Actions-Certification-Using-if-expression-in-Jobs/github-actions-workflow-success-docker-deploy.jpg)

    > [!important]
    > **Warning**
    >
    > If your `if` condition is malformed or compares the wrong context, the job will silently skip. Always verify your branch references.

3.  Open a pull request from your feature branch into `main`:

    ![The image shows a GitHub interface where a user is creating a pull request to merge changes from a "feature/testing" branch into the "main" branch. The interface indicates that the branches can be automatically merged.](https://kodekloud.com/kk-media/image/upload/v1752876176/notes-assets/images/GitHub-Actions-Certification-Using-if-expression-in-Jobs/github-pull-request-feature-main-merge.jpg)

4.  Ensure all status checks pass before merging:

    ![The image shows a GitHub pull request page with details about commits, checks, and merge status. It indicates that all checks have passed and the branch has no conflicts with the base branch.](https://kodekloud.com/kk-media/image/upload/v1752876177/notes-assets/images/GitHub-Actions-Certification-Using-if-expression-in-Jobs/github-pull-request-commits-checks-status.jpg)

5.  After merging into `main`, observe the full workflow including `deploy`:

    ![The image shows a GitHub Actions interface with a list of workflow runs for a project titled "Exploring Variables and Secrets." It displays the status, branch, and timing of each workflow run.](https://kodekloud.com/kk-media/image/upload/v1752876179/notes-assets/images/GitHub-Actions-Certification-Using-if-expression-in-Jobs/github-actions-workflow-runs-exploring-variables.jpg)

    ![The image shows a GitHub Actions interface with a workflow in progress, displaying jobs for "docker" and "deploy" in a sequence.](https://kodekloud.com/kk-media/image/upload/v1752876180/notes-assets/images/GitHub-Actions-Certification-Using-if-expression-in-Jobs/github-actions-workflow-docker-deploy.jpg)

This end-to-end example illustrates how to use `if` expressions and contexts to drive conditional job execution in your CI/CD pipelines.

## Links and References

- [GitHub Actions Expressions](https://docs.github.com/en/actions/learn-github-actions/expressions)
- [Contexts and Expression Syntax](https://docs.github.com/en/actions/learn-github-actions/contexts)
- [GitHub Actions Workflow Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/54711be0-66e6-461b-b935-f77d78a5e000/lesson/082a4fa9-78b2-41a4-95e6-af74d0e44126)**
>
> Watch video content
