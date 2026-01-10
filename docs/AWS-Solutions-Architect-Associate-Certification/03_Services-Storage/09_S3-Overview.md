# S3 Overview - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Storage/S3-Overview)

---

## Table of Contents

- S3 Overview
  - Common Use Cases for S3
  - S3 in a Web Application Deployment
  - Key Terminology and Concepts
  - S3 Restrictions
  - Conclusion
  - Watch Video
    - Buckets
    - Objects
    - Flat File Structure
    - Data Durability and Availability
    - Unique Bucket Names

---

## Content

AWS Solutions Architect Associate Certification

Services Storage

# S3 Overview

S3 (Simple Storage Service) is a highly scalable, available, secure, and high-performance object storage service provided by Amazon Web Services (AWS). Despite its name including three S's, it is primarily recognized as S3, a robust solution for storing and managing your data in the cloud.

![The image illustrates key features of Simple Storage Service (S3): Scalability, Data Availability, Security, and Performance, each represented by a colored icon.](https://kodekloud.com/kk-media/image/upload/v1752866041/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Overview/s3-key-features-scalability-availability-security-performance.jpg)

In simple terms, S3 functions like a cloud-based storage service similar to Dropbox or Google Drive, but with the extensive capabilities and integration of AWS.

![The image shows logos of Dropbox, Google Drive, and a green bucket icon, labeled as "Simple Storage Service (S3)."](https://kodekloud.com/kk-media/image/upload/v1752866042/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Overview/dropbox-google-drive-s3-logos.jpg)

As a core component of the AWS ecosystem, S3 works seamlessly with services like EC2, Lambda, and IAM. This integration allows you to control access via robust IAM policies and roles.

![The image illustrates AWS Simple Storage Service (S3) with icons representing EC2, Lambda, and IAM services. It shows a green bucket icon symbolizing S3 within the AWS Cloud.](https://kodekloud.com/kk-media/image/upload/v1752866043/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Overview/aws-s3-ec2-lambda-iam-diagram.jpg)

Additionally, S3 can be managed through various interfaces, including the AWS Management Console, CLI, SDK, or REST API—providing versatility regardless of your preferred method of interaction.

![The image illustrates the AWS Simple Storage Service (S3) with icons representing different access methods: AWS Console, AWS CLI, SDK, and Rest API.](https://kodekloud.com/kk-media/image/upload/v1752866043/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Overview/aws-s3-access-methods-diagram.jpg)

S3 is an object-based storage system, meaning it stores complete objects (files) with their metadata. Rather than using a traditional directory structure, S3 employs a flat namespace. The folder-like view in the AWS console is simply a visual convenience created by using prefixes in object names.

![The image categorizes storage types related to AWS S3: file-based (NFS, EFS), object-based (S3), and block-based (Server, EBS), indicating suitability with checkmarks and crosses.](https://kodekloud.com/kk-media/image/upload/v1752866044/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Overview/aws-s3-storage-types-diagram.jpg)

In summary, S3 is designed exclusively for object storage. Use Amazon's Elastic File System (EFS) for file-based storage and Amazon Elastic Block Store (EBS) for block storage.

## Common Use Cases for S3

S3 is ideal for storing:

- Application log files
- Media assets such as images, videos, and audio files
- Artifacts generated from CI/CD pipelines

![The image illustrates three use cases for S3: storing log files, media (audio, video, images), and CI/CD artifacts.](https://kodekloud.com/kk-media/image/upload/v1752866045/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Overview/s3-use-cases-log-media-artifacts.jpg)

> [!important]
> **Note**
>
> S3's versatility makes it suitable for a broad range of deployment architectures beyond the typical use cases mentioned above.

## S3 in a Web Application Deployment

Consider a traditional web application hosting scenario where a web server stores HTML, CSS, JavaScript, and media files. For media-intensive sites such as YouTube or Netflix, storing all assets on the same server can become inefficient and costly.

A common deployment strategy with S3 involves:

1.  Hosting HTML, CSS, and JavaScript files on the web server.
2.  Storing media files (videos, images, audio) in an S3 bucket.
3.  Embedding URLs in the HTML that point directly to media stored in S3.
4.  Offloading media requests to S3, which ensures efficient, scalable, and cost-effective delivery of large data volumes.

![The image illustrates two S3 use cases: one showing direct interaction between a user and a server, and the other involving an S3 bucket for storing and retrieving media and HTML files.](https://kodekloud.com/kk-media/image/upload/v1752866047/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Overview/s3-use-cases-user-server-bucket.jpg)

This architecture reduces the load on your web server and leverages S3's superior storage capabilities.

## Key Terminology and Concepts

### Buckets

Buckets are the containers in S3 where objects (files) are stored. Think of a bucket as a folder that groups related files. You can create multiple buckets to organize data by application, use case, or data type (e.g., one for logs and another for media).

![The image shows three green bucket icons labeled "App 1," "App 2," and "App 3," each containing simple geometric shapes.](https://kodekloud.com/kk-media/image/upload/v1752866048/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Overview/green-bucket-icons-apps-shapes.jpg)

### Objects

An object in S3 consists of the file data and its metadata. Each object includes:

- A key: a unique name for the file.
- A value: the actual data of the file.
- Additional properties such as version ID and metadata (if versioning is enabled).

![The image explains that objects in S3 are files with a key (file name), value (file data), and additional information like version ID and metadata. It uses PDF and MP3 files as examples of objects.](https://kodekloud.com/kk-media/image/upload/v1752866049/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Overview/s3-objects-files-key-value-metadata.jpg)

### Flat File Structure

S3 utilizes a flat file structure, meaning there is no inherent concept of nested directories. While the AWS console may visually display folder-like groupings using prefixes, the underlying storage remains flat. For example, uploading files with keys like "music/song_one", "music/song_two", and "music/song_three" creates the illusion of a "music" folder.

![The image illustrates the flat file structure of S3 buckets, showing files and folders with an example of a "music" directory containing songs.](https://kodekloud.com/kk-media/image/upload/v1752866050/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Overview/s3-bucket-flat-file-structure.jpg)

### Data Durability and Availability

When you upload a file to S3, AWS replicates it across multiple servers and availability zones. This replication ensures high durability and availability, protecting your data even if a server or entire availability zone fails.

![The image illustrates an AWS cloud architecture with three availability zones, each containing computing resources and PNG files, and a central storage bucket.](https://kodekloud.com/kk-media/image/upload/v1752866051/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Overview/aws-cloud-architecture-availability-zones.jpg)

### Unique Bucket Names

Each S3 bucket must have a globally unique name across all AWS accounts. This name is part of the bucket's URL. If the chosen name is already in use, you must select a different one.

![The image explains that S3 bucket names must be unique globally across all AWS accounts, with an example URL showing the bucket name "kodekloud."](https://kodekloud.com/kk-media/image/upload/v1752866052/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Overview/s3-bucket-names-unique-example.jpg)

## S3 Restrictions

When using S3, keep the following restrictions in mind:

- S3 can store an unlimited number of objects.
- The maximum size for a single object is 5 terabytes.
- By default, each AWS account can create up to 100 buckets. This limit can be increased up to 1,000 by requesting a service limit increase.

![The image outlines AWS S3 restrictions, stating it can handle unlimited objects, a single file can be up to 5 TB, and an account supports 100 buckets by default, which can be increased to 1,000.](https://kodekloud.com/kk-media/image/upload/v1752866054/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Overview/aws-s3-restrictions-overview.jpg)

> [!important]
> **Warning**
>
> Always ensure that your bucket names are unique and comply with AWS naming conventions to avoid conflicts during deployment.

## Conclusion

S3 offers unmatched scalability, data availability, security, and performance as an object storage service. Its design is ideal for use cases such as storing media files, log files, CI/CD artifacts, and hosting static websites. Remember, S3 employs a flat file structure where files are stored as objects with keys, values, and optional metadata rather than through traditional directories.

![The image is a summary slide about Amazon's object storage service, highlighting its scalability, use cases, flat file structure, and object key-value concept.](https://kodekloud.com/kk-media/image/upload/v1752866055/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Overview/amazon-s3-object-storage-summary.jpg)

Effective management of S3 buckets is essential. With globally unique bucket names and the ability to handle an unlimited number of objects (up to 5 TB per object), S3 is engineered for large-scale storage and high performance. Enhanced features such as multi-part uploads further optimize the handling of large files.

![The image is a summary slide highlighting three points about AWS S3: buckets as containers for objects, the requirement for globally unique bucket names, and S3's ability to handle unlimited objects.](https://kodekloud.com/kk-media/image/upload/v1752866056/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Overview/aws-s3-summary-buckets-objects.jpg)

This article provided an in-depth overview of AWS S3, covering its fundamental concepts, common use cases, and key restrictions. Understanding these principles is crucial for anyone working with AWS or preparing for the AWS Solutions Architect exam.

For more detailed insights into AWS services, consider exploring the [AWS Documentation](https://aws.amazon.com/documentation/) and [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/23e00d1f-6422-4fef-a9bf-e8f007be5514/lesson/d3e408d6-f066-43af-98b4-d909afc3800f)**
>
> Watch video content
