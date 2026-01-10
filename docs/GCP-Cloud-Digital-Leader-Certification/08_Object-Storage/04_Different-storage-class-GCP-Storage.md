# Different storage class GCP Storage - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GCP-Cloud-Digital-Leader-Certification/Object-Storage/Different-storage-class-GCP-Storage)

---

## Table of Contents

- Different storage class GCP Storage
  - Storage Class Details
  - Watch Video
    - Standard Storage
    - Nearline, Coldline, and Archive Storage

---

## Content

GCP Cloud Digital Leader Certification

Object Storage

# Different storage class GCP Storage

Hello and welcome back!

In this lesson, we will explore the concept of storage classes in Google Cloud Storage and understand their significance. After learning how to create and configure a Cloud Storage bucket, it’s crucial to know how to select the optimal storage class for your needs.

When setting up a Cloud Storage bucket, one of the key configurations you encounter is the storage class selection. Consider the following scenario: multiple pharmacies around the world are uploading various multimedia data to Cloud Storage. After implementing this architecture, you might wonder what happens to older data—say, files uploaded a year ago. Even if this data is infrequently accessed, it may be necessary for auditing purposes, which means deletion is not an option.

> [!important]
> **Understanding Storage Classes**
>
> Storage classes allow you to optimize costs by balancing storage expenses with data access frequency and durability. They help ensure that you only pay the necessary cost for data that is seldom accessed.

Below is a table summarizing the primary storage classes offered by Cloud Storage, including their minimum storage duration and typical monthly availability:

![The image is a table summarizing the primary storage classes offered by Cloud Storage, detailing their names, minimum storage duration, and typical monthly availability.](https://kodekloud.com/kk-media/image/upload/v1752875366/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Different-storage-class-GCP-Storage/cloud-storage-classes-summary-table.jpg)

## Storage Class Details

### Standard Storage

Standard Storage is the default option. With Standard Storage, there is no minimum storage duration requirement. You can delete files immediately after uploading, and you only pay for the duration that the file is stored.

### Nearline, Coldline, and Archive Storage

The other storage classes, such as Nearline, Coldline, and Archive Storage, are designed for cost-effective storage of infrequently accessed data. For example, when you upload data to Nearline Storage, it must be retained for at least 30 days. Despite the lower storage costs compared to Standard Storage, retrieval fees can be higher.

As you progress from Standard to Nearline, then to Coldline and Archive Storage, costs decrease. Archive Storage is particularly ideal for long-term retention of data that might not be accessed regularly—such as files from over a year ago that are retained solely for archival or auditing purposes.

> [!important]
> **Important Consideration**
>
> Remember that while Nearline, Coldline, and Archive Storage offer cost-effective solutions, the cost of retrieving data from these classes is higher. Ensure that you only move data that is not required for rapid, daily access into these storage classes.

These storage classes provide flexible configurations to help you control costs and optimize performance based on how frequently you access your data.

Thank you for reading this lesson!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gcp-cloud-digital-leader-certification/module/3bb690eb-cb02-483e-a380-0a7231ba9480/lesson/4a896451-4948-442a-b555-fb221df7fc09)**
>
> Watch video content
