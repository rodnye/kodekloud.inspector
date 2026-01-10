# AWS Organizations - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-IAM/Configure-AWS-IAM-at-Scale/AWS-Organizations)

---

## Table of Contents

- AWS Organizations
  - Management Account and Organizational Units
  - Key Benefits of AWS Organizations
  - Links and References
  - Watch Video
    - Creating Your Management Account
    - Organizing With OUs

---

## Content

AWS - IAM

Configure AWS IAM at Scale

# AWS Organizations

AWS Organizations is a service for centralized governance, billing, and access control across multiple AWS accounts. By structuring accounts into a hierarchy, you can enforce policies, streamline resource sharing, and maintain compliance at scale.

## Management Account and Organizational Units

### Creating Your Management Account

The management account (formerly the “master” account) acts as the root of your AWS Organization. It holds billing responsibility and delegates policy management to Organizational Units (OUs) or individual member accounts.

### Organizing With OUs

1.  Create one or more **Organizational Units (OUs)** under the management (root) account.
2.  Move or add member accounts into these OUs.
3.  Apply Service Control Policies (SCPs) at the OU level for inherited governance.

> [!important]
> **Warning**
>
> Avoid using the root user for everyday tasks. Instead, assign permissions through IAM roles in member accounts to reduce security risk.

![The image is a diagram of an AWS Organizations structure, showing a hierarchy with a root management account, organizational units, and member accounts.](https://kodekloud.com/kk-media/image/upload/v1752862934/notes-assets/images/AWS-IAM-AWS-Organizations/aws-organizations-structure-diagram.jpg)

Any SCP attached to an OU automatically cascades to all nested OUs and member accounts. You can also target SCPs directly to individual accounts when a specialized policy is required.

> [!important]
> **Note**
>
> Service Control Policies (SCPs) define the maximum available permissions for IAM identities in accounts, but they don’t grant permissions by themselves.

## Key Benefits of AWS Organizations

AWS Organizations unlocks powerful features for enterprises:

![The image lists the benefits of AWS Organizations, including centralized billing, resource sharing, access management, compliance, and simplified account management.](https://kodekloud.com/kk-media/image/upload/v1752862935/notes-assets/images/AWS-IAM-AWS-Organizations/aws-organizations-benefits-list.jpg)

| Benefit                       | Description                                                                          |
| ----------------------------- | ------------------------------------------------------------------------------------ |
| Centralized Billing           | Aggregate charges from all member accounts into one monthly invoice.                 |
| Resource Sharing              | Share VPCs, RDS, EC2, S3, and more across accounts with AWS Resource Access Manager. |
| Access Management             | Enforce uniform IAM policies and manage credentials organization‐wide.               |
| Compliance                    | Apply security baselines and audit controls centrally to meet regulatory needs.      |
| Simplified Account Management | Monitor and administer all accounts from a single, unified dashboard.                |

## Links and References

- [AWS Organizations Documentation](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_introduction.html)
- [Service Control Policies (SCPs)](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html)
- [AWS Resource Access Manager](https://docs.aws.amazon.com/ram/latest/userguide/what-is.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-iam/module/586f5114-fd4d-45e3-88ba-6a691fde129c/lesson/9a3caddf-68b8-475d-8f78-ee9d1172fae8)**
>
> Watch video content
