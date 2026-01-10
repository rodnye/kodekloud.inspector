# Config - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Security/Config)

---

## Table of Contents

- Config
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Security

# Config

In this lesson, we explore AWS Config—a comprehensive AWS service that continuously monitors, records, and tracks your AWS resource configurations along with any changes. AWS Config creates a historical timeline of resource states, making it indispensable for auditing, compliance, and security management.

![The image illustrates AWS Config, showing a connection between a cloud configuration icon and various AWS resources, represented by icons for storage, compute, and other services.](https://kodekloud.com/kk-media/image/upload/v1752865764/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Config/aws-config-cloud-resources-illustration.jpg)

Think of AWS Config as a librarian in a busy library. Just as a librarian meticulously records who checked out a book and when it was borrowed and returned, AWS Config continuously tracks how each of your AWS resources is configured and used.

Before AWS Config was introduced, organizations often encountered several challenges, including:

- Lack of complete visibility into resource configurations.
- Time-consuming, error-prone manual audits or reliance on ad hoc scripts.
- Configuration drift where resources deviated from their intended state.
- Increased security and compliance risks due to misconfigured resources.
- Difficulty understanding dependencies and relationships between resources.

![The image lists five challenges faced before using AWS Config: lack of visibility, manual configuration auditing, configuration drift, security and compliance risks, and resource relationship mapping.](https://kodekloud.com/kk-media/image/upload/v1752865765/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Config/aws-config-challenges-visibility-auditing.jpg)

> [!important]
> **Key Advantages of AWS Config**
>
> AWS Config addresses these challenges by:
>
> - Keeping an inventory of all your AWS resources.
> - Continuously monitoring and recording resource configurations.
> - Capturing configuration changes over time.
> - Reporting non-compliant resources.
> - Enabling corrective actions through configurable rules.
> - Sending notifications whenever a resource configuration changes.
> - Analyzing relationships among different resources.

The following table summarizes the key features of AWS Config and their benefits:

| AWS Config Feature         | Benefit                                                     |
| -------------------------- | ----------------------------------------------------------- |
| Inventory Management       | Maintains an up-to-date list of all AWS resources.          |
| Continuous Monitoring      | Records real-time changes in resource configurations.       |
| Configuration History      | Stores historical configuration data for auditing purposes. |
| Compliance Reporting       | Detects non-compliant resources through rule evaluations.   |
| Notification & Remediation | Automatically triggers alerts and remediation actions.      |

![The image lists AWS Config use cases, including inventory management, monitoring configurations, detecting changes, reporting non-compliance, and sending notifications for configuration changes.](https://kodekloud.com/kk-media/image/upload/v1752865766/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Config/aws-config-use-cases-list.jpg)

For example, if an employee modifies the security groups for an EC2 instance, AWS Config quickly detects and records the change. These configuration logs are then stored in an S3 bucket, and you can seamlessly integrate notifications or Lambda functions to trigger custom remediation actions when specific events occur.

Furthermore, AWS Config features a robust rules-based system. With these rules, you define criteria and conditions to assess the compliance and overall configuration of your resources. AWS provides pre-defined rules that adhere to security best practices, or you can create custom rules tailored to your specific requirements.

![The image shows a list of AWS Config Rules related to EC2, including details like rule names, labels, evaluation modes, and descriptions. It appears to be a screenshot from a management console interface.](https://kodekloud.com/kk-media/image/upload/v1752865768/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Config/aws-config-rules-ec2-screenshot.jpg)

For instance, one rule verifies whether HTTP to HTTPS redirection is configured on all HTTP listeners of an Application Load Balancer. If one or more HTTP listeners lack this configuration, the rule marks the resource as non-compliant, thereby enforcing best practices and ensuring secure communication via HTTPS.

In summary, AWS Config is a powerful automation tool that tracks AWS resource configurations, detects changes, and enforces security and compliance standards. Its continuous monitoring and rules-based evaluation help streamline resource management, address configuration drift, and mitigate potential compliance issues.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/6b2d9e18-1714-499c-83d4-4d1f7ff29e66/lesson/b5c78d0f-0306-431a-a851-e8fd3a3195c4)**
>
> Watch video content
