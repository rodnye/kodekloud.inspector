# Github Actions Basics - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Jenkins/Backup-and-Configuration-Management/Github-Actions-Basics)

---

## Table of Contents

- Github Actions Basics
  - What Is GitHub Actions?
  - How GitHub Manages Infrastructure
  - Triggers and Automation Use Cases
  - Creating Your First Workflow
  - Runner Types Comparison
  - Next Steps & References
  - Watch Video

---

## Content

Advanced Jenkins

Backup and Configuration Management

# Github Actions Basics

GitHub Actions is GitHub’s native automation platform that streamlines your CI/CD pipelines and repository workflows. Integrated directly into your GitHub repositories, it allows teams to build, test, and deploy code without leaving the GitHub environment.

## What Is GitHub Actions?

GitHub Actions lets you define custom workflows in YAML files, which execute on specified events—such as pushes, pull requests, and releases—to automate tasks like building, testing, and deployment.

![The image shows a GitHub Actions interface displaying a list of workflow runs for a project, with details such as commit messages, status, and branch information.](https://kodekloud.com/kk-media/image/upload/v1752868803/notes-assets/images/Advanced-Jenkins-Github-Actions-Basics/github-actions-workflow-runs.jpg)

With GitHub Actions, you can:

- Automate CI/CD pipelines for every pull request.
- Deploy merged changes to staging or production.
- Integrate with hundreds of third-party services via community actions.

![The image shows a GitHub Actions interface with a workflow in progress for a project. It includes details about a recent push, the status of the workflow, and a visual representation of the job steps.](https://kodekloud.com/kk-media/image/upload/v1752868804/notes-assets/images/Advanced-Jenkins-Github-Actions-Basics/github-actions-workflow-progress.jpg)

## How GitHub Manages Infrastructure

GitHub Actions abstracts away the underlying servers and environments, so you don’t have to:

1.  Provision virtual machines
2.  Scale resources automatically
3.  Configure execution environments

![The image is an infographic titled "GitHub Manages Infrastructure," showing three steps: setting up servers, scaling resources, and managing the execution environment.](https://kodekloud.com/kk-media/image/upload/v1752868805/notes-assets/images/Advanced-Jenkins-Github-Actions-Basics/github-manages-infrastructure-infographic.jpg)

When a workflow runs, GitHub:

- Spins up a fresh VM or container.
- Caches dependencies for faster builds.
- Executes your steps in sequence.
- Provides detailed logs and artifacts.

## Triggers and Automation Use Cases

GitHub Actions supports a wide range of events beyond CI/CD. You can automate:

| Trigger Type       | Use Case                           | Example                                           |
| ------------------ | ---------------------------------- | ------------------------------------------------- |
| `push`             | Run tests on every commit          | Build and test a library                          |
| `pull_request`     | Validate contributions             | Lint code, run unit tests, and post status checks |
| `issues`           | Manage issue workflows             | Automatically label or assign new issues          |
| `release`          | Publish packages                   | Build Docker image and push to Docker Hub         |
| `registry_package` | Respond to package registry events | Notify team of new package version                |

![The image illustrates GitHub Actions for automating CI/CD processes, including building, unit testing, linting, dockerizing, security, deployment, and tests.](https://kodekloud.com/kk-media/image/upload/v1752868807/notes-assets/images/Advanced-Jenkins-Github-Actions-Basics/github-actions-cicd-automation.jpg)

![The image is a flowchart illustrating GitHub Actions for automating repository actions, including pull requests, issues, releases, and registry packages, with various states like open, closed, and published.](https://kodekloud.com/kk-media/image/upload/v1752868808/notes-assets/images/Advanced-Jenkins-Github-Actions-Basics/github-actions-automation-flowchart.jpg)

## Creating Your First Workflow

Workflows are defined in YAML files inside the `.github/workflows` directory of your repository.

> [!important]
> **Note**
>
> Each workflow file must be valid YAML and include at least one trigger (`on`), one job, and one step.

Below is a sample workflow that runs unit tests on Ubuntu, macOS, and Windows runners:

```
name: CI Test Pipeline
on: [push, pull_request]

jobs:
  unit-test:
    name: Run Unit Tests
    strategy:
      matrix:
        os: [ubuntu-latest, macos-latest, windows-latest]
    runs-on: ${{ matrix.os }}

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install Dependencies
        run: npm ci

      - name: Execute Tests
        run: npm test
```

Key points:

- `on`: Defines events that trigger the workflow.
- `strategy.matrix`: Runs jobs in parallel across multiple operating systems.
- `runs-on`: Specifies the runner environment.
- `steps`: Each step is a shell command or an action.

During execution, view real-time logs and download artifacts from the **Actions** tab of your repository.

![The image illustrates a GitHub Actions workflow, showing a project with unit testing jobs for different operating systems (Ubuntu, macOS, Windows) and the steps involved in each job using GitHub hosted runners.](https://kodekloud.com/kk-media/image/upload/v1752868809/notes-assets/images/Advanced-Jenkins-Github-Actions-Basics/github-actions-workflow-unit-testing.jpg)

## Runner Types Comparison

Choose between GitHub-hosted and self-hosted runners based on your requirements:

| Feature            | GitHub-Hosted Runners                          | Self-Hosted Runners                     |
| ------------------ | ---------------------------------------------- | --------------------------------------- |
| Provisioning       | Automatic                                      | Manual                                  |
| Customization      | Limited to OS selection                        | Full control over software and hardware |
| Scaling            | Handled by GitHub                              | Managed by your team                    |
| Cost               | Included with GitHub plan (usage limits apply) | Infrastructure maintenance              |
| Preinstalled Tools | Common languages and tools                     | User-defined                            |

![The image compares GitHub-hosted and self-hosted runners, highlighting their features and differences in terms of hosting, customization, control, and costs.](https://kodekloud.com/kk-media/image/upload/v1752868810/notes-assets/images/Advanced-Jenkins-Github-Actions-Basics/github-self-hosted-runners-comparison.jpg)

> [!important]
> **Warning**
>
> Self-hosted runners can pose security risks if not properly isolated. Ensure that you follow your organization’s security policies.

## Next Steps & References

In this guide, we covered:

- Core concepts: workflows, jobs, steps, and runners
- Workflow file structure and sample CI pipeline
- Event triggers and practical use cases

For deeper dives:

- [GitHub Actions Documentation](https://docs.github.com/actions)
- [Workflow Syntax for GitHub Actions](https://docs.github.com/actions/using-workflows/workflow-syntax-for-github-actions)
- [Actions Marketplace](https://github.com/marketplace?type=actions)

Stay tuned for advanced patterns, custom action development, and workflow optimization in upcoming lessons!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-jenkins/module/6f55f1ac-064a-4aec-a91a-450caaf82d63/lesson/9ec91e18-757e-464f-88b6-91c52c580116)**
>
> Watch video content
