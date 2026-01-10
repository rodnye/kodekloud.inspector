# S3 Encryption - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Storage/S3-Encryption)

---

## Table of Contents

- S3 Encryption
  - SSE-S3 (Server-Side Encryption with Amazon S3 Managed Keys)
  - SSE-KMS (Server-Side Encryption with AWS Key Management Service)
  - SSE-C (Server-Side Encryption with Customer-Provided Keys)
  - Watch Video
    - Summary of Responsibilities

---

## Content

AWS Certified Developer - Associate

Storage

# S3 Encryption

In this lesson, we delve into encryption in Amazon S3, with a focus on its critical role in protecting your data. We cover the fundamentals of encryption, its importance, and both the encryption in transit and encryption at rest aspects. Finally, we explain the three server-side encryption methods available in S3.

Encryption scrambles your data so that only authorized parties can reveal its original form. Suppose you store sensitive information like passwords or banking details in a plaintext file; anyone who accesses this file can see the data. By encrypting the file with a cryptographic key, the information becomes indecipherable to unauthorized users. Only those with the appropriate key can decrypt and read the original content.

![The image illustrates the concept of encryption, showing a user encrypting a text file into an encrypted file, which another person cannot understand.](https://kodekloud.com/kk-media/image/upload/v1752859750/notes-assets/images/AWS-Certified-Developer-Associate-S3-Encryption/encryption-user-text-file-diagram.jpg)

> [!important]
> **Encryption Stages**
>
> When working with S3, always consider encryption at two critical stages:
>
> 1.  **Encryption in Transit** – Data is automatically encrypted using SSL/TLS protocols (the same technology behind HTTPS) when uploading or retrieving files from an S3 bucket.
> 2.  **Encryption at Rest** – Once data is stored, S3 encrypts it on AWS-hosted servers to ensure that even if the storage media is compromised, the data remains protected.

![The image illustrates two types of encryption: "In Transit" using SSL/TLS and "Encryption at Rest" related to S3, with icons representing a user, a bucket, and a server.](https://kodekloud.com/kk-media/image/upload/v1752859752/notes-assets/images/AWS-Certified-Developer-Associate-S3-Encryption/encryption-in-transit-at-rest-diagram.jpg)

There are two main approaches for implementing encryption with S3:

• **Client-Side Encryption**  
In this method, you generate the encryption keys and encrypt your files locally before uploading them to S3. Although this approach gives you full control over the encryption process, it also means that you are solely responsible for key management and the encryption/decryption processes.

• **Server-Side Encryption**  
With server-side encryption, you send your unencrypted data to S3—secured by SSL/TLS in transit—and then S3 encrypts your data before storing it. Server-side encryption comes in three distinct methods:

– **SSE-S3 (Server-Side Encryption with Amazon S3 Managed Keys)**  
   AWS manages both the encryption keys and the entire encryption/decryption process. Each object is encrypted with a unique key, which is itself encrypted using a root key managed by AWS.

– **SSE-C (Server-Side Encryption with Customer-Provided Keys)**  
   You provide your own key during the upload process. While S3 handles the actual encryption and decryption, you must manage the key and supply it with each request.

– **SSE-KMS (Server-Side Encryption with AWS Key Management Service Keys)**  
   This method gives you enhanced key management control. AWS KMS generates and manages the keys, allowing you to set key policies and monitor key usage. S3 still handles the encryption and decryption processes.

![The image illustrates the differences between client-side and server-side encryption, showing data flow from a user to a server with encryption occurring either before or after data reaches the server.](https://kodekloud.com/kk-media/image/upload/v1752859752/notes-assets/images/AWS-Certified-Developer-Associate-S3-Encryption/client-server-encryption-differences.jpg)

Encryption in S3 operates on a per-object basis. You can configure a default encryption method at the bucket level, ensuring that objects uploaded without a specified encryption method automatically inherit the default settings. However, you always have the flexibility to override this default by specifying a different encryption method for individual objects.

![The image is a note about encryption, explaining that it occurs on a per-object basis and a default encryption method can be configured on a bucket.](https://kodekloud.com/kk-media/image/upload/v1752859754/notes-assets/images/AWS-Certified-Developer-Associate-S3-Encryption/encryption-per-object-bucket-note.jpg)

Below is a detailed explanation of each server-side encryption method.

## SSE-S3 (Server-Side Encryption with Amazon S3 Managed Keys)

In SSE-S3, AWS handles the complete encryption process:

- When you upload a file, S3 uses a hidden root key to generate a unique encryption key for that particular object.
- The object is encrypted using the AES-256 encryption algorithm.
- The unique encryption key is then itself encrypted with the root key and stored together with the encrypted object.
- When you request the object, S3 decrypts the encryption key using the root key and then decrypts the object.

![The image illustrates SSE-S3 encryption in AWS, showing the use of a root key and AES-256 algorithm for encrypting objects uniquely per item in a storage bucket.](https://kodekloud.com/kk-media/image/upload/v1752859755/notes-assets/images/AWS-Certified-Developer-Associate-S3-Encryption/sse-s3-encryption-aws-aes256.jpg)

This method is perfect if you prefer a hands-off approach, as AWS takes care of both key management and the encryption/decryption processes.

## SSE-KMS (Server-Side Encryption with AWS Key Management Service)

SSE-KMS integrates closely with AWS Key Management Service to provide enhanced control over encryption keys:

- AWS KMS manages key generation and storage, allowing you to define key policies and monitor key usage.
- When you upload a file, a KMS key is used to generate a unique encryption key that encrypts your object similar to SSE-S3.
- S3 manages the encryption and decryption, while the key management is fully handled by KMS.

![The image illustrates the SSE-KMS encryption process in AWS, showing how keys are managed in KMS and used to encrypt data stored in a bucket.](https://kodekloud.com/kk-media/image/upload/v1752859756/notes-assets/images/AWS-Certified-Developer-Associate-S3-Encryption/sse-kms-encryption-aws-diagram.jpg)

## SSE-C (Server-Side Encryption with Customer-Provided Keys)

With SSE-C, you are in control of providing the encryption key for file uploads:

- You generate and securely manage your own encryption key prior to uploading.
- During the upload process, you include headers that specify the encryption algorithm (typically AES-256), your encryption key, and the MD5 digest of the key to verify its integrity.
- S3 uses the provided key to encrypt the object and stores a hash of this key.
- When retrieving the object, you must supply the same encryption key so that S3 can decrypt the file.

![The image is a table describing Amazon S3 encryption headers, including their names and descriptions for specifying encryption algorithms, providing encryption keys, and ensuring message integrity.](https://kodekloud.com/kk-media/image/upload/v1752859757/notes-assets/images/AWS-Certified-Developer-Associate-S3-Encryption/amazon-s3-encryption-headers-table.jpg)

### Summary of Responsibilities

| Encryption Method      | Key Generation & Management                | Encryption/Decryption Responsibility               |
| ---------------------- | ------------------------------------------ | -------------------------------------------------- |
| Client-Side Encryption | User-generated                             | Performed locally by the user                      |
| SSE-C                  | Customer-provided                          | S3 handles the process using provided keys         |
| SSE-S3                 | Managed by AWS                             | S3 performs encryption/decryption automatically    |
| SSE-KMS                | Managed by AWS KMS with user configuration | S3 performs encryption/decryption with KMS support |

The choice of encryption method depends on your requirements for key management and control. For most users seeking ease of use and integration with existing AWS services, SSE-S3 or SSE-KMS is recommended.

This concludes our discussion on Amazon S3 encryption methods. By understanding and implementing the appropriate encryption practices, you can ensure that your data remains secure both during transit and while stored within S3.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/e8ae2293-e16b-42d3-b32b-5c260a1f1e5d/lesson/21c6d082-e3cb-43ee-802e-103d20a5a105)**
>
> Watch video content
