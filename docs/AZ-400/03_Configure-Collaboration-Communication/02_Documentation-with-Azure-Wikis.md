# Documentation with Azure Wikis - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Configure-Collaboration-Communication/Documentation-with-Azure-Wikis)

---

## Table of Contents

- Documentation with Azure Wikis
  - Overview
  - Creating a New Wiki
  - Provisioned Wiki
  - Publishing Code as a Wiki
  - Links and References
  - Watch Video
    - Key Features
    - Navigation & Management
    - Benefits

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Configure Collaboration Communication

# Documentation with Azure Wikis

Azure Wikis in Azure DevOps deliver an integrated, version-controlled documentation solution. Whether you need a blank canvas for project docs or want to publish existing Markdown alongside your code, Azure Wikis ensure your documentation stays aligned with development.

## Overview

| Wiki Type        | Hosted Location        | Versioning         | Ideal Use Case                                  |
| ---------------- | ---------------------- | ------------------ | ----------------------------------------------- |
| Provisioned Wiki | Azure DevOps (managed) | Built-in revisions | Quick-start docs, team collaboration            |
| Code-Published   | Git repository         | Git branches/tags  | Docs-as-code, CI/CD integration, versioned docs |

## Creating a New Wiki

1.  In your Azure DevOps project, select **Wiki** under **Overview**.
2.  Choose one of the following:
    - **Create a project wiki** (provisioned wiki)
    - **Publish code as wiki**

> [!important]
> **Note**
>
> Selecting **Publish code as wiki** requires a repository with Markdown files and a supported branch.

---

## Provisioned Wiki

A provisioned wiki provides a built-in, managed wiki experience. After creation, you can immediately add content via the Azure DevOps editor.

![The image shows a screenshot of a "Provisioned Wiki" in Azure DevOps, displaying a customer portal wiki with a text editor interface.](https://kodekloud.com/kk-media/image/upload/v1752867452/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Documentation-with-Azure-Wikis/provisioned-wiki-azure-devops-screenshot.jpg)

### Key Features

- **Page hierarchy**: Add, move, or nest sub-pages
- **Rich editor**: Markdown or HTML with image resizing
- **Attachments**: Upload files directly to pages
- **Inline comments**: Collaborate and discuss changes

![The image shows a screenshot of a "Customer Portal Wiki" interface with options to add, edit, or delete pages, and a section for comments.](https://kodekloud.com/kk-media/image/upload/v1752867454/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Documentation-with-Azure-Wikis/customer-portal-wiki-interface-screenshot.jpg)

### Navigation & Management

- Left pane for quick access to pages and sub-pages
- Print pages for offline distribution
- Link work items to documentation
- View and revert revision history
- Option to delete the entire wiki

![The image shows a screenshot of a "Provisioned Wiki" in Azure DevOps, displaying a customer portal wiki page with navigation options on the left.](https://kodekloud.com/kk-media/image/upload/v1752867455/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Documentation-with-Azure-Wikis/provisioned-wiki-azure-devops-screenshot-2.jpg)

---

## Publishing Code as a Wiki

With the code-published approach, your documentation lives in a Git repository, enabling full source-control workflows.

1.  Create a folder (e.g., `/docs`) in your repo and add `.md` files.
2.  In **Wiki** settings, select **Publish code as wiki**.
3.  Choose the repository and branch.
4.  Save to generate the wiki from your Markdown.

> [!important]
> **Warning**
>
> Editing content directly in the provisioned wiki editor won’t update your Git repository. For changes, commit to your repo branch.

![The image shows a guide on publishing code as a wiki, highlighting features like organizing content, browsing, publishing new versions, managing content, and searching the wiki. It also includes a form for setting up a wiki with repository and branch options.](https://kodekloud.com/kk-media/image/upload/v1752867456/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Documentation-with-Azure-Wikis/wiki-publishing-guide-content-management.jpg)

### Benefits

- **Folder-based hierarchy** and auto-generated table of contents
- **Versioned releases** tied to code deployments
- **Pull request reviews** for doc updates
- **Searchable, filterable content**

---

## Links and References

- [Azure DevOps Wiki Documentation](https://docs.microsoft.com/azure/devops/project/wiki/wiki-overview)
- [Markdown Guide](https://www.markdownguide.org/)
- [Git Version Control](https://git-scm.com/)
- [Azure DevOps Services](https://azure.microsoft.com/services/devops/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/6f0f53fa-76cd-4ea8-81b4-d2e4b10a6191/lesson/39ff065e-87ad-406b-b5b5-c6bce0a59bc1)**
>
> Watch video content
