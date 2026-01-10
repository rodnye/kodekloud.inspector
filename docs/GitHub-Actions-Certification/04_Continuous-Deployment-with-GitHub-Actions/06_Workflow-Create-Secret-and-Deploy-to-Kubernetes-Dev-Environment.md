# Workflow Create Secret and Deploy to Kubernetes Dev Environment - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/Continuous-Deployment-with-GitHub-Actions/Workflow-Create-Secret-and-Deploy-to-Kubernetes-Dev-Environment)

---

## Table of Contents

- Workflow Create Secret and Deploy to Kubernetes Dev Environment
  - 1. Update the GitHub Actions Workflow
  - 2. Kubernetes Deployment Manifest
  - 3. Repository Variables and Secrets
  - 4. Running the Workflow
  - 5. Verifying in Kubernetes
  - 6. Accessing the Application
  - Links and References
  - Watch Video

---

## Content

GitHub Actions Certification

Continuous Deployment with GitHub Actions

# Workflow Create Secret and Deploy to Kubernetes Dev Environment

In this guide, you’ll learn how to deploy your application to a Kubernetes development environment using GitHub Actions. We’ll assume your Kubernetes manifests already contain the correct values, then show you how to add a `dev-deploy` job that replaces tokens, creates a MongoDB secret, and applies your manifests.

## 1\. Update the GitHub Actions Workflow

Open `.github/workflows/main.yml` and add the `dev-deploy` job:

```
name: Solar System Workflow

on:
  workflow_dispatch:
  push:
    branches:
      - main
      - 'feature/*'

env:
  MONGO_URI: 'mongodb+srv://supercluster.d83jj.mongodb.net/superData'
  MONGO_USERNAME: ${{ vars.MONGO_USERNAME }}
  MONGO_PASSWORD: ${{ secrets.MONGO_PASSWORD }}

jobs:
  unit-testing:
    # …

  code-coverage:
    # …

  docker:
    # …

  dev-deploy:
    runs-on: ubuntu-latest
    needs: docker
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Replace tokens in manifest files
        uses: cschleiden/replace-tokens@v1
        with:
          tokenPrefix: '_'
          tokenSuffix: '_'
          files: kubernetes/development/*.yaml
        env:
          NAMESPACE: ${{ vars.NAMESPACE }}
          REPLICAS: ${{ vars.REPLICAS }}
          IMAGE: ${{ vars.DOCKERHUB_USERNAME }}/solar-system:${{ github.sha }}
          INGRESS_IP: ${{ env.INGRESS_IP }}

      - name: Verify updated manifests
        run: |
          cat kubernetes/development/*.yaml

      - name: Create MongoDB Secret
        run: |
          kubectl -n ${{ vars.NAMESPACE }} create secret generic mongo-db-creds \
            --from-literal=MONGO_URI=${{ env.MONGO_URI }} \
            --from-literal=MONGO_USERNAME=${{ env.MONGO_USERNAME }} \
            --from-literal=MONGO_PASSWORD=${{ secrets.MONGO_PASSWORD }} \
            --save-config \
            --dry-run=client \
            -o yaml | kubectl apply -f -

      - name: Deploy to Dev Environment
        run: |
          kubectl apply -f kubernetes/development
```

## 2\. Kubernetes Deployment Manifest

Ensure your `deployment.yaml` in `kubernetes/development/` references the secret for environment variables:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: solar-system
  namespace: _NAMESPACE_
  labels:
    app: solar-system
spec:
  replicas: _REPLICAS_
  selector:
    matchLabels:
      app: solar-system
  template:
    metadata:
      labels:
        app: solar-system
    spec:
      containers:
      - name: solar-system
        image: _IMAGE_
        imagePullPolicy: Always
        ports:
        - containerPort: 3000
      envFrom:
      - secretRef:
          name: mongo-db-creds
```

## 3\. Repository Variables and Secrets

Configure the following under **Settings > Secrets and variables** in your GitHub repository.

![The image shows a GitHub repository settings page focused on "Secrets and variables" under "Actions." It displays options for managing environment and repository variables, with some variables listed.](https://kodekloud.com/kk-media/image/upload/v1752875922/notes-assets/images/GitHub-Actions-Certification-Workflow-Create-Secret-and-Deploy-to-Kubernetes-Dev-Environment/github-repo-settings-secrets-variables.jpg)

| Variable / Secret    | Type                 | Description                                 |
| -------------------- | -------------------- | ------------------------------------------- |
| `MONGO_URI`          | Environment Variable | MongoDB connection string.                  |
| `MONGO_USERNAME`     | Repository Variable  | Username for MongoDB.                       |
| `MONGO_PASSWORD`     | Encrypted Secret     | Password for MongoDB.                       |
| `NAMESPACE`          | Repository Variable  | Kubernetes namespace (e.g., `development`). |
| `REPLICAS`           | Repository Variable  | Number of pod replicas (e.g., `2`).         |
| `DOCKERHUB_USERNAME` | Repository Variable  | Docker Hub account name.                    |

## 4\. Running the Workflow

Push your changes to `main` or any `feature/*` branch. Then, monitor the pipeline in the **Actions** tab of your repository.

![The image shows a GitHub Actions page for a repository named "solar-system," displaying a list of workflow runs with their statuses and details.](https://kodekloud.com/kk-media/image/upload/v1752875924/notes-assets/images/GitHub-Actions-Certification-Workflow-Create-Secret-and-Deploy-to-Kubernetes-Dev-Environment/github-actions-solar-system-workflows.jpg)

> [!important]
> **Note**
>
> The `dev-deploy` job runs after the `docker` job (and its dependencies: `unit-testing` and `code-coverage`). It checks out the repo, replaces tokens, creates the MongoDB secret, and applies the Kubernetes manifests.

![The image shows a GitHub Actions workflow in progress, displaying a series of jobs including unit testing, code coverage, containerization, and deployment. The workflow is visualized with a flowchart indicating the status of each step.](https://kodekloud.com/kk-media/image/upload/v1752875925/notes-assets/images/GitHub-Actions-Certification-Workflow-Create-Secret-and-Deploy-to-Kubernetes-Dev-Environment/github-actions-workflow-flowchart.jpg)

## 5\. Verifying in Kubernetes

Once the workflow succeeds, confirm the resources:

```
kubectl -n development get secrets
kubectl -n development get all
```

You should see:

- `mongo-db-creds` secret
- Deployment and Pods for `solar-system`
- Service and Ingress resources

## 6\. Accessing the Application

Retrieve and open the ingress endpoint:

```
kubectl -n development get ingress
```

Open the `HOSTNAME` in your browser.

> [!important]
> **Warning**
>
> If you encounter a self-signed certificate warning, safely accept it to proceed to the application.

---

This lesson covers creating a Kubernetes secret and deploying to a development cluster via GitHub Actions. Integration testing for this deployment will be addressed in an upcoming article.

## Links and References

- \[GitHub Actions Documentation\]\[GitHub Actions\]
- \[GitHub Secrets and Variables\]\[GitHub Secrets and Variables docs\]
- \[Kubernetes Secrets\]\[Kubernetes Secrets\]
- \[Kubernetes Ingress\]\[Ingress docs\]

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/b6687abe-8094-4750-910b-5daa8bc710b1/lesson/16c39b54-670e-4b69-ba32-fd62e4db68b7)**
>
> Watch video content
