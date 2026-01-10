# Adding a workflow status badge - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions/Security-Guide/Adding-a-workflow-status-badge)

---

## Table of Contents

- Adding a workflow status badge
  - Benefits of Workflow Badges
  - Steps to Generate a Status Badge
  - Embedding the Badge in Your README
  - Commit and Push
  - Links and References
  - Watch Video
  - Practice Lab
    - Badge Markdown Breakdown

---

## Content

GitHub Actions

Security Guide

# Adding a workflow status badge

A workflow status badge provides a quick visual indicator of your GitHub Actions workflow’s current state. Embedding this badge in your repository’s `README.md` (or any documentation page) helps contributors and visitors instantly see if your CI/CD pipelines are passing or failing.

## Benefits of Workflow Badges

- Improves transparency on build health
- Boosts contributor confidence
- Encourages proactive maintenance

> [!important]
> **Note**
>
> Badges are dynamic images that update automatically each time your workflow runs. You can filter by branch or event to display the status you care about.

## Steps to Generate a Status Badge

1.  Open the **Actions** tab in your GitHub repository.
2.  Select the workflow you want to badge.
3.  Click **Create status badge** (under **More** or directly on the workflow page).

![The image shows a GitHub interface with a pop-up window for creating a status badge. It includes options to select a branch and filter branches, with a "Copy status badge Markdown" button at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752876750/notes-assets/images/GitHub-Actions-Adding-a-workflow-status-badge/github-status-badge-creation-popup.jpg)

4.  In the pop-up, choose your target branch (e.g., `main` or `develop`) and any event filters.
5.  Click **Copy status badge Markdown** to grab the snippet.

### Badge Markdown Breakdown

| Component | Description                         | Example                                                                        |
| --------- | ----------------------------------- | ------------------------------------------------------------------------------ |
| Alt text  | Accessible name for the badge image | `Vault Demo`                                                                   |
| Image URL | Workflow badge SVG                  | `https://github.com/<OWNER>/<REPO>/actions/workflows/vault-demo.yml/badge.svg` |
| Link URL  | Links to workflow run history       | `https://github.com/<OWNER>/<REPO>/actions/workflows/vault-demo.yml`           |

## Embedding the Badge in Your README

Paste the copied snippet at the top of your `README.md`:

```
[![Vault Demo](https://github.com/sidd-harth-7/actions-1/actions/workflows/vault-demo.yml/badge.svg)](https://github.com/sidd-harth-7/actions-1/actions/workflows/vault-demo.yml)
```

Repeat for additional workflows (for example, **Exploring Variables and Secrets**).

> [!important]
> **Warning**
>
> Too many badges can clutter your README. Group or reorder them logically to maintain readability.

## Commit and Push

Commit your updates and push them to GitHub. To skip CI on this commit, include `[skip ci]`:

```
git add README.md
git commit -m "docs: add workflow status badges [skip ci]"
git push
```

After pushing, visit your repository’s main page. The status badges will appear at the top of your README, reflecting real-time workflow results.

## Links and References

- [GitHub Actions Documentation](https://docs.github.com/actions)
- [Understanding GitHub Actions](https://docs.github.com/actions/learn-github-actions/understanding-github-actions)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions/module/48b4f34c-9ebb-4049-baa1-40490c46d2eb/lesson/d3882e38-b0b8-4c7f-a5ff-5db33212990a)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/github-actions/module/48b4f34c-9ebb-4049-baa1-40490c46d2eb/lesson/a09a3aa3-50a1-4a11-9cb1-af9bf62ff19d)**
>
> Practice lab
