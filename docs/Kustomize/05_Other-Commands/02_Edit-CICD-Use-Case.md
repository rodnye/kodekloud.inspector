# Edit CICD Use Case - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kustomize/Other-Commands/Edit-CICD-Use-Case)

---

## Table of Contents

- Edit CICD Use Case
  - Table of Contents
  - CI/CD Pipeline Overview
  - 1. Triggering the Pipeline
  - 2. Installing Dependencies & Running Tests
  - 3. Building & Tagging the Container Image
  - 4. Updating Manifests with kustomize edit
  - 5. Deploying to Kubernetes
  - References
  - Watch Video
  - Practice Lab

---

## Content

Kustomize

Other Commands

# Edit CICD Use Case

In this guide, you’ll learn how to integrate the `kustomize edit set image` command into your CI/CD pipeline. By the end, you’ll understand how to automatically update your Kubernetes manifests with a new image tag whenever a build completes successfully.

## Table of Contents

1.  [CI/CD Pipeline Overview](#cicd-pipeline-overview)
2.  [1\. Triggering the Pipeline](#1-triggering-the-pipeline)
3.  [2\. Installing Dependencies & Running Tests](#2-installing-dependencies--running-tests)
4.  [3\. Building & Tagging the Container Image](#3-building--tagging-the-container-image)
5.  [4\. Updating Manifests with `kustomize edit`](#4-updating-manifests-with-kustomize-edit)
6.  [5\. Deploying to Kubernetes](#5-deploying-to-kubernetes)
7.  [References](#references)

---

## CI/CD Pipeline Overview

This is a typical flow for deploying code changes:

| Stage      | Description                                           | Example Command                                                                              |
| ---------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Push Code  | Developer pushes to GitHub                            | `git push origin main`                                                                       |
| Build      | Install deps & run tests                              | `go mod download` / `go test ./...`                                                          |
| Tag & Push | Build Docker image with commit hash, push to registry | `docker build -t myrepo/api:$GIT_COMMIT_HASH .`<br>`docker push myrepo/api:$GIT_COMMIT_HASH` |
| Update     | Use Kustomize to set the new image in manifests       | `kustomize edit set image api=myrepo/api:$GIT_COMMIT_HASH`                                   |
| Deploy     | Apply the updated overlay to production cluster       | `kubectl apply -k overlays/production`                                                       |

> [!important]
> **Note**
>
> Using a Git commit hash (or semantic version) as your Docker image tag ensures traceability between your code and the container you deploy.

---

## 1\. Triggering the Pipeline

Any push to the main branch starts the CI/CD process. For example:

```
git push origin main
```

Your CI system (GitHub Actions, Jenkins, GitLab CI, etc.) detects the new commit and enters the build stage.

---

## 2\. Installing Dependencies & Running Tests

In the build stage, install dependencies and execute tests:

```
# Download Go modules
go mod download


# Execute all tests
go test ./...
```

If all tests pass, the pipeline moves on to building the Docker image.

---

## 3\. Building & Tagging the Container Image

Most CI systems provide an environment variable for the commit SHA. For instance:

```
# Provided by CI environment
GIT_COMMIT_HASH=abcdef123


# Build and tag the image
docker build -t myrepo/api:$GIT_COMMIT_HASH .
docker push myrepo/api:$GIT_COMMIT_HASH
```

Here, `myrepo/api:abcdef123` uniquely identifies the image corresponding to this commit.

---

## 4\. Updating Manifests with kustomize edit

In the CD stage, adjust your Kustomize overlay so the manifest points to the new image tag:

```
kustomize edit set image api=myrepo/api:$GIT_COMMIT_HASH
```

This command modifies the `images` section of your `kustomization.yaml`:

```
images:
- name: api
  newName: myrepo/api
  newTag: abcdef123
```

> [!important]
> **Warning**
>
> Ensure your `kustomization.yaml` is under version control so you can track these automated updates. Avoid committing sensitive credentials or hardcoded tags.

---

## 5\. Deploying to Kubernetes

With your overlay updated, deploy the change to production:

```
kubectl apply -k overlays/production
```

Kubernetes will detect the new image tag, pull `myrepo/api:abcdef123`, and perform a rolling update.

---

## References

- [Kustomize Documentation](https://kubectl.docs.kubernetes.io/references/kustomize/)
- [Kubernetes Overviews & Tutorials](https://kubernetes.io/docs/tutorials/)
- [Docker Hub](https://hub.docker.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kustomize/module/060e95ac-e56c-42ed-be87-8701328432c3/lesson/9d6dc297-8f5d-497d-8991-a80c05acaef1)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/kustomize/module/8ee78739-877b-4e11-a7a6-82ef7210468b/lesson/3dabb285-4658-4e1f-913a-eed08b1ca049)**
>
> Practice lab
