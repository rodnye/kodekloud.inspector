# Organizing Your Repository Using Git Tags in Azure Repos - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Configuring-and-Managing-Repositories/Organizing-Your-Repository-Using-Git-Tags-in-Azure-Repos)

---

## Table of Contents

- Organizing Your Repository Using Git Tags in Azure Repos
  - What Are Git Tags?
  - Why Use Git Tags?
  - Common Git Tag Commands
  - Managing Tags in the Azure DevOps UI
  - Next Steps
  - Links and References
  - Watch Video

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Configuring and Managing Repositories

# Organizing Your Repository Using Git Tags in Azure Repos

Git tags provide fixed points in your project’s history—ideal for marking release versions, major changes, or key milestones. Because Azure Repos is built on Git, you can leverage all standard Git commands to create, list, and push tags, or manage them directly via the Azure DevOps web interface.

## What Are Git Tags?

> [!important]
> **Note**
>
> Git tags come in two flavors:
>
> - **Lightweight tags**: Simple pointers to a commit (no additional metadata).
> - **Annotated tags**: Store extra information such as author, date, and a message—ideal for official releases.

## Why Use Git Tags?

- **Release Management**: Mark stable builds for deployment or distribution.
- **Version Tracking**: Easily reference past states of your codebase.
- **Collaboration**: Communicate release points to team members or CI/CD pipelines.

## Common Git Tag Commands

| Command                                        | Description                           |
| ---------------------------------------------- | ------------------------------------- |
| `git tag v1.0.0`                               | Create a **lightweight** tag          |
| `git tag -a v1.0.0 -m "Release version 1.0.0"` | Create an **annotated** tag           |
| `git tag`                                      | List all local tags                   |
| `git push origin v1.0.0`                       | Push a specific tag to the remote     |
| `git push origin --tags`                       | Push **all** local tags to the remote |

## Managing Tags in the Azure DevOps UI

Azure DevOps also offers a visual interface to streamline tag management:

![The image shows a screenshot of the Azure Repos interface, highlighting the "Tags" section with a list of tags and their details. It includes options for creating new tags and searching existing ones.](https://kodekloud.com/kk-media/image/upload/v1752867517/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Organizing-Your-Repository-Using-Git-Tags-in-Azure-Repos/azure-repos-tags-screenshot.jpg)

From this **Tags** page, you can:

- Create new tags without using the CLI
- Search and filter existing tags
- View tag details at a glance

## Next Steps

Ready to learn more about release workflows? Explore how Git tags integrate with [GitHub Releases](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases) to publish release notes and binaries.

## Links and References

- [Azure Repos Tags Documentation](https://learn.microsoft.com/azure/devops/repos/git/manage-your-tags)
- [GitHub Releases Overview](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases)
- [Git Basics – Tagging](https://git-scm.com/book/en/v2/Git-Basics-Tagging)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/e7d3282b-80bc-4acd-8009-2fcf5dee0c86/lesson/187b25d1-5b13-45b9-8f11-0f7ce4bd8c3d)**
>
> Watch video content
