# IAM Overview - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-4-Security-and-Compliance/IAM-Overview)

---

## Table of Contents

- IAM Overview
  - Primary IAM Identities
  - IAM User Credentials
  - IAM Groups
  - Principle of Least Privilege
  - Summary
  - Watch Video

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 4 Security and Compliance

# IAM Overview

Welcome to this detailed lesson on AWS Identity and Access Management (IAM). IAM is a cornerstone service for managing AWS accounts, particularly crucial for SysOps administrators who need to control permissions across all AWS services.

IAM focuses on two main functions:

- Authenticating a user (verifying identity)
- Authorizing a user (defining access rights)

This concept is illustrated in the diagram below:

![The image illustrates the concepts of "Authentication" and "Authorization" with numbered icons, connected by a plus sign.](https://kodekloud.com/kk-media/image/upload/v1752860491/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-IAM-Overview/authentication-authorization-icons-diagram.jpg)

IAM essentially asks, "Who are you?" and "What are you allowed to do?" As the first line of defense, it controls access to your AWS account. When you first set up an AWS account, you create a root user using your email and password. IAM then enables you to manage who can access various AWS services—similar to a security guard checking credentials before granting access to a building.

Consider this additional perspective:

![The image illustrates a concept of Identity and Access Management (IAM) showing a malicious actor attempting to access different departments within a corporation, with alerts on Departments B and C.](https://kodekloud.com/kk-media/image/upload/v1752860492/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-IAM-Overview/iam-malicious-actor-access-diagram.jpg)

IAM operates similarly to services like Active Directory or the username/password combinations used in applications such as Gmail or Instagram. It serves as a security checkpoint that grants access only to those with proper credentials. The following diagram reinforces how IAM functions:

![The image illustrates a concept of Identity and Access Management (IAM), showing a malicious actor attempting to gain access through a security guard to different departments within a corporation.](https://kodekloud.com/kk-media/image/upload/v1752860494/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-IAM-Overview/iam-security-guard-access.jpg)

> [!important]
> **Key IAM Functions**
>
> IAM's primary functions include:
>
> - **Managing User Identities:** Creating and maintaining user accounts.
> - **Authentication:** Verifying user identities during login.
> - **Authorization:** Determining which actions a user is permitted to perform.
> - **Auditing:** Tracking user activities for compliance and security.

While IAM centralizes management within a single AWS account, managing identities for multiple accounts requires AWS Organizations. Regardless of scope, the principle of least privilege—granting only the minimum necessary permissions—is paramount. The diagram below outlines several key features of IAM:

![The image outlines four features of Identity and Access Management (IAM): enhanced security, centralized management, compliance and auditing, and the least privilege principle.](https://kodekloud.com/kk-media/image/upload/v1752860495/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-IAM-Overview/iam-features-security-management-compliance.jpg)

IAM can represent either a human user or an application. For automated tasks and programmatic access, AWS recommends using roles rather than traditional username and password combinations. Roles allow temporary privilege escalation without altering the underlying user identity. The flowchart below clarifies how IAM differentiates between human users and programmatic workloads:

![The image illustrates a flowchart for Identity and Access Management (IAM), showing two types of users: "Human User" and "Programmatic Workload," both leading to "Authenticate" and then "Authorize."](https://kodekloud.com/kk-media/image/upload/v1752860496/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-IAM-Overview/iam-flowchart-users-authenticate-authorize.jpg)

## Primary IAM Identities

IAM utilizes three primary types of identities (principals):

1.  **Users** – Individual identities with their own credentials.
2.  **Groups** – Collections of users that share common permissions.
3.  **Roles** – Identities that can be assumed by users or services, providing temporary access.

_(While a fourth method involving external authentication—such as Active Directory—exists, this lesson focuses on users, groups, and roles.)_

The diagram below illustrates how these identities interact with policies to grant or deny permissions:

![The image is a diagram explaining AWS Identity and Access Management (IAM), showing how it manages identities (users, groups, roles) and permissions (policies).](https://kodekloud.com/kk-media/image/upload/v1752860497/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-IAM-Overview/aws-iam-identity-permissions-diagram.jpg)

A policy is a set of permission statements that define what actions each principal can perform. For instance, a role might provide temporary administrative privileges—similar to how the "sudo" command works in Linux.

> [!important]
> **Root User Best Practices**
>
> The root user has full administrative control with no restrictions (unless limited by AWS Organizations). It is best practice to use the root user only to create your first IAM user and not for daily administrative tasks.

The diagram below outlines the root user's responsibilities:

![The image outlines four responsibilities of a root user: full administrative access, account and billing management, IAM management, and closing the AWS account.](https://kodekloud.com/kk-media/image/upload/v1752860498/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-IAM-Overview/root-user-responsibilities-aws.jpg)

IAM users, which are created within IAM, must have unique identities. They gain permissions either directly or, more commonly, via group memberships. This mechanism allows for flexible and consistent permission management. For example, while individual users like Smith and Clark may have specially tailored policies, they typically inherit a consistent set of permissions as members of a group (e.g., a development or operations group).

## IAM User Credentials

IAM users can have several types of credentials:

- **Console Passwords:** For AWS Management Console access.
- **Access Keys:** For programmatic access via the AWS CLI or SDKs.
- **SSH Keys:** For AWS CodeCommit (though CodeCommit is slated for retirement).
- **Server Certificates:** For specialized access requirements.

The following diagram illustrates various forms of IAM user credentials:

![The image is a diagram illustrating IAM user credentials, including console password, access keys, SSH keys for CodeCommit, and server certificates.](https://kodekloud.com/kk-media/image/upload/v1752860500/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-IAM-Overview/iam-user-credentials-diagram.jpg)

Certain scenarios require user-based access rather than role-based access, such as:

- Emergency access to an AWS account.
- Workloads that cannot use IAM roles (e.g., AWS CodeCommit and Amazon Keyspaces).
- Access by third-party AWS clients.

The diagram below details these scenarios:

![The image outlines three IAM user use cases: emergency access to AWS accounts, workloads that can't use IAM roles (such as AWS CodeCommit and Amazon Keyspaces), and third-party AWS clients.](https://kodekloud.com/kk-media/image/upload/v1752860501/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-IAM-Overview/iam-user-use-cases-aws.jpg)

Remember that IAM roles are intended to be assumed by a principal. Without an underlying principal (like an IAM user or a trusted service), a role cannot function, which is especially critical in scenarios involving third-party infrastructures or specific AWS services.

IAM users work well for individual accounts, but they can become challenging to manage at scale across multiple accounts. In these cases, AWS Organizations—augmented by single sign-on via the IAM Identity Center or federated identities (e.g., Active Directory)—provides a more scalable solution. The diagram below highlights some limitations of using IAM users for access management:

![The image lists reasons why IAM users are not ideal for AWS access management, including lack of scalability, limited centralized visibility, difficulty implementing security best practices, challenging permission management, and the existence of better alternatives.](https://kodekloud.com/kk-media/image/upload/v1752860502/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-IAM-Overview/iam-users-aws-access-issues.jpg)

## IAM Groups

An IAM group is simply a collection of users; note that groups cannot be nested within other groups. This design simplifies access management by ensuring consistent permission application, streamlining onboarding, and reducing human error. The diagram below illustrates group structures:

![The image illustrates two IAM group structures: one with individual users connected to a group, marked with a check, and another with a group connected to another group, marked with a cross.](https://kodekloud.com/kk-media/image/upload/v1752860503/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-IAM-Overview/iam-group-structures-diagram.jpg)

Key features of IAM groups include:

![The image outlines three features of IAM Groups: simplified access management, consistent permission application, and easier onboarding and role changes.](https://kodekloud.com/kk-media/image/upload/v1752860504/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-IAM-Overview/iam-groups-features-diagram.jpg)

## Principle of Least Privilege

A foundational security best practice embedded throughout IAM is the principle of least privilege. This means granting only the minimum permissions necessary for task completion, regardless of whether the permissions are assigned to users, groups, or roles. The following diagram summarizes this principle:

![The image illustrates the "Least Privilege Principle" in AWS, showing an IAM user with specific actions granted through IAM policies to access AWS services.](https://kodekloud.com/kk-media/image/upload/v1752860505/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-IAM-Overview/least-privilege-principle-aws-iam.jpg)

A common strategy is to begin with AWS managed policies, which are pre-configured and maintained by AWS. Keep in mind that these policies cannot be modified. After evaluating them over a trial period, you may choose to implement customer-managed (custom) policies with more tightly controlled permissions. The diagram below outlines the steps involved in establishing least-privilege permissions:

![The image outlines three steps for preparing least-privilege permissions: starting with AWS managed policies, reviewing after a sample period, and creating a custom policy.](https://kodekloud.com/kk-media/image/upload/v1752860506/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-IAM-Overview/least-privilege-permissions-steps.jpg)

## Summary

In summary, AWS Identity and Access Management (IAM) is a fundamental service that allows you to manage who can access your AWS resources and what they are allowed to do. By adhering to security best practices—especially the principle of least privilege—and effectively utilizing IAM users, groups, and roles, you can significantly enhance the security of your AWS account.

We'll catch you in the next lesson.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/0c9bb9a3-5201-434e-8085-a9f1e9f23f22/lesson/22fcde2b-ba0d-4635-a42d-0ee67845b6fd)**
>
> Watch video content
