# Security and Compliance Policies in AWS Overview - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-4-Security-and-Compliance/Security-and-Compliance-Policies-in-AWS-Overview)

---

## Table of Contents

- Security and Compliance Policies in AWS Overview
  - AWS and Cloud Security
  - Shared Responsibility Model
  - Certifications, Attestations, and Compliance
  - AWS Security Tools
  - Watch Video

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 4 Security and Compliance

# Security and Compliance Policies in AWS Overview

Welcome to our comprehensive lesson on security compliance policies in AWS. In today’s digital landscape, robust security measures are essential to protect both physical and digital assets. Just as you would secure a building with key cards, locks, and guards, AWS employs advanced tools and best practices to safeguard its infrastructure and your data.

Before diving into AWS specifics, it is important to understand the fundamental role of security. Without proper protection measures, assets become vulnerable to theft, tampering, and misuse. Consider these examples:

![The image shows a building and a thief icon, with a list of potential threats: theft of physical property, theft of confidential information, misuse of office facilities, and planting malicious devices.](https://kodekloud.com/kk-media/image/upload/v1752860605/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Security-and-Compliance-Policies-in-AWS-Overview/building-thief-threats-list.jpg)

This diagram is analogous to a secured building where locks and security personnel ensure that only authorized individuals can gain access. Similarly, AWS integrates robust security features to protect your resources in the cloud.

## AWS and Cloud Security

AWS is committed to cloud security, prioritizing the protection of consumer data and infrastructure. If security ever failed, it would risk the entire cloud industry; hence, AWS builds advanced security measures directly into its services. As your business scales and innovates, AWS ensures your data remains secure through a variety of native security features.

![The image is an introduction slide for "Cloud Security at AWS," highlighting three key aspects: "Highest Priority" with star icons, "Scalability and Flexibility" with a graph icon, and "Integrated Security" with a lock icon.](https://kodekloud.com/kk-media/image/upload/v1752860607/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Security-and-Compliance-Policies-in-AWS-Overview/cloud-security-aws-introduction-slide.jpg)

AWS offers integrated security services such as distributed denial of service (DDoS) protection and web application filtering through AWS WAF. Many of these features are included in the pricing model, making robust security a seamless part of your cloud experience.

![The image illustrates the concept of cost-effective security in the cloud, highlighting paying only for used services and reducing costs.](https://kodekloud.com/kk-media/image/upload/v1752860608/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Security-and-Compliance-Policies-in-AWS-Overview/cost-effective-cloud-security-illustration.jpg)

## Shared Responsibility Model

AWS operates under a shared responsibility model. In this model, AWS is responsible for security "of" the cloud—including physical infrastructure, networking, and facilities—while you manage security "in" the cloud by controlling your data, configurations, and applications.

> [!important]
> **Note**
>
> Remember, your responsibility extends to managing user permissions and data configurations, ensuring that only authorized users have access to sensitive information.

![The image illustrates the AWS Shared Responsibility Model, dividing security responsibilities between the customer and AWS. It shows customer responsibilities for security "in" the cloud and AWS responsibilities for security "of" the cloud.](https://kodekloud.com/kk-media/image/upload/v1752860609/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Security-and-Compliance-Policies-in-AWS-Overview/aws-shared-responsibility-model.jpg)

## Certifications, Attestations, and Compliance

By choosing AWS, you benefit from a platform that holds multiple global security certifications and attestations, such as ISO/IEC 27001, 27017, 27018, SOC 1-3, PCI DSS, HIPAA, and GDPR. Detailed compliance documentation is available through AWS Artifact, allowing you to access security and compliance reports tailored to various regions.

![The image lists various global and regional compliance standards, including ISO/IEC, SOC, PCI DSS, HIPAA, and GDPR, under the title "Compliance in a Regulated World."](https://kodekloud.com/kk-media/image/upload/v1752860610/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Security-and-Compliance-Policies-in-AWS-Overview/compliance-global-regional-standards.jpg)

## AWS Security Tools

AWS provides a wide range of security tools designed to manage identity and access, data protection, and network security. Below is an overview of some key services:

1.  **Identity and Access Management (IAM):**  
    IAM allows you to manage users, groups, and roles with precise permissions. Multi-factor authentication (MFA) adds an extra layer of security to user access.

    ![The image is an illustration of AWS Identity and Access Management (IAM), showing components like users, roles, groups, permissions, and MFA tokens.](https://kodekloud.com/kk-media/image/upload/v1752860611/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Security-and-Compliance-Policies-in-AWS-Overview/aws-iam-illustration-users-roles.jpg)

2.  **Data Protection and Encryption:**  
    AWS Key Management Service (KMS) offers secure key management for encrypting data at rest. AWS Certificate Manager (ACM) simplifies the management of encryption for data in transit.

    ![The image illustrates three concepts related to data protection and encryption: "Encryption at Rest," "Encryption in Transit," and "AWS Key Management Service (KMS)," each represented by an icon.](https://kodekloud.com/kk-media/image/upload/v1752860613/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Security-and-Compliance-Policies-in-AWS-Overview/data-protection-encryption-icons.jpg)

3.  **Network Security:**  
    Amazon VPC provides stateful and stateless firewall capabilities to control network access. Additional services like AWS Shield, AWS WAF, and advanced network firewalls further enhance your network security.

    ![The image shows icons and names of four AWS network security services: Amazon VPC, Security Group and Network Access Control List, AWS WAF, and AWS Shield.](https://kodekloud.com/kk-media/image/upload/v1752860614/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Security-and-Compliance-Policies-in-AWS-Overview/aws-network-security-services-icons.jpg)

4.  **Automation and Governance:**  
    Automation services are critical for enforcing security policies and maintaining compliance on a large scale. AWS Security Hub centralizes security findings, while CloudWatch Logs, AWS CloudTrail, and EventBridge facilitate auditing and automated monitoring. In addition, AWS Inspector enables penetration testing, and GuardDuty uses machine learning to detect potential security threats.

    ![The image lists four AWS services related to compliance automation and governance: AWS Organizations, AWS Control Tower, AWS Security Hub, and AWS Artifact.](https://kodekloud.com/kk-media/image/upload/v1752860615/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Security-and-Compliance-Policies-in-AWS-Overview/aws-compliance-automation-services.jpg)

Below is a summary table highlighting key AWS security services:

| Service Category               | Key Services                        | Use Case                                          |
| ------------------------------ | ----------------------------------- | ------------------------------------------------- |
| Identity and Access Management | IAM, MFA                            | Managing user permissions and secure logins       |
| Data Protection                | KMS, ACM                            | Encrypting data both at rest and in transit       |
| Network Security               | Amazon VPC, AWS Shield, AWS WAF     | Controlling network access and mitigating attacks |
| Automation and Governance      | Security Hub, CloudTrail, GuardDuty | Centralized monitoring and automated compliance   |

AWS offers over a dozen dedicated security services, ensuring that nearly every aspect of your cloud architecture is protected. The key is to understand which services and configurations best align with your security requirements.

Thank you for reading this lesson on AWS security and compliance policies. We hope this guide provides you with the foundational understanding needed to secure your cloud environment effectively.

For further reading, check out the following references:

- [AWS Security Documentation](https://aws.amazon.com/security/)
- [AWS Compliance Programs](https://aws.amazon.com/compliance/)
- [Cloud Security Best Practices](https://aws.amazon.com/whitepapers/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/0c9bb9a3-5201-434e-8085-a9f1e9f23f22/lesson/7b56274c-de26-46c7-8a01-bc58e5df6aab)**
>
> Watch video content
