# AWS Config - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-IAM/Configure-AWS-IAM-at-Scale/AWS-Config)

---

## Table of Contents

- AWS Config
  - PCI Compliance Workflow
  - Key AWS Config Functions
  - PCI Conformance Pack Overview
  - Demo: Deploying the PCI Conformance Pack
  - Next Steps
  - References
  - Watch Video

---

## Content

AWS - IAM

Configure AWS IAM at Scale

# AWS Config

In this guide, we’ll explore how to leverage **AWS Config** and a **PCI Conformance Pack** to ensure your AWS environment adheres to the Payment Card Industry Data Security Standard (PCI DSS). You’ll learn how to continuously monitor configuration changes, enforce encryption and logging rules, and quickly remediate non-compliant resources.

## PCI Compliance Workflow

The diagram below illustrates how AWS Config, paired with a PCI conformance pack, enforces critical controls—such as S3 bucket encryption, access policies, and logging—across your AWS account.

![The image illustrates a process for ensuring PCI compliance using AWS Config and a Conformance Pack to enforce S3 bucket encryption, logging, and access policies.](https://kodekloud.com/kk-media/image/upload/v1752862930/notes-assets/images/AWS-IAM-AWS-Config/pci-compliance-aws-config-s3-practices.jpg)

## Key AWS Config Functions

AWS Config provides the following core capabilities to help you maintain and audit compliance:

- **Configuration Tracking:** Records detailed history of resource configurations.
- **Compliance Assessment:** Evaluates resources against rules defined in conformance packs.
- **Change Management:** Maintains a timeline of changes for troubleshooting and auditing.

![The image explains AWS Config, highlighting its functions: tracking configuration changes, enforcing compliance, and managing changes for troubleshooting.](https://kodekloud.com/kk-media/image/upload/v1752862931/notes-assets/images/AWS-IAM-AWS-Config/aws-config-functions-tracking-compliance.jpg)

For deeper details, see the [AWS Config Developer Guide](https://docs.aws.amazon.com/config/latest/developerguide/).

## PCI Conformance Pack Overview

A PCI conformance pack is a curated collection of managed AWS Config rules and remediation actions mapped to PCI DSS requirements. Typical rules include:

| Rule Name                                  | Description                                                     |
| ------------------------------------------ | --------------------------------------------------------------- |
| `s3-bucket-server-side-encryption-enabled` | Ensures all S3 buckets have default encryption enabled.         |
| `cloudtrail-enabled`                       | Verifies that AWS CloudTrail is enabled in every region.        |
| `iam-password-policy`                      | Checks that the IAM password policy meets complexity standards. |

> [!important]
> **Note**
>
> You can customize managed rules or add AWS Config Custom Rules using AWS Lambda to address organization-specific requirements.

## Demo: Deploying the PCI Conformance Pack

Follow these steps to deploy and evaluate the PCI conformance pack in your AWS account:

1.  Sign in to the [AWS Management Console](https://console.aws.amazon.com/).
2.  Navigate to **AWS Config** in the Services menu.
3.  In the left pane, select **Conformance packs**.
4.  Click **Deploy conformance pack**, then choose **PCI Compliance** from the AWS-managed list.
5.  Review parameters (if any), then click **Deploy**.

![The image is a slide titled "Demo: Make sure we are PCI compliant," showing steps to configure AWS for PCI compliance, including opening AWS Config, opening Conformance Packs, and applying a PCI Compliance Conformance pack.](https://kodekloud.com/kk-media/image/upload/v1752862932/notes-assets/images/AWS-IAM-AWS-Config/pci-compliance-aws-configuration-demo.jpg)

Once deployed, AWS Config immediately evaluates your resources against the PCI rules and highlights any compliance violations on the **Conformance packs** dashboard.

## Next Steps

- Review non-compliant resources and apply automated or manual remediations.
- Configure AWS Config delivery channels to aggregate configuration snapshots in an S3 bucket.
- Set up Amazon SNS notifications for real-time alerts on compliance drift.

## References

- [AWS Config Documentation](https://docs.aws.amazon.com/config/latest/developerguide/)
- [PCI Security Standards Council](https://www.pcisecuritystandards.org/)
- [AWS Managed Rules for AWS Config](https://docs.aws.amazon.com/config/latest/developerguide/managed-rules-by-aws-config.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-iam/module/586f5114-fd4d-45e3-88ba-6a691fde129c/lesson/bf925c1b-279b-4f09-a1cd-ed1dccefa2ea)**
>
> Watch video content
