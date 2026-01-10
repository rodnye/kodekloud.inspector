# Introduction to Terraform Cloud - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Terraform-Cloud/Introduction-to-Terraform-Cloud/Introduction-to-Terraform-Cloud)

---

## Table of Contents

- Introduction to Terraform Cloud
  - What Is Terraform Cloud?
  - Terraform “TACOS”
  - Why Extend Terraform Open Source?
  - Terraform Cloud Benefits
  - Terraform Cloud Pricing Tiers
  - Terraform Enterprise (Self-Managed)
  - Why Use Terraform Cloud?
  - Key Concepts
  - Impact on Existing Workflows
  - Next Steps: Sign Up for Terraform Cloud
  - References
  - Watch Video

---

## Content

HashiCorp : Terraform Cloud

Introduction to Terraform Cloud

# Introduction to Terraform Cloud

Explore how Terraform Cloud elevates your Infrastructure as Code (IaC) workflows. Learn why organizations adopt Terraform Cloud, its core features, and how it extends the capabilities of open-source Terraform.

I’m Gabe Maentz, HashiCorp Ambassador and Certified Terraform Instructor. I’ll guide you through getting started with Terraform Cloud.

## What Is Terraform Cloud?

Terraform Cloud is HashiCorp’s hosted SaaS platform that extends and enhances Terraform Open Source. It provides remote state management, policy enforcement, collaboration tools, and more—all without managing your own servers.

![The image is an informational graphic about HashiCorp Terraform Cloud, describing it as a hosted service that extends and enhances Terraform Open-Source.](https://kodekloud.com/kk-media/image/upload/v1752878741/notes-assets/images/HashiCorp-Terraform-Cloud-Introduction-to-Terraform-Cloud/hashicorp-terraform-cloud-infographic.jpg)

## Terraform “TACOS”

Often nicknamed **TACOS** (Terraform Automation & Collaboration Software), Terraform Cloud enables teams to adopt IaC at scale by automating runs, managing state centrally, and enforcing governance.

![The image features the acronym "TACOS" explained as "Terraform Automation & Collaboration Software" on a green chalkboard background, with the HashiCorp Terraform Cloud logo and two cartoon characters at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752878742/notes-assets/images/HashiCorp-Terraform-Cloud-Introduction-to-Terraform-Cloud/tacos-terraform-automation-chalkboard.jpg)

## Why Extend Terraform Open Source?

Terraform Open Source excels at defining infrastructure via HCL, supporting hundreds of providers, and offering a straightforward plan/apply workflow. However, as teams grow, you may encounter:

![The image compares Terraform Local with TFC, highlighting the benefits of Terraform such as being open source and easy to use, alongside its limitations like local state management and lack of role-based access.](https://kodekloud.com/kk-media/image/upload/v1752878743/notes-assets/images/HashiCorp-Terraform-Cloud-Introduction-to-Terraform-Cloud/terraform-local-vs-tfc-comparison.jpg)

- State file management challenges and collaboration risk
- Scattered sensitive data (API keys, secrets) in local configurations
- No built-in role-based access control (RBAC) for plan approvals
- Version drift across teams on different Terraform releases

As projects expand—multiple environments (Dev, Test, Staging, Prod), larger teams, and more resources—the need for centralized workflows becomes critical:

![The image illustrates ways a project grows, highlighting a larger team, more resources, and development stages (Dev, Test, Staging, Prod) with icons. It includes the HashiCorp Terraform Cloud logo.](https://kodekloud.com/kk-media/image/upload/v1752878744/notes-assets/images/HashiCorp-Terraform-Cloud-Introduction-to-Terraform-Cloud/project-growth-development-stages-terraform.jpg)

Without a managed platform, teams end up building and maintaining custom tools for state locking, approval gates, and compliance.

## Terraform Cloud Benefits

Terraform Cloud addresses these challenges with a unified SaaS offering. Its key benefits include:

![The image outlines the primary benefits of Terraform Cloud (TFC), highlighting organizations, teams & users, workspaces, and automation & orchestration. It includes icons and a logo in the top right corner.](https://kodekloud.com/kk-media/image/upload/v1752878745/notes-assets/images/HashiCorp-Terraform-Cloud-Introduction-to-Terraform-Cloud/terraform-cloud-benefits-outline.jpg)

- **Remote state storage** with encryption, versioning, and locking
- **Centralized plan/apply** runs with full run history
- **Private Module Registry** for reusable, versioned infrastructure modules
- **VCS Integrations** (GitHub, GitLab, Bitbucket) for GitOps workflows
- **REST API** for scripting and custom automation
- **Sentinel Policy as Code** for compliance and governance
- **Cost Estimation** on planned runs
- **Drift Detection** to surface out-of-band changes
- **Role-Based Access Control (RBAC)** for granular permissions
- **Ecosystem Integrations** (Kubernetes, ServiceNow, Splunk, and more)

![The image lists features and services of HashiCorp Terraform Cloud, including remote state data, VCS workflows, policy governance, cost estimation, drift detection, private registry, role-based access, and integrations. It also includes the Terraform logo and two illustrated characters at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752878747/notes-assets/images/HashiCorp-Terraform-Cloud-Introduction-to-Terraform-Cloud/terraform-cloud-features-services-list.jpg)

## Terraform Cloud Pricing Tiers

Terraform Cloud is available via subscription. Compare the plans to find the right fit:

| Tier                  | Key Features                                                                     | Users & Workspaces                  |
| --------------------- | -------------------------------------------------------------------------------- | ----------------------------------- |
| **Free**              | Remote state & operations, private Module Registry, VCS & API access             | Up to 5 users, unlimited workspaces |
| **Team**              | All Free features + Team management, granular roles & permissions                | Unlimited users & workspaces        |
| **Team & Governance** | All Team features + Sentinel, Cost Estimation, Run Tasks                         | Advanced policy and governance      |
| **Business**          | Audit logging, SSO/SAML, private agents, enhanced support, increased concurrency | Enterprise-scale deployments        |

![The image is a bar chart comparing Terraform Cloud plans, showing increasing features from Free to Business plans. It includes a logo and two cartoon characters at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752878748/notes-assets/images/HashiCorp-Terraform-Cloud-Introduction-to-Terraform-Cloud/terraform-cloud-plans-bar-chart.jpg)

> [!important]
> **Note**
>
> Use the Free tier to explore Terraform Cloud features for 30 days and decide which plan aligns with your organization’s compliance and scaling needs.

## Terraform Enterprise (Self-Managed)

For organizations that require on-premises deployment, Terraform Enterprise offers all Business-tier features in a self-managed appliance.

![The image compares Terraform Cloud and Terraform Enterprise, highlighting that Terraform Cloud is hosted and managed with tiered plans, while Terraform Enterprise is on-premises and self-managed.](https://kodekloud.com/kk-media/image/upload/v1752878749/notes-assets/images/HashiCorp-Terraform-Cloud-Introduction-to-Terraform-Cloud/terraform-cloud-vs-enterprise-comparison.jpg)

> [!important]
> **Warning**
>
> Terraform Enterprise requires infrastructure and operational overhead for high availability, upgrades, and scaling.

## Why Use Terraform Cloud?

Terraform Cloud provides a unified platform for IaC collaboration, security, and governance—eliminating the need to build custom tooling.

![The image lists reasons to use Terraform Cloud, highlighting features like collaboration, governance, secure state storage, centralized module registry, version control integration, audit logs, and role-based access. It also emphasizes reducing the burden of managing infrastructure manually.](https://kodekloud.com/kk-media/image/upload/v1752878750/notes-assets/images/HashiCorp-Terraform-Cloud-Introduction-to-Terraform-Cloud/terraform-cloud-reasons-features-list.jpg)

- Leverage familiar CLI commands (`terraform init`, `plan`, `apply`) with remote execution
- Secure, encrypted state storage per workspace
- Central Private Module Registry for reproducible code
- GitOps triggers via VCS integration
- Comprehensive audit logs and event history
- Fine-grained RBAC for teams, projects, and workspaces
- Eliminate custom scripts for workflows and approvals

## Key Concepts

Terraform Cloud organizes resources using a simple hierarchy:

![The image is a slide titled "Management and Operations" from HashiCorp Terraform Cloud, explaining the concepts of Organization, Workspace, User, and Team. It includes brief definitions for each term.](https://kodekloud.com/kk-media/image/upload/v1752878752/notes-assets/images/HashiCorp-Terraform-Cloud-Introduction-to-Terraform-Cloud/management-operations-hashi-corp-terraform.jpg)

| Concept      | Description                                                                                  |
| ------------ | -------------------------------------------------------------------------------------------- |
| Organization | Shared account for teams, billing, and access management                                     |
| Workspace    | Isolated environment for a set of Terraform configurations, with its own state and variables |
| User         | Individual with permissions to view or modify workspaces and settings                        |
| Team         | Group of users managed together for consistent permissions and collaboration                 |

## Impact on Existing Workflows

Adopting Terraform Cloud enhances your current Terraform practice without replacing it:

![The image is a slide discussing how Terraform Cloud impacts workflows, emphasizing that existing code still works, leveraging existing workflows, and adopting as teams are ready. It includes a logo and cartoon characters at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752878753/notes-assets/images/HashiCorp-Terraform-Cloud-Introduction-to-Terraform-Cloud/terraform-cloud-workflows-impact-slide.jpg)

- Existing Terraform code, modules, and workflows continue to work.
- Choose between CLI, VCS, or API-based runs.
- Onboard teams incrementally based on project needs.

## Next Steps: Sign Up for Terraform Cloud

Get hands-on by signing up for Terraform Cloud:

1.  Navigate to [app.terraform.io](https://app.terraform.io)
2.  Click **Register** and create your user account
3.  Set up your first Organization and Workspace

![The image provides instructions on signing up for Terraform Cloud, highlighting that users can create individual accounts, join multiple teams, and that usernames are global.](https://kodekloud.com/kk-media/image/upload/v1752878754/notes-assets/images/HashiCorp-Terraform-Cloud-Introduction-to-Terraform-Cloud/terraform-cloud-signup-instructions.jpg)

## References

- [Terraform Cloud Overview](https://www.terraform.io/cloud)
- [Getting Started with Terraform Cloud](https://learn.hashicorp.com/terraform/cloud)
- [Terraform Documentation](https://www.terraform.io/docs)
- [Private Module Registry](https://www.terraform.io/cloud-docs/modules/registry)
- [Sentinel Policy as Code](https://www.hashicorp.com/products/sentinel)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-terraform-cloud/module/5be30c4d-ad7e-4fe6-9285-fa36ed0ac151/lesson/5a9a4906-577d-4f25-b745-23f46957abca)**
>
> Watch video content
