# S3 Versioning - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Storage/S3-Versioning)

---

## Table of Contents

- S3 Versioning
  - How Versioning Works Under the Hood
  - Deleting Objects with Versioning
  - Versioning and Pricing
  - Suspended Versioning
  - MFA Delete
  - Summary
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Storage

# S3 Versioning

Amazon S3 versioning provides a powerful mechanism to safeguard your data by preserving, retrieving, and restoring different versions of your objects. This guide explains how versioning works within S3, its benefits, and the best practices to manage your data safely.

In S3, versioning is disabled by default. Consider an S3 bucket containing five files: file1, file2, file3, file4, and file5. When versioning is disabled, if you delete file1, it is permanently removed and cannot be recovered. Moreover, uploading a new file with the same key (e.g., file5.txt) will permanently overwrite the existing object, leading to potential data loss.

> [!important]
> **Tip**
>
> Enabling versioning mitigates risks of accidental deletion or unwanted overwrites by preserving older versions of your objects.

Versioning is a bucket-level setting—it applies to every object stored in the bucket. A bucket can be in one of three states:

1.  **Unversioned (Default State)** – Versioning is disabled.
2.  **Versioning Enabled** – New versions of objects are recorded.
3.  **Versioning Suspended** – Existing versions are kept, but new uploads do not receive version IDs.

![The image illustrates three states of a bucket: "Unversioned," "Versioning Enabled," and "Versioning Suspended," with a checkmark indicating "Versioning Enabled."](https://kodekloud.com/kk-media/image/upload/v1752866121/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Versioning/bucket-versioning-states-diagram.jpg)

Once versioning is activated, you cannot disable it; you can only suspend it. When suspended, all existing object versions are maintained, but new uploads will have a null version ID, functioning as if versioning is turned off.

## How Versioning Works Under the Hood

When versioning is enabled, each uploaded object is assigned a unique version ID. For example, if the first version of an object is assigned "1" (in practice, S3 uses a long unique string), subsequent uploads with the same key create new versions with distinct IDs (e.g., "2", "3", etc.). The most recent version is always considered the current version. If you access the object without specifying a version ID, the latest version is returned.

Within the S3 console, object uploads such as file1.txt are listed with their corresponding version IDs and metadata, including modification dates. This allows you to track changes over time.

![The image explains how versioning works for files, showing a sequence of version IDs for "file1.txt" and a table listing the file's versions with their modification dates.](https://kodekloud.com/kk-media/image/upload/v1752866122/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Versioning/file-versioning-sequence-diagram.jpg)

If versioning is disabled, the version ID associated with each object remains null.

## Deleting Objects with Versioning

When you delete an object without specifying a version ID while versioning is enabled, S3 adds a "delete marker" instead of permanently removing older versions. This delete marker makes it appear as if the file is deleted, while previous versions remain intact. Removing the delete marker in the S3 console will restore the most recent previous version as the current version.

![The image illustrates the concept of deleting file versions, showing a "Delete Marker" and two versions of a file named "file1.txt" with version IDs 2 and 1.](https://kodekloud.com/kk-media/image/upload/v1752866124/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Versioning/delete-marker-file-versions.jpg)

Alternatively, if you delete a specific version by specifying its version ID (for example, version ID 2 of file1.txt), that version is permanently removed, and the latest available version subsequently becomes the current version.

## Versioning and Pricing

Keep in mind that when versioning is enabled, you are billed for each stored version of an object. For example, if file1.txt comprises two versions (one of 10 GB and another of 15 GB), you will incur charges for a cumulative 25 GB. This reinforces the importance of periodically cleaning up outdated versions, especially for large files.

![The image illustrates "Versioning Pricing" with two versions of a file named "file1.txt," showing their version IDs and sizes: Version 2 is 15 GB, and Version 1 is 10 GB.](https://kodekloud.com/kk-media/image/upload/v1752866125/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Versioning/versioning-pricing-file1txt-sizes.jpg)

## Suspended Versioning

When you suspend versioning, the following behavior applies:

- All previous versions remain stored in the bucket.
- New uploads receive a null version ID, effectively behaving as if versioning is disabled.
- If you upload a new object with an existing key, it permanently replaces the current version while preserving the historical versions.

![The image illustrates the concept of versioning in file management, comparing "Versioning Enabled" with "Suspended Versioning" for a file named "file1.txt" with different version IDs.](https://kodekloud.com/kk-media/image/upload/v1752866126/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Versioning/versioning-file-management-comparison.jpg)

## MFA Delete

MFA Delete adds an extra layer of security to your bucket's versioning operations. When enabled, any changes to the bucket's versioning configuration or deletions of specific versions require multi-factor authentication (MFA). This feature ensures that such critical actions are executed only with proper verification. Note that MFA Delete can only be enabled using the [AWS CLI](https://aws.amazon.com/cli/).

![The image explains Multi-Factor Authentication (MFA) Delete, highlighting that MFA is required to change the versioning state of a bucket and delete versions, and it can only be enabled using CLI.](https://kodekloud.com/kk-media/image/upload/v1752866129/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Versioning/mfa-delete-versioning-cli-explanation.jpg)

## Summary

Versioning in S3 lets you protect your data against accidental modifications and deletions by maintaining historical versions of your objects. Key points include:

- **Default State**: Versioning is disabled by default and must be explicitly enabled at the bucket level.
- **Irreversible Activation**: Once enabled, versioning cannot be completely turned off; it can only be suspended.
- **Storage Costs**: All versions of an object are stored and billed, so it's important to manage versions to optimize costs.
- **Deletion Mechanics**: Deleting an object without specifying a version ID adds a delete marker rather than erasing previous versions. Deleting a specified version permanently removes that version.
- **Enhanced Security**: MFA Delete requires multi-factor authentication to change versioning settings or delete versions, adding an extra layer of security.

![The image is a summary of versioning features for buckets, highlighting that versioning must be enabled explicitly, is set at the bucket level, and has three states: unversioned, enabled, and suspended.](https://kodekloud.com/kk-media/image/upload/v1752866130/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Versioning/bucket-versioning-features-summary.jpg)

By understanding and implementing S3 versioning, you can ensure robust data protection against accidental deletions and overwrites while maintaining control over your storage costs through efficient version management.

![The image is a summary slide with points about versioning in a bucket, including its irreversible state, suspended state behavior, charges for versions, and MFA configuration for security.](https://kodekloud.com/kk-media/image/upload/v1752866132/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Versioning/versioning-bucket-summary-slide.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/23e00d1f-6422-4fef-a9bf-e8f007be5514/lesson/6434831e-8430-4d9c-bcf7-d97432a53dbb)**
>
> Watch video content
