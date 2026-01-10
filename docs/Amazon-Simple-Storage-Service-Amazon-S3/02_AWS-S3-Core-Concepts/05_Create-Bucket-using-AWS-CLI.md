# Create Bucket using AWS CLI - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Amazon-Simple-Storage-Service-Amazon-S3/AWS-S3-Core-Concepts/Create-Bucket-using-AWS-CLI)

---

## Table of Contents

- Create Bucket using AWS CLI
  - Prerequisites
  - Quick Reference: Common S3 CLI Commands
  - 1. Listing S3 Buckets
  - 2. Creating a New Bucket
  - 3. Deleting a Bucket
  - 4. Listing Objects Inside a Bucket
  - 5. Copying Files
  - 6. Deleting Objects
  - 7. Directory Operations
  - 8. Synchronizing Directories
  - Next Steps
  - Links and References
  - Watch Video
    - 4.1 Top-Level Listing
    - 4.2 Recursive Listing
    - 5.1 Local → S3
    - 5.2 S3 → Local
    - 5.3 S3 → S3
    - 6.1 Single Object
    - 6.2 Multiple Objects (Recursive)
    - 7.1 Copy an Entire Directory
    - 7.2 Move Files and Directories

---

## Content

Amazon Simple Storage Service (Amazon S3)

AWS S3 Core Concepts

# Create Bucket using AWS CLI

In this guide, we'll explore essential Amazon S3 operations—listing, creating, deleting buckets, and managing objects—using the AWS CLI. Automate your workflows and integrate these commands into scripts for seamless infrastructure management.

## Prerequisites

- AWS CLI installed and configured (`aws configure`)
- IAM permissions to list, create, and delete S3 buckets and objects
- Unique bucket names (globally unique across AWS)

> [!important]
> **Note**
>
> Before creating a bucket, verify the name’s availability. Bucket names must be globally unique and compliant with DNS naming conventions.

## Quick Reference: Common S3 CLI Commands

| Operation        | Command                                       | Description                                  |
| ---------------- | --------------------------------------------- | -------------------------------------------- |
| List Buckets     | `aws s3 ls`                                   | Display all S3 buckets in the account        |
| Create Bucket    | `aws s3 mb s3://<bucket-name> --region ...`   | Make a new bucket in a specified region      |
| Delete Bucket    | `aws s3 rb s3://<bucket-name> [--force]`      | Remove an empty bucket or delete recursively |
| List Objects     | `aws s3 ls s3://<bucket>`                     | Show top-level objects and prefixes          |
| Copy Files/Dirs  | `aws s3 cp <src> <dest> [--recursive]`        | Copy files between local and S3              |
| Move Files/Dirs  | `aws s3 mv <src> <dest> [--recursive]`        | Move files between local and S3              |
| Sync Directories | `aws s3 sync <local> s3://<bucket>`           | Sync only new or changed files               |
| Delete Objects   | `aws s3 rm s3://<bucket>/<key> [--recursive]` | Remove objects or entire prefixes            |

---

## 1\. Listing S3 Buckets

Retrieve all buckets in your AWS account:

```
$ aws s3 ls
2023-03-29 00:51:27 bucket1
2023-03-28 02:22:48 bucket2
2023-03-28 02:20:43 bucket3
```

---

## 2\. Creating a New Bucket

Use the **make bucket** command and specify a region:

```
$ aws s3 mb s3://newbucket --region us-east-1
make_bucket: newbucket
```

---

## 3\. Deleting a Bucket

Remove an **empty** bucket:

```
$ aws s3 rb s3://newbucket
remove_bucket: newbucket
```

To delete a bucket and all its contents, add `--force`:

```
$ aws s3 rb s3://newbucket --force
remove_bucket: newbucket
```

> [!important]
> **Warning**
>
> Using `--force` is irreversible. All objects in the bucket will be permanently deleted.

---

## 4\. Listing Objects Inside a Bucket

### 4.1 Top-Level Listing

List prefixes (folders) and files at the root of the bucket:

```
$ aws s3 ls s3://newbucket
                           PRE logs/
                           PRE media/
2023-03-29 01:38:08          0 file1.txt
2023-03-29 01:38:09          0 file2.txt
```

### 4.2 Recursive Listing

Show every object under the bucket:

```
$ aws s3 ls s3://newbucket --recursive
2023-03-29 01:38:08          0 file1.txt
2023-03-29 01:38:09          0 file2.txt
2023-03-29 01:38:09          0 logs/log1
2023-03-29 01:38:09          0 logs/log2
2023-03-29 01:38:10      24599 media/images/image1.png
2023-03-29 01:38:10      21420 media/images/image2.png
```

---

## 5\. Copying Files

### 5.1 Local → S3

Upload a file without deleting the source:

```
$ aws s3 cp file1.txt s3://newbucket
upload: ./file1.txt to s3://newbucket/file1.txt
```

### 5.2 S3 → Local

Download an object to a local directory:

```
$ aws s3 cp s3://newbucket/file1.txt /tmp/
download: s3://newbucket/file1.txt to ./tmp/file1.txt
```

### 5.3 S3 → S3

Copy between two buckets:

```
$ aws s3 cp s3://bucket1/file1.txt s3://bucket2/
copy: s3://bucket1/file1.txt to s3://bucket2/file1.txt
```

---

## 6\. Deleting Objects

### 6.1 Single Object

```
$ aws s3 rm s3://bucket/404.html
delete: s3://bucket/404.html
```

### 6.2 Multiple Objects (Recursive)

```
$ aws s3 rm s3://bucket/logs/ --recursive
delete: s3://bucket/logs/log1
delete: s3://bucket/logs/log2
```

---

## 7\. Directory Operations

Most S3 CLI commands support `--recursive` to process all files under a directory or prefix.

### 7.1 Copy an Entire Directory

```
$ aws s3 cp media/ s3://newbucket --recursive
```

### 7.2 Move Files and Directories

Use `mv` to transfer and remove the source:

```
# Local → S3
$ aws s3 mv file1.txt s3://newbucket
move: ./file1.txt to s3://newbucket/file1.txt


# S3 → Local
$ aws s3 mv s3://newbucket/file1.txt /tmp/
move: s3://newbucket/file1.txt to ./tmp/file1.txt


# Recursive Move
$ aws s3 mv media/ s3://newbucket --recursive
```

---

## 8\. Synchronizing Directories

Keep a local folder and an S3 prefix in sync. Only new or updated files transfer:

```
$ aws s3 sync /path/to/local/dir s3://bucket
upload: home/bob to s3://bucket/home/bob
upload: var/log  to s3://bucket/var/log
```

Adding new files (for example, `etc/ssh`) and rerunning uploads only those:

```
$ aws s3 sync /path/to/local/dir s3://bucket
upload: etc/ssh to s3://bucket/etc/ssh
```

---

## Next Steps

You’ve mastered the core AWS S3 CLI commands for bucket and object management. Apply these operations in scripts or CI/CD pipelines to automate your workflows.

---

## Links and References

- [AWS CLI S3 Command Reference](https://docs.aws.amazon.com/cli/latest/reference/s3/)
- [Amazon S3 Documentation](https://docs.aws.amazon.com/s3/)
- [AWS CLI Installation Guide](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/amazon-simple-storage-service-amazon-s3/module/eec05698-c022-44e4-9421-cf157eb32097/lesson/5c65864e-2c44-4362-89a6-60fcd3cd5bb8)**
>
> Watch video content
