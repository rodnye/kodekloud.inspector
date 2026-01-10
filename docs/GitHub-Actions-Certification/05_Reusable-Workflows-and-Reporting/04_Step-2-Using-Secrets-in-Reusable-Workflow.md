# Step 2 Using Secrets in Reusable Workflow - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/Reusable-Workflows-and-Reporting/Step-2-Using-Secrets-in-Reusable-Workflow)

---

## Table of Contents

- Step 2 Using Secrets in Reusable Workflow
  - Inspecting the Reusable Workflow
  - Caller Workflow Example
  - Approaches to Passing Secrets
  - Step-by-Step: Explicitly Passing Secrets
  - Limitation: Environment Variables Aren’t Propagated
  - Solar System Workflow (Caller)
  - Links and References
  - Watch Video
    - 1. Declare Secrets in the Reusable Workflow
    - 2. Call the Reusable Workflow with Secrets

---

## Content

GitHub Actions Certification

Reusable Workflows and Reporting

# Step 2 Using Secrets in Reusable Workflow

In this lesson, you’ll learn how to securely pass secrets into a reusable GitHub Actions workflow. We’ll cover:

- Inspecting a reusable workflow to identify required secrets
- Two approaches for passing secrets
- A step-by-step guide to explicitly declare and pass secrets
- Common pitfalls and how to propagate environment variables

---

## Inspecting the Reusable Workflow

First, review the reusable workflow metadata to see which secrets it expects:

```
name: Deployment - Reusable Workflow

on:
  workflow_call:

jobs:
  reuse-deploy:
    environment:
      name: development
      url: http://example.com
    outputs:
      APP_INGRESS_URL:
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
          # ...
```

A quick search shows this workflow requires two secrets:

| Secret Name        | Purpose                        |
| ------------------ | ------------------------------ |
| `k8s-kubeconfig`   | Kubernetes cluster credentials |
| `mongodb-password` | MongoDB database password      |

These must be supplied by the caller workflow (the “Solar System Workflow”).

---

## Caller Workflow Example

Here’s how you might create a Kubernetes secret and deploy in your caller workflow:

```
- name: Create MongoDB Secret
  run: |
    kubectl -n ${{ vars.NAMESPACE }} create secret generic mongo-db-creds \
      --from-literal=MONGO_URI=${{ env.MONGO_URI }} \
      --from-literal=MONGO_USERNAME=${{ vars.MONGO_USERNAME }} \
      --from-literal=MONGO_PASSWORD=${{ secrets.MONGO_PASSWORD }} \
      --save-config -o yaml | kubectl apply -f -

- name: Deploy to Dev Env
  run: |
    kubectl apply -f kubernetes/development

- name: Set App Ingress Host URL
  id: set-ingress-host-address
  run: |
    echo "APP_INGRESS_HOST=$(kubectl -n ${{ vars.NAMESPACE }} \
      get ingress -o jsonpath='{.items[0].spec.tls[0].hosts[0]}')"
```

---

## Approaches to Passing Secrets

You have two main methods for forwarding secrets to a reusable workflow:

| Method                         | Description                                                                   |
| ------------------------------ | ----------------------------------------------------------------------------- |
| `secrets: inherit`             | Automatically inherits all organization-level secrets.                        |
| Explicit `secrets` declaration | You specify exactly which secrets to forward, improving clarity and security. |

> [!important]
> **Note**
>
> Using `secrets: inherit` is quick, but explicit declaration reduces blast radius by only passing the secrets you need.

---

## Step-by-Step: Explicitly Passing Secrets

Follow these steps to declare and forward secrets in your reusable workflow.

### 1\. Declare Secrets in the Reusable Workflow

Add a `secrets` section under `workflow_call`:

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
      APP_INGRESS_HOST: ${{ steps.set-ingress-host-address.outputs.APP_INGRESS_HOST }}
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
          kubeconfig: ${{ secrets.k8s-kubeconfig }}

      - name: Create MongoDB Secret
        run: |
          kubectl -n ${{ vars.NAMESPACE }} create secret generic mongo-db-creds \
            --from-literal=MONGO_URI=${{ env.MONGO_URI }} \
            --from-literal=MONGO_USERNAME=${{ vars.MONGO_USERNAME }} \
            --from-literal=MONGO_PASSWORD=${{ secrets.mongodb-password }} \
            --save-config -o yaml | kubectl apply -f -

      - name: Deploy to Dev Env
        run: kubectl apply -f kubernetes/development

      - name: Set App Ingress Host URL
        id: set-ingress-host-address
        run: |
          echo "APP_INGRESS_HOST=$(kubectl -n ${{ vars.NAMESPACE }} \
            get ingress -o jsonpath='{.items[0].spec.tls[0].hosts[0]}')"
```

### 2\. Call the Reusable Workflow with Secrets

Reference the reusable workflow from your Solar System repo and pass the required secrets:

```
jobs:
  dev-deploy:
    if: contains(github.ref, 'feature/')
    needs: docker
    uses: ./.github/workflows/reuse-deployment.yml
    secrets:
      k8s-kubeconfig: ${{ secrets.KUBECONFIG }}
      mongodb-password: ${{ secrets.MONGO_PASSWORD }}
```

> [!important]
> **Warning**
>
> If a required secret is missing, the workflow will fail to start with an “invalid workflow file” error. Always verify secret names and availability before committing.

Successful execution will show:

```
✔ Kubeconfig set
```

---

## Limitation: Environment Variables Aren’t Propagated

Note that environment variables (e.g., `MONGO_URI`) defined in the caller do _not_ automatically flow into a reusable workflow:

```
echo $URL
curl https://$URL/live -s -k | jq -r .status | grep -i live
# Error: exit code 1
```

In the `Create MongoDB Secret` logs, you’ll see an empty URI:

```
kubectl -n development create secret generic mongo-db-creds \
  --from-literal=MONGO_URI= \
  --from-literal=MONGO_USERNAME=superuser \
  --from-literal=MONGO_PASSWORD=*** \
  --save-config -o yaml | kubectl apply -f -

env:
  MONGO_URI:
  MONGO_USERNAME: superuser
  MONGO_PASSWORD: ***
```

We’ll cover strategies to propagate environment variables across workflows in the next lesson.

---

## Solar System Workflow (Caller)

Below is a complete example of your Solar System Workflow, showing how to set environment variables and call the reusable deployment workflow:

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
    # ...

  code-coverage:
    # ...

  docker:
    # ...

  dev-deploy:
    if: contains(github.ref, 'feature/')
    needs: docker
    uses: ./.github/workflows/reuse-deployment.yml
    secrets:
      k8s-kubeconfig: ${{ secrets.KUBECONFIG }}
      mongodb-password: ${{ secrets.MONGO_PASSWORD }}

  # ... other jobs
```

---

## Links and References

- [GitHub Actions: Reusing workflows](https://docs.github.com/actions/using-workflows/reusing-workflows)
- [GitHub Actions: encrypted secrets](https://docs.github.com/actions/security-guides/encrypted-secrets)
- [Kubernetes Secrets](https://kubernetes.io/docs/concepts/configuration/secret/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/da8706ee-24ab-41a1-916d-da8232ca028e/lesson/456bd330-9747-41e3-8ba3-2726512f0ffc)**
>
> Watch video content
