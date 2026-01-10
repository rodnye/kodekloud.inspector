# Cancelling and Skipping Workflows - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/GitHub-Actions-Core-Concepts/Cancelling-and-Skipping-Workflows)

---

## Table of Contents

- Cancelling and Skipping Workflows
  - Skipping Workflows via Commit Messages
  - Cancelling In-Progress Workflow Runs
  - Links and References
  - Watch Video
    - Supported Keywords
    - Example

---

## Content

GitHub Actions Certification

GitHub Actions Core Concepts

# Cancelling and Skipping Workflows

In this guide, you’ll learn how to prevent unnecessary GitHub Actions runs by skipping workflows via commit messages, as well as how to cancel jobs that are already in progress.

## Skipping Workflows via Commit Messages

When you include specific keywords in your commit message, GitHub Actions will ignore `push` and `pull_request` events for that commit. This helps you save CI minutes and speed up your development process.

> [!important]
> **Note**
>
> Skipping workflows with commit messages is case-insensitive and works with or without brackets.

### Supported Keywords

| Pattern       | Description              |
| ------------- | ------------------------ |
| skip ci       | Basic skip command       |
| ci skip       | Alternate skip command   |
| \\[skip ci\\] | Bracketed skip           |
| \\[ci skip\\] | Bracketed alternate skip |

> You can also place a footer after two blank lines in your commit message:
>
> ```
> skip-checks: true
> ```

### Example

Imagine you only changed the documentation in `README.md` and want to skip all workflows:

```
git add README.md
git commit -m "Update README.md [skip ci]"
git push
```

Because the commit message contains `[skip ci]`, GitHub Actions will skip every workflow for that push. Visit the **Actions** tab in your repository to confirm there are no new runs.

## Cancelling In-Progress Workflow Runs

If you need to stop a workflow that’s already running, follow these steps:

1.  Go to the **Actions** tab in your GitHub repository.
2.  Select the workflow run you wish to cancel.
3.  Click **Cancel workflow** in the top-right corner.

This will immediately halt all jobs in that workflow run.

> [!important]
> **Warning**
>
> Cancelling a workflow does not roll back any completed jobs or deployed artifacts. Ensure you manually revert changes if necessary.

## Links and References

- [GitHub Actions: Context and expression syntax](https://docs.github.com/en/actions/learn-github-actions/contexts)
- [GitHub Actions: Using workflow keywords](https://docs.github.com/en/actions/learn-github-actions/skip-workflow)
- [GitHub Docs](https://docs.github.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/54711be0-66e6-461b-b935-f77d78a5e000/lesson/b10bfa9d-93cd-4725-86f7-51703079d95c)**
>
> Watch video content
