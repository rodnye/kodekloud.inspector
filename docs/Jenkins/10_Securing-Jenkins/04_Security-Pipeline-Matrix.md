# Security Pipeline Matrix - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins/Securing-Jenkins/Security-Pipeline-Matrix)

---

## Table of Contents

- Security Pipeline Matrix
  - Configuring Matrix-Based Security
  - Project-Based Matrix Authorization
  - Watch Video

---

## Content

Jenkins

Securing Jenkins

# Security Pipeline Matrix

When it comes to securing Jenkins, both the hardening of the system and protecting the code itself are crucial. One of the cornerstone methods for achieving this is by leveraging popular Jenkins plugins. For example, during the initial Jenkins setup, you can install the recommended plugins, which include the Matrix Authorization plugin.

## Configuring Matrix-Based Security

To configure Jenkins security using matrix-based settings, follow these steps:

1.  In the Jenkins dashboard, navigate to **Manage Jenkins**, then select **Configure Global Security**.
2.  Scroll down to the authorization section and choose **Matrix-based Security**.

Upon selecting Matrix-based Security, a detailed table appears. This table enables you to assign a range of permissions to different users and groups, such as "authenticated" and "anonymous".

To illustrate the process, consider adding a user named Bob:

- Click to add a user and type in "Bob".
- Assign Bob specific permissions, such as the ability to update a run or read job details, without granting him permissions to create or delete jobs.

After saving these changes and returning to the Global Security settings, you will notice that administrative users (like Michael, in this example) retain full privileges, whereas Bob is limited to read-only access with the ability to update runs. This detailed control over user permissions significantly enhances security.

## Project-Based Matrix Authorization

Jenkins also offers **Project-Based Matrix Authorization**. This method applies permissions on a per-project basis, allowing you to customize access control lists for each project.

![The image shows a Jenkins security configuration screen with matrix-based security settings, displaying user permissions for various actions like read, create, and delete.](https://kodekloud.com/kk-media/image/upload/v1752880136/notes-assets/images/Jenkins-Security-Pipeline-Matrix/frame_120.jpg)

> [!important]
> **Note**
>
> Be cautious when configuring project-based permissions. Ensure that all users have the essential permissions required to view the dashboard and access resources.

For example, if Bob only has permission to read a job and update a run, he might not be able to access the dashboard due to the lack of overall read permission.

To demonstrate the resolution:

1.  Log in as Bob and observe that he cannot perform any actions because he lacks the general read permission.
2.  Log back in as an administrator.
3.  Navigate to **Manage Jenkins** > **Configure Global Security**.
4.  Under the overall permissions section, add the necessary read permission for Bob.

![The image shows a Jenkins security configuration screen with matrix-based security settings, displaying user permissions for various actions, including read access for specific users.](https://kodekloud.com/kk-media/image/upload/v1752880137/notes-assets/images/Jenkins-Security-Pipeline-Matrix/frame_180.jpg)

After updating Bob's permissions, log out of the administrator account and log in as Bob again. Now, Bob will be able to view builds although his actions remain restricted to read-only.

> [!important]
> **Summary**
>
> This granular approach to configuring security is ideal for environments that demand strict access control, ensuring that each user receives only the permissions necessary for their role.

Thank you for reading this guide on Jenkins security. We hope this exploration has been valuable in strengthening your Jenkins deployment. For more detailed information and best practices, explore the [Jenkins Documentation](https://www.jenkins.io/doc/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins/module/7c4c28a9-3607-46d4-920a-3f94ed6a7d5b/lesson/e44511d1-04bc-4dc5-9966-ee7b1daa0461)**
>
> Watch video content
