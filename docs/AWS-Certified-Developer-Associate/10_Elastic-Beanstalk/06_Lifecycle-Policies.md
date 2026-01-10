# Lifecycle Policies - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Elastic-Beanstalk/Lifecycle-Policies)

---

## Table of Contents

- Lifecycle Policies
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Elastic Beanstalk

# Lifecycle Policies

In this lesson, we will explore how Elastic Beanstalk lifecycle policies help manage your application versions and optimize resource usage within your AWS account.

When you deploy a new version of your application, Elastic Beanstalk automatically stores it in an S3 bucket. As deployments increase, the number of stored versions can quickly escalate into the hundreds or even thousands, risking potential resource quota limits.

> [!important]
> **Key Benefits**
>
> Elastic Beanstalk lifecycle policies allow you to:
>
> - Retain a specific number of recent application versions (e.g., keeping only the 100 most recent versions). When a new version is added, the oldest version is automatically deleted.
> - Protect critical versions by marking them as deletion protected.
> - Remove outdated versions through a time-based retention policy (for example, deleting any version older than 90 days).

**Important Note:** Deleting a version through lifecycle policies removes it only from Elastic Beanstalk by default; the corresponding file in the S3 bucket remains intact unless you configure the policy to delete these files as well.

![The image outlines Elastic Beanstalk lifecycle policies, including version limit, time-based retention, and deleting source bundles.](https://kodekloud.com/kk-media/image/upload/v1752858881/notes-assets/images/AWS-Certified-Developer-Associate-Lifecycle-Policies/elastic-beanstalk-lifecycle-policies.jpg)

By leveraging these lifecycle policies, you can keep your Elastic Beanstalk environment clean, manageable, and well within the resource limits of your AWS account. For more information on AWS deployment best practices, refer to the [AWS Documentation](https://aws.amazon.com/documentation/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/3f5ca094-fa86-4914-92ae-0ccab67b102d/lesson/e8a1ccb4-6f03-4bd3-998f-285b140b63be)**
>
> Watch video content
