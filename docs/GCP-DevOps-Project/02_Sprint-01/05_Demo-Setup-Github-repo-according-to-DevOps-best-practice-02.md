# Demo Setup Github repo according to DevOps best practice 02 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GCP-DevOps-Project/Sprint-01/Demo-Setup-Github-repo-according-to-DevOps-best-practice-02)

---

## Table of Contents

- Demo Setup Github repo according to DevOps best practice 02
  - Enabling Branch Protection
  - Working with Feature Branches
  - Creating and Merging a Pull Request
  - Links and References
  - Watch Video
    - Creating a Feature Branch
    - Updating the README
    - Staging and Committing
    - Pushing the Feature Branch

---

## Content

GCP DevOps Project

Sprint 01

# Demo Setup Github repo according to DevOps best practice 02

Welcome back! In this lesson, we'll walk through enabling branch protection on GitHub and establish a workflow using feature branches and pull requests.

## Enabling Branch Protection

> [!important]
> **Note**
>
> Enabling branch protection helps maintain code quality and prevents direct pushes to critical branches.

1.  In your repository, navigate to **Settings** > **Branches**.
2.  Click **Add branch protection rule**.
3.  Set **Branch name pattern** to `main`.
4.  Enable **Require a pull request before merging**.
5.  Uncheck **Require approvals** if you're working solo.
6.  Scroll down and click **Create**.

| Branch Protection Option            | Description                                      | Status   |
| ----------------------------------- | ------------------------------------------------ | -------- |
| Require pull request before merging | Enforce all changes to go through a pull request | Enabled  |
| Require approvals                   | Mandate review approvals before merging          | Disabled |

![The image shows a GitHub settings page for creating a new branch protection rule, with options to require pull requests and approvals before merging into the main branch.](https://kodekloud.com/kk-media/image/upload/v1752875399/notes-assets/images/GCP-DevOps-Project-Demo-Setup-Github-repo-according-to-DevOps-best-practice-02/github-settings-branch-protection-rule.jpg)

Once created, your protected rule appears in the list:

![The image shows a GitHub repository settings page, specifically the "Branches" section, where the default branch is set to "main" and branch protection rules are being managed.](https://kodekloud.com/kk-media/image/upload/v1752875400/notes-assets/images/GCP-DevOps-Project-Demo-Setup-Github-repo-according-to-DevOps-best-practice-02/github-repo-settings-branches-main.jpg)

## Working with Feature Branches

> [!important]
> **Warning**
>
> Avoid committing directly to `main`. Always use a dedicated feature branch for your changes.

First, verify your current branch in VS Code:

```
git branch
* main
```

### Creating a Feature Branch

Switch to a new branch for your task:

```
git checkout -b feature/task-02
git branch
* feature/task-02
  main
```

### Updating the README

1.  Open `README.md`.
2.  Change the heading from `####` to `#` for an H1 title.
3.  Preview your changes to confirm the update.

### Staging and Committing

Stage and commit the revision:

```
git add README.md
git status
# On branch feature/task-02
# Changes to be committed:
git commit -m "Update README.md to use H1 heading"
```

### Pushing the Feature Branch

Push your branch to GitHub:

```
git push origin feature/task-02
```

You should see a message prompting you to create a pull request:

```
remote: Create a pull request for 'feature/task-02' on GitHub by visiting:
remote:   https://github.com/learnwithraghu/gcp-devops-project/pull/new/feature/task-02
```

## Creating and Merging a Pull Request

1.  Click **Compare & pull request** in the GitHub banner.
2.  On the **Open a pull request** page:
    - **Title**: Update README.md to use H1 heading
    - **Description**: Update the README file to make the first line a heading
3.  Review your changes and click **Create pull request**.

![The image shows a GitHub interface where a user is preparing to create a pull request to update a README.md file. The changes include making the first line a heading, with one addition and one deletion highlighted.](https://kodekloud.com/kk-media/image/upload/v1752875401/notes-assets/images/GCP-DevOps-Project-Demo-Setup-Github-repo-according-to-DevOps-best-practice-02/github-pull-request-readme-update.jpg)

4.  Click **Merge pull request**, then **Confirm merge** (approvals are not required for solo projects).

![The image shows a GitHub pull request page for a project named "gcp-devops-project," where a pull request titled "Update readme.md file #1" has been successfully merged and closed.](https://kodekloud.com/kk-media/image/upload/v1752875402/notes-assets/images/GCP-DevOps-Project-Demo-Setup-Github-repo-according-to-DevOps-best-practice-02/github-pull-request-gcp-devops-merged.jpg)

After merging, your `main` branch includes the change. This clear, repeatable process scales with team size and project complexity.

## Links and References

- [GitHub Branch Protection Rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-protected-branches)
- [Git Branching Basics](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging)
- [GitHub Pull Requests](https://docs.github.com/en/pull-requests)

That's it for this lesson. See you in the next one!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gcp-devops-project/module/a334971a-4fa2-4c61-8891-9c189e2aab64/lesson/3f5ae5f4-aa90-4540-a5bc-85e22ab94a55)**
>
> Watch video content
