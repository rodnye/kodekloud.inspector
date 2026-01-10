# Introducing Github Actions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions/Introduction/Introducing-Github-Actions)

---

## Table of Contents

- Introducing Github Actions
  - Built-In Runners: Ubuntu, Windows, and macOS
  - Defining Workflows with YAML
  - Workflows, Jobs, and Steps
  - Comparing Runner Types
  - Next Steps
  - Links and References
  - Watch Video
    - Common Trigger Events
    - Automate Pull Request Workflows
    - Inspecting Logs and Artifacts

---

## Content

GitHub Actions

Introduction

# Introducing Github Actions

In this lesson, discover how GitHub Actions automates your development workflows—CI/CD, DevOps pipelines, and more—directly in your repository. If your team already relies on GitHub for version control, you can seamlessly integrate build, test, and deployment steps without external CI servers.

![The image shows a GitHub Actions interface with a workflow in progress for a project, displaying steps like building an application and unit testing.](https://kodekloud.com/kk-media/image/upload/v1752876706/notes-assets/images/GitHub-Actions-Introducing-Github-Actions/github-actions-workflow-build-test.jpg)

## Built-In Runners: Ubuntu, Windows, and macOS

GitHub Actions provides hosted runners for all major platforms:

![The image shows icons for Ubuntu, Windows, and MacOS, labeled as 1, 2, and 3 respectively, under the title "GitHub Actions."](https://kodekloud.com/kk-media/image/upload/v1752876707/notes-assets/images/GitHub-Actions-Introducing-Github-Actions/github-actions-ubuntu-windows-macos-icons.jpg)

> [!important]
> **Note**
>
> GitHub-hosted runners are preconfigured VMs managed by GitHub. You don’t need to worry about provisioning hardware, installing dependencies, or scaling resources.

![The image is an infographic titled "GitHub Manages Infrastructure," showing three steps: setting up servers, scaling resources, and managing the execution environment.](https://kodekloud.com/kk-media/image/upload/v1752876708/notes-assets/images/GitHub-Actions-Introducing-Github-Actions/github-manages-infrastructure-infographic.jpg)

## Defining Workflows with YAML

Workflows are defined in `.github/workflows/*.yml` files using simple YAML syntax. They run automatically on events like `push`, `pull_request`, or package publishing.

### Common Trigger Events

- `push`
- `pull_request`
- `issues`
- `release`
- `registry_package`

![The image is a flowchart illustrating GitHub Actions for automating repository actions, including pull requests, issues, releases, and registry packages. Each category has specific actions like open, closed, merged, labeled, locked, published, created, released, and updated.](https://kodekloud.com/kk-media/image/upload/v1752876709/notes-assets/images/GitHub-Actions-Introducing-Github-Actions/github-actions-flowchart-automation.jpg)

### Automate Pull Request Workflows

Use Actions to comment on PRs, assign reviewers, enforce labels, and ensure policy compliance:

![The image shows a GitHub pull request interface for updating a README.md file, with comments, reviewers, and assignees highlighted.](https://kodekloud.com/kk-media/image/upload/v1752876710/notes-assets/images/GitHub-Actions-Introducing-Github-Actions/github-pull-request-readme-update.jpg)

## Workflows, Jobs, and Steps

A **workflow** runs in response to specified events. It consists of one or more **jobs**, each containing ordered **steps** that execute on a **runner**.

```
name: CI Pipeline
on:
  push:
    branches: [ main ]


jobs:
  test:
    name: Run Tests on ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, macos-latest, windows-latest]
    runs-on: ${{ matrix.os }}


    steps:
      - name: Checkout code
        uses: actions/checkout@v3


      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16'


      - name: Install dependencies
        run: npm ci


      - name: Run unit tests
        run: npm test
```

- `runs-on`: Specifies the runner OS.
- `strategy.matrix`: Launches multiple jobs in parallel.
- Steps execute sequentially: checkout → setup → install → test.

### Inspecting Logs and Artifacts

View real-time logs, download test reports, or debug failures in the **Actions** tab:

![The image illustrates a GitHub Actions workflow, showing unit testing jobs for Ubuntu, macOS, and Windows using GitHub-hosted runners. Each runner involves steps like cloning the repository, installing NodeJS, and running tests.](https://kodekloud.com/kk-media/image/upload/v1752876711/notes-assets/images/GitHub-Actions-Introducing-Github-Actions/github-actions-workflow-unit-testing.jpg)

Click any job to expand step-by-step logs and access artifacts.

## Comparing Runner Types

Choose between GitHub-hosted and self-hosted runners based on your requirements:

| Feature       | GitHub-Hosted                          | Self-Hosted                               |
| ------------- | -------------------------------------- | ----------------------------------------- |
| Management    | Provisioned & maintained by GitHub     | Managed by you (VMs, servers, containers) |
| Customization | Limited (preinstalled tools only)      | Full control over software & hardware     |
| Isolation     | Fresh environment per job              | Persistent & stateful environments        |
| Billing       | Included in GitHub plan (usage limits) | You cover compute & maintenance costs     |
| Use Cases     | Standard CI/CD pipelines               | GPU workloads, custom dependencies        |

![The image compares GitHub-hosted and self-hosted runners, highlighting their features and differences in terms of hosting, customization, and control.](https://kodekloud.com/kk-media/image/upload/v1752876712/notes-assets/images/GitHub-Actions-Introducing-Github-Actions/github-self-hosted-runners-comparison.jpg)

> [!important]
> **Note**
>
> Self-hosted runners require you to handle updates, scaling, and security.

## Next Steps

You now understand the core concepts: workflows, jobs, steps, triggers, and runner options. Stay tuned for deep dives into:

- Secrets management & environment variables
- Reusable workflows & composite actions
- Custom actions with Docker and JavaScript

Happy automating!

## Links and References

- [GitHub Actions Documentation](https://docs.github.com/actions)
- [GitHub Workflow Syntax](https://docs.github.com/actions/using-workflows/workflow-syntax-for-github-actions)
- [Official GitHub Actions Toolkit](https://github.com/actions/toolkit)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions/module/a038043a-b553-43c2-9748-2c91fa232a9b/lesson/9e549291-dcfb-451e-92ca-a3a61a596e0d)**
>
> Watch video content
