# Using and Storing Secrets on AWS Secrets Manager - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-4-Security-and-Compliance/Using-and-Storing-Secrets-on-AWS-Secrets-Manager)

---

## Table of Contents

- Using and Storing Secrets on AWS Secrets Manager
  - Watch Video

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 4 Security and Compliance

# Using and Storing Secrets on AWS Secrets Manager

Welcome to this comprehensive guide on securing your sensitive credentials with AWS Secrets Manager. In this lesson, you'll discover how AWS Secrets Manager helps you eliminate the need to hard-code database credentials, API keys, and other secrets in your code, significantly reducing potential security risks.

Traditionally, developers embedded database credentials and other sensitive information directly in their applications or repositories. This practice exposed critical secrets to potential breaches if unauthorized parties accessed your source code. Over the course of my nearly 30-year career, I have witnessed numerous instances where improper secret management led to compromised credentials.

AWS Secrets Manager addresses these risks by securely storing your secrets. Instead of embedding a password or API key in your repository, your application dynamically retrieves an encrypted version of the secret from Secrets Manager at runtime, decrypts it in memory, and then uses it for authentication with the target service. This approach keeps your sensitive information secure and out of the source code.

Secrets Manager not only handles database credentials but also manages application credentials, API keys, tokens, and more. You can interact with Secrets Manager via the AWS CLI or SDK, and secrets are stored as JSON documents with unique names. All secrets are encrypted using AWS KMS and are transmitted securely over TLS/SSL.

> [!important]
> **Key Benefit**
>
> When your application has the correct permissions, it can retrieve and decrypt secrets securely. One major advantage of AWS Secrets Manager is its capability for automatic secret rotation, ensuring your credentials remain up-to-date and secure.

![The image is a diagram illustrating a "Secrets Manager" system, showing interactions between a database, application, and a secrets manager for credential retrieval and secret rotation.](https://kodekloud.com/kk-media/image/upload/v1752860642/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Using-and-Storing-Secrets-on-AWS-Secrets-Manager/secrets-manager-diagram-interactions.jpg)

Automatic password rotation in AWS Secrets Manager ensures that updated credentials are seamlessly provided to your application. If you encounter exam questions about automated password rotation, remember that AWS Secrets Manager is the correct choice—not the Systems Manager Parameter Store secure strings, as they do not support automatic rotation.

For example, when managing API keys, Secrets Manager dynamically provides the required secret value to your application. This means the API key isn’t embedded in your Lambda code or stored as an environment variable; it remains securely managed by AWS Secrets Manager.

![The image is a diagram showing the use of AWS Secrets Manager for managing API keys, involving AWS Lambda and an external API. It illustrates the flow of retrieving a secret value and using it as an API key.](https://kodekloud.com/kk-media/image/upload/v1752860644/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Using-and-Storing-Secrets-on-AWS-Secrets-Manager/aws-secrets-manager-api-keys-diagram.jpg)

AWS Secrets Manager offers several robust features:

- Secure secret storage with AWS KMS encryption
- Easy and dynamic retrieval of secrets at runtime
- Automatic secret rotation without manual intervention
- Fine-grained access control using IAM policies
- A cost-effective pay-as-you-go pricing model

> Note: When using AWS Managed Keys, encryption is free; however, custom KMS keys may incur extra charges.

![The image lists five features: secure secret storage, easy retrieval, automatic rotation, fine-grained access control, and pricing, each represented with an icon.](https://kodekloud.com/kk-media/image/upload/v1752860645/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Using-and-Storing-Secrets-on-AWS-Secrets-Manager/features-secure-storage-retrieval-rotation.jpg)

Secret metadata is an important aspect of managing your secrets. It typically includes details such as the version ID, version stages (e.g., current, previous, or pending), creation date, and the KMS key IDs used for encryption. Below is an example of secret metadata in JSON format:

```
{
  "Versions": [
    {
      "VersionId": "a11a8133-96ae-4abc-9bfb-e737ae39266e",
      "VersionStages": [
        "AWSPREVIOUS"
      ],
      "CreatedDate": 1692428755.262,
      "KmsKeyIds": [
        "DefaultEncryptionKey"
      ]
    },
    {
      "VersionId": "a2477f83-02a9-457c-b473-c9589c5d7309",
      "VersionStages": [
        "AWSCURRENT"
      ]
    }
  ]
}
```

In other cases, the metadata may be more comprehensive, including rotation details and IAM permissions:

```
{
  "Versions": [
    {
      "VersionId": "a11a8133-96ae-4abc-9bfb-e737ae39266e",
      "VersionStages": [
        "AWSPREVIOUS"
      ],
      "CreatedDate": 1692428755.262,
      "KmsKeyIds": [
        "DefaultEncryptionKey"
      ]
    },
    {
      "VersionId": "a2477f83-02a9-457c-b473-c9589c5d7309",
      "VersionStages": [
        "AWSCURRENT"
      ],
      "CreatedDate": 1692428770.661,
      "KmsKeyIds": [
        "DefaultEncryptionKey"
      ]
    }
  ]
}
```

Furthermore, secrets can be stored as JSON strings containing multiple key-value pairs. For example:

```
{
  "host": "ProdServer-01.databases.example.com",
  "port": "8888",
  "username": "administrator",
  "password": "EXAMPLE-PASSWORD",
  "dbname": "MyDatabase",
  "engine": "mysql"
}
```

Secrets Manager also supports replicating secrets across multiple AWS regions, which enhances disaster recovery and reduces latency for distributed applications. Replication ensures that a secret from one region is copied to another region with an updated Amazon Resource Name (ARN). For example:

```
arn:aws:secretsmanager:RegionA:123456789012:secret:secret1
```

After replication, in a different region the ARN will appear as:

```
arn:aws:secretsmanager:RegionB:123456789012:secret:secret1
```

![The image explains the benefits of replicating secrets across regions, highlighting regional access and low latency for distributed applications, and disaster recovery for improved resilience and redundancy.](https://kodekloud.com/kk-media/image/upload/v1752860646/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Using-and-Storing-Secrets-on-AWS-Secrets-Manager/replicating-secrets-benefits-regions.jpg)

Rotating secrets in AWS Secrets Manager can be done effortlessly. The service automatically updates credentials based on your specified interval while keeping previous versions for reference. In the past, a custom Lambda function was required for rotation, but many modern services now support native rotation natively.

![The image explains two methods of rotating secrets in AWS Secrets Manager: Managed Rotation, which is AWS-managed and requires no Lambda function, and Rotation by Lambda Function, which uses an AWS Lambda function to manage the rotation.](https://kodekloud.com/kk-media/image/upload/v1752860648/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Using-and-Storing-Secrets-on-AWS-Secrets-Manager/aws-secrets-manager-rotation-methods.jpg)

AWS Secrets Manager also supports secret versioning. Versions can be labeled as current, previous, or pending, and you even have the flexibility to create custom labels. Unlabeled versions are automatically deprecated if more than 100 versions exist, with a grace period of 24 hours before deletion.

![The image outlines three rules for secret versioning: creating custom labels, deprecating unlabeled versions if over 100 exist, and deleting versions not created within 24 hours.](https://kodekloud.com/kk-media/image/upload/v1752860649/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Using-and-Storing-Secrets-on-AWS-Secrets-Manager/secret-versioning-rules-outline.jpg)

There are two primary rotation strategies available:

1.  **Single-User Rotation Strategy:**  
    In this strategy, a single user with access to a resource (such as a database) is used. AWS Secrets Manager rotates the secret at a defined interval, updates the resource with new credentials, and ensures the application retrieves the most recent version.

    ![The image illustrates a "Single-User Rotation Strategy" where a user accesses a database using a key, with a clock symbol indicating time-based rotation. It also shows key versions, with the latest version in gold and the older version in gray.](https://kodekloud.com/kk-media/image/upload/v1752860650/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Using-and-Storing-Secrets-on-AWS-Secrets-Manager/single-user-rotation-strategy-diagram.jpg)

2.  **Alternating User Rotation Strategy:**  
    This strategy involves creating two users with identical permissions. The rotation alternates between these two users, allowing one secret to remain active while the other is updated and verified, ensuring a smooth transition between credentials.

    ![The image illustrates an "Alternating User Rotation Strategy" for database access, showing two users with keys of different versions to manage permissions.](https://kodekloud.com/kk-media/image/upload/v1752860651/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Using-and-Storing-Secrets-on-AWS-Secrets-Manager/alternating-user-rotation-strategy.jpg)

For clarity, consider the following comparison highlighting key differences between the two rotation strategies:

![The image is a comparison table between Single-User Rotation Strategy and Alternating User Rotation Strategy, highlighting differences in users, downtime risk, complexity, and rotation process.](https://kodekloud.com/kk-media/image/upload/v1752860653/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Using-and-Storing-Secrets-on-AWS-Secrets-Manager/rotation-strategy-comparison-table.jpg)

While the alternating user strategy offers advanced permission controls, a single-user rotation strategy often provides sufficient security and simplicity for many applications.

Thank you for reading this guide on AWS Secrets Manager. We hope this article enhances your understanding of secure secret management, automated password rotation, and the benefits of region replication. For more insights, consider exploring additional [AWS documentation](https://aws.amazon.com/documentation/secrets-manager/) and best practices.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/0c9bb9a3-5201-434e-8085-a9f1e9f23f22/lesson/93b3818b-183c-45e6-bd6e-8d5d5aca58cc)**
>
> Watch video content
