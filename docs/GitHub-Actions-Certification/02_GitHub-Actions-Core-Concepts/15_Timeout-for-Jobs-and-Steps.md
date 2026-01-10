# Timeout for Jobs and Steps - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/GitHub-Actions-Core-Concepts/Timeout-for-Jobs-and-Steps)

---

## Table of Contents

- Timeout for Jobs and Steps
  - Default Behavior
  - Example: No Timeout Specified
  - Step-Level Timeout
  - Job-Level Timeout
  - Timeout Comparison
  - Demonstration
  - Links and References
  - Watch Video

---

## Content

GitHub Actions Certification

GitHub Actions Core Concepts

# Timeout for Jobs and Steps

GitHub Actions provides a built-in way to automatically terminate long-running workflows, jobs, or individual steps using the `timeout-minutes` setting. By default, a workflow is killed after 360 minutes (6 hours), but you can customize the timeout at both the step and job levels to prevent runaway executions and save minutes.

## Default Behavior

Without any explicit timeout, GitHub Actions enforces a global 360-minute limit:

> [!important]
> **Note**
>
> If any step (e.g., a stray `sleep 6000s`) runs longer than 6 hours, the entire workflow will be forcefully terminated.

## Example: No Timeout Specified

This sample workflow accidentally includes a long `sleep` command with no timeout:

```
name: CI
on:
  workflow_dispatch:


env:
  CONTAINER_REGISTRY: docker.io
  IMAGE_NAME: github-actions-nginx


jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      # ... build and push steps ...


  deploy:
    needs: docker
    concurrency:
      group: production-deployment
      cancel-in-progress: false
    runs-on: ubuntu-latest
    steps:
      - name: Docker Run
        run: |
          docker run -d -p 8080:80 $CONTAINER_REGISTRY/${{ vars.DOCKER_USERNAME }}/${{ IMAGE_NAME }}:latest
          # Oops—this sleeps for 6000 seconds (~1.6 hours)
          sleep 6000s
```

Without `timeout-minutes`, this workflow could run until GitHub Actions kills it after six hours.

## Step-Level Timeout

To limit only one step—regardless of other steps—you can set `timeout-minutes` on that specific step:

```
jobs:
  deploy:
    needs: docker
    runs-on: ubuntu-latest
    steps:
      - name: Docker Run with Timeout
        timeout-minutes: 1
        run: |
          echo "Starting container"
          docker run -d -p 8080:80 $CONTAINER_REGISTRY/${{ vars.DOCKER_USERNAME }}/${{ IMAGE_NAME }}:latest
          # This step will be canceled after 1 minute
          sleep 6000s
```

In this configuration, **Docker Run with Timeout** will be canceled if it exceeds 1 minute.

## Job-Level Timeout

Applying a timeout at the job level ensures the sum of all steps in that job respects the limit:

```
jobs:
  deploy:
    timeout-minutes: 5
    runs-on: ubuntu-latest
    steps:
      - name: Step A
        run: sleep 300s
      - name: Step B
        run: sleep 300s
```

Here, if **Step A** and **Step B** together take longer than 5 minutes, the entire job is terminated.

## Timeout Comparison

| Scope              | Applies To         | Syntax Location                         | Example Duration     |
| ------------------ | ------------------ | --------------------------------------- | -------------------- |
| Step-level         | Single step only   | Under a `steps` item                    | `timeout-minutes: 1` |
| Job-level          | All steps in a job | Under a `jobs` item                     | `timeout-minutes: 5` |
| Workflow-level\\\* | Entire workflow    | Not user-configurable (360 min default) | 360 min              |

\* Workflow-level timeout is fixed at 360 minutes by GitHub.

## Demonstration

1.  Commit and push your updated workflow or trigger it with **Run workflow**.
2.  Monitor the **Docker Run with Timeout** step in the Actions UI.
3.  After the specified timeout, you’ll see an error like:

    ```
    Error: The action has timed out.
    ```

4.  Under **Annotations**, GitHub pinpoints which step or job exceeded its limit.

This approach helps you control runaway processes, optimize usage, and reduce unnecessary billing on GitHub Actions.

## Links and References

- [GitHub Actions Timeout Documentation](https://docs.github.com/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idtimeout-minutes)
- [GitHub Actions Concepts](https://docs.github.com/actions/learn-github-actions/introduction-to-github-actions)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/54711be0-66e6-461b-b935-f77d78a5e000/lesson/1bdfceab-82f8-4cac-95e3-253d37bb7d7a)**
>
> Watch video content
