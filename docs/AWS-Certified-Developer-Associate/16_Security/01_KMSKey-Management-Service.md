# KMSKey Management Service - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Security/KMSKey-Management-Service)

---

## Table of Contents

- KMSKey Management Service
  - Why We Need Encryption
  - Symmetric vs. Asymmetric Encryption
  - Overview of AWS Key Management Service (KMS)
  - Types of Keys in KMS
  - How AWS KMS Works
  - KMS Resource and Request Quotas
  - KMS Key Policies
  - Summary
  - Watch Video
    - File Size Limitations and Envelope Encryption
    - Resource Quotas
    - Request Quotas
      - Mitigating Throttling

---

## Content

AWS Certified Developer - Associate

Security

# KMSKey Management Service

In this lesson, we explore AWS's Key Management Service (KMS) and its role in enhancing data encryption. Understanding the need for encryption is fundamental before delving into how KMS operates.

## Why We Need Encryption

When files are uploaded to a server, they are often stored as plain text. This means that if an unauthorized party gains access, they could easily read sensitive information. Encryption addresses this vulnerability by converting data into an unreadable format—unless decrypted with the correct key.

For example, encrypting your file with a cryptographic key prior to upload ensures that even if someone accesses the data, it remains secure without the corresponding key.

![The image illustrates a scenario highlighting the importance of encryption, showing a client, server, and a hacker who can read sensitive data.](https://kodekloud.com/kk-media/image/upload/v1752859373/notes-assets/images/AWS-Certified-Developer-Associate-KMSKey-Management-Service/encryption-importance-client-server-hacker.jpg)

A similar concept is depicted below, where a lock icon represents data protection:

![The image illustrates a basic encryption concept, showing a client, server, and data with a lock icon, under the title "Why Encryption?"](https://kodekloud.com/kk-media/image/upload/v1752859376/notes-assets/images/AWS-Certified-Developer-Associate-KMSKey-Management-Service/encryption-concept-client-server-lock.jpg)

## Symmetric vs. Asymmetric Encryption

Encryption techniques are broadly classified into two categories:

1.  **Symmetric Encryption:**  
    The same key is used for both encryption and decryption. This method places significant emphasis on key management since any entity with the key can decrypt the data.
2.  **Asymmetric Encryption:**  
    Involves a pair of keys—a public key and a private key. Typically, data encrypted with one key can only be decrypted with the other.

![The image illustrates the concepts of symmetric and asymmetric encryption, showing the process of encryption and decryption with keys.](https://kodekloud.com/kk-media/image/upload/v1752859377/notes-assets/images/AWS-Certified-Developer-Associate-KMSKey-Management-Service/symmetric-asymmetric-encryption-diagram.jpg)

Manually managing cryptographic keys—creating, storing, rotating, and applying access controls—can be complex and error-prone. AWS KMS simplifies this process significantly.

## Overview of AWS Key Management Service (KMS)

AWS KMS is designed to securely create, manage, and store cryptographic keys. By leveraging KMS, you offload the heavy lifting of key management to AWS, allowing for secure encryption and decryption operations via its API. AWS services such as Amazon S3, EBS, and RDS integrate with KMS to provide built-in encryption support.

![The image is a diagram illustrating the AWS Key Management Service (KMS), highlighting its functions: create, manage, and store keys.](https://kodekloud.com/kk-media/image/upload/v1752859378/notes-assets/images/AWS-Certified-Developer-Associate-KMSKey-Management-Service/aws-kms-key-management-diagram.jpg)

## Types of Keys in KMS

KMS offers two primary categories of keys:

- **Customer Managed Keys:**  
  These keys provide you with full control. You can manage their lifecycle (creation, deletion, enabling, disabling, and rotation), define detailed access policies, and track events via CloudTrail.
- **AWS Managed Keys:**  
  AWS automatically creates and manages these keys for services like S3 or EBS. While you can view metadata and usage events, you cannot modify the associated policies.

![The image is a diagram illustrating the AWS Key Management Service (KMS), showing the interaction between a client and KMS, with sections for Customer Managed Keys (CMK) and AWS Managed Keys for services like SQS, S3, and EBS.](https://kodekloud.com/kk-media/image/upload/v1752859379/notes-assets/images/AWS-Certified-Developer-Associate-KMSKey-Management-Service/aws-kms-diagram-client-interaction.jpg)

Below is a visual comparison between Customer Managed Keys and AWS Managed Keys:

![The image is a comparison table of AWS Key Management Service, detailing differences between Customer Managed Keys and AWS Managed Keys across categories like control, key policies, visibility, rotation, and usage.](https://kodekloud.com/kk-media/image/upload/v1752859381/notes-assets/images/AWS-Certified-Developer-Associate-KMSKey-Management-Service/aws-kms-keys-comparison-table.jpg)

## How AWS KMS Works

AWS KMS follows a streamlined workflow to enhance security:

1.  **Key Creation:**  
    Use the CreateKey API to generate a customer managed key, which is securely stored in KMS and never directly exposed.
2.  **Encryption:**  
    Invoke the Encrypt API to send your data to KMS. The service encrypts your data using the customer managed key and returns the ciphertext.
3.  **Decryption:**  
    To access encrypted data, the Decrypt API is used with the ciphertext to retrieve the original plaintext.

Each API call in KMS requires specific IAM permissions. For example, you must have permissions to create keys and perform encryption or decryption operations.

![The image illustrates how AWS Key Management Service (KMS) works, showing interactions between a client, AWS Identity and Access Management (IAM), and AWS KMS for creating keys, encrypting, and decrypting data.](https://kodekloud.com/kk-media/image/upload/v1752859382/notes-assets/images/AWS-Certified-Developer-Associate-KMSKey-Management-Service/aws-kms-key-management-diagram-2.jpg)

### File Size Limitations and Envelope Encryption

AWS KMS has a limitation where the Encrypt API can only handle files up to 4 kilobytes. For larger files, envelope encryption is the recommended approach. The process involves the following steps:

1.  Call the GenerateDataKey API with your customer managed key. KMS returns both a plaintext and an encrypted version of the data key.
2.  Use the plaintext data key to encrypt your larger file.
3.  Store the encrypted data key along with the encrypted file.
4.  For decryption, use the Decrypt API by sending the encrypted data key to obtain the plaintext key, and then decrypt your file.

![The image illustrates the process of envelope encryption, showing a client generating a data key, which is then encrypted using a customer master key (CMK) to produce both plaintext and encrypted data keys.](https://kodekloud.com/kk-media/image/upload/v1752859383/notes-assets/images/AWS-Certified-Developer-Associate-KMSKey-Management-Service/envelope-encryption-data-key-diagram.jpg)

![The image illustrates the process of envelope encryption, showing the interaction between a client, plaintext data key, encrypted data key, and a CMK (Customer Master Key) for decryption.](https://kodekloud.com/kk-media/image/upload/v1752859384/notes-assets/images/AWS-Certified-Developer-Associate-KMSKey-Management-Service/envelope-encryption-process-diagram.jpg)

> [!important]
> **Tip**
>
> For a simplified implementation of envelope encryption, consider using the AWS Encryption SDK. It automates key generation, encryption, and decryption in a single command.

## KMS Resource and Request Quotas

AWS KMS enforces both resource and request quotas to ensure optimal performance and security.

### Resource Quotas

By default, you can have up to 100,000 customer managed KMS keys and 50 aliases per key, among other quotas. If you exceed these quotas, AWS returns a "LimitExceededException" error. These limits may be adjusted by AWS based on your needs.

![The image is a table listing AWS KMS resource quotas, including quota names, default values, applicable areas, and whether they are adjustable. It also notes that exceeding a quota results in a "LimitExceededException."](https://kodekloud.com/kk-media/image/upload/v1752859386/notes-assets/images/AWS-Certified-Developer-Associate-KMSKey-Management-Service/aws-kms-resource-quotas-table.jpg)

### Request Quotas

Request quotas regulate the number of API operations you can perform per second. Exceeding these limits leads to throttling, and KMS returns relevant error messages.

For example, exceeding the allowed rate may produce an error similar to the one shown below:

![The image shows an error message indicating that the rate limit for calling AWS KMS has been exceeded, with a status code of 400 and an error code of ThrottlingException.](https://kodekloud.com/kk-media/image/upload/v1752859387/notes-assets/images/AWS-Certified-Developer-Associate-KMSKey-Management-Service/aws-kms-rate-limit-error-400.jpg)

#### Mitigating Throttling

Managing throttling can be achieved through several strategies:

- **Exponential Backoff:** Retry failed requests with progressive delays.
- **Data Key Caching:** Cache decrypted data keys to reduce repeated API calls.
- **Request a Limit Increase:** Contact AWS support to increase your request quotas.

![The image illustrates strategies for handling KMS throttling, including exponential backoff, data key caching, and increased request limits from AWS.](https://kodekloud.com/kk-media/image/upload/v1752859388/notes-assets/images/AWS-Certified-Developer-Associate-KMSKey-Management-Service/kms-throttling-strategies-diagram.jpg)

## KMS Key Policies

Key policies in AWS KMS dictate who can perform various operations. Typically, administrators are granted permissions to create, disable, or delete keys, while regular users might only be allowed to encrypt or decrypt data.

Below is an example of a key policy designed for administrators:

```
{
  "Sid": "Allow access for Key Administrators",
  "Effect": "Allow",
  "Principal": {
    "AWS": "arn:aws:iam::841860927337:user/admin"
  },
  "Action": [
    "kms:Create*",
    "kms:Enable*",
    "kms:Put*",
    "kms:Update*",
    "kms:Revoke*",
    "kms:Disable*",
    "kms:Delete*",
    "kms:ScheduleKeyDeletion",
    "kms:RotateKeyOnDemand"
  ],
  "Resource": "*"
}
```

The following policy grants limited permissions for specific users:

```
{
  "Sid": "Allow use of the key",
  "Effect": "Allow",
  "Principal": {
    "AWS": [
      "arn:aws:iam::841860927337:user/user1",
      "arn:aws:iam::841860927337:user/user2"
    ]
  },
  "Action": [
    "kms:Encrypt",
    "kms:Decrypt",
    "kms:ReEncrypt*",
    "kms:GenerateDataKey*",
    "kms:DescribeKey"
  ],
  "Resource": "*"
}
```

It is crucial to adhere to the principle of least privilege by granting only the necessary permissions to reduce potential risks.

## Summary

AWS KMS simplifies the management of cryptographic keys and provides robust solutions for data encryption and decryption. Key takeaways include:

- AWS KMS integrates seamlessly with many AWS services to offer out-of-the-box encryption.
- For data up to 4 KB, KMS supports direct encryption, while the GenerateDataKey API facilitates envelope encryption for larger files.
- Two key types are available: AWS managed keys, which are fully managed by AWS, and customer managed keys, which offer full control over key lifecycle and policies.
- Both resource quotas and API rate limits are enforced in KMS. Exceeding these may result in throttling or limit errors.
- Implementing robust key policies ensures that only authorized users perform sensitive cryptographic operations.

![The image is a summary of AWS Key Management Service (KMS) features, including cryptographic key management, encryption services, and types of managed keys. It uses a colorful design to differentiate between various aspects of KMS.](https://kodekloud.com/kk-media/image/upload/v1752859389/notes-assets/images/AWS-Certified-Developer-Associate-KMSKey-Management-Service/aws-kms-features-summary.jpg)

For detailed information on resource quotas, API limits, and throttling best practices, please refer to the official AWS documentation.

![The image is a summary slide discussing adjustable quotas, request quotas, and handling throttling in AWS, with a gradient background and bullet points.](https://kodekloud.com/kk-media/image/upload/v1752859391/notes-assets/images/AWS-Certified-Developer-Associate-KMSKey-Management-Service/aws-quota-throttling-summary-slide.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/294fdab3-80dd-4183-aa7e-e5e3ffc9edd8/lesson/0bd6be8c-965d-4a78-80db-d723ccdf0bc2)**
>
> Watch video content
