# Working with Repository Level Secrets - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/GitHub-Actions-Core-Concepts/Working-with-Repository-Level-Secrets)

---

## Table of Contents

- Working with Repository Level Secrets
  - Table of Contents
  - Why Use Secrets and Variables?
  - Scopes of Secrets and Variables
  - Adding a Repository-Level Secret
  - Adding a Repository-Level Variable
  - Referencing Secrets and Variables
  - Inspecting Workflow Logs
  - Further Reading
  - Watch Video
  - Practice Lab
    - Secure Workflow with Repository-Level Secrets and Variables

---

## Content

GitHub Actions Certification

GitHub Actions Core Concepts

# Working with Repository Level Secrets

Securely managing sensitive data in GitHub Actions is essential for robust CI/CD pipelines. In this guide, you’ll learn how to store credentials at the repository level and reference them in your workflows without exposing plain-text values.

## Table of Contents

- [Why Use Secrets and Variables?](#why-use-secrets-and-variables)
- [Scopes of Secrets and Variables](#scopes-of-secrets-and-variables)
- [Adding a Repository-Level Secret](#adding-a-repository-level-secret)
- [Adding a Repository-Level Variable](#adding-a-repository-level-variable)
- [Referencing Secrets and Variables](#referencing-secrets-and-variables)
- [Inspecting Workflow Logs](#inspecting-workflow-logs)
- [Further Reading](#further-reading)

---

## Why Use Secrets and Variables?

Embedding credentials in workflow YAML blocks risks accidental leaks via PRs, clones, or shared logs. GitHub Actions provides a secure mechanism to inject encrypted values at runtime:

- **Secrets** for sensitive data (passwords, tokens).
- **Variables** for non-sensitive settings (usernames, tags).

## Scopes of Secrets and Variables

You can define secrets and variables at three different levels:

| Scope        | Use Case                                    | Visibility                            |
| ------------ | ------------------------------------------- | ------------------------------------- |
| Organization | Shared across multiple repositories         | Only Org Admins                       |
| Repository   | Shared by all workflows in a single repo    | Write access to Settings              |
| Environment  | Limited to specific deployment environments | Environment admins and selected roles |

---

## Adding a Repository-Level Secret

1.  Navigate to **Settings** > **Secrets and variables** > **Actions**.
2.  Click **New repository secret**, set the **Name** (e.g., `DOCKER_PASSWORD`), and paste your secret.
3.  Click **Add secret** to save.

![The image shows a GitHub repository settings page where a new secret named "DOCKER_PASSWORD" is being added. The secret value is partially visible, and there's an "Add secret" button.](https://kodekloud.com/kk-media/image/upload/v1752876193/notes-assets/images/GitHub-Actions-Certification-Working-with-Repository-Level-Secrets/github-repo-settings-add-docker-password.jpg)

> [!important]
> **Note**
>
> Repository secrets are encrypted and cannot be viewed once saved. If you lose the value, you must recreate the secret.

---

## Adding a Repository-Level Variable

1.  Still under **Settings** > **Secrets and variables** > **Actions**, select **New repository variable**.
2.  Enter **Name** (e.g., `DOCKER_USERNAME`) and **Value**.
3.  Click **Add variable** to confirm.

![The image shows a GitHub settings page for adding a new actions variable, with fields for "Name" and "Value." The "Name" field is filled with "DOCKER_USERNAME."](https://kodekloud.com/kk-media/image/upload/v1752876194/notes-assets/images/GitHub-Actions-Certification-Working-with-Repository-Level-Secrets/github-settings-actions-variable-docker-username.jpg)

> [!important]
> **Note**
>
> Repository variables are visible in Settings but cannot expose sensitive information.
> Use variables for configuration values that are not confidential.

---

## Referencing Secrets and Variables

Below is an **insecure** example with a plain-text password:

```
name: Exploring Variables and Secrets
on: [push]


env:
  CONTAINER_REGISTRY: docker.io
  DOCKER_USERNAME: siddharth1
  IMAGE_NAME: github-actions-nginx


jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      - name: Docker Build
        run: echo docker build


      - name: Docker Login
        env:
          DOCKER_PASSWORD: s3cUrePasSw0rd
        run: echo docker login --username=$DOCKER_USERNAME --password=$DOCKER_PASSWORD


      - name: Docker Publish
        run: echo docker push $CONTAINER_REGISTRY/$DOCKER_USERNAME/$IMAGE_NAME:latest
```

### Secure Workflow with Repository-Level Secrets and Variables

```
name: Exploring Variables and Secrets
on: [push]


env:
  CONTAINER_REGISTRY: docker.io
  IMAGE_NAME: github-actions-nginx


jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      - name: Docker Build
        run: |
          echo docker build \
            -t ${{ env.CONTAINER_REGISTRY }}/${{ vars.DOCKER_USERNAME }}/${{ env.IMAGE_NAME }}:latest


      - name: Docker Login
        run: |
          echo docker login \
            --username=${{ vars.DOCKER_USERNAME }} \
            --password=${{ secrets.DOCKER_PASSWORD }}


      - name: Docker Publish
        run: |
          echo docker push \
            ${{ env.CONTAINER_REGISTRY }}/${{ vars.DOCKER_USERNAME }}/${{ env.IMAGE_NAME }}:latest


  deploy:
    needs: docker
    runs-on: ubuntu-latest
    steps:
      - name: Docker Run
        run: |
          echo docker run -d -p 8080:80 \
            ${{ env.CONTAINER_REGISTRY }}/${{ vars.DOCKER_USERNAME }}/${{ env.IMAGE_NAME }}:latest
```

> [!important]
> **Warning**
>
> Your editor might flag unresolved `${{ vars.* }}` or `${{ secrets.* }}` references. These work at runtime and can be safely ignored.

---

## Inspecting Workflow Logs

After committing and pushing your workflow, visit the **Actions** tab to observe the run:

![The image shows a GitHub Actions workflow interface with a job named "docker" that is currently queued. The workflow is triggered by a push event and involves a file named `variable-secrets.yml`.](https://kodekloud.com/kk-media/image/upload/v1752876195/notes-assets/images/GitHub-Actions-Certification-Working-with-Repository-Level-Secrets/github-actions-docker-queued-workflow.jpg)

Expand the **Docker Login** step to verify masking:

```
echo docker login \
  --username=${{ vars.DOCKER_USERNAME }} \
  --password=${{ secrets.DOCKER_PASSWORD }}
  shell: /usr/bin/bash -e {0}
  env:
    CONTAINER_REGISTRY: docker.io
    IMAGE_NAME: github-actions-nginx
docker login --username=siddharth1 --***
```

![The image shows a GitHub repository settings page focused on "Actions secrets and variables," with a section for managing environment and repository variables. A repository variable named "DOCKER_USERNAME" is highlighted.](https://kodekloud.com/kk-media/image/upload/v1752876196/notes-assets/images/GitHub-Actions-Certification-Working-with-Repository-Level-Secrets/github-repo-settings-actions-secrets.jpg)

Secrets remain hidden (`***`) and variables load correctly at runtime.

---

## Further Reading

- [GitHub Actions: Encrypted Secrets](https://docs.github.com/actions/security-guides/encrypted-secrets)
- [GitHub Actions: Variables](https://docs.github.com/actions/learn-github-actions/variables)
- [GitHub Actions Workflow Syntax](https://docs.github.com/actions/using-workflows/workflow-syntax-for-github-actions)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/54711be0-66e6-461b-b935-f77d78a5e000/lesson/d5436351-8810-41ce-8101-735d3ccb00b4)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/github-actions-certification/module/54711be0-66e6-461b-b935-f77d78a5e000/lesson/bfc35eeb-db29-492f-904f-05e0be0240c1)**
>
> Practice lab
