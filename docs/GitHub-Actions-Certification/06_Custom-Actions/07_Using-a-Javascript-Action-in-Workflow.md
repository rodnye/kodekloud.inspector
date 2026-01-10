# Using a Javascript Action in Workflow - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/Custom-Actions/Using-a-Javascript-Action-in-Workflow)

---

## Table of Contents

- Using a Javascript Action in Workflow
  - 1. Review the Original Docker-Based Workflow
  - 2. Identify the JavaScript Action on Marketplace
  - 3. Update Your Workflow to Include the JavaScript Action
  - 4. Commit Changes and Open a Pull Request
  - 5. Monitor Workflow Runs and Logs
  - Links and References
  - Watch Video

---

## Content

GitHub Actions Certification

Custom Actions

# Using a Javascript Action in Workflow

In this guide, you’ll learn how to extend an existing GitHub Actions workflow by integrating a JavaScript custom action from the GitHub Marketplace. We’ll start with a Docker-based PR comment action and then add the JavaScript version to post a “Thank You” GIF on every new pull request.

## 1\. Review the Original Docker-Based Workflow

The `pr-thank-you.yml` workflow below triggers on pull request **opened** events and uses a Docker action to post a Giphy comment:

```
on:
  pull_request:
    types:
      - opened


jobs:
  pr-action:
    runs-on: ubuntu-latest
    permissions:
      issues: write
      pull-requests: write
    steps:
      - name: Post Docker Action PR Comment
        uses: sidd-harth-7/docker-action-pr-giphy-comment@main
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          giphy-api-key: ${{ secrets.GIPHY_API_KEY }}
```

> [!important]
> **Note**
>
> Be sure your workflow has `issues: write` and `pull-requests: write` permissions so the action can post comments on PRs.

## 2\. Identify the JavaScript Action on Marketplace

Search the GitHub Marketplace for the JavaScript version of the Giphy PR comment action. In this example, the identifier is:

```
sidd-harth-7/js-action-pr-giphy-comment@1.0.0-alpha
```

![The image shows a GitHub Marketplace page for a GitHub Action called "KodeKloud Giphy PR Comment," which is a sample action for demo purposes. It includes details like the version, a link to use the latest version, and contributor information.](https://kodekloud.com/kk-media/image/upload/v1752876092/notes-assets/images/GitHub-Actions-Certification-Using-a-Javascript-Action-in-Workflow/github-marketplace-kodekloud-giphy-action.jpg)

## 3\. Update Your Workflow to Include the JavaScript Action

Open `pr-thank-you.yml` and add a new step for the JavaScript action immediately after the Docker action:

```
on:
  pull_request:
    types:
      - opened


jobs:
  pr-action:
    runs-on: ubuntu-latest
    permissions:
      issues: write
      pull-requests: write
    steps:
      - name: Post Docker Action PR Comment
        uses: sidd-harth-7/docker-action-pr-giphy-comment@main
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          giphy-api-key: ${{ secrets.GIPHY_API_KEY }}


      - name: Post JavaScript Action PR Comment
        uses: sidd-harth-7/js-action-pr-giphy-comment@1.0.0-alpha
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          giphy-api-key: ${{ secrets.GIPHY_API_KEY }}
```

| Feature             | Docker Action                                      | JavaScript Action                                     |
| ------------------- | -------------------------------------------------- | ----------------------------------------------------- |
| Workflow Step Name  | Post Docker Action PR Comment                      | Post JavaScript Action PR Comment                     |
| Action Reference    | `sidd-harth-7/docker-action-pr-giphy-comment@main` | `sidd-harth-7/js-action-pr-giphy-comment@1.0.0-alpha` |
| Startup Performance | Slower (builds container)                          | Faster (runs natively on Node.js)                     |
| Version Pinning     | `@main`                                            | `@1.0.0-alpha`                                        |

## 4\. Commit Changes and Open a Pull Request

Save your updated workflow on a branch, commit with a descriptive message, push the branch, and then create a pull request. This will trigger both actions on your new PR:

![The image shows a GitHub interface with a commit changes dialog open, where a user is updating a file named "pr-thank-you.yml" with a commit message.](https://kodekloud.com/kk-media/image/upload/v1752876093/notes-assets/images/GitHub-Actions-Certification-Using-a-Javascript-Action-in-Workflow/github-commit-changes-dialog-pr-thank-you.jpg)

## 5\. Monitor Workflow Runs and Logs

1.  Go to the **Actions** tab in your repository.
2.  Select the latest run of the “PR Thank You” workflow.
3.  Expand the `pr-action` job to review logs for both the Docker and JavaScript steps.

![The image shows a GitHub Actions page with a list of workflow runs for a repository named "solar-system." Each entry displays details like the workflow name, status, and time of execution.](https://kodekloud.com/kk-media/image/upload/v1752876094/notes-assets/images/GitHub-Actions-Certification-Using-a-Javascript-Action-in-Workflow/github-actions-solar-system-workflows.jpg)

![The image shows a GitHub Actions workflow run summary, indicating a successful execution of a job named "pr-action" that includes building a Docker container and posting a JavaScript action PR comment with a Giphy GIF.](https://kodekloud.com/kk-media/image/upload/v1752876095/notes-assets/images/GitHub-Actions-Certification-Using-a-Javascript-Action-in-Workflow/github-actions-pr-action-docker-summary.jpg)

Both actions will post separate “Thank You” GIF comments on your pull request, demonstrating how you can mix and reuse Docker and JavaScript actions from the GitHub Marketplace.

---

## Links and References

- [GitHub Actions Documentation](https://docs.github.com/actions)
- [GitHub Marketplace](https://github.com/marketplace)
- [Creating a JavaScript Action](https://docs.github.com/actions/creating-actions/creating-a-javascript-action)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/428391ee-45d0-4e9c-9e06-78d0c5ff7657/lesson/a22a8257-8ba4-4389-aabe-e58089399d64)**
>
> Watch video content
