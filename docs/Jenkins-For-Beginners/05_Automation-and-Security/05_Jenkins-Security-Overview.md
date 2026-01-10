# Jenkins Security Overview - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins-For-Beginners/Automation-and-Security/Jenkins-Security-Overview)

---

## Table of Contents

- Jenkins Security Overview
  - Authentication and Authorization
  - Managing User Access in Jenkins
  - Authorization in Jenkins
  - Watch Video

---

## Content

Jenkins For Beginners

Automation and Security

# Jenkins Security Overview

In this article, we provide a concise overview of Jenkins security while explaining its core concepts and best practices. Protecting your Jenkins server is analogous to safeguarding your toolbox—you wouldn't want someone to steal your tools or misuse them. Likewise, Jenkins must be secured against unauthorized access and potential malicious activities.

A key principle in Jenkins security is the concept of least privilege, which means users receive only the permissions they need to perform their designated tasks.

![The image illustrates Jenkins security, highlighting protection against unauthorized access and malicious actions, with a focus on the principle of least privilege.](https://kodekloud.com/kk-media/image/upload/v1752879435/notes-assets/images/Jenkins-For-Beginners-Jenkins-Security-Overview/jenkins-security-least-privilege.jpg)

## Authentication and Authorization

Authentication is the process of verifying a user's identity. When logging in, you provide credentials—such as a username and password or an API token—that the system validates to confirm you are a legitimate user. In contrast, authorization determines what actions an authenticated user is allowed to perform. Based on your identity and assigned privileges, the system decides if you can read, write, delete, or execute other operations.

To illustrate, imagine checking into a hotel. Presenting a government-issued ID, such as a passport or driver's license, verifies your identity (authentication). Once verified, you receive a room key, which grants access to certain areas of the hotel, thereby defining your privileges (authorization).

![The image compares authentication and authorization, illustrating authentication as verifying a user's identity and authorization as determining user permissions.](https://kodekloud.com/kk-media/image/upload/v1752879437/notes-assets/images/Jenkins-For-Beginners-Jenkins-Security-Overview/authentication-authorization-comparison.jpg)

## Managing User Access in Jenkins

Jenkins offers several methods for managing user access, each providing different levels of flexibility:

- **Jenkins User Database:** Ideal for small-scale setups, where users are managed directly within Jenkins.
- **Unix User Groups:** Leverage Unix user accounts or group databases for access control on systems that use Unix-based authentication.
- **Servlet-based Security:** Uses your web service's built-in security model for handling user authentication.
- **External LDAP:** Connect Jenkins to directory services such as LDAP, enabling users to log in with their corporate credentials.

Additionally, Jenkins supports several plugins to further extend security options. For instance, integration with Microsoft’s Active Directory or implementation of SAML 2.0 single sign-on (SSO) streamlines access for users by utilizing existing corporate credentials.

![The image is an infographic about authentication options in Jenkins, featuring built-in choices like Jenkins User Database and expanding options like Active Directory.](https://kodekloud.com/kk-media/image/upload/v1752879438/notes-assets/images/Jenkins-For-Beginners-Jenkins-Security-Overview/jenkins-authentication-options-infographic.jpg)

Choosing the appropriate method depends on your environment. While an internal database works well for smaller teams, enterprise environments benefit from corporate directory services like LDAP or Active Directory, simplifying user management and reducing the need for multiple credentials.

## Authorization in Jenkins

Authorization in Jenkins specifies what actions users can perform. Here are some essential terms:

- **Resource:** Any task, object, or action a user wishes to manipulate (e.g., triggering a job build or deleting credentials).
- **Role:** A set of related permissions grouped by function, such as a developer who has permissions to build and view jobs.
- **Requester:** The user or group attempting to access a resource, typically assigned one or more roles.

Jenkins implements two matrix-based authorization strategies:

1.  **Matrix-based Security:** Grants permissions at a global level across all projects. This method is visualized as a grid, with resources as columns and user/group names as rows.
2.  **Project-based Matrix Authorization Strategy:** Offers granular control by assigning permissions specific to individual projects.

![The image explains the concept of authorization in Jenkins, highlighting three components: Resource, Role, and Requester, each with a brief description.](https://kodekloud.com/kk-media/image/upload/v1752879439/notes-assets/images/Jenkins-For-Beginners-Jenkins-Security-Overview/jenkins-authorization-resource-role-requester.jpg)

Both strategies display permissions in a grid format. For example, one diagram might illustrate various permissions such as "Read," "Create," and "Delete" applied to groups like "Anonymous," "Authenticated Users," or individual users like "John" and "Alice."

![The image shows a Jenkins authorization matrix, detailing permissions for different user groups and roles, such as "Anonymous," "Authenticated Users," and specific users like "John" and "Alice." Various permissions like "Read," "Create," and "Delete" are displayed in a grid format.](https://kodekloud.com/kk-media/image/upload/v1752879440/notes-assets/images/Jenkins-For-Beginners-Jenkins-Security-Overview/jenkins-authorization-matrix-permissions.jpg)

> [!important]
> **Best Practice**
>
> Always apply the principle of least privilege by providing users only the necessary level of access to perform their tasks. This practice not only ensures robust security but also optimizes your CI/CD processes.

Thank you for reading this comprehensive overview of Jenkins security. For additional details and updates on Jenkins best practices, be sure to consult the official Jenkins documentation and related security resources.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins-for-beginners/module/cd53a160-c852-4d65-b718-31b284cb48da/lesson/47cdde29-b1e4-4a8e-b8a9-ff7e79196141)**
>
> Watch video content
