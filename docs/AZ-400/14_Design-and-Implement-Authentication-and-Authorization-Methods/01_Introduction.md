# Introduction - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Design-and-Implement-Authentication-and-Authorization-Methods/Introduction)

---

## Table of Contents

- Introduction
  - 1. Identity Management in Azure
  - 2. Implementing and Managing GitHub Authentication
  - 3. Authentication in Azure DevOps
  - 4. Configuring Projects, Teams, and Work Item Management in Azure DevOps
  - Watch Video
    - Key Concepts
    - Comparison Table
    - Security Best Practices
    - Authentication Options
    - GitHub Apps Flow
    - Authentication Methods Comparison
    - Security Best Practices
    - When to Use Each
    - Security Controls
    - Project & Team Setup
    - Work Item Management

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Design and Implement Authentication and Authorization Methods

# Introduction

In this lesson, we’ll explore how to design and implement robust authentication and authorization strategies across Azure DevOps and GitHub. By the end, you’ll understand identity management in Azure, how to authenticate in GitHub and Azure DevOps, and how to configure projects and teams in Azure DevOps for secure, efficient workflows.

Our lesson is organized into four sections:

1.  Identity Management in Azure
2.  Implementing and Managing GitHub Authentication
3.  Authentication in Azure DevOps
4.  Configuring Projects, Teams, and Work Item Management in Azure DevOps

---

## 1\. Identity Management in Azure

Azure provides two primary identity solutions for non-user access: **service principals** and **managed identities**. Understanding their differences and best practices will help you secure your cloud resources effectively.

### Key Concepts

- Service Principal  
  – An identity you create in Azure AD for use with apps, services, and automation tools.
- Managed Identity  
  – A first-party Azure AD identity automatically managed by Azure for Azure resources.

### Comparison Table

| Feature               | Service Principal                             | Managed Identity                                  |
| --------------------- | --------------------------------------------- | ------------------------------------------------- |
| Creation              | Manual via Azure CLI/PowerShell/Portal        | Automated when you enable it on an Azure resource |
| Credential Management | You supply and rotate secrets or certificates | Azure handles credential rotation                 |
| Scope                 | Broad – can access multiple subscriptions     | Tied to a single resource or resource group       |
| Use Cases             | CI/CD pipelines, cross-tenant automation      | Secure access from VMs, Functions, App Services   |

> [!important]
> **Note**
>
> Use managed identities wherever possible to eliminate secret management. Reserve service principals for scenarios requiring cross-tenant or custom-role access.

### Security Best Practices

- Assign least-privilege roles.
- Rotate credentials regularly (for service principals).
- Audit sign-in logs in **Azure Active Directory**:  
  [Azure AD Sign-ins](https://docs.microsoft.com/azure/active-directory/reports-monitoring/concept-sign-ins).

---

## 2\. Implementing and Managing GitHub Authentication

![The image is a presentation slide titled "Implementing and Managing GitHub Authentication" with a GitHub logo and a gear icon on a blue gradient background.](https://kodekloud.com/kk-media/image/upload/v1752867597/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Introduction/github-authentication-management-presentation.jpg)

In this section, we’ll review GitHub’s authentication mechanisms and how to manage them in your workflows.

### Authentication Options

- **GitHub Apps**: Fine-grained permissions and installation-based auth.
- **GITHUB_TOKEN**: Auto-generated token scoped to Actions.
- **Personal Access Tokens (PATs)**: User-generated, customizable scopes.

![The image is a list of topics titled "Areas to be Covered," including GitHub authentication, GitHub apps, authenticating with a GitHub app, and managing GitHub app permissions.](https://kodekloud.com/kk-media/image/upload/v1752867599/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Introduction/areas-to-be-covered-github-topics.jpg)

### GitHub Apps Flow

1.  Register your GitHub App under **Settings > Developer settings**.
2.  Generate a private key and install the app on repositories or organizations.
3.  Exchange installation ID for an installation access token.

### Authentication Methods Comparison

| Method          | Scope                            | Rotation       | Use Case                       |
| --------------- | -------------------------------- | -------------- | ------------------------------ |
| GITHUB\\\_TOKEN | Repo-scoped, auto-generated      | Automatic      | CI jobs in GitHub Actions      |
| PAT             | User-scoped, configurable scopes | Manual         | Local scripts, external CI/CD  |
| GitHub App      | Granular, installation-level     | Rotate via API | Third-party integrations, bots |

> [!important]
> **Warning**
>
> Personal Access Tokens expire by default. Always set reminders to renew or automate rotation via the [GitHub REST API](https://docs.github.com/rest/overview/resources-in-the-rest-api#authentication).

### Security Best Practices

- Grant only necessary scopes to tokens.
- Use short-lived tokens for automation.
- Monitor token usage via **Audit Log**:  
  [GitHub Audit Log](https://docs.github.com/enterprise-cloud@latest/admin/monitoring-activity-around-your-enterprise/reviewing-the-audit-log).

---

## 3\. Authentication in Azure DevOps

![The image features a title about implementing and managing Azure DevOps service connections and personal access tokens, alongside the Azure logo on a blue gradient background.](https://kodekloud.com/kk-media/image/upload/v1752867600/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Introduction/azure-devops-service-connections-tokens.jpg)

Azure DevOps supports two main non-user authentication patterns:

- **Service Connections** — managed endpoints for Azure, AWS, Docker, and more.
- **Personal Access Tokens (PATs)** — scoped tokens tied to a user identity.

### When to Use Each

| Option             | Scope                                    | Management                      | Best For                             |
| ------------------ | ---------------------------------------- | ------------------------------- | ------------------------------------ |
| Service Connection | Project-level, integrates with pipelines | Centralized in project settings | Linking pipelines to cloud services  |
| Azure DevOps PAT   | User-level, configurable scopes          | User rotates manually           | Local Git operations, REST API calls |

> [!important]
> **Note**
>
> Rotate Azure DevOps PATs at least every 90 days and restrict scope to only what’s necessary.

### Security Controls

- Use Azure Key Vault to store secrets:  
  [Azure Key Vault with Azure DevOps](https://docs.microsoft.com/azure/devops/pipelines/library/secure-variables).
- Limit access by assigning Azure DevOps **security groups** minimal permissions.

---

## 4\. Configuring Projects, Teams, and Work Item Management in Azure DevOps

![The image is a presentation slide titled "Configuring Projects and Teams in Azure DevOps," featuring the Azure DevOps logo and icons of a gear and people on a blue gradient background.](https://kodekloud.com/kk-media/image/upload/v1752867601/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Introduction/configuring-projects-teams-azure-devops.jpg)

Effective project and team setup streamlines collaboration and traceability.

### Project & Team Setup

1.  Create an **Azure DevOps Project** with the appropriate visibility (public/private).
2.  Define **Teams** and assign areas & iterations.
3.  Configure **Security Groups** and **Permissions** for repos, pipelines, and work items.

### Work Item Management

- **Work Item Types**: Epic, Feature, User Story, Bug, Task.
- **Backlogs & Boards**: Customize columns and swimlanes.
- **Sprints & Iterations**: Set sprint length, capacity, and goals.

| Work Item Type | Purpose                         | Example                                          |
| -------------- | ------------------------------- | ------------------------------------------------ |
| Epic           | Large initiative                | “Migrate Monolith to Microservices”              |
| Feature        | A distinct product capability   | “Add OAuth2 support”                             |
| User Story     | Customer-centric requirement    | “As a user, I want to reset password via email.” |
| Bug            | Defect tracking                 | “Fix login redirect issue”                       |
| Task           | Development or testing activity | “Write unit tests for AuthService”               |

> [!important]
> **Note**
>
> Align sprints and iterations with your team’s delivery cadence. Use capacity planning to avoid overcommitment.

---

Let’s get started with **Identity Management in Azure**!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/6dcff123-ec53-4c16-b939-97d0b60183e2/lesson/787bb48d-11e6-4ec0-a2b4-0f21d27a8105)**
>
> Watch video content
