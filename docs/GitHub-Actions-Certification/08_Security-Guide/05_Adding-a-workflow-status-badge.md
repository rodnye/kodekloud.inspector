# Adding a workflow status badge - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/Security-Guide/Adding-a-workflow-status-badge)

---

## Table of Contents

- Adding a workflow status badge
  - 1. Generate the Badge Markdown
  - 2. Embed the Badge in Markdown
  - 3. Track Multiple Workflows
  - Additional Resources
  - Watch Video

---

## Content

GitHub Actions Certification

Security Guide

# Adding a workflow status badge

A workflow status badge provides real-time visibility into your CI/CD pipeline directly from your README or any Markdown page. This guide walks you through generating and embedding badges for one or multiple GitHub Actions workflows.

## 1\. Generate the Badge Markdown

1.  Navigate to your repository on GitHub and click the **Actions** tab.
2.  Select the workflow you want to badge (e.g., `vault-demo`).
3.  In the workflow overview, click **Create status badge**.

![The image shows a GitHub interface with a pop-up window for creating a status badge, allowing the user to select a branch and copy the badge's Markdown code.](https://kodekloud.com/kk-media/image/upload/v1752876372/notes-assets/images/GitHub-Actions-Certification-Adding-a-workflow-status-badge/github-status-badge-creation-popup.jpg)

> [!important]
> **Note**
>
> By default, GitHub uses your default branch (often `main`). You can switch branches or filter by event types before copying the badge snippet.

## 2\. Embed the Badge in Markdown

Copy the Markdown snippet provided by GitHub and paste it into your `README.md` (or any `.md` file):

```
[![Vault Demo](https://github.com/sidd-harth-7/actions-1/actions/workflows/vault-demo.yml/badge.svg)](https://github.com/sidd-harth-7/actions-1/actions/workflows/vault-demo.yml)
```

| Parameter     | Example                                         | Purpose                                 |
| ------------- | ----------------------------------------------- | --------------------------------------- |
| Workflow name | `Vault Demo`                                    | The label displayed alongside the badge |
| SVG URL       | `https://github.com/…/vault-demo.yml/badge.svg` | Renders the badge image                 |
| Link URL      | `https://github.com/…/vault-demo.yml`           | Directs to the workflow runs page       |

Save and commit your changes. The badge will update automatically to reflect the latest workflow status.

## 3\. Track Multiple Workflows

To monitor additional workflows, repeat **Step 1** and **Step 2** for each workflow. For example:

![The image shows a GitHub Actions page for a repository, displaying a list of workflow runs with their statuses, including a manually disabled workflow.](https://kodekloud.com/kk-media/image/upload/v1752876374/notes-assets/images/GitHub-Actions-Certification-Adding-a-workflow-status-badge/github-actions-workflow-runs-statuses.jpg)

Each workflow adds its own badge, allowing you to display an overview of all your pipelines at a glance.

> [!important]
> **Warning**
>
> If you’re updating only your README, consider adding `[skip ci]` to your commit message to avoid triggering CI workflows unnecessarily.

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Adding a workflow status badge](https://docs.github.com/en/actions/managing-workflow-runs/adding-a-workflow-status-badge)
- [Mastering Markdown Guide](https://guides.github.com/features/mastering-markdown/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/a3e810f5-af92-4e1c-ac54-bdf50ddbe9cf/lesson/90988d66-8b85-4462-afea-2d45a4688dae)**
>
> Watch video content
