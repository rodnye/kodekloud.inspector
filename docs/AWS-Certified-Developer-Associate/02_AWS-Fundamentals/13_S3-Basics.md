# S3 Basics - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/AWS-Fundamentals/S3-Basics)

---

## Table of Contents

- S3 Basics
  - Object-Based Storage
  - Common Use Cases for S3
  - Key S3 Terminology
  - Durability and High Availability
  - S3 Restrictions and Limits
  - Summary
  - Watch Video
    - Real-World Example: Deploying a Website
    - Buckets
    - Objects

---

## Content

AWS Certified Developer - Associate

AWS Fundamentals

# S3 Basics

In this article, we explore the basics of Amazon S3 (Simple Storage Service), an object storage solution renowned for its scalability, data availability, security, and performance. Amazon S3 is designed to store files in the cloud, much like Dropbox or Google Drive, but with the robust integration capabilities available through the AWS ecosystem.

![The image is a graphic representation of the features of Simple Storage Service (S3), highlighting scalability, data availability, security, and performance. Each feature is depicted with an icon and a label.](https://kodekloud.com/kk-media/image/upload/v1752858251/notes-assets/images/AWS-Certified-Developer-Associate-S3-Basics/s3-features-scalability-availability-security-performance.jpg)

Because S3 is part of AWS, it works seamlessly with services like [EC2](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2), [Lambda](https://learn.kodekloud.com/user/courses/aws-lambda), and [IAM](https://learn.kodekloud.com/user/courses/aws-iam). This integration provides you with robust control over who can access, modify, or delete your files.

![The image shows logos of Dropbox and Google Drive above an icon representing Amazon S3, labeled "Simple Storage Service (S3)."](https://kodekloud.com/kk-media/image/upload/v1752858252/notes-assets/images/AWS-Certified-Developer-Associate-S3-Basics/dropbox-google-drive-amazon-s3.jpg)

S3 can be accessed using different methods, including the AWS Management Console, AWS CLI, AWS SDKs, and the REST API.

![The image is an illustration of AWS Simple Storage Service (S3) with icons representing different access methods: AWS Console, AWS CLI, SDK, and Rest API.](https://kodekloud.com/kk-media/image/upload/v1752858253/notes-assets/images/AWS-Certified-Developer-Associate-S3-Basics/aws-s3-access-methods-illustration.jpg)

---

## Object-Based Storage

Amazon S3 is built as an object-based storage system, which differentiates it from traditional file-based storage (like NFS) or block-based storage. Here’s what makes S3 unique:

- Entire objects (or files) are stored as discrete units.
- S3 uses a flat structure instead of a hierarchical file system—even though the AWS Console may display a folder-like view using prefixes (e.g., "music/song1").
- For traditional file or block storage needs, consider other AWS storage options tailored for those use cases.

![The image is a diagram comparing different types of storage: file-based (NFS and EFS), object-based (S3), and block-based (Server and EBS), with checkmarks and crosses indicating suitability.](https://kodekloud.com/kk-media/image/upload/v1752858254/notes-assets/images/AWS-Certified-Developer-Associate-S3-Basics/storage-comparison-file-object-block-diagram.jpg)

---

## Common Use Cases for S3

Amazon S3 is ideal for various storage needs. Common use cases include:

- Storing log files
- Hosting media assets (images, videos, audio)
- Managing artifacts generated from CI/CD pipelines

Its scalability and durability make S3 a reliable choice in many architectures.

![The image illustrates three use cases for S3: storing log files, media (audio, video, images), and CI/CD artifacts.](https://kodekloud.com/kk-media/image/upload/v1752858255/notes-assets/images/AWS-Certified-Developer-Associate-S3-Basics/s3-use-cases-log-media-artifacts.jpg)

### Real-World Example: Deploying a Website

Imagine a website where the web server hosts HTML, CSS, and JavaScript files. For sites with vast media libraries—such as YouTube or Netflix—storing media files on the same server is impractical. Instead, S3 can be used to offload media storage, reducing server load and optimizing performance.

When a user accesses a webpage:

- The web server serves the HTML file.
- The HTML includes URLs pointing to media stored on S3.
- This architecture leverages S3’s strengths while keeping the web server focused on serving dynamic content.

![The image illustrates two S3 use cases, showing data flow between a user, a server, and an S3 bucket for storing and retrieving video and HTML files.](https://kodekloud.com/kk-media/image/upload/v1752858256/notes-assets/images/AWS-Certified-Developer-Associate-S3-Basics/s3-use-cases-data-flow-diagram.jpg)

---

## Key S3 Terminology

### Buckets

Buckets in S3 are containers for your objects (files). Key points about buckets:

- They function similarly to folders.
- You can create multiple buckets within an AWS account, often organized by application, environment, or purpose (e.g., separate buckets for logs and media).
- Bucket names must be globally unique since they are incorporated into public URLs.

### Objects

Objects refer to the individual files stored within buckets. Each object comprises:

- A key: the name assigned to the file.
- A value: the actual content of the file.
- Additional metadata: for example, version IDs and descriptive details when versioning is enabled.

![The image explains the concept of objects in S3, showing PDF and MP3 files as examples, and describes an object's components: key, value, and metadata.](https://kodekloud.com/kk-media/image/upload/v1752858257/notes-assets/images/AWS-Certified-Developer-Associate-S3-Basics/s3-objects-pdf-mp3-components.jpg)

Although the AWS Console may display a folder-like structure (e.g., "music"), remember that S3 operates on a flat file system. The appearance of directories is achieved by using prefixes in the object keys (e.g., "music/song1", "music/song2").

![The image illustrates the flat file structure of S3 buckets, showing files listed without hierarchy and a conceptual representation of folders with paths like "music/song1".](https://kodekloud.com/kk-media/image/upload/v1752858258/notes-assets/images/AWS-Certified-Developer-Associate-S3-Basics/s3-bucket-flat-file-structure.jpg)

---

## Durability and High Availability

Amazon S3 ensures your files are secure and available through a series of redundant processes:

- Files are automatically replicated across multiple servers and Availability Zones.
- This replication prevents data loss, even in the event of hardware or zone failures.

![The image illustrates an AWS Cloud setup with three availability zones, each containing two instances represented by chip icons and PNG files, and a central storage bucket.](https://kodekloud.com/kk-media/image/upload/v1752858259/notes-assets/images/AWS-Certified-Developer-Associate-S3-Basics/aws-cloud-setup-availability-zones.jpg)

---

## S3 Restrictions and Limits

While S3 is highly scalable, it comes with a few notable limits:

- Objects: Unlimited number of objects can be stored in S3.
- Object Size: Each individual object can be up to 5 terabytes.
- Buckets: By default, an AWS account can have up to 100 buckets. This limit can be increased to 1,000 by submitting a service limit increase request.

![The image outlines AWS S3 restrictions, including unlimited objects, a 5 TB maximum file size, and a default limit of 100 buckets per account, which can be increased to 1,000.](https://kodekloud.com/kk-media/image/upload/v1752858260/notes-assets/images/AWS-Certified-Developer-Associate-S3-Basics/aws-s3-restrictions-overview.jpg)

---

## Summary

Amazon S3 is a powerful object storage service that offers:

- High scalability, ensuring your storage grows with your needs.
- Durable and secure storage options for media files, logs, CI/CD artifacts, and static website assets.
- A flat file structure with buckets serving as containers, where each object's uniqueness is determined by its key.

> [!important]
> **Key Takeaways**
>
> - S3 uses a flat file structure; it does not support traditional directory hierarchies.
> - Buckets must have globally unique names.
> - Objects in S3 may include metadata along with their key and value.
> - S3 allows unlimited object storage with each file sized up to 5 TB, and the default bucket limit of 100 can be increased.

![The image is a summary slide about Amazon's object storage service, highlighting its scalability, use cases, flat file structure, and object key-value concept. It includes four numbered points with brief descriptions.](https://kodekloud.com/kk-media/image/upload/v1752858261/notes-assets/images/AWS-Certified-Developer-Associate-S3-Basics/amazon-s3-object-storage-summary.jpg)

![The image is a summary slide about AWS S3, highlighting that buckets are containers for objects, bucket names must be globally unique, and S3 can handle unlimited objects.](https://kodekloud.com/kk-media/image/upload/v1752858263/notes-assets/images/AWS-Certified-Developer-Associate-S3-Basics/aws-s3-buckets-summary-slide.jpg)

Additionally, S3 supports multi-part uploads, allowing you to partition large files into smaller segments for a more efficient upload process.

This concludes our comprehensive overview of Amazon S3. With its emphasis on simplicity, scalability, and security, S3 is a critical component for many AWS-driven solutions.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/6d3acaeb-020a-4e1e-9bd0-5fc6c50eb164/lesson/d0199b56-3a49-42cc-8ddc-950418dd6d18)**
>
> Watch video content
