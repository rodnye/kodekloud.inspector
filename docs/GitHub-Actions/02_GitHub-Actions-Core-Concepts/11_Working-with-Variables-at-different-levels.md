# Working with Variables at different levels - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions/GitHub-Actions-Core-Concepts/Working-with-Variables-at-different-levels)

---

## Table of Contents

- Working with Variables at different levels
  - Overview of Environment Variable Scopes
  - 1. Step-Level Environment Variables
  - 2. Job-Level Environment Variables
  - 3. Workflow-Level Environment Variables
  - Verifying Your Workflow
  - References
  - Watch Video

---

## Content

GitHub Actions

GitHub Actions Core Concepts

# Working with Variables at different levels

Streamline your GitHub Actions workflows by reducing duplication and centralizing configuration with environment variables. In this guide, you’ll learn to declare variables at the **step**, **job**, and **workflow** levels, so you can:

- Maintain clean, DRY workflows
- Easily update container names, registry endpoints, and other parameters
- Secure sensitive data using [GitHub Secrets](https://docs.github.com/actions/security-guides/encrypted-secrets)

Below is a sample workflow file (`variable-secrets.yaml`) that builds, pushes, and deploys a Docker image:

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
        run: docker login --username=dockerUsername --password=s3CuRePa$$w0rd

      - name: Docker Publish
        run: docker push docker.io/dockerUsername/imageName:latest

  deploy:
    needs: docker
    runs-on: ubuntu-latest
    steps:
      - name: Docker Run
        run: docker run -d -p 8080:80 docker.io/dockerUsername/imageName:latest
```

Whenever you push:

1.  GitHub Actions builds the Docker image.
2.  Logs in to Docker Hub.
3.  Pushes the image.
4.  Runs the container in the `deploy` job, which depends on `docker`.

Notice how the registry, username, and image name are repeated. Let’s eliminate this duplication using environment variables.

---

## Overview of Environment Variable Scopes

| Level          | Declaration Location      | Scope                              |
| -------------- | ------------------------- | ---------------------------------- |
| Step-level     | Inside a specific step    | Only that step                     |
| Job-level      | Under `jobs.<job_id>.env` | All steps within that job          |
| Workflow-level | Top of the YAML file      | Every job and step in the workflow |

---

## 1\. Step-Level Environment Variables

Define variables in an individual step. This is ideal for values that aren’t reused elsewhere.

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
          DOCKER_PASSWORD: ${{ secrets.DOCKER_PASSWORD }}
        run: |
          docker login --username=${DOCKER_USERNAME} \
                        --password=${DOCKER_PASSWORD}

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
          docker run -d -p 8080:80 \
            ${{ env.CONTAINER_REGISTRY }}/${{ env.DOCKER_USERNAME }}/${{ env.IMAGE_NAME }}:latest
```

You can reference an environment variable using:

- `$VAR_NAME`
- `${{ env.VAR_NAME }}` _(recommended when mixing with expressions)_

---

## 2\. Job-Level Environment Variables

Apply the same variables to all steps in a job by declaring them under `jobs.<job_id>.env`:

```
jobs:
  docker:
    runs-on: ubuntu-latest
    env:
      CONTAINER_REGISTRY: docker.io
      DOCKER_USERNAME: siddharth1
      IMAGE_NAME: github-actions-nginx
    steps:
      - name: Docker Build
        run: |
          docker build -t $CONTAINER_REGISTRY/$DOCKER_USERNAME/$IMAGE_NAME:latest

      - name: Docker Login
        env:
          DOCKER_PASSWORD: ${{ secrets.DOCKER_PASSWORD }}
        run: |
          docker login --username=${DOCKER_USERNAME} \
                        --password=${DOCKER_PASSWORD}

      - name: Docker Publish
        run: |
          docker push $CONTAINER_REGISTRY/$DOCKER_USERNAME/$IMAGE_NAME:latest

  deploy:
    needs: docker
    runs-on: ubuntu-latest
    env:
      CONTAINER_REGISTRY: docker.io
      DOCKER_USERNAME: siddharth1
      IMAGE_NAME: github-actions-nginx
    steps:
      - name: Docker Run
        run: |
          docker run -d -p 8080:80 \
            $CONTAINER_REGISTRY/$DOCKER_USERNAME/$IMAGE_NAME:latest
```

Any `env` under a job cascades to every step. You can still override or augment variables at the step level.

---

## 3\. Workflow-Level Environment Variables

Declare variables at the top of your workflow to make them available across **all** jobs and steps:

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
          docker build -t ${{ env.CONTAINER_REGISTRY }}/${{ env.DOCKER_USERNAME }}/${{ env.IMAGE_NAME }}:latest

      - name: Docker Login
        env:
          DOCKER_PASSWORD: ${{ secrets.DOCKER_PASSWORD }}
        run: |
          docker login --username=${DOCKER_USERNAME} \
                        --password=${DOCKER_PASSWORD}

      - name: Docker Publish
        run: |
          docker push $CONTAINER_REGISTRY/$DOCKER_USERNAME/$IMAGE_NAME:latest

  deploy:
    needs: docker
    runs-on: ubuntu-latest
    steps:
      - name: Docker Run
        run: |
          docker run -d -p 8080:80 \
            $CONTAINER_REGISTRY/$DOCKER_USERNAME/$IMAGE_NAME:latest
```

> [!important]
> **Warning**
>
> Never hard-code sensitive values like passwords or API keys. Store them in [GitHub Secrets](https://docs.github.com/actions/security-guides/encrypted-secrets) and reference them with `${{ secrets.YOUR_SECRET_NAME }}`.

---

## Verifying Your Workflow

1.  Commit and push your changes.
2.  Open the **Actions** tab in your repository.
3.  Watch the **docker** and **deploy** jobs run sequentially.
4.  Expand each step to confirm that variables are correctly substituted and that secrets remain masked.

> [!important]
> **Note**
>
> Use `${{ env.VAR_NAME }}` when combining expressions with literal strings to ensure consistent parsing.

---

## References

- [GitHub Actions: Workflow syntax for GitHub Actions](https://docs.github.com/actions/reference/workflow-syntax-for-github-actions)
- [GitHub Actions: Encrypted secrets](https://docs.github.com/actions/security-guides/encrypted-secrets)
- [Docker Hub](https://hub.docker.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions/module/0ac6c98f-7100-471e-b9aa-037f25cb58d7/lesson/f773ae7f-5cc1-4b3f-ba54-aa9470b793a4)**
>
> Watch video content
