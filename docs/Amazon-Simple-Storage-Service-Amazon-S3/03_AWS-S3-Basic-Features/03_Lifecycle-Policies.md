# Lifecycle Policies - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Amazon-Simple-Storage-Service-Amazon-S3/AWS-S3-Basic-Features/Lifecycle-Policies)

---

## Table of Contents

- Lifecycle Policies
  - How Lifecycle Policies Work
  - Storage Class Transition Rules
  - Additional Constraints
  - Next Steps
  - Links and References
  - Watch Video

---

## Content

Amazon Simple Storage Service (Amazon S3)

AWS S3 Basic Features

# Lifecycle Policies

Amazon S3 lifecycle policies help you optimize storage costs by automatically transitioning objects between storage classes or expiring them after a specified time. Define your rules once, and S3 handles the rest—no manual cleanup required.

## How Lifecycle Policies Work

When you upload an object (for example, `file1.txt`) using **S3 Standard**, its access pattern may change over time. You can configure a lifecycle policy such as:

- After **30 days**: transition to **S3 Standard-IA** (Infrequent Access).
- After **90 days**: archive to **S3 Glacier Deep Archive**.
- After **365 days**: delete the object.

Lifecycle policies can target:

- An **entire bucket**.
- A **subset of objects** defined by prefix or tag.
- **Specific versions** (if you have versioning enabled).

> [!important]
> **Note**
>
> Lifecycle rules only move objects “downhill,” from a higher-cost class to a lower-cost class.

![The image is a flowchart illustrating AWS S3 lifecycle policies, showing transitions between different storage classes like S3 Standard, S3 Intelligent-Tiering, and S3 Glacier Deep Archive.](https://kodekloud.com/kk-media/image/upload/v1752869288/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Lifecycle-Policies/aws-s3-lifecycle-policies-flowchart.jpg)

## Storage Class Transition Rules

Not every storage class can transition directly to every other. The following table summarizes permitted transitions:

| Source Class               | Allowed Transitions                                                                                                        |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **S3 Standard**            | Standard-IA, Intelligent-Tiering, One Zone-IA, Glacier Instant Retrieval, Glacier Flexible Retrieval, Glacier Deep Archive |
| **S3 Intelligent-Tiering** | Glacier Instant Retrieval, Glacier Flexible Retrieval, Glacier Deep Archive                                                |
| **S3 One Zone-IA**         | Glacier Flexible Retrieval, Glacier Deep Archive                                                                           |

## Additional Constraints

When defining lifecycle rules, observe these key constraints:

- **Minimum object size**  
  Objects must be ≥ 128 KB to transition from Standard or Standard-IA to Intelligent-Tiering or Glacier Instant Retrieval.
- **Minimum storage duration**
  - Standard → Standard-IA or One Zone-IA: **30 days** in the source class.
  - After moving to Standard-IA or One Zone-IA, wait another **30 days** before transitioning to any Glacier class.

> [!important]
> **Warning**
>
> Violating minimum size or duration requirements will cause your lifecycle rule to skip transitions. Always verify object metadata before applying a rule.

For a full list of constraints and examples, see the [official AWS documentation](https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html).

![The image is a flowchart showing the transition of AWS S3 storage classes from "S3 Standard" to various other classes like "S3 Standard-IA," "S3 One Zone-IA," and different "S3 Glacier" options, with a 30-day transition period.](https://kodekloud.com/kk-media/image/upload/v1752869288/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Lifecycle-Policies/aws-s3-storage-classes-flowchart.jpg)

## Next Steps

In the next lesson, we’ll perform a hands-on demo in the S3 console. You’ll learn how to:

1.  Create a lifecycle rule step-by-step.
2.  Apply filters by prefix or tag.
3.  Review the rule summary and activate it in minutes.

---

## Links and References

- [AWS S3 Lifecycle Configuration](https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html)
- [Amazon S3 Storage Classes](https://aws.amazon.com/s3/storage-classes/)
- [Managing S3 Versioning and Lifecycle](https://aws.amazon.com/blogs/storage/managing-versions-and-lifecycle-with-amazon-s3/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/amazon-simple-storage-service-amazon-s3/module/64c3572f-57b6-4263-8818-9809392a98a1/lesson/40842475-1c33-4e02-8bae-6642d1dbfc54)**
>
> Watch video content
