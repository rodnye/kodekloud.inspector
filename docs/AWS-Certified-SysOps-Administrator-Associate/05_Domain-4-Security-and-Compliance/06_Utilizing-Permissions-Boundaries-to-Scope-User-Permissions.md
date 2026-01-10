# Utilizing Permissions Boundaries to Scope User Permissions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-4-Security-and-Compliance/Utilizing-Permissions-Boundaries-to-Scope-User-Permissions)

---

## Table of Contents

- Utilizing Permissions Boundaries to Scope User Permissions
  - Watch Video

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 4 Security and Compliance

# Utilizing Permissions Boundaries to Scope User Permissions

Welcome back. In this lesson, we delve into AWS Identity and Access Management (IAM) permission boundaries—a mechanism that defines the maximum permissions a user, group, or role can have. While the use case might not seem apparent at first, understanding permission boundaries is crucial, especially since exam scenarios often incorporate them.

Permission boundaries provide an extra layer of restriction. Even if a user's identity-based policy grants extensive permissions, the permission boundary ensures that actions beyond the defined limits cannot be performed.

![The image illustrates the concept of "Permissions Boundaries" as a feature in AWS Identity and Access Management (IAM), defining the maximum permissions a user or role can have.](https://kodekloud.com/kk-media/image/upload/v1752860662/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Utilizing-Permissions-Boundaries-to-Scope-User-Permissions/permissions-boundaries-aws-iam.jpg)

Imagine granting developers full access to a non-production account while preventing them from accessing certain sensitive services—such as quantum computing or blockchain services. Even if an identity-based policy allows broad permissions, a permission boundary restricts specific actions, offering an extra safeguard for sensitive scenarios.

![The image is about "Permissions Boundaries" and features an icon of a lock with circuit lines, indicating a security concept. It mentions providing an extra security layer to restrict broader IAM permissions within the boundary.](https://kodekloud.com/kk-media/image/upload/v1752860664/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Utilizing-Permissions-Boundaries-to-Scope-User-Permissions/permissions-boundaries-security-icon.jpg)

Within an AWS account, identity-based policies determine which actions are allowed. Permission boundaries further constrain these actions by setting an upper limit. For example, an identity-based policy might enable a user to perform several actions on an S3 bucket, but a permission boundary can prevent uploading objects even if listing the bucket contents is allowed.

![The image illustrates the concept of permissions boundaries, showing a comparison between limited access and full access, with icons representing permissions boundaries and identity-based policy.](https://kodekloud.com/kk-media/image/upload/v1752860665/notes-assetshttps://kodekloud.com/kk-media/image/upload/v1752860665/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Utilizing-Permissions-Boundaries-to-Scope-User-Permissions/permissions-boundaries-access-comparison.jpg)

It is important to note that explicit denies always take precedence over allows. Regardless of whether a denial comes from an identity-based policy or a permission boundary, if any policy explicitly denies an action, that action is blocked.

![The image is a Venn diagram illustrating the relationship between identity-based policies and permissions boundaries, highlighting their overlap as effective permissions. It also notes that an explicit deny in any policy overrides an allow.](https://kodekloud.com/kk-media/image/upload/v1752860666/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Utilizing-Permissions-Boundaries-to-Scope-User-Permissions/identity-policies-permissions-venn-diagram.jpg)

For instance, if a permission boundary restricts the ability to upload objects to an S3 bucket while the identity-based policy permits uploads, the user will be denied the upload action because the most restrictive rule applies.

![The image illustrates identity-based policies with permission boundaries for an S3 bucket, showing that listing objects is allowed while uploading objects is not.](https://kodekloud.com/kk-media/image/upload/v1752860667/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Utilizing-Permissions-Boundaries-to-Scope-User-Permissions/identity-based-policies-s3-bucket.jpg)

Effective permissions for a user result from the intersection of their identity-based policies and any restrictions imposed by permission boundaries. Although permission boundaries may not be used daily, they become particularly valuable when balancing broad administrative permissions with necessary restrictions.

In multi-account environments, AWS Organizations and Service Control Policies (SCPs) play a key role. SCPs apply permission restrictions at an organization-wide level across all accounts. While SCPs are part of AWS Organizations and not IAM, they complement identity-based policies, resource-based policies, and permission boundaries to define a user's effective permissions.

![The image illustrates the concept of permissions boundaries, showing a comparison between limited access and full access, with icons representing permissions boundaries and identity-based policy.](https://kodekloud.com/kk-media/image/upload/v1752860665/notes-assetshttps://kodekloud.com/kk-media/image/upload/v1752860665/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Utilizing-Permissions-Boundaries-to-Scope-User-Permissions/permissions-boundaries-access-comparison.jpg)

Identity-based policies, resource-based policies, and permission boundaries work together, and explicit denies from any of these layers will block an action—even if other policies allow it.

![The image is a Venn diagram illustrating how identity-based policies and permissions boundaries work together to ensure effective permissions. It shows overlapping areas representing the combination of these policies.](https://kodekloud.com/kk-media/image/upload/v1752860668/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Utilizing-Permissions-Boundaries-to-Scope-User-Permissions/identity-policies-permissions-diagram.jpg)

When managing multiple accounts, consider organizing them into Organizational Units (OUs) such as Dev, Staging, and Prod. SCPs applied at the OU level provide centralized control over permissions, complementing the account-level restrictions enforced by permission boundaries and identity-based policies.

![The image is a Venn diagram illustrating the intersection of resource-based policies, identity-based policies, and permissions boundaries, highlighting their effective permissions.](https://kodekloud.com/kk-media/image/upload/v1752860669/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Utilizing-Permissions-Boundaries-to-Scope-User-Permissions/venn-diagram-resource-identity-permissions.jpg)

![The image is a diagram illustrating Service Control Policies (SCPs) with organizational units (OUs) like Dev, Staging, and Prod, and an individual account, connected by arrows.](https://kodekloud.com/kk-media/image/upload/v1752860671/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Utilizing-Permissions-Boundaries-to-Scope-User-Permissions/scp-diagram-organizational-units.jpg)

At the account level, effective permissions are determined by the identity-based policy, resource-based policy, and permission boundary. When SCPs are added to the mix, they extend the control across the entire organization. Again, any explicit deny from these policies will block the action:

![The image is a Venn diagram illustrating the intersection of "Organizations SCP," "Permissions Boundary," and "Identity-Based Policy," highlighting the area of "Effective permissions."](https://kodekloud.com/kk-media/image/upload/v1752860672/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Utilizing-Permissions-Boundaries-to-Scope-User-Permissions/venn-diagram-effective-permissions.jpg)

Another important aspect is session policies, which are applied when using the AWS Security Token Service (STS). These policies temporarily restrict permissions during a session, and permission boundaries continue to enforce their restrictions even in these temporary sessions.

![The image is a Venn diagram illustrating "Session Policies With Permissions Boundaries," showing the intersection of Session Policy, Permissions Boundary, and Identity-Based Policy to determine effective permissions.](https://kodekloud.com/kk-media/image/upload/v1752860673/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Utilizing-Permissions-Boundaries-to-Scope-User-Permissions/session-policies-permissions-boundaries-venn-diagram.jpg)

Consider a practical example: A central IAM administrator grants a developer access to a role that permits actions on various resources (such as multiple S3 buckets or DynamoDB tables). If a permission boundary restricts access to a sensitive S3 bucket, that restriction will take precedence—even if the identity-based policy allows access.

![The image illustrates an AWS IAM permissions setup, showing how a central IAM admin assigns permissions to a developer, who then uses IAM roles for Function A and Function B to access various AWS services like Amazon EC2, DynamoDB, S3, and RDS, with certain access restrictions.](https://kodekloud.com/kk-media/image/upload/v1752860674/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Utilizing-Permissions-Boundaries-to-Scope-User-Permissions/aws-iam-permissions-setup-diagram.jpg)

In another scenario, a developer might have two roles: one with general access and another with more sensitive access. A permission boundary applied to the sensitive role ensures that even if the role grants broader permissions, access to critical resources is effectively denied.

To summarize, AWS effective permissions are achieved by combining identity-based policies, resource-based policies, session policies, and permission boundaries. In multi-account environments, SCPs add an additional layer of control. Remember, any explicit deny in any policy layer will override permissive settings, ensuring that your security restrictions remain enforced.

> [!important]
> **Note**
>
> Always design your AWS security policies by considering the intersection of all policy types. Understanding how identity-based policies, resource-based policies, permission boundaries, and SCPs work together will help prevent unintended permissions and enhance overall security.

This concludes our lesson on utilizing permission boundaries to scope user permissions. We hope this explanation clarifies the concept and assists you in preparing for AWS exams or deploying robust AWS security policies.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/0c9bb9a3-5201-434e-8085-a9f1e9f23f22/lesson/b8d36dcc-fb00-47dd-8adb-245e11ab5000)**
>
> Watch video content
