# If Expressions and Pull Request - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/Continuous-Deployment-with-GitHub-Actions/If-Expressions-and-Pull-Request)

---

## Table of Contents

- If Expressions and Pull Request
  - Table of Contents
  - Environment Variables
  - Job Overview
  - Dev Deploy Job
  - Dev Integration Testing Job
  - Prod Deploy Job
  - Prod Integration Testing Job
  - Workflow Execution & Pull Request Flow
  - Links and References
  - Watch Video

---

## Content

GitHub Actions Certification

Continuous Deployment with GitHub Actions

# If Expressions and Pull Request

In this guide, we’ll set up a GitHub Actions CI/CD workflow that uses conditional `if` expressions to deploy an application to development on feature branches and to production only from the `main` branch. Pull requests will gate production releases behind review and environment protection rules.

## Table of Contents

- [Environment Variables](#environment-variables)
- [Job Overview](#job-overview)
- [Dev Deploy Job](#dev-deploy-job)
- [Dev Integration Testing Job](#dev-integration-testing-job)
- [Prod Deploy Job](#prod-deploy-job)
- [Prod Integration Testing Job](#prod-integration-testing-job)
- [Workflow Execution & Pull Request Flow](#workflow-execution--pull-request-flow)
- [Links and References](#links-and-references)

## Environment Variables

Define shared environment variables at the top of your workflow file:

```
env:
  MONGO_URI: 'mongodb+srv://supercluster.d83jj.mongodb.net/superData'
  MONGO_USERNAME: ${{ vars.MONGO_USERNAME }}
  MONGO_PASSWORD: ${{ secrets.MONGO_PASSWORD }}
```

> [!important]
> **Warning**
>
> Always store sensitive data such as database credentials and API keys in GitHub [Secrets](/docs/actions/security-guides/encrypted-secrets) or [Variables](/docs/actions/variables).

## Job Overview

Below is a summary of each job, its trigger condition, and dependencies:

| Job Name                   | Condition                          | Needs         | Description                                   |
| -------------------------- | ---------------------------------- | ------------- | --------------------------------------------- |
| `docker`                   | Always (push or PR)                | _none_        | Builds and pushes Docker image                |
| `dev-deploy`               | `contains(github.ref, 'feature/')` | `docker`      | Deploys to the development environment        |
| `dev-integration-testing`  | `contains(github.ref, 'feature/')` | `dev-deploy`  | Runs health checks against the dev deployment |
| `prod-deploy`              | `github.ref == 'refs/heads/main'`  | `docker`      | Deploys to the production environment         |
| `prod-integration-testing` | `github.ref == 'refs/heads/main'`  | `prod-deploy` | Validates the live production endpoint        |

## Dev Deploy Job

The `dev-deploy` job runs on any branch matching `feature/`. It depends on the `docker` job:

```
jobs:
  dev-deploy:
    if: contains(github.ref, 'feature/')
    needs: docker
    environment:
      name: development
      url: https://${{ steps.set-ingress-host-address.outputs.APP_INGRESS_HOST }}
    outputs:
      APP_INGRESS_URL: ${{ steps.set-ingress-host-address.outputs.APP_INGRESS_HOST }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repo
        uses: actions/checkout@v4

      # Add Kubernetes deployment steps here, for example:
      # - name: Apply Manifests
      #   run: kubectl apply -f kubernetes/development
```

> [!important]
> **Note**
>
> The `contains` function evaluates whether the branch ref string includes `feature/`. See [GitHub Actions expressions](https://docs.github.com/en/actions/learn-github-actions/expressions#about-if-expressions) for more.

## Dev Integration Testing Job

After deployment to development, run integration tests to verify application health:

```
  dev-integration-testing:
    name: Dev Integration Testing
    if: contains(github.ref, 'feature/')
    needs: dev-deploy
    runs-on: ubuntu-latest
    steps:
      - name: Test Application Health
        run: |
          curl https://${{ needs.dev-deploy.outputs.APP_INGRESS_URL }}/health
```

## Prod Deploy Job

Production deployments trigger only on the `main` branch. This job also sets up Kubernetes credentials and applies manifests:

```
  prod-deploy:
    if: github.ref == 'refs/heads/main'
    needs: docker
    environment:
      name: production
      url: https://${{ steps.set-ingress-host-address.outputs.APP_INGRESS_HOST }}
    outputs:
      APP_INGRESS_URL: ${{ steps.set-ingress-host-address.outputs.APP_INGRESS_HOST }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repo
        uses: actions/checkout@v4

      - name: Set up Kubernetes Credentials
        uses: azure/setup-kubectl@v3
        with:
          method: kubeconfig
          kubeconfig: ${{ secrets.KUBECONFIG }}

      - name: Fetch Kubernetes Cluster Details
        run: |
          kubectl version --short
          kubectl get nodes

      - name: Save Nginx Ingress IP
        id: set-ingress-host
        run: |
          echo "APP_INGRESS_HOST=$(kubectl -n ingress-nginx get service ingress-nginx-controller \
            -o jsonpath='{.status.loadBalancer.ingress[0].ip}')"
          echo "::set-output name=APP_INGRESS_HOST::$APP_INGRESS_HOST"

      - name: Replace Tokens in Manifests
        uses: cscheidlen/replace-tokens@v1
        with:
          tokenPrefix: '_{'
          tokenSuffix: '}_'
          files: ["kubernetes/production/*.yaml"]
        env:
          NAMESPACE: ${{ vars.NAMESPACE }}
          REPLICAS: ${{ vars.REPLICAS }}
          IMAGE: ${{ secrets.DOCKERHUB_USERNAME }}/solar-system:${{ github.sha }}
          INGRESS_IP: ${{ steps.set-ingress-host.outputs.APP_INGRESS_HOST }}

      - name: Deploy to Production
        run: kubectl apply -f kubernetes/production
```

## Prod Integration Testing Job

Once production is deployed, run a final health check:

```
  prod-integration-testing:
    name: Prod Integration Testing
    if: github.ref == 'refs/heads/main'
    needs: prod-deploy
    runs-on: ubuntu-latest
    steps:
      - name: Validate Production Health
        env:
          URL: ${{ needs.prod-deploy.outputs.APP_INGRESS_URL }}
        run: |
          echo "Testing URL: $URL"
          curl https://$URL/live -s -k | jq -r .status | grep -i live
```

## Workflow Execution & Pull Request Flow

1.  **Feature Branch Push**
    - `docker` builds and pushes the image.
    - `dev-deploy` and `dev-integration-testing` run automatically.
    - Production jobs are skipped on feature branches.

![The image shows a GitHub Actions workflow interface for a project named "solar-system," displaying a workflow in progress with steps like unit testing, containerization, and deployment.](https://kodekloud.com/kk-media/image/upload/v1752875896/notes-assets/images/GitHub-Actions-Certification-If-Expressions-and-Pull-Request/github-actions-solar-system-workflow.jpg)

2.  **Review Feature Deployments**
    - The workflow summary marks all dev jobs as successful.

![The image shows a GitHub Actions workflow summary with various jobs like unit testing, containerization, and deployment, all marked as successful. It includes a visual representation of the workflow steps and deployment protection rules.](https://kodekloud.com/kk-media/image/upload/v1752875897/notes-assets/images/GitHub-Actions-Certification-If-Expressions-and-Pull-Request/github-actions-workflow-summary-successful.jpg)

3.  **Open Pull Request**
    - Create a PR from `feature/*` into `main` to prepare a production release.

![The image shows a GitHub interface where a user is creating a pull request to merge changes from a feature branch into the main branch, with a description about adding GitHub Actions workflows for CI/CD automation.](https://kodekloud.com/kk-media/image/upload/v1752875898/notes-assets/images/GitHub-Actions-Certification-If-Expressions-and-Pull-Request/github-pull-request-feature-branch.jpg)

4.  **Confirm Previous Deployments**
    - The PR page lists all commits and verifies the dev deployment.

![The image shows a GitHub pull request page with a list of commits, most of which are verified, and a notification that the branch was successfully deployed.](https://kodekloud.com/kk-media/image/upload/v1752875900/notes-assets/images/GitHub-Actions-Certification-If-Expressions-and-Pull-Request/github-pull-request-commits-deployed.jpg)

5.  **Merge to Main**
    - Merging triggers a new workflow: dev jobs skip, prod job awaits manual approval or timer.

![The image shows a GitHub Actions workflow interface for a project named "solar-system," displaying the status of various jobs like unit testing, code coverage, and deployment processes. The workflow is waiting for a review to deploy to production.](https://kodekloud.com/kk-media/image/upload/v1752875901/notes-assets/images/GitHub-Actions-Certification-If-Expressions-and-Pull-Request/github-actions-solar-system-workflow-2.jpg)

6.  **Approve or Reject**
    - A reviewer approves the production deployment via the Actions UI.

![The image shows a GitHub Actions interface with a pending deployment review for a production environment. There are options to reject or approve and deploy the changes.](https://kodekloud.com/kk-media/image/upload/v1752875902/notes-assets/images/GitHub-Actions-Certification-If-Expressions-and-Pull-Request/github-actions-pending-deployment-review.jpg)

7.  **Production Deployment Complete**
    - Once approved, the production deployment proceeds and can be monitored in the Deployments UI.

![This image shows a GitHub deployment page for a project named "solar-system," displaying active deployments and a list of recent deployment activities.](https://kodekloud.com/kk-media/image/upload/v1752875903/notes-assets/images/GitHub-Actions-Certification-If-Expressions-and-Pull-Request/github-deployment-solar-system-activity.jpg)

By leveraging conditional `if` expressions, pull requests, and environment protection rules, you can build a robust, secure CI/CD pipeline that separates development and production deployments seamlessly.

## Links and References

- [GitHub Actions Expressions](https://docs.github.com/en/actions/learn-github-actions/expressions)
- [Using Environments for Deployment](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment)
- [Encrypted Secrets in GitHub Actions](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Protecting Branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-protected-branches)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/b6687abe-8094-4750-910b-5daa8bc710b1/lesson/aeb2d582-56fc-4619-acf8-f8e35662fb86)**
>
> Watch video content
