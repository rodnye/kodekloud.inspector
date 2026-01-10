# Types of source control systems - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Work-with-Azure-Repos-and-GitHub/Types-of-source-control-systems)

---

## Table of Contents

- Types of source control systems
  - Centralized Source Control
  - Distributed Source Control
  - Git vs. Team Foundation Version Control (TFVC)
  - Reasons to Select Git for Source Control
  - Common Objections to Using Git
  - Links and References
  - Watch Video
    - Examples of Centralized Systems
    - When to Choose Centralized Control
    - Ideal Use Cases for Distributed Control

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Work with Azure Repos and GitHub

# Types of source control systems

In this lesson, we’ll explore the two main models of source control: centralized and distributed. Understanding their architectures, advantages, and use cases will help you choose the right system for your projects.

---

## Centralized Source Control

In a centralized model, a single repository acts as the authoritative source for all code changes. Developers commit directly to this central hub.

![The image illustrates a concept of centralized source control with a server repository depicted as a cylinder.](https://kodekloud.com/kk-media/image/upload/v1752868158/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Types-of-source-control-systems/centralized-source-control-server-repository.jpg)

### Examples of Centralized Systems

![The image lists examples of centralized source control systems: Team Foundation Version Control (TFVC), Concurrent Versions System (CVS), Apache Subversion (SVN), and Perforce Helix Core.](https://kodekloud.com/kk-media/image/upload/v1752868160/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Types-of-source-control-systems/centralized-source-control-systems-examples.jpg)

Common advantages:

- **Scalability**: Handles large codebases efficiently.
- **Access Management**: Fine-grained permission controls.
- **Usage Oversight**: Tracks who made which changes and when.
- **Exclusive Control**: File locking prevents conflicting edits.

![The image outlines the advantages of centralized source control, highlighting scalability, access management, and usage oversight.](https://kodekloud.com/kk-media/image/upload/v1752868160/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Types-of-source-control-systems/centralized-source-control-advantages-outline.jpg)

### When to Choose Centralized Control

- Large, monolithic codebases requiring consistent structure
- Projects needing detailed audit trails and permission scopes
- File types that are difficult to merge concurrently

---

## Distributed Source Control

Each developer has a full local copy of the repository, including its entire history. This architecture boosts autonomy, redundancy, and offline work.

![The image illustrates a distributed source control system, showing interactions between a central server repository and two systems (A and B) with pull, push, commit, and replace actions.](https://kodekloud.com/kk-media/image/upload/v1752868162/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Types-of-source-control-systems/distributed-source-control-system-diagram.jpg)

The most popular distributed systems are Git and Mercurial:

![The image lists examples of distributed source control systems: Git and Mercurial.](https://kodekloud.com/kk-media/image/upload/v1752868162/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Types-of-source-control-systems/distributed-source-control-systems-git-mercurial.jpg)

> [!important]
> **Note**
>
> You get full history access even when offline, making code reviews and commits possible without an internet connection.

**Key Strengths**:

- **Cross-Platform Flexibility**: Runs on Windows, macOS, and Linux.
- **Community-Driven Reviews**: Pull requests streamline collaboration.
- **Offline Functionality**: Full commit, diff, and log capabilities without network access.
- **Complete History in Every Clone**: Every contributor has a backup of the repository.
- **Wide Adoption**: The de facto choice for open-source development.

![The image lists the key strengths of distributed source control, including flexibility, community-centric development, offline functionality, history tracking, and growing popularity. Each strength is highlighted in a colorful box with an icon.](https://kodekloud.com/kk-media/image/upload/v1752868164/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Types-of-source-control-systems/distributed-source-control-strengths-list.jpg)

### Ideal Use Cases for Distributed Control

- Modular or microservice-based codebases
- Open source projects with many external contributors
- Teams spread across different regions
- Cross-platform development environments

![The image outlines ideal applications for distributed source control, highlighting its efficiency for compact codebases, open-source projects, remote collaboration, and cross-platform development.](https://kodekloud.com/kk-media/image/upload/v1752868165/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Types-of-source-control-systems/distributed-source-control-applications-outline.jpg)

---

## Git vs. Team Foundation Version Control (TFVC)

| Feature                | Git (Distributed)                                    | TFVC (Centralized)                                          |
| ---------------------- | ---------------------------------------------------- | ----------------------------------------------------------- |
| Repository Model       | Each developer has a full clone locally              | Single central repository; local workspace for latest code  |
| Offline Operations     | Full commit, branch, and history access at all times | Limited to local workspace edits; must check out changes    |
| Branching & Merging    | Lightweight branches, easy merges                    | Heavyweight branching, file locking for conflict prevention |
| Collaboration Workflow | Pull requests, forks, social coding                  | Check-in policies, gated check-ins                          |

![The image compares Git and Team Foundation Version Control, highlighting Git as a decentralized system and Team Foundation as a centralized framework.](https://kodekloud.com/kk-media/image/upload/v1752868166/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Types-of-source-control-systems/git-vs-tfvc-comparison-decentralized-centralized.jpg)

---

## Reasons to Select Git for Source Control

1.  **Feature Branching**  
    Isolate new features in dedicated branches before merging.  
    ![The image lists reasons for selecting Git for source control, including branching for features, decentralized repositories, integration via pull requests, collaboration with the community, and feedback-driven releases. It also includes a diagram illustrating feature branching.](https://kodekloud.com/kk-media/image/upload/v1752868167/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Types-of-source-control-systems/git-source-control-reasons-diagram.jpg)
2.  **Full Autonomy**  
    Every developer holds a complete, self-contained repository.  
    ![The image is a slide titled "Selecting Git for Source Control – Reasons," listing benefits such as decentralized repositories and collaboration, with a diagram illustrating full repositories.](https://kodekloud.com/kk-media/image/upload/v1752868169/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Types-of-source-control-systems/selecting-git-source-control-benefits-diagram.jpg)
3.  **Pull Requests & Code Reviews**  
    Built-in workflows for peer review, discussion, and approval.  
    ![The image outlines reasons for selecting Git for source control, highlighting integration via pull requests with a diagram and brief explanations.](https://kodekloud.com/kk-media/image/upload/v1752868170/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Types-of-source-control-systems/git-source-control-pull-requests-diagram.jpg)
4.  **Community Collaboration**  
    Forks and pull requests simplify contributions from any developer.  
    ![The image is a slide titled "Selecting Git for Source Control – Reasons," highlighting five reasons, with "Collaboration With the Community" emphasized. It includes a diagram and notes on Git's collaborative benefits.](https://kodekloud.com/kk-media/image/upload/v1752868172/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Types-of-source-control-systems/selecting-git-source-control-reasons.jpg)
5.  **Continuous Integration & Rapid Feedback**  
    Seamless integration with CI/CD pipelines for faster release cycles.  
    ![The image outlines reasons for selecting Git for source control, including branching for features, decentralized repositories, integration via pull requests, collaboration with the community, and feedback-driven releases. It also highlights Git's role in enabling continuous integration and incorporating feedback into release cycles.](https://kodekloud.com/kk-media/image/upload/v1752868173/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Types-of-source-control-systems/git-source-control-reasons-diagram-2.jpg)

---

## Common Objections to Using Git

- **History Rewrites**: Mistakes in rebasing or force-push can alter commit history.
- **Large File Management**: Git isn’t optimized for big binaries; consider [Git LFS](https://git-lfs.github.com/).
- **Steep Learning Curve**: New users may need training to master branching strategies.

> [!important]
> **Warning**
>
> Improper use of `git reset` or `git rebase` can rewrite shared history—coordinate closely with your team.

![The image lists three objections to using Git: history management, handling of voluminous files, and educational investment.](https://kodekloud.com/kk-media/image/upload/v1752868174/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Types-of-source-control-systems/git-objections-history-management-voluminous-files.jpg)

---

## Links and References

- [Git Documentation](https://git-scm.com/docs)
- [GitHub Guides](https://guides.github.com/)
- [Mercurial Official Site](https://www.mercurial-scm.org/)
- [Azure DevOps Repos](https://docs.microsoft.com/azure/devops/repos/)
- [Git Large File Storage (LFS)](https://git-lfs.github.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/11f92647-aa61-4572-85b2-a96b279268f5/lesson/bd4f73b0-7e7a-4166-8a56-6b495b13d3e1)**
>
> Watch video content
