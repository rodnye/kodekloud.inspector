# S3 Object Lock - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Amazon-Simple-Storage-Service-Amazon-S3/AWS-S3-Management/S3-Object-Lock)

---

## Table of Contents

- S3 Object Lock
  - How Object Lock Works
  - Use Case: Financial Records Retention
  - Object Lock Modes
  - Legal Hold
  - Prerequisites
  - References
  - Watch Video

---

## Content

Amazon Simple Storage Service (Amazon S3)

AWS S3 Management

# S3 Object Lock

Amazon S3’s Object Lock feature enables you to enforce a write-once-read-many (WORM) model, ensuring complete data immutability. By preventing objects from being permanently deleted or overwritten, Object Lock helps you meet stringent regulatory and compliance requirements.

![The image describes "Object Lock," highlighting its features: preventing permanent data deletion or overwriting, meeting regulatory requirements, and enforcing a write-once-read-many (WORM) model.](https://kodekloud.com/kk-media/image/upload/v1752869389/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-S3-Object-Lock/object-lock-features-worm-regulations.jpg)

## How Object Lock Works

You can apply Object Lock at two levels:

1.  **Object-level** – Lock individual objects when you upload them.
2.  **Bucket-level rule** – Automatically lock every new object in the bucket.

Once locked, objects cannot be deleted or altered until the retention period expires (or until you remove a legal hold).

## Use Case: Financial Records Retention

Regulated industries—such as banking and insurance—must often retain records for a defined period. With Object Lock, you can specify exactly how long data must remain immutable.

![The image shows a diagram with a blue building icon on the left, an arrow labeled "5 Years" pointing to a green bucket icon on the right, under the title "Object Lock."](https://kodekloud.com/kk-media/image/upload/v1752869390/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-S3-Object-Lock/object-lock-diagram-blue-green-icons.jpg)

For example, enforcing a five-year retention period ensures that critical financial records remain tamper-proof until that timeframe ends.

## Object Lock Modes

Choose one of two retention modes when locking an object:

| Mode            | Description                                                                                    | Required Permission              |
| --------------- | ---------------------------------------------------------------------------------------------- | -------------------------------- |
| Governance Mode | Most users are blocked from deleting or overwriting. Principals with bypass rights can modify. | `s3:BypassGovernanceRetention`   |
| Compliance Mode | All users—including the root user—are blocked from deleting or shortening retention.           | None (only AWS account deletion) |

> [!important]
> **Note**
>
> Governance Mode lets security admins with the `s3:BypassGovernanceRetention` permission perform emergency deletions if needed.
> Compliance Mode guarantees unbreakable WORM protection—for any removal, you must delete the entire AWS account.

![The image illustrates two object lock modes: Governance Mode, where most users are restricted but users with bypass rights can access, and Compliance Mode, where all users, including root users, are restricted during the retention period.](https://kodekloud.com/kk-media/image/upload/v1752869392/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-S3-Object-Lock/object-lock-modes-governance-compliance.jpg)

## Legal Hold

When the exact retention period is unknown—such as during active litigation—you can apply a Legal Hold. This disables object deletion or modification indefinitely until the hold is lifted.

Only principals with the `s3:PutObjectLegalHold` permission can remove a Legal Hold.

```
aws s3api put-object-legal-hold \
  --bucket my-bucket \
  --key important-document.pdf \
  --legal-hold Status=ON
```

![The image illustrates a "Legal Hold" process, showing that only users with "PutObjectLegalHold" permission can interact with a storage bucket, while regular users cannot. It includes a use case for documents used during active litigation.](https://kodekloud.com/kk-media/image/upload/v1752869393/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-S3-Object-Lock/legal-hold-process-storage-bucket.jpg)

## Prerequisites

> [!important]
> **Warning**
>
> Object Lock must be enabled **at bucket creation** and cannot be turned on afterward.
> Ensure Versioning is also enabled on the same bucket.

- Enable **Versioning** on your S3 bucket.
- Enable **Object Lock** when you create the bucket.

![The image provides instructions for using "Object Lock," stating that versioning and object locking must be enabled in the bucket.](https://kodekloud.com/kk-media/image/upload/v1752869393/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-S3-Object-Lock/object-lock-instructions-versioning-bucket.jpg)

Once both settings are enabled, you can configure retention periods, switch modes, and apply Legal Holds to satisfy compliance mandates.

---

## References

- [Amazon S3 Object Lock Overview](https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html)
- [Using S3 Versioning](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Versioning.html)
- [AWS CLI put-object-legal-hold](https://docs.aws.amazon.com/cli/latest/reference/s3api/put-object-legal-hold.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/amazon-simple-storage-service-amazon-s3/module/985e08bc-a007-4d29-9e60-fe90b52410ae/lesson/7a97f491-22c1-4928-a99b-0b748c3bca57)**
>
> Watch video content
