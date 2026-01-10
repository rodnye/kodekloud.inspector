# Turning up Security on Security Services Part 2 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Designing-for-Security/Turning-up-Security-on-Security-Services-Part-2)

---

## Table of Contents

- Turning up Security on Security Services Part 2
  - Certificate Management and AWS Private Certificate Authority
  - Secrets Management
  - Network-Level Security: Security Groups and NACLs
  - Centralizing Security Data with AWS Security Lake
  - Web Application Firewall and DDoS Protection
  - Network Firewall and AWS Firewall Manager
  - Final Thoughts
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Designing for Security

# Turning up Security on Security Services Part 2

In this article, we explore a range of AWS security services that safeguard your data—whether at rest or in transit. We explain how these services integrate to simplify certificate management, secure key infrastructures, and offer centralized threat protection.

## Certificate Management and AWS Private Certificate Authority

When protecting stored data, services like AWS Key Management Service (KMS) and AWS CloudHSM are commonly used. For data in transit, particularly with TLS/SSL certificates, AWS Certificate Manager (ACM) is the preferred choice. ACM not only manages public-private certificates but also supports importing certificates from external vendors. For certificates created within ACM, automatic renewal further simplifies the certificate lifecycle – a process similar to certificate management in Kubernetes.

For organizations hosting websites where secure communications are critical, AWS Certificate Manager automatically provisions and renews certificates:

![The image presents a question about which AWS service to use for managing SSL/TLS certificates, with four options: AWS Key Management Service (KMS), AWS Certificate Manager (ACM), AWS Identity and Access Management (IAM), and AWS Web Application Firewall (WAF).](https://kodekloud.com/kk-media/image/upload/v1752864517/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Security-Services-Part-2/aws-ssl-tls-certificates-options.jpg)

In addition, AWS Private Certificate Authority (PCA) is a key component of ACM. AWS Private CA allows you to establish your own certificate hierarchies without having to build an on-premise public key infrastructure. It issues private certificates for various organizational units while eliminating the need to develop and maintain internal key infrastructures:

![The image is an informational graphic about AWS Private Certificate Authority (PCA), explaining how it allows the creation of private certificate hierarchies without an on-premise authority, and its integration with AWS services.](https://kodekloud.com/kk-media/image/upload/v1752864518/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Security-Services-Part-2/aws-private-certificate-authority-graphic.jpg)

This feature is particularly beneficial if you plan to host your own Private Certificate Authority, enabling seamless creation and management of certificate hierarchies:

![The image presents a scenario where a financial institution needs a private certificate authority for security and compliance, listing four AWS services as options: AWS KMS, AWS ACM, AWS PCA, and AWS IAM.](https://kodekloud.com/kk-media/image/upload/v1752864520/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Security-Services-Part-2/private-certificate-authority-aws-services.jpg)

## Secrets Management

To securely manage credentials, API keys, and tokens, AWS Secrets Manager is the recommended service. It encrypts sensitive data and enforces access through appropriate IAM permissions. A standout feature of Secrets Manager is its automated credential rotation which is not available in the Systems Manager Parameter Store (which does offer secure strings but lacks auto-rotation).

> [!important]
> **Tip**
>
> If automated credential rotation is a priority for your application, AWS Secrets Manager should be your go-to solution.

![The image is a diagram explaining AWS Secrets Manager, highlighting its role in securely storing and rotating credentials, API keys, and tokens using AWS Key Management Service (KMS) and AWS Lambda. It also shows integration with AWS CloudTrail, Amazon CloudWatch, and various AWS services.](https://kodekloud.com/kk-media/image/upload/v1752864521/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Security-Services-Part-2/aws-secrets-manager-diagram.jpg)

## Network-Level Security: Security Groups and NACLs

Within the AWS network, security groups and network access control lists (NACLs) act as built-in firewalls. Security groups provide stateful security at the network interface level by filtering both inbound and outbound traffic:

![The image illustrates the concept of security groups in AWS, showing a network diagram with public and private subnets containing web and database servers. It explains that security groups act as stateful firewalls for network interfaces.](https://kodekloud.com/kk-media/image/upload/v1752864522/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Security-Services-Part-2/aws-security-groups-network-diagram.jpg)

For stateful security controls, remember that security groups are purpose-built for this task:

![The image presents a question about which AWS service provides stateful security rules for controlling traffic, with four options: AWS Web Application Firewall (WAF), AWS Security Groups, AWS Network Access Control Lists (ACLs), and AWS Identity and Access Management (IAM).](https://kodekloud.com/kk-media/image/upload/v1752864523/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Security-Services-Part-2/aws-stateful-security-rules-question.jpg)

In contrast, NACLs act at the subnet level as stateless firewalls, using ordered, rule-based filtering to offer an extra layer of security for your VPC:

![The image is a diagram illustrating a network access control list (NACL) setup, showing a router connected to two subnets with NACLs acting as stateless firewalls. It includes a brief description of NACLs as subnet-level firewalls that are rule and order based.](https://kodekloud.com/kk-media/image/upload/v1752864524/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Security-Services-Part-2/nacl-setup-diagram-router-subnets.jpg)

## Centralizing Security Data with AWS Security Lake

AWS Security Lake serves as a centralized repository for collecting, normalizing, and analyzing security data from multiple AWS services. By aggregating information from services like IAM Access Analyzer, GuardDuty, Inspector, AWS Config, and CloudTrail, it enables advanced threat detection and continuous security monitoring.

![The image is a diagram explaining Amazon Security Lake, illustrating how it integrates various AWS services to centralize and analyze security data. It highlights the process of building a security-focused data lake using tools like Amazon S3, AWS CloudTrail, and Amazon Athena.](https://kodekloud.com/kk-media/image/upload/v1752864525/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Security-Services-Part-2/amazon-security-lake-diagram.jpg)

For enterprises that require deep security analysis, consider complementing Security Lake with services like Amazon GuardDuty for a robust defense mechanism:

![The image presents a scenario where a global enterprise needs an integrated AWS solution for security threat management, with four options provided. The highlighted option is "AWS Security Lake and Amazon GuardDuty."](https://kodekloud.com/kk-media/image/upload/v1752864527/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Security-Services-Part-2/aws-security-solution-options.jpg)

## Web Application Firewall and DDoS Protection

AWS Web Application Firewall (WAF) protects your applications from common web exploits such as SQL injection and cross-site scripting. It integrates seamlessly with services like API Gateway and CloudFront, safeguarding your applications at the edge. Although WAF rules can be detailed, the AWS certification exam typically emphasizes its basic functionality.

For DDoS attack protection, AWS Shield is available in both standard (free) and advanced (paid) versions. Shield Advanced offers enhanced integration with services like AWS Firewall Manager, providing deeper security controls:

![The image is a diagram explaining AWS Shield, a DDoS protection service, showing its integration with AWS Edge Services, Amazon CloudFront, and Route 53, and its application to both AWS and external infrastructures.](https://kodekloud.com/kk-media/image/upload/v1752864528/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Security-Services-Part-2/aws-shield-ddos-protection-diagram.jpg)

> [!important]
> **Security Best Practice**
>
> Combining Shield Advanced with WAF and using Firewall Manager enables real-time dynamic adjustment of firewall rules to combat sophisticated attacks.

## Network Firewall and AWS Firewall Manager

AWS Network Firewall delivers traditional firewall capabilities at the VPC level. It includes features such as deep packet inspection, web filtering (including SNI filtering), and protocol detection, giving you granular control over inbound and outbound traffic:

![The image outlines AWS Network Firewall features for enhancing security in a VPC environment, including web filtering, SNI filtering, ACL rules, protocol detection, and application-level protection.](https://kodekloud.com/kk-media/image/upload/v1752864529/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Security-Services-Part-2/aws-network-firewall-features-vpc.jpg)

Completing the security landscape, AWS Firewall Manager provides centralized management for firewall rules across various services such as WAF, security groups, and Network Firewall. This centralized approach is ideal for large enterprises where compliance and uniform security policies are essential:

![The image is a diagram explaining the AWS Firewall Manager, showing its integration with AWS Security Hub and various services like AWS WAF, AWS Network Firewall, and AWS Shield. It highlights the centralized management of firewall rules across accounts.](https://kodekloud.com/kk-media/image/upload/v1752864530/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Security-Services-Part-2/aws-firewall-manager-diagram.jpg)

![The image presents a scenario where a large organization seeks to enhance its AWS security by centrally managing firewall rules. It lists five AWS service combinations as potential solutions for achieving centralized management and enforcement of security policies.](https://kodekloud.com/kk-media/image/upload/v1752864532/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Security-Services-Part-2/aws-security-centralized-firewall-management.jpg)

## Final Thoughts

In summary, we reviewed several AWS security services that are designed with robust security features enabled by default. Understanding how these services integrate—for instance, feeding logs into CloudWatch, recording API calls in CloudTrail, and tracking configuration changes with AWS Config—is essential for building a secure AWS environment.

As you progress to topics like reliability, performance, and cost management, remember that many security services are optimized for ease of setup and operation. This foundational knowledge is a key step on your path toward AWS certification success.

![The image is a summary slide with four key points about security services, highlighting their ease of setup, the importance of features like encryption, centralization in a Security Hub, and logging in CloudWatch and CloudTrail.](https://kodekloud.com/kk-media/image/upload/v1752864533/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Security-Services-Part-2/security-services-summary-slide.jpg)

Take a moment to absorb these concepts—they will underpin your ongoing journey to AWS mastery.

Catch you in the next article!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/fcdcac66-6274-4b2f-912a-d6e9de511e5a/lesson/21e37394-13cb-4855-8cc7-f2ea10978065)**
>
> Watch video content
