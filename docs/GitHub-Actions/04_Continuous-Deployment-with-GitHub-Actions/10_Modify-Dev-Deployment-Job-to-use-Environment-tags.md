# Modify Dev Deployment Job to use Environment tags - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions/Continuous-Deployment-with-GitHub-Actions/Modify-Dev-Deployment-Job-to-use-Environment-tags)

---

## Table of Contents

- Modify Dev Deployment Job to use Environment tags
  - Prerequisites
  - Verify Current Kubernetes Deployment
  - Adding the environment Block
  - Observing the Protection Rule in Action
  - Tracking Deployments Across Environments (Public Beta)
  - Quick Reference Table
  - Scope and Precedence of Variables
  - Key Snippet for dev-deploy
  - Links and References
  - Watch Video
    - Step 1: Basic environment Definition
    - Step 2: Populate the url: Field
    - Step 3: Full Workflow Snippet

---

## Content

GitHub Actions

Continuous Deployment with GitHub Actions

# Modify Dev Deployment Job to use Environment tags

Now that you’ve configured a GitHub Actions environment with protection rules, secrets, and variables, let’s update the **dev-deploy** job so it automatically picks up the right replica count and enforces your environment policies.

## Prerequisites

- A GitHub repository with an **development** environment that has:
  - One protection rule (e.g., required reviewers or wait timer)
  - One secret
  - Two environment-level variables
- A working Kubernetes cluster for the `development` namespace
- A Docker build job named `docker` in your workflow

> [!important]
> **Note**
>
> Environment-level variables override repository-level variables. In our example, the repository variable `REPLICAS` is set to `2`, while in the **development** environment it’s set to `1`.

![The image shows a GitHub repository settings page focused on configuring environments, with options for protection rules, secrets, and variables.](https://kodekloud.com/kk-media/image/upload/v1752876452/notes-assets/images/GitHub-Actions-Modify-Dev-Deployment-Job-to-use-Environment-tags/github-repo-settings-environments-config.jpg)

![The image shows a GitHub repository settings page focused on "Secrets and variables," displaying environment and repository variables with options to manage or update them.](https://kodekloud.com/kk-media/image/upload/v1752876454/notes-assets/images/GitHub-Actions-Modify-Dev-Deployment-Job-to-use-Environment-tags/github-repo-settings-secrets-variables.jpg)

## Verify Current Kubernetes Deployment

Before modifying the workflow, let’s confirm the existing deployment in the `development` namespace:

```
kubectl -n development get deployments.apps
# NAME           READY   UP-TO-DATE   AVAILABLE   AGE
kubectl -n development get pods
# NAME                                  READY   STATUS    RESTARTS   AGE
# solar-system-6db5dfbrf8c-96qcz        1/1     Running   0          26m
# solar-system-6db5dfbrf8c-psbxx        1/1     Running   0          26m
```

You should see two replicas running (`2/2`). Now we’ll update the `dev-deploy` job in `.github/workflows/solar-system.yml`.

## Adding the `environment` Block

Within a GitHub Actions job:

- `env:` defines environment variables for all steps.
- `environment:` applies GitHub environment protection rules and can display a URL in the Actions UI.

### Step 1: Basic `environment` Definition

Replace or augment the `env:` block with:

```
jobs:
  dev-deploy:
    needs: docker
    runs-on: ubuntu-latest

    # Variables for all steps:
    env:
      APP_INGRESS_URL: ${{ steps.set-ingress-host-address.outputs.APP_INGRESS_HOST }}

    # Enforce your GitHub environment rules:
    environment:
      name: development
      url: https://

    steps:
      - name: Checkout Repo
        uses: actions/checkout@v4
      - name: Install kubectl CLI
        uses: azure/setup-kubectl@v3
        with:
          version: 'v1.26.0'
      - name: Set Kubeconfig file
        uses: azure/k8s-set-context@v3
        with:
          method: kubeconfig
```

### Step 2: Populate the `url:` Field

Use the output of your `set-ingress-host-address` step so that Actions shows a direct link to the deployed service:

```
jobs:
  dev-deploy:
    needs: docker
    runs-on: ubuntu-latest

    environment:
      name: development
      url: https://${{ steps.set-ingress-host-address.outputs.APP_INGRESS_HOST }}

    outputs:
      APP_INGRESS_URL: ${{ steps.set-ingress-host-address.outputs.APP_INGRESS_HOST }}

    steps:
      - name: Checkout Repo
        uses: actions/checkout@v4
      - name: Install kubectl CLI
        uses: azure/setup-kubectl@v3
        with:
          version: 'v1.26.0'
      - name: Set Kubeconfig file
        uses: azure/k8s-set-context@v3
```

### Step 3: Full Workflow Snippet

Below is the relevant section from `.github/workflows/solar-system.yml` after adding `environment`:

```
.github/workflows/solar-system.yml:
  jobs:
    unit-testing: {}
    code-coverage: {}
    docker: {}
    dev-deploy:
      needs: docker
      runs-on: ubuntu-latest

      environment:
        name: development
        url: https://${{ steps.set-ingress-host-address.outputs.APP_INGRESS_HOST }}

      outputs:
        APP_INGRESS_URL: ${{ steps.set-ingress-host-address.outputs.APP_INGRESS_HOST }}

      steps:
        - name: Checkout Repo
          uses: actions/checkout@v4
        - name: Install kubectl CLI
          uses: azure/setup-kubectl@v3
          with:
            version: 'v1.26.0'
        - name: Set Kubeconfig file
          uses: azure/k8s-set-context@v3
```

## Observing the Protection Rule in Action

When you push these changes, the **dev-deploy** job will pause at the `environment` step, waiting out the protection rule’s timer:

![The image shows a GitHub Actions workflow interface with a series of jobs including unit testing, code coverage, and containerization, currently in progress. The workflow is triggered by a push to a specific branch.](https://kodekloud.com/kk-media/image/upload/v1752876455/notes-assets/images/GitHub-Actions-Modify-Dev-Deployment-Job-to-use-Environment-tags/github-actions-workflow-jobs-in-progress.jpg)

Clicking on the paused job reveals the wait timer and any bypass options available to admins:

![The image shows a GitHub Actions interface with a confirmation dialog for deploying to a development environment, including a comment box for manual override.](https://kodekloud.com/kk-media/image/upload/v1752876456/notes-assets/images/GitHub-Actions-Modify-Dev-Deployment-Job-to-use-Environment-tags/github-actions-deployment-confirmation-dialog.jpg)

> [!important]
> **Note**
>
> Only HTTP/S URLs are supported in the `environment.url` field.

Once approved, the summary displays the environment URL for easy access.

## Tracking Deployments Across Environments (Public Beta)

GitHub’s public beta for deployment tracking shows a history of every deployment per environment under **Actions → Deployments**. You can review commit details, branch names, timestamps, and durations in one interface.

![The image shows a GitHub blog post announcing a public beta for a new deployment tracking feature across environments, with a list of capabilities for developers and DevOps managers.](https://kodekloud.com/kk-media/image/upload/v1752876457/notes-assets/images/GitHub-Actions-Modify-Dev-Deployment-Job-to-use-Environment-tags/github-blog-public-beta-deployment-feature.jpg)

Developers and managers can:

- Inspect past deployments
- Compare changes
- Sign off on releases

---

## Quick Reference Table

| Field      | Description                                                     |
| ---------- | --------------------------------------------------------------- |
| name       | The GitHub environment name (e.g., `development`, `staging`)    |
| url        | The HTTP/S link displayed in the Actions UI for quick access    |
| protection | Rules such as required reviewers, wait timers, or secrets usage |

## Scope and Precedence of Variables

| Scope       | Precedence | Example `REPLICAS` Value |
| ----------- | ---------- | ------------------------ |
| Environment | High       | `1`                      |
| Repository  | Low        | `2`                      |

---

## Key Snippet for `dev-deploy`

```
dev-deploy:
  needs: docker
  runs-on: ubuntu-latest
  environment:
    name: development
    url: https://${{ steps.set-ingress-host-address.outputs.APP_INGRESS_HOST }}
  outputs:
    APP_INGRESS_URL: ${{ steps.set-ingress-host-address.outputs.APP_INGRESS_HOST }}
```

## Links and References

- [GitHub Actions Environments](https://docs.github.com/actions/deployment/targeting-different-environments/using-environments-for-deployment)
- [Kubernetes `kubectl` Overview](https://kubernetes.io/docs/reference/kubectl/overview/)
- [azure/setup-kubectl GitHub Action](https://github.com/azure/setup-kubectl)
- [azure/k8s-set-context GitHub Action](https://github.com/azure/k8s-set-context)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions/module/92928734-1d5a-462d-9414-2d3865f5ef79/lesson/e0cdd818-d14b-4bae-8b1e-ef00cb924bc9)**
>
> Watch video content
