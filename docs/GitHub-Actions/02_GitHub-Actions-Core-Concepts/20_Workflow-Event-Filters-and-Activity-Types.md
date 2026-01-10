# Workflow Event Filters and Activity Types - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions/GitHub-Actions-Core-Concepts/Workflow-Event-Filters-and-Activity-Types)

---

## Table of Contents

- Workflow Event Filters and Activity Types
  - Filters and Activity Types Overview
  - Sample Workflow: workflowfilters.yaml
  - 1. Push Event Filtering
  - 2. Pull Request Activity Types and Path Filters
  - 3. PR with Other File Changes
  - Complete Example with Scheduled Triggers
  - Links and References
  - Watch Video
    - 2.1 PR with Only README.md Changes

---

## Content

GitHub Actions

GitHub Actions Core Concepts

# Workflow Event Filters and Activity Types

In this guide, you’ll learn how to fine-tune GitHub Actions workflows by combining event filters, branch filters, path filters, and activity types. By applying these settings, you can ensure that your CI/CD pipelines run only when relevant code or pull request events occur.

![The image shows a GitHub documentation page about events that trigger workflows, with a sidebar menu and a list of event types.](https://kodekloud.com/kk-media/image/upload/v1752876671/notes-assets/images/GitHub-Actions-Workflow-Event-Filters-and-Activity-Types/github-workflows-events-documentation-sidebar.jpg)

For Pull Request events, you can target specific activities such as `opened`, `closed`, or `assigned`:

![The image shows a GitHub Docs page detailing events that trigger workflows, specifically focusing on pull request events and their activity types.](https://kodekloud.com/kk-media/image/upload/v1752876672/notes-assets/images/GitHub-Actions-Workflow-Event-Filters-and-Activity-Types/github-docs-workflows-pull-requests.jpg)

The Push event doesn’t support activity types, but you can filter by paths and branches:

![The image shows a GitHub documentation page about events that trigger workflows, specifically focusing on the "push" event. It includes notes and examples related to GitHub Actions.](https://kodekloud.com/kk-media/image/upload/v1752876674/notes-assets/images/GitHub-Actions-Workflow-Event-Filters-and-Activity-Types/github-actions-push-event-workflows.jpg)

## Filters and Activity Types Overview

| Event           | Activity Types (types) | Branch Filters                | Path Filters            |
| --------------- | ---------------------- | ----------------------------- | ----------------------- |
| push            | —                      | `branches`, `branches-ignore` | `paths`, `paths-ignore` |
| pull\\\_request | `opened`, `closed`, …  | `branches`, `branches-ignore` | `paths`, `paths-ignore` |

## Sample Workflow: `workflowfilters.yaml`

```
name: Workflow Filters and Activities


on:
  workflow_dispatch:
  push:
    # Run on pushes to main; ignore feature/* branches
    branches:
      - main
    branches-ignore:
      - 'feature/*'
  pull_request:
    # Trigger only for opened and closed PRs on main
    types:
      - opened
      - closed
    branches:
      - main
    # Skip runs when only README.md changes
    paths-ignore:
      - README.md


jobs:
  hello:
    runs-on: ubuntu-latest
    steps:
      - run: echo "This job ran for event: ${{ github.event_name }}"
```

> [!important]
> **Note**
>
> Using filters helps reduce unnecessary workflow runs and speeds up your feedback loop.

---

## 1\. Push Event Filtering

The `push` event can be scoped by branch patterns:

- `branches`: include only these branches.
- `branches-ignore`: exclude matching branches.
- `paths`: include only if specified files change.
- `paths-ignore`: exclude if only specified files change.

Example: trigger on `main` pushes, ignore `feature/*` branches.

```
on:
  push:
    branches:
      - main
    branches-ignore:
      - 'feature/*'
```

When you push to `main`, the workflow runs:

![The image shows a GitHub Actions page with a successful workflow run named "workflow filters" that took 13 seconds to complete. The workflow was triggered by a push event and includes a job labeled "hello."](https://kodekloud.com/kk-media/image/upload/v1752876675/notes-assets/images/GitHub-Actions-Workflow-Event-Filters-and-Activity-Types/github-actions-workflow-filters-success.jpg)

Pushing to `feature/...` branches is ignored:

![The image shows a GitHub Actions page displaying a list of workflow runs, with details such as event, status, branch, and actor. Some workflows have succeeded, while others have failed.](https://kodekloud.com/kk-media/image/upload/v1752876676/notes-assets/images/GitHub-Actions-Workflow-Event-Filters-and-Activity-Types/github-actions-workflow-runs-status.jpg)

---

## 2\. Pull Request Activity Types and Path Filters

You can refine `pull_request` triggers by:

- `types`: run workflows on specific PR actions (`opened`, `closed`, etc.).
- `branches`: target only certain base branches.
- `paths` / `paths-ignore`: filter by file changes.

```
on:
  pull_request:
    types:
      - opened
      - closed
    branches:
      - main
    paths-ignore:
      - README.md
```

### 2.1 PR with Only README.md Changes

If a PR only updates `README.md`, the workflow is skipped:

![The image shows a GitHub interface for creating a pull request, with options to compare branches and add a title and comment.](https://kodekloud.com/kk-media/image/upload/v1752876678/notes-assets/images/GitHub-Actions-Workflow-Event-Filters-and-Activity-Types/github-pull-request-interface-branches.jpg)

![The image shows a GitHub pull request page where a user is attempting to merge a commit into the main branch from a feature branch. The pull request is open, with no description provided, and is checking for the ability to merge automatically.](https://kodekloud.com/kk-media/image/upload/v1752876679/notes-assets/images/GitHub-Actions-Workflow-Event-Filters-and-Activity-Types/github-pull-request-merge-feature-branch.jpg)

Even closing the PR does **not** trigger it:

![The image shows a GitHub pull request interface, indicating that a branch has no conflicts with the base branch and can be merged automatically. There are options to merge or close the pull request.](https://kodekloud.com/kk-media/image/upload/v1752876680/notes-assets/images/GitHub-Actions-Workflow-Event-Filters-and-Activity-Types/github-pull-request-merge-interface.jpg)

> [!important]
> **Warning**
>
> If your `paths-ignore` list is too broad, you might inadvertently skip critical runs. Always test your filters in a separate branch.

---

## 3\. PR with Other File Changes

When a PR includes changes beyond `README.md`—for example, adding ASCII artwork—the workflow triggers on open:

![The image shows a GitHub interface comparing changes between branches, indicating that the branches can be merged, with options to create a pull request and view commit details.](https://kodekloud.com/kk-media/image/upload/v1752876681/notes-assets/images/GitHub-Actions-Workflow-Event-Filters-and-Activity-Types/github-branch-comparison-pull-request.jpg)

![The image shows a GitHub Actions page displaying a list of workflow runs with their statuses, branches, and timestamps.](https://kodekloud.com/kk-media/image/upload/v1752876682/notes-assets/images/GitHub-Actions-Workflow-Event-Filters-and-Activity-Types/github-actions-workflow-runs-statuses.jpg)

The `hello` job runs successfully:

![The image shows a GitHub Actions workflow run, specifically a job labeled "hello" that has successfully executed a step for a pull request event.](https://kodekloud.com/kk-media/image/upload/v1752876683/notes-assets/images/GitHub-Actions-Workflow-Event-Filters-and-Activity-Types/github-actions-workflow-hello-job.jpg)

Since `closed` is included in `types`, closing the PR also triggers the workflow:

![The image shows a GitHub Actions page with a list of workflow runs, including details like event triggers, status, and branches. The interface is in dark mode, displaying three workflow runs related to feature/event testing and workflow filters.](https://kodekloud.com/kk-media/image/upload/v1752876684/notes-assets/images/GitHub-Actions-Workflow-Event-Filters-and-Activity-Types/github-actions-workflow-runs-dark-mode.jpg)

---

## Complete Example with Scheduled Triggers

```
name: Workflow Filters and Activities


on:
  workflow_dispatch:
  schedule:
    - cron: "*/59 * * * *"
  push:
    branches:
      - main
    branches-ignore:
      - 'feature/*'
  pull_request:
    types:
      - opened
      - closed
    branches:
      - main
    paths-ignore:
      - README.md


jobs:
  hello:
    runs-on: ubuntu-latest
    steps:
      - run: echo "Executed for event: ${{ github.event_name }}"
```

## Links and References

- [GitHub Actions: Events that trigger workflows](https://docs.github.com/actions/using-workflows/events-that-trigger-workflows)
- [Workflow syntax for GitHub Actions](https://docs.github.com/actions/using-workflows/workflow-syntax-for-github-actions)
- [Scheduled events (cron)](https://docs.github.com/actions/using-workflows/events-that-trigger-workflows#scheduled-events)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions/module/0ac6c98f-7100-471e-b9aa-037f25cb58d7/lesson/66f2d153-ab65-4de5-8ffc-6c16557babe3)**
>
> Watch video content
