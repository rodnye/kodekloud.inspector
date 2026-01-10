# Step 4 Using Outputs in Reusable Workflow - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions/Reusable-Workflows-and-Reporting/Step-4-Using-Outputs-in-Reusable-Workflow)

---

## Table of Contents

- Step 4 Using Outputs in Reusable Workflow
  - Background
  - 1. Defining Outputs in Your Reusable Workflow
  - 2. Original Caller Workflow (Before)
  - 3. Consuming Outputs in the Caller Workflow
  - 4. Testing the Changes
  - Links and References
  - Watch Video
  - Practice Lab
    - Inputs and Secrets Reference

---

## Content

GitHub Actions

Reusable Workflows and Reporting

# Step 4 Using Outputs in Reusable Workflow

In this guide, you’ll learn how to expose and consume outputs from a reusable GitHub Actions workflow. By defining outputs under `workflow_call` and mapping job outputs, downstream jobs can reference values—such as your application’s ingress URL—without extra scripting.

---

## Background

Our `dev-integration-testing` job was failing because it tried to read an application URL that wasn’t exposed by the reusable workflow. Although `dev-integration-testing` depends on `dev-deploy`, by default reusable-workflow outputs are not forwarded to the caller. We’ll fix this by:

1.  Declaring outputs in the reusable workflow.
2.  Mapping those outputs from a job step.
3.  Consuming the mapped outputs in the caller workflow.

> [!important]
> **Warning**
>
> If you don’t define `outputs` in `workflow_call`, any values you set inside the workflow won’t be available to the caller.

---

## 1\. Defining Outputs in Your Reusable Workflow

First, update your reusable workflow (`reuse-deployment.yml`) to include an `outputs` block under `on.workflow_call`. Then map job-level outputs to that workflow output:

```
name: Deployment - Reusable Workflow


on:
  workflow_call:
    inputs:
      environment:
        description: "Deployment environment"
        required: true
        type: string
      kubectl-version:
        description: "kubectl CLI version"
        required: false
        type: string
        default: "latest"
      mongodb-uri:
        description: "MongoDB connection URI"
        required: true
        type: string
    secrets:
      k8s-kubeconfig:
        required: true
      mongodb-password:
        required: true
    outputs:
      application-url:
        description: "URL for the deployed application"
        value: ${{ jobs.reuse-deploy.outputs.APP_INGRESS_URL }}


jobs:
  reuse-deploy:
    runs-on: ubuntu-latest
    environment:
      name: ${{ inputs.environment }}
      url: https://${{ steps.set-ingress-host.outputs.APP_INGRESS_HOST }}
    outputs:
      APP_INGRESS_URL: ${{ steps.set-ingress-host.outputs.APP_INGRESS_HOST }}
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4


      - name: Install kubectl CLI
        uses: azure/setup-kubectl@v3
        with:
          version: ${{ inputs.kubectl-version }}


      - name: Set Kubeconfig context
        uses: azure/k8s-set-context@v3
        with:
          kubeconfig: ${{ secrets.k8s-kubeconfig }}


      - name: Obtain ingress host
        id: set-ingress-host
        run: |
          # Simulate fetching the ingress host
          echo "::set-output name=APP_INGRESS_HOST::my-app.${{ inputs.environment }}.example.com"
```

### Inputs and Secrets Reference

| Input           | Description            | Type   | Required | Default |
| --------------- | ---------------------- | ------ | -------- | ------- |
| environment     | Deployment environment | string | true     | —       |
| kubectl-version | kubectl CLI version    | string | false    | latest  |
| mongodb-uri     | MongoDB connection URI | string | true     | —       |

| Secret           | Description                       | Required |
| ---------------- | --------------------------------- | -------- |
| k8s-kubeconfig   | Kubernetes cluster authentication | true     |
| mongodb-password | Password for MongoDB              | true     |

> [!important]
> **Note**
>
> We use `${{ jobs.reuse-deploy.outputs.APP_INGRESS_URL }}` to map the job’s output to the workflow’s `application-url`.

---

## 2\. Original Caller Workflow (Before)

Here’s how the caller workflow referenced `APP_INGRESS_URL` before the change:

```
jobs:
  dev-deploy:
    needs: docker
    if: contains(github.ref, 'feature/')
    uses: ./.github/workflows/reuse-deployment.yml
    with:
      mongodb-uri: ${{ vars.MONGO_URI }}
      environment: development
      k8s-manifest-dir: kubernetes/development/
    secrets:
      k8s-kubeconfig: ${{ secrets.KUBECONFIG }}
      mongodb-password: ${{ secrets.MONGO_PASSWORD }}


  dev-integration-testing:
    name: Dev Integration Testing
    needs: dev-deploy
    if: contains(github.ref, 'feature/')
    runs-on: ubuntu-latest
    steps:
      - name: Test URL Output using curl and jq
        env:
          URL: ${{ needs.dev-deploy.outputs.APP_INGRESS_URL }}  # Not defined
        run: |
          echo $URL
          curl https://$URL/live -s -k | jq -r .status | grep -i live
```

Since `APP_INGRESS_URL` wasn’t declared in the reusable workflow’s `outputs`, `dev-integration-testing` failed.

---

## 3\. Consuming Outputs in the Caller Workflow

Update your caller workflow to use the new `application-url` output:

```
jobs:
  dev-deploy:
    needs: docker
    if: contains(github.ref, 'feature/')
    uses: ./.github/workflows/reuse-deployment.yml
    with:
      mongodb-uri: ${{ vars.MONGO_URI }}
      environment: development
      k8s-manifest-dir: kubernetes/development
    secrets:
      k8s-kubeconfig: ${{ secrets.KUBECONFIG }}
      mongodb-password: ${{ secrets.MONGO_PASSWORD }}


  dev-integration-testing:
    name: Dev Integration Testing
    needs: dev-deploy
    if: contains(github.ref, 'feature/')
    runs-on: ubuntu-latest
    steps:
      - name: Test URL Output using curl and jq
        env:
          URL: ${{ needs.dev-deploy.outputs.application-url }}
        run: |
          echo "Application URL: $URL"
          curl https://$URL/live -s -k | jq -r .status | grep -i live


  prod-deploy:
    needs: docker
    if: github.ref == 'refs/heads/main'
    uses: ./.github/workflows/reuse-deployment.yml
    with:
      mongodb-uri: ${{ vars.MONGO_URI }}
      environment: production
      k8s-manifest-dir: kubernetes/production
    secrets:
      k8s-kubeconfig: ${{ secrets.KUBECONFIG }}
      mongodb-password: ${{ secrets.MONGO_PASSWORD }}


  prod-integration-testing:
    name: Prod Integration Testing
    needs: prod-deploy
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - name: Test URL Output using curl and jq
        env:
          URL: ${{ needs.prod-deploy.outputs.application-url }}
        run: |
          echo "Application URL: $URL"
          curl https://$URL/live -s | jq -r .status | grep -i live
```

---

## 4\. Testing the Changes

Once you commit these updates:

```
echo $URL
echo "-----------------------------"
curl https://$URL/live -s -k | jq -r .status | grep -i live
```

Your logs should resemble:

```
Application URL: my-app.development.example.com
Status: live
```

Now both integration-testing jobs will successfully read the ingress URL from the reusable workflow.

---

## Links and References

- [GitHub Actions: Reusing Workflows](https://docs.github.com/actions/using-workflows/reusing-workflows)
- [Azure/setup-kubectl Action](https://github.com/Azure/setup-kubectl)
- [azure/k8s-set-context Action](https://github.com/Azure/k8s-set-context)
- [jq Manual](https://stedolan.github.io/jq/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions/module/57481ffd-2f40-4d62-af84-5f992f6c92dc/lesson/e5c408a8-b336-4611-9f21-dac1941d0fb1)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/github-actions/module/57481ffd-2f40-4d62-af84-5f992f6c92dc/lesson/7374aa30-afe3-4509-9347-a52dc4d1a5ed)**
>
> Practice lab
