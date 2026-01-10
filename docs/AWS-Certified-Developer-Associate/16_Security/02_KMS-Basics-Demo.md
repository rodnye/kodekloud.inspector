# KMS Basics Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Security/KMS-Basics-Demo)

---

## Table of Contents

- KMS Basics Demo
  - Exploring the KMS Console
  - Creating a Customer Managed Key
  - Encrypting and Decrypting Data Using AWS CLI
  - Conclusion
  - Watch Video
    - AWS Managed Keys
    - Key Rotation
    - Encrypting Data
    - Decrypting Data
    - Summary of Commands

---

## Content

AWS Certified Developer - Associate

Security

# KMS Basics Demo

In this article, we demonstrate how to effectively work with AWS Key Management Service (KMS). You'll learn about the different types of keys available, how to create and manage a customer-managed key, and how to securely encrypt and decrypt data using the AWS CLI.

## Exploring the KMS Console

Begin by searching for the KMS service in the AWS Console. Once selected, you'll be directed to the KMS page, which displays several tabs on the left, including:

- **AWS Managed Keys**
- **Customer Managed Keys**

### AWS Managed Keys

If you haven't created any keys yet, the Customer Managed Keys section may be empty. In contrast, the AWS Managed Keys tab displays automatically created keys. For instance, when you use services like Amazon S3 that offer built-in or default encryption, AWS will create and manage keys on your behalf.

![The image shows the AWS Key Management Service (KMS) console, displaying a list of AWS managed keys with their aliases, key IDs, and statuses. All keys listed are enabled.](https://kodekloud.com/kk-media/image/upload/v1752859362/notes-assets/images/AWS-Certified-Developer-Associate-KMS-Basics-Demo/aws-kms-console-managed-keys.jpg)

AWS S3 uses these AWS Managed Keys to encrypt files stored in buckets by default. The key policy determines which entities can perform cryptographic actions (e.g., encrypt, decrypt, re-encrypt, generate data keys, and describe the key). For example, a typical AWS managed key policy may look like this:

```
{
  "Action": [
    "kms:Encrypt",
    "kms:Decrypt",
    "kms:ReEncrypt*",
    "kms:GenerateDataKey*",
    "kms:DescribeKey"
  ],
  "Resource": "*",
  "Condition": {
    "StringEquals": {
      "kms:ViaService": "s3.us-east-1.amazonaws.com",
      "kms:CallerAccount": "841860927337"
    }
  }
}
```

This policy snippet specifies that the S3 service from the given account is permitted to perform these actions.

Another example policy allows access through S3 for all principals in the account:

```
{
  "Sid": "Allow access through S3 for all principals in the account that are authorized to use S3",
  "Effect": "Allow",
  "Principal": {
    "AWS": "*"
  },
  "Action": [
    "kms:Encrypt",
    "kms:Decrypt",
    "kms:ReEncrypt",
    "kms:GenerateDataKey",
    "kms:DescribeKey"
  ],
  "Resource": "*"
}
```

Additionally, AWS KMS uses symmetric keys, which allow both encryption and decryption of data.

![The image shows an AWS Key Management Service (KMS) console page displaying details of a managed key, including its ID, alias, status, and cryptographic configuration.](https://kodekloud.com/kk-media/image/upload/v1752859364/notes-assets/images/AWS-Certified-Developer-Associate-KMS-Basics-Demo/aws-kms-managed-key-details.jpg)

## Creating a Customer Managed Key

Now, we'll create a customer-managed key that gives you full control over key management.

1.  **Start Key Creation:**
    - Click on "Create key" and select whether you want a symmetric or asymmetric key. For this demonstration, choose a symmetric key that supports both encryption and decryption.

![The image shows an AWS KMS (Key Management Service) interface for configuring a key, with options for selecting key type (symmetric or asymmetric) and key usage (encrypt and decrypt or generate and verify MAC).](https://kodekloud.com/kk-media/image/upload/v1752859365/notes-assets/images/AWS-Certified-Developer-Associate-KMS-Basics-Demo/aws-kms-key-configuration-interface.jpg)

2.  **Key Material Origin:**
    - Select the source of key material. Options include AWS KMS-managed key material, imported key material, using an external key store, or CloudHSM. In this demo, allow AWS KMS to manage the key material.

![The image shows an AWS console interface for creating a key, with options for key usage and advanced options like key material origin and regionality.](https://kodekloud.com/kk-media/image/upload/v1752859366/notes-assets/images/AWS-Certified-Developer-Associate-KMS-Basics-Demo/aws-console-key-creation-interface.jpg)

3.  **Regionality:**
    - Choose whether to create a single-region key or a multi-region key. For this demonstration, select a single-region key.

4.  **Naming the Key:**
    - Provide a name for your key (e.g., "demo") and click "Next."

5.  **Defining Key Administrators:**
    - Administrators can manage key configurations and delete the key. By default, your user account is set as an administrator, but you may add others if needed.

![The image shows an AWS console interface for defining key administrative permissions, listing various IAM users and roles that can administer a key. It includes options for configuring key deletion permissions.](https://kodekloud.com/kk-media/image/upload/v1752859367/notes-assets/images/AWS-Certified-Developer-Associate-KMS-Basics-Demo/aws-console-iam-users-roles-permissions.jpg)

6.  **Defining Key Usage Permissions:**
    - Key users are granted permissions for cryptographic operations like encryption and decryption, while administrators manage key settings. Though IAM users with KMS access can use the key by default, you can restrict these permissions to specific users.

![The image shows an AWS KMS console screen where key usage permissions are being defined for various IAM users and roles. It lists users and roles with options to select them for cryptographic operations.](https://kodekloud.com/kk-media/image/upload/v1752859368/notes-assets/images/AWS-Certified-Developer-Associate-KMS-Basics-Demo/aws-kms-key-usage-permissions.jpg)

After reviewing the key policy, you might see a policy similar to the following:

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

This policy grants full permissions to the root user on KMS. If you add additional key administrators (for example, a user named "user"), the policy will include extra statements for those specific administrative actions:

```
{
  "Sid": "Allow access for Key Administrators",
  "Effect": "Allow",
  "Principal": {
    "AWS": "arn:aws:iam::841869092733:user/user"
  },
  "Action": [
    "kms:Create",
    "kms:Describe",
    "kms:Enable",
    "kms:List",
    "kms:Put",
    "kms:Update",
    "kms:Disable",
    "kms:Revoke",
    "kms:Get",
    "kms:Delete",
    "kms:TagResource",
    "kms:UntagResource",
    "kms:ScheduleKeyDeletion",
    "kms:CancelKeyDeletion",
    "kms:RotateKeyOnDemand"
  ]
}
```

Similarly, a key user (e.g., an "external secrets operator" or a dedicated role) might have restricted permissions for regular cryptographic operations:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Allow use of the key",
      "Effect": "Allow",
      "Principal": {
        "AWS": [
          "arn:aws:iam::841868927373:user/external-secrets-operator",
          "arn:aws:iam::841868927373:role/service-role-e418qflc"
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
  ]
}
```

> [!important]
> **Note**
>
> You can always adjust these permissions later in the key policy view based on your security requirements.

Complete the key creation process. Once created, the key's details will appear under Customer Managed Keys. The key policy displays administrator and user permissions, and the cryptographic configuration confirms that the key is symmetric. The key’s alias (such as "demo"), ARN, and status (enabled) are also visible. You also have the option to disable the key or schedule it for deletion if needed.

![The image shows an AWS Key Management Service (KMS) interface displaying details of a customer-managed key, including its ID, alias, status, and cryptographic configuration.](https://kodekloud.com/kk-media/image/upload/v1752859370/notes-assets/images/AWS-Certified-Developer-Associate-KMS-Basics-Demo/aws-kms-customer-managed-key.jpg)

### Key Rotation

AWS KMS supports automatic key rotation. To activate key rotation, click the "Edit" button in the key rotation settings, enable automatic rotation, and set the desired rotation period (in days).

![The image shows an AWS Key Management Service (KMS) interface for editing automatic key rotation settings, with options to enable or disable key rotation and set the rotation period in days.](https://kodekloud.com/kk-media/image/upload/v1752859370/notes-assets/images/AWS-Certified-Developer-Associate-KMS-Basics-Demo/aws-kms-key-rotation-settings.jpg)

## Encrypting and Decrypting Data Using AWS CLI

Now that your customer-managed key is set up, you can use it to encrypt and decrypt data via the AWS CLI. Assume you have a file named "db-credentials" containing your database credentials:

```
db-password: mypassword123
```

### Encrypting Data

To encrypt the contents of the "db-credentials" file, run the following command:

```
aws kms encrypt --key-id alias/demo --plaintext fileb://db-credentials --output text --query CiphertextBlob > encrypted-db-credentials
```

This command uses the key identified by the alias "demo", reads the "db-credentials" file (ensuring binary input with "fileb://"), and outputs a base64 encoded ciphertext blob into "encrypted-db-credentials".

Since the ciphertext is base64 encoded, convert it to pure binary form with this command:

```
cat encrypted-db-credentials | base64 -di > encrypted-db-credentials-decoded
```

You may alternatively specify the key ID instead of the alias if needed.

### Decrypting Data

To decrypt the encrypted data, run:

```
aws kms decrypt --ciphertext-blob fileb://encrypted-db-credentials-decoded --output text --query Plaintext > decrypted-file
```

The decrypted output remains base64 encoded. Decode it to restore the original plaintext:

```
cat decrypted-file | base64 -d > decrypted-and-decoded-file
```

After executing these steps, the file "decrypted-and-decoded-file" will contain the original credentials:

```
db-password: mypassword123
```

> [!important]
> **Note**
>
> When using symmetric keys in AWS KMS, the service automatically detects the proper key during decryption. Hence, specifying the key ID during decryption is not required if it's already linked with the ciphertext.

### Summary of Commands

The following commands summarize the process used in this demonstration:

```
# Encrypt the data
aws kms encrypt --key-id alias/demo --plaintext fileb://db-credentials --output text --query CiphertextBlob > encrypted-db-credentials


# Decode the encrypted file to obtain pure binary data
cat encrypted-db-credentials | base64 -di > encrypted-db-credentials-decoded


# Decrypt the binary data
aws kms decrypt --ciphertext-blob fileb://encrypted-db-credentials-decoded --output text --query Plaintext > decrypted-file


# Decode the decrypted data to retrieve the original text
cat decrypted-file | base64 -d > decrypted-and-decoded-file
```

## Conclusion

In this guide, we've explored how to view AWS managed keys, create a customer-managed key, and utilize the AWS CLI to encrypt and decrypt data. This process ensures that you can securely manage and use cryptographic keys with AWS KMS while maintaining granular control over key administration and usage permissions.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/294fdab3-80dd-4183-aa7e-e5e3ffc9edd8/lesson/53e303d9-104d-4a11-9d3e-25f020eed95c)**
>
> Watch video content
