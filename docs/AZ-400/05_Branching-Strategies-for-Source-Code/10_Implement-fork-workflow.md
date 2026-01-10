# Implement fork workflow - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Branching-Strategies-for-Source-Code/Implement-fork-workflow)

---

## Table of Contents

- Implement fork workflow
  - 1. Forking a Repository
  - 2. Cloning and Setting Up Your Fork
  - 3. Modifying the Code
  - 4. Comparing Fork vs. Upstream
  - 5. Creating a Pull Request
  - Workflow Summary
  - Links and References
  - Watch Video

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Branching Strategies for Source Code

# Implement fork workflow

In this guide, you’ll learn how to safely experiment with a project by creating a personal copy of an Azure DevOps repository. Forking enables you to develop features, test changes, and submit pull requests back to the original codebase—all without affecting the upstream repository. This workflow is perfect for open source contributions and large-team collaboration.

## 1\. Forking a Repository

1.  Sign in to Azure DevOps as your user (e.g., **Lloyd**).
2.  Navigate to **Repos** and locate the **KodeKloud GIFs** repository.
3.  Click **Fork**, name your fork (for example, `KodeKloudGifts.LloydChristmas`), choose the branches to include, and confirm.

![The image shows an Azure DevOps repository interface for "KodeKloudGifts," displaying a list of files and a dialog box for forking the repository.](https://kodekloud.com/kk-media/image/upload/v1752867357/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Implement-fork-workflow/azure-devops-kodekloudgifts-repo-interface.jpg)

> [!important]
> **Note**
>
> Forks are isolated copies—your changes won’t affect the original repository until you open a pull request.

After the fork completes, the **Clone** button points to your new repository:

![The image shows an Azure DevOps repository interface with a list of files and a "Clone Repository" dialog box open, displaying options for cloning via HTTPS or SSH.](https://kodekloud.com/kk-media/image/upload/v1752867358/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Implement-fork-workflow/azure-devops-repository-clone-dialog.jpg)

## 2\. Cloning and Setting Up Your Fork

Use Git to clone **your fork**, not the original:

```
git clone https://dev.azure.com/KodeKloudDemo/KodeKloudGifts/_git/KodeKloudGifts.lloyd.christmas
```

Sample output:

```
Cloning into 'KodeKloudGifts.lloyd.christmas'...
remote: Azure Repos
remote: This repository is a fork. Learn more at https://aka.ms/whatisafork.
remote: To add its upstream as a remote, run:
remote:   git remote add upstream https://dev.azure.com/KodeKloudDemo/KodeKloudGifts/_git/KodeKloudGifts
Unpacking objects: 100% (37/37), done.
```

> [!important]
> **Note**
>
> After cloning, run the following to set up the original repo as `upstream`:
>
> ```
> git remote add upstream https://dev.azure.com/KodeKloudDemo/KodeKloudGifts/_git/KodeKloudGifts
> ```

Open your project in Visual Studio Code:

![The image shows the Visual Studio Code interface with a project open, displaying the Explorer panel on the left and the Welcome page with start options and walkthroughs on the right.](https://kodekloud.com/kk-media/image/upload/v1752867359/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Implement-fork-workflow/visual-studio-code-interface-explorer-welcome.jpg)

## 3\. Modifying the Code

Edit **Pages/Home.razor** to showcase Lloyd’s GIF shop:

```
@page "/"
<PageTitle>Home</PageTitle>


<h1>Welcome to Lloyd’s KodeKloud Gift Shop!</h1>
<p>
  Discover Lloyd’s handpicked collection of quirky and unique GIF gifts.
  Whether for a friend, family, or yourself, shop the fun here!
</p>
```

Commit and push your updates:

```
git status
git add Pages/Home.razor
git commit -m "Update Home.razor with new shop details"
git push origin master
```

## 4\. Comparing Fork vs. Upstream

Switch between your fork and the upstream repository in Azure DevOps to verify changes:

![The image shows an Azure DevOps repository interface with a project named "KodeKloudGifts." It displays a list of files under the "Pages" directory, including "Counter.razor," "Home.razor," and "Weather.razor."](https://kodekloud.com/kk-media/image/upload/v1752867360/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Implement-fork-workflow/azure-devops-kodekloudgifts-repository.jpg)

Your fork’s **Home.razor** now reflects the new content, while the upstream remains unchanged.

## 5\. Creating a Pull Request

When you’re ready to merge, create a pull request:

1.  In your fork, go to **Pull Requests > New Pull Request**.
2.  Select **master** (or your feature branch) as both source and target, if applicable.
3.  Add a descriptive title and summary.

![The image shows a pull request creation page on Azure DevOps, with fields for title, description, and reviewers. The title and description are filled with "Changing front page."](https://kodekloud.com/kk-media/image/upload/v1752867362/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Implement-fork-workflow/azure-devops-pull-request-creation.jpg)

Tag reviewers, link work items, and adjust settings:

![The image shows a pull request creation page on Azure DevOps, with fields for title, description, and reviewers. The description mentions a change to a Python app.](https://kodekloud.com/kk-media/image/upload/v1752867363/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Implement-fork-workflow/azure-devops-pull-request-python-app.jpg)

Once submitted, maintainers can review and merge your contribution.

## Workflow Summary

| Step                | Command / Action                                         | Purpose                                    |
| ------------------- | -------------------------------------------------------- | ------------------------------------------ |
| Fork                | Click **Fork** in Azure DevOps                           | Create isolated repository copy            |
| Clone               | `git clone <fork-url>`                                   | Download your fork locally                 |
| Add Upstream Remote | `git remote add upstream <original-url>`                 | Keep fork in sync with the original repo   |
| Develop & Commit    | `git add` → `git commit -m` → `git push origin <branch>` | Make and push changes to your fork         |
| Create Pull Request | **Pull Requests > New Pull Request**                     | Propose changes to the upstream repository |

## Links and References

- [Azure DevOps Repos](https://learn.microsoft.com/azure/devops/repos/)
- [Git Fork vs Clone](https://www.atlassian.com/git/tutorials/merging-vs-rebasing)
- [AZ-400 Exam Overview](https://learn.microsoft.com/certifications/exams/az-400)
- [MariaDB vs MySQL](https://mariadb.org)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/8e033a7f-4740-4d37-9f97-54ebc9c54fd1/lesson/465b12e5-ea7a-42f7-977a-2681ac1c9d9a)**
>
> Watch video content
