# Workflow Setup Kubectl - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions/Continuous-Deployment-with-GitHub-Actions/Workflow-Setup-Kubectl)

---

## Table of Contents

- Workflow Setup Kubectl
  - Existing Workflow Overview
  - Adding the dev-deploy Job
  - Troubleshooting: Kubeconfig Required
  - Links and References
  - Watch Video
    - Job Summary
    - Using the Kubeconfig in Your Workflow

---

## Content

GitHub Actions

Continuous Deployment with GitHub Actions

# Workflow Setup Kubectl

In this guide, we’ll enhance our **Solar System** GitHub Actions workflow by installing the `kubectl` CLI on the runner. We’ll introduce a new job—`dev-deploy`—which deploys our application to the **development** Kubernetes namespace. This job will:

1.  Check out the code
2.  Install `kubectl`
3.  Validate cluster connectivity by fetching version and node details

## Existing Workflow Overview

Below is the current workflow up to the `docker` job. It runs on pushes to the `main` branch or any `feature/*` branch, and it uses MongoDB credentials stored in GitHub Secrets and Variables.

```
name: Solar System Workflow


on:
  workflow_dispatch:
  push:
    branches:
      - main
      - 'feature/*'


env:
  MONGO_URI: mongodb+srv://supercluster.d3jj.mongodb.net/superData
  MONGO_USERNAME: ${{ vars.MONGO_USERNAME }}
  MONGO_PASSWORD: ${{ secrets.MONGO_PASSWORD }}


jobs:
  unit-testing:
    # …
  code-coverage:
    # …
  docker:
    name: Containerization
    needs: [unit-testing, code-coverage]
    permissions:
      packages: write
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repo
        uses: actions/checkout@v4


      - name: Docker Hub Login
        uses: docker/login-action@v2.2.0
        with:
          username: ${{ vars.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_PASSWORD }}


      - name: GHCR Login
        uses: docker/login-action@v2.2.0
        with:
          registry: ghcr.io
          username: ${{ github.repository_owner }}
          password: ${{ secrets.GITHUB_TOKEN }}


      - name: Docker Build & Push
        uses: docker/build-push-action@v4
        with:
          context: .
          push: true
          tags: |
            ${{ vars.DOCKERHUB_USERNAME }}/solar-system:${{ github.sha }}
            ghcr.io/${{ github.repository_owner }}/solar-system:${{ github.sha }}
```

### Job Summary

| Job Name      | Purpose                          | Depends On                  |
| ------------- | -------------------------------- | --------------------------- |
| unit-testing  | Run unit tests                   | –                           |
| code-coverage | Generate code coverage reports   | unit-testing                |
| docker        | Build & push Docker images       | unit-testing, code-coverage |
| dev-deploy    | Install kubectl & verify cluster | docker                      |

---

## Adding the `dev-deploy` Job

Append the following job after `docker` to install `kubectl` and fetch cluster details:

```
  dev-deploy:
    name: Deploy to Development Cluster
    needs: docker
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repo
        uses: actions/checkout@v4


      - name: Install kubectl CLI
        uses: azure/setup-kubectl@v3
        with:
          version: 'v1.26.0'


      - name: Fetch Kubernetes Cluster Details
        run: |
          kubectl version --short
          echo "------------------------------"
          kubectl get nodes
```

You can find the `azure/setup-kubectl` action in the GitHub Marketplace:

![The image shows a GitHub Marketplace search results page for "kubectl," displaying various actions and tools related to Kubernetes management. The results include options like "Kubectl Apply" and "Kubectl tool installer," each with a brief description and star ratings.](https://kodekloud.com/kk-media/image/upload/v1752876479/notes-assets/images/GitHub-Actions-Workflow-Setup-Kubectl/github-marketplace-kubectl-tools-results.jpg)

After committing with the message “Installing kubectl,” your workflow will trigger a new run:

![The image shows a GitHub Actions page for a repository named "solar-system," displaying a list of workflow runs with their statuses and details.](https://kodekloud.com/kk-media/image/upload/v1752876481/notes-assets/images/GitHub-Actions-Workflow-Setup-Kubectl/github-actions-solar-system-workflows.jpg)

You can then view the real-time progress of each step:

![The image shows a GitHub Actions workflow in progress, detailing steps like unit testing, code coverage, containerization, and deployment.](https://kodekloud.com/kk-media/image/upload/v1752876481/notes-assets/images/GitHub-Actions-Workflow-Setup-Kubectl/github-actions-workflow-unit-testing.jpg)

---

## Troubleshooting: Kubeconfig Required

If you see an error like this, it means `kubectl` has no cluster context:

```
kubectl version --short
Client Version: v1.26.0
Error from server (Unauthorized): the server is currently unable to handle the request
```

> [!important]
> **Warning**
>
> You must provide a valid **Kubeconfig** so `kubectl` can authenticate with your Kubernetes API. Never commit this file to version control—store it as a [GitHub Secret](/docs/actions/reference/encrypted-secrets).

A typical `kubeconfig` looks like this:

```
apiVersion: v1
kind: Config
preferences: {}
clusters:
- cluster:
    certificate-authority-data: <base64-encoded-ca>
    server: https://example.k8s.cluster:6443
  name: my-cluster
contexts:
- context:
    cluster: my-cluster
    namespace: default
    user: my-cluster-admin
  name: my-cluster-context
current-context: my-cluster-context
users:
- name: my-cluster-admin
  user:
    client-certificate-data: <base64-encoded-cert>
    client-key-data: <base64-encoded-key>
```

### Using the Kubeconfig in Your Workflow

1.  **Add the Kubeconfig** as a secret, e.g., `KUBECONFIG_DATA`.
2.  **Inject it** into the runner and write it to `~/.kube/config`:

```
      - name: Configure Kubeconfig
        run: |
          mkdir -p ~/.kube
          echo "${{ secrets.KUBECONFIG_DATA }}" | base64 --decode > ~/.kube/config
```

With this step in place, your `dev-deploy` job will authenticate successfully and you’ll see both version and node information printed.

---

## Links and References

- [GitHub Actions: Workflow Syntax](https://docs.github.com/actions/using-workflows/workflow-syntax-for-github-actions)
- [azure/setup-kubectl Action](https://github.com/Azure/setup-kubectl)
- [Kubernetes Configuration Docs](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/)
- [GitHub Secrets](https://docs.github.com/actions/security-guides/encrypted-secrets)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions/module/92928734-1d5a-462d-9414-2d3865f5ef79/lesson/113baae1-442a-4756-b39e-fde67a9344ce)**
>
> Watch video content
