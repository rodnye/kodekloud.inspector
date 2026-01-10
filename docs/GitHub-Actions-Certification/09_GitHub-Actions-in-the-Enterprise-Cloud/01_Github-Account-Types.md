# Github Account Types - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/GitHub-Actions-in-the-Enterprise-Cloud/Github-Account-Types)

---

## Table of Contents

- Github Account Types
  - Personal Accounts
  - Organization Accounts
  - Enterprise Accounts
  - GitHub Enterprise Offerings
  - References
  - Watch Video
    - GitHub Enterprise Cloud
    - GitHub Enterprise Server

---

## Content

GitHub Actions Certification

GitHub Actions in the Enterprise Cloud

# Github Account Types

In this guide, we’ll walk through GitHub’s three main account types—Personal, Organization, and Enterprise—and highlight their key features and use cases. Whether you’re an individual developer or managing a large enterprise, understanding these options will help you choose the right setup.

| Account Type | Primary Use Case           | Key Features                                               |
| ------------ | -------------------------- | ---------------------------------------------------------- |
| Personal     | Individual projects        | Unique username, unlimited public/private repos¹           |
| Organization | Team collaboration         | Shared repos, packages, team management                    |
| Enterprise   | Enterprise-wide governance | Centralized billing, policy enforcement, advanced security |

¹ Some private repository features require a paid plan.

## Personal Accounts

A **Personal Account** on GitHub.com is ideal for individual developers. Key benefits include:

- A unique username and customizable profile
- Unlimited public repositories and private repositories²
- Permissions to fork, contribute, and review code in other projects
- Activity history (commits, pull requests, issues) tracked under your user

² Advanced features for private repos (e.g., code owners, required reviews) may require a paid plan.

## Organization Accounts

Organization accounts are tailored for teams and collaborative projects. You manage resources through your Personal Account, but all assets belong to the organization:

- Repositories for code management
- Packages for container images and libraries
- Projects and teams for planning and permissions
- Centralized billing and audit logs

By joining multiple organizations, you can work across teams and projects seamlessly.

![The image describes three types of GitHub accounts: Personal, Organization, and Enterprise, with a focus on Organization Accounts, highlighting features like team suitability and shared resources.](https://kodekloud.com/kk-media/image/upload/v1752876246/notes-assets/images/GitHub-Actions-Certification-Github-Account-Types/github-accounts-personal-organization-enterprise.jpg)

## Enterprise Accounts

Enterprise accounts provide a unified framework for managing multiple Organization accounts under one umbrella:

- No repositories at the enterprise level—repos live in child organizations
- Centralized billing, access control, and policy enforcement
- Advanced security (SAML SSO, auditing, compliance) and custom integrations

![The image is a diagram showing different GitHub account types: Personal Accounts, Organization Accounts, and Enterprise Accounts, with a focus on the features of Enterprise Accounts.](https://kodekloud.com/kk-media/image/upload/v1752876247/notes-assets/images/GitHub-Actions-Certification-Github-Account-Types/github-account-types-diagram-enterprise-features.jpg)

## GitHub Enterprise Offerings

Enterprises can choose between a cloud-hosted solution or a self-managed server, depending on customization and control requirements.

### GitHub Enterprise Cloud

A fully hosted service on GitHub’s infrastructure, optimized for rapid adoption and managed scaling.

| Pros                                    | Cons                             |
| --------------------------------------- | -------------------------------- |
| Minimal setup—GitHub manages security.  | Limited server customization.    |
| Automatic scaling with subscription.    | Subscription-based pricing.      |
| Built-in compliance and audit features. | Data residency options may vary. |

![The image is a comparison of the pros and cons of GitHub Enterprise Cloud, highlighting easy setup, scalability, and security as pros, and limited customization and cost as cons.](https://kodekloud.com/kk-media/image/upload/v1752876248/notes-assets/images/GitHub-Actions-Certification-Github-Account-Types/github-enterprise-cloud-pros-cons-comparison.jpg)

### GitHub Enterprise Server

A self-hosted deployment you install and maintain on your own infrastructure.

| Pros                                         | Cons                                             |
| -------------------------------------------- | ------------------------------------------------ |
| Full control over configuration and updates. | Requires initial setup and ongoing maintenance.  |
| Integrates with existing security tools.     | Scaling demands additional hardware/cloud costs. |
| Data remains entirely within your network.   | Upfront licensing fees and compliance overhead.  |

![The image is a comparison of the pros and cons of GitHub Enterprise Server, highlighting full control and security as pros, and setup, scalability, cost, and compliance as cons.](https://kodekloud.com/kk-media/image/upload/v1752876249/notes-assets/images/GitHub-Actions-Certification-Github-Account-Types/github-enterprise-server-pros-cons-comparison.jpg)

> [!important]
> **Warning**
>
> Self-hosting GitHub Enterprise Server requires dedicated DevOps resources for patching, backups, and compliance.

---

In hands-on labs and trials, we’ll use a GitHub Enterprise Cloud account to demonstrate centralized policy and billing management.

## References

- [GitHub Documentation](https://docs.github.com/)
- [GitHub Enterprise Cloud](https://docs.github.com/en/enterprise-cloud)
- [GitHub Enterprise Server](https://docs.github.com/en/enterprise-server)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/9b181319-216b-42b5-8069-9d56650f2d53/lesson/ccb73e3a-cf9c-4c5a-85e9-3603e2668d6b)**
>
> Watch video content
