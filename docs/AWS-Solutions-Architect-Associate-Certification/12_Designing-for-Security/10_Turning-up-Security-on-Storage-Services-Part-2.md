# Turning up Security on Storage Services Part 2 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Designing-for-Security/Turning-up-Security-on-Storage-Services-Part-2)

---

## Table of Contents

- Turning up Security on Storage Services Part 2
  - How Pre-signed URLs Work
  - Server-Side Encryption Options in S3
  - Access Control Layers in S3
  - S3 Access Logging for Detection
  - Example Scenario: S3 Access Logging
  - S3 Object Lock and Versioning
  - S3 Replication and Immutable Data Storage
  - Securing S3 Access with VPC Endpoints
  - Summary
  - Watch Video
    - Example Scenario: VPC Endpoints

---

## Content

AWS Solutions Architect Associate Certification

Designing for Security

# Turning up Security on Storage Services Part 2

In this article, we explore how to secure Amazon Simple Storage Service (S3), the only true object storage service on AWS since 2006. We will cover best practices and strategies for securing your data, using measures such as private buckets, server-side encryption, and pre-signed URLs.

A startup, for example, plans to use S3 to store user-uploaded images for a mobile application. They need to ensure these images are stored securely, are accessible only by authorized personnel, and can be retrieved quickly on demand. Consider the following approaches:

1.  Store images in a public S3 bucket and use IAM roles to restrict access from application servers.
2.  Store images in a private S3 bucket, enable server-side encryption, and use pre-signed URLs for temporary access.
3.  Store images in an S3 bucket with public read access and use bucket policies to restrict access based on IP addresses.
4.  Store images in a private S3 bucket without encryption and use embedded IAM credentials for access.

The most secure option is **#2**. Modern S3 buckets (as of 2024) are automatically encrypted by default, but you can enable or verify server-side encryption when needed. Keeping the bucket private while using pre-signed URLs adds an extra layer of security by allowing temporary access.

![The image presents a scenario where a startup plans to use Amazon S3 for storing user-uploaded images securely, with four options for managing access and security. The options include using IAM roles, server-side encryption, pre-signed URLs, and bucket policies.](https://kodekloud.com/kk-media/image/upload/v1752864547/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Storage-Services-Part-2/amazon-s3-user-images-security-options.jpg)

## How Pre-signed URLs Work

Pre-signed URLs allow users to perform specific S3 operations for a limited time. The typical workflow is:

- A user calls an API endpoint (which can be an API Gateway backed by a Lambda function or a direct S3 call) to request a pre-signed URL.
- AWS generates a URL containing temporary credentials.
- The user uses this URL to securely upload or download a file.

![The image is a flowchart illustrating the process of generating and using a presigned URL for AWS S3, involving a user, API Gateway, Lambda function, and S3.](https://kodekloud.com/kk-media/image/upload/v1752864548/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Storage-Services-Part-2/aws-s3-presigned-url-flowchart.jpg)

## Server-Side Encryption Options in S3

Amazon S3 supports different server-side encryption methods:

- **SSE-C (Customer-Provided Keys):** You provide and manage the encryption keys.
- **SSE-S3 (S3-Managed Keys):** AWS manages the encryption keys by default.
- **SSE-KMS (AWS KMS-Managed Keys):** Keys are stored and managed in AWS Key Management Service (KMS), with options for using AWS-managed or customer-managed keys.

When using SSE-KMS, AWS handles key management for S3, although you can choose to manage your own keys for additional control.

![The image is a flowchart illustrating different types of Server-Side Encryption (SSE) options in Amazon S3, including client-managed keys, S3-managed keys, and AWS KMS-managed keys.](https://kodekloud.com/kk-media/image/upload/v1752864549/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Storage-Services-Part-2/s3-server-side-encryption-flowchart.jpg)

In the case of SSE-C, encryption key details are provided with each request, allowing S3 to encrypt or decrypt objects as needed. Note that this differs from client-side encryption, where data is encrypted before it is sent to S3.

## Access Control Layers in S3

Amazon S3 evaluates permissions through multiple layers, ensuring robust security. The four main access control components are:

1.  **Identity-based policies:** Define what actions a user can perform.
2.  **Bucket policies (resource-based):** Attached to the bucket, specifying who can access the resource.
3.  **Access Control Lists (ACLs):** Although available, ACLs are generally minimized as they are disabled by default.
4.  **Block Public Access settings:** Prevent accidental exposure of buckets.

Consider the following IAM policy that allows access to specific S3 actions:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:GetBucketLocation",
      "Resource": "arn:aws:s3:::*"
    },
    {
      "Effect": "Allow",
      "Action": "s3:*",
      "Resource": [
        "arn:aws:s3:::YOUR-BUCKET",
        "arn:aws:s3:::YOUR-BUCKET/*"
      ]
    }
  ]
}
```

A bucket policy example that grants public read access might look like this:

```
{
  "Version": "2008-10-17",
  "Statement": [
    {
      "Sid": "AllowPublicRead",
      "Effect": "Allow",
      "Principal": {
        "AWS": "*"
      },
      "Action": [
        "s3:GetObject"
      ],
      "Resource": [
        "arn:aws:s3:::s3browser/public-folder/*"
      ]
    }
  ]
}
```

Similarly, an ACL can grant specific read permissions to other AWS accounts, although it is less common:

```
{
  "Version": "2008-10-17",
  "Statement": [
    {
      "Sid": "AllowPublicRead",
      "Effect": "Allow",
      "Principal": {
        "AWS": "*"
      },
      "Action": [
        "s3:GetObject"
      ],
      "Resource": [
        "arn:aws:s3:::s3browser/public-folder/*"
      ]
    }
  ]
}
```

![The image shows a diagram of Amazon S3's four layers of access control, focusing on editing an access control list (ACL) with options for granting read/write permissions to different groups.](https://kodekloud.com/kk-media/image/upload/v1752864550/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Storage-Services-Part-2/amazon-s3-access-control-diagram.jpg)

> [!important]
> **Access Control Evaluation**
>
> If any one access control layer explicitly denies an action, further evaluation stops immediately. AWS assesses the layers in the following order: Block Public Access settings, then IAM policies, bucket policies, and finally ACLs.

![The image is a diagram of Amazon S3's four layers of access control, including IAM Policies, Bucket Policies, Access Control Lists, and Block Public Access Setting, with a detailed view of the "Block public access" settings.](https://kodekloud.com/kk-media/image/upload/v1752864552/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Storage-Services-Part-2/amazon-s3-access-control-diagram-2.jpg)

## S3 Access Logging for Detection

Monitoring and security also rely on detecting potential misuse. Amazon S3 access logging captures detailed information about requests made to your bucket. The logs include:

- Canonical user IDs for both the requester and bucket owner
- Operations performed
- Metadata such as object size and request timestamp

These logs are vital for forensic analysis and auditing.

A sample log entry might look like this:

```
79a59d9f900b949e55d96a1698bacedfd6e09d98acff8f8d5218e7cd47ef2be awsexamplebucket [06/Feb/2019:00:01:57 +0000] 192.0.2.3 79a59d9f900b949e55d96a1698bacedfd6e09d98acff8f8d5218e7cd47ef2be DD6CCT733EXAMPLE REST.PUT.OBJECT s3-dg.pdf "PUT /awsexamplebucket/s3-dg.pdf HTTP/1.1" 200 - 4406583 41754 20 "-" "S3Console/0.4" - 10S62zv81kBW7B6SX4XJA806kpc16LpwEoizZQ0xJd5qDSCTLX0Tgs37kYU BKQW3+PdRg1234- SigV4 ECDHE-RSA-AES128-SHA AuthHeader awsexamplebucket.s3.amazonaws.com TLSv1.1
```

## Example Scenario: S3 Access Logging

Consider an e-commerce company that hosts product images and static assets in S3. With rising traffic and the need for monitoring, the best approach is to enable S3 access logging and store these logs in a separate, private bucket. This method isolates log data effectively, unlike storing logs in the same bucket—which is not recommended—and CloudTrail, which is less suited for real-time S3 access logging.

## S3 Object Lock and Versioning

For regulatory compliance and data integrity, S3 Object Lock enforces immutable storage. It can be configured in two modes:

- **Governance Mode:** Only users with special permissions can override the lock.
- **Compliance Mode:** No changes are allowed, even for users with full permissions, ensuring complete immutability during a specified retention period.

For instance, a pharmaceutical company might adopt compliance mode for critical data and governance mode where some overrides are acceptable.

![The image presents a scenario where a pharmaceutical company needs to choose Amazon S3 Object Lock modes to meet regulatory requirements, with four options provided for consideration.](https://kodekloud.com/kk-media/image/upload/v1752864553/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Storage-Services-Part-2/amazon-s3-object-lock-options.jpg)

Similarly, a legal firm storing sensitive court documents could use compliance mode of S3 Object Lock to guarantee that documents cannot be deleted or overwritten, aligning with strict regulatory mandates.

![The image presents a scenario where a legal firm needs to ensure documents stored in Amazon S3 cannot be deleted or overwritten, and it lists four potential S3 features to meet this requirement.](https://kodekloud.com/kk-media/image/upload/v1752864555/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Storage-Services-Part-2/s3-document-retention-legal-firm.jpg)

## S3 Replication and Immutable Data Storage

Some architectures use replication between source and destination buckets across different accounts for backup purposes. By applying S3 Object Lock on the destination bucket, you ensure that once data is replicated, it remains immutable—even if changes occur in the source bucket. This approach is especially effective for preserving log integrity.

![The image is a diagram illustrating an AWS architecture for S3 replication and recovery, involving components like AWS CloudWatch, EventBridge, Lambda, and S3 Batch Operations. It shows the flow of data between a source account and a destination account with protected and recovery buckets.](https://kodekloud.com/kk-media/image/upload/v1752864556/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Storage-Services-Part-2/aws-s3-replication-architecture-diagram.jpg)

## Securing S3 Access with VPC Endpoints

AWS provides VPC endpoints to ensure that service traffic remains within the AWS network, bypassing the public internet. For S3, there are two types of endpoints:

- **Gateway Endpoints:** Specifically support S3 and DynamoDB.
- **Interface Endpoints:** Powered by AWS PrivateLink, these can handle traffic for multiple services, including S3.

For instance, a global e-commerce company with EC2 instances accessing an S3 bucket should create an S3 VPC endpoint and update the route table. This setup guarantees that data transfers remain within AWS's private network.

![The image is a diagram explaining a solution for a global e-commerce company to securely access an Amazon S3 bucket from EC2 instances within a VPC on AWS, without routing traffic over the public internet. It lists four potential solutions, including creating an S3 VPC endpoint and modifying security groups.](https://kodekloud.com/kk-media/image/upload/v1752864557/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Storage-Services-Part-2/aws-ecommerce-s3-access-diagram.jpg)

### Example Scenario: VPC Endpoints

A healthcare organization has a critical application in a VPC that processes patient data and stores it in an S3 bucket. Compliance requirements dictate that the data does not traverse the public internet. The recommended solution is to create an S3 VPC endpoint (or an interface endpoint if PrivateLink is required) and update the VPC’s route table accordingly.

![The image presents a scenario where a healthcare organization needs to ensure secure data transfer between a VPC and an Amazon S3 bucket without using the public internet, offering four potential solutions.](https://kodekloud.com/kk-media/image/upload/v1752864558/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Storage-Services-Part-2/secure-data-transfer-vpc-s3-solutions.jpg)

For additional context, consider this diagram illustrating on-premises integration with AWS Cloud using endpoints:

![The image is a diagram showing the integration between an on-premises data center and AWS Cloud, illustrating connections via AWS Direct Connect or VPN to a VPC with endpoints for S3 and AWS PrivateLink.](https://kodekloud.com/kk-media/image/upload/v1752864559/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Storage-Services-Part-2/on-premises-aws-cloud-integration-diagram.jpg)

## Summary

In this article, we explored various strategies to enhance storage security with Amazon S3. Key takeaways include:

- Using private buckets with server-side encryption and pre-signed URLs for secure storage.
- Understanding and selecting among different server-side encryption options (SSE-C, SSE-S3, SSE-KMS).
- Implementing layered access control with IAM policies, bucket policies, ACLs, and Block Public Access settings.
- Leveraging S3 access logging for monitoring, auditing, and forensic analysis.
- Applying S3 Object Lock in both governance and compliance modes to meet regulatory requirements.
- Securing S3 access using VPC endpoints to maintain data within AWS’s private network.

These security measures ensure that your data is protected in transit and at rest, helping you meet compliance requirements while maintaining operational security on AWS.

Feel free to reach out via email or on social channels for further questions or clarifications.

Happy securing!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/fcdcac66-6274-4b2f-912a-d6e9de511e5a/lesson/646b2860-59e6-44bc-8f01-4c18c140ac97)**
>
> Watch video content
