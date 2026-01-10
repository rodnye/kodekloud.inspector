# Demystifying Git Hooks - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Branching-Strategies-for-Source-Code/Demystifying-Git-Hooks)

---

## Table of Contents

- Demystifying Git Hooks
  - Why Use Git Hooks?
  - Client-Side vs. Server-Side Hooks
  - Hook Examples in Action
  - Git Hook Execution Sequence
  - Further Reading
  - Watch Video
    - Common Client-Side Hooks
    - Common Server-Side Hooks

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Branching Strategies for Source Code

# Demystifying Git Hooks

Git Hooks are powerful scripts that execute at predefined points in your Git workflow. By automating checks, enforcing standards, and triggering tasks, hooks help maintain code quality and streamline development.

![The image shows a list of Git hook sample files and a description explaining that Git hooks are customizable scripts that run at specific points in Git's workflow, acting like triggers.](https://kodekloud.com/kk-media/image/upload/v1752867342/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Demystifying-Git-Hooks/git-hooks-sample-files-description.jpg)

## Why Use Git Hooks?

Integrating Git Hooks into your workflow offers several advantages:

![The image is a presentation slide titled "Git Hooks – Purpose and Power," highlighting two points: "Prevent problems" and "Enforce standards."](https://kodekloud.com/kk-media/image/upload/v1752867343/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Demystifying-Git-Hooks/git-hooks-purpose-power-presentation.jpg)

- Prevent regressions by running linters or unit tests before committing code.
- Enforce commit message conventions to maintain a readable history.
- Automate builds, deployments, or notifications post-merge to accelerate delivery.

> [!important]
> **Note**
>
> Hooks reside in the `.git/hooks/` directory. Rename or link your custom scripts (e.g., `pre-commit`) to enable them.

## Client-Side vs. Server-Side Hooks

Client-side hooks run on a developer’s machine, catching issues early. Server-side hooks execute on the remote repository to enforce organization-wide policies.

![The image compares client-side hooks, which operate on a local machine to catch issues early, with server-side hooks, which act on the server for broader control.](https://kodekloud.com/kk-media/image/upload/v1752867345/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Demystifying-Git-Hooks/client-side-vs-server-side-hooks-comparison.jpg)

### Common Client-Side Hooks

| Hook               | When It Runs                      | Purpose                                              |
| ------------------ | --------------------------------- | ---------------------------------------------------- |
| pre-commit         | Before creating a commit          | Run linters, formatters, or unit tests               |
| prepare-commit-msg | Before editing the commit message | Populate templates or prepend metadata               |
| commit-msg         | After editing the commit message  | Enforce message style (e.g., Jira IDs, Conventional) |
| post-commit        | Immediately after a commit        | Trigger local notifications or analytics scripts     |
| pre-push           | Before pushing to remote          | Run integration tests or security scans              |

### Common Server-Side Hooks

| Hook         | When It Runs                  | Purpose                                                    |
| ------------ | ----------------------------- | ---------------------------------------------------------- |
| pre-receive  | Before any refs are updated   | Reject pushes that fail tests or violate policy            |
| update       | Per-ref check before updating | Enforce branch-specific rules                              |
| post-receive | After refs are updated        | Trigger CI/CD pipelines, notifications, or deployment jobs |

> [!important]
> **Warning**
>
> Server-side hooks require administrative access to the bare repository. Ensure you understand the impact before enabling these hooks.

## Hook Examples in Action

Think of hooks as quality gates and automation triggers:

- **pre-commit**: Blocks commits if linters fail
- **pre-push**: Runs full test suites to verify stability before sharing
- **pre-receive**: Stops forbidden changes from entering the central repo
- **post-merge**: Refreshes dependencies or runs smoke tests after merging

![The image explains Git hooks, describing them as tools for code quality control and defense against disruption, with examples like pre-commit, pre-push, pre-receive, and post-merge hooks.](https://kodekloud.com/kk-media/image/upload/v1752867346/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Demystifying-Git-Hooks/git-hooks-code-quality-control-explained.jpg)

## Git Hook Execution Sequence

Understanding the order of hooks during commit and push helps you design effective scripts:

- Client Side:
  1.  pre-commit
  2.  commit-msg
  3.  post-commit
  4.  pre-push
- Server Side:
  1.  pre-receive
  2.  update
  3.  post-receive

![The image is a flowchart illustrating Git hooks, showing the sequence of events on the client and server sides during a commit and push process. It includes stages like pre-commit, commit-msg, post-commit, pre-receive, update, and post-receive.](https://kodekloud.com/kk-media/image/upload/v1752867346/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Demystifying-Git-Hooks/git-hooks-flowchart-commit-push.jpg)

## Further Reading

- [Git Hooks Documentation](https://git-scm.com/docs/githooks)
- [Pro Git Book – Customizing Git](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)
- [Continuous Integration with Git Hooks](https://example.com/ci-git-hooks)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/8e033a7f-4740-4d37-9f97-54ebc9c54fd1/lesson/8a3bf109-0dc4-49e5-9183-4564b8712f7c)**
>
> Watch video content
