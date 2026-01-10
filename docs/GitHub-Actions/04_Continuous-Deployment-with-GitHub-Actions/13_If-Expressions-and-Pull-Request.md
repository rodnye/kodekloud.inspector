# If Expressions and Pull Request - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions/Continuous-Deployment-with-GitHub-Actions/If-Expressions-and-Pull-Request)

---

## Table of Contents

- If Expressions and Pull Request
  - Workflow Overview
  - Configuring Conditional Jobs with if
  - Testing on a Feature Branch
  - Raising a Pull Request
  - Production Deployment Approval
  - Final Workflow Summary on main
  - Viewing All Deployments
  - References
  - Watch Video
  - Practice Lab
    - Desired Branch Conditions
    - 1. Dev Jobs
    - 2. Prod Jobs

---

## Content

GitHub Actions

Continuous Deployment with GitHub Actions

# If Expressions and Pull Request

We’ll configure our GitHub Actions workflow so that feature branches trigger only development jobs, while the `main` branch runs production deployments. By using `if` expressions like `contains` and exact branch comparisons, you can maintain a single workflow file and control which jobs run on which branches.

![The image shows a GitHub Actions page displaying a list of workflow runs for a repository named "solar-system," with various statuses and timestamps.](https://kodekloud.com/kk-media/image/upload/v1752876447/notes-assets/images/GitHub-Actions-If-Expressions-and-Pull-Request/github-actions-solar-system-workflows.jpg)

## Workflow Overview

Our workflow defines seven jobs and global environment variables:

```
env:
  MONGO_URI: 'mongodb+srv://supercluster.d8jj.mongodb.net/superData'
  MONGO_USERNAME: ${{ vars.MONGO_USERNAME }}
  MONGO_PASSWORD: ${{ secrets.MONGO_PASSWORD }}


jobs:
  unit-testing: …
  code-coverage: …
  docker: …
  dev-deploy: …
  dev-integration-testing: …
  prod-deploy: …
  prod-integration-testing: …
```

### Desired Branch Conditions

| Job Name                 | Feature Branch (`feature/*`) | Main Branch (`main`) |
| ------------------------ | ---------------------------- | -------------------- |
| unit-testing             | ✓                            | ✓                    |
| code-coverage            | ✓                            | ✓                    |
| docker                   | ✓                            | ✓                    |
| dev-deploy               | ✓                            |                      |
| dev-integration-testing  | ✓                            |                      |
| prod-deploy              |                              | ✓                    |
| prod-integration-testing |                              | ✓                    |

## Configuring Conditional Jobs with `if`

GitHub Actions supports `if` expressions on jobs. We’ll use:

- `contains(github.ref, 'feature/')` for feature branches
- `github.ref == 'refs/heads/main'` for the `main` branch

> [!important]
> **Note**
>
> The `if` expression runs at the job level. Jobs whose conditions evaluate to `false` are marked as **skipped**.

### 1\. Dev Jobs

Add `if: contains(github.ref, 'feature/')` to both development jobs:

```
jobs:
  dev-deploy:
    if: contains(github.ref, 'feature/')
    needs: docker
    runs-on: ubuntu-latest
    environment:
      name: development
      url: https://${{ steps.set-ingress-host-address.outputs.APP_INGRESS_HOST }}
    outputs:
      APP_INGRESS_URL: ${{ steps.set-ingress-host-address.outputs.APP_INGRESS_HOST }}
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
      # …other deployment steps…


  dev-integration-testing:
    if: contains(github.ref, 'feature/')
    needs: dev-deploy
    runs-on: ubuntu-latest
    steps:
      - name: Validate Deployment URL
        env:
          URL: ${{ needs.dev-deploy.outputs.APP_INGRESS_URL }}
        run: |
          echo "Testing URL: $URL"
          curl -s $URL/health | jq
```

### 2\. Prod Jobs

Guard production jobs with an exact branch check:

```
jobs:
  prod-deploy:
    if: github.ref == 'refs/heads/main'
    needs: docker
    runs-on: ubuntu-latest
    environment:
      name: production
      url: https://${{ steps.set-ingress-host-address.outputs.APP_INGRESS_HOST }}
    outputs:
      APP_INGRESS_URL: ${{ steps.set-ingress-host-address.outputs.APP_INGRESS_HOST }}
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
      # …other deployment steps…


  prod-integration-testing:
    name: Prod Integration Testing
    if: github.ref == 'refs/heads/main'
    needs: prod-deploy
    runs-on: ubuntu-latest
    steps:
      - name: Validate Production URL
        env:
          URL: ${{ needs.prod-deploy.outputs.APP_INGRESS_URL }}
        run: |
          echo "Testing Prod URL: $URL"
          curl -s https://$URL/live | grep -i '"status":"live"'
```

## Testing on a Feature Branch

Commit and push to a feature branch. You’ll see only the Docker and dev jobs run, while production jobs are skipped:

![The image shows a GitHub Actions workflow summary with a successful run, displaying various completed jobs like unit testing, containerization, and deployment steps.](https://kodekloud.com/kk-media/image/upload/v1752876448/notes-assets/images/GitHub-Actions-If-Expressions-and-Pull-Request/github-actions-workflow-success-summary.jpg)

Skipped jobs indicate their `if` condition evaluated to `false`.

## Raising a Pull Request

When you open a PR into `main`, all checks should pass and your dev-deploy URL is available for reviewers:

![The image shows a GitHub pull request page with a branch that has been successfully deployed. All checks have passed, and there are no conflicts with the base branch.](https://kodekloud.com/kk-media/image/upload/v1752876450/notes-assets/images/GitHub-Actions-If-Expressions-and-Pull-Request/github-pull-request-deployed-checks-passed.jpg)

Reviewers can click the deployment link to preview your changes before merging.

## Production Deployment Approval

After merging, the workflow on `main` triggers production jobs. If you’ve enabled environment protection rules, you’ll see a “Review pending deployments” prompt:

![The image shows a GitHub Actions interface with a "Review pending deployments" dialog, where a production deployment is awaiting approval or rejection. The interface includes options to leave a comment and buttons to "Reject" or "Approve and deploy."](https://kodekloud.com/kk-media/image/upload/v1752876450/notes-assets/images/GitHub-Actions-If-Expressions-and-Pull-Request/github-actions-review-pending-deployments.jpg)

> [!important]
> **Warning**
>
> Ensure you’ve configured environment protection rules in your repository settings to require manual approvals before Production deployments.

## Final Workflow Summary on `main`

Once approved, only the production deploy and integration tests run on `main`:

![The image shows a GitHub Actions workflow summary for a pull request, displaying successful completion of various jobs like unit testing, containerization, and deployment.](https://kodekloud.com/kk-media/image/upload/v1752876452/notes-assets/images/GitHub-Actions-If-Expressions-and-Pull-Request/github-actions-workflow-summary-pull-request.jpg)

All checks pass, and the production environment is live.

## Viewing All Deployments

In the **Environments** tab, you can filter by environment, view deployment statuses, associated branches, and pull requests:

_Explore the dashboard to monitor, retry, or roll back deployments—all from the GitHub UI._

## References

- [GitHub Actions Expressions](https://docs.github.com/actions/learn-github-actions/expressions)
- [Workflow syntax for GitHub Actions](https://docs.github.com/actions/using-workflows/workflow-syntax-for-github-actions)
- [Environments and protection rules](https://docs.github.com/actions/deployment/targeting-different-environments/using-environments-for-deployment)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions/module/92928734-1d5a-462d-9414-2d3865f5ef79/lesson/d7b7769b-d4d5-4855-8d04-4140fefcf922)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/github-actions/module/92928734-1d5a-462d-9414-2d3865f5ef79/lesson/4a9a503e-6df4-4021-a8a4-f6b7c0283299)**
>
> Practice lab
