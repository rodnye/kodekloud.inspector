# Step 3 Using Inputs in Reusable Workflow - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/Reusable-Workflows-and-Reporting/Step-3-Using-Inputs-in-Reusable-Workflow)

---

## Table of Contents

- Step 3 Using Inputs in Reusable Workflow
  - 1. Define a Basic Reusable Workflow
  - 2. Store MongoDB URI as a Repository Variable
  - 3. Add workflow_call Inputs
  - 4. Call the Reusable Workflow with Inputs
  - Links and References
  - Watch Video
    - Inputs Reference Table

---

## Content

GitHub Actions Certification

Reusable Workflows and Reporting

# Step 3 Using Inputs in Reusable Workflow

In this guide, you’ll learn how to pass inputs into [GitHub Actions reusable workflows](https://docs.github.com/en/actions/using-workflows/reusing-workflows) to handle configuration values—such as MongoDB credentials—without relying on environment variables in the caller workflow.

> [!important]
> **Warning**
>
> Environment variables defined in a caller workflow do **not** propagate into a called reusable workflow. Attempting to pass sensitive data like database URIs via `env:` will result in empty values.

For example, this command fails to set `MONGO_URI`:

```
kubectl -n development create secret generic mongo-db-creds \
  --from-literal=MONGO_URI= \
  --from-literal=MONGO_USERNAME=superuser \
  --from-literal=MONGO_PASSWORD=*** \
  --save-config \
  --dry-run=client \
  -o yaml | kubectl apply -f -
```

This is a documented [limitation of reusable workflows](https://kodekloud.com/kk-media/image/upload/v1752876351/notes-assets/images/GitHub-Actions-Certification-Step-3-Using-Inputs-in-Reusable-Workflow/github-actions-workflow-limitations-docs.jpg).

![The image shows a GitHub Docs page about GitHub Actions, specifically focusing on the limitations of reusing workflows. It includes navigation menus and detailed text on workflow limitations.](https://kodekloud.com/kk-media/image/upload/v1752876351/notes-assets/images/GitHub-Actions-Certification-Step-3-Using-Inputs-in-Reusable-Workflow/github-actions-workflow-limitations-docs.jpg)

---

## 1\. Define a Basic Reusable Workflow

Create a workflow—e.g. `.github/workflows/reuse-deployment.yml`—that declares the required `secrets` under `workflow_call`. This allows callers to supply kubeconfig and database passwords securely:

```
name: Deployment - Reusable Workflow


on:
  workflow_call:
    secrets:
      k8s-kubeconfig:
        required: true
      mongodb-password:
        required: true


jobs:
  reuse-deploy:
    environment:
      name: development
      url: https://${{ steps.set-ingress-host-address.outputs.APP_INGRESS_HOST }}
    outputs:
      APP_INGRESS_URL: ${{ steps.set-ingress-host-address.outputs.APP_INGRESS_HOST }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repo
        uses: actions/checkout@v4


      - name: Install kubectl CLI
        uses: azure/setup-kubectl@v3
        with:
          version: '1.26.0'


      - name: Set Kubeconfig file
        uses: azure/k8s-set-context@v3
        with:
          method: kubeconfig
          kubeconfig: ${{ secrets.k8s-kubeconfig }}


      - name: Fetch Kubernetes Cluster Details
        run: |
          kubectl version --short
          echo "-------------------------------------------"
          kubectl get nodes


      - name: Save Nginx Ingress Controller IP as an Output
        id: set-ingress-host-address
        run: |
          IP=$(kubectl -n ingress-nginx get svc ingress-nginx-controller \
            -o jsonpath='{.status.loadBalancer.ingress[0].ip}')
          echo "APP_INGRESS_HOST=$IP" >> $GITHUB_OUTPUT


      - name: Replace Tokens in Manifests
        uses: cschijden/replace-tokens@v1
        with:
          tokenPrefix: __
          tokenSuffix: __
          files: ["kubernetes/development/*.yaml"]
        env:
          NAMESPACE: ${{ vars.NAMESPACE }}
          REPLICAS: ${{ vars.REPLICAS }}
          IMAGE: ${{ vars.DOCKERHUB_USERNAME }}/solar-system:${{ github.sha }}
          INGRESS_IP: ${{ steps.set-ingress-host-address.outputs.APP_INGRESS_HOST }}


      - name: Inspect Rendered Manifests
        run: cat kubernetes/development/*.yaml


      - name: Create MongoDB Secret
        run: |
          kubectl -n ${{ vars.NAMESPACE }} create secret generic mongo-db-creds \
            --from-literal=MONGO_URI=${{ env.MONGO_URI }} \
            --from-literal=MONGO_USERNAME=${{ vars.MONGO_USERNAME }} \
            --from-literal=MONGO_PASSWORD=${{ secrets.mongodb-password }} \
            --save-config


      - name: Deploy to Development Environment
        run: kubectl apply -f kubernetes/development
```

---

## 2\. Store MongoDB URI as a Repository Variable

Go to **Settings > Actions > Secrets and variables > Variables** and add:

- **Name**: `MONGO_URI`
- **Value**: `mongodb+srv://supercluster.d8jj.mongodb.net/superData`

Now the workflow can reference `env.MONGO_URI` without relying on the caller’s `env:` block.

![The image shows a GitHub repository settings page focused on "Actions secrets and variables," displaying environment variables and options to manage them. The interface includes sections for secrets, variables, and various repository settings.](https://kodekloud.com/kk-media/image/upload/v1752876352/notes-assets/images/GitHub-Actions-Certification-Step-3-Using-Inputs-in-Reusable-Workflow/github-repo-settings-actions-secrets.jpg)

---

## 3\. Add `workflow_call` Inputs

Enhance your reusable workflow by defining typed `inputs` for maximum flexibility:

```
name: Deployment - Reusable Workflow


on:
  workflow_call:
    inputs:
      mongodb-uri:
        description: MongoDB connection string
        required: true
        type: string
      kubectl-version:
        description: kubectl CLI version
        required: false
        default: v1.26.0
        type: string
      k8s-manifest-dir:
        description: Path to Kubernetes manifests
        required: true
        default: kubernetes/
        type: string
      environment:
        description: Deployment environment name
        required: true
        default: dev
        type: string
    secrets:
      k8s-kubeconfig:
        required: true
      mongodb-password:
        required: true
```

### Inputs Reference Table

| Input Name         | Type   | Required | Default       | Description                     |
| ------------------ | ------ | -------- | ------------- | ------------------------------- |
| `mongodb-uri`      | string | Yes      | —             | MongoDB connection string       |
| `kubectl-version`  | string | No       | `v1.26.0`     | Version of `kubectl` to install |
| `k8s-manifest-dir` | string | Yes      | `kubernetes/` | Directory containing manifests  |
| `environment`      | string | Yes      | `dev`         | Name of the target environment  |

Update steps to reference `inputs` instead of hard-coded values:

```
jobs:
  reuse-deploy:
    environment:
      name: ${{ inputs.environment }}
      url: https://${{ steps.set-ingress-host-address.outputs.APP_INGRESS_HOST }}
    runs-on: ubuntu-latest
    steps:
      # ...
      - name: Install kubectl CLI
        uses: azure/setup-kubectl@v3
        with:
          version: ${{ inputs.kubectl-version }}
      # ...
      - name: Replace Tokens in Manifests
        uses: cschijden/replace-tokens@v1
        with:
          files: ["${{ inputs.k8s-manifest-dir }}*.yaml"]
        env:
          INGRESS_IP: ${{ steps.set-ingress-host-address.outputs.APP_INGRESS_HOST }}
      # ...
      - name: Create MongoDB Secret
        run: |
          kubectl -n ${{ vars.NAMESPACE }} create secret generic mongo-db-creds \
            --from-literal=MONGO_URI=${{ inputs.mongodb-uri }} \
            --from-literal=MONGO_USERNAME=${{ vars.MONGO_USERNAME }} \
            --from-literal=MONGO_PASSWORD=${{ secrets.mongodb-password }} \
            --save-config \
            --dry-run=client -o yaml | kubectl apply -f -
      # ...
      - name: Deploy to ${{ inputs.environment }}
        run: kubectl apply -f "${{ inputs.k8s-manifest-dir }}"
```

---

## 4\. Call the Reusable Workflow with Inputs

In your caller workflow (e.g. `.github/workflows/dev-deploy.yml`), pass inputs via `with:` and secrets as before:

```
dev-deploy:
  if: contains(github.ref, 'feature/')
  needs: docker
  uses: ./.github/workflows/reuse-deployment.yml
  with:
    mongodb-uri: ${{ vars.MONGO_URI }}
    kubectl-version: v1.27.0        # optional override
    environment: development
    k8s-manifest-dir: kubernetes/development/
  secrets:
    k8s-kubeconfig: ${{ secrets.KUBECONFIG }}
    mongodb-password: ${{ secrets.MONGO_PASSWORD }}


prod-deploy:
  if: github.ref == 'refs/heads/main'
  needs: docker
  uses: ./.github/workflows/reuse-deployment.yml
  with:
    mongodb-uri: ${{ vars.MONGO_URI }}
    environment: production
    k8s-manifest-dir: kubernetes/production/
  secrets:
    k8s-kubeconfig: ${{ secrets.KUBECONFIG }}
    mongodb-password: ${{ secrets.MONGO_PASSWORD }}
```

After pushing, the **dev-deploy** run shows the inputs and secrets correctly applied:

![The image shows a GitHub Actions workflow interface with a series of jobs and their statuses, including unit testing, code coverage, and deployment steps. The workflow is in progress, with some jobs completed and others waiting.](https://kodekloud.com/kk-media/image/upload/v1752876353/notes-assets/images/GitHub-Actions-Certification-Step-3-Using-Inputs-in-Reusable-Workflow/github-actions-workflow-jobs-status.jpg)

You’ll see:

- `mongodb-uri` sourced from the repository variable.
- `kubectl-version` defaulting to v1.26.0 unless overridden.
- The manifest directory and environment matching the `with:` values.

The MongoDB secret creation now succeeds:

```
kubectl -n development create secret generic mongo-db-creds \
  --from-literal=MONGO_URI=mongodb+srv://supercluster.d8jj.mongodb.net/superData \
  --from-literal=MONGO_USERNAME=superuser \
  --from-literal=MONGO_PASSWORD=*** \
  --save-config \
  --dry-run=client \
  -o yaml | kubectl apply -f -
```

![The image shows a GitHub Actions workflow interface with a list of jobs and their statuses, including unit testing, code coverage, and deployment tasks. Some jobs are marked as successful, while others have failed.](https://kodekloud.com/kk-media/image/upload/v1752876354/notes-assets/images/GitHub-Actions-Certification-Step-3-Using-Inputs-in-Reusable-Workflow/github-actions-workflow-jobs-statuses.jpg)

> [!important]
> **Note**
>
> If you need outputs (like `APP_INGRESS_URL`) in the caller workflow, use `outputs` in the reusable workflow and capture them via the `needs` context.

---

## Links and References

- [Reusable Workflows in GitHub Actions](https://docs.github.com/en/actions/using-workflows/reusing-workflows)
- [azure/setup-kubectl Action](https://github.com/azure/setup-kubectl)
- [azure/k8s-set-context Action](https://github.com/azure/k8s-set-context)
- [GitHub Actions Variables](https://docs.github.com/en/actions/learn-github-actions/variables)
- [GitHub Actions Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/da8706ee-24ab-41a1-916d-da8232ca028e/lesson/57ff39ca-ec08-4777-8816-502cbe455eb7)**
>
> Watch video content
