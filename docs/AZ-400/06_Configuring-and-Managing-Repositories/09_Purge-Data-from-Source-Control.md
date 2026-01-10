# Purge Data from Source Control - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Configuring-and-Managing-Repositories/Purge-Data-from-Source-Control)

---

## Table of Contents

- Purge Data from Source Control
  - What Is Purging?
  - Why Purge Files?
  - Repository Cleanup Tools
  - Practical Examples
  - Final Steps
  - Links and References
  - Watch Video
    - 1. Deleting Large or Unwanted Files
    - 2. Removing Sensitive Content

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Configuring and Managing Repositories

# Purge Data from Source Control

Purging data from source control is essential for maintaining a clean, efficient, and secure codebase. In this guide, we’ll define purging in the context of Git repositories, explain why it matters, compare the top tools, and walk through hands-on examples.

## What Is Purging?

Purging a repository means removing unwanted or sensitive files from its commit history. This process helps you:

- Reclaim disk space
- Eliminate accidental commits
- Protect secrets from exposure

![The image shows a stack of documents with a magnifying glass, symbolizing examination or review. Below, there's text explaining "Purging" as the process of cleaning up a codebase by removing unnecessary or sensitive files.](https://kodekloud.com/kk-media/image/upload/v1752867520/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Purge-Data-from-Source-Control/documents-magnifying-glass-purging-review.jpg)

## Why Purge Files?

By cleaning up your Git history, you can:

- **Optimize Performance:** Smaller repos clone and checkout faster.
- **Eliminate Mistakes:** Remove large or accidental commits.
- **Protect Secrets:** Expunge API keys, passwords, and other sensitive data.

![The image lists three reasons for purging files: shrinking repository size for performance, eliminating mistakenly committed large files, and removing files with sensitive information like passwords or API keys.](https://kodekloud.com/kk-media/image/upload/v1752867521/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Purge-Data-from-Source-Control/purging-files-reasons-repository-size.jpg)

> [!important]
> **Note**
>
> Always back up your repository before rewriting history. Purging is irreversible.

## Repository Cleanup Tools

Here’s a quick comparison of the two leading Git history-rewriting tools:

| Tool             | Use Case                                     | Documentation                                                  |
| ---------------- | -------------------------------------------- | -------------------------------------------------------------- |
| Git filter-repo  | Official, highly configurable, fine-grained  | [Git filter-repo](https://github.com/newren/git-filter-repo)   |
| BFG Repo-Cleaner | Fast, simple syntax for common cleanup tasks | [BFG Repo-Cleaner](https://rtyley.github.io/bfg-repo-cleaner/) |

![The image lists two tools for repository cleanup: "Git filter-repo" and "BFG Repo-Cleaner," with brief descriptions of each.](https://kodekloud.com/kk-media/image/upload/v1752867522/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Purge-Data-from-Source-Control/repository-cleanup-tools-git-bfg.jpg)

## Practical Examples

### 1\. Deleting Large or Unwanted Files

Remove a file named `archive.tar.gz`:

```
# Using BFG Repo-Cleaner:
bfg --delete-files archive.tar.gz


# Or with Git filter-repo:
git filter-repo --path archive.tar.gz --invert-paths
```

### 2\. Removing Sensitive Content

First, list sensitive patterns in `passwords.txt` (one per line):

```
PASSWORD
API_KEY
```

Then run:

```
# Using BFG Repo-Cleaner:
bfg --replace-text passwords.txt


# Or with Git filter-repo:
git filter-repo --replace-text passwords.txt
```

> [!important]
> **Warning**
>
> Force-pushing rewritten history will overwrite the remote. Coordinate with your team to avoid conflicts.

## Final Steps

After rewriting history, complete these actions:

1.  **Force-push the cleaned history**

    ```
    git push --force
    ```

2.  **Notify your team** to reclone or reset their local copies:

    ```
    git fetch --all
    git reset --hard origin/main
    ```

> [!important]
> **Note**
>
> Ensure everyone is on the same page to prevent divergent histories.

## Links and References

- [Git filter-repo Documentation](https://github.com/newren/git-filter-repo)
- [BFG Repo-Cleaner Homepage](https://rtyley.github.io/bfg-repo-cleaner/)
- [Git Tools – Rewriting History](https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/e7d3282b-80bc-4acd-8009-2fcf5dee0c86/lesson/943bcd6f-88f2-40b8-b367-dd47615b7726)**
>
> Watch video content
