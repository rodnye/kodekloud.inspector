# What is AWS S3 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Amazon-Simple-Storage-Service-Amazon-S3/AWS-S3-Core-Concepts/What-is-AWS-S3)

---

## Table of Contents

- What is AWS S3
  - Key Features
  - Seamless AWS Integration
  - Object Storage vs. File and Block Storage
  - Common Use Cases
  - Real-World Example: Offloading Media for a Website
  - Key Terminology
  - Durability and Availability
  - Bucket Naming and Global Uniqueness
  - Limits and Restrictions
  - References
  - Watch Video
    - Buckets
    - Objects
    - Flat Namespace and “Folders”

---

## Content

Amazon Simple Storage Service (Amazon S3)

AWS S3 Core Concepts

# What is AWS S3

Amazon S3 (Simple Storage Service) is a fully managed object storage solution offering industry-leading scalability, data availability, security, and performance. Think of it as a highly durable, highly available file store—similar to Dropbox or Google Drive—but deeply integrated into the AWS ecosystem.

## Key Features

![The image explains the features of Amazon S3 (Simple Storage Service), highlighting scalability, data availability, security, and performance.](https://kodekloud.com/kk-media/image/upload/v1752869352/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-What-is-AWS-S3/amazon-s3-features-scalability-security-performance.jpg)

- Virtually unlimited storage capacity
- 99.999999999% (11 9’s) of data durability
- Fine-grained access control with IAM policies and bucket policies
- Multiple interfaces: Console, AWS CLI, AWS SDKs, REST API

## Seamless AWS Integration

Because S3 is an AWS-native service, it integrates seamlessly with services like EC2, Lambda, and IAM. You can manage buckets and objects using:

- AWS Management Console
- AWS CLI
- AWS SDKs (e.g., Boto3 for Python)
- RESTful API calls

![The image compares cloud storage services, showing logos for Dropbox, Google Drive, and an S3 bucket, with the question "What is S3?"](https://kodekloud.com/kk-media/image/upload/v1752869353/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-What-is-AWS-S3/cloud-storage-comparison-dropbox-google-s3.jpg)

![The image is a diagram titled "What Is S3?" showing AWS services, including S3 (represented by a bucket icon), EC2, Lambda, and IAM.](https://kodekloud.com/kk-media/image/upload/v1752869355/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-What-is-AWS-S3/what-is-s3-aws-services-diagram.jpg)

## Object Storage vs. File and Block Storage

S3 is **object-based** storage: you upload whole objects (files) rather than individual blocks. It uses a flat namespace rather than a hierarchical filesystem, so you cannot mount an S3 bucket like an EBS volume or NFS share.

| Storage Type | Description                       | Examples                  |
| ------------ | --------------------------------- | ------------------------- |
| Object       | Stores entire files as objects    | Amazon S3                 |
| File         | Shares directories over a network | NFS, Amazon EFS           |
| Block        | Presents raw block devices to OS  | EBS, direct-attached SSDs |

![The image explains S3 as object-based storage, contrasting it with file-based storage (NFS and EFS) and block-based storage (Server and EBS), indicating EFS and EBS as correct options.](https://kodekloud.com/kk-media/image/upload/v1752869356/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-What-is-AWS-S3/s3-object-storage-vs-file-block.jpg)

## Common Use Cases

- Storing application log files
- Hosting media assets (images, videos, audio)
- Saving CI/CD pipeline artifacts

![The image illustrates three S3 use cases: storing log files, media (audio/video/images), and CI/CD artifacts, with corresponding icons for each category.](https://kodekloud.com/kk-media/image/upload/v1752869356/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-What-is-AWS-S3/s3-use-cases-log-media-artifacts.jpg)

## Real-World Example: Offloading Media for a Website

In traditional web hosting, your server handles HTML, CSS, JavaScript, and all media. As traffic scales—imagine YouTube or Netflix—storing petabytes of video on web servers becomes costly and unscalable.

With S3:

1.  Keep only static assets (HTML/CSS/JS) on your web server
2.  Offload large media files to an S3 bucket
3.  Reference S3 URLs in your HTML so browsers fetch content directly from S3

![The image illustrates an S3 use case, showing a user interacting with a server to access video content, with a comparison to storing content in an S3 bucket.](https://kodekloud.com/kk-media/image/upload/v1752869358/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-What-is-AWS-S3/s3-use-case-user-server-video-content.jpg)

## Key Terminology

### Buckets

A **bucket** is a container for objects—think of it as a top-level folder. Names must be globally unique across all AWS accounts.

```
# Create an S3 bucket in us-east-1
aws s3api create-bucket \
  --bucket my-unique-bucket-name \
  --region us-east-1
```

![The image shows a green bucket icon with shapes on it, equated to a yellow folder icon, suggesting a comparison or analogy between a bucket and a folder.](https://kodekloud.com/kk-media/image/upload/v1752869359/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-What-is-AWS-S3/green-bucket-yellow-folder-comparison.jpg)

### Objects

An **object** is any file stored in S3. Each object includes:

- **Key**: the unique object name (e.g., `photos/vacation.jpg`)
- **Value**: the actual file data
- **Metadata**: custom or system attributes (e.g., `Content-Type`)
- **Version ID**: if versioning is enabled

```
# Upload a file to S3
aws s3 cp ./vacation.jpg s3://my-unique-bucket-name/photos/vacation.jpg
```

![The image explains that objects are files uploaded to S3, consisting of a key (file name), value (file data), and additional metadata. It uses PDF and MP3 file icons to illustrate these concepts.](https://kodekloud.com/kk-media/image/upload/v1752869360/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-What-is-AWS-S3/s3-objects-files-key-value-metadata.jpg)

### Flat Namespace and “Folders”

Under the hood, S3 is a flat key-value store. The console mimics directories by treating prefixes (text before a `/`) as folders.

```
music/song1.mp3
music/song2.mp3
music/song3.mp3
```

- These keys appear under a `music/` folder in the console but are stored flat in S3.

![The image illustrates the flat file structure of S3 buckets, showing files and folders with examples like "File1.txt" and a "music/" directory containing songs.](https://kodekloud.com/kk-media/image/upload/v1752869360/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-What-is-AWS-S3/s3-bucket-flat-file-structure.jpg)

## Durability and Availability

When you upload to S3, AWS replicates your data across multiple servers and Availability Zones (AZs) within a region, ensuring high durability and availability—even if an AZ fails.

![The image illustrates an AWS architecture with three availability zones in the us-east-1 region, each containing compute resources and PNG files, and a central S3 bucket.](https://kodekloud.com/kk-media/image/upload/v1752869362/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-What-is-AWS-S3/aws-architecture-three-availability-zones.jpg)

## Bucket Naming and Global Uniqueness

Each bucket name must be unique across all AWS accounts and regions. The bucket name appears in the URL:

```
https://my-unique-bucket-name.s3.amazonaws.com/
```

> [!important]
> **Warning**
>
> Choose bucket names carefully. Renaming or deleting buckets can disrupt applications that rely on them.

![The image is about S3 bucket names, highlighting that they must be unique globally across all AWS accounts. It includes a URL example and a graphic of a person.](https://kodekloud.com/kk-media/image/upload/v1752869363/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-What-is-AWS-S3/s3-bucket-names-global-uniqueness.jpg)

## Limits and Restrictions

| Resource            | Limit                               |
| ------------------- | ----------------------------------- |
| Number of buckets   | 100 per account (increase to 1,000) |
| Maximum object size | 5 TB                                |
| Objects per bucket  | Unlimited                           |

![The image outlines AWS S3 restrictions, stating it can handle unlimited objects, a single file can be up to 5TB, and an account supports 100 buckets by default, expandable to 1,000.](https://kodekloud.com/kk-media/image/upload/v1752869364/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-What-is-AWS-S3/aws-s3-restrictions-objects-buckets.jpg)

> [!important]
> **Note**
>
> You can request a service quota increase for more buckets or higher throughput in the AWS Console under [Service Quotas](https://console.aws.amazon.com/servicequotas/).

---

In this lesson, we covered AWS S3’s fundamental concepts, common use cases, and architectural design. Next up: a hands-on demo to create and configure your first S3 bucket.

## References

- [Amazon S3 Developer Guide](https://docs.aws.amazon.com/s3/index.html)
- [AWS CLI Command Reference – S3](https://docs.aws.amazon.com/cli/latest/reference/s3/index.html)
- [Understanding Data Consistency in Amazon S3](https://aws.amazon.com/s3/faqs/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/amazon-simple-storage-service-amazon-s3/module/eec05698-c022-44e4-9421-cf157eb32097/lesson/193ac9c9-a85d-4ea4-bb58-75b0f750ee48)**
>
> Watch video content
