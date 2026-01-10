# Azure Repos collaborating with pull requests - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Branching-Strategies-for-Source-Code/Azure-Repos-collaborating-with-pull-requests)

---

## Table of Contents

- Azure Repos collaborating with pull requests
  - 1. Create a Feature Branch and Push Changes
  - 2. Open a Pull Request
  - 3. Review and Complete the Pull Request
  - Result and Next Steps
  - Links and References
  - Watch Video
    - 3.1 Review Code Changes
    - 3.2 Choose a Review Outcome
    - 3.3 Merge Settings and Strategies

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Branching Strategies for Source Code

# Azure Repos collaborating with pull requests

Streamline your team’s code collaboration with Azure Repos pull requests. In this guide, you’ll learn how to:

- Create a feature branch
- Push changes
- Open a pull request
- Review code
- Complete the merge

Whether you’re preparing for AZ-400 certification labs or improving your CI/CD workflow, this end-to-end pull request process will keep your repository clean and your team in sync.

---

## 1\. Create a Feature Branch and Push Changes

Start by branching off **master** so your changes remain isolated.

```
cd ~/mnt/c/Users/jeremy/Projects/KodeKloudGifts
git checkout -b ChangeFrontPage     # Create a feature branch
```

Open `Pages/Home.razor` in your editor and update the marketing copy:

```
@page "/"


<PageTitle>Home</PageTitle>


<h1>Kode Kloud Gift Shop</h1>
<p>
  Welcome to the Kode Kloud Gift Shop,
  where you can find the quirkiest and most unique gifts
  at unbeatable prices! Whether you’re looking for a gift
  for a friend, family member, or yourself, we’ve got you covered.
</p>
```

Stage, commit, and push your branch to Azure Repos:

```
git add Pages/Home.razor
git commit -m "Update front page marketing text"
git push -u origin ChangeFrontPage
```

> [!important]
> **Note**
>
> If you don’t see the new branch right away, have your collaborator refresh the **Branches** view.

![The image shows a screenshot of the Azure DevOps interface displaying the branches of a repository. It lists two branches, "ChangeFrontPage" and "master," along with details like commit IDs, authors, and status.](https://kodekloud.com/kk-media/image/upload/v1752867323/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Azure-Repos-collaborating-with-pull-requests/azure-devops-branches-screenshot.jpg)

---

## 2\. Open a Pull Request

Now that your feature branch is pushed, initiate a pull request (PR) to merge into **master**:

1.  Navigate to **Repos > Pull requests > New pull request**.
2.  Set **Source** to `ChangeFrontPage` and **Target** to `master`.
3.  Add a descriptive title, e.g., _Change front page text_, and a clear description.
4.  Assign **Jeremy Morgan** (or the appropriate reviewer).
5.  Click **Create** to open the PR.

![The image shows a pull request creation page in Azure DevOps, with fields for title, description, reviewers, and work items. The sidebar includes options like Repos, Pipelines, and Test Plans.](https://kodekloud.com/kk-media/image/upload/v1752867324/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Azure-Repos-collaborating-with-pull-requests/azure-devops-pull-request-creation.jpg)

---

## 3\. Review and Complete the Pull Request

### 3.1 Review Code Changes

As a reviewer, check for:

- Correct **source → target**
- No merge conflicts
- Clean diffs and concise commit messages

Leave comments or questions inline:

> **Jeremy**: Has this text been approved by legal?
>
> **Lloyd**: Yes, it’s already been cleared.  
> _(Mark as resolved)_

Inspect the diff for `Home.razor`:

![The image shows a pull request in Azure DevOps for a project named "KodeKloudGifts," with a proposed change to the "Home.razor" file. The change involves updating text on the front page.](https://kodekloud.com/kk-media/image/upload/v1752867325/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Azure-Repos-collaborating-with-pull-requests/azure-devops-kodekloudgifts-pull-request.jpg)

### 3.2 Choose a Review Outcome

Azure DevOps supports multiple review decisions:

- Approve (with or without suggestions)
- Wait for author
- Reject
- Abandon

![The image shows a pull request interface in Azure DevOps, with options to approve, reject, or comment on the changes. It includes a conversation about the review status and a description of the changes made.](https://kodekloud.com/kk-media/image/upload/v1752867326/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Azure-Repos-collaborating-with-pull-requests/azure-devops-pull-request-interface.jpg)

### 3.3 Merge Settings and Strategies

Once approved, click **Complete** and pick a merge strategy:

| Strategy                | Description                                    |
| ----------------------- | ---------------------------------------------- |
| Merge (no fast-forward) | Preserve all commits in a merge commit         |
| Squash commit           | Combine changes into a single commit           |
| Rebase and fast-forward | Apply commits directly on `master`             |
| Semi-linear merge       | Rebase then merge, preserving a linear history |

You can also:

- Edit the merge commit message
- Complete linked work items
- Delete the source branch automatically

> [!important]
> **Warning**
>
> Deleting the feature branch is irreversible. Ensure you won’t need any additional changes before confirming.

![The image shows a pull request interface in Azure DevOps, with options to complete the pull request and post-completion settings.](https://kodekloud.com/kk-media/image/upload/v1752867327/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Azure-Repos-collaborating-with-pull-requests/azure-devops-pull-request-interface-2.jpg)

---

## Result and Next Steps

After merging:

- **master** now includes your updated `Home.razor`.
- Any branch policies (build, test, deploy) on **master** trigger automatically.
- Your team can continue developing new features without conflicts.

This pull request workflow is central to scalable DevOps practices in Azure Repos and is a key skill for the AZ-400 exam.

## Links and References

- [Azure Repos Pull Requests](https://docs.microsoft.com/azure/devops/repos/git/pull-requests)
- [Branch Policies in Azure DevOps](https://docs.microsoft.com/azure/devops/repos/git/branch-policies)
- [AZ-400 Certification Guide](https://docs.microsoft.com/learn/certifications/exams/az-400)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/8e033a7f-4740-4d37-9f97-54ebc9c54fd1/lesson/299530b5-4557-4c78-a3f9-e5ba6d9d08ef)**
>
> Watch video content
