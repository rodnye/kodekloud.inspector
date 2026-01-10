# Triggering Automated Actions With AWS Config - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-1-Monitoring-Logging-and-Remediation/Triggering-Automated-Actions-With-AWS-Config)

---

## Table of Contents

- Triggering Automated Actions With AWS Config
  - How AWS Config Works
  - Challenges Without AWS Config
  - Benefits of Using AWS Config
  - Conclusion
  - Watch Video

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 1 Monitoring Logging and Remediation

# Triggering Automated Actions With AWS Config

Welcome to this lesson on using AWS Config to trigger automated actions. Contrary to what its name might imply, AWS Config doesn't perform configuration tasks; instead, it monitors and tracks changes to your AWS resource configurations. By offering complete visibility into the state and evolution of your environment, AWS Config empowers you to assess current settings, audit historical configurations, and maintain compliance.

> [!important]
> **Quick Insight**
>
> Think of AWS Config as a detailed library catalog maintained by a diligent librarian. Every addition, removal, or alteration is recorded, ensuring you always have an up-to-date inventory of your resources.

## How AWS Config Works

AWS Config continuously monitors your resource configurations and sends notifications whenever changes occur. When configured with remediation rules, it can automatically enforce compliance by either reverting or mitigating unauthorized changes.

![The image illustrates AWS Config, showing a cloud icon connected to various AWS service icons, including a bucket, a chip, a container, and a database.](https://kodekloud.com/kk-media/image/upload/v1752859963/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Triggering-Automated-Actions-With-AWS-Config/aws-config-cloud-services-illustration.jpg)

Imagine AWS Config operating as a librarian within a vast library: every book (resource) is cataloged, and any deviations from the established rules trigger a response. These responses can be either manual alerts or automated remediation actions that immediately address the issue.

![The image illustrates AWS Config with icons representing a user, a library of books, configuration settings, and a cloud.](https://kodekloud.com/kk-media/image/upload/v1752859965/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Triggering-Automated-Actions-With-AWS-Config/aws-config-user-books-cloud-icons.jpg)

## Challenges Without AWS Config

Without AWS Config, managing your AWS environment can lead to several issues:

- Lack of visibility into resource configurations
- Reliance on manual configuration auditing
- Gradual configuration drift over time
- Increased security and compliance risks
- Difficulty in mapping resource relationships

Without automation, these challenges can quickly compound, making it harder to maintain a secure and efficient environment.

> [!important]
> **Attention**
>
> Manual configuration tracking not only consumes valuable time but also increases the likelihood of errors, potentially jeopardizing your security and compliance posture.

## Benefits of Using AWS Config

AWS Config simplifies and enhances configuration management by automating the tracking and auditing process. Here’s how it can help:

| Benefit                           | Description                                                                                   |
| --------------------------------- | --------------------------------------------------------------------------------------------- |
| Continuous Monitoring             | Provides real-time tracking of all AWS resource configurations.                               |
| Automated Detection & Remediation | Detects and immediately addresses configuration drift through pre-set rules.                  |
| Enhanced Security & Compliance    | Helps maintain a secure environment by mitigating risks associated with unauthorized changes. |
| Resource Relationship Mapping     | Offers a clear understanding of dependencies and interactions within your system.             |

Additionally, AWS Config allows you to set up automated remediation actions. For example, upon detecting an unauthorized change, a Lambda function can be triggered to either automatically revert the change or take necessary steps to mitigate the issue. This self-healing capability not only enhances security but also ensures your infrastructure remains compliant.

![The image lists five challenges faced before using AWS Config: lack of visibility, manual configuration auditing, configuration drift, security and compliance risks, and resource relationship mapping.](https://kodekloud.com/kk-media/image/upload/v1752859966/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Triggering-Automated-Actions-With-AWS-Config/aws-config-challenges-list.jpg)

## Conclusion

AWS Config is an essential tool for managing modern AWS environments. Its ability to continuously monitor resource configurations, automatically detect compliance issues, and initiate remediation actions significantly boosts your security and operational efficiency. By providing a clear mapping of resource relationships and dependencies, AWS Config equips you with the insights needed to manage and safeguard your infrastructure effectively.

Thank you for following along. We look forward to exploring more topics in our next lesson.

For further reading, consider checking out the following resources:

- [AWS Config Documentation](https://docs.aws.amazon.com/config/)
- [AWS Security Best Practices](https://aws.amazon.com/architecture/security-best-practices/)
- [AWS Lambda Documentation](https://docs.aws.amazon.com/lambda/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/e7f728df-5d8d-4dbb-80f6-33c15cde3034/lesson/d14c1b95-a9db-40a3-8af0-3c19961830c7)**
>
> Watch video content
