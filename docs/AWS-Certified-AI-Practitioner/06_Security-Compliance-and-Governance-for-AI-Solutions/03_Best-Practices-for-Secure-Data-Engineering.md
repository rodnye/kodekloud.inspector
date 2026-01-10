# Best Practices for Secure Data Engineering - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-AI-Practitioner/Security-Compliance-and-Governance-for-AI-Solutions/Best-Practices-for-Secure-Data-Engineering)

---

## Table of Contents

- Best Practices for Secure Data Engineering
  - Securing Compute Resources and Cloud Infrastructure
  - Securing Cloud Infrastructure with VPCs
  - Data Privacy and PII Protection
  - Access Control and Data Integrity
  - Assessing Data Quality for Machine Learning
  - Conclusion
  - Watch Video

---

## Content

AWS Certified AI Practitioner

Security Compliance and Governance for AI Solutions

# Best Practices for Secure Data Engineering

In this lesson, we explore secure data engineering with best practices that help maintain security and data integrity in cloud environments. We focus on key AWS services and techniques tailor-made for data engineering, ensuring both practical applications and exam readiness.

> [!important]
> **Overview**
>
> This lesson covers secure cloud configurations, data privacy, network security, and access controls, ensuring robust protection for sensitive data and compute resources.

Our agenda includes:

- Secure cloud configurations using Virtual Private Clouds (VPCs)
- Data privacy assurance with tools like Amazon Macie
- Effective access controls using AWS Identity and Access Management (IAM)
- Data integrity practices including encryption, version control, and auditing
- Evaluating data quality for Machine Learning (ML) models

![The image is an introduction slide for "Secure Data Engineering on AWS," highlighting three key areas: network security configuration, data privacy assurance, and access control implementation.](https://kodekloud.com/kk-media/image/upload/v1752857736/notes-assets/images/AWS-Certified-AI-Practitioner-Best-Practices-for-Secure-Data-Engineering/secure-data-engineering-aws-intro.jpg)

## Securing Compute Resources and Cloud Infrastructure

To secure compute resources, leverage Virtual Private Clouds (VPCs) to isolate your workloads. For example, Amazon Macie scans S3 buckets for PII, while SageMaker security is enhanced by managing access permissions. AWS also offers robust auditing tools like CloudTrail and firewall configurations to ensure a secure environment.

![The image is an introduction slide for "Secure Data Engineering on AWS," featuring icons for Amazon Virtual Private Cloud, Amazon Macie, and Amazon SageMaker.](https://kodekloud.com/kk-media/image/upload/v1752857737/notes-assets/images/AWS-Certified-AI-Practitioner-Best-Practices-for-Secure-Data-Engineering/secure-data-engineering-aws-intro-2.jpg)

## Securing Cloud Infrastructure with VPCs

When configuring a VPC, it is best practice to deploy instances within private subnets. Follow these guidelines:

- Configure instance-level firewalls (security groups) and network-level firewalls (network access control lists).
- Utilize VPC interface endpoints to privatize traffic, enforce encryption, or establish secure VPN or Direct Connect links using MACsec.
- Always select a private subnet with an appropriate security group for launching SageMaker notebooks to restrict direct internet access.

![The image illustrates a Virtual Private Cloud (VPC) setup with a private subnet and a public subnet, each containing an instance, connected through a network.](https://kodekloud.com/kk-media/image/upload/v1752857738/notes-assets/images/AWS-Certified-AI-Practitioner-Best-Practices-for-Secure-Data-Engineering/vpc-setup-private-public-subnets.jpg)

Ensure network access control lists (ACLs) work in tandem with security groups. VPC endpoints help maintain traffic on the AWS backbone, reducing exposure to the public internet.

![The image outlines the benefits of VPC-Only Mode for SageMaker, highlighting restricted network traffic, prevention of public endpoint access, and enhanced security through private connections.](https://kodekloud.com/kk-media/image/upload/v1752857739/notes-assets/images/AWS-Certified-AI-Practitioner-Best-Practices-for-Secure-Data-Engineering/vpc-only-mode-benefits-sagemaker.jpg)

![The image is an infographic about using VPC Interface Endpoints with PrivateLink, highlighting direct AWS service connection, secure network paths, and data retention within AWS.](https://kodekloud.com/kk-media/image/upload/v1752857740/notes-assets/images/AWS-Certified-AI-Practitioner-Best-Practices-for-Secure-Data-Engineering/vpc-interface-endpoints-privatelink-infographic.jpg)

## Data Privacy and PII Protection

For robust data privacy, especially when handling sensitive information, use Amazon Macie to scan for PII in your S3 buckets. Configure AWS Config to trigger additional preventative actions—like locking a bucket when PII is detected—ensuring continuous compliance and data protection.

![The image illustrates Amazon Macie's role in data privacy and compliance, showing its process of scanning Amazon S3 buckets for sensitive data and alerting users if such data is found.](https://kodekloud.com/kk-media/image/upload/v1752857741/notes-assets/images/AWS-Certified-AI-Practitioner-Best-Practices-for-Secure-Data-Engineering/amazon-macie-data-privacy-compliance.jpg)

When preparing training datasets or performing feature engineering, remove any Personally Identifiable Information (PII) unless required. Secure data processing during ingestion and transformation minimizes the risk of exposing sensitive information.

![The image illustrates the best practice of removing Personally Identifiable Information (PII) from training datasets to avoid privacy and compliance risks.](https://kodekloud.com/kk-media/image/upload/v1752857742/notes-assets/images/AWS-Certified-AI-Practitioner-Best-Practices-for-Secure-Data-Engineering/remove-pii-training-datasets-best-practice.jpg)

![The image is a slide titled "Best Practice – Removing PII From Training Data," emphasizing the importance of ensuring sensitive data is removed during data ingestion and transformation.](https://kodekloud.com/kk-media/image/upload/v1752857743/notes-assets/images/AWS-Certified-AI-Practitioner-Best-Practices-for-Secure-Data-Engineering/best-practice-removing-pii-training-data.jpg)

![The image discusses best practices for removing PII from training data using Amazon Macie, highlighting its role in notifying users of detected PII to improve data privacy.](https://kodekloud.com/kk-media/image/upload/v1752857744/notes-assets/images/AWS-Certified-AI-Practitioner-Best-Practices-for-Secure-Data-Engineering/removing-pii-training-data-amazon-macie.jpg)

## Access Control and Data Integrity

Implement robust access controls using AWS IAM to manage users, groups, roles, and permissions. Combined with security groups and network ACLs, IAM ensures that only authorized personnel have access to critical data and services.

To secure data integrity on AWS, use encryption, version control, and detailed auditing via change logging. These measures help maintain accurate and consistent data, which is essential for training ML models and supporting data-driven operations.

![The image illustrates "Ensuring Data Integrity in AWS" with a lock symbolizing accuracy and consistency, and tools like encryption, version control, and change logging.](https://kodekloud.com/kk-media/image/upload/v1752857745/notes-assets/images/AWS-Certified-AI-Practitioner-Best-Practices-for-Secure-Data-Engineering/ensuring-data-integrity-aws.jpg)

Additional measures to enhance data privacy include:

- End-to-End Encryption
- Data Anonymization
- Data Masking

These privacy-enhancing technologies offer an extra layer of security, ensuring that sensitive information is accessible only to authorized users.

![The image outlines three privacy-enhancing technologies: encryption, anonymization, and data masking, each with a brief description of their functions.](https://kodekloud.com/kk-media/image/upload/v1752857746/notes-assets/images/AWS-Certified-AI-Practitioner-Best-Practices-for-Secure-Data-Engineering/privacy-enhancing-technologies-diagram.jpg)

## Assessing Data Quality for Machine Learning

High data quality is fundamental to the success of ML models, including [Generative AI in Practice: Advanced Insights and Operations](https://learn.kodekloud.com/user/courses/generative-ai-in-practice-advanced-insights-and-operations). Consider these quality metrics:

| Data Quality Metric | Description                       | Importance                           |
| ------------------- | --------------------------------- | ------------------------------------ |
| Accuracy            | Data reflects the correct values  | Avoids bias in ML outcomes           |
| Completeness        | All required data is present      | Ensures comprehensive model training |
| Relevance           | Data is applicable to the problem | Focuses on significant features      |

Make sure your data is error-free, properly formatted, and free from missing or disproportionate values that might skew results.

![The image is a flowchart titled "Assessing Data Quality for ML Models," highlighting three key aspects: Accuracy, Completeness, and Relevance.](https://kodekloud.com/kk-media/image/upload/v1752857747/notes-assets/images/AWS-Certified-AI-Practitioner-Best-Practices-for-Secure-Data-Engineering/assessing-data-quality-ml-models.jpg)

## Conclusion

By implementing these best practices for secure data engineering on AWS—from secure network configurations and access controls to robust data privacy and integrity measures—you can elevate the security of your data environment. These strategies not only secure your infrastructure but also ensure that your data remains reliable and compliant at every stage.

We look forward to deepening our exploration of secure and efficient cloud data practices in our next lesson.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-ai-practitioner/module/ec2a70a1-c3fc-4b7a-adef-26ae64d8f107/lesson/75fda5d8-992e-4467-b832-4f247c320885)**
>
> Watch video content
