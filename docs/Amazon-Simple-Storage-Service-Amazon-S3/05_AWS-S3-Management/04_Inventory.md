# Inventory - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Amazon-Simple-Storage-Service-Amazon-S3/AWS-S3-Management/Inventory)

---

## Table of Contents

- Inventory
  - What Is Amazon S3 Inventory?
  - Report Formats and Delivery
  - Metadata Fields Included
  - Configuring S3 Inventory Reports
  - References
  - Watch Video
    - Key Configuration Options

---

## Content

Amazon Simple Storage Service (Amazon S3)

AWS S3 Management

# Inventory

Amazon S3 Inventory provides scheduled listings of the objects in your S3 bucket, along with key metadata. You can generate these reports daily or weekly in CSV or Apache Parquet format, simplifying auditing, compliance, and analytics workflows.

## What Is Amazon S3 Inventory?

An S3 Inventory report gives you a flat-file listing of all objects and their metadata stored in a bucket. It’s ideal for:

- Auditing object-level configurations
- Generating cost and usage analytics
- Verifying compliance requirements
- Bulk operations (e.g., export object keys for processing)

## Report Formats and Delivery

You can choose one of two output formats:

| Format         | Advantages                                           |
| -------------- | ---------------------------------------------------- |
| CSV            | Widely supported by spreadsheets and ETL tools       |
| Apache Parquet | Optimized for big-data queries (e.g., Amazon Athena) |

Reports are delivered to a destination bucket in the same AWS Region, and you can configure optional encryption and prefix settings.

> [!important]
> **Note**
>
> Inventory reports can take up to 48 hours to appear when first enabled. Plan accordingly before running compliance checks.

## Metadata Fields Included

By default, each inventory entry includes the following metadata fields:

| Field              | Description                              |
| ------------------ | ---------------------------------------- |
| Bucket name        | The name of the source bucket            |
| Object key         | The object’s path and file name          |
| Version ID         | Version identifier (requires versioning) |
| Size               | Object size in bytes                     |
| Last modified      | Timestamp of the last modification       |
| Storage class      | e.g., STANDARD, INTELLIGENT\\\_TIERING   |
| Replication status | `COMPLETE`, `PENDING`, or `FAILED`       |
| Encryption status  | e.g., `AES256` or AWS KMS key            |
| Object lock status | Holds `GOVERNANCE` or `COMPLIANCE` locks |

![The image lists the types of information included in an inventory report, such as bucket name, key name, version ID, size, last modified date, storage class, replication status, encryption status, and object lock status. It also suggests referring to documentation for a complete list.](https://kodekloud.com/kk-media/image/upload/v1752869386/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Inventory/inventory-report-information-types-list.jpg)

Refer to the [AWS documentation](https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-inventory.html) for the full list of available fields.

## Configuring S3 Inventory Reports

You can set up an inventory report via the AWS CLI, SDK, or the S3 console. Below is an example using the AWS CLI:

```
aws s3api put-bucket-inventory-configuration \
  --bucket my-source-bucket \
  --id daily-inventory \
  --inventory-configuration '{
    "Destination": {
      "S3BucketDestination": {
        "AccountId": "123456789012",
        "Bucket": "arn:aws:s3:::my-destination-bucket",
        "Format": "CSV",
        "Prefix": "inventory-reports/"
      }
    },
    "IsEnabled": true,
    "Filter": {
      "Prefix": "data/"
    },
    "IncludedObjectVersions": "All",
    "OptionalFields": [
      "Size",
      "LastModifiedDate",
      "StorageClass",
      "ETag",
      "IsMultipartUploaded",
      "ReplicationStatus"
    ],
    "Schedule": {
      "Frequency": "Daily"
    }
  }'
```

> [!important]
> **Warning**
>
> If you include `VersionId`, versioning must be enabled on the source bucket. Otherwise, the report will fail.

### Key Configuration Options

- `Schedule.Frequency`: `Daily` or `Weekly`
- `IncludedObjectVersions`: `All` or `Current`
- `OptionalFields`: Add any additional metadata fields you require
- `Destination.S3BucketDestination.Prefix`: Organize reports under a common prefix

## References

- [Amazon S3 Inventory – User Guide](https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-inventory.html)
- [Amazon S3 Pricing](https://aws.amazon.com/s3/pricing/)
- [Querying S3 Inventory with Amazon Athena](https://docs.aws.amazon.com/athena/latest/ug/querying-s3-inventory.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/amazon-simple-storage-service-amazon-s3/module/985e08bc-a007-4d29-9e60-fe90b52410ae/lesson/8b752cab-ff57-4a87-a8a9-c1d36552d01f)**
>
> Watch video content
