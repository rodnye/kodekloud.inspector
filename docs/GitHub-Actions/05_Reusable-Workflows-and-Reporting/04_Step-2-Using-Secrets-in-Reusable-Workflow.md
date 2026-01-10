# Step 2 Using Secrets in Reusable Workflow - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions/Reusable-Workflows-and-Reporting/Step-2-Using-Secrets-in-Reusable-Workflow)

---

## Table of Contents

- Step 2 Using Secrets in Reusable Workflow
  - 1. Inspect the Existing Reusable Workflow
  - 2. Declare Secrets in the Reusable Workflow
  - 3. Pass Secrets from the Caller Workflow
  - 4. Handle Missing Secrets Errors
  - 5. Verify Workflow Execution
  - 6. Example Caller Workflow Environment
  - Links and References
  - Watch Video

---

## Content

GitHub Actions

Reusable Workflows and Reporting

# Step 2 Using Secrets in Reusable Workflow

In this guide, we’ll demonstrate how to securely pass `secrets` to a reusable GitHub Actions workflow. Centralizing deployment logic and managing sensitive data in one place improves maintainability and security.

## 1\. Inspect the Existing Reusable Workflow

Open the reusable workflow file at `.github/workflows/reuse-deployment.yml`:

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
          # kubeconfig will be supplied via a secret

      - name: Create MongoDB Secret
        run: |
          kubectl -n ${{ vars.NAMESPACE }} create secret generic mongo-db-creds \
            --from-literal=MONGO_URI=${{ env.MONGO_URI }} \
            --from-literal=MONGO_USERNAME=${{ vars.MONGO_USERNAME }} \
            --from-literal=MONGO_PASSWORD=${{ secrets.MONGO_PASSWORD }} \
            --save-config \
            --dry-run=client -o yaml | kubectl apply -f -

      - name: Deploy to Dev Env
        run: |
          kubectl apply -f kubernetes/development

      - name: Set App Ingress Host URL
        id: set-ingress-host-address
        run: |
          echo "APP_INGRESS_HOST=$(kubectl -n ${{ vars.NAMESPACE }} get ingress \
            -o jsonpath='{.items[0].spec.tls[0].hosts[0]}')" >> $GITHUB_OUTPUT
```

A quick review shows this workflow expects two secrets:

| Secret Name      | Required | Purpose                                             |
| ---------------- | -------- | --------------------------------------------------- |
| k8s-kubeconfig   | true     | Supplies the Kubernetes config to `k8s-set-context` |
| mongodb-password | true     | Password for MongoDB credentials secret             |

## 2\. Declare Secrets in the Reusable Workflow

Extend the `on.workflow_call` section to require these secrets:

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
            --save-config \
            --dry-run=client -o yaml | kubectl apply -f -

      - name: Deploy to Dev Env
        run: |
          kubectl apply -f kubernetes/development

      - name: Set App Ingress Host URL
        id: set-ingress-host-address
        run: |
          echo "APP_INGRESS_HOST=$(kubectl -n ${{ vars.NAMESPACE }} get ingress \
            -o jsonpath='{.items[0].spec.tls[0].hosts[0]}')" >> $GITHUB_OUTPUT
```

> [!important]
> **Note**
>
> Declaring secrets under `on.workflow_call` ensures GitHub Actions validates them before running any jobs.

## 3\. Pass Secrets from the Caller Workflow

In your caller workflow (for example, `.github/workflows/solar-system.yml`), supply the required secrets under each job that invokes the reusable workflow:

```
jobs:
  dev-deploy:
    if: contains(github.ref, 'feature/')
    needs: docker
    uses: ./.github/workflows/reuse-deployment.yml
    secrets:
      k8s-kubeconfig: ${{ secrets.KUBECONFIG }}
      mongodb-password:    ${{ secrets.MONGO_PASSWORD }}

  prod-deploy:
    if: github.ref == 'refs/heads/main'
    needs: docker
    uses: ./.github/workflows/reuse-deployment.yml
    secrets:
      k8s-kubeconfig: ${{ secrets.KUBECONFIG }}
      mongodb-password:    ${{ secrets.MONGO_PASSWORD }}
```

## 4\. Handle Missing Secrets Errors

> [!important]
> **Warning**
>
> If you omit a required secret, GitHub Actions fails immediately with a validation error specifying the missing secret.

Ensure each job includes all declared secrets to prevent startup failures.

## 5\. Verify Workflow Execution

After adding the secrets, the `dev-deploy` job should complete the Kubeconfig step successfully. If you still see empty environment variables in downstream jobs, like:

```
echo $URL
Error: Process completed with exit code 1.
```

remember that GitHub Actions does not automatically propagate caller `env` variables into a reusable workflow’s outputs. You may need to explicitly map and return those variables.

## 6\. Example Caller Workflow Environment

For context, here’s how global environment variables might be defined in the caller workflow:

```
name: Solar System Workflow

on:
  workflow_dispatch:
  push:
    branches:
      - main
      - 'feature/*'

env:
  MONGO_URI:      'mongodb+srv://supercluster.d83jj.mongodb.net/superData'
  MONGO_USERNAME: ${{ vars.MONGO_USERNAME }}
  MONGO_PASSWORD: ${{ secrets.MONGO_PASSWORD }}

jobs:
  unit-testing: {}
  code-coverage: {}
  docker: {}
  dev-deploy:
    if: contains(github.ref, 'feature/')
    needs: docker
    uses: ./.github/workflows/reuse-deployment.yml
    secrets:
      k8s-kubeconfig: ${{ secrets.KUBECONFIG }}
      mongodb-password:    ${{ secrets.MONGO_PASSWORD }}
```

## Links and References

- [Reusing Workflows with workflow_call](https://docs.github.com/en/actions/using-workflows/reusing-workflows#calling-a-reusable-workflow)
- [GitHub Actions Encrypted Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [azure/setup-kubectl Action](https://github.com/Azure/setup-kubectl)
- [azure/k8s-set-context Action](https://github.com/Azure/k8s-set-context)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions/module/57481ffd-2f40-4d62-af84-5f992f6c92dc/lesson/e75e577a-1c37-4703-bcf4-e6d3a26a8938)**
>
> Watch video content
