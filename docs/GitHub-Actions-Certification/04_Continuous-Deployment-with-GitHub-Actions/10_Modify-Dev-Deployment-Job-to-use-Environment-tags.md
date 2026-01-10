# Modify Dev Deployment Job to use Environment tags - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/Continuous-Deployment-with-GitHub-Actions/Modify-Dev-Deployment-Job-to-use-Environment-tags)

---

## Table of Contents

- Modify Dev Deployment Job to use Environment tags
  - Prerequisites: Review Your Environment
  - Verify Current Deployment
  - Update the Workflow
  - Approving the Pending Deployment
  - View Deployments Across Environments
  - Links and References
  - Watch Video

---

## Content

GitHub Actions Certification

Continuous Deployment with GitHub Actions

# Modify Dev Deployment Job to use Environment tags

In this lesson, we’ll enhance our GitHub Actions workflow by updating the `dev-deploy` job to leverage **environment tags**. By specifying an environment:

- You can enforce protection rules (e.g., required approvals or wait timers).
- Access environment-scoped secrets and variables.
- Surface the deployment URL directly in the GitHub UI.

## Prerequisites: Review Your Environment

First, recall the `development` environment configuration. It includes one protection rule, one secret, and two variables. Environment-scoped variables always take precedence over repository-level variables.

![The image shows a GitHub repository settings page, specifically the "Environments" section, with a "development" environment configured with protection rules, secrets, and variables.](https://kodekloud.com/kk-media/image/upload/v1752875905/notes-assets/images/GitHub-Actions-Certification-Modify-Dev-Deployment-Job-to-use-Environment-tags/github-repo-settings-environments-development.jpg)

> [!important]
> **Note**
>
> Environment-level variables override repository variables. This ensures you can customize settings (like replica counts) for each deployment stage.

Next, compare the repository-level variables (e.g., `replicas: 2`) against the environment-level variables (`replicas: 1`):

![The image shows a GitHub repository settings page focused on managing secrets and variables, with sections for environment and repository variables.](https://kodekloud.com/kk-media/image/upload/v1752875906/notes-assets/images/GitHub-Actions-Certification-Modify-Dev-Deployment-Job-to-use-Environment-tags/github-repo-settings-secrets-variables.jpg)

| Scope       | Definition                              | Priority |
| ----------- | --------------------------------------- | -------- |
| Repository  | Variables and secrets at the repo level | Lower    |
| Environment | Variables and secrets scoped to env.    | Higher   |

## Verify Current Deployment

Use `kubectl` to inspect your deployments and pods in the `development` namespace:

```
kubectl -n development get deployments.apps
# NAME           READY   UP-TO-DATE   AVAILABLE   AGE
kubectl -n development get pods
# NAME                                        READY   STATUS    RESTARTS   AGE
# solar-system-6db5d5dfb8c-96qcz             1/1     Running   0          26m
# solar-system-6db5d5dfb8c-psbxx             1/1     Running   0          26m
```

Currently, the `solar-system` deployment uses two replicas (from the repository variable). We want to switch this to the environment variable value (`1` replica) by invoking the `development` environment in our workflow.

## Update the Workflow

To enforce environment protections and show the deployment URL in the workflow summary, add an `environment` block under the `dev-deploy` job:

```
env:
  MONGO_URI: mongodb+srv://supercluster.d83ji.mongodb.net/superData
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
    needs: docker
    environment:
      name: development
      url: https://${{ steps.set-ingress-host-address.outputs.APP_INGRESS_HOST }}
    outputs:
      APP_INGRESS_URL: ${{ steps.set-ingress-host-address.outputs.APP_INGRESS_HOST }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4


      - name: Install kubectl CLI
        uses: azure/setup-kubectl@v3
        with:
          version: 'v1.26.0'


      - name: Set kubeconfig context
        uses: azure/k8s-set-context@v3
        with:
          method: kubeconfig


      # ... additional deployment steps ...
```

Commit and push these changes to trigger a new workflow run.

> [!important]
> **Warning**
>
> After this change, the `dev-deploy` job will pend if the environment has protection rules (e.g., a wait timer or approval). Administrators must review and approve to proceed.

## Approving the Pending Deployment

Once the workflow hits the `dev-deploy` job, you’ll see it pending due to environment protection:

![The image shows a GitHub Actions workflow interface with a series of jobs including unit testing, code coverage, and containerization. The workflow is in progress, triggered by a recent push to a repository.](https://kodekloud.com/kk-media/image/upload/v1752875907/notes-assets/images/GitHub-Actions-Certification-Modify-Dev-Deployment-Job-to-use-Environment-tags/github-actions-workflow-jobs-progress.jpg)

Click the pending job to reveal the protection rule and remaining wait time. Administrators can bypass the wait by adding a comment:

![The image shows a GitHub Actions interface with a confirmation dialog for deploying to a development environment, requiring administrator privileges and a comment for manual override.](https://kodekloud.com/kk-media/image/upload/v1752875908/notes-assets/images/GitHub-Actions-Certification-Modify-Dev-Deployment-Job-to-use-Environment-tags/github-actions-deploy-confirmation-dialog.jpg)

After approval, the `dev-deploy` job runs. Upon success, the deployment URL appears in the workflow summary:

![The image shows a GitHub Actions workflow summary for a project, displaying successful completion of various jobs like unit testing, containerization, and deployment.](https://kodekloud.com/kk-media/image/upload/v1752875909/notes-assets/images/GitHub-Actions-Certification-Modify-Dev-Deployment-Job-to-use-Environment-tags/github-actions-workflow-summary-success.jpg)

By clicking this URL, stakeholders can quickly verify the live application.

## View Deployments Across Environments

GitHub’s public beta for deployment tracking offers a centralized overview of deployments across all environments. Access it via **Actions > Deployments** in your repository:

![The image shows a GitHub Actions page displaying a list of workflow runs for a project called "Solar System Workflow." Each entry includes details like commit messages, status, and timestamps.](https://kodekloud.com/kk-media/image/upload/v1752875910/notes-assets/images/GitHub-Actions-Certification-Modify-Dev-Deployment-Job-to-use-Environment-tags/github-actions-solar-system-workflow.jpg)

This dashboard displays each deployment event along with environment name, branch, commit, and duration. Learn more on the [GitHub blog announcement](https://github.blog/2023-07-26-github-actions-deployment-tracking/).

![The image shows a GitHub blog post announcing the public beta of a new feature for tracking deployments across environments, with a list of capabilities for developers and DevOps managers. There is also a screenshot of a dashboard displaying deployment information.](https://kodekloud.com/kk-media/image/upload/v1752875910/notes-assets/images/GitHub-Actions-Certification-Modify-Dev-Deployment-Job-to-use-Environment-tags/github-blog-post-deployment-tracking-beta.jpg)

---

With environments configured in your GitHub Actions workflow, you can enforce rules, manage scoped secrets and variables, and prominently display deployment URLs for fast verification.

## Links and References

- [GitHub Environments](https://docs.github.com/actions/deployment/targeting-different-environments/using-environments-for-deployment)
- [Azure/setup-kubectl Action](https://github.com/Azure/setup-kubectl)
- [GitHub Actions Deployment Tracking](https://github.blog/2023-07-26-github-actions-deployment-tracking/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/b6687abe-8094-4750-910b-5daa8bc710b1/lesson/8e8d11a8-60fc-42ac-bc13-5d364c24507c)**
>
> Watch video content
