# What is source control - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Work-with-Azure-Repos-and-GitHub/What-is-source-control)

---

## Table of Contents

- What is source control
  - The Role of Source Control in Team Collaboration
  - Capturing Project History
  - Benefits of Source Control
  - Best Practices for Source Control
  - Links and References
  - Watch Video

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Work with Azure Repos and GitHub

# What is source control

Source control (or version control) is the backbone of modern DevOps and software engineering. By tracking every change to your codebase, source control enables teams to collaborate, maintain history, and automate delivery pipelines. In Azure DevOps, you can implement Git repositories or Team Foundation Version Control (TFVC) to manage your source and integrate seamlessly with CI/CD, work items, and more.

## The Role of Source Control in Team Collaboration

When multiple developers work on the same project, source control systems:

- Track who made changes and when
- Simplify merging concurrent edits
- Provide audit trails for accountability

![The image illustrates a collaborative coding process involving code modification and management, with four teams (A, B, C, D) represented by colored icons.](https://kodekloud.com/kk-media/image/upload/v1752868176/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-What-is-source-control/collaborative-coding-process-teams-icons.jpg)

In Azure DevOps, you can enforce branch policies, require pull requests, and set up code reviewers to ensure high-quality merges.

## Capturing Project History

Every commit in a source control system records a snapshot of your code at a specific point in time. This historical timeline allows you to:

- Revert to a previous stable state
- Compare changes across versions
- Diagnose when and where bugs were introduced

![The image shows a timeline of codebase snapshots with four versions, each marked at one-minute intervals from Version 01 to Version 04.](https://kodekloud.com/kk-media/image/upload/v1752868177/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-What-is-source-control/codebase-snapshots-timeline-versions.jpg)

> [!important]
> **Note**
>
> Use Azure DevOps’s `Revert` and `Cherry-pick` features to roll back or selectively apply commits without disrupting your main branch.

## Benefits of Source Control

Implementing a robust source control strategy yields the following advantages:

| Benefit                | Description                                                                                 |
| ---------------------- | ------------------------------------------------------------------------------------------- |
| Streamlined Workflow   | Define clear branching models and automated triggers for builds and tests.                  |
| Version Management     | Tag and branch releases to manage multiple product versions concurrently.                   |
| Enhanced Collaboration | Pull requests and reviews foster shared ownership and knowledge transfer.                   |
| Change Accountability  | Audit trails provide visibility into what changed, who changed it, and why.                 |
| Automated Tasks        | Hooks and pipelines can run linting, unit tests, and deployments on every push or PR merge. |

![The image illustrates a source control process flow, highlighting stages from version control to deployment and validation, with benefits like streamlined development and enhanced teamwork.](https://kodekloud.com/kk-media/image/upload/v1752868178/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-What-is-source-control/source-control-process-flow-diagram.jpg)

## Best Practices for Source Control

Follow these guidelines to keep your repository organized and maintainable:

1.  Incremental Commits  
    Commit small, self-contained changes frequently to simplify code reviews and troubleshooting.
2.  Exclude Personal Files  
    Use a `.gitignore` (or equivalent) to prevent local configs and secrets from entering the repo.
3.  Regularly Sync with Remote  
    Pull or fetch changes often to reduce the risk of complex merge conflicts.
4.  Pre-Push Quality Gates  
    Integrate linters, formatters, and unit tests into your pre-push or pre-commit hooks.
5.  Descriptive Commit Messages  
    Follow a pattern like `feat:` or `fix:` and clearly describe what and why.
6.  Link to Work Items  
    Reference Azure Boards tasks or bugs in your commits to improve traceability.
7.  Team-Agreed Conventions  
    Define and document branch naming—e.g., `feature/`, `release/`, `hotfix/`—and commit style guides.

![The image lists seven best practices for software development, including incremental updates, keeping personal files separate, and ensuring quality assurance pre-push. Each practice is presented in a colorful box with a number.](https://kodekloud.com/kk-media/image/upload/v1752868180/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-What-is-source-control/best-practices-software-development-list.jpg)

> [!important]
> **Warning**
>
> Neglecting to sync branches or enforce code reviews can lead to difficult-to-resolve merge conflicts and unstable builds.

---

## Links and References

- [Azure Repos Documentation](https://docs.microsoft.com/azure/devops/repos/)
- [Git Basics](https://git-scm.com/book/en/v2/Getting-Started-Git-Basics)
- [Continuous Integration with Azure Pipelines](https://docs.microsoft.com/azure/devops/pipelines/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/11f92647-aa61-4572-85b2-a96b279268f5/lesson/28ea90f7-55fa-41c0-9cf0-741141ff4260)**
>
> Watch video content
