# Turning up Security on Security Services Part 1 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Designing-for-Security/Turning-up-Security-on-Security-Services-Part-1)

---

## Table of Contents

- Turning up Security on Security Services Part 1
  - The Power of Access Control
  - Auditing Services
  - The Power of Detection
  - The Power of Encryption
  - Watch Video
    - AWS CloudTrail
    - AWS Config
    - AWS Artifact
    - AWS GuardDuty
    - AWS Inspector
    - Amazon Macie
    - AWS Security Hub
    - AWS Key Management Service (KMS) and CloudHSM

---

## Content

AWS Solutions Architect Associate Certification

Designing for Security

# Turning up Security on Security Services Part 1

Welcome back, Solutions Architects!

In this lesson, we delve into the final section on security by focusing on secure design principles and enhancing security within AWS services. This guide highlights how to leverage AWS security tools for robust access control, comprehensive auditing, proactive threat detection, and advanced encryption.

---

## The Power of Access Control

Access control is a cornerstone of cloud security. In AWS, Identity and Access Management (IAM) is your first line of defense. While IAM provides secure defaults and industry standard practices, there are additional measures that can further harden your environment.

![The image is a diagram about AWS Identity and Access Management (IAM), highlighting its importance for security, who can access it, the permissions involved, and the resources within an AWS organization.](https://kodekloud.com/kk-media/image/upload/v1752864495/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Security-Services-Part-1/aws-iam-security-access-diagram.jpg)

IAM enforces industry standards such as tracking API calls via AWS CloudTrail and reviewing permissions through IAM policies. To boost security further, consider the following best practices:

- Enable multi-factor authentication (MFA) to add an extra layer of protection.
- Apply the principle of least privilege by assigning roles that grant only the essential permissions.

A practical example involves using CloudFormation templates to enforce role assignments and require MFA—ensuring that access depends on both something the user knows and something they possess.

![The image is a diagram illustrating the process of designing for security using AWS Identity and Access Management (IAM) and CloudFormation. It shows how a customer account interacts with a company's account using AWS services, emphasizing the use of MFA with IAM.](https://kodekloud.com/kk-media/image/upload/v1752864497/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Security-Services-Part-1/aws-iam-cloudformation-security-diagram.jpg)

A common practice is to define specific IAM roles for individual AWS resources—such as EC2, S3, or DynamoDB—so that each service only has the minimal permissions it requires.

![The image is a guide on using AWS IAM to manage cloud infrastructure securely, focusing on defining specific IAM roles for each resource type to ensure minimal necessary permissions. It presents four options for adhering to security policies regarding IAM access.](https://kodekloud.com/kk-media/image/upload/v1752864498/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Security-Services-Part-1/aws-iam-roles-security-guide.jpg)

> [!important]
> **Tips for Secure Credential Management**
>
> Avoid embedding sensitive credentials like secret keys directly in CloudFormation templates or in Git repositories. Use AWS Secrets Manager or AWS Systems Manager Parameter Store to securely manage and store sensitive data.

![The image is a diagram illustrating AWS IAM security practices, emphasizing not to add sensitive credentials to CloudFormation templates, with components like AWS Secrets Manager and security credentials.](https://kodekloud.com/kk-media/image/upload/v1752864499/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Security-Services-Part-1/aws-iam-security-practices-diagram.jpg)

Consider the management of database credentials, for example: securely store them using Secrets Manager or Parameter Store. In addition, IAM’s integration with CloudTrail and its Access Analyzer assists in verifying permissions and ensuring they adhere strictly to your security policies.

![The image presents a scenario where a software company needs to manage database credentials securely using AWS IAM, offering four approaches: hardcoding in the IAM template, using AWS Secrets Manager, encrypting with AWS KMS, and storing in an S3 bucket.](https://kodekloud.com/kk-media/image/upload/v1752864500/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Security-Services-Part-1/aws-iam-database-credentials-management.jpg)

CloudTrail is your primary tool for monitoring API calls and any changes to IAM or CloudFormation resources. For detailed tracking, review CloudTrail event logs regularly.

![The image shows a screenshot of an AWS CloudFormation console with a list of stack events, statuses, and timestamps. It also includes a note about IAM reporting events to CloudTrail and the CloudFormation console.](https://kodekloud.com/kk-media/image/upload/v1752864502/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Security-Services-Part-1/aws-cloudformation-stack-events-screenshot.jpg)

Additionally, AWS IAM Identity Center (formerly Single Sign-On) is a robust option for managing secure access across multiple AWS accounts. Integrated with AWS Organizations, it enforces permission boundaries and verified access consistently.

![The image is a diagram illustrating the design for security using an IAM Identity Center (SSO) setup, showing the integration of on-premises Active Directory with AWS IAM Identity Center for managing user access and roles.](https://kodekloud.com/kk-media/image/upload/v1752864503/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Security-Services-Part-1/iam-identity-center-security-diagram.jpg)

Expanding IAM capabilities into web and mobile applications is achieved with AWS Cognito. Cognito user pools store user profiles and identity pools provide roles and permissions to access services such as API Gateway or DynamoDB. Continuously apply the least privilege approach and enable CloudTrail logging for enhanced auditability.

![The image is a slide discussing approaches to improve authentication reliability using Amazon Cognito for a mobile app, with four options listed for consideration.](https://kodekloud.com/kk-media/image/upload/v1752864504/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Security-Services-Part-1/amazon-cognito-authentication-approaches.jpg)

When integrating with external identity providers like Microsoft Active Directory, security fidelity hinges on proper configuration and enforcing trust relationships. Ultimately, the objective remains to enforce strict and secure access policies irrespective of the platform.

![The image is a diagram illustrating the integration of AWS Microsoft AD with various services and applications, highlighting its use for AD integration and security. It shows connections between AWS services, EC2 instances, AD-aware workloads, cloud applications, and on-premises AD.](https://kodekloud.com/kk-media/image/upload/v1752864506/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Security-Services-Part-1/aws-microsoft-ad-integration-diagram.jpg)

AWS Verified Permissions introduces a language-based method for enforcing security policies using Cedar. This innovative approach validates that granted permissions do not exceed defined policy templates and offers streamlined policy testing and validation.

![The image is a diagram explaining "Designing for Security – Verified Permissions," focusing on creating policy validation and access management using Amazon Verified Permissions and Cognito. It outlines steps like creating schemas, managing policies, and authorizing access, with integration into services like Amazon API Gateway and AWS Lambda.](https://kodekloud.com/kk-media/image/upload/v1752864507/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Security-Services-Part-1/designing-for-security-verified-permissions-diagram.jpg)

---

## Auditing Services

Auditing is essential for tracking changes and monitoring configurations across your AWS environment. Key services include CloudTrail, CloudWatch, and AWS Config.

### AWS CloudTrail

CloudTrail logs API call activities and is capable of exporting these logs to Amazon S3—a process that should always be paired with encryption via AWS Key Management Service (KMS). Additionally, CloudTrail Lake and Security Lake enhance log analysis and query capabilities.

![The image shows a screenshot of the AWS CloudTrail interface displaying event history, with a note stating that CloudTrail mainly holds API calls which are not sensitive per se.](https://kodekloud.com/kk-media/image/upload/v1752864508/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Security-Services-Part-1/aws-cloudtrail-event-history-screenshot.jpg)

### AWS Config

AWS Config continuously captures changes within your environment and encrypts data both at rest and in transit by default. Although the control options are limited, you can customize rules and notifications to ensure continual compliance with your security policies.

![The image shows a configuration interface for AWS Config, detailing options for recording strategies, resource categories, data retention periods, and AWS Config roles. It highlights that AWS Config captures all changes.](https://kodekloud.com/kk-media/image/upload/v1752864509/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Security-Services-Part-1/aws-config-configuration-interface.jpg)

### AWS Artifact

AWS Artifact provides on-demand access to AWS compliance reports and certification documents, including ISO 27001 and PCI DSS reports. While Artifact does not directly influence security controls, it is vital for auditing and maintaining compliance standards.

![The image is a slide titled "Designing for Security – Artifact," showing a list of AWS compliance and agreement documents. It notes that Artifact has no security implications because it shares these documents.](https://kodekloud.com/kk-media/image/upload/v1752864510/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Security-Services-Part-1/designing-for-security-artifact-documents.jpg)

---

## The Power of Detection

Detection tools help identify threats and vulnerabilities before they can be exploited. AWS offers several detection-focused services that provide continuous monitoring and insightful analytics.

### AWS GuardDuty

GuardDuty employs machine learning and threat intelligence to analyze DNS logs, VPC flow logs, and CloudTrail events. It detects anomalies and potential threats, automatically forwarding findings to AWS Security Hub for centralized management.

![The image is a diagram explaining AWS GuardDuty, a security service that uses machine learning and AI to detect anomalies in network traffic. It outlines data sources, security analytics, security findings, and integration options.](https://kodekloud.com/kk-media/image/upload/v1752864511/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Security-Services-Part-1/aws-guardduty-security-diagram.jpg)

GuardDuty continuously monitors network activity, providing critical insights into suspicious behavior and reinforcing your overall security posture.

![The image describes how AWS GuardDuty can help a financial services company improve its security by identifying potential security risks, offering insights into network traffic, and checking for security gaps and best practices.](https://kodekloud.com/kk-media/image/upload/v1752864512/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Security-Services-Part-1/aws-guardduty-security-improvement.jpg)

### AWS Inspector

AWS Inspector is a vulnerability assessment service that scans EC2 instances, containers, and Lambda functions for known vulnerabilities. It automatically conducts scans and reports findings, making it a valuable service for regular security assessments.

![The image is a screenshot of the AWS Inspector dashboard, showing environment coverage and critical findings for security scanning, with a focus on Lambda functions.](https://kodekloud.com/kk-media/image/upload/v1752864513/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Security-Services-Part-1/aws-inspector-dashboard-lambda-security.jpg)

### Amazon Macie

Amazon Macie specializes in detecting and classifying sensitive data within S3 buckets, such as personally identifiable information (PII). As Macie continuously monitors S3 buckets, additional security configurations are typically not required.

![The image is a flowchart illustrating how Amazon Macie scans S3 buckets for sensitive data, using AWS services like EventBridge, Lambda, and Glacier to manage data based on sensitivity.](https://kodekloud.com/kk-media/image/upload/v1752864514/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Security-Services-Part-1/amazon-macie-s3-bucket-flowchart.jpg)

### AWS Security Hub

AWS Security Hub centralizes and aggregates security findings from multiple AWS services like GuardDuty, Inspector, and Macie. While the service itself is inherently secure, ensure that IAM access restrictions to the Security Hub dashboard are properly configured.

![The image shows a screenshot of a security findings dashboard from a Security Hub, listing various security issues with their severity, company, product, and status. It also includes a note stating that the Security Hub centralizes security findings while being inherently secure.](https://kodekloud.com/kk-media/image/upload/v1752864515/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Security-Services-Part-1/security-findings-dashboard-screenshot.jpg)

---

## The Power of Encryption

Data encryption is vital in protecting information both at rest and in transit. AWS provides robust encryption solutions to safeguard your data.

### AWS Key Management Service (KMS) and CloudHSM

AWS Key Management Service (KMS) and CloudHSM are foundational for data encryption in AWS. KMS is a multi-tenant service that integrates seamlessly with many AWS services, while CloudHSM offers a dedicated single-tenant hardware security module for organizations with stringent security requirements. Both solutions support key rotation and fine-tuned access control via IAM policies.

![The image is a diagram explaining the security design of AWS KMS/CloudHSM, showing the flow of certificates and keys through various hardware components. It includes AWS and manufacturer root certificates, hardware certificates, and customer keys and certificates.](https://kodekloud.com/kk-media/image/upload/v1752864516/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Security-Services-Part-1/aws-kms-cloudhsm-security-diagram.jpg)

For scenarios like enforcing strict key controls for S3 encryption, KMS is typically the ideal solution. If dedicated hardware separation is required, migrating to CloudHSM is the recommended approach.

---

This lesson provided an in-depth overview of enhancing security across various AWS services—from strengthening access control using IAM and Cognito, auditing environment changes with CloudTrail and AWS Config, detecting potential threats with GuardDuty and Inspector, to securing data via KMS and CloudHSM. Each service offers a range of built-in security features along with advanced options to further harden your AWS environment.

Keep these principles in mind as you design and implement secure architectures in AWS.

Happy architecting!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/fcdcac66-6274-4b2f-912a-d6e9de511e5a/lesson/5e048836-39a5-4a77-9eb9-13bc7707d11e)**
>
> Watch video content
