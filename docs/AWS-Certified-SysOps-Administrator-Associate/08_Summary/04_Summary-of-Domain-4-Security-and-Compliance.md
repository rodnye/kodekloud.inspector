# Summary of Domain 4 Security and Compliance - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Summary/Summary-of-Domain-4-Security-and-Compliance)

---

## Table of Contents

- Summary of Domain 4 Security and Compliance
  - Identity and Access Management (IAM)
  - Security Best Practices and Assessments
  - Data Protection and Network Security
  - Managing Secrets and Centralized Security
  - Conclusion
  - Watch Video

---

## Content

AWS Certified SysOps Administrator - Associate

Summary

# Summary of Domain 4 Security and Compliance

Welcome to this comprehensive refresher on Domain 4, which focuses on the core concepts of security and compliance. Before you take the assessment exam, review these key topics to strengthen your understanding of Identity and Access Management (IAM), encryption, network security, and various compliance tools.

Domain 4 covers the following fundamental areas:

1.  Identity and Access Management (IAM)
2.  Data Protection and Encryption
3.  Network Security
4.  Compliance and Governance Services
5.  Regular Audits and Assessments

Below is a detailed walkthrough of each component along with technical diagrams to support your learning.

---

## Identity and Access Management (IAM)

Since this domain centers on security and compliance, we start with IAM. Effective IAM is crucial in managing user identities, authenticating users, controlling resource access, and tracking activities. It encompasses:

- **Authentication:** Verifying user identities.
- **Authorization:** Determining what resources a user can access.

IAM plays a pivotal role in establishing secure access protocols:

![The image illustrates a flowchart of security tools and features, including Identity and Access Management, Data Protection and Encryption, Network Security, Compliance Automation and Governance, and Regular Audits and Assessments.](https://kodekloud.com/kk-media/image/upload/v1752861353/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Summary-of-Domain-4-Security-and-Compliance/security-tools-flowchart-diagram.jpg)

IAM manages user identities ensuring proper authentication and authorization:

![The image is a diagram illustrating the components of Identity and Access Management (IAM), including managing user identities, authenticating user identities, authorizing access, and auditing activities.](https://kodekloud.com/kk-media/image/upload/v1752861355/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Summary-of-Domain-4-Security-and-Compliance/iam-components-diagram.jpg)

To further secure user access, AWS implements Multi-Factor Authentication (MFA). MFA adds extra layers of security beyond simple passwords by combining:

- Something you know (password)
- Something you have (security token)
- Something you are (biometrics)

This method fortifies authentication and reduces unauthorized access risks.

![The image illustrates the concept of Multi-Factor Authentication (MFA) as a security measure, depicting a castle with guards and a chain with a lock, symbolizing protection against a malicious actor.](https://kodekloud.com/kk-media/image/upload/v1752861356/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Summary-of-Domain-4-Security-and-Compliance/multi-factor-authentication-security-illustration.jpg)

MFA is typically categorized into three distinct elements:

![The image illustrates the concept of Multi-Factor Authentication (MFA) with three categories: "Something You Know" (e.g., password, security questions), "Something You Have" (e.g., OTP, security key), and "Something You Are" (e.g., biometrics, face ID).](https://kodekloud.com/kk-media/image/upload/v1752861358/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Summary-of-Domain-4-Security-and-Compliance/multi-factor-authentication-concept.jpg)

When managing policies in IAM, it is important to understand the differences between AWS managed policies and customer managed policies. While customer managed policies offer flexibility, AWS managed policies remain read-only for examination purposes. Additionally, resource-based policies (attached to resources) and identity-based policies (attached to identities) work together—if any policy denies permission, access is blocked.

![The image is a comparison table between AWS Managed Policies and Customer Managed Policies, using a library analogy to explain their creation, usage, and examples.](https://kodekloud.com/kk-media/image/upload/v1752861360/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Summary-of-Domain-4-Security-and-Compliance/aws-managed-vs-customer-policies.jpg)

![The image is a Venn diagram illustrating the intersection of resource-based policies, identity-based policies, and permissions boundaries, highlighting their effective permissions.](https://kodekloud.com/kk-media/image/upload/v1752861361/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Summary-of-Domain-4-Security-and-Compliance/venn-diagram-resource-identity-permissions.jpg)

This approach also applies to Service Control Policies (SCPs) within AWS Organizations. SCPs enforce security controls spanning multiple accounts by restricting permissions—these cannot be overridden at the account level.

![The image illustrates how Service Control Policies (SCPs) can be applied to an entire organization, specific organizational units (OUs), or individual accounts. It includes a diagram showing different OUs like Dev, Staging, and Prod.](https://kodekloud.com/kk-media/image/upload/v1752861362/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Summary-of-Domain-4-Security-and-Compliance/scp-organization-structure-diagram.jpg)

Organizations further bolster security with policies such as tag policies, backup policies, and AI services opt-out policies, supported by tools like the IAM Policy Simulator, IAM Access Analyzer, and Trusted Advisor for effective monitoring.

![The image contains notes about the IAM Policy Simulator, explaining that it doesn't make actual AWS requests, doesn't simulate action responses, and changes don't affect actual AWS policies. It also mentions that service control policies can't be tested with conditions.](https://kodekloud.com/kk-media/image/upload/v1752861363/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Summary-of-Domain-4-Security-and-Compliance/iam-policy-simulator-notes.jpg)

> [!important]
> **Note**
>
> Avoid deploying workloads into your management account. Use it exclusively for administrative functions.

![The image is a diagram illustrating the concept of avoiding deploying workloads to a management account, showing a structure with root, management account, and categories like security and compliance, development, and production.](https://kodekloud.com/kk-media/image/upload/v1752861365/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Summary-of-Domain-4-Security-and-Compliance/avoiding-workloads-management-account-diagram.jpg)

AWS Organizations leverages SCPs and AWS Control Tower to establish preventive and detective guardrails. These tools, combined with AWS Config and CloudTrail, help maintain compliance and support forensic analysis.

![The image illustrates AWS Control Tower Guardrails, featuring icons for preventive and detective guardrails connected to AWS Organizations.](https://kodekloud.com/kk-media/image/upload/v1752861366/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Summary-of-Domain-4-Security-and-Compliance/aws-control-tower-guardrails-diagram.jpg)

## Security Best Practices and Assessments

Other critical security practices include:

- Regular security assessments
- Patch management via AWS Systems Manager
- Ongoing security awareness training
- Utilizing AWS security services like GuardDuty, Inspector, and Macie to detect malicious activities and vulnerabilities

![The image outlines additional security strategies, including using AWS security services, conducting regular security assessments, providing security awareness training, and managing patches. It features a central brain graphic with text and icons around it.](https://kodekloud.com/kk-media/image/upload/v1752861368/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Summary-of-Domain-4-Security-and-Compliance/security-strategies-aws-assessments.jpg)

## Data Protection and Network Security

Data classification is essential for cataloging, labeling, and continuously monitoring data access. It ensures that information is managed securely, facilitating compliance. Control of network traffic is enforced through mechanisms such as:

- Network ACLs (NACLs) at the perimeter
- Security groups at the instance level
- NAT gateways, VPC peering, PrivateLink, Direct Connect, VPNs, and private endpoints

![The image outlines a five-step data classification process: establishing a data catalog, assessing business-critical functions, labeling information, handling assets, and continuous monitoring.](https://kodekloud.com/kk-media/image/upload/v1752861370/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Summary-of-Domain-4-Security-and-Compliance/data-classification-process-steps.jpg)

![The image is a diagram illustrating network traffic control within a VPC, showing components like public subnets, NACLs, security groups, and connections to external services such as VGW, endpoints, and PrivateLink.](https://kodekloud.com/kk-media/image/upload/v1752861371/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Summary-of-Domain-4-Security-and-Compliance/vpc-network-traffic-control-diagram.jpg)

When comparing firewalls, note the differences between stateless NACLs and stateful security groups. AWS Network Firewall provides deep packet inspection and granular filtering based on several criteria including ports, protocols, and source IPs.

![The image compares NACLs (Network Access Control Lists) and Security Groups, explaining that NACLs are stateless firewalls monitoring traffic in both directions, while Security Groups are stateful, acting as personal firewalls for individual resources. It includes a diagram of a Virtual Private Cloud with public and private subnets.](https://kodekloud.com/kk-media/image/upload/v1752861373/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Summary-of-Domain-4-Security-and-Compliance/nacls-vs-security-groups-diagram.jpg)

![The image is a diagram illustrating AWS Network Firewall rules, which filter network traffic based on criteria such as source/destination IP addresses, ports, and protocols.](https://kodekloud.com/kk-media/image/upload/v1752861374/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Summary-of-Domain-4-Security-and-Compliance/aws-network-firewall-rules-diagram.jpg)

GuardDuty utilizes machine learning and threat intelligence to detect suspicious network activities, while encryption protects data both at rest and in transit. TLS secures data during transmission, and AWS Certificate Manager (ACM) simplifies the management of TLS certificates for load balancers and other services.

![The image illustrates the need for encryption by showing data flow between a client and a server, with a risk of unauthorized access.](https://kodekloud.com/kk-media/image/upload/v1752861376/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Summary-of-Domain-4-Security-and-Compliance/encryption-data-flow-client-server.jpg)

![The image illustrates a Transport Layer Security (TLS) process involving a client, server, and AWS Certificate Manager (ACM) for secure data exchange.](https://kodekloud.com/kk-media/image/upload/v1752861377/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Summary-of-Domain-4-Security-and-Compliance/tls-process-client-server-acm.jpg)

For data at rest, the Key Management Service (KMS) manages encryption keys, transforming plaintext data into ciphertext. It is recommended to use customer managed keys where specific use cases require detailed control and prefer symmetric encryption for efficiency.

![The image illustrates the process of encrypting data using a data key, showing plaintext data being transformed into ciphertext through an encryption algorithm, and storing the encrypted data key and ciphertext in an S3 bucket.](https://kodekloud.com/kk-media/image/upload/v1752861379/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Summary-of-Domain-4-Security-and-Compliance/data-encryption-process-s3-bucket.jpg)

AWS Inspector scans for vulnerabilities, especially when integrated with Systems Manager Agent. For protecting against DDoS attacks, AWS Shield Advanced offers enhanced protection, complemented by the basic Shield service available by default.

## Managing Secrets and Centralized Security

When storing secrets, AWS provides two main solutions:

- **Systems Manager Parameter Store:** Requires custom Lambda functions for rotating secrets.
- **AWS Secrets Manager:** Offers built-in automatic rotation.

Choose AWS Secrets Manager when automated secret rotation is needed.

![The image explains two methods of rotating secrets in AWS Secrets Manager: "Managed Rotation" by AWS and "Rotation by Lambda Function." It highlights that AWS manages the rotation automatically in the first method, while the second method uses an AWS Lambda function to manage the rotation.](https://kodekloud.com/kk-media/image/upload/v1752861380/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Summary-of-Domain-4-Security-and-Compliance/aws-secrets-rotation-methods.jpg)

AWS Security Hub aggregates security findings from various AWS services and third-party solutions. Integrated with EventBridge, it facilitates automated response actions. This central console, alongside AWS Config and Config Aggregator, offers enhanced visibility into your security posture.

![The image is a flowchart illustrating the integration of various security tools (GuardDuty, Inspector, Macie, and External Security Tools) with AWS Security Hub, which then connects to EventBridge and further to Step Functions, Lambda, and Systems Manager.](https://kodekloud.com/kk-media/image/upload/v1752861382/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Summary-of-Domain-4-Security-and-Compliance/aws-security-tools-integration-flowchart.jpg)

![The image shows a screenshot of the AWS Security Hub console, displaying security standards, assets with findings, and findings by region. It includes filters and options for configuring security settings and viewing insights.](https://kodekloud.com/kk-media/image/upload/v1752861383/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Summary-of-Domain-4-Security-and-Compliance/aws-security-hub-console-screenshot.jpg)

Audit Manager plays a critical role in ensuring compliance with standards like SOC 2, GDPR, and CCPA by continuously auditing your cloud environment.

![The image is a diagram showing the flow of data from "ABC Media" to "AWS Audit Manager" and then to a database containing personal information. It also lists compliance standards: GDPR, SOC 2, and CCPA.](https://kodekloud.com/kk-media/image/upload/v1752861384/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Summary-of-Domain-4-Security-and-Compliance/abc-media-aws-audit-diagram.jpg)

## Conclusion

In summary, Domain 4 provides an extensive overview of security and compliance topics including IAM, encryption, network security, and compliance tools. Embracing these best practices will better prepare you for the assessment exam and strengthen your cloud security mindset.

Up next, we will review Domain 5. See you in the next article!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/6110feb5-fd80-4769-83cd-4624ebc6a21d/lesson/77499fd2-9a56-4c4d-9aaa-b4e78aa26107)**
>
> Watch video content
