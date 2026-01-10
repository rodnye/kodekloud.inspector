# Diving Into Types of Branch Workflows - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Branching-Strategies-for-Source-Code/Diving-Into-Types-of-Branch-Workflows)

---

## Table of Contents

- Diving Into Types of Branch Workflows
  - Dedicated Feature Branches
  - Forking Model
  - Key Evaluation Factors
  - Feature Branch Workflow
  - GitHub Flow
  - Fork Workflow
  - Links and References
  - Watch Video

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Branching Strategies for Source Code

# Diving Into Types of Branch Workflows

Maintaining a clear branching strategy is crucial for code quality, streamlined collaboration, and faster delivery cycles. In this guide, we’ll cover:

- Dedicated Feature Branches
- Forking Model
- Key Evaluation Factors
- Feature Branch Workflow
- GitHub Flow
- Fork Workflow

---

## Dedicated Feature Branches

Dedicated feature branches isolate new work from your main line of development. Each feature gets its own branch, ensuring:

- Independent progress without blocking others
- Cleaner history when merging completed features
- Reduced risk of unstable code in the main branch

![The image is a diagram illustrating dedicated feature branches in a version control system, showing a main branch with two feature branches labeled "Little Feature" and "Big Feature."](https://kodekloud.com/kk-media/image/upload/v1752867347/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Diving-Into-Types-of-Branch-Workflows/dedicated-feature-branches-version-control-diagram.jpg)

---

## Forking Model

The forking model gives each contributor a personal copy of the central repo. Work happens in the fork, then changes are proposed back via pull requests. Benefits include:

- Complete isolation of your changes
- No need for direct push permissions on the upstream repo
- A clear audit trail of contributions

![The image illustrates a forking model, showing a cloud-based repository with folders and documents, indicating a separation between "Other's" and "Yours" sections. It includes icons representing a forked repository and a local machine.](https://kodekloud.com/kk-media/image/upload/v1752867348/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Diving-Into-Types-of-Branch-Workflows/forking-model-cloud-repository-icons.jpg)

---

## Key Evaluation Factors

When selecting a branching workflow, weigh these core factors:

| Factor           | What to Consider                                                      |
| ---------------- | --------------------------------------------------------------------- |
| Scalability      | Can the model support growing teams and multiple concurrent features? |
| Error Correction | How straightforward is it to roll back or revert problematic changes? |
| Cognitive Load   | Does the workflow minimize context switching and complexity?          |

---

## Feature Branch Workflow

A **structured** approach to developing and integrating features:

1.  **Create a Feature Branch**  
    Name it clearly: `feature/<feature-name>`
2.  **Commit Frequently**  
    Small, descriptive commits help with code review and history.
3.  **Open a Pull Request**  
    Target the main or develop branch once your feature is functionally complete.
4.  **Collaborate & Review**  
    Discuss changes in the PR, request feedback, and address comments.
5.  **Deploy for Testing**  
    Push to a staging or QA environment to validate end-to-end.
6.  **Merge & Cleanup**  
    Merge after passing CI checks and reviews, then delete the feature branch.

> [!important]
> **Note**
>
> Use descriptive branch names (e.g., `feature/user-auth`) and follow your team’s prefix conventions (`feature/`, `bugfix/`, `hotfix/`).

![The image illustrates a "Feature Branch Workflow" with six steps: Branch Creation, Committing Work, Pull Request Initiation, Code Discussion, Code Deployment, and Integration/Merge. Each step includes a brief description of the process involved.](https://kodekloud.com/kk-media/image/upload/v1752867350/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Diving-Into-Types-of-Branch-Workflows/feature-branch-workflow-six-steps.jpg)

---

## GitHub Flow

GitHub Flow is a lightweight, branch-based workflow optimized for continuous delivery:

1.  Create a short-lived branch from `main`.
2.  Make your changes and commit often.
3.  Push the branch to GitHub.
4.  Open a pull request and request reviews.
5.  Merge to `main` when checks and reviews pass.
6.  Delete the branch after merging.

This flow emphasizes rapid feedback and always-deployable code.

![The image illustrates the GitHub Flow Process in six steps: create a new branch, make changes, initiate a pull request, collaborate, merge the pull request, and delete the branch.](https://kodekloud.com/kk-media/image/upload/v1752867351/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Diving-Into-Types-of-Branch-Workflows/github-flow-process-six-steps.jpg)

---

## Fork Workflow

Common in open-source, the fork workflow keeps the central repository protected while enabling external contributions:

1.  **Fork** the upstream repository to your account.
2.  **Clone** your fork locally.
3.  **Create** a topic branch for your work.
4.  **Commit** changes and **push** to your fork.
5.  **Open a Pull Request** from your fork’s branch into the upstream repo.

> [!important]
> **Warning**
>
> Always sync your fork with the upstream `main` branch before starting new work to avoid merge conflicts.

![The image illustrates a fork workflow in version control, showing the process of forking, cloning, editing, and pushing changes in a repository. It highlights the concepts of personal repository space, dual repository setup, and its common use in open-source projects.](https://kodekloud.com/kk-media/image/upload/v1752867352/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Diving-Into-Types-of-Branch-Workflows/fork-workflow-version-control-diagram.jpg)

---

## Links and References

- [Git Branching Strategies](https://git-scm.com/book/en/v2/Git-Branching-Branching-Workflows)
- [GitHub Flow Documentation](https://guides.github.com/introduction/flow/)
- [Atlassian Git Workflows](https://www.atlassian.com/git/tutorials/comparing-workflows)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/8e033a7f-4740-4d37-9f97-54ebc9c54fd1/lesson/4c53b545-d2b4-46a1-9810-bdbb467310db)**
>
> Watch video content
