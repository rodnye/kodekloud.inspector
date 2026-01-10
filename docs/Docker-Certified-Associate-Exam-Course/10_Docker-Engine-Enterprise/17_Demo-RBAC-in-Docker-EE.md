# Demo RBAC in Docker EE - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Engine-Enterprise/Demo-RBAC-in-Docker-EE)

---

## Table of Contents

- Demo RBAC in Docker EE
  - Use Case Overview
  - 1. Creating Users
  - 2. Creating Organization and Teams
  - 3. Assigning Users to Teams
  - 4. Creating the DevOps Role
  - 5. Creating the DevOps Collection
  - 6. Granting the Role and Collection
  - 7. Testing RBAC as Dave
  - 8. Verifying Adam Has No Access
  - Links and References
  - Watch Video

---

## Content

Docker Certified Associate Exam Course

Docker Engine Enterprise

# Demo RBAC in Docker EE

In this guide, you’ll learn how to configure Role-Based Access Control (RBAC) in Docker Enterprise Edition (EE) using Universal Control Plane (UCP). We’ll walk through:

- Setting up an organization and teams
- Creating users and assigning them to teams
- Defining a custom role and collection
- Granting permissions
- Verifying access for each user

By the end, you’ll see how RBAC in Docker EE ensures that teams can only perform the actions they’re authorized for.

---

## Use Case Overview

We want to implement RBAC for an organization named `KodeKloud`, with two teams and two users. Here’s the plan:

| Component    | Identifier                      | Purpose                                  |
| ------------ | ------------------------------- | ---------------------------------------- |
| Organization | `KodeKloud`                     | Parent entity for teams and resources    |
| Teams        | `ITOps`, `DevOps`               | Logical groups for users                 |
| Users        | `Adam` (ITOps), `Dave` (DevOps) | Team members                             |
| Role         | `DevOps Role`                   | Permissions to manage Swarm services     |
| Collection   | `DevOps Collection`             | UCP resources exposed to the DevOps team |
| Grant        | DevOps Role + Collection        | Assign to DevOps team under KodeKloud    |
| Testing      | Dave vs. Adam                   | Confirm allowed vs. denied operations    |

![The image shows a text document outlining Docker EE RBAC configurations, including subjects, roles, collections, grants, and testing instructions for creating and managing services.](https://kodekloud.com/kk-media/image/upload/v1752873861/notes-assets/images/Docker-Certified-Associate-Exam-Course-Demo-RBAC-in-Docker-EE/docker-ee-rbac-configurations-document.jpg)

---

## 1\. Creating Users

> [!important]
> **Administrator Access Required**
>
> You must be logged in as a UCP admin (e.g., `Yogesh Raheja`) to manage users.

1.  Sign in to UCP as the admin user.
2.  Navigate to **Access Control → Users** and click **Create**.
3.  Enter **Dave**’s details (username, password, full name) and **Create**.
4.  Repeat the process to add **Adam**.

![The image shows a Docker Enterprise user management interface with two active users listed. A notification at the bottom indicates a user was created successfully.](https://kodekloud.com/kk-media/image/upload/v1752873862/notes-assets/images/Docker-Certified-Associate-Exam-Course-Demo-RBAC-in-Docker-EE/docker-enterprise-user-management-interface.jpg)

---

## 2\. Creating Organization and Teams

1.  Go to **Access Control → Orgs & Teams**.
2.  Click **Create**, set **Name** to `KodeKloud`, and save.
3.  Under the new org, select **Create a Team** and add `ITOps`.
4.  Click the **+** icon again to add the `DevOps` team.

![The image shows a Docker Enterprise interface displaying the "Orgs & Teams" section, listing two teams: "itops" and "devops," both with zero members.](https://kodekloud.com/kk-media/image/upload/v1752873862/notes-assets/images/Docker-Certified-Associate-Exam-Course-Demo-RBAC-in-Docker-EE/docker-enterprise-orgs-teams-interface.jpg)

---

## 3\. Assigning Users to Teams

1.  Select **DevOps** → **Add User** → choose **Dave**.
2.  Select **ITOps** → **Add User** → choose **Adam**.

Each team should now list one member.

![The image shows a Docker Enterprise interface displaying the "kodekloud/itops" team with a user named "adam" listed as active. The interface includes navigation options like Access Control, Kubernetes, and Swarm.](https://kodekloud.com/kk-media/image/upload/v1752873864/notes-assets/images/Docker-Certified-Associate-Exam-Course-Demo-RBAC-in-Docker-EE/docker-enterprise-kodekloud-team-adam.jpg)

---

## 4\. Creating the DevOps Role

1.  Navigate to **Access Control → Roles → Swarm**.
2.  Click **Create**, set **Role Name** to `DevOps Role`.
3.  Expand **Service** under **Operations** and select **All Service Operations**.
4.  Click **Create**.

![The image shows a "Create Role" interface in a web application, where various service operations like "Service Create," "Service Delete," and "Service Update" are selected. There are options for secret and volume operations, with buttons for "Cancel" and "Create" at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752873865/notes-assets/images/Docker-Certified-Associate-Exam-Course-Demo-RBAC-in-Docker-EE/create-role-interface-web-app.jpg)

---

## 5\. Creating the DevOps Collection

1.  Go to **Shared Resources → Collections**.
2.  Under the **Swarm** default collection, click **View Children** and choose **Shared**.
3.  Click **Create Collection**, name it `DevOps Collection`, and save.

![The image shows a Docker Enterprise interface with a focus on the "Collections" section under "Shared Resources," displaying two collections: "Private" and "devopscollection."](https://kodekloud.com/kk-media/image/upload/v1752873866/notes-assets/images/Docker-Certified-Associate-Exam-Course-Demo-RBAC-in-Docker-EE/docker-enterprise-collections-interface.jpg)

---

## 6\. Granting the Role and Collection

1.  Head to **Access Control → Grants → Swarm** and click **Create Grant**.
2.  Under **Subject**, select **Organization: KodeKloud** and **Team: DevOps**, then **Next**.
3.  Choose **DevOps Collection** for the **Resource Set**, then **Next**.
4.  Pick **DevOps Role** under **Role Type** and click **Create**.

![The image shows a Docker Enterprise management interface, specifically the "Grants" section under "Swarm," displaying user roles and resource sets. There is an option to create a new grant on the right side.](https://kodekloud.com/kk-media/image/upload/v1752873867/notes-assets/images/Docker-Certified-Associate-Exam-Course-Demo-RBAC-in-Docker-EE/docker-enterprise-grants-swarm-interface.jpg)

![The image shows a web interface for creating a grant in Docker Enterprise, with sections for selecting a team, resource set, and role type. The "Create" and "Cancel" buttons are visible at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752873868/notes-assets/images/Docker-Certified-Associate-Exam-Course-Demo-RBAC-in-Docker-EE/docker-enterprise-grant-interface.jpg)

---

## 7\. Testing RBAC as Dave

1.  Log out, then sign in to UCP as **Dave**.
2.  Verify that his profile displays the **DevOps Collection**, **DevOps Role**, and the grant.
3.  Switch to the **Swarm** tab and click **Create Service**:
    - **Service Name**: `nginx`
    - **Image**: `nginx:latest`
    - **Mode**: `replicated` (replicas: `1`)
4.  Click **Create** and confirm the service appears.

![The image shows a Docker Enterprise interface displaying a list of services, with one service named "nginx" running in replicated mode. A notification indicates that the service was created successfully.](https://kodekloud.com/kk-media/image/upload/v1752873869/notes-assets/images/Docker-Certified-Associate-Exam-Course-Demo-RBAC-in-Docker-EE/docker-enterprise-nginx-service-list.jpg)

Next, attempt to create a Kubernetes namespace (which should be denied):

```
apiVersion: v1
kind: Namespace
metadata:
  name: testnamespace
```

UCP will return an “access denied” error, confirming Kubernetes operations are blocked for Dave.

---

## 8\. Verifying Adam Has No Access

1.  Log out and sign back in as **Adam**.
2.  Navigate to **Swarm → Services**.
3.  Adam should see **no services**, including the one Dave created.

---

## Links and References

- [Docker UCP RBAC Best Practices](https://docs.docker.com/ee/ucp/admin/configure/rbac/)
- [Docker Enterprise Edition Overview](https://docs.docker.com/ee/)
- [Docker Certified Associate Exam Guide](https://www.kodekloud.com/certificate/docker-certified-associate)

> [!important]
> **Next Steps**
>
> Consider automating user and team management with the UCP CLI or API for large-scale environments.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/a6a39359-7fb1-4fab-b0c2-6fc58a6ce617/lesson/e7e4c0f4-0b5d-496c-8b13-c4de65198518)**
>
> Watch video content
