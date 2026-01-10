# Access Control in DTR - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Trusted-Registry/Access-Control-in-DTR)

---

## Table of Contents

- Access Control in DTR
  - Repository Visibility
  - Managing User Accounts
  - Organizations and Teams
  - Repository Permission Levels
  - Summary
  - References
  - Watch Video

---

## Content

Docker Certified Associate Exam Course

Docker Trusted Registry

# Access Control in DTR

In this lesson, we’ll explore how to manage users, organizations, teams, and repository permissions in \[Docker Trusted Registry\]\[Docker Trusted Registry\]. Leveraging DTR’s integration with \[Universal Control Plane\]\[Universal Control Plane\], you can secure and streamline image sharing across your organization.

## Repository Visibility

DTR repositories can be **public** or **private**.

- **Public**: Any user with your DTR URL can pull images without authentication.
- **Private**: Only authenticated users with the right permissions can pull images.

> [!important]
> **Note**
>
> To access private repositories, authenticate with `docker login <DTR_URL>` using a valid DTR account.

![The image shows a user interface for creating a new repository with options to set its visibility as public or private. The title "DTR Security" is displayed at the top.](https://kodekloud.com/kk-media/image/upload/v1752873940/notes-assets/images/Docker-Certified-Associate-Exam-Course-Access-Control-in-DTR/dtr-security-repository-interface.jpg)

## Managing User Accounts

Every push or pull to DTR requires a user account. You have two options:

1.  **UCP Accounts**  
    Users created in \[Universal Control Plane\] are automatically available in DTR.
2.  **DTR Local Accounts**  
    Create users directly in the DTR web UI; they’ll also appear in UCP.

![The image shows a "Create User" form for Docker, with fields for username, password, and full name, and an option to designate the user as a Docker Enterprise admin.](https://kodekloud.com/kk-media/image/upload/v1752873941/notes-assets/images/Docker-Certified-Associate-Exam-Course-Access-Control-in-DTR/create-user-form-docker-admin.jpg)

## Organizations and Teams

To collaborate on repositories, group users into organizations and teams:

1.  **Create an Organization**
2.  **Define Teams** within that organization
3.  **Add Users** to each team

Team membership grants access to all repositories assigned to that team.

> [!important]
> **Note**
>
> Organize users into teams by project or role to maintain consistent permissions and reduce administrative overhead.

![The image shows a screenshot of the Docker Trusted Registry interface, focusing on organizations and teams, alongside a diagram illustrating a hierarchical team structure.](https://kodekloud.com/kk-media/image/upload/v1752873942/notes-assets/images/Docker-Certified-Associate-Exam-Course-Access-Control-in-DTR/docker-trusted-registry-teams-diagram.jpg)

## Repository Permission Levels

Assign one of three permission levels when granting a team access to a repository:

| Permission | Actions Allowed                                       |
| ---------- | ----------------------------------------------------- |
| Read       | View repository metadata & pull images                |
| Write      | Pull, push, tag, and scan images                      |
| Admin      | Full control: read/write actions plus manage settings |

![The image shows a user interface for setting repository permissions, with options for read-only, read-write, and admin access. It also includes a table detailing the operations allowed for each permission level.](https://kodekloud.com/kk-media/image/upload/v1752873943/notes-assets/images/Docker-Certified-Associate-Exam-Course-Access-Control-in-DTR/repository-permissions-user-interface.jpg)

## Summary

- Choose **public** or **private** visibility based on your security needs.
- Use **UCP** or **DTR** to manage user accounts seamlessly.
- Leverage **organizations** and **teams** to simplify collaboration.
- Assign granular **permission levels** (Read, Write, Admin) to control repository access.

By following these best practices, you’ll ensure secure, efficient access control in Docker Trusted Registry.

---

## References

- [Docker Trusted Registry Documentation](https://docs.docker.com/ee/dtr/)
- [Universal Control Plane Documentation](https://docs.docker.com/ee/ucp/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/d0ef5db6-09b0-45f3-a220-9036d58086c6/lesson/198db4f2-f403-4bb0-8e52-386466cd73cb)**
>
> Watch video content
