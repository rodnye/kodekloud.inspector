# Terraform Cloud Team - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Terraform-Cloud/Terraform-Cloud-Team/Terraform-Cloud-Team)

---

## Table of Contents

- Terraform Cloud Team
  - Teams and Membership
  - Users Across Multiple Organizations
  - Organizational vs. Workspace Permissions
  - Subscription Tiers and the Owners Team
  - The Owners Team
  - Organizational-Level Permissions
  - Team Visibility and Team Tokens
  - Workspace-Level Permissions
  - Single Sign-On (SSO)
  - Links and References
  - Watch Video
  - Practice Lab
    - Organizational API Token
    - Read
    - Plan
    - Write
    - Admin
    - Custom Permissions

---

## Content

HashiCorp : Terraform Cloud

Terraform Cloud Team

# Terraform Cloud Team

Terraform Cloud empowers teams and organizations to collaborate on infrastructure as code at scale. Teams are the primary mechanism for grouping users and assigning permissions. In this guide, we’ll explore how to structure teams, manage membership, and control access at both the organization and workspace levels.

## Teams and Membership

- Every Terraform Cloud user must belong to at least one team within an organization.
- Inviting a user involves assigning them to one or more teams.
- The organization creator is automatically added to the **owners** team upon creation.

Permissions in Terraform Cloud are granted exclusively through team membership. Teams can have:

- **Organizational-level** permissions (e.g., manage workspaces, policies)
- **Workspace-level** permissions (e.g., read, plan, write, admin)

> [!important]
> **Note**
>
> Teams are only available on the **Team** and higher subscription tiers. The free tier includes only the **owners** team.

Teams typically reflect your company’s roles (e.g., DevOps, QA, Platform) and grant each role the appropriate level of access.

![The image is a slide about Terraform Cloud Teams, explaining how teams grant different access levels to infrastructure based on user roles, with specific access levels like read, plan, write, and admin. It also mentions the requirement of a Team Tier within Terraform Cloud.](https://kodekloud.com/kk-media/image/upload/v1752878870/notes-assets/images/HashiCorp-Terraform-Cloud-Terraform-Cloud-Team/terraform-cloud-teams-access-levels.jpg)

## Users Across Multiple Organizations

A Terraform Cloud user account is global. One user can belong to multiple organizations, each with its own teams and permissions. For example, Alice might be on the **WebApp** organization’s Admin team and on the **Infra** organization’s Read-only team.

![The image illustrates a user accessing HashiCorp Terraform Cloud, showing connections between a user, a mobile device, and organizations like "Pizza Organization" and "Taco Organization." It includes elements like a cloud icon, email, and password security.](https://kodekloud.com/kk-media/image/upload/v1752878870/notes-assets/images/HashiCorp-Terraform-Cloud-Terraform-Cloud-Team/terraform-cloud-user-access-diagram.jpg)

## Organizational vs. Workspace Permissions

Teams can be granted permissions at two scopes:

1.  **Organizational-level**
2.  **Workspace-level**

Some organizational permissions automatically include workspace permissions. For instance, the **Manage Workspaces** permission at the organization level implies Admin rights on every workspace.

Workspace-level permissions can also vary by workspace. For example, your **mobile-app** team may have **Write** access in development workspaces but only **Read** access in production.

## Subscription Tiers and the Owners Team

On the free tier, only the **owners** team exists. Upgrading to Team tier (or higher) unlocks custom teams and scoped permissions at both organization and workspace levels.

![The image is a diagram titled "Role-Based Access Structure" in Terraform Cloud, showing different teams (app1-team, mobile-team, appX-team) and their permissions (Plan, Apply, Read, Admin) for various workspaces.](https://kodekloud.com/kk-media/image/upload/v1752878872/notes-assets/images/HashiCorp-Terraform-Cloud-Terraform-Cloud-Team/terraform-cloud-role-based-access-structure.jpg)

## The Owners Team

The **owners** team is created automatically for every organization and has exclusive capabilities:

![The image is a slide about "Organization Owners" in Terraform Cloud, detailing their roles and special permissions, such as managing teams, settings, billing, agents, and API tokens. It includes a logo and cartoon characters at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752878873/notes-assets/images/HashiCorp-Terraform-Cloud-Terraform-Cloud-Team/terraform-cloud-organization-owners-slide.jpg)

- Invite, remove, and reassign users
- Create, manage, and delete teams
- Configure all organizational settings (billing, subscription)
- Manage Terraform Cloud Agents (Business tier)
- Generate the organizational API token

### Organizational API Token

- Grants organization-level administrative access via the API
- Cannot perform workspace actions (e.g., runs, applies)
- Only one token can be active at a time

> [!important]
> **Warning**
>
> Use the organizational API token briefly for initial setup. Replace it with scoped team tokens for ongoing automation.

## Organizational-Level Permissions

| Permission                     | Description                                                                           |
| ------------------------------ | ------------------------------------------------------------------------------------- |
| Manage Policies                | Create/edit/delete Sentinel or OPA policy sets; run permissions across all workspaces |
| Manage Policy Overrides        | Override soft mandatory violations (cannot override hard mandatory violations)        |
| Manage Workspaces              | Create and administer all workspaces (implies workspace Admin)                        |
| Manage Private Module Registry | Publish and manage modules/providers in the private registry                          |
| Manage VCS Settings            | Configure VCS providers and SSH keys                                                  |
| Manage Run Tasks               | Define and manage run tasks organization-wide                                         |

![The image is a diagram titled "Organization Permissions" for HashiCorp Terraform Cloud, showing different management options like policies, workspaces, and VCS settings. It includes icons and text for each permission category.](https://kodekloud.com/kk-media/image/upload/v1752878874/notes-assets/images/HashiCorp-Terraform-Cloud-Terraform-Cloud-Team/organization-permissions-hashi-corp-diagram.jpg)

> [!important]
> **Note**
>
> Users with repository or commit access in your VCS can trigger Terraform runs even without explicit Terraform Cloud permissions.

## Team Visibility and Team Tokens

- **Public Teams**: Visible to all organization members
- **Private Teams**: Visible only to team members and org owners

Team API tokens inherit the team’s workspace permissions and can be used for automated workflows and CI/CD.

![The image is a slide about "Teams" in Terraform Cloud, detailing "Team Visibility" and "Team Tokens," with a logo and cartoon characters at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752878875/notes-assets/images/HashiCorp-Terraform-Cloud-Terraform-Cloud-Team/terraform-cloud-teams-visibility-tokens.jpg)

## Workspace-Level Permissions

Terraform Cloud provides four predefined workspace roles, each building upon the previous:

| Role  | Capabilities                                                 |
| ----- | ------------------------------------------------------------ |
| Read  | View runs, state, variables, workspace info                  |
| Plan  | Read + queue runs, add run comments                          |
| Write | Plan + modify variables, approve runs, lock/unlock workspace |
| Admin | Full control of workspace settings                           |

### Read

- View run history, Terraform versions, state, variables, and workspace metadata
- Cannot initiate runs or modify any resources

![The image shows a slide about "Workspace Permissions: Read" in Terraform Cloud, listing baseline permissions such as reading runs, TF config versions, state, variables, and workspace information. It also indicates that these permissions are currently assigned.](https://kodekloud.com/kk-media/image/upload/v1752878876/notes-assets/images/HashiCorp-Terraform-Cloud-Terraform-Cloud-Team/workspace-permissions-read-terraform-cloud.jpg)

### Plan

Includes all **Read** permissions, plus:

- Queue new runs
- Add comments to existing runs

> Does _not_ permit run execution.

### Write

Includes **Read** and **Plan** permissions, plus:

- Modify variable values
- Approve runs
- Lock or unlock the workspace

![The image shows a section of a user interface for assigning "Write" permissions in HashiCorp Terraform Cloud, detailing specific permissions like reading, writing, approving runs, and locking/unlocking workspaces.](https://kodekloud.com/kk-media/image/upload/v1752878878/notes-assets/images/HashiCorp-Terraform-Cloud-Terraform-Cloud-Team/terraform-cloud-write-permissions-ui.jpg)

### Admin

Full workspace control:

- Manage team access
- Change execution mode (local vs. remote)
- Configure VCS settings
- Delete or rename the workspace

> Any UI setting available in Terraform Cloud can be managed by an Admin.

### Custom Permissions

For finer-grained access, enable or disable specific actions:

- **Run**: queue runs without apply
- **Sentinel & Run Tasks**: manage policy mocks and run tasks
- **Variables**: separate view vs. set permissions (secret variables stay hidden)
- **State**: control read or restrict state access

![The image is a diagram titled "Workspace Permissions: Custom" for HashiCorp Terraform Cloud, showing different permission categories: Run, Sentinel and Run Tasks, Variables, and State, each with specific access details.](https://kodekloud.com/kk-media/image/upload/v1752878879/notes-assets/images/HashiCorp-Terraform-Cloud-Terraform-Cloud-Team/workspace-permissions-custom-terraform-diagram.jpg)

## Single Sign-On (SSO)

On the Business tier or Terraform Enterprise, configure SSO for centralized identity management:

- Integrate with identity providers (Azure AD, Okta, SAML, etc.)
- Map IdP groups to Terraform Cloud teams
- Enforce MFA and session policies

![The image is an informational slide about Single Sign-On (SSO) for Terraform Cloud, explaining its features like using an authentication server, SAML configuration, and user management. It includes a setup interface with options for Microsoft Azure AD, Okta, and SAML as SSO providers.](https://kodekloud.com/kk-media/image/upload/v1752878880/notes-assets/images/HashiCorp-Terraform-Cloud-Terraform-Cloud-Team/sso-terraform-cloud-features-diagram.jpg)

---

By organizing your users into teams and assigning scoped permissions, you maintain clear, role-based access control in Terraform Cloud. This structure ensures security, simplifies governance, and accelerates collaboration.

## Links and References

- [Terraform Cloud Teams Documentation](https://www.terraform.io/docs/cloud/users-teams-organizations/teams.html)
- [Terraform Cloud Permissions Overview](https://www.terraform.io/docs/cloud/users-teams-organizations/permissions.html)
- [HashiCorp Sentinel](https://www.hashicorp.com/sentinel)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-terraform-cloud/module/67f17e5e-a146-4781-9e8c-41ff866be20d/lesson/56b7dd1e-f3cf-4ee2-9836-d815da3b3aa7)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/hashicorp-terraform-cloud/module/67f17e5e-a146-4781-9e8c-41ff866be20d/lesson/4e5e6c0e-95c9-4862-aa90-63c952913eb8)**
>
> Practice lab
