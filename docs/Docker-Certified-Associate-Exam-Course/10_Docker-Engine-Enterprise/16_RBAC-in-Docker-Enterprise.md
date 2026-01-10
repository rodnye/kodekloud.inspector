# RBAC in Docker Enterprise - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Engine-Enterprise/RBAC-in-Docker-Enterprise)

---

## Table of Contents

- RBAC in Docker Enterprise
  - Subjects
  - Roles
  - Resource Sets
  - Grants
  - Summary & Best Practices
  - Watch Video

---

## Content

Docker Certified Associate Exam Course

Docker Engine Enterprise

# RBAC in Docker Enterprise

Role-Based Access Control (RBAC) is a security mechanism that defines which subjects can perform specific operations on resources. In Docker Enterprise, RBAC is configured through the Universal Control Plane (UCP) console, enabling fine-grained access control across both Docker Swarm and Kubernetes environments.

---

## Subjects

A **subject** is the actor requesting access. Docker Enterprise supports these subject types:

- **User**: An individual account with credentials and profile information.
- **Team**: A logical grouping of users for shared permissions.
- **Organization**: A higher-level grouping of teams.
- **Service Account**: A Kubernetes object enabling workloads to authenticate to the cluster.

> [!important]
> **Note**
>
> Service Accounts are Kubernetes-native identities used by pods and controllers. They allow automation to interact with the API without human credentials.

![The image illustrates the concept of RBAC (Role-Based Access Control) with icons representing different subjects like organization, team, user, and service account, along with the question "Who can do what operations on which resources?"](https://kodekloud.com/kk-media/image/upload/v1752873882/notes-assets/images/Docker-Certified-Associate-Exam-Course-RBAC-in-Docker-Enterprise/rbac-role-based-access-control-diagram.jpg)

You can manage subjects in the UCP console under **Account Management** by creating users, teams, organizations, or service accounts.

---

## Roles

A **role** specifies which operations a subject can execute on particular resource types. Common operations include:

- **View** (read-only)
- **Create**
- **Update**
- **Delete**

Resources span Docker and Kubernetes objects—such as configs, containers, images, networks, secrets, services, and volumes. You can group multiple resource-operation pairs into custom roles.

Built-in roles in Docker Enterprise:

| Role Name              | Description                                                                |
| ---------------------- | -------------------------------------------------------------------------- |
| **None**               | No access to Swarm or Kubernetes resources.                                |
| **View Only**          | Read-only access across all resources.                                     |
| **Restricted Control** | Can view and edit resources but cannot run services or mount host volumes. |
| **Scheduler**          | Can view nodes and schedule workloads (default for Swarm collections).     |
| **Full Control**       | Unrestricted access to manage every resource.                              |

> [!important]
> **Warning**
>
> Grant **Full Control** sparingly. Excessive privileges can lead to unintended changes or security risks.

![The image is a diagram explaining RBAC (Role-Based Access Control), showing different operations (View, Create, Delete, Update) and resources (Config, Container, Image, etc.) with varying levels of access (None, View Only, Restricted Control, etc.). It asks, "Who can do what operations on which resources?"](https://kodekloud.com/kk-media/image/upload/v1752873884/notes-assets/images/Docker-Certified-Associate-Exam-Course-RBAC-in-Docker-Enterprise/rbac-diagram-operations-resources.jpg)

---

## Resource Sets

A **resource set** defines the scope where a role applies:

- **Kubernetes Namespaces**: Logical partitions within a cluster.
- **Swarm Collections**: Groups of nodes, services, volumes, and networks in UCP.

Collections are created and maintained via the UCP console under **Swarm Collections**. Namespaces can be managed using standard Kubernetes tooling or via the UCP Kubernetes dashboard.

![The image illustrates RBAC (Role-Based Access Control) resource sets, comparing Docker Swarm and Kubernetes clusters, with a focus on who can perform operations on specific resources.](https://kodekloud.com/kk-media/image/upload/v1752873885/notes-assets/images/Docker-Certified-Associate-Exam-Course-RBAC-in-Docker-Enterprise/rbac-docker-swarm-kubernetes-comparison.jpg)

---

## Grants

A **grant** binds together a subject, a role, and a resource set to enforce permissions. To create a grant in UCP:

1.  Navigate to **Access Control > Grants**.
2.  Select the **Subject** (user, team, organization, or service account).
3.  Choose the **Role** (built-in or custom).
4.  Pick the **Resource Set** (Swarm collection or Kubernetes namespace).
5.  Save the grant to apply the permissions.

![The image shows a "Create Grant" interface where a user can select a subject type, either "Users" or "Organizations," and choose an organization and team.](https://kodekloud.com/kk-media/image/upload/v1752873886/notes-assets/images/Docker-Certified-Associate-Exam-Course-RBAC-in-Docker-Enterprise/create-grant-interface-users-organizations.jpg)

---

## Summary & Best Practices

1.  **Configure Subjects**
    - Define users, teams, organizations, or service accounts in UCP.
2.  **Define Roles**
    - Use built-in roles or create custom roles tailored to your security requirements.
3.  **Create Resource Sets**
    - Organize workloads into Swarm collections or Kubernetes namespaces.
4.  **Grant Access**
    - Combine subject + role + resource set to enforce least privilege.

Best Practices:

- Segment large teams into multiple groups with narrow privileges.
- Manage team membership rather than assigning permissions per user.
- Integrate UCP with [LDAP](/docs/ucp/configuration/ldap) or [Active Directory](/docs/ucp/configuration/ldap) for centralized identity management.
- Regularly review and audit grants to maintain a secure environment.

![The image contains notes on access control steps, best practices for configuring teams, and creating users, including integrating UCP with LDAP/AD.](https://kodekloud.com/kk-media/image/upload/v1752873887/notes-assets/images/Docker-Certified-Associate-Exam-Course-RBAC-in-Docker-Enterprise/access-control-steps-best-practices.jpg)

---

In the next section, we will demonstrate creating users, custom roles, Swarm collections, and grants in action.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/a6a39359-7fb1-4fab-b0c2-6fc58a6ce617/lesson/48469857-2955-40e5-8fbe-236e9305d11a)**
>
> Watch video content
