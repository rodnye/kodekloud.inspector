# Running Workflow on Self Hosted Runner - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/Self-Hosted-Runner/Running-Workflow-on-Self-Hosted-Runner)

---

## Table of Contents

- Running Workflow on Self Hosted Runner
  - Prerequisites
  - 1. Verify Your Self-Hosted Runner
  - 2. Start the Runner Service
  - 3. Update Your Workflow to Target the Self-Hosted Runner
  - 4. Commit and Push Your Changes
  - 5. Trigger the Workflow
  - 6. Monitor Jobs and Inspect Logs
  - Best Practices for Self-Hosted Runners
  - References
  - Watch Video
    - Original Workflow (GitHub-hosted runner)
    - Updated Workflow (Self-Hosted Runner)

---

## Content

GitHub Actions Certification

Self Hosted Runner

# Running Workflow on Self Hosted Runner

Leverage your own infrastructure for faster, customizable CI/CD by configuring GitHub Actions to run on a self-hosted runner. In this guide, we’ll:

1.  Verify your runner registration
2.  Start the runner service
3.  Update a workflow to target your self-hosted runner
4.  Commit and push changes
5.  Trigger and monitor the job
6.  Inspect logs both in GitHub and on the runner VM

## Prerequisites

- A GitHub repository with Actions enabled
- A VM (or physical server) where the self-hosted runner is installed
- Network access between GitHub and your runner

## 1\. Verify Your Self-Hosted Runner

Navigate to **Settings > Actions > Runners** in your repository to ensure your runner is registered and idle:

![The image shows a GitHub settings page for a repository, specifically the "Runners" section under "Actions," displaying a self-hosted runner named "prod-ubuntu-runner" with an idle status.](https://kodekloud.com/kk-media/image/upload/v1752876428/notes-assets/images/GitHub-Actions-Certification-Running-Workflow-on-Self-Hosted-Runner/github-repo-settings-runners-prod-ubuntu.jpg)

## 2\. Start the Runner Service

On your runner VM, start the runner process:

```
cd ~/actions-runner
./run.sh
```

You should see:

```
Current runner version: '2.310.2'
2023-10-24 14:51:44Z: Listening for Jobs
```

## 3\. Update Your Workflow to Target the Self-Hosted Runner

Open the `.github/workflows` directory and locate your workflow YAML:

![The image shows a GitHub repository interface with a list of YAML workflow files under the ".github/workflows" directory. The files include "context-testing.yml," "first-example.yml," and others, with their last commit messages and times displayed.](https://kodekloud.com/kk-media/image/upload/v1752876429/notes-assets/images/GitHub-Actions-Certification-Running-Workflow-on-Self-Hosted-Runner/github-repo-yaml-workflows-list.jpg)

### Original Workflow (GitHub-hosted runner)

```
name: Testing Self-Hosted Runner
on:
  workflow_dispatch:
jobs:
  testing:
    runs-on: ubuntu-latest
    steps:
      - name: Echo Content
        run: |
          echo "Ok"
          sleep 15s
```

### Updated Workflow (Self-Hosted Runner)

Replace `runs-on: ubuntu-latest` with the labels assigned to your runner (e.g., `self-hosted`, `linux`, `prod`):

```
name: Testing Self-Hosted Runner
on:
  workflow_dispatch:
jobs:
  testing:
    runs-on: [self-hosted, linux, prod]
    steps:
      - name: Echo Content
        run: |
          echo "Ok"
          sleep 15s
```

> [!important]
> **Note**
>
> All labels under `runs-on` must exactly match those on your self-hosted runner. A mismatch (for instance, using `production` instead of `prod`) will leave the job pending until a matching runner is available or times out.

## 4\. Commit and Push Your Changes

Commit the updated workflow file directly to your main branch (or a feature branch):

![The image shows a GitHub interface with a "Commit changes" dialog box open, where a user is entering a commit message and choosing to commit directly to the main branch.](https://kodekloud.com/kk-media/image/upload/v1752876430/notes-assets/images/GitHub-Actions-Certification-Running-Workflow-on-Self-Hosted-Runner/github-commit-changes-dialog-box.jpg)

## 5\. Trigger the Workflow

1.  Open the **Actions** tab in your repository.
2.  Select **Testing Self-Hosted Runner**.
3.  Click **Run workflow** to invoke `workflow_dispatch`.

![The image shows a GitHub Actions interface with a list of workflow runs, including details like event type, status, branch, and timestamps. The sidebar displays various workflow options and management tools.](https://kodekloud.com/kk-media/image/upload/v1752876432/notes-assets/images/GitHub-Actions-Certification-Running-Workflow-on-Self-Hosted-Runner/github-actions-workflow-runs-interface.jpg)

The job status will change to **in progress** as soon as a matching self-hosted runner picks it up.

## 6\. Monitor Jobs and Inspect Logs

For live details on the runner and active jobs, visit the self-hosted runner’s configuration page:

![The image shows a GitHub Actions settings page for a self-hosted runner named "prod-ubuntu-runner" with configuration details and an active job in progress.](https://kodekloud.com/kk-media/image/upload/v1752876433/notes-assets/images/GitHub-Actions-Certification-Running-Workflow-on-Self-Hosted-Runner/github-actions-self-hosted-runner-config.jpg)

On your VM, the runner’s logs will reflect job execution:

```
root@ubuntu-host ~/actions-runner ➜ ./run.sh
Current runner version: '2.310.2'
2023-10-24 14:51:44Z: Listening for Jobs
2023-10-24 15:23:57Z: Running job: testing
2023-10-24 15:24:16Z: Job testing completed with result: Succeeded
```

> [!important]
> **Warning**
>
> Ensure your self-hosted runner has proper security controls. Exposing it directly to the internet or granting it excessive permissions can pose risks.

## Best Practices for Self-Hosted Runners

| Label             | Description                                |
| ----------------- | ------------------------------------------ |
| self-hosted       | Required for all self-hosted runner jobs   |
| linux/mac/windows | OS-specific label matching your runner     |
| prod/staging      | Environment-specific label for segregation |

## References

- [GitHub Actions: Self-Hosted Runners](https://docs.github.com/actions/hosting-your-own-runners)
- [workflow_dispatch Event](https://docs.github.com/actions/using-workflows/events-that-trigger-workflows#workflow_dispatch)
- [GitHub Actions Concepts](https://docs.github.com/actions/learn-github-actions/introduction-to-github-actions)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/7cc7bcee-0af6-41af-9653-dfd6e0403fe9/lesson/e41154ff-d0b3-41db-8018-e3221dc70c3c)**
>
> Watch video content
