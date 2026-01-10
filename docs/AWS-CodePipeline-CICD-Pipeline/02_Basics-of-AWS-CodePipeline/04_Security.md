# Security - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-CodePipeline-CICD-Pipeline/Basics-of-AWS-CodePipeline/Security)

---

## Table of Contents

- Security
  - 1. Identity and Access Management (IAM)
  - 2. Encryption
  - 3. Secrets Management
  - Summary
  - Links and References
  - Watch Video
    - 1.1 Authentication
    - 1.2 Authorization
    - 2.1 Data at Rest
    - 2.2 Data in Transit

---

## Content

AWS CodePipeline (CI/CD Pipeline)

Basics of AWS CodePipeline

# Security

Securing your AWS CodePipeline is essential for safeguarding every stage of your CI/CD workflow—from source code to production. In this guide, we’ll cover the key security pillars you need to enforce:

- Identity and Access Management (IAM)
- Authentication and Authorization
- Encryption (Data at Rest & In Transit)
- Secrets Management

![The image lists main areas related to AWS Identity and Access Management (IAM), including authentication, authorization, and encryption.](https://kodekloud.com/kk-media/image/upload/v1752862570/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Security/aws-iam-authentication-authorization-encryption.jpg)

---

## 1\. Identity and Access Management (IAM)

IAM ensures that only authorized principals can perform actions on your pipeline and its resources.

### 1.1 Authentication

Use IAM users, groups, and roles to control **who** can access CodePipeline:

- **IAM Users & Groups**  
  Provide long-term credentials for developers and administrators.
- **IAM Roles**  
  Grant temporary permissions when assumed by users, AWS services, or federated identities.

Roles are ideal for:

- Short-lived access across AWS accounts
- Federated users (e.g., SAML, OIDC)
- Applications running on EC2 (via instance profiles)

![The image is a slide about authentication, detailing "Users and Groups" with long-term credentials and "Roles" with temporary access, federated users, and applications on EC2 instances.](https://kodekloud.com/kk-media/image/upload/v1752862571/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Security/authentication-users-groups-roles-ec2.jpg)

When a user assumes the CodePipeline service role, they inherit its permissions—such as accessing S3 for artifacts:

![The image is a diagram showing a user assuming a role in AWS CodePipeline, which allows permissions to access Amazon S3.](https://kodekloud.com/kk-media/image/upload/v1752862572/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Security/aws-codepipeline-user-role-s3-diagram.jpg)

### 1.2 Authorization

Fine-grained permissions are enforced through IAM policies. These JSON documents define allowed or denied actions:

| Policy Type           | Attachment Target        | Use Case                             |
| --------------------- | ------------------------ | ------------------------------------ |
| Identity-based policy | IAM Users, Groups, Roles | Grant or deny actions to principals  |
| Resource-based policy | S3 Buckets, KMS Keys     | Control access at the resource level |

![The image is about "Authorization" and features an icon of a document labeled "Policies" with a shield, alongside text mentioning "JSON" and "Identity or Resource based."](https://kodekloud.com/kk-media/image/upload/v1752862573/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Security/authorization-policies-json-shield-icon.jpg)

For example, if UserA has no identity policy but the target S3 bucket’s resource policy allows `s3:DeleteObject`, UserA can delete items:

![The image shows a diagram of a user with no policy permissions accessing Amazon S3, with a resource policy allowing S3 delete permissions to UserA.](https://kodekloud.com/kk-media/image/upload/v1752862574/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Security/user-no-policy-amazon-s3-diagram.jpg)

---

## 2\. Encryption

Protect data confidentiality by encrypting artifacts at rest and securing data in transit.

### 2.1 Data at Rest

When storing build artifacts in S3, enforce server-side encryption (SSE). Compare your key management options:

| Encryption Option          | Key Management | Control Level                     |
| -------------------------- | -------------- | --------------------------------- |
| SSE-S3 (AWS-managed)       | AWS-managed    | No key rotation or policy control |
| SSE-KMS (AWS-managed)      | AWS KMS        | Automatic, limited policies       |
| SSE-KMS (Customer-managed) | AWS KMS CMK    | Full rotation & policy control    |

![The image illustrates a CI/CD pipeline with AWS CodeBuild and Amazon S3, highlighting the use of AWS Managed Keys and Customer Managed Keys for security.](https://kodekloud.com/kk-media/image/upload/v1752862576/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Security/ci-cd-pipeline-aws-codebuild-s3.jpg)

> [!important]
> **Warning**
>
> Always enforce HTTPS and server-side encryption in your S3 bucket policy to block unencrypted uploads or insecure connections.

Example S3 bucket policy:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DenyUnEncryptedObjectUploads",
      "Effect": "Deny",
      "Principal": "*",
      "Action": "s3:PutObject",
      "Resource": "arn:aws:s3:::my-artifact-bucket/*",
      "Condition": {
        "StringNotEquals": {
          "s3:x-amz-server-side-encryption": "aws:kms"
        }
      }
    },
    {
      "Sid": "DenyInsecureConnections",
      "Effect": "Deny",
      "Principal": "*",
      "Action": "s3:*",
      "Resource": "arn:aws:s3:::my-artifact-bucket/*",
      "Condition": {
        "Bool": {
          "aws:SecureTransport": "false"
        }
      }
    }
  ]
}
```

### 2.2 Data in Transit

Always use TLS (HTTPS) for:

- CodePipeline interactions with AWS services
- Integrations with third-party repositories (GitHub, Bitbucket)
- Calls to build and deployment providers

---

## 3\. Secrets Management

Avoid hard-coding credentials such as API keys or passwords in your pipeline. Instead, centralize secrets in AWS Secrets Manager:

![The image is a split design with a list of items like passwords and API keys on the left, and a lock icon with "AWS Secrets Manager" text on the right.](https://kodekloud.com/kk-media/image/upload/v1752862577/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Security/aws-secrets-manager-lock-passwords-list.jpg)

> [!important]
> **Note**
>
> Use the [AWS SDK](https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html) or AWS CLI to fetch secrets at runtime:
>
> ```
> aws secretsmanager get-secret-value --secret-id my-pipeline-secret
> ```

By retrieving secrets dynamically, you minimize exposure and enable automatic rotation.

---

## Summary

We’ve covered the critical security controls for AWS CodePipeline:

- IAM for robust **authentication** and **authorization**
- Encryption of artifacts **at rest** (SSE) and **in transit** (TLS)
- Secure secret handling with **AWS Secrets Manager**

![The image is a summary slide listing key topics: AWS Identity and Access Management (IAM), Authentication, Authorization (identity-based and resource-based), and Encryption. It is copyrighted by KodeKloud.](https://kodekloud.com/kk-media/image/upload/v1752862578/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Security/aws-iam-authentication-authorization-encryption-2.jpg)

---

## Links and References

- [AWS CodePipeline Documentation](https://docs.aws.amazon.com/codepipeline/latest/userguide/welcome.html)
- [IAM Best Practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)
- [AWS KMS Developer Guide](https://docs.aws.amazon.com/kms/latest/developerguide/)
- [AWS Secrets Manager User Guide](https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-codepipeline-ci-cd-pipeline/module/d9d0a786-1e14-426c-a9c6-7fe75f543824/lesson/8c570552-1b08-4a00-a607-6c0a3218e3db)**
>
> Watch video content
