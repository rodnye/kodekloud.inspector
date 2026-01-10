# Demo Create Bucket using AWS CLI - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Amazon-Simple-Storage-Service-Amazon-S3/AWS-S3-Core-Concepts/Demo-Create-Bucket-using-AWS-CLI)

---

## Table of Contents

- Demo Create Bucket using AWS CLI
  - Prerequisites
  - Quick Reference: Common S3 Commands
  - 1. Listing Buckets and Contents
  - 2. Creating a Bucket
  - 3. Copying Files with cp
  - 4. Moving Files with mv
  - 5. Copying Directories Recursively
  - 6. Deleting Objects
  - 7. Syncing Directories
  - 8. Deleting a Bucket
  - Links and References
  - Watch Video
  - Practice Lab
    - 1.1 List All Buckets
    - 1.2 List Objects in a Bucket
    - 1.3 Recursive Listing
    - 3.1 Local → S3
    - 3.2 S3 → Local
    - 3.3 Bucket-to-Bucket Copy
    - 4.1 Local → S3
    - 4.2 S3 → Local

---

## Content

Amazon Simple Storage Service (Amazon S3)

AWS S3 Core Concepts

# Demo Create Bucket using AWS CLI

In this guide, you’ll master using the AWS CLI to manage Amazon S3 buckets and objects. We’ll walk through listing buckets, creating buckets, copying and moving files, syncing directories, and cleaning up objects and buckets—all with practical examples.

## Prerequisites

- AWS CLI v2 installed and configured with appropriate IAM permissions.
- Basic familiarity with your command-line interface (Windows, macOS, or Linux).

> [!important]
> **Note**
>
> If you haven’t installed the AWS CLI, follow the [official AWS CLI installation guide](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html).

## Quick Reference: Common S3 Commands

| Operation            | Command                             | Description                                                 |
| -------------------- | ----------------------------------- | ----------------------------------------------------------- |
| List all buckets     | `aws s3 ls`                         | Show every S3 bucket in your AWS account                    |
| List bucket contents | `aws s3 ls s3://BUCKET_NAME`        | Display objects in a specific bucket                        |
| Create a new bucket  | `aws s3 mb s3://BUCKET_NAME`        | Make a new bucket (region optional with `--region`)         |
| Copy files           | `aws s3 cp SOURCE DESTINATION`      | Copy files between local and S3 or between buckets          |
| Move files           | `aws s3 mv SOURCE DESTINATION`      | Move files (source deleted after successful copy)           |
| Sync directories     | `aws s3 sync SOURCE DESTINATION`    | Mirror a directory (uploads only new or changed files)      |
| Delete objects       | `aws s3 rm s3://BUCKET_NAME/OBJECT` | Remove a single object                                      |
| Delete a bucket      | `aws s3 rb s3://BUCKET_NAME`        | Remove a bucket (use `--force` to delete all objects first) |

---

## 1\. Listing Buckets and Contents

### 1.1 List All Buckets

```
aws s3 ls
```

Example output:

```
2023-04-05 19:01:36 kk-demo-117
2023-04-05 19:02:15 kk-demo-files
2023-04-05 18:51:39 kk-static-demo
```

### 1.2 List Objects in a Bucket

```
aws s3 ls s3://kk-static-demo
```

Sample:

```
2023-04-05 18:52:06     458  404.html
2023-04-05 18:52:07     414  index.css
2023-04-05 18:52:07    1136  index.html
```

### 1.3 Recursive Listing

```
aws s3 ls s3://kk-static-demo --recursive
```

This shows all objects, including those in nested “folders.”

---

## 2\. Creating a Bucket

Use `mb` (make bucket) and specify a region if needed:

```
aws s3 mb s3://kk-cli-demo1 --region us-east-1
```

Output:

```
make_bucket: kk-cli-demo1
```

Verify by listing buckets again:

```
aws s3 ls
```

---

## 3\. Copying Files with `cp`

### 3.1 Local → S3

Upload a single file:

```
aws s3 cp file1 s3://kk-cli-demo1
```

Rename while uploading:

```
aws s3 cp file2 s3://kk-cli-demo1/secondfile.txt
```

### 3.2 S3 → Local

Download an object to your current directory:

```
aws s3 cp s3://kk-cli-demo1/secondfile.txt .
```

### 3.3 Bucket-to-Bucket Copy

```
aws s3 cp s3://kk-cli-demo1/file1 s3://kk-static-demo/file1
```

---

## 4\. Moving Files with `mv`

The `mv` command copies then deletes the source.

### 4.1 Local → S3

```
aws s3 mv file3 s3://kk-cli-demo1
```

### 4.2 S3 → Local

```
aws s3 mv s3://kk-cli-demo1/file3 .
```

---

## 5\. Copying Directories Recursively

To upload an entire folder:

```
aws s3 cp media/ s3://kk-cli-demo1 --recursive
```

Verify the structure:

```
aws s3 ls s3://kk-cli-demo1 --recursive
```

---

## 6\. Deleting Objects

Remove a single file:

```
aws s3 rm s3://kk-static-demo/file1
```

> [!important]
> **Warning**
>
> Deleting objects is irreversible. Double-check the object key before running `aws s3 rm`.

---

## 7\. Syncing Directories

Make the destination mirror your source directory:

```
aws s3 sync . s3://kk-cli-demo1
```

Only new or updated files are transferred.

---

## 8\. Deleting a Bucket

Attempt to delete an empty bucket:

```
aws s3 rb s3://kk-cli-demo1
```

If the bucket isn’t empty, use:

```
aws s3 rb s3://kk-cli-demo1 --force
```

---

## Links and References

- [AWS CLI Command Reference: S3](https://docs.aws.amazon.com/cli/latest/reference/s3/index.html)
- [Amazon S3 User Guide](https://docs.aws.amazon.com/AmazonS3/latest/userguide/)
- [AWS CLI Installation Guide](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/amazon-simple-storage-service-amazon-s3/module/eec05698-c022-44e4-9421-cf157eb32097/lesson/52325043-534f-40fb-b725-c4c5c49e6d73)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/amazon-simple-storage-service-amazon-s3/module/eec05698-c022-44e4-9421-cf157eb32097/lesson/a3eae255-47de-410e-b397-ef771d67c802)**
>
> Practice lab
