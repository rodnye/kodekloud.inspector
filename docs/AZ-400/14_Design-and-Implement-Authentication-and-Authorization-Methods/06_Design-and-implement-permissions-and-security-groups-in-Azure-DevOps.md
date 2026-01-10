# Design and implement permissions and security groups in Azure DevOps - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Design-and-Implement-Authentication-and-Authorization-Methods/Design-and-implement-permissions-and-security-groups-in-Azure-DevOps)

---

## Table of Contents

- Design and implement permissions and security groups in Azure DevOps
  - 1. Manage Organization Users
  - 2. Configure Project Settings and Teams
  - 3. Review Built-in Security Groups
  - 4. Create Custom Security Groups
  - 5. Secure Repositories and Pipelines
  - 6. Regular Review and Audit
  - Links and References
  - Watch Video
    - Default Team
    - Best Practices
    - Team-Level Customization

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Design and Implement Authentication and Authorization Methods

# Design and implement permissions and security groups in Azure DevOps

In this lesson, you’ll learn how to configure permissions and manage security groups in Azure DevOps to enforce a least-privilege Role-Based Access Control (RBAC) model. This knowledge is essential for the [AZ-400 exam](https://learn.microsoft.com/en-us/certifications/exams/az-400/).

We’ll cover:

1.  Managing organization-level users
2.  Configuring projects and teams
3.  Reviewing built-in security groups
4.  Creating custom security groups
5.  Securing repositories and pipelines
6.  Auditing permissions regularly

---

## 1\. Manage Organization Users

1.  Go to **Organization Settings** (lower-left) → **Users**.
2.  View existing members (e.g., Jeremy@KodeKloud.com, Jeremy Morgan@gmail.com, BreakTheBuild@outlook.com).
3.  Click **Add Users**, enter the email or service principal, choose an Access Level (Basic, Stakeholder, Visual Studio Subscriber), and assign projects.

![The image shows a user management interface in Azure DevOps, displaying a list of users with their access levels and an "Add new users" panel on the right.](https://kodekloud.com/kk-media/image/upload/v1752867571/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Design-and-implement-permissions-and-security-groups-in-Azure-DevOps/azure-devops-user-management-interface.jpg)

> [!important]
> **Note**
>
> Invitation emails are only sent to user accounts—not service principals. Recipients must accept the invitation to join the organization.

---

## 2\. Configure Project Settings and Teams

1.  Select your organization (e.g., **KodeKloud demo**) and open the **Simple Converter** project.
2.  Navigate to **Project Settings** (lower-left) → **Overview** to see Project Administrators.

![The image shows a project settings page for "SimpleConverter" on Azure DevOps, displaying project details, administrators, and Azure DevOps services options.](https://kodekloud.com/kk-media/image/upload/v1752867572/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Design-and-implement-permissions-and-security-groups-in-Azure-DevOps/simpleconverter-azure-devops-settings-page.jpg)

### Default Team

1.  Under **Teams**, click **Simple Converter**.
2.  Invite members explicitly—even project admins must be added here to inherit team permissions.

![The image shows a project settings page for a team in Azure DevOps, with a sidebar menu and a pop-up window for inviting members to the team.](https://kodekloud.com/kk-media/image/upload/v1752867573/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Design-and-implement-permissions-and-security-groups-in-Azure-DevOps/azure-devops-team-settings-invite-members.jpg)

---

## 3\. Review Built-in Security Groups

1.  In **Project Settings** → **Security** → **Permissions**, select a built-in group (e.g., **Build Administrators**).
2.  Inspect granular permissions:

- View analytics: Allow
- View project-level information: Allow
- Create tag definitions: Allow
- Create/Delete test runs: Allow
- Manage test configurations/environments: Allow
- View test runs: Allow

![The image shows a project settings page for "SimpleConverter" on Azure DevOps, displaying permissions for build administrators with various options set to "Allow" or "Not set."](https://kodekloud.com/kk-media/image/upload/v1752867575/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Design-and-implement-permissions-and-security-groups-in-Azure-DevOps/simpleconverter-azure-devops-settings-permissions.jpg)

### Best Practices

- Grant only necessary permissions (least-privilege).
- Use explicit **Deny** to override undesired inherited **Allow**.
- For temporary tasks, add users to privileged groups, then remove them immediately.

---

## 4\. Create Custom Security Groups

1.  Navigate to **Security** → **New Group**.
2.  Name it `JavaScript Developers` and add members (e.g., Lloyd).
3.  By default, it inherits permissions from **Project Valid Users**.

![The image shows a project settings page for "SimpleConverter" on Azure DevOps, displaying a list of user groups and their permissions. Each group has a description of its access level and role within the project.](https://kodekloud.com/kk-media/image/upload/v1752867577/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Design-and-implement-permissions-and-security-groups-in-Azure-DevOps/simpleconverter-azure-devops-settings-permissions-2.jpg)

Grant additional rights:

- Create tag definitions: Allow
- Create/Delete test runs: Allow

![The image shows a project settings page in Azure DevOps, displaying permissions for a group called "Javascript Developers" with various options set to "Not set" or "Allow."](https://kodekloud.com/kk-media/image/upload/v1752867578/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Design-and-implement-permissions-and-security-groups-in-Azure-DevOps/azure-devops-project-settings-javascript-developers.jpg)

### Team-Level Customization

Under **Teams** → **Simple Converter** → **Settings**, you can:

- Create sub-teams (e.g., `Test Group`).
- Assign only required permissions (e.g., **View project-level information**).

---

## 5\. Secure Repositories and Pipelines

Use Azure DevOps security settings to fine-tune code and CI/CD access:

| Resource  | Role        | Actions Allowed                                     |
| --------- | ----------- | --------------------------------------------------- |
| Repos     | Reader      | Clone, fetch, view code                             |
| Repos     | Contributor | Push commits, create branches, manage pull requests |
| Pipelines | Reader      | View pipeline definitions and run history           |
| Pipelines | Contributor | Create, edit, queue builds                          |

1.  Go to **Repos** or **Pipelines** → **Security**.
2.  Adjust permissions per role.

![The image shows an Azure DevOps interface with a "Pipelines" section and a permissions window for "SimpleConverter," detailing various user group permissions for build-related actions.](https://kodekloud.com/kk-media/image/upload/v1752867579/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Design-and-implement-permissions-and-security-groups-in-Azure-DevOps/azure-devops-pipelines-permissions-simpleconverter.jpg)

> [!important]
> **Warning**
>
> Avoid granting `Destroy builds` or other destructive permissions unless absolutely necessary.

---

## 6\. Regular Review and Audit

- Periodically review all security groups and permissions.
- Remove or deny obsolete accounts.
- Track changes via **Audit Logs** to maintain compliance.

> [!important]
> **Note**
>
> Schedule quarterly permission reviews to ensure your RBAC model remains secure and current.

---

## Links and References

- [AZ-400 Exam (Microsoft Learn)](https://learn.microsoft.com/en-us/certifications/exams/az-400/)
- [Azure DevOps REST API Security](https://learn.microsoft.com/en-us/rest/api/azure/devops/security/)
- [Role-Based Access Control (RBAC) in Azure](https://learn.microsoft.com/azure/role-based-access-control/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/6dcff123-ec53-4c16-b939-97d0b60183e2/lesson/2e5e882d-1498-4eea-ad6e-031f5e099b71)**
>
> Watch video content
