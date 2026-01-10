# Enabling Service Control Policies to Scope Account Permissions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-4-Security-and-Compliance/Enabling-Service-Control-Policies-to-Scope-Account-Permissions)

---

## Table of Contents

- Enabling Service Control Policies to Scope Account Permissions
  - Components of an SCP
  - Summary of Key Points
  - Watch Video

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 4 Security and Compliance

# Enabling Service Control Policies to Scope Account Permissions

Welcome back! In this lesson, we dive deeper into Service Control Policies (SCPs) and their role in managing permissions across multiple accounts within AWS Organizations. Previously, we covered permission boundaries for scoping account permissions. Now, let’s explore how SCPs function as essential guardrails to enforce compliance and governance.

SCPs are a core feature of AWS Organizations designed to manage permissions across your entire organization, individual organizational units (OUs), or specific accounts. It is important to know that SCPs do not grant permissions by themselves. Instead, they serve as limits on the maximum set of permissions that can be granted through identity-based or resource-based policies.

![The image shows a section of the AWS Organizations interface, highlighting different types of policies such as AI services opt-out, backup, service control, and tag policies, with their statuses indicated as enabled or disabled.](https://kodekloud.com/kk-media/image/upload/v1752860467/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Enabling-Service-Control-Policies-to-Scope-Account-Permissions/aws-organizations-policies-interface.jpg)

In the screenshot above, notice the display of AI services, backup, and tag policies. Although our focus is on SCPs, be aware that additional policies—such as backup and tag policies—are also important and may appear in certification exams.

Before SCPs take effect, they must be explicitly enabled within your organization. If you are using AWS Control Tower, SCPs are enabled by default.

> [!important]
> **Key Distinction**
>
> SCPs only limit permissions. Unlike identity-based policies that grant permissions, SCPs restrict what can be allowed. For instance, if an SCP restricts access to Amazon EC2, even if an identity policy grants that permission, the restriction imposed by the SCP prevails.

![The image illustrates the concept of Service Control Policies (SCPs) showing how they provide full access, which is then limited for IAM users.](https://kodekloud.com/kk-media/image/upload/v1752860468/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Enabling-Service-Control-Policies-to-Scope-Account-Permissions/service-control-policies-iam-access.jpg)

Consider these important points:

- SCPs set the maximum permissions allowed within an account—they don't grant any permissions.
- If both an identity-based policy and an SCP permit an action, the user can perform that action.
- If an SCP denies an action, that denial takes precedence, even if IAM or resource-based policies grant access.
- SCPs apply only to IAM users and roles within the organization; they do not affect resource-based policies or policies for accounts outside the organization.
- SCPs can restrict actions for the root user, which is not a characteristic of standard IAM policies.

![The image illustrates the relationship between SCPs (Service Control Policies) and IAM (Identity and Access Management) policies, showing that an SCP denial overrides an IAM policy allowance for actions like S3:PutObject.](https://kodekloud.com/kk-media/image/upload/v1752860470/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Enabling-Service-Control-Policies-to-Scope-Account-Permissions/scp-iam-policy-relationship-diagram.jpg)

![The image is a comparison table between SCP (Service Control Policies) and IAM (Identity and Access Management) Policies, highlighting their purpose, scope of effect, and permission granting capabilities. SCPs set guardrails for maximum permissions within an AWS Organization, while IAM Policies grant permissions to specific users, groups, or roles.](https://kodekloud.com/kk-media/image/upload/v1752860471/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Enabling-Service-Control-Policies-to-Scope-Account-Permissions/scp-vs-iam-policies-comparison.jpg)

![The image is a comparison table between SCP and IAM Policies, highlighting their effects on the root user and their syntax, both using JSON.](https://kodekloud.com/kk-media/image/upload/v1752860472/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Enabling-Service-Control-Policies-to-Scope-Account-Permissions/scp-iam-policies-comparison-table.jpg)

Every IAM user or role within your organization will only be able to execute actions if those actions are allowed by SCPs and subsequently granted by their individual policies. If an IAM user or role does not have any policies attached, no access is permitted—even if the SCP may allow specific actions.

![The image is an infographic explaining SCPs (Service Control Policies) with five key points about their effects and limitations on IAM users and roles within an organization.](https://kodekloud.com/kk-media/image/upload/v1752860474/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Enabling-Service-Control-Policies-to-Scope-Account-Permissions/scp-infographic-iam-users-roles.jpg)

Additionally, SCPs do not impact service-linked roles or resource-based policies. Their influence is limited exclusively to identity-based policies within your AWS Organization.

## Components of an SCP

An SCP is written in JSON, very similar to IAM policies. Consider the example below, which explicitly denies access to EC2 and S3 actions on all resources unless the request originates from the "us-west-2" region (Oregon):

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Deny",  // Denies specific actions for all resources if not in the specified region
      "Action": [
        "ec2:*",  // Denies all EC2 actions
        "s3:*"    // Denies all S3 actions
      ],
      "Resource": "*",  // Applies to all resources
      "Condition": {    // Specifies conditions to enforce the restriction
        "StringNotEquals": {
          "aws:RequestedRegion": "us-west-2" // Denies actions if not in the "us-west-2" region
        }
      }
    }
  ]
}
```

In this example, the condition restricts EC2 and S3 actions to only the "us-west-2" region. If the condition is not met, access to these services is denied.

By design, SCPs require explicit allow statements to enable access to particular services. An SCP that grants broad permissions can enable various actions, but if no explicit allow statement exists, the default behavior is to deny access. Similarly, an explicit deny statement within an SCP overrides any permissions granted through identity-based policies.

![The image illustrates a hierarchy of AWS accounts and organizational units with Service Control Policies (SCPs) indicating allowed and denied actions or services. It shows how SCPs are applied at different levels, affecting member accounts.](https://kodekloud.com/kk-media/image/upload/v1752860475/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Enabling-Service-Control-Policies-to-Scope-Account-Permissions/aws-account-hierarchy-scp-diagram.jpg)

Be cautious when implementing SCPs. Removing an SCP that granted broad permissions without having another explicit allow statement can result in a state where no actions are permitted. For example, if you deny all access to machine learning services through an SCP, no identity-based policy can override that denial.

![The image illustrates a hierarchy of AWS accounts with Service Control Policies (SCPs) showing allowed and denied actions or services. It includes a root account, organizational units (OU), and member accounts with visual indicators for policy effects.](https://kodekloud.com/kk-media/image/upload/v1752860477/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Enabling-Service-Control-Policies-to-Scope-Account-Permissions/aws-account-hierarchy-scp-diagram-2.jpg)

## Summary of Key Points

| Feature             | SCPs                                                         | IAM Policies                                                  |
| ------------------- | ------------------------------------------------------------ | ------------------------------------------------------------- |
| Purpose             | Set guardrails to restrict maximum permissions               | Grant permissions to users, groups, or roles                  |
| Primary Function    | Only limits permissions; does not grant access               | Grants access based on defined permissions                    |
| Scope               | Affects IAM users and roles within an AWS Organization       | Applies to targeted IAM entities                              |
| Impact on Root User | Can restrict root user actions                               | Typically does not restrict the root user                     |
| Enforcement         | Deny overrides any explicit allow by identity-based policies | Permissions are cumulative unless explicitly denied by an SCP |

SCPs in AWS Organizations are a powerful way to enforce permission boundaries across your environment. They ensure that member accounts can only perform actions explicitly allowed by both the SCPs and attached identity-based policies.

> [!important]
> **Best Practices**
>
> Always design your SCPs carefully. Ensure that necessary services remain accessible to member accounts while undesired actions are effectively blocked. Including explicit allow statements for essential services is key to maintaining proper access control.

Thank you for reading this lesson on Service Control Policies. Use this guidance to enhance your understanding of managing permissions and improving governance across your AWS Organization.

For further information, explore:

- [AWS Organizations Documentation](https://docs.aws.amazon.com/organizations/)
- [Understanding AWS Service Control Policies](https://aws.amazon.com/organizations/scps/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/0c9bb9a3-5201-434e-8085-a9f1e9f23f22/lesson/19d3b786-2b3c-4a19-9717-59ee9eb01917)**
>
> Watch video content
