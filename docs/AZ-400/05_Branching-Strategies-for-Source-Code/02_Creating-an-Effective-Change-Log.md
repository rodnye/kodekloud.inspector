# Creating an Effective Change Log - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Branching-Strategies-for-Source-Code/Creating-an-Effective-Change-Log)

---

## Table of Contents

- Creating an Effective Change Log
  - 1. Key Principles for a Maintainable Changelog
  - 2. Changelog Generation Strategies
  - 3. Essential Tools to Assist
  - Links and References
  - Watch Video
    - 1.1 Clarity Over Quantity
    - 3.1 Practical Example: Customizing git log Output

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Branching Strategies for Source Code

# Creating an Effective Change Log

An up-to-date changelog is essential for tracking a project’s evolution, communicating new features, fixes, and deprecations. By following best practices, you ensure that contributors, stakeholders, and end users can quickly understand what’s changed between releases.

![The image outlines the purpose of a change log, highlighting three key aspects: addition of new features, modifications to existing features, and deletion of outdated features.](https://kodekloud.com/kk-media/image/upload/v1752867339/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Creating-an-Effective-Change-Log/change-log-purpose-new-features-modifications.jpg)

## 1\. Key Principles for a Maintainable Changelog

### 1.1 Clarity Over Quantity

Focus on concise, relevant entries. Avoid verbose descriptions—each item should add clear value so readers can scan updates efficiently.

> [!important]
> **Note**
>
> A streamlined changelog encourages adoption and reduces confusion. Keep each bullet to one idea and link to detailed issues or PRs when needed.

## 2\. Changelog Generation Strategies

Choose an approach that fits your team’s workflow and project size. Below is a comparison of the three most common methods:

| Strategy             | Pros                               | Cons                              | Example Tool                                          |
| -------------------- | ---------------------------------- | --------------------------------- | ----------------------------------------------------- |
| Manual entries       | High accuracy, contextual comments | Time-consuming, error-prone       | —                                                     |
| Automated population | Fast, consistent format            | May lack semantic grouping        | [GitHub Actions](https://github.com/features/actions) |
| Hybrid method        | Best of both worlds                | Requires setup and review process | Custom scripts + manual review                        |

![The image outlines three strategies for change log generation: manual entries for clarity, automated population for efficiency, and hybrid methods combining automation with oversight.](https://kodekloud.com/kk-media/image/upload/v1752867340/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Creating-an-Effective-Change-Log/change-log-generation-strategies-outline.jpg)

## 3\. Essential Tools to Assist

There are several popular utilities designed to simplify changelog maintenance:

| Tool                         | Description                                    | Link                                                    |
| ---------------------------- | ---------------------------------------------- | ------------------------------------------------------- |
| Standard `git log`           | Base command-line history export               | —                                                       |
| `gitchangelog`               | Generates Markdown from git history            | https://github.com/vaab/gitchangelog                    |
| `github_changelog_generator` | Produces GitHub-style changelogs automatically | https://github.com/skywinder/github-changelog-generator |

![The image is a slide titled "Tools to Assist," featuring two numbered sections: one about using the standard git log for command-line entries, and another about using `gitchangelog` and `github_changelog_generator` for automated solutions.](https://kodekloud.com/kk-media/image/upload/v1752867341/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Creating-an-Effective-Change-Log/tools-to-assist-git-log-automation.jpg)

### 3.1 Practical Example: Customizing `git log` Output

Below is a sample Bash command to extract commits between two tags, format the output, and save it as a Markdown file:

```
git log --pretty=format:"%h - %s (%an, %ar)" \
  v1.2.0..v1.3.0 \
  | script-to-format-changelog \
  > projectchangelogs/1.3.0.md
```

- `--pretty=format:"%h - %s (%an, %ar)"`
  - `%h` : abbreviated commit hash
  - `%s` : commit message
  - `%an`: author name
  - `%ar`: author date, relative
- `v1.2.0..v1.3.0` specifies the tag range to compare
- `script-to-format-changelog` represents your custom formatting script
- Redirect output into `projectchangelogs/1.3.0.md` for Markdown storage

> [!important]
> **Warning**
>
> Be mindful of exposing sensitive or internal details in public changelogs. Always review entries before publishing.

## Links and References

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Keep a Changelog](https://keepachangelog.com/)
- [Git Documentation – git log](https://git-scm.com/docs/git-log)
- [GitHub Actions](https://github.com/features/actions)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/8e033a7f-4740-4d37-9f97-54ebc9c54fd1/lesson/f2fe8fb3-27fa-423e-97cd-8b74ccfa07b9)**
>
> Watch video content
