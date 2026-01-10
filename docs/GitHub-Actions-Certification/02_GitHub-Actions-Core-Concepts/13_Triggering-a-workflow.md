# Triggering a workflow - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/GitHub-Actions-Core-Concepts/Triggering-a-workflow)

---

## Table of Contents

- Triggering a workflow
  - Supported Events
  - 1. Push Event
  - 2. Pull Request Event
  - 3. Registry Package Event
  - 4. Scheduled Workflows with Cron
  - 5. Manual Trigger with workflow_dispatch
  - Summary
  - Links and References
  - Watch Video
    - Example: Twice Daily at 05:30 & 17:30 UTC
    - Example: Specific Weekdays
    - Example: Every Minute Build & Publish
    - Minimal workflow_dispatch
    - Advanced Inputs Example

---

## Content

GitHub Actions Certification

GitHub Actions Core Concepts

# Triggering a workflow

In this guide, we’ll explore how to invoke GitHub Actions workflows using various events, scheduled cron jobs, and manual dispatch. Understanding these triggers helps automate builds, tests, deployments, and more whenever specific activities occur in your repository.

## Supported Events

GitHub Actions supports dozens of repository and organization events. For a full list, see the [official GitHub Actions documentation](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows).

> [!important]
> **Quick Reference**
>
> Common trigger events include `push`, `pull_request`, `schedule`, `registry_package`, and `workflow_dispatch`. You can mix multiple events in a single workflow.

![The image shows a GitHub documentation page about "Events that trigger workflows," detailing how to configure workflows based on specific activities or events. The page includes a sidebar with navigation links and a list of event types on the right.](https://kodekloud.com/kk-media/image/upload/v1752876153/notes-assets/images/GitHub-Actions-Certification-Triggering-a-workflow/github-events-trigger-workflows-documentation.jpg)

| Event Type           | Description                                      | Example Usage                             |
| -------------------- | ------------------------------------------------ | ----------------------------------------- |
| push                 | Fires on `git push` to branches or tags          | Trigger tests on new commits              |
| pull\\\_request      | Runs when a PR is opened, edited, or merged      | Validate code before merging              |
| schedule             | Cron-based schedules                             | Nightly builds or cleanup tasks           |
| registry\\\_package  | Occurs on package publication in GitHub Registry | Post-publish validations or notifications |
| workflow\\\_dispatch | Manual trigger via UI or API                     | Run ad-hoc jobs with custom inputs        |

---

## 1\. Push Event

The `push` event is the most common trigger. Whenever you push commits to a branch or tag, the workflow kicks off.

```
on:
  push:
    branches:
      - main
      - release/*
```

![The image shows a GitHub documentation page about GitHub Actions, specifically focusing on events that trigger workflows, with details about the "push" event.](https://kodekloud.com/kk-media/image/upload/v1752876155/notes-assets/images/GitHub-Actions-Certification-Triggering-a-workflow/github-actions-workflow-trigger-push.jpg)

---

## 2\. Pull Request Event

Use `pull_request` to run checks on PR activity. You can filter by action types like `opened`, `edited`, `synchronize`, and `closed`.

```
on:
  pull_request:
    types: [opened, edited, synchronize, closed]
    branches:
      - main
```

![The image shows a GitHub Docs page detailing events that trigger workflows, specifically focusing on the "pull_request" event and its activity types. The sidebar lists various GitHub Actions topics, and the main content explains the webhook event payload and related activity types.](https://kodekloud.com/kk-media/image/upload/v1752876156/notes-assets/images/GitHub-Actions-Certification-Triggering-a-workflow/github-docs-pull-request-workflows.jpg)

---

## 3\. Registry Package Event

Trigger workflows when packages are published to GitHub’s package registry. This is ideal for post-publish tests or notifications.

```
on:
  registry_package:
    types: [published]
```

![The image shows a GitHub Docs page about GitHub Actions, specifically detailing events that trigger workflows, with a focus on the "registry_package" event.](https://kodekloud.com/kk-media/image/upload/v1752876157/notes-assets/images/GitHub-Actions-Certification-Triggering-a-workflow/github-actions-workflows-registry-package.jpg)

---

## 4\. Scheduled Workflows with Cron

Define scheduled workflows using cron syntax under the `schedule` event. Cron schedules run independent of code changes.

> [!important]
> **Cron Syntax Help**
>
> Use [Crontab Guru](https://crontab.guru) to build and validate cron expressions.

![The image shows a webpage from "crontab guru," a tool for creating and understanding cron schedule expressions. It displays a cron expression set to run every minute, with a description and a table explaining cron syntax.](https://kodekloud.com/kk-media/image/upload/v1752876160/notes-assets/images/GitHub-Actions-Certification-Triggering-a-workflow/crontab-guru-cron-schedule-expression.jpg)

### Example: Twice Daily at 05:30 & 17:30 UTC

```
on:
  schedule:
    - cron: '30 5,17 * * *'
```

### Example: Specific Weekdays

```
on:
  schedule:
    - cron: '30 5 * * 1,3'   # Monday & Wednesday
    - cron: '30 5 * * 2,4'   # Tuesday & Thursday

jobs:
  test_schedule:
    runs-on: ubuntu-latest
    steps:
      - name: Skip on specific days
        if: github.event.schedule == '30 5 * * 1,3'
        run: echo "Skipped on Mon & Wed"
      - name: Always run
        run: echo "This step always executes"
```

### Example: Every Minute Build & Publish

```
name: Exploring Variables and Secrets

on:
  schedule:
    - cron: "*/1 * * * *"

env:
  CONTAINER_REGISTRY: docker.io
  IMAGE_NAME: github-actions-nginx

jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      - name: Docker Build
        run: |
          docker build -t ${{ env.CONTAINER_REGISTRY }}/${{ vars.DOCKER_USERNAME }}/${{ env.IMAGE_NAME }}:latest

      - name: Docker Login
        run: |
          docker login \
            --username=${{ vars.DOCKER_USERNAME }} \
            --password=${{ secrets.DOCKER_PASSWORD }}

      - name: Docker Publish
        run: |
          docker push \
            ${{ env.CONTAINER_REGISTRY }}/${{ vars.DOCKER_USERNAME }}/${{ env.IMAGE_NAME }}:latest
```

---

## 5\. Manual Trigger with workflow_dispatch

Enable manual runs through the GitHub UI or API using `workflow_dispatch`. You can define inputs for custom parameters.

![The image shows a GitHub documentation page about "workflow_dispatch" in GitHub Actions, detailing how to manually trigger workflows and configure inputs.](https://kodekloud.com/kk-media/image/upload/v1752876161/notes-assets/images/GitHub-Actions-Certification-Triggering-a-workflow/github-actions-workflow-dispatch-docs.jpg)

### Minimal workflow_dispatch

```
on:
  workflow_dispatch:
    inputs:
      loglevel:
        description: 'Log level'
        required: true
        default: 'warning'
```

### Advanced Inputs Example

```
name: Exploring Variables and Secrets

on:
  workflow_dispatch:
    inputs:
      logLevel:
        description: 'Log level'
        required: true
        default: 'warning'
        type: choice
        options: [info, warning, debug]
      tags:
        description: 'Test scenario tags'
        required: false
        type: boolean
      environment:
        description: 'Environment to run tests against'
        required: true

jobs:
  log-the-inputs:
    runs-on: ubuntu-latest
    steps:
      - name: Display inputs
        run: |
          echo "Log level: $LEVEL"
          echo "Tags: $TAGS"
          echo "Environment: $ENVIRONMENT"
        env:
          LEVEL: ${{ inputs.logLevel }}
          TAGS: ${{ inputs.tags }}
          ENVIRONMENT: ${{ inputs.environment }}
```

When configured, the Actions tab displays a **Run workflow** button. This screenshot shows the **Exploring Variables and Secrets** workflow with runs triggered by push, schedule, and manual dispatch:

![The image shows a GitHub Actions interface displaying a workflow titled "Exploring Variables and Secrets" with three workflow runs, each indicating modifications or additions to variables and secrets.](https://kodekloud.com/kk-media/image/upload/v1752876162/notes-assets/images/GitHub-Actions-Certification-Triggering-a-workflow/github-actions-exploring-variables-secrets.jpg)

---

## Summary

You now know how to:

- Trigger workflows on repository events (`push`, `pull_request`, `registry_package`, etc.).
- Schedule cron jobs for periodic tasks.
- Manually dispatch workflows with custom inputs.

Explore more in the [GitHub Actions Documentation](https://docs.github.com/en/actions).

## Links and References

- [GitHub Actions Events](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows)
- [Crontab Guru](https://crontab.guru)
- [GitHub Actions: workflow_dispatch](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#workflow_dispatch)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/54711be0-66e6-461b-b935-f77d78a5e000/lesson/d0e62c20-61bb-46ec-a595-0e414f9a9d76)**
>
> Watch video content
