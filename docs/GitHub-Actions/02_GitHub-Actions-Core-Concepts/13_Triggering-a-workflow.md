# Triggering a workflow - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions/GitHub-Actions-Core-Concepts/Triggering-a-workflow)

---

## Table of Contents

- Triggering a workflow
  - Common Repository Events
  - Scheduled Workflows
  - Manual Triggers with workflow_dispatch
  - Combining Schedule and Manual Dispatch
  - Links and References
  - Watch Video
    - 1. Push
    - 2. Pull Request

---

## Content

GitHub Actions

GitHub Actions Core Concepts

# Triggering a workflow

GitHub Actions can respond to many events—from code pushes and pull requests to scheduled cron jobs and manual dispatch. In this guide, we’ll cover the most common triggers, show you how to configure them, and demonstrate how to combine multiple triggers in a single workflow.

For a complete list of events, see the [official documentation](https://docs.github.com/en/actions/reference/events-that-trigger-workflows).

![The image shows a GitHub documentation page about events that trigger workflows, detailing how to configure workflows based on specific activities or events. The sidebar lists various related topics and options.](https://kodekloud.com/kk-media/image/upload/v1752876646/notes-assets/images/GitHub-Actions-Triggering-a-workflow/github-workflows-events-documentation-sidebar.jpg)

## Common Repository Events

You can launch workflows in response to repository activity. Below is a quick reference:

| Event           | Description                               | YAML snippet      |
| --------------- | ----------------------------------------- | ----------------- |
| push            | Run on commits pushed to branches or tags | `on: push`        |
| pull\\\_request | Trigger on PR open, edit, close, etc.     | see example below |
| issues          | Fire when issues are opened or modified   | `on: issues`      |
| release         | Trigger on draft, published, or edited    | `on: release`     |
| fork            | Run when someone forks the repository     | `on: fork`        |

### 1\. Push

The simplest trigger is `push`. It fires whenever you push commits:

```
on: push
```

![The image shows a GitHub documentation page about events that trigger workflows, specifically focusing on the "push" event. It includes notes and examples related to webhook payloads and workflow triggers.](https://kodekloud.com/kk-media/image/upload/v1752876647/notes-assets/images/GitHub-Actions-Triggering-a-workflow/github-workflows-push-event-documentation.jpg)

### 2\. Pull Request

Trigger workflows when pull requests change state—opened, edited, assigned, or closed:

```
on:
  pull_request:
    types: [opened, edited, closed, assigned]
```

![The image shows a GitHub Docs page about GitHub Actions, specifically detailing events that trigger workflows related to pull requests. It includes a list of activity types and webhook event payloads.](https://kodekloud.com/kk-media/image/upload/v1752876649/notes-assets/images/GitHub-Actions-Triggering-a-workflow/github-actions-pull-requests-workflows.jpg)

> [!important]
> **Note**
>
> You can filter by branches or tags under each event to narrow down when the workflow runs. See [GitHub Actions filters](https://docs.github.com/en/actions/learn-github-actions/workflow-syntax-for-github-actions#filter-pattern-cheat-sheet) for details.

## Scheduled Workflows

Use `schedule` with cron syntax to run jobs at regular intervals.

```
on:
  schedule:
    # Quote strings because '*' has special meaning in YAML
    - cron: '30 5 * * 1-5'
    - cron: '0 0 * * 0'
```

> [!important]
> **Warning**
>
> Running jobs too frequently can exhaust your GitHub Actions minutes. Always double-check your cron schedules.

If you need to test or build complex expressions, [Crontab Guru](https://crontab.guru/) is a fantastic visual tool:

![The image shows a webpage from "crontab guru," a tool for creating and understanding cron schedule expressions. It displays a cron expression set to run every minute.](https://kodekloud.com/kk-media/image/upload/v1752876650/notes-assets/images/GitHub-Actions-Triggering-a-workflow/crontab-guru-every-minute-schedule.jpg)

## Manual Triggers with workflow_dispatch

Add `workflow_dispatch` to let users kick off a workflow by pushing a button. You can even define input parameters:

![The image shows a GitHub documentation page about "workflow_dispatch" in GitHub Actions, detailing how to manually trigger workflows and configure inputs.](https://kodekloud.com/kk-media/image/upload/v1752876651/notes-assets/images/GitHub-Actions-Triggering-a-workflow/github-actions-workflow-dispatch-documentation.jpg)

```
on:
  workflow_dispatch:
    inputs:
      logLevel:
        description: 'Log level'
        required: true
        default: 'warning'
        type: choice
        options:
          - info
          - warning
          - debug
      tags:
        description: 'Include test scenario tags'
        required: false
        type: boolean
      environment:
        description: 'Target environment'
        required: true
```

Use these inputs in your job steps:

```
jobs:
  display-inputs:
    runs-on: ubuntu-latest
    steps:
      - name: Show inputs
        run: |
          echo "Log level: ${{ inputs.logLevel }}"
          echo "Tags: ${{ inputs.tags }}"
          echo "Environment: ${{ inputs.environment }}"
```

## Combining Schedule and Manual Dispatch

You can merge multiple triggers into one workflow. Here’s an example that builds, logs in, and pushes a Docker image on both a schedule and via manual dispatch.

```
name: CI/CD Docker Pipeline

on:
  schedule:
    - cron: '*/1 * * * *'
  workflow_dispatch:

env:
  CONTAINER_REGISTRY: docker.io
  IMAGE_NAME: github-actions-nginx

jobs:
  build-and-publish:
    runs-on: ubuntu-latest
    steps:
      - name: Build image
        run: |
          docker build -t ${{ env.CONTAINER_REGISTRY }}/${{ vars.DOCKER_USERNAME }}/${{ env.IMAGE_NAME }}:latest .
      - name: Authenticate
        run: |
          echo "${{ secrets.DOCKER_PASSWORD }}" | docker login \
            --username ${{ vars.DOCKER_USERNAME }} --password-stdin
      - name: Push image
        run: |
          docker push ${{ env.CONTAINER_REGISTRY }}/${{ vars.DOCKER_USERNAME }}/${{ env.IMAGE_NAME }}:latest
```

Once you push this file, the Actions tab will display scheduled runs alongside a **Run workflow** button for manual execution:

![The image shows a GitHub Actions interface with a list of workflow runs related to "Exploring Variables and Secrets." It displays the status, branch, and actor for each workflow run.](https://kodekloud.com/kk-media/image/upload/v1752876652/notes-assets/images/GitHub-Actions-Triggering-a-workflow/github-actions-workflow-runs-variables-secrets.jpg)

Each entry shows its trigger type—push, schedule, or manual—so you can tailor your CI/CD process to any scenario.

---

## Links and References

- [Events that trigger workflows](https://docs.github.com/en/actions/reference/events-that-trigger-workflows)
- [Workflow filtering](https://docs.github.com/en/actions/learn-github-actions/workflow-syntax-for-github-actions#filter-pattern-cheat-sheet)
- [Crontab Guru](https://crontab.guru/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions/module/0ac6c98f-7100-471e-b9aa-037f25cb58d7/lesson/45a1352b-6272-4969-bd76-7eda7103a80a)**
>
> Watch video content
