# Uninstalling Self Hosted Runner - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/Self-Hosted-Runner/Uninstalling-Self-Hosted-Runner)

---

## Table of Contents

- Uninstalling Self Hosted Runner
  - Overview
  - Removal Methods at a Glance
  - 1. Removing a Runner via GitHub UI
  - 2. Cleaning Up the Runner Machine
  - 3. Temporarily Disabling a Runner
  - References
  - Watch Video
  - Practice Lab

---

## Content

GitHub Actions Certification

Self Hosted Runner

# Uninstalling Self Hosted Runner

## Overview

GitHub Actions lets you host your own runners for custom build environments. Whether you’re removing a runner at the repository, organization, or enterprise level, this guide walks you through:

- Removing a runner via the GitHub UI
- Cleaning up the runner machine
- Temporarily disabling a runner

## Removal Methods at a Glance

| Method            | Scope                                | Description                                             |
| ----------------- | ------------------------------------ | ------------------------------------------------------- |
| UI Removal        | Repository, Organization, Enterprise | Permanently deletes the runner from GitHub.             |
| CLI Cleanup       | Runner VM                            | Unregisters the runner and removes local configuration. |
| Temporary Disable | Runner VM                            | Marks the runner offline without full uninstall.        |

## 1\. Removing a Runner via GitHub UI

1.  In your repository, go to **Settings** > **Actions** > **Runners**.
2.  Locate the runner and click **Remove**.

![The image shows a GitHub repository settings page, specifically the "Runners" section, displaying a self-hosted runner named "prod-ubuntu-runner" with an idle status.](https://kodekloud.com/kk-media/image/upload/v1752876439/notes-assets/images/GitHub-Actions-Certification-Uninstalling-Self-Hosted-Runner/github-repo-settings-runners-prod-ubuntu.jpg)

> [!important]
> **Warning**
>
> Removing a runner is permanent. If MFA is enabled, you’ll be prompted for a code to confirm deletion.

For organization or enterprise-level runners:

1.  Navigate to **Settings** > **Actions** > **Runners** in your org/enterprise dashboard.
2.  Select the runner you wish to uninstall and click **Remove**.

![The image shows a GitHub Actions settings page for a self-hosted runner named "prod-ubuntu-runner" with no active jobs running. There is a "Remove" button highlighted in red.](https://kodekloud.com/kk-media/image/upload/v1752876441/notes-assets/images/GitHub-Actions-Certification-Uninstalling-Self-Hosted-Runner/github-actions-self-hosted-runner-settings.jpg)

After confirmation, GitHub permanently deletes the runner entry.

## 2\. Cleaning Up the Runner Machine

Once removed from GitHub, unregister the runner on the VM:

```
./config.sh remove --token YOUR_RUNNER_TOKEN
```

Replace `YOUR_RUNNER_TOKEN` with the token from your initial configuration. This command:

- Unregisters the runner from GitHub
- Deletes local configuration files

> [!important]
> **Note**
>
> If you see permission errors, retry with elevated privileges (e.g., `sudo` on Linux).

Alternatively, use **Force remove** in the GitHub UI to uninstall the runner application completely.

## 3\. Temporarily Disabling a Runner

To pause job execution without full removal:

1.  Shut down the VM or stop the runner service/script.
2.  The runner will show as **offline** and won’t accept new jobs.

![The image shows a GitHub documentation page about removing self-hosted runners, detailing how to permanently remove a runner from a repository or organization.](https://kodekloud.com/kk-media/image/upload/v1752876442/notes-assets/images/GitHub-Actions-Certification-Uninstalling-Self-Hosted-Runner/github-remove-self-hosted-runners-docs.jpg)

GitHub automatically deletes any self-hosted runner that remains offline for more than 30 days, preventing stale entries.

## References

- [Removing self-hosted runners (GitHub Docs)](https://docs.github.com/actions/hosting-your-own-runners/removing-self-hosted-runners)
- [Introduction to GitHub Actions](https://docs.github.com/actions/learn-github-actions/introduction-to-github-actions)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/7cc7bcee-0af6-41af-9653-dfd6e0403fe9/lesson/923fd5a4-379e-49cf-aaa2-3b48e9ef4329)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/github-actions-certification/module/7cc7bcee-0af6-41af-9653-dfd6e0403fe9/lesson/f86e99e7-efc9-4b84-ae22-30501dc23d7b)**
>
> Practice lab
