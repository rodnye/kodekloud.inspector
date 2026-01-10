# Timeout for Jobs and Steps - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions/GitHub-Actions-Core-Concepts/Timeout-for-Jobs-and-Steps)

---

## Table of Contents

- Timeout for Jobs and Steps
  - Why Enforce Timeouts?
  - The Problem: Unbounded Workflow Runs
  - Adding a Timeout
  - Demo and Logs
  - Best Practices
  - Links and References
  - Watch Video
    - Step-Level Timeout
    - Job-Level Timeout

---

## Content

GitHub Actions

GitHub Actions Core Concepts

# Timeout for Jobs and Steps

In this guide, you’ll learn how to use the `timeout-minutes` option in GitHub Actions to prevent jobs or steps from running indefinitely. By setting timeouts, you safeguard your CI/CD pipelines from unexpected delays and control your billable minutes.

## Why Enforce Timeouts?

- **Prevent runaway workflows** that consume unnecessary resources
- **Control billing** by limiting how long jobs or steps can execute
- **Fail fast** when something goes wrong (e.g., infinite loops or stalled processes)

> [!important]
> **Note**
>
> By default, GitHub Actions will cancel any workflow that runs longer than **360 minutes** (6 hours). Configuring `timeout-minutes` at a finer granularity helps you catch issues earlier.

---

## The Problem: Unbounded Workflow Runs

Imagine you accidentally set a `sleep` duration too high:

```
# .github/workflows/deploy.yml
on: workflow_dispatch


env:
  CONTAINER_REGISTRY: docker.io
  IMAGE_NAME: github-actions-nginx


jobs:
  docker:
    # ...
  deploy:
    needs: docker
    concurrency:
      group: production-deployment
      cancel-in-progress: false
    runs-on: ubuntu-latest
    steps:
      - name: Docker Run
        run: |
          echo docker run -d -p 8080:80 \
            $CONTAINER_REGISTRY/${{ vars.DOCKER_USERNAME }}/${{ IMAGE_NAME }}:latest
          sleep 6000s   # ❌ Intended 600s but used 6000s
```

If this runs unchecked, the job hangs for nearly 1 hour and 40 minutes, burning through your minutes until the default 6-hour limit is reached.

---

## Adding a Timeout

You can apply `timeout-minutes` at **two** levels:

| Scope      | Applies To               | Syntax Location   | Use Case                               |
| ---------- | ------------------------ | ----------------- | -------------------------------------- |
| Step-Level | A single `run` or action | Within a `steps:` | Limit a long-running command or action |
| Job-Level  | All steps in a job       | Within the `job:` | Enforce a total time budget per job    |

### Step-Level Timeout

Limit just the problematic step to, for example, **1 minute**:

```
jobs:
  deploy:
    needs: docker
    runs-on: ubuntu-latest
    steps:
      - name: Docker Run
        timeout-minutes: 1
        run: |
          echo docker run -d -p 8080:80 \
            $CONTAINER_REGISTRY/${{ vars.DOCKER_USERNAME }}/${{ IMAGE_NAME }}:latest
          sleep 6000s
```

If the `Docker Run` step exceeds 1 minute, it is automatically canceled and the job fails.

### Job-Level Timeout

Apply a timeout for the **entire** job — all steps must finish before the deadline:

```
jobs:
  deploy:
    needs: docker
    runs-on: ubuntu-latest
    timeout-minutes: 5
    steps:
      - name: Setup Environment
        run: echo "Setting up environment"
      - name: Docker Run
        run: |
          echo docker run -d -p 8080:80 \
            $CONTAINER_REGISTRY/${{ vars.DOCKER_USERNAME }}/${{ IMAGE_NAME }}:latest
          sleep 6000s
```

Here, if any step in `deploy` takes longer than 5 minutes in total, the workflow stops.

> [!important]
> **Warning**
>
> Setting overly aggressive timeouts may cause legitimate tasks to fail. Choose values that balance reliability and cost control.

---

## Demo and Logs

After committing your changes, trigger the workflow manually. You’ll see:

```
docker run -d -p 8080:80 \
  $CONTAINER_REGISTRY/siddharth67/$IMAGE_NAME:latest
# -> docker run -d -p 8080:80 \
#    docker.io/siddharth67/github-actions-nginx:latest
Error: The action has timed out.
```

In the GitHub Actions UI, an annotation appears:

> **The action has timed out.**

Logs show the step ran for roughly 1 minute and then terminated at the `timeout-minutes` threshold.

---

## Best Practices

- Use **step-level** timeouts for known long-running commands.
- Apply **job-level** timeouts to guard entire workflows.
- Monitor execution times and adjust `timeout-minutes` as your builds evolve.

---

## Links and References

- [GitHub Actions: Workflow syntax for GitHub Actions – timeout-minutes](https://docs.github.com/actions/reference/workflow-syntax-for-github-actions#jobsjob_idtimeout-minutes)
- [GitHub Actions Concepts](https://docs.github.com/actions/learn-github-actions/introduction-to-github-actions)
- [Managing billing and usage for GitHub Actions](https://docs.github.com/billing/managing-billing-for-github-actions)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions/module/0ac6c98f-7100-471e-b9aa-037f25cb58d7/lesson/a739686f-48c9-4148-b406-b206dd04a950)**
>
> Watch video content
