# Implementing Versioning on S3 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-2-Reliability-and-BCP/Implementing-Versioning-on-S3)

---

## Table of Contents

- Implementing Versioning on S3
  - Watch Video

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 2 Reliability and BCP

# Implementing Versioning on S3

In this article, we explore how S3 versioning protects your data against accidental deletions and data loss. Although versioning was briefly mentioned in our overview, this detailed discussion focuses on its inner workings, real-world applications, and its critical role in managing your S3 data lifecycle.

There are two primary mechanisms to prevent data loss in S3:

1.  Tracking object changes using S3 versioning.
2.  Implementing point-in-time backups.

While point-in-time backups provide another layer of protection, our focus here is on versioning—a robust feature designed to guard against accidental deletions and overwrites.

Bucket versioning in S3 lets you preserve, retrieve, and restore every version of an object by simply enabling the feature. Note that once versioning is enabled, it cannot be disabled.

![The image is an informational graphic about Amazon S3 Versioning, highlighting its purpose to protect data against accidental deletes and overwrites, with options to enable or disable versioning.](https://kodekloud.com/kk-media/image/upload/v1752860144/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Implementing-Versioning-on-S3/amazon-s3-versioning-graphic.jpg)

> [!important]
> **Important Note**
>
> Once versioning is activated, it remains enabled forever. Every file change, even for large files, creates a new version, which could result in increased storage usage over time.

Consider this example of versioning in action:

- You initially upload "cat.jpg" as version one.
- A subsequent update uploads version two.
- Each additional change generates a new version, causing storage usage to increase cumulatively (e.g., first change results in two terabytes total, third change leads to three terabytes).

![The image explains Amazon S3 versioning, highlighting features like creating new versions with every upload, delete protection, and data retention using S3 Lifecycle. It includes a visual representation of versioned files.](https://kodekloud.com/kk-media/image/upload/v1752860145/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Implementing-Versioning-on-S3/amazon-s3-versioning-diagram.jpg)

When you delete a file in an S3 bucket with versioning enabled, the delete request does not remove the data permanently. Instead, S3 adds a delete marker to the file, leaving all previous versions intact. For example:

- You put "cat.jpg" in the bucket (version one).
- You upload an updated version (version two).
- Issuing a delete command adds a delete marker, making the file appear deleted while keeping both versions stored.

To completely remove the file and free up storage, you must delete the delete marker along with all the stored versions.

An added benefit of versioning is its compatibility with S3 lifecycle rules. You can set up policies to automatically transition older versions to cost-effective storage classes like Glacier or infrequent access tiers, thereby optimizing storage costs while ensuring data retention.

> [!important]
> **Caution**
>
> Be mindful that every upload creates a new version. Without proper lifecycle policies, storage costs may increase significantly over time.

In summary, S3 versioning offers these key advantages:

- Prevents accidental overwrites and deletions by retaining all versions of an object.
- Automatically creates a new version with every change.
- Requires explicit deletion of all versions and the delete marker to fully remove an object.
- Provides a critical layer of data protection, making it an essential feature for both everyday use and exam preparation.

This article clarifies the purpose and functionality of S3 versioning, underscoring its role in protecting your critical data. Even in the event of an accidental deletion, versioning ensures that your data remains recoverable.

We'll catch you in the next article.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/1b592900-bdef-468a-9a2b-de667b7e9cae/lesson/b26fe928-7eb5-4174-88fc-b98a4383f170)**
>
> Watch video content
