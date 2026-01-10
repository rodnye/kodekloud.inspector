# Demo S3 Encryption - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Amazon-Simple-Storage-Service-Amazon-S3/AWS-S3-Advanced-Features/Demo-S3-Encryption)

---

## Table of Contents

- Demo S3 Encryption
  - 1. Default SSE-S3 Encryption
  - 2. SSE-KMS with the AWS-Managed Key
  - 3. Customer-Managed KMS Keys for Granular Control
  - 4. Make Your CMK the Bucket Default
  - Watch Video
  - Practice Lab
    - 3.1 Create a Customer-Managed CMK
    - 3.2 Encrypt an Object with Your CMK
    - 3.3 Manage Your Customer-Managed CMK

---

## Content

Amazon Simple Storage Service (Amazon S3)

AWS S3 Advanced Features

# Demo S3 Encryption

In this guide, we’ll demonstrate how to secure data in Amazon S3 using three server-side encryption methods:

- **SSE-S3** (default S3-managed keys)
- **SSE-KMS (AWS-managed)**
- **SSE-KMS (customer-managed)**

| Encryption Method          | Description                                 | Access Control                                |
| -------------------------- | ------------------------------------------- | --------------------------------------------- |
| SSE-S3                     | Server-side encryption with S3-managed keys | Any IAM principal with S3 permissions decrypt |
| SSE-KMS (AWS-managed)      | SSE using an AWS-managed KMS CMK            | Requires S3 + KMS usage permissions           |
| SSE-KMS (customer-managed) | SSE using a customer-created KMS CMK        | Fine-grained KMS policy separates duties      |

For more details, see the [Amazon S3 Encryption Overview](https://docs.aws.amazon.com/AmazonS3/latest/userguide/default-bucket-encryption.html) and the [AWS KMS Documentation](https://docs.aws.amazon.com/kms/latest/developerguide/overview.html).

## 1\. Default SSE-S3 Encryption

By default, any object uploaded to a new S3 bucket is encrypted at rest with SSE-S3. You don’t need to configure anything extra.

> [!important]
> **Note**
>
> If you haven’t changed bucket defaults, SSE-S3 is automatically applied to all uploads.

![The image shows an Amazon S3 management console screen with settings for bucket properties, including versioning, encryption, and intelligent-tiering archive configurations. The default encryption is set to use Amazon S3 managed keys (SSE-S3).](https://kodekloud.com/kk-media/image/upload/v1752869190/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Demo-S3-Encryption/amazon-s3-management-console-bucket-settings.jpg)

When uploading via the console, you can explicitly choose **Server-side encryption** → **Amazon S3 key (SSE-S3)**:

![The image shows an AWS Management Console screen focused on S3 storage options, specifically server-side encryption settings. It includes options for specifying encryption keys and additional checksum settings.](https://kodekloud.com/kk-media/image/upload/v1752869191/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Demo-S3-Encryption/aws-s3-server-side-encryption-settings.jpg)

Upload a test file and verify its **Encryption** property in the object details. SSE-S3 uses keys fully managed by AWS; any user with S3 permissions can decrypt objects.

## 2\. SSE-KMS with the AWS-Managed Key

To add KMS to the mix, override the bucket’s default encryption at upload time:

1.  Start a new upload in the S3 console.
2.  In **Properties**, set **Server-side encryption** → **AWS KMS key (SSE-KMS)**.
3.  Select the default AWS-managed CMK for S3.
4.  Complete your upload.

![The image shows an AWS Management Console screen focused on server-side encryption settings for an S3 bucket, with options for specifying encryption keys and types.](https://kodekloud.com/kk-media/image/upload/v1752869193/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Demo-S3-Encryption/aws-s3-bucket-encryption-settings-console.jpg)

If the S3-default key doesn’t exist, S3 provisions it automatically. You can browse managed CMKs in the KMS console:

![The image shows the AWS Key Management Service (KMS) webpage, detailing features for creating and managing encryption keys across AWS. It includes sections on how it works, pricing, and getting started, with a sidebar for navigation.](https://kodekloud.com/kk-media/image/upload/v1752869194/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Demo-S3-Encryption/aws-kms-webpage-encryption-keys.jpg)

After uploading, inspect your object’s metadata:

![The image shows an AWS S3 console displaying the properties of an object named "bird-KMS-default-key.jpg" in a bucket. It includes details like size, type, and object URL, with bucket versioning disabled.](https://kodekloud.com/kk-media/image/upload/v1752869195/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Demo-S3-Encryption/aws-s3-console-bird-kms-key.jpg)

And check the AWS-managed CMK list:

![The image shows the AWS Key Management Service (KMS) console with a list of AWS managed keys, including aliases for S3 and RDS, both of which are enabled.](https://kodekloud.com/kk-media/image/upload/v1752869196/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Demo-S3-Encryption/aws-kms-console-managed-keys-s3-rds.jpg)

The policy for an AWS-managed CMK is fixed and cannot be altered:

```
{
  "Version": "2012-10-17",
  "Id": "auto-s3-2",
  "Statement": [
    {
      "Sid": "Allow access through S3 for all principals in the account that are authorized to use S3",
      "Effect": "Allow",
      "Principal": {
        "AWS": "*"
      },
      "Action": [
        "kms:Encrypt",
        "kms:Decrypt",
        "kms:ReEncrypt*",
        "kms:GenerateDataKey*"
      ]
    }
  ]
}
```

![The image shows an Amazon S3 console with a bucket named "kk-encryption-demo" containing two JPEG files. The files are listed with details such as name, type, last modified date, size, and storage class.](https://kodekloud.com/kk-media/image/upload/v1752869197/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Demo-S3-Encryption/amazon-s3-console-kk-encryption-demo.jpg)

> [!important]
> **Warning**
>
> AWS-managed CMKs can’t restrict decryption separate from S3 access. Any user with S3 permissions can decrypt SSE-KMS objects.

## 3\. Customer-Managed KMS Keys for Granular Control

To separate S3 permissions from decryption rights, create and use your own KMS CMK.

### 3.1 Create a Customer-Managed CMK

1.  In the KMS console, go to **Customer managed keys** → **Create key**.
2.  Choose **Symmetric** and click **Next**.
3.  Add an alias, e.g., `my-key`.

![The image shows an AWS KMS (Key Management Service) interface where a user is adding labels to a key, including an alias named "my-key." There are optional fields for description and tags.](https://kodekloud.com/kk-media/image/upload/v1752869198/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Demo-S3-Encryption/aws-kms-key-labels-interface.jpg)

4.  Specify **Key administrative permissions** (who can manage the CMK).

![The image shows an AWS KMS console screen where key administrative permissions are being defined, listing various users and roles.](https://kodekloud.com/kk-media/image/upload/v1752869199/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Demo-S3-Encryption/aws-kms-console-key-permissions-definition.jpg)

5.  Define **Key usage permissions** (who can encrypt/decrypt).
6.  Review and finish. The default key policy looks like:

```
{
  "Id": "key-consolepolicy-3",
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Enable IAM User Permissions",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::841860297733:root"
      }
    }
  ]
}
```

### 3.2 Encrypt an Object with Your CMK

1.  Open your S3 bucket and start a new upload.
2.  Under **Override default encryption**, choose **AWS KMS key** → **my-key**.

![The image shows an AWS Management Console screen for configuring server-side encryption settings for an S3 bucket, with options to specify an encryption key and select from available AWS KMS keys.](https://kodekloud.com/kk-media/image/upload/v1752869201/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Demo-S3-Encryption/aws-s3-bucket-encryption-settings-console-2.jpg)

3.  Upload and view the object details:

![The image shows an Amazon S3 console interface displaying details of an object named "brid-KMS-Custom-key.jpg," including its properties, S3 URI, and bucket management settings.](https://kodekloud.com/kk-media/image/upload/v1752869202/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Demo-S3-Encryption/amazon-s3-console-brid-kms-key.jpg)

- **Admin** (with S3 + KMS rights) can download and decrypt.
- **User2** (S3-only) can list and modify metadata but cannot decrypt:

```
<Error>
  <Code>AccessDenied</Code>
  <Message>The ciphertext refers to a customer master key that does not exist, does not exist in this region, or you are not allowed to access.</Message>
  <RequestId>45V16V31G01DFAB5</RequestId>
  <HostId>1kv(0M+PFX6f0xACL7kpxnmxFkHerBHM2xYJWFT6uBiBkbPqbV6YBUOzVwViTRkbIDhk=</HostId>
</Error>
```

Users without KMS Decrypt permission can still delete or rename the object:

![The image shows an Amazon S3 console with a bucket named "kk-encryption-demo" containing three JPEG files. The files are listed with details such as name, type, last modified date, size, and storage class.](https://kodekloud.com/kk-media/image/upload/v1752869204/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Demo-S3-Encryption/amazon-s3-console-kk-encryption-demo-2.jpg)

### 3.3 Manage Your Customer-Managed CMK

Back in the KMS console, you can edit your CMK policy, enable key rotation, and adjust usage permissions—capabilities not available for AWS-managed CMKs:

![The image shows an AWS Key Management Service (KMS) console page displaying details of a customer-managed key, including its alias, ARN, status, and creation date. The "Key policy" section is open, with options to add or remove key administrators.](https://kodekloud.com/kk-media/image/upload/v1752869205/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Demo-S3-Encryption/aws-kms-console-customer-key-details.jpg)

## 4\. Make Your CMK the Bucket Default

To enforce your CMK on all future uploads:

1.  In the S3 console, go to **Bucket properties** → **Default encryption**.
2.  Select **AWS KMS key**, choose **my-key**, and save.

![The image shows an AWS S3 console screen displaying bucket properties, including versioning, encryption settings, and intelligent-tiering archive configurations.](https://kodekloud.com/kk-media/image/upload/v1752869206/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Demo-S3-Encryption/aws-s3-console-bucket-properties.jpg)

3.  Upload a file without specifying encryption; S3 defaults to `my-key`.
4.  **User2** (S3-only) still cannot decrypt:

```
<Error>
  <Code>AccessDenied</Code>
  <Message>
    The cipherText refers to a customer master key that does not exist, does not exist in this region, or you are not allowed to access.
  </Message>
  <RequestId>37V63DWBW8NS8FMT</RequestId>
  <HostId>
    4THW1yNqrLpqxTPMR3ZMBPTiGfQlf19eYGDKu1g1u3F1qPClUs22s1UxYtDADWCRDB=
  </HostId>
</Error>
```

![The image shows an Amazon S3 console interface displaying details of an object named "beach-default.jpg," including its properties, S3 URI, and object URL.](https://kodekloud.com/kk-media/image/upload/v1752869207/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Demo-S3-Encryption/amazon-s3-console-beach-default-details.jpg)

---

You’ve now mastered S3 encryption using SSE-S3, AWS-managed CMKs, and customer-managed CMKs for robust, granular access controls.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/amazon-simple-storage-service-amazon-s3/module/90fd6d76-d0d4-481c-b267-b9247a005a6e/lesson/9f910132-54f6-4c7a-b909-ab4285a75d06)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/amazon-simple-storage-service-amazon-s3/module/90fd6d76-d0d4-481c-b267-b9247a005a6e/lesson/8bd5da2f-df1d-4f76-94f6-c256cd10fae8)**
>
> Practice lab
