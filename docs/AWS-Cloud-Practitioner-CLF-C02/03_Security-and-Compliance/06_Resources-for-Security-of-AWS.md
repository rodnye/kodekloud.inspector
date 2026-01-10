# Resources for Security of AWS - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Cloud-Practitioner-CLF-C02/Security-and-Compliance/Resources-for-Security-of-AWS)

---

## Table of Contents

- Resources for Security of AWS
  - Preventative Security Services
  - Detection-Based Security Services
  - Management-Based Security Services
  - Recap of Management-Based Security Services
  - Watch Video
    - AWS Web Application Firewall (WAF)
    - AWS Shield
    - AWS Network Firewall
    - AWS Inspector
    - AWS GuardDuty
    - Amazon Detective
    - AWS Config
    - AWS Security Hub
    - AWS CloudTrail
    - Amazon Security Lake
    - AWS Macie
    - AWS Firewall Manager
    - AWS Resource Access Manager
    - Amazon Cognito
    - AWS Identity and Access Management (IAM)
    - AWS Secrets Manager
    - AWS Certificate Manager and AWS Private Certificate Authority
    - Cryptographic Key Management
      - AWS IAM Identity Center
      - AWS Key Management Service (KMS)
      - AWS CloudHSM

---

## Content

AWS Cloud Practitioner CLF-C02

Security and Compliance

# Resources for Security of AWS

This article offers a comprehensive overview of AWS security services designed to prevent attacks, detect vulnerabilities, and centrally manage security configurations. While the Cloud Practitioner exam only requires you to know the names and basic functions of these services, this guide provides additional in-depth insights for those looking to enhance their understanding of AWS’s security landscape.

## Preventative Security Services

Preventative security services proactively block malicious requests and help reduce the risk of attacks.

### AWS Web Application Firewall (WAF)

AWS Web Application Firewall (WAF) protects HTTP-based applications hosted on services such as CloudFront, API Gateway, or an Application Load Balancer. WAF inspects incoming HTTP requests to detect threats like SQL injection and cross-site scripting (XSS) attacks. In a Web ACL (Access Control List), you can define rules that specify:

1.  The resource to protect (e.g., an API Gateway).
2.  The inspection criteria (e.g., matching on IP addresses, country of origin, or malicious SQL code).
3.  The action to take when a rule is matched (allow, block, count, or challenge to verify human activity).

![The image illustrates AWS Web Application Firewall (WAF) protecting against SQL injection and XSS attacks, monitoring HTTP requests to Amazon CloudFront, API Gateway, and Application Load Balancer.](https://kodekloud.com/kk-media/image/upload/v1752861742/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Resources-for-Security-of-AWS/frame_50.jpg)

### AWS Shield

Distributed Denial of Service (DDoS) attacks overwhelm targets with traffic until they become unresponsive. AWS Shield is engineered to detect and mitigate DDoS attacks, ensuring that your applications remain accessible even when under malicious assault.

![The image illustrates AWS Shield's role in detecting and mitigating DDoS attacks, featuring a hacker icon, AWS Shield logo, and server graphic.](https://kodekloud.com/kk-media/image/upload/v1752861743/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Resources-for-Security-of-AWS/frame_140.jpg)

### AWS Network Firewall

Within your Virtual Private Cloud (VPC), the AWS Network Firewall provides stateful inspection of traffic, determining which data is allowed in or out. By monitoring request-response patterns, it plays a crucial role in maintaining secure network boundaries.

To summarize the preventative security resources:

- **Web Application Firewall (WAF):** Guards against typical web-based attacks.
- **AWS Shield:** Mitigates DDoS threats.
- **Network Firewall:** Controls traffic flows within a VPC.

![The image summarizes security resources: WAF protects against SQL injection and XSS, Shield prevents DDoS attacks, and Network Firewalls monitor VPC traffic.](https://kodekloud.com/kk-media/image/upload/v1752861744/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Resources-for-Security-of-AWS/frame_200.jpg)

## Detection-Based Security Services

Detection services are designed to identify vulnerabilities, misconfigurations, and potential threats within your AWS environment.

### AWS Inspector

AWS Inspector automatically scans workloads—ranging from EC2 instances to container images in ECR and AWS Lambda functions—for vulnerabilities and network exposures. It continuously discovers new resources and triggers scans based on updates such as new package installations, patch updates, or published CVEs, generating detailed reports of any issues detected.

![The image describes AWS Inspector, highlighting its role in scanning AWS workloads for vulnerabilities, discovering EC2 instances, ECR container images, and Lambda functions, and producing reports.](https://kodekloud.com/kk-media/image/upload/v1752861745/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Resources-for-Security-of-AWS/frame_270.jpg)

### AWS GuardDuty

AWS GuardDuty offers continuous monitoring of your AWS infrastructure using machine learning to detect unusual API activities, login attempts, and unauthorized deployments. When anomalies are detected, GuardDuty promptly issues alerts for immediate attention.

![The image outlines AWS GuardDuty's features: enabling, continuous monitoring, threat detection, and action-taking using machine learning and automation for security management.](https://kodekloud.com/kk-media/image/upload/v1752861747/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Resources-for-Security-of-AWS/frame_300.jpg)

### Amazon Detective

Amazon Detective aggregates logs and findings from GuardDuty, CloudTrail, and VPC flow logs. Leveraging machine learning, it creates interactive dashboards and visualizations that simplify the investigation and troubleshooting of security incidents.

![The image illustrates Amazon Detective's process of ingesting data from VPC Flow Logs, CloudTrail, and GuardDuty, using machine learning for advanced visualization.](https://kodekloud.com/kk-media/image/upload/v1752861748/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Resources-for-Security-of-AWS/frame_340.jpg)

### AWS Config

AWS Config continuously audits and records changes in your AWS resource configurations. Whether it’s a new security group association with an EC2 instance or an Elastic Block Store volume attachment, AWS Config logs all changes to support compliance needs and to help you track configuration evolution.

### AWS Security Hub

AWS Security Hub centralizes and automates security alerting by aggregating findings from tools like Inspector and GuardDuty. This single-pane-of-glass approach validates your environment against AWS security best practices and performs automated checks.

### AWS CloudTrail

AWS CloudTrail records all user and API activities across your AWS account. Whether actions are executed via the Console, CLI, or SDK, CloudTrail maintains a comprehensive audit trail, including events like EC2 instance creation or modifications in security policies.

![The image illustrates AWS CloudTrail tracking user activities, showing a user named John creating an EC2 instance, with actions logged for security and service management.](https://kodekloud.com/kk-media/image/upload/v1752861749/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Resources-for-Security-of-AWS/frame_450.jpg)

### Amazon Security Lake

Amazon Security Lake centralizes security logs from on-premises systems, AWS cloud, and third-party sources. By converting logs into a query-efficient Parquet format and aligning them with the Open Cybersecurity Schema Framework (OCSF), Security Lake simplifies data consumption and analysis for multiple subscribers.

![The image illustrates Amazon Security Lake, highlighting storage in Parquet format and the Open Cybersecurity Schema Framework (OCSF).](https://kodekloud.com/kk-media/image/upload/v1752861750/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Resources-for-Security-of-AWS/frame_500.jpg)

### AWS Macie

AWS Macie uses pattern matching and machine learning to automatically discover and protect sensitive data stored in S3 buckets. By generating detailed inventory reports and customized alerts, Macie ensures that sensitive information is adequately secured.

![The image explains AWS Macie's use of pattern matching and machine learning to discover sensitive data in S3 buckets, generating reports and notifications.](https://kodekloud.com/kk-media/image/upload/v1752861751/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Resources-for-Security-of-AWS/frame_530.jpg)

Recap of detection-based services:

- **GuardDuty:** Continuously monitors for suspicious activity.
- **Detective:** Offers visual analysis for security events.
- **CloudTrail:** Logs all API and user activities.
- **AWS Config:** Audits configuration changes.
- **Security Hub:** Centralizes security alerts.
- **Security Lake:** Aggregates and transforms logs for efficient querying.
- **Macie:** Identifies sensitive data in S3 buckets.

## Management-Based Security Services

Management services allow you to centrally control security configurations and manage access across multiple AWS accounts.

### AWS Firewall Manager

Managing multiple security features (such as AWS Shield, AWS WAF, and AWS Network Firewall) across several AWS accounts can be challenging. AWS Firewall Manager simplifies security by allowing you to centrally configure and manage firewall rules across accounts and AWS Organizations, ensuring consistent policies across all environments.

![The image illustrates AWS Firewall Manager managing AWS Shield, AWS WAF, and AWS Network Firewall across DEV and Prod environments.](https://kodekloud.com/kk-media/image/upload/v1752861752/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Resources-for-Security-of-AWS/frame_640.jpg)

### AWS Resource Access Manager

AWS Resource Access Manager facilitates secure resource sharing across AWS accounts, organizations, and organizational units. For instance, a private subnet in one account can be shared with other accounts, enabling deployments without duplicating configurations.

### Amazon Cognito

Amazon Cognito streamlines customer identity and access management for mobile and web applications. Supporting social logins and robust user credential management, it allows you to quickly integrate authentication into your applications.

### AWS Identity and Access Management (IAM)

IAM is essential for enforcing access control to AWS resources. It manages user authentication and authorizes actions based on defined policies for users, groups, and roles. However, maintaining user identities across multiple accounts might require additional management.

#### AWS IAM Identity Center

The IAM Identity Center addresses multi-account access challenges by centralizing user sign-ins and simplifying access management across AWS accounts, thereby reducing administrative overhead.

### AWS Secrets Manager

Storing application access credentials (such as database usernames and passwords) directly in code is a security risk. AWS Secrets Manager securely stores these secrets and allows applications to retrieve them dynamically. This practice not only prevents accidental exposure of credentials but also supports automatic secret rotation.

![The image explains AWS Secrets Manager, highlighting its role in securely storing and managing application credentials, avoiding hardcoding, and enabling dynamic access and automatic rotation.](https://kodekloud.com/kk-media/image/upload/v1752861753/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Resources-for-Security-of-AWS/frame_860.jpg)

### AWS Certificate Manager and AWS Private Certificate Authority

AWS Certificate Manager (ACM) automates the creation, storage, and renewal of both public and private SSL/TLS certificates. It integrates with services like Elastic Load Balancing, CloudFront, and API Gateway. For internal requirements, AWS Private Certificate Authority streamlines the management of private certificates without the complexities of setting up your own CA.

![The image illustrates AWS Certificate Manager (ACM) handling certificate creation, storage, and renewal, integrating with Elastic Load Balancing, Amazon CloudFront, and Amazon API Gateway.](https://kodekloud.com/kk-media/image/upload/v1752861754/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Resources-for-Security-of-AWS/frame_900.jpg)

![The image illustrates AWS Private Certificate Authority, highlighting its role in managing private certificates within an organization, with icons representing a corporate data center.](https://kodekloud.com/kk-media/image/upload/v1752861755/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Resources-for-Security-of-AWS/frame_920.jpg)

### Cryptographic Key Management

When dealing with sensitive data, encryption is paramount. AWS offers dedicated services for cryptographic key management:

#### AWS Key Management Service (KMS)

AWS KMS allows for the creation and management of cryptographic keys with fine-grained access control. It supports automatic key rotation to ensure that only authorized users can access keys for encrypting or decrypting data.

![The image illustrates AWS Key Management Service (KMS) encrypting and decrypting documents, preventing unauthorized access, as indicated by a figure saying, "I can't understand this."](https://kodekloud.com/kk-media/image/upload/v1752861755/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Resources-for-Security-of-AWS/frame_990.jpg)

#### AWS CloudHSM

For organizations that require physical hardware security modules in the cloud, AWS CloudHSM offers a managed solution to securely store and operate cryptographic keys, minimizing the risk associated with decentralized key management.

## Recap of Management-Based Security Services

- **Firewall Manager:** Centralizes the configuration of firewall rules across multiple accounts.
- **Resource Access Manager:** Enables safe resource sharing across AWS accounts.
- **Cognito:** Provides robust authentication for web and mobile applications.
- **IAM & Identity Center:** Manage user identities and access policies efficiently.
- **Secrets Manager:** Securely stores and manages sensitive application credentials.
- **Certificate Manager & Private Certificate Authority:** Automate handling of SSL/TLS certificates.
- **KMS & CloudHSM:** Create, manage, and securely store cryptographic keys.

![The image summarizes AWS security management resources, including Firewall Manager, Resource Access Manager, Cognito, IAM, Identity Center, and Secrets Manager, highlighting their functions.](https://kodekloud.com/kk-media/image/upload/v1752861757/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Resources-for-Security-of-AWS/frame_1130.jpg)

![The image summarizes AWS security resources: ACM for SSL/TLS certificates, Private Certificate Authority for private certificates, and KMS for encryption key management.](https://kodekloud.com/kk-media/image/upload/v1752861758/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Resources-for-Security-of-AWS/frame_1150.jpg)

> [!important]
> **Note**
>
> This guide is designed to offer a detailed look at AWS security services to help you implement best practices across your cloud infrastructure. Although not all details are critical for the Cloud Practitioner exam, having this knowledge can enhance your overall security strategy.

By understanding and leveraging these AWS security services, you are better prepared to protect your cloud resources, detect potential threats, and manage security configurations effectively.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-cloud-practitioner-clf-c02/module/4528372a-a177-43ff-b4b6-236c0eee4029/lesson/cd074b56-c93c-4b41-ba89-cf91bb8a9235)**
>
> Watch video content
