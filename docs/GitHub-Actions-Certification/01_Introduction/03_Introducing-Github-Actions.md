# Introducing Github Actions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/Introduction/Introducing-Github-Actions)

---

## Table of Contents

- Introducing Github Actions
  - What Is GitHub Actions? A Complete Guide
  - Key Advantages of GitHub Actions
  - Event-Driven Automation
  - Workflows, Jobs, and Steps
  - Runner Types: GitHub-Hosted vs. Self-Hosted
  - Next Steps
  - Links and References
  - Watch Video
    - Example: Automate Pull-Request Management

---

## Content

GitHub Actions Certification

Introduction

# Introducing Github Actions

If your organization relies on GitHub for code hosting and seeks a streamlined automation solution, GitHub Actions delivers built-in CI/CD and event-driven workflows directly alongside your repository. In this guide, you’ll learn how to configure automated processes, manage runners, and leverage triggers to accelerate your development lifecycle.

## What Is GitHub Actions? A Complete Guide

GitHub Actions is a flexible automation platform that lets you define and run workflows in response to repository events—such as pushes, pull requests, issues, and package publications. You describe each workflow in a YAML file under `.github/workflows`. GitHub then provisions virtual machines, scales resources, sets up environments, and handles dependency caching for you.

![The image shows three operating system icons labeled as Ubuntu, Windows, and MacOS, with numbers 1, 2, and 3 respectively, under the title "GitHub Actions."](https://kodekloud.com/kk-media/image/upload/v1752876294/notes-assets/images/GitHub-Actions-Certification-Introducing-Github-Actions/github-actions-os-icons-ubuntu-windows-macos.jpg)

## Key Advantages of GitHub Actions

By integrating CI/CD and automation into your GitHub repository, you benefit from:

| Feature                | Benefit                                                        |
| ---------------------- | -------------------------------------------------------------- |
| Managed Infrastructure | Automatic server provisioning, scaling, and maintenance        |
| Dependency Caching     | Faster build times and reduced network overhead                |
| Event-Driven Workflows | Trigger builds, tests, and deployments on push, PR, or release |
| Unified Experience     | View logs, artifacts, and status badges directly in your repo  |

![The image is an infographic titled "GitHub Manages Infrastructure," showing three steps: setting up servers, scaling resources, and managing the execution environment.](https://kodekloud.com/kk-media/image/upload/v1752876296/notes-assets/images/GitHub-Actions-Certification-Introducing-Github-Actions/github-manages-infrastructure-infographic.jpg)

## Event-Driven Automation

GitHub Actions supports hundreds of [trigger events](https://docs.github.com/actions/using-workflows/events-that-trigger-workflows) so you can automate tasks beyond CI/CD—labeling issues, sending notifications, or publishing packages. Popular event categories include:

- **Push & Pull Requests**: Build and test on every code change
- **Issues & Comments**: Auto-label or respond to new issues/comments
- **Release & Package**: Publish artifacts when a release is created

![The image is a flowchart illustrating GitHub Actions for automating repository actions, including pull requests, issues, releases, and registry packages. Each category has specific actions like open, closed, merged, labeled, locked, published, created, and updated.](https://kodekloud.com/kk-media/image/upload/v1752876297/notes-assets/images/GitHub-Actions-Certification-Introducing-Github-Actions/github-actions-flowchart-automation.jpg)

> [!important]
> **Note**
>
> You can combine multiple events in `on:` to run workflows on several triggers simultaneously.

### Example: Automate Pull-Request Management

When a contributor opens a pull request, you might want to post a welcome comment, assign reviewers, or enforce labels automatically:

![The image shows a GitHub pull request interface for updating a README.md file, with comments, reviewers, and assignees highlighted. It includes a notification from GitHub Actions indicating that PR-6 has been assigned.](https://kodekloud.com/kk-media/image/upload/v1752876300/notes-assets/images/GitHub-Actions-Certification-Introducing-Github-Actions/github-pull-request-readme-update.jpg)

## Workflows, Jobs, and Steps

A **workflow** is defined by a YAML file in `.github/workflows`. Each workflow consists of one or more **jobs**, which run in parallel or sequentially, and each job contains ordered **steps**.

Here’s an example workflow that runs unit tests on Ubuntu, macOS, and Windows:

```
name: My Awesome App
on: push


jobs:
  unit-testing:
    name: Unit Testing
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, macos-latest, windows-latest]
        cmd: [test]


    steps:
      - name: Checkout code
        uses: actions/checkout@v2


      - name: Install Node.js on ${{ matrix.os }}
        run: echo "Installing Node.js on ${{ matrix.os }}"


      - name: Run tests
        run: echo "npm ${{ matrix.cmd }}"
```

1.  **Trigger**: Runs on every `push`
2.  **Matrix Strategy**: Executes the job on multiple OS environments in parallel
3.  **Runs-on**: Specifies each virtual environment
4.  **Steps**: Sequential tasks within each job

**Runners** are the virtual machines (GitHub-hosted or self-hosted) that execute your jobs. With GitHub-hosted runners, each job gets a fresh VM—Linux and Windows run on Azure; macOS uses GitHub’s cloud. Parallel jobs get dedicated runners, ensuring isolation and concurrency.

![The image illustrates a GitHub Actions workflow for unit testing across different operating systems (Ubuntu, macOS, Windows) using GitHub-hosted runners. It shows the steps of cloning the repository, installing NodeJS, and running tests.](https://kodekloud.com/kk-media/image/upload/v1752876301/notes-assets/images/GitHub-Actions-Certification-Introducing-Github-Actions/github-actions-unit-testing-workflow.jpg)

## Runner Types: GitHub-Hosted vs. Self-Hosted

Choose between GitHub-hosted and self-hosted runners based on your performance, security, and customization needs:

| Runner Type   | Hosting & Maintenance                     | Customization & Control                 | Cost Model                |
| ------------- | ----------------------------------------- | --------------------------------------- | ------------------------- |
| GitHub-Hosted | Managed by GitHub with prebuilt images    | Limited OS configuration                | Included in plan (limits) |
| Self-Hosted   | You provision and maintain infrastructure | Full control over software and hardware | Your infrastructure costs |

![The image compares GitHub-hosted and self-hosted runners, highlighting their features and differences in terms of hosting, customization, and control.](https://kodekloud.com/kk-media/image/upload/v1752876303/notes-assets/images/GitHub-Actions-Certification-Introducing-Github-Actions/github-self-hosted-runners-comparison.jpg)

> [!important]
> **Warning**
>
> Self-hosted runners must be secured and updated regularly. You are responsible for OS patches, network access, and resource isolation.

## Next Steps

In upcoming articles, we’ll cover advanced topics like:

- Using **secrets** and **encrypted variables**
- Implementing **artifact caching** for faster builds
- Writing **reusable custom actions**

## Links and References

- [GitHub Actions Documentation](https://docs.github.com/actions)
- [GitHub Actions: Events that Trigger Workflows](https://docs.github.com/actions/using-workflows/events-that-trigger-workflows)
- [Learn GitHub Actions by Example](https://docs.github.com/actions/learn-github-actions)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/f7702c28-34a1-40fc-9511-9bbc4940a4af/lesson/b51e8f4a-ccbb-4302-8a73-90ac7bfa1eb2)**
>
> Watch video content
