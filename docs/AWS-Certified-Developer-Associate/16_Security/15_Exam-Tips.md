# Exam Tips - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Security/Exam-Tips)

---

## Table of Contents

- Exam Tips
  - AWS Key Management Service (KMS)
  - Parameter Store and Secrets Manager
  - AWS Certificate Manager
  - AWS Cognito
  - AWS Web Application Firewall (WAF)
  - Watch Video
    - Parameter Store
    - Secrets Manager

---

## Content

AWS Certified Developer - Associate

Security

# Exam Tips

Below are some key exam tips and best practices to help you prepare for AWS certifications by understanding essential services and features.

---

## AWS Key Management Service (KMS)

AWS Key Management Service (KMS) simplifies the creation, management, and control of cryptographic keys used for data encryption. Many AWS services—such as S3, EBS, and RDS—rely on KMS to secure sensitive data. KMS uses two types of keys:

- **AWS Managed Keys:** Keys managed entirely by AWS. These keys cannot be modified.
- **Customer Managed Keys:** Keys created and fully controlled by you.

KMS supports data encryption for payloads up to 4 KB. For larger data, envelope encryption is required via the GenerateDataKey API, which is a common exam topic. To simplify the envelope encryption process, it is recommended to use the AWS Encryption SDK.

Additionally, KMS enforces resource quotas. Exceeding these quotas triggers a limit exceeded exception, while a request quota limits API calls per second and might result in throttling exceptions. To mitigate throttling, consider implementing exponential backoff, using data key caching with envelope encryption, or requesting a higher quota from AWS if necessary.

Key policies can also be defined to control and restrict key operations to authorized entities.

![The image is an informational graphic about AWS Key Management Service (KMS), detailing its role in cryptographic key management, types of keys offered, and its encryption capabilities.](https://kodekloud.com/kk-media/image/upload/v1752859358/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/aws-kms-key-management-graphic.jpg)

![The image provides guidelines for managing AWS Key Management Service (KMS), including handling resource quotas, throttling, data key caching, and defining key policies.](https://kodekloud.com/kk-media/image/upload/v1752859359/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/aws-kms-management-guidelines.jpg)

---

## Parameter Store and Secrets Manager

### Parameter Store

AWS Systems Manager Parameter Store securely stores configuration data and secrets for your applications. Its hierarchical structure allows you to group parameters by team ownership or other constraints, streamlining management. By default, parameters are stored in plaintext; however, you can enable encryption using KMS. Parameter Store offers two pricing tiers:

- **Standard Tier:** Optimized for most use cases.
- **Advanced Tier:** Provides increased limits, supports larger parameter sizes, and includes parameter policies.

### Secrets Manager

AWS Secrets Manager specializes in managing, retrieving, and rotating sensitive information such as database credentials and API keys. While it functions similarly to Parameter Store, its automatic secret rotation feature—managed through AWS Lambda—makes it ideal for handling highly sensitive secrets that require frequent updates. Additionally, secrets in Secrets Manager are encrypted by default.

![The image is a slide explaining the differences between Parameter Store and Secrets Manager, highlighting automatic secret rotation via Lambda and preference for sensitive secrets.](https://kodekloud.com/kk-media/image/upload/v1752859359/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/parameter-store-secrets-manager-differences.jpg)

---

## AWS Certificate Manager

AWS Certificate Manager (ACM) is designed to provision, manage, and deploy SSL/TLS certificates, which help secure communications for services like CloudFront distributions, load balancers, and API gateways. A key feature of ACM is its regional operation requirement. Certificates must be created in the same region as the resources they secure. For global services such as CloudFront, certificates must be provisioned in the US East (N. Virginia) region.

![The image is an informational slide about AWS Certificate Manager, detailing its functions in handling SSL/TLS certificates, its capability to generate certificates for various AWS services, and its regional operation requirements.](https://kodekloud.com/kk-media/image/upload/v1752859360/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/aws-certificate-manager-info-slide.jpg)

---

## AWS Cognito

AWS Cognito simplifies the process of managing user identities and authentication within your applications. It supports basic authentication functions, including login, sign-in, and sign-out, and integrates with third-party identity providers (IDPs) such as Google and Facebook for social login capabilities. Cognito includes two main components:

- **User Pools:** These provide a user directory and streamline the sign-up and sign-in process.
- **Identity Pools:** These allow authenticated users to obtain temporary AWS credentials to access AWS services.

![The image is a slide about AWS Cognito, describing its features such as managing user identities, implementing authentication, integrating with third-party IDPs, and using User and Identity Pools.](https://kodekloud.com/kk-media/image/upload/v1752859361/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/aws-cognito-user-identity-features.jpg)

---

## AWS Web Application Firewall (WAF)

AWS Web Application Firewall (WAF) protects your applications from Layer 7 web exploits like SQL injection and cross-site scripting (XSS) attacks. Designed to work with CloudFront distributions, load balancers, and API gateways, WAF uses Web ACLs (Access Control Lists) to define rules that filter incoming requests based on various criteria. These criteria include:

- Specific IP addresses
- HTTP headers
- Request body content
- URI strings
- Size constraints
- Country of origin
- Rate-based rules to mitigate DDoS attacks

Implementing WAF enhances your application's security posture by defending against a wide range of web threats.

> [!important]
> **Note**
>
> Familiarize yourself with Web ACL configurations as they are often emphasized during examinations, including rule settings and their real-world application.

---

These key exam tips offer a concise yet comprehensive overview of critical AWS services and features. Understanding these components will help you apply robust security and operational best practices in AWS environments, ultimately preparing you for success on the AWS certification exam.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/294fdab3-80dd-4183-aa7e-e5e3ffc9edd8/lesson/7fa26eab-2d3b-4882-aa21-dd146d256a65)**
>
> Watch video content
