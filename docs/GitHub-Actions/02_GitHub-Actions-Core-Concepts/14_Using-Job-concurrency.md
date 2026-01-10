# Using Job concurrency - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions/GitHub-Actions-Core-Concepts/Using-Job-concurrency)

---

## Table of Contents

- Using Job concurrency
  - 1. Baseline Workflow: Parallel Jobs
  - 2. Introducing concurrency
  - 3. Comparing cancel-in-progress Options
  - 4. Queuing New Runs (No Cancellation)
  - Links and References
  - Watch Video

---

## Content

GitHub Actions

GitHub Actions Core Concepts

# Using Job concurrency

Controlling how jobs run in parallel is crucial for production workflows. GitHub Actions’ `concurrency` key lets you ensure that only one workflow or job in a specified group runs at a time—preventing resource contention, conflicting deployments, or race conditions.

## 1\. Baseline Workflow: Parallel Jobs

Consider a simple workflow with two jobs:

```
jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      - name: Docker Build
        run: echo docker build -t ${{ env.CONTAINER_REGISTRY }}/${{ vars.DOCKER_USERNAME }}/${{ IMAGE_NAME }}:latest
      - name: Docker Login
        run: echo docker login --username=${{ vars.DOCKER_USERNAME }} --password=${{ secrets.DOCKER_PASSWORD }}
      - name: Docker Publish
        run: echo docker push ${{ env.CONTAINER_REGISTRY }}/${{ vars.DOCKER_USERNAME }}/${{ IMAGE_NAME }}:latest


  deploy:
    needs: docker
    runs-on: ubuntu-latest
    steps:
      - name: Docker Run
        run: |
          echo docker run -d -p 8080:80 ${{ env.CONTAINER_REGISTRY }}/${{ vars.DOCKER_USERNAME }}/${{ IMAGE_NAME }}:latest
          sleep 600s
```

After you trigger this workflow (e.g., via `workflow_dispatch`), the `docker` job runs first. The `deploy` job then spins up the container and sleeps for 600 seconds:

![The image shows a GitHub Actions workflow interface with a job sequence involving "docker" and "deploy" steps, currently queued.](https://kodekloud.com/kk-media/image/upload/v1752876653/notes-assets/images/GitHub-Actions-Using-Job-concurrency/github-actions-docker-deploy-queued.jpg)

Without any concurrency settings, multiple runs will queue up and execute `deploy` in parallel—often not what you want in production.

## 2\. Introducing `concurrency`

Use the `concurrency` key to define a **group** name and control behavior with `cancel-in-progress`. Here’s how to cancel any in-progress deploy when a new run starts:

```
jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      - name: Docker Build
        run: echo docker build -t ${{ env.CONTAINER_REGISTRY }}/${{ vars.DOCKER_USERNAME }}/${{ IMAGE_NAME }}:latest
      - name: Docker Login
        run: echo docker login --username=${{ vars.DOCKER_USERNAME }} --password=${{ secrets.DOCKER_PASSWORD }}
      - name: Docker Publish
        run: echo docker push ${{ env.CONTAINER_REGISTRY }}/${{ vars.DOCKER_USERNAME }}/${{ IMAGE_NAME }}:latest


  deploy:
    needs: docker
    concurrency:
      group: production-deployment
      cancel-in-progress: true
    runs-on: ubuntu-latest
    steps:
      - name: Docker Run
        run: |
          echo docker run -d -p 8080:80 ${{ env.CONTAINER_REGISTRY }}/${{ vars.DOCKER_USERNAME }}/${{ IMAGE_NAME }}:latest
          sleep 600s
```

> [!important]
> **Note**
>
> The `group` value can include `{{ github.ref }}`, `{{ github.sha }}`, or environment variables to make it unique per branch or environment. See [workflow syntax: concurrency](/docs/learn-github-actions/workflow-syntax-for-github-actions#concurrency).

When a new run starts, any in-progress deploy in `production-deployment` is canceled:

```
Error: The operation was canceled.
```

![The image shows a GitHub Actions workflow summary for "Exploring Variables and Secrets," which was manually triggered and then canceled. It includes details about the "docker" and "deploy" jobs, with annotations indicating errors related to deployment cancellation.](https://kodekloud.com/kk-media/image/upload/v1752876654/notes-assets/images/GitHub-Actions-Using-Job-concurrency/github-actions-exploring-variables-secrets.jpg)

## 3\. Comparing `cancel-in-progress` Options

| Setting                   | Behavior                               | When to Use                                            |
| ------------------------- | -------------------------------------- | ------------------------------------------------------ |
| cancel-in-progress: true  | Cancels any in-progress run            | Always pick the latest deployment; short-running tasks |
| cancel-in-progress: false | Queues new runs until current finishes | Ensure every run completes; long migrations or audits  |

## 4\. Queuing New Runs (No Cancellation)

If you’d rather wait for the current deploy to finish, set `cancel-in-progress: false`:

```
jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      - name: Docker Build
        run: echo docker build -t ${{ env.CONTAINER_REGISTRY }}/${{ vars.DOCKER_USERNAME }}/${{ IMAGE_NAME }}:latest
      - name: Docker Login
        run: echo docker login --username=${{ vars.DOCKER_USERNAME }} --password=${{ secrets.DOCKER_PASSWORD }}
      - name: Docker Publish
        run: echo docker push ${{ env.CONTAINER_REGISTRY }}/${{ vars.DOCKER_USERNAME }}/${{ IMAGE_NAME }}:latest


  deploy:
    needs: docker
    concurrency:
      group: production-deployment
      cancel-in-progress: false
    runs-on: ubuntu-latest
    steps:
      - name: Docker Run
        run: |
          echo docker run -d -p 8080:80 ${{ env.CONTAINER_REGISTRY }}/${{ vars.DOCKER_USERNAME }}/${{ IMAGE_NAME }}:latest
          sleep 600s
```

The second workflow’s `deploy` job will wait in the **Waiting** state until the first completes:

![The image shows a GitHub Actions interface with a workflow titled "Exploring Variables and Secrets" in progress, specifically highlighting a "Docker Run" step under the "deploy" job.](https://kodekloud.com/kk-media/image/upload/v1752876655/notes-assets/images/GitHub-Actions-Using-Job-concurrency/github-actions-exploring-variables-docker-run.jpg)

---

## Links and References

- [GitHub Actions: Workflow syntax for concurrency](https://docs.github.com/actions/learn-github-actions/workflow-syntax-for-github-actions#concurrency)
- [GitHub Actions Documentation](https://docs.github.com/actions)
- [Managing workflow runs](https://docs.github.com/actions/managing-workflow-runs)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions/module/0ac6c98f-7100-471e-b9aa-037f25cb58d7/lesson/048fae36-cac1-40a9-8606-dc0abaa2a555)**
>
> Watch video content
