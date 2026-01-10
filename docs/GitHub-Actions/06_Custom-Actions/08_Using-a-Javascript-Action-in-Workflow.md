# Using a Javascript Action in Workflow - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions/Custom-Actions/Using-a-Javascript-Action-in-Workflow)

---

## Table of Contents

- Using a Javascript Action in Workflow
  - Prerequisites
  - 1. Review the Existing Workflow
  - 2. Add the JavaScript Action
  - 3. Commit Changes and Open a Pull Request
  - 4. Verify the Comments
  - 5. Inspect the Workflow Run
  - Links and References
  - Watch Video

---

## Content

GitHub Actions

Custom Actions

# Using a Javascript Action in Workflow

Integrate a JavaScript custom action alongside an existing Docker-based action to post two “thank you” GIF comments on pull requests. This guide walks through updating your workflow file to call both actions, committing the changes, and verifying the results in GitHub.

## Prerequisites

> [!important]
> **Note**
>
> - A GitHub repository with an existing workflow file (e.g., `.github/workflows/pr-thank-you.yml`)
> - `GITHUB_TOKEN` and `GIPHY_API_KEY` set in **Repository → Settings → Secrets**
> - Basic familiarity with YAML and [GitHub Actions](https://docs.github.com/actions)

## 1\. Review the Existing Workflow

Open `.github/workflows/pr-thank-you.yml` and locate the step that invokes the Docker-based action:

```
on:
  pull_request:
    types: [opened]


jobs:
  pr-action:
    runs-on: ubuntu-latest
    permissions:
      issues: write
      pull-requests: write
    steps:
      - name: Post PR Comment (Docker)
        uses: sidd-harth-7/docker-action-pr-giphy-comment@main
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          giphy-api-key:  ${{ secrets.GIPHY_API_KEY }}
```

This configuration triggers whenever a pull request is opened and posts a GIF comment via the Docker action.

## 2\. Add the JavaScript Action

Head over to the [GitHub Marketplace](https://github.com/marketplace) and search for the JavaScript version:  
**sidd-harth-7/js-action-pr-giphy-comment**, currently at tag `1.0.0-alpha`.

![The image shows a GitHub Marketplace page for the "KodeKloud Giphy PR Comment" action, which is a sample action for demo purposes. It includes options to use the latest version and shows contributor information.](https://kodekloud.com/kk-media/image/upload/v1752876599/notes-assets/images/GitHub-Actions-Using-a-Javascript-Action-in-Workflow/github-marketplace-kodekloud-giphy-action.jpg)

Update your workflow to include both the Docker and JavaScript actions:

```
on:
  pull_request:
    types: [opened]


jobs:
  pr-action:
    runs-on: ubuntu-latest
    permissions:
      issues: write
      pull-requests: write
    steps:
      - name: Post PR Comment (Docker)
        uses: sidd-harth-7/docker-action-pr-giphy-comment@main
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          giphy-api-key:  ${{ secrets.GIPHY_API_KEY }}


      - name: Post PR Comment (JavaScript)
        uses: sidd-harth-7/js-action-pr-giphy-comment@1.0.0-alpha
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          giphy-api-key:  ${{ secrets.GIPHY_API_KEY }}
```

| Action Type       | Version        | Purpose                            |
| ----------------- | -------------- | ---------------------------------- |
| Docker Action     | `@main`        | Builds a container and posts a GIF |
| JavaScript Action | `@1.0.0-alpha` | Executes a JS bundle to post a GIF |

## 3\. Commit Changes and Open a Pull Request

Commit your updated workflow. You can commit directly or create a new branch for a pull request:

![The image shows a GitHub interface with a "Commit changes" dialog open, where a commit message is being entered for a file update. The user can choose to commit directly to a branch or create a new branch for a pull request.](https://kodekloud.com/kk-media/image/upload/v1752876600/notes-assets/images/GitHub-Actions-Using-a-Javascript-Action-in-Workflow/github-commit-changes-dialog-interface.jpg)

Once you open the PR, GitHub Actions triggers the workflow:

![The image shows a GitHub pull request page for a project named "solar-system," with details about a pull request titled "Update pr-thank-you.yml added JS action." The pull request is open, with some checks pending and no conflicts with the base branch.](https://kodekloud.com/kk-media/image/upload/v1752876602/notes-assets/images/GitHub-Actions-Using-a-Javascript-Action-in-Workflow/github-pull-request-solar-system-update.jpg)

## 4\. Verify the Comments

After the workflow completes, check the pull request conversation. You should see two GIF comments—one from each action:

![The image shows a GitHub pull request page with comments featuring GIFs expressing gratitude for contributions.](https://kodekloud.com/kk-media/image/upload/v1752876603/notes-assets/images/GitHub-Actions-Using-a-Javascript-Action-in-Workflow/github-pull-request-comments-gifs-gratitude.jpg)

## 5\. Inspect the Workflow Run

Go to the **Actions** tab and select the latest run of your PR workflow:

![The image shows a GitHub Actions interface with a list of workflow runs, including details like event names, status, branches, and timestamps. The sidebar displays options for managing workflows, caches, deployments, and runners.](https://kodekloud.com/kk-media/image/upload/v1752876605/notes-assets/images/GitHub-Actions-Using-a-Javascript-Action-in-Workflow/github-actions-workflow-runs-interface.jpg)

Under the `pr-action` job, you’ll see two distinct steps:

- **Docker Action**: Builds the image and posts its comment
- **JavaScript Action**: Runs the pre-built bundle and posts its comment

![The image shows a GitHub Actions workflow run page with a successful job titled "pr-action," which includes steps for building a Docker container and posting a pull request comment.](https://kodekloud.com/kk-media/image/upload/v1752876606/notes-assets/images/GitHub-Actions-Using-a-Javascript-Action-in-Workflow/github-actions-pr-action-docker-workflow.jpg)

Finally, confirm both steps succeeded in the workflow summary:

![The image shows a GitHub Actions workflow run summary for a repository, indicating a successful job execution involving a JavaScript action for posting a PR comment with a Giphy link.](https://kodekloud.com/kk-media/image/upload/v1752876607/notes-assets/images/GitHub-Actions-Using-a-Javascript-Action-in-Workflow/github-actions-workflow-summary-success.jpg)

---

You’ve now successfully integrated a JavaScript custom action with your existing Docker action in the same workflow. Both can be versioned, published, and reused via the [GitHub Marketplace](https://github.com/marketplace).

## Links and References

- [GitHub Actions Documentation](https://docs.github.com/actions)
- [GitHub Marketplace](https://github.com/marketplace)
- [Managing Secrets](https://docs.github.com/actions/security-guides/encrypted-secrets)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions/module/cdb7c2b7-442d-440c-a4f1-d6679733ffd8/lesson/94329e6e-fd77-4d75-9b01-e00d7e61d208)**
>
> Watch video content
