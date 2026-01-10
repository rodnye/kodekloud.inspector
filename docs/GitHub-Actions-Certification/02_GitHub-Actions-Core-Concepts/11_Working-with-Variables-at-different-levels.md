# Working with Variables at different levels - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/GitHub-Actions-Core-Concepts/Working-with-Variables-at-different-levels)

---

## Table of Contents

- Working with Variables at different levels
  - 1. Baseline Workflow (Hard-coded Values)
  - 2. Step-Level Environment Variables
  - 3. Job-Level Environment Variables
  - 4. Workflow-Level Environment Variables
  - 5. Running the Workflow and Inspecting Logs
  - Next Steps
  - Watch Video
    - Referencing Variables
    - Variable Scope Overview

---

## Content

GitHub Actions Certification

GitHub Actions Core Concepts

# Working with Variables at different levels

Learn how to refactor hard-coded values into environment variables within your GitHub Actions workflows. This approach adheres to the DRY principle, simplifies maintenance, and enhances readability.

---

## 1\. Baseline Workflow (Hard-coded Values)

```
name: Exploring Variables and Secrets


on:
  push:


jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      - name: Docker Build
        run: docker build -t docker.io/dockerUsername/imageName:latest

      - name: Docker Login
        run: docker login --username=dockerUsername --password=s3curePaSsW0rd

      - name: Docker Publish
        run: docker push docker.io/dockerUsername/imageName:latest


  deploy:
    needs: docker
    runs-on: ubuntu-latest
    steps:
      - name: Docker Run
        run: docker run -d -p 8000:80 docker.io/dockerUsername/imageName:latest
```

> [!important]
> **Warning**
>
> Hard-coding credentials like `dockerUsername` and `s3curePaSsW0rd` is insecure and violates DRY. Always use variables and secrets instead.

---

## 2\. Step-Level Environment Variables

Define `env` per step to remove inline repetition:

```
jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      - name: Docker Build
        env:
          CONTAINER_REGISTRY: docker.io
          DOCKER_USERNAME: siddharth1
          IMAGE_NAME: github-actions-nginx
        run: |
          docker build -t $CONTAINER_REGISTRY/$DOCKER_USERNAME/$IMAGE_NAME:latest


      - name: Docker Login
        env:
          DOCKER_USERNAME: siddharth1
          DOCKER_PASSWORD: s3cUrePaSsW0rd
        run: |
          docker login --username=$DOCKER_USERNAME --password=$DOCKER_PASSWORD


      - name: Docker Publish
        env:
          CONTAINER_REGISTRY: docker.io
          DOCKER_USERNAME: siddharth1
          IMAGE_NAME: github-actions-nginx
        run: |
          docker push $CONTAINER_REGISTRY/$DOCKER_USERNAME/$IMAGE_NAME:latest


  deploy:
    needs: docker
    runs-on: ubuntu-latest
    steps:
      - name: Docker Run
        env:
          CONTAINER_REGISTRY: docker.io
          DOCKER_USERNAME: siddharth1
          IMAGE_NAME: github-actions-nginx
        run: |
          docker run -d -p 8080:80 $CONTAINER_REGISTRY/$DOCKER_USERNAME/$IMAGE_NAME:latest
```

### Referencing Variables

You can reference environment variables in two ways inside `run:` blocks:

1.  **Shell syntax**

    ```
    $DOCKER_USERNAME
    ```

2.  **GitHub Actions expression**

    ```
    ${{ env.DOCKER_USERNAME }}
    ```

Both methods are supported; choose based on readability.

---

## 3\. Job-Level Environment Variables

Move shared variables to the job level so all steps inherit them:

```
jobs:
  docker:
    env:
      CONTAINER_REGISTRY: docker.io
      DOCKER_USERNAME: siddharth1
      IMAGE_NAME: github-actions-nginx
    runs-on: ubuntu-latest
    steps:
      - name: Docker Build
        run: |
          docker build -t $CONTAINER_REGISTRY/$DOCKER_USERNAME/$IMAGE_NAME:latest


      - name: Docker Login
        env:
          DOCKER_PASSWORD: s3CuRePa$s$w0rd
        run: |
          docker login --username=$DOCKER_USERNAME --password=$DOCKER_PASSWORD


      - name: Docker Publish
        run: |
          docker push $CONTAINER_REGISTRY/$DOCKER_USERNAME/$IMAGE_NAME:latest


  deploy:
    needs: docker
    env:
      CONTAINER_REGISTRY: docker.io
      DOCKER_USERNAME: siddharth1
      IMAGE_NAME: github-actions-nginx
    runs-on: ubuntu-latest
    steps:
      - name: Docker Run
        run: |
          docker run -d -p 8080:80 $CONTAINER_REGISTRY/$DOCKER_USERNAME/$IMAGE_NAME:latest
```

- Job-level `env` applies to all steps in that job.
- Step-specific `env` values (like `DOCKER_PASSWORD`) override or extend the job-level settings.

### Variable Scope Overview

| Level    | Scope                 | Use Case                                | Override Priority |
| -------- | --------------------- | --------------------------------------- | ----------------- |
| Step     | Single step           | Unique or one-off values                | Highest           |
| Job      | All steps in a job    | Shared variables for related steps      | Medium            |
| Workflow | Every job in workflow | Global defaults and project-wide values | Lowest            |

---

## 4\. Workflow-Level Environment Variables

Set `env` at the workflow root so all jobs inherit the same defaults:

```
name: Exploring Variables and Secrets


on:
  push:


env:
  CONTAINER_REGISTRY: docker.io
  DOCKER_USERNAME: siddharth1
  IMAGE_NAME: github-actions-nginx


jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      - name: Docker Build
        run: |
          docker build -t ${{ env.CONTAINER_REGISTRY }}/$DOCKER_USERNAME/$IMAGE_NAME:latest


      - name: Docker Login
        env:
          DOCKER_PASSWORD: s3CuRePaSsW0rd
        run: |
          docker login --username=$DOCKER_USERNAME --password=$DOCKER_PASSWORD


      - name: Docker Publish
        run: |
          docker push $CONTAINER_REGISTRY/$DOCKER_USERNAME/$IMAGE_NAME:latest


  deploy:
    needs: docker
    runs-on: ubuntu-latest
    steps:
      - name: Docker Run
        run: |
          docker run -d -p 8080:80 $CONTAINER_REGISTRY/$DOCKER_USERNAME/$IMAGE_NAME:latest
```

All jobs now share `CONTAINER_REGISTRY`, `DOCKER_USERNAME`, and `IMAGE_NAME` from the workflow-level `env`.

---

## 5\. Running the Workflow and Inspecting Logs

Once the workflow runs, GitHub Actions expands and masks sensitive data:

```
docker build -t docker.io/siddharth1/github-actions-nginx:latest
docker login --username=siddharth1 -****
docker push docker.io/siddharth1/github-actions-nginx:latest
docker run -d -p 8080:80 docker.io/siddharth1/github-actions-nginx:latest
```

> [!important]
> **Note**
>
> Sensitive values like `DOCKER_PASSWORD` are automatically masked in the logs.

---

## Next Steps

Learn how to use **secrets** for secure storage of credentials:

- [GitHub Actions: Encrypted Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [GitHub Actions: Variables](https://docs.github.com/en/actions/learn-github-actions/variables)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/54711be0-66e6-461b-b935-f77d78a5e000/lesson/887fa064-69db-46c2-ba6f-5eea0f63707e)**
>
> Watch video content
