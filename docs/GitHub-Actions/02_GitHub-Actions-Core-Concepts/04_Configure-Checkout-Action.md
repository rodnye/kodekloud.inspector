# Configure Checkout Action - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions/GitHub-Actions-Core-Concepts/Configure-Checkout-Action)

---

## Table of Contents

- Configure Checkout Action
  - Prerequisites
  - 1. Browse the GitHub Marketplace
  - 2. Select the Official Checkout Action
  - 3. Review the Checkout Action Documentation
  - 4. Update Your Workflow File
  - 5. Commit and Trigger the Workflow
  - 6. Inspect the Logs
  - 7. Review Workflow History
  - Links and References
  - Watch Video

---

## Content

GitHub Actions

GitHub Actions Core Concepts

# Configure Checkout Action

In this lesson, you’ll learn how to add the `actions/checkout` step to your GitHub Actions workflow, ensuring your repository code is available for subsequent steps.

## Prerequisites

- A GitHub repository
- Basic familiarity with GitHub Actions and YAML syntax

## 1\. Browse the GitHub Marketplace

Visit the [GitHub Marketplace](https://github.com/marketplace?type=actions) and search for “checkout” to filter relevant actions.

![The image shows the GitHub Marketplace interface with a search for "checkout" actions, displaying various options for automating development workflows. The left sidebar lists categories like API management and code quality.](https://kodekloud.com/kk-media/image/upload/v1752876622/notes-assets/images/GitHub-Actions-Configure-Checkout-Action/github-marketplace-checkout-actions-interface.jpg)

## 2\. Select the Official Checkout Action

Choose the [Checkout Action](https://github.com/marketplace/actions/checkout) maintained by GitHub. Look for the verified badge next to the publisher name.

![The image shows a GitHub Marketplace page for the "Checkout" GitHub Action, detailing its version, usage, and features. It includes information about the action's functionality, contributors, and updates.](https://kodekloud.com/kk-media/image/upload/v1752876623/notes-assets/images/GitHub-Actions-Configure-Checkout-Action/github-marketplace-checkout-action-details.jpg)

## 3\. Review the Checkout Action Documentation

The `actions/checkout@v4` README contains usage examples and configurable options. Review it for advanced scenarios like submodule fetching or shallow clones.

![The image shows a GitHub documentation page for the "actions/checkout" action, highlighting usage instructions and configuration options for setting up a repository checkout in a workflow.](https://kodekloud.com/kk-media/image/upload/v1752876624/notes-assets/images/GitHub-Actions-Configure-Checkout-Action/github-actions-checkout-documentation.jpg)

## 4\. Update Your Workflow File

Add the checkout step at the top of your job’s `steps` list so that all subsequent commands have access to your repository files.

```
name: My First Workflow
on: push


jobs:
  first_job:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4


      - name: Welcome message
        run: echo "My first GitHub Actions Job"


      - name: List files
        run: ls


      - name: Read file
        run: cat README.md
```

> [!important]
> **Warning**
>
> If you omit `actions/checkout`, subsequent steps won’t have access to your code, leading to errors such as `file not found` when running commands like `ls` or `cat`.

For clarity, here’s an overview of each step in the workflow:

| Step Name           | Action                                    |
| ------------------- | ----------------------------------------- |
| Checkout Repository | `uses: actions/checkout@v4`               |
| Welcome message     | `run: echo "My first GitHub Actions Job"` |
| List files          | `run: ls`                                 |
| Read file           | `run: cat README.md`                      |

## 5\. Commit and Trigger the Workflow

Commit your changes and push to GitHub. Navigate to the **Actions** tab to watch your workflow run live.

![The image shows a GitHub Actions workflow interface with a job named "first job" that has successfully completed several steps, including setting up the job, checking out the repository, and completing the job.](https://kodekloud.com/kk-media/image/upload/v1752876624/notes-assets/images/GitHub-Actions-Configure-Checkout-Action/github-actions-workflow-first-job-success.jpg)

## 6\. Inspect the Logs

In the job logs, you’ll see the checkout action pulling down your repository. To view hidden files (e.g., the `.github` directory), use:

> [!important]
> **Note**
>
> Run `ls -a` to display all files, including those starting with a dot.

```
ls -a
```

## 7\. Review Workflow History

Return to the main **Actions** page to see past runs, both successful and failed, and download logs or enable timestamps.

![The image shows a GitHub Actions page with a workflow named "My First Workflow." It displays two workflow runs, one successful and one failed.](https://kodekloud.com/kk-media/image/upload/v1752876626/notes-assets/images/GitHub-Actions-Configure-Checkout-Action/github-actions-my-first-workflow-runs.jpg)

## Links and References

- [actions/checkout@v4 README](https://github.com/actions/checkout/blob/v4/README.md)
- [GitHub Marketplace Actions](https://github.com/marketplace?type=actions)
- [GitHub Actions Documentation](https://docs.github.com/actions)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions/module/0ac6c98f-7100-471e-b9aa-037f25cb58d7/lesson/61b39e92-291f-41c0-ba6a-ba17d2b41a6f)**
>
> Watch video content
