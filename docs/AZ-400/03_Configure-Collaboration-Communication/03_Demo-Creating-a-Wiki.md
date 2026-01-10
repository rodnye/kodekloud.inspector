# Demo Creating a Wiki - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Configure-Collaboration-Communication/Demo-Creating-a-Wiki)

---

## Table of Contents

- Demo Creating a Wiki
  - Overview
  - 1. Creating a Project Wiki in Azure DevOps
  - 2. Publishing Code as a Wiki
  - What’s Next?
  - Links and References
  - Watch Video
    - a. Accessing the Wiki Feature
    - b. Creating the Wiki
    - c. Managing Wiki Security
    - a. Prepare Your Repository
    - b. Publish Code as Wiki

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Configure Collaboration Communication

# Demo Creating a Wiki

## Overview

In this guide, you’ll learn how to set up and secure a project wiki in Azure DevOps for your .NET application, **Turkey Time**. We’ll cover both the built-in Project Wiki and the Publish Code as Wiki approaches, ensuring your documentation is versioned alongside your code.

## 1\. Creating a Project Wiki in Azure DevOps

### a. Accessing the Wiki Feature

1.  In your Azure DevOps project, go to **Project Overview** → **Wiki**.
2.  You’ll see two options:
    - **Create Project Wiki**
    - **Publish Code as Wiki**

> [!important]
> **Note**
>
> Creating a **Project Wiki** lets you quickly start documenting without touching your code repository. Ideal for high-level docs and team onboarding.

### b. Creating the Wiki

1.  Click **Create Project Wiki**.
2.  Enter a title, for example: **Turkey Time Wiki**.
3.  Rename the default page to **About This Project**.
4.  Add your content using Markdown:
    - Headings (`#`, `##`, `###`)
    - Lists (`-`, `*`)
    - Links (`[text](url)`)
5.  Click **Save** when you’re done.

### c. Managing Wiki Security

To control who can view or edit your wiki:

1.  Click the **...** menu at the top right of the wiki page.
2.  Select **Wiki security**.
3.  Add users or groups and assign permissions.

| Permission | Description                       |
| ---------- | --------------------------------- |
| Read       | View all wiki pages               |
| Contribute | Edit and create wiki content      |
| Delete     | Remove pages or sections          |
| Administer | Modify wiki settings and security |

> [!important]
> **Warning**
>
> Follow the principle of least privilege—only grant the minimum permissions each user or group needs.

![The image shows an Azure DevOps interface with a wiki page titled "Welcome to Turkey Time!" and a security settings panel for managing permissions for different user groups.](https://kodekloud.com/kk-media/image/upload/v1752867443/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Demo-Creating-a-Wiki/azure-devops-wiki-security-settings.jpg)

---

## 2\. Publishing Code as a Wiki

Versioning your documentation alongside your source code ensures every change is tracked.

### a. Prepare Your Repository

1.  In your local repo or IDE, create a `Wiki` folder:

    ```
    mkdir Wiki
    ```

2.  Inside `Wiki`, create a Markdown file (e.g., `HelpPage.md`) and write your documentation.
3.  Stage and commit your changes:

    ```
    git add Wiki/HelpPage.md
    git commit -m "Add HelpPage documentation for Turkey Time"
    git push origin main
    ```

![The image shows a Visual Studio code editor with a markdown file open, displaying a help section for an application. The text includes contact information for support and a link to an FAQ.](https://kodekloud.com/kk-media/image/upload/v1752867444/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Demo-Creating-a-Wiki/visual-studio-code-markdown-help-section.jpg)

### b. Publish Code as Wiki

1.  In Azure DevOps, navigate back to **Project Overview** → **Wiki**.
2.  Select **Publish Code as Wiki**.
3.  Choose the `Wiki` folder in your repository.
4.  Enter a wiki name (e.g., **Help Page**).
5.  Click **Publish**.

Your Markdown files will now appear as versioned wiki pages in Azure DevOps.

---

## What’s Next?

In our next article, we’ll explore **Azure Boards** and show you how to build a **custom dashboard** for tracking work items and sprints in Azure DevOps.

## Links and References

- [Azure DevOps Wiki Documentation](https://docs.microsoft.com/azure/devops/project/wiki/overview)
- [Markdown Guide](https://www.markdownguide.org/basic-syntax/)
- [Git Basics](https://git-scm.com/book/en/v2/Getting-Started-Git-Basics)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/6f0f53fa-76cd-4ea8-81b4-d2e4b10a6191/lesson/ffbdfdff-00bb-48c0-b3bf-322c2729b215)**
>
> Watch video content
