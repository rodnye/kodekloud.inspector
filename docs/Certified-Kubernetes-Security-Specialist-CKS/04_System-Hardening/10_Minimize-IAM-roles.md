# Minimize IAM roles - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/System-Hardening/Minimize-IAM-roles)

---

## Table of Contents

- Minimize IAM roles
  - Understanding Root and IAM User Roles
  - Creating IAM Users and Groups
  - Managing Permissions for AWS Resources
  - Continual Review and Auditing
  - Conclusion
  - Watch Video
    - Example: AWS Account Setup
    - Simplifying Permissions with IAM Groups

---

## Content

Certified Kubernetes Security Specialist (CKS)

System Hardening

# Minimize IAM roles

In this lesson, we explore how to implement the principle of least privilege using Identity and Access Management (IAM) on public cloud platforms like AWS. The "least privilege" strategy ensures that each user or service has only the necessary permissions to perform its tasks, thereby reducing the risk of unauthorized access.

## Understanding Root and IAM User Roles

Earlier, we discussed the different types of accounts in Linux and why using a root user for daily operations is not advisable. Similarly, in public cloud platforms like AWS, the root account created during signup holds full administrative privileges. Although you initially access the AWS Management Console using the email associated with the root account, it's best practice to use this account only to create new IAM users and assign them the appropriate permissions. Once new IAM user accounts are set up, the root credentials should be securely stored and used only when absolutely necessary.

> [!important]
> **Note**
>
> Avoid using the root account for everyday tasks. Instead, delegate responsibilities using IAM users and groups to enforce the principle of least privilege.

### Example: AWS Account Setup

Consider a scenario where a user named Mark (mark@example.com) creates a new AWS account. Initially, Mark signs in using his root credentials, which grants him full administrative privileges. To secure his environment, Mark should create individual IAM users for team members rather than relying on the root account for daily operations.

## Creating IAM Users and Groups

Let's create several new IAM users: Lucy, Shiva, Abdul, and Anita.

![The image shows an AWS root account hierarchy diagram with four users: Lucy, Shiva, Abdul, and Anita.](https://kodekloud.com/kk-media/image/upload/v1752871741/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-Minimize-IAM-roles/frame_120.jpg)

Cloud providers, by default, assign minimal permissions to new users. In AWS, a user's capabilities are determined by the permissions defined in their IAM roles. For example, if Shiva, Abdul, and Anita are developers needing to create EC2 instances and access S3 buckets, you would attach policies granting only these essential permissions.

![The image shows a diagram of user permissions for AmazonEC2Create and AmazonS3BucketAccess, with checkmarks and crosses indicating access levels for Shiva, Abdul, and Anita.](https://kodekloud.com/kk-media/image/upload/v1752871742/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-Minimize-IAM-roles/frame_160.jpg)

### Simplifying Permissions with IAM Groups

For easier management, group users with similar roles into an IAM group. An IAM group allows you to grant the same set of permissions to multiple users by attaching policies directly to the group. For instance, create a "Developer Group" that includes Shiva, Abdul, and Anita, and attach the necessary policies for EC2 and S3 access.

![The image shows an IAM group named "Developer Group" with members Shiva, Abdul, and Anita, linked to permissions for AmazonEC2Create and AmazonS3BucketAccess.](https://kodekloud.com/kk-media/image/upload/v1752871744/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-Minimize-IAM-roles/frame_180.jpg)

## Managing Permissions for AWS Resources

Permissions management isn’t limited to human users; AWS resources also require explicit access controls. For example, an EC2 instance that needs to access S3 buckets does not have inherent permissions. To enable access, create an IAM role—such as "S3 Access Role"—and attach the same policies used for the developer group. This role should then be assigned to the EC2 instance.

It’s important to note that unlike user accounts, you cannot attach an IAM policy directly to an AWS resource. Always use IAM roles to ensure that AWS services operate with only the minimum required permissions.

> [!important]
> **Security Warning**
>
> Avoid alternative methods of granting access (like providing programmatic keys directly) as they are generally less secure. Use IAM roles to minimize risk and adhere to the principle of least privilege.

![The image illustrates an AWS architecture involving S3BucketAccessRole, AmazonS3BucketAccess, and an S3 bucket, showing access permissions and role assignments.](https://kodekloud.com/kk-media/image/upload/v1752871745/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-Minimize-IAM-roles/frame_300.jpg)

## Continual Review and Auditing

Regular audits of your IAM policies and permissions are crucial to maintaining a secure environment. Periodically review and remove any unused permissions. AWS provides built-in tools like [AWS Trusted Advisor](https://aws.amazon.com/premiumsupport/trustedadvisor) for real-time security checks and recommendations. Equivalent tools include [Security Command Center](https://cloud.google.com/security-command-center) in Google Cloud and [Azure Advisor](https://azure.microsoft.com/en-us/services/advisor/) in Microsoft Azure.

## Conclusion

It is essential to understand and apply least privilege principles using IAM roles to safeguard your cloud infrastructure. While IAM details might not be the primary focus of certification exams, having a solid grasp of these concepts is beneficial.

![The image shows logos for AWS Trusted Advisor, Google Cloud's Security Command Center, and Azure Advisor, representing cloud security and advisory services from Amazon, Google, and Microsoft.](https://kodekloud.com/kk-media/image/upload/v1752871748/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-Minimize-IAM-roles/frame_340.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/d67be5ee-871d-4435-a187-382610cb6a1f/lesson/e61a4d59-3c31-4374-880f-87a0386691f4)**
>
> Watch video content
