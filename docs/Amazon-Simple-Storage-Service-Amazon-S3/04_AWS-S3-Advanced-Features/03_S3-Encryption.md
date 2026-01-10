# S3 Encryption - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Amazon-Simple-Storage-Service-Amazon-S3/AWS-S3-Advanced-Features/S3-Encryption)

---

## Table of Contents

- S3 Encryption
  - What Is Encryption?
  - Client-Side vs. Server-Side Encryption
  - Per-Object Encryption and Bucket Defaults
  - SSE-S3 (Server-Side Encryption with Amazon S3-Managed Keys)
  - SSE-KMS (Server-Side Encryption with AWS KMS Keys)
  - SSE-C (Server-Side Encryption with Customer-Provided Keys)
  - Encryption Headers and Comparison Summary
  - Links and References
  - Watch Video

---

## Content

Amazon Simple Storage Service (Amazon S3)

AWS S3 Advanced Features

# S3 Encryption

In this lesson we’ll explore how Amazon S3 encrypts your data. We’ll cover:

1.  What is Encryption in S3?
2.  Client-Side vs. Server-Side Encryption
3.  Server-Side Encryption Methods (SSE-S3, SSE-KMS, SSE-C)
4.  Per-Object Encryption and Bucket Defaults
5.  Practical Code Examples for Each SSE Method

---

## What Is Encryption?

Encryption transforms readable data (plaintext) into unreadable ciphertext using cryptographic keys. Only holders of the correct key can decrypt the data. In Amazon S3, encryption happens at two layers:

- **In transit**: Secured by SSL/TLS between your client and S3.
- **At rest**: Data stored on AWS servers is encrypted on disk.

![The image illustrates two types of encryption: "In Transit" using SSL/TLS and "Encryption at Rest" related to S3, with icons representing a user, a storage bucket, and a server.](https://kodekloud.com/kk-media/image/upload/v1752869224/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-S3-Encryption/encryption-in-transit-at-rest-diagram.jpg)

- **In transit**: Automatic over HTTPS (SSL/TLS).
- **At rest**: Must be enabled so S3 stores your objects encrypted on disk.

---

## Client-Side vs. Server-Side Encryption

- **Client-Side Encryption**: You generate, manage, and store keys. You encrypt data locally, then upload only ciphertext to S3.
- **Server-Side Encryption**: You send plaintext over HTTPS; AWS encrypts it at rest using the method you choose.

![The image illustrates the differences between client-side and server-side encryption, showing data flow from a user to a server with encryption occurring either before or after data reaches the server.](https://kodekloud.com/kk-media/image/upload/v1752869226/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-S3-Encryption/client-server-encryption-data-flow-diagram.jpg)

S3 supports three server-side methods:

![The image lists three server-side encryption methods: Amazon S3-Managed Keys (SSE-S3), Customer-Provided Keys (SSE-C), and Key Management Service Keys (SSE-KMS).](https://kodekloud.com/kk-media/image/upload/v1752869227/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-S3-Encryption/server-side-encryption-methods-sse-s3-sse-c-sse-kms.jpg)

---

## Per-Object Encryption and Bucket Defaults

- Encryption is configured **per object**.
- You can set a **default encryption** on the bucket so that any upload without explicit encryption uses the bucket’s setting.
- You can still override the default on a per-object basis.

![The image is a note about encryption, explaining that it occurs on a per-object basis and a default encryption method can be configured on a bucket.](https://kodekloud.com/kk-media/image/upload/v1752869228/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-S3-Encryption/encryption-per-object-bucket-configure.jpg)

> [!important]
> **Note**
>
> When you enable default encryption on a bucket, uploads without specified encryption inherit the bucket’s default settings.

---

## SSE-S3 (Server-Side Encryption with Amazon S3-Managed Keys)

With SSE-S3, AWS handles all key management using AES-256:

- Key generation & management: AWS
- Encryption algorithm: AES-256
- Responsibilities: AWS S3

**Encryption Flow**

1.  AWS maintains a master root key (opaque to you).
2.  For each object, S3 generates a unique data key.
3.  The object is encrypted with the data key (AES-256).
4.  The data key is encrypted with the root key.
5.  Both encrypted object and encrypted data key are stored.

![The image illustrates SSE-S3 encryption in AWS, showing the use of a root key and AES-256 algorithm for encrypting objects uniquely per item in a storage bucket.](https://kodekloud.com/kk-media/image/upload/v1752869229/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-S3-Encryption/sse-s3-encryption-aws-aes256.jpg)

**Decryption Flow**

1.  S3 decrypts the data key using the root key.
2.  S3 decrypts your object with the data key.
3.  Plaintext is returned to you.

![The image illustrates the process of SSE-S3 decryption in AWS, showing a flow from a user to an S3 bucket and then to a server, with a focus on the use of a root key for decryption.](https://kodekloud.com/kk-media/image/upload/v1752869230/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-S3-Encryption/sse-s3-decryption-aws-flow-diagram.jpg)

**AWS CLI Example**

```
aws s3 cp file.txt s3://my-bucket/ --sse AES256
```

---

## SSE-KMS (Server-Side Encryption with AWS KMS Keys)

SSE-KMS integrates AWS Key Management Service for advanced control:

- Key management: AWS KMS
- Encryption/decryption: AWS KMS invoked by S3
- Features: Key policies, automatic rotation, CMK metadata

The flow is similar to SSE-S3 but uses a KMS Customer Master Key (CMK):

![The image illustrates the SSE-KMS process in AWS, showing a user interacting with an S3 bucket and a server, with a KMS key used for encryption.](https://kodekloud.com/kk-media/image/upload/v1752869231/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-S3-Encryption/sse-kms-aws-s3-encryption-diagram.jpg)

**AWS CLI Examples**

```
# Use default AWS managed KMS key
aws s3 cp file.txt s3://my-bucket/ --sse aws:kms


# Specify a custom CMK
aws s3 cp file.txt s3://my-bucket/ \
  --sse aws:kms \
  --sse-kms-key-id alias/my-kms-key
```

**Boto3 Example**

```
import boto3


s3 = boto3.client('s3')


# Default KMS key
s3.put_object(
    Bucket='my-bucket',
    Key='file.txt',
    Body=b'Data',
    ServerSideEncryption='aws:kms'
)


# Custom CMK
s3.put_object(
    Bucket='my-bucket',
    Key='file2.txt',
    Body=b'More data',
    ServerSideEncryption='aws:kms',
    SSEKMSKeyId='arn:aws:kms:us-west-2:123456789012:key/abcd-efgh'
)
```

---

## SSE-C (Server-Side Encryption with Customer-Provided Keys)

With SSE-C, you provide the encryption key on each request:

- Key management: Client
- Encryption/decryption: S3
- S3 stores only the MD5 hash of your key for verification

![The image illustrates a diagram of server-side encryption with customer-provided keys (SSE-C) in AWS Cloud, showing a user, a bucket, and encrypted data flow.](https://kodekloud.com/kk-media/image/upload/v1752869232/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-S3-Encryption/sse-c-aws-encryption-diagram.jpg)

Include these headers (or equivalent CLI/SDK options):

- `x-amz-server-side-encryption-customer-algorithm: AES256`
- `x-amz-server-side-encryption-customer-key: <Base64-encoded key>`
- `x-amz-server-side-encryption-customer-key-MD5: <Base64-encoded MD5 of key>`

> [!important]
> **Warning**
>
> AWS does not store your customer-provided key. If you lose the key, your data cannot be decrypted.

**AWS CLI Example**

```
aws s3 cp file.txt s3://my-bucket/ \
  --sse-c AES256 \
  --sse-c-key fileb://key.bin \
  --sse-c-copy-source-key fileb://key.bin
```

**Boto3 Example**

```
import hashlib
import boto3


# Read or generate a 256-bit key
with open('key.bin', 'rb') as f:
    key = f.read()
md5 = hashlib.md5(key).digest()


s3 = boto3.client('s3')
s3.put_object(
    Bucket='my-bucket',
    Key='file.txt',
    Body=b'Sensitive data',
    SSECustomerAlgorithm='AES256',
    SSECustomerKey=key,
    SSECustomerKeyMD5=md5
)
```

---

## Encryption Headers and Comparison Summary

Below is a quick reference of S3 server-side encryption headers:

![The image shows a table listing Amazon S3 server-side encryption headers, including their names and descriptions, detailing how to specify encryption algorithms and keys.](https://kodekloud.com/kk-media/image/upload/v1752869233/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-S3-Encryption/amazon-s3-server-side-encryption-headers.jpg)

| Encryption Method | Key Management | Encryption/Decryption |
| ----------------- | -------------- | --------------------- |
| Client-Side       | Client         | Client                |
| SSE-C             | Client         | S3                    |
| SSE-S3            | AWS S3         | AWS S3                |
| SSE-KMS           | AWS KMS        | AWS S3 / AWS KMS      |

![The image is a summary table comparing different encryption methods (Client Side, SSE-C, SSE-S3, SSE-KMS) in terms of key generation and encryption/decryption responsibilities.](https://kodekloud.com/kk-media/image/upload/v1752869234/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-S3-Encryption/encryption-methods-comparison-table.jpg)

Choose the encryption approach that balances control, security, and operational overhead for your use case.

---

## Links and References

- [Amazon S3 Encryption Overview](https://docs.aws.amazon.com/AmazonS3/latest/dev/sse.html)
- [AWS KMS Developer Guide](https://docs.aws.amazon.com/kms/latest/developerguide/)
- [AWS CLI S3 Command Reference](https://docs.aws.amazon.com/cli/latest/reference/s3/index.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/amazon-simple-storage-service-amazon-s3/module/90fd6d76-d0d4-481c-b267-b9247a005a6e/lesson/eef86cb6-c62a-4a7a-bbff-5b24c3e63ff0)**
>
> Watch video content
