# Workflow Event Filters and Activity Types - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/GitHub-Actions-Core-Concepts/Workflow-Event-Filters-and-Activity-Types)

---

## Table of Contents

- Workflow Event Filters and Activity Types
  - Key Filter Options
  - Example Workflow: Combining Filters and Activity Types
  - Pull Request Filters and Activity Types
  - Conclusion
  - Watch Video
    - Reviewing the Push Filter
    - Live Example 1: Push to main
    - Live Example 2: Push to Ignored Branch
    - Example 1: Only README.md Changed
    - Example 2: Other Files Changed

---

## Content

GitHub Actions Certification

GitHub Actions Core Concepts

# Workflow Event Filters and Activity Types

GitHub Actions workflows can trigger on events such as `push`, `workflow_dispatch`, and `schedule`. To avoid unnecessary builds, you can fine-tune which events—and which parts of those events—actually invoke your jobs.

First, review GitHub’s [list of available event activity types](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows). For example, Pull Request events support activities like `assigned`, `opened`, and `closed`:

![The image shows a GitHub documentation page about events that trigger workflows, detailing how to configure workflows based on specific activities. It includes a list of event types on the right side.](https://kodekloud.com/kk-media/image/upload/v1752876181/notes-assets/images/GitHub-Actions-Certification-Workflow-Event-Filters-and-Activity-Types/github-workflows-trigger-events-documentation.jpg)

For details on Pull Request types, see the [official docs](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#pull_request):

![The image shows a GitHub Docs page detailing events that trigger workflows, specifically focusing on pull request activity types and related information.](https://kodekloud.com/kk-media/image/upload/v1752876182/notes-assets/images/GitHub-Actions-Certification-Workflow-Event-Filters-and-Activity-Types/github-docs-workflows-pull-requests.jpg)

Push events don’t have activity types, but you can filter by branches, tags, and paths:

![The image shows a GitHub documentation page about events that trigger workflows, specifically focusing on the "push" event. It includes notes and examples related to webhook payloads and workflow execution.](https://kodekloud.com/kk-media/image/upload/v1752876183/notes-assets/images/GitHub-Actions-Certification-Workflow-Event-Filters-and-Activity-Types/github-workflows-push-event-documentation.jpg)

## Key Filter Options

| Filter Key        | Description                           | Applies To             |
| ----------------- | ------------------------------------- | ---------------------- |
| `branches`        | Only run on listed branches           | `push`, `pull_request` |
| `branches-ignore` | Skip listed branches                  | `push`, `pull_request` |
| `paths-ignore`    | Exclude specific files or directories | `push`, `pull_request` |
| `types`           | Limit to certain activity types       | `pull_request`         |

> [!important]
> **Note**
>
> Using these filters reduces unexpected workflow runs and speeds up your CI/CD pipeline.

---

## Example Workflow: Combining Filters and Activity Types

Add the file at `.github/workflows/filters-and-activities.yml`:

```
name: Workflow Filters and Activities

on:
  workflow_dispatch:

  push:
    branches:
      - main
    branches-ignore:
      - 'feature/*'
      - 'test/**'

  pull_request:
    types:
      - opened
      - closed
    paths-ignore:
      - README.md
    branches:
      - main

jobs:
  hello:
    runs-on: ubuntu-latest
    steps:
      - name: Show Event
        run: echo "This workflow ran for event: ${{ github.event_name }}"
```

### Reviewing the Push Filter

- `branches: [main]` ensures only pushes to `main` trigger the workflow.
- `branches-ignore: ['feature/*', 'test/**']` skips any branch matching those patterns.

---

### Live Example 1: Push to `main`

Pushing to `main` queues and runs the workflow:

![The image shows a GitHub Actions page displaying a successful workflow run for a repository. The workflow, triggered by a push, completed in 13 seconds.](https://kodekloud.com/kk-media/image/upload/v1752876184/notes-assets/images/GitHub-Actions-Certification-Workflow-Event-Filters-and-Activity-Types/github-actions-successful-workflow-run.jpg)

### Live Example 2: Push to Ignored Branch

```
git checkout -b feature/event-testing
# Edit README.md
git add README.md
git commit -m "Update README for testing"
git push -u origin feature/event-testing
```

Since `feature/*` is ignored, no workflow runs:

![The image shows a GitHub Actions page displaying a list of workflow runs with their statuses, branches, and timestamps. Some workflows have succeeded, while others have failed.](https://kodekloud.com/kk-media/image/upload/v1752876186/notes-assets/images/GitHub-Actions-Certification-Workflow-Event-Filters-and-Activity-Types/github-actions-workflow-runs-statuses.jpg)

---

## Pull Request Filters and Activity Types

### Example 1: Only `README.md` Changed

Opening a PR from `feature/event-testing` to `main` with only `README.md` modified will not trigger the workflow due to `paths-ignore`:

![The image shows a GitHub interface for creating a pull request, with options to compare branches and add comments.](https://kodekloud.com/kk-media/image/upload/v1752876187/notes-assets/images/GitHub-Actions-Certification-Workflow-Event-Filters-and-Activity-Types/github-pull-request-interface-branches-comments.jpg)

Even after opening or closing, nothing runs:

![The image shows a GitHub pull request page with options to merge or close the pull request. It indicates that the branch has no conflicts with the base branch.](https://kodekloud.com/kk-media/image/upload/v1752876188/notes-assets/images/GitHub-Actions-Certification-Workflow-Event-Filters-and-Activity-Types/github-pull-request-merge-options.jpg)

### Example 2: Other Files Changed

Modify any file besides `README.md`, push, and open a new PR. The workflow now triggers:

![The image shows a GitHub Actions page displaying a list of workflow runs with their statuses, branches, and timestamps. The interface is in dark mode, and various workflows are listed with green and red status indicators.](https://kodekloud.com/kk-media/image/upload/v1752876189/notes-assets/images/GitHub-Actions-Certification-Workflow-Event-Filters-and-Activity-Types/github-actions-workflow-runs-statuses-2.jpg)

Click into the run to view the `hello` job:

![The image shows a GitHub Actions workflow run, with a job named "hello" that has successfully executed a step for a pull request event.](https://kodekloud.com/kk-media/image/upload/v1752876190/notes-assets/images/GitHub-Actions-Certification-Workflow-Event-Filters-and-Activity-Types/github-actions-workflow-hello-job.jpg)

---

## Conclusion

By combining `branches`, `branches-ignore`, `paths-ignore`, and `types`, you gain precise control over which push and pull_request events trigger your workflows. This leads to faster feedback cycles and cleaner CI build history.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/54711be0-66e6-461b-b935-f77d78a5e000/lesson/8d7ceef2-975e-47f4-8298-7d1b878dcb6c)**
>
> Watch video content
