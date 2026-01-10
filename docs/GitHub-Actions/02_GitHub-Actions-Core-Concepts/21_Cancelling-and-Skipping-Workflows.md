# Cancelling and Skipping Workflows - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions/GitHub-Actions-Core-Concepts/Cancelling-and-Skipping-Workflows)

---

## Table of Contents

- Cancelling and Skipping Workflows
  - Skipping Workflow Runs via Commit Messages
  - Example: Skipping Workflows for Documentation Changes
  - Cancelling an In-Progress Workflow
  - Links and References
  - Watch Video
  - Practice Lab

---

## Content

GitHub Actions

GitHub Actions Core Concepts

# Cancelling and Skipping Workflows

Optimize your continuous integration (CI) pipeline by learning how to prevent unnecessary GitHub Actions runs and how to stop jobs that are already in progress. This guide covers:

- How to skip workflows using commit-message directives
- How to cancel an in-progress workflow from the GitHub UI

---

## Skipping Workflow Runs via Commit Messages

By including specific keywords in your commit messages, you can tell GitHub Actions to bypass workflow triggers for `push` and `pull_request` events. This is particularly useful when making non-code changes like documentation updates.

> [!important]
> **Note**
>
> The directives below are case-insensitive and must appear anywhere in your **commit message**.

| Directive           | Behavior                                           |
| ------------------- | -------------------------------------------------- |
| `skip ci`           | Skip all workflow runs for this commit             |
| `ci skip`           | Alias for `skip ci`                                |
| `no ci`             | Skip all workflow runs for this commit             |
| `skip-checks: true` | Add after two blank lines at end of commit message |

![The image shows a GitHub documentation page about skipping workflow runs, explaining how to prevent workflows from triggering by using specific commands in commit messages.](https://kodekloud.com/kk-media/image/upload/v1752876620/notes-assets/images/GitHub-Actions-Cancelling-and-Skipping-Workflows/github-skipping-workflow-runs-documentation.jpg)

> [!important]
> **Warning**
>
> Skipping CI can hide build failures. Use these directives only for trivial changes (e.g., spelling fixes, docs).

---

## Example: Skipping Workflows for Documentation Changes

When you update files like `README.md`, you often don’t need to rebuild or redeploy your application. Here’s how to skip CI for pure documentation commits:

![The image shows a Visual Studio Code interface with a README.md file open, displaying text about exploring GitHub Actions. The file explorer on the left lists several YAML and script files.](https://kodekloud.com/kk-media/image/upload/v1752876621/notes-assets/images/GitHub-Actions-Cancelling-and-Skipping-Workflows/vscode-readme-github-actions-file-explorer.jpg)

1.  Edit your documentation file:

    ```
    git add README.md
    git commit -m "Refresh markdown formatting [ci skip]"
    ```

2.  Push the commit:

    ```
    git push origin main
    ```

3.  Confirm no workflows ran by checking the **Actions** tab in your repository.

---

## Cancelling an In-Progress Workflow

If you realize a running workflow is no longer needed—perhaps it was triggered by mistake or contains a broken job—you can cancel it in just a few clicks:

1.  Go to the **Actions** tab in your GitHub repository.
2.  Click the workflow run that’s currently in progress.
3.  Hit **Cancel workflow** in the upper-right corner of the run details page.

Your job will be immediately terminated, freeing up your runner capacity.

---

## Links and References

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Commit Message Guidelines](https://www.conventionalcommits.org/)
- [GitHub Actions: Skipping Workflows](https://docs.github.com/en/actions/learn-github-actions/avoiding-frequent-workflow-runs)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions/module/0ac6c98f-7100-471e-b9aa-037f25cb58d7/lesson/815bd28b-c2d7-4f39-b8e5-2fc0420446ac)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/github-actions/module/0ac6c98f-7100-471e-b9aa-037f25cb58d7/lesson/aa1efd6b-0a53-4116-88a7-d3ca5705fa35)**
>
> Practice lab
