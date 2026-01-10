# Configure Git tags to organize the source control repository - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Configuring-and-Managing-Repositories/Configure-Git-tags-to-organize-the-source-control-repository)

---

## Table of Contents

- Configure Git tags to organize the source control repository
  - Why use Git tags?
  - Types of Git tags
  - Creating tags
  - Listing all tags
  - Pushing tags to remote
  - Checking out a tag
  - Sorting tags by semantic version
  - Integrating Git tags with Azure Repos
  - Links and References
  - Watch Video

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Configuring and Managing Repositories

# Configure Git tags to organize the source control repository

Git tags serve as fixed points—or landmarks—in your commit history, helping you mark version releases and other significant milestones. By leveraging tags, you can easily reference builds, rollback to stable states, and integrate seamlessly with CI/CD pipelines in Azure Repos or any Git-based workflow.

![The image explains the role of Git tags, showing them as landmarks for important commits, typically used for version releases or highlighting significant changes. It includes a visual with a Git logo and version numbers V01 to V04.](https://kodekloud.com/kk-media/image/upload/v1752867508/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Configure-Git-tags-to-organize-the-source-control-repository/git-tags-role-version-landmarks-diagram.jpg)

## Why use Git tags?

- Create immutable release points for reproducibility
- Simplify collaboration by referencing a specific state of the code
- Automate deployments by targeting a tag in your pipeline

## Types of Git tags

| Tag Type    | Description                                    | Typical Use Case          |
| ----------- | ---------------------------------------------- | ------------------------- |
| Lightweight | A simple ref to a commit                       | Quick local markers       |
| Annotated   | A full Git object (message, author, timestamp) | Official release versions |

> [!important]
> **Note**
>
> Annotated tags include metadata—such as the tagger’s name, date, and a descriptive message—making them ideal for public releases.

## Creating tags

```
# Create a lightweight tag pointing to HEAD
git tag v2.0


# Create an annotated tag with a message
git tag -a v2.1 -m "Release 2.1: Added performance improvements"
```

## Listing all tags

```
# Display all tags sorted alphabetically
git tag
```

## Pushing tags to remote

```
# Push a specific tag to origin
git push origin v2.0


# Push all local tags at once
git push origin --tags
```

> [!important]
> **Warning**
>
> Avoid force-pushing or rewriting existing tags, as this can lead to inconsistencies in collaborators’ repositories.

## Checking out a tag

To view or revert to a tagged commit:

```
git checkout v2.0
```

This puts your working directory in “detached HEAD” state. To make changes, create a new branch:

```
git checkout -b hotfix/v2.0-patch
```

## Sorting tags by semantic version

```
git tag --sort=v:refname
```

This ensures `v1.10` appears after `v1.2`.

## Integrating Git tags with Azure Repos

Tags pushed to Azure Repos can trigger build and release pipelines. For step-by-step guidance, see [Git version control in Azure Repos](https://docs.microsoft.com/azure/devops/repos/git/version-control-overview).

---

## Links and References

- [Git Tagging Documentation](https://git-scm.com/book/en/v2/Git-Basics-Tagging)
- [Git Basics: Tagging](https://git-scm.com/book/en/v2/Git-Basics-Tagging)
- [Version control with Git in Azure Repos](https://docs.microsoft.com/azure/devops/repos/git/version-control-overview)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/e7d3282b-80bc-4acd-8009-2fcf5dee0c86/lesson/aa5cc79d-807b-457a-902b-b6d82983b569)**
>
> Watch video content
