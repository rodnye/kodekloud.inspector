# S3 Encryption Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Storage/S3-Encryption-Demo)

---

## Table of Contents

- S3 Encryption Demo
  - Creating the Bucket and Reviewing Default Encryption
  - Uploading an Object with SSE-S3 Encryption
  - Uploading an Object with KMS Encryption
  - Introducing Customer Managed Keys for Role Separation
  - Setting a Default Customer Managed Key for the Bucket
  - Conclusion
  - Watch Video
  - Practice Lab

---

## Content

AWS Certified Developer - Associate

Storage

# S3 Encryption Demo

In this lesson, we explore how to secure your data in Amazon S3 by configuring encryption settings. You'll learn how to create an S3 bucket, set up default encryption, and upload objects using different encryption options such as SSE-S3 and AWS KMS.

---

## Creating the Bucket and Reviewing Default Encryption

Begin by navigating to the S3 console and creating a new bucket with the default settings. Once the bucket is successfully created, go to its **Properties** and scroll down to the **Encryption** settings. By default, Amazon S3 applies SSE-S3 encryption, meaning that any object uploaded without specifying an encryption type will automatically use SSE-S3.

![The image shows an Amazon S3 management console screen with settings for bucket versioning, multi-factor authentication, tags, default encryption, and intelligent-tiering archive configurations.](https://kodekloud.com/kk-media/image/upload/v1752859734/notes-assets/images/AWS-Certified-Developer-Associate-S3-Encryption-Demo/amazon-s3-management-console-settings.jpg)

> [!important]
> **Default Encryption**
>
> If needed, you can change the default encryption to AWS KMS. However, in this demo, we will retain SSE-S3 by default and later demonstrate how to override these settings during object uploads.

---

## Uploading an Object with SSE-S3 Encryption

To demonstrate the encryption process with SSE-S3, switch to the **Objects** tab and upload a file. During the upload process, you have the option to select your preferred encryption type. Even if you leave it unspecific, the bucket-level default of SSE-S3 is applied automatically. For clarity in this demo, we explicitly choose SSE-S3.

![The image shows an AWS S3 Management Console screen where a file named "bird-SSE-S3.jpg" is being prepared for upload to a bucket named "kk-encryption-demo." The file is 112.4 KB in size.](https://kodekloud.com/kk-media/image/upload/v1752859735/notes-assets/images/AWS-Certified-Developer-Associate-S3-Encryption-Demo/aws-s3-upload-bird-sse.jpg)

After the upload, verify the encryption by checking the object's details in the S3 console:

![The image shows an Amazon S3 management console displaying details of an object named "bird-SSE-S3.jpg," including its properties, S3 URL, and object management overview.](https://kodekloud.com/kk-media/image/upload/v1752859736/notes-assets/images/AWS-Certified-Developer-Associate-S3-Encryption-Demo/amazon-s3-object-management-bird.jpg)

Even secondary users with proper S3 permissions can access and decrypt objects encrypted using SSE-S3.

---

## Uploading an Object with KMS Encryption

Now, let’s switch to AWS KMS encryption. Log in as an admin user and upload another file, this time overriding the bucket’s default encryption settings. In the file’s **Properties**, select KMS encryption. You will notice that a default AWS managed KMS key for S3 is available, which is created automatically if it doesn’t exist.

![The image shows a screenshot of the AWS Management Console, specifically the section for configuring server-side encryption settings for an S3 bucket. It includes options for specifying encryption keys and using AWS Key Management Service (KMS).](https://kodekloud.com/kk-media/image/upload/v1752859737/notes-assets/images/AWS-Certified-Developer-Associate-S3-Encryption-Demo/aws-s3-server-side-encryption-settings.jpg)

AWS managed keys are controlled entirely by AWS; you cannot modify their policies or enable key rotation. You can confirm this behavior by visiting the KMS console:

![The image shows the AWS Key Management Service (KMS) webpage, detailing how to create and manage encryption keys within AWS. It includes sections on getting started, pricing, and how the service works.](https://kodekloud.com/kk-media/image/upload/v1752859739/notes-assets/images/AWS-Certified-Developer-Associate-S3-Encryption-Demo/aws-kms-encryption-keys-guide.jpg)

After uploading the file, verify in its details that it uses the AWS managed KMS key for encryption:

![The image shows an AWS S3 Management Console screen indicating a successful upload of a file named "bird-KMS-default-key.jpg" with a size of 108.8 KB. The upload status is marked as succeeded.](https://kodekloud.com/kk-media/image/upload/v1752859740/notes-assets/images/AWS-Certified-Developer-Associate-S3-Encryption-Demo/aws-s3-upload-success-bird-key.jpg)

In the KMS console, your AWS managed keys will appear in a list similar to the following:

![The image shows the AWS Key Management Service (KMS) console, displaying a list of AWS managed keys with their aliases, key IDs, and status. Two keys are listed, both with the status "Enabled."](https://kodekloud.com/kk-media/image/upload/v1752859741/notes-assets/images/AWS-Certified-Developer-Associate-S3-Encryption-Demo/aws-kms-console-managed-keys.jpg)

Below is a sample policy for AWS managed keys. You can view this policy, but modifications are not permitted:

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

As an admin user, you'll be able to open and decrypt objects encrypted with the default AWS managed key. Secondary users with only S3 access, however, can also decrypt the files if the AWS managed KMS key is used.

![The image shows an Amazon S3 console with a bucket named "kk-encryption-demo" containing two JPEG files. The files are listed with details such as name, type, last modified date, size, and storage class.](https://kodekloud.com/kk-media/image/upload/v1752859742/notes-assets/images/AWS-Certified-Developer-Associate-S3-Encryption-Demo/amazon-s3-bucket-kk-encryption-demo.jpg)

---

## Introducing Customer Managed Keys for Role Separation

While AWS managed keys offer simplicity, they do not facilitate role separation. In situations where you want users to have S3 access without decryption capabilities, customer managed keys in KMS are the ideal solution. Customer managed keys allow you to define custom key policies and enable key rotation for enhanced security.

To create a customer managed key, follow these steps:

1.  Open the KMS console.
2.  Click on **Create key**.
3.  Choose the symmetric key type (default option).
4.  Accept the default settings or adjust advanced options as needed.
5.  Provide a unique alias for the key (e.g., "my-key").

![The image shows an AWS KMS (Key Management Service) console screen where a user is configuring a key. Options for selecting key type (symmetric or asymmetric) and key usage (encrypt and decrypt or generate and verify MAC) are displayed.](https://kodekloud.com/kk-media/image/upload/v1752859743/notes-assets/images/AWS-Certified-Developer-Associate-S3-Encryption-Demo/aws-kms-key-configuration-console.jpg)

Next, configure the key administrative and usage permissions to control who can manage and use the key for cryptographic functions. Below is an example of a key policy for a customer managed key:

```
{
    "Id": "key-consolepolicy-3",
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "Enable IAM User Permissions",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::841860927337:root"
            },
            "Action": "kms:*",
            "Resource": "*"
        }
    ]
}
```

![The image shows an AWS KMS console screen where key administrative permissions are being defined, listing various users and roles with their paths and types.](https://kodekloud.com/kk-media/image/upload/v1752859745/notes-assets/images/AWS-Certified-Developer-Associate-S3-Encryption-Demo/aws-kms-console-key-permissions.jpg)

After creating your customer managed key, return to your S3 bucket to upload another file. This time, override the bucket's default encryption by selecting SSE-KMS and choosing your customer managed key.

As an admin user with both S3 and KMS access, you can decrypt the file once uploaded:

![The image shows an AWS S3 console displaying details of an object named "brid-KMS-Custom-key.jpg," including its properties, S3 URI, and object URL. The console also indicates that bucket versioning is disabled.](https://kodekloud.com/kk-media/image/upload/v1752859746/notes-assets/images/AWS-Certified-Developer-Associate-S3-Encryption-Demo/aws-s3-console-brid-kms-key.jpg)

However, if a secondary user with only S3 permissions tries to decrypt the file, they will encounter an error. While they can access the file metadata or delete the file, decryption fails with an error message similar to:

```
<Error>
  <Code>AccessDenied</Code>
  <Message>The ciphertext refers to a customer master key that does not exist, does not exist in this region, or you are not allowed to access.</Message>
  <RequestId>45V16V31G01JFASB</RequestId>
  <HostId>
    kW0M7+PFX6X0wxcmlK7pXmxFkeBHM2zYJWFgU8iBKgPqHyb6YBUOzViWIrk8bDtk=
  </HostId>
</Error>
```

![The image shows an Amazon S3 console with a bucket named "kk-encryption-demo" containing three JPG files. The files are listed with details such as name, type, last modified date, size, and storage class.](https://kodekloud.com/kk-media/image/upload/v1752859747/notes-assets/images/AWS-Certified-Developer-Associate-S3-Encryption-Demo/amazon-s3-bucket-kk-encryption-demo-2.jpg)

This separation of roles is essential in environments where users only require object management privileges without access to sensitive decrypted data. With customer managed keys, you can enforce these policies and enable key rotation for added security.

---

## Setting a Default Customer Managed Key for the Bucket

To further enhance security, you can set your customer managed key as the default encryption for the bucket. Follow these steps:

1.  Open the bucket’s **Properties**.
2.  Scroll to the **Default encryption** section.
3.  Select AWS KMS and choose your customer managed key.
4.  Save the changes.

With this configuration, any file uploaded without explicit encryption settings will use your customer managed key by default. Only users with both S3 access and the corresponding KMS permissions will be able to decrypt these files.

![The image shows an AWS S3 console screen for editing default encryption settings. It includes options for selecting encryption key types and enabling or disabling a bucket key.](https://kodekloud.com/kk-media/image/upload/v1752859748/notes-assets/images/AWS-Certified-Developer-Associate-S3-Encryption-Demo/aws-s3-default-encryption-settings.jpg)

After setting the default encryption, upload a test file and verify the encryption settings:

![The image shows an AWS S3 console screen with settings for object lock, storage class, server-side encryption, and additional checksums. The server-side encryption is enabled using an AWS Key Management Service key.](https://kodekloud.com/kk-media/image/upload/v1752859749/notes-assets/images/AWS-Certified-Developer-Associate-S3-Encryption-Demo/aws-s3-console-object-lock-settings.jpg)

---

## Conclusion

In this lesson, we demonstrated how to configure default encryption on an S3 bucket, override these settings during file uploads, and implement role separation using AWS KMS and customer managed keys. Leveraging AWS KMS for key management provides enhanced control over encryption policies and supports key rotation, which is vital for meeting stringent regulatory and security requirements.

Happy encrypting, and see you in the next lesson!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/e8ae2293-e16b-42d3-b32b-5c260a1f1e5d/lesson/b88efa92-f856-47d9-98a6-5cb02ad12528)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/e8ae2293-e16b-42d3-b32b-5c260a1f1e5d/lesson/827b2fc0-7efb-48e0-af97-ed7af27ec181)**
>
> Practice lab
