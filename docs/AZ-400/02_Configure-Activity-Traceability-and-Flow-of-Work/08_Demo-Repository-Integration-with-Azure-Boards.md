# Demo Repository Integration with Azure Boards - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Configure-Activity-Traceability-and-Flow-of-Work/Demo-Repository-Integration-with-Azure-Boards)

---

## Table of Contents

- Demo Repository Integration with Azure Boards
  - Prerequisites
  - Step 1: Identify the Work Item
  - Step 2: Apply the Code Change
  - Step 3: Commit with a Work Item Reference
  - Step 4: Verify the Link in Azure Boards
  - Quick Reference: Commit Keyword Table
  - Best Practices
  - Links and References
  - Watch Video

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Configure Activity Traceability and Flow of Work

# Demo Repository Integration with Azure Boards

Learn how to link commits and pull requests directly to Azure Boards work items for seamless tracking and enhanced visibility.

## Prerequisites

- An existing Azure DevOps project with Azure Boards enabled
- A Git repository named **Customer Portal** in the same project
- Git CLI and an IDE (e.g., Visual Studio Code)

---

## Step 1: Identify the Work Item

Navigate to **Azure Boards** and locate the work item you need to address. For this demo, our target is:

- Work Item ID: **69**
- Title: _“Add a sentence to the README file.”_

![The image shows a screenshot of a work items list from Azure DevOps, displaying tasks with details such as ID, title, assigned person, state, and area path. The tasks are unassigned and marked as "To Do" under the "Customer Portal" area.](https://kodekloud.com/kk-media/image/upload/v1752867396/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Demo-Repository-Integration-with-Azure-Boards/azure-devops-work-items-to-do-list.jpg)

Make note of this ID—you’ll need it when linking your commit or pull request.

---

## Step 2: Apply the Code Change

1.  Open the **Customer Portal** repo in your editor.
2.  Edit `README.md` to add the required sentence.
3.  Stage your change:

    ```
    git add README.md
    ```

---

## Step 3: Commit with a Work Item Reference

When committing changes, include one of these keywords followed by the work item ID (`#69`):

- fixes
- resolves
- closes

```
git commit -m "Add README sentence (fixes #69)"
git push origin main
```

> [!important]
> **Note**
>
> You can also use the `AB#<ID>` format in commit messages or PR descriptions to link work items.
> Example: `git commit -m "Update docs AB#69"`.> [!important]
> **Warning**
>
> Ensure your repository is connected to Azure Boards and that you have the correct permissions. Missing the `#` or using an unsupported keyword will prevent the link from forming.

---

## Step 4: Verify the Link in Azure Boards

Return to the work item in Azure Boards (ID 69). In the **Development** section, you should see the linked commit and any associated pull requests.

![The image shows an Azure DevOps interface displaying a repository named "Customer Portal" with files like `azure-pipelines.yml` and `README.md`. The README file contains sections for introduction, getting started, build and test, and contribute.](https://kodekloud.com/kk-media/image/upload/v1752867398/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Demo-Repository-Integration-with-Azure-Boards/azure-devops-customer-portal-repo.jpg)

---

## Quick Reference: Commit Keyword Table

| Keyword  | Effect                                  | Example        |
| -------- | --------------------------------------- | -------------- |
| fixes    | Closes work item when the commit merges | `fixes #69`    |
| resolves | Same as `fixes`                         | `resolves #69` |
| closes   | Alternative close keyword               | `closes #69`   |
| AB#      | Direct link without auto-close behavior | `AB#69`        |

---

## Best Practices

- Always reference work item IDs in both commit messages and pull request descriptions for clear traceability.
- Write concise, descriptive commit messages that reflect the scope of the change.
- Regularly review the **Development** section in Azure Boards to confirm that links are up to date.
- Encourage your team to follow this process to maintain project transparency.

---

## Links and References

- [Azure Boards Documentation](https://learn.microsoft.com/azure/devops/boards/)
- [Linking Work Items to Code](https://learn.microsoft.com/azure/devops/boards/add-work-items-to-code)
- [Git Commit Best Practices](https://www.atlassian.com/git/tutorials/saving-changes)
- [Azure DevOps Git Integration](https://learn.microsoft.com/azure/devops/repos/git/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/503e97d4-be52-440b-8a4e-8610d1eca6ed/lesson/8757794f-e70a-41a4-bccb-a400ff4d3b2f)**
>
> Watch video content
