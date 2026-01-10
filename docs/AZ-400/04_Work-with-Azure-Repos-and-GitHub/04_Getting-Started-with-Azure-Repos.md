# Getting Started with Azure Repos - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Work-with-Azure-Repos-and-GitHub/Getting-Started-with-Azure-Repos)

---

## Table of Contents

- Getting Started with Azure Repos
  - Key Features of Azure Repos
  - Version Control Options
  - Getting Started
  - Links and References
  - Watch Video
    - 1. Git (Distributed Version Control)
    - 2. Team Foundation Version Control (TFVC)

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Work with Azure Repos and GitHub

# Getting Started with Azure Repos

Azure Repos is the source control component of Azure DevOps. It provides unlimited, cloud-hosted private Git repositories and supports Team Foundation Version Control (TFVC) for centralized version control. With Azure Repos, teams can collaborate on code, enforce quality with branch policies, and integrate seamlessly with popular IDEs and CI/CD pipelines.

## Key Features of Azure Repos

| Feature                         | Description                                                                                 |
| ------------------------------- | ------------------------------------------------------------------------------------------- |
| Development Environment Support | Works with Visual Studio, VS Code, Eclipse, IntelliJ, and any Git command-line client.      |
| Branch Security Policies        | Enforce required reviewers, build validations, merge strategies, and more before merge.     |
| Pull Requests                   | Create, review, and track pull requests with built-in discussion threads and status checks. |
| Code Search                     | Quickly search across your codebase for identifiers, comments, and text.                    |
| Audit and Compliance            | Track changes and view audit logs for branch policies and repository permissions.           |

> [!important]
> **Note**
>
> Azure Repos integrates natively with [Azure Pipelines](https://docs.microsoft.com/azure/devops/pipelines/) for continuous integration and delivery.

## Version Control Options

Azure Repos supports two models of version control. Choose the one that best fits your team’s workflow and project requirements.

| Model                                  | Characteristics                                                                                                           | Use Case                                       |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| Git (Distributed Version Control)      | \\- Local repository with full history<br>- Branching, pull requests, offline commits<br>- Fast merging and parallel work | Modern development, open source, microservices |
| Team Foundation Version Control (TFVC) | \\- Centralized server-side history<br>- Single-checkout model<br>- Fine-grained security at the file level               | Large monolithic codebases, legacy systems     |

### 1\. Git (Distributed Version Control)

- Each contributor clones a full copy of the repository history.
- Supports flexible branching strategies, pull requests, and offline commits.
- Ideal for agile teams and open-source projects.

### 2\. Team Foundation Version Control (TFVC)

- Central server holds the authoritative version history.
- Check out files for edit, then check in changes.
- Provides granular permissions down to individual files or folders.

> [!important]
> **Warning**
>
> Microsoft recommends using Git for most new projects. TFVC is primarily intended for legacy applications and large codebases that require centralized control.

## Getting Started

1.  Sign in to your Azure DevOps organization.
2.  Navigate to **Repos** in the project sidebar.
3.  Create a new repository (Git or TFVC).
4.  Clone the repository to your local machine:

    ```
    # Example for Git
    git clone https://dev.azure.com/{organization}/{project}/_git/{repo-name}
    ```

5.  Add, commit, and push your code:

    ```
    git add .
    git commit -m "Initial commit"
    git push origin main
    ```

## Links and References

- [Azure Repos Documentation](https://docs.microsoft.com/azure/devops/repos/)
- [Git Basics](https://git-scm.com/book/en/v2)
- [TFVC Guide](https://docs.microsoft.com/azure/devops/repos/tfvc/)
- [Azure DevOps Services](https://azure.microsoft.com/services/devops/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/11f92647-aa61-4572-85b2-a96b279268f5/lesson/f7e6956d-abc4-4e05-b5b9-05f6daa28108)**
>
> Watch video content
