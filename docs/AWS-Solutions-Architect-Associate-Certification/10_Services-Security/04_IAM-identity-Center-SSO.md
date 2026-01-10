# IAM identity Center SSO - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Security/IAM-identity-Center-SSO)

---

## Table of Contents

- IAM identity Center SSO
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Security

# IAM identity Center SSO

In this lesson, we explore IAM Identity Center—a service that extends traditional AWS IAM functionality by providing centralized authentication and authorization across multiple AWS accounts. By the end of this guide, you'll understand the operational differences and advantages of using IAM Identity Center over standard IAM.

Imagine an organization managing several AWS accounts. In a traditional setup, if a user (for example, Bob) requires access to resources in accounts one, two, and three, you must manually create an IAM user in each account with the necessary permissions. This repetitive process becomes even more cumbersome when another employee, Mark, needs access to different sets of accounts.

![The image shows a diagram of three AWS accounts, each with icons representing users, computing, storage, and networking resources. It is labeled "Identity Center" and is copyrighted by KodeKloud.](https://kodekloud.com/kk-media/image/upload/v1752865865/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-IAM-identity-Center-SSO/aws-accounts-identity-center-diagram.jpg)

Managing authentication and authorization across multiple AWS accounts comes with several challenges:

- Duplicated user management tasks due to creating separate IAM users in each account.
- Inconsistent permissions, as changes in one account need manual replication in others, resulting in configuration drift.
- Complex auditing processes because of the absence of centralized tracking.
- Time-consuming role definitions and individual permission management for each AWS account and application.

![The image lists four challenges faced before using an Identity Center: multiple user directories, inconsistent permissions, auditing difficulties, and time-consuming processes.](https://kodekloud.com/kk-media/image/upload/v1752865866/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-IAM-identity-Center-SSO/identity-center-challenges-list.jpg)

> [!important]
> **Centralized Management Advantage**
>
> IAM Identity Center centralizes user management, allowing you to create users once and assign them to various AWS accounts with defined permission sets. This drastically reduces administrative overhead and minimizes errors.

IAM Identity Center simplifies operations by letting you manage users from a single location. Instead of creating a new user in every account, you define a user once within the Identity Center and assign them appropriate access to specific accounts. This centralized approach streamlines access control and enhances security.

![The image illustrates an AWS IAM Identity Center managing three AWS accounts, each represented with icons for users, computing, storage, and networking resources.](https://kodekloud.com/kk-media/image/upload/v1752865867/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-IAM-identity-Center-SSO/aws-iam-identity-center-accounts.jpg)

The operational model of IAM Identity Center is similar to that of traditional IAM. Here’s how it works:

1.  Create users in the Identity Center.
2.  Assign users to specific AWS accounts.
3.  Define user permissions using a "permission set," which is essentially a collection of one or more IAM policies indicating what actions the user can perform in the account.

![The image illustrates an AWS IAM Identity Center setup, showing permission sets, AWS accounts, and an AD group, with a connection to an AWS account and a process or service.](https://kodekloud.com/kk-media/image/upload/v1752865868/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-IAM-identity-Center-SSO/aws-iam-identity-center-setup.jpg)

When a user initiates an action in AWS, IAM Identity Center handles both authentication and authorization. Unlike traditional IAM—where users are created and managed individually in each account—IAM Identity Center allows for integration with well-known cloud identity providers such as Active Directory, OneLogin, Okta, and Microsoft Active Directory. This integration facilitates Single Sign-On (SSO) access to AWS resources and various applications.

IAM Identity Center also integrates seamlessly with business cloud applications like managed Grafana services, SageMaker, and Systems Manager, as well as custom SAML-enabled applications. This versatility makes it an effective solution for centralized workforce identity management.

> [!important]
> **Key Benefits**
>
> - Centralized user management across multiple AWS accounts
> - Streamlined process with permission sets
> - Integration with popular cloud identity providers
> - Simplified auditing and reduced configuration drift
> - Scalable and free of charge for AWS access management

In summary, Amazon Identity Center—formerly AWS Single Sign-On—is a powerful and centralized platform designed to connect or create workforce identities in AWS. It simplifies access management across multiple AWS accounts and applications, scales effortlessly, and even supports SSO for Amazon EC2.

![The image is a diagram illustrating the AWS IAM Identity Center (SSO) process, showing how a web browser interacts with AWS cloud services, business cloud apps, and custom SAML 2-enabled apps through the IAM Identity Center, which retrieves user identities from Active Directory or a built-in identity store.](https://kodekloud.com/kk-media/image/upload/v1752865869/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-IAM-identity-Center-SSO/aws-iam-identity-center-sso-diagram.jpg)

![The image is an informational graphic about AWS Identity Center, highlighting its features such as being the successor to AWS Single Sign-On, a central platform for workforce identities, centralized access management, and being free of charge.](https://kodekloud.com/kk-media/image/upload/v1752865870/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-IAM-identity-Center-SSO/aws-identity-center-features-graphic.jpg)

For more detailed information on managing AWS identities and access, check out the [AWS Documentation](https://aws.amazon.com/documentation/) and the [IAM Identity Center User Guide](https://docs.aws.amazon.com/singlesignon/latest/userguide/what-is.html).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/6b2d9e18-1714-499c-83d4-4d1f7ff29e66/lesson/778c8406-826b-4f77-9e41-23befa77092f)**
>
> Watch video content
