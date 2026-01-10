# DynamoDB TTL - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Databases/DynamoDB-TTL)

---

## Table of Contents

- DynamoDB TTL
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Databases

# DynamoDB TTL

In this lesson, we explore the DynamoDB TTL (Time to Live) feature, which automatically manages data lifecycle by deleting expired items from your table.

To leverage this feature, you designate an attribute in your table (for example, "expiresAt") that contains a timestamp in epoch format. When the current time exceeds the timestamp stored in the "expiresAt" attribute, DynamoDB marks the corresponding item for deletion. The actual removal of the item typically occurs within 48 hours and is processed at no additional cost.

> [!important]
> **Note**
>
> Enabling DynamoDB TTL helps reduce storage costs and improves query performance by automatically purging outdated data.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/a1267c00-fc48-4a9b-8d41-fd642fa743ea/lesson/317e1ead-e2bb-4ab7-ab2f-f8b955a86f4f)**
>
> Watch video content
