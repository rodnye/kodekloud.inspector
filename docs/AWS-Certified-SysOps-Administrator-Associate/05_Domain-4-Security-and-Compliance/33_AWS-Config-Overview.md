# AWS Config Overview - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-4-Security-and-Compliance/AWS-Config-Overview)

---

## Table of Contents

- AWS Config Overview
  - AWS Config Rules and Evaluations
  - Remediation Options
  - Conformance Packs and Aggregation
  - Summary
  - Watch Video

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 4 Security and Compliance

# AWS Config Overview

Welcome to this comprehensive lesson on AWS Config. In this article, you'll learn how AWS Config provides detailed visibility into your AWS resources, offers robust auditing capabilities, and integrates seamlessly with other AWS services to maintain compliance.

AWS Config does not perform configuration tasks itself. Instead, it continuously records configuration changes across your AWS resources, allowing you to review what was configured and how it changed over time.

![The image illustrates AWS Config providing visibility into various AWS resources, represented by icons for different services.](https://kodekloud.com/kk-media/image/upload/v1752860350/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-AWS-Config-Overview/aws-config-visibility-resources-icons.jpg)

Unlike CloudTrail—which logs all API calls—AWS Config focuses on tracking resource configuration changes according to your defined rules. This focused capability is essential for auditing, compliance checks, and ensuring that your resources adhere to your security policies.

Key functions of AWS Config include:

- Maintaining a historical version of your service settings.
- Keeping an inventory of all AWS resources.
- Continuously monitoring resources for changes.
- Notifying you or triggering automated responses (e.g., via AWS Lambda) when a configuration rule is violated.

![The image describes AWS Config, highlighting its features: keeping inventory of AWS resources, continuous monitoring of resource configuration, and automatic notifications on resource changes.](https://kodekloud.com/kk-media/image/upload/v1752860350/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-AWS-Config-Overview/aws-config-features-inventory-monitoring.jpg)

Think of AWS Config as a library catalog that tracks and records every item and its changes. It answers critical questions such as: "What changed?", "Who made the change?", "When did it change?" and "Where was the change applied?" This historical tracking is vital for conducting audits, generating compliance reports, and triggering remediation actions.

For example, consider a library where a book is checked out—the librarian tracks who borrowed it, when it was borrowed, and when it is due back. Similarly, AWS Config logs who modified configurations, what was changed, and when the changes occurred.

![The image illustrates a concept related to AWS Config, depicting a user checking out a book from a library, with questions about who borrowed it, when it is borrowed, and when it is due back.](https://kodekloud.com/kk-media/image/upload/v1752860351/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-AWS-Config-Overview/aws-config-library-book-checkout.jpg)

This service supports auditing for almost every AWS service—whether it’s EC2 instances, S3 buckets, or additional resources—helping you ensure consistent compliance with your baseline policies.

![The image illustrates AWS Config, highlighting its functions of auditing and reporting AWS resources to help locate resources, check configurations, and assess compliance.](https://kodekloud.com/kk-media/image/upload/v1752860353/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-AWS-Config-Overview/aws-config-auditing-reporting.jpg)

Without AWS Config, gaining visibility into environment changes becomes challenging. Manual audits are time-consuming, configuration drift can go unnoticed, and significant compliance issues may arise, increasing security risks. AWS Config addresses these challenges by mapping resource relationships and accurately tracking changes.

![The image lists five challenges faced before using AWS Config: lack of visibility, manual configuration auditing, configuration drift, security and compliance risks, and resource relationship mapping.](https://kodekloud.com/kk-media/image/upload/v1752860354/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-AWS-Config-Overview/aws-config-challenges-list.jpg)

AWS Config is primarily used for inventory tracking, continuous monitoring, and auditing. It reports on non-compliant resources and can trigger notifications or remediation actions when policies are not met. Additionally, it maintains relationships between resources, illustrating the upstream impact of any configuration changes.

![The image outlines AWS Config use cases, including reporting on non-compliant resources, sending notifications for configuration changes, and analyzing resource relationships.](https://kodekloud.com/kk-media/image/upload/v1752860355/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-AWS-Config-Overview/aws-config-use-cases-diagram.jpg)

Each configuration item in AWS Config represents a snapshot of a resource’s metadata, attributes, relationships (for example, S3 buckets associated with Lambda functions), its current configuration, and related API events. AWS collectively refers to these snapshots as "resources."

![The image is a diagram illustrating a "Configuration Item" with five connected elements: Metadata, Attributes, Relationships, Current Configuration, and Related Events.](https://kodekloud.com/kk-media/image/upload/v1752860356/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-AWS-Config-Overview/configuration-item-diagram-elements.jpg)

AWS Config automatically creates a configuration item whenever a resource is created, updated, or deleted. You can set the recording frequency to trigger on every change, every 10 minutes, hourly, or daily—depending on your resource sensitivity.

![The image explains when AWS Config creates a configuration item: when a resource is created, updated, or deleted, and at a defined recording frequency.](https://kodekloud.com/kk-media/image/upload/v1752860357/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-AWS-Config-Overview/aws-config-configuration-item-timeline.jpg)

The historical collection of these items, known as configuration history, provides valuable context regarding how a resource evolves over time. This data is stored in an S3 bucket, where records are grouped by creation, updates, and deletions.

![The image shows a diagram titled "Configuration History" with two icons representing configuration items, labeled as version 1 and version 2.](https://kodekloud.com/kk-media/image/upload/v1752860358/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-AWS-Config-Overview/configuration-history-version-icons-diagram.jpg)

![The image illustrates a process where multiple "Resource Creation" elements combine to form a "Configuration Item" using a "Configuration Recorder."](https://kodekloud.com/kk-media/image/upload/v1752860359/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-AWS-Config-Overview/resource-creation-configuration-item-diagram.jpg)

AWS Config delivers configuration data to various destinations:

- Storing data in an S3 bucket.
- Publishing notifications through SNS.
- Triggering AWS Lambda functions for automated remediation.

![The image illustrates AWS Config's delivery channel options, specifying S3 Bucket and SNS as destinations for configuration items.](https://kodekloud.com/kk-media/image/upload/v1752860360/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-AWS-Config-Overview/aws-config-delivery-channel-options.jpg)

For example, if you choose S3 as your storage destination, ensure that AWS Config has the necessary permissions to access the bucket. Alternatively, using SNS allows subscribers to receive emails or text messages, and even trigger Lambda functions.

![The image illustrates a delivery channel using S3 for configuration data, including items, snapshots, and history.](https://kodekloud.com/kk-media/image/upload/v1752860361/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-AWS-Config-Overview/s3-delivery-channel-configuration-data.jpg)

In this example, AWS Config monitors services such as S3, EC2, ECS, and DynamoDB for configuration changes. When a change is detected, it records the change, triggers remediation actions, and sends notifications concurrently.

![The image illustrates a flowchart of AWS resources, showing connections between various AWS services like S3, Lambda, and others, with a focus on configuration management.](https://kodekloud.com/kk-media/image/upload/v1752860362/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-AWS-Config-Overview/aws-resources-flowchart-configuration.jpg)

---

## AWS Config Rules and Evaluations

AWS Config rules help determine whether a configuration complies with specific requirements. For instance, one rule might verify that an Application Load Balancer (ALB) redirects HTTP traffic to HTTPS. This detective rule monitors configurations and alerts you if non-compliance is detected without automatically remediating the condition.

![The image shows a list of AWS Config Rules related to EC2, including details like rule names, labels, supported evaluation modes, and descriptions. The interface allows users to search and filter these rules.](https://kodekloud.com/kk-media/image/upload/v1752860364/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-AWS-Config-Overview/aws-config-rules-ec2-list.jpg)

Another rule might ensure that EC2 Auto Scaling groups tied to a Classic Load Balancer are using appropriate health checks. This proactive rule not only detects non-compliant states but can also trigger notifications or remediation actions upon violations.

Compliance is clearly indicated: for example, an EC2 volume that is not encrypted might be marked as "non-compliant," whereas an encrypted volume is shown as "compliant."

![The image illustrates how AWS Config Rules work, showing four status indicators: "Compliant" with a green check, "Non-Compliant" with a red cross, "Error" with an orange warning, and "Not Applicable" with a gray "NA".](https://kodekloud.com/kk-media/image/upload/v1752860364/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-AWS-Config-Overview/aws-config-rules-status-indicators.jpg)

There are two primary evaluation modes in AWS Config:

1.  **Proactive Evaluation:**  
    Checks configuration changes before they are applied. For example, if there is an attempt to open a port on an EC2 instance, this mode can block the change before it is committed.
2.  **Detective Evaluation:**  
    Monitors and assesses changes after they occur, identifying non-compliant configurations without preventing the change.

AWS Config also uses different trigger types to determine when a rule is evaluated:

- **Configuration Changes Trigger:** Evaluation occurs immediately after a configuration change.
- **Periodic Trigger:** Evaluations are performed at regular, configured intervals.
- **Hybrid Trigger:** Combines immediate evaluations with periodic checks.

![The image describes three AWS Config trigger types: Configuration Changes Trigger, Periodic Trigger, and Hybrid Trigger, each with specific functions for compliance checks.](https://kodekloud.com/kk-media/image/upload/v1752860366/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-AWS-Config-Overview/aws-config-trigger-types-diagram.jpg)

---

## Remediation Options

AWS Config goes beyond monitoring by also triggering remediation actions to address non-compliant changes. These actions may include:

- Activating AWS Systems Manager.
- Triggering an AWS Lambda function.
- Sending notifications to prompt manual intervention.

Predefined rules can automate remediation, or you can define custom actions using AWS Lambda or Systems Manager documents. This automation minimizes risks by rapidly correcting non-compliant configurations.

![The image illustrates a process for remediating noncompliant AWS resources, showing monitoring, checking for noncompliance, and triggering remediation actions like AWS Systems Manager, AWS Lambda functions, and manual interventions.](https://kodekloud.com/kk-media/image/upload/v1752860367/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-AWS-Config-Overview/aws-remediation-process-diagram.jpg)

![The image is a comparison between "Managed Remediation Actions" and "Custom Remediation Actions" for AWS noncompliant resources, highlighting predefined AWS solutions versus user-defined actions using AWS Lambda or Systems Manager.](https://kodekloud.com/kk-media/image/upload/v1752860368/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-AWS-Config-Overview/aws-remediation-actions-comparison.jpg)

---

## Conformance Packs and Aggregation

AWS Config also provides conformance packs—collections of pre-packaged AWS Config rules and remediation actions that can be deployed as one package. You can apply these packs across an entire account, a region, or even an AWS Organizations unit. Conformance packs are typically created using YAML templates and managed via Systems Manager documents.

![The image illustrates the concept of a "Conformance Pack," which consists of AWS Config managed or custom rules combined with remediation actions.](https://kodekloud.com/kk-media/image/upload/v1752860369/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-AWS-Config-Overview/conformance-pack-aws-config-rules.jpg)

Another key feature is the AWS Config Aggregator. This tool centralizes configuration data across multiple accounts, regions, and organizational units. It aggregates information on resource configurations and their compliance, offering a unified view that is invaluable for large-scale governance.

![The image is a flowchart illustrating the AWS Config Aggregator process, showing the collection of AWS Config data from multiple accounts and regions, aggregation of configuration and compliance data, and the resulting aggregated view.](https://kodekloud.com/kk-media/image/upload/v1752860370/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-AWS-Config-Overview/aws-config-aggregator-flowchart.jpg)

![The image explains the AWS Config Aggregator, showing it collects data from multiple accounts and regions, single accounts with multiple regions, and organizations using AWS Organizations.](https://kodekloud.com/kk-media/image/upload/v1752860372/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-AWS-Config-Overview/aws-config-aggregator-diagram.jpg)

![The image lists the benefits of AWS Config Aggregator, including centralized compliance view, efficient governance, scalability, and cross-account and cross-region management. Each benefit is represented with a numbered icon and a brief description.](https://kodekloud.com/kk-media/image/upload/v1752860373/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-AWS-Config-Overview/aws-config-aggregator-benefits-list.jpg)

The aggregator provides a comprehensive view of your resources and their compliance status, making it easier to monitor non-compliant assets and manage overall compliance.

---

## Summary

AWS Config is an essential service for tracking AWS resource configurations, auditing changes, and ensuring compliance. Its ability to detect non-compliant changes—whether proactively or retrospectively—automate remediation actions, and aggregate data across multiple accounts makes it a vital tool for managing large-scale environments.

By understanding the differences between proactive and detective evaluation modes, the various trigger types, and available remediation options, you are now better equipped to implement and manage configuration compliance within your AWS environments.

> [!important]
> **Note**
>
> Leveraging AWS Config not only helps in maintaining compliance but also simplifies the process of auditing and governance in dynamic cloud environments.

This concludes our lesson on AWS Config. Happy configuring!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/0c9bb9a3-5201-434e-8085-a9f1e9f23f22/lesson/c8d4309d-1cd5-4302-ba2c-53b9e574cc6d)**
>
> Watch video content
