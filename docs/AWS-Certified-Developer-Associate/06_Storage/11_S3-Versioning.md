# S3 Versioning - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Storage/S3-Versioning)

---

## Table of Contents

- S3 Versioning
  - Overview: The Need for Versioning
  - Enabling Versioning at the Bucket Level
  - How Versioning Works Under the Hood
  - Deleting Objects with Versioning
  - Versioning Suspension
  - MFA Delete: An Extra Layer of Security
  - Impact on Storage Pricing
  - Summary
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Storage

# S3 Versioning

This article explores Amazon S3 versioning: how it works, its benefits, and the impact of enabling this feature. You'll learn key concepts including delete markers, suspended versioning, and MFA delete, helping you better safeguard your data and manage storage costs.

---

## Overview: The Need for Versioning

Without versioning, any deletion or replacement of a file in S3 is permanent. Imagine an S3 bucket with five files: file1, file2, file3, file4, and file5. If file1 is deleted, it is removed permanently and cannot be recovered later. Likewise, uploading a file with a name that already exists (e.g., file5.txt) will overwrite the existing file.

![The image shows a list of file folders labeled "File2.txt" to "File5.txt" with a "Gone Forever" icon, under the heading "Versioning."](https://kodekloud.com/kk-media/image/upload/v1752859822/notes-assets/images/AWS-Certified-Developer-Associate-S3-Versioning/versioning-file-folders-gone-forever.jpg)

Versioning was introduced to overcome these limitations. By preserving every version of an object, S3 allows you to retrieve or restore previous versions if an object is accidentally deleted or replaced.

---

## Enabling Versioning at the Bucket Level

Versioning must be enabled at the bucket level – it cannot be applied to individual objects. When enabled, a bucket can be in one of three states:

- **Unversioned:** Versioning is disabled (default state).
- **Versioning Enabled:** New uploads are assigned a unique version ID.
- **Versioning Suspended:** Existing versions are maintained, but new uploads receive a null version ID, effectively working like an unversioned bucket.

> [!important]
> **Important Note**
>
> Once versioning is enabled, a bucket cannot be switched back to an unversioned state; you can only suspend it. In suspended mode, new uploads receive a null version ID and replace the current object without creating a new version.

![The image shows three states of a bucket: "Unversioned," "Versioning Enabled" (with a checkmark), and "Versioning Suspended," each represented by a green bucket icon with geometric shapes.](https://kodekloud.com/kk-media/image/upload/v1752859823/notes-assets/images/AWS-Certified-Developer-Associate-S3-Versioning/bucket-versioning-states-diagram.jpg)

---

## How Versioning Works Under the Hood

When versioning is activated, each uploaded object receives a unique version ID. Consider the following example:

- **Initial Upload:** When you first upload an object (e.g., file1.txt), it is assigned a version ID. While the documentation might use a placeholder like "1," actual version IDs are unique, lengthy strings.
- **Subsequent Uploads:** Uploading an object with an existing key creates a new version with its own unique version ID (for example, "2", then "3", and so on).
- **Latest Version:** The most recent version (e.g., version ID "3") is treated as the active version. If you request file1.txt without specifying a version ID, S3 returns this latest version.

Within the S3 console, each version is displayed along with its corresponding version ID and upload timestamp.

![The image explains how versioning works for files, showing a hierarchy of version IDs for "file1.txt" and a table listing the file's versions with their IDs and modification dates.](https://kodekloud.com/kk-media/image/upload/v1752859824/notes-assets/images/AWS-Certified-Developer-Associate-S3-Versioning/file-versioning-hierarchy-diagram.jpg)

---

## Deleting Objects with Versioning

When deleting an object without specifying a version ID, S3 inserts a special delete marker. This marker acts as a pointer to hide previous versions without permanently erasing the original data. To recover an object, you can remove the delete marker via the S3 console, restoring access to the most recent non-deleted version.

If you delete a specific object by including its version ID, that particular version is permanently removed, and the next available version becomes the current one.

![The image illustrates the concept of deleting file versions, showing a "Delete Marker" and two versions of a file named "file1.txt" with different version IDs.](https://kodekloud.com/kk-media/image/upload/v1752859825/notes-assets/images/AWS-Certified-Developer-Associate-S3-Versioning/delete-marker-file-versions.jpg)

---

## Versioning Suspension

Suspending versioning stops new uploads from receiving unique version IDs while keeping all existing versions intact. In this state:

- All existing versions remain available.
- New uploads will have a null version ID, and they will override the visible object without creating a new version.

> [!important]
> **Note on Versioning Suspension**
>
> To remove older versions once versioning is suspended, you must manually delete them.

![The image illustrates the concept of version suspending, comparing "Versioning Enabled" with "Suspended Versioning" for a file named "file1.txt" with different version IDs.](https://kodekloud.com/kk-media/image/upload/v1752859826/notes-assets/images/AWS-Certified-Developer-Associate-S3-Versioning/version-suspending-file1txt-comparison.jpg)

---

## MFA Delete: An Extra Layer of Security

Multi-Factor Authentication (MFA) delete provides an additional layer of protection by requiring MFA verification for sensitive actions related to versioning. With MFA delete enabled:

- Changing the bucket's versioning state needs MFA verification.
- Deleting a specific version also requires MFA confirmation.

Note that MFA delete must be configured using the AWS CLI.

![The image explains Multi-Factor Authentication (MFA) Delete, highlighting that MFA is required to change the versioning state of a bucket and delete versions, and it can only be enabled using CLI.](https://kodekloud.com/kk-media/image/upload/v1752859828/notes-assets/images/AWS-Certified-Developer-Associate-S3-Versioning/mfa-delete-versioning-cli-explanation.jpg)

---

## Impact on Storage Pricing

Every version of an object stored in an S3 bucket incurs storage charges. For example, if file1.txt has a 10 GB version and another 15 GB version, you will be billed for a total of 25 GB. Managing multiple versions of large files can lead to increased storage costs.

---

## Summary

Amazon S3 versioning provides robust data protection by preserving every version of your objects. Here are the key takeaways:

- Versioning is activated at the bucket level rather than the object level.
- Buckets start as unversioned, but you can enable or suspend versioning.
- Once enabled, versioning cannot be completely disabled but may be suspended.
- Deleting objects without specifying a version ID adds a delete marker, while specifying a version ID permanently deletes that version.
- MFA delete adds extra security, ensuring that critical changes require multi-factor authentication.
- Storing multiple versions increases storage costs—monitor your usage carefully.

![The image is a summary of versioning features for buckets, highlighting that versioning must be explicitly enabled, is set at the bucket level, and has three states: unversioned, enabled, and suspended.](https://kodekloud.com/kk-media/image/upload/v1752859829/notes-assets/images/AWS-Certified-Developer-Associate-S3-Versioning/bucket-versioning-features-summary.jpg)

By understanding and implementing these versioning concepts, you can effectively manage your S3 data, recover from accidental deletions, and maintain control over your storage expenses.

---

For further reading on Amazon S3 and its features, consider exploring the [AWS Documentation](https://aws.amazon.com/documentation/s3/) and [Amazon S3 FAQs](https://aws.amazon.com/s3/faqs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/e8ae2293-e16b-42d3-b32b-5c260a1f1e5d/lesson/68814bc6-476e-4683-9ec0-2c6f09b90acf)**
>
> Watch video content
