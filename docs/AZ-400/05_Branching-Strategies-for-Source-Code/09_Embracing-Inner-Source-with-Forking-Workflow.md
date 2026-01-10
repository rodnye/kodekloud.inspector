# Embracing Inner Source with Forking Workflow - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Branching-Strategies-for-Source-Code/Embracing-Inner-Source-with-Forking-Workflow)

---

## Table of Contents

- Embracing Inner Source with Forking Workflow
  - 1. Empower Every Contributor
  - 2. Apply Open Source Practices Internally
  - 3. Scale for Large Teams
  - Watch Video

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Branching Strategies for Source Code

# Embracing Inner Source with Forking Workflow

Bringing open-source collaboration into your enterprise accelerates innovation while maintaining internal control. In this guide, we’ll explore how to implement an InnerSource strategy using a fork-and-pull workflow.

## 1\. Empower Every Contributor

A fork-based pull request model democratizes code contributions. Whether you’re a core maintainer or a first-time contributor, the process is the same:

1.  Fork the main repository:

    ```
    gh repo fork your-org/awesome-project --clone=true
    ```

2.  Create a feature branch in your fork:

    ```
    git checkout -b feature/your-improvement
    ```

3.  Implement your changes and commit:

    ```
    git add .
    git commit -m "Describe your change"
    ```

4.  Open a pull request against the upstream repository:

    ```
    gh pr create --base main --head your-username:feature/your-improvement
    ```

> [!important]
> **Note**
>
> This inclusive workflow ensures everyone—from designers to QA engineers—can propose enhancements, boosting visibility and idea diversity.

## 2\. Apply Open Source Practices Internally

Mirror familiar OSS patterns to build trust and streamline approvals without exposing proprietary code:

- **Code Reviews**: Peer review enforces quality and shared ownership.
- **Version Control**: Leverage Git branching strategies to track features and hotfixes.
- **Continuous Integration**: Automate builds and tests on every pull request.

> [!important]
> **Warning**
>
> Maintain strict access controls and branch protection rules to keep your internal codebase secure.

## 3\. Scale for Large Teams

A fork-driven model naturally accommodates different engagement levels. Teams and contributors can specialize without stepping on each other’s toes:

| Role                    | Responsibilities                              | Best Practices                          |
| ----------------------- | --------------------------------------------- | --------------------------------------- |
| Core Maintainers        | Define roadmap, review PRs, enforce standards | Protected branches, release checklists  |
| Regular Contributors    | Deliver new features, address review feedback | Issue templates, CI/CD pipelines        |
| Occasional Contributors | Submit minor fixes, update docs               | PR templates, clear contribution guides |

By assigning clear roles and leveraging pull-request approvals, you maintain governance while tapping into collective expertise.

---

Next, we’ll dive into the step-by-step implementation of the fork workflow, including CI integration and automation.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/8e033a7f-4740-4d37-9f97-54ebc9c54fd1/lesson/e3c5647f-d3ed-4c86-98a0-01a693a93db1)**
>
> Watch video content
