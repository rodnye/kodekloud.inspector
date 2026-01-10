# Versioning - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Amazon-Simple-Storage-Service-Amazon-S3/AWS-S3-Basic-Features/Versioning)

---

## Table of Contents

- Versioning
  - Bucket Versioning States
  - Enabling Versioning and Managing Object Version IDs
  - Delete Markers
  - Pricing Considerations
  - Suspending Versioning
  - MFA Delete
  - Links and References
  - Watch Video
    - Enabling Versioning via Console and CLI

---

## Content

Amazon Simple Storage Service (Amazon S3)

AWS S3 Basic Features

# Versioning

In this lesson, we dive into **Amazon S3 versioning**—a powerful feature that helps you recover from accidental deletes or overwrites. By default, new S3 buckets have versioning **disabled**, which means:

- Deleting an object (e.g., `file1.txt`) removes it permanently.
- Uploading a new object with the same key (e.g., `file5.txt`) overwrites the existing object, making any previous data unrecoverable.

Enabling versioning lets you retain, retrieve, and restore every version of an object stored in your bucket.

![The image illustrates the concept of versioning with a bucket icon and three folder icons, each with a circular arrow, suggesting updates or changes.](https://kodekloud.com/kk-media/image/upload/v1752869294/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Versioning/versioning-bucket-folder-icons-diagram.jpg)

## Bucket Versioning States

You can configure versioning at the bucket level. An S3 bucket exists in one of three states:

| State           | Description                                                                                     |
| --------------- | ----------------------------------------------------------------------------------------------- |
| **Unversioned** | Versioning is disabled (default). New uploads overwrite existing objects without version IDs.   |
| **Enabled**     | All new and updated objects receive unique version IDs.                                         |
| **Suspended**   | Existing versions stay intact; new uploads behave like an unversioned bucket (null version ID). |

Once you **enable** versioning, you can never fully turn it off—only **suspend** it. Suspending does **not** delete prior versions; it simply stops assigning new version IDs.

## Enabling Versioning and Managing Object Version IDs

When versioning is **Enabled**:

1.  The first upload of `file1.txt` might get version ID `1`.
2.  Re-uploading the same key creates version ID `2`, preserving version `1`.
3.  A third upload assigns version ID `3`, and so on.

The most recent upload is the **current** or **latest** version. A GET request without `versionId` returns this version.

![The image explains how versioning works, showing a file with multiple version IDs and a table listing the file's name, type, version ID, and last modified date.](https://kodekloud.com/kk-media/image/upload/v1752869295/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Versioning/versioning-file-ids-table-explanation.jpg)

### Enabling Versioning via Console and CLI

Console:

1.  Open the [S3 console](https://console.aws.amazon.com/s3/).
2.  Select your bucket → **Properties** → **Bucket Versioning** → **Enable** → **Save**.

CLI:

```
aws s3api put-bucket-versioning \
  --bucket my-bucket \
  --versioning-configuration Status=Enabled
```

> [!important]
> **Note**
>
> A GET or LIST operation on an unversioned bucket always shows `VersionId: null`.

## Delete Markers

With versioning **enabled**, deleting an object without specifying a version ID does **not** remove its data. Instead, S3 inserts a **delete marker**, which becomes the current version and hides previous versions.

![The image illustrates the concept of deleting file versions, showing a "Delete Marker" and two versions of a file named "file1.txt" with different version IDs.](https://kodekloud.com/kk-media/image/upload/v1752869296/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Versioning/delete-marker-file-versions-file1.jpg)

- To **undelete**, remove the delete marker; the next latest version immediately becomes current.
- To remove a specific version (e.g., version `2` of `file1.txt`), delete that version ID directly—other versions remain intact.

## Pricing Considerations

Every version of an object counts towards your storage usage. You pay for the **sum of all versions**:

| Version                | Size      |
| ---------------------- | --------- |
| Version 1 of file1.txt | 10 GB     |
| Version 2 of file1.txt | 15 GB     |
| **Total billable**     | **25 GB** |

![The image illustrates versioning prices, showing two versions of a file named "file1.txt" with different sizes, totaling 25 GB.](https://kodekloud.com/kk-media/image/upload/v1752869297/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Versioning/versioning-prices-file1txt-sizes.jpg)

> [!important]
> **Warning**
>
> Enabling versioning can significantly increase your storage costs. Implement [Lifecycle rules](https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html) to expire or transition older versions to cheaper storage classes.

## Suspending Versioning

When you **suspend** versioning on a bucket:

- Existing object versions remain stored.
- New uploads receive a `null` version ID and overwrite objects as in an unversioned bucket.

S3 never purges prior versions automatically. To remove old versions, you must delete them manually or configure a Lifecycle policy.

## MFA Delete

**Multi-Factor Authentication (MFA) Delete** adds a security layer for versioning-related operations:

- Changing the bucket’s versioning state (Enabled/Suspended) requires MFA.
- Permanently deleting object versions also requires MFA.

> MFA Delete is only configurable via the AWS CLI.

![The image explains Multi-Factor Authentication (MFA) Delete, highlighting that MFA is required to change the versioning state of a bucket and can only be enabled using CLI.](https://kodekloud.com/kk-media/image/upload/v1752869299/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Versioning/mfa-delete-bucket-versioning-cli.jpg)

## Links and References

- [Amazon S3 Versioning Overview](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Versioning.html)
- [AWS CLI S3API Reference](https://docs.aws.amazon.com/cli/latest/reference/s3api/index.html)
- [Managing Object Lifecycle](https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/amazon-simple-storage-service-amazon-s3/module/64c3572f-57b6-4263-8818-9809392a98a1/lesson/84867ad6-3296-4d37-9638-3c8671fdb5e4)**
>
> Watch video content
