# Workflow Docker Login - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/Continuous-Integration-with-GitHub-Actions/Workflow-Docker-Login)

---

## Table of Contents

- Workflow Docker Login
  - Prerequisites
  - 1. Existing Workflow Overview
  - 2. Dockerfile for the Application
  - 3. Add the Containerization Job
  - 4. Store Credentials as Variables and Secrets
  - 5. Commit and Push
  - 6. Verify the Workflow Run
  - Links and References
  - Watch Video

---

## Content

GitHub Actions Certification

Continuous Integration with GitHub Actions

# Workflow Docker Login

In this guide, you’ll learn how to integrate Docker Hub authentication into your GitHub Actions CI/CD pipeline. By the end, your workflow will automatically build and push a Docker image once unit tests and code coverage checks have passed.

## Prerequisites

- A GitHub repository containing your application code and a `Dockerfile`.
- Unit tests and code coverage steps already configured in your workflow.
- Docker Hub account with repository access.

## 1\. Existing Workflow Overview

Below is an example workflow that runs unit tests and measures code coverage on every push to `main` or any `feature/*` branch:

```
name: Solar System Workflow

on:
  push:
    branches:
      - main
      - 'feature/*'
  workflow_dispatch:

env:
  MONGO_URI: 'mongodb+srv://supercluster.d83jj.mongodb.net/superData'
  MONGO_USERNAME: ${{ vars.MONGO_USERNAME }}
  MONGO_PASSWORD: ${{ secrets.MONGO_PASSWORD }}

jobs:
  unit-testing: …
  code-coverage: …
```

## 2\. Dockerfile for the Application

Ensure your repository includes a `Dockerfile` like this:

```
FROM node:18-alpine3.17
WORKDIR /usr/app

COPY package*.json /usr/app/
RUN npm install

COPY . .
ENV MONGO_URI=uriPlaceholder
ENV MONGO_USERNAME=usernamePlaceholder
ENV MONGO_PASSWORD=passwordPlaceholder

EXPOSE 3000
CMD ["npm", "start"]
```

## 3\. Add the Containerization Job

We’ll create a new job named `containerization` that depends on the previous jobs. This job will:

1.  Check out the repository.
2.  Authenticate to Docker Hub.
3.  Build and push the Docker image.

```
jobs:
  unit-testing: …
  code-coverage: …

  containerization:
    name: Containerization
    needs: [unit-testing, code-coverage]
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Log in to Docker Hub
        uses: docker/login-action@v2
        with:
          username: ${{ vars.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_PASSWORD }}

      - name: Build Docker Image
        run: |
          docker build -t my-app:${{ github.sha }} .

      - name: Push Docker Image
        run: |
          docker push my-app:${{ github.sha }}
```

> [!important]
> **Note**
>
> Replace `my-app` with your Docker Hub repository name (e.g., `username/solar-system`).
> You can also tag with `:latest` or semantic versions.

## 4\. Store Credentials as Variables and Secrets

To prevent exposing your Docker Hub credentials in the workflow, add them via the GitHub UI:

| Name                  | Type     | Location                                               |
| --------------------- | -------- | ------------------------------------------------------ |
| DOCKERHUB\\\_USERNAME | Variable | Settings → Secrets and variables → Actions → Variables |
| DOCKERHUB\\\_PASSWORD | Secret   | Settings → Secrets and variables → Actions → Secrets   |

1.  Go to **Settings > Secrets and variables > Actions**.
2.  Under **Repository variables**, click **New repository variable** and add `DOCKERHUB_USERNAME`.
3.  Under **Repository secrets**, click **New repository secret** and add `DOCKERHUB_PASSWORD`.

![Add a new secret in GitHub repository settings](https://kodekloud.com/kk-media/image/upload/v1752876011/notes-assets/images/GitHub-Actions-Certification-Workflow-Docker-Login/github-repo-settings-add-secret.jpg)

![Manage Actions secrets and variables in GitHub repository settings](https://kodekloud.com/kk-media/image/upload/v1752876012/notes-assets/images/GitHub-Actions-Certification-Workflow-Docker-Login/github-repo-settings-actions-secrets.jpg)

![Add a new Actions variable for Docker Hub username](https://kodekloud.com/kk-media/image/upload/v1752876013/notes-assets/images/GitHub-Actions-Certification-Workflow-Docker-Login/github-settings-action-variable-dockerhub.jpg)

![Overview of Actions secrets and variables management](https://kodekloud.com/kk-media/image/upload/v1752876014/notes-assets/images/GitHub-Actions-Certification-Workflow-Docker-Login/github-repo-settings-actions-secrets-2.jpg)

> [!important]
> **Warning**
>
> Never hardcode sensitive credentials in your workflow files. Always use **Secrets** for passwords and **Variables** for non-sensitive values.

## 5\. Commit and Push

After updating `.github/workflows/ci.yml` (or your workflow filename), commit your changes and push to the repository:

```
git add .github/workflows/ci.yml
git commit -m "chore: add Docker login and image push"
git push
```

## 6\. Verify the Workflow Run

1.  Navigate to the **Actions** tab in your repository.
2.  Select the latest run of your workflow.
3.  Confirm that:
    - The `containerization` job starts only after `unit-testing` and `code-coverage`.
    - The Docker Hub login step completes without printing your password.

![List of workflow runs in GitHub Actions](https://kodekloud.com/kk-media/image/upload/v1752876015/notes-assets/images/GitHub-Actions-Certification-Workflow-Docker-Login/github-actions-solar-system-workflows.jpg)

![Successful containerization job with Docker Hub login step](https://kodekloud.com/kk-media/image/upload/v1752876016/notes-assets/images/GitHub-Actions-Certification-Workflow-Docker-Login/github-actions-workflow-docker-containerization.jpg)

Congratulations! You have successfully set up Docker Hub login within your GitHub Actions pipeline, enabling automatic building and publishing of your container images.

---

## Links and References

- [docker/login-action](https://github.com/docker/login-action)
- [GitHub Actions Secrets and variables](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Docker Hub Documentation](https://docs.docker.com/docker-hub/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/56d72a06-285c-4516-9880-073fb56f579b/lesson/1b596692-1438-444d-b75b-db956f270a83)**
>
> Watch video content
