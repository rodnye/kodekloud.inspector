# Using if expression in Jobs - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions/GitHub-Actions-Core-Concepts/Using-if-expression-in-Jobs)

---

## Table of Contents

- Using if expression in Jobs
  - Understanding Context Variables
  - Example Workflow: Build and Deploy
  - Viewing Skipped Jobs for Feature Branches
  - Merging into main to Trigger Deployment
  - Summary
  - Links and References
  - Watch Video
    - Adding a Conditional if Expression

---

## Content

GitHub Actions

GitHub Actions Core Concepts

# Using if expression in Jobs

In GitHub Actions workflows, **expressions** let you read context variables and apply conditional logic to control job execution. This article shows how to use `if` expressions with context variables to run jobs only when certain conditions are met—such as deploying only on the `main` branch.

## Understanding Context Variables

During a workflow run, GitHub provides a set of context variables. Here’s a sample dump of some available variables:

```
{
  "token": "****",
  "job": "dump_contexts_to_log",
  "ref": "refs/heads/main",
  "sha": "ab3cb9cc32c801545e48e279bad3cf8c646",
  "repository": "sidd-harth-7/actions-1",
  "repository_owner_id": "147390322",
  "repositoryUrl": "git://github.com/sidd-harth-7/actions-1.git",
  "run_id": "6492400732",
  "run_number": "1",
  "retention_days": "60",
  "run_attempt": 1,
  "artifact_cache_size_limit": "10",
  "repository_visibility": "public",
  "repository_self_hosted_runners_disabled": false,
  "repository_id": "702448262",
  "actor_id": "147390322",
  "triggering_actor": "sidd-harth-7",
  "head_ref": "",
  "event_name": "push"
}
```

| Context Variable    | Description                            | Sample Value                          |
| ------------------- | -------------------------------------- | ------------------------------------- |
| `github.ref`        | Full Git ref of the workflow event     | `refs/heads/main`                     |
| `github.sha`        | Commit SHA of the current run          | `ab3cb9cc32c801545e48e279bad3cf8c646` |
| `github.repository` | Owner and repository name              | `sidd-harth-7/actions-1`              |
| `github.event_name` | Event name that triggered the workflow | `push`                                |

Expressions in GitHub Actions support literals, operators, functions, and filters.

> [!important]
> **Note**
>
> For full details on expressions, see the [GitHub Actions expressions documentation](https://docs.github.com/en/actions/learn-github-actions/expressions).

![The image shows a GitHub Docs page about "Expressions" in GitHub Actions, explaining how to evaluate expressions in workflows and actions. It includes navigation links and a warning about security considerations.](https://kodekloud.com/kk-media/image/upload/v1752876663/notes-assets/images/GitHub-Actions-Using-if-expression-in-Jobs/github-actions-expressions-docs-page.jpg)

## Example Workflow: Build and Deploy

Below is a basic workflow that builds and publishes a Docker image on every push or manual dispatch, then deploys it:

```
name: Build and Deploy

on:
  push:
  workflow_dispatch:

env:
  CONTAINER_REGISTRY: docker.io
  IMAGE_NAME: github-actions-nginx

jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      - name: Docker Build
        run: |
          docker build \
            -t ${{ env.CONTAINER_REGISTRY }}/${{ vars.DOCKER_USERNAME }}/${{ IMAGE_NAME }}:latest .
      - name: Docker Login
        run: |
          docker login \
            --username ${{ vars.DOCKER_USERNAME }} \
            --password ${{ secrets.DOCKER_PASSWORD }}
      - name: Docker Publish
        run: |
          docker push \
            ${{ env.CONTAINER_REGISTRY }}/${{ vars.DOCKER_USERNAME }}/${{ IMAGE_NAME }}:latest

  deploy:
    needs: docker
    runs-on: ubuntu-latest
    steps:
      - name: Docker Run
        timeout-minutes: 1
        run: |
          docker run -d -p 8080:80 \
          ${{ env.CONTAINER_REGISTRY }}/${{ vars.DOCKER_USERNAME }}/${{ IMAGE_NAME }}:latest
          sleep 600
```

### Adding a Conditional `if` Expression

To ensure the `deploy` job only runs on the `main` branch, add an `if` condition that checks `github.ref`:

```
jobs:
  deploy:
    if: github.ref == 'refs/heads/main'
    needs: docker
    concurrency:
      group: production-deployment
      cancel-in-progress: false
    runs-on: ubuntu-latest
    steps:
      - name: Docker Run
        timeout-minutes: 1
        run: |
          docker run -d -p 8080:80 \
          ${{ env.CONTAINER_REGISTRY }}/${{ vars.DOCKER_USERNAME }}/${{ IMAGE_NAME }}:latest
          sleep 600
```

Here, `github.ref` holds the full reference (e.g., `refs/heads/main`). If the condition is false, the deploy job is skipped.

## Viewing Skipped Jobs for Feature Branches

When you push to a feature branch, the Docker build and publish steps run, but the deploy job is marked as skipped:

> [!important]
> **Note**
>
> Check the Actions tab in your repository to see which jobs succeeded or were skipped.

![The image shows a GitHub Actions interface with a list of workflow runs titled "Exploring Variables and Secrets." It displays details such as event triggers, status, branch, and execution time.](https://kodekloud.com/kk-media/image/upload/v1752876664/notes-assets/images/GitHub-Actions-Using-if-expression-in-Jobs/github-actions-exploring-variables-secrets.jpg)

![The image shows a GitHub Actions workflow interface with a successful run of a job named "variable-secrets.yml," which includes steps for "docker" and "deploy."](https://kodekloud.com/kk-media/image/upload/v1752876665/notes-assets/images/GitHub-Actions-Using-if-expression-in-Jobs/github-actions-workflow-success-variable-secrets.jpg)

## Merging into `main` to Trigger Deployment

1.  Create a pull request from your feature branch into `main`.
2.  After merging and approval, the PR page shows all checks passing.
3.  Once merged, delete the branch if desired.

> [!important]
> **Note**
>
> Pull request details display commit statuses, merge confirmation, and branch deletion options.

![The image shows a GitHub pull request page with details about commits, checks, and branch merging status. It indicates that all checks have passed and the branch has no conflicts with the base branch.](https://kodekloud.com/kk-media/image/upload/v1752876667/notes-assets/images/GitHub-Actions-Using-if-expression-in-Jobs/github-pull-request-commits-checks-status.jpg)

![The image shows a GitHub interface where a pull request has been successfully merged and closed. It includes details about commits, verification checks, and options to delete the branch or leave comments.](https://kodekloud.com/kk-media/image/upload/v1752876668/notes-assets/images/GitHub-Actions-Using-if-expression-in-Jobs/github-pull-request-merged-interface.jpg)

After the merge, a new workflow run on `main` starts—both the `docker` and `deploy` jobs execute:

> [!important]
> **Note**
>
> Monitor the Actions tab to confirm that the deploy job ran successfully.

![The image shows a GitHub Actions page with a list of workflow runs for a project titled "Exploring Variables and Secrets." It includes details about pull requests, workflow status, and branches.](https://kodekloud.com/kk-media/image/upload/v1752876669/notes-assets/images/GitHub-Actions-Using-if-expression-in-Jobs/github-actions-workflow-runs-exploring-secrets.jpg)

![The image shows a GitHub Actions workflow interface, displaying a pull request merge in progress with jobs for "docker" and "deploy" in a pipeline.](https://kodekloud.com/kk-media/image/upload/v1752876670/notes-assets/images/GitHub-Actions-Using-if-expression-in-Jobs/github-actions-pull-request-workflow.jpg)

## Summary

Using `if` expressions with context variables like `github.ref` lets you implement **branch-specific** logic in your workflows. This approach ensures deployments occur only when code reaches the intended branch, enhancing control and security in your CI/CD pipeline.

## Links and References

- [GitHub Actions: Expressions](https://docs.github.com/en/actions/learn-github-actions/expressions)
- [GitHub Actions Context and Expression Syntax](https://docs.github.com/en/actions/learn-github-actions/contexts)
- [GitHub Actions Workflows](https://docs.github.com/en/actions/using-workflows)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions/module/0ac6c98f-7100-471e-b9aa-037f25cb58d7/lesson/679ea42f-5c3f-4da8-bba4-3701fc278309)**
>
> Watch video content
