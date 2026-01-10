# Exam Tips - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Storage/Exam-Tips)

---

## Table of Contents

- Exam Tips
  - Elastic Block Store (EBS)
  - Elastic File System (EFS)
  - Simple Storage Service (S3)
  - Watch Video
    - S3 Storage Classes and Versioning
    - S3 Bucket Policies and Encryption
    - Pre-signed URLs in S3
    - S3 Access Points
      - Versioning in S3
      - S3 Encryption Options

---

## Content

AWS Certified Developer - Associate

Storage

# Exam Tips

Prepare for your exam by reviewing these essential AWS storage services and their key characteristics.

## Elastic Block Store (EBS)

EBS (Elastic Block Store) provides block storage by dividing data into blocks, each with a unique identifier. The operating system views these blocks as a single volume. Importantly, you can both boot and mount from block storage. This capability makes EBS unique as the only storage option that can be used to boot an operating system.

EBS volumes are created within a single Availability Zone (AZ). To transfer data to another AZ, you must generate an EBS snapshot and then create a new volume from that snapshot in the target AZ. Familiarize yourself with the various EBS volume types—general purpose, provisioned IOPS, and magnetic (HDD)—to choose the optimal option based on your performance and cost requirements. Billing is based on the number of gigabytes provisioned each month.

![The image provides exam tips for EBS, explaining block storage, volume provisioning, and data copying across availability zones. It also mentions different EBS volume types for various storage needs.](https://kodekloud.com/kk-media/image/upload/v1752859658/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/ebs-exam-tips-storage-volumes.jpg)

In contrast, the instance store is intended solely for temporary data. Since the instance store is tied to the physical host, data stored there is lost if the EC2 instance migrates to a different host. Use the instance store only for ephemeral or scratch data.

![The image provides exam tips about instance stores, advising that they should only be used for temporary data and noting that data will be lost if an EC2 instance is moved to another host.](https://kodekloud.com/kk-media/image/upload/v1752859659/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/instance-stores-exam-tips.jpg)

## Elastic File System (EFS)

Amazon EFS is a fully managed file system service that supports the NFSv4 protocol. This means applications using NFSv4 can integrate seamlessly without modifications. Note that EFS is supported only on Linux-based EC2 instances. One of its key advantages is the ability to mount the same file system across multiple EC2 instances, providing shared access to data.

When setting up an EFS file system, you must provision mount targets. Each mount target is assigned an IP address from the subnet in which it is deployed, enabling EC2 instances to connect to the file system.

EFS offers two main storage classes—Standard and One Zone—and supports two performance modes: general purpose and elastic throughput. Unlike EBS, EFS volumes are designed solely for mounting and cannot be used to boot an operating system.

![The image provides exam tips about Amazon EFS, highlighting its compatibility with NFSv4, Linux-based EC2 instances, and its ability to be mounted on multiple instances.](https://kodekloud.com/kk-media/image/upload/v1752859660/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/amazon-efs-exam-tips-nfs-linux.jpg)

![The image provides exam tips for EFS, highlighting its two storage classes, two modes, and noting that it can be mounted but not booted.](https://kodekloud.com/kk-media/image/upload/v1752859661/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/efs-exam-tips-storage-classes.jpg)

## Simple Storage Service (S3)

Amazon S3 is a scalable object storage service recognized for its high availability, robust security, and excellent performance. It is ideal for use cases such as hosting static websites, storing media files, or maintaining logs. S3 organizes data as a flat structure instead of a directory hierarchy. Keep in mind that S3 objects cannot be booted or mounted like traditional operating system volumes.

An S3 object comprises two parts:

- The key: a unique identifier for the file.
- The value: the content of the file.

Within S3, you organize your objects into buckets. Each bucket acts as a container for objects. Although you can create multiple buckets for various purposes, bucket names must be globally unique across all AWS accounts. For instance, if you create a bucket named “example,” no other AWS user can create a bucket with the same name. S3 supports an unlimited number of objects, with individual objects allowed up to five terabytes. Additionally, multi-part upload facilitates the efficient upload of large objects by breaking them into smaller segments.

![The image provides exam tips for Amazon S3, highlighting its scalability, use cases, and flat file structure.](https://kodekloud.com/kk-media/image/upload/v1752859662/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/amazon-s3-exam-tips-scalability.jpg)

### S3 Storage Classes and Versioning

S3 offers a variety of storage classes that cater to different access patterns, resiliency, and cost requirements. When uploading an object, set its storage class by including the x-amz-storage-class header. Moreover, you can later modify an object's storage class as needed.

#### Versioning in S3

Versioning allows you to preserve, retrieve, and restore every version of an object in an S3 bucket. With versioning enabled, each update to an object creates a new version, helping you recover older versions if needed. Note that versioning is disabled by default and must be activated at the bucket level—not per object.

Buckets can have three versioning states:

- Unversioned: Versioning is not enabled.
- Versioning enabled: New versions of objects are created upon updates.
- Versioning suspended: Existing versions are maintained, but new updates will not produce additional versions.

> [!important]
> **Note**
>
> Once enabled, versioning cannot be completely turned off; it can only be suspended. Keep in mind that charges apply for every object version, so multiple versions of large files can lead to increased costs.

![The image provides exam tips on S3 versioning, explaining its purpose, default settings, and the three versioning states for buckets.](https://kodekloud.com/kk-media/image/upload/v1752859663/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/s3-versioning-exam-tips.jpg)

![The image provides exam tips on S3 versioning, highlighting key points about enabling, suspending, and securing versioning, as well as associated costs.](https://kodekloud.com/kk-media/image/upload/v1752859664/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/s3-versioning-exam-tips-2.jpg)

Multi-factor authentication (MFA) can also be enabled to protect the versioning state of a bucket.

![The image provides exam tips on S3 encryption methods, including server-side encryption with Amazon S3-managed keys, customer-provided keys, and AWS Key Management Service keys.](https://kodekloud.com/kk-media/image/upload/v1752859666/notes-assetshttps://kodekloud.com/kk-media/image/upload/v1752859666/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/s3-encryption-methods-exam-tips.jpg)

### S3 Bucket Policies and Encryption

Bucket policies in S3 allow you to define who can access specific buckets and what operations are permitted. These policies contain key parameters:

- Principal: Specifies who the policy applies to.
- Resource: Defines the bucket and its objects.
- Effect: Indicates whether the action is allowed or denied.
- Action: Lists the permissible or prohibited operations.

Bucket policies complement IAM policies and are excellent for managing access for public users, non-IAM users, or users from other AWS accounts. Although legacy access control lists (ACLs) exist, bucket policies are the recommended approach.

Additionally, S3 supports static website hosting, which is perfect for delivering static content such as HTML, CSS, and JavaScript. When using S3 for website hosting, note that costs apply based on both data storage and HTTP requests. Custom domain hosting requires the bucket name to exactly match the domain name (e.g., a bucket named example.com for the domain example.com).

Files in S3 are encrypted on a per-object basis, and you can choose different encryption methods:

#### S3 Encryption Options

1.  **Server-Side Encryption with Amazon S3-Managed Keys (SSE-S3):**  
    AWS manages the encryption keys automatically. You do not have access to these keys or the ability to modify any settings.
2.  **Server-Side Encryption with Customer-Provided Keys (SSE-C):**  
    You generate and manage your own encryption keys. These keys must be provided during the upload process for S3 to encrypt your objects.
3.  **Server-Side Encryption with AWS Key Management Service Keys (SSE-KMS):**  
    Manage and create your own keys using AWS KMS. S3 integrates with KMS so you can establish custom access policies for encryption and decryption.

![The image provides exam tips on S3 encryption methods, including server-side encryption with Amazon S3-managed keys, customer-provided keys, and AWS Key Management Service keys.](https://kodekloud.com/kk-media/image/upload/v1752859666/notes-assetshttps://kodekloud.com/kk-media/image/upload/v1752859666/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/s3-encryption-methods-exam-tips.jpg)

### Pre-signed URLs in S3

Pre-signed URLs offer temporary access to S3 objects without requiring AWS credentials. When you generate a pre-signed URL, it carries the access permissions of its creator. Consequently, anyone using the URL will have the same access rights as the original user. If the creator does not have permissions on the target object, the URL will not function for others.

![The image provides exam tips about AWS S3 pre-signed URLs, explaining their function, how they work with AWS API, and access limitations based on the creator's permissions.](https://kodekloud.com/kk-media/image/upload/v1752859667/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/aws-s3-pre-signed-urls-tips.jpg)

### S3 Access Points

Access points simplify S3 bucket permission management by allowing each group or user to have a dedicated endpoint with its own unique ARN. Instead of accessing the bucket through its main URL, users connect via these access point URLs. This enables granular policy management and the possibility to restrict access to specific VPCs.

> [!important]
> **Note**
>
> Understanding access points is essential for managing complex S3 environments, especially when different teams or applications require distinct access policies.

By keeping these points in mind, you'll be well-prepared to answer exam questions regarding EBS, EFS, and S3.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/e8ae2293-e16b-42d3-b32b-5c260a1f1e5d/lesson/19985183-699f-4ac7-ab14-909062ce7699)**
>
> Watch video content
