# Task 3Setup Github repo according to DevOps best practice - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GCP-DevOps-Project/Sprint-01/Task-3Setup-Github-repo-according-to-DevOps-best-practice)

---

## Table of Contents

- Task 3Setup Github repo according to DevOps best practice
  - Current Workflow and Its Drawbacks
  - Enabling Branch Protection Rules
  - Recommended GitHub Workflow
  - What’s Next?
  - Watch Video
    - Key Branch Protection Settings

---

## Content

GCP DevOps Project

Sprint 01

# Task 3Setup Github repo according to DevOps best practice

![The image contains text on a blue gradient background that reads, "Task 3: Setting up GitHub repo according to DevOps best practices."](https://kodekloud.com/kk-media/image/upload/v1752875414/notes-assets/images/GCP-DevOps-Project-Task-3Setup-Github-repo-according-to-DevOps-best-practice/task-3-github-repo-devops-best-practices.jpg)

In this guide, we'll walk through configuring your GitHub repository to align with DevOps best practices. You'll learn how to protect your `main` branch, enforce pull request reviews, and adopt a scalable workflow for collaborative development.

## Current Workflow and Its Drawbacks

Most teams begin with a simple process:

1.  Clone the central repo.
2.  Make changes directly on `main`.
3.  Push updates back to `main`.

While straightforward, this method introduces two critical issues:

- **Unreviewed code**: Bugs or security flaws can reach production unvetted.
- **Frequent merge conflicts**: Multiple direct pushes to `main` often collide.

To solve these problems, we’ll enable branch protection and mandate pull requests.

## Enabling Branch Protection Rules

Branch protection rules block direct pushes to critical branches (like `main`) and enforce quality checks before merging.

![The image features a stack of boxes with a shield icon and the text "Branch Protection" next to it.](https://kodekloud.com/kk-media/image/upload/v1752875415/notes-assets/images/GCP-DevOps-Project-Task-3Setup-Github-repo-according-to-DevOps-best-practice/branch-protection-stack-boxes-shield.jpg)

### Key Branch Protection Settings

| Rule                         | Description                        | Benefit                         |
| ---------------------------- | ---------------------------------- | ------------------------------- |
| Require pull request reviews | Prevents direct commits to `main`  | Ensures code is peer-reviewed   |
| Enforce status checks        | CI/CD pipelines must pass          | Avoids broken or failing builds |
| Dismiss stale approvals      | Forces fresh reviews after changes | Keeps feedback up to date       |

> [!important]
> **Note**
>
> Configure branch protection under **Settings > Branches** in your GitHub repository. For details, see [GitHub Branch Protection](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-protected-branches).

With these rules enabled:

- Direct pushes to `main` are blocked.
- All changes must go through a pull request.
- Required CI/CD checks must be green before merging.

## Recommended GitHub Workflow

Adopt a feature-branch workflow to scale collaboration:

1.  Clone the repository locally.
2.  Create a new feature branch: `feature/your-feature-name`.
3.  Commit work to the feature branch.
4.  Push the branch and open a pull request against `main`.
5.  Request reviews and address feedback.
6.  Merge when approvals and checks are complete.

```
# 1. Clone the repo
git clone https://github.com/your-org/your-repo.git
cd your-repo


# 2. Create and switch to a feature branch
git checkout -b feature/your-feature-name


# 3. Stage and commit your changes
git add .
git commit -m "Add description of your feature or fix"


# 4. Push and publish the branch
git push -u origin feature/your-feature-name
```

After pushing, navigate to the GitHub UI to open a pull request and assign reviewers.

![The image is a flowchart illustrating a GitHub workflow, showing steps from the main branch to cloning, creating a feature branch, and making a pull request, which is then reviewed by an engineer.](https://kodekloud.com/kk-media/image/upload/v1752875416/notes-assets/images/GCP-DevOps-Project-Task-3Setup-Github-repo-according-to-DevOps-best-practice/github-workflow-flowchart-pull-request.jpg)

> [!important]
> **Warning**
>
> Avoid emergency fixes directly on `main`. Even urgent patches should follow the pull request process to maintain auditability.

## What’s Next?

In the next article, we’ll demonstrate how to apply branch protection rules in the GitHub settings and manage pull requests step by step.

![The image shows a search bar with the query "How to enable Branch Protection?" and a copyright notice for KodeKloud.](https://kodekloud.com/kk-media/image/upload/v1752875417/notes-assets/images/GCP-DevOps-Project-Task-3Setup-Github-repo-according-to-DevOps-best-practice/search-bar-branch-protection-kodekloud.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gcp-devops-project/module/a334971a-4fa2-4c61-8891-9c189e2aab64/lesson/3c497c3c-5e90-43a7-977b-f470047c7b1d)**
>
> Watch video content
